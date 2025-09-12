import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Flashcard } from "@/types/learn";

interface FlashcardsProps {
  cards: Flashcard[];
}

export const Flashcards = ({ cards }: FlashcardsProps) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set());
  const [unknownCards, setUnknownCards] = useState<Set<number>>(new Set());
  const [history, setHistory] = useState<number[]>([]);
  const [historyPtr, setHistoryPtr] = useState<number>(-1);
  const [shownThisRound, setShownThisRound] = useState<Set<number>>(new Set());

  // Initialize with a random card when cards arrive
  useEffect(() => {
    if (!cards || cards.length === 0) return;
    const start = Math.floor(Math.random() * cards.length);
    setIndex(start);
    setHistory([start]);
    setHistoryPtr(0);
    setFlipped(false);
    setKnownCards(new Set());
    setUnknownCards(new Set());
    setShownThisRound(new Set());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards.length]);

  if (!cards || cards.length === 0) {
    return (
      <div className="rounded-xl border border-border p-6 text-center text-muted-foreground">
        Keine Karteikarten verfügbar.
      </div>
    );
  }

  const pickNextIndex = (exclude?: number) => {
    const total = cards.length;
    if (total <= 1) return 0;

    const all = Array.from({ length: total }, (_, i) => i);
    const neutral = all.filter((i) => !knownCards.has(i) && !unknownCards.has(i));
    const difficult = Array.from(unknownCards);

    // Round tracking (avoid repeating neutral cards until all seen once)
    let roundShown = new Set(shownThisRound);
    const allNeutralShown = neutral.length > 0 && neutral.every((i) => roundShown.has(i));
    if (allNeutralShown) {
      roundShown = new Set<number>();
    }

    // Weighted pool: neutrals not yet shown this round (1x), difficult (3x)
    const pool: number[] = [];
    for (const i of neutral) if (!roundShown.has(i)) pool.push(i);
    for (const i of difficult) pool.push(i, i, i);

    let candidates = pool.length > 0 ? pool : (difficult.length > 0 ? difficult : neutral.length > 0 ? neutral : all);
    if (exclude !== undefined && candidates.length > 1) {
      candidates = candidates.filter((i) => i !== exclude);
    }

    const nextIdx = candidates[Math.floor(Math.random() * candidates.length)];

    // Track neutrals shown this round
    if (!knownCards.has(nextIdx) && !unknownCards.has(nextIdx)) {
      roundShown.add(nextIdx);
    }
    setShownThisRound(roundShown);

    return nextIdx;
  };

  const next = () => {
    setFlipped(false);
    const nextIdx = pickNextIndex(index);
    setIndex(nextIdx);
    setHistory((h) => {
      const cut = historyPtr >= 0 && historyPtr < h.length ? h.slice(0, historyPtr + 1) : h;
      return [...cut, nextIdx];
    });
    setHistoryPtr((p) => p + 1);
  };

  const prev = () => {
    if (historyPtr <= 0) return;
    setFlipped(false);
    setHistoryPtr((p) => {
      const newPtr = Math.max(0, p - 1);
      setIndex((_) => history[newPtr] ?? index);
      return newPtr;
    });
  };

  const markAsKnown = () => {
    const newKnown = new Set(knownCards);
    newKnown.add(index);
    setKnownCards(newKnown);

    const newUnknown = new Set(unknownCards);
    newUnknown.delete(index);
    setUnknownCards(newUnknown);

    next();
  };

  const markAsUnknown = () => {
    const newUnknown = new Set(unknownCards);
    newUnknown.add(index);
    setUnknownCards(newUnknown);

    const newKnown = new Set(knownCards);
    newKnown.delete(index);
    setKnownCards(newKnown);

    next();
  };

  const resetProgress = () => {
    setKnownCards(new Set());
    setUnknownCards(new Set());
    setShownThisRound(new Set());
    const start = Math.floor(Math.random() * cards.length);
    setIndex(start);
    setHistory([start]);
    setHistoryPtr(0);
    setFlipped(false);
  };

  const current = cards[index];
  const currentCardStatus: "known" | "unknown" | "neutral" = knownCards.has(index)
    ? "known"
    : unknownCards.has(index)
    ? "unknown"
    : "neutral";

  return (
    <div className="space-y-6">
      <div
        className={`relative h-56 md:h-64 rounded-2xl border shadow-elegant overflow-hidden select-none cursor-pointer [perspective:1200px] ${
          currentCardStatus === "known"
            ? "border-success bg-success/5"
            : currentCardStatus === "unknown"
            ? "border-destructive bg-destructive/5"
            : "border-border bg-card"
        }`}
        onClick={() => setFlipped((f) => !f)}
        aria-label="Karte umdrehen"
      >
        <div
          className={`${
            flipped ? "[transform:rotateY(180deg)]" : ""
          } absolute inset-0 grid place-items-center p-8 text-center transform-gpu will-change-transform transition-transform duration-500 [transform-style:preserve-3d] [transform:translateZ(0)]`}
        >
          {/* Front */}
          <div className="absolute inset-0 grid place-items-center p-8 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(1px)] bg-gradient-to-br from-card to-card/80">
            <div className="will-change-transform">
              <p className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed mb-4 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
                {current.front}
              </p>
              <p className="text-sm text-muted-foreground [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
                Tippe zum Umdrehen
              </p>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 grid place-items-center p-8 [transform:rotateY(180deg)_translateZ(1px)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] bg-gradient-to-br from-primary/5 to-accent/5">
            <p className="text-lg md:text-xl text-foreground leading-relaxed [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
              {current.back}
            </p>
          </div>
        </div>

        {/* Status indicator */}
        {currentCardStatus !== "neutral" && (
          <div
            className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
              currentCardStatus === "known" ? "bg-success" : "bg-destructive"
            }`}
          >
            {currentCardStatus === "known" ? "✓" : "✗"}
          </div>
        )}
      </div>

      {/* Learning progress buttons - only show when flipped */}
      {flipped && (
        <div className="flex gap-3 justify-center">
          <Button
            onClick={markAsUnknown}
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive/10"
            size="sm"
          >
            ✗ Nicht gewusst
          </Button>
          <Button
            onClick={markAsKnown}
            variant="outline"
            className="border-success text-success hover:bg-success/10"
            size="sm"
          >
            ✓ Gewusst
          </Button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={prev} aria-label="Vorherige Karte" size="sm">
          ← Zurück
        </Button>

        <div className="text-center" aria-live="polite">
          <p className="text-sm text-muted-foreground mb-1">
            Karte {index + 1} / {cards.length}
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="text-success">Gewusst: {knownCards.size}</span>
            <span className="text-destructive">Nicht gewusst: {unknownCards.size}</span>
            <span>Neutral: {cards.length - knownCards.size - unknownCards.size}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={next} aria-label="Nächste Karte" size="sm">
            Weiter →
          </Button>
          {(knownCards.size > 0 || unknownCards.size > 0) && (
            <Button onClick={resetProgress} variant="outline" size="sm">
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
