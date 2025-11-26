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
  is_active: boolean;
  created_at: string;
  created_by: string;
  updated_at: string;
}

export const SiteAnnouncementBanner = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

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
      const { data, error } = await supabase
        .from('site_announcements')
        .select('*')
        .eq('is_active', true)
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

  const handleDismiss = (id: string) => {
    setDismissed(prev => new Set(prev).add(id));
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

  const visibleAnnouncements = announcements.filter(a => !dismissed.has(a.id));

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
              onClick={() => handleDismiss(announcement.id)}
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