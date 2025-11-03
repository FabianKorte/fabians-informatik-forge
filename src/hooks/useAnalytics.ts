import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalModules: number;
  totalCompletions: number;
  popularCategories: Array<{ category: string; count: number }>;
  userGrowth: Array<{ date: string; count: number }>;
  moduleCompletionRate: number;
}

export const useAnalytics = () => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: async (): Promise<AnalyticsData> => {
      // Total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Active users (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { count: activeUsers } = await supabase
        .from('user_streaks')
        .select('*', { count: 'exact', head: true })
        .gte('last_activity_date', sevenDaysAgo.toISOString().split('T')[0]);

      // Total modules
      const { count: totalModules } = await supabase
        .from('learn_modules')
        .select('*', { count: 'exact', head: true });

      // Total completions
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('progress_data');

      const totalCompletions = progressData?.reduce((acc, item) => {
        const data = item.progress_data as any;
        return acc + (data?.completed ? 1 : 0);
      }, 0) || 0;

      // Popular categories
      const { data: categoryData } = await supabase
        .from('user_progress')
        .select('category_id');

      const categoryCounts = categoryData?.reduce((acc: Record<string, number>, item) => {
        acc[item.category_id] = (acc[item.category_id] || 0) + 1;
        return acc;
      }, {}) || {};

      const popularCategories = Object.entries(categoryCounts)
        .map(([category, count]) => ({ category, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // User growth (last 30 days)
      const { data: userData } = await supabase
        .from('profiles')
        .select('created_at')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      const userGrowth = userData?.reduce((acc: Record<string, number>, item) => {
        const date = new Date(item.created_at).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {}) || {};

      const userGrowthArray = Object.entries(userGrowth).map(([date, count]) => ({
        date,
        count: count as number,
      }));

      const moduleCompletionRate = totalModules ? (totalCompletions / (totalUsers || 1) / totalModules) * 100 : 0;

      return {
        totalUsers: totalUsers || 0,
        activeUsers: activeUsers || 0,
        totalModules: totalModules || 0,
        totalCompletions,
        popularCategories,
        userGrowth: userGrowthArray,
        moduleCompletionRate,
      };
    },
  });

  return {
    analytics,
    isLoading,
  };
};
