import { useGamification } from '@/hooks/useGamification';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Zap } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const GamificationBar = () => {
  const { gamificationData, calculateProgress, isLoading } = useGamification();

  if (isLoading) {
    return <Skeleton className="h-16 w-full" />;
  }

  if (!gamificationData) return null;

  const progressPercent = calculateProgress(gamificationData.xp);

  return (
    <div className="bg-card border rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <span className="font-semibold">Level {gamificationData.level}</span>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Zap className="h-3 w-3" />
          {gamificationData.xp} XP
        </Badge>
      </div>
      <Progress value={progressPercent} className="h-2" />
      <p className="text-xs text-muted-foreground text-right">
        {Math.floor(progressPercent)}% bis zum nächsten Level
      </p>
    </div>
  );
};
