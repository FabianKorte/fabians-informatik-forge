import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Processing chat request with', messages.length, 'messages');

    const systemPrompt = `Du bist ein professioneller KI-Tutor und Lernberater für angehende Fachinformatiker für Anwendungsentwicklung. 

Deine Aufgabe ist es, Lernenden bei ihrer IHK-Prüfungsvorbereitung zu helfen. Du bist NICHT selbst in der Ausbildung, sondern ein erfahrener Berater und Mentor.

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
- Betone, dass du als Berater und Helfer zur Seite stehst

Wichtig: Du hilfst beim Lernen und gibst Hilfestellungen, aber löst keine kompletten Prüfungsaufgaben vor. Leite stattdessen an, wie man selbst zur Lösung kommt.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('AI Gateway error:', response.status, error);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit erreicht, bitte versuche es später erneut." }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Zahlungsinformationen erforderlich, bitte füge Guthaben zu deinem Lovable AI Workspace hinzu." }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

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