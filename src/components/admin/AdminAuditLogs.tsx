import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Shield, User, FileText, Trash2, Key } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: any;
  created_at: string;
}

interface Profile {
  id: string;
  username: string;
}

export const AdminAuditLogs = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [filterAction, setFilterAction] = useState<string>("all");
  const [filterUser, setFilterUser] = useState("");
  const { toast } = useToast();

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const { data: logsData, error: logsError } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (logsError) throw logsError;

      const userIds = [...new Set(logsData?.map(l => l.user_id) || [])];
      
      if (userIds.length > 0) {
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, username')
          .in('id', userIds);

        const profileMap: Record<string, Profile> = {};
        profilesData?.forEach(p => {
          profileMap[p.id] = p;
        });
        setProfiles(profileMap);
      }

      setLogs(logsData || []);
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: "Konnte Audit-Logs nicht laden: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const getActionBadge = (action: string) => {
    const variants: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      user_role_granted: { label: "Rolle vergeben", variant: "default" },
      user_role_revoked: { label: "Rolle entzogen", variant: "secondary" },
      user_2fa_removed: { label: "2FA entfernt", variant: "outline" },
      user_deleted: { label: "Benutzer gelöscht", variant: "destructive" },
      learning_content_created: { label: "Inhalt erstellt", variant: "default" },
      learning_content_updated: { label: "Inhalt bearbeitet", variant: "secondary" },
      learning_content_deleted: { label: "Inhalt gelöscht", variant: "destructive" },
      learning_content_bulk_deleted: { label: "Inhalte gelöscht", variant: "destructive" },
      password_reset_sent: { label: "Passwort-Reset", variant: "outline" },
    };
    const config = variants[action] || { label: action, variant: "outline" as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'user':
      case 'user_role':
        return <User className="w-4 h-4" />;
      case 'learn_module':
        return <FileText className="w-4 h-4" />;
      case 'auth':
        return <Key className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const filteredLogs = logs.filter(log => {
    if (filterAction !== "all" && log.action !== filterAction) return false;
    if (filterUser && !profiles[log.user_id]?.username.toLowerCase().includes(filterUser.toLowerCase())) return false;
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Audit-Protokoll</CardTitle>
          <CardDescription>
            Protokoll aller Admin-Aktionen ({filteredLogs.length} von {logs.length})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <Input
              placeholder="Benutzer filtern..."
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="sm:max-w-xs"
            />
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Aktion filtern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Aktionen</SelectItem>
                <SelectItem value="user_role_granted">Rolle vergeben</SelectItem>
                <SelectItem value="user_role_revoked">Rolle entzogen</SelectItem>
                <SelectItem value="user_2fa_removed">2FA entfernt</SelectItem>
                <SelectItem value="user_deleted">Benutzer gelöscht</SelectItem>
                <SelectItem value="learning_content_created">Inhalt erstellt</SelectItem>
                <SelectItem value="learning_content_updated">Inhalt bearbeitet</SelectItem>
                <SelectItem value="learning_content_deleted">Inhalt gelöscht</SelectItem>
                <SelectItem value="learning_content_bulk_deleted">Bulk-Löschung</SelectItem>
                <SelectItem value="password_reset_sent">Passwort-Reset</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Zeit</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Aktion</TableHead>
                  <TableHead>Entität</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      Keine Audit-Logs vorhanden
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(log.created_at).toLocaleString('de-DE')}
                      </TableCell>
                      <TableCell className="font-medium">
                        {profiles[log.user_id]?.username || 'Unbekannt'}
                      </TableCell>
                      <TableCell>{getActionBadge(log.action)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getEntityIcon(log.entity_type)}
                          <span className="text-sm">{log.entity_type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs text-muted-foreground max-w-xs truncate">
                          {log.details && Object.keys(log.details).length > 0 
                            ? JSON.stringify(log.details)
                            : '-'}
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
    </div>
  );
};
