import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

export type AppRole = 'owner' | 'admin' | 'moderator' | 'user';

// Cache admin/role status to reduce database calls
const roleCache = new Map<string, { roles: AppRole[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Checks if a user has a specific role or any of the specified roles in the database.
 * Results are cached for 5 minutes to reduce database queries.
 * 
 * @param {string} userId - The user ID to check
 * @param {AppRole | AppRole[]} roles - Single role or array of roles to check
 * @returns {Promise<boolean>} True if user has any of the specified roles, false otherwise
 * 
 * @example
 * const isAdmin = await checkUserRole('user-id-123', 'admin');
 * const isModerator = await checkUserRole('user-id-123', ['admin', 'moderator']);
 */
export async function checkUserRole(userId: string, roles: AppRole | AppRole[]): Promise<boolean> {
  if (!userId) {
    logger.warn('checkUserRole called with empty userId');
    return false;
  }

  const rolesToCheck = Array.isArray(roles) ? roles : [roles];
  
  // Check cache first
  const cached = roleCache.get(userId);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    const hasRole = cached.roles.some(role => rolesToCheck.includes(role));
    logger.info(`Cache hit for user ${userId.substring(0, 8)}. Has role ${rolesToCheck.join(',')}:`, hasRole, 'User roles:', cached.roles);
    return hasRole;
  }

  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);

    if (error) {
      logger.error('Error checking user role:', error);
      return false;
    }

    const userRoles = (data || []).map(r => r.role as AppRole);
    logger.info(`Fetched roles for user ${userId.substring(0, 8)}:`, userRoles);

    // Update cache
    roleCache.set(userId, {
      roles: userRoles,
      timestamp: Date.now(),
    });

    const hasRole = userRoles.some(role => rolesToCheck.includes(role));
    logger.info(`User ${userId.substring(0, 8)} has role ${rolesToCheck.join(',')}:`, hasRole);
    return hasRole;
  } catch (error) {
    logger.error('Exception checking user role:', error);
    return false;
  }
}

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
  return checkUserRole(userId, ['admin', 'owner']);
}

/**
 * Checks if a user is a moderator or higher (moderator, admin, or owner).
 * 
 * @param {string} userId - The user ID to check
 * @returns {Promise<boolean>} True if user is moderator or higher
 */
export async function checkModeratorStatus(userId: string): Promise<boolean> {
  return checkUserRole(userId, ['moderator', 'admin', 'owner']);
}

/**
 * Checks if a user is an owner.
 * 
 * @param {string} userId - The user ID to check
 * @returns {Promise<boolean>} True if user is owner
 */
export async function checkOwnerStatus(userId: string): Promise<boolean> {
  return checkUserRole(userId, 'owner');
}

/**
 * Clears the role cache for a specific user or all users.
 * Useful after role changes.
 * 
 * @param {string} [userId] - Optional user ID to clear. If omitted, clears all cache.
 * 
 * @example
 * // Clear specific user
 * clearRoleCache('user-id-123');
 * 
 * // Clear all cache
 * clearRoleCache();
 */
export function clearRoleCache(userId?: string): void {
  if (userId) {
    roleCache.delete(userId);
    logger.info(`Cleared role cache for user: ${userId}`);
  } else {
    roleCache.clear();
    logger.info('Cleared all role cache');
  }
}

// Legacy function name for backwards compatibility
export const clearAdminCache = clearRoleCache;
