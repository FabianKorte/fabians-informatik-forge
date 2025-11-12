import { useStatistics } from '@/hooks/useStatistics';
import { Card } from '@/components/ui/card';
import { BookOpen, CheckCircle, Target, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { LearningCurveChart } from './LearningCurveChart';
import { WeaknessAnalysis } from './WeaknessAnalysis';
import { OptimalTimesChart } from './OptimalTimesChart';
import { AIRecommendations } from './AIRecommendations';
import { AnalyticsAchievements } from './AnalyticsAchievements';
import { useAnalyticsAchievements } from '@/hooks/useAnalyticsAchievements';

export const StatisticsDashboard = () => {
  const { statistics, isLoading } = useStatistics();
  
  // Check for analytics achievements
  useAnalyticsAchievements();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  if (!statistics) return null;

  const accuracyRate = statistics.total_questions_answered > 0
    ? Math.round((statistics.correct_answers / statistics.total_questions_answered) * 100)
    : 0;

  const stats = [
    {
      title: 'Module abgeschlossen',
      value: statistics.total_modules_completed,
      icon: BookOpen,
      color: 'text-blue-500',
    },
    {
      title: 'Fragen beantwortet',
      value: statistics.total_questions_answered,
      icon: Target,
      color: 'text-green-500',
    },
    {
      title: 'Genauigkeit',
      value: `${accuracyRate}%`,
      icon: CheckCircle,
      color: 'text-purple-500',
    },
    {
      title: 'Lernsessions',
      value: statistics.study_sessions,
      icon: TrendingUp,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Basic Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <Icon className={`h-10 w-10 ${stat.color}`} />
              </div>
            </Card>
          );
        })}
      </div>

      {statistics.favorite_category && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Lieblingskategorie</h3>
          <p className="text-2xl font-bold text-primary">{statistics.favorite_category}</p>
        </Card>
      )}

      {/* AI Recommendations */}
      <AIRecommendations />

      {/* Advanced Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LearningCurveChart />
        <WeaknessAnalysis />
      </div>

      {/* Analytics Achievements and Optimal Times */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OptimalTimesChart />
        <AnalyticsAchievements />
      </div>
    </div>
  );
};
