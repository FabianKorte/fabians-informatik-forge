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
  const dprRef = useRef<number>(1);
  const isMobileRef = useRef<boolean>(false);
  const lastFrameTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Farben aus Design-Token lesen (leuchtender Farbton bevorzugt)
    const computedStyle = getComputedStyle(document.documentElement);
    const glowValue = computedStyle.getPropertyValue('--primary-glow').trim();
    const accentValue = computedStyle.getPropertyValue('--accent').trim();
    const primaryValue = computedStyle.getPropertyValue('--primary').trim();
    const fgValue = computedStyle.getPropertyValue('--foreground').trim();

    if (glowValue) {
      primaryColorRef.current = glowValue;
    } else if (accentValue) {
      primaryColorRef.current = accentValue;
    } else if (primaryValue) {
      primaryColorRef.current = primaryValue;
    } else if (fgValue) {
      primaryColorRef.current = fgValue;
    } else {
      primaryColorRef.current = '217 75% 70%';
    }

    const resize = () => {
      // Mobile Detection
      isMobileRef.current = window.innerWidth < 768;
      
      // Reduzierte DPR auf Mobilgeräten für bessere Performance
      const dpr = isMobileRef.current ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      dprRef.current = dpr;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      
      // Partikelanzahl bei Resize anpassen
      const targetCount = isMobileRef.current ? 12 : 180;
      if (dotsRef.current.length > targetCount) {
        dotsRef.current = dotsRef.current.slice(0, targetCount);
      } else if (dotsRef.current.length < targetCount) {
        const needed = targetCount - dotsRef.current.length;
        for (let i = 0; i < needed; i++) {
          dotsRef.current.push(
            new TentacleDot(
              Math.random() * window.innerWidth,
              Math.random() * window.innerHeight
            )
          );
        }
      }
    };

    resize();

    // Erstelle initiale Partikel basierend auf Bildschirmgröße
    if (dotsRef.current.length === 0) {
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 12 : 180; // Minimal auf Mobile
      
      for (let i = 0; i < particleCount; i++) {
        dotsRef.current.push(
          new TentacleDot(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
          )
        );
      }
    }

    const animate = (timestamp: number) => {
      // Frame-Throttling auf Mobile (30 FPS statt 60 FPS)
      if (isMobileRef.current) {
        const elapsed = timestamp - lastFrameTimeRef.current;
        if (elapsed < 33) { // ~30 FPS
          animationFrameRef.current = requestAnimationFrame(animate);
          return;
        }
        lastFrameTimeRef.current = timestamp;
      }

      if (!isPaused) {
        const w = canvas.width / dprRef.current;
        const h = canvas.height / dprRef.current;
        ctx.clearRect(0, 0, w, h);

        const bounds = { width: w, height: h };

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

        // Verbindungslinien - NUR auf Desktop
        if (!isMobileRef.current) {
          const connectionDistance = 150;
          const connectionOpacity = 0.15;
          
          for (let i = 0; i < dotsRef.current.length; i++) {
            for (let j = i + 1; j < dotsRef.current.length; j++) {
              const dx = dotsRef.current[i].x - dotsRef.current[j].x;
              const dy = dotsRef.current[i].y - dotsRef.current[j].y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              
              if (dist < connectionDistance) {
                const opacity = (1 - dist / connectionDistance) * connectionOpacity;
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
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Nur auf Desktop Maus-Tracking (auf Mobile nicht nötig)
    if (!isMobileRef.current) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    window.addEventListener('resize', resize);
    
    animate(0);

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
        className="fixed inset-0 pointer-events-none"
        style={{ 
          zIndex: 1,
          opacity: window.innerWidth < 768 ? 0.4 : 0.7,
          mixBlendMode: 'screen'
        }}
      />
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsPaused(!isPaused)}
        className="fixed bottom-4 left-4 z-50 bg-card/90 backdrop-blur-sm hover:bg-card border-border"
        aria-label={isPaused ? "Animation starten" : "Animation pausieren"}
      >
        {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
      </Button>
    </>
  );
};