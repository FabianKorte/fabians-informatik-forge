import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Visual */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-black text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Error message */}
        <div className="space-y-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Seite nicht gefunden
          </h2>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Die angeforderte Seite konnte nicht gefunden werden. 
            Möglicherweise wurde sie verschoben oder existiert nicht mehr.
          </p>
          
          {/* Show attempted path */}
          <div className="glass-effect rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-muted-foreground mb-1">Angefragter Pfad:</p>
            <code className="text-accent font-mono text-sm break-all">
              {location.pathname}
            </code>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            size="lg"
            className="min-w-[180px]"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück
          </Button>
          
          <Button
            onClick={() => window.location.href = "/"}
            variant="hero"
            size="lg"
            className="min-w-[200px]"
          >
            <Home className="w-5 h-5" />
            Zur Startseite
          </Button>
        </div>

        {/* Additional help */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-muted-foreground text-sm">
            Bei weiteren Problemen kontaktieren Sie{" "}
            <span className="font-semibold text-primary">Fabian Korte</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
