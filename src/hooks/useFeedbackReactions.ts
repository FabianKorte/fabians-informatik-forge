import { useState, useEffect, useRef, useCallback } from 'react';
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

// Shared cache: batch-fetch all reactions once, share across all hook instances
let globalReactionsCache: Map<string, FeedbackReaction[]> | null = null;
let globalFetchPromise: Promise<void> | null = null;
let globalListeners: Set<() => void> = new Set();
let realtimeChannel: ReturnType<typeof supabase.channel> | null = null;

function notifyListeners() {
  globalListeners.forEach(fn => fn());
}

async function ensureGlobalFetch() {
  if (globalReactionsCache) return;
  if (globalFetchPromise) return globalFetchPromise;

  globalFetchPromise = (async () => {
    try {
      const { data, error } = await supabase
        .from('feedback_reactions')
        .select('*');

      if (error) throw error;

      const cache = new Map<string, FeedbackReaction[]>();
      for (const reaction of (data || [])) {
        const list = cache.get(reaction.feedback_id);
        if (list) list.push(reaction);
        else cache.set(reaction.feedback_id, [reaction]);
      }
      globalReactionsCache = cache;
    } catch (error) {
      logger.error('Error batch-fetching reactions:', error);
      globalReactionsCache = new Map();
    }

    // Set up a single realtime channel for all feedback reactions
    if (!realtimeChannel) {
      realtimeChannel = supabase
        .channel('feedback-reactions-global')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'feedback_reactions' }, (payload) => {
          const reaction = payload.new as FeedbackReaction;
          if (globalReactionsCache) {
            const list = globalReactionsCache.get(reaction.feedback_id);
            if (list) list.push(reaction);
            else globalReactionsCache.set(reaction.feedback_id, [reaction]);
            notifyListeners();
          }
        })
        .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'feedback_reactions' }, (payload) => {
          const old = payload.old as { id: string; feedback_id: string };
          if (globalReactionsCache) {
            const list = globalReactionsCache.get(old.feedback_id);
            if (list) {
              const idx = list.findIndex(r => r.id === old.id);
              if (idx !== -1) list.splice(idx, 1);
              notifyListeners();
            }
          }
        })
        .subscribe();
    }
  })();

  return globalFetchPromise;
}

export const useFeedbackReactions = (feedbackId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reactions, setReactions] = useState<FeedbackReaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const syncFromCache = () => {
      if (!mountedRef.current) return;
      const cached = globalReactionsCache?.get(feedbackId) || [];
      setReactions([...cached]);
    };

    globalListeners.add(syncFromCache);

    ensureGlobalFetch().then(() => {
      syncFromCache();
      if (mountedRef.current) setIsLoading(false);
    });

    return () => {
      mountedRef.current = false;
      globalListeners.delete(syncFromCache);
    };
  }, [feedbackId]);

  const toggleReaction = useCallback(async (emoji: string) => {
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
      if (error.code === '23505') return;
      toast({
        title: 'Fehler',
        description: 'Reaktion konnte nicht gespeichert werden.',
        variant: 'destructive',
      });
    }
  }, [user, reactions, feedbackId, toast]);

  const getReactionCount = useCallback((emoji: string) => {
    return reactions.filter((r) => r.emoji === emoji).length;
  }, [reactions]);

  const hasUserReacted = useCallback((emoji: string) => {
    return reactions.some((r) => r.user_id === user?.id && r.emoji === emoji);
  }, [reactions, user?.id]);

  return {
    reactions,
    isLoading,
    toggleReaction,
    getReactionCount,
    hasUserReacted,
  };
};
