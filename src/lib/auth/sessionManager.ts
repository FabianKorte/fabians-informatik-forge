import type { Session } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';
import { logger } from '@/lib/logger';

const SESSION_WARNING_THRESHOLD = 5 * 60 * 1000; // 5 minutes before expiry
const SESSION_CHECK_INTERVAL = 60 * 1000; // Check every minute

/**
 * Checks if a user session is about to expire or has expired.
 * Shows toast notifications and logs warnings when appropriate.
 * 
 * @param {Session} session - The Supabase session to check
 * @returns {boolean} True if session is still valid, false if expired
 * 
 * @example
 * const session = await supabase.auth.getSession();
 * if (checkSessionTimeout(session.data.session)) {
 *   // Session is valid
 * }
 */
export function checkSessionTimeout(session: Session): boolean {
  if (!session.expires_at) return true;

  const expiresAt = session.expires_at * 1000;
  const now = Date.now();
  const timeUntilExpiry = expiresAt - now;

  // Session has expired
  if (timeUntilExpiry <= 0) {
    logger.warn('Session expired, logging out user');
    toast({
      title: 'Sitzung abgelaufen',
      description: 'Bitte melde dich erneut an.',
      variant: 'destructive',
    });
    return false;
  }

  // Session is about to expire
  if (timeUntilExpiry <= SESSION_WARNING_THRESHOLD) {
    logger.warn(`Session expires in ${Math.floor(timeUntilExpiry / 1000)}s`);
    toast({
      title: 'Sitzung läuft ab',
      description: 'Deine Sitzung läuft bald ab. Bitte speichere deine Arbeit.',
    });
  }

  return true;
}

/**
 * Creates an interval that periodically checks session validity.
 * 
 * @param {() => Session | null} getSession - Function to get current session
 * @param {() => void} onExpired - Callback when session expires
 * @returns {NodeJS.Timeout} Interval ID for cleanup
 * 
 * @example
 * const intervalId = createSessionCheckInterval(
 *   () => session,
 *   () => signOut()
 * );
 * // Later: clearInterval(intervalId);
 */
export function createSessionCheckInterval(
  getSession: () => Session | null,
  onExpired: () => void
): NodeJS.Timeout {
  return setInterval(() => {
    const currentSession = getSession();
    if (currentSession && !checkSessionTimeout(currentSession)) {
      onExpired();
    }
  }, SESSION_CHECK_INTERVAL);
}
