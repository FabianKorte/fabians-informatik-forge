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
    const uniqueIds = [...new Set(userIds)].filter(id => !profiles[id]);
    if (uniqueIds.length === 0) return;

    const { data } = await supabase
      .from('profiles')
      .select('id, username')
      .in('id', uniqueIds);

    if (data) {
      setProfiles(prev => {
        const updated = { ...prev };
        data.forEach(p => { updated[p.id] = p; });
        return updated;
      });
    }
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
        
        {/* Hidden audio element for notifications */}
        <audio ref={audioRef} preload="auto">
          <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleAYAD4K35peqaBsJb6S4joJOFACLxdjf" type="audio/wav" />
        </audio>
      </CardContent>
    </Card>
  );
}
