import { supabase } from '@/integrations/supabase/client';

export const checkServerRateLimit = async (email: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('check-rate-limit', {
      body: { email, action: 'check' }
    });

    if (error) {
      console.error('Server rate limit check error:', error);
      return { allowed: true, remainingAttempts: 5 };
    }

    return data;
  } catch (error) {
    console.error('Server rate limit error:', error);
    return { allowed: true, remainingAttempts: 5 };
  }
};

export const recordServerLoginAttempt = async (email: string) => {
  try {
    await supabase.functions.invoke('check-rate-limit', {
      body: { email, action: 'record' }
    });
  } catch (error) {
    console.error('Error recording login attempt:', error);
  }
};

export const clearServerLoginAttempts = async (email: string) => {
  try {
    await supabase.functions.invoke('check-rate-limit', {
      body: { email, action: 'clear' }
    });
  } catch (error) {
    console.error('Error clearing login attempts:', error);
  }
};
