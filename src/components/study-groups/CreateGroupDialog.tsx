import { useState } from 'react';
import { useStudyGroups } from '@/hooks/useStudyGroups';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateGroupDialog = ({ open, onOpenChange }: CreateGroupDialogProps) => {
  const { createGroup } = useStudyGroups();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [maxMembers, setMaxMembers] = useState(50);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createGroup({
      name,
      description: description || undefined,
      is_public: isPublic,
      max_members: maxMembers,
    });

    // Reset form
    setName('');
    setDescription('');
    setIsPublic(true);
    setMaxMembers(50);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neue Lerngruppe erstellen</DialogTitle>
          <DialogDescription>
            Erstelle eine Gruppe, um gemeinsam mit anderen zu lernen.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Gruppenname *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="z.B. FIAE 2025 Prüfungsvorbereitung"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Beschreibung</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beschreibe deine Gruppe..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxMembers">Maximale Mitglieder</Label>
            <Input
              id="maxMembers"
              type="number"
              min={2}
              max={100}
              value={maxMembers}
              onChange={(e) => setMaxMembers(parseInt(e.target.value))}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isPublic">Öffentliche Gruppe</Label>
            <Switch
              id="isPublic"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Abbrechen
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Erstellen
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
