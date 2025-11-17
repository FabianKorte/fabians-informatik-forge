import { LearnModule, InteractiveTrainingModule } from "../../types/learn";

const interactiveTrainingModule: InteractiveTrainingModule = {
  type: "interactive",
  title: "Mathematik & Logik Interaktives Training",
  tasks: [
    {
      id: "math-binary-conversion",
      taskText: "Ein Entwicklerteam arbeitet mit binären Schaltern. Du musst die Dezimalzahl 156 ins Binärsystem umwandeln, um den richtigen Schaltplan einzustellen. Gib das Ergebnis in binärer Schreibweise an.",
      difficulty: "mittel",
      taskType: "number-conversion",
      category: "Mathematik",
      inputFormat: "text",
      tools: ["Taschenrechner (Basis-Umrechner)", "Umrechnungstabelle"],
      infoTexts: ["Umwandlung in Binär erfolgt durch wiederholte Division durch 2. Reste werden von unten nach oben gelesen."],
      helpButtons: [
        { label: "Zeige Hilfstabelle", content: "128|64|32|16|8|4|2|1 - Welche Zahlen ergeben 156?" },
        { label: "Gib mir den ersten Schritt", content: "156 ÷ 2 = 78 Rest 0" }
      ],
      gamification: {
        points: 30,
        level: 2,
        badge: "Binär-Experte",
        timeLimit: 200
      },
      adaptiveHelp: {
        hintsAfterFailures: 2,
        hints: ["Nach 2 Fehlversuchen: Zeige Division durch 2 mit Zwischenschritten", "156 = 128 + 28, jetzt 28 weiter zerlegen"]
      },
      expectedSolution: ["10011100", "0b10011100"],
      feedback: {
        correct: "Perfekt! 156 dezimal ist 10011100 binär.",
        incorrect: "Viele vertun sich bei der Division durch 2. Achte darauf, den Rest jedes Schritts korrekt zu übernehmen.",
        commonMistakes: ["Reste in falscher Reihenfolge", "Division durch 10 statt 2"]
      }
    },
    {
      id: "logic-truth-table",
      taskText: "Du implementierst eine Logikschaltung. Gegeben sind die Aussagen: A = 'System läuft', B = 'Fehler erkannt'. Erstelle die Wahrheitstabelle für die Aussage: 'System läuft UND NICHT Fehler erkannt'.",
      difficulty: "mittel",
      taskType: "step-by-step",
      category: "Logik",
      inputFormat: "text",
      tools: ["Wahrheitstabellen-Generator", "Logik-Simulator"],
      infoTexts: ["UND (AND): nur wahr wenn beide Eingänge wahr", "NICHT (NOT): kehrt den Wahrheitswert um", "Wahrheitstabelle zeigt alle möglichen Kombinationen"],
      helpButtons: [
        { label: "Logik-Operatoren", content: "A AND (NOT B) - erst NOT B berechnen, dann AND" },
        { label: "Tabellen-Format", content: "A | B | NOT B | A AND (NOT B)" }
      ],
      gamification: {
        points: 35,
        level: 2,
        badge: "Logik-Meister",
        timeLimit: 240
      },
      adaptiveHelp: {
        hintsAfterFailures: 2,
        hints: ["Erstelle erst die Spalte für NOT B", "Dann kombiniere A mit NOT B über AND"]
      },
      expectedSolution: ["A=1,B=0: wahr; A=1,B=1: falsch; A=0,B=0: falsch; A=0,B=1: falsch", "1,0:1; 1,1:0; 0,0:0; 0,1:0"],
      feedback: {
        correct: "Excellent! Die Wahrheitstabelle ist korrekt. System läuft nur ohne Fehler.",
        incorrect: "Prüfe die Logik nochmal. Wann ist A AND (NOT B) wahr?",
        commonMistakes: ["NOT Operation vergessen", "AND/OR verwechselt"]
      }
    }
  ]
};

export const mathematikLogikContent: LearnModule[] = [
  interactiveTrainingModule,
  {
    type: "flashcards",
    title: "Mathematik & Logik für IT - IHK Prüfungswissen",
    cards: [
      { 
        front: "Zahlensysteme und Umrechnung", 
        back: "**Dezimalsystem (Basis 10):** 0-9, Stellenwerte 10⁰, 10¹, 10². **Binärsystem (Basis 2):** 0-1, Grundlage der Computertechnik. **Hexadezimalsystem (Basis 16):** 0-9, A-F für Speicheradressen. **IHK-Umrechnung:** Dezimal 255 = Binär 11111111 = Hex FF. **Anwendung:** IPv4-Adressen, Farb-Codes, Speichergrößen. **Rechnung:** 2⁸ = 256 verschiedene Werte (0-255)." 
      },
      { 
        front: "Boolesche Algebra", 
        back: "**Grundoperationen:** AND (∧), OR (∨), NOT (¬), XOR (⊕). **Gesetze:** Kommutativgesetz (A ∧ B = B ∧ A), Assoziativgesetz, Distributivgesetz. **De Morgan:** ¬(A ∧ B) = ¬A ∨ ¬B, ¬(A ∨ B) = ¬A ∧ ¬B. **IHK-Anwendung:** Schaltkreise, Programmierung (if-Bedingungen), Datenbankabfragen. **Wahrheitstabellen:** Systematische Darstellung aller Eingabe-/Ausgabekombinationen." 
      },
      { 
        front: "Algorithmus-Komplexität", 
        back: "**Big-O-Notation:** Beschreibt Wachstumsverhalten von Algorithmen. **O(1)** Konstant, **O(log n)** Logarithmisch, **O(n)** Linear, **O(n log n)** Quasi-linear, **O(n²)** Quadratisch. **IHK-Beispiele:** Binary Search O(log n), Bubble Sort O(n²), Merge Sort O(n log n). **Analyse:** Worst Case, Average Case, Best Case unterscheiden. **Speicher vs. Zeit:** Trade-off zwischen Geschwindigkeit und Speicherverbrauch." 
      },
      { 
        front: "Diskrete Mathematik", 
        back: "**Mengenlehre:** Vereinigung (∪), Schnitt (∩), Differenz (\\). **Relationen:** Reflexiv, symmetrisch, transitiv, Äquivalenzrelation. **Graphentheorie:** Knoten, Kanten, gerichtete/ungerichtete Graphen. **IHK-Anwendung:** Datenbank-Beziehungen, Netzwerk-Topologien, Algorithmus-Design. **Kombinatorik:** Permutationen, Kombinationen für Sicherheits-Berechnungen." 
      },
      { 
        front: "Statistik und Wahrscheinlichkeit", 
        back: "**Beschreibende Statistik:** Mittelwert, Median, Modus, Standardabweichung. **Wahrscheinlichkeit:** P(A) = Günstige Ereignisse / Alle möglichen Ereignisse. **Verteilungen:** Normalverteilung, Binomialverteilung. **IHK-IT-Bezug:** Performance-Analyse, Fehlerwahrscheinlichkeiten, Load-Testing, Qualitätssicherung. **Korrelation vs. Kausalität:** Zusammenhang ≠ Ursache-Wirkung." 
      },
      { 
        front: "Logische Schlussfolgerungen", 
        back: "**Aussagenlogik:** Wenn P, dann Q (P → Q). **Modus Ponens:** P und P→Q, also Q. **Modus Tollens:** ¬Q und P→Q, also ¬P. **IHK-Programmierung:** If-Then-Else-Logik, Debugging, Fehleranalyse. **Quantoren:** ∀ (für alle), ∃ (es existiert). **Beweistechniken:** Direkter Beweis, Widerspruchsbeweis, vollständige Induktion." 
      },
      { 
        front: "Kryptographie-Mathematik", 
        back: "**Modulare Arithmetik:** a ≡ b (mod n), wichtig für Verschlüsselung. **Primzahlen:** Basis für RSA-Verschlüsselung, große Primzahlen schwer zu faktorisieren. **Eulersche φ-Funktion:** Anzahl teilerfremer Zahlen für RSA. **IHK-Sicherheit:** Hash-Funktionen, digitale Signaturen, Schlüsselaustausch. **Diffie-Hellman:** Diskreter Logarithmus für sicheren Schlüsselaustausch." 
      },
      { 
        front: "Matrizenrechnung", 
        back: "**Definition:** Rechteckiges Schema von Zahlen. **Operationen:** Addition, Multiplikation, Transposition. **Anwendungen:** 3D-Grafik (Rotation, Translation), Netzwerk-Analyse, Google PageRank. **IHK-Beispiele:** Transformationsmatrizen, Adjazenzmatrizen für Graphen. **Determinante:** Skalarer Wert, wichtig für Invertierbarkeit. **Eigenwerte:** Wichtig für Hauptkomponentenanalyse." 
      },
      { 
        front: "Rekursion mathematisch", 
        back: "**Definition:** Funktion definiert sich über sich selbst. **Basisfall:** Abbruchbedingung verhindert Endlosschleife. **Klassische Beispiele:** Fakultät n! = n × (n-1)!, Fibonacci F(n) = F(n-1) + F(n-2). **IHK-Komplexität:** Exponentielles Wachstum bei naiver Fibonacci-Implementierung. **Optimierung:** Memoization, dynamische Programmierung. **Tail-Recursion:** Optimierung möglich." 
      },
      { 
        front: "Formale Sprachen und Automaten", 
        back: "**Alphabet:** Endliche Menge von Symbolen. **Sprache:** Menge von Wörtern über einem Alphabet. **Reguläre Ausdrücke:** Pattern Matching, Textverarbeitung. **IHK-Automaten:** Endlicher Automat für Eingabe-Validierung, Compiler-Design. **Chomsky-Hierarchie:** Typ 0-3 Grammatiken. **Anwendung:** Parser, Lexer, Validierung von E-Mail-Adressen." 
      }
    ]
  },
  {
    type: "quiz",
    title: "Mathematik & Logik Vertiefung",
    questions: [
      {
        question: "Was ist 1011₂ (binär) in dezimal?",
        options: ["9", "10", "11", "12"],
        correctIndex: 2,
        explanation: "1011₂ = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11"
      },
      {
        question: "Welches Gesetz besagt ¬(A ∧ B) = ¬A ∨ ¬B?",
        options: ["Kommutativgesetz", "De Morgansches Gesetz", "Assoziativgesetz", "Distributivgesetz"],
        correctIndex: 1,
        explanation: "Das De Morgansche Gesetz beschreibt die Negation von UND- und ODER-Verknüpfungen."
      },
      {
        question: "Welche Zeitkomplexität hat die binäre Suche?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctIndex: 1,
        explanation: "Binäre Suche halbiert in jedem Schritt den Suchraum, daher O(log n)."
      },
      {
        question: "Was ist FF₁₆ (hexadezimal) in dezimal?",
        options: ["255", "256", "240", "250"],
        correctIndex: 0,
        explanation: "FF₁₆ = 15×16¹ + 15×16⁰ = 240 + 15 = 255"
      },
      {
        question: "Wie viele verschiedene Werte kann man mit 8 Bit darstellen?",
        options: ["255", "256", "128", "512"],
        correctIndex: 1,
        explanation: "2⁸ = 256 verschiedene Werte (0 bis 255)"
      },
      {
        question: "Was ist das Ergebnis von XOR: 1010 ⊕ 1100?",
        options: ["0110", "1110", "1000", "0010"],
        correctIndex: 0,
        explanation: "XOR bitweise: 1⊕1=0, 0⊕1=1, 1⊕0=1, 0⊕0=0 → 0110"
      },
      {
        question: "Welche Aussage über Korrelation ist korrekt?",
        options: ["Korrelation beweist Kausalität", "Korrelation misst lineare Zusammenhänge", "Korrelation ist immer positiv", "Korrelation = Wahrscheinlichkeit"],
        correctIndex: 1,
        explanation: "Korrelation misst den Grad des linearen Zusammenhangs, beweist aber keine Kausalität."
      },
      {
        question: "Was ist der Modus Ponens?",
        options: ["Wenn P→Q und ¬Q, dann ¬P", "Wenn P→Q und P, dann Q", "Wenn P∧Q, dann P", "Wenn P∨Q, dann P"],
        correctIndex: 1,
        explanation: "Modus Ponens: Aus P→Q (Wenn P, dann Q) und P folgt Q."
      }
    ]
  }
];