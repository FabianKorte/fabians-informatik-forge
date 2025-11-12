import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface OnlineUser {
  user_id: string;
  username: string;
  avatar_url?: string;
}

interface OnlineUsersProps {
  users: OnlineUser[];
}

export const OnlineUsers = ({ users }: OnlineUsersProps) => {
  if (users.length === 0) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b bg-muted/30">
      <span className="text-sm text-muted-foreground">Online:</span>
      <TooltipProvider>
        <div className="flex -space-x-2">
          {users.slice(0, 5).map((user) => (
            <Tooltip key={user.user_id}>
              <TooltipTrigger>
                <div className="relative">
                  <Avatar className="h-8 w-8 border-2 border-background">
                    {user.avatar_url && (
                      <AvatarImage src={user.avatar_url} alt={user.username} />
                    )}
                    <AvatarFallback className="text-xs">
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{user.username}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          {users.length > 5 && (
            <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
              <span className="text-xs font-medium">+{users.length - 5}</span>
            </div>
          )}
        </div>
      </TooltipProvider>
    </div>
  );
};
