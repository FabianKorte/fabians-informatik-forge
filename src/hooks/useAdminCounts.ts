import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { logger } from '@/lib/logger';

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

  useEffect(() => {
    if (!isAdmin) {
      setIsLoading(false);
      return;
    }

    const fetchCounts = async () => {
      try {
        // Neue Feedbacks (status = 'new')
        const { count: feedbackCount } = await supabase
          .from('feedbacks')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'new');

        // Neue Benutzer (created in letzten 7 Tagen)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const { count: userCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', sevenDaysAgo.toISOString());

        setCounts({
          feedbacks: feedbackCount || 0,
          users: userCount || 0,
        });
      } catch (error) {
        logger.error('Error fetching admin counts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounts();

    // Realtime-Updates für Feedbacks
    const feedbackChannel = supabase
      .channel('admin-feedbacks-count')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'feedbacks',
          filter: 'status=eq.new',
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

  return { counts, isLoading };
};
