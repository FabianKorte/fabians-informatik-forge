import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Clock, Activity, TrendingUp, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActiveUser {
  id: string;
  username: string;
  avatar_url: string | null;
  last_seen: string;
  current_page?: string;
}

interface UserActivity {
  user_id: string;
  event_type: string;
  event_data: any;
  created_at: string;
}

export default function LiveUserTracking() {
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [recentActivity, setRecentActivity] = useState<UserActivity[]>([]);
  const [profiles, setProfiles] = useState<Record<string, { username: string; avatar_url: string | null }>>({});
  const [stats, setStats] = useState({
    totalToday: 0,
    activeNow: 0,
    peakToday: 0,
  });

  useEffect(() => {
    fetchActiveUsers();
    fetchRecentActivity();
    fetchDailyStats();

    // Real-time subscription for analytics events
    const channel = supabase
      .channel('live-tracking')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'analytics_events',
        },
        (payload) => {
          const newEvent = payload.new as UserActivity;
          setRecentActivity(prev => [newEvent, ...prev].slice(0, 20));
          
          if (newEvent.user_id) {
            fetchProfileIfNeeded(newEvent.user_id);
          }
        }
      )
      .subscribe();

    // Refresh active users periodically
    const interval = setInterval(fetchActiveUsers, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  const fetchActiveUsers = async () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    
    const { data: events } = await supabase
      .from('analytics_events')
      .select('user_id, event_type, event_data, created_at')
      .gte('created_at', fiveMinutesAgo)
      .not('user_id', 'is', null)
      .order('created_at', { ascending: false });

    if (events) {
      // Get unique users with their latest activity
      const userMap = new Map<string, { last_seen: string; current_page?: string }>();
      events.forEach(e => {
        if (e.user_id && !userMap.has(e.user_id)) {
          const eventData = e.event_data as Record<string, unknown> | null;
          userMap.set(e.user_id, {
            last_seen: e.created_at,
            current_page: (eventData?.page as string) || e.event_type,
          });
        }
      });

      const userIds = Array.from(userMap.keys());
      
      if (userIds.length > 0) {
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, username, avatar_url')
          .in('id', userIds);

        if (profilesData) {
          const active = profilesData.map(p => ({
            id: p.id,
            username: p.username,
            avatar_url: p.avatar_url,
            last_seen: userMap.get(p.id)?.last_seen || '',
            current_page: userMap.get(p.id)?.current_page,
          }));
          setActiveUsers(active);
          setStats(prev => ({ ...prev, activeNow: active.length }));
        }
      } else {
        setActiveUsers([]);
        setStats(prev => ({ ...prev, activeNow: 0 }));
      }
    }
  };

  const fetchRecentActivity = async () => {
    const { data } = await supabase
      .from('analytics_events')
      .select('user_id, event_type, event_data, created_at')
      .order('created_at', { ascending: false })
      .limit(20);

    if (data) {
      setRecentActivity(data);
      const userIds = data.map(d => d.user_id).filter(Boolean) as string[];
      fetchProfilesForIds(userIds);
    }
  };

  const fetchDailyStats = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data } = await supabase
      .from('analytics_events')
      .select('user_id, created_at')
      .gte('created_at', today.toISOString())
      .not('user_id', 'is', null);

    if (data) {
      const uniqueUsers = new Set(data.map(d => d.user_id));
      setStats(prev => ({
        ...prev,
        totalToday: uniqueUsers.size,
        peakToday: Math.max(prev.peakToday, uniqueUsers.size),
      }));
    }
  };

  const fetchProfilesForIds = async (userIds: string[]) => {
    // Use callback to access current state and avoid stale closure
    setProfiles(prev => {
      const uniqueIds = [...new Set(userIds)].filter(id => !prev[id]);
      if (uniqueIds.length === 0) return prev;

      // Fetch profiles asynchronously
      supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .in('id', uniqueIds)
        .then(({ data }) => {
          if (data && data.length > 0) {
            setProfiles(current => {
              const updated = { ...current };
              data.forEach(p => { updated[p.id] = { username: p.username, avatar_url: p.avatar_url }; });
              return updated;
            });
          }
        });

      return prev;
    });
  };

  const fetchProfileIfNeeded = (userId: string) => {
    fetchProfilesForIds([userId]);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'gerade eben';
    if (diff < 3600000) return `vor ${Math.floor(diff / 60000)} Min.`;
    return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  };

  const getEventLabel = (eventType: string) => {
    const labels: Record<string, string> = {
      page_view: 'Seitenaufruf',
      quiz_completed: 'Quiz beendet',
      module_started: 'Modul gestartet',
      login: 'Anmeldung',
      signup: 'Registrierung',
    };
    return labels[eventType] || eventType;
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <Activity className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.activeNow}</p>
                <p className="text-sm text-muted-foreground">Gerade aktiv</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-500/10">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalToday}</p>
                <p className="text-sm text-muted-foreground">Heute aktiv</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-500/10">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.peakToday}</p>
                <p className="text-sm text-muted-foreground">Peak heute</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Active Users */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Aktive Benutzer
            </CardTitle>
            <CardDescription>Benutzer der letzten 5 Minuten</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {activeUsers.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  Keine aktiven Benutzer
                </div>
              ) : (
                <div className="space-y-3">
                  {activeUsers.map(user => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar_url || undefined} />
                        <AvatarFallback>{user.username?.[0]?.toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{user.username}</p>
                        {user.current_page && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {user.current_page}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(user.last_seen)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="w-4 h-4" />
              Aktivitäts-Feed
            </CardTitle>
            <CardDescription>Letzte Benutzeraktionen</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {recentActivity.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  Keine Aktivitäten
                </div>
              ) : (
                <div className="space-y-2">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={`${activity.user_id}-${activity.created_at}-${index}`}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-lg border",
                        index === 0 && "animate-fade-in bg-accent/30"
                      )}
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={profiles[activity.user_id]?.avatar_url || undefined} />
                        <AvatarFallback className="text-xs">
                          {profiles[activity.user_id]?.username?.[0]?.toUpperCase() || '?'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium truncate">
                            {profiles[activity.user_id]?.username || 'Anonym'}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {getEventLabel(activity.event_type)}
                          </Badge>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(activity.created_at)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
