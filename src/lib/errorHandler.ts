import { toast } from "@/hooks/use-toast";
import { logger } from "@/lib/logger";
import { errorTracker } from "@/lib/errorTracking";

/**
 * Centralized error handler for consistent error management
 */

export interface ErrorHandlerOptions {
  title?: string;
  description?: string;
  logError?: boolean;
  trackError?: boolean;
  showToast?: boolean;
  userId?: string;
}

/**
 * Handle errors consistently across the application
 */
export const handleError = (
  error: Error | unknown,
  options: ErrorHandlerOptions = {}
) => {
  const {
    title = "Fehler",
    description,
    logError = true,
    trackError = true,
    showToast = true,
    userId
  } = options;

  // Extract error message
  const errorMessage = error instanceof Error 
    ? error.message 
    : typeof error === 'string' 
    ? error 
    : "Ein unbekannter Fehler ist aufgetreten";

  // Log error
  if (logError) {
    logger.error("Error handled:", error);
  }

  // Track error for debugging
  if (trackError && error instanceof Error) {
    errorTracker.logError(error, undefined, userId);
  }

  // Show toast notification
  if (showToast) {
    toast({
      title,
      description: description || errorMessage,
      variant: "destructive",
    });
  }

  return errorMessage;
};

/**
 * Handle async function errors with automatic error handling
 */
export const withErrorHandler = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: ErrorHandlerOptions = {}
): T => {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error, options);
      throw error; // Re-throw for caller to handle if needed
    }
  }) as T;
};

/**
 * Specific error handlers for common scenarios
 */
export const handleAuthError = (error: Error | unknown, userId?: string) => {
  return handleError(error, {
    title: "Authentifizierungsfehler",
    description: "Bitte melde dich erneut an",
    userId
  });
};

export const handleNetworkError = (error: Error | unknown) => {
  return handleError(error, {
    title: "Netzwerkfehler",
    description: "Bitte überprüfe deine Internetverbindung",
  });
};

export const handleDatabaseError = (error: Error | unknown) => {
  return handleError(error, {
    title: "Datenbankfehler",
    description: "Daten konnten nicht gespeichert werden",
  });
};

export const handleValidationError = (error: Error | unknown) => {
  return handleError(error, {
    title: "Validierungsfehler",
    logError: false, // Validation errors are expected, don't log
    trackError: false,
  });
};

/**
 * Error boundary handler for React Error Boundaries
 */
export const handleComponentError = (
  error: Error,
  errorInfo: { componentStack?: string },
  userId?: string
) => {
  logger.error("Component error:", error, errorInfo);
  errorTracker.logError(error, errorInfo, userId);
  
  // Don't show toast in error boundaries - the boundary will show UI
  return {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo.componentStack
  };
};
