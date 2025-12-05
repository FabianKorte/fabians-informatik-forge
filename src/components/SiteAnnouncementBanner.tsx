import { useState, useEffect } from "react";
import { X, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { logger } from "@/lib/logger";

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: string;
  created_at: string;
  updated_at: string;
}

const DISMISSED_STORAGE_KEY = 'dismissed_announcements';

const getDismissedFromStorage = (): Record<string, string> => {
  try {
    const stored = localStorage.getItem(DISMISSED_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const saveDismissedToStorage = (dismissed: Record<string, string>) => {
  try {
    localStorage.setItem(DISMISSED_STORAGE_KEY, JSON.stringify(dismissed));
  } catch (error) {
    logger.error('Error saving dismissed announcements:', error);
  }
};

export const SiteAnnouncementBanner = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  // Store dismissed as { announcementId: updatedAt } to re-show if announcement is updated
  const [dismissed, setDismissed] = useState<Record<string, string>>(() => getDismissedFromStorage());

  useEffect(() => {
    fetchAnnouncements();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('site_announcements')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'site_announcements' },
        (payload) => {
          logger.info('Announcement change detected:', payload);
          fetchAnnouncements();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAnnouncements = async () => {
    try {
      // Use safe view that excludes sensitive admin IDs
      const { data, error } = await supabase
        .from('safe_site_announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        logger.error('Error fetching announcements:', error);
        return;
      }

      setAnnouncements(data || []);
    } catch (error) {
      logger.error('Unexpected error fetching announcements:', error);
    }
  };

  const handleDismiss = (announcement: Announcement) => {
    const newDismissed = {
      ...dismissed,
      [announcement.id]: announcement.updated_at
    };
    setDismissed(newDismissed);
    saveDismissedToStorage(newDismissed);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      case 'error':
        return <XCircle className="h-5 w-5" />;
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getVariant = (type: string) => {
    switch (type) {
      case 'error':
        return 'destructive';
      default:
        return 'default';
    }
  };

  // Only show announcements that haven't been dismissed OR have been updated since dismissal
  const visibleAnnouncements = announcements.filter(a => {
    const dismissedAt = dismissed[a.id];
    if (!dismissedAt) return true;
    // Show again if the announcement was updated after being dismissed
    return a.updated_at > dismissedAt;
  });

  if (visibleAnnouncements.length === 0) return null;

  return (
    <div className="space-y-2">
      {visibleAnnouncements.map((announcement) => (
        <Alert 
          key={announcement.id} 
          variant={getVariant(announcement.type)}
          className="relative border-2 shadow-lg animate-in slide-in-from-top-2 duration-500"
        >
          <div className="flex items-start gap-3">
            {getIcon(announcement.type)}
            <div className="flex-1 space-y-1">
              <AlertTitle className="text-base font-bold">
                {announcement.title}
              </AlertTitle>
              <AlertDescription className="text-sm">
                {announcement.message}
              </AlertDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full hover:bg-background/50"
              onClick={() => handleDismiss(announcement)}
              aria-label="Banner schließen"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Alert>
      ))}
    </div>
  );
};
