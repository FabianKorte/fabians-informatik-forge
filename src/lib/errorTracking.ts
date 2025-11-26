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
  errorTracker.logError(
    new Error(`Unhandled Promise Rejection: ${event.reason}`),
    { componentStack: 'Promise' }
  );
});

// Track console errors
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  originalConsoleError.apply(console, args);
  
  // Create error from console.error arguments
  const errorMessage = args.map(arg => {
    if (arg instanceof Error) return arg.message;
    if (typeof arg === 'object') return JSON.stringify(arg);
    return String(arg);
  }).join(' ');
  
  errorTracker.logError(
    new Error(`Console Error: ${errorMessage}`),
    { componentStack: 'Console' }
  );
};

// Track React errors in development
if (import.meta.env.DEV) {
  const originalConsoleWarn = console.warn;
  console.warn = (...args: any[]) => {
    originalConsoleWarn.apply(console, args);
    
    // Only track React warnings
    const message = String(args[0]);
    if (message.includes('React') || message.includes('Warning:')) {
      errorTracker.logError(
        new Error(`React Warning: ${message}`),
        { componentStack: 'React' }
      );
    }
  };
}
