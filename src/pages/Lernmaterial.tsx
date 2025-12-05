import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import krotzebuuuhProfile from "@/assets/krotzebuuuh-profile.png";

const Lernmaterial = () => {
  const navigate = useNavigate();

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
                <h3 className="text-lg font-medium mb-3">Kontakt bei Fragen</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Bei Fragen zum Lernmaterial kannst du dich an folgenden Discord-Nutzer wenden:
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-card rounded-lg p-4 border border-border">
                  <img 
                    src={krotzebuuuhProfile}
                    alt="krotzebuuuh Discord Profil"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="text-center sm:text-left">
                    <p className="font-medium text-lg">Kev_The_Dev</p>
                    <p className="text-muted-foreground text-sm">@krotzebuuuh</p>
                    <p className="text-muted-foreground text-xs mt-1">User ID: 1009163299016949770</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => window.open('https://discordapp.com/users/1009163299016949770', '_blank')}
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
