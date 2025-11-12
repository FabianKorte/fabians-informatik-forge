import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/lib/logger';

interface FeedbackReaction {
  id: string;
  feedback_id: string;
  user_id: string | null;
  emoji: string;
  created_at: string;
}

export const useFeedbackReactions = (feedbackId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reactions, setReactions] = useState<FeedbackReaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReactions();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`feedback-reactions-${feedbackId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'feedback_reactions',
          filter: `feedback_id=eq.${feedbackId}`,
        },
        (payload) => {
          setReactions((prev) => [...prev, payload.new as FeedbackReaction]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'feedback_reactions',
          filter: `feedback_id=eq.${feedbackId}`,
        },
        (payload) => {
          setReactions((prev) => prev.filter((r) => r.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [feedbackId]);

  const fetchReactions = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback_reactions')
        .select('*')
        .eq('feedback_id', feedbackId);

      if (error) throw error;

      setReactions(data || []);
    } catch (error) {
      logger.error('Error fetching reactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleReaction = async (emoji: string) => {
    if (!user) {
      toast({
        title: 'Anmeldung erforderlich',
        description: 'Bitte melde dich an, um zu reagieren.',
        variant: 'destructive',
      });
      return;
    }

    const existingReaction = reactions.find(
      (r) => r.user_id === user.id && r.emoji === emoji
    );

    try {
      if (existingReaction) {
        const { error } = await supabase
          .from('feedback_reactions')
          .delete()
          .eq('id', existingReaction.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('feedback_reactions')
          .insert({ feedback_id: feedbackId, user_id: user.id, emoji });

        if (error) throw error;
      }
    } catch (error: any) {
      logger.error('Error toggling reaction:', error);
      
      if (error.code === '23505') {
        // Duplicate - silent fail
        return;
      }
      
      toast({
        title: 'Fehler',
        description: 'Reaktion konnte nicht gespeichert werden.',
        variant: 'destructive',
      });
    }
  };

  const getReactionCount = (emoji: string) => {
    return reactions.filter((r) => r.emoji === emoji).length;
  };

  const hasUserReacted = (emoji: string) => {
    return reactions.some((r) => r.user_id === user?.id && r.emoji === emoji);
  };

  return {
    reactions,
    isLoading,
    toggleReaction,
    getReactionCount,
    hasUserReacted,
  };
};
