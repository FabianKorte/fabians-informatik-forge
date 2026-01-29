import { CPMScenario } from "@/types/cpmTool";

export const cpmScenarios: CPMScenario[] = [
  {
    id: "cpm-basics",
    title: "Lektion 1: Grundlagen der Netzplantechnik",
    description: "Lerne die Grundbegriffe FAZ, FEZ, SAZ, SEZ und den kritischen Pfad kennen.",
    difficulty: "leicht",
    points: 50,
    theory: {
      title: "Was ist Netzplantechnik?",
      content: `Die **Netzplantechnik** ist eine Methode des Projektmanagements zur Planung und Steuerung von Projekten.

## Wichtige Begriffe

| Abkürzung | Begriff | Bedeutung |
|-----------|---------|-----------|
| **FAZ** | Frühester Anfangszeitpunkt | Wann kann ein Vorgang frühestens beginnen? |
| **FEZ** | Frühester Endzeitpunkt | Wann kann ein Vorgang frühestens enden? (FAZ + Dauer) |
| **SAZ** | Spätester Anfangszeitpunkt | Wann muss ein Vorgang spätestens beginnen? |
| **SEZ** | Spätester Endzeitpunkt | Wann muss ein Vorgang spätestens enden? |
| **GP** | Gesamtpuffer | Zeitreserve ohne Projektverzögerung (SAZ - FAZ) |
| **FP** | Freier Puffer | Zeitreserve ohne Beeinflussung des Nachfolgers |

## Kritischer Pfad

Der **kritische Pfad** ist die längste Kette von Vorgängen durch das Projekt. Vorgänge auf dem kritischen Pfad haben **keinen Puffer (GP = 0)** – jede Verzögerung verlängert das gesamte Projekt!

## Vorwärts- und Rückwärtsrechnung

1. **Vorwärtsrechnung**: Von Anfang → Ende, berechnet FAZ und FEZ
2. **Rückwärtsrechnung**: Von Ende → Anfang, berechnet SAZ und SEZ`,
      keywords: ["FAZ", "FEZ", "SAZ", "SEZ", "Kritischer Pfad", "Gesamtpuffer", "Netzplan"]
    },
    project: {
      id: "simple-project",
      name: "Einfaches IT-Projekt",
      activities: [
        { id: "A", name: "Anforderungsanalyse", duration: 3, predecessors: [], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
        { id: "B", name: "Design", duration: 2, predecessors: ["A"], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
        { id: "C", name: "Implementierung", duration: 5, predecessors: ["B"], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
        { id: "D", name: "Test", duration: 2, predecessors: ["C"], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
      ],
      projectDuration: null
    },
    objectives: [
      { id: "obj-1", description: "Berechne FAZ und FEZ für alle Vorgänge (Vorwärtsrechnung)", type: "calculate-faz-fez", completed: false },
      { id: "obj-2", description: "Bestimme die Projektgesamtdauer", type: "identify-duration", target: { requiredValue: 12 }, completed: false },
    ],
    hints: [
      "Beginne beim ersten Vorgang: FAZ = 0, FEZ = FAZ + Dauer",
      "Der FAZ eines Vorgangs ist das Maximum aller FEZ seiner Vorgänger",
      "Die Projektdauer ist der höchste FEZ aller Endvorgänge"
    ]
  },
  {
    id: "cpm-backward",
    title: "Lektion 2: Rückwärtsrechnung & Puffer",
    description: "Berechne SAZ, SEZ und identifiziere Pufferzeiten.",
    difficulty: "mittel",
    points: 75,
    theory: {
      title: "Rückwärtsrechnung verstehen",
      content: `## Rückwärtsrechnung

Die Rückwärtsrechnung startet beim **Projektende** und berechnet rückwärts die spätesten Zeitpunkte.

### Regeln:
1. **Endvorgänge**: SEZ = Projektdauer, SAZ = SEZ - Dauer
2. **Alle anderen**: SEZ = Minimum aller SAZ der Nachfolger

### Pufferberechnung:
- **Gesamtpuffer (GP)** = SAZ - FAZ = SEZ - FEZ
- **Freier Puffer (FP)** = Minimum(FAZ aller Nachfolger) - FEZ

### IHK-Prüfungstipp:
In der Prüfung wird oft nach dem Gesamtpuffer gefragt. Merke: **GP = 0 bedeutet kritischer Pfad!**`,
      keywords: ["Rückwärtsrechnung", "Gesamtpuffer", "Freier Puffer", "SAZ", "SEZ"]
    },
    project: {
      id: "parallel-project",
      name: "Projekt mit parallelen Vorgängen",
      activities: [
        { id: "A", name: "Planung", duration: 2, predecessors: [], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
        { id: "B", name: "Backend-Entwicklung", duration: 5, predecessors: ["A"], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
        { id: "C", name: "Frontend-Entwicklung", duration: 3, predecessors: ["A"], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
        { id: "D", name: "Integration", duration: 2, predecessors: ["B", "C"], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
        { id: "E", name: "Abnahme", duration: 1, predecessors: ["D"], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
      ],
      projectDuration: null
    },
    objectives: [
      { id: "obj-1", description: "Führe die Vorwärtsrechnung durch (FAZ/FEZ)", type: "calculate-faz-fez", completed: false },
      { id: "obj-2", description: "Führe die Rückwärtsrechnung durch (SAZ/SEZ)", type: "calculate-saz-sez", completed: false },
      { id: "obj-3", description: "Markiere alle kritischen Vorgänge", type: "mark-critical-path", completed: false },
    ],
    hints: [
      "Vorgang C hat einen Puffer, da er parallel zu B läuft aber kürzer ist",
      "Der kritische Pfad führt durch die längste Kette: A → B → D → E",
      "Vorgänge mit GP = 0 sind kritisch"
    ]
  },
  {
    id: "cpm-ihk-exam",
    title: "Lektion 3: IHK-Prüfungsaufgabe",
    description: "Löse eine realistische IHK-Prüfungsaufgabe zur Netzplantechnik.",
    difficulty: "schwer",
    points: 100,
    theory: {
      title: "IHK-Prüfungsvorbereitung",
      content: `## Typische IHK-Aufgabenstellung

In der IHK-Prüfung werden häufig folgende Fragen gestellt:

1. **Berechnen Sie FAZ, FEZ, SAZ, SEZ** für alle Vorgänge
2. **Bestimmen Sie den kritischen Pfad** und begründen Sie
3. **Berechnen Sie die Pufferzeiten** (GP und/oder FP)
4. **Was passiert bei einer Verzögerung** von Vorgang X?

## Prüfungstipps:
- Zeichne zuerst den Netzplan als Skizze
- Arbeite systematisch: erst Vorwärts-, dann Rückwärtsrechnung
- Kontrolliere: GP = SAZ - FAZ = SEZ - FEZ (muss gleich sein!)
- Kritischer Pfad: Alle Vorgänge mit GP = 0 verbinden`,
      keywords: ["IHK-Prüfung", "Fachinformatiker", "Projektmanagement"]
    },
    project: {
      id: "ihk-project",
      name: "Server-Migration (IHK-Aufgabe)",
      activities: [
        { id: "A", name: "Ist-Analyse", duration: 2, predecessors: [], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
        { id: "B", name: "Hardware-Beschaffung", duration: 5, predecessors: ["A"], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
        { id: "C", name: "Netzwerk-Planung", duration: 2, predecessors: ["A"], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
        { id: "D", name: "Server-Aufbau", duration: 3, predecessors: ["B"], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
        { id: "E", name: "Netzwerk-Konfiguration", duration: 2, predecessors: ["C", "D"], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
        { id: "F", name: "Datenmigration", duration: 4, predecessors: ["E"], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
        { id: "G", name: "Test & Dokumentation", duration: 2, predecessors: ["F"], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
      ],
      projectDuration: null
    },
    objectives: [
      { id: "obj-1", description: "Berechne alle Zeitwerte (FAZ, FEZ, SAZ, SEZ)", type: "calculate-faz-fez", completed: false },
      { id: "obj-2", description: "Berechne die Rückwärtsrechnung", type: "calculate-saz-sez", completed: false },
      { id: "obj-3", description: "Markiere den kritischen Pfad", type: "mark-critical-path", completed: false },
      { id: "obj-4", description: "Bestimme die Projektdauer in Tagen", type: "identify-duration", target: { requiredValue: 18 }, completed: false },
    ],
    hints: [
      "Die Projektdauer beträgt 18 Tage",
      "Der kritische Pfad führt durch: A → B → D → E → F → G",
      "Vorgang C hat einen Gesamtpuffer von 4 Tagen"
    ]
  },
  {
    id: "cpm-delay-analysis",
    title: "Lektion 4: Verzögerungsanalyse",
    description: "Analysiere die Auswirkungen von Verzögerungen auf das Projekt.",
    difficulty: "schwer",
    points: 100,
    theory: {
      title: "Was passiert bei Verzögerungen?",
      content: `## Verzögerungsanalyse

Wenn ein Vorgang länger dauert als geplant, gibt es zwei Szenarien:

### 1. Vorgang hat Puffer
- Die Verzögerung wird durch den Puffer aufgefangen
- **Keine Projektverzögerung**, solange Verzögerung ≤ Gesamtpuffer

### 2. Kritischer Vorgang verzögert sich
- **Jeder Tag Verzögerung = Ein Tag mehr Projektdauer!**
- Alle Nachfolger verschieben sich entsprechend

## Beispiel:
Vorgang C hat GP = 3 Tage:
- Verzögerung um 2 Tage → Kein Problem
- Verzögerung um 5 Tage → Projekt verzögert sich um 2 Tage

## IHK-Prüfungsfrage:
"Um wie viele Tage verlängert sich das Projekt, wenn Vorgang X um Y Tage verzögert wird?"

**Antwort**: max(0, Verzögerung - Gesamtpuffer des Vorgangs)`,
      keywords: ["Verzögerung", "Pufferzeit", "Projektsteuerung"]
    },
    project: {
      id: "delay-project",
      name: "Software-Release mit Verzögerung",
      activities: [
        { id: "A", name: "Sprint-Planung", duration: 1, predecessors: [], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
        { id: "B", name: "Feature-Entwicklung", duration: 6, predecessors: ["A"], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
        { id: "C", name: "Code-Review", duration: 2, predecessors: ["A"], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
        { id: "D", name: "Unit-Tests", duration: 3, predecessors: ["B"], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
        { id: "E", name: "Integration", duration: 2, predecessors: ["C", "D"], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
        { id: "F", name: "Deployment", duration: 1, predecessors: ["E"], faz: null, fez: null, saz: null, sez: null, gp: null, fp: null, isCritical: false },
      ],
      projectDuration: null
    },
    objectives: [
      { id: "obj-1", description: "Berechne den Netzplan vollständig", type: "calculate-faz-fez", completed: false },
      { id: "obj-2", description: "Führe die Rückwärtsrechnung durch", type: "calculate-saz-sez", completed: false },
      { id: "obj-3", description: "Identifiziere den kritischen Pfad", type: "mark-critical-path", completed: false },
    ],
    hints: [
      "Der kritische Pfad ist: A → B → D → E → F",
      "Vorgang C hat einen Puffer von 5 Tagen",
      "Eine Verzögerung von B um 2 Tage verlängert das Projekt um 2 Tage"
    ]
  }
];
