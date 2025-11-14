import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';
import { toast } from '@/hooks/use-toast';

export interface AIRecommendation {
  id: string;
  category_id: string;
  module_type: string;
  module_index: number;
  recommendation_reason: string;
  priority: number;
  created_at: string;
  expires_at: string;
}

export const useAIRecommendations = () => {
  const queryClient = useQueryClient();

  // Fetch recommendations
  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['ai-recommendations'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('ai_recommendations')
        .select('*')
        .eq('user_id', user.id)
        .gt('expires_at', new Date().toISOString())
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        logger.error('Error fetching AI recommendations:', error);
        return [];
      }

      return data as AIRecommendation[];
    },
  });

  // Generate new recommendations
  const generateRecommendations = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('generate-recommendations');

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-recommendations'] });
      toast({ title: 'Neue Empfehlungen wurden generiert' });
    },
    onError: (error) => {
      logger.error('Error generating recommendations:', error);
      toast({ title: 'Fehler beim Generieren der Empfehlungen', variant: 'destructive' });
    },
  });

  // Dismiss recommendation
  const dismissRecommendation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('ai_recommendations')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-recommendations'] });
      toast({ title: 'Empfehlung wurde entfernt' });
    },
  });

  return {
    recommendations,
    isLoading,
    generateRecommendations: generateRecommendations.mutate,
    isGenerating: generateRecommendations.isPending,
    dismissRecommendation: dismissRecommendation.mutate,
  };
};