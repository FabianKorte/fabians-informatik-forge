import { describe, it, expect } from 'vitest';
import {
  sanitizeInput,
  sanitizeUsername,
  sanitizeBio,
  sanitizeEmail,
} from '../sanitization';

describe('Sanitization Functions', () => {
  describe('sanitizeInput', () => {
    it('should remove HTML tags', () => {
      const input = '<script>alert("xss")</script>Hello';
      const result = sanitizeInput(input);
      expect(result).toBe('Hello');
    });

    it('should remove event handlers', () => {
      const input = '<div onclick="alert()">Test</div>';
      const result = sanitizeInput(input);
      expect(result).toBe('Test');
    });

    it('should remove javascript: protocol', () => {
      const input = 'javascript:alert("xss")';
      const result = sanitizeInput(input);
      expect(result).toBe('alert("xss")');
    });

    it('should limit length to default 500 characters', () => {
      const input = 'a'.repeat(600);
      const result = sanitizeInput(input);
      expect(result.length).toBe(500);
    });

    it('should limit length to custom maxLength', () => {
      const input = 'a'.repeat(150);
      const result = sanitizeInput(input, 100);
      expect(result.length).toBe(100);
    });

    it('should trim whitespace', () => {
      const input = '  Hello World  ';
      const result = sanitizeInput(input);
      expect(result).toBe('Hello World');
    });

    it('should handle empty input', () => {
      expect(sanitizeInput('')).toBe('');
      expect(sanitizeInput(null as any)).toBe('');
      expect(sanitizeInput(undefined as any)).toBe('');
    });

    it('should handle nested script tags', () => {
      const input = '<script><script>alert("xss")</script></script>';
      const result = sanitizeInput(input);
      expect(result).not.toContain('script');
      expect(result).not.toContain('alert');
    });
  });

  describe('sanitizeUsername', () => {
    it('should only allow alphanumeric, underscore, dash, and period', () => {
      const input = 'user@name#123!';
      const result = sanitizeUsername(input);
      expect(result).toBe('username123');
    });

    it('should limit length to 30 characters', () => {
      const input = 'a'.repeat(50);
      const result = sanitizeUsername(input);
      expect(result.length).toBe(30);
    });

    it('should handle valid username', () => {
      const input = 'user_name.123-test';
      const result = sanitizeUsername(input);
      expect(result).toBe('user_name.123-test');
    });

    it('should handle empty input', () => {
      expect(sanitizeUsername('')).toBe('');
      expect(sanitizeUsername(null as any)).toBe('');
    });
  });

  describe('sanitizeBio', () => {
    it('should use sanitizeInput with 500 char limit', () => {
      const input = '<script>alert()</script>Hello Bio';
      const result = sanitizeBio(input);
      expect(result).toBe('Hello Bio');
    });

    it('should limit bio to 500 characters', () => {
      const input = 'a'.repeat(600);
      const result = sanitizeBio(input);
      expect(result.length).toBe(500);
    });
  });

  describe('sanitizeEmail', () => {
    it('should validate and sanitize valid email', () => {
      const input = 'Test@Example.COM';
      const result = sanitizeEmail(input);
      expect(result).toBe('test@example.com');
    });

    it('should reject invalid email format', () => {
      expect(sanitizeEmail('notanemail')).toBe('');
      expect(sanitizeEmail('missing@domain')).toBe('');
      expect(sanitizeEmail('@example.com')).toBe('');
      expect(sanitizeEmail('test@')).toBe('');
    });

    it('should trim whitespace', () => {
      const input = '  test@example.com  ';
      const result = sanitizeEmail(input);
      expect(result).toBe('test@example.com');
    });

    it('should limit length to 255 characters', () => {
      const input = 'a'.repeat(250) + '@example.com';
      const result = sanitizeEmail(input);
      expect(result.length).toBeLessThanOrEqual(255);
    });

    it('should handle empty input', () => {
      expect(sanitizeEmail('')).toBe('');
      expect(sanitizeEmail(null as any)).toBe('');
    });

    it('should convert to lowercase', () => {
      const input = 'TEST@EXAMPLE.COM';
      const result = sanitizeEmail(input);
      expect(result).toBe('test@example.com');
    });
  });
});
