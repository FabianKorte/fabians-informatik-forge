import { cn } from "@/lib/utils";
import type { OSIQuizQuestion } from "@/types/osiModel";
import { getLayerByNumber } from "@/types/osiModel";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuizExerciseProps {
  questions: OSIQuizQuestion[];
  answers: Record<string, number>;
  onAnswer: (questionId: string, answerIndex: number) => void;
  feedback: Record<string, boolean>;
  showResults: boolean;
  disabled?: boolean;
}

export function QuizExercise({
  questions,
  answers,
  onAnswer,
  feedback,
  showResults,
  disabled = false
}: QuizExerciseProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold">IHK-Wissenstest</h3>
        <p className="text-muted-foreground">
          Beantworte die Fragen zu den OSI-Schichten. 20 Punkte pro richtiger Antwort.
        </p>
      </div>

      {questions.map((question, index) => {
        const answer = answers[question.id];
        const isCorrect = feedback[question.id];
        const showFeedback = showResults && feedback[question.id] !== undefined;
        const layer = question.relatedLayer ? getLayerByNumber(question.relatedLayer) : null;

        return (
          <Card 
            key={question.id}
            className={cn(
              "transition-all",
              showFeedback && isCorrect && "border-green-500 bg-green-500/5",
              showFeedback && !isCorrect && "border-red-500 bg-red-500/5"
            )}
          >
            <CardHeader>
              <CardTitle className="flex items-start gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold shrink-0">
                  {index + 1}
                </span>
                <span className="text-base font-medium">{question.question}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={answer?.toString() || ""}
                onValueChange={(value) => onAnswer(question.id, parseInt(value))}
                disabled={disabled || showResults}
                className="space-y-2"
              >
                {question.options.map((option, optIdx) => (
                  <div 
                    key={optIdx}
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-lg border transition-all",
                      answer === optIdx && !showResults && "border-primary bg-primary/5",
                      showResults && optIdx === question.correctIndex && "border-green-500 bg-green-500/10",
                      showResults && answer === optIdx && optIdx !== question.correctIndex && "border-red-500 bg-red-500/10"
                    )}
                  >
                    <RadioGroupItem value={optIdx.toString()} id={`${question.id}-${optIdx}`} />
                    <Label 
                      htmlFor={`${question.id}-${optIdx}`}
                      className="flex-1 cursor-pointer"
                    >
                      {option}
                    </Label>
                    {showResults && optIdx === question.correctIndex && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {showResults && answer === optIdx && optIdx !== question.correctIndex && (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                ))}
              </RadioGroup>

              {/* Explanation (shown after results) */}
              {showResults && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm">{question.explanation}</p>
                      {layer && (
                        <p className="text-xs mt-2 text-muted-foreground">
                          Bezogen auf: Schicht {layer.number} - {layer.germanName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
