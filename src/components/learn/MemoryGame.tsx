import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MemoryGame } from "@/types/learn";

interface MemoryGameProps {
  games: MemoryGame[];
}

interface Card {
  id: string;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryGameComponent = ({ games }: MemoryGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const current = games[currentIndex];

  const initializeGame = () => {
    const gameCards: Card[] = [];
    current.pairs.forEach(pair => {
      gameCards.push({
        id: `${pair.id}-1`,
        content: pair.content,
        isFlipped: false,
        isMatched: false
      });
      gameCards.push({
        id: `${pair.id}-2`,
        content: pair.match,
        isFlipped: false,
        isMatched: false
      });
    });
    
    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    
    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setGameComplete(false);
  };

  useEffect(() => {
    initializeGame();
  }, [currentIndex]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);
      
      setMoves(m => m + 1);
      
      setTimeout(() => {
        if (firstCard && secondCard) {
          const firstPairId = firstCard.id.split('-')[0];
          const secondPairId = secondCard.id.split('-')[0];
          
          if (firstPairId === secondPairId) {
            // Match found
            setCards(prev => prev.map(card => 
              card.id === first || card.id === second 
                ? { ...card, isMatched: true, isFlipped: true }
                : card
            ));
          } else {
            // No match
            setCards(prev => prev.map(card => 
              card.id === first || card.id === second 
                ? { ...card, isFlipped: false }
                : card
            ));
          }
        }
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setGameComplete(true);
    }
  }, [cards]);

  const flipCard = (cardId: string) => {
    if (flippedCards.length >= 2) return;
    if (flippedCards.includes(cardId)) return;
    
    const card = cards.find(c => c.id === cardId);
    if (card?.isMatched) return;
    
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    setFlippedCards(prev => [...prev, cardId]);
  };

  const next = () => {
    if (currentIndex < games.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground">{current.title}</h3>
            <p className="text-muted-foreground">{current.description}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Züge: {moves}</p>
            {gameComplete && (
              <p className="text-sm font-medium text-success-foreground">Geschafft! 🎉</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {cards.map(card => (
            <div
              key={card.id}
              onClick={() => flipCard(card.id)}
              className={cn(
                "aspect-square rounded-lg border-2 cursor-pointer transition-all duration-300 flex items-center justify-center text-center p-2",
                card.isFlipped || card.isMatched
                  ? "bg-primary/10 border-primary/30"
                  : "bg-secondary border-border hover:bg-secondary/80",
                card.isMatched && "ring-2 ring-success"
              )}
            >
              {card.isFlipped || card.isMatched ? (
                <span className="text-xs font-medium break-words">{card.content}</span>
              ) : (
                <span className="text-2xl">❓</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 gap-2">
          <Button onClick={initializeGame} variant="outline">
            Neues Spiel
          </Button>
          <Button onClick={() => setShowHelp((h) => !h)} variant="outline">
            Lernhilfe {showHelp ? "verbergen" : "anzeigen"}
          </Button>
        </div>
        {showHelp && (
          <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-border/50">
            <h4 className="font-medium text-foreground mb-2">Erklärungen</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {current.pairs.map((p) => (
                <li key={p.id}>
                  <span className="text-foreground font-semibold">{p.content}</span> ↔ {p.match}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={prev} disabled={currentIndex === 0}>
          Vorheriges
        </Button>
        <span className="text-sm text-muted-foreground">
          Spiel {currentIndex + 1} von {games.length}
        </span>
        <Button onClick={next} disabled={currentIndex === games.length - 1}>
          Nächstes
        </Button>
      </div>
    </div>
  );
};