import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RateLimitRecord {
  id: string;
  ip_address: string;
  email: string;
  attempt_count: number;
  first_attempt_at: string;
  last_attempt_at: string;
}

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { email, action } = await req.json();
    
    // Get client IP from various headers
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 
               req.headers.get('x-real-ip') || 
               'unknown';

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const now = new Date();
    const windowStart = new Date(now.getTime() - WINDOW_MS);

    if (action === 'check') {
      // Check rate limit
      const { data: attempts, error } = await supabase
        .from('login_rate_limits')
        .select('*')
        .eq('email', email.toLowerCase())
        .gte('last_attempt_at', windowStart.toISOString())
        .order('last_attempt_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Rate limit check error:', error);
        return new Response(
          JSON.stringify({ allowed: true, remainingAttempts: MAX_ATTEMPTS }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (!attempts) {
        return new Response(
          JSON.stringify({ allowed: true, remainingAttempts: MAX_ATTEMPTS }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const attemptCount = attempts.attempt_count || 0;
      
      if (attemptCount >= MAX_ATTEMPTS) {
        const resetTime = new Date(attempts.first_attempt_at).getTime() + WINDOW_MS;
        return new Response(
          JSON.stringify({
            allowed: false,
            remainingAttempts: 0,
            resetTime
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({
          allowed: true,
          remainingAttempts: MAX_ATTEMPTS - attemptCount
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else if (action === 'record') {
      // Record failed attempt
      const { data: existing } = await supabase
        .from('login_rate_limits')
        .select('*')
        .eq('email', email.toLowerCase())
        .gte('last_attempt_at', windowStart.toISOString())
        .maybeSingle();

      if (existing) {
        // Update existing record
        await supabase
          .from('login_rate_limits')
          .update({
            attempt_count: existing.attempt_count + 1,
            last_attempt_at: now.toISOString(),
            ip_address: ip
          })
          .eq('id', existing.id);
      } else {
        // Create new record
        await supabase
          .from('login_rate_limits')
          .insert({
            email: email.toLowerCase(),
            ip_address: ip,
            attempt_count: 1,
            first_attempt_at: now.toISOString(),
            last_attempt_at: now.toISOString()
          });
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else if (action === 'clear') {
      // Clear rate limit on successful login
      await supabase
        .from('login_rate_limits')
        .delete()
        .eq('email', email.toLowerCase());

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Rate limit error:', error);
    return new Response(
      JSON.stringify({ error: error.message, allowed: true }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
