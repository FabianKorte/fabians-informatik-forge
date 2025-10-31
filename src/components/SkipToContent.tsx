import { useSkipToContent } from "@/hooks/useKeyboardNavigation";

/**
 * Skip to Content link for accessibility
 * Allows keyboard users to skip navigation and jump to main content
 */
export const SkipToContent = () => {
  const skipToContent = useSkipToContent();

  return (
    <a
      href="#main-content"
      onClick={(e) => {
        e.preventDefault();
        skipToContent();
      }}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      Zum Hauptinhalt springen
    </a>
  );
};
