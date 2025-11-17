import type { LearnModule, InteractiveTrainingModule } from "../../types/learn";

const interactiveTrainingModule: InteractiveTrainingModule = {
  type: "interactive",
  title: "Datenbanken Interaktives Training",
  tasks: [
    {
      id: "db-sql-basic",
      taskText: "Eine E-Commerce-Plattform benötigt eine SQL-Abfrage, um alle Bestellungen eines Kunden anzuzeigen. Die Tabelle heißt 'orders', die Spalte für Kunden-ID ist 'customer_id' und die gewünschte Kunden-ID ist 12345. Schreibe die SQL-Abfrage.",
      difficulty: "leicht",
      taskType: "code-complete",
      category: "Datenbanken",
      inputFormat: "code",
      tools: ["SQL-Editor", "Datenbank-Schema", "Query-Tester"],
      infoTexts: ["SELECT wählt Spalten aus", "FROM gibt die Tabelle an", "WHERE filtert nach Bedingungen"],
      helpButtons: [
        { label: "SQL Syntax", content: "SELECT * FROM tabelle WHERE spalte = wert" },
        { label: "Werte einsetzen", content: "customer_id = 12345" }
      ],
      gamification: {
        points: 20,
        level: 1,
        badge: "SQL Einsteiger",
        timeLimit: 120
      },
      adaptiveHelp: {
        hintsAfterFailures: 1,
        hints: ["Verwende SELECT * FROM orders WHERE ...", "customer_id sollte mit 12345 verglichen werden"]
      },
      expectedSolution: ["SELECT * FROM orders WHERE customer_id = 12345", "SELECT*FROM orders WHERE customer_id=12345"],
      feedback: {
        correct: "Perfekt! Diese SQL-Abfrage findet alle Bestellungen des Kunden.",
        incorrect: "Prüfe die SQL-Syntax. Vergiss nicht den WHERE-Teil für die Filterung.",
        commonMistakes: ["WHERE vergessen", "Falsche Tabellen- oder Spaltennamen"]
      }
    },
    {
      id: "db-normalization",
      taskText: "Du normalisierst eine Datenbank. Eine Tabelle 'customers' enthält: customer_id, name, address, city, postal_code, phone1, phone2, phone3. Welche Probleme siehst du und wie würdest du sie lösen?",
      difficulty: "schwer",
      taskType: "step-by-step",
      category: "Datenbanken",
      inputFormat: "text",
      tools: ["Normalisierungsregeln", "ER-Diagramm-Tool"],
      infoTexts: ["1. Normalform: Atomare Werte", "2. Normalform: Abhängigkeiten von Primärschlüssel", "3. Normalform: Keine transitiven Abhängigkeiten"],
      helpButtons: [
        { label: "Normalisierung", content: "Wiederholende Spalten in separate Tabelle auslagern" },
        { label: "Telefonummern", content: "phone1, phone2, phone3 ist schlecht normalisiert" }
      ],
      gamification: {
        points: 45,
        level: 3,
        badge: "Datenbank Architekt",
        timeLimit: 400
      },
      adaptiveHelp: {
        hintsAfterFailures: 2,
        hints: ["Mehrere phone-Spalten verstoßen gegen Normalisierung", "Erstelle separate Tabelle für Telefonnummern"]
      },
      expectedSolution: ["Separate Tabelle für Telefonnummern erstellen", "phone1, phone2, phone3 in eigene Tabelle", "Telefonnummern normalisieren"],
      feedback: {
        correct: "Excellent! Du hast die Normalisierungsprobleme erkannt und gelöst.",
        incorrect: "Denke an die Normalisierungsregeln. Wiederholende Spalten sind problematisch.",
        commonMistakes: ["Normalisierungsprobleme übersehen", "Nur auf Syntax statt Design geachtet"]
      }
    }
  ]
};

export const datenbankenModules: LearnModule[] = [
  interactiveTrainingModule,
  {
    type: "flashcards",
    title: "Datenbank Grundlagen - IHK Prüfungswissen",
    cards: [
      { front: "Was ist ein RDBMS?", back: "Relationales Datenbank-Management-System - verwaltet Daten in Tabellen mit Beziehungen" },
      { front: "Primärschlüssel (Primary Key)?", back: "Eindeutiger Identifikator für jeden Datensatz in einer Tabelle" },
      { front: "Fremdschlüssel (Foreign Key)?", back: "Verweis auf Primärschlüssel einer anderen Tabelle - stellt Beziehungen her" },
      { front: "1. Normalform (1NF)?", back: "Jedes Attribut enthält nur atomare Werte (keine Listen oder Arrays)" },
      { front: "2. Normalform (2NF)?", back: "1NF + alle Nicht-Schlüssel-Attribute sind voll funktional abhängig vom Primärschlüssel" },
      { front: "3. Normalform (3NF)?", back: "2NF + keine transitiven Abhängigkeiten zwischen Nicht-Schlüssel-Attributen" },
      { front: "ACID-Eigenschaften?", back: "Atomicity (Atomarität), Consistency (Konsistenz), Isolation (Isolation), Durability (Dauerhaftigkeit)" },
      { front: "Was ist ein JOIN?", back: "SQL-Operation zum Verknüpfen von Daten aus mehreren Tabellen" },
      { front: "INNER JOIN vs LEFT JOIN?", back: "INNER: nur übereinstimmende Datensätze. LEFT: alle aus linker Tabelle + passende aus rechter" },
      { front: "Was ist ein Index?", back: "Datenstruktur zur Beschleunigung von Datenbankabfragen" },
      { front: "Clustered vs Non-Clustered Index?", back: "Clustered: physische Sortierung. Non-Clustered: separater Zeiger auf Daten" },
      { front: "Was ist eine Transaktion?", back: "Logische Einheit von Datenbankoperationen - alles oder nichts" },
      { front: "Deadlock Definition?", back: "Zustand wo zwei Transaktionen sich gegenseitig blockieren" },
      { front: "Was ist Backup & Recovery?", back: "Datensicherung und Wiederherstellung bei Systemausfall" },
      { front: "NoSQL vs SQL?", back: "NoSQL: flexible Schemas, horizontal skalierbar. SQL: strukturiert, ACID-konform" },
      { front: "Was ist Data Warehousing?", back: "Sammlung und Aufbereitung von Daten für Analysezwecke" }
    ]
  },
  {
    type: "quiz",
    title: "SQL Abfragen - Praxistest",
    questions: [
      {
        question: "Welche SQL-Anweisung gibt alle Kunden aus Berlin zurück?",
        options: [
          "SELECT * FROM Kunden WHERE Stadt = Berlin",
          "SELECT * FROM Kunden WHERE Stadt = 'Berlin'",
          "GET * FROM Kunden WHERE Stadt = 'Berlin'",
          "FIND * FROM Kunden WHERE Stadt = 'Berlin'"
        ],
        correctIndex: 1,
        explanation: "String-Literale müssen in SQL in Anführungszeichen stehen"
      },
      {
        question: "Was bewirkt die GROUP BY Klausel?",
        options: [
          "Sortiert die Ergebnisse",
          "Filtert die Ergebnisse",
          "Gruppiert Datensätze für Aggregatfunktionen",
          "Verknüpft mehrere Tabellen"
        ],
        correctIndex: 2,
        explanation: "GROUP BY gruppiert Datensätze mit gleichen Werten für Aggregatfunktionen wie COUNT, SUM"
      },
      {
        question: "Welche Aussage über Normalformen ist korrekt?",
        options: [
          "1NF ist die höchste Normalform",
          "Normalisierung kann Performance verschlechtern",
          "Alle Datenbanken müssen in 3NF sein",
          "Normalformen sind nur für NoSQL relevant"
        ],
        correctIndex: 1,
        explanation: "Normalisierung reduziert Redundanz, kann aber durch mehr JOINs die Performance beeinträchtigen"
      },
      {
        question: "Was passiert bei einem ROLLBACK?",
        options: [
          "Die Datenbank wird gelöscht",
          "Alle Änderungen seit BEGIN TRANSACTION werden rückgängig gemacht",
          "Die letzte Abfrage wird wiederholt",
          "Ein Backup wird erstellt"
        ],
        correctIndex: 1,
        explanation: "ROLLBACK macht alle Änderungen einer Transaktion rückgängig"
      },
      {
        question: "Welcher Index-Typ ist am effizientesten für Bereichsabfragen?",
        options: [
          "Hash-Index",
          "Bitmap-Index",
          "B-Tree-Index",
          "Full-Text-Index"
        ],
        correctIndex: 2,
        explanation: "B-Tree-Indizes sind optimal für Bereichsabfragen (BETWEEN, >, <)"
      }
    ]
  }
];