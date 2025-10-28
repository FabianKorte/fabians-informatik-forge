/**
 * Centralized logger that only logs in development mode
 */
class Logger {
  private isDev = import.meta.env.DEV;

  log(...args: any[]) {
    if (this.isDev) {
      console.log(...args);
    }
  }

  info(...args: any[]) {
    if (this.isDev) {
      console.info(...args);
    }
  }

  warn(...args: any[]) {
    if (this.isDev) {
      console.warn(...args);
    }
  }

  error(...args: any[]) {
    if (this.isDev) {
      console.error(...args);
    }
  }

  // Performance logs - only in dev
  performance(name: string, value: number) {
    if (this.isDev) {
      console.log(`Performance: ${name} = ${Math.round(value)}ms`);
    }
  }

  // Always log errors in production for critical issues
  critical(...args: any[]) {
    console.error('[CRITICAL]', ...args);
  }
}

export const logger = new Logger();
