import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CommunicationScenario, 
  CommunicationExercise, 
  EAR_LABELS,
  EarType
} from '@/types/communication';
import { 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  XCircle,
  Lightbulb,
  X
} from 'lucide-react';

interface ExerciseViewProps {
  scenario: CommunicationScenario;
  exercise: CommunicationExercise | null;
  userAnswers: Record<string, number>;
  completedExercises: string[];
  showExplanation: boolean;
  onSelectAnswer: (answerIndex: number) => void;
  onNext: () => void;
  onClose: () => void;
}

export function ExerciseView({
  scenario,
  exercise,
  userAnswers,
  completedExercises,
  showExplanation,
  onSelectAnswer,
  onNext,
  onClose,
}: ExerciseViewProps) {
  const message = scenario.messages[exercise?.messageIndex ?? 0];
  const selectedAnswer = exercise ? userAnswers[exercise.id] : undefined;
  const isCorrect = exercise ? selectedAnswer === exercise.correctAnswer : false;
  const hasAnswered = selectedAnswer !== undefined;

  if (!exercise) {
    // Scenario completed view
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Szenario abgeschlossen!</h3>
            <p className="text-muted-foreground mb-4">
              Du hast alle Übungen zu "{scenario.title}" bearbeitet.
            </p>
            <Button onClick={onClose}>
              Zurück zur Übersicht
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const earLabel = EAR_LABELS[exercise.targetEar];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{scenario.title}</h2>
          <p className="text-sm text-muted-foreground">{scenario.context}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Message Display */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="h-5 w-5 text-primary" />
            Die Nachricht
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg bg-muted/50 border-l-4 border-primary">
            <p className="text-lg font-medium italic">"{message.text}"</p>
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <span className="text-xl">{earLabel.icon}</span>
            {earLabel.name} erkennen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            <strong>Frage:</strong> {earLabel.question}
          </p>
          
          <div className="grid gap-3">
            {exercise.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isThisCorrect = index === exercise.correctAnswer;
              
              let buttonClass = 'p-4 rounded-lg border text-left transition-all';
              
              if (hasAnswered) {
                if (isThisCorrect) {
                  buttonClass += ' bg-green-500/20 border-green-500/50';
                } else if (isSelected && !isThisCorrect) {
                  buttonClass += ' bg-red-500/20 border-red-500/50';
                } else {
                  buttonClass += ' bg-muted/30 border-border opacity-50';
                }
              } else {
                buttonClass += ' bg-muted/30 border-border hover:border-primary/50 hover:bg-muted/50';
              }
              
              return (
                <button
                  key={index}
                  onClick={() => !hasAnswered && onSelectAnswer(index)}
                  disabled={hasAnswered}
                  className={buttonClass}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                      hasAnswered && isThisCorrect ? 'bg-green-500 border-green-500' :
                      hasAnswered && isSelected && !isThisCorrect ? 'bg-red-500 border-red-500' :
                      'border-muted-foreground'
                    }`}>
                      {hasAnswered && isThisCorrect && <CheckCircle2 className="h-4 w-4 text-white" />}
                      {hasAnswered && isSelected && !isThisCorrect && <XCircle className="h-4 w-4 text-white" />}
                      {!hasAnswered && <span className="text-xs text-muted-foreground">{String.fromCharCode(65 + index)}</span>}
                    </div>
                    <span className={hasAnswered && !isThisCorrect && !isSelected ? 'text-muted-foreground' : ''}>
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Explanation */}
      {showExplanation && (
        <Card className={`${isCorrect ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lightbulb className={`h-5 w-5 shrink-0 ${isCorrect ? 'text-green-500' : 'text-yellow-500'}`} />
              <div>
                <p className={`font-medium mb-2 ${isCorrect ? 'text-green-400' : 'text-yellow-400'}`}>
                  {isCorrect ? 'Richtig!' : 'Nicht ganz richtig'}
                </p>
                <p className="text-sm text-muted-foreground">{exercise.explanation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      {showExplanation && (
        <div className="flex justify-end">
          <Button onClick={onNext} className="gap-2">
            Weiter
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Tips */}
      {scenario.tips && scenario.tips.length > 0 && !showExplanation && (
        <Card className="bg-muted/30 border-border">
          <CardContent className="pt-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
              <div className="text-sm text-muted-foreground">
                <strong>Tipp:</strong> {scenario.tips[0]}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
