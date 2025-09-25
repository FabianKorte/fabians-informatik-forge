import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, BookOpen, Target } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

interface HeroProps {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  onStartLearning: () => void;
  onShowProgress: () => void;
}

export const Hero = ({
  totalQuestions = 500,
  answeredQuestions = 0,
  correctAnswers = 0,
  onStartLearning,
  onShowProgress,
}: HeroProps) => {
  const progressPercentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
  const accuracy = answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30">
      {/* Subtle floating elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-accent/30 animate-float" />
      <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-primary/20 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 rounded-full bg-accent/20 animate-float" style={{ animationDelay: '1s' }} />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-20">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <img 
            src={logo} 
            alt="Fabian Korte - Fachinformatiker" 
            className="mx-auto h-32 md:h-40 w-auto object-contain"
          />
        </div>

        {/* Clean subtitle */}
        <h2 className="text-2xl md:text-3xl font-light text-accent mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Lernplattform
        </h2>

        {/* Clean subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground mb-16 max-w-2xl mx-auto leading-relaxed animate-fade-in font-light" style={{ animationDelay: '0.2s' }}>
          Professionelle Vorbereitung auf alle Fachinformatiker-Prüfungen mit strukturierten Lernpfaden und interaktiven Inhalten.
        </p>

        {/* Minimal progress card */}
        <div className="bg-card border border-border rounded-xl p-6 mb-12 max-w-md mx-auto shadow-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center justify-center gap-2">
            <Target className="w-4 h-4" />
            Lernfortschritt
          </h3>
          
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-2xl font-light text-foreground">{Math.round(progressPercentage)}%</p>
              <p className="text-xs text-muted-foreground">Abgeschlossen</p>
            </div>
            
            <Progress value={progressPercentage} className="h-1" />
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="text-center">
                <p className="text-lg font-medium text-accent">{correctAnswers}</p>
                <p className="text-xs text-muted-foreground">Richtige</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-foreground">{answeredQuestions}</p>
                <p className="text-xs text-muted-foreground">Bearbeitet</p>
              </div>
            </div>
            
            {answeredQuestions > 0 && (
              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-center gap-1 text-sm">
                  <TrendingUp className="w-3 h-3 text-success" />
                  <span className="text-success text-xs">{accuracy.toFixed(1)}% Genauigkeit</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Clean action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button
            onClick={onShowProgress}
            variant="outline"
            size="lg"
            className="min-w-[180px]"
          >
            <TrendingUp className="w-4 h-4" />
            Fortschritt anzeigen
          </Button>
          
          <Button
            onClick={onStartLearning}
            size="lg"
            className="min-w-[180px]"
          >
            <BookOpen className="w-4 h-4" />
            Jetzt starten
          </Button>
        </div>
      </div>
    </section>
  );
};