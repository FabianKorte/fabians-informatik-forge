import { LearnModule } from "../../types/learn";

export const projektmanagementContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "Projektmanagement Grundlagen - IHK Prüfungswissen",
    cards: [
      { 
        front: "Projektdefinition nach DIN 69901", 
        back: "**Definition:** Vorhaben mit definiertem Anfang und Ende, einmalig, zeitlich begrenzt, mit spezifischen Zielen und begrenzten Ressourcen. **IHK-Abgrenzung:** Projekt vs. Prozess (wiederkehrend) vs. Programm (mehrere Projekte). **Merkmale:** Neuartigkeit, Komplexität, Risiko, Interdisziplinarität. **Beispiele:** Software-Entwicklung, Unternehmenseinführung, Event-Organisation. **Projekt-Dreieck:** Zeit, Kosten, Qualität/Leistung." 
      },
      { 
        front: "SMART-Ziele im Detail", 
        back: "**Specific (Spezifisch):** Klar und eindeutig formuliert, was genau erreicht werden soll. **Measurable (Messbar):** Quantifizierbare Kriterien zur Erfolgsmessung. **Achievable (Erreichbar):** Realistisch mit verfügbaren Ressourcen. **Relevant (Relevant):** Wichtig für Organisation/Stakeholder. **Time-bound (Terminiert):** Klare Deadlines. **IHK-Beispiel:** 'Umsatz um 15% bis 31.12.2024 steigern durch Online-Shop-Launch' statt 'Mehr Umsatz generieren'." 
      },
      { 
        front: "Projektphasen im Überblick", 
        back: "**Initiierung:** Projektauftrag, Stakeholder-Analyse, Machbarkeitsstudie. **Planung:** Terminplanung, Ressourcenplanung, Risikoanalyse, Kommunikationsplan. **Durchführung:** Aufgaben ausführen, Team führen, Fortschritt überwachen. **Überwachung:** Controlling, Qualitätssicherung, Change Management. **Abschluss:** Projektabnahme, Dokumentation, Lessons Learned. **IHK-Meilensteine:** Go/No-Go-Entscheidungen zwischen Phasen." 
      },
      { 
        front: "Agile vs. Wasserfallmodell", 
        back: "**Wasserfall:** Sequenzielle Phasen, umfassende Dokumentation, feste Anforderungen. **Vorteile:** Planbarkeit, klare Meilensteine. **Nachteile:** Inflexibel, späte Fehlererkennung. **Agile:** Iterative Entwicklung, frühe Lieferung, Anpassungsfähigkeit. **Scrum-Rollen:** Product Owner, Scrum Master, Development Team. **IHK-Entscheidung:** Wasserfall für stabile Anforderungen, Agile für dynamische Projekte." 
      },
      { 
        front: "Stakeholder-Management", 
        back: "**Definition:** Alle Personen/Gruppen, die Einfluss auf Projekt haben oder davon betroffen sind. **Analyse:** Power/Interest-Grid (hoch/niedrig Einfluss vs. Interesse). **Kategorien:** Unterstützer, Neutrale, Kritiker, Promotoren, Opponenten. **IHK-Strategien:** Manage closely (hoher Einfluss + Interesse), Keep satisfied (hoher Einfluss), Keep informed (hohes Interesse). **Kommunikation:** Regelmäßige Updates, individuelle Ansprache." 
      },
      { 
        front: "Risikomanagement SWOT", 
        back: "**Risikoidentifikation:** Brainstorming, Checklisten, Expertenurteile. **Risikobewertung:** Eintrittswahrscheinlichkeit × Auswirkung = Risikopriority. **Risikostrategien:** Vermeiden, Vermindern, Übertragen (Versicherung), Akzeptieren. **SWOT-Analyse:** Strengths, Weaknesses (intern), Opportunities, Threats (extern). **IHK-Dokumentation:** Risikoregister mit Maßnahmen und Verantwortlichen. **Kontinuierlich:** Risiken regelmäßig neu bewerten." 
      },
      { 
        front: "Projektorganisation und -rollen", 
        back: "**Projektleiter:** Gesamtverantwortung, Planung, Controlling, Kommunikation. **Projektteam:** Fachexperten für Umsetzung. **Projektauftraggeber:** Entscheidungsbefugnis, Budget-Verantwortung. **Lenkungsausschuss:** Strategische Entscheidungen, Eskalation. **IHK-Organisationsformen:** Matrix (funktional + projektorientiert), projektbezogen, stablinienbezogen. **RACI-Matrix:** Responsible, Accountable, Consulted, Informed." 
      },
      { 
        front: "Projektcontrolling KPIs", 
        back: "**Earned Value Management:** Planned Value (PV), Earned Value (EV), Actual Cost (AC). **Schedule Performance Index (SPI):** EV/PV - Termineffizienz. **Cost Performance Index (CPI):** EV/AC - Kosteneffizienz. **IHK-Ampelsystem:** Grün (Plan), Gelb (Abweichung), Rot (kritisch). **Burn-Down-Chart:** Verbleibendes Work vs. Zeit in Agilen Projekten. **Meilenstein-Trendanalyse:** Verschiebung von Meilensteinen über Zeit." 
      },
      { 
        front: "Kommunikation im Projekt", 
        back: "**Kommunikationsplan:** Wer, Was, Wann, Wie, Warum. **Meetings:** Kick-off, Status-Meetings, Reviews, Retrospektiven. **Berichtswesen:** Dashboard, Status-Reports, Eskalationsprozesse. **IHK-Kommunikationsformen:** Formal/Informal, Verbal/Schriftlich, Interne/Externe. **Konfliktsituationen:** Früh erkennen, konstruktiv lösen, Mediation. **Tools:** Kollaborationsplattformen, Projektmanagement-Software." 
      },
      { 
        front: "Change Management", 
        back: "**Definition:** Strukturierter Ansatz zur Veränderung von Organisationen, Prozessen oder Systemen. **Kotter's 8-Stufen:** Dringlichkeit schaffen, Koalition bilden, Vision entwickeln, kommunizieren, befähigen, Quick Wins, konsolidieren, verankern. **Widerstand:** Ursachen verstehen (Angst, Unwissen), transparent kommunizieren, Betroffene einbeziehen. **IHK-Erfolgsfaktoren:** Führungsunterstützung, Kommunikation, Training, kontinuierliche Verbesserung." 
      }
    ]
  },
  {
    type: "quiz",
    title: "Projektmanagement Vertiefung - IHK Praxis",
    questions: [
      {
        question: "Was ist KEIN Merkmal eines Projekts nach DIN 69901?",
        options: ["Einmaligkeit", "Zeitliche Begrenzung", "Wiederkehrende Ausführung", "Spezifische Ziele"],
        correctIndex: 2,
        explanation: "Wiederkehrende Ausführung ist ein Merkmal von Prozessen, nicht von Projekten. Projekte sind per Definition einmalig."
      },
      {
        question: "Welche Aussage über SMART-Ziele ist korrekt?",
        options: ["Sie müssen immer quantitativ sein", "Sie helfen bei der Erfolgsmessung", "Sie sind nur für große Projekte relevant", "Sie ersetzen die Projektplanung"],
        correctIndex: 1,
        explanation: "SMART-Ziele definieren messbare Kriterien und helfen dabei, den Projekterfolg objektiv zu bewerten."
      },
      {
        question: "Wann ist das Wasserfallmodell geeigneter als Agile Methoden?",
        options: ["Bei unklaren Anforderungen", "Bei stabilen, gut definierten Anforderungen", "Bei schnell ändernden Märkten", "Bei innovativen Produkten"],
        correctIndex: 1,
        explanation: "Das Wasserfallmodell eignet sich besonders für Projekte mit stabilen, klar definierten Anforderungen und geringen Änderungswahrscheinlichkeiten."
      },
      {
        question: "Was bedeutet ein CPI (Cost Performance Index) von 0,8?",
        options: ["Projekt ist 20% über Budget", "Projekt ist 20% unter Budget", "Projekt läuft genau nach Plan", "Projekt ist 80% fertig"],
        correctIndex: 0,
        explanation: "CPI = Earned Value / Actual Cost. Ein Wert unter 1,0 bedeutet Kostenüberschreitung. 0,8 = 20% über Budget."
      },
      {
        question: "Welche Stakeholder sollten 'Manage closely' behandelt werden?",
        options: ["Niedriger Einfluss, niedriges Interesse", "Hoher Einfluss, niedriges Interesse", "Niedriger Einfluss, hohes Interesse", "Hoher Einfluss, hohes Interesse"],
        correctIndex: 3,
        explanation: "Stakeholder mit hohem Einfluss und hohem Interesse müssen eng gemanagt werden, da sie das Projekt stark beeinflussen können."
      },
      {
        question: "Was ist der erste Schritt im Risikomanagement?",
        options: ["Risikoübertragung", "Risikoidentifikation", "Risikobewertung", "Risikoüberwachung"],
        correctIndex: 1,
        explanation: "Bevor Risiken bewertet oder behandelt werden können, müssen sie zunächst systematisch identifiziert werden."
      },
      {
        question: "Welche Rolle hat der Product Owner in Scrum?",
        options: ["Technische Umsetzung", "Team-Coaching", "Anforderungsmanagement und Priorisierung", "Projektcontrolling"],
        correctIndex: 2,
        explanation: "Der Product Owner ist verantwortlich für das Product Backlog, definiert Anforderungen und priorisiert Features."
      },
      {
        question: "Was zeigt eine Meilenstein-Trendanalyse?",
        options: ["Kostenentwicklung", "Terminverschiebungen über Zeit", "Qualitätstrends", "Teamperformance"],
        correctIndex: 1,
        explanation: "Die Meilenstein-Trendanalyse visualisiert, wie sich geplante Meilenstein-Termine über die Projektlaufzeit verschieben."
      }
    ]
  },
  {
    type: "matching",
    title: "PM-Begriffe und Definitionen",
    pairs: [
      { left: "Sprint", right: "Zeitlich begrenzte Entwicklungsphase in Scrum" },
      { left: "Gantt-Chart", right: "Balkendiagramm zur Terminplanung" },
      { left: "WBS", right: "Work Breakdown Structure - Projektstrukturplan" },
      { left: "Critical Path", right: "Längster Weg durch das Projekt" },
      { left: "MVP", right: "Minimum Viable Product" },
      { left: "Burndown Chart", right: "Visualisierung des verbleibenden Aufwands" },
      { left: "Retrospektive", right: "Reflexion und Verbesserung am Sprint-Ende" },
      { left: "Baseline", right: "Ursprünglicher genehmigte Projektplan" }
    ]
  },
  {
    type: "scenario",
    title: "Projektmanagement Szenarien - IHK Praxis",
    scenarios: [
      {
        title: "Projekt in der Krise",
        description: "Ein IT-Projekt läuft aus dem Ruder - Lösungsansätze finden",
        scenario: "Das Software-Entwicklungsprojekt ist 3 Monate hinter dem Zeitplan, 40% über Budget und das Team ist demotiviert. Der Auftraggeber droht mit Vertragsauflösung. Die ursprünglichen Anforderungen haben sich mehrfach geändert, aber es gibt keine ordentliche Change-Kontrolle. Was ist der beste erste Schritt?",
        choices: [
          { text: "Mehr Entwickler einstellen", consequence: "**Risiko:** Brooks' Law - 'Adding people to a late project makes it later'. Neue Mitarbeiter brauchen Einarbeitung.", isCorrect: false },
          { text: "Projektaudit und Stakeholder-Meeting einberufen", consequence: "**Richtige Priorisierung:** Erst Situation analysieren, dann mit allen Beteiligten Lösungen erarbeiten.", isCorrect: true },
          { text: "Alle Features streichen und Minimum-Version liefern", consequence: "**Zu drastisch:** Ohne Abstimmung könnte das die Kundenbeziehung verschlechtern.", isCorrect: false },
          { text: "Project Manager austauschen", consequence: "**Symptom-Behandlung:** Löst die Grundprobleme nicht und bringt zusätzliche Instabilität.", isCorrect: false }
        ]
      },
      {
        title: "Agile Transformation",
        description: "Traditionelles Unternehmen möchte auf Agile umstellen",
        scenario: "Ein traditionelles Softwareunternehmen mit Wasserfall-Prozessen möchte auf Agile/Scrum umstellen. Die Entwickler sind interessiert, aber das Management ist skeptisch wegen weniger Planbarkeit. Die Kunden fordern schnellere Lieferzyklen. Wie gehst du vor?",
        choices: [
          { text: "Sofort alle Projekte auf Scrum umstellen", consequence: "**Zu riskant:** Big Bang-Ansatz führt oft zu Chaos und Widerstand.", isCorrect: false },
          { text: "Pilot-Projekt starten und schrittweise ausweiten", consequence: "**Beste Strategie:** Lernen durch Erfahrung, Erfolge demonstrieren, Risiken minimieren.", isCorrect: true },
          { text: "Externe Scrum-Beratung beauftragen", consequence: "**Kann helfen:** Aber ohne interne Überzeugung und schrittweise Einführung oft nicht nachhaltig.", isCorrect: false },
          { text: "Erstmal nur die Terminologie ändern", consequence: "**Oberflächlich:** Agile ist mehr als neue Begriffe - Mindset und Kultur müssen sich ändern.", isCorrect: false }
        ]
      }
    ]
  },
  {
    type: "timeline",
    title: "Geschichte des Projektmanagements",
    timelines: [
      {
        title: "Entwicklung der PM-Methoden",
        description: "Von traditionellen zu agilen Ansätzen",
        events: [
          { year: "1950er", event: "CPM und PERT entstehen", description: "Critical Path Method und Program Evaluation Review Technique für komplexe Projekte wie Apollo-Programm" },
          { year: "1969", event: "PMI gegründet", description: "Project Management Institute etabliert PM als professionelle Disziplin" },
          { year: "1987", event: "PMBOK erste Ausgabe", description: "Project Management Body of Knowledge standardisiert PM-Praktiken" },
          { year: "2001", event: "Agiles Manifest", description: "17 Software-Entwickler definieren agile Werte und Prinzipien" },
          { year: "2009", event: "Scrum Guide veröffentlicht", description: "Offizielle Definition des Scrum-Frameworks" },
          { year: "2017", event: "PMI Agile Practice Guide", description: "Integration agiler Methoden in traditionelle PM-Standards" }
        ]
      }
    ]
  },
  {
    type: "dragdrop",
    title: "Scrum-Artefakte und -Events",
    games: [
      {
        title: "Scrum-Framework einordnen",
        description: "Ordne Scrum-Elemente den richtigen Kategorien zu",
        items: [
          { id: "artifact1", content: "Product Backlog", category: "Artefakte" },
          { id: "artifact2", content: "Sprint Backlog", category: "Artefakte" },
          { id: "artifact3", content: "Increment", category: "Artefakte" },
          { id: "event1", content: "Sprint Planning", category: "Events" },
          { id: "event2", content: "Daily Scrum", category: "Events" },
          { id: "event3", content: "Sprint Review", category: "Events" },
          { id: "event4", content: "Sprint Retrospective", category: "Events" },
          { id: "role1", content: "Product Owner", category: "Rollen" },
          { id: "role2", content: "Scrum Master", category: "Rollen" },
          { id: "role3", content: "Development Team", category: "Rollen" }
        ],
        categories: ["Artefakte", "Events", "Rollen"]
      }
    ]
  }
];