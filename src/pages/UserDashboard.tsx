import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, Lightbulb, TrendingUp } from "lucide-react";
import { SimpleLearningContentForm } from "@/components/user/SimpleLearningContentForm";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    // Fetch user profile
    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setUsername(data.username);
      }
    };

    // Fetch user suggestions
    const fetchSuggestions = async () => {
      const { data } = await supabase
        .from('learn_module_suggestions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (data) {
        setSuggestions(data);
      }
    };

    fetchProfile();
    fetchSuggestions();
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Mein Dashboard</h1>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zur Startseite
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Willkommen, {username}!</h2>
          <p className="text-muted-foreground">
            Verwalte deine Lernfortschritte und schlage neue Inhalte vor
          </p>
        </div>

        <Tabs defaultValue="suggest" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2">
            <TabsTrigger value="suggest" className="text-xs sm:text-sm">
              <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Inhalte vorschlagen</span>
              <span className="sm:hidden">Vorschlagen</span>
            </TabsTrigger>
            <TabsTrigger value="my-suggestions" className="text-xs sm:text-sm">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Meine Vorschläge</span>
              <span className="sm:hidden">Vorschläge</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Fortschritt
            </TabsTrigger>
          </TabsList>

          <TabsContent value="suggest">
            <SimpleLearningContentForm />
          </TabsContent>

          <TabsContent value="my-suggestions">
            <Card>
              <CardHeader>
                <CardTitle>Meine eingereichten Vorschläge</CardTitle>
                <CardDescription>
                  Übersicht über deine eingereichten Lerninhalt-Vorschläge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="p-4">
                      <div className="flex flex-col gap-3">
                        <div>
                          <div className="flex items-start gap-2 mb-1 flex-wrap">
                            <h4 className="font-medium text-sm sm:text-base">{suggestion.title}</h4>
                            <Badge variant={
                              suggestion.status === 'approved' ? 'default' :
                              suggestion.status === 'rejected' ? 'destructive' :
                              'secondary'
                            } className="shrink-0">
                              {suggestion.status === 'approved' ? 'Genehmigt' :
                               suggestion.status === 'rejected' ? 'Abgelehnt' :
                               'In Prüfung'}
                            </Badge>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Kategorie: {suggestion.category_id} • Typ: {suggestion.module_type}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Eingereicht am {new Date(suggestion.created_at).toLocaleDateString('de-DE')}
                          </p>
                          {suggestion.admin_notes && (
                            <p className="text-xs sm:text-sm text-muted-foreground mt-2 italic">
                              Admin-Notiz: {suggestion.admin_notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}

                  {suggestions.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Du hast noch keine Vorschläge eingereicht
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Dein Lernfortschritt</CardTitle>
                <CardDescription>
                  Deine Fortschritte werden automatisch zwischen deinen Geräten synchronisiert
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Button onClick={() => navigate("/progress")}>
                    Zu den Fortschritten
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
