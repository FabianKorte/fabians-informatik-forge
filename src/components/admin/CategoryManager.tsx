import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { logAuditAction } from "@/lib/auditLog";

interface CategoryFormData {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  gradient: string;
}

const difficulties = ["Anfänger", "Fortgeschritten", "Experte"];
const icons = ["Code", "Database", "Lock", "Server", "Globe", "Smartphone", "Users", "TrendingUp"];

export default function CategoryManager() {
  const { categories, isLoading } = useCategories();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryFormData | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    id: '',
    title: '',
    description: '',
    icon: 'Code',
    difficulty: 'Anfänger',
    gradient: 'from-blue-500 to-purple-600',
  });

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      icon: 'Code',
      difficulty: 'Anfänger',
      gradient: 'from-blue-500 to-purple-600',
    });
    setEditingCategory(null);
  };

  const handleEdit = (category: any) => {
    setFormData({
      id: category.id,
      title: category.title,
      description: category.description,
      icon: category.icon,
      difficulty: category.difficulty,
      gradient: category.gradient,
    });
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('categories')
          .update({
            title: formData.title,
            description: formData.description,
            icon: formData.icon,
            difficulty: formData.difficulty,
            gradient: formData.gradient,
          })
          .eq('id', formData.id);

        if (error) throw error;
        
        await logAuditAction({
          action: 'learning_content_updated',
          entity_type: 'learn_module',
          entity_id: formData.id,
          details: { type: 'category', title: formData.title },
        });

        toast.success('Kategorie aktualisiert');
      } else {
        const { error } = await supabase
          .from('categories')
          .insert({
            id: formData.id,
            title: formData.title,
            description: formData.description,
            icon: formData.icon,
            difficulty: formData.difficulty,
            gradient: formData.gradient,
          });

        if (error) throw error;

        await logAuditAction({
          action: 'learning_content_created',
          entity_type: 'learn_module',
          entity_id: formData.id,
          details: { type: 'category', title: formData.title },
        });

        toast.success('Kategorie erstellt');
      }

      // Refresh categories list
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error('Fehler: ' + error.message);
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (!confirm('Kategorie wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if (error) throw error;

      await logAuditAction({
        action: 'learning_content_deleted',
        entity_type: 'learn_module',
        entity_id: categoryId,
        details: { type: 'category' },
      });

      toast.success('Kategorie gelöscht');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    } catch (error: any) {
      toast.error('Fehler: ' + error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kategorie-Verwaltung</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Neue Kategorie
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Kategorie bearbeiten' : 'Neue Kategorie'}
              </DialogTitle>
              <DialogDescription>
                Erstelle oder bearbeite eine Lernkategorie
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>ID (eindeutig, z.B. "webentwicklung")</Label>
                <Input
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  disabled={!!editingCategory}
                />
              </div>

              <div>
                <Label>Titel</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <Label>Beschreibung</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Icon</Label>
                  <Select value={formData.icon} onValueChange={(v) => setFormData({ ...formData, icon: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {icons.map((icon) => (
                        <SelectItem key={icon} value={icon}>
                          {icon}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Schwierigkeit</Label>
                  <Select value={formData.difficulty} onValueChange={(v) => setFormData({ ...formData, difficulty: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((diff) => (
                        <SelectItem key={diff} value={diff}>
                          {diff}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Gradient (Tailwind-Klasse)</Label>
                <Input
                  value={formData.gradient}
                  onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                  placeholder="from-blue-500 to-purple-600"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Abbrechen
              </Button>
              <Button onClick={handleSave}>Speichern</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {categories?.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(category)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(category.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>Gradient: {category.gradient}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
