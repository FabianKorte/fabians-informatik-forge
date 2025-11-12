import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';
import { subDays, format, startOfDay } from 'date-fns';

export interface LearningSession {
  category_id: string;
  module_type: string;
  module_index: number;
  performance_score: number;
  time_spent: number;
  questions_answered: number;
  correct_answers: number;
}

export interface LearningCurveData {
  date: string;
  performance: number;
  sessions: number;
}

export interface WeaknessAnalysis {
  category_id: string;
  category_name: string;
  avg_performance: number;
  total_sessions: number;
  needs_improvement: boolean;
}

export interface OptimalTimeData {
  hour: number;
  avg_performance: number;
  session_count: number;
}

export const useLearningAnalytics = () => {
  const queryClient = useQueryClient();

  // Track learning session
  const trackSession = useMutation({
    mutationFn: async (session: LearningSession) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const sessionHour = new Date().getHours();

      const { error } = await supabase
        .from('learning_analytics')
        .insert({
          user_id: user.id,
          category_id: session.category_id,
          module_type: session.module_type,
          module_index: session.module_index,
          performance_score: session.performance_score,
          time_spent: session.time_spent,
          questions_answered: session.questions_answered,
          correct_answers: session.correct_answers,
          session_hour: sessionHour,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learning-analytics'] });
    },
  });

  // Get learning curve data (last 30 days)
  const { data: learningCurve, isLoading: isCurveLoading } = useQuery({
    queryKey: ['learning-analytics', 'curve'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const thirtyDaysAgo = subDays(new Date(), 30);

      const { data, error } = await supabase
        .from('learning_analytics')
        .select('created_at, performance_score')
        .eq('user_id', user.id)
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: true });

      if (error) {
        logger.error('Error fetching learning curve:', error);
        return [];
      }

      // Group by day and calculate average
      const grouped = data.reduce((acc, item) => {
        const date = format(startOfDay(new Date(item.created_at)), 'yyyy-MM-dd');
        if (!acc[date]) {
          acc[date] = { total: 0, count: 0 };
        }
        acc[date].total += item.performance_score;
        acc[date].count += 1;
        return acc;
      }, {} as Record<string, { total: number; count: number }>);

      return Object.entries(grouped).map(([date, stats]) => ({
        date: format(new Date(date), 'dd.MM'),
        performance: Math.round(stats.total / stats.count),
        sessions: stats.count,
      })) as LearningCurveData[];
    },
  });

  // Get weakness analysis
  const { data: weaknesses, isLoading: isWeaknessLoading } = useQuery({
    queryKey: ['learning-analytics', 'weaknesses'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('learning_analytics')
        .select('category_id, performance_score')
        .eq('user_id', user.id);

      if (error) {
        logger.error('Error fetching weaknesses:', error);
        return [];
      }

      // Group by category and calculate average
      const grouped = data.reduce((acc, item) => {
        if (!acc[item.category_id]) {
          acc[item.category_id] = { total: 0, count: 0 };
        }
        acc[item.category_id].total += item.performance_score;
        acc[item.category_id].count += 1;
        return acc;
      }, {} as Record<string, { total: number; count: number }>);

      return Object.entries(grouped).map(([category_id, stats]) => {
        const avg_performance = stats.total / stats.count;
        return {
          category_id,
          category_name: category_id,
          avg_performance: Math.round(avg_performance),
          total_sessions: stats.count,
          needs_improvement: avg_performance < 70,
        };
      }).sort((a, b) => a.avg_performance - b.avg_performance) as WeaknessAnalysis[];
    },
  });

  // Get optimal learning times
  const { data: optimalTimes, isLoading: isTimesLoading } = useQuery({
    queryKey: ['learning-analytics', 'optimal-times'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('learning_analytics')
        .select('session_hour, performance_score')
        .eq('user_id', user.id);

      if (error) {
        logger.error('Error fetching optimal times:', error);
        return [];
      }

      // Group by hour and calculate average
      const grouped = data.reduce((acc, item) => {
        const hour = item.session_hour;
        if (!acc[hour]) {
          acc[hour] = { total: 0, count: 0 };
        }
        acc[hour].total += item.performance_score;
        acc[hour].count += 1;
        return acc;
      }, {} as Record<number, { total: number; count: number }>);

      return Object.entries(grouped).map(([hour, stats]) => ({
        hour: parseInt(hour),
        avg_performance: Math.round(stats.total / stats.count),
        session_count: stats.count,
      })).sort((a, b) => a.hour - b.hour) as OptimalTimeData[];
    },
  });

  return {
    trackSession: trackSession.mutate,
    isTracking: trackSession.isPending,
    learningCurve,
    isCurveLoading,
    weaknesses,
    isWeaknessLoading,
    optimalTimes,
    isTimesLoading,
  };
};