import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { LearnModule, Flashcard, QuizQuestion } from "@/types/learn";
import { Flashcards } from "./Flashcards";
import { Quiz } from "./Quiz";
import { Target, Brain, CheckCircle, XCircle } from "lucide-react";

interface FocusTrainingProps {
  modules: LearnModule[];
  categoryId: string;
}

type FocusItem = {
  type: 'flashcard' | 'quiz';
  content: Flashcard | QuizQuestion;
  moduleIndex: number;
  difficulty: number;
};

export const FocusTraining = ({ modules, categoryId }: FocusTrainingProps) => {
  const [focusItems, setFocusItems] = useState<FocusItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedItems, setCompletedItems] = useState<Set<number>>(new Set());
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Extract difficult items from modules
    const items: FocusItem[] = [];
    
    modules.forEach((module, moduleIndex) => {
      if (module.type === 'flashcards' && module.cards) {
        module.cards.forEach((card) => {
          items.push({
            type: 'flashcard',
            content: card,
            moduleIndex,
            difficulty: Math.random() > 0.7 ? 2 : 1 // Simulate difficulty
          });
        });
      }
      
      if (module.type === 'quiz' && module.questions) {
        module.questions.forEach((question) => {
          items.push({
            type: 'quiz',
            content: question,
            moduleIndex,
            difficulty: Math.random() > 0.6 ? 2 : 1
          });
        });
      }
    });

    // Sort by difficulty and take top difficult items
    const difficultItems = items
      .filter(item => item.difficulty >= 2)
      .slice(0, Math.min(10, items.length));
    
    setFocusItems(difficultItems);
    setCurrentIndex(0);
    setCompletedItems(new Set());
    setShowResults(false);
  }, [modules]);

  const handleItemComplete = (correct: boolean) => {
    const newCompleted = new Set(completedItems);
    newCompleted.add(currentIndex);
    setCompletedItems(newCompleted);

    if (currentIndex < focusItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetTraining = () => {
    setCurrentIndex(0);
    setCompletedItems(new Set());
    setShowResults(false);
  };

  if (focusItems.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-xl font-semibold mb-2">Kein Schwerpunkt-Training verfügbar</h3>
        <p className="text-muted-foreground">
          Bearbeite erst einige Aufgaben, damit das System deine Schwächen identifizieren kann.
        </p>
      </Card>
    );
  }

  if (showResults) {
    return (
      <Card className="p-8 text-center">
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-2xl font-semibold mb-4">Schwerpunkt-Training abgeschlossen!</h3>
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-success">{completedItems.size}</div>
            <div className="text-sm text-muted-foreground">Bearbeitet</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{focusItems.length}</div>
            <div className="text-sm text-muted-foreground">Gesamt</div>
          </div>
        </div>
        <Button onClick={resetTraining} className="min-w-[200px]">
          Erneut trainieren
        </Button>
      </Card>
    );
  }

  const currentItem = focusItems[currentIndex];
  const progress = (currentIndex / focusItems.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-3 mb-3">
          <Target className="w-6 h-6 text-primary" />
          <h3 className="font-semibold text-foreground">🎯 Schwerpunkt-Training</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Konzentriere dich auf deine schwierigsten Themen. Diese Aufgaben wurden basierend auf deinen bisherigen Leistungen ausgewählt.
        </p>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Fortschritt: {currentIndex + 1}/{focusItems.length}</span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Content */}
      {currentItem.type === 'flashcard' ? (
        <div>
          <Flashcards 
            cards={[currentItem.content as Flashcard]} 
            categoryId={categoryId} 
            moduleIndex={currentItem.moduleIndex}
          />
          <div className="flex justify-center mt-6">
            <Button onClick={() => handleItemComplete(true)} size="lg">
              Weiter zur nächsten Aufgabe
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Quiz questions={[currentItem.content as QuizQuestion]} />
          <div className="flex justify-center mt-6">
            <Button onClick={() => handleItemComplete(true)} size="lg">
              Weiter zur nächsten Aufgabe
            </Button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flex justify-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="w-4 h-4 text-success" />
          <span>{completedItems.size} bearbeitet</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Brain className="w-4 h-4 text-primary" />
          <span>{focusItems.length - currentIndex} verbleibend</span>
        </div>
      </div>
    </div>
  );
};