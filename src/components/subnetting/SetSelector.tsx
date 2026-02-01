import { ChallengeSet } from '@/types/subnetting';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Trophy, Zap, CheckCircle2, Play, RotateCcw } from 'lucide-react';

interface SetSelectorProps {
  sets: ChallengeSet[];
  completedSetIds: string[];
  bestTimes: Record<string, number>;
  onSelect: (setId: string) => void;
  onReset: () => void;
}

export function SetSelector({ sets, completedSetIds, bestTimes, onSelect, onReset }: SetSelectorProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'anfaenger': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'fortgeschritten': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'experte': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'anfaenger': return 'Anfänger';
      case 'fortgeschritten': return 'Fortgeschritten';
      case 'experte': return 'Experte';
      default: return difficulty;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalCompleted = completedSetIds.length;
  const totalSets = sets.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Subnetting-Challenge
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Trainiere Subnetzmasken, Netzwerkadressen und Host-Berechnungen unter Zeitdruck. 
          Perfekt für die IHK-Prüfungsvorbereitung!
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-card/50 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Gesamtfortschritt</span>
            <span className="text-sm text-muted-foreground">{totalCompleted} / {totalSets} Sets</span>
          </div>
          <Progress value={(totalCompleted / totalSets) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Challenge Sets */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sets.map((set) => {
          const isCompleted = completedSetIds.includes(set.id);
          const bestTime = bestTimes[set.id];
          
          return (
            <Card 
              key={set.id} 
              className={`relative overflow-hidden transition-all hover:shadow-lg ${
                isCompleted ? 'border-green-500/30 bg-green-500/5' : 'hover:border-primary/50'
              }`}
            >
              {isCompleted && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-start gap-2">
                  <Badge className={getDifficultyColor(set.difficulty)}>
                    {getDifficultyLabel(set.difficulty)}
                  </Badge>
                </div>
                <CardTitle className="text-lg mt-2">{set.title}</CardTitle>
                <CardDescription className="text-sm">
                  {set.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span>{set.totalPoints} Punkte</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>{formatTime(set.timeLimit)}</span>
                  </div>
                </div>

                {bestTime && (
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <Trophy className="h-4 w-4" />
                    <span>Bestzeit: {formatTime(bestTime)}</span>
                  </div>
                )}

                <div className="text-xs text-muted-foreground">
                  {set.challenges.length} Aufgaben • {set.passingScore}% zum Bestehen
                </div>

                <Button 
                  onClick={() => onSelect(set.id)} 
                  className="w-full"
                  variant={isCompleted ? "outline" : "default"}
                >
                  {isCompleted ? (
                    <>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Wiederholen
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Starten
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Reset Button */}
      {completedSetIds.length > 0 && (
        <div className="text-center">
          <Button variant="ghost" size="sm" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Fortschritt zurücksetzen
          </Button>
        </div>
      )}
    </div>
  );
}
