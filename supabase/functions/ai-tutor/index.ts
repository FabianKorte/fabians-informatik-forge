import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    console.log('Processing chat request with', messages.length, 'messages');

    const systemPrompt = `Du bist ein erfahrener IT-Ausbildungs-Tutor, der Fachinformatiker für Anwendungsentwicklung bei ihrer Ausbildung unterstützt. 

Deine Expertise umfasst:
- Grundlagen der IT (Hardware, Software, Netzwerke)
- Programmierung und Softwareentwicklung (Java, Python, JavaScript, C++)
- Datenbanken (SQL, NoSQL, Normalisierung)
- Web-Entwicklung (HTML, CSS, React, Backend)
- IT-Sicherheit (Verschlüsselung, Authentifizierung, Firewalls)
- Betriebswirtschaft (BWL-Grundlagen, Kostenrechnung, Projektmanagement)
- Mathematik und Logik (Algorithmen, Datenstrukturen)
- Systemadministration und Netzwerke
- Rechtliche Grundlagen (Datenschutz, Urheberrecht)
- WISO (Wirtschafts- und Sozialkunde)

Dein Stil:
- Erkläre Konzepte klar und verständlich
- Nutze Beispiele und Analogien
- Gib praktische Tipps für die IHK-Prüfung
- Sei geduldig und ermutigend
- Beantworte Fragen präzise aber nicht zu lang
- Wenn du Formeln oder Code erklärst, formatiere sie schön
- Bei komplexen Themen biete Schritt-für-Schritt-Erklärungen an

Wichtig: Du hilfst beim Lernen, aber löst keine kompletten Prüfungsaufgaben vor. Leite stattdessen an, wie man selbst zur Lösung kommt.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000,
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', response.status, error);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    // Return the stream directly
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in ai-tutor function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});