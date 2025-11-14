import { useState } from 'react';
import { Trash2, Tag, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { logger } from '@/lib/logger';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useLearningModules } from '@/hooks/useLearningModules';
import { useTags } from '@/hooks/useTags';
import { useToast } from '@/hooks/use-toast';

export default function BulkEditModules() {
  const { modules } = useLearningModules();
  const { tags, assignTagToModule } = useTags();
  const { bulkDelete } = useLearningModules();
  const { toast } = useToast();
  
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const toggleModule = (moduleId: string) => {
    setSelectedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const selectAll = () => {
    if (selectedModules.length === modules.length) {
      setSelectedModules([]);
    } else {
      setSelectedModules(modules.map(m => m.id));
    }
  };

  const handleBulkAction = async () => {
    if (selectedModules.length === 0) {
      toast({
        title: 'Keine Auswahl',
        description: 'Bitte wähle mindestens ein Modul aus.',
        variant: 'destructive',
      });
      return;
    }

    if (bulkAction === 'delete') {
      setShowDeleteConfirm(true);
    } else if (bulkAction === 'tag' && selectedTag) {
      try {
        for (const moduleId of selectedModules) {
          await assignTagToModule.mutateAsync({ moduleId, tagId: selectedTag });
        }
        toast({
          title: 'Tags zugewiesen',
          description: `${selectedModules.length} Module wurden getaggt.`,
        });
        setSelectedModules([]);
        setBulkAction('');
        setSelectedTag('');
      } catch (error) {
        logger.error('Bulk tag error:', error);
      }
    }
  };

  const confirmDelete = () => {
    bulkDelete.mutate(selectedModules);
    setSelectedModules([]);
    setShowDeleteConfirm(false);
    setBulkAction('');
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedModules.length === modules.length && modules.length > 0}
              onCheckedChange={selectAll}
            />
            <span className="text-sm font-medium">
              {selectedModules.length} von {modules.length} ausgewählt
            </span>
          </div>

          {selectedModules.length > 0 && (
            <div className="flex items-center gap-2">
              <Select value={bulkAction} onValueChange={setBulkAction}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Aktion wählen..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delete">
                    <div className="flex items-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      Löschen
                    </div>
                  </SelectItem>
                  <SelectItem value="tag">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Tag zuweisen
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {bulkAction === 'tag' && (
                <Select value={selectedTag} onValueChange={setSelectedTag}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Tag wählen..." />
                  </SelectTrigger>
                  <SelectContent>
                    {tags.map(tag => (
                      <SelectItem key={tag.id} value={tag.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: tag.color }}
                          />
                          {tag.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <Button onClick={handleBulkAction} variant="default">
                Ausführen
              </Button>
            </div>
          )}
        </div>
      </Card>

      <div className="space-y-2">
        {modules.map(module => (
          <Card key={module.id} className="p-4">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={selectedModules.includes(module.id)}
                onCheckedChange={() => toggleModule(module.id)}
              />
              <div className="flex-1">
                <div className="font-medium">{module.title}</div>
                <div className="text-sm text-muted-foreground">
                  {module.category_id} • {module.type}
                </div>
              </div>
              <Badge variant="outline">{module.type}</Badge>
            </div>
          </Card>
        ))}
      </div>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Module löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Möchtest du wirklich {selectedModules.length} Module löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}