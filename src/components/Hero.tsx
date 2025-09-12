import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, BookOpen, Target } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with sophisticated overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80" />
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-20 animate-float">
        <div className="w-20 h-20 rounded-full bg-accent/20 backdrop-blur-sm animate-pulse-glow" />
      </div>
      <div className="absolute bottom-32 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm animate-pulse-glow" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Logo/Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 mb-8 animate-scale-in shadow-accent">
          <BookOpen className="w-12 h-12 text-accent" />
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-up">
          <span className="block">Fabian Korte</span>
          <span className="text-gradient bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
            Fachinformatiker
          </span>
          <span className="block text-3xl md:text-4xl font-semibold mt-2 text-white/90">
            Lernplattform
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-up font-light" style={{ animationDelay: '0.2s' }}>
          Professionelle Vorbereitung auf alle Fachinformatiker-Prüfungen. 
          Interaktive Quizzes, strukturierte Lernpfade und umfassende Themenbereiche 
          für eine erfolgreiche IT-Ausbildung.
        </p>

        {/* Progress card */}
        <div className="glass-effect rounded-2xl p-8 mb-10 max-w-lg mx-auto animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center gap-2">
            <Target className="w-5 h-5 text-accent" />
            Gesamtfortschritt
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm text-white/90">
              <span>{Math.round(progressPercentage)}% abgeschlossen</span>
              <span className="font-medium text-accent">{progressPercentage.toFixed(1)}%</span>
            </div>
            
            <Progress value={progressPercentage} className="h-3 bg-white/20" />
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">{correctAnswers}</p>
                <p className="text-xs text-white/70 uppercase tracking-wide">Richtige Antworten</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{answeredQuestions}</p>
                <p className="text-xs text-white/70 uppercase tracking-wide">Bearbeitet</p>
              </div>
            </div>
            
            {answeredQuestions > 0 && (
              <div className="pt-2 border-t border-white/20">
                <div className="flex items-center justify-center gap-1 text-sm">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-success font-semibold">{accuracy.toFixed(1)}% Genauigkeit</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <Button
            onClick={onShowProgress}
            variant="glass"
            size="lg"
            className="min-w-[200px]"
          >
            <TrendingUp className="w-5 h-5" />
            Fortschritt anzeigen
          </Button>
          
          <Button
            onClick={onStartLearning}
            variant="hero"
            size="xl"
            className="min-w-[250px] floating-action"
          >
            <BookOpen className="w-6 h-6" />
            Sofort starten
          </Button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-5" />
    </section>
  );
};