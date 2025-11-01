import { useState, useEffect } from 'react';
import { useModuleNotes } from '@/hooks/useModuleNotes';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save, Trash2, StickyNote } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface ModuleNotesEditorProps {
  categoryId: string;
  moduleIndex: number;
}

export const ModuleNotesEditor = ({ categoryId, moduleIndex }: ModuleNotesEditorProps) => {
  const { note, saveNote, deleteNote, isLoading } = useModuleNotes(categoryId, moduleIndex);
  const [noteText, setNoteText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (note) {
      setNoteText(note.note_text);
      setIsOpen(true);
    }
  }, [note]);

  const handleSave = () => {
    if (noteText.trim()) {
      saveNote(noteText);
    }
  };

  const handleDelete = () => {
    setNoteText('');
    deleteNote();
    setIsOpen(false);
  };

  return (
    <Card className="p-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 w-full justify-between hover:opacity-80">
          <div className="flex items-center gap-2">
            <StickyNote className="h-5 w-5 text-primary" />
            <span className="font-semibold">Persönliche Notizen</span>
          </div>
          {note && (
            <span className="text-xs text-muted-foreground">
              Zuletzt bearbeitet: {new Date(note.updated_at).toLocaleDateString('de-DE')}
            </span>
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-3">
          <Textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Schreibe deine Notizen zu diesem Modul..."
            rows={6}
            className="resize-none"
          />
          <div className="flex gap-2 justify-end">
            {note && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isLoading}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Löschen
              </Button>
            )}
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!noteText.trim() || isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              Speichern
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
