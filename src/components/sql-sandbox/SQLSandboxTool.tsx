import { useSQLSandbox } from '@/hooks/useSQLSandbox';
import { ScenarioSelector } from './ScenarioSelector';
import { ERDiagram } from './ERDiagram';
import { SQLEditor } from './SQLEditor';
import { QueryResults } from './QueryResults';
import { ExercisePanel } from './ExercisePanel';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Database, TableIcon, RotateCcw } from 'lucide-react';

export function SQLSandboxTool() {
  const {
    scenarios,
    currentScenario,
    currentExercise,
    currentExerciseIndex,
    userQuery,
    queryResult,
    completedExercises,
    showHint,
    showTheory,
    isCurrentExerciseCompleted,
    selectScenario,
    setExerciseIndex,
    setUserQuery,
    executeQuery,
    checkSolution,
    toggleHint,
    toggleTheory,
    nextExercise,
    resetProgress,
  } = useSQLSandbox();

  // Scenario selection screen
  if (!currentScenario) {
    return (
      <div className="container max-w-5xl py-8">
        <ScenarioSelector
          scenarios={scenarios}
          completedExercises={completedExercises}
          onSelect={selectScenario}
        />
        
        {completedExercises.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="ghost" size="sm" onClick={resetProgress}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Fortschritt zurücksetzen
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container max-w-7xl py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => selectScenario(null as any)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück
        </Button>
        <h1 className="text-xl font-bold">{currentScenario.title}</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Exercise Panel */}
        <div className="lg:col-span-1 space-y-4">
          {currentExercise && (
            <ExercisePanel
              scenario={currentScenario}
              exercise={currentExercise}
              exerciseIndex={currentExerciseIndex}
              completedExercises={completedExercises}
              showHint={showHint}
              showTheory={showTheory}
              onToggleHint={toggleHint}
              onToggleTheory={toggleTheory}
              onCheckSolution={checkSolution}
              onNextExercise={nextExercise}
              onSelectExercise={setExerciseIndex}
              isCompleted={isCurrentExerciseCompleted}
            />
          )}
        </div>

        {/* Right Column: Editor & Results */}
        <div className="lg:col-span-2 space-y-4">
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="editor" className="flex items-center gap-2">
                <TableIcon className="h-4 w-4" />
                SQL Editor
              </TabsTrigger>
              <TabsTrigger value="schema" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Datenbankschema
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="space-y-4 mt-4">
              <SQLEditor
                value={userQuery}
                onChange={setUserQuery}
                onExecute={executeQuery}
              />
              <QueryResults result={queryResult} />
            </TabsContent>
            
            <TabsContent value="schema" className="mt-4">
              <ERDiagram erModel={currentScenario.erModel} />
              
              {/* Sample Data Preview */}
              <div className="mt-6 space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground">Beispieldaten</h3>
                {currentScenario.erModel.tables.map(table => (
                  <div key={table.name} className="space-y-2">
                    <h4 className="text-sm font-mono text-primary">{table.name}</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border">
                        <thead>
                          <tr className="bg-muted">
                            {table.columns.map(col => (
                              <th key={col.name} className="px-2 py-1 text-left font-mono border">
                                {col.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {table.data.slice(0, 3).map((row, idx) => (
                            <tr key={idx}>
                              {table.columns.map(col => (
                                <td key={col.name} className="px-2 py-1 font-mono border">
                                  {String(row[col.name] ?? '')}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {table.data.length > 3 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          ... und {table.data.length - 3} weitere Zeilen
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
