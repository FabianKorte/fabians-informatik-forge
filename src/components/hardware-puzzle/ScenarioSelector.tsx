import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Lock, Play, Star } from 'lucide-react';
import type { PuzzleScenario } from '@/types/hardwarePuzzle';

interface ScenarioSelectorProps {
  scenarios: PuzzleScenario[];
  onSelectScenario: (id: string) => void;
  isScenarioCompleted: (id: string) => boolean;
}

const difficultyColors = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  expert: 'bg-red-500/20 text-red-400 border-red-500/30'
};

const difficultyLabels = {
  beginner: 'Anfänger',
  intermediate: 'Fortgeschritten',
  expert: 'Experte'
};

export const ScenarioSelector = ({ 
  scenarios, 
  onSelectScenario, 
  isScenarioCompleted 
}: ScenarioSelectorProps) => {
  const completedCount = scenarios.filter(s => isScenarioCompleted(s.id)).length;
  const progress = (completedCount / scenarios.length) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Hardware-Puzzle
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Lerne PC-Komponenten zusammenzubauen! Wähle passende Teile aus und achte auf Kompatibilität 
          zwischen CPU, Mainboard, RAM und anderen Komponenten.
        </p>
        
        <div className="flex items-center justify-center gap-4 mt-4">
          <span className="text-sm text-muted-foreground">Fortschritt:</span>
          <div className="w-48">
            <Progress value={progress} className="h-2" />
          </div>
          <span className="text-sm font-medium">{completedCount}/{scenarios.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenarios.map((scenario) => {
          const completed = isScenarioCompleted(scenario.id);
          
          return (
            <Card 
              key={scenario.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer group ${
                completed ? 'border-green-500/50' : 'hover:border-primary/50'
              }`}
              onClick={() => onSelectScenario(scenario.id)}
            >
              {completed && (
                <div className="absolute top-3 right-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              )}
              
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {scenario.title}
                  </CardTitle>
                </div>
                <Badge className={`w-fit ${difficultyColors[scenario.difficulty]}`}>
                  {difficultyLabels[scenario.difficulty]}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {scenario.description}
                </p>
                
                <div className="space-y-1">
                  <span className="text-xs font-medium text-muted-foreground">Anforderungen:</span>
                  <ul className="text-xs space-y-1">
                    {scenario.requirements.slice(0, 2).map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">{scenario.xpReward} XP</span>
                  </div>
                  
                  <Button size="sm" variant={completed ? 'outline' : 'default'}>
                    <Play className="h-4 w-4 mr-1" />
                    {completed ? 'Wiederholen' : 'Starten'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
