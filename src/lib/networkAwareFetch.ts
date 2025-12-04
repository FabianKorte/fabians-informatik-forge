/**
 * Network-aware fetch wrapper that prevents "Failed to fetch" errors
 * when the user is offline or the tab is inactive.
 */

import { logger } from './logger';

// Track online status
let isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
let lastOnlineCheck = Date.now();

// Listen for online/offline events
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    isOnline = true;
    lastOnlineCheck = Date.now();
    logger.info('Network: Back online');
  });

  window.addEventListener('offline', () => {
    isOnline = false;
    lastOnlineCheck = Date.now();
    logger.info('Network: Went offline');
  });

  // Also check on visibility change (tab becomes active)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // Recheck network status when tab becomes visible
      isOnline = navigator.onLine;
      lastOnlineCheck = Date.now();
    }
  });
}

/**
 * Check if the network is available
 */
export const isNetworkAvailable = (): boolean => {
  // Refresh the status if it's been more than 5 seconds
  if (Date.now() - lastOnlineCheck > 5000) {
    isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    lastOnlineCheck = Date.now();
  }
  return isOnline;
};

/**
 * Custom fetch that checks network availability before making requests
 * and provides better error messages.
 */
export const networkAwareFetch: typeof fetch = async (input, init) => {
  // Check if we're online before making the request
  if (!isNetworkAvailable()) {
    // Return a rejected promise with a more descriptive error
    const error = new Error('Network unavailable - request skipped');
    error.name = 'NetworkUnavailableError';
    // Don't throw, just return a response that indicates offline status
    // This prevents console.error spam
    return new Response(JSON.stringify({ 
      error: 'offline',
      message: 'No network connection available'
    }), {
      status: 503,
      statusText: 'Service Unavailable (Offline)',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const response = await fetch(input, {
      ...init,
      // Add a reasonable timeout for auth requests
      signal: init?.signal || (typeof AbortSignal !== 'undefined' && 'timeout' in AbortSignal 
        ? AbortSignal.timeout(30000) 
        : undefined),
    });
    return response;
  } catch (error) {
    // If fetch fails due to network issues, update our online status
    if (error instanceof TypeError && (
      error.message.includes('Failed to fetch') ||
      error.message.includes('NetworkError') ||
      error.message.includes('Load failed')
    )) {
      isOnline = false;
      lastOnlineCheck = Date.now();
      
      // Check if we're actually offline
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        // Return offline response instead of throwing
        return new Response(JSON.stringify({ 
          error: 'offline',
          message: 'Network connection lost during request'
        }), {
          status: 503,
          statusText: 'Service Unavailable (Offline)',
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    // Re-throw other errors
    throw error;
  }
};
