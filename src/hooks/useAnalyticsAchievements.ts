import { useEffect } from 'react';
import { useGamification } from './useGamification';
import { useLearningAnalytics } from './useLearningAnalytics';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

export const useAnalyticsAchievements = () => {
  const { achievements, unlockAchievement } = useGamification();
  const { learningCurve, optimalTimes } = useLearningAnalytics();

  // Check "Data Nerd" achievement (100 sessions)
  useEffect(() => {
    const checkDataNerd = async () => {
      const dataNerdAchievement = achievements.find(a => a.key === 'data_nerd');
      if (dataNerdAchievement?.unlocked_at) return;

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { count, error } = await supabase
          .from('learning_analytics')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (error) throw error;

        if (count && count >= 100) {
          unlockAchievement('data_nerd');
        }
      } catch (error) {
        logger.error('Error checking Data Nerd achievement:', error);
      }
    };

    if (achievements.length > 0) {
      checkDataNerd();
    }
  }, [achievements, unlockAchievement]);

  // Check "Perfect Timing" achievement (found optimal learning time)
  useEffect(() => {
    const checkPerfectTiming = async () => {
      const perfectTimingAchievement = achievements.find(a => a.key === 'perfect_timing');
      if (perfectTimingAchievement?.unlocked_at) return;

      if (!optimalTimes || optimalTimes.length < 5) return;

      // User has enough data to determine optimal time
      const bestTime = optimalTimes.reduce((best, current) => 
        current.avg_performance > best.avg_performance ? current : best
      , optimalTimes[0]);

      // If best time has significantly better performance (>10% better than average)
      const avgPerformance = optimalTimes.reduce((sum, t) => sum + t.avg_performance, 0) / optimalTimes.length;
      
      if (bestTime.avg_performance > avgPerformance + 10) {
        unlockAchievement('perfect_timing');
      }
    };

    if (achievements.length > 0 && optimalTimes) {
      checkPerfectTiming();
    }
  }, [achievements, optimalTimes, unlockAchievement]);
};