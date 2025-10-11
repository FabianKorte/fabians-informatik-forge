import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Verify the requesting user is an admin
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if user is admin
    const { data: roleData } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single()

    if (!roleData) {
      return new Response(
        JSON.stringify({ error: 'Not authorized - admin role required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get all user IDs from request
    const { userIds } = await req.json()

    if (!userIds || !Array.isArray(userIds)) {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid userIds array' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch 2FA status for each user
    const statusMap: Record<string, { has2FA: boolean, factorCount: number, factors: any[] }> = {}

    for (const userId of userIds) {
      try {
        const { data: factors, error: listError } = await supabaseAdmin.auth.admin.mfa.listFactors({
          userId: userId
        })

        if (listError) {
          console.error(`Error listing factors for user ${userId}:`, listError)
          statusMap[userId] = { has2FA: false, factorCount: 0, factors: [] }
          continue
        }

        const totpFactors = factors?.totp || []
        const consideredFactors = totpFactors.filter((f: any) => f.status !== 'unverified')
        
        statusMap[userId] = {
          has2FA: (consideredFactors.length > 0) || (totpFactors.length > 0),
          factorCount: consideredFactors.length || totpFactors.length,
          factors: (consideredFactors.length ? consideredFactors : totpFactors).map((f: any) => ({
            id: f.id,
            friendlyName: f.friendly_name,
            createdAt: f.created_at,
            status: f.status
          }))
        }
      } catch (error) {
        console.error(`Error processing user ${userId}:`, error)
        statusMap[userId] = { has2FA: false, factorCount: 0, factors: [] }
      }
    }

    return new Response(
      JSON.stringify({ statusMap }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
