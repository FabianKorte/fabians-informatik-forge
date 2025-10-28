import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Send, ArrowLeft } from 'lucide-react';
import { logger } from '@/lib/logger';
import { sanitizeInput } from '@/lib/sanitization';

// Rate limiting: Max 5 messages per 10 seconds
const MESSAGE_RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 10000; // 10 seconds

interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  created_at: string;
  profiles?: {
    username: string;
    avatar_url: string | null;
  };
}

const Chat = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageTimestampsRef = useRef<number[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      const { data: messagesData, error: messagesError } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (messagesError) {
        logger.error('Error fetching messages:', messagesError);
        toast({
          title: 'Fehler',
          description: 'Nachrichten konnten nicht geladen werden.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      if (!messagesData || messagesData.length === 0) {
        setMessages([]);
        setIsLoading(false);
        return;
      }

      // Hole alle User IDs
      const userIds = [...new Set(messagesData.map(msg => msg.user_id))];
      
      // Hole alle Profile in einer Abfrage
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .in('id', userIds);

      // Erstelle eine Map für schnellen Zugriff
      const profilesMap = new Map(
        (profilesData || []).map(profile => [profile.id, profile])
      );

      // Verknüpfe Nachrichten mit Profilen
      const messagesWithProfiles = messagesData.map(msg => ({
        ...msg,
        profiles: profilesMap.get(msg.user_id),
      }));

      setMessages(messagesWithProfiles as ChatMessage[]);
      setIsLoading(false);
    };

    fetchMessages();

    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
    
    const setupChannel = (): ReturnType<typeof supabase.channel> => {
      const channel = supabase
        .channel('chat-messages', {
          config: {
            broadcast: { self: true },
            presence: { key: user?.id }
          }
        })
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'chat_messages',
          },
          async (payload) => {
            try {
              const { data: profileData } = await supabase
                .from('profiles')
                .select('username, avatar_url')
                .eq('id', payload.new.user_id)
                .single();

              const newMsg = {
                ...payload.new,
                profiles: profileData,
              } as ChatMessage;

              setMessages((prev) => [...prev, newMsg]);
            } catch (error) {
              logger.error('Error processing realtime message:', error);
            }
          }
        )
        .subscribe((status) => {
          if (status === 'CHANNEL_ERROR') {
            logger.error('Realtime channel error, attempting reconnect...');
            
            if (reconnectAttempts < maxReconnectAttempts) {
              reconnectAttempts++;
              if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
              }
              reconnectTimeoutRef.current = setTimeout(() => {
                logger.log(`Reconnect attempt ${reconnectAttempts}/${maxReconnectAttempts}`);
                supabase.removeChannel(channel);
                setupChannel();
              }, Math.min(1000 * Math.pow(2, reconnectAttempts), 30000));
            } else {
              toast({
                title: 'Verbindungsfehler',
                description: 'Die Verbindung zum Chat konnte nicht wiederhergestellt werden.',
                variant: 'destructive',
              });
            }
          } else if (status === 'SUBSCRIBED') {
            reconnectAttempts = 0;
            logger.log('Realtime channel connected');
          }
        });
      
      return channel;
    };

    const channel = setupChannel();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      supabase.removeChannel(channel);
    };
  }, [user, toast]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    // Rate limiting check
    const now = Date.now();
    const recentMessages = messageTimestampsRef.current.filter(
      timestamp => now - timestamp < RATE_LIMIT_WINDOW
    );

    if (recentMessages.length >= MESSAGE_RATE_LIMIT) {
      toast({
        title: 'Zu schnell',
        description: `Bitte warte ${Math.ceil((recentMessages[0] + RATE_LIMIT_WINDOW - now) / 1000)} Sekunden, bevor du die nächste Nachricht sendest.`,
        variant: 'destructive',
      });
      return;
    }

    const sanitized = sanitizeInput(newMessage, 500);
    if (!sanitized) return;

    const { error } = await supabase.from('chat_messages').insert({
      user_id: user.id,
      message: sanitized,
    });

    if (error) {
      logger.error('Error sending message:', error);
      toast({
        title: 'Fehler',
        description: 'Nachricht konnte nicht gesendet werden.',
        variant: 'destructive',
      });
    } else {
      // Track message timestamp
      messageTimestampsRef.current = [...recentMessages, now];
      setNewMessage('');
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Lädt...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto p-4 flex flex-col h-screen">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Community Chat</h1>
        </div>

        <ScrollArea className="flex-1 border rounded-lg p-4 mb-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                Keine Nachrichten vorhanden. Schreibe die erste Nachricht!
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.user_id === user?.id ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback>
                      {msg.profiles?.username ? msg.profiles.username.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`flex flex-col ${
                      msg.user_id === user?.id ? 'items-end' : 'items-start'
                    }`}
                  >
                    <span className="text-xs text-muted-foreground mb-1">
                      {msg.profiles?.username || 'Unbekannt'}
                    </span>
                    <div
                      className={`rounded-lg px-4 py-2 max-w-md ${
                        msg.user_id === user?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm break-words">{msg.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      {new Date(msg.created_at).toLocaleTimeString('de-DE', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nachricht eingeben..."
            className="flex-1"
            maxLength={500}
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
