import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { logAuditAction } from '@/lib/auditLog';

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

interface CreateModuleData {
  category_id: string;
  type: string;
  title: string;
  content: any;
  order_index?: number;
}

export const useLearningModules = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: modules = [], isLoading } = useQuery({
    queryKey: ['learning-modules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learn_modules')
        .select('*')
        .order('category_id', { ascending: true })
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as LearnModule[];
    },
  });

  const createModule = useMutation({
    mutationFn: async (moduleData: CreateModuleData) => {
      const { data, error } = await supabase
        .from('learn_modules')
        .insert([{ ...moduleData, order_index: moduleData.order_index ?? 0 }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: async (data) => {
      await logAuditAction({
        action: 'learning_content_created',
        entity_type: 'learn_module',
        entity_id: data.id,
        details: { title: data.title, type: data.type, category: data.category_id }
      });
      
      queryClient.invalidateQueries({ queryKey: ['learning-modules'] });
      toast({
        title: 'Erfolg',
        description: 'Lerninhalt wurde hinzugefügt',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Fehler',
        description: error.message || 'Konnte Lerninhalt nicht hinzufügen',
        variant: 'destructive',
      });
    },
  });

  const updateModule = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<LearnModule> & { id: string }) => {
      const { error } = await supabase
        .from('learn_modules')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      return { id, ...updates };
    },
    onSuccess: async (data) => {
      await logAuditAction({
        action: 'learning_content_updated',
        entity_type: 'learn_module',
        entity_id: data.id,
        details: { title: data.title, type: data.type, category: data.category_id }
      });
      
      queryClient.invalidateQueries({ queryKey: ['learning-modules'] });
      toast({
        title: 'Erfolg',
        description: 'Lerninhalt wurde aktualisiert',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Fehler',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteModule = useMutation({
    mutationFn: async (id: string) => {
      const module = modules.find(m => m.id === id);
      
      const { error } = await supabase
        .from('learn_modules')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return module;
    },
    onSuccess: async (module) => {
      await logAuditAction({
        action: 'learning_content_deleted',
        entity_type: 'learn_module',
        entity_id: module?.id,
        details: { title: module?.title, type: module?.type }
      });
      
      queryClient.invalidateQueries({ queryKey: ['learning-modules'] });
      toast({
        title: 'Erfolg',
        description: 'Lerninhalt wurde gelöscht',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Fehler',
        description: 'Konnte Lerninhalt nicht löschen',
        variant: 'destructive',
      });
    },
  });

  const bulkDelete = useMutation({
    mutationFn: async (ids: string[]) => {
      const deletedModules = modules.filter(m => ids.includes(m.id));
      
      const { error } = await supabase
        .from('learn_modules')
        .delete()
        .in('id', ids);

      if (error) throw error;
      return deletedModules;
    },
    onSuccess: async (deletedModules) => {
      await logAuditAction({
        action: 'learning_content_bulk_deleted',
        entity_type: 'learn_module',
        details: {
          count: deletedModules.length,
          titles: deletedModules.map(m => m.title)
        }
      });
      
      queryClient.invalidateQueries({ queryKey: ['learning-modules'] });
      toast({
        title: 'Erfolg',
        description: `${deletedModules.length} Lerninhalte wurden gelöscht`,
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Fehler',
        description: 'Konnte Lerninhalte nicht löschen',
        variant: 'destructive',
      });
    },
  });

  return {
    modules,
    isLoading,
    createModule,
    updateModule,
    deleteModule,
    bulkDelete,
  };
};
