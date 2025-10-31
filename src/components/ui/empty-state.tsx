import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  emoji?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

/**
 * Empty State component for displaying when no data is available
 * Provides consistent UX across the application
 */
export const EmptyState = ({
  icon: Icon,
  emoji,
  title,
  description,
  action,
  className,
}: EmptyStateProps) => {
  return (
    <Card className={cn("border-dashed", className)}>
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="mb-4" aria-hidden="true">
          {emoji && <div className="text-6xl mb-2">{emoji}</div>}
          {Icon && <Icon className="w-16 h-16 text-muted-foreground/50" />}
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {title}
        </h3>
        
        {description && (
          <p className="text-muted-foreground max-w-md mb-6">
            {description}
          </p>
        )}
        
        {action && (
          <Button onClick={action.onClick} variant="outline">
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
