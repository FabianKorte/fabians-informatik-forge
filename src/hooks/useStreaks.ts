import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

interface StreakData {
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
}

export const useStreaks = () => {
  const queryClient = useQueryClient();

  const { data: streakData, isLoading } = useQuery({
    queryKey: ['streaks'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        logger.error('Error fetching streak data:', error);
        throw error;
      }

      if (!data) {
        const { data: newData, error: insertError } = await supabase
          .from('user_streaks')
          .insert({ user_id: user.id })
          .select()
          .single();

        if (insertError) throw insertError;
        return newData as StreakData;
      }

      return data as StreakData;
    },
  });

  const updateStreak = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const today = new Date().toISOString().split('T')[0];
      const lastActivityDate = streakData?.last_activity_date;

      if (lastActivityDate === today) {
        return streakData; // Already updated today
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      const currentStreak = streakData?.current_streak || 0;
      const longestStreak = streakData?.longest_streak || 0;

      let newCurrentStreak = currentStreak;

      if (lastActivityDate === yesterdayStr) {
        // Continuing streak
        newCurrentStreak = currentStreak + 1;
      } else if (lastActivityDate !== today) {
        // Streak broken
        newCurrentStreak = 1;
      }

      const newLongestStreak = Math.max(longestStreak, newCurrentStreak);

      const { data, error } = await supabase
        .from('user_streaks')
        .update({
          current_streak: newCurrentStreak,
          longest_streak: newLongestStreak,
          last_activity_date: today,
        })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streaks'] });
    },
  });

  return {
    streakData,
    isLoading,
    updateStreak: updateStreak.mutate,
  };
};
