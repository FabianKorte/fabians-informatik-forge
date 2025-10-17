interface LoginAttempt {
  timestamp: number;
  email: string;
}

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const STORAGE_KEY = 'login_attempts';

export const checkRateLimit = (email: string): { allowed: boolean; remainingAttempts: number; resetTime?: number } => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const attempts: LoginAttempt[] = stored ? JSON.parse(stored) : [];
    const now = Date.now();
    
    // Remove old attempts outside the time window
    const recentAttempts = attempts.filter(
      (attempt) => now - attempt.timestamp < WINDOW_MS
    );
    
    // Filter attempts for this email
    const emailAttempts = recentAttempts.filter(
      (attempt) => attempt.email.toLowerCase() === email.toLowerCase()
    );
    
    if (emailAttempts.length >= MAX_ATTEMPTS) {
      const oldestAttempt = emailAttempts[0];
      const resetTime = oldestAttempt.timestamp + WINDOW_MS;
      
      return {
        allowed: false,
        remainingAttempts: 0,
        resetTime,
      };
    }
    
    return {
      allowed: true,
      remainingAttempts: MAX_ATTEMPTS - emailAttempts.length,
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    // Allow login if there's an error reading from localStorage
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }
};

export const recordLoginAttempt = (email: string): void => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const attempts: LoginAttempt[] = stored ? JSON.parse(stored) : [];
    const now = Date.now();
    
    // Remove old attempts
    const recentAttempts = attempts.filter(
      (attempt) => now - attempt.timestamp < WINDOW_MS
    );
    
    // Add new attempt
    recentAttempts.push({
      timestamp: now,
      email: email.toLowerCase(),
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentAttempts));
  } catch (error) {
    console.error('Error recording login attempt:', error);
  }
};

export const clearLoginAttempts = (email: string): void => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const attempts: LoginAttempt[] = stored ? JSON.parse(stored) : [];
    
    // Remove attempts for this email
    const filtered = attempts.filter(
      (attempt) => attempt.email.toLowerCase() !== email.toLowerCase()
    );
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error clearing login attempts:', error);
  }
};
