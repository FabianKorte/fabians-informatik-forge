import type { SQLScenario, SQLExercise } from '@/types/sqlSandbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  Lightbulb, 
  BookOpen, 
  CheckCircle, 
  Circle,
  ArrowRight,
  Award
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ExercisePanelProps {
  scenario: SQLScenario;
  exercise: SQLExercise;
  exerciseIndex: number;
  completedExercises: string[];
  showHint: boolean;
  showTheory: boolean;
  onToggleHint: () => void;
  onToggleTheory: () => void;
  onCheckSolution: () => void;
  onNextExercise: () => void;
  onSelectExercise: (index: number) => void;
  isCompleted: boolean;
}

export function ExercisePanel({
  scenario,
  exercise,
  exerciseIndex,
  completedExercises,
  showHint,
  showTheory,
  onToggleHint,
  onToggleTheory,
  onCheckSolution,
  onNextExercise,
  onSelectExercise,
  isCompleted,
}: ExercisePanelProps) {
  const completedCount = scenario.exercises.filter(e => completedExercises.includes(e.id)).length;
  const progressPercent = (completedCount / scenario.exercises.length) * 100;

  const difficultyColors = {
    beginner: 'bg-green-500/10 text-green-500 border-green-500/20',
    intermediate: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    advanced: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  const difficultyLabels = {
    beginner: 'Anfänger',
    intermediate: 'Fortgeschritten',
    advanced: 'Experte',
  };

  return (
    <div className="space-y-4">
      {/* Progress Overview */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">{scenario.title}</CardTitle>
            <Badge variant="outline">
              {completedCount}/{scenario.exercises.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Progress value={progressPercent} className="h-2" />
        </CardContent>
      </Card>

      {/* Exercise Navigation */}
      <div className="flex flex-wrap gap-2">
        {scenario.exercises.map((ex, idx) => {
          const isDone = completedExercises.includes(ex.id);
          const isCurrent = idx === exerciseIndex;
          
          return (
            <Button
              key={ex.id}
              variant={isCurrent ? 'default' : 'outline'}
              size="sm"
              className={`w-9 h-9 p-0 ${isDone && !isCurrent ? 'border-green-500/50' : ''}`}
              onClick={() => onSelectExercise(idx)}
            >
              {isDone ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <span>{idx + 1}</span>
              )}
            </Button>
          );
        })}
      </div>

      {/* Current Exercise */}
      <Card className={isCompleted ? 'border-green-500/30' : ''}>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                {isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
                {exercise.title}
              </CardTitle>
              <CardDescription className="mt-1">
                {exercise.description}
              </CardDescription>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge className={difficultyColors[exercise.difficulty]}>
                {difficultyLabels[exercise.difficulty]}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Award className="h-3 w-3" />
                {exercise.xpReward} XP
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Theory Section */}
          {exercise.theory && (
            <Collapsible open={showTheory} onOpenChange={onToggleTheory}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Theorie
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showTheory ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 p-4 bg-muted/50 rounded-lg prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{exercise.theory}</ReactMarkdown>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Hint Section */}
          {exercise.hint && (
            <Collapsible open={showHint} onOpenChange={onToggleHint}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Hinweis anzeigen
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showHint ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <code className="text-sm text-yellow-600 dark:text-yellow-400">
                    {exercise.hint}
                  </code>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button onClick={onCheckSolution} className="flex-1">
              Lösung prüfen
            </Button>
            {exerciseIndex < scenario.exercises.length - 1 && (
              <Button variant="outline" onClick={onNextExercise}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
