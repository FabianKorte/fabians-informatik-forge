import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield, User, FileText, Key, Radio, Pause, Play, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: any;
  created_at: string;
}

interface Profile {
  id: string;
  username: string;
}

const ACTION_CONFIG: Record<string, { label: string; color: string }> = {
  user_role_granted: { label: "Rolle vergeben", color: "bg-green-500" },
  user_role_revoked: { label: "Rolle entzogen", color: "bg-yellow-500" },
  user_2fa_removed: { label: "2FA entfernt", color: "bg-orange-500" },
  user_deleted: { label: "Benutzer gelöscht", color: "bg-red-500" },
  learning_content_created: { label: "Inhalt erstellt", color: "bg-blue-500" },
  learning_content_updated: { label: "Inhalt bearbeitet", color: "bg-cyan-500" },
  learning_content_deleted: { label: "Inhalt gelöscht", color: "bg-red-500" },
  learning_content_bulk_deleted: { label: "Bulk-Löschung", color: "bg-red-600" },
  password_reset_sent: { label: "Passwort-Reset", color: "bg-purple-500" },
};

export default function LiveAuditLog() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [isLive, setIsLive] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initial fetch
  useEffect(() => {
    const fetchInitialLogs = async () => {
      const { data } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (data) {
        setLogs(data);
        fetchProfiles(data.map(l => l.user_id));
      }
    };

    fetchInitialLogs();
  }, []);

  // Real-time subscription
  useEffect(() => {
    if (!isLive) return;

    const channel = supabase
      .channel('live-audit-logs')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_logs',
        },
        (payload) => {
          const newLog = payload.new as AuditLog;
          setLogs(prev => [newLog, ...prev].slice(0, 100));
          fetchProfiles([newLog.user_id]);
          
          if (soundEnabled && audioRef.current) {
            audioRef.current.play().catch(() => {});
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isLive, soundEnabled]);

  const fetchProfiles = async (userIds: string[]) => {
    // Use callback to access current state and avoid stale closure
    setProfiles(prev => {
      const uniqueIds = [...new Set(userIds)].filter(id => !prev[id]);
      if (uniqueIds.length === 0) return prev;

      // Fetch profiles asynchronously
      supabase
        .from('profiles')
        .select('id, username')
        .in('id', uniqueIds)
        .then(({ data }) => {
          if (data && data.length > 0) {
            setProfiles(current => {
              const updated = { ...current };
              data.forEach(p => { updated[p.id] = p; });
              return updated;
            });
          }
        });

      return prev;
    });
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'user':
      case 'user_role':
        return <User className="w-3 h-3" />;
      case 'learn_module':
        return <FileText className="w-3 h-3" />;
      case 'auth':
        return <Key className="w-3 h-3" />;
      default:
        return <Shield className="w-3 h-3" />;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
              isLive ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"
            )}>
              <Radio className={cn("w-3 h-3", isLive && "animate-pulse")} />
              {isLive ? "Live" : "Pausiert"}
            </div>
            <div>
              <CardTitle className="text-lg">Live Audit-Log</CardTitle>
              <CardDescription className="text-xs">
                Echtzeit-Protokoll aller Admin-Aktionen
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="sound"
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
              <Label htmlFor="sound" className="text-sm flex items-center gap-1">
                <Bell className="w-3 h-3" />
                <span className="hidden sm:inline">Ton</span>
              </Label>
            </div>
            <Button
              variant={isLive ? "destructive" : "default"}
              size="sm"
              onClick={() => setIsLive(!isLive)}
            >
              {isLive ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pausieren
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Fortsetzen
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4" ref={scrollRef}>
          <div className="space-y-2">
            {logs.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                Keine Aktivitäten vorhanden
              </div>
            ) : (
              logs.map((log, index) => {
                const config = ACTION_CONFIG[log.action] || { label: log.action, color: "bg-gray-500" };
                const isNew = index === 0;
                
                return (
                  <div
                    key={log.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg border transition-all",
                      isNew && "animate-fade-in bg-accent/50"
                    )}
                  >
                    <div className={cn("w-2 h-2 rounded-full mt-2 flex-shrink-0", config.color)} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          {config.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          {getEntityIcon(log.entity_type)}
                          {log.entity_type}
                        </span>
                      </div>
                      <p className="text-sm mt-1">
                        <span className="font-medium">
                          {profiles[log.user_id]?.username || 'Unbekannt'}
                        </span>
                        {log.details && Object.keys(log.details).length > 0 && (
                          <span className="text-muted-foreground ml-1">
                            - {JSON.stringify(log.details).slice(0, 50)}...
                          </span>
                        )}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatTime(log.created_at)}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
        
        {/* Hidden audio element for notifications - proper notification sound */}
        <audio ref={audioRef} preload="auto">
          <source src="data:audio/wav;base64,UklGRl9vT19teleWQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YU5vT19teleAAAD//wMADQAWABcAEgAHAPv/6v/b/8//xv/B/8H/x//Q/97/7f/8/wcADwARAA8ABgD6/+v/2v/M/8P/v/+//8T/zv/d/+7//v8OABkAIAAhABsADwD//+z/2v/L/8H/vP+8/8H/y//a/+z//f8NABkAIAAhABsADgD9/+r/1//H/7v/tf+0/7f/v//M/93/8P8BABEAHAAjACQAHQAQAP//7P/Y/8b/uf+y/7D/sv+6/8j/2v/t//7/DQAYACABIQEcAQ8B/wDs/9n/yP+7/7T/sf+y/7j/xv/X/+n/+v8JABUAHgAkACMAHAAQAP//7f/Z/8b/uP+w/6z/rP+x/7z/y//d/+//AAAPABoAIgAlACAAFAAFAPP/4P/N/73/sv+r/6n/rP+0/8L/1P/m//f/BwATABwAIQAiABwAEQABAO//3P/J/7j/rP+k/6H/ov+o/7T/xf/X/+n/+f8IABQAHAAhACEAGgANAP3/6//X/8P/sv+l/5z/mP+Y/5z/pv+1/8f/2v/s//z/CgAVABwAHwAdABYACgD6/+f/0v+9/6z/n/+V/5D/j/+S/5z/q/+9/9D/4v/z/wIADwAYAB0AHQAWAA0A/v/s/9f/w/+w/6D/lf+N/4n/if+N/5j/p/+6/8z/3//x/wEADwAYAB4AHQAWAAwA/P/q/9X/wP+s/5z/j/+G/4H/gP+D/43/nP+v/8L/1f/o//n/CAASABkAGwAZABEABwD4/+b/0v+8/6j/l/+K/4D/ev95/3z/hf+T/6X/uP/M/9//8f8AAAwAFQAaABsAFgAOAAIA8f/f/8r/tf+j/5P/h/99/3f/dv94/4D/jv+g/7P/xv/Z/+v/+/8GAA8AFQAYABYADwAGAPn/6P/V/8H/rf+c/47/g/98/3n/eP97/4P/kP+h/7T/xv/Z/+v/+/8HAA8AFQAXABQADQADAPb/5v/U/8D/rf+c/47/hP99/3r/ef98/4T/kf+i/7T/xv/Y/+n/+f8GAA4AFAAXABQADQADAPb/5v/U/8D/rf+c/47/hP99/3r/ef98/4T/kf+i/7T/xv/Y" type="audio/wav" />
        </audio>
      </CardContent>
    </Card>
  );
}
