import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: number;
  category: string;
  estimated_completion: string;
  completion_date: string;
}

export const AdminRoadmap = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "planned",
    priority: 1,
    category: "",
    estimated_completion: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchRoadmapItems();
  }, []);

  const fetchRoadmapItems = async () => {
    const { data, error } = await supabase
      .from('roadmap')
      .select('*')
      .order('priority', { ascending: false });

    if (!error && data) {
      setItems(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      toast({
        title: "Fehler",
        description: "Titel ist erforderlich",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (editingId) {
        const { error } = await supabase
          .from('roadmap')
          .update({
            ...formData,
            estimated_completion: formData.estimated_completion || null,
          })
          .eq('id', editingId);

        if (error) throw error;

        toast({
          title: "✓ Erfolg",
          description: "Roadmap-Item wurde aktualisiert",
          className: "animate-fade-in",
        });
      } else {
        const { error } = await supabase
          .from('roadmap')
          .insert([{
            ...formData,
            estimated_completion: formData.estimated_completion || null,
          }]);

        if (error) throw error;

        toast({
          title: "✓ Erfolg",
          description: "Roadmap-Item wurde hinzugefügt",
          className: "animate-fade-in",
        });
      }

      setFormData({
        title: "",
        description: "",
        status: "planned",
        priority: 1,
        category: "",
        estimated_completion: "",
      });
      setEditingId(null);
      fetchRoadmapItems();
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: error.message || "Konnte Roadmap-Item nicht speichern",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: RoadmapItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      description: item.description || "",
      status: item.status,
      priority: item.priority,
      category: item.category || "",
      estimated_completion: item.estimated_completion || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Möchtest du dieses Roadmap-Item wirklich löschen?")) return;

    const { error } = await supabase
      .from('roadmap')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Fehler",
        description: "Konnte Item nicht löschen",
        variant: "destructive",
      });
    } else {
      toast({
        title: "✓ Erfolg",
        description: "Item wurde gelöscht",
        className: "animate-fade-in",
      });
      fetchRoadmapItems();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Roadmap verwalten</h3>
        <p className="text-sm text-muted-foreground">
          {editingId ? "Bearbeite" : "Erstelle neue"} Roadmap-Einträge
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titel *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategorie</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Beschreibung</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            disabled={isLoading}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => setFormData({ ...formData, status: value })}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planned">Geplant</SelectItem>
                <SelectItem value="in_progress">In Arbeit</SelectItem>
                <SelectItem value="completed">Abgeschlossen</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priorität</Label>
            <Input
              id="priority"
              type="number"
              min="1"
              max="10"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimated">Geschätzte Fertigstellung</Label>
            <Input
              id="estimated"
              type="date"
              value={formData.estimated_completion}
              onChange={(e) => setFormData({ ...formData, estimated_completion: e.target.value })}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Wird gespeichert...
              </>
            ) : (
              <>
                {editingId ? <Pencil className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                {editingId ? "Aktualisieren" : "Hinzufügen"}
              </>
            )}
          </Button>
          {editingId && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setEditingId(null);
                setFormData({
                  title: "",
                  description: "",
                  status: "planned",
                  priority: 1,
                  category: "",
                  estimated_completion: "",
                });
              }}
            >
              Abbrechen
            </Button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        <h4 className="font-semibold">Bestehende Einträge</h4>
        {items.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h5 className="font-semibold">{item.title}</h5>
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                )}
                <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Status: {item.status}</span>
                  <span>Priorität: {item.priority}</span>
                  {item.category && <span>Kategorie: {item.category}</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
