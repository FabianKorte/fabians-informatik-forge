import { useEffect, useRef, useState, memo } from 'react';
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
    this.size = Math.random() * 3 + 2;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.baseAlpha = Math.random() * 0.4 + 0.3;
    this.alpha = this.baseAlpha;
  }

  update(mouse: { x: number; y: number }, bounds: { width: number; height: number }) {
    this.x += this.speedX;
    this.y += this.speedY;

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < 200) {
      const force = (200 - dist) / 200 * 0.5;
      this.x += (dx / dist) * force;
      this.y += (dy / dist) * force;
    }

    if (this.x < 0 || this.x > bounds.width) this.speedX *= -1;
    if (this.y < 0 || this.y > bounds.height) this.speedY *= -1;
    
    this.x = Math.max(0, Math.min(bounds.width, this.x));
    this.y = Math.max(0, Math.min(bounds.height, this.y));

    this.alpha = this.baseAlpha + Math.sin(Date.now() * 0.001) * 0.05;
  }
}

const TentacleBackgroundComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<TentacleDot[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const primaryColorRef = useRef<string>('220, 9%, 20%');
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const dprRef = useRef<number>(1);
  const isMobileRef = useRef<boolean>(false);
  const lastFrameTimeRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  // Sync isPaused to ref so animation loop sees it without re-creating
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Detect mobile once
    isMobileRef.current = window.innerWidth < 768;

    // On mobile, don't run canvas animation at all — use CSS fallback
    if (isMobileRef.current) {
      canvas.style.display = 'none';
      return;
    }

    // Read design tokens
    const computedStyle = getComputedStyle(document.documentElement);
    const glowValue = computedStyle.getPropertyValue('--primary-glow').trim();
    const accentValue = computedStyle.getPropertyValue('--accent').trim();
    const primaryValue = computedStyle.getPropertyValue('--primary').trim();
    const fgValue = computedStyle.getPropertyValue('--foreground').trim();

    primaryColorRef.current = glowValue || accentValue || primaryValue || fgValue || '217 75% 70%';

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      dprRef.current = dpr;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    };

    resize();

    // Reduced particle count: 60 instead of 180
    const particleCount = 60;
    for (let i = 0; i < particleCount; i++) {
      dotsRef.current.push(
        new TentacleDot(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight
        )
      );
    }

    // Visibility API: pause when tab is hidden
    const handleVisibility = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const animate = (timestamp: number) => {
      animationFrameRef.current = requestAnimationFrame(animate);

      // Skip frame if hidden or paused
      if (!isVisibleRef.current || isPausedRef.current) return;

      // Throttle to ~30 FPS
      const elapsed = timestamp - lastFrameTimeRef.current;
      if (elapsed < 33) return;
      lastFrameTimeRef.current = timestamp;

      const w = canvas.width / dprRef.current;
      const h = canvas.height / dprRef.current;
      ctx.clearRect(0, 0, w, h);

      const bounds = { width: w, height: h };
      const dots = dotsRef.current;
      const color = primaryColorRef.current;

      // Update & draw dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        dot.update(mouseRef.current, bounds);
        ctx.globalAlpha = dot.alpha;
        ctx.fillStyle = `hsl(${color})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Connection lines — use spatial grid to avoid O(n²)
      const connectionDistance = 120;
      const connectionOpacity = 0.12;
      const cellSize = connectionDistance;
      const gridCols = Math.ceil(w / cellSize);
      const grid = new Map<number, number[]>();

      for (let i = 0; i < dots.length; i++) {
        const col = Math.floor(dots[i].x / cellSize);
        const row = Math.floor(dots[i].y / cellSize);
        const key = row * gridCols + col;
        const cell = grid.get(key);
        if (cell) cell.push(i);
        else grid.set(key, [i]);
      }

      ctx.lineWidth = 1;
      for (const [key, indices] of grid) {
        const row = Math.floor(key / gridCols);
        const col = key % gridCols;
        // Check same cell and 3 neighbors (right, bottom, bottom-right)
        const neighbors = [key, row * gridCols + col + 1, (row + 1) * gridCols + col, (row + 1) * gridCols + col + 1];
        for (const nKey of neighbors) {
          const nIndices = grid.get(nKey);
          if (!nIndices) continue;
          for (const i of indices) {
            for (const j of nIndices) {
              if (j <= i) continue;
              const dx = dots[i].x - dots[j].x;
              const dy = dots[i].y - dots[j].y;
              const distSq = dx * dx + dy * dy;
              if (distSq < connectionDistance * connectionDistance) {
                const dist = Math.sqrt(distSq);
                const opacity = (1 - dist / connectionDistance) * connectionOpacity;
                ctx.strokeStyle = `hsla(${color} / ${opacity})`;
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.stroke();
              }
            }
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', resize);
    
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      dotsRef.current = [];
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ 
          zIndex: -1,
          opacity: 0.7,
          mixBlendMode: 'screen'
        }}
      />
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsPaused(!isPaused)}
        className="fixed bottom-4 left-4 z-50 bg-card/95 backdrop-blur-sm hover:bg-card border-border shadow-lg"
        aria-label={isPaused ? "Animation starten" : "Animation pausieren"}
      >
        {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
      </Button>
    </>
  );
};

export const TentacleBackground = memo(TentacleBackgroundComponent);
