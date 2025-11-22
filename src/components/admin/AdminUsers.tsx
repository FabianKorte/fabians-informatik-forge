import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Search, Trash2, Shield, Crown, User, Mail, ShieldCheck, Calendar, Key } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { logAuditAction } from "@/lib/auditLog";
import { Checkbox } from "@/components/ui/checkbox";
import { useRoles, AppRole } from "@/hooks/useRoles";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";

const getRoleIcon = (role: AppRole) => {
  switch (role) {
    case 'owner':
      return <Crown className="w-3 h-3" />;
    case 'admin':
      return <Shield className="w-3 h-3" />;
    case 'moderator':
      return <ShieldCheck className="w-3 h-3" />;
    default:
      return <User className="w-3 h-3" />;
  }
};

const getRoleBadgeVariant = (role: AppRole): "default" | "destructive" | "secondary" | "outline" => {
  switch (role) {
    case 'owner':
      return 'default';
    case 'admin':
      return 'destructive';
    case 'moderator':
      return 'secondary';
    default:
      return 'outline';
  }
};

const getRoleLabel = (role: AppRole) => {
  switch (role) {
    case 'owner':
      return 'Besitzer';
    case 'admin':
      return 'Administrator';
    case 'moderator':
      return 'Moderator';
    default:
      return 'Benutzer';
  }
};

export default function AdminUsers() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { users, isLoading, assignRole, removeRole, refetch } = useRoles();

  const filteredUsers = users?.filter(user => 
    user.username?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    user.email?.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      await logAuditAction({
        action: 'user_deleted',
        entity_type: 'user',
        entity_id: userId,
      });

      toast({ title: 'Benutzer gelöscht' });
      refetch();
    } catch (error: any) {
      toast({ title: 'Fehler beim Löschen', description: error.message, variant: 'destructive' });
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) {
      toast({ title: 'Keine Benutzer ausgewählt', variant: 'destructive' });
      return;
    }

    if (!confirm(`${selectedUsers.length} Benutzer wirklich löschen?`)) return;

    try {
      for (const userId of selectedUsers) {
        await handleDeleteUser(userId);
      }

      toast({ title: `${selectedUsers.length} Benutzer gelöscht` });
      setSelectedUsers([]);
    } catch (error: any) {
      toast({ title: 'Fehler beim Löschen', description: error.message, variant: 'destructive' });
    }
  };

  const handleRoleChange = async (userId: string, newRole: AppRole, currentRoles: AppRole[]) => {
    try {
      // Remove all existing roles first
      for (const role of currentRoles) {
        await removeRole(userId, role);
      }
      
      // Then assign the new role
      await assignRole(userId, newRole);
      
      await logAuditAction({
        action: 'user_role_granted',
        entity_type: 'user_role',
        entity_id: userId,
        details: { from: currentRoles, to: newRole },
      });
    } catch (error: any) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    }
  };

  const handleBulkRole = async (role: AppRole) => {
    if (selectedUsers.length === 0) {
      toast({ title: 'Keine Benutzer ausgewählt', variant: 'destructive' });
      return;
    }

    try {
      for (const userId of selectedUsers) {
        const user = users.find(u => u.id === userId);
        if (user) {
          await handleRoleChange(userId, role, user.roles);
        }
      }

      toast({ title: `Rolle ${getRoleLabel(role)} für ${selectedUsers.length} Benutzer gesetzt` });
      setSelectedUsers([]);
    } catch (error: any) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Benutzerverwaltung & Rollen</CardTitle>
        <CardDescription>
          Verwalte alle Benutzer, ihre Rollen und Berechtigungen an einem Ort
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Suche nach Benutzername oder E-Mail..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {selectedUsers.length > 0 && (
          <div className="flex gap-2 p-4 bg-muted/50 rounded-lg border">
            <span className="text-sm font-medium flex items-center gap-2">
              <Key className="w-4 h-4" />
              {selectedUsers.length} ausgewählt
            </span>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex gap-2 ml-auto flex-wrap">
              <Button size="sm" variant="outline" onClick={() => handleBulkRole('owner')}>
                <Crown className="w-4 h-4 mr-2" />
                Owner
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkRole('admin')}>
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkRole('moderator')}>
                <ShieldCheck className="w-4 h-4 mr-2" />
                Moderator
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkRole('user')}>
                <User className="w-4 h-4 mr-2" />
                User
              </Button>
              <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Löschen
              </Button>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          {filteredUsers?.map((user) => {
            const currentRole = user.roles[0] || 'user';
            
            return (
              <div key={user.id} className="flex items-start gap-3">
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={() => toggleUserSelection(user.id)}
                  className="mt-5"
                />
                <Card className="flex-1 transition-all hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg truncate">{user.username || 'Unbekannt'}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <Mail className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{user.email}</span>
                            </div>
                          </div>
                        </div>

                        <Separator className="my-3" />

                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Rolle:</span>
                            <div className="flex gap-1">
                              {user.roles.length > 0 ? (
                                user.roles.map((role) => (
                                  <Badge key={role} variant={getRoleBadgeVariant(role)} className="gap-1">
                                    {getRoleIcon(role)}
                                    {getRoleLabel(role)}
                                  </Badge>
                                ))
                              ) : (
                                <Badge variant="outline" className="gap-1">
                                  <User className="w-3 h-3" />
                                  Keine Rolle
                                </Badge>
                              )}
                            </div>
                          </div>

                          <Separator orientation="vertical" className="h-4" />

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>ID: {user.id.substring(0, 8)}...</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Select
                          value={currentRole}
                          onValueChange={(value) => handleRoleChange(user.id, value as AppRole, user.roles)}
                        >
                          <SelectTrigger className="w-[160px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="owner">
                              <div className="flex items-center gap-2">
                                <Crown className="w-3 h-3" />
                                Owner
                              </div>
                            </SelectItem>
                            <SelectItem value="admin">
                              <div className="flex items-center gap-2">
                                <Shield className="w-3 h-3" />
                                Admin
                              </div>
                            </SelectItem>
                            <SelectItem value="moderator">
                              <div className="flex items-center gap-2">
                                <ShieldCheck className="w-3 h-3" />
                                Moderator
                              </div>
                            </SelectItem>
                            <SelectItem value="user">
                              <div className="flex items-center gap-2">
                                <User className="w-3 h-3" />
                                User
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Benutzer löschen?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Möchtest du <strong>{user.username}</strong> wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden und alle Daten des Benutzers werden permanent entfernt.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteUser(user.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Löschen
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {filteredUsers?.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Keine Benutzer gefunden</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
