import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock } from 'lucide-react';
import { UserActions } from './UserActions';

interface UserCardProps {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  has2FA: boolean;
  onPasswordReset: (email: string, userId: string) => void;
  onToggleAdmin: (userId: string, currentlyAdmin: boolean) => void;
  onRemove2FA: (userId: string, username: string) => void;
  onDelete: (userId: string, username: string) => void;
}

/**
 * Card component displaying user information and management actions.
 * Shows username, email, admin status, 2FA status, and action buttons.
 * 
 * @param {UserCardProps} props - Component props
 */
export const UserCard = ({
  id,
  username,
  email,
  isAdmin,
  has2FA,
  onPasswordReset,
  onToggleAdmin,
  onRemove2FA,
  onDelete,
}: UserCardProps) => {
  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{username}</h3>
              {isAdmin && (
                <Badge variant="default">
                  <Shield className="w-3 h-3 mr-1" />
                  Admin
                </Badge>
              )}
              {has2FA && (
                <Badge variant="secondary">
                  <Lock className="w-3 h-3 mr-1" />
                  2FA
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>

        <UserActions
          userId={id}
          username={username}
          email={email}
          isAdmin={isAdmin}
          has2FA={has2FA}
          onPasswordReset={onPasswordReset}
          onToggleAdmin={onToggleAdmin}
          onRemove2FA={onRemove2FA}
          onDelete={onDelete}
        />
      </div>
    </Card>
  );
};
