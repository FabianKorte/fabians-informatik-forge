import type { InteractiveTask } from "@/types/learn";

// Java - Interactive Tasks (eigene Kategorie)
export const javaInteractiveTasks: InteractiveTask[] = [
  {
    id: "java-1",
    category: "java",
    difficulty: "leicht",
    taskType: "code-complete",
    taskText: "Vervollständige die Java-Methode, die zwei Integer-Zahlen addiert und das Ergebnis zurückgibt.\n\npublic class Calculator {\n    public static int addiere(int a, int b) {\n        // Dein Code hier\n    }\n}",
    inputFormat: "code",
    tools: ["Java-Editor mit Syntax-Highlighting", "Java-Compiler"],
    infoTexts: [
      "In Java werden Methoden mit Rückgabetyp, Name und Parametern definiert.",
      "Das Schlüsselwort 'return' gibt einen Wert zurück und beendet die Methode.",
      "Der Rückgabetyp 'int' erwartet eine ganze Zahl als Rückgabewert.",
      "Arithmetische Operatoren: + (Addition), - (Subtraktion), * (Multiplikation), / (Division)"
    ],
    helpButtons: [
      { label: "Return-Syntax", content: "return ausdruck;\n\nBeispiel:\nreturn a + b;" },
      { label: "Methoden-Aufbau", content: "public static rückgabetyp methodenname(parameter) {\n    // Code\n    return wert;\n}" }
    ],
    gamification: {
      points: 15,
      badge: "Java-Einsteiger",
      timeLimit: 60,
      level: 1
    },
    adaptiveHelp: {
      hintsAfterFailures: 1,
      hints: [
        "Du musst die beiden Parameter a und b addieren",
        "Verwende 'return a + b;' um das Ergebnis zurückzugeben"
      ],
      fallbackSolution: "return a + b;"
    },
    expectedSolution: "return a + b;",
    feedback: {
      correct: "Perfekt! Du hast deine erste Java-Methode erfolgreich vervollständigt. Das return-Statement gibt die Summe zurück.",
      incorrect: "Nicht ganz richtig. Verwende 'return a + b;' um die Summe der beiden Parameter zurückzugeben.",
      commonMistakes: [
        "System.out.println() statt return verwenden",
        "Das Semikolon am Ende vergessen",
        "Falsche Operatoren verwenden"
      ]
    }
  },
  {
    id: "java-2",
    category: "java",
    difficulty: "leicht",
    taskType: "code-complete",
    taskText: "Erstelle eine for-Schleife, die die Zahlen 1 bis 10 ausgibt.\n\npublic class Schleife {\n    public static void main(String[] args) {\n        // Schreibe hier deine for-Schleife\n    }\n}",
    inputFormat: "code",
    tools: ["Java-Editor", "Konsolen-Ausgabe"],
    infoTexts: [
      "Eine for-Schleife besteht aus: Initialisierung; Bedingung; Inkrement",
      "System.out.println() gibt Text auf der Konsole aus",
      "i++ ist eine Kurzform für i = i + 1",
      "Die Schleife läuft solange die Bedingung 'true' ist"
    ],
    helpButtons: [
      { label: "For-Schleife Syntax", content: "for (int i = startwert; i <= endwert; i++) {\n    System.out.println(i);\n}" },
      { label: "Ausgabe-Befehl", content: "System.out.println(variable);\n// Gibt den Wert der Variable aus" }
    ],
    gamification: {
      points: 20,
      badge: "Schleifen-Meister",
      timeLimit: 90,
      level: 1
    },
    adaptiveHelp: {
      hintsAfterFailures: 2,
      hints: [
        "Starte mit 'for (int i = 1; ...'",
        "Die Bedingung sollte 'i <= 10' sein",
        "Vollständig: for (int i = 1; i <= 10; i++)"
      ],
      fallbackSolution: "for (int i = 1; i <= 10; i++) {\n    System.out.println(i);\n}"
    },
    expectedSolution: "for (int i = 1; i <= 10; i++) {\n    System.out.println(i);\n}",
    feedback: {
      correct: "Ausgezeichnet! Deine for-Schleife gibt korrekt die Zahlen 1-10 aus. Die drei Teile (Init, Bedingung, Inkrement) sind perfekt.",
      incorrect: "Überprüfe deine Schleife: Start bei 1, Ende bei 10, und gib i mit System.out.println(i) aus.",
      commonMistakes: [
        "Mit 0 statt 1 starten",
        "< statt <= verwenden (gibt nur 1-9 aus)",
        "println falsch schreiben"
      ]
    }
  },
  {
    id: "java-3",
    category: "java",
    difficulty: "mittel",
    taskType: "code-complete",
    taskText: "Vervollständige die Methode, die prüft, ob eine Zahl gerade oder ungerade ist.\n\npublic class ParityCheck {\n    public static String pruefeGeradeUngerade(int zahl) {\n        // Wenn zahl gerade ist, gib \"gerade\" zurück\n        // Sonst gib \"ungerade\" zurück\n    }\n}",
    inputFormat: "code",
    tools: ["Java-Editor", "Modulo-Rechner", "Debugger"],
    infoTexts: [
      "Der Modulo-Operator % gibt den Rest einer Division zurück.",
      "Eine Zahl ist gerade, wenn zahl % 2 == 0 (Rest 0 bei Division durch 2).",
      "if-else Statements ermöglichen bedingte Ausführung von Code.",
      "String-Literale werden in doppelten Anführungszeichen geschrieben: \"text\""
    ],
    helpButtons: [
      { label: "Modulo erklärt", content: "% gibt den Rest einer Division:\n10 % 3 = 1 (10 / 3 = 3 Rest 1)\n8 % 2 = 0 (8 / 2 = 4 Rest 0)\n7 % 2 = 1 (ungerade!)" },
      { label: "If-Else Syntax", content: "if (bedingung) {\n    return \"wert1\";\n} else {\n    return \"wert2\";\n}" }
    ],
    gamification: {
      points: 25,
      badge: "Logik-Experte",
      timeLimit: 120,
      level: 2
    },
    adaptiveHelp: {
      hintsAfterFailures: 2,
      hints: [
        "Prüfe mit zahl % 2 ob der Rest 0 ist",
        "Wenn zahl % 2 == 0, ist die Zahl gerade",
        "Verwende if (zahl % 2 == 0) return \"gerade\"; else return \"ungerade\";"
      ],
      fallbackSolution: "if (zahl % 2 == 0) {\n    return \"gerade\";\n} else {\n    return \"ungerade\";\n}"
    },
    expectedSolution: "if (zahl % 2 == 0) {\n    return \"gerade\";\n} else {\n    return \"ungerade\";\n}",
    feedback: {
      correct: "Sehr gut! Du verstehst den Modulo-Operator und if-else Strukturen. Der Modulo-Operator ist fundamental für viele Algorithmen.",
      incorrect: "Verwende zahl % 2 == 0 um zu prüfen, ob die Zahl gerade ist, und return entsprechend \"gerade\" oder \"ungerade\".",
      commonMistakes: [
        "/ statt % verwenden",
        "== mit = verwechseln",
        "String ohne Anführungszeichen schreiben"
      ]
    }
  },
  {
    id: "java-4",
    category: "java",
    difficulty: "mittel",
    taskType: "code-complete",
    taskText: "Erstelle eine Methode, die das Maximum aus einem Integer-Array findet.\n\npublic class ArrayMax {\n    public static int findeMaximum(int[] zahlen) {\n        // Finde und gib den größten Wert im Array zurück\n    }\n}",
    inputFormat: "code",
    tools: ["Java-Editor", "Array-Visualisierer", "Debugger"],
    infoTexts: [
      "Arrays in Java haben eine feste Größe, abrufbar mit array.length",
      "Elemente werden mit array[index] abgerufen (Index startet bei 0)",
      "Eine for-Schleife eignet sich gut zum Durchlaufen eines Arrays",
      "Vergleiche Zahlen mit < (kleiner) und > (größer)"
    ],
    helpButtons: [
      { label: "Array durchlaufen", content: "for (int i = 0; i < zahlen.length; i++) {\n    int aktuelleZahl = zahlen[i];\n    // Verarbeitung\n}" },
      { label: "Maximum-Algorithmus", content: "1. Setze max = erstes Element\n2. Durchlaufe alle Elemente\n3. Wenn Element > max, setze max = Element\n4. Gib max zurück" }
    ],
    gamification: {
      points: 30,
      badge: "Array-Meister",
      timeLimit: 180,
      level: 2
    },
    adaptiveHelp: {
      hintsAfterFailures: 2,
      hints: [
        "Starte mit int max = zahlen[0]; als Anfangswert",
        "Durchlaufe das Array mit einer for-Schleife",
        "In der Schleife: if (zahlen[i] > max) max = zahlen[i];"
      ],
      fallbackSolution: "int max = zahlen[0];\nfor (int i = 1; i < zahlen.length; i++) {\n    if (zahlen[i] > max) {\n        max = zahlen[i];\n    }\n}\nreturn max;"
    },
    expectedSolution: "int max = zahlen[0];\nfor (int i = 1; i < zahlen.length; i++) {\n    if (zahlen[i] > max) {\n        max = zahlen[i];\n    }\n}\nreturn max;",
    feedback: {
      correct: "Exzellent! Du hast einen klassischen Array-Algorithmus korrekt implementiert. Dieser Ansatz funktioniert für beliebig große Arrays.",
      incorrect: "Initialisiere max mit dem ersten Element, durchlaufe dann das Array und aktualisiere max bei größeren Werten.",
      commonMistakes: [
        "max mit 0 initialisieren (funktioniert nicht bei negativen Zahlen)",
        "Schleife bei i=0 statt i=1 starten (unnötiger Vergleich)",
        "< statt > im Vergleich verwenden (findet Minimum statt Maximum)"
      ]
    }
  },
  {
    id: "java-5",
    category: "java",
    difficulty: "mittel",
    taskType: "error-finding",
    taskText: "Der folgende Java-Code enthält einen Fehler. Finde und beschreibe ihn:\n\npublic class StringVergleich {\n    public static void main(String[] args) {\n        String a = \"Hallo\";\n        String b = \"Hallo\";\n        if (a = b) {\n            System.out.println(\"Gleich!\");\n        }\n    }\n}",
    inputFormat: "text",
    tools: ["Java-Compiler", "Fehlermeldungen-Dokumentation"],
    infoTexts: [
      "In Java ist '=' der Zuweisungsoperator",
      "'==' prüft bei primitiven Typen auf Gleichheit",
      "Bei Strings sollte .equals() für Inhaltsvergleich verwendet werden",
      "Ein if-Statement erwartet einen booleschen Ausdruck (true/false)"
    ],
    helpButtons: [
      { label: "Operatoren-Unterschied", content: "= : Zuweisung (a = 5)\n== : Vergleich primitiver Typen\n.equals() : Inhaltsvergleich bei Objekten" },
      { label: "String-Vergleich", content: "Richtig:\nif (a.equals(b)) { ... }\n\nFalsch:\nif (a == b) { ... } // Vergleicht Referenzen!" }
    ],
    gamification: {
      points: 25,
      badge: "Bug-Hunter",
      timeLimit: 90,
      level: 2
    },
    adaptiveHelp: {
      hintsAfterFailures: 1,
      hints: [
        "Schau dir die if-Bedingung genau an",
        "Welcher Operator wird verwendet? Zuweisung oder Vergleich?",
        "Für String-Vergleiche in Java: .equals() verwenden"
      ]
    },
    expectedSolution: ["Der Fehler ist: 'a = b' sollte 'a.equals(b)' sein", "= statt .equals() verwendet", "Zuweisung statt Vergleich in der if-Bedingung"],
    feedback: {
      correct: "Richtig erkannt! In Java ist '=' eine Zuweisung, keine Prüfung. Für String-Vergleiche immer .equals() verwenden!",
      incorrect: "Der Fehler liegt in der if-Bedingung. '=' ist Zuweisung, nicht Vergleich. Für Strings: .equals() verwenden.",
      commonMistakes: [
        "Den Fehler in der println-Zeile suchen",
        "== vorschlagen (funktioniert bei Strings nicht zuverlässig)",
        "Den Zuweisungsoperator übersehen"
      ]
    }
  },
  {
    id: "java-6",
    category: "java",
    difficulty: "schwer",
    taskType: "code-complete",
    taskText: "Implementiere eine rekursive Methode zur Berechnung der Fakultät (n!).\n\npublic class Fakultaet {\n    public static int fakultaet(int n) {\n        // Implementiere die rekursive Fakultätsberechnung\n        // Hinweis: 0! = 1, n! = n * (n-1)!\n    }\n}",
    inputFormat: "code",
    tools: ["Java-Editor", "Call-Stack-Visualisierer", "Debugger"],
    infoTexts: [
      "Rekursion: Eine Methode ruft sich selbst auf",
      "Jede Rekursion braucht einen Basisfall (Abbruchbedingung)",
      "Fakultät: 5! = 5 × 4 × 3 × 2 × 1 = 120",
      "Basisfall: 0! = 1 und 1! = 1"
    ],
    helpButtons: [
      { label: "Rekursions-Schema", content: "public static int rekursiv(int n) {\n    if (basisfall) {\n        return basiswert;\n    }\n    return n * rekursiv(n - 1);\n}" },
      { label: "Fakultät-Beispiel", content: "fakultaet(4):\n= 4 * fakultaet(3)\n= 4 * 3 * fakultaet(2)\n= 4 * 3 * 2 * fakultaet(1)\n= 4 * 3 * 2 * 1 * fakultaet(0)\n= 4 * 3 * 2 * 1 * 1 = 24" }
    ],
    gamification: {
      points: 40,
      badge: "Rekursions-Experte",
      timeLimit: 180,
      level: 3
    },
    adaptiveHelp: {
      hintsAfterFailures: 2,
      hints: [
        "Der Basisfall ist: wenn n <= 1, gib 1 zurück",
        "Der rekursive Fall: gib n * fakultaet(n-1) zurück",
        "Struktur: if (n <= 1) return 1; return n * fakultaet(n-1);"
      ],
      fallbackSolution: "if (n <= 1) {\n    return 1;\n}\nreturn n * fakultaet(n - 1);"
    },
    expectedSolution: "if (n <= 1) {\n    return 1;\n}\nreturn n * fakultaet(n - 1);",
    feedback: {
      correct: "Brillant! Du hast Rekursion verstanden. Der Basisfall verhindert unendliche Rekursion, der rekursive Fall berechnet das Ergebnis.",
      incorrect: "Denke an: Basisfall (n <= 1 gibt 1 zurück) und rekursiver Fall (n * fakultaet(n-1)).",
      commonMistakes: [
        "Keinen Basisfall definieren (führt zu StackOverflow)",
        "n statt n-1 im rekursiven Aufruf (unendliche Rekursion)",
        "Basisfall bei n == 0 vergessen"
      ]
    }
  },
  {
    id: "java-7",
    category: "java",
    difficulty: "schwer",
    taskType: "code-complete",
    taskText: "Implementiere eine Methode, die einen String umkehrt (z.B. \"Hallo\" → \"ollaH\").\n\npublic class StringReverse {\n    public static String umkehren(String text) {\n        // Kehre den String um und gib ihn zurück\n    }\n}",
    inputFormat: "code",
    tools: ["Java-Editor", "String-Dokumentation", "Debugger"],
    infoTexts: [
      "String.length() gibt die Länge eines Strings zurück",
      "String.charAt(index) gibt das Zeichen an Position index zurück",
      "StringBuilder kann effizient Zeichen anhängen mit .append()",
      "Strings sind in Java unveränderlich (immutable)"
    ],
    helpButtons: [
      { label: "StringBuilder nutzen", content: "StringBuilder sb = new StringBuilder();\nsb.append('a');\nsb.append('b');\nString result = sb.toString(); // \"ab\"" },
      { label: "Rückwärts durchlaufen", content: "for (int i = text.length() - 1; i >= 0; i--) {\n    char zeichen = text.charAt(i);\n    // zeichen verarbeiten\n}" }
    ],
    gamification: {
      points: 35,
      badge: "String-Manipulator",
      timeLimit: 150,
      level: 3
    },
    adaptiveHelp: {
      hintsAfterFailures: 2,
      hints: [
        "Erstelle einen StringBuilder für das Ergebnis",
        "Durchlaufe den String von hinten nach vorne",
        "Füge jedes Zeichen zum StringBuilder hinzu und gib das Ergebnis zurück"
      ],
      fallbackSolution: "StringBuilder sb = new StringBuilder();\nfor (int i = text.length() - 1; i >= 0; i--) {\n    sb.append(text.charAt(i));\n}\nreturn sb.toString();"
    },
    expectedSolution: "StringBuilder sb = new StringBuilder();\nfor (int i = text.length() - 1; i >= 0; i--) {\n    sb.append(text.charAt(i));\n}\nreturn sb.toString();",
    feedback: {
      correct: "Perfekt! Du hast StringBuilder effizient genutzt und den String rückwärts aufgebaut. Das ist die performante Lösung in Java.",
      incorrect: "Tipp: Nutze StringBuilder, durchlaufe den String rückwärts mit charAt(), und gib sb.toString() zurück.",
      commonMistakes: [
        "String-Konkatenation mit + in Schleife (ineffizient)",
        "Off-by-one Fehler beim Index",
        "toString() am Ende vergessen"
      ]
    }
  },
  {
    id: "java-8",
    category: "java",
    difficulty: "schwer",
    taskType: "code-complete",
    taskText: "Implementiere den Bubble-Sort Algorithmus zum Sortieren eines Arrays.\n\npublic class BubbleSort {\n    public static void sortiere(int[] arr) {\n        // Implementiere Bubble Sort\n        // Das Array soll aufsteigend sortiert werden\n    }\n}",
    inputFormat: "code",
    tools: ["Java-Editor", "Array-Visualisierer", "Sortier-Animation"],
    infoTexts: [
      "Bubble Sort vergleicht benachbarte Elemente und tauscht sie bei falscher Reihenfolge",
      "Der Algorithmus durchläuft das Array mehrfach, bis es sortiert ist",
      "Große Werte 'blubbern' nach oben (ans Ende des Arrays)",
      "Zeitkomplexität: O(n²) - nicht optimal, aber einfach zu verstehen"
    ],
    helpButtons: [
      { label: "Bubble Sort Prinzip", content: "1. Vergleiche arr[j] mit arr[j+1]\n2. Wenn arr[j] > arr[j+1], tausche sie\n3. Wiederhole für alle Paare\n4. Nach jedem Durchlauf ist das größte Element am Ende\n5. Wiederhole n-1 mal" },
      { label: "Tausch-Operation", content: "// Elemente tauschen:\nint temp = arr[j];\narr[j] = arr[j+1];\narr[j+1] = temp;" }
    ],
    gamification: {
      points: 50,
      badge: "Sortier-Algorithmus-Profi",
      timeLimit: 240,
      level: 3
    },
    adaptiveHelp: {
      hintsAfterFailures: 2,
      hints: [
        "Äußere Schleife: for (int i = 0; i < arr.length - 1; i++)",
        "Innere Schleife: for (int j = 0; j < arr.length - i - 1; j++)",
        "In der inneren Schleife: Vergleiche und tausche arr[j] und arr[j+1]"
      ],
      fallbackSolution: "for (int i = 0; i < arr.length - 1; i++) {\n    for (int j = 0; j < arr.length - i - 1; j++) {\n        if (arr[j] > arr[j + 1]) {\n            int temp = arr[j];\n            arr[j] = arr[j + 1];\n            arr[j + 1] = temp;\n        }\n    }\n}"
    },
    expectedSolution: "for (int i = 0; i < arr.length - 1; i++) {\n    for (int j = 0; j < arr.length - i - 1; j++) {\n        if (arr[j] > arr[j + 1]) {\n            int temp = arr[j];\n            arr[j] = arr[j + 1];\n            arr[j + 1] = temp;\n        }\n    }\n}",
    feedback: {
      correct: "Hervorragend! Du hast Bubble Sort korrekt implementiert. Obwohl O(n²), ist es ein wichtiger Lern-Algorithmus zum Verstehen von Sortierung.",
      incorrect: "Bubble Sort braucht zwei verschachtelte Schleifen. Vergleiche benachbarte Elemente und tausche sie bei falscher Reihenfolge.",
      commonMistakes: [
        "Nur eine Schleife verwenden",
        "Grenzen der inneren Schleife falsch setzen",
        "Tausch-Logik vertauschen"
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
  java: javaInteractiveTasks,
  "mathematik-logik": mathematikInteractiveTasks,
  "it-sicherheit": itSicherheitInteractiveTasks,
  betriebswirtschaft: bwlInteractiveTasks,
  webentwicklung: webentwicklungInteractiveTasks,
  datenbanken: datenbankenInteractiveTasks,
};