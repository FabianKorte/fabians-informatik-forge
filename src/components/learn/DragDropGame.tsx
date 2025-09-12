import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DragDropGame } from "@/types/learn";

interface DragDropGameProps {
  games: DragDropGame[];
}

export const DragDropGameComponent = ({ games }: DragDropGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string>("");
  const [showSolutions, setShowSolutions] = useState(false);

  const current = games[currentIndex];

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId);
  };

  const handleDrop = (category: string) => {
    if (draggedItem) {
      setAssignments(prev => ({ ...prev, [draggedItem]: category }));
      setDraggedItem(null);
    }
  };

  const checkAnswers = () => {
    const correct = current.items.filter(item => 
      assignments[item.id] === item.category
    ).length;
    
    setFeedback(`${correct} von ${current.items.length} richtig zugeordnet!`);
  };

  const reset = () => {
    setAssignments({});
    setFeedback("");
  };

  const next = () => {
    if (currentIndex < games.length - 1) {
      setCurrentIndex(currentIndex + 1);
      reset();
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      reset();
    }
  };

  const unassignedItems = current.items.filter(item => !assignments[item.id]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{current.title}</h3>
        <p className="text-muted-foreground mb-6">{current.description}</p>
        
        <div className="grid gap-6">
          {/* Unassigned items */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Elemente zum Zuordnen:</h4>
            <div className="flex flex-wrap gap-3">
              {unassignedItems.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item.id)}
                  className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 cursor-move hover:bg-primary/20 transition-colors"
                >
                  {item.content}
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {current.categories.map(category => (
              <div
                key={category}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(category)}
                className="min-h-32 p-4 rounded-lg border-2 border-dashed border-border bg-secondary/50 hover:bg-secondary/70 transition-colors"
              >
                <h5 className="font-medium text-foreground mb-3">{category}</h5>
                <div className="space-y-2">
                  {current.items
                    .filter(item => assignments[item.id] === category)
                    .map(item => (
                      <div
                        key={item.id}
                        className="px-3 py-2 rounded bg-card border border-border text-sm"
                      >
                        {item.content}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            <Button onClick={checkAnswers} disabled={Object.keys(assignments).length === 0}>
              Überprüfen
            </Button>
            <Button onClick={reset} variant="outline">
              Zurücksetzen
            </Button>
            <Button onClick={() => setShowSolutions((s) => !s)} variant="outline">
              Lösungen {showSolutions ? "verbergen" : "zeigen"}
            </Button>
          </div>
          {feedback && (
            <p className="text-sm font-medium text-primary">{feedback}</p>
          )}
        </div>

        {showSolutions && (
          <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-border/50">
            <h5 className="font-medium text-foreground mb-2">Erklärungen</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              {current.items.map((item) => (
                <li key={item.id}>
                  {item.content} 
                  <span className="text-foreground"> → {item.category}</span>
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