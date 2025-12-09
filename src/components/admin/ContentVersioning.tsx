import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { History, Eye, RotateCcw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/lib/logger';
import { format } from 'date-fns';

interface VersionHistoryProps {
  moduleId: string;
}

interface ModuleVersion {
  id: string;
  version: number;
  title: string;
  content: any;
  changed_by: string | null;
  change_notes: string | null;
  created_at: string;
}

export function ContentVersioning({ moduleId }: VersionHistoryProps) {
  const [selectedVersion, setSelectedVersion] = useState<ModuleVersion | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: versions = [], isLoading } = useQuery({
    queryKey: ['module-versions', moduleId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learn_modules_history')
        .select('*')
        .eq('module_id', moduleId)
        .order('version', { ascending: false });

      if (error) throw error;
      return data as ModuleVersion[];
    }
  });

  const restoreVersion = useMutation({
    mutationFn: async (versionId: string) => {
      const version = versions.find(v => v.id === versionId);
      if (!version) throw new Error('Version nicht gefunden');

      // Get current module to create a history entry
      const { data: currentModule, error: fetchError } = await supabase
        .from('learn_modules')
        .select('*')
        .eq('id', moduleId)
        .maybeSingle();

      if (fetchError) throw fetchError;
      if (!currentModule) throw new Error('Modul nicht gefunden');

      // Create history entry for current state
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error: historyError } = await supabase
        .from('learn_modules_history')
        .insert({
          module_id: moduleId,
          version: versions.length + 1,
          title: currentModule.title,
          content: currentModule.content,
          changed_by: user?.id,
          change_notes: 'Auto-backup before restore'
        });

      if (historyError) throw historyError;

      // Restore version
      const { error: updateError } = await supabase
        .from('learn_modules')
        .update({
          title: version.title,
          content: version.content
        })
        .eq('id', moduleId);

      if (updateError) throw updateError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learning-modules'] });
      queryClient.invalidateQueries({ queryKey: ['module-versions', moduleId] });
      toast({
        title: 'Version wiederhergestellt',
        description: 'Die Version wurde erfolgreich wiederhergestellt.',
      });
      setSelectedVersion(null);
    },
    onError: (error) => {
      logger.error('Error restoring version:', error);
      toast({
        title: 'Fehler',
        description: 'Die Version konnte nicht wiederhergestellt werden.',
        variant: 'destructive',
      });
    }
  });

  if (isLoading) {
    return <div className="text-center p-4">Lade Versionshistorie...</div>;
  }

  if (versions.length === 0) {
    return (
      <Card className="p-6 text-center">
        <History className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
        <p className="text-muted-foreground">Keine Versionshistorie verfügbar</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <History className="h-5 w-5" />
        <h3 className="font-semibold">Versionshistorie</h3>
        <Badge variant="secondary">{versions.length} Versionen</Badge>
      </div>

      <div className="space-y-2">
        {versions.map((version) => (
          <Card key={version.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge>Version {version.version}</Badge>
                  <span className="font-medium">{version.title}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(version.created_at), 'dd.MM.yyyy HH:mm')}
                  {version.change_notes && ` - ${version.change_notes}`}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedVersion(version)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Ansehen
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => restoreVersion.mutate(version.id)}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Wiederherstellen
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedVersion} onOpenChange={() => setSelectedVersion(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedVersion?.title} (Version {selectedVersion?.version})
            </DialogTitle>
          </DialogHeader>
          {selectedVersion && (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
              {JSON.stringify(selectedVersion.content, null, 2)}
            </pre>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}