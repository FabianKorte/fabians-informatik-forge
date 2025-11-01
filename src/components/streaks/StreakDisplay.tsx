import { useStreaks } from '@/hooks/useStreaks';
import { Card } from '@/components/ui/card';
import { Flame, Trophy } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const StreakDisplay = () => {
  const { streakData, isLoading } = useStreaks();

  if (isLoading) {
    return <Skeleton className="h-24 w-full" />;
  }

  if (!streakData) return null;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Flame className="h-8 w-8 text-orange-500" />
          <div>
            <p className="text-sm text-muted-foreground">Aktuelle Serie</p>
            <p className="text-2xl font-bold">{streakData.current_streak} Tage</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <div>
            <p className="text-sm text-muted-foreground">Längste Serie</p>
            <p className="text-2xl font-bold">{streakData.longest_streak} Tage</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
