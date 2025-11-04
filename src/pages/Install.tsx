import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, Download, CheckCircle2, Wifi, Battery, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function Install() {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          ← Zurück zur Startseite
        </Button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <Smartphone className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">App installieren</h1>
          <p className="text-xl text-muted-foreground">
            Nutze die Lernplattform wie eine native App – schneller, offline-fähig und immer griffbereit!
          </p>
        </div>

        {isInstalled ? (
          <Card className="p-8 text-center bg-success/10 border-success/20">
            <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">App bereits installiert!</h2>
            <p className="text-muted-foreground mb-6">
              Die Lernplattform ist auf deinem Gerät installiert und kann jederzeit genutzt werden.
            </p>
            <Button onClick={() => navigate('/')}>
              Zur App
            </Button>
          </Card>
        ) : (
          <>
            {/* Installation Instructions */}
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <Card className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Wifi className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Offline-Modus</h3>
                <p className="text-sm text-muted-foreground">
                  Lerne auch ohne Internetverbindung weiter
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Schneller Start</h3>
                <p className="text-sm text-muted-foreground">
                  Direkter Zugriff vom Home-Screen ohne Browser
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Battery className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Akkuschonend</h3>
                <p className="text-sm text-muted-foreground">
                  Optimiert für mobile Geräte und längere Akkulaufzeit
                </p>
              </Card>
            </div>

            {/* Install Button or iOS Instructions */}
            {isIOS ? (
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-center">Installation auf iOS</h2>
                <ol className="space-y-4 text-left">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</span>
                    <div>
                      <p className="font-semibold">Safari öffnen</p>
                      <p className="text-sm text-muted-foreground">Diese Seite in Safari öffnen (nicht Chrome oder anderer Browser)</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</span>
                    <div>
                      <p className="font-semibold">Teilen-Button tippen</p>
                      <p className="text-sm text-muted-foreground">Das Teilen-Symbol unten in der Mitte (Quadrat mit Pfeil nach oben)</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</span>
                    <div>
                      <p className="font-semibold">"Zum Home-Bildschirm" wählen</p>
                      <p className="text-sm text-muted-foreground">In der Liste nach unten scrollen und diese Option wählen</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</span>
                    <div>
                      <p className="font-semibold">Bestätigen</p>
                      <p className="text-sm text-muted-foreground">Auf "Hinzufügen" tippen – fertig!</p>
                    </div>
                  </li>
                </ol>
              </Card>
            ) : deferredPrompt ? (
              <Card className="p-8 text-center">
                <Download className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Bereit zur Installation</h2>
                <p className="text-muted-foreground mb-6">
                  Mit einem Klick kannst du die App auf deinem Gerät installieren.
                </p>
                <Button 
                  size="lg" 
                  onClick={handleInstallClick}
                  className="w-full sm:w-auto"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Jetzt installieren
                </Button>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Installation verfügbar</h2>
                <p className="text-muted-foreground mb-6">
                  Die Installation ist auf unterstützten Browsern verfügbar. Bitte öffne diese Seite in Chrome, Edge oder einem anderen modernen Browser.
                </p>
                <p className="text-sm text-muted-foreground">
                  Hinweis: Die App funktioniert auch ohne Installation im Browser.
                </p>
              </Card>
            )}
          </>
        )}

        {/* Features List */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Was du bekommst</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Vollständiger Offline-Zugriff</p>
                  <p className="text-sm text-muted-foreground">Alle Lernmaterialien auch ohne Internet verfügbar</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Push-Benachrichtigungen</p>
                  <p className="text-sm text-muted-foreground">Erhalte Erinnerungen für deine Lernziele</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Schnellerer Start</p>
                  <p className="text-sm text-muted-foreground">App öffnet sich in unter einer Sekunde</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Native App-Erlebnis</p>
                  <p className="text-sm text-muted-foreground">Vollbild-Modus ohne Browser-UI</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}