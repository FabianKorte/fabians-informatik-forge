import { LearnModule } from "@/types/learn";

export const praesentationsprogrammeModules: LearnModule[] = [
  // Flashcards
  {
    type: "flashcards",
    title: "PowerPoint Grundlagen",
    cards: [
      { front: "Was ist eine Folie (Slide)?", back: "Eine einzelne Seite einer Präsentation, die Text, Bilder, Grafiken und andere Elemente enthalten kann." },
      { front: "Was ist ein Folienmaster?", back: "Eine Vorlage, die das Grundlayout, Schriftarten, Farben und Platzhalter für alle Folien einer Präsentation definiert." },
      { front: "Was ist ein Folienlayout?", back: "Eine vordefinierte Anordnung von Platzhaltern auf einer Folie (z.B. Titel, Inhalt, Zwei Spalten)." },
      { front: "Was ist der Unterschied zwischen Design und Layout?", back: "Design: Optische Gestaltung (Farben, Schriften, Hintergrund). Layout: Strukturelle Anordnung der Elemente auf der Folie." },
      { front: "Was ist die Normalansicht?", back: "Die Standardarbeitsansicht zum Bearbeiten einzelner Folien mit Folienbereich, Arbeitsbereich und Notizbereich." },
      { front: "Was ist die Foliensortierungsansicht?", back: "Eine Übersicht aller Folien als Miniaturbilder zum einfachen Umordnen und Organisieren." },
      { front: "Was ist die Referentenansicht?", back: "Eine spezielle Ansicht während der Präsentation, die dem Vortragenden Notizen, Timer und Vorschau zeigt." },
      { front: "Was sind Folienübergänge?", back: "Animationseffekte, die beim Wechsel zwischen zwei Folien abgespielt werden." },
      { front: "Was sind Animationen in PowerPoint?", back: "Effekte, die einzelne Elemente auf einer Folie ein- oder ausblenden oder bewegen." },
      { front: "Was ist ein Platzhalter?", back: "Ein vordefinierter Bereich auf einer Folie für bestimmte Inhaltstypen wie Titel, Text oder Bilder." }
    ]
  },
  {
    type: "flashcards",
    title: "Präsentationsgestaltung",
    cards: [
      { front: "Was ist die 6x6-Regel?", back: "Maximal 6 Zeilen pro Folie und maximal 6 Wörter pro Zeile für bessere Lesbarkeit." },
      { front: "Was ist die 10-20-30-Regel (Guy Kawasaki)?", back: "Maximal 10 Folien, maximal 20 Minuten Vortragsdauer, mindestens 30pt Schriftgröße." },
      { front: "Welche Schriftgröße wird für Titel empfohlen?", back: "Mindestens 32-44pt für Titel, damit sie auch aus der letzten Reihe lesbar sind." },
      { front: "Welche Schriftgröße wird für Fließtext empfohlen?", back: "Mindestens 24-28pt für Fließtext, um gute Lesbarkeit zu gewährleisten." },
      { front: "Was sind serifenlose Schriften?", back: "Schriften ohne Serifen (z.B. Arial, Calibri), die auf Bildschirmen besser lesbar sind." },
      { front: "Warum sollte man Aufzählungszeichen verwenden?", back: "Sie strukturieren Informationen, verbessern die Übersichtlichkeit und erleichtern das Mitlesen." },
      { front: "Was ist der Kontrast bei Präsentationen?", back: "Der Unterschied zwischen Vorder- und Hintergrundfarbe - hoher Kontrast verbessert die Lesbarkeit." },
      { front: "Was ist die KISS-Regel?", back: "Keep It Short and Simple - Präsentationen sollten einfach und auf das Wesentliche reduziert sein." },
      { front: "Was ist ein Eyecatcher?", back: "Ein visuelles Element (Bild, Grafik), das Aufmerksamkeit erregt und die Kernaussage unterstützt." },
      { front: "Was bedeutet Konsistenz in Präsentationen?", back: "Einheitliche Verwendung von Schriften, Farben, Layouts und Stilen über alle Folien hinweg." }
    ]
  },
  {
    type: "flashcards",
    title: "PowerPoint Funktionen",
    cards: [
      { front: "Wie fügt man eine neue Folie ein?", back: "Start → Neue Folie oder Tastenkombination Strg+M." },
      { front: "Wie dupliziert man eine Folie?", back: "Rechtsklick auf Folie → Folie duplizieren oder Strg+D." },
      { front: "Was sind SmartArt-Grafiken?", back: "Vorgefertigte Diagramme zur visuellen Darstellung von Listen, Prozessen, Hierarchien oder Beziehungen." },
      { front: "Wie fügt man ein Diagramm ein?", back: "Einfügen → Diagramm, dann Diagrammtyp wählen und Daten eingeben." },
      { front: "Was ist ein Hyperlink in PowerPoint?", back: "Ein klickbarer Verweis, der zu einer anderen Folie, Datei oder Webseite führt." },
      { front: "Wie erstellt man einen Hyperlink?", back: "Element markieren → Einfügen → Link oder Strg+K." },
      { front: "Was ist die Funktion 'Bildschirmpräsentation'?", back: "Der Vollbildmodus zur Wiedergabe der fertigen Präsentation (F5 oder Shift+F5 ab aktueller Folie)." },
      { front: "Wie blendet man Folien aus?", back: "Rechtsklick auf Folie → Folie ausblenden. Die Folie wird in der Präsentation übersprungen." },
      { front: "Was ist die Referentennotizen-Funktion?", back: "Ein Bereich unter jeder Folie für Sprechernotizen, die nur der Vortragende sieht." },
      { front: "Wie exportiert man eine Präsentation als PDF?", back: "Datei → Exportieren → PDF/XPS-Dokument erstellen oder Speichern unter → PDF." }
    ]
  },
  {
    type: "flashcards",
    title: "Animationen & Multimedia",
    cards: [
      { front: "Welche Animationstypen gibt es?", back: "Eingang (erscheinen), Hervorhebung (betonen), Ausgang (verschwinden) und Animationspfade (Bewegung)." },
      { front: "Was ist ein Animationspfad?", back: "Eine vordefinierte oder selbst gezeichnete Route, entlang der sich ein Objekt bewegt." },
      { front: "Wie stellt man die Animationsreihenfolge ein?", back: "Animationsbereich öffnen → Elemente per Drag & Drop oder Pfeilschaltflächen sortieren." },
      { front: "Was bedeutet 'Nach Klick' bei Animationen?", back: "Die Animation startet erst, wenn der Vortragende klickt oder eine Taste drückt." },
      { front: "Was bedeutet 'Mit Vorherigem' bei Animationen?", back: "Die Animation startet gleichzeitig mit der vorherigen Animation." },
      { front: "Wie fügt man ein Video ein?", back: "Einfügen → Video → Video auf meinem Computer oder Onlinevideo." },
      { front: "Wie fügt man Audio ein?", back: "Einfügen → Audio → Audio auf meinem Computer oder Audio aufnehmen." },
      { front: "Was ist die Funktion 'Zuschneiden' bei Videos?", back: "Ermöglicht das Kürzen des Videos am Anfang und/oder Ende ohne externe Software." },
      { front: "Was sind Übergangssound-Effekte?", back: "Audioeffekte, die beim Folienwechsel abgespielt werden können." },
      { front: "Warum sollte man Animationen sparsam einsetzen?", back: "Zu viele Animationen lenken ab, wirken unprofessionell und verlängern die Präsentationszeit." }
    ]
  },

  // Quizzes
  {
    type: "quiz",
    title: "PowerPoint Grundlagen Quiz",
    questions: [
      { question: "Welche Tastenkombination startet die Bildschirmpräsentation von Anfang an?", options: ["F5", "Strg+F5", "Alt+F5", "Shift+F5"], correctIndex: 0 },
      { question: "Was definiert der Folienmaster?", options: ["Nur die Schriftart", "Nur das Farbschema", "Layout, Schriften, Farben und Platzhalter für alle Folien", "Die Animationsreihenfolge"], correctIndex: 2 },
      { question: "Welche Ansicht eignet sich am besten zum Umordnen von Folien?", options: ["Normalansicht", "Gliederungsansicht", "Foliensortierung", "Leseansicht"], correctIndex: 2 },
      { question: "Was empfiehlt die 6x6-Regel?", options: ["6 Folien mit 6 Bildern", "Maximal 6 Zeilen und 6 Wörter pro Zeile", "6 Minuten Redezeit pro Folie", "6 Farben maximal"], correctIndex: 1 },
      { question: "Welche Schriftgröße wird für Fließtext in Präsentationen minimal empfohlen?", options: ["12pt", "18pt", "24pt", "36pt"], correctIndex: 2 },
      { question: "Welche Tastenkombination fügt eine neue Folie ein?", options: ["Strg+N", "Strg+M", "Strg+F", "Strg+S"], correctIndex: 1 },
      { question: "Was sind SmartArt-Grafiken?", options: ["Clipart-Bilder", "Vorgefertigte Diagramme für Listen, Prozesse und Hierarchien", "Animationseffekte", "Fotocollagen"], correctIndex: 1 },
      { question: "Welcher Animationstyp lässt ein Element erscheinen?", options: ["Ausgang", "Hervorhebung", "Eingang", "Animationspfad"], correctIndex: 2 },
      { question: "Wie exportiert man eine Präsentation als PDF?", options: ["Datei → Drucken → PDF", "Datei → Exportieren → PDF/XPS", "Einfügen → PDF", "Ansicht → PDF"], correctIndex: 1 },
      { question: "Was ist die Referentenansicht?", options: ["Eine Ansicht für das Publikum", "Eine spezielle Bearbeitungsansicht", "Eine Ansicht während der Präsentation mit Notizen und Timer für den Vortragenden", "Die Druckvorschau"], correctIndex: 2 }
    ]
  },
  {
    type: "quiz",
    title: "Präsentationsgestaltung Quiz",
    questions: [
      { question: "Warum sollten serifenlose Schriften in Präsentationen bevorzugt werden?", options: ["Sie sind eleganter", "Sie sind besser auf Bildschirmen lesbar", "Sie sparen Platz", "Sie sind traditioneller"], correctIndex: 1 },
      { question: "Was bedeutet KISS im Kontext von Präsentationen?", options: ["Keep It Short and Simple", "Knowledge Is Sharing Success", "Key Information Stays Strong", "Keep Images Small and Sharp"], correctIndex: 0 },
      { question: "Welche Farben bieten den besten Kontrast?", options: ["Gelb auf Weiß", "Hellgrau auf Dunkelgrau", "Dunkelblau auf Weiß", "Rot auf Orange"], correctIndex: 2 },
      { question: "Was ist ein Eyecatcher?", options: ["Ein Fehler in der Präsentation", "Ein auffälliges visuelles Element", "Eine versteckte Folie", "Ein Animationseffekt"], correctIndex: 1 },
      { question: "Wie viele Hauptpunkte sollte eine Folie maximal haben?", options: ["1-2", "3-5", "7-10", "Unbegrenzt"], correctIndex: 1 },
      { question: "Was ist die 10-20-30-Regel von Guy Kawasaki?", options: ["10 Farben, 20 Schriften, 30 Bilder", "10 Folien, 20 Minuten, 30pt Schrift", "10 Animationen, 20 Übergänge, 30 Sekunden pro Folie", "10 Themen, 20 Unterthemen, 30 Beispiele"], correctIndex: 1 },
      { question: "Warum ist Konsistenz in Präsentationen wichtig?", options: ["Es spart Zeit beim Erstellen", "Es wirkt professionell und erleichtert das Verstehen", "Es ist eine PowerPoint-Anforderung", "Es reduziert die Dateigröße"], correctIndex: 1 },
      { question: "Was sollte auf einer Titelfolie NICHT fehlen?", options: ["Animationen", "Präsentationstitel und Vortragende/r", "Mindestens 3 Bilder", "Vollständige Agenda"], correctIndex: 1 },
      { question: "Wie viele verschiedene Schriftarten sollte eine Präsentation maximal verwenden?", options: ["1", "2-3", "5-6", "Unbegrenzt"], correctIndex: 1 },
      { question: "Was ist der Zweck einer Agenda-Folie?", options: ["Zeitfüller am Anfang", "Übersicht über die Präsentationsstruktur", "Kontaktdaten zeigen", "Testfolie für den Beamer"], correctIndex: 1 }
    ]
  },
  {
    type: "quiz",
    title: "Animationen & Übergänge Quiz",
    questions: [
      { question: "Welche Animationstypen gibt es in PowerPoint?", options: ["Nur Eingang und Ausgang", "Eingang, Hervorhebung, Ausgang und Animationspfade", "Nur Bewegungseffekte", "Nur Textanimationen"], correctIndex: 1 },
      { question: "Was bewirkt die Einstellung 'Mit Vorherigem' bei Animationen?", options: ["Animation startet nach Klick", "Animation startet gleichzeitig mit der vorherigen", "Animation wird übersprungen", "Animation läuft rückwärts"], correctIndex: 1 },
      { question: "Wo wird die Animationsreihenfolge eingestellt?", options: ["Im Folienmaster", "Im Animationsbereich", "In der Foliensortierung", "Im Druckmenü"], correctIndex: 1 },
      { question: "Was ist ein Folienübergang?", options: ["Ein Hyperlink zwischen Folien", "Ein Animationseffekt beim Folienwechsel", "Eine Fußzeile", "Ein Kommentar"], correctIndex: 1 },
      { question: "Warum sollte man Animationen sparsam einsetzen?", options: ["Sie erhöhen die Dateigröße", "Sie lenken ab und können unprofessionell wirken", "Sie funktionieren nicht auf allen Computern", "Sie sind verboten"], correctIndex: 1 },
      { question: "Welches Format eignet sich für Videos in PowerPoint am besten?", options: [".avi", ".mp4", ".mov", ".flv"], correctIndex: 1 },
      { question: "Was ist ein Animationspfad?", options: ["Eine Verbindung zwischen Folien", "Eine Route, entlang der sich ein Objekt bewegt", "Ein Ordner für Animationen", "Eine Animationsvorlage"], correctIndex: 1 },
      { question: "Wie kann man ein eingebettetes Video kürzen?", options: ["Video löschen und neu einfügen", "Mit der Funktion 'Video kürzen' in PowerPoint", "Nur mit externem Programm möglich", "Durch Ändern der Animationsdauer"], correctIndex: 1 },
      { question: "Welche Dauer ist für einen Folienübergang empfehlenswert?", options: ["0 Sekunden", "0,5-1 Sekunde", "3-5 Sekunden", "10 Sekunden"], correctIndex: 1 },
      { question: "Was passiert bei der Animationseinstellung 'Nach Vorherigem'?", options: ["Animation startet nach Klick", "Animation startet automatisch nach der vorherigen", "Animation wird wiederholt", "Animation wird übersprungen"], correctIndex: 1 }
    ]
  }
];
