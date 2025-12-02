import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  handleError,
  withErrorHandler,
  handleAuthError,
  handleNetworkError,
  handleDatabaseError,
  handleValidationError,
  handleComponentError,
} from '../errorHandler';

// Mock dependencies
vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}));

vi.mock('@/lib/logger', () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
  },
}));

vi.mock('@/lib/errorTracking', () => ({
  errorTracker: {
    logError: vi.fn(),
  },
}));

import { toast } from '@/hooks/use-toast';
import { logger } from '@/lib/logger';
import { errorTracker } from '@/lib/errorTracking';

describe('Error Handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleError', () => {
    it('should handle Error objects', () => {
      const error = new Error('Test error');
      const result = handleError(error);

      expect(result).toBe('Test error');
      expect(logger.error).toHaveBeenCalledWith('Error handled:', error);
      expect(errorTracker.logError).toHaveBeenCalledWith(error, undefined, undefined);
      expect(toast).toHaveBeenCalledWith({
        title: 'Fehler',
        description: 'Test error',
        variant: 'destructive',
      });
    });

    it('should handle string errors', () => {
      const error = 'String error message';
      const result = handleError(error);

      expect(result).toBe('String error message');
      expect(toast).toHaveBeenCalledWith({
        title: 'Fehler',
        description: 'String error message',
        variant: 'destructive',
      });
    });

    it('should handle unknown errors', () => {
      const error = { unknown: 'object' };
      const result = handleError(error);

      expect(result).toBe('Ein unbekannter Fehler ist aufgetreten');
    });

    it('should respect custom options', () => {
      const error = new Error('Test error');
      handleError(error, {
        title: 'Custom Title',
        description: 'Custom Description',
        logError: false,
        trackError: false,
        showToast: false,
      });

      expect(logger.error).not.toHaveBeenCalled();
      expect(errorTracker.logError).not.toHaveBeenCalled();
      expect(toast).not.toHaveBeenCalled();
    });

    it('should include userId when provided', () => {
      const error = new Error('Test error');
      const userId = 'user-123';
      handleError(error, { userId });

      expect(errorTracker.logError).toHaveBeenCalledWith(error, undefined, userId);
    });
  });

  describe('withErrorHandler', () => {
    it('should wrap async function and handle success', async () => {
      const fn = vi.fn().mockResolvedValue('success');
      const wrapped = withErrorHandler(fn);

      const result = await wrapped('arg1', 'arg2');

      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
      expect(toast).not.toHaveBeenCalled();
    });

    it('should catch and handle errors', async () => {
      const error = new Error('Async error');
      const fn = vi.fn().mockRejectedValue(error);
      const wrapped = withErrorHandler(fn);

      await expect(wrapped()).rejects.toThrow('Async error');
      expect(toast).toHaveBeenCalled();
    });
  });

  describe('handleAuthError', () => {
    it('should handle auth errors with specific message', () => {
      const error = new Error('Auth failed');
      handleAuthError(error, 'user-123');

      expect(toast).toHaveBeenCalledWith({
        title: 'Authentifizierungsfehler',
        description: 'Bitte melde dich erneut an',
        variant: 'destructive',
      });
      expect(errorTracker.logError).toHaveBeenCalledWith(error, undefined, 'user-123');
    });
  });

  describe('handleNetworkError', () => {
    it('should handle network errors with specific message', () => {
      const error = new Error('Network failed');
      handleNetworkError(error);

      expect(toast).toHaveBeenCalledWith({
        title: 'Netzwerkfehler',
        description: 'Bitte überprüfe deine Internetverbindung',
        variant: 'destructive',
      });
    });
  });

  describe('handleDatabaseError', () => {
    it('should handle database errors with specific message', () => {
      const error = new Error('DB failed');
      handleDatabaseError(error);

      expect(toast).toHaveBeenCalledWith({
        title: 'Datenbankfehler',
        description: 'Daten konnten nicht gespeichert werden',
        variant: 'destructive',
      });
    });
  });

  describe('handleValidationError', () => {
    it('should handle validation errors without logging', () => {
      const error = new Error('Validation failed');
      handleValidationError(error);

      expect(logger.error).not.toHaveBeenCalled();
      expect(errorTracker.logError).not.toHaveBeenCalled();
      expect(toast).toHaveBeenCalledWith({
        title: 'Validierungsfehler',
        description: 'Validation failed',
        variant: 'destructive',
      });
    });
  });

  describe('handleComponentError', () => {
    it('should handle component errors with error info', () => {
      const error = new Error('Component failed');
      const errorInfo = { componentStack: 'Stack trace' };
      const result = handleComponentError(error, errorInfo, 'user-123');

      expect(logger.error).toHaveBeenCalledWith('Component error:', error, errorInfo);
      expect(errorTracker.logError).toHaveBeenCalledWith(error, errorInfo, 'user-123');
      expect(result).toEqual({
        message: 'Component failed',
        stack: error.stack,
        componentStack: 'Stack trace',
      });
      expect(toast).not.toHaveBeenCalled();
    });
  });
});
