import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Flashcard } from "@/types/learn";
import { useProgress } from "@/hooks/useProgress";

interface FlashcardsProps {
  cards: Flashcard[];
  categoryId: string;
  moduleIndex: number;
}

export const Flashcards = ({ cards, categoryId, moduleIndex }: FlashcardsProps) => {
  // Learning state
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set());
  const [unknownCards, setUnknownCards] = useState<Set<number>>(new Set());
  const [history, setHistory] = useState<number[]>([]);
  const [historyPtr, setHistoryPtr] = useState<number>(-1);
  const [shownThisRound, setShownThisRound] = useState<Set<number>>(new Set());

  // Progress tracking
  const { progressData, loaded, saveFlashcardProgress } = useProgress(categoryId, "flashcards", moduleIndex);

  // Initialize on cards load with a random start + load saved progress
  useEffect(() => {
    if (!loaded || !cards || cards.length === 0) return;

    const saved = progressData.flashcards;
    if (saved) {
      const lastIdx = Math.min(Math.max(saved.lastIndex ?? 0, 0), cards.length - 1);
      setKnownCards(new Set(saved.knownCards ?? []));
      setUnknownCards(new Set(saved.unknownCards ?? []));
      setIndex(lastIdx);
      setHistory([lastIdx]);
      setHistoryPtr(0);
    } else {
      // Fresh start with random card
      const start = Math.floor(Math.random() * cards.length);
      setIndex(start);
      setHistory([start]);
      setHistoryPtr(0);
    }

    setFlipped(false);
    setShownThisRound(new Set());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards.length, loaded]);

  // Auto-save progress whenever cards change
  useEffect(() => {
    if (!loaded || !cards || cards.length === 0) return;
    saveFlashcardProgress(knownCards, unknownCards, index);
  }, [knownCards, unknownCards, index, loaded]);

  if (!cards || cards.length === 0) {
    return (
      <div className="rounded-xl border border-border p-6 text-center text-muted-foreground">
        Keine Karteikarten verfügbar.
      </div>
    );
  }

  const current = cards[index];

  const pickNextIndex = (exclude?: number) => {
    const total = cards.length;
    if (total <= 1) return 0;
    const all = Array.from({ length: total }, (_, i) => i);
    const neutral = all.filter((i) => !knownCards.has(i) && !unknownCards.has(i));
    const difficult = Array.from(unknownCards);

    // Avoid repeating neutral cards in the same round
    let roundShown = new Set(shownThisRound);
    const allNeutralShown = neutral.length > 0 && neutral.every((i) => roundShown.has(i));
    if (allNeutralShown) roundShown = new Set<number>();

    // Weighted pool: neutrals not shown this round (1x), difficult (3x)
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

  const currentCardStatus: "known" | "unknown" | "neutral" = knownCards.has(index)
    ? "known"
    : unknownCards.has(index)
    ? "unknown"
    : "neutral";

  return (
    <div className="space-y-6">
      {/* Lernhilfe-Einführung */}
      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
        <h3 className="font-semibold text-foreground mb-2">📚 Lernhilfe - Karteikarten optimal nutzen</h3>
        <p className="text-sm text-muted-foreground mb-2">
          <strong>Effektive Lernstrategie:</strong> Karteikarten helfen beim aktiven Abruf von Wissen. 
          Versuche erst selbst zu antworten, bevor du die Karte umdrehst.
        </p>
        <p className="text-xs text-muted-foreground">
          💡 <strong>Tipp:</strong> Schwierige Karten werden öfter wiederholt. Dein Lernfortschritt wird automatisch gespeichert.
        </p>
      </div>

      {/* Clean Interactive Card */}
      <div
        className={`relative h-[60vh] sm:h-[65vh] md:h-[500px] lg:h-[500px] rounded-2xl border overflow-hidden select-none cursor-pointer flip-3d transition-all duration-300 ${
          currentCardStatus === "known"
            ? "border-success/50 bg-gradient-to-br from-success/5 to-card shadow-lg"
            : currentCardStatus === "unknown"
            ? "border-destructive/50 bg-gradient-to-br from-destructive/5 to-card shadow-lg"
            : "border-border bg-card shadow-lg"
        } hover:shadow-xl hover:border-primary/50 hover:scale-[1.02]`}
        onClick={() => setFlipped((f) => !f)}
        aria-label="Karte umdrehen"
        role="button"
      >
        {/* Clean Inner Flipper */}
        <div className={`flip-3d-inner ${flipped ? "is-flipped" : ""}`}>
          {/* Front face - Question side */}
          <div className="flip-face bg-card overflow-y-auto">
            <div className="p-8 md:p-12 text-center h-full flex flex-col justify-center animate-fade-in">
              <div className="mx-auto mb-8 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="text-3xl">🤔</span>
              </div>
              
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground leading-relaxed break-words mb-8">
                {current.front}
              </p>
              
              <div className="mt-auto">
                <p className="text-sm text-muted-foreground mb-3">Tippe zum Umdrehen</p>
                <div className="mx-auto w-12 h-1 bg-primary/40 rounded-full" />
              </div>
            </div>
          </div>
          
          {/* Back face - Answer side */}
          <div className="flip-face flip-face-back bg-card overflow-y-auto">
            <div className="p-8 md:p-12 text-center h-full flex flex-col justify-center animate-fade-in">
              <div className="mx-auto mb-8 w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center">
                <span className="text-3xl">💡</span>
              </div>
              
              <p className="text-base sm:text-lg md:text-xl text-foreground leading-relaxed break-words font-medium">
                {current.back}
              </p>
              
              <div className="mt-auto flex justify-center space-x-2">
                <div className="w-2 h-2 bg-success/50 rounded-full" />
                <div className="w-2 h-2 bg-accent/50 rounded-full" />
                <div className="w-2 h-2 bg-primary/50 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Clean Status indicator */}
        {currentCardStatus !== "neutral" && (
          <div
            className={`absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg animate-fade-in ${
              currentCardStatus === "known" 
                ? "bg-success border border-success/20" 
                : "bg-destructive border border-destructive/20"
            }`}
          >
            {currentCardStatus === "known" ? "✓" : "✗"}
          </div>
        )}

        {/* Card number indicator */}
        <div className="absolute bottom-4 left-4 px-3 py-1 rounded-lg glass-effect">
          <span className="text-sm font-medium text-foreground">
            {index + 1}/{cards.length}
          </span>
        </div>
      </div>

      {/* Clean learning progress buttons */}
      {flipped && (
        <div className="flex gap-4 justify-center animate-fade-in">
          <Button
            onClick={markAsUnknown}
            variant="outline"
            className="border-destructive/50 text-destructive hover:bg-destructive hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 min-w-[140px]"
            size="lg"
          >
            <span className="mr-2 text-lg">✗</span>
            Nicht gewusst
          </Button>
          <Button
            onClick={markAsKnown}
            variant="outline" 
            className="border-success/50 text-success hover:bg-success hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 min-w-[140px]"
            size="lg"
          >
            <span className="mr-2 text-lg">✓</span>
            Gewusst
          </Button>
        </div>
      )}

      {/* Clean footer controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl glass-effect border border-border/50 shadow-lg animate-slide-up">
        <Button 
          variant="ghost" 
          onClick={prev} 
          aria-label="Vorherige Karte" 
          size="lg"
          className="hover:bg-primary/10 hover:text-primary border border-border/40 min-w-[120px] transition-all duration-200 text-foreground"
        >
          ← Zurück
        </Button>

        <div className="text-center" aria-live="polite">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-success" />
            <div className="w-12 h-2 bg-gradient-to-r from-success via-warning to-destructive rounded-full" />
            <div className="w-3 h-3 rounded-full bg-destructive" />
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="p-3 rounded-lg bg-success/10 border border-success/20">
              <p className="text-lg font-bold text-success">{knownCards.size}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Gewusst</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
              <p className="text-lg font-bold text-foreground">{cards.length - knownCards.size - unknownCards.size}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Neutral</p>
            </div>
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-lg font-bold text-destructive">{unknownCards.size}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Schwer</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground font-medium">
            Karte {index + 1} von {cards.length}
          </p>
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={next} 
            aria-label="Nächste Karte" 
            size="lg"
            className="primary-gradient text-white shadow-lg hover:shadow-xl min-w-[120px] hover:scale-105 transition-all duration-200"
          >
            Weiter →
          </Button>
          {(knownCards.size > 0 || unknownCards.size > 0) && (
            <Button 
              onClick={resetProgress} 
              variant="ghost" 
              size="lg"
              className="hover:bg-destructive/10 hover:text-destructive border border-border/40 transition-all duration-200"
            >
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};