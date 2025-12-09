import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import type { QuizQuestion } from "@/types/learn";

interface QuizProps {
  questions: QuizQuestion[];
}

export const Quiz = ({ questions }: QuizProps) => {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(new Array(questions?.length || 0).fill(false));

  // Guard against empty or invalid questions array
  if (!questions || questions.length === 0) {
    return (
      <div className="rounded-xl border border-border p-6 text-center text-muted-foreground">
        Keine Quizfragen verfügbar.
      </div>
    );
  }

  const q = questions[qIndex];
  
  // Guard against undefined question
  if (!q) {
    return (
      <div className="rounded-xl border border-border p-6 text-center text-muted-foreground">
        Frage konnte nicht geladen werden.
      </div>
    );
  }

  const isAnswered = selected !== null;
  const isCorrect = isAnswered && selected === q.correctIndex;
  
  const totalAnswered = useMemo(() => answered.filter(Boolean).length, [answered]);
  const finished = useMemo(() => qIndex === questions.length - 1 && isAnswered, [qIndex, questions.length, isAnswered]);
  const handleSelect = (i: number) => {
    if (isAnswered) return;
    setSelected(i);
    const newAnswered = [...answered];
    newAnswered[qIndex] = true;
    setAnswered(newAnswered);
    if (i === q.correctIndex) setScore((s) => s + 1);
  };

  const next = () => {
    setSelected(null);
    setQIndex((idx) => (idx + 1 < questions.length ? idx + 1 : idx));
  };

  const prev = () => {
    setSelected(null);
    setQIndex((idx) => (idx - 1 >= 0 ? idx - 1 : idx));
  };

  const restart = () => {
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setAnswered(new Array(questions.length).fill(false));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">{q.question}</h3>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Score: {score}/{totalAnswered}</span>
          </div>
        </div>
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
                key={`${qIndex}-${i}-${opt.substring(0, 20)}`}
                onClick={() => handleSelect(i)}
                variant={state === "secondary" ? "outline" : "default"}
                className={`h-auto text-left justify-start whitespace-normal break-words py-3 ${
                  state === "success"
                    ? "border-success text-success-foreground bg-success/10 hover:bg-success/20"
                    : state === "destructive"
                    ? "border-destructive text-destructive-foreground bg-destructive/10 hover:bg-destructive/20"
                    : ""
                }`}
                disabled={isAnswered}
              >
                {opt}
                {isAnswered && i === q.correctIndex && (
                  <span className="ml-2">✓</span>
                )}
                {isAnswered && i === selected && i !== q.correctIndex && (
                  <span className="ml-2">✗</span>
                )}
              </Button>
            );
          })}
        </div>
        {isAnswered && (
          <div className="mt-4 p-4 rounded-lg bg-secondary/50">
            <p className={`font-medium mb-2 ${isCorrect ? "text-success-foreground" : "text-destructive-foreground"}`}>
              {isCorrect ? "🎉 Richtig!" : "❌ Leider falsch."}
            </p>
            {q.explanation && (
              <p className="text-muted-foreground text-sm leading-relaxed">
                <strong>Erklärung:</strong> {q.explanation}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={prev} disabled={qIndex === 0} size="sm">
            ← Zurück
          </Button>
          {finished && (
            <Button onClick={restart} variant="outline" size="sm">
              Nochmal
            </Button>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">
            Frage {qIndex + 1} / {questions.length}
          </p>
          {finished && (
            <p className="text-sm font-medium">
              Endergebnis: {score} / {questions.length} ({Math.round((score/questions.length)*100)}%)
            </p>
          )}
        </div>

        <Button onClick={next} disabled={!isAnswered || finished} size="sm">
          {finished ? "Fertig" : "Weiter →"}
        </Button>
      </div>
    </div>
  );
};
