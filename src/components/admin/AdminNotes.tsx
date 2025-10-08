import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Trash2, Edit, Save, X } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const AdminNotes = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editNote, setEditNote] = useState({ title: "", content: "" });

  const fetchNotes = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('admin_notes')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      toast({
        title: "Fehler",
        description: "Notizen konnten nicht geladen werden",
        variant: "destructive",
      });
    } else {
      setNotes(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte Titel und Inhalt eingeben",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('admin_notes')
      .insert({
        user_id: user?.id,
        title: newNote.title,
        content: newNote.content,
      });

    if (error) {
      toast({
        title: "Fehler",
        description: "Notiz konnte nicht erstellt werden",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Erfolg",
        description: "Notiz wurde erstellt",
      });
      setNewNote({ title: "", content: "" });
      setIsCreating(false);
      fetchNotes();
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editNote.title.trim() || !editNote.content.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte Titel und Inhalt eingeben",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('admin_notes')
      .update({
        title: editNote.title,
        content: editNote.content,
      })
      .eq('id', id);

    if (error) {
      toast({
        title: "Fehler",
        description: "Notiz konnte nicht aktualisiert werden",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Erfolg",
        description: "Notiz wurde aktualisiert",
      });
      setEditingId(null);
      fetchNotes();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Möchtest du diese Notiz wirklich löschen?")) return;

    const { error } = await supabase
      .from('admin_notes')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Fehler",
        description: "Notiz konnte nicht gelöscht werden",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Erfolg",
        description: "Notiz wurde gelöscht",
      });
      fetchNotes();
    }
  };

  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setEditNote({ title: note.title, content: note.content });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">Admin-Notizen</h3>
          <p className="text-sm text-muted-foreground">
            Notizen zur Verwaltung und Entwicklung der Plattform
          </p>
        </div>
        <Button onClick={() => setIsCreating(!isCreating)}>
          <Plus className="w-4 h-4 mr-2" />
          Neue Notiz
        </Button>
      </div>

      {isCreating && (
        <Card className="p-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="new-title">Titel</Label>
              <Input
                id="new-title"
                placeholder="Notiz-Titel"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="new-content">Inhalt</Label>
              <Textarea
                id="new-content"
                placeholder="Notiz-Inhalt"
                rows={4}
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreate}>
                <Save className="w-4 h-4 mr-2" />
                Speichern
              </Button>
              <Button variant="outline" onClick={() => {
                setIsCreating(false);
                setNewNote({ title: "", content: "" });
              }}>
                <X className="w-4 h-4 mr-2" />
                Abbrechen
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {notes.map((note) => (
          <Card key={note.id} className="p-4">
            {editingId === note.id ? (
              <div className="space-y-3">
                <div>
                  <Label htmlFor={`edit-title-${note.id}`}>Titel</Label>
                  <Input
                    id={`edit-title-${note.id}`}
                    value={editNote.title}
                    onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor={`edit-content-${note.id}`}>Inhalt</Label>
                  <Textarea
                    id={`edit-content-${note.id}`}
                    rows={4}
                    value={editNote.content}
                    onChange={(e) => setEditNote({ ...editNote, content: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleUpdate(note.id)}>
                    <Save className="w-4 h-4 mr-2" />
                    Speichern
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                    <X className="w-4 h-4 mr-2" />
                    Abbrechen
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{note.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      Aktualisiert: {format(new Date(note.updated_at), "PPp", { locale: de })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => startEditing(note)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(note.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm whitespace-pre-wrap">{note.content}</p>
              </div>
            )}
          </Card>
        ))}

        {notes.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Noch keine Notizen vorhanden</p>
          </Card>
        )}
      </div>
    </div>
  );
};