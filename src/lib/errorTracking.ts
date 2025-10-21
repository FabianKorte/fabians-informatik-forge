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
