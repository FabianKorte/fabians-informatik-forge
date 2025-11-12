import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Check, X, Smile } from 'lucide-react';
import { logger } from '@/lib/logger';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

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

interface MessageReaction {
  id: string;
  message_id: string;
  user_id: string;
  emoji: string;
}

interface ChatMessageProps {
  message: ChatMessage;
  currentUserId: string;
  onEdit: (messageId: string, newText: string) => void;
  onDelete: (messageId: string) => void;
  onReactionToggle: (messageId: string, emoji: string) => void;
}

const EMOJI_OPTIONS = ['👍', '❤️', '😂', '😮', '😢', '🎉', '🔥', '👏'];

export const ChatMessageComponent = ({
  message,
  currentUserId,
  onEdit,
  onDelete,
  onReactionToggle,
}: ChatMessageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(message.message);
  const isOwnMessage = message.user_id === currentUserId;

  const handleSaveEdit = () => {
    if (editText.trim() && editText !== message.message) {
      onEdit(message.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(message.message);
    setIsEditing(false);
  };

  // Group reactions by emoji
  const reactionGroups = message.reactions?.reduce((acc, reaction) => {
    if (!acc[reaction.emoji]) {
      acc[reaction.emoji] = [];
    }
    acc[reaction.emoji].push(reaction);
    return acc;
  }, {} as Record<string, MessageReaction[]>) || {};

  const hasUserReacted = (emoji: string) => {
    return reactionGroups[emoji]?.some(r => r.user_id === currentUserId);
  };

  if (message.deleted_at) {
    return (
      <div className="flex gap-3 opacity-50">
        <div className="flex-1 text-center">
          <p className="text-sm text-muted-foreground italic">
            Nachricht wurde gelöscht
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex gap-3 group ${
        isOwnMessage ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <Avatar className="h-10 w-10 shrink-0">
        {message.profiles?.avatar_url && (
          <AvatarImage
            src={message.profiles.avatar_url}
            alt={message.profiles.username}
          />
        )}
        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
          {message.profiles?.username
            ? message.profiles.username.charAt(0).toUpperCase()
            : 'U'}
        </AvatarFallback>
      </Avatar>
      
      <div
        className={`flex flex-col ${
          isOwnMessage ? 'items-end' : 'items-start'
        } max-w-[70%]`}
      >
        <span className="text-xs text-muted-foreground mb-1">
          {message.profiles?.username || 'Unbekannt'}
        </span>
        
        <div className="relative">
          <div
            className={`rounded-2xl px-4 py-2.5 shadow-sm ${
              isOwnMessage
                ? 'bg-primary text-primary-foreground rounded-br-md'
                : 'bg-card border border-border rounded-bl-md'
            }`}
          >
            {isEditing ? (
              <div className="flex gap-2 items-center min-w-[200px]">
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="h-8 text-sm"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                />
                <Button size="icon" variant="ghost" onClick={handleSaveEdit} className="h-8 w-8">
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={handleCancelEdit} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <p className="text-sm break-words leading-relaxed">
                {message.message}
              </p>
            )}
          </div>

          {/* Action buttons - positioned outside message bubble */}
          {isOwnMessage && !isEditing && (
            <div className={`absolute ${isOwnMessage ? '-left-20' : '-right-20'} top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1`}>
              <Button
                size="icon"
                variant="secondary"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 bg-card hover:bg-accent border border-border shadow-md hover:shadow-lg transition-all"
                aria-label="Nachricht bearbeiten"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={() => onDelete(message.id)}
                className="h-8 w-8 bg-card hover:bg-destructive/10 hover:text-destructive border border-border shadow-md hover:shadow-lg transition-all"
                aria-label="Nachricht löschen"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Emoji picker - positioned outside message bubble */}
          {!isEditing && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className={`absolute ${isOwnMessage ? '-left-10' : '-right-10'} top-1/2 -translate-y-1/2 h-8 w-8 bg-card hover:bg-accent border border-border shadow-md hover:shadow-lg opacity-0 group-hover:opacity-100 transition-all`}
                  aria-label="Reaktion hinzufügen"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2 bg-popover border-border">
                <div className="flex gap-1">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <Button
                      key={emoji}
                      variant="ghost"
                      size="sm"
                      onClick={() => onReactionToggle(message.id, emoji)}
                      className="h-8 w-8 p-0 text-lg hover:scale-110 hover:bg-accent transition-transform"
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Reactions display */}
        {Object.keys(reactionGroups).length > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {Object.entries(reactionGroups).map(([emoji, reactions]) => (
              <Button
                key={emoji}
                variant="outline"
                size="sm"
                onClick={() => onReactionToggle(message.id, emoji)}
                className={`h-6 px-2 text-xs gap-1 ${
                  hasUserReacted(emoji) ? 'bg-primary/10 border-primary' : ''
                }`}
              >
                <span>{emoji}</span>
                <span>{reactions.length}</span>
              </Button>
            ))}
          </div>
        )}

        <span className="text-xs text-muted-foreground mt-1">
          {new Date(message.created_at).toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit',
          })}
          {message.edited_at && ' (bearbeitet)'}
        </span>
      </div>
    </div>
  );
};
