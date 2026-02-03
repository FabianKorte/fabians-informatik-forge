import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CommunicationScenario } from '@/types/communication';
import { CheckCircle2, MessageSquare, Star, Trophy } from 'lucide-react';

interface ScenarioListProps {
  scenarios: CommunicationScenario[];
  completedScenarios: string[];
  earnedPoints: number;
  progress: { total: number; completed: number; percentage: number };
  onSelectScenario: (scenario: CommunicationScenario) => void;
}

const difficultyColors = {
  leicht: 'bg-green-500/20 text-green-400 border-green-500/30',
  mittel: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  schwer: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export function ScenarioList({
  scenarios,
  completedScenarios,
  earnedPoints,
  progress,
  onSelectScenario,
}: ScenarioListProps) {
  const groupedScenarios = {
    leicht: scenarios.filter(s => s.difficulty === 'leicht'),
    mittel: scenarios.filter(s => s.difficulty === 'mittel'),
    schwer: scenarios.filter(s => s.difficulty === 'schwer'),
  };

  const difficultyLabels = {
    leicht: 'Einsteiger',
    mittel: 'Fortgeschritten',
    schwer: 'Experte',
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
            {progress.completed} von {progress.total} Szenarien abgeschlossen ({progress.percentage}%)
          </p>
        </CardContent>
      </Card>

      {/* Scenarios by Difficulty */}
      {Object.entries(groupedScenarios).map(([difficulty, diffScenarios]) => (
        <Card key={difficulty} className="bg-card/50 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="h-5 w-5 text-primary" />
              {difficultyLabels[difficulty as keyof typeof difficultyLabels]}
              <Badge 
                variant="outline" 
                className={difficultyColors[difficulty as keyof typeof difficultyColors]}
              >
                {difficulty}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {diffScenarios.map((scenario) => {
                const isCompleted = completedScenarios.includes(scenario.id);
                
                return (
                  <button
                    key={scenario.id}
                    onClick={() => onSelectScenario(scenario)}
                    className={`p-4 rounded-lg border text-left transition-all hover:scale-[1.02] ${
                      isCompleted 
                        ? 'bg-primary/10 border-primary/30' 
                        : 'bg-muted/30 border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-medium">{scenario.title}</span>
                      {isCompleted && (
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {scenario.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {scenario.messages.length} Nachricht{scenario.messages.length > 1 ? 'en' : ''}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {scenario.points} XP
                      </Badge>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
