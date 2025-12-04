import { logger } from './logger';

interface ErrorLog {
  timestamp: string;
  message: string;
  stack?: string;
  componentStack?: string;
  userAgent: string;
  url: string;
  userId?: string;
}

class ErrorTracker {
  private errors: ErrorLog[] = [];
  private maxErrors = 50;
  private storageAvailable = true;

  constructor() {
    this.checkStorageAvailability();
  }

  private checkStorageAvailability() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      this.storageAvailable = true;
    } catch (e) {
      this.storageAvailable = false;
      logger.warn('localStorage not available, using in-memory storage');
    }
  }

  logError(error: Error, errorInfo?: { componentStack?: string }, userId?: string) {
    const errorLog: ErrorLog = {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId,
    };

    this.errors.push(errorLog);
    
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    if (import.meta.env.DEV) {
      logger.error('Error tracked:', errorLog);
    }

    if (this.storageAvailable) {
      try {
        localStorage.setItem('error_logs', JSON.stringify(this.errors));
      } catch (e) {
        this.storageAvailable = false;
        logger.warn('localStorage quota exceeded');
      }
    }
  }

  getErrors(): ErrorLog[] {
    return [...this.errors];
  }

  clearErrors() {
    this.errors = [];
    if (this.storageAvailable) {
      try {
        localStorage.removeItem('error_logs');
      } catch (e) {
        logger.warn('Could not clear error logs:', e);
      }
    }
  }

  loadFromStorage() {
    if (!this.storageAvailable) return;
    
    try {
      const stored = localStorage.getItem('error_logs');
      if (stored) {
        this.errors = JSON.parse(stored);
      }
    } catch (e) {
      logger.warn('Could not load error logs:', e);
    }
  }
}

export const errorTracker = new ErrorTracker();

errorTracker.loadFromStorage();

window.addEventListener('error', (event) => {
  errorTracker.logError(new Error(event.message), {
    componentStack: event.filename ? `at ${event.filename}:${event.lineno}:${event.colno}` : undefined
  });
});

window.addEventListener('unhandledrejection', (event) => {
  const reason = String(event.reason);
  // Skip expected network errors
  if (reason.includes('Failed to fetch') || reason.includes('NetworkError') || reason.includes('Load failed')) {
    return;
  }
  errorTracker.logError(
    new Error(`Unhandled Promise Rejection: ${reason}`),
    { componentStack: 'Promise' }
  );
});

// Patterns for errors that should be ignored (expected/harmless errors)
const IGNORED_ERROR_PATTERNS = [
  'Failed to fetch', // Network errors from Supabase auto-refresh when offline/tab inactive
  'NetworkError',
  'net::ERR_',
  'Load failed', // Safari equivalent of Failed to fetch
  'The operation was aborted', // Aborted requests
  'AbortError',
  'TypeError: cancelled', // Safari cancelled requests
  'ResizeObserver loop', // Harmless ResizeObserver warnings
];

const shouldIgnoreError = (message: string): boolean => {
  return IGNORED_ERROR_PATTERNS.some(pattern => message.includes(pattern));
};

// Track console errors with guard to prevent infinite loops
let isTrackingError = false;
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  originalConsoleError.apply(console, args);
  
  // Guard against infinite loops
  if (isTrackingError) return;
  
  try {
    isTrackingError = true;
    const errorMessage = args.map(arg => {
      if (arg instanceof Error) return arg.message;
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');
    
    // Skip expected/harmless errors
    if (shouldIgnoreError(errorMessage)) {
      return;
    }
    
    errorTracker.logError(
      new Error(`Console Error: ${errorMessage}`),
      { componentStack: 'Console' }
    );
  } finally {
    isTrackingError = false;
  }
};

// Track React errors in development with guard
if (import.meta.env.DEV) {
  let isTrackingWarning = false;
  const originalConsoleWarn = console.warn;
  console.warn = (...args: any[]) => {
    originalConsoleWarn.apply(console, args);
    
    if (isTrackingWarning) return;
    
    try {
      isTrackingWarning = true;
      const message = String(args[0]);
      if (message.includes('React') || message.includes('Warning:')) {
        errorTracker.logError(
          new Error(`React Warning: ${message}`),
          { componentStack: 'React' }
        );
      }
    } finally {
      isTrackingWarning = false;
    }
  };
}
