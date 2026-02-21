import { ReactNode, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface GradientShadowCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GradientShadowCard = ({ 
  children, 
  className,
  onClick 
}: GradientShadowCardProps) => {
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    pendingRef.current = { x: e.clientX, y: e.clientY };
    
    if (rafRef.current) return;
    
    const target = e.currentTarget;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const pos = pendingRef.current;
      if (!pos) return;
      
      const rect = target.getBoundingClientRect();
      const mx = pos.x - rect.left;
      const my = pos.y - rect.top;
      const distLeft = mx;
      const distRight = rect.width - mx;
      const distTop = my;
      const distBottom = rect.height - my;
      const minDist = Math.min(distLeft, distRight, distTop, distBottom);
      
      let gx = mx, gy = my;
      if (minDist === distLeft) { gx = 0; gy = my; }
      else if (minDist === distRight) { gx = rect.width; gy = my; }
      else if (minDist === distTop) { gx = mx; gy = 0; }
      else { gx = mx; gy = rect.height; }
      
      target.style.setProperty('--glow-x', `${(gx / rect.width) * 100}%`);
      target.style.setProperty('--glow-y', `${(gy / rect.height) * 100}%`);
    });
  }, []);

  return (
    <div 
      className={cn("gradient-shadow-card", className)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {children}
    </div>
  );
};