import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { MatchingPair } from "@/types/learn";

interface MatchingProps {
  pairs: MatchingPair[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const Matching = ({ pairs }: MatchingProps) => {
  const left = useMemo(() => shuffle(pairs.map((p) => p.left)), [pairs]);
  const right = useMemo(() => shuffle(pairs.map((p) => p.right)), [pairs]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const isMatchedLeft = (l: string) => Object.keys(matches).includes(l);
  const isMatchedRight = (r: string) => Object.values(matches).includes(r);

  const selectRight = (r: string) => {
    if (!selectedLeft) return;
    const newMatches = { ...matches };
    newMatches[selectedLeft] = r;
    setMatches(newMatches);
    setSelectedLeft(null);
    
    // Show results when all pairs are matched
    if (Object.keys(newMatches).length === pairs.length) {
      setShowResults(true);
    }
  };

  const solved = Object.keys(matches).length === pairs.length;
  const correctCount = Object.entries(matches).filter(([l, r]) => {
    const correct = pairs.find((p) => p.left === l)?.right;
    return correct === r;
  }).length;

  const isCorrectMatch = (left: string) => {
    const userMatch = matches[left];
    const correctMatch = pairs.find((p) => p.left === left)?.right;
    return userMatch === correctMatch;
  };

  const reset = () => {
    setMatches({});
    setShowResults(false);
    setSelectedLeft(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-4">
          <h4 className="font-medium text-foreground mb-3">Begriffe</h4>
          <div className="grid gap-2">
            {left.map((l) => {
              const isMatched = isMatchedLeft(l);
              const isCorrect = showResults && isCorrectMatch(l);
              const isSelected = selectedLeft === l;
              
              return (
                <button
                  key={l}
                  onClick={() => !isMatched && setSelectedLeft(l)}
                  className={cn(
                    "text-left rounded-lg border px-3 py-2 transition-colors",
                    isSelected && "border-primary text-primary bg-primary/10",
                    isMatched && !showResults && "border-border/60 bg-background opacity-60 cursor-default",
                    showResults && isMatched && isCorrect && "border-success text-success bg-success/10",
                    showResults && isMatched && !isCorrect && "border-destructive text-destructive bg-destructive/10",
                    !isMatched && !isSelected && "border-border/60 bg-background hover:border-primary/50"
                  )}
                  disabled={isMatched}
                >
                  {l}
                  {showResults && isMatched && (
                    <span className="ml-2">
                      {isCorrect ? "✓" : "✗"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <h4 className="font-medium text-foreground mb-3">Zuordnungen</h4>
          <div className="grid gap-2">
            {right.map((r) => (
              <button
                key={r}
                onClick={() => !isMatchedRight(r) && selectRight(r)}
                className={cn(
                  "text-left rounded-lg border border-border/60 bg-background px-3 py-2 transition-colors hover:border-primary/50",
                  isMatchedRight(r) && "opacity-60 cursor-default"
                )}
                disabled={isMatchedRight(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {showResults ? (
            <div>
              <p className="font-medium">Ergebnis: {correctCount} / {pairs.length} richtig</p>
              {correctCount === pairs.length ? (
                <p className="text-success">Perfekt! Alle Zuordnungen sind korrekt! 🎉</p>
              ) : (
                <p className="text-orange-600">Versuche es nochmal für ein besseres Ergebnis.</p>
              )}
            </div>
          ) : (
            <p>Zuordnungen: {Object.keys(matches).length} / {pairs.length}</p>
          )}
        </div>
        {showResults && (
          <Button onClick={reset} variant="outline">
            Nochmal versuchen
          </Button>
        )}
      </div>

      {showResults && (
        <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-border/50">
          <h4 className="font-medium text-foreground mb-2">Erklärungen</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {pairs.map((p) => (
              <li key={p.left}>
                <span className="font-semibold text-foreground">{p.left}:</span> {p.right}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
