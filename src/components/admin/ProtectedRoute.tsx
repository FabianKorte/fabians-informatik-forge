import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, isLoading } = useAuth();
  const [checkingMfa, setCheckingMfa] = useState(true);
  const [needsMfa, setNeedsMfa] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        if (user && isAdmin) {
          const [{ data: aal }, { data: factors }] = await Promise.all([
            supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
            supabase.auth.mfa.listFactors(),
          ]);
          const hasTotp = (factors?.totp || []).length > 0;
          const isAal2 = (aal?.currentLevel || '').toLowerCase() === 'aal2';
          setNeedsMfa(hasTotp && !isAal2);
        } else {
          setNeedsMfa(false);
        }
      } finally {
        setCheckingMfa(false);
      }
    };
    run();
  }, [user, isAdmin]);

  if (isLoading || checkingMfa) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Zugriff verweigert</h1>
          <p className="text-muted-foreground">Du hast keine Admin-Berechtigung.</p>
        </div>
      </div>
    );
  }

  if (needsMfa) {
    return <Navigate to="/auth?requireMfa=1" replace />;
  }

  return <>{children}</>; 
};
