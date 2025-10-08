import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Shield, User, Trash2, Info, Key } from "lucide-react";
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
} from "@/components/ui/alert-dialog";

interface UserWithRole {
  id: string;
  email: string;
  username: string;
  created_at: string;
  is_admin: boolean;
}

export const AdminUsers = () => {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      // Get all profiles with their usernames
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, username, created_at');

      if (profilesError) throw profilesError;

      // Get all user roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Try to get auth users (requires admin privileges)
      let authUsers: any[] = [];
      try {
        const { data, error: authError } = await supabase.auth.admin.listUsers();
        if (!authError && data && data.users) {
          authUsers = data.users;
        }
      } catch (authError) {
        console.error("Could not fetch auth users:", authError);
      }

      // Combine data
      const usersWithRoles: UserWithRole[] = (profiles || []).map(profile => {
        const authUser = authUsers.find((u: any) => u.id === profile.id);
        const userRole = roles?.find(r => r.user_id === profile.id);
        
        return {
          id: profile.id,
          email: authUser?.email || 'Unbekannt',
          username: profile.username,
          created_at: profile.created_at,
          is_admin: userRole?.role === 'admin'
        };
      });

      setUsers(usersWithRoles);
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: "Benutzer konnten nicht geladen werden: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleAdminRole = async (userId: string, currentlyAdmin: boolean) => {
    try {
      if (currentlyAdmin) {
        // Remove admin role
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');

        if (error) throw error;
      } else {
        // Add admin role
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'admin' });

        if (error) throw error;
      }

      toast({
        title: "Erfolgreich",
        description: currentlyAdmin 
          ? "Admin-Rechte wurden entzogen"
          : "Admin-Rechte wurden vergeben",
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handlePasswordReset = async (email: string) => {
    if (!email || email === 'Unbekannt') {
      toast({
        title: "Fehler",
        description: "Keine gültige E-Mail-Adresse vorhanden",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth`,
    });

    if (error) {
      toast({
        title: "Fehler",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Erfolgreich",
        description: "Passwort-Reset-E-Mail wurde gesendet",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Benutzerverwaltung</h3>
        <p className="text-sm text-muted-foreground">
          Verwalte Benutzer und deren Admin-Rechte
        </p>
      </div>

      <div className="space-y-2">
        {users.map((user) => (
          <Card key={user.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-full">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{user.username}</p>
                    {user.is_admin && (
                      <Badge variant="default" className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Admin
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Registriert: {new Date(user.created_at).toLocaleDateString('de-DE')}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Info className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Benutzerdetails</AlertDialogTitle>
                      <AlertDialogDescription asChild>
                        <div className="space-y-2 text-left">
                          <p><strong>Benutzername:</strong> {user.username}</p>
                          <p><strong>E-Mail:</strong> {user.email}</p>
                          <p><strong>User ID:</strong> {user.id}</p>
                          <p><strong>Registriert am:</strong> {new Date(user.created_at).toLocaleString('de-DE')}</p>
                          <p><strong>Rolle:</strong> {user.is_admin ? 'Administrator' : 'Benutzer'}</p>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Schließen</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePasswordReset(user.email)}
                >
                  <Key className="w-4 h-4 mr-2" />
                  Passwort zurücksetzen
                </Button>

                <Button
                  variant={user.is_admin ? "destructive" : "default"}
                  size="sm"
                  onClick={() => toggleAdminRole(user.id, user.is_admin)}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  {user.is_admin ? "Admin entfernen" : "Zu Admin machen"}
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {users.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Keine Benutzer gefunden</p>
          </Card>
        )}
      </div>
    </div>
  );
};
