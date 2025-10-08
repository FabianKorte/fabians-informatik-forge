import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Pencil, Trash2, Eye } from "lucide-react";

interface LearnModule {
  id: string;
  category_id: string;
  type: string;
  title: string;
  content: any;
  order_index: number;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  title: string;
}

export const AdminLearningContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modules, setModules] = useState<LearnModule[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [moduleType, setModuleType] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingModule, setEditingModule] = useState<LearnModule | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadModules();
    loadCategories();
  }, []);

  const loadModules = async () => {
    const { data, error } = await supabase
      .from('learn_modules')
      .select('*')
      .order('category_id', { ascending: true })
      .order('order_index', { ascending: true });

    if (error) {
      toast({
        title: "Fehler",
        description: "Konnte Lerninhalte nicht laden",
        variant: "destructive",
      });
      return;
    }

    setModules(data || []);
  };

  const loadCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('id, title')
      .order('id');

    if (error) {
      toast({
        title: "Fehler",
        description: "Konnte Kategorien nicht laden",
        variant: "destructive",
      });
      return;
    }

    setCategories(data || []);
  };

  const handleEdit = (module: LearnModule) => {
    setEditingModule(module);
    setCategoryId(module.category_id);
    setModuleType(module.type);
    setTitle(module.title);
    setContent(JSON.stringify(module.content, null, 2));
  };

  const handleCancelEdit = () => {
    setEditingModule(null);
    setCategoryId("");
    setModuleType("");
    setTitle("");
    setContent("");
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('learn_modules')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Fehler",
        description: "Konnte Lerninhalt nicht löschen",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Erfolg",
      description: "Lerninhalt wurde gelöscht",
    });

    loadModules();
  };

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

      if (editingModule) {
        const { error } = await supabase
          .from('learn_modules')
          .update({
            category_id: categoryId,
            type: moduleType,
            title: title,
            content: contentJson,
          })
          .eq('id', editingModule.id);

        if (error) throw error;

        toast({
          title: "Erfolg",
          description: "Lerninhalt wurde aktualisiert",
        });
      } else {
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
      }

      handleCancelEdit();
      loadModules();
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

  const getModuleTypeBadge = (type: string) => {
    const variants: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
      flashcards: { label: "Flashcards", variant: "default" },
      quiz: { label: "Quiz", variant: "secondary" },
      interactive: { label: "Interactive", variant: "outline" },
      matching: { label: "Matching", variant: "default" },
      code: { label: "Code", variant: "secondary" },
      dragdrop: { label: "Drag & Drop", variant: "outline" },
      memory: { label: "Memory", variant: "default" },
      timeline: { label: "Timeline", variant: "secondary" },
      scenario: { label: "Scenario", variant: "outline" },
    };
    const config = variants[type] || { label: type, variant: "default" as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList>
        <TabsTrigger value="overview">Übersicht</TabsTrigger>
        <TabsTrigger value="create">
          {editingModule ? "Bearbeiten" : "Neu erstellen"}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Lerninhalte Übersicht</CardTitle>
            <CardDescription>
              Alle vorhandenen Lernmodule ({modules.length} gesamt)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kategorie</TableHead>
                  <TableHead>Titel</TableHead>
                  <TableHead>Typ</TableHead>
                  <TableHead>Reihenfolge</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      Keine Lerninhalte vorhanden
                    </TableCell>
                  </TableRow>
                ) : (
                  modules.map((module) => (
                    <TableRow key={module.id}>
                      <TableCell className="font-medium">
                        {categories.find(c => c.id === module.category_id)?.title || module.category_id}
                      </TableCell>
                      <TableCell>{module.title}</TableCell>
                      <TableCell>{getModuleTypeBadge(module.type)}</TableCell>
                      <TableCell>{module.order_index}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(module)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Lerninhalt löschen?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Möchtest du "{module.title}" wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(module.id)}>
                                  Löschen
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="create" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>
              {editingModule ? "Lerninhalt bearbeiten" : "Neuen Lerninhalt hinzufügen"}
            </CardTitle>
            <CardDescription>
              {editingModule 
                ? "Bearbeite den vorhandenen Lerninhalt" 
                : "Erstelle ein neues Lernmodul für eine Kategorie"}
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                  rows={12}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Content muss ein gültiges JSON-Objekt sein, passend zum gewählten Modul-Typ
                </p>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {editingModule ? "Wird aktualisiert..." : "Wird hinzugefügt..."}
                    </>
                  ) : (
                    <>
                      {editingModule ? (
                        <>
                          <Pencil className="w-4 h-4 mr-2" />
                          Lerninhalt aktualisieren
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Lerninhalt hinzufügen
                        </>
                      )}
                    </>
                  )}
                </Button>
                {editingModule && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelEdit}
                    disabled={isLoading}
                  >
                    Abbrechen
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
