import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
          <Link 
            to="/privacy" 
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Shield className="w-4 h-4" />
            Datenschutzerklärung
          </Link>
          <span className="hidden sm:inline">•</span>
          <p>© {new Date().getFullYear()} IT Lernplattform</p>
        </div>
      </div>
    </footer>
  );
};
