import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Check, X, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Profile {
  username: string;
}

interface Suggestion {
  id: string;
  user_id: string;
  category_id: string;
  module_type: string;
  title: string;
  content: any;
  status: string;
  admin_notes: string | null;
  created_at: string;
  profiles?: Profile | null;
}

export const AdminSuggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const { toast } = useToast();

  const fetchSuggestions = async () => {
    try {
      const { data: suggestionsData, error } = await supabase
        .from('learn_module_suggestions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch profiles separately
      if (suggestionsData && suggestionsData.length > 0) {
        const userIds = suggestionsData.map(s => s.user_id);
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, username')
          .in('id', userIds);

        const suggestionsWithProfiles = suggestionsData.map(suggestion => ({
          ...suggestion,
          profiles: profilesData?.find(p => p.id === suggestion.user_id) || null
        }));

        setSuggestions(suggestionsWithProfiles as Suggestion[]);
      } else {
        setSuggestions([]);
      }
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: "Vorschläge konnten nicht geladen werden",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const updateSuggestionStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('learn_module_suggestions')
        .update({ 
          status,
          admin_notes: adminNotes || null
        })
        .eq('id', id);

      if (error) throw error;

      // If approved, also insert into learn_modules
      if (status === 'approved') {
        const suggestion = suggestions.find(s => s.id === id);
        if (suggestion) {
          const { error: insertError } = await supabase
            .from('learn_modules')
            .insert({
              category_id: suggestion.category_id,
              type: suggestion.module_type,
              title: suggestion.title,
              content: suggestion.content,
              order_index: 999
            });

          if (insertError) throw insertError;
        }
      }

      toast({
        title: "Erfolgreich",
        description: status === 'approved' 
          ? "Vorschlag wurde genehmigt und hinzugefügt"
          : "Vorschlag wurde abgelehnt",
      });

      setAdminNotes("");
      fetchSuggestions();
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: error.message,
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

  const pendingSuggestions = suggestions.filter(s => s.status === 'pending');
  const processedSuggestions = suggestions.filter(s => s.status !== 'pending');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Lerninhalt-Vorschläge</h3>
        <p className="text-sm text-muted-foreground">
          Überprüfe und genehmige Vorschläge von Benutzern
        </p>
      </div>

      {pendingSuggestions.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Ausstehende Vorschläge ({pendingSuggestions.length})</h4>
          {pendingSuggestions.map((suggestion) => (
            <Card key={suggestion.id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-medium">{suggestion.title}</h5>
                    <p className="text-sm text-muted-foreground">
                      Kategorie: {suggestion.category_id} • Typ: {suggestion.module_type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Von: {suggestion.profiles?.username || 'Unbekannt'} • 
                      {new Date(suggestion.created_at).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Vorschau
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{suggestion.title}</DialogTitle>
                        <DialogDescription>
                          Inhalt des Vorschlags
                        </DialogDescription>
                      </DialogHeader>
                      <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                        {JSON.stringify(suggestion.content, null, 2)}
                      </pre>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-2">
                  <Label>Admin-Notizen (optional)</Label>
                  <Textarea
                    placeholder="Notizen für den Benutzer..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => updateSuggestionStatus(suggestion.id, 'approved')}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Genehmigen
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => updateSuggestionStatus(suggestion.id, 'rejected')}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Ablehnen
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {processedSuggestions.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Bearbeitete Vorschläge</h4>
          {processedSuggestions.map((suggestion) => (
            <Card key={suggestion.id} className="p-4 opacity-70">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-medium">{suggestion.title}</h5>
                    <Badge variant={suggestion.status === 'approved' ? 'default' : 'destructive'}>
                      {suggestion.status === 'approved' ? 'Genehmigt' : 'Abgelehnt'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Von: {suggestion.profiles?.username || 'Unbekannt'}
                  </p>
                  {suggestion.admin_notes && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Notiz: {suggestion.admin_notes}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {suggestions.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Keine Vorschläge vorhanden</p>
        </Card>
      )}
    </div>
  );
};
