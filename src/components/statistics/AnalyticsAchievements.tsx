import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/hooks/useGamification";
import { Trophy, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLearningAnalytics } from "@/hooks/useLearningAnalytics";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const AnalyticsAchievements = () => {
  const { achievements } = useGamification();
  const { learningCurve, optimalTimes } = useLearningAnalytics();

  // Get session count for Data Nerd
  const { data: sessionCount } = useQuery({
    queryKey: ['session-count'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return 0;

      const { count } = await supabase
        .from('learning_analytics')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      return count || 0;
    },
  });

  const analyticsAchievements = achievements.filter(a => a.category === 'analytics');

  if (analyticsAchievements.length === 0) return null;

  const getAchievementProgress = (key: string) => {
    switch (key) {
      case 'data_nerd':
        return Math.min((sessionCount || 0) / 100 * 100, 100);
      case 'perfect_timing':
        if (!optimalTimes || optimalTimes.length < 5) return 0;
        return Math.min(optimalTimes.length / 10 * 100, 100);
      case 'ai_student':
        // This is tracked via recommendations
        return 0;
      default:
        return 0;
    }
  };

  const getAchievementStatus = (key: string) => {
    switch (key) {
      case 'data_nerd':
        return `${sessionCount || 0} / 100 Sessions`;
      case 'perfect_timing':
        return optimalTimes && optimalTimes.length >= 5 
          ? '✓ Gefunden' 
          : `${optimalTimes?.length || 0} / 5 Zeitslots`;
      case 'ai_student':
        return 'Folge AI-Empfehlungen';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent" />
          Analytics Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {analyticsAchievements.map((achievement) => {
          const isUnlocked = !!achievement.unlocked_at;
          const progress = getAchievementProgress(achievement.key);

          return (
            <div
              key={achievement.id}
              className={`p-4 border border-border rounded-lg ${
                isUnlocked ? 'bg-accent/5' : 'opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">
                  {isUnlocked ? achievement.icon : <Lock className="w-8 h-8 text-muted-foreground" />}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{achievement.title}</h4>
                    {isUnlocked && (
                      <Badge variant="default" className="text-xs">
                        Freigeschaltet
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                  {!isUnlocked && (
                    <>
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {getAchievementStatus(achievement.key)}
                      </p>
                    </>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Trophy className="w-3 h-3" />
                    <span>{achievement.xp_reward} XP</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};