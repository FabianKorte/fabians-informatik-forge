import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/lib/logger';

interface GamificationData {
  xp: number;
  level: number;
  total_study_time: number;
}

interface Achievement {
  id: string;
  key: string;
  title: string;
  description: string;
  icon: string;
  xp_reward: number;
  category: string;
  unlocked_at?: string;
}

const XP_PER_LEVEL = 1000;

export const useGamification = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: gamificationData, isLoading } = useQuery({
    queryKey: ['gamification'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_gamification')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        logger.error('Error fetching gamification data:', error);
        throw error;
      }

      if (!data) {
        // Create initial gamification data
        const { data: newData, error: insertError } = await supabase
          .from('user_gamification')
          .insert({ user_id: user.id })
          .select()
          .single();

        if (insertError) throw insertError;
        return newData as GamificationData;
      }

      return data as GamificationData;
    },
  });

  const { data: achievements = [] } = useQuery({
    queryKey: ['achievements'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data: allAchievements, error: achievementsError } = await supabase
        .from('achievements')
        .select('*');

      if (achievementsError) throw achievementsError;

      const { data: userAchievements, error: userError } = await supabase
        .from('user_achievements')
        .select('achievement_id, unlocked_at')
        .eq('user_id', user.id);

      if (userError) throw userError;

      const unlockedIds = new Set(userAchievements?.map(ua => ua.achievement_id));

      return allAchievements.map(achievement => ({
        ...achievement,
        unlocked_at: userAchievements?.find(ua => ua.achievement_id === achievement.id)?.unlocked_at,
      })) as Achievement[];
    },
  });

  const addXP = useMutation({
    mutationFn: async ({ xp, reason }: { xp: number; reason: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const currentXP = gamificationData?.xp || 0;
      const currentLevel = gamificationData?.level || 1;
      const newXP = currentXP + xp;
      const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;

      const { error } = await supabase
        .from('user_gamification')
        .update({ xp: newXP, level: newLevel })
        .eq('user_id', user.id);

      if (error) throw error;

      return { newXP, newLevel, leveledUp: newLevel > currentLevel };
    },
    onSuccess: ({ newXP, newLevel, leveledUp }, { reason }) => {
      queryClient.invalidateQueries({ queryKey: ['gamification'] });
      
      if (leveledUp) {
        toast({
          title: `🎉 Level ${newLevel} erreicht!`,
          description: `Glückwunsch! Du hast ein neues Level freigeschaltet.`,
        });
      } else {
        toast({
          title: `+${newXP} XP`,
          description: reason,
        });
      }
    },
  });

  const unlockAchievement = useMutation({
    mutationFn: async (achievementKey: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const achievement = achievements.find(a => a.key === achievementKey);
      if (!achievement) throw new Error('Achievement not found');

      const { error } = await supabase
        .from('user_achievements')
        .insert({ user_id: user.id, achievement_id: achievement.id });

      if (error) {
        if (error.code === '23505') return null; // Already unlocked
        throw error;
      }

      // Add XP reward
      await addXP.mutateAsync({ xp: achievement.xp_reward, reason: 'Achievement unlocked' });

      return achievement;
    },
    onSuccess: (achievement) => {
      if (achievement) {
        queryClient.invalidateQueries({ queryKey: ['achievements'] });
        toast({
          title: `🏆 Achievement freigeschaltet!`,
          description: `${achievement.title} - ${achievement.description}`,
        });
      }
    },
  });

  return {
    gamificationData,
    achievements,
    isLoading,
    addXP: addXP.mutate,
    unlockAchievement: unlockAchievement.mutate,
    calculateProgress: (currentXP: number) => {
      const levelXP = currentXP % XP_PER_LEVEL;
      return (levelXP / XP_PER_LEVEL) * 100;
    },
  };
};
