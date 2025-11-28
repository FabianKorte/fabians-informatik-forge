/**
 * Session validation utilities to prevent auth-related issues
 */

import { Session } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';

/**
 * Validates if a session is still valid and not expired
 */
export const isSessionValid = (session: Session | null): boolean => {
  if (!session) return false;
  
  try {
    const expiresAt = session.expires_at;
    if (!expiresAt) return false;
    
    // Check if session expires in the next 5 minutes
    const bufferTime = 5 * 60 * 1000; // 5 minutes
    const expirationTime = expiresAt * 1000; // Convert to milliseconds
    const now = Date.now();
    
    return expirationTime > (now + bufferTime);
  } catch (error) {
    logger.error('Session validation error:', error);
    return false;
  }
};

/**
 * Validates OAuth state to prevent CSRF attacks
 */
export const validateOAuthState = (receivedState: string | null): boolean => {
  if (!receivedState) return false;
  
  try {
    const storedState = sessionStorage.getItem('oauth_state');
    sessionStorage.removeItem('oauth_state'); // Clean up after validation
    
    return storedState === receivedState;
  } catch (error) {
    logger.error('OAuth state validation error:', error);
    return false;
  }
};

/**
 * Generates and stores OAuth state for CSRF protection
 */
export const generateOAuthState = (): string => {
  const state = Math.random().toString(36).substring(2, 15) + 
                Math.random().toString(36).substring(2, 15);
  
  try {
    sessionStorage.setItem('oauth_state', state);
  } catch (error) {
    logger.error('Failed to store OAuth state:', error);
  }
  
  return state;
};

/**
 * Cleans up OAuth-related URL parameters
 */
export const cleanOAuthUrl = (): void => {
  try {
    const url = new URL(window.location.href);
    const paramsToRemove = ['code', 'state', 'error', 'error_description'];
    
    let hasChanges = false;
    paramsToRemove.forEach(param => {
      if (url.searchParams.has(param)) {
        url.searchParams.delete(param);
        hasChanges = true;
      }
    });
    
    // Also clean hash fragments
    if (url.hash) {
      const hashParams = new URLSearchParams(url.hash.slice(1));
      ['access_token', 'refresh_token', 'expires_in', 'token_type'].forEach(param => {
        if (hashParams.has(param)) {
          hasChanges = true;
        }
      });
      url.hash = '';
    }
    
    if (hasChanges) {
      const cleaned = url.pathname + (url.searchParams.toString() ? `?${url.searchParams.toString()}` : '');
      window.history.replaceState({}, '', cleaned);
    }
  } catch (error) {
    logger.error('Failed to clean OAuth URL:', error);
  }
};
