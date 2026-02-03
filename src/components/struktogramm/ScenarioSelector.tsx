import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CheckCircle, 
  Play, 
  Lightbulb,
  Trophy,
  ArrowLeft
} from 'lucide-react';
import type { StruktogrammScenario, StruktogrammExercise } from '@/types/struktogramm';

interface ScenarioSelectorProps {
  scenarios: StruktogrammScenario[];
  onSelectExercise: (exerciseId: string) => void;
  isExerciseCompleted: (exerciseId: string) => boolean;
}

const difficultyColors = {
  anfaenger: 'bg-green-500/10 text-green-500',
  fortgeschritten: 'bg-amber-500/10 text-amber-500',
  experte: 'bg-red-500/10 text-red-500'
};

const difficultyLabels = {
  anfaenger: 'Anfänger',
  fortgeschritten: 'Fortgeschritten',
  experte: 'Experte'
};

export const ScenarioSelector = ({ 
  scenarios, 
  onSelectExercise, 
  isExerciseCompleted 
}: ScenarioSelectorProps) => {
  const getTotalXP = () => {
    return scenarios.reduce((total, scenario) => 
      total + scenario.exercises.reduce((sum, ex) => 
        isExerciseCompleted(ex.id) ? sum + ex.xpReward : sum, 0
      ), 0
    );
  };

  const getCompletedCount = () => {
    return scenarios.reduce((total, scenario) => 
      total + scenario.exercises.filter(ex => isExerciseCompleted(ex.id)).length, 0
    );
  };

  const getTotalCount = () => {
    return scenarios.reduce((total, scenario) => total + scenario.exercises.length, 0);
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
        <CardContent className="py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Struktogramm-Übungen</h2>
              <p className="text-muted-foreground">
                Lerne die visuelle Darstellung von Algorithmen nach Nassi-Shneiderman
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{getCompletedCount()}/{getTotalCount()}</div>
                <div className="text-xs text-muted-foreground">Übungen</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500">{getTotalXP()}</div>
                <div className="text-xs text-muted-foreground">XP verdient</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scenarios */}
      <div className="grid gap-6">
        {scenarios.map(scenario => {
          const completedInScenario = scenario.exercises.filter(ex => isExerciseCompleted(ex.id)).length;
          const isScenarioComplete = completedInScenario === scenario.exercises.length;
          
          return (
            <Card key={scenario.id} className={isScenarioComplete ? 'border-green-500/30' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle>{scenario.title}</CardTitle>
                      {isScenarioComplete && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                    <CardDescription>{scenario.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={difficultyColors[scenario.difficulty]}>
                      {difficultyLabels[scenario.difficulty]}
                    </Badge>
                    <Badge variant="outline" className="text-yellow-500">
                      <Trophy className="h-3 w-3 mr-1" />
                      {scenario.xpReward} XP
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(completedInScenario / scenario.exercises.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {completedInScenario}/{scenario.exercises.length}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="max-h-[300px]">
                  <div className="space-y-2">
                    {scenario.exercises.map((exercise, idx) => (
                      <ExerciseCard 
                        key={exercise.id}
                        exercise={exercise}
                        index={idx + 1}
                        isCompleted={isExerciseCompleted(exercise.id)}
                        onStart={() => onSelectExercise(exercise.id)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

interface ExerciseCardProps {
  exercise: StruktogrammExercise;
  index: number;
  isCompleted: boolean;
  onStart: () => void;
}

const ExerciseCard = ({ exercise, index, isCompleted, onStart }: ExerciseCardProps) => (
  <div 
    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
      isCompleted 
        ? 'bg-green-500/5 border-green-500/30' 
        : 'bg-card hover:bg-muted/50 border-border'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-muted'
      }`}>
        {isCompleted ? <CheckCircle className="h-4 w-4" /> : <span className="text-sm font-medium">{index}</span>}
      </div>
      <div>
        <div className="font-medium text-sm">{exercise.title}</div>
        <div className="text-xs text-muted-foreground line-clamp-1">{exercise.description}</div>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="text-yellow-500 text-xs">
        +{exercise.xpReward} XP
      </Badge>
      <Button 
        size="sm" 
        variant={isCompleted ? 'outline' : 'default'}
        onClick={onStart}
      >
        {isCompleted ? 'Wiederholen' : 'Starten'}
        <Play className="h-3 w-3 ml-1" />
      </Button>
    </div>
  </div>
);

interface ExercisePanelProps {
  exercise: StruktogrammExercise;
  onExit: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export const ExercisePanel = ({ exercise, onExit, onComplete, isCompleted }: ExercisePanelProps) => (
  <Card className="h-full">
    <CardHeader className="py-3 px-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onExit}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Zurück
        </Button>
        {isCompleted && (
          <Badge className="bg-green-500/20 text-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Abgeschlossen
          </Badge>
        )}
      </div>
      <CardTitle className="text-base mt-2">{exercise.title}</CardTitle>
      <CardDescription>{exercise.description}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4 px-4 pb-4">
      <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
        <h4 className="font-medium text-sm mb-1">📋 Aufgabe:</h4>
        <p className="text-sm">{exercise.task}</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <h4 className="font-medium text-sm">Hinweise:</h4>
        </div>
        <ul className="space-y-1">
          {exercise.hints.map((hint, idx) => (
            <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
              <span className="text-amber-500">•</span>
              {hint}
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-2">
        <Button 
          className="w-full" 
          onClick={onComplete}
          disabled={isCompleted}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Bereits abgeschlossen
            </>
          ) : (
            <>
              <Trophy className="h-4 w-4 mr-2" />
              Als erledigt markieren (+{exercise.xpReward} XP)
            </>
          )}
        </Button>
      </div>
    </CardContent>
  </Card>
);
