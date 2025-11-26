import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Save, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";
import { logger } from "@/lib/logger";

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: string;
  is_active: boolean;
  created_at: string;
  created_by: string;
  updated_at: string;
}

export default function AdminAnnouncements() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    type: 'info' as const,
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('site_announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      logger.error('Error fetching announcements:', error);
      toast({
        title: "Fehler",
        description: "Ankündigungen konnten nicht geladen werden",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newAnnouncement.title || !newAnnouncement.message) {
      toast({
        title: "Fehler",
        description: "Bitte fülle alle Felder aus",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('site_announcements')
        .insert({
          ...newAnnouncement,
          created_by: user?.id,
          is_active: true,
        });

      if (error) throw error;

      toast({
        title: "Erfolg",
        description: "Ankündigung wurde erstellt",
      });

      setNewAnnouncement({ title: '', message: '', type: 'info' });
      fetchAnnouncements();
    } catch (error) {
      logger.error('Error creating announcement:', error);
      toast({
        title: "Fehler",
        description: "Ankündigung konnte nicht erstellt werden",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (id: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from('site_announcements')
        .update({ is_active: !currentState })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Erfolg",
        description: `Ankündigung wurde ${!currentState ? 'aktiviert' : 'deaktiviert'}`,
      });

      fetchAnnouncements();
    } catch (error) {
      logger.error('Error toggling announcement:', error);
      toast({
        title: "Fehler",
        description: "Status konnte nicht geändert werden",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('site_announcements')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Erfolg",
        description: "Ankündigung wurde gelöscht",
      });

      fetchAnnouncements();
    } catch (error) {
      logger.error('Error deleting announcement:', error);
      toast({
        title: "Fehler",
        description: "Ankündigung konnte nicht gelöscht werden",
        variant: "destructive",
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <XCircle className="h-4 w-4" />;
      case 'success': return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'warning': return 'outline';
      case 'error': return 'destructive';
      case 'success': return 'default';
      default: return 'secondary';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Lädt...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Neue Ankündigung erstellen
          </CardTitle>
          <CardDescription>
            Erstelle eine neue Website-Ankündigung, die allen Besuchern angezeigt wird
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titel</Label>
            <Input
              id="title"
              value={newAnnouncement.title}
              onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
              placeholder="z.B. Wartungsarbeiten geplant"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Nachricht</Label>
            <Textarea
              id="message"
              value={newAnnouncement.message}
              onChange={(e) => setNewAnnouncement(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Beschreibe die Ankündigung im Detail..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Typ</Label>
            <Select 
              value={newAnnouncement.type} 
              onValueChange={(value: any) => setNewAnnouncement(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="info">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Information
                  </div>
                </SelectItem>
                <SelectItem value="warning">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Warnung
                  </div>
                </SelectItem>
                <SelectItem value="error">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    Fehler
                  </div>
                </SelectItem>
                <SelectItem value="success">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Erfolg
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleCreate} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Ankündigung erstellen
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bestehende Ankündigungen</CardTitle>
          <CardDescription>
            Verwalte alle Website-Ankündigungen
          </CardDescription>
        </CardHeader>
        <CardContent>
          {announcements.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Keine Ankündigungen vorhanden
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(announcement.type)}
                          <h3 className="font-semibold text-lg">{announcement.title}</h3>
                          <Badge variant={getTypeBadgeVariant(announcement.type)}>
                            {announcement.type}
                          </Badge>
                          {announcement.is_active && (
                            <Badge variant="default" className="animate-pulse">
                              Aktiv
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{announcement.message}</p>
                        <p className="text-xs text-muted-foreground">
                          Erstellt: {new Date(announcement.created_at).toLocaleString('de-DE')}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`active-${announcement.id}`} className="text-xs">
                            Aktiv
                          </Label>
                          <Switch
                            id={`active-${announcement.id}`}
                            checked={announcement.is_active}
                            onCheckedChange={() => handleToggleActive(announcement.id, announcement.is_active)}
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(announcement.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Löschen
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}