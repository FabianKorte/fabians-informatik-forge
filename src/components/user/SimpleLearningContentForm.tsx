import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, Lightbulb } from "lucide-react";
import { categories } from "@/data/categories";
import { flashcardItemSchema, quizItemSchema, type FlashcardItem, type QuizItem } from "@/lib/validation/learningContent";

// Types are now imported from validation schema

export const SimpleLearningContentForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [moduleType, setModuleType] = useState("");
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<(FlashcardItem | QuizItem)[]>([{ front: "", back: "", explanation: "" }]);

  const addItem = () => {
    if (moduleType === "flashcards") {
      setItems([...items, { front: "", back: "", explanation: "" }]);
    } else if (moduleType === "quiz") {
      setItems([...items, { question: "", options: ["", "", "", ""], correctAnswer: 0, explanation: "" }]);
    }
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const updateQuizOption = (itemIndex: number, optionIndex: number, value: string) => {
    const newItems = [...items];
    const quiz = newItems[itemIndex] as QuizItem;
    const options = [...quiz.options];
    options[optionIndex] = value;
    newItems[itemIndex] = { ...quiz, options };
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Fehler",
        description: "Du musst angemeldet sein",
        variant: "destructive",
      });
      return;
    }

    if (!categoryId || !moduleType || !title) {
      toast({
        title: "Fehler",
        description: "Bitte fülle alle Felder aus",
        variant: "destructive",
      });
      return;
    }

    // Validate with Zod schema
    try {
      if (moduleType === "flashcards") {
        items.forEach((item, idx) => {
          flashcardItemSchema.parse(item);
        });
      } else if (moduleType === "quiz") {
        items.forEach((item, idx) => {
          quizItemSchema.parse(item);
        });
      }
    } catch (error: any) {
      toast({
        title: "Validierungsfehler",
        description: error.errors?.[0]?.message || "Bitte überprüfe deine Eingaben",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create content structure based on type
      let content = {};

      switch (moduleType) {
        case "flashcards":
          content = {
            cards: items.map(item => {
              const flashcard = item as FlashcardItem;
              return {
                question: flashcard.front,
                answer: flashcard.back,
                explanation: flashcard.explanation
              };
            })
          };
          break;
        case "quiz":
          content = {
            questions: items.map(item => {
              const quiz = item as QuizItem;
              return {
                question: quiz.question,
                options: quiz.options,
                correctAnswer: quiz.correctAnswer,
                explanation: quiz.explanation
              };
            })
          };
          break;
        default:
          content = { items: [] };
      }

      const { error } = await supabase
        .from('learn_module_suggestions')
        .insert({
          user_id: user.id,
          category_id: categoryId,
          module_type: moduleType,
          title: title,
          content: content,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Erfolgreich!",
        description: "Dein Vorschlag wurde eingereicht und wird von einem Admin überprüft.",
        duration: 5000,
      });

      // Reset form
      setCategoryId("");
      setModuleType("");
      setTitle("");
      setItems([{ front: "", back: "", explanation: "" }]);
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: error.message || "Konnte Vorschlag nicht einreichen",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Lightbulb className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Lerninhalt vorschlagen</h3>
          <p className="text-sm text-muted-foreground">
            Schlage neue Lerninhalte vor, die von Admins überprüft werden
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="category">Kategorie</Label>
          <Select value={categoryId} onValueChange={setCategoryId} disabled={isLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Wähle eine Kategorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Lern-Typ</Label>
          <Select 
            value={moduleType} 
            onValueChange={(value) => {
              setModuleType(value);
              // Reset items when type changes
              if (value === "flashcards") {
                setItems([{ front: "", back: "", explanation: "" }]);
              } else if (value === "quiz") {
                setItems([{ question: "", options: ["", "", "", ""], correctAnswer: 0, explanation: "" }]);
              }
            }}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Wähle einen Typ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flashcards">Karteikarten</SelectItem>
              <SelectItem value="quiz">Quiz</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Titel</Label>
          <Input
            id="title"
            placeholder="z.B. Wichtige IT-Begriffe"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label>Inhalte (mindestens 1)</Label>
          <p className="text-xs text-muted-foreground mb-2">
            {moduleType === "flashcards" && "Erstelle Karteikarten mit Vorder- und Rückseite"}
            {moduleType === "quiz" && "Erstelle Quiz-Fragen mit 4 Antwortmöglichkeiten"}
            {!moduleType && "Wähle zuerst einen Lern-Typ"}
          </p>
          
          {moduleType === "flashcards" && items.map((item, index) => {
            const flashcard = item as FlashcardItem;
            return (
            <Card key={index} className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium">Karteikarte {index + 1}</Label>
                  {items.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(index)}
                      disabled={isLoading}
                    >
                      <span className="text-lg">×</span>
                    </Button>
                  )}
                </div>
                <Input
                  placeholder="Vorderseite (Frage)"
                  value={flashcard.front}
                  onChange={(e) => updateItem(index, "front", e.target.value)}
                  disabled={isLoading}
                />
                <Input
                  placeholder="Rückseite (Antwort)"
                  value={flashcard.back}
                  onChange={(e) => updateItem(index, "back", e.target.value)}
                  disabled={isLoading}
                />
                <Input
                  placeholder="Erklärung (z.B. zusätzlicher Kontext)"
                  value={flashcard.explanation}
                  onChange={(e) => updateItem(index, "explanation", e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </Card>
            );
          })}

          {moduleType === "quiz" && items.map((item, index) => {
            const quiz = item as QuizItem;
            return (
            <Card key={index} className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium">Quiz-Frage {index + 1}</Label>
                  {items.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(index)}
                      disabled={isLoading}
                    >
                      <span className="text-lg">×</span>
                    </Button>
                  )}
                </div>
                <Input
                  placeholder="Frage"
                  value={quiz.question}
                  onChange={(e) => updateItem(index, "question", e.target.value)}
                  disabled={isLoading}
                />
                <div className="space-y-1">
                  <Label className="text-xs">Antwortmöglichkeiten</Label>
                  {quiz.options.map((option: string, optIndex: number) => (
                    <div key={optIndex} className="flex gap-2 items-center">
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={quiz.correctAnswer === optIndex}
                        onChange={() => updateItem(index, "correctAnswer", optIndex)}
                        disabled={isLoading}
                      />
                      <Input
                        placeholder={`Option ${optIndex + 1}`}
                        value={option}
                        onChange={(e) => updateQuizOption(index, optIndex, e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground">
                    Wähle die richtige Antwort mit dem Radio-Button aus
                  </p>
                </div>
                <Input
                  placeholder="Erklärung zur Antwort"
                  value={quiz.explanation}
                  onChange={(e) => updateItem(index, "explanation", e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </Card>
            );
          })}

          {moduleType && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addItem}
              disabled={isLoading}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              {moduleType === "flashcards" ? "Weitere Karteikarte" : "Weitere Frage"} hinzufügen
            </Button>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Wird eingereicht...
            </>
          ) : (
            <>
              <Lightbulb className="w-4 h-4 mr-2" />
              Vorschlag einreichen
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};
