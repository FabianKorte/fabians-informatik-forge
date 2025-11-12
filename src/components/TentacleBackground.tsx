import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pause, Play } from 'lucide-react';

class TentacleDot {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  baseAlpha: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 2; // Größere Partikel
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.baseAlpha = Math.random() * 0.4 + 0.3; // Deutlich sichtbarer
    this.alpha = this.baseAlpha;
  }

  update(mouse: { x: number; y: number }, bounds: { width: number; height: number }) {
    // Sanfte zufällige Bewegung
    this.x += this.speedX;
    this.y += this.speedY;

    // Sehr subtile Bewegung zur Maus
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < 200) {
      const force = (200 - dist) / 200 * 0.5;
      this.x += (dx / dist) * force;
      this.y += (dy / dist) * force;
    }

    // Sanfte Randabpraller
    if (this.x < 0 || this.x > bounds.width) this.speedX *= -1;
    if (this.y < 0 || this.y > bounds.height) this.speedY *= -1;
    
    // Bounds begrenzen
    this.x = Math.max(0, Math.min(bounds.width, this.x));
    this.y = Math.max(0, Math.min(bounds.height, this.y));

    // Sanftes Pulsieren
    this.alpha = this.baseAlpha + Math.sin(Date.now() * 0.001) * 0.05;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Draw method removed - now handled in animate loop for proper color
  }
}

export const TentacleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<TentacleDot[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const primaryColorRef = useRef<string>('220, 9%, 20%');
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Farben aus Design-Token lesen (bevorzugt Vordergrund)
    const computedStyle = getComputedStyle(document.documentElement);
    const fgValue = computedStyle.getPropertyValue('--primary-foreground').trim();
    const primaryValue = computedStyle.getPropertyValue('--primary').trim();
    if (fgValue) {
      primaryColorRef.current = fgValue;
    } else if (primaryValue) {
      primaryColorRef.current = primaryValue;
    } else {
      primaryColorRef.current = '0 0% 100%';
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
    };

    resize();

    // Erstelle 100 Partikel (weniger für sanfteren Effekt)
    if (dotsRef.current.length === 0) {
      for (let i = 0; i < 100; i++) {
        dotsRef.current.push(
          new TentacleDot(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }
    }

    const animate = () => {
      if (!isPaused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const bounds = { width: canvas.width, height: canvas.height };

        // Punkte aktualisieren & zeichnen
        for (const dot of dotsRef.current) {
          dot.update(mouseRef.current, bounds);
          ctx.save();
          ctx.globalAlpha = dot.alpha;
          ctx.fillStyle = `hsl(${primaryColorRef.current})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Sanfte Linien zwischen nahen Punkten
        for (let i = 0; i < dotsRef.current.length; i++) {
          for (let j = i + 1; j < dotsRef.current.length; j++) {
            const dx = dotsRef.current[i].x - dotsRef.current[j].x;
            const dy = dotsRef.current[i].y - dotsRef.current[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 150) {
              const opacity = (1 - dist / 150) * 0.15; // Sichtbarere Linien
              ctx.strokeStyle = `hsla(${primaryColorRef.current} / ${opacity})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(dotsRef.current[i].x, dotsRef.current[i].y);
              ctx.lineTo(dotsRef.current[j].x, dotsRef.current[j].y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resize);
    
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30"
        style={{ opacity: 0.7 }}
      />
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsPaused(!isPaused)}
        className="fixed bottom-4 left-4 z-50 bg-background/80 backdrop-blur-sm hover:bg-background/90"
        aria-label={isPaused ? "Animation starten" : "Animation pausieren"}
      >
        {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
      </Button>
    </>
  );
};