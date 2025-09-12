import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Flashcard } from "@/types/learn";

interface FlashcardsProps {
  cards: Flashcard[];
}

export const Flashcards = ({ cards }: FlashcardsProps) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const current = cards[index];

  const next = () => {
    setFlipped(false);
    setIndex((i) => (i + 1 < cards.length ? i + 1 : 0));
  };

  const prev = () => {
    setFlipped(false);
    setIndex((i) => (i - 1 >= 0 ? i - 1 : cards.length - 1));
  };

  return (
    <div className="space-y-6">
      <div
        className="relative h-56 md:h-64 rounded-2xl border border-border bg-card shadow-elegant overflow-hidden select-none cursor-pointer perspective"
        onClick={() => setFlipped((f) => !f)}
        aria-label="Karte umdrehen"
      >
        <div
          className={`absolute inset-0 grid place-items-center p-8 text-center transition-transform duration-500 [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          <div className="absolute inset-0 grid place-items-center p-8 [backface-visibility:hidden] bg-gradient-to-br from-card to-card/80">
            <p className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed">{current.front}</p>
          </div>
          <div className="absolute inset-0 grid place-items-center p-8 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-gradient-to-br from-primary/5 to-accent/5">
            <p className="text-lg md:text-xl text-foreground leading-relaxed">{current.back}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={prev} aria-label="Vorherige Karte">
          Zurück
        </Button>
        <p className="text-sm text-muted-foreground">
          Karte {index + 1} / {cards.length}
        </p>
        <Button onClick={next} aria-label="Nächste Karte">
          Weiter
        </Button>
      </div>
    </div>
  );
};
