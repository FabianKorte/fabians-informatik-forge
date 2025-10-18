import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Shield, User, FileText, Trash2, Key, Download } from "lucide-react";
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

const ITEMS_PER_PAGE = 50;

export const AdminAuditLogs = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [filterAction, setFilterAction] = useState<string>("all");
  const [filterUser, setFilterUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const { toast } = useToast();

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      // Get total count
      const { count } = await supabase
        .from('audit_logs')
        .select('*', { count: 'exact', head: true });
      
      setTotalCount(count || 0);

      // Get paginated data
      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data: logsData, error: logsError } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);

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
  }, [currentPage]);

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

  const handleExport = () => {
    const csv = [
      ['Zeit', 'Admin', 'Aktion', 'Entität', 'Details'].join(','),
      ...filteredLogs.map(log => [
        new Date(log.created_at).toLocaleString('de-DE'),
        profiles[log.user_id]?.username || 'Unbekannt',
        log.action,
        log.entity_type,
        JSON.stringify(log.details)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: 'Export erfolgreich',
      description: 'Audit-Logs wurden als CSV exportiert',
    });
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Audit-Protokoll</CardTitle>
              <CardDescription>
                Protokoll aller Admin-Aktionen ({filteredLogs.length} von {logs.length})
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Exportieren
            </Button>
          </div>
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

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Seite {currentPage} von {totalPages} ({totalCount} gesamt)
              </p>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 text-sm border rounded hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Zurück
                </button>
                <button
                  className="px-3 py-1 text-sm border rounded hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Weiter
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
