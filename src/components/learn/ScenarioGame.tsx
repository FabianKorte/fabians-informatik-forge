import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { InteractiveScenario } from "@/types/learn";

interface ScenarioGameProps {
  scenarios: InteractiveScenario[];
}

export const ScenarioGame = ({ scenarios }: ScenarioGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const current = scenarios[currentIndex];

  const handleChoice = (choiceIndex: number) => {
    setSelectedChoice(choiceIndex);
    setShowResult(true);
    if (current.choices[choiceIndex].isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const next = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedChoice(null);
      setShowResult(false);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedChoice(null);
      setShowResult(false);
    }
  };

  const reset = () => {
    setCurrentIndex(0);
    setSelectedChoice(null);
    setShowResult(false);
    setScore(0);
  };

  const isLastScenario = currentIndex === scenarios.length - 1;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">{current.title}</h3>
          <Badge variant="outline" className="text-xs">
            {currentIndex + 1} / {scenarios.length}
          </Badge>
        </div>
        
        <p className="text-muted-foreground mb-6">{current.description}</p>
        
        {/* Scenario */}
        <div className="p-6 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 mb-6">
          <h4 className="font-medium text-foreground mb-3">Szenario:</h4>
          <p className="text-foreground leading-relaxed">{current.scenario}</p>
        </div>
        
        {/* Choices */}
        <div className="space-y-3 mb-6">
          <h4 className="font-medium text-foreground">Was würdest du tun?</h4>
          <div className="grid gap-3">
            {current.choices.map((choice, index) => {
              let buttonVariant: "default" | "outline" | "destructive" = "outline";
              let buttonClass = "";
              
              if (showResult && selectedChoice === index) {
                if (choice.isCorrect) {
                  buttonClass = "border-success text-success-foreground bg-success/10";
                } else {
                  buttonClass = "border-destructive text-destructive-foreground bg-destructive/10";
                }
              } else if (showResult && choice.isCorrect) {
                buttonClass = "border-success text-success-foreground bg-success/5";
              }
              
              return (
                <Button
                  key={`choice-${currentIndex}-${index}-${choice.text.substring(0, 20)}`}
                  variant={buttonVariant}
                  onClick={() => !showResult && handleChoice(index)}
                  disabled={showResult}
                  className={`text-left justify-start h-auto p-4 whitespace-normal ${buttonClass}`}
                >
                  <span className="mr-3 font-bold">{String.fromCharCode(65 + index)})</span>
                  {choice.text}
                </Button>
              );
            })}
          </div>
        </div>
        
        {/* Result */}
        {showResult && selectedChoice !== null && (
          <div className="p-4 rounded-lg bg-secondary border border-border">
            <div className="flex items-start gap-3">
              <Badge variant={current.choices[selectedChoice].isCorrect ? "default" : "destructive"}>
                {current.choices[selectedChoice].isCorrect ? "Richtig!" : "Nicht optimal"}
              </Badge>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  {current.choices[selectedChoice].consequence}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {isLastScenario && showResult && (
          <div className="mt-6 text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 className="font-semibold text-foreground mb-2">Scenario-Training abgeschlossen!</h4>
            <p className="text-muted-foreground mb-4">
              Du hast {score} von {scenarios.length} Szenarien richtig gelöst.
            </p>
            <Button onClick={reset} variant="outline">
              Nochmal spielen
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={prev} disabled={currentIndex === 0}>
          Vorheriges
        </Button>
        <span className="text-sm text-muted-foreground">
          Szenario {currentIndex + 1} von {scenarios.length}
        </span>
        {!isLastScenario ? (
          <Button onClick={next} disabled={!showResult}>
            Nächstes
          </Button>
        ) : showResult ? (
          <Button onClick={reset}>
            Neustart
          </Button>
        ) : (
          <Button disabled>
            Nächstes
          </Button>
        )}
      </div>
    </div>
  );
};