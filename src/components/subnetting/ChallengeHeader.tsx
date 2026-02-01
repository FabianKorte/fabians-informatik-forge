import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, X, Zap } from 'lucide-react';

interface ChallengeHeaderProps {
  setTitle: string;
  currentIndex: number;
  totalChallenges: number;
  currentScore: number;
  totalPossible: number;
  timeRemaining: number;
  onExit: () => void;
}

export function ChallengeHeader({
  setTitle,
  currentIndex,
  totalChallenges,
  currentScore,
  totalPossible,
  timeRemaining,
  onExit
}: ChallengeHeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = (currentIndex / totalChallenges) * 100;
  const isLowTime = timeRemaining < 30;

  return (
    <div className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10 p-4">
      <div className="max-w-4xl mx-auto space-y-3">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-sm sm:text-base truncate max-w-[200px] sm:max-w-none">
              {setTitle}
            </h2>
            <Badge variant="outline">
              {currentIndex + 1} / {totalChallenges}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Score */}
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="font-mono">{currentScore} Pkt</span>
            </div>
            
            {/* Timer */}
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              isLowTime 
                ? 'bg-red-500/20 text-red-400 animate-pulse' 
                : 'bg-muted'
            }`}>
              <Clock className={`h-4 w-4 ${isLowTime ? 'text-red-400' : ''}`} />
              <span className="font-mono font-semibold">
                {formatTime(timeRemaining)}
              </span>
            </div>
            
            {/* Exit Button */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onExit}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={progressPercent} className="h-2" />
      </div>
    </div>
  );
}
