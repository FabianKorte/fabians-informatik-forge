import React from 'react';
import { NetworkScenario, ScenarioObjective } from '@/types/networkSimulator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, Clock, Star, Lightbulb, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScenarioSelectorProps {
  scenarios: NetworkScenario[];
  onSelect: (scenario: NetworkScenario) => void;
}

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({ scenarios, onSelect }) => {
  const difficultyColors = {
    leicht: 'bg-green-500/10 text-green-500 border-green-500/20',
    mittel: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    schwer: 'bg-red-500/10 text-red-500 border-red-500/20'
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {scenarios.map(scenario => (
        <Card 
          key={scenario.id} 
          className="hover:border-primary/50 transition-all cursor-pointer group"
          onClick={() => onSelect(scenario)}
        >
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {scenario.title}
              </CardTitle>
              <Badge className={cn("text-xs", difficultyColors[scenario.difficulty])}>
                {scenario.difficulty}
              </Badge>
            </div>
            <CardDescription>{scenario.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{scenario.points} Punkte</span>
                </div>
                {scenario.timeLimit && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{Math.floor(scenario.timeLimit / 60)} Min.</span>
                  </div>
                )}
              </div>
              <Button size="sm" variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground">
                <Play className="w-4 h-4 mr-1" />
                Starten
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

interface ScenarioPanelProps {
  scenario: NetworkScenario;
  completedObjectives: string[];
  onReset: () => void;
  onComplete: () => void;
}

export const ScenarioPanel: React.FC<ScenarioPanelProps> = ({
  scenario,
  completedObjectives,
  onReset,
  onComplete
}) => {
  const progress = (completedObjectives.length / scenario.objectives.length) * 100;
  const allComplete = completedObjectives.length === scenario.objectives.length;
  const [showHints, setShowHints] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{scenario.title}</h3>
          <p className="text-sm text-muted-foreground">{scenario.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Star className="w-3 h-3 text-yellow-500" />
            {scenario.points} Punkte
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Fortschritt</span>
          <span>{completedObjectives.length}/{scenario.objectives.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Aufgaben:</h4>
        <div className="space-y-1">
          {scenario.objectives.map(obj => {
            const completed = completedObjectives.includes(obj.id);
            return (
              <div
                key={obj.id}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md text-sm transition-colors",
                  completed ? "bg-green-500/10 text-green-500" : "bg-muted/50"
                )}
              >
                {completed ? (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 flex-shrink-0" />
                )}
                <span className={completed ? "line-through opacity-70" : ""}>
                  {obj.description}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {scenario.hints.length > 0 && (
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHints(!showHints)}
            className="gap-1"
          >
            <Lightbulb className="w-4 h-4" />
            {showHints ? 'Tipps ausblenden' : 'Tipps anzeigen'}
          </Button>
          {showHints && (
            <div className="mt-2 space-y-1">
              {scenario.hints.map((hint, i) => (
                <p key={i} className="text-sm text-muted-foreground pl-4 border-l-2 border-yellow-500/50">
                  {hint}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="outline" onClick={onReset} className="flex-1">
          Zurücksetzen
        </Button>
        {allComplete && (
          <Button onClick={onComplete} className="flex-1 bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Abschließen
          </Button>
        )}
      </div>
    </div>
  );
};
