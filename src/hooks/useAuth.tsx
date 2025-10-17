import { useState, useEffect, createContext, useContext, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<{ error: any }>;
  signUp: (email: string, password: string, username?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const adminCheckCache = useRef<{ userId: string; isAdmin: boolean; timestamp: number } | null>(null);
  const SESSION_TIMEOUT_MS = 24 * 60 * 60 * 1000; // 24 hours

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check session timeout
        if (session) {
          checkSessionTimeout(session);
        }
        
        // Check admin status after state update
        if (session?.user) {
          setTimeout(() => {
            checkAdminStatus(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
          adminCheckCache.current = null;
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session) {
        checkSessionTimeout(session);
        if (session.user) {
          checkAdminStatus(session.user.id);
        }
      }
      setIsLoading(false);
    });

    // Set up periodic session timeout check (every 5 minutes)
    const timeoutCheckInterval = setInterval(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          checkSessionTimeout(session);
        }
      });
    }, 5 * 60 * 1000);

    return () => {
      subscription.unsubscribe();
      clearInterval(timeoutCheckInterval);
    };
  }, []);

  const checkSessionTimeout = (session: Session) => {
    const sessionCreatedAt = new Date(session.user.created_at).getTime();
    const now = Date.now();
    
    if (now - sessionCreatedAt > SESSION_TIMEOUT_MS) {
      toast({
        title: 'Session abgelaufen',
        description: 'Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.',
        variant: 'destructive',
        duration: 5000,
      });
      signOut();
    }
  };

  const checkAdminStatus = async (userId: string) => {
    // Check cache first (valid for 5 minutes)
    const now = Date.now();
    if (adminCheckCache.current && 
        adminCheckCache.current.userId === userId && 
        now - adminCheckCache.current.timestamp < 5 * 60 * 1000) {
      setIsAdmin(adminCheckCache.current.isAdmin);
      return;
    }
    
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();
    
    const isAdminUser = !!data;
    setIsAdmin(isAdminUser);
    
    // Update cache
    adminCheckCache.current = {
      userId,
      isAdmin: isAdminUser,
      timestamp: now,
    };
  };

  const signIn = async (email: string, password: string, rememberMe = true) => {
    // Sign in with the main client so the in-memory session is available app-wide
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error };
    }

    // If the user chose not to stay signed in, remove the persisted auth token from localStorage
    // The session will remain active in-memory for this tab until it is closed or reloaded
    if (!rememberMe) {
      try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        // no-op
      }
    }

    return { error: null };
  };

  const signUp = async (email: string, password: string, username?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          username: username || `user_${Date.now()}`
        }
      }
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
