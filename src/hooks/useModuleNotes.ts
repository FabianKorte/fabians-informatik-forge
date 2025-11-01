import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/lib/logger';

interface ModuleNote {
  id: string;
  note_text: string;
  created_at: string;
  updated_at: string;
}

export const useModuleNotes = (categoryId: string, moduleIndex: number) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: note, isLoading } = useQuery({
    queryKey: ['module-notes', categoryId, moduleIndex],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_module_notes')
        .select('*')
        .eq('user_id', user.id)
        .eq('category_id', categoryId)
        .eq('module_index', moduleIndex)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        logger.error('Error fetching module note:', error);
        throw error;
      }

      return data as ModuleNote | null;
    },
  });

  const saveNote = useMutation({
    mutationFn: async (noteText: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      if (note) {
        const { error } = await supabase
          .from('user_module_notes')
          .update({ note_text: noteText })
          .eq('id', note.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_module_notes')
          .insert({
            user_id: user.id,
            category_id: categoryId,
            module_index: moduleIndex,
            note_text: noteText,
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['module-notes', categoryId, moduleIndex] });
      toast({
        title: 'Notiz gespeichert',
        description: 'Deine Notiz wurde erfolgreich gespeichert.',
      });
    },
    onError: (error) => {
      logger.error('Error saving note:', error);
      toast({
        title: 'Fehler',
        description: 'Notiz konnte nicht gespeichert werden.',
        variant: 'destructive',
      });
    },
  });

  const deleteNote = useMutation({
    mutationFn: async () => {
      if (!note) return;

      const { error } = await supabase
        .from('user_module_notes')
        .delete()
        .eq('id', note.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['module-notes', categoryId, moduleIndex] });
      toast({
        title: 'Notiz gelöscht',
        description: 'Deine Notiz wurde erfolgreich gelöscht.',
      });
    },
  });

  return {
    note,
    isLoading,
    saveNote: saveNote.mutate,
    deleteNote: deleteNote.mutate,
  };
};
