import { useState } from 'react';
import { useRoles, AppRole } from '@/hooks/useRoles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Shield, Crown, ShieldCheck, User, Plus, Trash2, Loader2, Search } from 'lucide-react';
import { logger } from '@/lib/logger';

const ROLE_ICONS = {
  owner: Crown,
  admin: Shield,
  moderator: ShieldCheck,
  user: User,
};

const ROLE_COLORS = {
  owner: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  admin: 'bg-red-500/10 text-red-500 border-red-500/20',
  moderator: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  user: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
};

const ROLE_LABELS = {
  owner: 'Owner',
  admin: 'Admin',
  moderator: 'Moderator',
  user: 'User',
};

const ROLE_DESCRIPTIONS = {
  owner: 'Vollständige Kontrolle über die Plattform',
  admin: 'Verwaltung von Inhalten und Benutzern',
  moderator: 'Moderation von Inhalten und Chat',
  user: 'Standard-Benutzer',
};

export const AdminRoles = () => {
  const { users, isLoading, assignRole, removeRole } = useRoles();
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<AppRole>('user');
  const [roleToRemove, setRoleToRemove] = useState<{ userId: string; role: AppRole } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAssignRole = async () => {
    if (!selectedUser) return;

    await assignRole(selectedUser, selectedRole);
    setSelectedUser('');
    setSelectedRole('user');
  };

  const handleRemoveRole = async () => {
    if (!roleToRemove) return;

    await removeRole(roleToRemove.userId, roleToRemove.role);
    setRoleToRemove(null);
  };

  const filteredUsers = users.filter(
    user =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Role Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.keys(ROLE_LABELS) as AppRole[]).map(role => {
          const Icon = ROLE_ICONS[role];
          const count = users.filter(u => u.roles.includes(role)).length;

          return (
            <Card key={role}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Icon className={`h-5 w-5 ${ROLE_COLORS[role].split(' ')[1]}`} />
                  <Badge variant="outline" className={ROLE_COLORS[role]}>
                    {count} {count === 1 ? 'Benutzer' : 'Benutzer'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg mb-1">{ROLE_LABELS[role]}</CardTitle>
                <CardDescription className="text-xs">{ROLE_DESCRIPTIONS[role]}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Assign Role Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Rolle zuweisen
          </CardTitle>
          <CardDescription>Weise einem Benutzer eine neue Rolle zu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Benutzer auswählen" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.username || user.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as AppRole)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(ROLE_LABELS) as AppRole[]).map(role => {
                  const Icon = ROLE_ICONS[role];
                  return (
                    <SelectItem key={role} value={role}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {ROLE_LABELS[role]}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Button onClick={handleAssignRole} disabled={!selectedUser}>
              <Plus className="h-4 w-4 mr-2" />
              Zuweisen
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Benutzer & Rollen</CardTitle>
              <CardDescription>Verwalte Benutzerrollen</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Suchen..."
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Benutzer</TableHead>
                  <TableHead>E-Mail</TableHead>
                  <TableHead>Rollen</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                      Keine Benutzer gefunden
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.username || 'Unbekannt'}</TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.roles.length === 0 ? (
                            <Badge variant="outline" className={ROLE_COLORS.user}>
                              <User className="h-3 w-3 mr-1" />
                              User (Standard)
                            </Badge>
                          ) : (
                            user.roles.map(role => {
                              const Icon = ROLE_ICONS[role];
                              return (
                                <Badge key={role} variant="outline" className={ROLE_COLORS[role]}>
                                  <Icon className="h-3 w-3 mr-1" />
                                  {ROLE_LABELS[role]}
                                </Badge>
                              );
                            })
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {user.roles.map(role => (
                            <Button
                              key={role}
                              variant="ghost"
                              size="icon"
                              onClick={() => setRoleToRemove({ userId: user.id, role })}
                              className="h-8 w-8"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Remove Role Confirmation Dialog */}
      <AlertDialog open={!!roleToRemove} onOpenChange={() => setRoleToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rolle entfernen?</AlertDialogTitle>
            <AlertDialogDescription>
              Möchtest du wirklich die Rolle "{roleToRemove && ROLE_LABELS[roleToRemove.role]}" von diesem Benutzer entfernen?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveRole}>Entfernen</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
