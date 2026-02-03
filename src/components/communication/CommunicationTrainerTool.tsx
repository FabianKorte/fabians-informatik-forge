import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCommunicationTrainer } from '@/hooks/useCommunicationTrainer';
import { TheoryView } from './TheoryView';
import { ScenarioList } from './ScenarioList';
import { ExerciseView } from './ExerciseView';
import { BookOpen, MessageSquare, Users } from 'lucide-react';

export function CommunicationTrainerTool() {
  const {
    state,
    setActiveTab,
    startScenario,
    selectAnswer,
    nextExercise,
    closeScenario,
    getProgress,
    scenarios,
  } = useCommunicationTrainer();

  // If practicing a scenario, show the exercise view
  if (state.currentScenario && state.activeTab === 'practice') {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <ExerciseView
          scenario={state.currentScenario}
          exercise={state.currentExercise}
          userAnswers={state.userAnswers}
          completedExercises={state.completedExercises}
          showExplanation={state.showExplanation}
          onSelectAnswer={selectAnswer}
          onNext={nextExercise}
          onClose={closeScenario}
        />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Kommunikationstrainer
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Lerne das 4-Ohren-Modell nach Schulz von Thun. Verstehe, wie Nachrichten 
          auf verschiedenen Ebenen wirken und verbessere deine Kommunikationsfähigkeiten.
        </p>
      </div>

      <Tabs 
        value={state.activeTab === 'practice' ? 'scenarios' : state.activeTab} 
        onValueChange={(v) => setActiveTab(v as typeof state.activeTab)}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
          <TabsTrigger value="theory" className="gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Theorie</span>
          </TabsTrigger>
          <TabsTrigger value="scenarios" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Übungen</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="theory">
          <TheoryView />
        </TabsContent>

        <TabsContent value="scenarios">
          <ScenarioList
            scenarios={scenarios}
            completedScenarios={state.completedScenarios}
            earnedPoints={state.earnedPoints}
            progress={getProgress()}
            onSelectScenario={startScenario}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
