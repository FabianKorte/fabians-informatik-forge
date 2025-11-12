import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { checkAdminStatus, clearAdminCache } from '@/lib/auth/adminChecker';
import { checkSessionTimeout, createSessionCheckInterval } from '@/lib/auth/sessionManager';
import { logger } from '@/lib/logger';

/**
 * Authentication context type definition.
 * Provides user state, session, admin status, and auth methods.
 */
interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, username?: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  signInWithDiscord: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication provider component.
 * Manages user authentication state, session monitoring, and admin status.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const sessionRef = useRef<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let timeoutInterval: NodeJS.Timeout | undefined;

    // Set up auth state listener FIRST to avoid missing events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      logger.info('Auth state changed:', event);

      setSession(newSession);
      sessionRef.current = newSession;
      setUser(newSession?.user ?? null);

      if (newSession?.user) {
        // Defer Supabase-dependent work to avoid deadlocks in the callback
        setTimeout(() => {
          checkAdminStatus(newSession.user!.id).then(setIsAdmin);
        }, 0);
      } else {
        setIsAdmin(false);
      }

      setIsLoading(false);
    });

    // Exchange OAuth code for session if present (handles Safari/3rd‑party cookies)
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    
    if (code) {
      supabase.auth.exchangeCodeForSession(url.toString()).then(({ data, error }) => {
        if (!error && data?.session) {
          // Clean URL after successful exchange
          url.searchParams.delete('code');
          url.searchParams.delete('state');
          const cleaned = url.pathname + (url.searchParams.toString() ? `?${url.searchParams.toString()}` : '');
          window.history.replaceState({}, '', cleaned);
        }
      }).catch(() => {
        // Clean URL even on error to avoid repeated attempts
        url.searchParams.delete('code');
        url.searchParams.delete('state');
        const cleaned = url.pathname + (url.searchParams.toString() ? `?${url.searchParams.toString()}` : '');
        window.history.replaceState({}, '', cleaned);
      });
    }

    // THEN get the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      sessionRef.current = session;
      setUser(session?.user ?? null);

      if (session?.user) {
        setTimeout(() => {
          checkAdminStatus(session.user!.id).then(setIsAdmin);
        }, 0);

        // Start session monitoring with a live session getter
        timeoutInterval = createSessionCheckInterval(
          () => sessionRef.current,
          () => {
            setUser(null);
            setSession(null);
            sessionRef.current = null;
            setIsAdmin(false);
            supabase.auth.signOut();
          }
        );
      } else {
        setIsAdmin(false);
      }

      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutInterval) clearInterval(timeoutInterval);
    };
  }, []);

  /**
   * Signs in a user with email and password.
   * 
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {boolean} rememberMe - Whether to persist session
   * @returns {Promise<{error: any}>} Error object if sign in fails
   */
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

  /**
   * Signs up a new user with email and password.
   * 
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} username - Optional username
   * @returns {Promise<{error: any}>} Error object if sign up fails
   */
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

  /**
   * Signs out the current user and clears all auth state.
   */
  const signOut = async () => {
    if (user) {
      clearAdminCache(user.id);
    }
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  /**
   * Signs in a user with Google OAuth.
   * 
   * @returns {Promise<{error: any}>} Error object if sign in fails
   */
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
        skipBrowserRedirect: true,
      },
    });

    if (data?.url) {
      const targetUrl = data.url;
      try {
        // Prefer top-level navigation to escape iframe blockers
        if (window.top && window.top !== window.self) {
          window.top.location.href = targetUrl;
        } else {
          window.location.href = targetUrl;
        }
      } catch (e) {
        // Fallback to opening a new tab if top navigation is blocked by the host
        const opened = window.open(targetUrl, '_blank', 'noopener,noreferrer');
        if (!opened) {
          // Final fallback: same-frame navigation
          window.location.href = targetUrl;
        }
      }
    }

    return { error };
  };

  /**
   * Signs in a user with Discord OAuth.
   * 
   * @returns {Promise<{error: any}>} Error object if sign in fails
   */
  const signInWithDiscord = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/`,
        skipBrowserRedirect: true,
      },
    });

    if (data?.url) {
      const targetUrl = data.url;
      try {
        if (window.top && window.top !== window.self) {
          window.top.location.href = targetUrl;
        } else {
          window.location.href = targetUrl;
        }
      } catch (e) {
        const opened = window.open(targetUrl, '_blank', 'noopener,noreferrer');
        if (!opened) {
          window.location.href = targetUrl;
        }
      }
    }

    return { error };
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, isLoading, signIn, signUp, signOut, signInWithGoogle, signInWithDiscord }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to access authentication context.
 * Must be used within an AuthProvider.
 * 
 * @throws {Error} If used outside AuthProvider
 * @returns {AuthContextType} Authentication context
 * 
 * @example
 * const { user, isAdmin, signIn, signOut } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
