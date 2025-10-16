import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Shield, User, Trash2, Info, Key, ShieldOff, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  avatar_url?: string;
  bio?: string;
  has2FA?: boolean;
  factorCount?: number;
  factors?: Array<{
    id: string;
    friendlyName: string;
    createdAt: string;
    status: string;
  }>;
}

export const AdminUsers = () => {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      // Get all profiles with their usernames and avatars
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, username, created_at, avatar_url, bio');

      if (profilesError) throw profilesError;

      // Get all user roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Fetch emails from edge function
      let emailMap: Record<string, string> = {};
      try {
        const { data: sessionDataEmail } = await supabase.auth.getSession();
        const accessTokenEmail = sessionDataEmail.session?.access_token;
        const { data: emailData, error: emailError } = await supabase.functions.invoke('get-user-emails', {
          headers: accessTokenEmail ? { Authorization: `Bearer ${accessTokenEmail}` } : undefined,
        });
        if (!emailError && emailData?.emailMap) {
          emailMap = emailData.emailMap;
        }
      } catch (err) {
        console.error("Could not fetch emails:", err);
      }

      // Fetch 2FA status for all users
      let statusMap: Record<string, { has2FA: boolean, factorCount: number, factors: any[] }> = {};
      try {
        const userIds = (profiles || []).map(p => p.id);
        console.log('Fetching 2FA status for users:', userIds);

        // Ensure Authorization header is sent (some environments require explicit header)
        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;
        const currentUserId = sessionData.session?.user?.id;

        const { data: statusData, error: statusError } = await supabase.functions.invoke('get-user-2fa-status', {
          body: { userIds },
          headers: {
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            'Content-Type': 'application/json',
          },
        });
        console.log('2FA status response:', statusData, statusError);
        if (statusError) {
          toast({
            title: "2FA-Status konnte nicht geladen werden",
            description: "Bitte Edge-Function Logs prüfen",
            variant: "destructive",
          });
        }
        if (statusData?.statusMap) {
          statusMap = statusData.statusMap;
        } else {
          console.warn('No statusMap in response from get-user-2fa-status');
        }

        // Fallback: falls der eigene Nutzer nicht im statusMap ist, lokale Factors prüfen
        if (currentUserId && !statusMap[currentUserId]) {
          try {
            const factors = await supabase.auth.mfa.listFactors();
            const verified = (factors.data?.totp || []).filter((f: any) => f.status === 'verified');
            statusMap[currentUserId] = {
              has2FA: verified.length > 0,
              factorCount: verified.length,
              factors: verified.map((f: any) => ({
                id: f.id,
                friendlyName: (f as any).friendly_name,
                createdAt: (f as any).created_at,
                status: f.status,
              })),
            };
          } catch (e) {
            console.warn('Fallback MFA check failed:', e);
          }
        }
      } catch (err) {
        console.error("Could not fetch 2FA status:", err);
        toast({
          title: "2FA-Status Fehler",
          description: "Fehler beim Abrufen des 2FA-Status",
          variant: "destructive",
        });
      }

      // Combine data
      const usersWithRoles: UserWithRole[] = (profiles || []).map(profile => {
        const userRole = roles?.find(r => r.user_id === profile.id);
        const status = statusMap[profile.id] || { has2FA: false, factorCount: 0, factors: [] };
        
        console.log(`User ${profile.username} (${profile.id}) - 2FA status:`, status);
        
        return {
          id: profile.id,
          email: emailMap[profile.id] || 'Nicht verfügbar',
          username: profile.username,
          created_at: profile.created_at,
          avatar_url: profile.avatar_url,
          bio: profile.bio,
          is_admin: userRole?.role === 'admin',
          has2FA: status.has2FA,
          factorCount: status.factorCount,
          factors: status.factors
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
    
    const handleRefresh = () => {
      console.log('2FA status changed, refreshing users...');
      fetchUsers();
    };
    
    window.addEventListener('2fa-status-changed', handleRefresh);
    return () => window.removeEventListener('2fa-status-changed', handleRefresh);
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

  const handleRemove2FA = async (userId: string, username: string) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      const { data, error } = await supabase.functions.invoke('remove-user-2fa', {
        body: { userId },
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
      });

      if (error) throw error;

      toast({
        title: "Erfolgreich",
        description: `2FA für "${username}" wurde entfernt`,
      });
      
      // Refresh users to update UI
      fetchUsers();
      window.dispatchEvent(new CustomEvent('2fa-status-changed'));
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: "2FA konnte nicht entfernt werden: " + error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string, username: string) => {
    try {
      // Delete user profile (cascade will handle related data)
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Erfolgreich",
        description: `Benutzer "${username}" wurde gelöscht`,
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: "Benutzer konnte nicht gelöscht werden: " + error.message,
        variant: "destructive",
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
        <div className="mt-2 p-3 bg-muted/50 rounded-md border">
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <Shield className="w-3 h-3" />
            Hinweis: Benutzer können ihre 2FA selbst im Dashboard einrichten und deaktivieren
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <Card key={user.id} className="p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="w-10 h-10 shrink-0">
                  <AvatarImage src={user.avatar_url || undefined} alt={user.username} />
                  <AvatarFallback>
                    {user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium truncate">{user.username}</p>
                    {user.is_admin && (
                      <Badge variant="default" className="flex items-center gap-1 shrink-0">
                        <Shield className="w-3 h-3" />
                        Admin
                      </Badge>
                    )}
                    {user.has2FA && (
                      <Badge variant="secondary" className="flex items-center gap-1 shrink-0">
                        <ShieldCheck className="w-3 h-3" />
                        2FA
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Registriert: {new Date(user.created_at).toLocaleDateString('de-DE')}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 lg:shrink-0">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Info className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Details</span>
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
                          <p><strong>2FA Status:</strong> {user.has2FA ? `Aktiv (${user.factorCount} Faktor${user.factorCount !== 1 ? 'en' : ''})` : 'Nicht aktiv'}</p>
                          {user.has2FA && user.factors && user.factors.length > 0 && (
                            <div className="mt-2 p-2 bg-muted rounded">
                              <p className="text-xs font-semibold mb-1">2FA Details:</p>
                              {user.factors.map((factor, idx) => (
                                <div key={factor.id} className="text-xs space-y-0.5 mb-1">
                                  <p><strong>Faktor {idx + 1}:</strong> {factor.friendlyName}</p>
                                  <p><strong>Erstellt:</strong> {new Date(factor.createdAt).toLocaleString('de-DE')}</p>
                                </div>
                              ))}
                            </div>
                          )}
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
                  <span className="hidden sm:inline">Passwort</span>
                </Button>

                {user.has2FA && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemove2FA(user.id, user.username)}
                  >
                    <ShieldOff className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">2FA entfernen</span>
                  </Button>
                )}

                <Button
                  variant={user.is_admin ? "destructive" : "default"}
                  size="sm"
                  onClick={() => toggleAdminRole(user.id, user.is_admin)}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{user.is_admin ? "Admin entfernen" : "Zu Admin"}</span>
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Löschen</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Benutzer wirklich löschen?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Diese Aktion kann nicht rückgängig gemacht werden. Der Benutzer "{user.username}" 
                        und alle zugehörigen Daten werden permanent gelöscht.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteUser(user.id, user.username)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Endgültig löschen
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
