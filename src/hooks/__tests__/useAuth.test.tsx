import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { AuthProvider, useAuth } from '../useAuth';
import React from 'react';

// Helper function to wait for condition
const waitFor = async (callback: () => void, options = { timeout: 3000 }) => {
  const startTime = Date.now();
  while (Date.now() - startTime < options.timeout) {
    try {
      callback();
      return;
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
  callback(); // Final attempt
};

// Mock Supabase client
const mockSupabase = {
  auth: {
    getSession: vi.fn(),
    onAuthStateChange: vi.fn(),
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    signInWithOAuth: vi.fn(),
    exchangeCodeForSession: vi.fn(),
    setSession: vi.fn(),
  },
};

vi.mock('@/integrations/supabase/client', () => ({
  supabase: mockSupabase,
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

vi.mock('@/lib/auth/adminChecker', () => ({
  checkAdminStatus: vi.fn().mockResolvedValue(false),
  clearAdminCache: vi.fn(),
}));

vi.mock('@/lib/auth/sessionManager', () => ({
  checkSessionTimeout: vi.fn().mockReturnValue(true),
  createSessionCheckInterval: vi.fn().mockReturnValue(123),
}));

vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
    });
  });

  it('should throw error when used outside AuthProvider', () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within an AuthProvider');
  });

  it('should provide auth context when used within provider', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current).toHaveProperty('user');
    expect(result.current).toHaveProperty('session');
    expect(result.current).toHaveProperty('isAdmin');
    expect(result.current).toHaveProperty('signIn');
    expect(result.current).toHaveProperty('signUp');
    expect(result.current).toHaveProperty('signOut');
    expect(result.current).toHaveProperty('signInWithGoogle');
    expect(result.current).toHaveProperty('signInWithDiscord');
  });

  it('should handle successful sign in', async () => {
    const mockUser = { id: '123', email: 'test@example.com' };
    const mockSession = { user: mockUser, access_token: 'token' };
    
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: { user: mockUser, session: mockSession },
      error: null,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const { error } = await result.current.signIn('test@example.com', 'password');

    expect(error).toBeNull();
    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should handle sign in error', async () => {
    const mockError = { message: 'Invalid credentials' };
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: { user: null, session: null },
      error: mockError,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const { error } = await result.current.signIn('test@example.com', 'wrong');

    expect(error).toEqual(mockError);
  });

  it('should handle sign up', async () => {
    mockSupabase.auth.signUp.mockResolvedValue({
      data: { user: null, session: null },
      error: null,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const { error } = await result.current.signUp('test@example.com', 'password', 'testuser');

    expect(error).toBeNull();
    expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
      options: {
        emailRedirectTo: expect.stringContaining('/'),
        data: {
          username: 'testuser',
        },
      },
    });
  });

  it('should handle Google OAuth sign in', async () => {
    mockSupabase.auth.signInWithOAuth.mockResolvedValue({
      data: { provider: 'google', url: 'https://google.com/oauth' },
      error: null,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const { error } = await result.current.signInWithGoogle();

    expect(error).toBeNull();
    expect(mockSupabase.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: 'google',
      options: {
        redirectTo: expect.stringContaining('/auth'),
      },
    });
  });

  it('should handle Discord OAuth sign in', async () => {
    mockSupabase.auth.signInWithOAuth.mockResolvedValue({
      data: { provider: 'discord', url: 'https://discord.com/oauth' },
      error: null,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const { error } = await result.current.signInWithDiscord();

    expect(error).toBeNull();
    expect(mockSupabase.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: 'discord',
      options: {
        redirectTo: expect.stringContaining('/auth'),
      },
    });
  });

  it('should handle sign out', async () => {
    mockSupabase.auth.signOut.mockResolvedValue({ error: null });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await result.current.signOut();

    expect(mockSupabase.auth.signOut).toHaveBeenCalled();
  });

  it('should handle rememberMe option in sign in', async () => {
    const mockUser = { id: '123', email: 'test@example.com' };
    const mockSession = { user: mockUser, access_token: 'token' };
    
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: { user: mockUser, session: mockSession },
      error: null,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Test with rememberMe = false
    await result.current.signIn('test@example.com', 'password', false);

    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalled();
  });
});
