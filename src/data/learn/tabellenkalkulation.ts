import type { LearnModule } from "@/types/learn";

export const tabellenkalkulationContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "Excel Grundlagen - IHK Prüfungswissen",
    cards: [
      { 
        front: "Zellbezüge in Excel", 
        back: "**Relative Bezüge (A1):** Ändern sich beim Kopieren. **Absolute Bezüge ($A$1):** Bleiben fest beim Kopieren. **Gemischte Bezüge ($A1, A$1):** Spalte oder Zeile fix. **IHK-Praxis:** Formeln effizient kopieren, Fehler vermeiden. **Beispiel:** =A1*$B$1 → Spalte B bleibt fix." 
      },
      { 
        front: "SVERWEIS (VLOOKUP) Funktion", 
        back: "**Syntax:** =SVERWEIS(Suchkriterium; Matrix; Spaltenindex; [Bereich_Verweis]). **Parameter:** Suchkriterium: Gesuchter Wert. Matrix: Suchbereich. Spaltenindex: Rückgabe-Spalte. Bereich_Verweis: FALSCH=exakt, WAHR=ungefähr. **IHK-Beispiel:** =SVERWEIS(A2;Preisliste!A:C;3;FALSCH) - Preis aus Tabelle holen." 
      },
      { 
        front: "WENN-Funktion (IF)", 
        back: "**Syntax:** =WENN(Bedingung; Dann_Wert; Sonst_Wert). **Verschachtelt:** Bis zu 64 WENN-Funktionen. **IHK-Praxis:** Rabattberechnung, Kategorisierung. **Beispiel:** =WENN(A1>100;\"Großauftrag\";\"Kleinauftrag\"). **Kombination:** WENN mit UND/ODER für komplexe Bedingungen." 
      },
      { 
        front: "Wichtige Excel-Formeln für IHK", 
        back: "**SUMME:** Addiert Werte. **MITTELWERT:** Durchschnitt. **ANZAHL/ANZAHL2:** Zählt Zahlen/alle Zellen. **MIN/MAX:** Kleinster/größter Wert. **SUMMEWENN:** Bedingte Summe. **ZÄHLENWENN:** Bedingte Anzahl. **RUNDEN:** Auf Dezimalstellen runden. **IHK-Tipp:** Funktionen kombinieren für komplexe Berechnungen." 
      },
      { 
        front: "Pivot-Tabellen erstellen", 
        back: "**Zweck:** Große Datenmengen analysieren und zusammenfassen. **Aufbau:** Zeilen, Spalten, Werte, Filter. **Schritte:** 1. Daten markieren 2. Einfügen → PivotTable 3. Felder zuordnen. **IHK-Anwendung:** Umsatzanalysen, Verkaufsstatistiken, Zeitreihen. **Tipp:** Quelldaten als Tabelle formatieren für automatische Aktualisierung." 
      },
      { 
        front: "Bedingte Formatierung", 
        back: "**Zweck:** Zellen basierend auf Werten hervorheben. **Regeln:** Größer/kleiner als, zwischen, Top 10, Duplikate. **Farbskalen:** Gradiente für Wertebereiche. **Datenbalken:** Visuelle Wertedarstellung. **Symbolsätze:** Ampeln, Pfeile für Status. **IHK-Praxis:** Abweichungen erkennen, KPIs visualisieren." 
      },
      { 
        front: "Diagramme in Excel", 
        back: "**Säulen/Balken:** Vergleiche, Kategorien. **Linien:** Trends, Zeitreihen. **Kreis:** Anteile (max. 6-8 Segmente). **Scatter/Punkt:** Korrelationen, wissenschaftliche Daten. **IHK-Auswahl:** Passend zu Datentyp und Aussage wählen. **Gestaltung:** Achsenbeschriftung, Legende, aussagekräftiger Titel." 
      },
      { 
        front: "Datenüberprüfung (Gültigkeit)", 
        back: "**Zweck:** Eingaben auf Korrektheit prüfen. **Kriterien:** Ganze Zahl, Dezimal, Liste, Datum, Textlänge. **Dropdown-Listen:** Eingabe auf Auswahlliste beschränken. **Fehlermeldung:** Benutzerdefinierte Warnung bei ungültiger Eingabe. **IHK-Anwendung:** Formular-Erstellung, Fehlerminimierung bei Dateneingabe." 
      },
      { 
        front: "INDEX und VERGLEICH Kombination", 
        back: "**INDEX:** Gibt Wert aus bestimmter Position zurück. **VERGLEICH:** Findet Position eines Wertes. **Kombination:** =INDEX(Bereich;VERGLEICH(Suchwert;Suchbereich;0)). **Vorteile gegenüber SVERWEIS:** Suche auch links, flexibler, schneller. **IHK-Beispiel:** Dynamische Tabellenabrufung, mehrdimensionale Suche." 
      },
      { 
        front: "Excel-Datensicherheit", 
        back: "**Arbeitsmappe schützen:** Struktur, Fenster sperren. **Blattschutz:** Zellen vor Änderung schützen. **Zellen entsperren:** Format → Zellen → Schutz. **Passwortschutz:** Beim Öffnen oder Bearbeiten. **IHK-Wichtig:** Sensible Daten schützen, aber: Passwortschutz ist nicht verschlüsselung!" 
      }
    ]
  },
  {
    type: "quiz",
    title: "Excel Prüfungsfragen",
    questions: [
      {
        question: "Welche Formel gibt den drittgrößten Wert aus dem Bereich A1:A10 zurück?",
        options: ["=MAX(A1:A10;3)", "=KGRÖSSTE(A1:A10;3)", "=RANG(A1:A10;3)", "=GROSS(A1:A10;3)"],
        correctIndex: 1
      },
      {
        question: "Was bedeutet der Bezug $A$1 in Excel?",
        options: ["Relativer Bezug", "Absoluter Bezug", "Gemischter Bezug", "Externer Bezug"],
        correctIndex: 1
      },
      {
        question: "Welche Funktion kombiniert Texte aus mehreren Zellen?",
        options: ["SUMME", "VERKETTEN oder TEXTVERKETTEN", "VERGLEICH", "WECHSELN"],
        correctIndex: 1
      },
      {
        question: "Was macht die Funktion SVERWEIS, wenn der letzte Parameter WAHR ist?",
        options: ["Exakte Übereinstimmung suchen", "Ungefähre Übereinstimmung (nächst kleinerer Wert)", "Groß-/Kleinschreibung ignorieren", "Fehlerwert zurückgeben"],
        correctIndex: 1
      },
      {
        question: "Wie fixiert man nur die Spalte bei einem Zellbezug?",
        options: ["A$1", "$A1", "$A$1", "A1$"],
        correctIndex: 1
      },
      {
        question: "Welches Diagramm eignet sich am besten für Zeitreihen?",
        options: ["Kreisdiagramm", "Liniendiagramm", "Streudiagramm", "Ringdiagramm"],
        correctIndex: 1
      },
      {
        question: "Was berechnet =SUMMEWENN(A1:A10;\">100\";B1:B10)?",
        options: ["Summe aller Werte in A1:A10 über 100", "Summe der B-Werte, wenn A größer 100", "Anzahl der Werte über 100", "Durchschnitt der Werte über 100"],
        correctIndex: 1
      },
      {
        question: "Welche Tastenkombination fügt das aktuelle Datum ein?",
        options: ["Strg+D", "Strg+.", "Strg+;", "Strg+T"],
        correctIndex: 2
      },
      {
        question: "Was ist der Vorteil von INDEX/VERGLEICH gegenüber SVERWEIS?",
        options: ["Einfachere Syntax", "Kann auch links vom Suchbereich suchen", "Schnellere Berechnung bei wenig Daten", "Automatische Sortierung"],
        correctIndex: 1
      },
      {
        question: "Wie viele Zeilen hat eine Excel-Tabelle maximal (Excel 2016+)?",
        options: ["65.536", "1.048.576", "16.384", "256"],
        correctIndex: 1
      }
    ]
  },
  {
    type: "flashcards",
    title: "Excel Fortgeschritten - Datenanalyse",
    cards: [
      { 
        front: "Makros und VBA Grundlagen", 
        back: "**Makro aufzeichnen:** Entwicklertools → Makro aufzeichnen. **VBA-Editor:** Alt+F11 öffnet den Editor. **Grundstruktur:** Sub MakroName() ... End Sub. **Sicherheit:** Makros können schädlich sein - nur aus vertrauenswürdigen Quellen. **IHK-Anwendung:** Wiederkehrende Aufgaben automatisieren, Berichte generieren." 
      },
      { 
        front: "Power Query - Daten importieren", 
        back: "**Zweck:** Daten aus verschiedenen Quellen laden und transformieren. **Quellen:** CSV, Datenbank, Web, andere Excel-Dateien. **Transformationen:** Spalten entfernen, filtern, gruppieren, pivotieren. **Vorteil:** Änderungen werden gespeichert und können wiederholt werden. **IHK-Praxis:** ETL-Prozesse (Extract, Transform, Load) für Berichte." 
      },
      { 
        front: "Was-wäre-wenn-Analyse", 
        back: "**Zielwertsuche:** Rückwärtsberechnung - Welchen Eingabewert brauche ich für gewünschtes Ergebnis? **Datentabellen:** Ein- oder zweivariable Szenarien durchspielen. **Szenario-Manager:** Verschiedene Eingabewert-Kombinationen speichern und vergleichen. **IHK-Anwendung:** Break-Even-Analyse, Investitionsrechnung, Preiskalkulation." 
      },
      { 
        front: "Solver für Optimierung", 
        back: "**Zweck:** Optimalen Wert für Zielzelle finden. **Einstellungen:** Zielzelle, veränderbare Zellen, Nebenbedingungen. **Methoden:** Simplex LP, GRG Nonlinear. **Beispiele:** Gewinnmaximierung, Kostenminimierung, Ressourcenplanung. **IHK-Aktivierung:** Add-Ins → Solver aktivieren." 
      },
      { 
        front: "Tabellen vs. Bereiche", 
        back: "**Als Tabelle formatieren:** Strg+T oder Start → Als Tabelle formatieren. **Vorteile:** Automatische Erweiterung, strukturierte Verweise, automatische Formatierung. **Strukturierte Verweise:** [@Spalte] statt fester Zellbezüge. **Ergebniszeile:** Automatische Aggregatfunktionen. **IHK-Empfehlung:** Tabellen für Datenlisten verwenden." 
      }
    ]
  },
  {
    type: "quiz",
    title: "Excel Fortgeschritten - Quiz",
    questions: [
      {
        question: "Was ist der Hauptvorteil von Power Query?",
        options: ["Schnellere Berechnungen", "Automatische Diagrammerstellung", "Wiederholbare Datentransformationen", "Bessere Druckausgabe"],
        correctIndex: 2
      },
      {
        question: "Welche Tastenkombination öffnet den VBA-Editor?",
        options: ["Strg+V", "Alt+F11", "F5", "Strg+M"],
        correctIndex: 1
      },
      {
        question: "Was macht die Zielwertsuche?",
        options: ["Findet den größten Wert", "Berechnet rückwärts den benötigten Eingabewert", "Sortiert Daten", "Erstellt Pivot-Tabellen"],
        correctIndex: 1
      },
      {
        question: "Welche Funktion ermöglicht das Speichern verschiedener Eingabewert-Kombinationen?",
        options: ["Datentabelle", "Szenario-Manager", "Solver", "Power Query"],
        correctIndex: 1
      },
      {
        question: "Was ist ein strukturierter Verweis in Excel-Tabellen?",
        options: ["Ein absoluter Zellbezug", "Ein Verweis mit Spaltennamen statt Zellbezug", "Ein externer Verweis", "Ein Makro-Aufruf"],
        correctIndex: 1
      }
    ]
  }
];
