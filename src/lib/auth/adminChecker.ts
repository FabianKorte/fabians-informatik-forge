import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

// Cache admin status to reduce database calls
const adminCache = new Map<string, { isAdmin: boolean; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Checks if a user has admin role in the database.
 * Results are cached for 5 minutes to reduce database queries.
 * 
 * @param {string} userId - The user ID to check
 * @returns {Promise<boolean>} True if user is admin, false otherwise
 * 
 * @example
 * const isAdmin = await checkAdminStatus('user-id-123');
 * if (isAdmin) {
 *   // Show admin features
 * }
 */
export async function checkAdminStatus(userId: string): Promise<boolean> {
  // Check cache first
  const cached = adminCache.get(userId);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.isAdmin;
  }

  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (error) {
      logger.error('Error checking admin status:', error);
      return false;
    }

    const isAdmin = !!data;

    // Update cache
    adminCache.set(userId, {
      isAdmin,
      timestamp: Date.now(),
    });

    return isAdmin;
  } catch (error) {
    logger.error('Exception checking admin status:', error);
    return false;
  }
}

/**
 * Clears the admin status cache for a specific user or all users.
 * Useful after role changes.
 * 
 * @param {string} [userId] - Optional user ID to clear. If omitted, clears all cache.
 * 
 * @example
 * // Clear specific user
 * clearAdminCache('user-id-123');
 * 
 * // Clear all cache
 * clearAdminCache();
 */
export function clearAdminCache(userId?: string): void {
  if (userId) {
    adminCache.delete(userId);
    logger.info(`Cleared admin cache for user: ${userId}`);
  } else {
    adminCache.clear();
    logger.info('Cleared all admin cache');
  }
}
