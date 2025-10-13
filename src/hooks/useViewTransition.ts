import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Hook to enable View Transitions API for React Router navigation
 * Provides smooth transitions between pages
 */
export const useViewTransition = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      return;
    }

    // Skip transition for initial page load
    if (navigationType === 'POP') {
      return;
    }

    // Trigger view transition on route change
    document.documentElement.classList.add('view-transition-active');

    const cleanup = () => {
      document.documentElement.classList.remove('view-transition-active');
    };

    const timer = setTimeout(cleanup, 500);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [location.pathname, navigationType]);
};
