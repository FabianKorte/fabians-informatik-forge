import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

interface StatisticsData {
  total_modules_completed: number;
  total_questions_answered: number;
  correct_answers: number;
  study_sessions: number;
  favorite_category: string | null;
}

export const useStatistics = () => {
  const queryClient = useQueryClient();

  const { data: statistics, isLoading } = useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_statistics')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        logger.error('Error fetching statistics:', error);
        throw error;
      }

      if (!data) {
        const { data: newData, error: insertError } = await supabase
          .from('user_statistics')
          .insert({ user_id: user.id })
          .select()
          .single();

        if (insertError) throw insertError;
        return newData as StatisticsData;
      }

      return data as StatisticsData;
    },
  });

  const updateStatistics = useMutation({
    mutationFn: async (updates: Partial<StatisticsData>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('user_statistics')
        .update(updates)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
    },
  });

  const incrementModuleCompleted = () => {
    if (statistics) {
      updateStatistics.mutate({
        total_modules_completed: statistics.total_modules_completed + 1,
      });
    }
  };

  const incrementQuestionsAnswered = (correct: boolean) => {
    if (statistics) {
      updateStatistics.mutate({
        total_questions_answered: statistics.total_questions_answered + 1,
        correct_answers: correct ? statistics.correct_answers + 1 : statistics.correct_answers,
      });
    }
  };

  const incrementStudySession = () => {
    if (statistics) {
      updateStatistics.mutate({
        study_sessions: statistics.study_sessions + 1,
      });
    }
  };

  return {
    statistics,
    isLoading,
    incrementModuleCompleted,
    incrementQuestionsAnswered,
    incrementStudySession,
    updateStatistics: updateStatistics.mutate,
  };
};
