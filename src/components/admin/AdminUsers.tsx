import { useState } from "react";
import { useAdminData } from "@/hooks/useAdminData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Search, Trash2, Shield } from "lucide-react";
import { UserCard } from "./UserCard";
import { useDebounce } from "@/hooks/useDebounce";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { logAuditAction } from "@/lib/auditLog";
import { Checkbox } from "@/components/ui/checkbox";

export default function AdminUsers() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  const { data: profiles, isLoading, refetch } = useAdminData<any>({
    table: 'profiles',
    orderBy: 'created_at',
    ascending: false,
  });

  const filteredProfiles = profiles?.filter(profile => 
    profile.username?.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) {
      toast({ title: 'Keine Benutzer ausgewählt', variant: 'destructive' });
      return;
    }

    if (!confirm(`${selectedUsers.length} Benutzer wirklich löschen?`)) return;

    try {
      for (const userId of selectedUsers) {
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
      }

      toast({ title: `${selectedUsers.length} Benutzer gelöscht` });
      setSelectedUsers([]);
      refetch();
    } catch (error: any) {
      toast({ title: 'Fehler beim Löschen', description: error.message, variant: 'destructive' });
    }
  };

  const handleBulkRole = async (role: string) => {
    if (selectedUsers.length === 0) {
      toast({ title: 'Keine Benutzer ausgewählt', variant: 'destructive' });
      return;
    }

    try {
      for (const userId of selectedUsers) {
        // First delete existing roles
        await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId);

        // Then insert new role
        const { error } = await supabase
          .from('user_roles')
          .insert([{ user_id: userId, role: role as any }]);

        if (error) throw error;

        await logAuditAction({
          action: 'user_role_granted',
          entity_type: 'user_role',
          entity_id: userId,
          details: { role },
        });
      }

      toast({ title: `Rolle ${role} für ${selectedUsers.length} Benutzer gesetzt` });
      setSelectedUsers([]);
      refetch();
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
        <CardTitle>Benutzerverwaltung</CardTitle>
        <CardDescription>
          Verwalte Benutzer und deren Rollen
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Suche nach Benutzernamen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {selectedUsers.length > 0 && (
          <div className="flex gap-2 p-3 bg-muted rounded-lg">
            <span className="text-sm font-medium">
              {selectedUsers.length} ausgewählt
            </span>
            <div className="flex gap-2 ml-auto">
              <Button size="sm" variant="outline" onClick={() => handleBulkRole('admin')}>
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkRole('user')}>
                <Shield className="w-4 h-4 mr-2" />
                User
              </Button>
              <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Löschen
              </Button>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          {filteredProfiles?.map((profile) => (
            <div key={profile.id} className="flex items-start gap-3">
              <Checkbox
                checked={selectedUsers.includes(profile.id)}
                onCheckedChange={() => toggleUserSelection(profile.id)}
                className="mt-4"
              />
              <div className="flex-1">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{profile.username}</span>
                    <Badge variant="outline">{profile.id}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Erstellt: {new Date(profile.created_at).toLocaleDateString()}
                  </p>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
