import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { LucideIcon, ArrowRight, BookOpen, Clock, CheckCircle } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  totalElements: number;
  completedElements?: number;
  icon: LucideIcon;
  difficulty?: "Anfänger" | "Fortgeschritten" | "Experte";
  onStart: () => void;
}

export const CategoryCard = ({
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
    <div className="gradient-border-card group cursor-pointer">
      <div className="gradient-border-card-inner p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2.5 rounded-lg bg-accent/5 border border-accent/10">
            <Icon className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{totalElements} Elemente</span>
            <span>•</span>
            <span>~{Math.ceil(totalElements * 2)} Min</span>
          </div>
          {progress > 0 && (
            <div className="text-xs font-medium text-accent">
              {progress}% abgeschlossen
            </div>
          )}
        </div>

        {progress > 0 && (
          <Progress value={progress} className="h-1 mb-4" />
        )}

        <Button 
          className="w-full justify-center" 
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            onStart();
          }}
        >
          Starten
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};