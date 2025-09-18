import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  totalElements: number;
  completedElements?: number;
  icon: LucideIcon;
  difficulty?: "Anfänger" | "Fortgeschritten" | "Experte";
  onStartLearning: () => void;
  gradient?: string;
}

export const CategoryCard = ({
  title,
  description,
  totalElements,
  completedElements = 0,
  icon: Icon,
  difficulty = "Anfänger",
  onStartLearning,
  gradient = "from-primary to-primary-light",
}: CategoryCardProps) => {
  const progress = totalElements > 0 ? (completedElements / totalElements) * 100 : 0;
  
  const difficultyColors = {
    "Anfänger": "bg-gradient-to-r from-success to-success-light text-white shadow-lg",
    "Fortgeschritten": "bg-gradient-to-r from-warning to-warning-light text-white shadow-lg", 
    "Experte": "bg-gradient-to-r from-destructive to-destructive/80 text-white shadow-lg"
  };

  return (
    <div className="group relative">
      {/* Card container with enhanced 3D effects */}
      <div className="relative card-gradient rounded-3xl p-8 border-2 border-border/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.05] hover:border-primary/50 bg-gradient-to-br from-card via-card/95 to-card/90 card-3d overflow-hidden">
        
        {/* Background decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-accent to-success rounded-full blur-2xl animate-float-reverse" />
        </div>
        
        <div className="relative z-10">
          {/* Icon header with enhanced gradient and animation */}
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} mb-6 shadow-primary group-hover:shadow-accent transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden`}>
            <Icon className="w-10 h-10 text-white relative z-10" />
            {/* Icon shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>

          {/* Difficulty badge with enhanced styling */}
          <div className="absolute top-6 right-6">
            <Badge className={`${difficultyColors[difficulty]} text-xs font-semibold px-3 py-2 rounded-full border-0 backdrop-blur-sm animate-pulse-glow`}>
              {difficulty}
            </Badge>
          </div>

          {/* Content with enhanced typography */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-all duration-300 leading-tight">
                {title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {description}
              </p>
            </div>

            {/* Enhanced progress section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">
                  {completedElements} von {totalElements} Elementen
                </span>
                <span className="font-bold text-primary text-lg">
                  {Math.round(progress)}%
                </span>
              </div>
              
              <div className="relative">
                <Progress 
                  value={progress} 
                  className="h-3 bg-secondary rounded-full shadow-inner" 
                />
                {/* Progress glow effect */}
                {progress > 0 && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-sm" />
                )}
              </div>
            </div>

            {/* Enhanced stats with card layout */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border/30">
              <div className="text-center p-3 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-2xl font-bold text-primary mb-1">{totalElements}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Elemente</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-success/5 border border-success/20">
                <p className="text-2xl font-bold text-success mb-1">{completedElements}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Erledigt</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-accent/5 border border-accent/20">
                <p className="text-2xl font-bold text-accent mb-1">{Math.round(progress)}%</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Fortschritt</p>
              </div>
            </div>
          </div>

          {/* Enhanced action button */}
          <div className="mt-8">
            <Button
              onClick={onStartLearning}
              variant={completedElements > 0 ? "hero" : "outline"}
              size="lg"
              className="w-full group-hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              {completedElements > 0 ? "🚀 Weiter lernen" : "✨ Lernen starten"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};