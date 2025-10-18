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
    
    // Keep only last maxErrors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('Error tracked:', errorLog);
    }

    // Store in localStorage for persistence
    try {
      localStorage.setItem('error_logs', JSON.stringify(this.errors));
    } catch (e) {
      console.warn('Could not store error logs:', e);
    }
  }

  getErrors(): ErrorLog[] {
    return [...this.errors];
  }

  clearErrors() {
    this.errors = [];
    try {
      localStorage.removeItem('error_logs');
    } catch (e) {
      console.warn('Could not clear error logs:', e);
    }
  }

  // Load errors from localStorage on init
  loadFromStorage() {
    try {
      const stored = localStorage.getItem('error_logs');
      if (stored) {
        this.errors = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not load error logs:', e);
    }
  }
}

export const errorTracker = new ErrorTracker();

// Initialize error tracking
errorTracker.loadFromStorage();

// Global error handler
window.addEventListener('error', (event) => {
  errorTracker.logError(new Error(event.message), {
    componentStack: event.filename ? `at ${event.filename}:${event.lineno}:${event.colno}` : undefined
  });
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  errorTracker.logError(
    new Error(`Unhandled Promise Rejection: ${event.reason}`),
    { componentStack: 'Promise' }
  );
});
