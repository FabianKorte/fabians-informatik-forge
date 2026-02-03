import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BitExercise } from '@/types/bitCalculator';
import { 
  BookOpen, 
  CheckCircle2, 
  Lightbulb, 
  Star, 
  Trophy,
  Binary,
  Zap,
  HardDrive
} from 'lucide-react';

interface ExercisePanelProps {
  exercises: BitExercise[];
  completedExercises: string[];
  earnedPoints: number;
  currentExercise: BitExercise | null;
  userAnswer: string;
  showHint: boolean;
  onStartExercise: (exercise: BitExercise) => void;
  onAnswerChange: (answer: string) => void;
  onToggleHint: () => void;
  onCheckAnswer: () => void;
  isAnswerCorrect: () => boolean;
  onCloseExercise: () => void;
  progress: { total: number; completed: number; percentage: number };
}

const difficultyColors = {
  leicht: 'bg-green-500/20 text-green-400 border-green-500/30',
  mittel: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  schwer: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const typeIcons = {
  conversion: Binary,
  bitwise: Zap,
  'byte-calc': HardDrive,
};

export function ExercisePanel({
  exercises,
  completedExercises,
  earnedPoints,
  currentExercise,
  userAnswer,
  showHint,
  onStartExercise,
  onAnswerChange,
  onToggleHint,
  onCheckAnswer,
  isAnswerCorrect,
  onCloseExercise,
  progress,
}: ExercisePanelProps) {
  const groupedExercises = {
    conversion: exercises.filter(e => e.type === 'conversion'),
    bitwise: exercises.filter(e => e.type === 'bitwise'),
    'byte-calc': exercises.filter(e => e.type === 'byte-calc'),
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <span className="font-medium">Fortschritt</span>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3 w-3" />
              {earnedPoints} XP
            </Badge>
          </div>
          <Progress value={progress.percentage} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground text-center">
            {progress.completed} von {progress.total} Übungen abgeschlossen ({progress.percentage}%)
          </p>
        </CardContent>
      </Card>

      {/* Exercise Categories */}
      {Object.entries(groupedExercises).map(([type, typeExercises]) => {
        const Icon = typeIcons[type as keyof typeof typeIcons];
        const labels = {
          conversion: 'Zahlensystem-Konvertierung',
          bitwise: 'Bitweise Operationen',
          'byte-calc': 'Byte-Berechnungen',
        };

        return (
          <Card key={type} className="bg-card/50 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon className="h-5 w-5 text-primary" />
                {labels[type as keyof typeof labels]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {typeExercises.map((exercise) => {
                  const isCompleted = completedExercises.includes(exercise.id);
                  
                  return (
                    <button
                      key={exercise.id}
                      onClick={() => onStartExercise(exercise)}
                      className={`p-4 rounded-lg border text-left transition-all hover:scale-[1.02] ${
                        isCompleted 
                          ? 'bg-primary/10 border-primary/30' 
                          : 'bg-muted/30 border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-medium text-sm">{exercise.title}</span>
                        {isCompleted && (
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${difficultyColors[exercise.difficulty]}`}
                        >
                          {exercise.difficulty}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {exercise.points} XP
                        </Badge>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Exercise Dialog */}
      <Dialog open={!!currentExercise} onOpenChange={() => onCloseExercise()}>
        <DialogContent className="sm:max-w-lg">
          {currentExercise && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  {currentExercise.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={difficultyColors[currentExercise.difficulty]}
                  >
                    {currentExercise.difficulty}
                  </Badge>
                  <Badge variant="secondary">{currentExercise.points} XP</Badge>
                </div>

                <p className="text-muted-foreground">{currentExercise.description}</p>
                
                <Card className="bg-muted/30">
                  <CardContent className="pt-4">
                    <p className="font-medium">{currentExercise.question}</p>
                    {currentExercise.answerFormat && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Format: {currentExercise.answerFormat}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {showHint && currentExercise.hints.length > 0 && (
                  <Card className="bg-yellow-500/10 border-yellow-500/30">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                        <div className="space-y-1">
                          {currentExercise.hints.map((hint, i) => (
                            <p key={i} className="text-sm text-yellow-200">{hint}</p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-2">
                  <Input
                    value={userAnswer}
                    onChange={(e) => onAnswerChange(e.target.value)}
                    placeholder="Deine Antwort..."
                    className="font-mono"
                    disabled={completedExercises.includes(currentExercise.id)}
                  />
                </div>

                {completedExercises.includes(currentExercise.id) ? (
                  <div className="flex items-center justify-center gap-2 text-primary py-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Bereits gelöst! +{currentExercise.points} XP</span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={onToggleHint}
                      className="flex-1"
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      {showHint ? 'Hinweis ausblenden' : 'Hinweis'}
                    </Button>
                    <Button 
                      onClick={onCheckAnswer}
                      className="flex-1"
                      disabled={!userAnswer.trim()}
                    >
                      Prüfen
                    </Button>
                  </div>
                )}

                {userAnswer && !completedExercises.includes(currentExercise.id) && (
                  <div className={`text-center py-2 rounded-lg ${
                    isAnswerCorrect() 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {isAnswerCorrect() ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Richtig! +{currentExercise.points} XP
                      </span>
                    ) : (
                      <span>Noch nicht richtig. Versuche es nochmal!</span>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
