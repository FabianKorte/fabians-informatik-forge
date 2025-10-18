import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Check, X, Eye, Code } from "lucide-react";
import { SuggestionPreview } from "./SuggestionPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
        title: "✓ Erfolgreich",
        description: status === 'approved' 
          ? "Vorschlag wurde genehmigt und hinzugefügt"
          : "Vorschlag wurde abgelehnt",
        className: "animate-fade-in",
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
                  {suggestions.map((suggestion) => (
                    <Card key={suggestion.id} className="p-3 sm:p-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h5 className="font-medium text-sm truncate">{suggestion.title}</h5>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              Kategorie: {suggestion.category_id} • Typ: {suggestion.module_type}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Von: {suggestion.profiles?.username || 'Unbekannt'} • 
                              {new Date(suggestion.created_at).toLocaleDateString('de-DE')}
                            </p>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="shrink-0">
                                <Eye className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                                <span className="hidden sm:inline">Vorschau</span>
                              </Button>
                            </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{suggestion.title}</DialogTitle>
                        <DialogDescription>
                          Inhalt des Vorschlags ansehen
                        </DialogDescription>
                      </DialogHeader>
                      <Tabs defaultValue="preview" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="preview">
                            <Eye className="w-4 h-4 mr-2" />
                            Vorschau
                          </TabsTrigger>
                          <TabsTrigger value="code">
                            <Code className="w-4 h-4 mr-2" />
                            Code
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="preview" className="mt-4">
                          <SuggestionPreview 
                            content={suggestion.content} 
                            moduleType={suggestion.module_type}
                          />
                        </TabsContent>
                        <TabsContent value="code" className="mt-4">
                          <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                            {JSON.stringify(suggestion.content, null, 2)}
                          </pre>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm">Admin-Notizen (optional)</Label>
                  <Textarea
                    placeholder="Notizen für den Benutzer..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={2}
                    className="text-sm"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => updateSuggestionStatus(suggestion.id, 'approved')}
                    className="flex-1 sm:flex-initial"
                  >
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Genehmigen</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => updateSuggestionStatus(suggestion.id, 'rejected')}
                    className="flex-1 sm:flex-initial"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Ablehnen</span>
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
