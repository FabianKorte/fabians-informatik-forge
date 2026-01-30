import { useOSIModel } from "@/hooks/useOSIModel";
import { OSILayerStack } from "./OSILayerStack";
import { DraggableItemsPanel } from "./DraggableItemsPanel";
import { DiagnosticExercise } from "./DiagnosticExercise";
import { QuizExercise } from "./QuizExercise";
import { TheoryView } from "./TheoryView";
import { LessonNavigator } from "./LessonNavigator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle, 
  Trophy,
  BookOpen,
  Puzzle,
  AlertTriangle,
  HelpCircle
} from "lucide-react";
import type { OSIExercise, DiagnosticScenario, OSIQuizQuestion } from "@/types/osiModel";
import { cn } from "@/lib/utils";

const getTypeIcon = (type: string) => {
  switch (type) {
    case "theory": return <BookOpen className="w-5 h-5" />;
    case "drag-drop": return <Puzzle className="w-5 h-5" />;
    case "diagnostic": return <AlertTriangle className="w-5 h-5" />;
    case "quiz": return <HelpCircle className="w-5 h-5" />;
    default: return <BookOpen className="w-5 h-5" />;
  }
};

export function OSIModelTool() {
  const {
    state,
    currentLesson,
    totalLessons,
    completedLessonIds,
    placeItem,
    answerDiagnostic,
    answerQuiz,
    submitLesson,
    nextLesson,
    previousLesson,
    goToLesson,
    resetLesson
  } = useOSIModel();

  if (!currentLesson) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Keine Lektion verfügbar</p>
      </div>
    );
  }

  // Check if all exercises are completed for submission
  const canSubmit = () => {
    if (state.showResults) return false;
    
    switch (currentLesson.type) {
      case "drag-drop": {
        const exercise = currentLesson.content as OSIExercise;
        return Object.keys(state.placements).length === exercise.items.length;
      }
      case "diagnostic": {
        const scenarios = currentLesson.content as DiagnosticScenario[];
        return scenarios.every(s => state.diagnosticAnswers[s.id]);
      }
      case "quiz": {
        const questions = currentLesson.content as OSIQuizQuestion[];
        return questions.every(q => state.quizAnswers[q.id] !== undefined);
      }
      case "theory":
        return true;
      default:
        return false;
    }
  };

  const progressPercent = ((state.currentLessonIndex + 1) / totalLessons) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            currentLesson.type === "theory" && "bg-blue-500/20 text-blue-500",
            currentLesson.type === "drag-drop" && "bg-green-500/20 text-green-500",
            currentLesson.type === "diagnostic" && "bg-yellow-500/20 text-yellow-500",
            currentLesson.type === "quiz" && "bg-purple-500/20 text-purple-500"
          )}>
            {getTypeIcon(currentLesson.type)}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
            <p className="text-muted-foreground">{currentLesson.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg px-3 py-1">
            <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
            {state.score} Punkte
          </Badge>
          <Badge variant="secondary">
            Lektion {state.currentLessonIndex + 1} / {totalLessons}
          </Badge>
        </div>
      </div>

      {/* Progress bar */}
      <Progress value={progressPercent} className="h-2" />

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Lesson Navigator (sidebar) */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <LessonNavigator
            currentIndex={state.currentLessonIndex}
            completedLessonIds={completedLessonIds}
            onNavigate={goToLesson}
          />
        </div>

        {/* Main lesson content */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          {/* Theory content */}
          {currentLesson.type === "theory" && (
            <TheoryView content={currentLesson.content as string} />
          )}

          {/* Drag & Drop exercise */}
          {currentLesson.type === "drag-drop" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DraggableItemsPanel
                items={(currentLesson.content as OSIExercise).items}
                placements={state.placements}
                onRemove={(itemId) => placeItem(itemId, null)}
                disabled={state.showResults}
              />
              <OSILayerStack
                placements={state.placements}
                items={(currentLesson.content as OSIExercise).items}
                onDrop={placeItem}
                feedback={state.feedback}
                showResults={state.showResults}
                disabled={state.showResults}
              />
            </div>
          )}

          {/* Diagnostic exercise */}
          {currentLesson.type === "diagnostic" && (
            <DiagnosticExercise
              scenarios={currentLesson.content as DiagnosticScenario[]}
              answers={state.diagnosticAnswers}
              onAnswer={answerDiagnostic}
              feedback={state.feedback}
              showResults={state.showResults}
              disabled={state.showResults}
            />
          )}

          {/* Quiz exercise */}
          {currentLesson.type === "quiz" && (
            <QuizExercise
              questions={currentLesson.content as OSIQuizQuestion[]}
              answers={state.quizAnswers}
              onAnswer={answerQuiz}
              feedback={state.feedback}
              showResults={state.showResults}
              disabled={state.showResults}
            />
          )}

          {/* Theory info card for exercises */}
          {currentLesson.type === "drag-drop" && (currentLesson.content as OSIExercise).theory && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Theorie & Tipps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {(currentLesson.content as OSIExercise).theory}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t">
            <Button
              variant="outline"
              onClick={previousLesson}
              disabled={state.currentLessonIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Zurück
            </Button>

            <div className="flex items-center gap-2">
              {state.showResults ? (
                <>
                  <Button variant="outline" onClick={resetLesson}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Wiederholen
                  </Button>
                  <Button onClick={nextLesson}>
                    {state.currentLessonIndex < totalLessons - 1 ? (
                      <>
                        Weiter
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        <Trophy className="w-4 h-4 mr-2" />
                        Abschließen
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={submitLesson}
                  disabled={!canSubmit()}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {currentLesson.type === "theory" ? "Gelesen" : "Überprüfen"}
                </Button>
              )}
            </div>
          </div>

          {/* Completion message */}
          {state.isCompleted && (
            <Card className="mt-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Glückwunsch!</h3>
                  <p className="text-muted-foreground mb-4">
                    Du hast alle OSI-Modell Lektionen abgeschlossen!
                  </p>
                  <p className="text-xl font-bold text-primary">
                    Gesamtpunktzahl: {state.score} Punkte
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
