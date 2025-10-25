import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { GradientShadowCard } from "@/components/ui/gradient-shadow-card";
import { LucideIcon, ArrowRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  totalElements: number;
  completedElements?: number;
  icon: LucideIcon;
  difficulty?: "Anfänger" | "Fortgeschritten" | "Experte";
  onStart: () => void;
}

const CategoryCardComponent = ({
  title,
  description,
  totalElements,
  completedElements = 0,
  icon: Icon,
  difficulty = "Anfänger",
  onStart,
}: CategoryCardProps) => {
  const progress = totalElements > 0 ? (completedElements / totalElements) * 100 : 0;

  return (
    <GradientShadowCard className="view-transition-card">
      <Card className="group cursor-pointer p-4 sm:p-8 h-full flex flex-col">
      <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="p-2 sm:p-2.5 rounded-lg bg-accent/5 border border-accent/10">
          <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-medium text-foreground mb-1 sm:mb-2">{title}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
          <span>{totalElements} Elemente</span>
          <span>•</span>
          <span className="hidden sm:inline">~{Math.ceil(totalElements * 2)} Min</span>
          <span className="sm:hidden">~{Math.ceil(totalElements * 2)}m</span>
        </div>
        {progress > 0 && (
          <div className="text-xs font-medium text-accent">
            {progress}%
          </div>
        )}
      </div>

      {progress > 0 && (
        <Progress value={progress} className="h-1 mb-3 sm:mb-4" />
      )}

      <Button 
        className="w-full justify-center mt-auto text-xs sm:text-sm" 
        size="sm"
        onClick={(e) => {
          e.preventDefault();
          onStart();
        }}
      >
        Starten
        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
      </Button>
    </Card>
    </GradientShadowCard>
  );
};

export const CategoryCard = memo(CategoryCardComponent);