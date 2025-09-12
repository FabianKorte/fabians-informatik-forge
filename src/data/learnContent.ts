import type { LearnModule } from "@/types/learn";

export const learnContent: Record<string, LearnModule[]> = {
  programmierung: [
    {
      type: "flashcards",
      title: "Grundbegriffe der Programmierung",
      cards: [
        { front: "Algorithmus", back: "Endliche, eindeutige Schrittfolge zur Lösung eines Problems. Ein Algorithmus muss terminieren (endlich sein), deterministisch (eindeutig) und effektiv (ausführbar) sein. Beispiel: Sortieralgorithmen wie Quicksort. Wichtige Eigenschaften: Terminierung (hört auf), Determiniertheit (bei gleicher Eingabe gleiche Ausgabe), Determinismus (nächster Schritt eindeutig), Finitheit (endlich beschreibbar)." },
        { front: "Variable", back: "Benannter Speicherplatz für veränderliche Werte. Variablen haben einen Namen, Typ und Wert. Sie ermöglichen es, Daten zu speichern und zu manipulieren. In verschiedenen Sprachen unterschiedlich deklariert (var, let, const in JS). Unterscheidung: lokale vs. globale Variablen, statische vs. dynamische Typisierung." },
        { front: "Funktion", back: "Wiederverwendbarer Codeblock mit optionalen Eingaben (Parameter) und Rückgabewert. Funktionen kapseln Logik, fördern Code-Wiederverwendung und erleichtern Testing. Können rekursiv, anonym oder als Higher-Order-Functions implementiert werden. Vorteile: Modularität, Testbarkeit, Wartbarkeit, Wiederverwendbarkeit." },
        { front: "Big-O: O(n)", back: "Lineare Zeitkomplexität - Laufzeit wächst proportional zur Eingabegröße. Bei doppelter Eingabe verdoppelt sich auch die Laufzeit. Beispiele: Lineare Suche, einfaches Array durchlaufen. Besser als O(n²), schlechter als O(log n). Andere: O(1) konstant, O(log n) logarithmisch, O(n²) quadratisch." },
        { front: "Rekursion", back: "Programmiertechnik, bei der eine Funktion sich selbst mit kleineren Probleminstanzen aufruft. Benötigt eine Abbruchbedingung (Base Case). Elegant für Probleme wie Fakultät, Fibonacci, Baumtraversierung. Kann Stack Overflow verursachen. Alternative: Iteration mit Schleifen oft effizienter." },
        { front: "Stack", back: "LIFO-Datenstruktur (Last In, First Out). Das zuletzt hinzugefügte Element wird zuerst entfernt. Operationen: push (hinzufügen), pop (entfernen), peek (anschauen). Verwendet für Funktionsaufrufe, Undo-Mechanismen, Klammerprüfung. Call Stack speichert Funktionsaufrufe und lokale Variablen." },
        { front: "Queue", back: "FIFO-Datenstruktur (First In, First Out). Das erste hinzugefügte Element wird zuerst entfernt. Operationen: enqueue (hinzufügen), dequeue (entfernen). Verwendet für Task-Scheduling, Breadth-First-Search, Print-Queues. Varianten: Priority Queue, Circular Queue, Double-ended Queue (Deque)." },
        { front: "Hash-Table", back: "Datenstruktur für schnellen Zugriff über Schlüssel-Wert-Paare mit O(1) durchschnittlicher Komplexität. Verwendet Hash-Funktionen zur Berechnung von Array-Indizes. Kollisionen werden durch Chaining oder Open Addressing behandelt. Load Factor sollte < 0.75 bleiben für optimale Performance." },
        { front: "Polymorphismus", back: "Fähigkeit von Objekten verschiedener Klassen, auf dieselbe Nachricht unterschiedlich zu reagieren. Ad-hoc-Polymorphismus (Überladung), parametrischer Polymorphismus (Generics), Subtyp-Polymorphismus (Vererbung). Ermöglicht flexible und erweiterbare Code-Strukturen." },
        { front: "Kapselung", back: "Verbergung von Implementierungsdetails hinter einer definierten Schnittstelle. Information Hiding Prinzip - Zugriff nur über öffentliche Methoden. Schützt Datenintegrität und ermöglicht Änderungen der internen Implementierung ohne Auswirkungen auf den Client-Code." },
        { front: "Vererbung", back: "Mechanismus zur Erstellung neuer Klassen basierend auf bestehenden Klassen. Unterklassen erben Eigenschaften und Methoden der Oberklasse. Ermöglicht Code-Wiederverwendung und Is-A-Beziehungen. Kann zu Complex Inheritance Hierarchies führen - Composition over Inheritance bevorzugen." },
        { front: "Design Pattern", back: "Bewährte Lösungsmuster für wiederkehrende Entwurfsprobleme. Creational (Singleton, Factory), Structural (Adapter, Decorator), Behavioral (Observer, Strategy). Fördern Best Practices, Kommunikation zwischen Entwicklern und Wartbarkeit." },
        { front: "MVC-Pattern", back: "Model-View-Controller Architekturmuster. Model: Daten und Geschäftslogik, View: Präsentation, Controller: Steuerung. Trennt Darstellung von Logik für bessere Wartbarkeit und Testbarkeit." },
        { front: "SOLID-Prinzipien", back: "S: Single Responsibility, O: Open/Closed, L: Liskov Substitution, I: Interface Segregation, D: Dependency Inversion. Grundlagen für sauberen, wartbaren objekt-orientierten Code." },
        { front: "Thread", back: "Leichtgewichtiger Prozess innerhalb eines Programms. Ermöglicht parallele Ausführung. Shared Memory zwischen Threads eines Prozesses. Race Conditions durch Synchronisation vermeiden (Mutex, Semaphore)." }
      ]
    },
    {
      type: "quiz", 
      title: "JavaScript/TypeScript Grundlagen",
      questions: [
        { 
          question: "Was macht 'const' in JavaScript?", 
          options: ["Variable ist neu zuweisbar", "Konstante, Referenz nicht neu zuweisbar", "Nur in Klassen nutzbar", "Nur global verfügbar"], 
          correctIndex: 1, 
          explanation: "const verhindert die Neuzuweisung der Referenz, aber Objektinhalte können verändert werden. Beispiel: const arr = []; arr.push(1); // erlaubt, aber arr = [] // Fehler. const schützt vor versehentlicher Neuzuweisung und macht Code vorhersagbarer." 
        },
        { 
          question: "Was ist 'typeof null' in JavaScript?", 
          options: ["null", "object", "undefined", "string"], 
          correctIndex: 1, 
          explanation: "Dies ist ein historischer Bug in JavaScript seit der ersten Version. null sollte eigentlich 'null' zurückgeben, aber aus Kompatibilitätsgründen wurde es nie geändert. Um auf null zu prüfen: value === null verwenden, nicht typeof." 
        },
        { 
          question: "Was fügt TypeScript zu JavaScript hinzu?", 
          options: ["Runtime-Performance-Verbesserungen", "Statische Typisierung", "Neue Browser-APIs", "CSS-Features"], 
          correctIndex: 1, 
          explanation: "TypeScript erweitert JavaScript um ein optionales statisches Typsystem. Dies ermöglicht Fehlerdetection zur Compile-Zeit, bessere IDE-Unterstützung und selbst-dokumentierenden Code. TypeScript wird zu JavaScript transpiliert." 
        },
        { 
          question: "Welche Schleife iteriert über Werte (nicht Indizes) eines Arrays?", 
          options: ["for...in", "for...of", "while", "do...while"], 
          correctIndex: 1, 
          explanation: "for...of iteriert über die Werte: for(const value of array). for...in iteriert über die Schlüssel/Indizes. for...of funktioniert mit allen Iterables (Arrays, Sets, Maps, Strings). Moderne Alternative zu forEach." 
        },
        { 
          question: "Was ist Hoisting in JavaScript?", 
          options: ["Variablendeklarationen werden nach oben gezogen", "Performance-Optimierung", "Browser-Feature", "CSS-Eigenschaft"], 
          correctIndex: 0, 
          explanation: "Hoisting bedeutet, dass var-Deklarationen und function-Deklarationen an den Anfang ihres Scopes gezogen werden. var wird mit 'undefined' initialisiert, let/const verbleiben in der 'Temporal Dead Zone'. Function declarations sind komplett gehoisted." 
        },
        { 
          question: "Was ist der Unterschied zwischen '==' und '===' in JavaScript?", 
          options: ["Kein Unterschied", "=== prüft Typ und Wert, == nur Wert", "== ist neuer", "=== ist langsamer"], 
          correctIndex: 1, 
          explanation: "=== (strict equality) prüft Typ und Wert ohne Typkonvertierung. == (loose equality) führt Typkonvertierung durch. '5' == 5 ist true, '5' === 5 ist false. Immer === verwenden für vorhersagbares Verhalten." 
        },
        { 
          question: "Was passiert bei 'this' in Arrow Functions?", 
          options: ["this wird neu gebunden", "this bleibt vom umgebenden Scope", "this ist undefined", "this bezieht sich auf window"], 
          correctIndex: 1, 
          explanation: "Arrow Functions haben kein eigenes 'this' - sie übernehmen 'this' vom umgebenden lexikalischen Scope. Reguläre Functions haben ihr eigenes 'this' je nach Aufrufkontext. Deshalb sind Arrow Functions ideal für Callbacks." 
        },
        { 
          question: "Was ist Closure in JavaScript?", 
          options: ["Eine geschlossene Funktion", "Zugriff auf äußere Variablen nach Funktionsende", "Ein Designpattern", "Eine Schleifenart"], 
          correctIndex: 1, 
          explanation: "Closure ermöglicht inneren Funktionen den Zugriff auf Variablen ihrer äußeren Funktion, auch nachdem die äußere Funktion beendet wurde. Ermöglicht Private Variables und Module Pattern. Grundlage für viele JS-Features." 
        }
      ]
    },
    {
      type: "matching",
      title: "Programmierparadigmen zuordnen",
      pairs: [
        { left: "Imperativ", right: "Schritt-für-Schritt Anweisungen (C, Pascal)" },
        { left: "Funktional", right: "Funktionen ohne Seiteneffekte (Haskell, Lisp)" },
        { left: "Objektorientiert", right: "Klassen, Objekte, Vererbung (Java, C++)" },
        { left: "Deklarativ", right: "Was statt wie (SQL, HTML)" },
        { left: "Prozedurale Programmierung", right: "Strukturierte Programmierung mit Funktionen" },
        { left: "Event-driven", right: "Reaktion auf Ereignisse (GUI-Programmierung)" },
        { left: "Logic Programming", right: "Fakten und Regeln (Prolog)" },
        { left: "Concurrent Programming", right: "Parallele Ausführung mehrerer Threads" }
      ]
    },
    {
      type: "code",
      title: "JavaScript Übungen", 
      challenges: [
        {
          title: "Array Filter - Gerade Zahlen",
          description: "Filtere alle geraden Zahlen aus dem Array und gib sie zurück. Verwende die filter()-Methode mit einer Arrow Function.",
          initialCode: "const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n// Filtere alle geraden Zahlen\nconst evenNumbers = ",
          solution: "const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\nconst evenNumbers = numbers.filter(n => n % 2 === 0);",
          tests: [
            { input: "[1,2,3,4,5,6]", expected: "[2,4,6]" },
            { input: "[1,3,5,7]", expected: "[]" }
          ]
        },
        {
          title: "Fibonacci Rekursiv",
          description: "Implementiere die Fibonacci-Funktion rekursiv. F(n) = F(n-1) + F(n-2), mit F(0) = 0 und F(1) = 1.",
          initialCode: "function fibonacci(n) {\n  // Base cases implementieren\n  // Rekursiver Aufruf\n}",
          solution: "function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n-1) + fibonacci(n-2);\n}",
          tests: [
            { input: "0", expected: "0" },
            { input: "5", expected: "5" }
          ]
        },
        {
          title: "Array Reduce - Summe",
          description: "Berechne die Summe aller Zahlen im Array mit der reduce()-Methode.",
          initialCode: "const numbers = [1, 2, 3, 4, 5];\n// Berechne die Summe\nconst sum = ",
          solution: "const numbers = [1, 2, 3, 4, 5];\nconst sum = numbers.reduce((acc, curr) => acc + curr, 0);",
          tests: [
            { input: "[1,2,3,4,5]", expected: "15" },
            { input: "[]", expected: "0" }
          ]
        },
        {
          title: "Promise mit async/await", 
          description: "Implementiere eine async Funktion die ein Promise auflöst.",
          initialCode: "// Erstelle eine async Funktion fetchData\n// die nach 1s 'Daten geladen' zurückgibt\n",
          solution: "async function fetchData() {\n  await new Promise(resolve => setTimeout(resolve, 1000));\n  return 'Daten geladen';\n}",
          tests: [
            { input: "await fetchData()", expected: "'Daten geladen'" }
          ]
        },
        {
          title: "Class mit Constructor",
          description: "Erstelle eine Person-Klasse mit Constructor und einer greet()-Methode.",
          initialCode: "class Person {\n  // Constructor implementieren\n  // greet() Methode implementieren\n}",
          solution: "class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n  \n  greet() {\n    return `Hallo, ich bin ${this.name} und ${this.age} Jahre alt.`;\n  }\n}",
          tests: [
            { input: "new Person('Max', 25).greet()", expected: "'Hallo, ich bin Max und 25 Jahre alt.'" }
          ]
        },
        {
          title: "Higher-Order Function",
          description: "Schreibe eine Funktion die eine andere Funktion als Parameter nimmt",
          initialCode: "// Implementiere eine map-Funktion\nfunction myMap(array, callback) {\n  // dein Code hier\n}",
          solution: "function myMap(array, callback) {\n  const result = [];\n  for (let i = 0; i < array.length; i++) {\n    result.push(callback(array[i], i));\n  }\n  return result;\n}",
          tests: [
            { input: "myMap([1,2,3], x => x*2)", expected: "[2,4,6]" }
          ]
        }
      ]
    },
    {
      type: "dragdrop",
      title: "Programmierung Drag & Drop",
      games: [
        {
          title: "Sortieralgorithmen zuordnen",
          description: "Ordne die Algorithmen nach ihrer Komplexität",
          items: [
            { id: "bubble", content: "Bubble Sort", category: "O(n²)" },
            { id: "quick", content: "Quick Sort", category: "O(n log n)" },
            { id: "insertion", content: "Insertion Sort", category: "O(n²)" },
            { id: "merge", content: "Merge Sort", category: "O(n log n)" },
            { id: "selection", content: "Selection Sort", category: "O(n²)" },
            { id: "heap", content: "Heap Sort", category: "O(n log n)" },
            { id: "radix", content: "Radix Sort", category: "O(kn)" },
            { id: "bucket", content: "Bucket Sort", category: "O(n + k)" }
          ],
          categories: ["O(n²)", "O(n log n)", "O(kn)", "O(n + k)"]
        },
        {
          title: "Design Patterns kategorisieren",
          description: "Ordne die Design Patterns in die richtigen Kategorien ein",
          items: [
            { id: "singleton", content: "Singleton", category: "Creational" },
            { id: "factory", content: "Factory Method", category: "Creational" },
            { id: "adapter", content: "Adapter", category: "Structural" },
            { id: "decorator", content: "Decorator", category: "Structural" },
            { id: "observer", content: "Observer", category: "Behavioral" },
            { id: "strategy", content: "Strategy", category: "Behavioral" },
            { id: "builder", content: "Builder", category: "Creational" },
            { id: "proxy", content: "Proxy", category: "Structural" }
          ],
          categories: ["Creational", "Structural", "Behavioral"]
        },
        {
          title: "Datentypen zuordnen",
          description: "Ordne die Werte zu ihren Datentypen",
          items: [
            { id: "num1", content: "42", category: "Number" },
            { id: "str1", content: "'Hello'", category: "String" },
            { id: "bool1", content: "true", category: "Boolean" },
            { id: "arr1", content: "[1,2,3]", category: "Array" },
            { id: "obj1", content: "{key: value}", category: "Object" },
            { id: "null1", content: "null", category: "Null" },
            { id: "undef1", content: "undefined", category: "Undefined" },
            { id: "func1", content: "function(){}", category: "Function" }
          ],
          categories: ["Number", "String", "Boolean", "Array", "Object", "Null", "Undefined", "Function"]
        }
      ]
    },
    {
      type: "memory",
      title: "Programmierung Memory",
      games: [
        {
          title: "JavaScript Methoden Memory",
          description: "Finde die zusammengehörigen JavaScript Array-Methoden und ihre Beschreibungen",
          pairs: [
            { id: "map1", content: "map()", match: "Transformiert alle Elemente" },
            { id: "filter1", content: "filter()", match: "Filtert Elemente nach Bedingung" },
            { id: "reduce1", content: "reduce()", match: "Reduziert zu einem Wert" },
            { id: "find1", content: "find()", match: "Findet erstes Element" },
            { id: "some1", content: "some()", match: "Prüft ob mind. eines zutrifft" },
            { id: "every1", content: "every()", match: "Prüft ob alle zutreffen" },
            { id: "forEach1", content: "forEach()", match: "Führt Funktion für alle aus" },
            { id: "sort1", content: "sort()", match: "Sortiert das Array" }
          ]
        },
        {
          title: "Big-O Komplexität Memory",
          description: "Ordne Algorithmen ihrer Zeitkomplexität zu",
          pairs: [
            { id: "linear", content: "Linear Search", match: "O(n)" },
            { id: "binary", content: "Binary Search", match: "O(log n)" },
            { id: "bubble", content: "Bubble Sort", match: "O(n²)" },
            { id: "hash", content: "Hash Table Lookup", match: "O(1)" },
            { id: "merge", content: "Merge Sort", match: "O(n log n)" },
            { id: "nested", content: "Nested Loops", match: "O(n²)" }
          ]
        },
        {
          title: "HTTP Status Codes Memory",
          description: "Verbinde HTTP Status Codes mit ihren Bedeutungen",
          pairs: [
            { id: "200", content: "200", match: "OK - Erfolgreiche Anfrage" },
            { id: "404", content: "404", match: "Not Found - Ressource nicht gefunden" },
            { id: "500", content: "500", match: "Internal Server Error" },
            { id: "401", content: "401", match: "Unauthorized - Authentifizierung fehlt" },
            { id: "403", content: "403", match: "Forbidden - Zugriff verweigert" },
            { id: "301", content: "301", match: "Moved Permanently - Weiterleitung" }
          ]
        }
      ]
    },
    {
      type: "timeline",
      title: "Programmiergeschichte", 
      timelines: [
        {
          title: "Geschichte der Programmiersprachen",
          description: "Wichtige Meilensteine in der Entwicklung von Programmiersprachen",
          events: [
            { year: "1957", event: "FORTRAN entwickelt", description: "Erste höhere Programmiersprache von IBM für wissenschaftliche Berechnungen" },
            { year: "1959", event: "COBOL erstellt", description: "Geschäftsorientierte Programmiersprache für Datenverarbeitung" },
            { year: "1972", event: "C veröffentlicht", description: "Dennis Ritchie entwickelt C bei Bell Labs - Grundlage vieler moderner Sprachen" },
            { year: "1985", event: "C++ entstht", description: "Bjarne Stroustrup erweitert C um objektorientierte Konzepte" },
            { year: "1991", event: "Python veröffentlicht", description: "Guido van Rossum erstellt Python mit Fokus auf Lesbarkeit" },
            { year: "1995", event: "JavaScript geboren", description: "Brendan Eich entwickelt JavaScript in 10 Tagen bei Netscape" },
            { year: "1995", event: "Java erscheint", description: "Sun Microsystems veröffentlicht Java - 'Write once, run anywhere'" },
            { year: "2012", event: "TypeScript angekündigt", description: "Microsoft entwickelt TypeScript als typisierte Erweiterung von JavaScript" }
          ]
        },
        {
          title: "Web-Entwicklung Evolution",
          description: "Entwicklung der Web-Technologien über die Jahre",
          events: [
            { year: "1990", event: "Erstes Web", description: "Tim Berners-Lee erstellt die erste Website am CERN" },
            { year: "1993", event: "HTML standardisiert", description: "HTML wird als Standard für Webseiten etabliert" },
            { year: "1996", event: "CSS eingeführt", description: "Cascading Style Sheets ermöglichen Trennung von Inhalt und Design" },
            { year: "2005", event: "AJAX revolutioniert", description: "Asynchrone Datenübertragung ermöglicht dynamische Webseiten" },
            { year: "2010", event: "HTML5 Standard", description: "HTML5 bringt neue Multimedia- und API-Funktionen" },
            { year: "2013", event: "React veröffentlicht", description: "Facebook open-sourcet React für komponentenbasierte UIs" },
            { year: "2014", event: "Vue.js erscheint", description: "Evan You entwickelt Vue.js als progressive Framework" },
            { year: "2016", event: "Angular 2", description: "Google veröffentlicht Angular 2 als komplette Neuentwicklung" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Programmierung Szenarien",
      scenarios: [
        {
          title: "Performance-Problem lösen",
          description: "Deine Webanwendung lädt sehr langsam",
          scenario: "Eine React-Anwendung braucht 5 Sekunden zum Laden. Die Nutzer beschweren sich über die schlechte Performance. Du musst das Problem identifizieren und lösen.",
          choices: [
            { text: "Code-Splitting und Lazy Loading implementieren", consequence: "Reduziert Bundle-Größe drastisch und verbessert Initial Load Time", isCorrect: true },
            { text: "Mehr RAM für den Server kaufen", consequence: "Löst nicht das Client-seitige Performance-Problem", isCorrect: false },
            { text: "Alle Bilder in höchster Qualität belassen", consequence: "Verschlechtert Performance durch große Dateigrößen", isCorrect: false },
            { text: "useMemo() und useCallback() für teure Berechnungen nutzen", consequence: "Verhindert unnötige Re-Renders und verbessert Performance", isCorrect: true }
          ]
        },
        {
          title: "Debugging einer JavaScript Anwendung",
          description: "Ein Bug tritt nur in Production auf, nicht in Development",
          scenario: "Nach dem Deployment funktioniert eine Feature nicht mehr. Im Development-Modus läuft alles perfekt, aber in Production gibt es Fehler.",
          choices: [
            { text: "Browser DevTools für Remote Debugging nutzen", consequence: "Ermöglicht Debugging der Production-Umgebung", isCorrect: true },
            { text: "Einfach den Code nochmal neu deployen", consequence: "Löst das Problem nicht, da der Fehler weiterhin bestehen bleibt", isCorrect: false },
            { text: "Logging hinzufügen und Error Monitoring einrichten", consequence: "Hilft bei der Identifikation des Problems in Production", isCorrect: true },
            { text: "Alle console.log() statements entfernen", consequence: "Entfernt wichtige Debug-Informationen", isCorrect: false }
          ]
        },
        {
          title: "Code Review Feedback",
          description: "Du musst Code eines Junior Developers reviewen",
          scenario: "Ein neuer Kollege hat Code eingereicht mit vielen verschachtelten if-statements, langen Funktionen und ohne Kommentare. Wie gehst du vor?",
          choices: [
            { text: "Konstruktives Feedback mit Verbesserungsvorschlägen geben", consequence: "Fördert Lernen und Teamarbeit, verbessert Code-Qualität", isCorrect: true },
            { text: "Den Code komplett ablehnen ohne Erklärung", consequence: "Demotiviert den Entwickler und verhindert Lernen", isCorrect: false },
            { text: "Refactoring-Vorschläge machen und SOLID-Prinzipien erklären", consequence: "Vermittelt Best Practices und verbessert Skills", isCorrect: true },
            { text: "Den Code selbst umschreiben ohne zu kommunizieren", consequence: "Verpasste Lernmöglichkeit, keine Wissensübertragung", isCorrect: false }
          ]
        }
      ]
    }
  ],
  datenbanken: [
    {
      type: "flashcards",
      title: "SQL & Normalformen",
      cards: [
        { front: "Primärschlüssel", back: "Eindeutige Identifikation einer Tabellenzeile. Kann nicht NULL sein und muss in jeder Zeile eindeutig sein. Kann aus einem oder mehreren Attributen bestehen (zusammengesetzter Schlüssel). Automatische Indexerstellung für bessere Performance. Bei zusammengesetzten Schlüsseln müssen alle Teile gemeinsam eindeutig sein." },
        { front: "Fremdschlüssel", back: "Verweist auf den Primärschlüssel einer anderen Tabelle und stellt referenzielle Integrität sicher. Kann NULL sein. Ermöglicht Verknüpfungen zwischen Tabellen. Cascade-Optionen: CASCADE (Änderungen übertragen), SET NULL, RESTRICT (verhindert Löschung)." },
        { front: "1. Normalform (1NF)", back: "Alle Attributwerte sind atomar (unteilbar) und es gibt keine wiederholenden Gruppen. Jede Zelle enthält nur einen Wert. Beispiel: Statt 'Tel1, Tel2' zwei separate Telefonnummer-Felder. Eliminiert mehrwertige Attribute." },
        { front: "2. Normalform (2NF)", back: "Erfüllt 1NF und alle Nicht-Schlüssel-Attribute sind vollständig funktional abhängig vom gesamten Primärschlüssel. Eliminiert partielle Abhängigkeiten. Bei zusammengesetzten Schlüsseln dürfen Attribute nicht nur von Teilschlüsseln abhängen." },
        { front: "3. Normalform (3NF)", back: "Erfüllt 2NF und es gibt keine transitiven Abhängigkeiten. Nicht-Schlüssel-Attribute dürfen nur vom Primärschlüssel abhängen, nicht voneinander. Eliminiert indirekte Abhängigkeiten zwischen Nicht-Schlüssel-Attributen." },
        { front: "ACID-Eigenschaften", back: "Atomicity (Unteilbarkeit): Transaktionen sind ganz oder gar nicht. Consistency (Konsistenz): DB bleibt in gültigem Zustand. Isolation (Isolation): Parallele Transaktionen beeinflussen sich nicht. Durability (Dauerhaftigkeit): Änderungen sind permanent gespeichert." }
      ]
    },
    {
      type: "dragdrop",
      title: "SQL Befehle kategorisieren",
      games: [
        {
          title: "SQL-Befehlstypen zuordnen",
          description: "Ordne die SQL-Befehle ihren Kategorien zu",
          items: [
            { id: "select", content: "SELECT", category: "DQL (Data Query)" },
            { id: "insert", content: "INSERT", category: "DML (Data Manipulation)" },
            { id: "update", content: "UPDATE", category: "DML (Data Manipulation)" },
            { id: "delete", content: "DELETE", category: "DML (Data Manipulation)" },
            { id: "create", content: "CREATE TABLE", category: "DDL (Data Definition)" },
            { id: "alter", content: "ALTER TABLE", category: "DDL (Data Definition)" },
            { id: "drop", content: "DROP TABLE", category: "DDL (Data Definition)" },
            { id: "grant", content: "GRANT", category: "DCL (Data Control)" },
            { id: "revoke", content: "REVOKE", category: "DCL (Data Control)" }
          ],
          categories: ["DQL (Data Query)", "DML (Data Manipulation)", "DDL (Data Definition)", "DCL (Data Control)"]
        },
        {
          title: "Datentypen zuordnen",
          description: "Ordne die Werte zu ihren SQL-Datentypen",
          items: [
            { id: "int1", content: "42", category: "INTEGER" },
            { id: "varchar1", content: "'Hallo Welt'", category: "VARCHAR" },
            { id: "date1", content: "'2024-01-15'", category: "DATE" },
            { id: "bool1", content: "TRUE", category: "BOOLEAN" },
            { id: "decimal1", content: "123.45", category: "DECIMAL" },
            { id: "text1", content: "Langer Text...", category: "TEXT" },
            { id: "timestamp1", content: "'2024-01-15 10:30:00'", category: "TIMESTAMP" },
            { id: "blob1", content: "Binärdaten", category: "BLOB" }
          ],
          categories: ["INTEGER", "VARCHAR", "DATE", "BOOLEAN", "DECIMAL", "TEXT", "TIMESTAMP", "BLOB"]
        }
      ]
    },
    {
      type: "memory",
      title: "Datenbank Memory",
      games: [
        {
          title: "JOIN-Typen Memory",
          description: "Verbinde JOIN-Typen mit ihren Beschreibungen",
          pairs: [
            { id: "inner", content: "INNER JOIN", match: "Nur übereinstimmende Datensätze" },
            { id: "left", content: "LEFT JOIN", match: "Alle linken + passende rechte" },
            { id: "right", content: "RIGHT JOIN", match: "Alle rechten + passende linke" },
            { id: "full", content: "FULL OUTER JOIN", match: "Alle Datensätze beider Tabellen" },
            { id: "cross", content: "CROSS JOIN", match: "Kartesisches Produkt" },
            { id: "self", content: "SELF JOIN", match: "Tabelle mit sich selbst verknüpft" }
          ]
        },
        {
          title: "Normalformen Memory",
          description: "Ordne Normalformen ihren Eigenschaften zu",
          pairs: [
            { id: "1nf", content: "1. Normalform", match: "Atomare Werte, keine wiederholenden Gruppen" },
            { id: "2nf", content: "2. Normalform", match: "Keine partiellen Abhängigkeiten" },
            { id: "3nf", content: "3. Normalform", match: "Keine transitiven Abhängigkeiten" },
            { id: "bcnf", content: "Boyce-Codd NF", match: "Jede Determinante ist Kandidatenschlüssel" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Datenbank Szenarien",
      scenarios: [
        {
          title: "Performance-Problem bei Abfragen",
          description: "Datenbank-Queries sind sehr langsam geworden",
          scenario: "Eine wichtige Geschäftsanwendung hat plötzlich sehr langsame Antwortzeiten. Kunden beschweren sich über Wartezeiten beim Laden von Berichten.",
          choices: [
            { text: "Indizes auf häufig abgefragte Spalten erstellen", consequence: "Beschleunigt SELECT-Queries erheblich", isCorrect: true },
            { text: "Alle Daten in eine große Tabelle packen", consequence: "Verschlechtert Performance und Wartbarkeit", isCorrect: false },
            { text: "Query-Optimierung und Execution Plan analysieren", consequence: "Identifiziert Bottlenecks und Optimierungspotential", isCorrect: true },
            { text: "Immer SELECT * verwenden", consequence: "Verschwendet Ressourcen durch unnötige Datenübertragung", isCorrect: false }
          ]
        },
        {
          title: "Datenintegrität sicherstellen",
          description: "Inkonsistente Daten in der Produktionsdatenbank",
          scenario: "Nach einem Software-Update wurden inkonsistente Daten entdeckt. Bestellungen verweisen auf nicht existierende Kunden.",
          choices: [
            { text: "Fremdschlüssel-Constraints hinzufügen", consequence: "Verhindert zukünftige referenzielle Integritätsverletzungen", isCorrect: true },
            { text: "Daten manuell ohne Constraints korrigieren", consequence: "Temporäre Lösung, Problem kann sich wiederholen", isCorrect: false },
            { text: "Transaktionen für Datenänderungen verwenden", consequence: "Stellt sicher dass zusammenhängende Operationen vollständig ausgeführt werden", isCorrect: true }
          ]
        }
      ]
    }
  ],
  "it-sicherheit": [
    {
      type: "flashcards", 
      title: "IT-Sicherheit Grundlagen",
      cards: [
        { front: "CIA-Trias", back: "Confidentiality (Vertraulichkeit): Daten nur für Berechtigte zugänglich. Integrity (Integrität): Schutz vor unerlaubter Veränderung. Availability (Verfügbarkeit): System ist nutzbar wenn benötigt. Grundpfeiler der Informationssicherheit." },
        { front: "Authentifizierung", back: "Verifikation der Identität eines Benutzers oder Systems. Drei Faktoren: Wissen (Passwort), Besitz (Token/Karte), Sein (Biometrie). Multi-Faktor-Authentifizierung kombiniert mindestens zwei Faktoren für höhere Sicherheit." },
        { front: "Autorisierung", back: "Festlegung und Durchsetzung von Zugriffsrechten nach erfolgreicher Authentifizierung. Bestimmt was ein authentifizierter Benutzer tun darf. Role-Based Access Control (RBAC) verwaltet Berechtigungen über Rollen." },
        { front: "Verschlüsselung", back: "Umwandlung von Klartext in Geheimtext mittels kryptographischen Algorithmen. Symmetrisch: ein Schlüssel für Ver- und Entschlüsselung (AES). Asymmetrisch: Schlüsselpaar aus öffentlichem und privatem Schlüssel (RSA)." },
        { front: "Hash-Funktion", back: "Einwegfunktion die aus beliebigen Daten einen Fingerabdruck fester Länge erzeugt. Eigenschaften: deterministisch, Einwegfunktion, kollisionsresistent. Verwendet für Passwort-Hashing (bcrypt) und Integrität (SHA-256)." }
      ]
    },
    {
      type: "dragdrop",
      title: "Sicherheitsbedrohungen kategorisieren",
      games: [
        {
          title: "Angriffsvektoren zuordnen",
          description: "Ordne die Angriffe ihren Kategorien zu",
          items: [
            { id: "phishing", content: "Phishing E-Mail", category: "Social Engineering" },
            { id: "sqlinjection", content: "SQL Injection", category: "Code Injection" },
            { id: "ddos", content: "DDoS-Angriff", category: "Denial of Service" },
            { id: "pretexting", content: "Pretexting", category: "Social Engineering" },
            { id: "xss", content: "Cross-Site Scripting", category: "Code Injection" },
            { id: "ransomware", content: "Ransomware", category: "Malware" },
            { id: "mitm", content: "Man-in-the-Middle", category: "Network Attack" },
            { id: "bruteforce", content: "Brute Force", category: "Password Attack" }
          ],
          categories: ["Social Engineering", "Code Injection", "Denial of Service", "Malware", "Network Attack", "Password Attack"]
        },
        {
          title: "Sicherheitsmaßnahmen zuordnen",
          description: "Ordne Sicherheitsmaßnahmen ihren Schutzbereichen zu",
          items: [
            { id: "firewall", content: "Firewall", category: "Network Security" },
            { id: "antivirus", content: "Antivirus", category: "Endpoint Security" },
            { id: "backup", content: "Backup", category: "Data Protection" },
            { id: "mfa", content: "Multi-Factor Auth", category: "Access Control" },
            { id: "encryption", content: "Verschlüsselung", category: "Data Protection" },
            { id: "ids", content: "Intrusion Detection", category: "Network Security" },
            { id: "patch", content: "Patch Management", category: "Endpoint Security" },
            { id: "rbac", content: "Role-Based Access", category: "Access Control" }
          ],
          categories: ["Network Security", "Endpoint Security", "Data Protection", "Access Control"]
        }
      ]
    },
    {
      type: "memory",
      title: "Security Memory",
      games: [
        {
          title: "Kryptografie Algorithmen",
          description: "Verbinde Algorithmen mit ihren Einsatzgebieten",
          pairs: [
            { id: "aes", content: "AES", match: "Symmetrische Verschlüsselung" },
            { id: "rsa", content: "RSA", match: "Asymmetrische Verschlüsselung" },
            { id: "sha256", content: "SHA-256", match: "Hash-Funktion" },
            { id: "md5", content: "MD5", match: "Veraltete Hash-Funktion" },
            { id: "bcrypt", content: "bcrypt", match: "Passwort-Hashing" },
            { id: "ecdsa", content: "ECDSA", match: "Digitale Signatur" }
          ]
        },
        {
          title: "Angriffsmethoden Memory",
          description: "Ordne Angriffe ihren Beschreibungen zu",
          pairs: [
            { id: "phishing1", content: "Phishing", match: "Täuschung durch gefälschte E-Mails" },
            { id: "ransomware1", content: "Ransomware", match: "Erpressung durch Datenverschlüsselung" },
            { id: "ddos1", content: "DDoS", match: "Überlastung durch massive Anfragen" },
            { id: "mitm1", content: "MITM", match: "Abfangen der Kommunikation" },
            { id: "sql1", content: "SQL Injection", match: "Einschleusen von SQL-Code" },
            { id: "xss1", content: "XSS", match: "Einschleusen von JavaScript" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "IT-Sicherheit Szenarien",
      scenarios: [
        {
          title: "Verdächtiger Phishing-Angriff",
          description: "Mitarbeiter erhält verdächtige E-Mail",
          scenario: "Ein Mitarbeiter meldet eine E-Mail, die vorgibt von der IT-Abteilung zu sein und nach Login-Daten fragt. Die E-Mail enthält einen Link zu einer Website die wie das interne Portal aussieht.",
          choices: [
            { text: "Sofort IT-Security informieren und E-Mail als Phishing melden", consequence: "Richtige Vorgehensweise - verhindert weitere Angriffe", isCorrect: true },
            { text: "Link öffnen um zu prüfen ob er echt ist", consequence: "Gefährlich - könnte Malware installieren oder Daten stehlen", isCorrect: false },
            { text: "E-Mail ignorieren und löschen", consequence: "Verpasst Chance andere zu warnen und Angriff zu dokumentieren", isCorrect: false },
            { text: "Awareness-Training für alle Mitarbeiter organisieren", consequence: "Präventive Maßnahme die zukünftige Angriffe verhindert", isCorrect: true }
          ]
        },
        {
          title: "Ransomware-Angriff entdeckt", 
          description: "Verschlüsselte Dateien im Netzwerk gefunden",
          scenario: "Mehrere Server zeigen verschlüsselte Dateien und eine Lösegeldforderung. Das Netzwerk ist kompromittiert und kritische Systeme sind betroffen.",
          choices: [
            { text: "Sofort betroffene Systeme vom Netz trennen", consequence: "Verhindert weitere Ausbreitung der Ransomware", isCorrect: true },
            { text: "Lösegeld zahlen um schnell wieder arbeiten zu können", consequence: "Finanziert Kriminelle und garantiert nicht die Datenwiederherstellung", isCorrect: false },
            { text: "Aus Backups wiederherstellen nach Systembereinigung", consequence: "Beste langfristige Lösung ohne Kriminelle zu unterstützen", isCorrect: true },
            { text: "Incident Response Team aktivieren", consequence: "Professionelle Behandlung des Sicherheitsvorfalls", isCorrect: true }
          ]
        }
      ]
    }
  ],
  netzwerktechnik: [
    {
      type: "flashcards",
      title: "OSI-Modell und Protokolle",
      cards: [
        { front: "Layer 1: Physical", back: "Physikalische Übertragung von Bits über Medien wie Kabel, WLAN, Bluetooth. Definiert Spannungspegel, Stecker, Übertragungsraten, Modulationsverfahren. Geräte: Repeater, Hubs, Kabel. Probleme: Dämpfung, Interferenzen, Störungen." },
        { front: "Layer 2: Data Link", back: "MAC-Adressen, Frame-Erstellung, Fehlerkorrektur im lokalen Segment. Switches arbeiten hier. Ethernet-Frames, VLAN-Tagging, Spanning Tree Protocol. Collision Detection bei Ethernet. 48-Bit MAC-Adressen sind weltweit eindeutig." },
        { front: "Layer 3: Network", back: "IP-Adressierung und Routing zwischen verschiedenen Netzwerken. IPv4 (32-Bit) und IPv6 (128-Bit), ICMP für Fehlermeldungen, Router. Subnetting, CIDR-Notation, ARP für IP-zu-MAC-Auflösung." },
        { front: "Layer 4: Transport", back: "End-to-End-Verbindungen, Port-Nummern für Anwendungsidentifikation. TCP: verbindungsorientiert, zuverlässig, Flusskontrolle. UDP: verbindungslos, schnell, keine Garantien. Ports 0-1023 sind well-known ports." },
        { front: "DHCP", back: "Dynamic Host Configuration Protocol vergibt automatisch IP-Konfiguration. Lease-Time definiert Gültigkeitsdauer. DHCP-Prozess: Discover, Offer, Request, Acknowledge. Reservierungen für feste IP-Zuweisungen möglich." },
        { front: "DNS", back: "Domain Name System übersetzt Domainnamen in IP-Adressen. Hierarchisches System: Root-Server, TLD-Server (.com, .de), autoritative Server. Caching reduziert Abfragen. Record-Typen: A, AAAA, CNAME, MX, NS." }
      ]
    },
    {
      type: "dragdrop",
      title: "Netzwerk-Komponenten zuordnen",
      games: [
        {
          title: "OSI-Layer zuordnen",
          description: "Ordne Protokolle und Geräte ihren OSI-Layern zu",
          items: [
            { id: "ethernet", content: "Ethernet", category: "Layer 2 - Data Link" },
            { id: "ip", content: "IP", category: "Layer 3 - Network" },
            { id: "tcp", content: "TCP", category: "Layer 4 - Transport" },
            { id: "http", content: "HTTP", category: "Layer 7 - Application" },
            { id: "switch", content: "Switch", category: "Layer 2 - Data Link" },
            { id: "router", content: "Router", category: "Layer 3 - Network" },
            { id: "hub", content: "Hub", category: "Layer 1 - Physical" },
            { id: "firewall", content: "Firewall", category: "Layer 3/4 - Network/Transport" }
          ],
          categories: ["Layer 1 - Physical", "Layer 2 - Data Link", "Layer 3 - Network", "Layer 4 - Transport", "Layer 7 - Application", "Layer 3/4 - Network/Transport"]
        },
        {
          title: "IP-Adressbereiche kategorisieren",
          description: "Ordne IP-Adressen ihren Kategorien zu",
          items: [
            { id: "private1", content: "192.168.1.1", category: "Private IP" },
            { id: "private2", content: "10.0.0.1", category: "Private IP" },
            { id: "public1", content: "8.8.8.8", category: "Public IP" },
            { id: "localhost", content: "127.0.0.1", category: "Loopback" },
            { id: "multicast", content: "224.1.1.1", category: "Multicast" },
            { id: "broadcast", content: "255.255.255.255", category: "Broadcast" },
            { id: "apipa", content: "169.254.1.1", category: "APIPA" },
            { id: "private3", content: "172.16.0.1", category: "Private IP" }
          ],
          categories: ["Private IP", "Public IP", "Loopback", "Multicast", "Broadcast", "APIPA"]
        }
      ]
    },
    {
      type: "memory",
      title: "Netzwerk Memory",
      games: [
        {
          title: "Port-Nummern Memory",
          description: "Verbinde Dienste mit ihren Standard-Ports",
          pairs: [
            { id: "http", content: "HTTP", match: "Port 80" },
            { id: "https", content: "HTTPS", match: "Port 443" },
            { id: "ssh", content: "SSH", match: "Port 22" },
            { id: "ftp", content: "FTP", match: "Port 21" },
            { id: "telnet", content: "Telnet", match: "Port 23" },
            { id: "dns", content: "DNS", match: "Port 53" },
            { id: "dhcp", content: "DHCP", match: "Port 67/68" },
            { id: "smtp", content: "SMTP", match: "Port 25" }
          ]
        },
        {
          title: "Netzwerk-Begriffe Memory",
          description: "Ordne Begriffe ihren Definitionen zu",
          pairs: [
            { id: "subnet", content: "Subnetz", match: "Teil eines größeren Netzwerks" },
            { id: "gateway", content: "Gateway", match: "Verbindung zwischen Netzwerken" },
            { id: "vlan", content: "VLAN", match: "Virtuelles LAN" },
            { id: "nat", content: "NAT", match: "Network Address Translation" },
            { id: "vpn", content: "VPN", match: "Virtual Private Network" },
            { id: "wan", content: "WAN", match: "Wide Area Network" }
          ]
        }
      ]
    },
    {
      type: "timeline",
      title: "Netzwerk-Evolution",
      timelines: [
        {
          title: "Internet-Geschichte",
          description: "Entwicklung des Internets von ARPANET bis heute",
          events: [
            { year: "1969", event: "ARPANET startet", description: "Erstes Paket-vermittelndes Netzwerk mit 4 Knoten" },
            { year: "1973", event: "TCP/IP entwickelt", description: "Vint Cerf und Bob Kahn entwickeln Internet Protocol Suite" },
            { year: "1983", event: "DNS eingeführt", description: "Domain Name System ersetzt numerische Host-Tabellen" },
            { year: "1990", event: "World Wide Web", description: "Tim Berners-Lee entwickelt HTTP und HTML am CERN" },
            { year: "1995", event: "Kommerzialisierung", description: "Internet wird für kommerzielle Nutzung freigegeben" },
            { year: "1998", event: "IPv6 Standard", description: "128-Bit Adressen lösen IPv4-Knappheit" },
            { year: "2011", event: "IPv4 erschöpft", description: "Letzte IPv4-Adressen von IANA verteilt" }
          ]
        }
      ]
    }
  ],
  linux: [
    {
      type: "flashcards",
      title: "Linux Grundlagen",
      cards: [
        { front: "ls", back: "Listet Dateien und Verzeichnisse auf. Wichtige Optionen: -l (detailliert mit Permissions, Eigentümer, Größe, Datum), -a (versteckte Dateien mit Punkt), -h (menschenlesbare Größen), -R (rekursiv alle Unterverzeichnisse), -t (nach Zeit sortiert)" },
        { front: "chmod", back: "Ändert Dateiberechtigungen. Oktal: 755 = rwxr-xr-x, 644 = rw-r--r--. Symbolisch: +x (execute hinzufügen), u+w (user write), g-r (group read entfernen). r=4, w=2, x=1. Verzeichnisse brauchen x zum Betreten" },
        { front: "sudo", back: "Super User DO - führt Befehle als anderer Benutzer aus (meist root). /etc/sudoers konfiguriert Berechtigungen. sudo -u user (als anderer User), sudo -i (root shell), sudo !! (letzter Befehl als root)" },
        { front: "systemctl", back: "Systemd Service Manager. systemctl start/stop/restart service, systemctl enable/disable (autostart), systemctl status (Zustand prüfen), systemctl --failed (fehlgeschlagene Services)" },
        { front: "grep", back: "Global Regular Expression Print - sucht Textmuster. grep -i (ignoriert Groß-/Kleinschreibung), -r (rekursiv), -n (Zeilennummern), -v (invertiert - zeigt nicht-passende), -E (erweiterte RegEx)" }
      ]
    },
    {
      type: "dragdrop", 
      title: "Linux Befehle kategorisieren",
      games: [
        {
          title: "Befehlskategorien zuordnen",
          description: "Ordne Linux-Befehle ihren Funktionsbereichen zu",
          items: [
            { id: "ls", content: "ls", category: "Dateisystem" },
            { id: "ps", content: "ps", category: "Prozesse" },
            { id: "netstat", content: "netstat", category: "Netzwerk" },
            { id: "chmod", content: "chmod", category: "Berechtigungen" },
            { id: "top", content: "top", category: "Prozesse" },
            { id: "ping", content: "ping", category: "Netzwerk" },
            { id: "chown", content: "chown", category: "Berechtigungen" },
            { id: "find", content: "find", category: "Dateisystem" },
            { id: "kill", content: "kill", category: "Prozesse" },
            { id: "iptables", content: "iptables", category: "Netzwerk" }
          ],
          categories: ["Dateisystem", "Prozesse", "Netzwerk", "Berechtigungen"]
        },
        {
          title: "Dateiberechtigungen zuordnen",
          description: "Ordne symbolische und oktale Berechtigungen zu",
          items: [
            { id: "rwx1", content: "rwxr--r--", category: "744" },
            { id: "rwx2", content: "rwxrwxrwx", category: "777" },
            { id: "rwx3", content: "rw-r--r--", category: "644" },
            { id: "rwx4", content: "rwxr-xr-x", category: "755" },
            { id: "rwx5", content: "rw-------", category: "600" },
            { id: "rwx6", content: "rwx------", category: "700" }
          ],
          categories: ["744", "777", "644", "755", "600", "700"]
        }
      ]
    },
    {
      type: "memory",
      title: "Linux Memory",
      games: [
        {
          title: "Verzeichnisse Memory",
          description: "Verbinde Verzeichnisse mit ihren Zwecken",
          pairs: [
            { id: "etc", content: "/etc", match: "Konfigurationsdateien" },
            { id: "var", content: "/var", match: "Variable Daten (Logs, Temp)" },
            { id: "home", content: "/home", match: "Benutzerverzeichnisse" },
            { id: "usr", content: "/usr", match: "Benutzerprogramme" },
            { id: "tmp", content: "/tmp", match: "Temporäre Dateien" },
            { id: "boot", content: "/boot", match: "Bootloader und Kernel" }
          ]
        },
        {
          title: "Bash Shortcuts Memory", 
          description: "Ordne Tastenkombinationen ihren Funktionen zu",
          pairs: [
            { id: "ctrlc", content: "Ctrl+C", match: "Prozess beenden" },
            { id: "ctrlz", content: "Ctrl+Z", match: "Prozess pausieren" },
            { id: "ctrld", content: "Ctrl+D", match: "EOF / Logout" },
            { id: "ctrll", content: "Ctrl+L", match: "Terminal löschen" },
            { id: "ctrlr", content: "Ctrl+R", match: "History durchsuchen" },
            { id: "tab", content: "Tab", match: "Autocompletion" }
          ]
        }
      ]
    },
    {
      type: "code",
      title: "Shell-Scripting Übungen",
      challenges: [
        {
          title: "Backup-Script erstellen",
          description: "Schreibe ein Bash-Script das ein Verzeichnis sichert",
          initialCode: "#!/bin/bash\n# Backup Script\nSOURCE_DIR=\nBACKUP_DIR=\n# Erstelle Backup mit Datum\n",
          solution: "#!/bin/bash\nSOURCE_DIR=\"/home/user/documents\"\nBACKUP_DIR=\"/backup\"\nDATE=$(date +%Y%m%d_%H%M%S)\ntar -czf \"$BACKUP_DIR/backup_$DATE.tar.gz\" \"$SOURCE_DIR\"",
          tests: [
            { input: "Backup erstellen", expected: "tar -czf mit Datum" }
          ]
        },
        {
          title: "Log-Rotation implementieren",
          description: "Script das alte Log-Dateien archiviert",
          initialCode: "#!/bin/bash\n# Log Rotation\nLOG_DIR=\"/var/log/myapp\"\n# Lösche Logs älter als 30 Tage\n",
          solution: "#!/bin/bash\nLOG_DIR=\"/var/log/myapp\"\nfind \"$LOG_DIR\" -name \"*.log\" -mtime +30 -delete\nfind \"$LOG_DIR\" -name \"*.log\" -mtime +7 -exec gzip {} \\;",
          tests: [
            { input: "Alte Logs löschen", expected: "find mit -mtime +30 -delete" }
          ]
        }
      ]
    }
  ],
  "web-technologien": [
    {
      type: "flashcards", 
      title: "HTML, CSS, JavaScript",
      cards: [
        { front: "Semantic HTML", back: "Verwendung bedeutungsvoller HTML-Elemente statt generischer div/span. <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>. Vorteile: SEO, Accessibility, Wartbarkeit. Screen Reader können Struktur besser verstehen." },
        { front: "CSS Grid vs Flexbox", back: "Grid: 2D-Layout für komplexe Designs, explizite Kontrolle über Zeilen und Spalten. Flexbox: 1D-Layout für Container und Items, ideal für Komponenten-Layout. Grid für Seiten-Layout, Flexbox für Komponenten." },
        { front: "HTTP Status Codes", back: "2xx Success (200 OK, 201 Created), 3xx Redirection (301 Moved, 304 Not Modified), 4xx Client Error (400 Bad Request, 401 Unauthorized, 404 Not Found), 5xx Server Error (500 Internal Error, 502 Bad Gateway)" },
        { front: "REST API Principles", back: "Representational State Transfer. Stateless, Resource-based URLs, HTTP Verbs (GET, POST, PUT, DELETE), JSON/XML Response, HATEOAS. Uniform Interface, Client-Server, Cacheable, Layered System." },
        { front: "CORS", back: "Cross-Origin Resource Sharing ermöglicht Requests zwischen verschiedenen Domains. Browser blockiert Cross-Origin-Requests aus Sicherheit. Server muss Access-Control-Allow-Origin Header setzen. Preflight für komplexe Requests." }
      ]
    },
    {
      type: "dragdrop",
      title: "Web-Technologien zuordnen",
      games: [
        {
          title: "Frontend vs Backend",
          description: "Ordne Technologien Frontend oder Backend zu",
          items: [
            { id: "html", content: "HTML", category: "Frontend" },
            { id: "nodejs", content: "Node.js", category: "Backend" },
            { id: "react", content: "React", category: "Frontend" },
            { id: "mysql", content: "MySQL", category: "Backend" },
            { id: "css", content: "CSS", category: "Frontend" },
            { id: "express", content: "Express.js", category: "Backend" },
            { id: "vue", content: "Vue.js", category: "Frontend" },
            { id: "mongodb", content: "MongoDB", category: "Backend" }
          ],
          categories: ["Frontend", "Backend"]
        },
        {
          title: "HTTP-Verben zuordnen",
          description: "Ordne HTTP-Verben ihren Verwendungszwecken zu",
          items: [
            { id: "get1", content: "GET /users", category: "Lesen/Abrufen" },
            { id: "post1", content: "POST /users", category: "Erstellen" },
            { id: "put1", content: "PUT /users/123", category: "Aktualisieren" },
            { id: "delete1", content: "DELETE /users/123", category: "Löschen" },
            { id: "patch1", content: "PATCH /users/123", category: "Teilweise Aktualisieren" },
            { id: "options1", content: "OPTIONS /api", category: "Unterstützte Methoden" }
          ],
          categories: ["Lesen/Abrufen", "Erstellen", "Aktualisieren", "Löschen", "Teilweise Aktualisieren", "Unterstützte Methoden"]
        }
      ]
    },
    {
      type: "memory",
      title: "Web Memory",
      games: [
        {
          title: "CSS-Properties Memory",
          description: "Verbinde CSS-Properties mit ihren Funktionen",
          pairs: [
            { id: "display", content: "display", match: "Layout-Verhalten (block, flex, grid)" },
            { id: "position", content: "position", match: "Positionierung (static, relative, absolute)" },
            { id: "zindex", content: "z-index", match: "Stapelreihenfolge" },
            { id: "flexdir", content: "flex-direction", match: "Richtung der flex items" },
            { id: "grid", content: "grid-template-columns", match: "Grid-Spalten definieren" },
            { id: "transform", content: "transform", match: "2D/3D Transformationen" }
          ]
        },
        {
          title: "JavaScript APIs Memory",
          description: "Ordne Browser-APIs ihren Zwecken zu", 
          pairs: [
            { id: "fetch", content: "Fetch API", match: "HTTP-Requests" },
            { id: "geolocation", content: "Geolocation API", match: "Standort des Benutzers" },
            { id: "storage", content: "localStorage", match: "Client-side Datenspeicherung" },
            { id: "notification", content: "Notification API", match: "Browser-Benachrichtigungen" },
            { id: "camera", content: "MediaDevices API", match: "Kamera und Mikrofon" },
            { id: "worker", content: "Web Workers", match: "Background-Threads" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Web-Entwicklung Szenarien",
      scenarios: [
        {
          title: "Performance-Optimierung",
          description: "Website lädt zu langsam",
          scenario: "Die Ladezeit einer E-Commerce-Website beträgt 8 Sekunden. Kunden springen ab und Conversions sinken. Du musst die Performance verbessern.",
          choices: [
            { text: "Bilder komprimieren und WebP-Format verwenden", consequence: "Reduziert Dateigröße um 25-50% ohne Qualitätsverlust", isCorrect: true },
            { text: "Code-Splitting und Lazy Loading implementieren", consequence: "Lädt nur benötigten Code, reduziert Initial Bundle Size", isCorrect: true },
            { text: "Alle Bibliotheken auf einmal laden", consequence: "Verschlechtert Performance durch große Bundle-Größe", isCorrect: false },
            { text: "CDN für statische Assets nutzen", consequence: "Reduziert Latenz durch geografisch verteilte Server", isCorrect: true }
          ]
        },
        {
          title: "Mobile-First Design",
          description: "Website ist nicht mobil-freundlich",
          scenario: "Google Analytics zeigt dass 70% der Besucher mobile Geräte nutzen, aber die Bounce-Rate ist sehr hoch. Die Website ist nicht responsive.",
          choices: [
            { text: "CSS Media Queries für responsive Design verwenden", consequence: "Passt Layout an verschiedene Bildschirmgrößen an", isCorrect: true },
            { text: "Separate mobile App entwickeln", consequence: "Aufwendig und teuer, löst Web-Problem nicht", isCorrect: false },
            { text: "Flexbox und CSS Grid für flexible Layouts nutzen", consequence: "Moderne, responsive Layout-Techniken", isCorrect: true },
            { text: "Touch-optimierte Navigation implementieren", consequence: "Verbessert Benutzererfahrung auf Touchscreens", isCorrect: true }
          ]
        }
      ]
    }
  ],
  "it-grundlagen": [
    {
      type: "flashcards",
      title: "IT-Grundlagen und Hardware", 
      cards: [
        { front: "CPU (Prozessor)", back: "Central Processing Unit - das 'Gehirn' des Computers. Führt Befehle aus durch Fetch-Decode-Execute Cycle. Komponenten: ALU (Arithmetic Logic Unit), Control Unit, Register, Cache. Taktfrequenz in GHz, Anzahl Kerne für Parallelverarbeitung." },
        { front: "RAM (Arbeitsspeicher)", back: "Random Access Memory - temporärer Speicher für laufende Programme und Daten. Volatil (Inhalt geht bei Stromausfall verloren). DDR4/DDR5 Standards, Kapazität in GB. Mehr RAM = bessere Multitasking-Performance." },
        { front: "Festplatten-Technologien", back: "HDD: Magnetic storage, mechanisch, günstig, langsam (5400/7200 RPM). SSD: Flash-Memory, keine beweglichen Teile, schnell, teurer. NVMe: Modernster SSD-Standard über PCIe, extremend schnelle Datenübertragung." },
        { front: "Mainboard/Motherboard", back: "Hauptplatine verbindet alle Komponenten. CPU-Sockel, RAM-Slots, Erweiterungsslots (PCIe), I/O-Ports, BIOS/UEFI Chip. Chipset steuert Kommunikation zwischen Komponenten. Form-Faktoren: ATX, Micro-ATX, Mini-ITX." },
        { front: "Grafikkarte (GPU)", back: "Graphics Processing Unit für Bild-/Video-Berechnung. Integriert (in CPU) oder dediziert (separate Karte). VRAM für Grafikdaten, CUDA/OpenCL für parallele Berechnungen. Wichtig für Gaming, KI, Mining, Video-Bearbeitung." }
      ]
    },
    {
      type: "dragdrop",
      title: "Hardware-Komponenten zuordnen",
      games: [
        {
          title: "Speichertypen kategorisieren",
          description: "Ordne Speichermedien nach ihrer Geschwindigkeit",
          items: [
            { id: "register", content: "CPU Register", category: "Sehr schnell" },
            { id: "cache", content: "CPU Cache", category: "Sehr schnell" },
            { id: "ram", content: "RAM", category: "Schnell" },
            { id: "ssd", content: "SSD", category: "Mittel" },
            { id: "hdd", content: "HDD", category: "Langsam" },
            { id: "optical", content: "CD/DVD", category: "Sehr langsam" },
            { id: "nvme", content: "NVMe SSD", category: "Schnell" },
            { id: "tape", content: "Magnetband", category: "Sehr langsam" }
          ],
          categories: ["Sehr schnell", "Schnell", "Mittel", "Langsam", "Sehr langsam"]
        },
        {
          title: "Anschlüsse zuordnen",
          description: "Ordne Anschlüsse ihren Verwendungszwecken zu",
          items: [
            { id: "usb", content: "USB", category: "Externe Geräte" },
            { id: "hdmi", content: "HDMI", category: "Audio/Video" },
            { id: "ethernet", content: "Ethernet", category: "Netzwerk" },
            { id: "sata", content: "SATA", category: "Speicher intern" },
            { id: "pcie", content: "PCIe", category: "Erweiterungskarten" },
            { id: "displayport", content: "DisplayPort", category: "Audio/Video" },
            { id: "thunderbolt", content: "Thunderbolt", category: "Hochgeschwindigkeit" },
            { id: "m2", content: "M.2", category: "Speicher intern" }
          ],
          categories: ["Externe Geräte", "Audio/Video", "Netzwerk", "Speicher intern", "Erweiterungskarten", "Hochgeschwindigkeit"]
        }
      ]
    },
    {
      type: "memory",
      title: "IT-Grundlagen Memory",
      games: [
        {
          title: "Hardware-Begriffe Memory",
          description: "Verbinde Hardware-Komponenten mit ihren Funktionen",
          pairs: [
            { id: "cpu1", content: "CPU", match: "Verarbeitet Befehle und Berechnungen" },
            { id: "psu", content: "Netzteil", match: "Wandelt Wechsel- in Gleichstrom" },
            { id: "cooling", content: "Kühlung", match: "Verhindert Überhitzung" },
            { id: "case", content: "Gehäuse", match: "Schützt und organisiert Komponenten" },
            { id: "bios", content: "BIOS/UEFI", match: "Firmware für System-Boot" },
            { id: "chipset", content: "Chipset", match: "Steuert Kommunikation zwischen Komponenten" }
          ]
        },
        {
          title: "Dateisystem Memory",
          description: "Ordne Dateisysteme ihren Betriebssystemen zu",
          pairs: [
            { id: "ntfs", content: "NTFS", match: "Windows-Standard" },
            { id: "ext4", content: "ext4", match: "Linux-Standard" },
            { id: "apfs", content: "APFS", match: "macOS-Modern" },
            { id: "fat32", content: "FAT32", match: "Universelle Kompatibilität" },
            { id: "exfat", content: "exFAT", match: "Große Dateien, Cross-Platform" },
            { id: "zfs", content: "ZFS", match: "Enterprise-Features" }
          ]
        }
      ]
    }
  ],
  bwl: [
    {
      type: "flashcards",
      title: "Betriebswirtschaftslehre",
      cards: [
        { front: "Bilanz", back: "Gegenüberstellung von Vermögen (Aktiva) und Kapital (Passiva) zu einem Stichtag. Aktiva: Anlagevermögen (langfristig), Umlaufvermögen (kurzfristig). Passiva: Eigenkapital, Fremdkapital. Bilanzgleichung: Aktiva = Passiva. Grundlage für Bonitätsprüfung." },
        { front: "Break-Even-Point", back: "Gewinnschwelle wo Erlöse = Kosten sind. Formel: Fixkosten / (Verkaufspreis - variable Kosten je Stück). Ab diesem Punkt wird Gewinn erwirtschaftet. Wichtig für Preisgestaltung und Kapazitätsplanung." },
        { front: "Cashflow", back: "Geldzufluss minus Geldabfluss einer Periode. Operativer CF (Geschäftstätigkeit), Investitions-CF (Anlagen), Finanzierungs-CF (Kapital). Wichtiger als Gewinn für Liquiditätsbewertung. Freier Cashflow für Unternehmensbewertung." },
        { front: "ROI - Return on Investment", back: "Rentabilitätskennzahl: (Gewinn / eingesetztes Kapital) × 100%. Misst Effizienz des Kapitaleinsatzes. Varianten: ROE (Return on Equity), ROA (Return on Assets). Benchmark für Investitionsentscheidungen." }
      ]
    },
    {
      type: "dragdrop",
      title: "BWL-Konzepte zuordnen",
      games: [
        {
          title: "Kostenarten kategorisieren",
          description: "Ordne Kosten ihren Kategorien zu",
          items: [
            { id: "miete", content: "Büromiete", category: "Fixkosten" },
            { id: "material", content: "Rohstoffe", category: "Variable Kosten" },
            { id: "gehalter", content: "Festgehälter", category: "Fixkosten" },
            { id: "provision", content: "Provisionen", category: "Variable Kosten" },
            { id: "versicherung", content: "Versicherung", category: "Fixkosten" },
            { id: "strom", content: "Stromverbrauch Produktion", category: "Variable Kosten" }
          ],
          categories: ["Fixkosten", "Variable Kosten"]
        },
        {
          title: "Kennzahlen zuordnen", 
          description: "Ordne Kennzahlen ihren Bereichen zu",
          items: [
            { id: "roi1", content: "ROI", category: "Rentabilität" },
            { id: "liquid1", content: "Liquidität 1. Grades", category: "Liquidität" },
            { id: "eigenkapital", content: "Eigenkapitalquote", category: "Finanzierung" },
            { id: "umsatz", content: "Umsatzrendite", category: "Rentabilität" },
            { id: "verschuld", content: "Verschuldungsgrad", category: "Finanzierung" },
            { id: "quick", content: "Quick Ratio", category: "Liquidität" }
          ],
          categories: ["Rentabilität", "Liquidität", "Finanzierung"]
        }
      ]
    },
    {
      type: "memory",
      title: "BWL Memory",
      games: [
        {
          title: "Rechtsformen Memory",
          description: "Verbinde Rechtsformen mit ihren Eigenschaften",
          pairs: [
            { id: "gmbh", content: "GmbH", match: "Haftungsbeschränkung, Mindestkapital 25.000€" },
            { id: "ag", content: "AG", match: "Aktiengesellschaft, Grundkapital 50.000€" },
            { id: "ohg", content: "OHG", match: "Offene Handelsgesellschaft, unbeschränkte Haftung" },
            { id: "kg", content: "KG", match: "Kommanditgesellschaft, teilweise beschränkte Haftung" },
            { id: "einzelkaufmann", content: "e.K.", match: "Einzelkaufmann, unbeschränkte Haftung" },
            { id: "ug", content: "UG", match: "Mini-GmbH, Mindestkapital 1€" }
          ]
        }
      ]
    }
  ],
  "wirtschafts-sozialkunde": [
    {
      type: "flashcards", 
      title: "Arbeitsrecht und Sozialversicherung",
      cards: [
        { front: "Soziale Marktwirtschaft", back: "Deutsche Wirtschaftsordnung kombiniert freie Marktwirtschaft mit sozialer Absicherung. Prinzipien: Wettbewerbsfreiheit, soziale Gerechtigkeit, Vollbeschäftigung, Preisstabilität. Ludwig Erhard als 'Vater' der sozialen Marktwirtschaft." },
        { front: "Betriebsrat", back: "Interessenvertretung der Arbeitnehmer. Wählbar ab 5 Mitarbeitern, besteht ab Wahl. Mitbestimmungsrechte: Arbeitszeit, Urlaub, Sozialeinrichtungen. Mitbestimmung bei Kündigungen, Versetzungen. Freistellung ab bestimmter Betriebsgröße." },
        { front: "Kündigungsschutz", back: "Schutz vor willkürlicher Kündigung nach 6 Monaten Betriebszugehörigkeit in Betrieben >10 Mitarbeitern. Kündigungsgründe: verhaltensbedingt, personenbedingt, betriebsbedingt. Sozialauswahl bei betriebsbedingten Kündigungen nach Alter, Betriebszugehörigkeit, Unterhaltspflichten." },
        { front: "Arbeitszeit", back: "Gesetzlich maximal 8h täglich, 48h wöchentlich. Verlängerung auf 10h möglich wenn 6-Monats-Durchschnitt 8h nicht überschreitet. Ruhezeit mindestens 11h zwischen Arbeitstagen. Pausen: 30min bei 6-9h, 45min bei >9h Arbeitszeit." }
      ]
    },
    {
      type: "dragdrop",
      title: "Sozialversicherung zuordnen",
      games: [
        {
          title: "Sozialversicherungsträger",
          description: "Ordne Leistungen ihren Versicherungsträgern zu",
          items: [
            { id: "arzt", content: "Arztbesuch", category: "Krankenversicherung" },
            { id: "rente", content: "Altersrente", category: "Rentenversicherung" },
            { id: "arbeitslos", content: "Arbeitslosengeld", category: "Arbeitslosenversicherung" },
            { id: "unfall", content: "Arbeitsunfall", category: "Unfallversicherung" },
            { id: "pflege", content: "Pflegeheim", category: "Pflegeversicherung" },
            { id: "reha", content: "Rehabilitation", category: "Rentenversicherung" }
          ],
          categories: ["Krankenversicherung", "Rentenversicherung", "Arbeitslosenversicherung", "Unfallversicherung", "Pflegeversicherung"]
        }
      ]
    },
    {
      type: "memory",
      title: "WiSo Memory",
      games: [
        {
          title: "Tarifverträge Memory",
          description: "Verbinde Tarifvertrags-Begriffe mit Definitionen",
          pairs: [
            { id: "manteltarif", content: "Manteltarifvertrag", match: "Rahmen-Arbeitsbedingungen" },
            { id: "lohntarif", content: "Lohntarifvertrag", match: "Entgelte und Zulagen" },
            { id: "friedenspflicht", content: "Friedenspflicht", match: "Streikverbot während Laufzeit" },
            { id: "nachwirkung", content: "Nachwirkung", match: "Geltung nach Ablauf" }
          ]
        }
      ]
    }
  ],
  datenschutz: [
    {
      type: "flashcards",
      title: "DSGVO und Datenschutz",
      cards: [
        { front: "Personenbezogene Daten", back: "Alle Informationen zu identifizierten oder identifizierbaren Personen. Direkt: Name, E-Mail. Indirekt: IP-Adresse, Cookie-ID, Standortdaten. Besondere Kategorien (Art. 9): Gesundheit, politische Meinungen, Religion, Sexualleben - besonders geschützt." },
        { front: "Rechtsgrundlagen Art. 6 DSGVO", back: "1. Einwilligung, 2. Vertragserfüllung, 3. Rechtliche Verpflichtung, 4. Lebenswichtige Interessen, 5. Öffentliche Aufgabe, 6. Berechtigte Interessen. Jede Verarbeitung braucht eine Rechtsgrundlage. Interessenabwägung bei berechtigten Interessen." },
        { front: "Privacy by Design", back: "Datenschutz wird von Anfang an in Systeme eingebaut, nicht nachträglich. Prinzipien: Proaktiv, Standard, eingebaut in Design, vollständiger Funktionsschutz, End-to-End-Sicherheit, Transparenz, Nutzerfreundlichkeit. Technische und organisatorische Maßnahmen (TOMs)." }
      ]
    },
    {
      type: "scenario",
      title: "Datenschutz Szenarien",
      scenarios: [
        {
          title: "Website-Cookies implementieren",
          description: "Neue Website braucht Cookie-Consent",
          scenario: "Du entwickelst eine E-Commerce-Website die Analytics, Marketing-Cookies und funktionale Cookies verwendet. DSGVO-Compliance ist erforderlich.",
          choices: [
            { text: "Opt-in für alle nicht-essentiellen Cookies", consequence: "DSGVO-konform, gibt Nutzern Kontrolle", isCorrect: true },
            { text: "Alle Cookies automatisch setzen", consequence: "DSGVO-Verstoß, Bußgeld möglich", isCorrect: false },
            { text: "Cookie-Banner mit Ablehnen-Option", consequence: "Erforderlich für Wahlfreiheit", isCorrect: true },
            { text: "Nur essentielle Cookies ohne Consent", consequence: "Legal für technisch notwendige Cookies", isCorrect: true }
          ]
        }
      ]
    }
  ],
  systemintegration: [
    {
      type: "flashcards",
      title: "Systemintegration",
      cards: [
        { front: "Active Directory", back: "Microsoft-Verzeichnisdienst für Windows-Netzwerke. Zentrale Benutzer- und Computerverwaltung, Single Sign-On, Gruppenrichtlinien (GPOs), DNS-Integration. Domänen-Controller replizieren Daten. LDAP-Protokoll für Abfragen." },
        { front: "Virtualisierung", back: "Abstraktion physischer Hardware durch Hypervisor. Typ 1 (Bare-Metal): VMware ESXi, Hyper-V. Typ 2 (Hosted): VMware Workstation, VirtualBox. Vorteile: Ressourceneffizienz, Isolation, Snapshots, Migration. Container als lightweight Alternative." },
        { front: "RAID-Level", back: "RAID 0: Striping, Performance, kein Schutz. RAID 1: Mirroring, 100% Redundanz. RAID 5: Parity, mindestens 3 Disks. RAID 6: Doppelte Parity. RAID 10: Kombination 1+0. Hardware-RAID vs. Software-RAID." }
      ]
    },
    {
      type: "code",
      title: "PowerShell Administration", 
      challenges: [
        {
          title: "AD-Benutzer Bulk-Import",
          description: "Importiere Benutzer aus CSV in Active Directory",
          initialCode: "# CSV mit Name, Username, Department\n$users = Import-Csv \"users.csv\"\n# Erstelle Benutzer in AD\n",
          solution: "Import-Module ActiveDirectory\n$users = Import-Csv \"users.csv\"\nforeach ($user in $users) {\n    New-ADUser -Name $user.Name -SamAccountName $user.Username -Department $user.Department -Enabled $true\n}",
          tests: [
            { input: "CSV Import", expected: "Import-Csv und foreach" }
          ]
        }
      ]
    }
  ],
  anwendungsentwicklung: [
    {
      type: "flashcards",
      title: "Anwendungsentwicklung",
      cards: [
        { front: "Software-Entwicklungsmodelle", back: "Wasserfall: Sequenzielle Phasen, plangetrieben. Agile: Iterativ, änderungsfreundlich. Scrum: Sprints, Rollen, Events. DevOps: Continuous Integration/Deployment. V-Modell: Test-orientiert. RAD: Rapid Application Development mit Prototyping." },
        { front: "Clean Code Prinzipien", back: "Lesbar, verständlich, wartbar. Sprechende Namen, kleine Funktionen, keine Duplikation (DRY), Single Responsibility. Kommentare sparsam verwenden. Refactoring für kontinuierliche Verbesserung. Boy Scout Rule: Code sauberer hinterlassen." },
        { front: "API Design", back: "RESTful APIs: Resource-orientiert, HTTP-Verben, Stateless. GraphQL: Query-Sprache, Type System. Versionierung über URL oder Header. Rate Limiting, Authentication (JWT, OAuth). OpenAPI/Swagger für Dokumentation." }
      ]
    }
  ]
};
