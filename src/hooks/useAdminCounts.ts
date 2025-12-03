import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { logger } from '@/lib/logger';

const SEEN_USERS_KEY = 'admin_seen_users';

const getSeenUsers = (): string[] => {
  try {
    const stored = localStorage.getItem(SEEN_USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveSeenUsers = (userIds: string[]) => {
  try {
    localStorage.setItem(SEEN_USERS_KEY, JSON.stringify(userIds));
  } catch (error) {
    logger.error('Error saving seen users:', error);
  }
};

interface AdminCounts {
  feedbacks: number;
  users: number;
}

export const useAdminCounts = () => {
  const { isAdmin } = useAuth();
  const [counts, setCounts] = useState<AdminCounts>({
    feedbacks: 0,
    users: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const markUsersAsSeen = (userIds: string[]) => {
    const seenUsers = getSeenUsers();
    const allSeen = [...new Set([...seenUsers, ...userIds])];
    saveSeenUsers(allSeen);
    setCounts(prev => ({ ...prev, users: 0 }));
  };

  useEffect(() => {
    if (!isAdmin) {
      setIsLoading(false);
      return;
    }

    const fetchCounts = async () => {
      try {
        // Wirklich neue, ungesehene Feedbacks (is_new = true)
        const { count: feedbackCount } = await supabase
          .from('feedbacks')
          .select('*', { count: 'exact', head: true })
          .eq('is_new', true);

        // Neue Benutzer (created in letzten 7 Tagen) die noch nicht gesehen wurden
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const { data: newUsers } = await supabase
          .from('profiles')
          .select('id')
          .gte('created_at', sevenDaysAgo.toISOString());

        const seenUsers = getSeenUsers();
        const unseenUsers = (newUsers || []).filter(u => !seenUsers.includes(u.id));

        setCounts({
          feedbacks: feedbackCount || 0,
          users: unseenUsers.length,
        });
      } catch (error) {
        logger.error('Error fetching admin counts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounts();

    // Realtime-Updates für Feedbacks - auf alle Events hören, da Status-Updates den Count beeinflussen
    const feedbackChannel = supabase
      .channel('admin-feedbacks-count')
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'feedbacks',
        },
        () => fetchCounts()
      )
      .subscribe();

    // Realtime-Updates für neue User (Profile)
    const userChannel = supabase
      .channel('admin-users-count')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'profiles',
        },
        () => fetchCounts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(feedbackChannel);
      supabase.removeChannel(userChannel);
    };
  }, [isAdmin]);

  return { counts, isLoading, markUsersAsSeen };
};
