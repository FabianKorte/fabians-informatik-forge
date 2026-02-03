// Kommunikationstrainer Types - 4-Ohren-Modell nach Schulz von Thun

export interface FourEarsMessage {
  text: string;
  sachinhalt: string;      // Factual content - Was wird gesagt?
  selbstkundgabe: string;  // Self-revelation - Was gibt der Sender über sich preis?
  beziehung: string;       // Relationship - Wie steht der Sender zum Empfänger?
  appell: string;          // Appeal - Was soll der Empfänger tun/denken?
}

export type EarType = 'sachinhalt' | 'selbstkundgabe' | 'beziehung' | 'appell';

export const EAR_LABELS: Record<EarType, { name: string; question: string; color: string; icon: string }> = {
  sachinhalt: {
    name: 'Sachinhalt',
    question: 'Worüber informiert die Nachricht?',
    color: 'blue',
    icon: '📊',
  },
  selbstkundgabe: {
    name: 'Selbstkundgabe',
    question: 'Was gibt der Sender über sich preis?',
    color: 'purple',
    icon: '💭',
  },
  beziehung: {
    name: 'Beziehung',
    question: 'Wie steht der Sender zum Empfänger?',
    color: 'pink',
    icon: '🤝',
  },
  appell: {
    name: 'Appell',
    question: 'Was soll der Empfänger tun oder denken?',
    color: 'orange',
    icon: '📢',
  },
};

export interface CommunicationScenario {
  id: string;
  title: string;
  description: string;
  context: string;
  difficulty: 'leicht' | 'mittel' | 'schwer';
  points: number;
  messages: FourEarsMessage[];
  tips?: string[];
}

export interface CommunicationExercise {
  id: string;
  scenarioId: string;
  messageIndex: number;
  targetEar: EarType;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CommunicationState {
  activeTab: 'theory' | 'practice' | 'scenarios';
  currentScenario: CommunicationScenario | null;
  currentMessageIndex: number;
  currentExercise: CommunicationExercise | null;
  userAnswers: Record<string, number>;
  completedScenarios: string[];
  completedExercises: string[];
  earnedPoints: number;
  showExplanation: boolean;
}

export interface TheorySection {
  id: string;
  title: string;
  content: string;
  example?: FourEarsMessage;
}

export const THEORY_SECTIONS: TheorySection[] = [
  {
    id: 'intro',
    title: 'Das 4-Ohren-Modell',
    content: `Das Kommunikationsquadrat (auch 4-Ohren-Modell genannt) wurde von Friedemann Schulz von Thun entwickelt. Es beschreibt, dass jede Nachricht vier Aspekte enthält:

**Jede Nachricht hat vier Seiten:**
1. **Sachinhalt** – Die reine Information
2. **Selbstkundgabe** – Was der Sender über sich preisgibt
3. **Beziehung** – Wie der Sender zum Empfänger steht
4. **Appell** – Was der Sender beim Empfänger erreichen will

Sowohl der Sender als auch der Empfänger können auf verschiedenen "Ohren" senden und empfangen. Missverständnisse entstehen oft, wenn Sender und Empfänger unterschiedliche Aspekte betonen.`,
  },
  {
    id: 'sachinhalt',
    title: '1. Sachinhalt (Das Sachohr)',
    content: `Der **Sachinhalt** bezieht sich auf die reine Information, die vermittelt wird – die Fakten, Daten und Sachverhalte.

**Frage:** Worüber informiert die Nachricht?

**Beispiel:** "Die Ampel ist grün."
- Sachinhalt: Die Ampel zeigt gerade grünes Licht.

**Typische Probleme:**
- Zu starke Fokussierung auf den Sachinhalt kann dazu führen, dass emotionale Aspekte übersehen werden
- Im beruflichen Kontext oft überbewertet`,
    example: {
      text: 'Das Meeting beginnt um 14 Uhr.',
      sachinhalt: 'Das Meeting ist für 14 Uhr angesetzt.',
      selbstkundgabe: 'Ich bin gut informiert über den Zeitplan.',
      beziehung: 'Ich informiere dich als Kollegen.',
      appell: 'Sei pünktlich um 14 Uhr da.',
    },
  },
  {
    id: 'selbstkundgabe',
    title: '2. Selbstkundgabe (Das Selbstkundgabe-Ohr)',
    content: `Die **Selbstkundgabe** enthält Informationen über den Sender selbst – seine Gefühle, Werte, Bedürfnisse und seine Persönlichkeit.

**Frage:** Was gibt der Sender über sich selbst preis?

**Beispiel:** "Die Ampel ist grün."
- Selbstkundgabe: Ich bin aufmerksam / Ich habe es eilig.

**Typische Probleme:**
- Manche Menschen hören alles auf dem Selbstkundgabe-Ohr und beziehen alles auf sich
- Wichtig: Nicht alles ist eine persönliche Aussage über den Empfänger`,
    example: {
      text: 'Ich bin heute wirklich müde.',
      sachinhalt: 'Mein Energielevel ist niedrig.',
      selbstkundgabe: 'Ich fühle mich erschöpft und brauche vielleicht Ruhe.',
      beziehung: 'Ich vertraue dir genug, um meine Schwäche zu zeigen.',
      appell: 'Nimm bitte Rücksicht auf mich.',
    },
  },
  {
    id: 'beziehung',
    title: '3. Beziehung (Das Beziehungsohr)',
    content: `Die **Beziehungsebene** zeigt, wie der Sender zum Empfänger steht und was er von ihm hält.

**Frage:** Wie steht der Sender zum Empfänger?

**Beispiel:** "Die Ampel ist grün."
- Beziehung: Du brauchst meine Hilfe / Du bist unaufmerksam.

**Typische Probleme:**
- Das Beziehungsohr ist sehr empfindlich
- Kritik wird oft als persönlicher Angriff interpretiert
- Besonders in Konfliktsituationen dominant`,
    example: {
      text: 'Du hast das gut gemacht.',
      sachinhalt: 'Die Aufgabe wurde erfolgreich erledigt.',
      selbstkundgabe: 'Ich bin zufrieden mit deiner Arbeit.',
      beziehung: 'Ich schätze dich und deine Fähigkeiten.',
      appell: 'Mach so weiter.',
    },
  },
  {
    id: 'appell',
    title: '4. Appell (Das Appellohr)',
    content: `Der **Appell** beschreibt, was der Sender beim Empfänger erreichen will – welche Handlung oder Reaktion er sich wünscht.

**Frage:** Was soll der Empfänger tun, denken oder fühlen?

**Beispiel:** "Die Ampel ist grün."
- Appell: Fahr los! Gib Gas!

**Typische Probleme:**
- Versteckte Appelle führen zu Manipulation
- Manche Menschen hören überall Aufforderungen
- Klare Kommunikation: Appelle offen aussprechen`,
    example: {
      text: 'Es ist schon spät.',
      sachinhalt: 'Die Uhrzeit ist fortgeschritten.',
      selbstkundgabe: 'Ich bin müde / Ich möchte gehen.',
      beziehung: 'Ich erwarte, dass du auf meine Bedürfnisse achtest.',
      appell: 'Lass uns aufbrechen / Beende das Gespräch.',
    },
  },
  {
    id: 'praxis',
    title: 'Tipps für die Praxis',
    content: `**Für bessere Kommunikation:**

1. **Bewusst senden:** Überlege, welche Botschaft du auf allen vier Ebenen sendest
2. **Aktiv zuhören:** Frage nach, wenn du unsicher bist, wie etwas gemeint ist
3. **Metakommunikation:** Sprich über die Kommunikation selbst ("Ich höre da einen Vorwurf...")
4. **Ich-Botschaften:** Formuliere Aussagen aus deiner Perspektive

**Im beruflichen Kontext:**
- E-Mails sind besonders anfällig für Missverständnisse (fehlende nonverbale Signale)
- Kritikgespräche: Alle vier Ebenen bewusst gestalten
- Meetings: Sachebene betonen, aber Beziehungsebene nicht vergessen`,
  },
];
