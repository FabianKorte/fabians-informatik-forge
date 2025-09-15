import { LearnModule } from "../../types/learn";

export const kommunikationContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "Kommunikation & Präsentation - IHK Prüfungswissen",
    cards: [
      { 
        front: "Kommunikationsmodell Schulz von Thun", 
        back: "**4-Ohren-Modell:** Jede Nachricht hat 4 Ebenen. **Sachinhalt:** Worüber informiere ich? Fakten und Daten. **Selbstkundgabe:** Was gebe ich von mir preis? Gefühle, Werte. **Beziehung:** Wie stehe ich zu dir? Respekt, Ablehnung. **Appell:** Was möchte ich erreichen? Aufforderung, Bitte. **IHK-Anwendung:** Missverständnisse vermeiden durch bewusste Kommunikation auf allen Ebenen." 
      },
      { 
        front: "Aktives Zuhören Techniken", 
        back: "**Paraphrasieren:** 'Verstehe ich richtig, dass...' - Gesagtes in eigenen Worten wiederholen. **Nachfragen:** Offene Fragen stellen für Verständnis und Details. **Spiegeln:** Gefühle und Emotionen reflektieren. **IHK-Körpersprache:** Blickkontakt, zugewandte Haltung, Nicken. **Zusammenfassen:** Kernpunkte am Ende nochmals wiederholen. **Schweigen aushalten:** Pausen zulassen für Reflexion." 
      },
      { 
        front: "Präsentationsaufbau", 
        back: "**Einleitung:** Begrüßung, Thema, Agenda, Zeitrahmen. AIDA-Formel: Attention (Aufmerksamkeit), Interest (Interesse wecken). **Hauptteil:** Strukturiert nach rotem Faden, max. 3-5 Kernpunkte. **Schluss:** Zusammenfassung, Call-to-Action, Fragen. **IHK-Storytelling:** Geschichten statt nur Fakten, emotionale Verbindung. **Interaktion:** Fragen einbauen, Publikum einbeziehen." 
      },
      { 
        front: "Körpersprache und Rhetorik", 
        back: "**Mehrabian-Regel:** 55% Körpersprache, 38% Stimme, 7% Inhalt bei emotionalen Botschaften. **Gestik:** Offene Handflächen, unterstützende Bewegungen. **Mimik:** Authentischer Gesichtsausdruck, Lächeln. **IHK-Stimme:** Tempo variieren, Pausen setzen, Betonung. **Haltung:** Aufrecht, stabil, Gewicht auf beide Füße. **Blickkontakt:** Mit allen Bereichen des Publikums, 3-5 Sekunden pro Person." 
      },
      { 
        front: "Schwierige Gespräche führen", 
        back: "**Konflikte:** Sachebene vs. Beziehungsebene trennen, Win-Win-Lösungen suchen. **Kritikgespräch:** Verhalten beschreiben, nicht bewerten. Ich-Botschaften statt Du-Vorwürfe. **Einwandbehandlung:** Zuerst verstehen, dann entkräften. **IHK-Deeskalation:** Ruhig bleiben, Verständnis zeigen, gemeinsame Lösung finden. **Feedback-Regeln:** Zeitnah, konkret, konstruktiv, ausgewogen." 
      },
      { 
        front: "Interkulturelle Kommunikation", 
        back: "**Hofstede-Dimensionen:** Machtdistanz, Individualismus vs. Kollektivismus, Maskulinität vs. Femininität, Unsicherheitsvermeidung. **High-Context vs. Low-Context:** Direkte vs. indirekte Kommunikation. **IHK-Stolpersteine:** Begrüßungsrituale, Pünktlichkeit, Hierarchie-Verständnis. **Nonverbale Unterschiede:** Gestik, Mimik, persönlicher Abstand. **Englisch als Lingua Franca:** Einfache Sprache, Verständnis sicherstellen." 
      },
      { 
        front: "Digitale Kommunikation", 
        back: "**E-Mail-Etikette:** Aussagekräftige Betreffzeile, strukturierter Aufbau, angemessene Anrede/Grußformel. **Video-Calls:** Technik-Check, Hintergrund, Beleuchtung, Blick in Kamera. **IHK-Kollaboration:** Chat-Tools (Teams, Slack), gemeinsame Dokumente, asynchrone Kommunikation. **Digitale Meetings:** Agenda vorab, Moderation, Protokoll. **Social Media Business:** Professionelle Profile, Netiquette, Corporate Communication." 
      },
      { 
        front: "Verhandlungstechniken", 
        back: "**Harvard-Konzept:** Sache und Person trennen, Interessen statt Positionen, Optionen entwickeln, objektive Kriterien. **BATNA:** Best Alternative to Negotiated Agreement - Alternative vor Verhandlung klären. **IHK-Vorbereitung:** Ziele definieren (Minimum, Wunsch, Maximum), Argumente sammeln. **Taktiken:** Anker setzen, Zugeständnisse graduell, Schweigen nutzen. **Win-Win-Strategien:** Gemeinsame Interessen finden, Paket-Deals." 
      },
      { 
        front: "Moderation und Meetings", 
        back: "**Moderationsrolle:** Neutral, prozessorientiert, nicht inhaltlich. **Meeting-Struktur:** Check-in, Agenda, Arbeitsphase, Aktionen, Check-out. **IHK-Methoden:** Brainstorming, Brainwriting, World Café, Fish Bowl. **Störungen:** Vielredner bremsen, Schweiger aktivieren, Seitengespräche unterbinden. **Visualisierung:** Flipchart, Pinnwand, digitale Tools. **Protokoll:** Ergebnisse, Aktionen, Verantwortliche, Termine." 
      },
      { 
        front: "Kundenorientierte Kommunikation", 
        back: "**Kundentypen:** Analytiker (Fakten), Treiber (Effizienz), Ausdrucksstark (Beziehung), Liebenswürdig (Harmonie). **Bedarfsermittlung:** Offene Fragen, SPIN-Selling (Situation, Problem, Implication, Need-Payoff). **IHK-Beschwerdemanagement:** Zuhören, Verständnis zeigen, Lösung anbieten, nachfassen. **Telefon-Etikette:** Freundlicher Tonfall, Name nennen, aktiv zuhören. **Schriftliche Kommunikation:** Kundensprache verwenden, Vorteile statt Eigenschaften." 
      }
    ]
  },
  {
    type: "quiz",
    title: "Kommunikation Praxistest",
    questions: [
      {
        question: "Welche Ebene des 4-Ohren-Modells fragt: 'Was möchte ich erreichen?'",
        options: ["Sachinhalt", "Selbstkundgabe", "Beziehung", "Appell"],
        correctIndex: 3,
        explanation: "Die Appell-Ebene beinhaltet, was der Sender beim Empfänger erreichen möchte - Handlungen, Reaktionen oder Verhaltensänderungen."
      },
      {
        question: "Was besagt die Mehrabian-Regel bei emotionalen Botschaften?",
        options: ["Inhalt ist am wichtigsten", "Körpersprache dominiert mit 55%", "Stimme ist entscheidend", "Alle Faktoren sind gleich wichtig"],
        correctIndex: 1,
        explanation: "Nach Mehrabian wirken bei emotionalen Botschaften 55% Körpersprache, 38% Stimme und nur 7% Inhalt."
      },
      {
        question: "Was ist beim aktiven Zuhören am wichtigsten?",
        options: ["Schnelle Lösungen anbieten", "Paraphrasieren und nachfragen", "Eigene Erfahrungen teilen", "Schweigen vermeiden"],
        correctIndex: 1,
        explanation: "Aktives Zuhören bedeutet das Gesagte zu paraphrasieren und durch Nachfragen Verständnis zu sichern."
      },
      {
        question: "Welche Präsentationsstruktur ist empfehlenswert?",
        options: ["Nur Fakten präsentieren", "Maximum 3-5 Kernpunkte", "So viele Details wie möglich", "Ohne Struktur spontan sprechen"],
        correctIndex: 1,
        explanation: "Eine klare Struktur mit maximal 3-5 Kernpunkten hilft dem Publikum zu folgen und die Botschaft zu verstehen."
      },
      {
        question: "Was bedeutet BATNA in Verhandlungen?",
        options: ["Beste Verhandlungstaktik", "Backup-Plan bei gescheiterter Verhandlung", "Erste Verhandlungsposition", "Finales Angebot"],
        correctIndex: 1,
        explanation: "BATNA (Best Alternative to Negotiated Agreement) ist die beste Alternative, falls die Verhandlung scheitert."
      },
      {
        question: "Wie sollte Kritik kommuniziert werden?",
        options: ["Du-Botschaften verwenden", "Verhalten beschreiben, nicht bewerten", "Öffentlich vor allen", "Nur negative Punkte ansprechen"],
        correctIndex: 1,
        explanation: "Konstruktive Kritik beschreibt konkretes Verhalten objektiv, ohne die Person zu bewerten oder anzugreifen."
      },
      {
        question: "Was ist bei interkultureller Kommunikation wichtig?",
        options: ["Alle Kulturen sind gleich", "Hofstede-Dimensionen beachten", "Nur Englisch sprechen", "Eigene Kultur durchsetzen"],
        correctIndex: 1,
        explanation: "Hofstede-Dimensionen helfen kulturelle Unterschiede zu verstehen und angemessen zu kommunizieren."
      },
      {
        question: "Welche Rolle hat ein Moderator?",
        options: ["Inhaltliche Entscheidungen treffen", "Prozess neutral leiten", "Eigene Meinung durchsetzen", "Ergebnisse vorgeben"],
        correctIndex: 1,
        explanation: "Ein Moderator leitet den Prozess neutral, ohne inhaltlich zu entscheiden oder die eigene Meinung einzubringen."
      }
    ]
  },
  {
    type: "scenario",
    title: "Kommunikations-Szenarien",
    scenarios: [
      {
        title: "Schwieriges Kundengespräch",
        description: "Unzufriedener Kunde beschwert sich lautstark",
        scenario: "Ein Kunde ruft wütend an, weil die Software seit drei Tagen nicht funktioniert und wichtige Geschäftsprozesse stillstehen. Er beschuldigt Ihr Unternehmen, inkompetent zu sein und droht mit Vertragsauflösung. Wie reagieren Sie professionell?",
        choices: [
          { text: "Sofort technische Details erklären", consequence: "**Verfehlt das Ziel:** Kunde ist emotional, will erst verstanden werden, bevor er Lösungen hören kann.", isCorrect: false },
          { text: "Verständnis zeigen, aktiv zuhören, dann Lösungsweg", consequence: "**Professioneller Ansatz:** Emotion akzeptieren, Problem verstehen, strukturiert zur Lösung führen.", isCorrect: true },
          { text: "Kunde an Kollegen weiterleiten", consequence: "**Flucht:** Zeigt keine Verantwortung und frustriert den Kunden zusätzlich.", isCorrect: false },
          { text: "Gegenaggression oder Rechtfertigung", consequence: "**Eskalation:** Verschlechtert die Situation und gefährdet die Kundenbeziehung.", isCorrect: false }
        ]
      }
    ]
  },
  {
    type: "timeline",
    title: "Geschichte der Kommunikationstheorie",
    timelines: [
      {
        title: "Entwicklung der Kommunikationsmodelle",
        description: "Von Shannon-Weaver bis zur digitalen Kommunikation",
        events: [
          { year: "1948", event: "Shannon-Weaver Modell", description: "Erstes mathematisches Kommunikationsmodell mit Sender, Kanal, Empfänger" },
          { year: "1981", event: "Schulz von Thun 4-Ohren-Modell", description: "Jede Nachricht hat vier Seiten: Sach-, Selbstkundgabe-, Beziehungs- und Appellebene" },
          { year: "1967", event: "Mehrabian-Regel", description: "55% Körpersprache, 38% Stimme, 7% Inhalt bei emotionalen Botschaften" },
          { year: "1981", event: "Harvard-Verhandlungskonzept", description: "Sachbezogenes Verhandeln nach Fisher und Ury" },
          { year: "1990er", event: "Interkulturelle Kommunikation", description: "Hofstedes Kulturdimensionen und globale Geschäftskommunikation" },
          { year: "2000er", event: "Digitale Kommunikation", description: "E-Mail, Video-Calls und Social Media verändern Businesskommunikation" }
        ]
      }
    ]
  }
];