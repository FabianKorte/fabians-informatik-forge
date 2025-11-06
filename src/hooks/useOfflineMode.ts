import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

interface OfflineData {
  categories: any[];
  modules: any[];
  progress: any[];
  lastSync: number;
}

export const useOfflineMode = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineData, setOfflineData] = useState<OfflineData | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load offline data from localStorage on mount
    loadOfflineData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOnline && offlineData) {
      syncOfflineData();
    }
  }, [isOnline]);

  const loadOfflineData = () => {
    try {
      const stored = localStorage.getItem('offline_learning_data');
      if (stored) {
        setOfflineData(JSON.parse(stored));
      }
    } catch (error) {
      logger.error('Error loading offline data:', error);
    }
  };

  const saveOfflineData = async () => {
    try {
      const { data: categories } = await supabase
        .from('categories')
        .select('*');

      const { data: modules } = await supabase
        .from('learn_modules')
        .select('*');

      const { data: { user } } = await supabase.auth.getUser();
      
      let progress = [];
      if (user) {
        const { data } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id);
        progress = data || [];
      }

      const offlineData: OfflineData = {
        categories: categories || [],
        modules: modules || [],
        progress,
        lastSync: Date.now()
      };

      localStorage.setItem('offline_learning_data', JSON.stringify(offlineData));
      setOfflineData(offlineData);
      
      return true;
    } catch (error) {
      logger.error('Error saving offline data:', error);
      return false;
    }
  };

  const syncOfflineData = async () => {
    if (isSyncing || !offlineData) return;

    setIsSyncing(true);
    try {
      // Sync progress changes from offline mode
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const pendingChanges = localStorage.getItem('offline_pending_changes');
      if (pendingChanges) {
        const changes = JSON.parse(pendingChanges);
        
        // Upload pending progress changes
        for (const change of changes) {
          await supabase
            .from('user_progress')
            .upsert(change);
        }

        localStorage.removeItem('offline_pending_changes');
      }

      // Refresh offline data with latest from server
      await saveOfflineData();
    } catch (error) {
      logger.error('Error syncing offline data:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const queueOfflineChange = (change: any) => {
    try {
      const pending = localStorage.getItem('offline_pending_changes');
      const changes = pending ? JSON.parse(pending) : [];
      changes.push(change);
      localStorage.setItem('offline_pending_changes', JSON.stringify(changes));
    } catch (error) {
      logger.error('Error queuing offline change:', error);
    }
  };

  return {
    isOnline,
    offlineData,
    isSyncing,
    saveOfflineData,
    syncOfflineData,
    queueOfflineChange
  };
};