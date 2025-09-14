import { LearnModule } from "../../types/learn";

export const qualitaetsmanagementContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "Qualitätsmanagement Grundlagen - IHK Prüfungswissen",
    cards: [
      { 
        front: "ISO 9001:2015 Grundprinzipien", 
        back: "**7 QM-Grundsätze:** Kundenorientierung, Führung, Einbeziehung von Personen, Prozessorientierter Ansatz, Verbesserung, Evidenzbasierte Entscheidungsfindung, Beziehungsmanagement. **IHK-Bedeutung:** Internationaler Standard für QM-Systeme, Zertifizierungsgrundlage. **PDCA-Zyklus:** Plan-Do-Check-Act für kontinuierliche Verbesserung. **Risikoorientierter Ansatz:** Präventive Maßnahmen statt nachträgliche Korrekturen." 
      },
      { 
        front: "Qualitätsbegriffe nach DIN EN ISO 9000", 
        back: "**Qualität:** Grad der Erfüllung von Anforderungen durch inhärente Merkmale. **Qualitätspolitik:** Allgemeine Absichten und Ausrichtung zur Qualität. **Qualitätsziele:** SMART formulierte, messbare Ziele. **Qualitätsplanung:** Festlegung von QM-Zielen und Prozessen. **IHK-Qualitätssicherung:** Präventive Maßnahmen zur Fehlerverhütung. **Qualitätslenkung:** Operative Tätigkeiten zur Erfüllung von Qualitätsanforderungen." 
      },
      { 
        front: "Fehlerkostenmodell", 
        back: "**Fehlerverhütungskosten:** Schulungen, Prozessplanung, Qualitätssystem-Aufbau. **Prüfkosten:** Eingangsprüfung, Zwischenprüfung, Endprüfung, Audits. **Interne Fehlerkosten:** Nacharbeit, Ausschuss, Stillstandszeiten. **Externe Fehlerkosten:** Reklamationen, Garantie, Imageschaden, Kundenabwanderung. **IHK-Regel:** 1:10:100 - 1€ Prävention spart 10€ interne und 100€ externe Fehlerkosten. **Optimum:** Balance zwischen Präventions-/Prüfkosten und Fehlerkosten." 
      },
      { 
        front: "Statistische Prozesslenkung (SPC)", 
        back: "**Grundidee:** Prozessüberwachung durch statistische Methoden statt 100%-Prüfung. **Qualitätsregelkarten:** Kontrollgrenzen (UCL/LCL) zur Früherkennung von Prozessabweichungen. **Cp/Cpk-Werte:** Prozessfähigkeitsindizes - Cp ≥ 1,33 als Mindestanforderung. **IHK-Vorteile:** Frühe Fehlererkennung, Kostenreduktion, Prozessverständnis. **Stichprobenprüfung:** AQL (Acceptable Quality Level) für Annahme-/Rückweisungsentscheidungen." 
      },
      { 
        front: "Lean Management und Verschwendung", 
        back: "**7 Arten der Verschwendung (Muda):** Überproduktion, Warten, Transport, Überbearbeitung, Bestände, Bewegung, Fehler. **5S-Methode:** Seiri (Sortieren), Seiton (Systematisieren), Seiso (Säubern), Seiketsu (Standardisieren), Shitsuke (Selbstdisziplin). **IHK-Prinzipien:** Kontinuierlicher Fluss, Pull-System, Perfektion anstreben. **Kaizen:** Kontinuierliche Verbesserung in kleinen Schritten. **Value Stream Mapping:** Wertstromanalyse zur Verschwendungsidentifikation." 
      },
      { 
        front: "Six Sigma DMAIC-Methodik", 
        back: "**Define:** Problem definieren, Projektcharta, Voice of Customer. **Measure:** Aktuelle Leistung messen, Datensammlung, Messsystem-Analyse. **Analyze:** Ursachenanalyse, statistische Auswertung, Hypothesentests. **Improve:** Lösungen entwickeln und implementieren, Pilotversuche. **Control:** Überwachung und Nachhaltigkeit sicherstellen. **IHK-Ziel:** 3,4 DPMO (Defects Per Million Opportunities). **Rollen:** Champion, Black Belt, Green Belt, Yellow Belt." 
      },
      { 
        front: "Auditarten und -durchführung", 
        back: "**System-Audit:** Bewertung des gesamten QM-Systems gegen Standards. **Prozess-Audit:** Einzelne Prozesse auf Wirksamkeit prüfen. **Produkt-Audit:** Endprodukt gegen Spezifikationen. **IHK-Auditoren:** Intern (eigene Organisation), extern (Zertifizierung), Lieferanten-Audits. **Audit-Phasen:** Vorbereitung, Durchführung, Berichterstattung, Nachverfolgung. **Audit-Techniken:** Interviews, Beobachtung, Dokumentenprüfung, Stichproben." 
      },
      { 
        front: "Kundenzufriedenheitsmessung", 
        back: "**Direkte Methoden:** Kundenbefragungen, Interviews, Focus Groups, Mystery Shopping. **Indirekte Indikatoren:** Reklamationsrate, Wiederkaufrate, Weiterempfehlungsrate, Kundenabwanderung. **Kennzahlen:** Net Promoter Score (NPS), Customer Satisfaction Index (CSI), Customer Effort Score (CES). **IHK-Auswertung:** Trend-Analysen, Benchmarking, Ableitung von Verbesserungsmaßnahmen. **Closed Loop:** Feedback → Analyse → Maßnahmen → Kommunikation an Kunden." 
      },
      { 
        front: "Beschwerdemanagement", 
        back: "**Beschwerdeannahme:** Alle Kanäle (Telefon, E-Mail, Web, persönlich), barrierefreie Zugänglichkeit. **Beschwerdebearbeitung:** Schnelle Reaktion, systematische Bearbeitung, Lösungsorientierung. **Beschwerdeauswertung:** Kategorisierung, Ursachenanalyse, Präventivmaßnahmen. **IHK-Chancen:** Kundenrückgewinnung, Prozessverbesserung, Innovationsimpulse. **KVP-Integration:** Beschwerden als Input für kontinuierliche Verbesserung nutzen." 
      },
      { 
        front: "Qualität in der Softwareentwicklung", 
        back: "**Qualitätsmerkmale ISO 25010:** Funktionalität, Performance, Kompatibilität, Usability, Zuverlässigkeit, Sicherheit, Wartbarkeit, Portabilität. **Testing-Pyramide:** Unit Tests, Integration Tests, System Tests, Acceptance Tests. **Code-Quality:** Code Reviews, Static Analysis, Coding Standards, Technical Debt Management. **IHK-Methoden:** Test-Driven Development (TDD), Continuous Integration/Deployment (CI/CD), Pair Programming. **Metriken:** Code Coverage, Cyclomatic Complexity, Bug-Escape-Rate." 
      }
    ]
  },
  {
    type: "quiz",
    title: "Qualitätsmanagement Vertiefung - IHK Praxis", 
    questions: [
      {
        question: "Was besagt die 1:10:100-Regel der Fehlerkostentheorie?",
        options: ["Verhältnis verschiedener Fehlerarten", "Kosten für Prävention : interne : externe Fehler", "Anzahl Fehler in verschiedenen Phasen", "Zeitaufwand für Fehlerbehebung"],
        correctIndex: 1,
        explanation: "Die 1:10:100-Regel besagt, dass 1€ für Prävention 10€ interne Fehlerkosten und 100€ externe Fehlerkosten spart."
      },
      {
        question: "Welcher Cp-Wert gilt als Mindestanforderung für einen fähigen Prozess?",
        options: ["1,0", "1,33", "2,0", "0,67"],
        correctIndex: 1,
        explanation: "Ein Cp-Wert von mindestens 1,33 gilt als Anforderung für einen prozessfähigen, stabilen Herstellungsprozess."
      },
      {
        question: "Was ist KEIN Grundsatz der ISO 9001:2015?",
        options: ["Kundenorientierung", "Gewinnmaximierung", "Evidenzbasierte Entscheidungen", "Kontinuierliche Verbesserung"],
        correctIndex: 1,
        explanation: "Gewinnmaximierung ist kein QM-Grundsatz der ISO 9001. Die 7 Grundsätze fokussieren auf nachhaltige Qualität."
      },
      {
        question: "Welche Phase kommt in DMAIC nach 'Measure'?",
        options: ["Define", "Analyze", "Improve", "Control"],
        correctIndex: 1,
        explanation: "DMAIC-Reihenfolge: Define → Measure → Analyze → Improve → Control. Nach dem Messen folgt die Analyse."
      },
      {
        question: "Was ist das Ziel von Six Sigma?",
        options: ["100% Fehlerfreiheit", "3,4 DPMO", "Null Reklamationen", "Maximaler Gewinn"],
        correctIndex: 1,
        explanation: "Six Sigma zielt auf maximal 3,4 Defects Per Million Opportunities (DPMO) ab - praktisch fehlerfreie Prozesse."
      },
      {
        question: "Welche Art von Verschwendung liegt vor, wenn Mitarbeiter auf Material warten?",
        options: ["Transport", "Warten", "Überproduktion", "Bewegung"],
        correctIndex: 1,
        explanation: "Warten ist eine der 7 Arten der Verschwendung (Muda) im Lean Management."
      },
      {
        question: "Was misst der Net Promoter Score (NPS)?",
        options: ["Beschwerdeanzahl", "Weiterempfehlungsbereitschaft", "Wiederkaufrate", "Produktqualität"],
        correctIndex: 1,
        explanation: "Der NPS misst die Bereitschaft der Kunden, das Unternehmen weiterzuempfehlen (Promoter vs. Detraktoren)."
      },
      {
        question: "Welcher Audittyp bewertet das gesamte QM-System?",
        options: ["Prozess-Audit", "Produkt-Audit", "System-Audit", "Compliance-Audit"],
        correctIndex: 2,
        explanation: "System-Audits bewerten die Wirksamkeit des gesamten Qualitätsmanagementsystems gegen Standards wie ISO 9001."
      }
    ]
  },
  {
    type: "matching",
    title: "QM-Begriffe und Tools",
    pairs: [
      { left: "Ishikawa-Diagramm", right: "Ursache-Wirkungs-Analyse (Fischgräten-Diagramm)" },
      { left: "Pareto-Prinzip", right: "80/20-Regel für Problempriorisierung" },
      { left: "Poka Yoke", right: "Fehlervermeidung durch technische Lösungen" },
      { left: "Gemba", right: "Ort der Wertschöpfung" },
      { left: "Kanban", right: "Pull-System zur Bestandsreduzierung" },
      { left: "FMEA", right: "Fehlermöglichkeits- und Einflussanalyse" },
      { left: "SPC", right: "Statistische Prozesslenkung" },
      { left: "MSA", right: "Messsystem-Analyse" }
    ]
  },
  {
    type: "scenario",
    title: "Qualitätsmanagement Szenarien",
    scenarios: [
      {
        title: "Reklamationswelle",
        description: "Plötzlich viele Kundenreklamationen - systematische Lösung finden",
        scenario: "Ein Produktionsbetrieb erhält plötzlich gehäuft Reklamationen über ein seit Jahren bewährtes Produkt. Die Fehlerrate ist von 0,1% auf 2,3% gestiegen. Das Vertriebsteam steht unter Druck und fordert sofortigen Produktionsstopp. Was ist der beste erste Schritt?",
        choices: [
          { text: "Sofort Produktion stoppen", consequence: "**Überreaktion:** Ohne Ursachenanalyse entstehen hohe Kosten und möglicherweise unnötige Störungen.", isCorrect: false },
          { text: "8D-Report starten und Sofortmaßnahmen definieren", consequence: "**Systematischer Ansatz:** Containment-Maßnahmen + strukturierte Problemlösung. Beste Praxis.", isCorrect: true },
          { text: "Mehr Endkontrollen einführen", consequence: "**Symptombehandlung:** Erhöht Kosten ohne Ursachenbehebung. Löst Grundproblem nicht.", isCorrect: false },
          { text: "Kunden beruhigen und weiterproduzieren", consequence: "**Risiko:** Verschärft das Problem und kann zu Imageschaden führen.", isCorrect: false }
        ]
      }
    ]
  }
];