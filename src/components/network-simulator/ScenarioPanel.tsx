import React from 'react';
import { NetworkScenario } from '@/types/networkSimulator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, Circle, Clock, Star, Lightbulb, Play, BookOpen, GraduationCap } from 'lucide-react';
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

  // Group scenarios by category
  const lessons = scenarios.filter(s => s.id.startsWith('lesson-'));
  const challenges = scenarios.filter(s => s.id.startsWith('challenge-'));

  return (
    <div className="space-y-8">
      {/* Lessons Section */}
      {lessons.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Lernlektionen</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {lessons.map((scenario, index) => (
              <Card 
                key={scenario.id} 
                className="hover:border-primary/50 transition-all cursor-pointer group"
                onClick={() => onSelect(scenario)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                      <CardTitle className="text-base group-hover:text-primary transition-colors">
                        {scenario.title}
                      </CardTitle>
                    </div>
                    <Badge className={cn("text-xs", difficultyColors[scenario.difficulty])}>
                      {scenario.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="ml-10">{scenario.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between ml-10">
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
        </div>
      )}

      {/* Challenges Section */}
      {challenges.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-destructive" />
            <h3 className="text-lg font-semibold">Prüfungsaufgaben</h3>
          </div>
          <div className="grid gap-4">
            {challenges.map(scenario => (
              <Card 
                key={scenario.id} 
                className="hover:border-destructive/50 transition-all cursor-pointer group border-destructive/20 bg-gradient-to-br from-destructive/5 to-transparent"
                onClick={() => onSelect(scenario)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg group-hover:text-destructive transition-colors">
                      🎓 {scenario.title}
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
                        <span className="font-semibold text-yellow-600">{scenario.points} Punkte</span>
                      </div>
                      {scenario.timeLimit && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{Math.floor(scenario.timeLimit / 60)} Min.</span>
                        </div>
                      )}
                    </div>
                    <Button size="sm" className="bg-destructive hover:bg-destructive/90">
                      <Play className="w-4 h-4 mr-1" />
                      Prüfung starten
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
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
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            {scenario.category && (
              <Badge variant="outline" className="text-xs">
                {scenario.category}
              </Badge>
            )}
            <Badge variant="outline" className="gap-1">
              <Star className="w-3 h-3 text-yellow-500" />
              {scenario.points} Punkte
            </Badge>
          </div>
          <h3 className="font-semibold text-lg">{scenario.title}</h3>
          <p className="text-sm text-muted-foreground">{scenario.description}</p>
        </div>

        {/* Theory Section */}
        {scenario.theory && (
          <Accordion type="single" collapsible defaultValue="theory">
            <AccordionItem value="theory" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="font-medium">📚 {scenario.theory.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="text-sm whitespace-pre-line bg-muted/50 rounded-lg p-4">
                    {scenario.theory.content}
                  </div>
                  {scenario.theory.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {scenario.theory.keywords.map((keyword, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Fortschritt</span>
            <span className="text-muted-foreground">{completedObjectives.length}/{scenario.objectives.length} Schritte</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Objectives */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <span>📋 Aufgaben:</span>
          </h4>
          <div className="space-y-2">
            {scenario.objectives.map((obj, index) => {
              const completed = completedObjectives.includes(obj.id);
              const isNextStep = !completed && 
                scenario.objectives.slice(0, index).every(o => completedObjectives.includes(o.id));
              
              return (
                <div
                  key={obj.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg text-sm transition-all",
                    completed 
                      ? "bg-green-500/10 text-green-600 dark:text-green-400" 
                      : isNextStep
                        ? "bg-primary/10 border-2 border-primary/30 animate-pulse"
                        : "bg-muted/50 text-muted-foreground"
                  )}
                >
                  <div className="mt-0.5">
                    {completed ? (
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <Circle className={cn("w-5 h-5 flex-shrink-0", isNextStep && "text-primary")} />
                    )}
                  </div>
                  <span className={cn(
                    completed && "line-through opacity-70",
                    isNextStep && "font-medium text-foreground"
                  )}>
                    {obj.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hints */}
        {scenario.hints.length > 0 && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHints(!showHints)}
              className="gap-2"
            >
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              {showHints ? 'Tipps ausblenden' : 'Tipps anzeigen'}
            </Button>
            {showHints && (
              <div className="mt-2 space-y-2 p-3 bg-yellow-500/10 rounded-lg">
                {scenario.hints.map((hint, i) => (
                  <p key={i} className="text-sm text-yellow-700 dark:text-yellow-300">
                    {hint}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-4">
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
    </ScrollArea>
  );
};
