import type { LearnModule } from "@/types/learn";

export const learnContent: Record<string, LearnModule[]> = {
  programmierung: [
    {
      type: "flashcards",
      title: "Grundbegriffe der Programmierung",
      cards: [
        { front: "Algorithmus", back: "Endliche, eindeutige Schrittfolge zur Lösung eines Problems." },
        { front: "Variable", back: "Benannter Speicherplatz für veränderliche Werte." },
        { front: "Funktion", back: "Wiederverwendbarer Codeblock mit Eingaben und Rückgabe." },
        { front: "Big-O: O(n)", back: "Laufzeit wächst linear mit der Eingabegröße." },
        { front: "Rekursion", back: "Funktion ruft sich selbst mit kleineren Probleminstanzen auf." },
        { front: "Stack", back: "LIFO-Datenstruktur (Last In, First Out)." },
        { front: "Queue", back: "FIFO-Datenstruktur (First In, First Out)." },
        { front: "Hash-Table", back: "Schneller Zugriff über Schlüssel-Wert-Paare." }
      ]
    },
    {
      type: "quiz",
      title: "JavaScript/TypeScript Basics",
      questions: [
        { question: "Was macht 'const' in JS?", options: ["Variable neu zuweisbar", "Konstante, nicht neu zuweisbar", "Nur in Klassen nutzbar", "Nur global"], correctIndex: 1 },
        { question: "Was ist 'typeof null'?", options: ["null", "object", "undefined", "string"], correctIndex: 1, explanation: "Historischer Bug in JS." },
        { question: "TypeScript fügt...", options: ["Runtime-Performance", "Statische Typen", "Neue Browser-APIs", "CSS-Features"], correctIndex: 1 },
        { question: "Welche Schleife iteriert über Werte eines Arrays?", options: ["for...in", "for...of", "while", "do...while"], correctIndex: 1 },
        { question: "Was ist Hoisting?", options: ["Variable nach oben ziehen", "Performance-Optimierung", "Browser-Feature", "CSS-Eigenschaft"], correctIndex: 0, explanation: "Deklarationen werden zur Compile-Zeit nach oben gezogen." },
        { question: "Arrow Functions haben...", options: ["Eigenes 'this'", "Kein 'this'", "Gebundenes 'this'", "Globales 'this'"], correctIndex: 2 }
      ]
    },
    {
      type: "matching",
      title: "Paradigmen zuordnen",
      pairs: [
        { left: "Imperativ", right: "Schritt-für-Schritt Anweisungen" },
        { left: "Funktional", right: "Funktionen ohne Seiteneffekte" },
        { left: "Objektorientiert", right: "Klassen, Objekte, Kapselung" },
        { left: "Deklarativ", right: "Was statt wie" },
        { left: "Reactive", right: "Event-getriebene Datenströme" },
        { left: "Concurrent", right: "Parallel ausführbare Tasks" }
      ]
    },
    {
      type: "code",
      title: "JavaScript Übungen",
      challenges: [
        {
          title: "Array Filter",
          description: "Filtere alle geraden Zahlen aus dem Array",
          initialCode: "const numbers = [1, 2, 3, 4, 5, 6];\n// Filtere gerade Zahlen\nconst evenNumbers = ",
          solution: "const numbers = [1, 2, 3, 4, 5, 6];\nconst evenNumbers = numbers.filter(n => n % 2 === 0);",
          tests: [
            { input: "[1,2,3,4,5,6]", expected: "[2,4,6]" },
            { input: "[1,3,5]", expected: "[]" }
          ]
        },
        {
          title: "Fibonacci Funktion",
          description: "Implementiere eine Fibonacci-Funktion",
          initialCode: "function fibonacci(n) {\n  // Implementiere hier\n}",
          solution: "function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n-1) + fibonacci(n-2);\n}",
          tests: [
            { input: "5", expected: "5" },
            { input: "10", expected: "55" }
          ]
        }
      ]
    },
    {
      type: "dragdrop",
      title: "Code-Struktur sortieren",
      games: [
        {
          title: "HTML-Elemente ordnen",
          description: "Ordne die HTML-Elemente in die richtige Hierarchie",
          items: [
            { id: "1", content: "<html>", category: "Wurzel" },
            { id: "2", content: "<head>", category: "Kopf" },
            { id: "3", content: "<title>", category: "Kopf" },
            { id: "4", content: "<body>", category: "Körper" },
            { id: "5", content: "<div>", category: "Körper" },
            { id: "6", content: "<p>", category: "Körper" }
          ],
          categories: ["Wurzel", "Kopf", "Körper"]
        },
        {
          title: "Datentypen klassifizieren",
          description: "Ordne die JavaScript-Werte den richtigen Datentypen zu",
          items: [
            { id: "1", content: "42", category: "Number" },
            { id: "2", content: "'Hello'", category: "String" },
            { id: "3", content: "true", category: "Boolean" },
            { id: "4", content: "null", category: "Object" },
            { id: "5", content: "[1,2,3]", category: "Object" },
            { id: "6", content: "undefined", category: "Undefined" }
          ],
          categories: ["Number", "String", "Boolean", "Object", "Undefined"]
        }
      ]
    },
    {
      type: "memory",
      title: "Programmierkonzepte merken",
      games: [
        {
          title: "Algorithmus-Memory",
          description: "Finde die passenden Algorithmus-Paare",
          pairs: [
            { id: "1", content: "Bubble Sort", match: "O(n²)" },
            { id: "2", content: "Binary Search", match: "O(log n)" },
            { id: "3", content: "Quick Sort", match: "O(n log n)" },
            { id: "4", content: "Linear Search", match: "O(n)" },
            { id: "5", content: "Hash Lookup", match: "O(1)" },
            { id: "6", content: "Merge Sort", match: "O(n log n)" }
          ]
        },
        {
          title: "Design Pattern Memory",
          description: "Verbinde Design Patterns mit ihren Beschreibungen",
          pairs: [
            { id: "1", content: "Singleton", match: "Nur eine Instanz" },
            { id: "2", content: "Observer", match: "Event-Listener Pattern" },
            { id: "3", content: "Factory", match: "Objekt-Erstellung abstrahiert" },
            { id: "4", content: "Decorator", match: "Verhalten zur Laufzeit erweitern" },
            { id: "5", content: "Adapter", match: "Inkompatible Interfaces verbinden" }
          ]
        }
      ]
    },
    {
      type: "timeline",
      title: "Programmiersprachen-Geschichte",
      timelines: [
        {
          title: "Evolution der Programmiersprachen",
          description: "Die wichtigsten Meilensteine in der Programmiergeschichte",
          events: [
            { year: "1957", event: "FORTRAN", description: "Erste High-Level Programmiersprache von IBM" },
            { year: "1972", event: "C", description: "Dennis Ritchie entwickelt C bei Bell Labs" },
            { year: "1991", event: "Python", description: "Guido van Rossum veröffentlicht Python" },
            { year: "1995", event: "JavaScript", description: "Brendan Eich entwickelt JS in 10 Tagen bei Netscape" },
            { year: "2009", event: "Go", description: "Google stellt Go vor" },
            { year: "2012", event: "TypeScript", description: "Microsoft veröffentlicht TypeScript" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Code-Review Situationen",
      scenarios: [
        {
          title: "Performance Problem",
          description: "Du findest eine Schleife mit O(n²) Komplexität in kritischem Code.",
          scenario: "Ein Kollege hat eine verschachtelte Schleife geschrieben, die bei großen Datensätzen sehr langsam wird. Wie gehst du vor?",
          choices: [
            { text: "Sofort umschreiben ohne Rücksprache", consequence: "Kollege fühlt sich übergangen, Teamkonflikt entsteht", isCorrect: false },
            { text: "Performance-Problem ansprechen und gemeinsam Lösung finden", consequence: "Konstruktive Zusammenarbeit, besserer Code, Lernerfahrung für alle", isCorrect: true },
            { text: "Ignorieren, da es 'noch funktioniert'", consequence: "Problem eskaliert später, schwerer zu lösen", isCorrect: false },
            { text: "Nur im privaten Chat kritisieren", consequence: "Keine Verbesserung, unprofessionelle Kommunikation", isCorrect: false }
          ]
        },
        {
          title: "Legacy Code Integration",
          description: "Du musst neue Features in 10 Jahre alten Code integrieren.",
          scenario: "Der Legacy Code hat keine Tests, unklare Struktur und veraltete Patterns. Deadline ist in 2 Wochen.",
          choices: [
            { text: "Alles neu schreiben", consequence: "Zu riskant, Deadline nicht einhaltbar", isCorrect: false },
            { text: "Minimal invasive Änderungen mit Tests um neuen Code", consequence: "Sicher, testbar, schrittweise Modernisierung möglich", isCorrect: true },
            { text: "Direkt im Legacy Code ändern", consequence: "Hohe Fehlerwahrscheinlichkeit, schwer zu debuggen", isCorrect: false },
            { text: "Deadline verschieben verlangen", consequence: "Business Impact, möglicherweise nicht durchsetzbar", isCorrect: false }
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
        { front: "Primärschlüssel", back: "Eindeutige Identifikation einer Tabellenzeile." },
        { front: "Fremdschlüssel", back: "Verweist auf Schlüssel einer anderen Tabelle." },
        { front: "3. Normalform", back: "Keine transitiven Abhängigkeiten." },
        { front: "Index", back: "Beschleunigt Suchen auf Spalten." },
        { front: "ACID", back: "Atomicity, Consistency, Isolation, Durability" },
        { front: "Transaktion", back: "Logische Arbeitseinheit mit ACID-Eigenschaften" },
        { front: "Deadlock", back: "Zirkuläres Warten auf Ressourcen zwischen Transaktionen" },
        { front: "Sharding", back: "Horizontale Partitionierung von Daten auf mehrere Server" }
      ]
    },
    {
      type: "quiz",
      title: "SQL-Abfragen",
      questions: [
        { question: "Welche Klausel filtert Zeilen?", options: ["GROUP BY", "WHERE", "ORDER BY", "HAVING"], correctIndex: 1 },
        { question: "Welche SQL-Operation vereinigt Zeilen zweier Tabellen?", options: ["JOIN", "MERGE", "UNION ALL", "INTERSECT"], correctIndex: 0 },
        { question: "Welche Funktion zählt Zeilen?", options: ["COUNT(*)", "SUM(*)", "SIZE()", "LEN()"], correctIndex: 0 },
        { question: "Welche Isolation verhindert Dirty Reads?", options: ["Read Uncommitted", "Read Committed", "Snapshot", "Chaos"], correctIndex: 1 },
        { question: "Was macht DISTINCT?", options: ["Sortiert", "Entfernt Duplikate", "Zählt Zeilen", "Gruppiert"], correctIndex: 1 },
        { question: "Welcher JOIN zeigt auch nicht-matchende Zeilen?", options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "SELF JOIN"], correctIndex: 1 }
      ]
    },
    {
      type: "matching",
      title: "SQL-Begriffe zuordnen",
      pairs: [
        { left: "INNER JOIN", right: "Nur passende Datensätze" },
        { left: "LEFT JOIN", right: "Alle linken + passende rechte" },
        { left: "UNION", right: "Zeilen zusammenfügen" },
        { left: "HAVING", right: "Filter nach GROUP BY" },
        { left: "DISTINCT", right: "Duplikate entfernen" },
        { left: "LIMIT", right: "Anzahl Ergebnisse begrenzen" }
      ]
    },
    {
      type: "code",
      title: "SQL-Abfragen schreiben",
      challenges: [
        {
          title: "Einfache SELECT-Abfrage",
          description: "Hole alle Kunden aus Deutschland",
          initialCode: "SELECT * FROM customers\n-- Füge WHERE-Klausel hinzu",
          solution: "SELECT * FROM customers\nWHERE country = 'Germany';",
          tests: [
            { input: "Deutschland Filter", expected: "WHERE country = 'Germany'" },
            { input: "Alle Spalten", expected: "SELECT *" }
          ]
        },
        {
          title: "JOIN-Abfrage",
          description: "Verbinde Kunden mit ihren Bestellungen",
          initialCode: "SELECT c.name, o.order_date\nFROM customers c\n-- Füge JOIN hinzu",
          solution: "SELECT c.name, o.order_date\nFROM customers c\nJOIN orders o ON c.id = o.customer_id;",
          tests: [
            { input: "JOIN syntax", expected: "JOIN orders o ON c.id = o.customer_id" },
            { input: "Spaltenauswahl", expected: "c.name, o.order_date" }
          ]
        }
      ]
    },
    {
      type: "dragdrop",
      title: "Datenbankdesign",
      games: [
        {
          title: "Normalformen zuordnen",
          description: "Ordne die Tabellen-Beispiele den richtigen Normalformen zu",
          items: [
            { id: "1", content: "Tabelle mit wiederholenden Gruppen", category: "Nicht normalisiert" },
            { id: "2", content: "Atomare Werte, keine Wiederholungen", category: "1. Normalform" },
            { id: "3", content: "Vollständige funktionale Abhängigkeit", category: "2. Normalform" },
            { id: "4", content: "Keine transitiven Abhängigkeiten", category: "3. Normalform" },
            { id: "5", content: "Multivalued Dependencies entfernt", category: "4. Normalform" }
          ],
          categories: ["Nicht normalisiert", "1. Normalform", "2. Normalform", "3. Normalform", "4. Normalform"]
        }
      ]
    },
    {
      type: "memory",
      title: "SQL-Befehle Memory",
      games: [
        {
          title: "SQL-Funktionen",
          description: "Verbinde SQL-Funktionen mit ihren Beschreibungen",
          pairs: [
            { id: "1", content: "COUNT()", match: "Zählt Zeilen" },
            { id: "2", content: "SUM()", match: "Summiert Werte" },
            { id: "3", content: "AVG()", match: "Durchschnitt berechnen" },
            { id: "4", content: "MAX()", match: "Größter Wert" },
            { id: "5", content: "MIN()", match: "Kleinster Wert" },
            { id: "6", content: "GROUP_CONCAT()", match: "Werte verketten" }
          ]
        }
      ]
    },
    {
      type: "timeline",
      title: "Datenbank-Evolution",
      timelines: [
        {
          title: "Geschichte der Datenbanken",
          description: "Von hierarchischen DBs zu modernen NoSQL-Systemen",
          events: [
            { year: "1960er", event: "Hierarchische DBs", description: "IMS von IBM - Baumstruktur" },
            { year: "1970", event: "Relationales Modell", description: "Edgar F. Codd definiert relationale Algebra" },
            { year: "1979", event: "Oracle V2", description: "Erste kommerzielle SQL-Datenbank" },
            { year: "1982", event: "IBM SQL/DS", description: "IBMs erste SQL-Implementation" },
            { year: "2009", event: "NoSQL Boom", description: "MongoDB, CouchDB werden populär" },
            { year: "2012", event: "NewSQL", description: "Kombination aus SQL und NoSQL-Skalierung" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Datenbank-Probleme lösen",
      scenarios: [
        {
          title: "Performance-Problem",
          description: "Eine wichtige Abfrage läuft extrem langsam",
          scenario: "Die tägliche Reporting-Abfrage braucht 45 Minuten statt der üblichen 2 Minuten. Kunden beschweren sich über langsame Dashboards.",
          choices: [
            { text: "Mehr RAM kaufen", consequence: "Kurzfristig teuer, löst möglicherweise nicht das Grundproblem", isCorrect: false },
            { text: "Query analysieren und Indizes optimieren", consequence: "Kosteneffektiv, nachhaltig, behebt oft das eigentliche Problem", isCorrect: true },
            { text: "Auf NoSQL umsteigen", consequence: "Massive Umstellung, unsicher ob es hilft", isCorrect: false },
            { text: "Weniger Daten abfragen", consequence: "Funktionalität eingeschränkt, Nutzer unzufrieden", isCorrect: false }
          ]
        }
      ]
    }
  ],
  "it-sicherheit": [
    {
      type: "flashcards",
      title: "CIA-Trias & Grundlagen",
      cards: [
        { front: "Confidentiality", back: "Vertraulichkeit – nur Berechtigte sehen Daten." },
        { front: "Integrity", back: "Unverändertheit – Schutz vor Manipulation." },
        { front: "Availability", back: "Verfügbarkeit – Systeme sind nutzbar." },
        { front: "2FA", back: "Zwei Faktoren: Wissen, Besitz, Inhärenz." },
        { front: "Zero Trust", back: "Niemals vertrauen, immer verifizieren." },
        { front: "Sandboxing", back: "Isolierte Ausführungsumgebung für unsichere Programme." },
        { front: "Penetration Test", back: "Autorisierter Angriff zur Schwachstellenfindung." },
        { front: "Social Engineering", back: "Manipulation von Personen zur Informationsgewinnung." }
      ]
    },
    {
      type: "quiz",
      title: "Sicherheitsbedrohungen",
      questions: [
        { question: "Was ist ein DDoS-Angriff?", options: ["Daten stehlen", "System überlasten", "Passwort knacken", "Code injizieren"], correctIndex: 1 },
        { question: "Welches ist das stärkste Passwort?", options: ["password123", "P@ssw0rd!", "Tr0ub4dor&3", "correcthorsebatterystaple"], correctIndex: 3, explanation: "Länge schlägt Komplexität bei ausreichender Entropie" },
        { question: "Was macht eine Firewall?", options: ["Viren scannen", "Netzverkehr filtern", "Daten verschlüsseln", "Backups erstellen"], correctIndex: 1 },
        { question: "SQL-Injection verhindert man durch...", options: ["Eingabe validieren", "Prepared Statements", "Beide", "Firewall"], correctIndex: 2 }
      ]
    },
    {
      type: "matching",
      title: "Ports zuordnen",
      pairs: [
        { left: "22", right: "SSH" },
        { left: "80", right: "HTTP" },
        { left: "443", right: "HTTPS" },
        { left: "53", right: "DNS" },
        { left: "25", right: "SMTP" },
        { left: "993", right: "IMAPS" }
      ]
    },
    {
      type: "code",
      title: "Sichere Programmierung",
      challenges: [
        {
          title: "Input Validation",
          description: "Validiere Benutzereingaben sicher",
          initialCode: "function validateEmail(email) {\n  // Validiere E-Mail sicher\n  return true;\n}",
          solution: "function validateEmail(email) {\n  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  return regex.test(email) && email.length < 255;\n}",
          tests: [
            { input: "test@example.com", expected: "true" },
            { input: "invalid-email", expected: "false" }
          ]
        },
        {
          title: "Password Hashing",
          description: "Hash ein Passwort sicher mit bcrypt",
          initialCode: "const bcrypt = require('bcrypt');\n\nfunction hashPassword(password) {\n  // Hash mit Salt\n}",
          solution: "const bcrypt = require('bcrypt');\n\nfunction hashPassword(password) {\n  return bcrypt.hashSync(password, 12);\n}",
          tests: [
            { input: "mypassword", expected: "hashed_string" },
            { input: "123456", expected: "hashed_string" }
          ]
        }
      ]
    },
    {
      type: "dragdrop",
      title: "Bedrohungsklassifikation",
      games: [
        {
          title: "Angriffsvektoren",
          description: "Ordne die Angriffe den richtigen Kategorien zu",
          items: [
            { id: "1", content: "Phishing E-Mail", category: "Social Engineering" },
            { id: "2", content: "SQL Injection", category: "Code Injection" },
            { id: "3", content: "Buffer Overflow", category: "Memory Corruption" },
            { id: "4", content: "DDoS", category: "Denial of Service" },
            { id: "5", content: "Pretexting", category: "Social Engineering" },
            { id: "6", content: "XSS", category: "Code Injection" }
          ],
          categories: ["Social Engineering", "Code Injection", "Memory Corruption", "Denial of Service"]
        }
      ]
    },
    {
      type: "memory",
      title: "Kryptographie Memory",
      games: [
        {
          title: "Verschlüsselungsverfahren",
          description: "Verbinde Algorithmen mit ihren Eigenschaften",
          pairs: [
            { id: "1", content: "AES", match: "Symmetrische Verschlüsselung" },
            { id: "2", content: "RSA", match: "Asymmetrische Verschlüsselung" },
            { id: "3", content: "SHA-256", match: "Hash-Funktion" },
            { id: "4", content: "ECDSA", match: "Digitale Signatur" },
            { id: "5", content: "HMAC", match: "Message Authentication Code" }
          ]
        }
      ]
    },
    {
      type: "timeline",
      title: "Geschichte der Cybersecurity",
      timelines: [
        {
          title: "Meilensteine der IT-Sicherheit",
          description: "Wichtige Ereignisse und Entwicklungen",
          events: [
            { year: "1971", event: "Creeper Worm", description: "Erster Computer-Wurm auf ARPANET" },
            { year: "1988", event: "Morris Worm", description: "Erster Internet-Wurm, legte 10% des Internets lahm" },
            { year: "1991", event: "Pretty Good Privacy (PGP)", description: "Verschlüsselung für die Masse verfügbar" },
            { year: "2010", event: "Stuxnet", description: "Erster Cyberwaffen-Angriff auf kritische Infrastruktur" },
            { year: "2013", event: "Snowden Leaks", description: "Aufdeckung der NSA-Überwachung" },
            { year: "2017", event: "WannaCry", description: "Größter Ransomware-Angriff der Geschichte" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Incident Response",
      scenarios: [
        {
          title: "Ransomware-Angriff",
          description: "Ihr Unternehmen wurde mit Ransomware infiziert",
          scenario: "Montag morgen: Mehrere Mitarbeiter können nicht auf ihre Dateien zugreifen. Auf den Bildschirmen erscheint eine Lösegeldforderung über 50.000€ in Bitcoin.",
          choices: [
            { text: "Sofort Lösegeld zahlen", consequence: "Keine Garantie für Datenwiederherstellung, ermutigt weitere Angriffe", isCorrect: false },
            { text: "System isolieren, Incident Response Team aktivieren", consequence: "Schaden begrenzen, professionelle Behandlung, Forensik möglich", isCorrect: true },
            { text: "Alles neu installieren", consequence: "Forensische Spuren verloren, Ursache unklar", isCorrect: false },
            { text: "Ignorieren und weiterarbeiten", consequence: "Malware kann sich weiter ausbreiten, Datenverlust", isCorrect: false }
          ]
        }
      ]
    }
  ],
  netzwerktechnik: [
    {
      type: "flashcards",
      title: "OSI-Schichten",
      cards: [
        { front: "Schicht 1", back: "Physical – Bits, Kabel, Signale" },
        { front: "Schicht 2", back: "Data Link – MAC, Switches" },
        { front: "Schicht 3", back: "Network – IP, Router" },
        { front: "Schicht 4", back: "Transport – TCP/UDP" },
        { front: "Schicht 5", back: "Session – Verbindungsverwaltung" },
        { front: "Schicht 6", back: "Presentation – Verschlüsselung, Kompression" },
        { front: "Schicht 7", back: "Application – HTTP, FTP, SMTP" },
        { front: "VLAN", back: "Virtual LAN – Logische Netzwerktrennung" }
      ]
    },
    {
      type: "quiz",
      title: "Netzwerk Basics",
      questions: [
        { question: "Was macht ein Router?", options: ["Kollisionsdomänen trennen", "Netze verbinden", "Signale verstärken", "VLANs taggen"], correctIndex: 1 },
        { question: "Privates IPv4-Netz?", options: ["8.8.8.8", "10.0.0.0/8", "1.1.1.1", "172.32.0.0/12"], correctIndex: 1, explanation: "172.16.0.0/12 ist privat – 172.32 nicht." },
        { question: "ARP löst...", options: ["MAC→IP", "IP→MAC", "DNS→IP", "IP→DNS"], correctIndex: 1 },
        { question: "Ping nutzt...", options: ["TCP", "UDP", "ICMP", "ARP"], correctIndex: 2 },
        { question: "Subnetz /24 hat wie viele Hosts?", options: ["254", "256", "255", "253"], correctIndex: 0, explanation: "256 - 2 (Netz- und Broadcast-Adresse) = 254" },
        { question: "Welches Protokoll ist verbindungslos?", options: ["TCP", "UDP", "HTTP", "FTP"], correctIndex: 1 }
      ]
    },
    {
      type: "matching",
      title: "Netzwerkgeräte zuordnen",
      pairs: [
        { left: "Hub", right: "Kollisionsdomäne, Layer 1" },
        { left: "Switch", right: "MAC-Tabelle, Layer 2" },
        { left: "Router", right: "Routing-Tabelle, Layer 3" },
        { left: "Firewall", right: "Paketfilterung, Security" },
        { left: "Access Point", right: "WLAN, Wireless Bridge" },
        { left: "Load Balancer", right: "Traffic-Verteilung" }
      ]
    },
    {
      type: "code",
      title: "Netzwerk-Konfiguration",
      challenges: [
        {
          title: "IP-Konfiguration",
          description: "Konfiguriere eine statische IP-Adresse unter Linux",
          initialCode: "# /etc/network/interfaces\nauto eth0\niface eth0 inet static\n# Füge IP-Konfiguration hinzu",
          solution: "# /etc/network/interfaces\nauto eth0\niface eth0 inet static\naddress 192.168.1.100\nnetmask 255.255.255.0\ngateway 192.168.1.1\ndns-nameservers 8.8.8.8",
          tests: [
            { input: "IP address", expected: "192.168.1.100" },
            { input: "Gateway", expected: "192.168.1.1" }
          ]
        },
        {
          title: "Routing-Tabelle",
          description: "Füge eine statische Route hinzu",
          initialCode: "# Route zu 10.0.0.0/8 über Gateway 192.168.1.1\nip route add ",
          solution: "ip route add 10.0.0.0/8 via 192.168.1.1",
          tests: [
            { input: "Zielnetz", expected: "10.0.0.0/8" },
            { input: "Gateway", expected: "192.168.1.1" }
          ]
        }
      ]
    },
    {
      type: "dragdrop",
      title: "OSI-Schichten Zuordnung",
      games: [
        {
          title: "Protokolle den Schichten zuordnen",
          description: "Ordne die Protokolle den richtigen OSI-Schichten zu",
          items: [
            { id: "1", content: "HTTP", category: "Layer 7 (Application)" },
            { id: "2", content: "TCP", category: "Layer 4 (Transport)" },
            { id: "3", content: "IP", category: "Layer 3 (Network)" },
            { id: "4", content: "Ethernet", category: "Layer 2 (Data Link)" },
            { id: "5", content: "SSL/TLS", category: "Layer 6 (Presentation)" },
            { id: "6", content: "UDP", category: "Layer 4 (Transport)" }
          ],
          categories: ["Layer 7 (Application)", "Layer 6 (Presentation)", "Layer 4 (Transport)", "Layer 3 (Network)", "Layer 2 (Data Link)"]
        }
      ]
    },
    {
      type: "memory",
      title: "Netzwerk-Ports Memory",
      games: [
        {
          title: "Standard-Ports",
          description: "Verbinde Ports mit ihren Services",
          pairs: [
            { id: "1", content: "Port 80", match: "HTTP" },
            { id: "2", content: "Port 443", match: "HTTPS" },
            { id: "3", content: "Port 21", match: "FTP" },
            { id: "4", content: "Port 25", match: "SMTP" },
            { id: "5", content: "Port 110", match: "POP3" },
            { id: "6", content: "Port 143", match: "IMAP" }
          ]
        }
      ]
    },
    {
      type: "timeline",
      title: "Netzwerk-Evolution",
      timelines: [
        {
          title: "Geschichte der Netzwerktechnik",
          description: "Von ARPANET zum modernen Internet",
          events: [
            { year: "1969", event: "ARPANET", description: "Erster Knoten zwischen UCLA und Stanford" },
            { year: "1973", event: "TCP/IP", description: "Vint Cerf und Bob Kahn entwickeln TCP/IP" },
            { year: "1983", event: "DNS", description: "Domain Name System eingeführt" },
            { year: "1990", event: "ARPANET Ende", description: "ARPANET offiziell abgeschaltet, Internet übernimmt" },
            { year: "1995", event: "Commercialization", description: "Internet wird kommerziell nutzbar" },
            { year: "2011", event: "IPv4 Exhaustion", description: "IANA IPv4-Adressen aufgebraucht" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Netzwerk-Troubleshooting",
      scenarios: [
        {
          title: "Kein Internet",
          description: "Nutzer können plötzlich nicht mehr ins Internet",
          scenario: "Mehrere Abteilungen melden, dass sie keine Webseiten mehr erreichen können. E-Mail funktioniert noch, interne Server sind erreichbar.",
          choices: [
            { text: "Alle Computer neu starten", consequence: "Zeitverschwendung, Problem bleibt bestehen", isCorrect: false },
            { text: "ISP kontaktieren", consequence: "Möglicherweise verfrüht, interne Ursache nicht ausgeschlossen", isCorrect: false },
            { text: "Gateway/Router prüfen und DNS testen", consequence: "Systematische Analyse, findet wahrscheinlich die Ursache", isCorrect: true },
            { text: "Firewall abschalten", consequence: "Sicherheitsrisiko, löst möglicherweise nicht das Problem", isCorrect: false }
          ]
        }
      ]
    }
  ],
  systemadministration: [
    {
      type: "flashcards",
      title: "Linux Essentials",
      cards: [
        { front: "systemd", back: "Init-System & Service-Manager." },
        { front: "top", back: "Prozessüberwachung in Echtzeit." },
        { front: "apt/yum", back: "Paketverwaltung (Debian/RedHat)." },
        { front: "journalctl", back: "System-Logs anzeigen." },
        { front: "crontab", back: "Zeitgesteuerte Aufgaben planen." },
        { front: "SSH", back: "Sichere Remote-Shell-Verbindung." },
        { front: "sudo", back: "Temporäre Root-Rechte für Befehle." },
        { front: "systemctl", back: "systemd-Services verwalten." }
      ]
    },
    {
      type: "quiz",
      title: "Shell-Befehle",
      questions: [
        { question: "Verzeichnis wechseln?", options: ["ls", "cd", "cp", "mv"], correctIndex: 1 },
        { question: "Dateiinhalt anzeigen?", options: ["cat", "touch", "mkdir", "pwd"], correctIndex: 0 },
        { question: "Datei verschieben?", options: ["mv", "rm", "tar", "grep"], correctIndex: 0 },
        { question: "Datei suchen?", options: ["find", "ps", "kill", "echo"], correctIndex: 0 },
        { question: "Welcher Befehl zeigt Festplattenspeicher?", options: ["df", "du", "free", "top"], correctIndex: 0 },
        { question: "Prozesse anzeigen?", options: ["ls", "ps", "cd", "pwd"], correctIndex: 1 }
      ]
    },
    {
      type: "matching",
      title: "Linux-Befehle zuordnen",
      pairs: [
        { left: "grep", right: "Text in Dateien suchen" },
        { left: "chmod", right: "Dateiberechtigungen ändern" },
        { left: "chown", right: "Dateibesitzer ändern" },
        { left: "tar", right: "Archive erstellen/extrahieren" },
        { left: "ssh", right: "Remote-Verbindung" },
        { left: "rsync", right: "Dateien synchronisieren" }
      ]
    },
    {
      type: "code",
      title: "Shell-Scripting",
      challenges: [
        {
          title: "Backup-Script",
          description: "Erstelle ein einfaches Backup-Script",
          initialCode: "#!/bin/bash\n# Backup von /home nach /backup\n# Füge rsync-Befehl hinzu",
          solution: "#!/bin/bash\nrsync -av --delete /home/ /backup/\necho \"Backup completed at $(date)\"",
          tests: [
            { input: "rsync command", expected: "rsync -av" },
            { input: "timestamp", expected: "$(date)" }
          ]
        },
        {
          title: "Service-Check",
          description: "Prüfe ob ein Service läuft",
          initialCode: "#!/bin/bash\nSERVICE=\"apache2\"\n# Prüfe Service-Status",
          solution: "#!/bin/bash\nSERVICE=\"apache2\"\nif systemctl is-active --quiet $SERVICE; then\n  echo \"$SERVICE is running\"\nelse\n  echo \"$SERVICE is not running\"\nfi",
          tests: [
            { input: "systemctl check", expected: "systemctl is-active" },
            { input: "conditional", expected: "if" }
          ]
        }
      ]
    },
    {
      type: "dragdrop",
      title: "Linux-Verzeichnisstruktur",
      games: [
        {
          title: "Verzeichnisse zuordnen",
          description: "Ordne die Verzeichnisse ihren Zwecken zu",
          items: [
            { id: "1", content: "/etc", category: "Konfigurationsdateien" },
            { id: "2", content: "/var", category: "Variable Daten" },
            { id: "3", content: "/home", category: "Benutzerverzeichnisse" },
            { id: "4", content: "/usr", category: "Programme und Bibliotheken" },
            { id: "5", content: "/tmp", category: "Temporäre Dateien" },
            { id: "6", content: "/boot", category: "Boot-Dateien" }
          ],
          categories: ["Konfigurationsdateien", "Variable Daten", "Benutzerverzeichnisse", "Programme und Bibliotheken", "Temporäre Dateien", "Boot-Dateien"]
        }
      ]
    },
    {
      type: "memory",
      title: "Berechtigungen Memory",
      games: [
        {
          title: "chmod-Werte",
          description: "Verbinde chmod-Zahlen mit Berechtigungen",
          pairs: [
            { id: "1", content: "755", match: "rwxr-xr-x" },
            { id: "2", content: "644", match: "rw-r--r--" },
            { id: "3", content: "600", match: "rw-------" },
            { id: "4", content: "777", match: "rwxrwxrwx" },
            { id: "5", content: "400", match: "r--------" }
          ]
        }
      ]
    },
    {
      type: "timeline",
      title: "Linux-Geschichte",
      timelines: [
        {
          title: "Evolution von Linux",
          description: "Meilensteine in der Linux-Entwicklung",
          events: [
            { year: "1991", event: "Linux 0.01", description: "Linus Torvalds veröffentlicht ersten Kernel" },
            { year: "1993", event: "Slackware", description: "Eine der ersten Linux-Distributionen" },
            { year: "1993", event: "Debian", description: "Community-getriebene Distribution gegründet" },
            { year: "2004", event: "Ubuntu", description: "Benutzerfreundliche Desktop-Distribution" },
            { year: "2011", event: "systemd", description: "Modernes Init-System eingeführt" },
            { year: "2016", event: "Windows Subsystem for Linux", description: "Linux läuft nativ unter Windows" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "System-Wartung",
      scenarios: [
        {
          title: "Server überlastet",
          description: "Der Production-Server reagiert sehr langsam",
          scenario: "Load Average ist bei 8.5 auf einem 4-Core System. Nutzer können sich nicht einloggen. Wie gehst du vor?",
          choices: [
            { text: "Server sofort neu starten", consequence: "Service-Unterbrechung, Ursache bleibt unbekannt", isCorrect: false },
            { text: "top/htop verwenden um Prozesse zu analysieren", consequence: "Identifiziert Problemverursacher, gezielte Lösung möglich", isCorrect: true },
            { text: "Alle Benutzer kicken", consequence: "Temporäre Entlastung aber unprofessionell", isCorrect: false },
            { text: "Warten bis es besser wird", consequence: "Problem eskaliert, SLA-Verletzung", isCorrect: false }
          ]
        }
      ]
    }
  ],
  "web-technologien": [
    {
      type: "flashcards",
      title: "Web Grundlagen",
      cards: [
        { front: "HTML", back: "Struktur der Seite – Semantik wichtig." },
        { front: "CSS", back: "Präsentation und Layout." },
        { front: "React", back: "Komponentenbasierte UI-Bibliothek." },
        { front: "REST", back: "Architekturstil für APIs." },
        { front: "GraphQL", back: "Flexible Query-Sprache für APIs." },
        { front: "WebSocket", back: "Bidirektionale Real-time Kommunikation." },
        { front: "SPA", back: "Single Page Application – Client-seitiges Routing." },
        { front: "SSR", back: "Server-Side Rendering für bessere SEO." }
      ]
    },
    {
      type: "quiz",
      title: "Frontend-Technologien",
      questions: [
        { question: "Was ist Virtual DOM?", options: ["Browser-Feature", "React-Optimierung", "CSS-Framework", "HTML5-Standard"], correctIndex: 1 },
        { question: "CSS Grid ist für...", options: ["Animationen", "2D-Layout", "Responsive Design", "Typographie"], correctIndex: 1 },
        { question: "JavaScript ist...", options: ["Statisch typisiert", "Compiled", "Interpretiert", "Nur frontend"], correctIndex: 2 },
        { question: "Was macht 'async/await'?", options: ["Synchroner Code", "Asynchrone Programmierung vereinfachen", "Performance steigern", "Memory Management"], correctIndex: 1 }
      ]
    },
    {
      type: "matching",
      title: "Statuscodes",
      pairs: [
        { left: "200", right: "OK" },
        { left: "201", right: "Created" },
        { left: "404", right: "Not Found" },
        { left: "500", right: "Server Error" },
        { left: "401", right: "Unauthorized" },
        { left: "403", right: "Forbidden" }
      ]
    },
    {
      type: "code",
      title: "Web-Entwicklung",
      challenges: [
        {
          title: "React Component",
          description: "Erstelle eine einfache React-Komponente",
          initialCode: "import React from 'react';\n\nfunction Button() {\n  // Implementiere Button-Komponente\n}",
          solution: "import React from 'react';\n\nfunction Button({ children, onClick }) {\n  return (\n    <button onClick={onClick}>\n      {children}\n    </button>\n  );\n}",
          tests: [
            { input: "JSX syntax", expected: "<button>" },
            { input: "Props", expected: "{ children, onClick }" }
          ]
        },
        {
          title: "API Fetch",
          description: "Lade Daten von einer API",
          initialCode: "async function fetchUsers() {\n  // Implementiere API-Call\n}",
          solution: "async function fetchUsers() {\n  try {\n    const response = await fetch('/api/users');\n    const users = await response.json();\n    return users;\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}",
          tests: [
            { input: "fetch API", expected: "await fetch" },
            { input: "error handling", expected: "try" }
          ]
        }
      ]
    },
    {
      type: "dragdrop",
      title: "Frontend vs Backend",
      games: [
        {
          title: "Technologien zuordnen",
          description: "Ordne die Technologien Frontend oder Backend zu",
          items: [
            { id: "1", content: "React", category: "Frontend" },
            { id: "2", content: "Node.js", category: "Backend" },
            { id: "3", content: "CSS", category: "Frontend" },
            { id: "4", content: "MongoDB", category: "Backend" },
            { id: "5", content: "Vue.js", category: "Frontend" },
            { id: "6", content: "Express.js", category: "Backend" }
          ],
          categories: ["Frontend", "Backend"]
        }
      ]
    },
    {
      type: "memory",
      title: "HTML Tags Memory",
      games: [
        {
          title: "HTML-Semantik",
          description: "Verbinde HTML-Tags mit ihren Bedeutungen",
          pairs: [
            { id: "1", content: "<header>", match: "Kopfbereich der Seite" },
            { id: "2", content: "<nav>", match: "Navigation" },
            { id: "3", content: "<main>", match: "Hauptinhalt" },
            { id: "4", content: "<aside>", match: "Seitenleiste" },
            { id: "5", content: "<footer>", match: "Fußbereich" }
          ]
        }
      ]
    },
    {
      type: "timeline",
      title: "Web-Evolution",
      timelines: [
        {
          title: "Geschichte des World Wide Web",
          description: "Entwicklung der Web-Technologien",
          events: [
            { year: "1991", event: "World Wide Web", description: "Tim Berners-Lee macht das Web öffentlich" },
            { year: "1995", event: "JavaScript", description: "Netscape führt JavaScript ein" },
            { year: "1996", event: "CSS", description: "Cascading Style Sheets standardisiert" },
            { year: "2005", event: "AJAX", description: "Asynchrone Web-Anwendungen entstehen" },
            { year: "2013", event: "React", description: "Facebook veröffentlicht React" },
            { year: "2015", event: "ES6", description: "Moderne JavaScript-Features" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Performance-Probleme",
      scenarios: [
        {
          title: "Langsame Website",
          description: "Die Website lädt sehr langsam",
          scenario: "Nutzer beschweren sich über Ladezeiten von 8+ Sekunden. Google PageSpeed gibt schlechte Bewertungen. Wie optimierst du?",
          choices: [
            { text: "Mehr Server kaufen", consequence: "Teuer, behebt möglicherweise nicht das Grundproblem", isCorrect: false },
            { text: "Bilder komprimieren und lazy loading implementieren", consequence: "Direkte Performance-Verbesserung, kosteneffektiv", isCorrect: true },
            { text: "Cache komplett deaktivieren", consequence: "Verschlechtert Performance erheblich", isCorrect: false },
            { text: "Alle Animationen entfernen", consequence: "UX leidet, löst nicht das Hauptproblem", isCorrect: false }
          ]
        }
      ]
    }
  ],
  "grundlagen-it": [
    {
      type: "flashcards",
      title: "Hardware Basics",
      cards: [
        { front: "CPU", back: "Zentrale Recheneinheit." },
        { front: "RAM", back: "Flüchtiger Arbeitsspeicher." },
        { front: "SSD", back: "Schneller, nichtflüchtiger Speicher." },
        { front: "GPU", back: "Grafikprozessor für parallele Aufgaben." },
        { front: "Motherboard", back: "Hauptplatine verbindet alle Komponenten." },
        { front: "Cache", back: "Schneller Zwischenspeicher zwischen CPU und RAM." },
        { front: "USB", back: "Universal Serial Bus für Peripherie-Geräte." },
        { front: "BIOS/UEFI", back: "Firmware für Hardware-Initialisierung." }
      ]
    },
    {
      type: "quiz",
      title: "Zahlensysteme",
      questions: [
        { question: "Binär von 10?", options: ["1010", "1001", "1111", "1100"], correctIndex: 0 },
        { question: "Hex von 15?", options: ["F", "E", "D", "C"], correctIndex: 0 },
        { question: "1 Byte = ?", options: ["4 Bit", "8 Bit", "16 Bit", "32 Bit"], correctIndex: 1 },
        { question: "KB zu Byte (dezimal)?", options: ["100", "512", "1000", "1024"], correctIndex: 2 },
        { question: "Was ist ASCII?", options: ["Prozessor", "Zeichenkodierung", "Speichertyp", "Netzwerkprotokoll"], correctIndex: 1 },
        { question: "Wie viele Bits hat IPv4?", options: ["64", "128", "32", "16"], correctIndex: 2 }
      ]
    },
    {
      type: "matching",
      title: "Hardware-Komponenten",
      pairs: [
        { left: "RAM", right: "Arbeitspeicher" },
        { left: "CPU", right: "Prozessor" },
        { left: "GPU", right: "Grafikkarte" },
        { left: "SSD", right: "Solid State Drive" },
        { left: "HDD", right: "Festplatte" },
        { left: "PSU", right: "Netzteil" }
      ]
    },
    {
      type: "code",
      title: "Binäre Arithmetik",
      challenges: [
        {
          title: "Binär zu Dezimal",
          description: "Konvertiere Binärzahl zu Dezimal",
          initialCode: "function binaryToDecimal(binary) {\n  // Konvertiere binäre Zeichenkette zu Dezimal\n  return 0;\n}",
          solution: "function binaryToDecimal(binary) {\n  return parseInt(binary, 2);\n}",
          tests: [
            { input: "1010", expected: "10" },
            { input: "1111", expected: "15" }
          ]
        },
        {
          title: "Hex zu RGB",
          description: "Konvertiere Hex-Farbe zu RGB",
          initialCode: "function hexToRgb(hex) {\n  // #FF5733 -> {r: 255, g: 87, b: 51}\n}",
          solution: "function hexToRgb(hex) {\n  const r = parseInt(hex.slice(1, 3), 16);\n  const g = parseInt(hex.slice(3, 5), 16);\n  const b = parseInt(hex.slice(5, 7), 16);\n  return {r, g, b};\n}",
          tests: [
            { input: "#FF0000", expected: "{r:255,g:0,b:0}" },
            { input: "#00FF00", expected: "{r:0,g:255,b:0}" }
          ]
        }
      ]
    },
    {
      type: "dragdrop",
      title: "Computer-Architektur",
      games: [
        {
          title: "Von-Neumann-Architektur",
          description: "Ordne die Komponenten der Von-Neumann-Architektur zu",
          items: [
            { id: "1", content: "CPU", category: "Verarbeitung" },
            { id: "2", content: "RAM", category: "Speicher" },
            { id: "3", content: "Eingabegeräte", category: "Input/Output" },
            { id: "4", content: "Ausgabegeräte", category: "Input/Output" },
            { id: "5", content: "Bus-System", category: "Verbindung" },
            { id: "6", content: "Control Unit", category: "Verarbeitung" }
          ],
          categories: ["Verarbeitung", "Speicher", "Input/Output", "Verbindung"]
        }
      ]
    },
    {
      type: "memory",
      title: "Speicher-Hierarchie",
      games: [
        {
          title: "Speichertypen",
          description: "Verbinde Speicher mit Geschwindigkeit",
          pairs: [
            { id: "1", content: "CPU Register", match: "Schnellster" },
            { id: "2", content: "L1 Cache", match: "Sehr schnell" },
            { id: "3", content: "RAM", match: "Schnell" },
            { id: "4", content: "SSD", match: "Mittel" },
            { id: "5", content: "HDD", match: "Langsam" }
          ]
        }
      ]
    },
    {
      type: "timeline",
      title: "Computer-Geschichte",
      timelines: [
        {
          title: "Meilensteine der Computertechnik",
          description: "Wichtige Entwicklungen in der IT-Geschichte",
          events: [
            { year: "1946", event: "ENIAC", description: "Erster elektronischer Universalcomputer" },
            { year: "1971", event: "Intel 4004", description: "Erster kommerzieller Mikroprozessor" },
            { year: "1981", event: "IBM PC", description: "Personal Computer für den Massenmarkt" },
            { year: "1991", event: "World Wide Web", description: "Internet wird öffentlich verfügbar" },
            { year: "2007", event: "iPhone", description: "Smartphone-Revolution beginnt" },
            { year: "2016", event: "AlphaGo", description: "KI schlägt menschlichen Go-Meister" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Hardware-Probleme",
      scenarios: [
        {
          title: "Computer startet nicht",
          description: "Der Rechner zeigt keine Lebenszeichen",
          scenario: "Beim Drücken des Power-Buttons passiert nichts. Keine LEDs, keine Lüfter, kein Bildschirm. Was überprüfst du zuerst?",
          choices: [
            { text: "Sofort Motherboard tauschen", consequence: "Teuer und möglicherweise unnötig", isCorrect: false },
            { text: "Stromversorgung und Verkabelung prüfen", consequence: "Logischer erster Schritt, günstig zu prüfen", isCorrect: true },
            { text: "RAM-Module neu einsetzen", consequence: "Würde bei komplettem Stromausfall nicht helfen", isCorrect: false },
            { text: "BIOS zurücksetzen", consequence: "Ohne Strom nicht möglich", isCorrect: false }
          ]
        }
      ]
    }
  ],
  projektmanagement: [
    {
      type: "flashcards",
      title: "Agile Grundlagen",
      cards: [
        { front: "Scrum", back: "Framework mit Rollen/Events/Artefakten." },
        { front: "Kanban", back: "Flussoptimierung, WIP-Limits." },
        { front: "Backlog", back: "Priorisierte Aufgabenliste." },
        { front: "Velocity", back: "Durchsatz pro Sprint." },
        { front: "Definition of Done", back: "Klare Kriterien für fertige Arbeit." },
        { front: "Burndown Chart", back: "Visualisierung des Sprint-Fortschritts." },
        { front: "User Story", back: "Anforderung aus Nutzersicht." },
        { front: "Epic", back: "Große User Story, in kleinere aufgeteilt." }
      ]
    },
    {
      type: "quiz",
      title: "Scrum Basics",
      questions: [
        { question: "Wer priorisiert das Product Backlog?", options: ["Scrum Master", "Product Owner", "Developer", "Stakeholder"], correctIndex: 1 },
        { question: "Sprint-Dauer?", options: ["1–4 Wochen", "1 Tag", "6 Monate", "Beliebig"], correctIndex: 0 },
        { question: "Daily Standup Dauer?", options: ["15 Min", "60 Min", "30 Min", "5 Min"], correctIndex: 0 },
        { question: "Artefakt?", options: ["Retrospektive", "Sprint Review", "Increment", "Daily"], correctIndex: 2 },
        { question: "Was ist ein Sprint?", options: ["Planungsmeeting", "Zeitbox für Entwicklung", "Code Review", "Deployment"], correctIndex: 1 },
        { question: "Hauptziel der Retrospektive?", options: ["Features planen", "Code reviewen", "Prozess verbessern", "Bugs fixen"], correctIndex: 2 }
      ]
    },
    {
      type: "matching",
      title: "Scrum-Rollen zuordnen",
      pairs: [
        { left: "Product Owner", right: "Definiert WAS gebaut wird" },
        { left: "Scrum Master", right: "Facilitiert den Prozess" },
        { left: "Development Team", right: "Baut das Produkt" },
        { left: "Stakeholder", right: "Haben Interesse am Produkt" },
        { left: "User", right: "Nutzen das Endprodukt" },
        { left: "Management", right: "Unterstützt das Team" }
      ]
    },
    {
      type: "code",
      title: "User Story Schreiben",
      challenges: [
        {
          title: "User Story Template",
          description: "Schreibe eine vollständige User Story",
          initialCode: "// Als [Rolle]\n// möchte ich [Funktion]\n// damit [Nutzen]\n\n// Beispiel für Login-Feature:",
          solution: "Als registrierter Nutzer\nmöchte ich mich mit Email und Passwort anmelden\ndamit ich auf meine persönlichen Daten zugreifen kann\n\nAkzeptanzkriterien:\n- Email-Validierung\n- Passwort mindestens 8 Zeichen\n- Fehlermeldung bei falschen Daten",
          tests: [
            { input: "User Story Format", expected: "Als.*möchte.*damit" },
            { input: "Akzeptanzkriterien", expected: "Akzeptanzkriterien" }
          ]
        }
      ]
    },
    {
      type: "dragdrop",
      title: "Sprint-Phasen",
      games: [
        {
          title: "Scrum Events ordnen",
          description: "Bringe die Scrum Events in die richtige Reihenfolge",
          items: [
            { id: "1", content: "Sprint Planning", category: "Sprint Start" },
            { id: "2", content: "Daily Scrum", category: "Sprint Mitte" },
            { id: "3", content: "Sprint Review", category: "Sprint Ende" },
            { id: "4", content: "Sprint Retrospective", category: "Sprint Ende" },
            { id: "5", content: "Product Backlog Refinement", category: "Kontinuierlich" }
          ],
          categories: ["Sprint Start", "Sprint Mitte", "Sprint Ende", "Kontinuierlich"]
        }
      ]
    },
    {
      type: "memory",
      title: "Agile Methoden Memory",
      games: [
        {
          title: "Agile Frameworks",
          description: "Verbinde Frameworks mit ihren Hauptmerkmalen",
          pairs: [
            { id: "1", content: "Scrum", match: "Sprints und Rollen" },
            { id: "2", content: "Kanban", match: "Kontinuierlicher Fluss" },
            { id: "3", content: "XP", match: "Extreme Programming" },
            { id: "4", content: "SAFe", match: "Scaled Agile Framework" },
            { id: "5", content: "Lean", match: "Waste Elimination" }
          ]
        }
      ]
    },
    {
      type: "timeline",
      title: "Agile Geschichte",
      timelines: [
        {
          title: "Evolution des Projektmanagements",
          description: "Von Wasserfall zu Agile Methoden",
          events: [
            { year: "1970er", event: "Wasserfall-Modell", description: "Sequentielle Phasen in der Softwareentwicklung" },
            { year: "1986", event: "Scrum Ursprung", description: "Takeuchi und Nonaka beschreiben Scrum-Ansatz" },
            { year: "1995", event: "Scrum für Software", description: "Ken Schwaber wendet Scrum auf Softwareentwicklung an" },
            { year: "2001", event: "Agiles Manifest", description: "17 Softwareentwickler definieren agile Werte" },
            { year: "2009", event: "Kanban für Software", description: "David Anderson adaptiert Kanban für IT" },
            { year: "2011", event: "SAFe", description: "Scaled Agile Framework für große Organisationen" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Projektkrisen meistern",
      scenarios: [
        {
          title: "Sprint in Gefahr",
          description: "Das Sprint-Ziel ist nicht erreichbar",
          scenario: "Tag 8 von 10 im Sprint. 70% der Story Points sind noch offen. Wichtiger Stakeholder möchte neue Features. Wie reagierst du?",
          choices: [
            { text: "Sprint verlängern", consequence: "Bricht Scrum-Prinzip der festen Timeboxes", isCorrect: false },
            { text: "Scope reduzieren und Stakeholder informieren", consequence: "Transparent, erhält Sprint-Ziel, ermöglicht Lernen", isCorrect: true },
            { text: "Überstunden anordnen", consequence: "Burnout-Risiko, keine nachhaltige Lösung", isCorrect: false },
            { text: "Neue Features sofort einbauen", consequence: "Scope Creep, Sprint-Ziel wird verwässert", isCorrect: false }
          ]
        }
      ]
    }
  ],
  kommunikation: [
    {
      type: "flashcards",
      title: "Kommunikationsskills",
      cards: [
        { front: "Aktives Zuhören", back: "Paraphrasieren, Nachfragen, Bestätigen." },
        { front: "Feedback-Regeln", back: "Konkret, wertschätzend, zeitnah." },
        { front: "Ich-Botschaften", back: "Eigene Wahrnehmung statt Schuldzuweisung." },
        { front: "Nonverbal", back: "Mimik, Gestik, Haltung beachten." },
        { front: "Empathie", back: "Sich in andere hineinversetzen." },
        { front: "Konfliktlösung", back: "Win-Win-Situationen schaffen." }
      ]
    },
    {
      type: "quiz",
      title: "Teamwork",
      questions: [
        { question: "Gutes Feedback ist...", options: ["Allgemein", "Konkrete Beispiele", "Bewertend", "Spät"], correctIndex: 1 },
        { question: "Konflikte löst man am besten...", options: ["Ignorieren", "Eskalieren", "Strukturiert moderieren", "Per Mail"], correctIndex: 2 },
        { question: "Handzeichen im Meeting hilft...", options: ["Zeit zu füllen", "Dominanz", "Struktur und Fairness", "Nichts"], correctIndex: 2 },
        { question: "Empathie bedeutet...", options: ["Zustimmen", "Mitfühlen", "Mitleid", "Ironie"], correctIndex: 1 }
      ]
    },
    {
      type: "matching",
      title: "Kommunikationsarten",
      pairs: [
        { left: "Verbal", right: "Gesprochene Worte" },
        { left: "Nonverbal", right: "Körpersprache, Mimik" },
        { left: "Schriftlich", right: "E-Mails, Dokumente" },
        { left: "Visuell", right: "Diagramme, Präsentationen" }
      ]
    },
    {
      type: "dragdrop",
      title: "Meeting-Phasen",
      games: [
        {
          title: "Effektive Meetings strukturieren",
          description: "Ordne die Meeting-Elemente den richtigen Phasen zu",
          items: [
            { id: "1", content: "Agenda vorstellen", category: "Eröffnung" },
            { id: "2", content: "Themen diskutieren", category: "Hauptteil" },
            { id: "3", content: "Nächste Schritte", category: "Abschluss" },
            { id: "4", content: "Zeitrahmen festlegen", category: "Eröffnung" }
          ],
          categories: ["Eröffnung", "Hauptteil", "Abschluss"]
        }
      ]
    },
    {
      type: "memory",
      title: "Kommunikationsstile",
      games: [
        {
          title: "Gesprächstechniken",
          description: "Verbinde Techniken mit ihren Anwendungen",
          pairs: [
            { id: "1", content: "Paraphrasieren", match: "Verstehen bestätigen" },
            { id: "2", content: "Offene Fragen", match: "Mehr Informationen sammeln" },
            { id: "3", content: "Spiegeln", match: "Emotionen reflektieren" },
            { id: "4", content: "Zusammenfassen", match: "Kernpunkte hervorheben" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Schwierige Gespräche",
      scenarios: [
        {
          title: "Konflikt im Team",
          description: "Zwei Kollegen streiten über die Projektrichtung",
          scenario: "Anna und Ben diskutieren lautstark über die beste Lösung. Andere Teammitglieder werden unruhig. Wie moderierst du?",
          choices: [
            { text: "Beiden das Wort entziehen", consequence: "Autoritär, löst Grundkonflikt nicht", isCorrect: false },
            { text: "Strukturiert beide Standpunkte sammeln", consequence: "Professionell, fokussiert auf Sachebene", isCorrect: true },
            { text: "Meeting beenden", consequence: "Flucht vor dem Problem", isCorrect: false }
          ]
        }
      ]
    }
  ],
  "rechtliche-grundlagen": [
    {
      type: "flashcards",
      title: "DSGVO Basics",
      cards: [
        { front: "Recht auf Auskunft", back: "Betroffene können Daten anfordern." },
        { front: "Privacy by Design", back: "Datenschutz in Architektur verankern." },
        { front: "Auftragsverarbeitung", back: "Vertrag mit Dienstleistern (Art. 28)." },
        { front: "Datenminimierung", back: "Nur notwendige Daten verarbeiten." }
      ]
    },
    {
      type: "quiz",
      title: "Recht & Praxis",
      questions: [
        { question: "Welche Daten sind besonders schützenswert?", options: ["Name", "Gesundheitsdaten", "E-Mail", "PLZ"], correctIndex: 1 },
        { question: "Rechtsgrundlage für Newsletter?", options: ["Berechtigtes Interesse", "Einwilligung", "Vertrag", "Gesetzliche Pflicht"], correctIndex: 1 },
        { question: "Speicherdauer?", options: ["Beliebig", "Bis Zweck erreicht", "Für immer", "1 Jahr"], correctIndex: 1 },
        { question: "Privacy by Default heißt...", options: ["Alles freigeben", "Sichere Voreinstellungen", "Opt-out", "Keine Cookies"], correctIndex: 1 }
      ]
    }
  ],
  "mobile-entwicklung": [
    {
      type: "flashcards",
      title: "Mobile Basics",
      cards: [
        { front: "Native", back: "Plattformspezifisch (Swift/Kotlin)." },
        { front: "Hybrid", back: "Web + Wrapper (Ionic, Cordova)." },
        { front: "Cross-Platform", back: "Ein Code für mehrere Plattformen (Flutter/React Native)." },
        { front: "Lifecycle", back: "App-Status: active, background, suspended." },
        { front: "PWA", back: "Progressive Web App - webbasiert mit App-Features." },
        { front: "App Store", back: "Vertriebsplattform für mobile Apps." }
      ]
    },
    {
      type: "quiz",
      title: "Android/iOS Basics",
      questions: [
        { question: "Android-UI wird mit...", options: ["Storyboard", "Jetpack Compose", "SwiftUI", "WPF"], correctIndex: 1 },
        { question: "iOS-Sprache?", options: ["Kotlin", "Swift", "Dart", "Java"], correctIndex: 1 },
        { question: "App-Store Review ist...", options: ["Automatisch", "Manuell geprüft", "Kein Review", "Nur für Bezahl-Apps"], correctIndex: 1 },
        { question: "Push Notifications kommen über...", options: ["SMS", "APNs/FCM", "E-Mail", "WebSocket"], correctIndex: 1 }
      ]
    },
    {
      type: "matching",
      title: "Mobile Frameworks",
      pairs: [
        { left: "React Native", right: "JavaScript Cross-Platform" },
        { left: "Flutter", right: "Dart Cross-Platform" },
        { left: "Xamarin", right: "C# Cross-Platform" },
        { left: "Ionic", right: "Web-basiert Hybrid" }
      ]
    },
    {
      type: "code",
      title: "Mobile Development",
      challenges: [
        {
          title: "React Native Component",
          description: "Erstelle eine einfache React Native Komponente",
          initialCode: "import React from 'react';\nimport { View, Text } from 'react-native';\n\nfunction Welcome() {\n  // Implementiere Komponente\n}",
          solution: "import React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\n\nfunction Welcome({ name }) {\n  return (\n    <View style={styles.container}>\n      <Text>Willkommen, {name}!</Text>\n    </View>\n  );\n}",
          tests: [
            { input: "React Native imports", expected: "react-native" },
            { input: "JSX syntax", expected: "<View>" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "App-Performance",
      scenarios: [
        {
          title: "App lädt langsam",
          description: "Nutzer beschweren sich über lange Ladezeiten",
          scenario: "Die mobile App braucht 10+ Sekunden zum Starten. App-Store-Bewertungen werden schlechter.",
          choices: [
            { text: "Lazy Loading implementieren", consequence: "Verbessert Startup-Zeit erheblich", isCorrect: true },
            { text: "Alle Features auf einmal laden", consequence: "Verschlechtert Performance weiter", isCorrect: false }
          ]
        }
      ]
    }
  ]
  pruefungsvorbereitung: [
    {
      type: "flashcards",
      title: "Prüfungstipps",
      cards: [
        { front: "Zeitmanagement", back: "Erst leichte Aufgaben, dann die schweren." },
        { front: "Markieren", back: "Keywords in Aufgaben hervorheben." },
        { front: "Pausen", back: "Kurze Pausen für Fokus einplanen." },
        { front: "Mock-Tests", back: "Prüfungsbedingungen simulieren." }
      ]
    },
    {
      type: "matching",
      title: "Phasen zuordnen",
      pairs: [
        { left: "Vorbereitung", right: "Lernplan erstellen" },
        { left: "Durchführung", right: "Aufgaben bearbeiten" },
        { left: "Überprüfung", right: "Ergebnisse kontrollieren" },
        { left: "Reflexion", right: "Verbesserungen ableiten" }
      ]
    }
  ]
};

export const getModulesForCategory = (id: string) => learnContent[id] || [];
