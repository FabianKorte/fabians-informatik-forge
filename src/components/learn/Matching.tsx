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

  const isMatchedLeft = (l: string) => Object.keys(matches).includes(l);
  const isMatchedRight = (r: string) => Object.values(matches).includes(r);

  const selectRight = (r: string) => {
    if (!selectedLeft) return;
    const correctRight = pairs.find((p) => p.left === selectedLeft)?.right;
    const newMatches = { ...matches };
    newMatches[selectedLeft] = r;
    setMatches(newMatches);
    setSelectedLeft(null);
  };

  const solved = Object.keys(matches).length === pairs.length;
  const correctCount = Object.entries(matches).filter(([l, r]) => {
    const correct = pairs.find((p) => p.left === l)?.right;
    return correct === r;
  }).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-4">
          <h4 className="font-medium text-foreground mb-3">Begriffe</h4>
          <div className="grid gap-2">
            {left.map((l) => (
              <button
                key={l}
                onClick={() => !isMatchedLeft(l) && setSelectedLeft(l)}
                className={cn(
                  "text-left rounded-lg border border-border/60 bg-background px-3 py-2 transition-colors",
                  selectedLeft === l && "border-primary text-primary",
                  isMatchedLeft(l) && "opacity-60 cursor-default"
                )}
              >
                {l}
              </button>
            ))}
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
                  "text-left rounded-lg border border-border/60 bg-background px-3 py-2 transition-colors",
                  isMatchedRight(r) && "opacity-60 cursor-default"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Korrekt: {correctCount} / {pairs.length}
        </p>
        {solved && (
          <Button variant="outline" disabled>
            Geschafft!
          </Button>
        )}
      </div>
    </div>
  );
};
