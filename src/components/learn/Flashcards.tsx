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

  // initialize with a random card on mount
  useEffect(() => {
    if (cards.length === 0) return;
    const start = Math.floor(Math.random() * cards.length);
    setIndex(start);
    setHistory([start]);
    setHistoryPtr(0);
  // only on mount / when cards ref changes length
  }, [cards.length]);

  const current = cards[index];

  const pickNextIndex = (exclude?: number) => {
    const allIndices = cards.map((_, idx) => idx);
    const neutral = allIndices.filter((i) => !knownCards.has(i) && !unknownCards.has(i));
    const difficult = Array.from(unknownCards);

    // Reset round if all current neutral cards have been shown in this round
    const roundShown = new Set(shownThisRound);
    const allNeutralShown = neutral.length > 0 && neutral.every((i) => roundShown.has(i));
    if (allNeutralShown) {
      roundShown.clear();
    }

    // Build weighted pool: neutrals not shown this round (1x), difficult (3x)
    const pool: number[] = [];
    for (const i of neutral) {
      if (!roundShown.has(i)) pool.push(i);
    }
    for (const i of difficult) {
      pool.push(i, i, i);
    }

    let candidates = pool.length > 0 ? pool : (difficult.length > 0 ? difficult : neutral);

    if (exclude !== undefined && candidates.length > 1) {
      candidates = candidates.filter((i) => i !== exclude);
    }
    if (!candidates || candidates.length === 0) {
      setShownThisRound(roundShown);
      return exclude ?? 0;
    }

    const nextIdx = candidates[Math.floor(Math.random() * candidates.length)];

    // Track neutrals shown this round so they don't repeat; difficult may repeat
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
    setFlipped(false);
    setHistoryPtr((p) => {
      const newPtr = Math.max(0, p - 1);
      const prevIdx = history[newPtr] ?? index;
      setIndex(prevIdx);
      return newPtr;
    });
  };

  const markAsKnown = () => {
    const newKnown = new Set(knownCards);
    newKnown.add(index);
    setKnownCards(newKnown);
    
    // Remove from unknown if it was there
    const newUnknown = new Set(unknownCards);
    newUnknown.delete(index);
    setUnknownCards(newUnknown);
    
    next();
  };

  const markAsUnknown = () => {
    const newUnknown = new Set(unknownCards);
    newUnknown.add(index);
    setUnknownCards(newUnknown);
    
    // Remove from known if it was there
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

  const currentCardStatus = knownCards.has(index) ? 'known' : unknownCards.has(index) ? 'unknown' : 'neutral';

  return (
    <div className="space-y-6">
      <div
        className={`relative h-56 md:h-64 rounded-2xl border shadow-elegant overflow-hidden select-none cursor-pointer [perspective:1200px] ${
          currentCardStatus === 'known' ? 'border-success bg-success/5' : 
          currentCardStatus === 'unknown' ? 'border-destructive bg-destructive/5' : 
          'border-border bg-card'
        }`}
        onClick={() => setFlipped((f) => !f)}
        aria-label="Karte umdrehen"
      >
        <div
          className={`absolute inset-0 grid place-items-center p-8 text-center transition-transform duration-500 transform-gpu will-change-transform [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          <div className="absolute inset-0 grid place-items-center p-8 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0)] bg-gradient-to-br from-card to-card/80">
            <div>
              <p className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed mb-4">{current.front}</p>
              <p className="text-sm text-muted-foreground">Tippe zum Umdrehen</p>
            </div>
          </div>
          <div className="absolute inset-0 grid place-items-center p-8 [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0)] bg-gradient-to-br from-primary/5 to-accent/5">
            <p className="text-lg md:text-xl text-foreground leading-relaxed">{current.back}</p>
          </div>
        </div>
        
        {/* Status indicator */}
        {currentCardStatus !== 'neutral' && (
          <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
            currentCardStatus === 'known' ? 'bg-success' : 'bg-destructive'
          }`}>
            {currentCardStatus === 'known' ? '✓' : '✗'}
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
        
        <div className="text-center">
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
