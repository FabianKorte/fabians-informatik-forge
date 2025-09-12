import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { QuizQuestion } from "@/types/learn";

interface QuizProps {
  questions: QuizQuestion[];
}

export const Quiz = ({ questions }: QuizProps) => {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const q = questions[qIndex];
  const isAnswered = selected !== null;
  const isCorrect = isAnswered && selected === q.correctIndex;

  const handleSelect = (i: number) => {
    if (isAnswered) return;
    setSelected(i);
    if (i === q.correctIndex) setScore((s) => s + 1);
  };

  const next = () => {
    setSelected(null);
    setQIndex((idx) => (idx + 1 < questions.length ? idx + 1 : idx));
  };

  const finished = qIndex === questions.length - 1 && isAnswered;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">{q.question}</h3>
        <div className="grid gap-3">
          {q.options.map((opt, i) => {
            const state = isAnswered
              ? i === q.correctIndex
                ? "success"
                : i === selected
                ? "destructive"
                : "secondary"
              : "secondary";
            return (
              <Button
                key={i}
                onClick={() => handleSelect(i)}
                variant={state === "secondary" ? "outline" : "default"}
                className={
                  state === "success"
                    ? "border-success text-success"
                    : state === "destructive"
                    ? "border-destructive text-destructive"
                    : ""
                }
              >
                {opt}
              </Button>
            );
          })}
        </div>
        {isAnswered && (
          <div className="mt-4 text-sm">
            <p className={isCorrect ? "text-success" : "text-destructive"}>
              {isCorrect ? "Richtig!" : "Leider falsch."}
            </p>
            {q.explanation && (
              <p className="text-muted-foreground mt-1">{q.explanation}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Frage {qIndex + 1} / {questions.length}
        </p>
        {!finished ? (
          <Button onClick={next} disabled={!isAnswered}>
            Weiter
          </Button>
        ) : (
          <p className="text-sm font-medium text-foreground">
            Ergebnis: {score} / {questions.length}
          </p>
        )}
      </div>
    </div>
  );
};
