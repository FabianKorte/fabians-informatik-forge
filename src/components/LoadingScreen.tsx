import { useEffect, useState } from "react";
import "./LoadingScreen.css";
import logo from "@/assets/logo.png";

export const LoadingScreen = ({ onComplete, targetSelector = '[data-hero-logo]' }: { onComplete: () => void; targetSelector?: string }) => {
  const [phase, setPhase] = useState<'intro' | 'moving' | 'complete'>('intro');
  const [target, setTarget] = useState<{ top: number; left: number; width: number } | null>(null);

  // Measure target logo position on the page
  useEffect(() => {
    const measure = () => {
      const el = document.querySelector(targetSelector) as HTMLElement | null;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setTarget({
        top: rect.top + rect.height / 2,
        left: rect.left + rect.width / 2,
        width: rect.width,
      });
    };

    const raf = requestAnimationFrame(() => measure());
    window.addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
    };
  }, [targetSelector]);

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setPhase('moving');
    }, 800);

    const movingTimer = setTimeout(() => {
      setPhase('complete');
      onComplete();
    }, 1600);

    return () => {
      clearTimeout(introTimer);
      clearTimeout(movingTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loading-screen loading-screen--${phase}`}>
      <div
        className="logo-animation"
        style={
          phase !== 'intro' && target
            ? { top: `${target.top}px`, left: `${target.left}px`, transform: 'translate(-50%, -50%) scale(1)' }
            : undefined
        }
      >
        <img
          src={logo}
          alt="Fabian Korte - Fachinformatiker Logo"
          className="logo-animation__image"
          style={phase !== 'intro' && target ? { width: `${target.width}px` } : undefined}
        />
      </div>
    </div>
  );
};
