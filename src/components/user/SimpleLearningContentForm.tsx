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

export const SimpleLearningContentForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [moduleType, setModuleType] = useState("");
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<string[]>(["", ""]);

  const addItem = () => {
    setItems([...items, ""]);
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    if (items.length > 2) {
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

    if (!categoryId || !moduleType || !title || items.some(item => !item.trim())) {
      toast({
        title: "Fehler",
        description: "Bitte fülle alle Felder aus",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create simple content structure based on type
      let content = {};
      const cleanItems = items.filter(item => item.trim());

      switch (moduleType) {
        case "flashcards":
          content = {
            cards: cleanItems.map((item, index) => ({
              question: item,
              answer: `Antwort ${index + 1} (wird vom Admin bearbeitet)`
            }))
          };
          break;
        case "quiz":
          content = {
            questions: cleanItems.map((item, index) => ({
              question: item,
              options: ["Option A", "Option B", "Option C", "Option D"],
              correctAnswer: 0,
              explanation: "Wird vom Admin bearbeitet"
            }))
          };
          break;
        case "matching":
          content = {
            pairs: cleanItems.map((item, index) => ({
              term: item,
              definition: `Definition ${index + 1} (wird vom Admin bearbeitet)`
            }))
          };
          break;
        default:
          content = { items: cleanItems };
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
      setItems(["", ""]);
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
          <Select value={moduleType} onValueChange={setModuleType} disabled={isLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Wähle einen Typ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flashcards">Karteikarten</SelectItem>
              <SelectItem value="quiz">Quiz</SelectItem>
              <SelectItem value="matching">Zuordnung</SelectItem>
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
          <Label>Inhalte (mindestens 2)</Label>
          <p className="text-xs text-muted-foreground mb-2">
            {moduleType === "flashcards" && "Gib die Fragen ein - Antworten werden später vom Admin ergänzt"}
            {moduleType === "quiz" && "Gib die Fragen ein - Optionen und Antworten werden später vom Admin ergänzt"}
            {moduleType === "matching" && "Gib die Begriffe ein - Definitionen werden später vom Admin ergänzt"}
            {!moduleType && "Wähle zuerst einen Lern-Typ"}
          </p>
          {items.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`${moduleType === 'flashcards' ? 'Frage' : moduleType === 'quiz' ? 'Frage' : 'Begriff'} ${index + 1}`}
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                disabled={isLoading}
              />
              {items.length > 2 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeItem(index)}
                  disabled={isLoading}
                >
                  <span className="text-lg">×</span>
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addItem}
            disabled={isLoading}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Weiteren Inhalt hinzufügen
          </Button>
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
