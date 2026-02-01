import { ChallengeSession, ChallengeSet } from '@/types/subnetting';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  XCircle, 
  Clock, 
  Target, 
  CheckCircle2, 
  ArrowLeft, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface ResultsViewProps {
  session: ChallengeSession;
  set: ChallengeSet;
  onRestart: () => void;
  onExit: () => void;
}

export function ResultsView({ session, set, onRestart, onExit }: ResultsViewProps) {
  const percentage = (session.totalScore / set.totalPoints) * 100;
  const correctCount = session.answers.filter(a => a.isCorrect).length;
  const totalTime = session.answers.reduce((sum, a) => sum + a.timeTaken, 0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Result Header */}
      <Card className={`border-2 ${
        session.isPassed 
          ? 'border-green-500/50 bg-gradient-to-br from-green-500/10 to-transparent' 
          : 'border-red-500/50 bg-gradient-to-br from-red-500/10 to-transparent'
      }`}>
        <CardContent className="pt-8 pb-6 text-center">
          {session.isPassed ? (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-4">
                <Trophy className="h-10 w-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">
                Challenge bestanden! 🎉
              </h2>
              <p className="text-muted-foreground">
                Hervorragende Leistung! Du hast das Subnetting-Set erfolgreich abgeschlossen.
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 mb-4">
                <XCircle className="h-10 w-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-red-400 mb-2">
                Nicht bestanden
              </h2>
              <p className="text-muted-foreground">
                Du brauchst mindestens {set.passingScore}% zum Bestehen. Übung macht den Meister!
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Score Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ergebnis-Übersicht</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Punktzahl</span>
              <span className="font-semibold">{session.totalScore} / {set.totalPoints}</span>
            </div>
            <Progress value={percentage} className="h-3" />
            <div className="text-right text-sm text-muted-foreground">
              {percentage.toFixed(0)}% ({set.passingScore}% benötigt)
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <CheckCircle2 className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{correctCount}</div>
              <div className="text-xs text-muted-foreground">Richtig</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Target className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{set.challenges.length}</div>
              <div className="text-xs text-muted-foreground">Aufgaben</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Clock className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">{formatTime(totalTime)}</div>
              <div className="text-xs text-muted-foreground">Gesamtzeit</div>
            </div>
          </div>

          {/* XP Earned */}
          {session.isPassed && (
            <div className="flex items-center justify-center gap-2 p-4 bg-primary/10 rounded-lg border border-primary/30">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold">
                +{Math.floor(set.totalPoints / 2)} XP verdient!
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Answer Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Aufgaben-Übersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {session.answers.map((answer, index) => {
              const challenge = set.challenges[index];
              return (
                <div 
                  key={answer.challengeId}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    answer.isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {answer.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-sm">Aufgabe {index + 1}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={answer.isCorrect ? "default" : "secondary"}>
                      {answer.pointsEarned} / {challenge.points} Pkt
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {answer.timeTaken.toFixed(1)}s
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={onExit} className="flex-1">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück zur Übersicht
        </Button>
        <Button onClick={onRestart} className="flex-1">
          <RotateCcw className="h-4 w-4 mr-2" />
          Erneut versuchen
        </Button>
      </div>
    </div>
  );
}
