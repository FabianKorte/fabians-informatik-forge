import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { UserX, Shield, ShieldOff, KeyRound, Trash2 } from 'lucide-react';

interface UserActionsProps {
  userId: string;
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
 * Action buttons component for user management.
 * Provides buttons for password reset, admin toggle, 2FA removal, and user deletion.
 * 
 * @param {UserActionsProps} props - Component props
 */
export const UserActions = ({
  userId,
  username,
  email,
  isAdmin,
  has2FA,
  onPasswordReset,
  onToggleAdmin,
  onRemove2FA,
  onDelete,
}: UserActionsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPasswordReset(email, userId)}
      >
        <KeyRound className="w-4 h-4 mr-2" />
        Passwort zurücksetzen
      </Button>

      {has2FA && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              <UserX className="w-4 h-4 mr-2" />
              2FA entfernen
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>2FA entfernen?</AlertDialogTitle>
              <AlertDialogDescription>
                Möchtest du die 2-Faktor-Authentifizierung für {username} wirklich entfernen?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Abbrechen</AlertDialogCancel>
              <AlertDialogAction onClick={() => onRemove2FA(userId, username)}>
                Entfernen
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <Button
        variant={isAdmin ? 'destructive' : 'default'}
        size="sm"
        onClick={() => onToggleAdmin(userId, isAdmin)}
      >
        {isAdmin ? (
          <>
            <ShieldOff className="w-4 h-4 mr-2" />
            Admin entfernen
          </>
        ) : (
          <>
            <Shield className="w-4 h-4 mr-2" />
            Als Admin setzen
          </>
        )}
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Löschen
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Benutzer löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Möchtest du den Benutzer {username} wirklich löschen? Diese Aktion kann nicht
              rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(userId, username)}>
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
