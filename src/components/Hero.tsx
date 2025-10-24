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
    <section 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 view-transition-hero"
      aria-labelledby="hero-title"
    >
      {/* Subtle floating elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-accent/30 animate-float" aria-hidden="true" />
      <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-primary/20 animate-float" style={{ animationDelay: '2s' }} aria-hidden="true" />
      <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 rounded-full bg-accent/20 animate-float" style={{ animationDelay: '1s' }} aria-hidden="true" />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-20">
        {/* Logo */}
        <div className="mb-4 sm:mb-8 animate-fade-in view-transition-logo">
          <img 
            src={logo} 
            alt="Fabian Korte - Fachinformatiker Lernplattform Logo" 
            className="mx-auto h-20 sm:h-32 md:h-40 w-auto object-contain"
            data-hero-logo
          />
        </div>

        {/* Clean subtitle */}
        <h2 
          id="hero-title"
          className="text-xl sm:text-2xl md:text-3xl font-light text-accent mb-2 sm:mb-4 animate-fade-in" 
          style={{ animationDelay: '0.1s' }}
        >
          Lernplattform
        </h2>

        {/* Clean subtitle */}
        <p className="text-sm sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-16 max-w-2xl mx-auto leading-relaxed animate-fade-in font-light" style={{ animationDelay: '0.2s' }}>
          Professionelle Vorbereitung auf alle Fachinformatiker-Prüfungen mit strukturierten Lernpfaden und interaktiven Inhalten.
        </p>

        {/* Minimal progress card */}
        <div 
          className="bg-card border border-border rounded-xl p-4 sm:p-6 mb-6 sm:mb-12 max-w-md mx-auto shadow-sm animate-fade-in"
          style={{ animationDelay: '0.4s' }}
          role="region"
          aria-label="Lernfortschritt Übersicht"
        >
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-3 sm:mb-4 flex items-center justify-center gap-2">
            <Target className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
            Lernfortschritt
          </h3>
          
          <div className="space-y-3 sm:space-y-4">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-light text-foreground" aria-label={`${Math.round(progressPercentage)} Prozent abgeschlossen`}>
                {Math.round(progressPercentage)}%
              </p>
              <p className="text-xs text-muted-foreground">Abgeschlossen</p>
            </div>
            
            <Progress 
              value={progressPercentage} 
              className="h-1"
              aria-label={`Fortschritt: ${Math.round(progressPercentage)} Prozent`}
            />
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
              <div className="text-center">
                <p className="text-base sm:text-lg font-medium text-accent" aria-label={`${correctAnswers} richtige Antworten`}>
                  {correctAnswers}
                </p>
                <p className="text-xs text-muted-foreground">Richtige</p>
              </div>
              <div className="text-center">
                <p className="text-base sm:text-lg font-medium text-foreground" aria-label={`${answeredQuestions} bearbeitete Fragen`}>
                  {answeredQuestions}
                </p>
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
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button
            onClick={onShowProgress}
            variant="outline"
            size="sm"
            className="w-full sm:w-auto sm:min-w-[180px]"
            aria-label="Lernfortschritt anzeigen"
          >
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
            Fortschritt anzeigen
          </Button>
          
          <Button
            onClick={onStartLearning}
            size="sm"
            className="w-full sm:w-auto sm:min-w-[180px]"
            aria-label="Mit dem Lernen beginnen"
          >
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
            Jetzt starten
          </Button>
        </div>
      </div>
    </section>
  );
};