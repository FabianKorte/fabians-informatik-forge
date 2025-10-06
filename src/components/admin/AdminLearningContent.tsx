import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus } from "lucide-react";

export const AdminLearningContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [moduleType, setModuleType] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryId || !moduleType || !title || !content) {
      toast({
        title: "Fehler",
        description: "Bitte fülle alle Felder aus",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      let contentJson;
      try {
        contentJson = JSON.parse(content);
      } catch {
        toast({
          title: "Fehler",
          description: "Content muss ein gültiges JSON-Objekt sein",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const { error } = await supabase
        .from('learn_modules')
        .insert([{
          category_id: categoryId,
          type: moduleType,
          title: title,
          content: contentJson,
          order_index: 0
        }]);

      if (error) throw error;

      toast({
        title: "Erfolg",
        description: "Lerninhalt wurde hinzugefügt",
      });

      setCategoryId("");
      setModuleType("");
      setTitle("");
      setContent("");
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: error.message || "Konnte Lerninhalt nicht hinzufügen",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Neuen Lerninhalt hinzufügen</h3>
        <p className="text-sm text-muted-foreground">
          Erstelle neue Lernmodule für Kategorien
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="category">Kategorie ID</Label>
          <Input
            id="category"
            placeholder="z.B. grundlagen-it"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Modul-Typ</Label>
          <Select value={moduleType} onValueChange={setModuleType} disabled={isLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Wähle einen Typ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flashcards">Flashcards</SelectItem>
              <SelectItem value="quiz">Quiz</SelectItem>
              <SelectItem value="interactive">Interactive</SelectItem>
              <SelectItem value="matching">Matching</SelectItem>
              <SelectItem value="code">Code Challenge</SelectItem>
              <SelectItem value="dragdrop">Drag & Drop</SelectItem>
              <SelectItem value="memory">Memory</SelectItem>
              <SelectItem value="timeline">Timeline</SelectItem>
              <SelectItem value="scenario">Scenario</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Titel</Label>
          <Input
            id="title"
            placeholder="Modul-Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content (JSON)</Label>
          <Textarea
            id="content"
            placeholder='{"cards": [...]} oder {"questions": [...]}'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
            rows={10}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Content muss ein gültiges JSON-Objekt sein, passend zum gewählten Modul-Typ
          </p>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Wird hinzugefügt...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Lerninhalt hinzufügen
            </>
          )}
        </Button>
      </form>
    </div>
  );
};
