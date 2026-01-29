import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CPMScenario, CPMObjective } from '@/types/cpmTool';
import { cn } from '@/lib/utils';
import { BookOpen, CheckCircle2, Circle, Lightbulb, Trophy, RotateCcw, Eye, EyeOff } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface CPMScenarioPanelProps {
  scenario: CPMScenario;
  completedObjectives: string[];
  showSolution: boolean;
  onShowSolution: () => void;
  onHideSolution: () => void;
  onComplete: () => void;
  onReset: () => void;
}

export const CPMScenarioPanel: React.FC<CPMScenarioPanelProps> = ({
  scenario,
  completedObjectives,
  showSolution,
  onShowSolution,
  onHideSolution,
  onComplete,
  onReset
}) => {
  const completedCount = completedObjectives.length;
  const totalObjectives = scenario.objectives.length;
  const progressPercent = (completedCount / totalObjectives) * 100;
  const allCompleted = completedCount === totalObjectives;

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{scenario.title}</CardTitle>
              <p className="text-muted-foreground mt-1">{scenario.description}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge 
                variant={scenario.difficulty === 'leicht' ? 'secondary' : scenario.difficulty === 'mittel' ? 'default' : 'destructive'}
              >
                {scenario.difficulty}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Trophy className="w-4 h-4" />
                <span>{scenario.points} XP</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Fortschritt</span>
              <span>{completedCount} / {totalObjectives} Aufgaben</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Theorie */}
      {scenario.theory && (
        <Accordion type="single" collapsible defaultValue="theory">
          <AccordionItem value="theory" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="font-medium">{scenario.theory.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{scenario.theory.content}</ReactMarkdown>
              </div>
              {scenario.theory.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {scenario.theory.keywords.map(keyword => (
                    <Badge key={keyword} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {/* Objectives */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Aufgaben
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {scenario.objectives.map((objective, index) => {
            const isCompleted = completedObjectives.includes(objective.id);
            
            return (
              <div 
                key={objective.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border transition-colors",
                  isCompleted ? "bg-green-500/10 border-green-500/30" : "bg-muted/30"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="text-sm font-medium">
                    {index + 1}. {objective.description}
                  </span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Hints */}
      {scenario.hints.length > 0 && (
        <Accordion type="single" collapsible>
          <AccordionItem value="hints" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">Hinweise ({scenario.hints.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <ul className="space-y-2">
                {scenario.hints.map((hint, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary font-medium">{index + 1}.</span>
                    <span>{hint}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={showSolution ? onHideSolution : onShowSolution}
        >
          {showSolution ? (
            <>
              <EyeOff className="w-4 h-4 mr-2" />
              Lösung verbergen
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Lösung anzeigen
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Zurücksetzen
        </Button>
        
        <Button
          size="sm"
          onClick={onComplete}
          disabled={!allCompleted}
          className={cn(allCompleted && "bg-green-600 hover:bg-green-700")}
        >
          <Trophy className="w-4 h-4 mr-2" />
          Abschließen
        </Button>
      </div>
    </div>
  );
};
