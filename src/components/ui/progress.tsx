import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary shadow-inner border border-border/30", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-gradient-to-r from-primary via-accent to-primary-light transition-all duration-700 ease-out relative overflow-hidden rounded-full shadow-lg"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    >
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-accent/50 blur-sm" />
    </ProgressPrimitive.Indicator>
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
