import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { checkModeratorStatus } from "@/lib/auth/adminChecker";

export const ProtectedRoute = ({ 
  children, 
  requireAdmin = true,
  requireModerator = false 
}: { 
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireModerator?: boolean;
}) => {
  const { user, isAdmin, isLoading } = useAuth();
  const [isModerator, setIsModerator] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      if (user && requireModerator && !isAdmin) {
        const modStatus = await checkModeratorStatus(user.id);
        setIsModerator(modStatus);
      }
      setChecking(false);
    };
    
    if (!isLoading) {
      checkRole();
    }
  }, [user, isAdmin, isLoading, requireModerator]);

  if (isLoading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Check if user has required permissions
  const hasPermission = requireAdmin 
    ? isAdmin 
    : requireModerator 
    ? (isAdmin || isModerator)
    : true;

  if (!hasPermission) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Zugriff verweigert</h1>
          <p className="text-muted-foreground">
            Du hast keine {requireAdmin ? 'Admin' : 'Moderator'}-Berechtigung.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
