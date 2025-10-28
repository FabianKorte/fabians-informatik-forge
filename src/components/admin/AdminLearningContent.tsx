import { useState, useEffect, useMemo } from "react";
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
import { Loader2, Plus, Pencil, Trash2, Eye, ArrowUpDown, ArrowUp, ArrowDown, Download } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useLearningModules } from "@/hooks/useLearningModules";
import { useCategories } from "@/hooks/useCategories";
import { adminLearningModuleSchema } from "@/lib/validation/learningContent";
import { handleValidationError } from "@/lib/errorHandler";

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
  const { modules, isLoading, createModule, updateModule, deleteModule, bulkDelete } = useLearningModules();
  const { categories } = useCategories();
  const [categoryId, setCategoryId] = useState("");
  const [moduleType, setModuleType] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingModule, setEditingModule] = useState<LearnModule | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortKey, setSortKey] = useState<'category' | 'type' | 'title'>('category');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const itemsPerPage = 20;
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleEdit = (module: LearnModule) => {
    setEditingModule(module);
    setCategoryId(module.category_id);
    setModuleType(module.type);
    setTitle(module.title);
    setContent(JSON.stringify(module.content, null, 2));
    // Switch to the create/edit tab
    const tabsList = document.querySelector('[role="tablist"]');
    const createTab = tabsList?.querySelector('[value="create"]') as HTMLElement;
    createTab?.click();
  };

  const handleCancelEdit = () => {
    setEditingModule(null);
    setCategoryId("");
    setModuleType("");
    setTitle("");
    setContent("");
  };

  const handleDelete = async (id: string) => {
    await deleteModule.mutateAsync(id);
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    await bulkDelete.mutateAsync(Array.from(selectedIds));
    setSelectedIds(new Set());
  };

  const handleExport = () => {
    const selected = modules.filter(m => selectedIds.has(m.id));
    const json = JSON.stringify(selected, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lerninhalte-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleSort = (key: 'category' | 'type' | 'title') => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === displayModules.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(displayModules.map(m => m.id)));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate with Zod schema
      const validated = adminLearningModuleSchema.parse({
        category_id: categoryId,
        type: moduleType,
        title: title,
        content: content,
      });
      
      if (editingModule) {
        await updateModule.mutateAsync({
          id: editingModule.id,
          category_id: validated.category_id,
          type: validated.type,
          title: validated.title,
          content: validated.content,
        });
      } else {
        await createModule.mutateAsync({
          category_id: validated.category_id,
          type: validated.type,
          title: validated.title,
          content: validated.content,
          order_index: 0
        });
      }

      handleCancelEdit();
    } catch (error: any) {
      handleValidationError(error);
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

  const displayModules = useMemo(() => {
    const getCatTitle = (id: string) => categories.find(c => c.id === id)?.title || id;
    let list = [...modules];
    const q = debouncedSearch.trim().toLowerCase();
    if (q) {
      list = list.filter((m) =>
        m.title.toLowerCase().includes(q) ||
        getCatTitle(m.category_id).toLowerCase().includes(q) ||
        m.type.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      const aVal = sortKey === 'category' ? getCatTitle(a.category_id) : sortKey === 'type' ? a.type : a.title;
      const bVal = sortKey === 'category' ? getCatTitle(b.category_id) : sortKey === 'type' ? b.type : b.title;
      const cmp = aVal.localeCompare(bVal, 'de', { sensitivity: 'base' });
      return sortOrder === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [modules, categories, debouncedSearch, sortKey, sortOrder]);

  const paginatedModules = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return displayModules.slice(start, start + itemsPerPage);
  }, [displayModules, currentPage]);

  const totalPages = Math.ceil(displayModules.length / itemsPerPage);

  const getSortIcon = (key: 'category' | 'type' | 'title') => {
    if (sortKey !== key) return <ArrowUpDown className="w-4 h-4 ml-1 opacity-30" />;
    return sortOrder === 'asc' ? <ArrowUp className="w-4 h-4 ml-1" /> : <ArrowDown className="w-4 h-4 ml-1" />;
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
              Seite {currentPage} von {totalPages || 1} · Sichtbar: {displayModules.length} · Gesamt: {modules.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                <Input
                  placeholder="Suche nach Titel, Kategorie, Typ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="sm:max-w-xs"
                />
                {selectedIds.size > 0 && (
                  <div className="flex gap-2">
                    <Badge variant="secondary">{selectedIds.size} ausgewählt</Badge>
                    <Button size="sm" variant="outline" onClick={handleExport}>
                      <Download className="w-4 h-4 mr-2" />
                      Exportieren
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Löschen
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Ausgewählte Lerninhalte löschen?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Möchtest du {selectedIds.size} Lerninhalt(e) wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                          <AlertDialogAction onClick={handleBulkDelete}>
                            Löschen
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedIds.size === paginatedModules.length && paginatedModules.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 select-none"
                      onClick={() => toggleSort('category')}
                      role="button"
                      tabIndex={0}
                      aria-label="Nach Kategorie sortieren"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleSort('category');
                        }
                      }}
                    >
                      <div className="flex items-center">
                        Kategorie
                        {getSortIcon('category')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 select-none"
                      onClick={() => toggleSort('title')}
                      role="button"
                      tabIndex={0}
                      aria-label="Nach Titel sortieren"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleSort('title');
                        }
                      }}
                    >
                      <div className="flex items-center">
                        Titel
                        {getSortIcon('title')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 select-none"
                      onClick={() => toggleSort('type')}
                      role="button"
                      tabIndex={0}
                      aria-label="Nach Typ sortieren"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleSort('type');
                        }
                      }}
                    >
                      <div className="flex items-center">
                        Typ
                        {getSortIcon('type')}
                      </div>
                    </TableHead>
                    <TableHead>Reihenfolge</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedModules.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        {debouncedSearch ? 'Keine Lerninhalte gefunden' : 'Keine Lerninhalte vorhanden'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedModules.map((module) => (
                      <TableRow key={module.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedIds.has(module.id)}
                            onCheckedChange={(checked) => {
                              setSelectedIds(prev => {
                                const next = new Set(prev);
                                if (checked) {
                                  next.add(module.id);
                                } else {
                                  next.delete(module.id);
                                }
                                return next;
                              });
                            }}
                          />
                        </TableCell>
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
              
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Zurück
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Seite {currentPage} von {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Weiter
                  </Button>
                </div>
              )}
            </div>
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
