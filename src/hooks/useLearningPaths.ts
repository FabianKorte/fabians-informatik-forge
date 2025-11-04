import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/lib/logger';

interface LearningPath {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  modules: any[];
  current_position: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useLearningPaths() {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [activePath, setActivePath] = useState<LearningPath | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPaths();
  }, []);

  const fetchPaths = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('learning_paths')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const typedPaths = (data || []).map(p => ({
        ...p,
        difficulty_level: p.difficulty_level as 'beginner' | 'intermediate' | 'advanced',
        modules: Array.isArray(p.modules) ? p.modules : []
      })) as LearningPath[];
      setPaths(typedPaths);
      const active = typedPaths.find(p => p.is_active);
      setActivePath(active || null);
    } catch (error) {
      logger.error('Error fetching learning paths:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createPath = async (
    name: string,
    description: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    modules: any[]
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Deactivate other paths
      if (paths.some(p => p.is_active)) {
        await supabase
          .from('learning_paths')
          .update({ is_active: false })
          .eq('user_id', user.id)
          .eq('is_active', true);
      }

      const { data, error } = await supabase
        .from('learning_paths')
        .insert([{
          user_id: user.id,
          name,
          description,
          difficulty_level: difficulty,
          modules,
          is_active: true,
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Lernpfad erstellt",
        description: `"${name}" wurde erfolgreich erstellt`,
        className: "animate-fade-in",
      });

      await fetchPaths();
      return data;
    } catch (error) {
      logger.error('Error creating learning path:', error);
      toast({
        title: "Fehler",
        description: "Konnte Lernpfad nicht erstellen",
        variant: "destructive",
      });
    }
  };

  const updateProgress = async (pathId: string, newPosition: number) => {
    try {
      const { error } = await supabase
        .from('learning_paths')
        .update({ current_position: newPosition })
        .eq('id', pathId);

      if (error) throw error;

      await fetchPaths();
    } catch (error) {
      logger.error('Error updating progress:', error);
    }
  };

  const setActivePathById = async (pathId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Deactivate all paths
      await supabase
        .from('learning_paths')
        .update({ is_active: false })
        .eq('user_id', user.id);

      // Activate selected path
      const { error } = await supabase
        .from('learning_paths')
        .update({ is_active: true })
        .eq('id', pathId);

      if (error) throw error;

      await fetchPaths();
    } catch (error) {
      logger.error('Error setting active path:', error);
    }
  };

  const deletePath = async (pathId: string) => {
    try {
      const { error } = await supabase
        .from('learning_paths')
        .delete()
        .eq('id', pathId);

      if (error) throw error;

      toast({
        title: "Lernpfad gelöscht",
        className: "animate-fade-in",
      });

      await fetchPaths();
    } catch (error) {
      logger.error('Error deleting learning path:', error);
      toast({
        title: "Fehler",
        description: "Konnte Lernpfad nicht löschen",
        variant: "destructive",
      });
    }
  };

  return {
    paths,
    activePath,
    isLoading,
    createPath,
    updateProgress,
    setActivePath: setActivePathById,
    deletePath,
    refreshPaths: fetchPaths,
  };
}