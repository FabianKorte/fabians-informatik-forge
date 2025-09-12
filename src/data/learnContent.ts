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
        { front: "Design Pattern", back: "Bewährte Lösungsmuster für wiederkehrende Entwurfsprobleme. Creational (Singleton, Factory), Structural (Adapter, Decorator), Behavioral (Observer, Strategy). Fördern Best Practices, Kommunikation zwischen Entwicklern und Wartbarkeit." }
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
        },
        { 
          question: "Was macht 'use strict' in JavaScript?", 
          options: ["Macht Code schneller", "Aktiviert strikten Modus mit mehr Fehlerchecks", "Neue ES6 Features", "TypeScript Modus"], 
          correctIndex: 1, 
          explanation: "'use strict' aktiviert den strikten Modus: Verhindert undefinierte Variablen, verbietet Duplikate in Objekten/Parametern, macht this in Funktionen undefined statt window. Hilft bei Fehlerprävention und Code-Qualität." 
        },
        { 
          question: "Was ist Event Bubbling?", 
          options: ["Events werden gelöscht", "Events propagieren vom Kind zum Eltern-Element", "Event-Performance", "CSS-Animation"], 
          correctIndex: 1, 
          explanation: "Event Bubbling: Events starten am Ziel-Element und 'blubbern' nach oben durch die DOM-Hierarchie bis zum window. Event Capturing läuft umgekehrt. Mit stopPropagation() unterbrechbar. Basis für Event Delegation." 
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
        { left: "Deklarativ", right: "Was statt wie (SQL, HTML)" }
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
          title: "Objekt Destructuring",
          description: "Extrahiere name und age aus dem user-Objekt mit Destructuring.",
          initialCode: "const user = { name: 'Max', age: 30, city: 'Berlin' };\n// Destructuring hier\n",
          solution: "const user = { name: 'Max', age: 30, city: 'Berlin' };\nconst { name, age } = user;",
          tests: [
            { input: "{ name: 'Anna', age: 25 }", expected: "name='Anna', age=25" }
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
        { front: "ACID-Eigenschaften", back: "Atomicity (Unteilbarkeit): Transaktionen sind ganz oder gar nicht. Consistency (Konsistenz): DB bleibt in gültigem Zustand. Isolation (Isolation): Parallele Transaktionen beeinflussen sich nicht. Durability (Dauerhaftigkeit): Änderungen sind permanent gespeichert." },
        { front: "SQL JOIN-Arten", back: "INNER JOIN: Nur übereinstimmende Datensätze. LEFT JOIN: Alle linken + passende rechte. RIGHT JOIN: Alle rechten + passende linke. FULL OUTER JOIN: Alle Datensätze beider Tabellen. CROSS JOIN: Kartesisches Produkt aller Kombinationen." },
        { front: "Index", back: "Datenstruktur zur Beschleunigung von Datenbankabfragen. B-Tree (Standard), Hash, Bitmap. Vorteile: Schnellere SELECT, WHERE, ORDER BY. Nachteile: Speicherverbrauch, langsamere INSERT/UPDATE/DELETE. Automatisch auf Primärschlüssel." },
        { front: "Transaktion", back: "Logische Arbeitseinheit von DB-Operationen. Entweder alle oder keine Operationen werden ausgeführt. BEGIN, COMMIT (Speichern), ROLLBACK (Rückgängig). Isolation Levels: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE." },
        { front: "Stored Procedure", back: "Vorkompilierte SQL-Anweisungen auf dem DB-Server. Vorteile: Performance, Sicherheit, Zentralisierung. Nachteile: DB-spezifisch, schwerer zu versionieren. Parameter möglich. Ausführung mit CALL oder EXEC." },
        { front: "Trigger", back: "Automatisch ausgeführte Prozeduren bei bestimmten DB-Ereignissen. BEFORE/AFTER INSERT/UPDATE/DELETE. Für Logging, Validierung, automatische Berechnungen. Können Kaskaden-Effekte verursachen - sparsam einsetzen." },
        { front: "Deadlock", back: "Blockierung zwischen zwei oder mehr Transaktionen, die sich gegenseitig auf Ressourcen warten. DB-System erkennt und bricht eine Transaktion ab. Vermeidung: Einheitliche Sperrreihenfolge, kurze Transaktionen, niedrige Isolation Levels." }
      ]
    },
    {
      type: "quiz",
      title: "SQL-Abfragen und Konzepte",
      questions: [
        { 
          question: "Was charakterisiert die 3. Normalform?", 
          options: ["Atomare Werte", "Keine partiellen Abhängigkeiten", "Keine transitiven Abhängigkeiten", "Keine wiederholenden Gruppen"], 
          correctIndex: 2,
          explanation: "3NF eliminiert transitive Abhängigkeiten: Nicht-Schlüssel-Attribute dürfen nur vom Primärschlüssel abhängen, nicht voneinander. Beispiel: Kunde → Stadt → PLZ ist transitiv - PLZ sollte in separate Tabelle."
        },
        { 
          question: "Welcher JOIN gibt alle Datensätze der linken Tabelle zurück?", 
          options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN"], 
          correctIndex: 1,
          explanation: "LEFT JOIN (oder LEFT OUTER JOIN) gibt alle Datensätze der linken Tabelle zurück, auch wenn keine Übereinstimmung in der rechten Tabelle existiert. Fehlende rechte Werte werden als NULL dargestellt."
        },
        { 
          question: "Was ist ein Deadlock?", 
          options: ["Langsame Abfrage", "Gegenseitige Blockierung von Transaktionen", "Fehlerhafter Index", "Überlauf der Datenbank"], 
          correctIndex: 1,
          explanation: "Deadlock tritt auf wenn sich zwei oder mehr Transaktionen gegenseitig blockieren. Transaktion A wartet auf Ressource von B, B wartet auf Ressource von A. DB-System löst durch Abbruch einer Transaktion."
        },
        { 
          question: "Welche ACID-Eigenschaft sorgt für 'Alles oder Nichts'?", 
          options: ["Atomicity", "Consistency", "Isolation", "Durability"], 
          correctIndex: 0,
          explanation: "Atomicity (Atomarität) bedeutet dass Transaktionen unteilbar sind - entweder werden alle Operationen ausgeführt oder keine. Bei Fehler wird komplette Transaktion zurückgerollt."
        },
        { 
          question: "Wofür wird ein Index in einer Datenbank verwendet?", 
          options: ["Datensicherung", "Beschleunigung von Abfragen", "Normalisierung", "Transaktionskontrolle"], 
          correctIndex: 1,
          explanation: "Indizes beschleunigen SELECT-Abfragen, WHERE-Klauseln und ORDER BY durch optimierte Datenstrukturen (meist B-Trees). Kosten: Zusätzlicher Speicher und langsamere Schreiboperationen."
        },
        { 
          question: "Was ist der Unterschied zwischen COMMIT und ROLLBACK?", 
          options: ["Kein Unterschied", "COMMIT speichert, ROLLBACK verwirft Änderungen", "COMMIT löscht, ROLLBACK speichert", "Beide speichern Daten"], 
          correctIndex: 1,
          explanation: "COMMIT macht alle Änderungen einer Transaktion permanent und sichtbar für andere. ROLLBACK macht alle Änderungen rückgängig und stellt den ursprünglichen Zustand wieder her."
        },
        { 
          question: "Welches Statement erstellt eine neue Tabelle?", 
          options: ["INSERT TABLE", "CREATE TABLE", "NEW TABLE", "ADD TABLE"], 
          correctIndex: 1,
          explanation: "CREATE TABLE erstellt neue Tabellen mit Spaltendefinitionen, Datentypen und Constraints. Syntax: CREATE TABLE tabellenname (spalte1 typ constraints, spalte2 typ, ...)."
        },
        { 
          question: "Was ist ein Stored Procedure?", 
          options: ["Gespeicherte Abfrage", "Vorkompilierte SQL-Prozedur auf Server", "Tabellenbackup", "Index-Art"], 
          correctIndex: 1,
          explanation: "Stored Procedures sind vorkompilierte SQL-Anweisungsblöcke auf dem DB-Server. Vorteile: Performance, Sicherheit, Zentralisierung. Aufruf mit CALL oder EXEC. Können Parameter haben."
        }
      ]
    },
    {
      type: "code",
      title: "SQL-Abfragen schreiben",
      challenges: [
        {
          title: "Einfache SELECT mit WHERE",
          description: "Hole alle Kunden aus Deutschland mit Alter über 25",
          initialCode: "SELECT * FROM customers\n-- Füge WHERE-Klausel hinzu",
          solution: "SELECT * FROM customers\nWHERE country = 'Germany' AND age > 25;",
          tests: [
            { input: "Deutschland Filter", expected: "WHERE country = 'Germany'" },
            { input: "Alter Filter", expected: "AND age > 25" }
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
        { front: "CIA-Trias", back: "Confidentiality (Vertraulichkeit), Integrity (Integrität), Availability (Verfügbarkeit) - die drei Grundpfeiler der Informationssicherheit." },
        { front: "Authentifizierung", back: "Verifikation der Identität eines Benutzers oder Systems. Erfolgt durch Wissen (Passwort), Besitz (Token) oder Sein (Biometrie)." },
        { front: "Autorisierung", back: "Festlegung und Durchsetzung von Zugriffsrechten nach erfolgreicher Authentifizierung. Bestimmt was ein Benutzer tun darf." },
        { front: "Firewall", back: "Netzwerk-Sicherheitssystem, das eingehenden und ausgehenden Datenverkehr basierend auf Sicherheitsregeln überwacht und kontrolliert." },
        { front: "Verschlüsselung", back: "Umwandlung von Klartext in Geheimtext mittels kryptographischen Algorithmen. Symmetrisch (ein Schlüssel) oder asymmetrisch (Schlüsselpaar)." },
        { front: "Malware", back: "Bösartige Software wie Viren, Würmer, Trojaner, Ransomware. Zielt darauf ab, Systeme zu schädigen oder unbefugten Zugriff zu erlangen." }
      ]
    },
    {
      type: "quiz",
      title: "Sicherheitsbedrohungen",
      questions: [
        { 
          question: "Was charakterisiert einen DDoS-Angriff?", 
          options: ["Daten werden gestohlen", "System wird durch Überlastung lahmgelegt", "Passwörter werden geknackt", "Schadcode wird injiziert"], 
          correctIndex: 1,
          explanation: "DDoS-Angriffe überlasten Systeme durch massive Anfragen von vielen Quellen gleichzeitig, um die Verfügbarkeit zu beeinträchtigen."
        },
        { 
          question: "Was ist Social Engineering?", 
          options: ["Technische Schwachstelle", "Manipulation von Menschen", "Automatisierter Angriff", "Verschlüsselungsverfahren"], 
          correctIndex: 1,
          explanation: "Social Engineering nutzt menschliche Psychologie statt technischer Schwachstellen, um Menschen zur Preisgabe vertraulicher Informationen zu bewegen."
        }
      ]
    },
    {
      type: "matching",
      title: "Sicherheitskonzepte",
      pairs: [
        { left: "Phishing", right: "Täuschung durch gefälschte E-Mails" },
        { left: "Ransomware", right: "Erpressung durch Datenverschlüsselung" },
        { left: "Brute Force", right: "Passwort durch Ausprobieren knacken" },
        { left: "Man-in-the-Middle", right: "Abfangen der Kommunikation" }
      ]
    }
  ],
  netzwerktechnik: [
    {
      type: "flashcards",
      title: "OSI-Modell und Netzwerk-Grundlagen",
      cards: [
        { front: "Layer 1: Physical", back: "Physikalische Übertragung von Bits über Medien wie Kabel, WLAN, Bluetooth. Definiert Spannungspegel, Stecker, Übertragungsraten." },
        { front: "Layer 2: Data Link", back: "MAC-Adressen, Frame-Erstellung, Fehlerkorrektur. Switches arbeiten hier. Ethernet-Frames, VLAN-Tagging, Spanning Tree Protocol." },
        { front: "Layer 3: Network", back: "IP-Adressierung und Routing zwischen Netzwerken. IPv4/IPv6, ICMP, Router. Subnetting, CIDR-Notation, ARP für IP-zu-MAC-Auflösung." },
        { front: "Layer 4: Transport", back: "End-to-End-Verbindungen, Port-Nummern. TCP (zuverlässig, verbindungsorientiert) vs UDP (schnell, verbindungslos)." },
        { front: "TCP vs UDP", back: "TCP: Verbindungsorientiert, zuverlässig, Fehlerkorrektur, höherer Overhead. UDP: Verbindungslos, schnell, kein garantierter Delivery." },
        { front: "Subnetting", back: "Aufteilung eines IP-Netzwerks in kleinere Teilnetze. Verwendet Subnetzmasken. /24 = 255.255.255.0 = 254 nutzbare Host-Adressen." },
        { front: "DHCP", back: "Dynamic Host Configuration Protocol - vergibt automatisch IP-Konfiguration (IP, Subnetzmaske, Gateway, DNS) an Netzwerkgeräte." },
        { front: "DNS", back: "Domain Name System - übersetzt Domainnamen in IP-Adressen. Hierarchisches System mit Root-, TLD- und autoritativen Servern." }
      ]
    },
    {
      type: "quiz",
      title: "Netzwerk-Protokolle und -Technologien",
      questions: [
        { 
          question: "Was ist der Hauptunterschied zwischen Hub und Switch?", 
          options: ["Hub arbeitet auf Layer 3, Switch auf Layer 2", "Switch lernt MAC-Adressen, Hub nicht", "Hub ist schneller", "Kein Unterschied"], 
          correctIndex: 1,
          explanation: "Switches lernen MAC-Adressen und leiten Frames nur an den Zielport. Hubs sind einfache Repeater und senden an alle Ports."
        },
        { 
          question: "Welcher IPv4-Adressbereich ist für private Netzwerke reserviert?", 
          options: ["192.168.0.0/16", "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16", "1.1.1.1/32", "127.0.0.0/8"], 
          correctIndex: 1,
          explanation: "RFC 1918 definiert drei private Adressbereiche die nicht im Internet geroutet werden und NAT ermöglichen."
        },
        { 
          question: "Was charakterisiert ein /24-Subnetz in IPv4?", 
          options: ["24 Hosts", "256 Hosts", "254 nutzbare Host-Adressen", "24 Netzwerke"], 
          correctIndex: 2,
          explanation: "/24 = 255.255.255.0 Subnetzmaske. 8 Host-Bits = 256 Adressen, aber erste (Netzwerk) und letzte (Broadcast) sind reserviert."
        }
      ]
    },
    {
      type: "matching",
      title: "Netzwerk-Komponenten",
      pairs: [
        { left: "Hub", right: "Layer 1 - Repeater für alle Ports" },
        { left: "Switch", right: "Layer 2 - MAC-Adress-Learning" },
        { left: "Router", right: "Layer 3 - IP-Routing zwischen Netzen" },
        { left: "Firewall", right: "Paketfilterung nach Regeln" }
      ]
    }
  ],
  linux: [
    {
      type: "flashcards",
      title: "Linux-Grundlagen und Befehle",
      cards: [
        { front: "ls", back: "Listet Dateien und Verzeichnisse auf. Optionen: -l (detailliert), -a (versteckte), -h (menschenlesbare Größen), -R (rekursiv)." },
        { front: "cd", back: "Wechselt Verzeichnis. cd ~ (Home), cd .. (eine Ebene hoch), cd - (vorheriges Verzeichnis), cd /pfad (absolut)." },
        { front: "chmod", back: "Ändert Dateiberechtigungen. 755 = rwxr-xr-x, 644 = rw-r--r--. r=4, w=2, x=1. +x fügt Ausführungsrecht hinzu." },
        { front: "chown", back: "Ändert Dateibesitzer und Gruppe. chown user:group datei. Nur root oder Besitzer können Ownership ändern." },
        { front: "grep", back: "Sucht Text in Dateien. grep 'pattern' datei. Optionen: -i (case-insensitive), -r (rekursiv), -n (Zeilennummern)." },
        { front: "find", back: "Sucht Dateien und Verzeichnisse. find /pfad -name 'datei*' -type f. Sehr mächtig für komplexe Suchkriterien." },
        { front: "ps", back: "Zeigt laufende Prozesse. ps aux (alle Prozesse), ps -ef (full format). Kombiniert mit grep für spezifische Prozesse." },
        { front: "top/htop", back: "Zeigt Systemressourcen und Prozesse in Echtzeit. htop ist benutzerfreundlicher mit Farben und besserer Navigation." }
      ]
    },
    {
      type: "quiz",
      title: "Linux-Administration",
      questions: [
        { 
          question: "Welcher Befehl zeigt die aktuellen Benutzer-Berechtigungen einer Datei?", 
          options: ["chmod", "ls -l", "whoami", "id"], 
          correctIndex: 1,
          explanation: "ls -l zeigt detaillierte Informationen inklusive Berechtigungen (rwxrwxrwx), Besitzer und Gruppe für Dateien und Verzeichnisse."
        },
        { 
          question: "Was bedeutet die Berechtigung 755 bei chmod?", 
          options: ["Alle können alles", "Owner: rwx, Group: r-x, Other: r-x", "Nur read-only", "Fehlerhaft"], 
          correctIndex: 1,
          explanation: "755 = rwxr-xr-x. Owner kann lesen/schreiben/ausführen (7), Group und Other nur lesen/ausführen (5)."
        },
        { 
          question: "Welches Verzeichnis enthält Systemkonfigurationsdateien?", 
          options: ["/home", "/etc", "/var", "/tmp"], 
          correctIndex: 1,
          explanation: "/etc enthält Systemkonfigurationsdateien wie /etc/passwd (Benutzer), /etc/hosts (Hostnamen), /etc/fstab (Dateisysteme)."
        }
      ]
    },
    {
      type: "code",
      title: "Shell-Scripting Basics",
      challenges: [
        {
          title: "Einfaches Backup-Script",
          description: "Erstelle ein Script das Dateien aus einem Verzeichnis in ein Backup-Verzeichnis kopiert",
          initialCode: "#!/bin/bash\n# Backup Script\nsource_dir=\"/home/user/documents\"\nbackup_dir=\"/backup\"\n# Implementiere das Backup",
          solution: "#!/bin/bash\nsource_dir=\"/home/user/documents\"\nbackup_dir=\"/backup\"\ncp -r \"$source_dir\" \"$backup_dir/backup_$(date +%Y%m%d_%H%M%S)\"",
          tests: [
            { input: "cp command", expected: "cp -r" },
            { input: "timestamp", expected: "$(date" }
          ]
        }
      ]
    }
  ],
  "web-technologien": [
    {
      type: "flashcards",
      title: "Web-Entwicklung Grundlagen",
      cards: [
        { front: "HTML", back: "HyperText Markup Language - Strukturiert Webseiten-Inhalte. Semantische Tags wie header, nav, main, article verbessern Accessibility und SEO." },
        { front: "CSS", back: "Cascading Style Sheets - Definiert Präsentation und Layout. Flexbox und Grid für moderne Layouts, Media Queries für Responsive Design." },
        { front: "JavaScript", back: "Dynamische Programmiersprache für Webseiten. DOM-Manipulation, Event-Handling, asynchrone Programmierung mit Promises/async-await." },
        { front: "React", back: "JavaScript-Library für User Interfaces. Komponentenbasiert, Virtual DOM für Performance, JSX für deklarative UI-Beschreibung." },
        { front: "HTTP/HTTPS", back: "HyperText Transfer Protocol. Stateless Request-Response-Protokoll. HTTPS verschlüsselt mit TLS/SSL für Sicherheit." },
        { front: "REST API", back: "Representational State Transfer - Architekturstil für Web-Services. Nutzt HTTP-Methoden (GET, POST, PUT, DELETE) für CRUD-Operationen." }
      ]
    },
    {
      type: "quiz",
      title: "Frontend-Technologien",
      questions: [
        { 
          question: "Was ist der Virtual DOM in React?", 
          options: ["Browser-Feature", "React-Optimierung für Performance", "CSS-Framework", "HTML5-Standard"], 
          correctIndex: 1,
          explanation: "Virtual DOM ist eine JavaScript-Repräsentation des echten DOM. React vergleicht Virtual DOM Trees und aktualisiert nur geänderte Teile für bessere Performance."
        },
        { 
          question: "Welcher HTTP-Status-Code bedeutet 'Not Found'?", 
          options: ["200", "404", "500", "401"], 
          correctIndex: 1,
          explanation: "404 bedeutet die angeforderte Ressource wurde nicht gefunden. 200=OK, 401=Unauthorized, 500=Server Error."
        },
        { 
          question: "Was macht CSS Grid?", 
          options: ["Animationen erstellen", "2D-Layout-System", "Responsive Images", "Typographie verbessern"], 
          correctIndex: 1,
          explanation: "CSS Grid ist ein 2D-Layout-System für komplexe, rasterbasierende Layouts mit Zeilen und Spalten."
        }
      ]
    },
    {
      type: "code",
      title: "Web-Entwicklung Übungen",
      challenges: [
        {
          title: "React Component",
          description: "Erstelle eine einfache React-Komponente für einen Button",
          initialCode: "import React from 'react';\n\nfunction Button() {\n  // Implementiere Button-Komponente\n}",
          solution: "import React from 'react';\n\nfunction Button({ children, onClick, className = '' }) {\n  return (\n    <button onClick={onClick} className={className}>\n      {children}\n    </button>\n  );\n}",
          tests: [
            { input: "JSX syntax", expected: "<button>" },
            { input: "Props", expected: "{ children, onClick" }
          ]
        }
      ]
    }
  ],
  "grundlagen-it": [
    {
      type: "flashcards",
      title: "Hardware und IT-Grundlagen",
      cards: [
        { front: "CPU (Central Processing Unit)", back: "Zentrale Recheneinheit des Computers. Führt Befehle aus, verarbeitet Daten. Besteht aus Steuerwerk, Rechenwerk, Registern und Cache." },
        { front: "RAM (Random Access Memory)", back: "Flüchtiger Arbeitsspeicher für aktuelle Programme und Daten. Verliert Inhalt beim Ausschalten. DDR4/DDR5 sind aktuelle Standards." },
        { front: "SSD vs HDD", back: "SSD: Solid State Drive, keine beweglichen Teile, schnell, teurer. HDD: Hard Disk Drive, mechanisch, langsamer, günstiger pro GB." },
        { front: "Binärsystem", back: "Zahlensystem zur Basis 2 mit nur 0 und 1. Grundlage der Computerverarbeitung. 1 Byte = 8 Bit = 256 verschiedene Werte." },
        { front: "IP-Adresse", back: "Internet Protocol Adresse - eindeutige Netzwerkadresse. IPv4: 32 Bit (4 Oktette), IPv6: 128 Bit für mehr Adressen." },
        { front: "Betriebssystem", back: "Software zwischen Hardware und Anwendungen. Verwaltet Ressourcen, bietet Benutzeroberfläche. Windows, Linux, macOS sind Beispiele." }
      ]
    },
    {
      type: "quiz",
      title: "Zahlensysteme und Grundlagen",
      questions: [
        { 
          question: "Wie lautet die binäre Darstellung der Dezimalzahl 10?", 
          options: ["1010", "1001", "1111", "1100"], 
          correctIndex: 0,
          explanation: "10 dezimal = 1010 binär. 1×8 + 0×4 + 1×2 + 0×1 = 8 + 2 = 10"
        },
        { 
          question: "Wie viele Bit hat ein Byte?", 
          options: ["4", "8", "16", "32"], 
          correctIndex: 1,
          explanation: "1 Byte = 8 Bit. Mit 8 Bit kann man 2^8 = 256 verschiedene Werte (0-255) darstellen."
        },
        { 
          question: "Was ist der Unterschied zwischen RAM und ROM?", 
          options: ["Kein Unterschied", "RAM ist flüchtig, ROM nicht", "ROM ist schneller", "RAM ist nur für Server"], 
          correctIndex: 1,
          explanation: "RAM (Random Access Memory) ist flüchtiger Arbeitsspeicher. ROM (Read Only Memory) behält Daten ohne Strom."
        }
      ]
    },
    {
      type: "matching",
      title: "Hardware-Komponenten",
      pairs: [
        { left: "CPU", right: "Zentrale Verarbeitungseinheit" },
        { left: "GPU", right: "Grafikprozessor für Bildberechnung" },
        { left: "RAM", right: "Flüchtiger Arbeitsspeicher" },
        { left: "SSD", right: "Schneller Flash-Speicher" }
      ]
    }
  ],
  projektmanagement: [
    {
      type: "flashcards",
      title: "Projektmanagement-Methoden",
      cards: [
        { front: "Wasserfall-Modell", back: "Sequenzielles Vorgehen in Phasen: Analyse, Design, Implementierung, Test, Wartung. Jede Phase muss abgeschlossen sein vor der nächsten." },
        { front: "Agile Entwicklung", back: "Iteratives, flexibles Vorgehen. Kurze Sprints, häufiges Feedback, Anpassung an Änderungen. Scrum und Kanban sind agile Frameworks." },
        { front: "Scrum", back: "Agiles Framework mit festen Rollen (Product Owner, Scrum Master, Team), Events (Sprint, Daily, Review, Retrospective) und Artefakten (Backlog)." },
        { front: "Kanban", back: "Visuelles System zur Workflow-Optimierung. Work-in-Progress-Limits, kontinuierlicher Fluss, Pull-Prinzip statt Push." },
        { front: "Sprint", back: "Zeitlich begrenzte Iteration in Scrum (meist 2-4 Wochen). Ziel: Potenziell auslieferbare Software-Inkremente." },
        { front: "Risikomanagement", back: "Identifikation, Bewertung und Behandlung von Projektrisiken. Risikomatrix mit Eintrittswahrscheinlichkeit und Auswirkung." }
      ]
    },
    {
      type: "quiz",
      title: "Projektmanagement-Konzepte",
      questions: [
        { 
          question: "Was ist der Hauptunterschied zwischen Wasserfall und Agile?", 
          options: ["Kein Unterschied", "Wasserfall ist sequenziell, Agile iterativ", "Agile ist nur für große Projekte", "Wasserfall ist moderner"], 
          correctIndex: 1,
          explanation: "Wasserfall folgt starren Phasen nacheinander. Agile arbeitet in kurzen Iterationen mit kontinuierlichem Feedback und Anpassung."
        },
        { 
          question: "Wer ist in Scrum für die Produktvision verantwortlich?", 
          options: ["Scrum Master", "Product Owner", "Development Team", "Stakeholder"], 
          correctIndex: 1,
          explanation: "Der Product Owner definiert die Produktvision, verwaltet das Backlog und priorisiert Features basierend auf Geschäftswert."
        },
        { 
          question: "Was ist ein Sprint Review?", 
          options: ["Team bespricht Probleme", "Demonstration der entwickelten Features", "Planung nächster Sprint", "Performance-Bewertung"], 
          correctIndex: 1,
          explanation: "Sprint Review ist die Demonstration der im Sprint entwickelten Features an Stakeholder für Feedback."
        }
      ]
    },
    {
      type: "matching",
      title: "Scrum-Rollen und Events",
      pairs: [
        { left: "Product Owner", right: "Verantwortlich für Produktvision und Backlog" },
        { left: "Scrum Master", right: "Facilitator und Prozess-Coach" },
        { left: "Daily Standup", right: "Tägliche 15-min Abstimmung" },
        { left: "Retrospective", right: "Verbesserung des Teamprozesses" }
      ]
    }
  ],
  "rechtliche-grundlagen": [
    {
      type: "flashcards",
      title: "IT-Recht und Compliance",
      cards: [
        { front: "DSGVO/GDPR", back: "Datenschutz-Grundverordnung der EU. Regelt Verarbeitung personenbezogener Daten. Rechte: Information, Auskunft, Berichtigung, Löschung, Portabilität." },
        { front: "Urheberrecht", back: "Schützt geistige Schöpfungen wie Software, Texte, Bilder. Automatischer Schutz bei Werkschöpfung. 70 Jahre nach Tod des Urhebers in Deutschland." },
        { front: "Softwarelizenz", back: "Regelung zur Nutzung von Software. Proprietär (kommerzielle Lizenz), Open Source (GPL, MIT, Apache), Freeware, Shareware unterscheiden sich in Rechten." },
        { front: "Impressumspflicht", back: "Geschäftsmäßige Websites brauchen Impressum mit Anbieterdaten. §5 TMG regelt Mindestangaben: Name, Adresse, Kontakt, Handelsregister." },
        { front: "Haftung", back: "Rechtliche Verantwortlichkeit für Schäden. Verschuldensabhängig (fahrlässig/vorsätzlich) oder Gefährdungshaftung. Haftungsausschlüsse sind begrenzt möglich." },
        { front: "IT-Sicherheitsgesetz", back: "Regelungen für kritische Infrastrukturen (KRITIS). Meldepflicht bei Sicherheitsvorfällen, angemessene Sicherheitsmaßnahmen erforderlich." }
      ]
    },
    {
      type: "quiz",
      title: "Datenschutz und IT-Recht",
      questions: [
        { 
          question: "Binnen welcher Frist muss eine Datenpanne nach DSGVO gemeldet werden?", 
          options: ["24 Stunden", "72 Stunden", "1 Woche", "1 Monat"], 
          correctIndex: 1,
          explanation: "DSGVO Art. 33: Meldung an Aufsichtsbehörde binnen 72h. Bei hohem Risiko auch Benachrichtigung der Betroffenen erforderlich."
        },
        { 
          question: "Was ist die Rechtsgrundlage für Newsletter-Versand?", 
          options: ["Berechtigtes Interesse", "Einwilligung oder Bestandskunden-Regelung", "Automatisch erlaubt", "Nur bei Gewinnspiel"], 
          correctIndex: 1,
          explanation: "Newsletter benötigen explizite Einwilligung (Opt-in). Ausnahme: Bestandskunden für ähnliche Produkte mit Widerspruchsmöglichkeit."
        },
        { 
          question: "Welche Lizenz erlaubt kommerzielle Nutzung und Veränderung von Open Source Software?", 
          options: ["GPL", "MIT", "Proprietary", "Freeware"], 
          correctIndex: 1,
          explanation: "MIT-Lizenz ist permissiv und erlaubt kommerzielle Nutzung und Modifikation. GPL erfordert Veröffentlichung von Änderungen."
        }
      ]
    },
    {
      type: "matching",
      title: "Rechtsbegriffe zuordnen",
      pairs: [
        { left: "DSGVO Art. 6", right: "Rechtsgrundlagen der Verarbeitung" },
        { left: "Opt-in", right: "Aktive Einwilligung erforderlich" },
        { left: "Privacy by Design", right: "Datenschutz von Anfang an mitdenken" },
        { left: "Auftragsverarbeitung", right: "Externe Dienstleister für Datenverarbeitung" }
      ]
    }
  ],
  bwl: [
    {
      type: "flashcards",
      title: "Betriebswirtschaftslehre Grundlagen",
      cards: [
        { front: "Bilanz", back: "Gegenüberstellung von Vermögen (Aktiva) und Kapital (Passiva) zu einem Stichtag. Aktiva: Anlagevermögen, Umlaufvermögen. Passiva: Eigenkapital, Fremdkapital." },
        { front: "GuV (Gewinn- und Verlustrechnung)", back: "Erträge und Aufwendungen einer Periode. Zeigt wie der Gewinn/Verlust entstanden ist. Umsatzerlöse minus Kosten = Ergebnis." },
        { front: "Cashflow", back: "Geldzufluss minus Geldabfluss in einer Periode. Wichtiger als Gewinn für Liquidität. Operativer, Investitions- und Finanzierungs-Cashflow." },
        { front: "Break-Even-Point", back: "Gewinnschwelle - Punkt wo Erlöse gleich Kosten sind. Deckungsbeitrag = Preis minus variable Kosten. Fixkosten / Deckungsbeitrag = Break-Even-Menge." },
        { front: "ROI (Return on Investment)", back: "Rentabilitätskennzahl. ROI = (Gewinn / investiertes Kapital) × 100%. Misst Effizienz des Kapitaleinsatzes." },
        { front: "Liquidität", back: "Fähigkeit zur termingerechten Zahlung. Liquidität 1. Grades: liquide Mittel / kurzfristige Verbindlichkeiten. Sollte > 20% sein." }
      ]
    },
    {
      type: "quiz",
      title: "Controlling und Kennzahlen",
      questions: [
        { 
          question: "Was zeigt die Eigenkapitalquote?", 
          options: ["Liquidität", "Verschuldungsgrad", "Finanzielle Stabilität", "Rentabilität"], 
          correctIndex: 2,
          explanation: "Eigenkapitalquote = Eigenkapital / Gesamtkapital. Hohe Quote bedeutet geringe Abhängigkeit von Fremdkapital und finanzielle Stabilität."
        },
        { 
          question: "Wann ist ein Unternehmen am Break-Even-Point?", 
          options: ["Bei maximalem Gewinn", "Wenn Erlöse = Kosten", "Bei Insolvenz", "Nach 1 Jahr"], 
          correctIndex: 1,
          explanation: "Break-Even-Point ist erreicht wenn Gesamterlöse gleich Gesamtkosten sind. Ab da wird Gewinn erwirtschaftet."
        },
        { 
          question: "Was sind fixe Kosten?", 
          options: ["Kosten die mit Menge steigen", "Konstante Kosten unabhängig von Produktionsmenge", "Nur Personalkosten", "Variable Kosten"], 
          correctIndex: 1,
          explanation: "Fixkosten bleiben konstant (Miete, Versicherung), variable Kosten ändern sich mit der Produktionsmenge (Material, Strom)."
        }
      ]
    },
    {
      type: "matching",
      title: "BWL-Kennzahlen",
      pairs: [
        { left: "ROI", right: "Rendite des investierten Kapitals" },
        { left: "EBIT", right: "Gewinn vor Zinsen und Steuern" },
        { left: "Liquidität 1. Grades", right: "Barmittel / kurzfristige Verbindlichkeiten" },
        { left: "Umsatzrendite", right: "Gewinn / Umsatz" }
      ]
    }
  ],
  "wirtschafts-sozialkunde": [
    {
      type: "flashcards",
      title: "Wirtschaftsordnung und Sozialkunde",
      cards: [
        { front: "Soziale Marktwirtschaft", back: "Deutsche Wirtschaftsordnung. Verbindet Marktwirtschaft mit sozialer Sicherung. Freier Wettbewerb, aber staatliche Regulierung zum Schutz sozial Schwächerer." },
        { front: "Tarifautonomie", back: "Recht der Gewerkschaften und Arbeitgeber, Löhne und Arbeitsbedingungen selbst zu verhandeln. Staat hält sich grundsätzlich heraus." },
        { front: "Betriebsrat", back: "Interessenvertretung der Arbeitnehmer im Betrieb. Mitbestimmung bei sozialen, personellen und wirtschaftlichen Angelegenheiten. Ab 5 Mitarbeitern wählbar." },
        { front: "Kündigungsschutz", back: "Schutz vor willkürlicher Kündigung. Kündigungsschutzgesetz gilt ab 6 Monaten Betriebszugehörigkeit in Betrieben > 10 Mitarbeiter. Soziale Auswahl bei betriebsbedingten Kündigungen." },
        { front: "Arbeitszeit", back: "Gesetzlich max. 8h/Tag, 48h/Woche. Verlängerung auf 10h möglich wenn in 6 Monaten im Durchschnitt 8h nicht überschritten. Pausen bei 6-9h: 30min, >9h: 45min." },
        { front: "Jugendarbeitsschutz", back: "Besonderer Schutz für unter 18-Jährige. Max. 8h/Tag, 40h/Woche. Keine Nacht-, Sonn- und Feiertagsarbeit. Gefährliche Arbeiten verboten." }
      ]
    },
    {
      type: "quiz",
      title: "Arbeitsrecht und Sozialversicherung",
      questions: [
        { 
          question: "Ab welcher Betriebsgröße gilt das Kündigungsschutzgesetz?", 
          options: ["5 Mitarbeiter", "10 Mitarbeiter", ">10 Mitarbeiter", "20 Mitarbeiter"], 
          correctIndex: 2,
          explanation: "Kündigungsschutzgesetz gilt in Betrieben mit mehr als 10 Arbeitnehmern und nach 6 Monaten Betriebszugehörigkeit."
        },
        { 
          question: "Welche Sozialversicherung zahlt bei Arbeitslosigkeit?", 
          options: ["Krankenversicherung", "Rentenversicherung", "Arbeitslosenversicherung", "Unfallversicherung"], 
          correctIndex: 2,
          explanation: "Arbeitslosenversicherung zahlt Arbeitslosengeld. Beitragssatz 2024: 2,6% (je hälftig AG/AN). Anspruch nach 12 Monaten Beitragszahlung."
        },
        { 
          question: "Was ist der gesetzliche Mindestlohn 2024?", 
          options: ["10,45€", "12,00€", "12,41€", "15,00€"], 
          correctIndex: 2,
          explanation: "Gesetzlicher Mindestlohn seit Januar 2024: 12,41€ brutto je Stunde. Wird von der Mindestlohnkommission regelmäßig angepasst."
        }
      ]
    },
    {
      type: "matching",
      title: "Sozialversicherung",
      pairs: [
        { left: "Krankenversicherung", right: "Finanziert medizinische Behandlung" },
        { left: "Rentenversicherung", right: "Alterssicherung und Erwerbsminderung" },
        { left: "Arbeitslosenversicherung", right: "Arbeitslosengeld und Weiterbildung" },
        { left: "Unfallversicherung", right: "Arbeits- und Wegeunfälle" }
      ]
    }
  ],
  datenschutz: [
    {
      type: "flashcards",
      title: "DSGVO und Datenschutz-Grundlagen",
      cards: [
        { front: "Personenbezogene Daten", back: "Informationen zu identifizierten oder identifizierbaren Personen. Name, E-Mail, IP-Adresse, Standortdaten, Online-Kennungen, biometrische Daten." },
        { front: "Verarbeitungsverzeichnis", back: "Dokumentation aller Datenverarbeitungstätigkeiten. Pflicht für Unternehmen >250 Mitarbeiter oder bei risikoreichen Verarbeitungen. Zweck, Kategorien, Empfänger, Löschfristen." },
        { front: "Privacy by Design", back: "Datenschutz wird von Anfang an in IT-Systeme eingebaut. Datenminimierung, Zweckbindung, Transparenz als Grundprinzipien bei Systemdesign." },
        { front: "Einwilligung", back: "Freiwillige, spezifische, informierte und eindeutige Willensbekundung. Muss widerrufbar sein. Koppelungsverbot - keine Nachteile bei Verweigerung." },
        { front: "Auftragsverarbeitung", back: "Externe Dienstleister verarbeiten Daten im Auftrag. Auftragsverarbeitungsvertrag (AVV) erforderlich mit technischen und organisatorischen Maßnahmen (TOMs)." },
        { front: "Betroffenenrechte", back: "Auskunft, Berichtigung, Löschung ('Recht auf Vergessenwerden'), Einschränkung, Datenübertragbarkeit, Widerspruch. Erfüllung binnen 1 Monat." }
      ]
    },
    {
      type: "quiz",
      title: "DSGVO Compliance",
      questions: [
        { 
          question: "Welche Rechtsgrundlagen für Datenverarbeitung gibt es nach DSGVO Art. 6?", 
          options: ["Nur Einwilligung", "Einwilligung, Vertrag, rechtliche Verpflichtung, berechtigte Interessen u.a.", "Automatisch erlaubt", "Nur bei Geschäftszweck"], 
          correctIndex: 1,
          explanation: "Art. 6 DSGVO: Einwilligung, Vertragserfüllung, rechtliche Verpflichtung, lebenswichtige Interessen, öffentliche Aufgabe, berechtigte Interessen."
        },
        { 
          question: "Ab wann ist ein Datenschutzbeauftragter Pflicht?", 
          options: ["Immer", "Bei mehr als 20 Mitarbeitern mit Datenverarbeitung", "Nie", "Nur bei Konzernen"], 
          correctIndex: 1,
          explanation: "DSB-Pflicht bei: >20 Personen mit automatisierter Verarbeitung, Kerntätigkeit umfasst umfangreiches Monitoring oder besondere Kategorien von Daten."
        },
        { 
          question: "Wie hoch können DSGVO-Bußgelder maximal sein?", 
          options: ["10.000€", "1 Mio€", "20 Mio€ oder 4% Jahresumsatz", "Unbegrenzt"], 
          correctIndex: 2,
          explanation: "DSGVO Art. 83: Bis zu 20 Mio€ oder 4% des weltweiten Jahresumsatzes, je nachdem was höher ist. Bei schwerwiegenden Verstößen."
        }
      ]
    },
    {
      type: "scenario",
      title: "Datenschutz-Vorfälle handhaben",
      scenarios: [
        {
          title: "Datenpanne entdeckt",
          description: "Ein Mitarbeiter hat versehentlich Kundendaten öffentlich gemacht",
          scenario: "Eine Excel-Datei mit 500 Kundenadressen wurde auf der öffentlichen Website hochgeladen. Ein Kunde meldet dies nach 2 Tagen.",
          choices: [
            { text: "Sofort Aufsichtsbehörde informieren (72h) und Betroffene benachrichtigen", consequence: "Erfüllt DSGVO-Pflichten, minimiert Schäden und Bußgelder", isCorrect: true },
            { text: "Erstmal intern klären ohne Meldung", consequence: "Verstoß gegen Meldepflicht, Bußgeld bis 10 Mio€ möglich", isCorrect: false },
            { text: "Datei löschen und hoffen dass es niemand bemerkt", consequence: "Rechtlich problematisch, Vertrauen zerstört, Verschleierung strafbar", isCorrect: false }
          ]
        }
      ]
    }
  ],
  systemintegration: [
    {
      type: "flashcards",
      title: "Fachinformatiker Systemintegration",
      cards: [
        { front: "Systemintegration", back: "Planung, Installation, Wartung und Administration von IT-Systemen. Vernetzung von Hard- und Software-Komponenten zu funktionsfähigen Systemen." },
        { front: "Active Directory", back: "Microsoft-Verzeichnisdienst für Windows-Netzwerke. Zentrale Benutzerverwaltung, Gruppenrichtlinien, Single Sign-On, DNS-Integration." },
        { front: "Virtualisierung", back: "Abstraktion physischer Hardware durch Software. VMware, Hyper-V, VirtualBox. Ressourcen-Effizienz, Isolation, einfache Migration/Backup." },
        { front: "RAID", back: "Redundant Array of Independent Disks. RAID 0 (Striping), RAID 1 (Mirroring), RAID 5 (Parity), RAID 10 (1+0). Performance vs. Ausfallsicherheit." },
        { front: "Backup-Strategien", back: "3-2-1-Regel: 3 Kopien, 2 verschiedene Medien, 1 extern/offline. Vollbackup, inkrementell, differenziell. RTO/RPO definieren." },
        { front: "Monitoring", back: "Überwachung von IT-Systemen. CPU, RAM, Festplatte, Netzwerk. Tools: Nagios, Zabbix, PRTG. Alerting bei Schwellwerten." }
      ]
    },
    {
      type: "quiz",
      title: "Server und Netzwerk-Administration",
      questions: [
        { 
          question: "Was ist der Vorteil von RAID 1?", 
          options: ["Höhere Geschwindigkeit", "Datenspiegelung für Ausfallsicherheit", "Mehr Speicherplatz", "Günstigere Lösung"], 
          correctIndex: 1,
          explanation: "RAID 1 spiegelt Daten auf zwei Festplatten. Bei Ausfall einer Platte sind Daten weiterhin verfügbar. 50% Speicherplatz-Overhead."
        },
        { 
          question: "Welcher Port wird standardmäßig für HTTPS verwendet?", 
          options: ["80", "443", "22", "3389"], 
          correctIndex: 1,
          explanation: "HTTPS nutzt Port 443. HTTP=80, SSH=22, RDP=3389. HTTPS verschlüsselt HTTP-Traffic mit TLS/SSL."
        },
        { 
          question: "Was passiert beim inkrementellen Backup?", 
          options: ["Vollständige Kopie aller Daten", "Nur Änderungen seit letztem Vollbackup", "Nur Änderungen seit letztem Backup", "Komprimierung der Daten"], 
          correctIndex: 2,
          explanation: "Inkrementelles Backup sichert nur Änderungen seit dem letzten Backup (voll oder inkrementell). Schnell, aber komplexere Wiederherstellung."
        }
      ]
    },
    {
      type: "code",
      title: "PowerShell und Administration",
      challenges: [
        {
          title: "Benutzer in Active Directory erstellen",
          description: "Erstelle einen PowerShell-Befehl um einen neuen AD-Benutzer anzulegen",
          initialCode: "# Neuen AD-Benutzer erstellen\n# Name: Max Mustermann, Login: mmustermann\nNew-ADUser -Name",
          solution: "New-ADUser -Name \"Max Mustermann\" -SamAccountName \"mmustermann\" -GivenName \"Max\" -Surname \"Mustermann\" -DisplayName \"Max Mustermann\" -Enabled $true",
          tests: [
            { input: "Name Parameter", expected: "-Name \"Max Mustermann\"" },
            { input: "Login", expected: "-SamAccountName \"mmustermann\"" }
          ]
        }
      ]
    }
  ],
  anwendungsentwicklung: [
    {
      type: "flashcards",
      title: "Fachinformatiker Anwendungsentwicklung",
      cards: [
        { front: "Softwareentwicklungsprozess", back: "Systematisches Vorgehen zur Software-Erstellung. Phasen: Anforderungsanalyse, Design, Implementierung, Test, Deployment, Wartung. V-Modell, Scrum, DevOps als Ansätze." },
        { front: "Objektorientierte Programmierung", back: "Programmierparagma mit Objekten als Grundbausteinen. Klassen, Vererbung, Polymorphismus, Kapselung. Wiederverwendbarkeit und Wartbarkeit im Fokus." },
        { front: "Design Patterns", back: "Bewährte Lösungsmuster für wiederkehrende Probleme. Singleton, Factory, Observer, MVC. Verbessern Code-Qualität und Kommunikation im Team." },
        { front: "Unit Testing", back: "Tests einzelner Code-Einheiten (Funktionen, Klassen). JUnit, NUnit, Jest als Frameworks. Test-driven Development (TDD) schreibt Tests vor Implementation." },
        { front: "Versionskontrolle", back: "Verwaltung von Code-Änderungen über Zeit. Git als Standard. Branches für Features, Merge/Rebase für Integration. GitHub, GitLab für Hosting." },
        { front: "REST API", back: "Web-Service-Architektur. HTTP-Methoden für CRUD: GET (lesen), POST (erstellen), PUT (aktualisieren), DELETE (löschen). JSON als Datenformat." }
      ]
    },
    {
      type: "quiz",
      title: "Programmierung und Software-Architektur",
      questions: [
        { 
          question: "Was ist der Hauptvorteil der objektorientierten Programmierung?", 
          options: ["Schnellere Ausführung", "Wiederverwendbarkeit und Kapselung", "Weniger Code", "Einfachere Syntax"], 
          correctIndex: 1,
          explanation: "OOP ermöglicht Wiederverwendbarkeit durch Vererbung, Kapselung von Daten und Methoden, und modularen Aufbau für bessere Wartbarkeit."
        },
        { 
          question: "Was testet ein Unit Test?", 
          options: ["Gesamtes System", "Einzelne Funktionen/Methoden", "Benutzeroberfläche", "Datenbank"], 
          correctIndex: 1,
          explanation: "Unit Tests prüfen einzelne Codeeinheiten isoliert. Integration Tests testen Zusammenspiel, System Tests das Gesamtsystem."
        },
        { 
          question: "Welche HTTP-Methode wird für das Erstellen neuer Ressourcen verwendet?", 
          options: ["GET", "POST", "PUT", "DELETE"], 
          correctIndex: 1,
          explanation: "POST erstellt neue Ressourcen. GET liest, PUT aktualisiert/erstellt mit bekannter ID, DELETE löscht Ressourcen."
        }
      ]
    },
    {
      type: "code",
      title: "Softwareentwicklung Übungen",
      challenges: [
        {
          title: "Einfache Klasse in Java",
          description: "Erstelle eine Person-Klasse mit Name, Alter und einer Methode zur Begrüßung",
          initialCode: "public class Person {\n    // Attribute definieren\n    \n    // Konstruktor\n    \n    // Methoden\n}",
          solution: "public class Person {\n    private String name;\n    private int alter;\n    \n    public Person(String name, int alter) {\n        this.name = name;\n        this.alter = alter;\n    }\n    \n    public String begruessen() {\n        return \"Hallo, ich bin \" + name + \" und \" + alter + \" Jahre alt.\";\n    }\n}",
          tests: [
            { input: "Private Attribute", expected: "private String name" },
            { input: "Konstruktor", expected: "public Person(" }
          ]
        }
      ]
    }
  ],
  "mobile-entwicklung": [
    {
      type: "flashcards",
      title: "Mobile App Entwicklung",
      cards: [
        { front: "Native vs Cross-Platform", back: "Native: Plattformspezifisch (Swift/iOS, Kotlin/Android), beste Performance. Cross-Platform: Ein Code für mehrere Plattformen (Flutter, React Native), schnellere Entwicklung." },
        { front: "App Lifecycle", back: "Zustandsübergänge: Not Running → Inactive → Active → Background → Suspended. Apps müssen State-Changes handhaben und Daten sichern." },
        { front: "Push Notifications", back: "Server-zu-App Nachrichten über APNs (iOS) oder FCM (Android). Benötigt Benutzererlaubnis. Engagement und Re-Aktivierung von Nutzern." },
        { front: "App Store Optimization", back: "ASO verbessert Auffindbarkeit in App Stores. Titel, Keywords, Screenshots, Beschreibung, Bewertungen beeinflussen Ranking." },
        { front: "Responsive Design", back: "Anpassung an verschiedene Bildschirmgrößen und Orientierungen. Auto Layout (iOS), ConstraintLayout (Android), Flexbox (React Native)." },
        { front: "Offline-First", back: "App funktioniert ohne Internetverbindung. Lokale Datenhaltung, Synchronisation bei Verbindung. Verbessert User Experience erheblich." }
      ]
    },
    {
      type: "quiz",
      title: "Mobile Technologien",
      questions: [
        { 
          question: "Was ist der Hauptvorteil von Flutter?", 
          options: ["Nur für iOS", "Cross-Platform mit einer Codebase", "Nur native Performance", "Kostenlos"], 
          correctIndex: 1,
          explanation: "Flutter ermöglicht Cross-Platform-Entwicklung mit Dart. Eine Codebase für iOS und Android mit nativer Performance durch direktes Rendering."
        },
        { 
          question: "Welches Format verwenden iOS Push Notifications?", 
          options: ["JSON über FCM", "JSON über APNs", "XML", "Binary"], 
          correctIndex: 1,
          explanation: "iOS nutzt Apple Push Notification service (APNs) mit JSON-Format. Android verwendet Firebase Cloud Messaging (FCM)."
        },
        { 
          question: "Was bedeutet 'App Thinning' bei iOS?", 
          options: ["App wird langsamer", "Optimierung der App-Größe für Geräte", "Weniger Features", "Schwarz-weiß Design"], 
          correctIndex: 1,
          explanation: "App Thinning reduziert Download-Größe durch gerätespezifische Assets und Code. Nur benötigte Ressourcen werden heruntergeladen."
        }
      ]
    },
    {
      type: "code",
      title: "React Native Entwicklung",
      challenges: [
        {
          title: "Einfache React Native Komponente",
          description: "Erstelle eine Welcome-Komponente die einen Namen anzeigt",
          initialCode: "import React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\n\nfunction Welcome() {\n  // Implementiere Komponente\n}",
          solution: "import React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\n\nfunction Welcome({ name }) {\n  return (\n    <View style={styles.container}>\n      <Text style={styles.text}>Willkommen, {name}!</Text>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { padding: 20 },\n  text: { fontSize: 18, fontWeight: 'bold' }\n});",
          tests: [
            { input: "React Native imports", expected: "react-native" },
            { input: "StyleSheet", expected: "StyleSheet.create" }
          ]
        }
      ]
    }
  ],
  pruefungsvorbereitung: [
    {
      type: "flashcards",
      title: "Prüfungsstrategien und Lerntechniken",
      cards: [
        { front: "Zeitmanagement in Prüfungen", back: "Prüfungszeit aufteilen: Überblick verschaffen (5%), leichte Aufgaben zuerst (40%), schwere Aufgaben (45%), Kontrolle (10%). Nicht bei einer Aufgabe hängenbleiben." },
        { front: "Active Recall", back: "Aktives Abrufen von Wissen ohne Hilfsmittel. Effektiver als passives Wiederholen. Karteikarten, Selbsttests, Erklären ohne Unterlagen sind Methoden." },
        { front: "Spaced Repetition", back: "Wiederholung in zunehmenden Abständen. Tag 1, 3, 7, 14, 30. Nutzt Vergessenskurve optimal aus für Langzeitgedächtnis." },
        { front: "Pomodoro-Technik", back: "25 Minuten lernen, 5 Minuten Pause. Nach 4 Pomodoros längere Pause (15-30 min). Verhindert Ermüdung und erhält Konzentration." },
        { front: "Mind Maps", back: "Visuelle Darstellung von Wissen mit Verbindungen. Zentrale Idee in der Mitte, Äste für Unterthemen. Nutzt beide Gehirnhälften." },
        { front: "Prüfungsangst bewältigen", back: "Vorbereitung reduziert Angst. Entspannungstechniken, positive Visualisierung, realistische Erwartungen. Atmung kontrollieren während Prüfung." }
      ]
    },
    {
      type: "quiz",
      title: "Lernstrategien und Prüfungsoptimierung",
      questions: [
        { 
          question: "Welche Lernmethode ist wissenschaftlich am effektivsten?", 
          options: ["Passives Lesen", "Active Recall (aktives Abrufen)", "Markieren von Texten", "Zusammenfassungen schreiben"], 
          correctIndex: 1,
          explanation: "Active Recall zwingt das Gehirn zur aktiven Wissensrekonstruktion, was nachweislich bessere Lernergebnisse und Retention erzielt als passive Methoden."
        },
        { 
          question: "Wie sollte man mit Prüfungsangst umgehen?", 
          options: ["Ignorieren", "Gründliche Vorbereitung und Entspannungstechniken", "Mehr Koffein", "Weniger schlafen"], 
          correctIndex: 1,
          explanation: "Kombination aus guter Vorbereitung, Entspannungstechniken, realistischen Erwartungen und Atemkontrolle während der Prüfung ist am effektivsten."
        },
        { 
          question: "Wann ist die beste Zeit für schwierige Lernthemen?", 
          options: ["Spät abends", "Zu individuellen Leistungshochzeiten", "Immer morgens", "Nach dem Essen"], 
          correctIndex: 1,
          explanation: "Jeder hat individuelle Leistungshochzeiten (Chronotyp). Schwierige Inhalte sollten in diesen Zeiten gelernt werden für maximale Effizienz."
        }
      ]
    },
    {
      type: "matching",
      title: "Lernmethoden und ihre Vorteile",
      pairs: [
        { left: "Karteikarten", right: "Active Recall und Spaced Repetition" },
        { left: "Mind Maps", right: "Visuelle Vernetzung von Wissen" },
        { left: "Pomodoro-Technik", right: "Zeitmanagement und Fokus" },
        { left: "Feynman-Technik", right: "Verstehen durch Erklären" }
      ]
    },
    {
      type: "scenario",
      title: "Prüfungssituationen meistern",
      scenarios: [
        {
          title: "Blackout in der Prüfung",
          description: "Du sitzt vor einer wichtigen Aufgabe und weißt plötzlich nichts mehr",
          scenario: "In der IHK-Abschlussprüfung hast du bei einer 20-Punkte-Aufgabe einen kompletten Blackout. Die Zeit läuft und du gerätst in Panik.",
          choices: [
            { text: "Zur nächsten Aufgabe wechseln und später zurückkommen", consequence: "Entspannt dich, andere Aufgaben können Erinnerung triggern. Oft löst sich Blockade von selbst.", isCorrect: true },
            { text: "Krampfhaft weitergrübeln und Zeit verschwenden", consequence: "Verstärkt Stress und Blackout. Verschwendet wertvolle Zeit für andere Aufgaben.", isCorrect: false },
            { text: "Aufgeben und Prüfung vorzeitig verlassen", consequence: "Verschenkt Punkte und Chancen. Oft ist mehr Wissen da als gedacht.", isCorrect: false }
          ]
        },
        {
          title: "Zeitmangel in der Prüfung",
          description: "Dir läuft die Zeit davon und du hast noch viele Aufgaben offen",
          scenario: "30 Minuten vor Ende merkst du, dass du erst die Hälfte der Prüfung geschafft hast. Panik steigt auf.",
          choices: [
            { text: "Schnell durch alle Aufgaben gehen und zumindest Teilpunkte sammeln", consequence: "Oft sind Teilpunkte möglich. Besser unvollständige Antworten als gar keine.", isCorrect: true },
            { text: "Bei aktueller Aufgabe bleiben bis sie perfekt ist", consequence: "Verschenkt Punkte bei anderen Aufgaben. Perfektionismus ist in Prüfungen kontraproduktiv.", isCorrect: false },
            { text: "In Panik geraten und chaotisch arbeiten", consequence: "Führt zu Fehlern auch bei eigentlich bekannten Aufgaben. Kontrollverlust.", isCorrect: false }
          ]
        }
      ]
    }
  ]
};

export const getModulesForCategory = (id: string) => learnContent[id] || [];