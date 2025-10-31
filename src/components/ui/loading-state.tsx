import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  message?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

/**
 * Loading State component for consistent loading indicators
 * Shows a spinner with optional message
 */
export const LoadingState = ({
  message = "Lädt...",
  className,
  size = "md",
}: LoadingStateProps) => {
  return (
    <Card className={cn("border-dashed bg-muted/30", className)}>
      <CardContent className="flex flex-col items-center justify-center py-12 px-6">
        <Loader2 
          className={cn("animate-spin text-primary mb-4", sizeMap[size])}
          aria-hidden="true"
        />
        <p 
          className="text-muted-foreground text-sm"
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      </CardContent>
    </Card>
  );
};

/**
 * Inline loading indicator for smaller spaces
 */
export const InlineLoader = ({ 
  message,
  size = "sm" 
}: { 
  message?: string;
  size?: "sm" | "md" | "lg";
}) => {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <Loader2 
        className={cn("animate-spin text-primary", sizeMap[size])}
        aria-hidden="true"
      />
      {message && (
        <span 
          className="text-muted-foreground text-sm"
          role="status"
          aria-live="polite"
        >
          {message}
        </span>
      )}
    </div>
  );
};
