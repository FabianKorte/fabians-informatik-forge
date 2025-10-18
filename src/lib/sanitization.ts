/**
 * Sanitizes user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string, maxLength = 500): string => {
  if (!input) return '';
  
  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Remove script tags specifically (double check)
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove event handlers
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  
  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  // Trim and limit length
  sanitized = sanitized.trim().substring(0, maxLength);
  
  return sanitized;
};

/**
 * Sanitizes username - more restrictive
 */
export const sanitizeUsername = (username: string): string => {
  if (!username) return '';
  
  // Remove all special characters except underscore, dash, and periods
  let sanitized = username.replace(/[^a-zA-Z0-9_.-]/g, '');
  
  // Trim and limit to 30 characters
  sanitized = sanitized.trim().substring(0, 30);
  
  return sanitized;
};

/**
 * Sanitizes bio text
 */
export const sanitizeBio = (bio: string): string => {
  return sanitizeInput(bio, 500);
};

/**
 * Validates and sanitizes email
 */
export const sanitizeEmail = (email: string): string => {
  if (!email) return '';
  
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmed = email.trim().toLowerCase();
  
  if (!emailRegex.test(trimmed)) {
    return '';
  }
  
  return trimmed.substring(0, 255);
};
