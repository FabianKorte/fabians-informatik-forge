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

      {/* Revolutionary Interactive Card with Mind-Blowing Effects */}
      <div
        className={`group relative h-[70vh] sm:h-[75vh] md:h-[28rem] lg:h-[600px] rounded-3xl border-2 overflow-hidden select-none cursor-pointer flip-3d transition-all duration-500 ${
          currentCardStatus === "known"
            ? "border-success/40 bg-gradient-to-br from-success/15 to-success/5 shadow-[0_20px_60px_-10px_rgba(34,197,94,0.3)]"
            : currentCardStatus === "unknown"
            ? "border-destructive/40 bg-gradient-to-br from-destructive/15 to-destructive/5 shadow-[0_20px_60px_-10px_rgba(239,68,68,0.3)]"
            : "border-border/40 bg-gradient-to-br from-card via-card/95 to-card/80 shadow-[0_20px_60px_-10px_rgba(59,130,246,0.3)]"
        } hover:shadow-[0_40px_100px_-15px_rgba(59,130,246,0.4)] hover:border-primary/60 hover:scale-[1.02] active:scale-[0.98]`}
        onClick={() => setFlipped((f) => !f)}
        aria-label="Karte umdrehen"
        role="button"
      >
        {/* Revolutionary Inner Flipper with Mind-Bending Effects */}
        <div className={`flip-3d-inner ${flipped ? "is-flipped" : ""}`}>
          {/* Front face - Question side with extraordinary design */}
          <div className="flip-face bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-card dark:via-card/98 dark:to-primary/8 overflow-y-auto overscroll-contain touch-pan-y mesh-gradient">
            {/* Revolutionary card texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-primary/10 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none" />
            
            {/* Floating particles effect */}
            <div className="absolute top-10 left-10 w-2 h-2 bg-primary/30 rounded-full animate-float"></div>
            <div className="absolute top-20 right-16 w-1 h-1 bg-accent/40 rounded-full animate-float-reverse"></div>
            <div className="absolute bottom-16 left-20 w-1.5 h-1.5 bg-success/30 rounded-full animate-float"></div>
            
            {/* Content with enhanced styling */}
            <div className="relative p-8 md:p-12 text-center h-full flex flex-col justify-center animate-slide-up">
              {/* Enhanced Question icon */}
              <div className="mx-auto mb-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-bounce-in glass-effect">
                <span className="text-3xl animate-pulse">🤔</span>
              </div>
              
              <p className="text-lg sm:text-xl md:text-3xl font-bold text-foreground leading-snug md:leading-relaxed break-words mb-8 animate-slide-up">
                {current.front}
              </p>
              
              {/* Enhanced flip instruction with mesmerizing animation */}
              <div className="mt-auto animate-bounce-in">
                <p className="text-sm text-muted-foreground mb-3 font-medium">Tippe zum Umdrehen</p>
                <div className="mx-auto w-12 h-2 bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 rounded-full animate-shimmer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Back face - Answer side with spectacular design */}
          <div className="flip-face flip-face-back bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-success/8 dark:via-accent/8 dark:to-primary/8 overflow-y-auto overscroll-contain touch-pan-y mesh-gradient">
            {/* Spectacular card texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-success/20 via-transparent to-accent/10 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(34,197,94,0.15),transparent_70%)] pointer-events-none" />
            
            {/* Enhanced floating particles */}
            <div className="absolute top-12 right-12 w-2 h-2 bg-success/40 rounded-full animate-float"></div>
            <div className="absolute top-24 left-16 w-1 h-1 bg-emerald-400/50 rounded-full animate-float-reverse"></div>
            <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-teal-400/40 rounded-full animate-float"></div>
            
            {/* Content with spectacular styling */}
            <div className="relative p-8 md:p-12 text-center h-full flex flex-col justify-center animate-slide-up">
              {/* Spectacular Answer icon */}
              <div className="mx-auto mb-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-success/20 to-emerald-400/20 flex items-center justify-center animate-bounce-in glass-effect">
                <span className="text-3xl animate-pulse">💡</span>
              </div>
              
              <p className="text-base sm:text-lg md:text-2xl text-foreground leading-snug md:leading-relaxed break-words font-semibold animate-slide-up">
                {current.back}
              </p>
              
              {/* Spectacular success pattern decoration */}
              <div className="mt-auto flex justify-center space-x-3 animate-bounce-in">
                <div className="w-3 h-3 bg-gradient-to-br from-success to-emerald-400 rounded-full animate-pulse shadow-lg" />
                <div className="w-3 h-3 bg-gradient-to-br from-accent to-teal-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.3s' }} />
                <div className="w-3 h-3 bg-gradient-to-br from-primary to-cyan-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.6s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Revolutionary Status indicator with mind-blowing effects */}
        {currentCardStatus !== "neutral" && (
          <div
            className={`absolute top-6 right-6 w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-bold shadow-2xl status-indicator glass-effect animate-bounce-in ${
              currentCardStatus === "known" 
                ? "bg-gradient-to-br from-success via-emerald-400 to-success-light animate-pulse-glow border-2 border-success/30" 
                : "bg-gradient-to-br from-destructive via-red-400 to-destructive/80 animate-pulse-glow border-2 border-destructive/30"
            }`}
          >
            {currentCardStatus === "known" ? "✓" : "✗"}
          </div>
        )}

        {/* Enhanced card number indicator */}
        <div className="absolute bottom-6 left-6 px-4 py-2 rounded-2xl glass-effect animate-bounce-in">
          <span className="text-sm font-bold text-foreground">
            {index + 1}/{cards.length}
          </span>
        </div>
      </div>

      {/* Revolutionary learning progress buttons with spectacular animations */}
      {flipped && (
        <div className="flex gap-6 justify-center animate-bounce-in">
          <Button
            onClick={markAsUnknown}
            variant="outline"
            className="border-3 border-destructive/60 text-destructive hover:bg-gradient-to-br hover:from-destructive hover:to-red-600 hover:text-white hover:border-destructive shadow-2xl hover:shadow-[0_20px_40px_-10px_rgba(239,68,68,0.4)] transform hover:scale-110 active:scale-95 transition-all duration-300 min-w-[160px] glass-effect hover:rotate-1"
            size="lg"
          >
            <span className="mr-3 text-xl animate-pulse">✗</span>
            Nicht gewusst
          </Button>
          <Button
            onClick={markAsKnown}
            variant="outline" 
            className="border-3 border-success/60 text-success hover:bg-gradient-to-br hover:from-success hover:to-emerald-600 hover:text-white hover:border-success shadow-2xl hover:shadow-[0_20px_40px_-10px_rgba(34,197,94,0.4)] transform hover:scale-110 active:scale-95 transition-all duration-300 min-w-[160px] glass-effect hover:rotate-[-1deg]"
            size="lg"
          >
            <span className="mr-3 text-xl animate-pulse">✓</span>
            Gewusst
          </Button>
        </div>
      )}

      {/* Revolutionary footer controls with mind-blowing statistics display */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl glass-effect border-2 border-border/30 shadow-2xl animate-slide-up mesh-gradient">
        <Button 
          variant="ghost" 
          onClick={prev} 
          aria-label="Vorherige Karte" 
          size="lg"
          className="hover:bg-primary/20 hover:text-primary border-2 border-border/40 min-w-[140px] glass-effect hover:scale-110 hover:rotate-[-2deg] active:scale-95 transition-all duration-300 shadow-lg"
        >
          ← Zurück
        </Button>

        <div className="text-center animate-bounce-in" aria-live="polite">
          {/* Revolutionary progress visualization */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-success to-emerald-400 animate-pulse shadow-lg" />
            <div className="w-16 h-2 bg-gradient-to-r from-success via-warning via-orange-400 to-destructive rounded-full shadow-inner animate-shimmer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-destructive to-red-400 animate-pulse shadow-lg" />
          </div>
          
          {/* Spectacular statistics cards */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-success/20 to-emerald-400/10 border-2 border-success/30 glass-effect animate-morph">
              <p className="text-2xl font-bold text-success animate-pulse">{knownCards.size}</p>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Gewusst</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-muted/50 to-gray-300/10 border-2 border-border/40 glass-effect animate-morph" style={{ animationDelay: '1s' }}>
              <p className="text-2xl font-bold text-foreground animate-pulse">{cards.length - knownCards.size - unknownCards.size}</p>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Neutral</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-destructive/20 to-red-400/10 border-2 border-destructive/30 glass-effect animate-morph" style={{ animationDelay: '2s' }}>
              <p className="text-2xl font-bold text-destructive animate-pulse">{unknownCards.size}</p>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Schwer</p>
            </div>
          </div>
          
          <p className="text-base text-muted-foreground font-semibold">
            Karte {index + 1} von {cards.length}
          </p>
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={next} 
            aria-label="Nächste Karte" 
            size="lg"
            className="bg-gradient-to-br from-primary via-accent to-primary-light text-white shadow-[0_20px_40px_-10px_rgba(59,130,246,0.4)] hover:shadow-[0_30px_60px_-15px_rgba(59,130,246,0.6)] min-w-[140px] hover:scale-110 hover:rotate-2 active:scale-95 transition-all duration-300 glass-effect border-2 border-primary/30"
          >
            Weiter →
          </Button>
          {(knownCards.size > 0 || unknownCards.size > 0) && (
            <Button 
              onClick={resetProgress} 
              variant="ghost" 
              size="lg"
              className="hover:bg-destructive/20 hover:text-destructive border-2 border-border/40 glass-effect hover:scale-110 hover:rotate-[-2deg] active:scale-95 transition-all duration-300 shadow-lg"
            >
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};