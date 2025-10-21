import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

export const checkServerRateLimit = async (email: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('check-rate-limit', {
      body: { email, action: 'check' }
    });

    if (error) {
      logger.error('Server rate limit check error:', error);
      return { allowed: true, remainingAttempts: 5 };
    }

    return data;
  } catch (error) {
    logger.error('Server rate limit error:', error);
    return { allowed: true, remainingAttempts: 5 };
  }
};

export const recordServerLoginAttempt = async (email: string) => {
  try {
    await supabase.functions.invoke('check-rate-limit', {
      body: { email, action: 'record' }
    });
  } catch (error) {
    logger.error('Error recording login attempt:', error);
  }
};

export const clearServerLoginAttempts = async (email: string) => {
  try {
    await supabase.functions.invoke('check-rate-limit', {
      body: { email, action: 'clear' }
    });
  } catch (error) {
    logger.error('Error clearing login attempts:', error);
  }
};
