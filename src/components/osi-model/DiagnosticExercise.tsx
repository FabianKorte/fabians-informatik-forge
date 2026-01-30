import { cn } from "@/lib/utils";
import type { DiagnosticScenario } from "@/types/osiModel";
import { getLayerByNumber } from "@/types/osiModel";
import { AlertTriangle, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface DiagnosticExerciseProps {
  scenarios: DiagnosticScenario[];
  answers: Record<string, string>;
  onAnswer: (scenarioId: string, answer: string) => void;
  feedback: Record<string, boolean>;
  showResults: boolean;
  disabled?: boolean;
}

export function DiagnosticExercise({
  scenarios,
  answers,
  onAnswer,
  feedback,
  showResults,
  disabled = false
}: DiagnosticExerciseProps) {
  const [expandedExplanations, setExpandedExplanations] = useState<Set<string>>(new Set());

  const toggleExplanation = (id: string) => {
    setExpandedExplanations(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold">Fehlerdiagnose</h3>
        <p className="text-muted-foreground">
          Analysiere die Symptome und ordne das Problem der korrekten OSI-Schicht zu.
        </p>
      </div>

      {scenarios.map((scenario, index) => {
        const answer = answers[scenario.id];
        const isCorrect = feedback[scenario.id];
        const layer = getLayerByNumber(scenario.affectedLayer);
        const showFeedback = showResults && feedback[scenario.id] !== undefined;

        return (
          <Card 
            key={scenario.id}
            className={cn(
              "transition-all",
              showFeedback && isCorrect && "border-green-500 bg-green-500/5",
              showFeedback && !isCorrect && "border-red-500 bg-red-500/5"
            )}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    Szenario {index + 1}: {scenario.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {scenario.description}
                  </CardDescription>
                </div>
                <span className="px-2 py-1 bg-muted rounded text-xs font-medium">
                  {scenario.points} Punkte
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Symptom */}
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-1">Symptom:</p>
                <p className="text-sm font-mono">{scenario.symptom}</p>
              </div>

              {/* Options */}
              <RadioGroup
                value={answer || ""}
                onValueChange={(value) => onAnswer(scenario.id, value)}
                disabled={disabled || showResults}
                className="space-y-2"
              >
                {scenario.options.map((option, optIdx) => (
                  <div 
                    key={optIdx}
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-lg border transition-all",
                      answer === option && !showResults && "border-primary bg-primary/5",
                      showResults && option === scenario.correctDiagnosis && "border-green-500 bg-green-500/10",
                      showResults && answer === option && option !== scenario.correctDiagnosis && "border-red-500 bg-red-500/10"
                    )}
                  >
                    <RadioGroupItem value={option} id={`${scenario.id}-${optIdx}`} />
                    <Label 
                      htmlFor={`${scenario.id}-${optIdx}`}
                      className="flex-1 cursor-pointer"
                    >
                      {option}
                    </Label>
                    {showResults && option === scenario.correctDiagnosis && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {showResults && answer === option && option !== scenario.correctDiagnosis && (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                ))}
              </RadioGroup>

              {/* Explanation (shown after results) */}
              {showResults && (
                <div className="mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExplanation(scenario.id)}
                    className="flex items-center gap-2"
                  >
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    {expandedExplanations.has(scenario.id) ? "Erklärung ausblenden" : "Erklärung anzeigen"}
                  </Button>
                  
                  {expandedExplanations.has(scenario.id) && (
                    <div className="mt-2 p-4 bg-muted rounded-lg">
                      <p className="text-sm">{scenario.explanation}</p>
                      {layer && (
                        <p className="text-sm mt-2 text-muted-foreground">
                          <strong>Betroffene Schicht:</strong> {layer.number} - {layer.germanName} ({layer.name})
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
