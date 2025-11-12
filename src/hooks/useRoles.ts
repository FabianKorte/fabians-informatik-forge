import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/lib/logger';
import { clearRoleCache } from '@/lib/auth/adminChecker';

export type AppRole = 'owner' | 'admin' | 'moderator' | 'user';

interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
}

interface UserWithRoles {
  id: string;
  email: string;
  username?: string;
  roles: AppRole[];
}

export const useRoles = () => {
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsersWithRoles = async () => {
    setIsLoading(true);
    try {
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, username');

      if (profilesError) throw profilesError;

      // Fetch all user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      // Get user emails from edge function
      const { data: emailsData, error: emailsError } = await supabase.functions.invoke(
        'get-user-emails'
      );

      if (emailsError) throw emailsError;

      const emailsMap = new Map(
        emailsData?.users?.map((u: any) => [u.id, u.email]) || []
      );

      // Combine data
      const rolesMap = new Map<string, AppRole[]>();
      userRoles?.forEach((role: UserRole) => {
        if (!rolesMap.has(role.user_id)) {
          rolesMap.set(role.user_id, []);
        }
        rolesMap.get(role.user_id)?.push(role.role);
      });

      const usersWithRoles: UserWithRoles[] = (profiles || []).map(profile => ({
        id: profile.id,
        email: String(emailsMap.get(profile.id) || 'Unbekannt'),
        username: profile.username,
        roles: rolesMap.get(profile.id) || [],
      }));

      setUsers(usersWithRoles);
    } catch (error) {
      logger.error('Error fetching users with roles:', error);
      toast({
        title: 'Fehler',
        description: 'Benutzer konnten nicht geladen werden.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersWithRoles();
  }, []);

  const assignRole = async (userId: string, role: AppRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role: role as any }]);

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: `Rolle "${role}" wurde zugewiesen.`,
      });

      clearRoleCache(userId);
      await fetchUsersWithRoles();
    } catch (error: any) {
      logger.error('Error assigning role:', error);
      
      if (error.code === '23505') {
        toast({
          title: 'Rolle bereits vorhanden',
          description: 'Der Benutzer hat diese Rolle bereits.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Fehler',
          description: 'Rolle konnte nicht zugewiesen werden.',
          variant: 'destructive',
        });
      }
    }
  };

  const removeRole = async (userId: string, role: AppRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .match({ user_id: userId, role: role as any });

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: `Rolle "${role}" wurde entfernt.`,
      });

      clearRoleCache(userId);
      await fetchUsersWithRoles();
    } catch (error) {
      logger.error('Error removing role:', error);
      toast({
        title: 'Fehler',
        description: 'Rolle konnte nicht entfernt werden.',
        variant: 'destructive',
      });
    }
  };

  return {
    users,
    isLoading,
    assignRole,
    removeRole,
    refetch: fetchUsersWithRoles,
  };
};
