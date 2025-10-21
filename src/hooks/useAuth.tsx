import React, { createContext, useContext, useEffect, useState } from 'react';
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let timeoutInterval: NodeJS.Timeout | undefined;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkAdminStatus(session.user.id).then(setIsAdmin);
        
        // Start session monitoring
        timeoutInterval = createSessionCheckInterval(
          () => session,
          () => {
            setUser(null);
            setSession(null);
            setIsAdmin(false);
            supabase.auth.signOut();
          }
        );
      }
      
      setIsLoading(false);
    });

    // Listen for auth changes
    const authListener = supabase.auth.onAuthStateChange(async (event, session) => {
      logger.info('Auth state changed:', event);
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const adminStatus = await checkAdminStatus(session.user.id);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }
      
      setIsLoading(false);
    });

    return () => {
      authListener.data.subscription.unsubscribe();
      if (timeoutInterval) clearInterval(timeoutInterval);
    };
  }, [toast]);

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

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, isLoading, signIn, signUp, signOut }}>
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
