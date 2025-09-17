import { LearnModule } from "../../types/learn";

export const pruefungsvorbereitungContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "IHK Prüfungsstrategien - Erfolgreich durch die Abschlussprüfung",
    cards: [
      { front: "Prüfungsaufbau Fachinformatiker", back: "**Teil 1 (35%):** Einrichtung eines IT-gestützten Arbeitsplatzes - nach 18 Monaten Ausbildung. **Teil 2 (65%):** Schriftliche Prüfung (Kernqualifikation + Fachrichtung) + Projektarbeit + Fachgespräch. **IHK-Gewichtung:** WiSo 10%, Ganzheitliche Aufgaben I+II je 10%, Fachrichtung 25%, Projektarbeit 25%, Dokumentation 5%, Fachgespräch 15%. **Bestehen:** Mindestens 50% in allen Teilen, keine Note unter 30%." },
      { front: "Zeitmanagement in der schriftlichen Prüfung", back: "**Strategie:** Erst alle Aufgaben durchlesen (10 Min), leichte Aufgaben zuerst (Quick Wins), schwere Aufgaben am Ende. **Zeitaufteilung:** Pro Punkt ca. 1-2 Minuten, bei 100-Punkte-Prüfung → 90-120 Min effektive Arbeitszeit. **IHK-Tipp:** 20-30 Min für Durchsicht einplanen, unklare Aufgaben markieren, zurückkommen. **Pausen:** Kurze mentale Pausen alle 30 Min, tief durchatmen, Konzentration halten." },
      { front: "Projektdokumentation - Struktur & Bewertung", back: "**Umfang:** 10-15 Seiten (ohne Anhang), professionelles Layout. **Gliederung:** 1. Projektumfeld, 2. Projektplanung, 3. Projektdurchführung, 4. Projektabschluss. **IHK-Kriterien:** Fachliche Kompetenz (40%), Methodenkompetenz (30%), Soziale Kompetenz (15%), Rechtliche Aspekte (15%). **Formalia:** Eigenständigkeitserklärung, Quellenangaben, Firmen-/Kunden-Anonymisierung, PDF-Format, termingerecht abgegeben." },
      { front: "Fachgespräch - Vorbereitung & Durchführung", back: "**Dauer:** 30 Minuten, davon ca. 15 Min Projektpräsentation, 15 Min Fachfragen. **Aufbau:** Kurze Begrüßung → Projektvorstellung → Vertiefungsfragen → Fachliche Diskussion. **IHK-Bewertung:** Fachkompetenz, Präsentationsfähigkeit, Argumentationsfähigkeit, Umgang mit kritischen Fragen. **Vorbereitung:** Projekt in 15 Min präsentieren können, häufige Fragen antizipieren, technische Tiefe zeigen, ruhig und selbstsicher auftreten." },
      { front: "Lerntechniken für IT-Inhalte", back: "**Aktives Lernen:** Zusammenfassungen schreiben, Mindmaps erstellen, anderen erklären (Feynman-Technik). **Spaced Repetition:** Wiederholung nach 1 Tag, 3 Tagen, 1 Woche, 1 Monat. **Praxis:** Code schreiben, Labs durchführen, virtuelle Umgebungen aufsetzen. **IHK-Simulation:** Alte Prüfungen unter Zeitdruck bearbeiten, Fachgespräch mit Kollegen/Ausbildern üben. **Pausen:** Pomodoro-Technik (25 Min lernen, 5 Min Pause), ausreichend Schlaf, gesunde Ernährung." },
      { front: "Häufige Prüfungsfehler vermeiden", back: "**Aufgaben nicht richtig lesen:** Vollständig lesen, Schlüsselwörter markieren, nach Teilaufgaben suchen. **Zeitnot:** Realistische Zeitplanung, nicht bei schweren Aufgaben hängenbleiben. **Oberflächliche Antworten:** Fragen mit 'warum' und 'wie' detailliert beantworten, Beispiele nennen. **IHK-Stolperfallen:** Rechtschreibung/Grammatik (besonders bei WiSo), fehlende Begründungen, ungenaue Fachbegriffe. **Nervosität:** Entspannungstechniken, positive Selbstgespräche, gute Vorbereitung schafft Selbstvertrauen." }
    ]
  },
  {
    type: "quiz",
    title: "Mock-Test: IHK Abschlussprüfung Simulation",
    questions: [
      {
        question: "Welche Gewichtung hat die Projektarbeit in der IHK-Abschlussprüfung Teil 2?",
        options: ["15%", "20%", "25%", "30%"],
        correctIndex: 2,
        explanation: "Die Projektarbeit (einschließlich Dokumentation und Fachgespräch) hat eine Gewichtung von 25% in Teil 2 der Abschlussprüfung."
      },
      {
        question: "Wie lange dauert das Fachgespräch bei der IHK-Prüfung?",
        options: ["20 Minuten", "30 Minuten", "45 Minuten", "60 Minuten"],
        correctIndex: 1,
        explanation: "Das Fachgespräch dauert 30 Minuten und umfasst sowohl die Projektpräsentation als auch vertiefende Fachfragen."
      },
      {
        question: "Was ist bei der Projektdokumentation besonders wichtig?",
        options: ["Möglichst viele Seiten", "Echte Firmendaten verwenden", "Anonymisierung von Kunden-/Firmendaten", "Nur technische Aspekte beschreiben"],
        correctIndex: 2,
        explanation: "Die Anonymisierung von Kunden- und Firmendaten ist aus datenschutzrechtlichen Gründen zwingend erforderlich."
      },
      {
        question: "Welche Note ist mindestens erforderlich, um die IHK-Prüfung zu bestehen?",
        options: ["30%", "40%", "50%", "60%"],
        correctIndex: 2,
        explanation: "Für das Bestehen der IHK-Prüfung sind mindestens 50% der Gesamtpunkte erforderlich, wobei kein Prüfungsbereich unter 30% liegen darf."
      },
      {
        question: "Wann findet Teil 1 der gestreckten Abschlussprüfung statt?",
        options: ["Nach 12 Monaten", "Nach 18 Monaten", "Nach 24 Monaten", "Am Ende der Ausbildung"],
        correctIndex: 1,
        explanation: "Teil 1 der gestreckten Abschlussprüfung findet nach 18 Monaten Ausbildungszeit statt und hat 35% Gewichtung."
      }
    ]
  },
  {
    type: "scenario",
    title: "Prüfungssituationen erfolgreich meistern",
    scenarios: [
      {
        title: "Zeitdruck in der schriftlichen Prüfung",
        description: "Du hast noch 30 Minuten Zeit, aber 40 Punkte zu bearbeiten.",
        scenario: "Wie gehst du vor?",
        choices: [
          { text: "Alle Aufgaben schnell durcharbeiten", consequence: "Risiko für Flüchtigkeitsfehler steigt, Qualität leidet.", isCorrect: false },
          { text: "Leichte Aufgaben zuerst, schwere überspringen", consequence: "Richtig: Sichere Punkte sammeln, dann Rest versuchen.", isCorrect: true },
          { text: "Bei aktueller Aufgabe bleiben bis fertig", consequence: "Zeitverschwendung, andere lösbare Aufgaben bleiben unbearbeitet.", isCorrect: false },
          { text: "Aufgeben und früher gehen", consequence: "Verschenkt Chancen auf weitere Punkte.", isCorrect: false }
        ]
      },
      {
        title: "Schwere Frage im Fachgespräch",
        description: "Der Prüfer stellt eine Frage, die du nicht sofort beantworten kannst.",
        scenario: "Wie reagierst du?",
        choices: [
          { text: "Ehrlich sagen: 'Das weiß ich nicht'", consequence: "Ehrlichkeit wird geschätzt, aber zeige trotzdem Denkansätze.", isCorrect: false },
          { text: "Nachfragen und strukturiert an die Antwort herangehen", consequence: "Richtig: Zeigt methodisches Vorgehen und Problemlösungskompetenz.", isCorrect: true },
          { text: "Etwas erfinden, das plausibel klingt", consequence: "Gefährlich: Prüfer merken das meist und bewerten es negativ.", isCorrect: false },
          { text: "Thema wechseln und ablenken", consequence: "Wirkt unprofessionell und ausweichend.", isCorrect: false }
        ]
      }
    ]
  },
  {
    type: "timeline",
    title: "Prüfungsvorbereitung - Optimaler Zeitplan",
    timelines: [
      {
        title: "12-Wochen Lernplan bis zur Abschlussprüfung",
        description: "Systematische Vorbereitung für maximalen Prüfungserfolg",
        events: [
          { year: "Woche 1-2", event: "Bestandsaufnahme", description: "Schwächen identifizieren, Lernplan erstellen, Material sammeln." },
          { year: "Woche 3-6", event: "Grundlagen wiederholen", description: "Fachbereiche systematisch durcharbeiten, Lücken schließen." },
          { year: "Woche 7-8", event: "Projektdokumentation", description: "Projekt dokumentieren, Präsentation vorbereiten, Feedback einholen." },
          { year: "Woche 9-10", event: "Praxis & Übungen", description: "Alte Prüfungen bearbeiten, Fachgespräch simulieren, Schwächen nacharbeiten." },
          { year: "Woche 11", event: "Intensivwiederholung", description: "Kernthemen wiederholen, letzte Fragen klären, Entspannungstechniken üben." },
          { year: "Woche 12", event: "Prüfungswoche", description: "Minimal lernen, gut schlafen, Material für Prüfung vorbereiten, positiv denken." }
        ]
      }
    ]
  },
  {
    type: "matching",
    title: "Prüfungsteile und Gewichtungen",
    pairs: [
      { left: "WiSo", right: "10% der Gesamtnote" },
      { left: "Ganzheitliche Aufgabe I", right: "10% der Gesamtnote" },
      { left: "Ganzheitliche Aufgabe II", right: "10% der Gesamtnote" },
      { left: "Fachrichtungsspezifische Aufgaben", right: "25% der Gesamtnote" },
      { left: "Projektarbeit + Dokumentation", right: "30% der Gesamtnote" },
      { left: "Fachgespräch", right: "15% der Gesamtnote" }
    ]
  },
  {
    type: "dragdrop",
    title: "Optimale Lernreihenfolge",
    games: [
      {
        title: "Sortiere die Lernphasen in der richtigen Reihenfolge",
        description: "Ordne die Phasen für eine optimale Prüfungsvorbereitung",
        categories: ["Phase 1", "Phase 2", "Phase 3", "Phase 4"],
        items: [
          { id: "p1", content: "Schwächen analysieren", category: "Phase 1" },
          { id: "p2", content: "Grundlagen wiederholen", category: "Phase 2" },
          { id: "p3", content: "Praxisübungen & Mock-Tests", category: "Phase 3" },
          { id: "p4", content: "Intensivwiederholung & Entspannung", category: "Phase 4" }
        ]
      }
    ]
  }
];