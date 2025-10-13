import { useEffect, useState } from "react";
import "./LoadingScreen.css";
import logo from "@/assets/logo.png";

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'intro' | 'moving' | 'complete'>('intro');

  useEffect(() => {
    // Phase 1: Logo appears (0.8s)
    const introTimer = setTimeout(() => {
      setPhase('moving');
    }, 800);

    // Phase 2: Logo moves to position (0.8s)
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
      <div className="logo-animation">
        <img 
          src={logo} 
          alt="Fabian Korte - Fachinformatiker Logo" 
          className="logo-animation__image"
        />
      </div>
    </div>
  );
};
