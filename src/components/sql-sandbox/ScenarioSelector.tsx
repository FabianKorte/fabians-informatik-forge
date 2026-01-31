import type { SQLScenario } from '@/types/sqlSandbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, ArrowRight, CheckCircle } from 'lucide-react';

interface ScenarioSelectorProps {
  scenarios: SQLScenario[];
  completedExercises: string[];
  onSelect: (scenario: SQLScenario) => void;
}

export function ScenarioSelector({ scenarios, completedExercises, onSelect }: ScenarioSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">SQL-Sandbox</h2>
        <p className="text-muted-foreground">
          Wähle ein Szenario und lerne SQL mit echten Datenbankstrukturen
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {scenarios.map(scenario => {
          const completedCount = scenario.exercises.filter(e => 
            completedExercises.includes(e.id)
          ).length;
          const totalCount = scenario.exercises.length;
          const isComplete = completedCount === totalCount;

          return (
            <Card 
              key={scenario.id}
              className={`cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg ${
                isComplete ? 'border-green-500/30' : ''
              }`}
              onClick={() => onSelect(scenario)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Database className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {scenario.title}
                        {isComplete && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {scenario.erModel.tables.length} Tabellen
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={isComplete ? 'default' : 'secondary'}>
                    {completedCount}/{totalCount}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {scenario.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {scenario.erModel.tables.map(table => (
                    <Badge key={table.name} variant="outline" className="text-xs font-mono">
                      {table.name}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full" variant={isComplete ? 'outline' : 'default'}>
                  {isComplete ? 'Wiederholen' : 'Starten'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
