import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { categoryId, moduleType, topic, difficulty, count = 5 } = await req.json();
    
    if (!categoryId || !moduleType || !topic) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let systemPrompt = '';
    let responseFormat = {};

    if (moduleType === 'flashcards') {
      systemPrompt = `Du bist ein KI-Tutor für IT-Ausbildung. Generiere ${count} Karteikarten zum Thema "${topic}" mit Schwierigkeit "${difficulty || 'mittel'}".
      
Jede Karteikarte muss enthalten:
- front: Die Frage oder der Begriff (max 200 Zeichen)
- back: Die Antwort oder Definition (max 500 Zeichen)
- explanation: Eine ausführliche Erklärung mit Beispielen (max 1000 Zeichen)

Fokussiere auf praxisrelevante Inhalte für IT-Fachinformatiker.`;

      responseFormat = {
        type: "json_schema",
        json_schema: {
          name: "flashcards_response",
          strict: true,
          schema: {
            type: "object",
            properties: {
              flashcards: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    front: { type: "string" },
                    back: { type: "string" },
                    explanation: { type: "string" }
                  },
                  required: ["front", "back", "explanation"],
                  additionalProperties: false
                }
              }
            },
            required: ["flashcards"],
            additionalProperties: false
          }
        }
      };
    } else if (moduleType === 'quiz') {
      systemPrompt = `Du bist ein KI-Tutor für IT-Ausbildung. Generiere ${count} Multiple-Choice-Fragen zum Thema "${topic}" mit Schwierigkeit "${difficulty || 'mittel'}".
      
Jede Frage muss enthalten:
- question: Die Frage (max 300 Zeichen)
- options: Array mit genau 4 Antwortmöglichkeiten
- correctAnswer: Index der richtigen Antwort (0-3)
- explanation: Erklärung warum die Antwort richtig ist (max 1000 Zeichen)

Stelle sicher, dass die falschen Antworten plausibel sind.`;

      responseFormat = {
        type: "json_schema",
        json_schema: {
          name: "quiz_response",
          strict: true,
          schema: {
            type: "object",
            properties: {
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    question: { type: "string" },
                    options: {
                      type: "array",
                      items: { type: "string" },
                      minItems: 4,
                      maxItems: 4
                    },
                    correctAnswer: { type: "number" },
                    explanation: { type: "string" }
                  },
                  required: ["question", "options", "correctAnswer", "explanation"],
                  additionalProperties: false
                }
              }
            },
            required: ["questions"],
            additionalProperties: false
          }
        }
      };
    } else {
      return new Response(
        JSON.stringify({ error: 'Unsupported module type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Calling Lovable AI Gateway...');
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generiere jetzt die Inhalte für das Thema: ${topic}` }
        ],
        response_format: responseFormat
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit erreicht. Bitte versuche es später erneut.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI-Credits aufgebraucht. Bitte kontaktiere den Administrator.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'AI-Generierung fehlgeschlagen' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const generatedContent = JSON.parse(aiData.choices[0].message.content);

    // Save to database
    const { data: savedContent, error: saveError } = await supabase
      .from('ai_generated_content')
      .insert({
        user_id: user.id,
        category_id: categoryId,
        module_type: moduleType,
        prompt: topic,
        generated_content: generatedContent,
        status: 'completed'
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving AI content:', saveError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        content: generatedContent,
        id: savedContent?.id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-ai-exercises:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});