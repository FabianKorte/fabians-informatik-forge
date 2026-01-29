import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCPMTool } from '@/hooks/useCPMTool';
import { CPMNetworkTable } from './CPMNetworkTable';
import { CPMNetworkGraph } from './CPMNetworkGraph';
import { CPMScenarioPanel } from './CPMScenarioPanel';
import { ArrowLeft, Network, Calculator, Trophy, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProjectDuration } from '@/types/cpmTool';

export const CPMTool: React.FC = () => {
  const {
    state,
    scenarios,
    getCalculatedActivities,
    loadScenario,
    updateUserInput,
    setProjectDuration,
    toggleCriticalMark,
    showSolution,
    hideSolution,
    completeScenario,
    resetScenario
  } = useCPMTool();

  const [projectDurationInput, setProjectDurationInput] = useState<string>('');

  const calculatedActivities = getCalculatedActivities();
  const actualProjectDuration = calculatedActivities.length > 0 
    ? getProjectDuration(calculatedActivities) 
    : null;

  const handleProjectDurationChange = (value: string) => {
    setProjectDurationInput(value);
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setProjectDuration(num);
    }
  };

  // Scenario Selection View
  if (!state.currentScenario) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Netzplantechnik (CPM)</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Lerne die Critical Path Method – eine wichtige Methode zur Projektplanung für die IHK-Prüfung.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {scenarios.map((scenario, index) => (
            <Card 
              key={scenario.id}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => loadScenario(scenario.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{scenario.title}</CardTitle>
                      <CardDescription>{scenario.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Badge 
                    variant={
                      scenario.difficulty === 'leicht' ? 'secondary' : 
                      scenario.difficulty === 'mittel' ? 'default' : 'destructive'
                    }
                  >
                    {scenario.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Trophy className="w-4 h-4" />
                    <span>{scenario.points} XP</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calculator className="w-4 h-4" />
                    <span>{scenario.project.activities.length} Vorgänge</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Kurze Einführung */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <BookOpen className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Was ist die Netzplantechnik?</h3>
                <p className="text-sm text-muted-foreground">
                  Die Netzplantechnik (Critical Path Method) ist ein Werkzeug zur Projektplanung. 
                  Du lernst, wie du die <strong>frühesten</strong> und <strong>spätesten</strong> Zeitpunkte 
                  für Projektvorgänge berechnest und den <strong>kritischen Pfad</strong> identifizierst – 
                  ein häufiges Thema in der IHK-Prüfung für Fachinformatiker!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Active Scenario View
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => loadScenario('')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{state.currentScenario.title}</h1>
          <p className="text-muted-foreground">{state.currentScenario.project.name}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Panel - Scenario Info */}
        <div className="lg:col-span-1">
          <CPMScenarioPanel
            scenario={state.currentScenario}
            completedObjectives={state.completedObjectives}
            showSolution={state.showSolution}
            onShowSolution={showSolution}
            onHideSolution={hideSolution}
            onComplete={completeScenario}
            onReset={resetScenario}
          />
        </div>

        {/* Right Panel - Interactive Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Network Graph */}
          <CPMNetworkGraph
            activities={state.currentScenario.project.activities}
            calculatedActivities={calculatedActivities}
            markedCritical={state.markedCritical}
            showSolution={state.showSolution}
          />

          {/* Network Table */}
          <CPMNetworkTable
            activities={state.currentScenario.project.activities}
            calculatedActivities={calculatedActivities}
            userInputs={state.userInputs}
            markedCritical={state.markedCritical}
            showSolution={state.showSolution}
            onUpdateInput={updateUserInput}
            onToggleCritical={toggleCriticalMark}
          />

          {/* Project Duration Input */}
          {state.currentScenario.objectives.some(o => o.type === 'identify-duration') && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Projektgesamtdauer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex-1 max-w-xs">
                    <Label htmlFor="project-duration">Gesamtdauer in Tagen</Label>
                    <Input
                      id="project-duration"
                      type="number"
                      min="0"
                      value={projectDurationInput}
                      onChange={(e) => handleProjectDurationChange(e.target.value)}
                      placeholder="?"
                      className={cn(
                        "mt-1",
                        actualProjectDuration !== null && 
                        parseInt(projectDurationInput) === actualProjectDuration && 
                        "border-green-500 bg-green-500/10"
                      )}
                    />
                  </div>
                  {state.showSolution && actualProjectDuration !== null && (
                    <div className="text-sm text-muted-foreground">
                      Lösung: <Badge variant="secondary">{actualProjectDuration} Tage</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
