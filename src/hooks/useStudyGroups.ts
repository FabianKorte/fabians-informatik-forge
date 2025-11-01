import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/lib/logger';

interface StudyGroup {
  id: string;
  name: string;
  description: string | null;
  creator_id: string;
  is_public: boolean;
  max_members: number;
  created_at: string;
  member_count?: number;
}

interface GroupMember {
  id: string;
  user_id: string;
  role: string;
  joined_at: string;
  username?: string;
}

export const useStudyGroups = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: groups = [], isLoading } = useQuery({
    queryKey: ['study-groups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('study_groups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        logger.error('Error fetching study groups:', error);
        throw error;
      }

      // Get member counts
      const groupsWithCounts = await Promise.all(
        data.map(async (group) => {
          const { count } = await supabase
            .from('study_group_members')
            .select('*', { count: 'exact', head: true })
            .eq('group_id', group.id);

          return { ...group, member_count: count || 0 };
        })
      );

      return groupsWithCounts as StudyGroup[];
    },
  });

  const createGroup = useMutation({
    mutationFn: async (groupData: {
      name: string;
      description?: string;
      is_public: boolean;
      max_members?: number;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('study_groups')
        .insert({
          ...groupData,
          creator_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      // Add creator as member
      await supabase
        .from('study_group_members')
        .insert({
          group_id: data.id,
          user_id: user.id,
          role: 'admin',
        });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study-groups'] });
      toast({
        title: 'Gruppe erstellt',
        description: 'Deine Lerngruppe wurde erfolgreich erstellt.',
      });
    },
    onError: (error) => {
      logger.error('Error creating group:', error);
      toast({
        title: 'Fehler',
        description: 'Gruppe konnte nicht erstellt werden.',
        variant: 'destructive',
      });
    },
  });

  const joinGroup = useMutation({
    mutationFn: async (groupId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('study_group_members')
        .insert({
          group_id: groupId,
          user_id: user.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study-groups'] });
      toast({
        title: 'Beigetreten',
        description: 'Du bist der Gruppe erfolgreich beigetreten.',
      });
    },
    onError: (error: any) => {
      logger.error('Error joining group:', error);
      toast({
        title: 'Fehler',
        description: error.code === '23505' ? 'Du bist bereits Mitglied dieser Gruppe.' : 'Beitritt fehlgeschlagen.',
        variant: 'destructive',
      });
    },
  });

  const leaveGroup = useMutation({
    mutationFn: async (groupId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('study_group_members')
        .delete()
        .eq('group_id', groupId)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study-groups'] });
      toast({
        title: 'Verlassen',
        description: 'Du hast die Gruppe verlassen.',
      });
    },
  });

  return {
    groups,
    isLoading,
    createGroup: createGroup.mutate,
    joinGroup: joinGroup.mutate,
    leaveGroup: leaveGroup.mutate,
  };
};
