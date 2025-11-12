import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Send, ArrowLeft, MessageCircle, Loader2 } from 'lucide-react';
import { logger } from '@/lib/logger';
import { sanitizeInput } from '@/lib/sanitization';
import { ChatMessageComponent } from '@/components/chat/ChatMessage';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { OnlineUsers } from '@/components/chat/OnlineUsers';

// Rate limiting: Max 5 messages per 10 seconds
const MESSAGE_RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 10000;
const TYPING_TIMEOUT = 3000;

interface MessageReaction {
  id: string;
  message_id: string;
  user_id: string;
  emoji: string;
}

interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  created_at: string;
  edited_at?: string;
  deleted_at?: string;
  profiles?: {
    username: string;
    avatar_url: string | null;
  };
  reactions?: MessageReaction[];
}

interface OnlineUser {
  user_id: string;
  username: string;
  avatar_url?: string;
}

const Chat = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [reactions, setReactions] = useState<MessageReaction[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageTimestampsRef = useRef<number[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Fetch initial data
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      // Fetch messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('chat_messages')
        .select('*')
        .is('deleted_at', null)
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

      // Fetch profiles
      const userIds = [...new Set(messagesData?.map(msg => msg.user_id) || [])];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .in('id', userIds);

      const profilesMap = new Map(
        (profilesData || []).map(profile => [profile.id, profile])
      );

      // Fetch reactions
      const { data: reactionsData } = await supabase
        .from('message_reactions')
        .select('*');

      setReactions(reactionsData || []);

      const messagesWithData = (messagesData || []).map(msg => ({
        ...msg,
        profiles: profilesMap.get(msg.user_id),
        reactions: (reactionsData || []).filter(r => r.message_id === msg.id),
      }));

      setMessages(messagesWithData as ChatMessage[]);
      setIsLoading(false);
    };

    fetchData();
  }, [user, toast]);

  // Setup realtime channels
  useEffect(() => {
    if (!user) return;

    const channel = supabase.channel('chat-room', {
      config: {
        broadcast: { self: true },
        presence: { key: user.id }
      }
    });

    // Track presence (online users)
    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const users: OnlineUser[] = [];
        Object.values(state).forEach((presences: any) => {
          presences.forEach((presence: any) => {
            if (presence.username) {
              users.push({
                user_id: presence.user_id,
                username: presence.username,
                avatar_url: presence.avatar_url,
              });
            }
          });
        });
        setOnlineUsers(users.filter(u => u.user_id !== user.id));
      })
      .on('presence', { event: 'join' }, ({ newPresences }: any) => {
        logger.log('User joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }: any) => {
        logger.log('User left:', leftPresences);
      });

    // Listen for typing events
    channel.on('broadcast', { event: 'typing' }, ({ payload }: any) => {
      if (payload.user_id !== user.id) {
        setTypingUsers(prev => {
          if (!prev.includes(payload.username)) {
            return [...prev, payload.username];
          }
          return prev;
        });

        setTimeout(() => {
          setTypingUsers(prev => prev.filter(u => u !== payload.username));
        }, TYPING_TIMEOUT);
      }
    });

    // Listen for message inserts
    channel.on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
      },
      async (payload: any) => {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', payload.new.user_id)
          .single();

        const newMsg: ChatMessage = {
          id: payload.new.id,
          user_id: payload.new.user_id,
          message: payload.new.message,
          created_at: payload.new.created_at,
          edited_at: payload.new.edited_at,
          deleted_at: payload.new.deleted_at,
          profiles: profileData || undefined,
          reactions: [],
        };

        setMessages(prev => [...prev, newMsg]);
      }
    );

    // Listen for message updates
    channel.on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'chat_messages',
      },
      (payload) => {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === payload.new.id
              ? { ...msg, ...payload.new }
              : msg
          )
        );
      }
    );

    // Listen for reaction changes
    channel.on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'message_reactions',
      },
      (payload) => {
        const newReaction = payload.new as MessageReaction;
        setReactions(prev => [...prev, newReaction]);
        setMessages(prev =>
          prev.map(msg =>
            msg.id === newReaction.message_id
              ? { ...msg, reactions: [...(msg.reactions || []), newReaction] }
              : msg
          )
        );
      }
    );

    channel.on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'message_reactions',
      },
      (payload) => {
        setReactions(prev => prev.filter(r => r.id !== payload.old.id));
        setMessages(prev =>
          prev.map(msg => ({
            ...msg,
            reactions: msg.reactions?.filter(r => r.id !== payload.old.id) || [],
          }))
        );
      }
    );

    // Subscribe with user presence
    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        const { data: profile } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id)
          .single();

        await channel.track({
          user_id: user.id,
          username: profile?.username || 'Unbekannt',
          avatar_url: profile?.avatar_url,
          online_at: new Date().toISOString(),
        });
      }
    });

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, toast]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleTyping = () => {
    if (!user || !channelRef.current) return;

    channelRef.current.send({
      type: 'broadcast',
      event: 'typing',
      payload: {
        user_id: user.id,
        username: user.email?.split('@')[0] || 'Unbekannt',
      },
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const now = Date.now();
    const recentMessages = messageTimestampsRef.current.filter(
      timestamp => now - timestamp < RATE_LIMIT_WINDOW
    );

    if (recentMessages.length >= MESSAGE_RATE_LIMIT) {
      toast({
        title: 'Zu schnell',
        description: `Bitte warte ${Math.ceil((recentMessages[0] + RATE_LIMIT_WINDOW - now) / 1000)} Sekunden.`,
        variant: 'destructive',
      });
      return;
    }

    const sanitized = sanitizeInput(newMessage, 500);
    if (!sanitized) return;

    try {
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
        return;
      }

      messageTimestampsRef.current = [...recentMessages, now];
      setNewMessage('');
    } catch (err) {
      logger.error('Unexpected error:', err);
    }
  };

  const handleEditMessage = async (messageId: string, newText: string) => {
    const { error } = await supabase
      .from('chat_messages')
      .update({ message: newText, edited_at: new Date().toISOString() })
      .eq('id', messageId);

    if (error) {
      logger.error('Error editing message:', error);
      toast({
        title: 'Fehler',
        description: 'Nachricht konnte nicht bearbeitet werden.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    const { error } = await supabase
      .from('chat_messages')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', messageId);

    if (error) {
      logger.error('Error deleting message:', error);
      toast({
        title: 'Fehler',
        description: 'Nachricht konnte nicht gelöscht werden.',
        variant: 'destructive',
      });
    }
  };

  const handleReactionToggle = async (messageId: string, emoji: string) => {
    if (!user) return;

    const existingReaction = reactions.find(
      r => r.message_id === messageId && r.user_id === user.id && r.emoji === emoji
    );

    if (existingReaction) {
      const { error } = await supabase
        .from('message_reactions')
        .delete()
        .eq('id', existingReaction.id);

      if (error) {
        logger.error('Error removing reaction:', error);
      }
    } else {
      const { error } = await supabase
        .from('message_reactions')
        .insert({ message_id: messageId, user_id: user.id, emoji });

      if (error) {
        logger.error('Error adding reaction:', error);
      }
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted-foreground">Chat wird geladen...</p>
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

        <OnlineUsers users={onlineUsers} />

        <ScrollArea className="flex-1 border rounded-lg p-4 mb-4 bg-muted/20">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="font-medium">Keine Nachrichten vorhanden</p>
                <p className="text-sm mt-1">Schreibe die erste Nachricht!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <ChatMessageComponent
                  key={msg.id}
                  message={msg}
                  currentUserId={user?.id || ''}
                  onEdit={handleEditMessage}
                  onDelete={handleDeleteMessage}
                  onReactionToggle={handleReactionToggle}
                />
              ))
            )}
            <TypingIndicator typingUsers={typingUsers} />
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            placeholder="Nachricht eingeben..."
            className="flex-1 rounded-xl"
            maxLength={500}
            autoFocus
          />
          <Button
            type="submit"
            size="icon"
            disabled={!newMessage.trim()}
            className="rounded-xl"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-2">
          {newMessage.length}/500 Zeichen
        </p>
      </div>
    </div>
  );
};

export default Chat;
