import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { AlertCircle, CheckCircle, Clock, XCircle, Trash2, RefreshCw, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ErrorReport {
  id: string;
  user_id: string | null;
  title: string;
  description: string;
  steps_to_reproduce: string | null;
  expected_behavior: string | null;
  actual_behavior: string | null;
  browser_info: string | null;
  screenshot_url: string | null;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'wont_fix';
  admin_notes: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export default function AdminErrorReporting() {
  const { toast } = useToast();
  const [reports, setReports] = useState<ErrorReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<ErrorReport | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [status, setStatus] = useState<ErrorReport['status']>('open');

  const loadReports = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('error_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Fehler beim Laden',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setReports((data as ErrorReport[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadReports();
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'wont_fix': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleUpdateReport = async () => {
    if (!selectedReport) return;

    const { error } = await supabase
      .from('error_reports')
      .update({
        status,
        admin_notes: adminNotes,
        resolved_at: status === 'resolved' ? new Date().toISOString() : null,
      })
      .eq('id', selectedReport.id);

    if (error) {
      toast({
        title: 'Fehler beim Aktualisieren',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Fehlerbericht aktualisiert' });
      setSelectedReport(null);
      loadReports();
    }
  };

  const handleDeleteReport = async (id: string) => {
    if (!confirm('Möchten Sie diesen Fehlerbericht wirklich löschen?')) return;

    const { error } = await supabase
      .from('error_reports')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Fehler beim Löschen',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Fehlerbericht gelöscht' });
      loadReports();
    }
  };

  const openReportDialog = (report: ErrorReport) => {
    setSelectedReport(report);
    setAdminNotes(report.admin_notes || '');
    setStatus(report.status);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('de-DE');
  };

  const statsByStatus = {
    open: reports.filter(r => r.status === 'open').length,
    in_progress: reports.filter(r => r.status === 'in_progress').length,
    resolved: reports.filter(r => r.status === 'resolved').length,
    wont_fix: reports.filter(r => r.status === 'wont_fix').length,
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Fehlerberichte
              </CardTitle>
              <CardDescription>
                Gemeldete Fehler von Benutzern verwalten
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={loadReports} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Aktualisieren
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-destructive">{statsByStatus.open}</div>
                <div className="text-xs text-muted-foreground">Offen</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-primary">{statsByStatus.in_progress}</div>
                <div className="text-xs text-muted-foreground">In Bearbeitung</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-green-600">{statsByStatus.resolved}</div>
                <div className="text-xs text-muted-foreground">Gelöst</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-muted-foreground">{statsByStatus.wont_fix}</div>
                <div className="text-xs text-muted-foreground">Nicht behoben</div>
              </CardContent>
            </Card>
          </div>

          {/* Reports List */}
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Lädt...
            </div>
          ) : reports.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Keine Fehlerberichte vorhanden
            </div>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="space-y-3">
                {reports.map((report) => (
                  <Card key={report.id} className="border-l-4" style={{
                    borderLeftColor: report.priority === 'critical' || report.priority === 'high' 
                      ? 'hsl(var(--destructive))' 
                      : 'hsl(var(--border))'
                  }}>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold">{report.title}</h3>
                              <Badge variant={getPriorityColor(report.priority)}>
                                {report.priority}
                              </Badge>
                              <Badge variant="outline" className="flex items-center gap-1">
                                {getStatusIcon(report.status)}
                                {report.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {report.description}
                            </p>
                            <div className="text-xs text-muted-foreground">
                              Gemeldet am: {formatDate(report.created_at)}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openReportDialog(report)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteReport(report.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {report.browser_info && (
                          <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                            Browser: {report.browser_info}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedReport?.title}</DialogTitle>
            <DialogDescription>
              Gemeldet am {selectedReport && formatDate(selectedReport.created_at)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedReport && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold">Beschreibung</Label>
                <p className="mt-1 text-sm">{selectedReport.description}</p>
              </div>

              {selectedReport.steps_to_reproduce && (
                <div>
                  <Label className="text-sm font-semibold">Schritte zur Reproduktion</Label>
                  <p className="mt-1 text-sm whitespace-pre-wrap">{selectedReport.steps_to_reproduce}</p>
                </div>
              )}

              {selectedReport.expected_behavior && (
                <div>
                  <Label className="text-sm font-semibold">Erwartetes Verhalten</Label>
                  <p className="mt-1 text-sm">{selectedReport.expected_behavior}</p>
                </div>
              )}

              {selectedReport.actual_behavior && (
                <div>
                  <Label className="text-sm font-semibold">Tatsächliches Verhalten</Label>
                  <p className="mt-1 text-sm">{selectedReport.actual_behavior}</p>
                </div>
              )}

              {selectedReport.browser_info && (
                <div>
                  <Label className="text-sm font-semibold">Browser-Info</Label>
                  <p className="mt-1 text-sm text-muted-foreground">{selectedReport.browser_info}</p>
                </div>
              )}

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                  <SelectTrigger id="status" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Offen</SelectItem>
                    <SelectItem value="in_progress">In Bearbeitung</SelectItem>
                    <SelectItem value="resolved">Gelöst</SelectItem>
                    <SelectItem value="wont_fix">Wird nicht behoben</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="admin_notes">Admin-Notizen</Label>
                <Textarea
                  id="admin_notes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Interne Notizen zum Fehlerbericht..."
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setSelectedReport(null)}>
                  Abbrechen
                </Button>
                <Button onClick={handleUpdateReport}>
                  Speichern
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}