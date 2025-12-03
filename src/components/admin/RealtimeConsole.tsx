import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Terminal, Radio, Pause, Play, Trash2, Download, Filter, Database, Users, FileText, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConsoleEvent {
  id: string;
  type: 'database' | 'auth' | 'storage' | 'realtime';
  table?: string;
  action: string;
  data: any;
  timestamp: Date;
}

const TABLE_ICONS: Record<string, React.ElementType> = {
  profiles: Users,
  audit_logs: Terminal,
  feedbacks: MessageSquare,
  learn_modules: FileText,
  default: Database,
};

export default function RealtimeConsole() {
  const [events, setEvents] = useState<ConsoleEvent[]>([]);
  const [isLive, setIsLive] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const [filter, setFilter] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const channelsRef = useRef<any[]>([]);

  useEffect(() => {
    if (!isLive) {
      // Cleanup channels when paused
      channelsRef.current.forEach(ch => supabase.removeChannel(ch));
      channelsRef.current = [];
      return;
    }

    const tables = [
      'profiles',
      'audit_logs',
      'feedbacks',
      'analytics_events',
      'learn_modules',
      'user_progress',
      'chat_messages',
      'notifications',
      'site_announcements',
    ];

    const channels = tables.map(table => {
      return supabase
        .channel(`console-${table}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table },
          (payload) => {
            const newEvent: ConsoleEvent = {
              id: `${Date.now()}-${Math.random()}`,
              type: 'database',
              table,
              action: payload.eventType,
              data: payload.eventType === 'DELETE' ? payload.old : payload.new,
              timestamp: new Date(),
            };
            
            setEvents(prev => [newEvent, ...prev].slice(0, 200));
          }
        )
        .subscribe();
    });

    channelsRef.current = channels;

    return () => {
      channels.forEach(ch => supabase.removeChannel(ch));
    };
  }, [isLive]);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [events, autoScroll]);

  const clearConsole = () => {
    setEvents([]);
  };

  const exportLogs = () => {
    const logText = events.map(e => 
      `[${e.timestamp.toISOString()}] ${e.action.toUpperCase()} ${e.table || ''}: ${JSON.stringify(e.data)}`
    ).join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `console-logs-${new Date().toISOString()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredEvents = events.filter(e => {
    if (!filter) return true;
    const searchStr = `${e.table || ''} ${e.action} ${JSON.stringify(e.data)}`.toLowerCase();
    return searchStr.includes(filter.toLowerCase());
  });

  const getActionColor = (action: string) => {
    switch (action) {
      case 'INSERT': return 'text-green-500';
      case 'UPDATE': return 'text-yellow-500';
      case 'DELETE': return 'text-red-500';
      default: return 'text-blue-500';
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'INSERT': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'UPDATE': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'DELETE': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  return (
    <Card className="h-full">
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
              <CardTitle className="flex items-center gap-2 text-lg">
                <Terminal className="w-5 h-5" />
                Echtzeit-Konsole
              </CardTitle>
              <CardDescription className="text-xs">
                Live-Stream aller Datenbankänderungen
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Switch
                id="autoscroll"
                checked={autoScroll}
                onCheckedChange={setAutoScroll}
              />
              <Label htmlFor="autoscroll" className="text-sm">Auto-Scroll</Label>
            </div>
            <Button variant="outline" size="sm" onClick={clearConsole}>
              <Trash2 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Leeren</span>
            </Button>
            <Button variant="outline" size="sm" onClick={exportLogs}>
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button
              variant={isLive ? "destructive" : "default"}
              size="sm"
              onClick={() => setIsLive(!isLive)}
            >
              {isLive ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Start</span>
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="mt-4 relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter nach Tabelle, Aktion oder Inhalt..."
            className="pl-10 font-mono text-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] font-mono text-sm" ref={scrollRef}>
          <div className="space-y-1">
            {filteredEvents.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                {isLive ? (
                  <div className="space-y-2">
                    <Terminal className="w-8 h-8 mx-auto opacity-50" />
                    <p>Warte auf Datenbankaktivitäten...</p>
                  </div>
                ) : (
                  <p>Konsole pausiert</p>
                )}
              </div>
            ) : (
              filteredEvents.map((event, index) => {
                const Icon = TABLE_ICONS[event.table || 'default'] || TABLE_ICONS.default;
                
                return (
                  <div
                    key={event.id}
                    className={cn(
                      "flex items-start gap-2 p-2 rounded hover:bg-accent/50 transition-all border-l-2",
                      index === 0 && "animate-fade-in",
                      event.action === 'INSERT' && "border-l-green-500",
                      event.action === 'UPDATE' && "border-l-yellow-500",
                      event.action === 'DELETE' && "border-l-red-500"
                    )}
                  >
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {event.timestamp.toLocaleTimeString('de-DE', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}.{String(event.timestamp.getMilliseconds()).padStart(3, '0')}
                    </span>
                    <Badge variant="outline" className={cn("text-xs", getActionBadge(event.action))}>
                      {event.action}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon className="w-3 h-3" />
                      <span className="font-semibold">{event.table}</span>
                    </div>
                    <span className="text-xs text-muted-foreground truncate flex-1">
                      {event.data?.id && `id: ${event.data.id.slice(0, 8)}...`}
                      {event.data?.title && ` | "${event.data.title}"`}
                      {event.data?.username && ` | @${event.data.username}`}
                      {event.data?.action && ` | ${event.data.action}`}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
        
        <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
          <span>{filteredEvents.length} Events {filter && `(gefiltert)`}</span>
          <span>{events.length} gesamt (max. 200)</span>
        </div>
      </CardContent>
    </Card>
  );
}
