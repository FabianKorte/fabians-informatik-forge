import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import krotzebuuuhFallback from "@/assets/krotzebuuuh-profile.png";

const KROTZEBUUUH_USER_ID = "48f90875-a2f0-4fd2-824f-04224a5f1d78";

const Lernmaterial = () => {
  const navigate = useNavigate();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['krotzebuuuh-profile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', KROTZEBUUUH_USER_ID)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  const avatarUrl = profile?.avatar_url || krotzebuuuhFallback;
  const username = profile?.username || "Kev_The_Dev";

  return (
    <>
      <SEO 
        title="Lernmaterial - Fachinformatiker Prüfungsvorbereitung"
        description="Zusätzliches Lernmaterial für die Fachinformatiker Prüfungsvorbereitung"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zur Startseite
          </Button>

          <Card className="border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sm:text-3xl font-medium">
                Lernmaterial
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Zusätzliche Ressourcen für deine Prüfungsvorbereitung
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* External Link */}
              <div className="bg-muted/50 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-medium mb-3">Lernmaterial-Webseite</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Hier findest du weiteres Lernmaterial zur Vorbereitung auf deine IHK-Prüfung.
                </p>
                <Button
                  onClick={() => window.open('https://kevcave.theworkpc.com', '_blank')}
                  className="w-full sm:w-auto"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Zur Webseite
                </Button>
              </div>

              {/* Discord Contact */}
              <div className="bg-muted/50 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-medium mb-3">Zugang & Kontakt</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Um Zugang zum Lernmaterial zu erhalten oder bei Fragen, melde dich bei folgendem Discord-Nutzer:
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-card rounded-lg p-4 border border-border">
                  {isLoading ? (
                    <Skeleton className="w-20 h-20 rounded-full" />
                  ) : (
                    <img 
                      src={avatarUrl}
                      alt={`${username} Profil`}
                      className="w-20 h-20 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = krotzebuuuhFallback;
                      }}
                    />
                  )}
                  <div className="text-center sm:text-left">
                    <p className="font-medium text-lg">{username}</p>
                    <p className="text-muted-foreground text-sm">@krotzebuuuh</p>
                    <p className="text-muted-foreground text-xs mt-1">User ID: 100916329901694977</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => window.open('https://discordapp.com/users/100916329901694977', '_blank')}
                  className="w-full sm:w-auto mt-4"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Discord-Profil öffnen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Lernmaterial;
