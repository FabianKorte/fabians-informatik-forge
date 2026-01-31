import type { SQLScenario, ERModel, SQLExercise } from '@/types/sqlSandbox';

// ER-Model 1: Webshop-Datenbank (IHK-typisch)
const webshopModel: ERModel = {
  id: 'webshop',
  name: 'Webshop-Datenbank',
  description: 'Klassisches E-Commerce Datenmodell mit Kunden, Produkten und Bestellungen',
  tables: [
    {
      name: 'kunden',
      columns: [
        { name: 'kunden_id', type: 'INT', primaryKey: true },
        { name: 'vorname', type: 'VARCHAR' },
        { name: 'nachname', type: 'VARCHAR' },
        { name: 'email', type: 'VARCHAR' },
        { name: 'ort', type: 'VARCHAR' },
        { name: 'registriert_am', type: 'DATE' },
      ],
      data: [
        { kunden_id: 1, vorname: 'Max', nachname: 'Müller', email: 'max@example.de', ort: 'Berlin', registriert_am: '2024-01-15' },
        { kunden_id: 2, vorname: 'Anna', nachname: 'Schmidt', email: 'anna@example.de', ort: 'München', registriert_am: '2024-02-20' },
        { kunden_id: 3, vorname: 'Tom', nachname: 'Weber', email: 'tom@example.de', ort: 'Hamburg', registriert_am: '2024-03-10' },
        { kunden_id: 4, vorname: 'Lisa', nachname: 'Fischer', email: 'lisa@example.de', ort: 'Berlin', registriert_am: '2024-01-05' },
        { kunden_id: 5, vorname: 'Jan', nachname: 'Becker', email: 'jan@example.de', ort: 'Köln', registriert_am: '2024-04-01' },
      ],
    },
    {
      name: 'produkte',
      columns: [
        { name: 'produkt_id', type: 'INT', primaryKey: true },
        { name: 'bezeichnung', type: 'VARCHAR' },
        { name: 'kategorie', type: 'VARCHAR' },
        { name: 'preis', type: 'DECIMAL' },
        { name: 'lagerbestand', type: 'INT' },
      ],
      data: [
        { produkt_id: 101, bezeichnung: 'Laptop Pro', kategorie: 'Computer', preis: 1299.99, lagerbestand: 15 },
        { produkt_id: 102, bezeichnung: 'Wireless Mouse', kategorie: 'Zubehör', preis: 29.99, lagerbestand: 150 },
        { produkt_id: 103, bezeichnung: 'USB-Hub 7-Port', kategorie: 'Zubehör', preis: 24.99, lagerbestand: 80 },
        { produkt_id: 104, bezeichnung: 'Monitor 27"', kategorie: 'Computer', preis: 349.99, lagerbestand: 25 },
        { produkt_id: 105, bezeichnung: 'Tastatur Mechanisch', kategorie: 'Zubehör', preis: 89.99, lagerbestand: 45 },
        { produkt_id: 106, bezeichnung: 'Webcam HD', kategorie: 'Zubehör', preis: 59.99, lagerbestand: 0 },
      ],
    },
    {
      name: 'bestellungen',
      columns: [
        { name: 'bestell_id', type: 'INT', primaryKey: true },
        { name: 'kunden_id', type: 'INT', foreignKey: { table: 'kunden', column: 'kunden_id' } },
        { name: 'produkt_id', type: 'INT', foreignKey: { table: 'produkte', column: 'produkt_id' } },
        { name: 'menge', type: 'INT' },
        { name: 'bestell_datum', type: 'DATE' },
        { name: 'status', type: 'VARCHAR' },
      ],
      data: [
        { bestell_id: 1001, kunden_id: 1, produkt_id: 101, menge: 1, bestell_datum: '2024-03-01', status: 'geliefert' },
        { bestell_id: 1002, kunden_id: 2, produkt_id: 102, menge: 2, bestell_datum: '2024-03-05', status: 'geliefert' },
        { bestell_id: 1003, kunden_id: 1, produkt_id: 104, menge: 1, bestell_datum: '2024-03-10', status: 'versandt' },
        { bestell_id: 1004, kunden_id: 3, produkt_id: 105, menge: 1, bestell_datum: '2024-03-15', status: 'in Bearbeitung' },
        { bestell_id: 1005, kunden_id: 4, produkt_id: 102, menge: 3, bestell_datum: '2024-03-20', status: 'geliefert' },
        { bestell_id: 1006, kunden_id: 2, produkt_id: 103, menge: 2, bestell_datum: '2024-03-25', status: 'versandt' },
      ],
    },
  ],
};

// ER-Model 2: Personaldatenbank
const personalModel: ERModel = {
  id: 'personal',
  name: 'Personal-Datenbank',
  description: 'Mitarbeiter- und Abteilungsverwaltung eines Unternehmens',
  tables: [
    {
      name: 'abteilungen',
      columns: [
        { name: 'abt_id', type: 'INT', primaryKey: true },
        { name: 'abt_name', type: 'VARCHAR' },
        { name: 'standort', type: 'VARCHAR' },
        { name: 'budget', type: 'DECIMAL' },
      ],
      data: [
        { abt_id: 10, abt_name: 'IT', standort: 'Berlin', budget: 500000 },
        { abt_id: 20, abt_name: 'Vertrieb', standort: 'München', budget: 750000 },
        { abt_id: 30, abt_name: 'Personal', standort: 'Berlin', budget: 300000 },
        { abt_id: 40, abt_name: 'Entwicklung', standort: 'Hamburg', budget: 900000 },
      ],
    },
    {
      name: 'mitarbeiter',
      columns: [
        { name: 'ma_id', type: 'INT', primaryKey: true },
        { name: 'vorname', type: 'VARCHAR' },
        { name: 'nachname', type: 'VARCHAR' },
        { name: 'abt_id', type: 'INT', foreignKey: { table: 'abteilungen', column: 'abt_id' } },
        { name: 'gehalt', type: 'DECIMAL' },
        { name: 'einstellung', type: 'DATE' },
      ],
      data: [
        { ma_id: 1, vorname: 'Klaus', nachname: 'Meyer', abt_id: 10, gehalt: 65000, einstellung: '2020-03-15' },
        { ma_id: 2, vorname: 'Sabine', nachname: 'Schulz', abt_id: 20, gehalt: 55000, einstellung: '2021-06-01' },
        { ma_id: 3, vorname: 'Peter', nachname: 'Wagner', abt_id: 10, gehalt: 72000, einstellung: '2019-01-10' },
        { ma_id: 4, vorname: 'Maria', nachname: 'Koch', abt_id: 30, gehalt: 48000, einstellung: '2022-09-01' },
        { ma_id: 5, vorname: 'Stefan', nachname: 'Braun', abt_id: 40, gehalt: 78000, einstellung: '2018-05-20' },
        { ma_id: 6, vorname: 'Julia', nachname: 'Hoffmann', abt_id: 40, gehalt: 82000, einstellung: '2017-11-01' },
        { ma_id: 7, vorname: 'Thomas', nachname: 'Klein', abt_id: 20, gehalt: 61000, einstellung: '2020-08-15' },
      ],
    },
    {
      name: 'projekte',
      columns: [
        { name: 'projekt_id', type: 'INT', primaryKey: true },
        { name: 'projekt_name', type: 'VARCHAR' },
        { name: 'leiter_id', type: 'INT', foreignKey: { table: 'mitarbeiter', column: 'ma_id' } },
        { name: 'startdatum', type: 'DATE' },
        { name: 'status', type: 'VARCHAR' },
      ],
      data: [
        { projekt_id: 1, projekt_name: 'Website Relaunch', leiter_id: 3, startdatum: '2024-01-01', status: 'aktiv' },
        { projekt_id: 2, projekt_name: 'ERP Migration', leiter_id: 5, startdatum: '2023-06-15', status: 'aktiv' },
        { projekt_id: 3, projekt_name: 'Mobile App', leiter_id: 6, startdatum: '2024-02-01', status: 'planung' },
        { projekt_id: 4, projekt_name: 'CRM Einführung', leiter_id: 2, startdatum: '2023-09-01', status: 'abgeschlossen' },
      ],
    },
  ],
};

// Exercises für Webshop
const webshopExercises: SQLExercise[] = [
  {
    id: 'ws-1',
    title: 'Alle Kunden anzeigen',
    description: 'Zeige alle Datensätze aus der Tabelle "kunden" an.',
    difficulty: 'beginner',
    erModelId: 'webshop',
    theory: `## SELECT-Grundlagen

Die SELECT-Anweisung ist der wichtigste SQL-Befehl zum Abfragen von Daten.

**Syntax:**
\`\`\`sql
SELECT spalte1, spalte2 FROM tabelle;
SELECT * FROM tabelle;  -- Alle Spalten
\`\`\`

Mit \`*\` werden alle Spalten ausgewählt.`,
    hint: 'Verwende SELECT * FROM tabellenname;',
    expectedQuery: 'SELECT * FROM kunden',
    expectedResultCheck: (result) => result.length === 5,
    xpReward: 10,
  },
  {
    id: 'ws-2',
    title: 'Bestimmte Spalten auswählen',
    description: 'Zeige nur Vorname und Nachname aller Kunden an.',
    difficulty: 'beginner',
    erModelId: 'webshop',
    hint: 'SELECT spalte1, spalte2 FROM tabelle;',
    expectedQuery: 'SELECT vorname, nachname FROM kunden',
    expectedResultCheck: (result) => 
      result.length === 5 && 
      Object.keys(result[0]).length === 2 &&
      'vorname' in result[0] && 'nachname' in result[0],
    xpReward: 10,
  },
  {
    id: 'ws-3',
    title: 'WHERE-Klausel verwenden',
    description: 'Zeige alle Kunden aus Berlin an.',
    difficulty: 'beginner',
    erModelId: 'webshop',
    theory: `## WHERE-Klausel

Mit WHERE filterst du Datensätze nach bestimmten Bedingungen.

**Syntax:**
\`\`\`sql
SELECT * FROM tabelle WHERE spalte = 'wert';
\`\`\`

**Operatoren:** =, !=, <, >, <=, >=, LIKE`,
    hint: 'Verwende WHERE ort = \'Berlin\'',
    expectedQuery: 'SELECT * FROM kunden WHERE ort = \'Berlin\'',
    expectedResultCheck: (result) => 
      result.length === 2 && 
      result.every(r => r.ort === 'Berlin'),
    xpReward: 15,
  },
  {
    id: 'ws-4',
    title: 'Produkte filtern',
    description: 'Zeige alle Produkte der Kategorie "Zubehör" mit Preis unter 50€.',
    difficulty: 'intermediate',
    erModelId: 'webshop',
    theory: `## Mehrere Bedingungen mit AND

Kombiniere mehrere Filter mit AND:

\`\`\`sql
SELECT * FROM tabelle 
WHERE bedingung1 AND bedingung2;
\`\`\``,
    hint: 'WHERE kategorie = \'Zubehör\' AND preis < 50',
    expectedQuery: 'SELECT * FROM produkte WHERE kategorie = \'Zubehör\' AND preis < 50',
    expectedResultCheck: (result) => 
      result.length === 2 && 
      result.every(r => r.kategorie === 'Zubehör' && Number(r.preis) < 50),
    xpReward: 20,
  },
  {
    id: 'ws-5',
    title: 'ORDER BY verwenden',
    description: 'Zeige alle Produkte sortiert nach Preis (aufsteigend).',
    difficulty: 'intermediate',
    erModelId: 'webshop',
    theory: `## Sortierung mit ORDER BY

**Syntax:**
\`\`\`sql
SELECT * FROM tabelle ORDER BY spalte ASC;  -- aufsteigend
SELECT * FROM tabelle ORDER BY spalte DESC; -- absteigend
\`\`\``,
    hint: 'ORDER BY preis ASC',
    expectedQuery: 'SELECT * FROM produkte ORDER BY preis ASC',
    expectedResultCheck: (result) => {
      if (result.length !== 6) return false;
      for (let i = 1; i < result.length; i++) {
        if (Number(result[i].preis) < Number(result[i-1].preis)) return false;
      }
      return true;
    },
    xpReward: 15,
  },
  {
    id: 'ws-6',
    title: 'Nicht verfügbare Produkte',
    description: 'Finde alle Produkte mit Lagerbestand = 0.',
    difficulty: 'beginner',
    erModelId: 'webshop',
    hint: 'WHERE lagerbestand = 0',
    expectedQuery: 'SELECT * FROM produkte WHERE lagerbestand = 0',
    expectedResultCheck: (result) => 
      result.length === 1 && 
      result[0].bezeichnung === 'Webcam HD',
    xpReward: 10,
  },
  {
    id: 'ws-7',
    title: 'JOIN: Bestellungen mit Kundennamen',
    description: 'Zeige alle Bestellungen mit dem Nachnamen des Kunden (JOIN kunden und bestellungen).',
    difficulty: 'advanced',
    erModelId: 'webshop',
    theory: `## INNER JOIN

Verknüpft Tabellen über gemeinsame Schlüssel:

\`\`\`sql
SELECT * FROM tabelle1
JOIN tabelle2 ON tabelle1.fk = tabelle2.pk;
\`\`\`

**IHK-Prüfung:** JOINs sind ein häufiges Thema!`,
    hint: 'JOIN bestellungen ON kunden.kunden_id = bestellungen.kunden_id',
    expectedQuery: 'SELECT * FROM kunden JOIN bestellungen ON kunden.kunden_id = bestellungen.kunden_id',
    expectedResultCheck: (result) => 
      result.length === 6 && 
      'nachname' in result[0] && 'bestell_id' in result[0],
    xpReward: 30,
  },
  {
    id: 'ws-8',
    title: 'LIKE-Operator',
    description: 'Finde alle Produkte, deren Bezeichnung mit "USB" beginnt.',
    difficulty: 'intermediate',
    erModelId: 'webshop',
    theory: `## LIKE für Textmuster

**Wildcards:**
- \`%\` = beliebig viele Zeichen
- \`_\` = genau ein Zeichen

\`\`\`sql
WHERE name LIKE 'A%'   -- beginnt mit A
WHERE name LIKE '%er'  -- endet mit er
WHERE name LIKE '%ab%' -- enthält ab
\`\`\``,
    hint: 'WHERE bezeichnung LIKE \'USB%\'',
    expectedQuery: 'SELECT * FROM produkte WHERE bezeichnung LIKE \'USB%\'',
    expectedResultCheck: (result) => 
      result.length === 1 && 
      String(result[0].bezeichnung).startsWith('USB'),
    xpReward: 20,
  },
];

// Exercises für Personal
const personalExercises: SQLExercise[] = [
  {
    id: 'pe-1',
    title: 'Alle Abteilungen',
    description: 'Liste alle Abteilungen mit ihren Standorten auf.',
    difficulty: 'beginner',
    erModelId: 'personal',
    hint: 'SELECT * FROM abteilungen',
    expectedQuery: 'SELECT * FROM abteilungen',
    expectedResultCheck: (result) => result.length === 4,
    xpReward: 10,
  },
  {
    id: 'pe-2',
    title: 'Mitarbeiter mit hohem Gehalt',
    description: 'Zeige alle Mitarbeiter mit einem Gehalt über 70.000€.',
    difficulty: 'beginner',
    erModelId: 'personal',
    hint: 'WHERE gehalt > 70000',
    expectedQuery: 'SELECT * FROM mitarbeiter WHERE gehalt > 70000',
    expectedResultCheck: (result) => 
      result.length === 3 && 
      result.every(r => Number(r.gehalt) > 70000),
    xpReward: 15,
  },
  {
    id: 'pe-3',
    title: 'Mitarbeiter sortiert nach Gehalt',
    description: 'Zeige alle Mitarbeiter sortiert nach Gehalt (absteigend).',
    difficulty: 'intermediate',
    erModelId: 'personal',
    hint: 'ORDER BY gehalt DESC',
    expectedQuery: 'SELECT * FROM mitarbeiter ORDER BY gehalt DESC',
    expectedResultCheck: (result) => {
      if (result.length !== 7) return false;
      return Number(result[0].gehalt) >= Number(result[result.length-1].gehalt);
    },
    xpReward: 15,
  },
  {
    id: 'pe-4',
    title: 'JOIN: Mitarbeiter mit Abteilung',
    description: 'Zeige alle Mitarbeiter mit dem Namen ihrer Abteilung.',
    difficulty: 'advanced',
    erModelId: 'personal',
    hint: 'JOIN abteilungen ON mitarbeiter.abt_id = abteilungen.abt_id',
    expectedQuery: 'SELECT * FROM mitarbeiter JOIN abteilungen ON mitarbeiter.abt_id = abteilungen.abt_id',
    expectedResultCheck: (result) => 
      result.length === 7 && 
      'abt_name' in result[0] && 'nachname' in result[0],
    xpReward: 30,
  },
  {
    id: 'pe-5',
    title: 'Berliner Abteilungen',
    description: 'Finde alle Abteilungen am Standort Berlin.',
    difficulty: 'beginner',
    erModelId: 'personal',
    hint: 'WHERE standort = \'Berlin\'',
    expectedQuery: 'SELECT * FROM abteilungen WHERE standort = \'Berlin\'',
    expectedResultCheck: (result) => 
      result.length === 2 && 
      result.every(r => r.standort === 'Berlin'),
    xpReward: 10,
  },
  {
    id: 'pe-6',
    title: 'Aktive Projekte',
    description: 'Zeige alle Projekte mit Status "aktiv".',
    difficulty: 'beginner',
    erModelId: 'personal',
    hint: 'WHERE status = \'aktiv\'',
    expectedQuery: 'SELECT * FROM projekte WHERE status = \'aktiv\'',
    expectedResultCheck: (result) => 
      result.length === 2 && 
      result.every(r => r.status === 'aktiv'),
    xpReward: 10,
  },
];

// Scenarios
export const sqlScenarios: SQLScenario[] = [
  {
    id: 'scenario-webshop',
    title: 'Webshop-Datenbank',
    description: 'Lerne SQL-Grundlagen am Beispiel eines Online-Shops mit Kunden, Produkten und Bestellungen.',
    erModel: webshopModel,
    exercises: webshopExercises,
  },
  {
    id: 'scenario-personal',
    title: 'Personalverwaltung',
    description: 'Fortgeschrittene Abfragen mit Mitarbeiter-, Abteilungs- und Projektdaten.',
    erModel: personalModel,
    exercises: personalExercises,
  },
];

export const getScenarioById = (id: string): SQLScenario | undefined => {
  return sqlScenarios.find(s => s.id === id);
};

export const getAllERModels = (): ERModel[] => {
  return sqlScenarios.map(s => s.erModel);
};
