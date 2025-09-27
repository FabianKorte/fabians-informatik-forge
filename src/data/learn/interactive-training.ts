import type { InteractiveTask } from "@/types/learn";

// Programmierung - Interactive Tasks
export const programmierungInteractiveTasks: InteractiveTask[] = [
  {
    id: "prog-1",
    category: "programmierung",
    difficulty: "mittel",
    taskType: "code-complete",
    taskText: "Eine Logistikfirma möchte ein Programm, das die Gesamtkosten einer Lieferung berechnet. Der Code ist unvollständig – ergänze die fehlenden Zeilen. Die Funktion soll Gewicht und Preis pro Kilogramm als Parameter nehmen und die Gesamtkosten zurückgeben.",
    inputFormat: "code",
    tools: ["Python-Editor mit Syntax-Highlighting", "Code-Ausführung und Test"],
    infoTexts: [
      "In Python werden Funktionen mit 'def' definiert, gefolgt vom Funktionsnamen und Parametern in Klammern.",
      "Rückgabewerte erfolgen mit 'return'. Dies gibt das Ergebnis an den Aufrufer zurück.",
      "Mathematische Operationen: + (Addition), - (Subtraktion), * (Multiplikation), / (Division)"
    ],
    helpButtons: [
      { label: "Funktions-Syntax zeigen", content: "def funktionsname(parameter1, parameter2):\n    # Code hier\n    return ergebnis" },
      { label: "Multiplikation-Hinweis", content: "Um zwei Zahlen zu multiplizieren, verwende den * Operator: ergebnis = zahl1 * zahl2" }
    ],
    gamification: {
      points: 25,
      badge: "Code-Meister",
      timeLimit: 120,
      level: 2
    },
    adaptiveHelp: {
      hintsAfterFailures: 2,
      hints: [
        "Die Funktion braucht zwei Parameter: weight und price_per_kg",
        "Multipliziere weight mit price_per_kg für die Gesamtkosten",
        "Vergiss nicht das 'return' Statement am Ende!"
      ],
      fallbackSolution: "def delivery_cost(weight, price_per_kg):\n    return weight * price_per_kg"
    },
    expectedSolution: "def delivery_cost(weight, price_per_kg):\n    return weight * price_per_kg",
    feedback: {
      correct: "Perfekt! Du hast eine korrekte Python-Funktion erstellt. Die Funktion nimmt zwei Parameter und gibt das Produkt zurück.",
      incorrect: "Nicht ganz richtig. Überprüfe die Funktionssyntax und stelle sicher, dass du 'return' verwendest.",
      commonMistakes: [
        "print() statt return verwenden - print zeigt nur an, return gibt Werte zurück",
        "Falsche Funktionssyntax - vergesse nicht def und die Doppelpunkte",
        "Parameter falsch benannt oder vergessen"
      ]
    }
  },
  {
    id: "prog-2",
    category: "programmierung",
    difficulty: "schwer",
    taskType: "error-finding",
    taskText: "Ein Entwickler hat folgenden Code geschrieben, aber er enthält einen logischen Fehler. Finde und beschreibe den Fehler:\n\nfor i in range(10):\n    if i = 5:\n        print('Gefunden!')\n        break",
    inputFormat: "text",
    tools: ["Syntax-Checker", "Python-Dokumentation"],
    infoTexts: [
      "Der Zuweisungsoperator '=' weist einen Wert zu einer Variablen zu.",
      "Der Vergleichsoperator '==' prüft, ob zwei Werte gleich sind.",
      "In if-Statements werden Vergleichsoperatoren benötigt, keine Zuweisungsoperatoren."
    ],
    helpButtons: [
      { label: "Operatoren-Unterschied", content: "= ist Zuweisung (x = 5), == ist Vergleich (if x == 5)" },
      { label: "If-Statement Syntax", content: "if bedingung:\n    # code hier\nDie Bedingung muss einen booleschen Wert (True/False) ergeben" }
    ],
    gamification: {
      points: 30,
      badge: "Bug-Hunter",
      timeLimit: 90,
      level: 3
    },
    adaptiveHelp: {
      hintsAfterFailures: 1,
      hints: [
        "Schaue dir die if-Zeile genau an. Welcher Operator wird verwendet?",
        "Soll hier ein Wert zugewiesen oder verglichen werden?",
        "Der Operator '=' ist für Zuweisungen, '==' für Vergleiche"
      ]
    },
    expectedSolution: ["Der Fehler ist in Zeile 2: 'i = 5' sollte 'i == 5' sein", "Zeile 2: = sollte == sein", "Vergleichsoperator == statt Zuweisungsoperator = verwenden"],
    feedback: {
      correct: "Exzellent! Du hast den Unterschied zwischen Zuweisung (=) und Vergleich (==) erkannt. Das ist ein sehr häufiger Fehler!",
      incorrect: "Der Fehler liegt im Unterschied zwischen Zuweisung und Vergleich. Schau dir die if-Zeile nochmal genau an.",
      commonMistakes: [
        "Den Fehler in der falschen Zeile suchen",
        "Syntaxfehler statt logischen Fehler vermuten",
        "Die range()-Funktion verdächtigen"
      ]
    }
  }
];

// Mathematik - Interactive Tasks
export const mathematikInteractiveTasks: InteractiveTask[] = [
  {
    id: "math-1",
    category: "mathematik",
    difficulty: "mittel",
    taskType: "number-conversion",
    taskText: "Ein Entwicklerteam arbeitet mit binären Schaltern für eine IoT-Anwendung. Du musst die Dezimalzahl 156 ins Binärsystem umwandeln, um den richtigen Schaltplan einzustellen. Die Schalter werden von rechts nach links (niedrigste bis höchste Wertigkeit) angeordnet.",
    inputFormat: "text",
    tools: ["Binär-Rechner", "Divisions-Tabelle", "Stellenwerttabelle"],
    infoTexts: [
      "Umwandlung ins Binärsystem erfolgt durch wiederholte Division durch 2.",
      "Die Reste der Divisionen werden von unten nach oben gelesen.",
      "Jede Stelle im Binärsystem repräsentiert eine Potenz von 2: 2⁰, 2¹, 2², 2³, ...",
      "Beispiel: 156 ÷ 2 = 78 Rest 0, 78 ÷ 2 = 39 Rest 0, 39 ÷ 2 = 19 Rest 1, ..."
    ],
    helpButtons: [
      { label: "Divisions-Methode", content: "1. Teile durch 2\n2. Notiere den Rest (0 oder 1)\n3. Verwende das Ergebnis für die nächste Division\n4. Wiederhole bis Ergebnis = 0\n5. Lese Reste von unten nach oben" },
      { label: "Hilfstabelle", content: "128|64|32|16|8|4|2|1\n 1 | 0| 0| 1|1|1|0|0\n156 = 128 + 16 + 8 + 4" }
    ],
    gamification: {
      points: 20,
      badge: "Zahlensystem-Profi",
      timeLimit: 180,
      level: 2
    },
    adaptiveHelp: {
      hintsAfterFailures: 2,
      hints: [
        "Starte mit 156 ÷ 2 = 78 Rest 0. Was ist 78 ÷ 2?",
        "Die Divisions-Kette: 156→78→39→19→9→4→2→1→0 mit Resten 0,0,1,1,1,0,0,1",
        "Lese die Reste von unten nach oben: 10011100"
      ]
    },
    expectedSolution: "10011100",
    feedback: {
      correct: "Perfekt! 156₁₀ = 10011100₂. Du hast die Divisions-Methode korrekt angewendet.",
      incorrect: "Nicht ganz richtig. Verwende die schrittweise Division durch 2 und lies die Reste von unten nach oben.",
      commonMistakes: [
        "Reste in falscher Reihenfolge lesen (von oben nach unten statt unten nach oben)",
        "Division nicht bis zum Ende (Ergebnis 0) durchführen",
        "Rechenfehler bei der Division durch 2"
      ]
    }
  },
  {
    id: "math-2",
    category: "mathematik",
    difficulty: "schwer",
    taskType: "calculation",
    taskText: "In einem Softwareprojekt werden verschiedene Algorithmen verglichen. Die Laufzeit von Algorithmus A beträgt O(n log n) und von Algorithmus B beträgt O(n²). Bei welcher Datenmenge n sind beide Algorithmen gleich schnell? Finde den Schnittpunkt: n log₂(n) = n²",
    inputFormat: "number",
    tools: ["Wissenschaftlicher Taschenrechner", "Logarithmus-Tabelle", "Grafischer Plotter"],
    infoTexts: [
      "O(n log n) bedeutet: Laufzeit proportional zu n × log₂(n)",
      "O(n²) bedeutet: Laufzeit proportional zu n²",
      "Schnittpunkt finden: n log₂(n) = n² → log₂(n) = n (nach Division durch n)",
      "Logarithmus-Eigenschaften: log₂(2) = 1, log₂(4) = 2, log₂(8) = 3, log₂(16) = 4"
    ],
    helpButtons: [
      { label: "Gleichung vereinfachen", content: "n log₂(n) = n² → Beide Seiten durch n teilen → log₂(n) = n" },
      { label: "Lösungsansatz", content: "Probiere Werte aus: log₂(2)=1≠2, log₂(4)=2≠4, aber log₂(2)=1 ist nah dran..." },
      { label: "Grafische Hilfe", content: "Zeichne y = log₂(x) und y = x. Der Schnittpunkt liegt zwischen x=1 und x=2" }
    ],
    gamification: {
      points: 35,
      badge: "Komplexitäts-Analyst",
      timeLimit: 300,
      level: 4
    },
    adaptiveHelp: {
      hintsAfterFailures: 2,
      hints: [
        "Vereinfache zuerst: n log₂(n) = n² wird zu log₂(n) = n",
        "Der Schnittpunkt liegt bei n ≈ 1.763 (kann nur numerisch gelöst werden)",
        "Für praktische Zwecke: Bei n=2 ist log₂(2)=1 < 2, bei n=1 ist log₂(1)=0 < 1"
      ]
    },
    expectedSolution: 1.763,
    feedback: {
      correct: "Hervorragend! Der theoretische Schnittpunkt liegt bei n ≈ 1.763. In der Praxis bedeutet das: O(n log n) ist fast immer besser als O(n²)!",
      incorrect: "Das ist nicht der korrekte Schnittpunkt. Vereinfache die Gleichung zu log₂(n) = n und löse numerisch.",
      commonMistakes: [
        "Gleichung nicht richtig vereinfachen (durch n teilen vergessen)",
        "Integer-Lösung erwarten (gibt es nicht für diese Gleichung)",
        "Logarithmus-Basis verwechseln (log₁₀ statt log₂)"
      ]
    }
  }
];

// IT-Sicherheit - Interactive Tasks
export const itSicherheitInteractiveTasks: InteractiveTask[] = [
  {
    id: "sec-1",
    category: "it-sicherheit",
    difficulty: "schwer",
    taskType: "security-audit",
    taskText: "Du führst ein Sicherheitsaudit für eine Webanwendung durch. Analysiere folgenden PHP-Code und identifiziere die Sicherheitslücke:\n\n$query = \"SELECT * FROM users WHERE username = '\" . $_GET['user'] . \"'\";\n$result = mysql_query($query);\n\nWie könnte ein Angreifer diese Lücke ausnutzen und wie kann sie behoben werden?",
    inputFormat: "text",
    tools: ["SQL-Injection-Simulator", "PHP-Dokumentation", "Secure-Coding-Guidelines"],
    infoTexts: [
      "SQL-Injection ist eine der häufigsten Webanwendungs-Schwachstellen (OWASP Top 10).",
      "Nicht validierte Benutzereingaben in SQL-Queries können zu Datenbank-Kompromittierung führen.",
      "Prepared Statements und Parameter-Binding bieten Schutz vor SQL-Injection.",
      "Der Code verwendet veraltete mysql_*-Funktionen (deprecated seit PHP 5.5.0)."
    ],
    helpButtons: [
      { label: "SQL-Injection Beispiel", content: "URL: site.com/user.php?user=admin' OR '1'='1\nErgebnis: Alle Benutzer werden angezeigt statt nur 'admin'" },
      { label: "Sichere Alternative", content: "Verwende PDO mit Prepared Statements:\n$stmt = $pdo->prepare('SELECT * FROM users WHERE username = ?');\n$stmt->execute([$_GET['user']]);" }
    ],
    gamification: {
      points: 40,
      badge: "Security-Expert",
      timeLimit: 240,
      level: 4
    },
    adaptiveHelp: {
      hintsAfterFailures: 1,
      hints: [
        "Schaue dir an, wie $_GET['user'] direkt in die SQL-Query eingefügt wird",
        "Was passiert, wenn jemand ' OR '1'='1 als Parameter übergibt?",
        "Stichwort: SQL-Injection durch ungeschützte Parameter-Einbindung"
      ]
    },
    expectedSolution: ["SQL-Injection durch ungeschützte Eingabe in $_GET['user']. Lösung: Prepared Statements verwenden", "SQL-Injection Schwachstelle. Prepared Statements mit Parameter-Binding nutzen", "Direkter SQL-Parameter ohne Validierung ermöglicht SQL-Injection"],
    feedback: {
      correct: "Ausgezeichnet! Du hast die SQL-Injection-Schwachstelle erkannt. Prepared Statements sind der beste Schutz dagegen.",
      incorrect: "Die Schwachstelle liegt in der direkten Einbindung von $_GET['user'] in die SQL-Query. Das ermöglicht SQL-Injection-Angriffe.",
      commonMistakes: [
        "XSS statt SQL-Injection vermuten",
        "Nur die veraltete mysql_*-Funktion kritisieren",
        "Eingabevalidierung als einzige Lösung vorschlagen (Prepared Statements sind sicherer)"
      ]
    }
  },
  {
    id: "sec-2",
    category: "it-sicherheit",
    difficulty: "mittel",
    taskType: "error-finding",
    taskText: "Eine Webanwendung zeigt Benutzerdaten an. Analysiere den folgenden HTML/PHP-Code und finde die XSS-Schwachstelle:\n\n<h1>Willkommen <?php echo $_GET['name']; ?>!</h1>\n<p>Ihre letzte Anmeldung: <?= $last_login ?></p>\n\nWas ist das Problem und wie kann es behoben werden?",
    inputFormat: "text",
    tools: ["XSS-Tester", "HTML-Entity-Encoder", "Browser-Entwicklertools"],
    infoTexts: [
      "Cross-Site Scripting (XSS) ermöglicht die Ausführung von JavaScript in anderen Browsern.",
      "Nicht escapeⁿ Benutzereingaben können zu XSS-Angriffen führen.",
      "htmlspecialchars() in PHP escaped gefährliche Zeichen wie <, >, & und \".",
      "Content Security Policy (CSP) bietet zusätzlichen Schutz vor XSS."
    ],
    helpButtons: [
      { label: "XSS-Angriff Beispiel", content: "URL: site.php?name=<script>alert('XSS')</script>\nErgebnis: JavaScript wird im Browser ausgeführt" },
      { label: "Sichere Lösung", content: "<?php echo htmlspecialchars($_GET['name'], ENT_QUOTES, 'UTF-8'); ?>" }
    ],
    gamification: {
      points: 30,
      badge: "XSS-Hunter",
      timeLimit: 180,
      level: 3
    },
    adaptiveHelp: {
      hintsAfterFailures: 2,
      hints: [
        "Schaue dir an, wie $_GET['name'] direkt ausgegeben wird",
        "Was passiert wenn jemand <script>alert('XSS')</script> als Name übergibt?",
        "Stichwort: Cross-Site Scripting durch unescapte Ausgabe"
      ]
    },
    expectedSolution: ["XSS-Schwachstelle durch unescapte Ausgabe von $_GET['name']. Lösung: htmlspecialchars() verwenden", "Cross-Site Scripting möglich. $_GET['name'] muss escaped werden", "Direkte Ausgabe von Benutzereingaben ermöglicht XSS-Angriffe"],
    feedback: {
      correct: "Perfekt! Die unescapte Ausgabe von $_GET['name'] ermöglicht XSS-Angriffe. htmlspecialchars() löst das Problem.",
      incorrect: "Die Schwachstelle liegt in der direkten Ausgabe von $_GET['name'] ohne Escaping. Das ermöglicht XSS-Angriffe.",
      commonMistakes: [
        "SQL-Injection statt XSS vermuten",
        "Nur Eingabevalidierung vorschlagen (Output-Escaping ist wichtiger)",
        "Die $last_login Variable als Problem sehen (kommt aus der Datenbank, nicht von Benutzereingabe)"
      ]
    }
  }
];

// BWL/Betriebswirtschaft - Interactive Tasks
export const bwlInteractiveTasks: InteractiveTask[] = [
  {
    id: "bwl-1",
    category: "betriebswirtschaft",
    difficulty: "mittel",
    taskType: "calculation",
    taskText: "Die TechStartup GmbH plant die Einführung einer neuen Software. Die Entwicklungskosten betragen 150.000€, laufende Kosten 2.000€/Monat. Der Verkaufspreis pro Lizenz beträgt 299€, variable Kosten pro Lizenz 50€. Wie viele Lizenzen müssen verkauft werden, um die Break-Even-Point zu erreichen?",
    inputFormat: "number",
    tools: ["Break-Even-Rechner", "Tabellenkalkulation", "Kosten-Nutzen-Diagramm"],
    infoTexts: [
      "Break-Even-Point = Punkt, an dem Gesamtkosten = Gesamterlöse",
      "Fixkosten = Entwicklungskosten (150.000€) + laufende Kosten für Break-Even-Zeitraum",
      "Deckungsbeitrag pro Einheit = Verkaufspreis - variable Kosten pro Einheit",
      "Break-Even-Formel: Fixkosten ÷ Deckungsbeitrag pro Einheit"
    ],
    helpButtons: [
      { label: "Deckungsbeitrag berechnen", content: "Deckungsbeitrag = 299€ - 50€ = 249€ pro Lizenz" },
      { label: "Break-Even-Formel", content: "Break-Even-Menge = Fixkosten ÷ Deckungsbeitrag\n= 150.000€ ÷ 249€ = 603 Lizenzen (gerundet)" }
    ],
    gamification: {
      points: 25,
      badge: "Kosten-Analyst",
      timeLimit: 180,
      level: 3
    },
    adaptiveHelp: {
      hintsAfterFailures: 2,
      hints: [
        "Berechne zuerst den Deckungsbeitrag: Verkaufspreis minus variable Kosten",
        "Ignoriere die laufenden Kosten für diese Berechnung (diese wären für längerfristige Analyse)",
        "Break-Even = 150.000€ ÷ (299€ - 50€) = 150.000€ ÷ 249€"
      ]
    },
    expectedSolution: 603,
    feedback: {
      correct: "Perfekt! Bei 603 verkauften Lizenzen ist der Break-Even-Point erreicht. Der Deckungsbeitrag von 249€ pro Lizenz deckt die Fixkosten ab.",
      incorrect: "Überprüfe deine Berechnung. Deckungsbeitrag = 299€ - 50€ = 249€, dann 150.000€ ÷ 249€ = 603 Lizenzen.",
      commonMistakes: [
        "Laufende Kosten in die Break-Even-Berechnung einbeziehen",
        "Variable Kosten vergessen abzuziehen",
        "Rundungsfehler (602,4 → 603 Lizenzen aufrunden)"
      ]
    }
  }
];

// Webentwicklung - Interactive Tasks
export const webentwicklungInteractiveTasks: InteractiveTask[] = [
  {
    id: "web-1",
    category: "webentwicklung",
    difficulty: "leicht",
    taskType: "code-complete",
    taskText: "Du entwickelst eine responsive Webseite. Erstelle ein CSS-Flexbox-Layout für eine Navigationsleiste. Die Navigation soll horizontal ausgerichtet sein, die Menüpunkte sollen gleichmäßig verteilt werden und auf mobilen Geräten soll sie vertikal angeordnet werden.",
    inputFormat: "code",
    tools: ["CSS-Editor", "Browser-Entwicklertools", "Flexbox-Visualizer"],
    infoTexts: [
      "Flexbox ist ein eindimensionales Layout-System für CSS.",
      "display: flex macht ein Element zum Flex-Container.",
      "justify-content steuert die horizontale Ausrichtung der Flex-Items.",
      "Media Queries ermöglichen responsive Design mit @media (max-width: 768px)."
    ],
    helpButtons: [
      { label: "Flexbox-Grundlagen", content: ".nav {\n  display: flex;\n  justify-content: space-between;\n}" },
      { label: "Media Query Syntax", content: "@media (max-width: 768px) {\n  .nav {\n    flex-direction: column;\n  }\n}" }
    ],
    gamification: {
      points: 20,
      badge: "CSS-Layouter",
      timeLimit: 150,
      level: 1
    },
    adaptiveHelp: {
      hintsAfterFailures: 2,
      hints: [
        "Starte mit display: flex für den Container",
        "Verwende justify-content: space-between für gleichmäßige Verteilung",
        "Media Query für mobile Geräte: @media (max-width: 768px)"
      ]
    },
    expectedSolution: ".nav {\n  display: flex;\n  justify-content: space-between;\n}\n\n@media (max-width: 768px) {\n  .nav {\n    flex-direction: column;\n  }\n}",
    feedback: {
      correct: "Großartig! Du hast ein responsives Flexbox-Layout erstellt. Die Navigation passt sich automatisch an verschiedene Bildschirmgrößen an.",
      incorrect: "Überprüfe die Flexbox-Eigenschaften und die Media Query Syntax. Vergiss nicht flex-direction: column für mobile Geräte.",
      commonMistakes: [
        "display: flex vergessen",
        "Media Query falsch geschrieben",
        "flex-direction: column nicht in der Media Query verwendet"
      ]
    }
  },
  {
    id: "web-2",
    category: "webentwicklung",
    difficulty: "mittel",
    taskType: "error-finding",
    taskText: "Ein JavaScript-Entwickler hat folgenden Code geschrieben, aber die Event-Listener funktionieren nicht korrekt:\n\nfor (var i = 0; i < buttons.length; i++) {\n  buttons[i].addEventListener('click', function() {\n    console.log('Button ' + i + ' clicked');\n  });\n}\n\nWas ist das Problem und wie kann es behoben werden?",
    inputFormat: "text",
    tools: ["JavaScript-Console", "Browser-Entwicklertools", "ES6-Referenz"],
    infoTexts: [
      "JavaScript-Closures 'schließen' Variablen in ihrem Gültigkeitsbereich ein.",
      "var hat Funktions-Scope, let hat Block-Scope.",
      "Event-Listener werden asynchron ausgeführt, nachdem die Schleife beendet ist.",
      "Bei var wird die Variable i von allen Event-Listenern geteilt."
    ],
    helpButtons: [
      { label: "Closure-Problem", content: "Alle Event-Listener teilen sich dieselbe Variable i. Wenn sie ausgeführt werden, ist i bereits buttons.length." },
      { label: "Lösung mit let", content: "for (let i = 0; i < buttons.length; i++) {\n  // let erstellt eine neue Variable für jede Iteration\n}" }
    ],
    gamification: {
      points: 35,
      badge: "Closure-Meister",
      timeLimit: 200,
      level: 3
    },
    adaptiveHelp: {
      hintsAfterFailures: 1,
      hints: [
        "Das Problem liegt bei der Variable i und wie Closures funktionieren",
        "Alle Event-Listener teilen sich dieselbe Variable i",
        "Lösung: let statt var verwenden für Block-Scope"
      ]
    },
    expectedSolution: ["var durch let ersetzen für Block-Scope", "Closure-Problem: let i statt var i verwenden", "Variable i wird von allen Event-Listenern geteilt, let löst das Problem"],
    feedback: {
      correct: "Exzellent! Du hast das Closure-Problem erkannt. let erstellt für jede Iteration eine neue Variable i.",
      incorrect: "Das Problem liegt bei var und Closures. Alle Event-Listener teilen sich dieselbe Variable i. let löst das Problem.",
      commonMistakes: [
        "addEventListener-Syntax als Problem sehen",
        "buttons Array als Ursache vermuten",
        "Nur auf console.log fokussieren statt auf das i-Problem"
      ]
    }
  }
];

// Datenbanken - Interactive Tasks  
export const datenbankenInteractiveTasks: InteractiveTask[] = [
  {
    id: "db-1",
    category: "datenbanken",
    difficulty: "mittel",
    taskType: "code-complete",
    taskText: "Eine E-Commerce-Datenbank hat Tabellen für Kunden (customers) und Bestellungen (orders). Schreibe eine SQL-Abfrage, die alle Kunden anzeigt, die in den letzten 30 Tagen mindestens eine Bestellung aufgegeben haben. Sortiere nach Kundennamen aufsteigend.",
    inputFormat: "code",
    tools: ["SQL-Editor", "Datenbank-Schema-Viewer", "Query-Planer"],
    infoTexts: [
      "JOIN verbindet Tabellen über gemeinsame Spalten (meist Foreign Keys).",
      "WHERE-Klausel filtert Datensätze nach Bedingungen.",
      "DISTINCT eliminiert Duplikate aus dem Ergebnis.",
      "DATE-Funktionen: CURDATE(), DATE_SUB(), INTERVAL ermöglichen Datumsberechnungen."
    ],
    helpButtons: [
      { label: "JOIN-Syntax", content: "SELECT * FROM customers c\nJOIN orders o ON c.customer_id = o.customer_id" },
      { label: "Datum-Filter", content: "WHERE o.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)" }
    ],
    gamification: {
      points: 30,
      badge: "SQL-Profi",
      timeLimit: 180,
      level: 3
    },
    adaptiveHelp: {
      hintsAfterFailures: 2,
      hints: [
        "Verwende INNER JOIN um customers und orders zu verbinden",
        "Filter mit WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)",
        "DISTINCT um Duplikate zu vermeiden, ORDER BY für Sortierung"
      ]
    },
    expectedSolution: "SELECT DISTINCT c.customer_name\nFROM customers c\nINNER JOIN orders o ON c.customer_id = o.customer_id\nWHERE o.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)\nORDER BY c.customer_name ASC;",
    feedback: {
      correct: "Perfekt! Deine SQL-Abfrage verbindet die Tabellen korrekt und filtert nach dem Datum. DISTINCT verhindert Duplikate.",
      incorrect: "Überprüfe die JOIN-Bedingung, das Datum-Filter und vergiss nicht DISTINCT für eindeutige Kunden.",
      commonMistakes: [
        "DISTINCT vergessen (Kunden könnten mehrfach erscheinen)",
        "Falsche Datum-Funktion verwenden",
        "JOIN-Bedingung zwischen customer_id nicht korrekt"
      ]
    }
  }
];

// Export all interactive tasks by category
export const interactiveTasksByCategory: Record<string, InteractiveTask[]> = {
  programmierung: programmierungInteractiveTasks,
  "mathematik-logik": mathematikInteractiveTasks,
  "it-sicherheit": itSicherheitInteractiveTasks,
  betriebswirtschaft: bwlInteractiveTasks,
  webentwicklung: webentwicklungInteractiveTasks,
  datenbanken: datenbankenInteractiveTasks,
  // Weitere Kategorien können hier hinzugefügt werden
  // "it-sicherheit-advanced": itSicherheitInteractiveTasks,
  // "grundlagen-it": grundlagenItInteractiveTasks,
  // "mobile-entwicklung": mobileEntwicklungInteractiveTasks,
};