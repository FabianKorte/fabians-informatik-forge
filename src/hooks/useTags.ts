import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/lib/logger';

export interface Tag {
  id: string;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export function useTags() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tags = [], isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name');

      if (error) {
        logger.error('Error fetching tags:', error);
        throw error;
      }

      return data as Tag[];
    }
  });

  const createTag = useMutation({
    mutationFn: async (tag: { name: string; color: string }) => {
      const { data, error } = await supabase
        .from('tags')
        .insert(tag)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      toast({
        title: 'Tag erstellt',
        description: 'Der Tag wurde erfolgreich erstellt.',
      });
    },
    onError: (error) => {
      logger.error('Error creating tag:', error);
      toast({
        title: 'Fehler',
        description: 'Der Tag konnte nicht erstellt werden.',
        variant: 'destructive',
      });
    }
  });

  const deleteTag = useMutation({
    mutationFn: async (tagId: string) => {
      const { error } = await supabase
        .from('tags')
        .delete()
        .eq('id', tagId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      toast({
        title: 'Tag gelöscht',
        description: 'Der Tag wurde erfolgreich gelöscht.',
      });
    },
    onError: (error) => {
      logger.error('Error deleting tag:', error);
      toast({
        title: 'Fehler',
        description: 'Der Tag konnte nicht gelöscht werden.',
        variant: 'destructive',
      });
    }
  });

  const assignTagToModule = useMutation({
    mutationFn: async ({ moduleId, tagId }: { moduleId: string; tagId: string }) => {
      const { error } = await supabase
        .from('module_tags')
        .insert({ module_id: moduleId, tag_id: tagId });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['module-tags'] });
    },
    onError: (error) => {
      logger.error('Error assigning tag:', error);
      toast({
        title: 'Fehler',
        description: 'Der Tag konnte nicht zugewiesen werden.',
        variant: 'destructive',
      });
    }
  });

  return {
    tags,
    isLoading,
    createTag,
    deleteTag,
    assignTagToModule
  };
}