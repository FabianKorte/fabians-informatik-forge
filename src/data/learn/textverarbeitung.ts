import { LearnModule } from "@/types/learn";

export const textverarbeitungModules: LearnModule[] = [
  // Flashcards
  {
    type: "flashcards",
    title: "Word Grundlagen",
    cards: [
      { front: "Was ist ein Absatz in Word?", back: "Ein Textbereich, der durch Drücken der Enter-Taste beendet wird. Absätze haben eigene Formatierungsoptionen." },
      { front: "Was ist ein Seitenumbruch?", back: "Eine Funktion, die den Text auf einer neuen Seite fortsetzt (Strg+Enter)." },
      { front: "Was ist ein Abschnittsumbruch?", back: "Eine Trennung des Dokuments in Abschnitte mit unterschiedlicher Formatierung (z.B. Seitenausrichtung, Kopfzeilen)." },
      { front: "Was ist der Unterschied zwischen Speichern und Speichern unter?", back: "Speichern überschreibt die aktuelle Datei, Speichern unter erstellt eine neue Datei mit neuem Namen/Speicherort." },
      { front: "Was ist die Dokumentenansicht 'Seitenlayout'?", back: "Die Ansicht, die das Dokument so zeigt, wie es gedruckt wird, mit allen Seitenrändern und Kopf-/Fußzeilen." },
      { front: "Was ist die Gliederungsansicht?", back: "Eine Ansicht, die die Dokumentstruktur anhand der Überschriften zeigt und das Umorganisieren erleichtert." },
      { front: "Was ist ein Zeilenumbruch ohne Absatz?", back: "Shift+Enter erzeugt einen Zeilenumbruch innerhalb desselben Absatzes (Soft Return)." },
      { front: "Was ist die Funktion 'Suchen und Ersetzen'?", back: "Eine Funktion zum Finden und automatischen Ersetzen von Text im Dokument (Strg+H)." },
      { front: "Was sind Dokumenteigenschaften?", back: "Metadaten wie Autor, Titel, Erstellungsdatum und Schlüsselwörter, die dem Dokument zugeordnet sind." },
      { front: "Was ist die Standarddateierweiterung für Word-Dokumente?", back: ".docx (seit Word 2007). Ältere Version: .doc" }
    ]
  },
  {
    type: "flashcards",
    title: "Textformatierung",
    cards: [
      { front: "Wie macht man Text fett?", back: "Strg+B oder über Start → Schriftart → Fett (B-Symbol)." },
      { front: "Wie macht man Text kursiv?", back: "Strg+I oder über Start → Schriftart → Kursiv (I-Symbol)." },
      { front: "Wie unterstreicht man Text?", back: "Strg+U oder über Start → Schriftart → Unterstrichen." },
      { front: "Was ist der Unterschied zwischen Zeichenformatierung und Absatzformatierung?", back: "Zeichenformatierung: Betrifft einzelne Zeichen (Schriftart, -größe). Absatzformatierung: Betrifft ganze Absätze (Ausrichtung, Einzug)." },
      { front: "Welche Textausrichtungen gibt es?", back: "Linksbündig, Zentriert, Rechtsbündig und Blocksatz." },
      { front: "Was ist ein Einzug?", back: "Der Abstand zwischen Seitenrand und Textbeginn. Es gibt Erstzeileneinzug, hängenden Einzug und linken/rechten Einzug." },
      { front: "Was ist der Zeilenabstand?", back: "Der vertikale Abstand zwischen Textzeilen (z.B. einfach, 1,5-zeilig, doppelt)." },
      { front: "Was ist eine Formatvorlage?", back: "Eine vordefinierte Kombination von Formatierungen (Schriftart, Größe, Farbe, Abstände), die mit einem Klick angewendet werden kann." },
      { front: "Was ist der Unterschied zwischen weicher und harter Formatierung?", back: "Weich: Über Formatvorlagen (global änderbar). Hart: Direkte Formatierung einzelner Textabschnitte." },
      { front: "Wie entfernt man alle Formatierungen?", back: "Text markieren → Strg+Leertaste oder Start → Alle Formatierungen löschen." }
    ]
  },
  {
    type: "flashcards",
    title: "Seitengestaltung",
    cards: [
      { front: "Wie ändert man die Seitenränder?", back: "Layout → Seitenränder oder Layout → Seitenränder → Benutzerdefinierte Seitenränder." },
      { front: "Wie ändert man die Seitenausrichtung?", back: "Layout → Ausrichtung → Hochformat oder Querformat." },
      { front: "Was ist eine Kopfzeile?", back: "Ein Bereich am oberen Seitenrand, der auf jeder Seite wiederholt wird (z.B. für Dokumenttitel, Kapitelüberschriften)." },
      { front: "Was ist eine Fußzeile?", back: "Ein Bereich am unteren Seitenrand für wiederkehrende Informationen (z.B. Seitenzahlen, Datum)." },
      { front: "Wie fügt man Seitenzahlen ein?", back: "Einfügen → Seitenzahl, dann Position und Format wählen." },
      { front: "Was ist ein Wasserzeichen?", back: "Ein halbtransparentes Bild oder Text im Hintergrund jeder Seite (z.B. 'Entwurf', 'Vertraulich')." },
      { front: "Wie erstellt man ein Inhaltsverzeichnis?", back: "Referenzen → Inhaltsverzeichnis. Voraussetzung: Überschriften mit Formatvorlagen formatieren." },
      { front: "Was sind Spalten in Word?", back: "Die Aufteilung des Textes in mehrere vertikale Bereiche nebeneinander (wie in Zeitungen)." },
      { front: "Was ist ein Textfeld?", back: "Ein verschiebbarer Container für Text, der unabhängig vom Fließtext positioniert werden kann." },
      { front: "Was ist Silbentrennung?", back: "Die automatische oder manuelle Trennung von Wörtern am Zeilenende, um gleichmäßigere Zeilen zu erhalten." }
    ]
  },
  {
    type: "flashcards",
    title: "Tabellen & Aufzählungen",
    cards: [
      { front: "Wie fügt man eine Tabelle ein?", back: "Einfügen → Tabelle, dann Zeilen und Spalten wählen oder mit der Maus aufziehen." },
      { front: "Wie fügt man eine Zeile in einer Tabelle hinzu?", back: "Rechtsklick in Tabelle → Einfügen → Zeile oberhalb/unterhalb einfügen." },
      { front: "Wie verbindet man Zellen?", back: "Zellen markieren → Rechtsklick → Zellen verbinden oder Tabellentools → Layout → Zellen verbinden." },
      { front: "Was ist der Unterschied zwischen Aufzählung und Nummerierung?", back: "Aufzählung: Punkte oder Symbole ohne Reihenfolge. Nummerierung: Zahlen oder Buchstaben mit Reihenfolge." },
      { front: "Wie erstellt man eine Aufzählung?", back: "Start → Aufzählungszeichen oder während der Eingabe * oder - am Zeilenanfang und Leertaste." },
      { front: "Wie erstellt man eine mehrstufige Liste?", back: "Tab-Taste zum Einrücken auf nächste Ebene, Shift+Tab zum Zurücksetzen auf vorherige Ebene." },
      { front: "Wie sortiert man eine Tabelle?", back: "In Tabelle klicken → Tabellentools → Layout → Sortieren." },
      { front: "Was ist die Tabellenautomatik?", back: "Eine Funktion, die Spaltenbreiten automatisch an den Inhalt oder die Fensterbreite anpasst." },
      { front: "Wie wiederholt man Kopfzeilen in langen Tabellen?", back: "Erste Zeile markieren → Tabellentools → Layout → Kopfzeile wiederholen." },
      { front: "Was sind Tabulatoren?", back: "Festgelegte Positionen zum Ausrichten von Text in Spalten ohne Tabelle (über Lineal einstellbar)." }
    ]
  },

  // Quizzes
  {
    type: "quiz",
    title: "Word Grundlagen Quiz",
    questions: [
      { question: "Welche Tastenkombination fügt einen Seitenumbruch ein?", options: ["Strg+Enter", "Shift+Enter", "Alt+Enter", "Strg+Shift+Enter"], correctIndex: 0 },
      { question: "Was ist die Standarddateierweiterung für Word-Dokumente seit 2007?", options: [".doc", ".docx", ".txt", ".rtf"], correctIndex: 1 },
      { question: "Welche Tastenkombination öffnet 'Suchen und Ersetzen'?", options: ["Strg+F", "Strg+H", "Strg+R", "Strg+S"], correctIndex: 1 },
      { question: "Was ist ein Abschnittsumbruch?", options: ["Ein Zeilenumbruch", "Ein Seitenumbruch", "Eine Trennung für unterschiedliche Formatierungsbereiche", "Ein Absatzende"], correctIndex: 2 },
      { question: "Welche Ansicht zeigt das Dokument druckfertig mit Seitenrändern?", options: ["Entwurfsansicht", "Gliederungsansicht", "Seitenlayout", "Leseansicht"], correctIndex: 2 },
      { question: "Wie erzeugt man einen Zeilenumbruch innerhalb eines Absatzes?", options: ["Enter", "Shift+Enter", "Strg+Enter", "Alt+Enter"], correctIndex: 1 },
      { question: "Was macht die Tastenkombination Strg+S?", options: ["Speichern unter", "Dokument speichern", "Suchen", "Seitenzahl einfügen"], correctIndex: 1 },
      { question: "Wo findet man die Dokumenteigenschaften?", options: ["Ansicht → Eigenschaften", "Datei → Informationen", "Einfügen → Eigenschaften", "Start → Eigenschaften"], correctIndex: 1 },
      { question: "Was ist der Unterschied zwischen Speichern und Speichern unter?", options: ["Kein Unterschied", "Speichern unter ist schneller", "Speichern unter ermöglicht neuen Namen/Speicherort", "Speichern erstellt eine Kopie"], correctIndex: 2 },
      { question: "Welche Tastenkombination wählt das gesamte Dokument aus?", options: ["Strg+A", "Strg+D", "Strg+E", "Strg+S"], correctIndex: 0 }
    ]
  },
  {
    type: "quiz",
    title: "Textformatierung Quiz",
    questions: [
      { question: "Welche Tastenkombination macht Text fett?", options: ["Strg+B", "Strg+F", "Strg+K", "Strg+T"], correctIndex: 0 },
      { question: "Was ist eine Formatvorlage?", options: ["Eine leere Dokumentvorlage", "Eine vordefinierte Kombination von Formatierungen", "Ein Druckformat", "Eine Seiteneinstellung"], correctIndex: 1 },
      { question: "Welche Textausrichtung verteilt den Text gleichmäßig zwischen den Rändern?", options: ["Linksbündig", "Zentriert", "Rechtsbündig", "Blocksatz"], correctIndex: 3 },
      { question: "Wie entfernt man alle Formatierungen von markiertem Text?", options: ["Strg+Z", "Strg+Leertaste", "Strg+Delete", "Strg+Shift+F"], correctIndex: 1 },
      { question: "Was ist ein Erstzeileneinzug?", options: ["Der Abstand zum oberen Seitenrand", "Ein Einzug nur der ersten Zeile eines Absatzes", "Der Abstand zwischen Absätzen", "Die Einrückung aller Zeilen"], correctIndex: 1 },
      { question: "Welcher Zeilenabstand entspricht dem Standard?", options: ["Einfach (1,0)", "1,15", "1,5", "Doppelt (2,0)"], correctIndex: 1 },
      { question: "Was ist der Unterschied zwischen weicher und harter Formatierung?", options: ["Weich ist langsamer", "Weich verwendet Formatvorlagen, hart ist direkte Formatierung", "Kein Unterschied", "Hart ist permanent, weich temporär"], correctIndex: 1 },
      { question: "Welche Tastenkombination macht Text kursiv?", options: ["Strg+K", "Strg+I", "Strg+U", "Strg+J"], correctIndex: 1 },
      { question: "Was bewirkt die Taste F4 in Word?", options: ["Dokument speichern", "Letzte Aktion wiederholen", "Hilfe öffnen", "Drucken"], correctIndex: 1 },
      { question: "Wo ändert man den Absatzabstand vor und nach?", options: ["Start → Schriftart", "Start → Absatz", "Layout → Seitenränder", "Einfügen → Abstand"], correctIndex: 1 }
    ]
  },
  {
    type: "quiz",
    title: "Seitengestaltung Quiz",
    questions: [
      { question: "Wo ändert man die Seitenränder?", options: ["Start → Seitenränder", "Einfügen → Seitenränder", "Layout → Seitenränder", "Ansicht → Seitenränder"], correctIndex: 2 },
      { question: "Wie fügt man Seitenzahlen ein?", options: ["Start → Seitenzahl", "Einfügen → Seitenzahl", "Layout → Seitenzahl", "Referenzen → Seitenzahl"], correctIndex: 1 },
      { question: "Was muss man tun, bevor ein automatisches Inhaltsverzeichnis erstellt werden kann?", options: ["Seitenzahlen einfügen", "Überschriften mit Formatvorlagen formatieren", "Kopfzeilen einrichten", "Dokument speichern"], correctIndex: 1 },
      { question: "Wie erstellt man ein Inhaltsverzeichnis?", options: ["Start → Inhaltsverzeichnis", "Einfügen → Inhaltsverzeichnis", "Layout → Inhaltsverzeichnis", "Referenzen → Inhaltsverzeichnis"], correctIndex: 3 },
      { question: "Was ist ein Wasserzeichen?", options: ["Eine Fußnote", "Ein halbtransparenter Hintergrundtext oder -bild", "Eine Seitenrandmarkierung", "Eine Kopfzeile"], correctIndex: 1 },
      { question: "Wie ändert man die Seitenausrichtung auf Querformat?", options: ["Datei → Querformat", "Layout → Ausrichtung → Querformat", "Ansicht → Querformat", "Start → Querformat"], correctIndex: 1 },
      { question: "Wie erstellt man unterschiedliche Kopfzeilen für gerade und ungerade Seiten?", options: ["Zwei separate Dokumente erstellen", "In Kopf-/Fußzeilentools 'Gerade & ungerade Seiten unterschiedlich' aktivieren", "Nicht möglich in Word", "Für jede Seite manuell ändern"], correctIndex: 1 },
      { question: "Was ist ein Textfeld?", options: ["Ein Eingabefeld für Formulare", "Ein verschiebbarer Container für Text", "Ein Textmarker", "Eine Fußnote"], correctIndex: 1 },
      { question: "Was bewirkt die Silbentrennung?", options: ["Trennt Wörter am Satzende", "Trennt lange Wörter am Zeilenende", "Trennt Absätze", "Trennt Seiten"], correctIndex: 1 },
      { question: "Wie erstellt man Spalten im Text?", options: ["Layout → Spalten", "Einfügen → Spalten", "Start → Spalten", "Tabelle einfügen"], correctIndex: 0 }
    ]
  },
  {
    type: "quiz",
    title: "Tabellen & Listen Quiz",
    questions: [
      { question: "Wie fügt man eine Tabelle in Word ein?", options: ["Start → Tabelle", "Einfügen → Tabelle", "Layout → Tabelle", "Referenzen → Tabelle"], correctIndex: 1 },
      { question: "Wie fügt man eine Zeile in einer Tabelle hinzu?", options: ["Neue Tabelle erstellen", "Rechtsklick → Einfügen → Zeile", "Zeile kopieren", "Strg+Enter"], correctIndex: 1 },
      { question: "Was ist der Unterschied zwischen Aufzählung und Nummerierung?", options: ["Kein Unterschied", "Aufzählung = Symbole, Nummerierung = Zahlen mit Reihenfolge", "Nummerierung für mehr als 10 Punkte", "Aufzählung ist automatisch"], correctIndex: 1 },
      { question: "Wie rückt man einen Listenpunkt eine Ebene ein?", options: ["Leertaste", "Tab-Taste", "Enter", "Shift+Tab"], correctIndex: 1 },
      { question: "Wie verbindet man mehrere Zellen in einer Tabelle?", options: ["Zellen löschen", "Zellen markieren → Rechtsklick → Zellen verbinden", "Neue Zelle darüber einfügen", "Nicht möglich"], correctIndex: 1 },
      { question: "Wie sortiert man eine Tabelle nach einer Spalte?", options: ["Manuell Zeilen verschieben", "Tabellentools → Layout → Sortieren", "Strg+S", "Rechtsklick → Sortieren"], correctIndex: 1 },
      { question: "Was bewirkt 'Kopfzeile wiederholen' bei Tabellen?", options: ["Kopiert die Kopfzeile", "Wiederholt die erste Zeile auf jeder Seite bei langen Tabellen", "Macht die Kopfzeile fett", "Löscht die Kopfzeile"], correctIndex: 1 },
      { question: "Was sind Tabulatoren?", options: ["Tabellenzellen", "Positionen zum Ausrichten von Text in Spalten", "Absatzmarkierungen", "Seitenumbrüche"], correctIndex: 1 },
      { question: "Welche Tabulatorarten gibt es?", options: ["Nur linksbündig", "Links, rechts, zentriert, dezimal", "Nur nummeriert", "Keine Arten"], correctIndex: 1 },
      { question: "Wie entfernt man einen Rahmen von einer Tabelle?", options: ["Tabelle löschen", "Tabellentools → Design → Rahmen → Kein Rahmen", "Strg+R", "Tabelle als Bild einfügen"], correctIndex: 1 }
    ]
  }
];
