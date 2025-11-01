import { useGamification } from '@/hooks/useGamification';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const AchievementsList = () => {
  const { achievements, isLoading } = useGamification();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  const unlockedAchievements = achievements.filter((a) => a.unlocked_at);
  const lockedAchievements = achievements.filter((a) => !a.unlocked_at);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Freigeschaltet ({unlockedAchievements.length}/{achievements.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unlockedAchievements.map((achievement) => (
            <Card key={achievement.id} className="p-4 border-primary/50">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  <Badge variant="secondary" className="mt-2">
                    +{achievement.xp_reward} XP
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Gesperrt</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lockedAchievements.map((achievement) => (
            <Card key={achievement.id} className="p-4 opacity-60">
              <div className="flex items-start gap-3">
                <div className="text-3xl relative">
                  <span className="opacity-50">{achievement.icon}</span>
                  <Lock className="absolute -top-1 -right-1 h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  <Badge variant="outline" className="mt-2">
                    +{achievement.xp_reward} XP
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
