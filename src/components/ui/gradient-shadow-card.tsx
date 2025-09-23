import { ReactNode } from "react";
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
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
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
    
    e.currentTarget.style.setProperty('--glow-x', `${(gx / rect.width) * 100}%`);
    e.currentTarget.style.setProperty('--glow-y', `${(gy / rect.height) * 100}%`);
  };

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