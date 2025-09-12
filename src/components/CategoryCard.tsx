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
    "Anfänger": "bg-success text-success-foreground",
    "Fortgeschritten": "bg-warning text-warning-foreground", 
    "Experte": "bg-destructive text-destructive-foreground"
  };

  return (
    <div className="group relative">
      {/* Card container with sophisticated hover effects */}
      <div className="relative card-gradient rounded-2xl p-6 border border-border/50 shadow-elegant hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 bg-card">
        
        {/* Icon header with gradient background */}
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} mb-4 shadow-primary group-hover:shadow-accent transition-all duration-300 group-hover:scale-110`}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Difficulty badge */}
        <div className="absolute top-4 right-4">
          <Badge className={`${difficultyColors[difficulty]} text-xs font-medium px-2 py-1`}>
            {difficulty}
          </Badge>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Progress section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                {completedElements} von {totalElements} Elementen
              </span>
              <span className="font-semibold text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            
            <Progress 
              value={progress} 
              className="h-2 bg-secondary" 
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-6 border-t border-border/50">
            <div className="text-center space-y-2">
              <p className="text-lg font-bold text-primary">{totalElements}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide leading-relaxed">Lernelemente</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg font-bold text-success">{completedElements}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide leading-relaxed">Abgeschlossen</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg font-bold text-accent">{Math.round(progress)}%</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide leading-relaxed">Fortschritt</p>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-6">
          <Button
            onClick={onStartLearning}
            variant={completedElements > 0 ? "default" : "outline"}
            size="default"
            className="w-full group-hover:scale-[1.02] transition-transform"
          >
            {completedElements > 0 ? "Weiter lernen" : "Lernen starten"}
          </Button>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  );
};