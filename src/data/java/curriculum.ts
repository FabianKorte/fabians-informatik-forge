import type { JavaChapter } from "@/types/javaLearning";

export const javaCurriculum: JavaChapter[] = [
  {
    id: "chapter-1",
    title: "Kapitel 1: Erste Schritte",
    description: "Lerne die Grundlagen von Java kennen - von der Installation bis zum ersten Programm",
    order: 1,
    isUnlocked: true,
    lessons: [
      {
        id: "1-1",
        chapterId: "chapter-1",
        title: "Dein erstes Java-Programm",
        order: 1,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Willkommen bei Java! ☕

Java ist eine der beliebtesten Programmiersprachen der Welt. Sie wird für Android-Apps, Web-Anwendungen, Spiele und vieles mehr verwendet.

## Die Struktur eines Java-Programms

Jedes Java-Programm besteht aus mindestens einer **Klasse** mit einer **main-Methode**:

\`\`\`java
public class Main {
    public static void main(String[] args) {
        // Hier steht dein Code
    }
}
\`\`\`

### Wichtige Konzepte:
- **public class Main** - Definiert eine Klasse namens "Main"
- **public static void main** - Die Startmethode, die beim Programmstart ausgeführt wird
- **String[] args** - Ermöglicht Eingaben über die Kommandozeile
- **System.out.println()** - Gibt Text in der Konsole aus

## Deine erste Aufgabe

Schreibe ein Programm, das "Hallo Welt!" ausgibt.`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        // Schreibe hier deinen Code
        // Tipp: Nutze System.out.println("Text");
        
    }
}`,
          expectedOutput: "Hallo Welt!",
          hints: [
            "Nutze System.out.println() um Text auszugeben",
            "Der Text muss in Anführungszeichen stehen",
            "Vergiss das Semikolon am Ende nicht!"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hallo Welt!");
    }
}`
        }
      },
      {
        id: "1-2",
        chapterId: "chapter-1",
        title: "Kommentare in Java",
        order: 2,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Kommentare 📝

Kommentare sind Notizen im Code, die vom Computer ignoriert werden. Sie helfen dir und anderen, den Code zu verstehen.

## Arten von Kommentaren:

### Einzeilige Kommentare
\`\`\`java
// Dies ist ein einzeiliger Kommentar
System.out.println("Hello"); // Kommentar am Ende einer Zeile
\`\`\`

### Mehrzeilige Kommentare
\`\`\`java
/* Dies ist ein
   mehrzeiliger
   Kommentar */
\`\`\`

### Dokumentations-Kommentare (JavaDoc)
\`\`\`java
/**
 * Dies ist ein JavaDoc-Kommentar
 * @param name Der Name der Person
 */
\`\`\`

## Aufgabe

Füge Kommentare zu dem folgenden Code hinzu und gib dann "Kommentare sind nützlich!" aus.`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        // Füge hier einen Kommentar hinzu, der erklärt was das Programm macht
        
        /* Füge hier einen mehrzeiligen
           Kommentar hinzu */
        
        // Gib den Text "Kommentare sind nützlich!" aus
        
    }
}`,
          expectedOutput: "Kommentare sind nützlich!",
          hints: [
            "Kommentare beginnen mit // oder /* */",
            "Vergiss nicht die println-Anweisung für die Ausgabe"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        // Dieses Programm zeigt die Verwendung von Kommentaren
        
        /* Kommentare helfen dabei,
           den Code zu dokumentieren */
        
        System.out.println("Kommentare sind nützlich!");
    }
}`
        }
      },
      {
        id: "1-3",
        chapterId: "chapter-1",
        title: "Variablen: Zahlen speichern",
        order: 3,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Variablen 📦

Variablen sind wie Behälter, die Werte speichern können.

## Datentypen für Zahlen

| Typ | Beschreibung | Beispiel |
|-----|--------------|----------|
| \`int\` | Ganze Zahlen | 42, -7, 0 |
| \`double\` | Kommazahlen | 3.14, -2.5 |
| \`long\` | Große ganze Zahlen | 9999999999L |

## Variablen deklarieren

\`\`\`java
int alter = 25;           // Ganze Zahl
double preis = 19.99;     // Kommazahl
long grosseZahl = 1234567890L;
\`\`\`

## Rechnen mit Variablen

\`\`\`java
int a = 10;
int b = 5;
int summe = a + b;        // 15
int differenz = a - b;    // 5
int produkt = a * b;      // 50
int quotient = a / b;     // 2
\`\`\`

## Aufgabe

Erstelle zwei Integer-Variablen mit den Werten 15 und 7. Berechne deren Summe und gib sie aus.`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        // Erstelle Variable a mit Wert 15
        
        // Erstelle Variable b mit Wert 7
        
        // Berechne die Summe
        
        // Gib die Summe aus (sollte 22 sein)
        
    }
}`,
          expectedOutput: "22",
          hints: [
            "Nutze 'int' für ganze Zahlen",
            "int summe = a + b; berechnet die Summe",
            "System.out.println(summe); gibt die Variable aus"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        int a = 15;
        int b = 7;
        int summe = a + b;
        System.out.println(summe);
    }
}`
        }
      },
      {
        id: "1-4",
        chapterId: "chapter-1",
        title: "Variablen: Text speichern",
        order: 4,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Strings - Texte in Java 📝

Ein **String** ist eine Zeichenkette - also Text.

## String erstellen

\`\`\`java
String name = "Max Mustermann";
String stadt = "Berlin";
String leer = "";  // Leerer String
\`\`\`

## Strings verbinden (Konkatenation)

\`\`\`java
String vorname = "Max";
String nachname = "Mustermann";
String vollname = vorname + " " + nachname;
// Ergebnis: "Max Mustermann"
\`\`\`

## Strings mit Zahlen verbinden

\`\`\`java
int alter = 25;
String text = "Ich bin " + alter + " Jahre alt.";
// Ergebnis: "Ich bin 25 Jahre alt."
\`\`\`

## Aufgabe

Erstelle einen String mit deinem Namen und gib "Hallo, [Name]!" aus.`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        // Erstelle einen String mit dem Namen "Java"
        
        // Gib "Hallo, Java!" aus
        // Tipp: Verbinde Strings mit +
        
    }
}`,
          expectedOutput: "Hallo, Java!",
          hints: [
            "String name = \"Java\";",
            "Verbinde Strings mit dem + Operator",
            "System.out.println(\"Hallo, \" + name + \"!\");"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        String name = "Java";
        System.out.println("Hallo, " + name + "!");
    }
}`
        }
      },
      {
        id: "1-5",
        chapterId: "chapter-1",
        title: "Challenge: Steckbrief",
        order: 5,
        type: "challenge",
        isCompleted: false,
        content: {
          explanation: `# 🏆 Challenge: Erstelle einen Steckbrief

Kombiniere alles, was du bisher gelernt hast!

## Aufgabe

Erstelle ein Programm, das einen Steckbrief ausgibt:
- Name (String)
- Alter (int)
- Größe in Metern (double)

Die Ausgabe soll genau so aussehen:

\`\`\`
=== STECKBRIEF ===
Name: Max
Alter: 25
Größe: 1.75m
\`\`\`

## Tipps
- Nutze mehrere println-Anweisungen
- Verbinde Strings mit Variablen
- Achte auf die genaue Formatierung!`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        // Erstelle die Variablen
        String name = "Max";
        int alter = 25;
        double groesse = 1.75;
        
        // Gib den Steckbrief aus
        // Zeile 1: === STECKBRIEF ===
        
        // Zeile 2: Name: Max
        
        // Zeile 3: Alter: 25
        
        // Zeile 4: Größe: 1.75m
        
    }
}`,
          expectedOutput: `=== STECKBRIEF ===
Name: Max
Alter: 25
Größe: 1.75m`,
          hints: [
            "Nutze System.out.println() für jede Zeile",
            "Verbinde Text und Variablen mit +",
            "groesse + \"m\" fügt das 'm' am Ende hinzu"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        String name = "Max";
        int alter = 25;
        double groesse = 1.75;
        
        System.out.println("=== STECKBRIEF ===");
        System.out.println("Name: " + name);
        System.out.println("Alter: " + alter);
        System.out.println("Größe: " + groesse + "m");
    }
}`
        }
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Kapitel 2: Kontrollstrukturen",
    description: "Lerne, wie du Entscheidungen triffst und Code wiederholst",
    order: 2,
    isUnlocked: false,
    lessons: [
      {
        id: "2-1",
        chapterId: "chapter-2",
        title: "If-Else Bedingungen",
        order: 1,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# If-Else: Entscheidungen treffen 🔀

Mit **if-else** kann dein Programm Entscheidungen treffen.

## Grundstruktur

\`\`\`java
if (bedingung) {
    // Code wenn Bedingung wahr ist
} else {
    // Code wenn Bedingung falsch ist
}
\`\`\`

## Vergleichsoperatoren

| Operator | Bedeutung |
|----------|-----------|
| == | Gleich |
| != | Ungleich |
| > | Größer als |
| < | Kleiner als |
| >= | Größer oder gleich |
| <= | Kleiner oder gleich |

## Beispiel

\`\`\`java
int alter = 18;

if (alter >= 18) {
    System.out.println("Du bist volljährig!");
} else {
    System.out.println("Du bist minderjährig.");
}
\`\`\`

## Aufgabe

Prüfe, ob eine Zahl positiv, negativ oder null ist und gib entsprechend "positiv", "negativ" oder "null" aus.`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        int zahl = 5;
        
        // Prüfe ob die Zahl positiv, negativ oder null ist
        // Gib das entsprechende Wort aus
        
    }
}`,
          expectedOutput: "positiv",
          hints: [
            "Nutze if (zahl > 0) für positive Zahlen",
            "Nutze else if (zahl < 0) für negative Zahlen",
            "Nutze else für den Fall dass zahl == 0"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        int zahl = 5;
        
        if (zahl > 0) {
            System.out.println("positiv");
        } else if (zahl < 0) {
            System.out.println("negativ");
        } else {
            System.out.println("null");
        }
    }
}`
        }
      },
      {
        id: "2-2",
        chapterId: "chapter-2",
        title: "For-Schleifen",
        order: 2,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# For-Schleife: Code wiederholen 🔄

Die **for-Schleife** wiederholt Code eine bestimmte Anzahl von Malen.

## Aufbau

\`\`\`java
for (start; bedingung; schritt) {
    // Code der wiederholt wird
}
\`\`\`

## Beispiel: Zahlen von 1 bis 5

\`\`\`java
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}
// Ausgabe: 1, 2, 3, 4, 5
\`\`\`

### Erklärung:
- \`int i = 1\` - Startwert
- \`i <= 5\` - Bedingung (solange i kleiner/gleich 5)
- \`i++\` - Erhöhe i um 1 nach jedem Durchlauf

## Aufgabe

Gib die Zahlen von 1 bis 10 aus, jede auf einer neuen Zeile.`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        // Erstelle eine for-Schleife von 1 bis 10
        // und gib jede Zahl aus
        
    }
}`,
          expectedOutput: `1
2
3
4
5
6
7
8
9
10`,
          hints: [
            "for (int i = 1; i <= 10; i++)",
            "System.out.println(i) gibt die aktuelle Zahl aus"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            System.out.println(i);
        }
    }
}`
        }
      },
      {
        id: "2-3",
        chapterId: "chapter-2",
        title: "While-Schleifen",
        order: 3,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# While-Schleife 🔁

Die **while-Schleife** wiederholt Code solange eine Bedingung wahr ist.

## Aufbau

\`\`\`java
while (bedingung) {
    // Code der wiederholt wird
}
\`\`\`

## Beispiel: Countdown

\`\`\`java
int countdown = 5;

while (countdown > 0) {
    System.out.println(countdown);
    countdown--;  // countdown = countdown - 1
}
System.out.println("Start!");
\`\`\`

### ⚠️ Achtung: Endlosschleifen!
Vergiss nicht, die Variable zu ändern, sonst läuft die Schleife unendlich!

## Aufgabe

Erstelle einen Countdown von 3 bis 1, dann gib "Los!" aus.`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        int countdown = 3;
        
        // Erstelle eine while-Schleife
        // die von 3 runterzählt
        
        // Gib am Ende "Los!" aus
        
    }
}`,
          expectedOutput: `3
2
1
Los!`,
          hints: [
            "while (countdown > 0)",
            "Vergiss countdown-- nicht!",
            "Das println für 'Los!' kommt nach der Schleife"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        int countdown = 3;
        
        while (countdown > 0) {
            System.out.println(countdown);
            countdown--;
        }
        System.out.println("Los!");
    }
}`
        }
      },
      {
        id: "2-4",
        chapterId: "chapter-2",
        title: "Challenge: FizzBuzz",
        order: 4,
        type: "challenge",
        isCompleted: false,
        content: {
          explanation: `# 🏆 Challenge: FizzBuzz

Das berühmte Programmier-Interview-Problem!

## Regeln

Für Zahlen von 1 bis 15:
- Wenn die Zahl durch 3 teilbar ist → "Fizz"
- Wenn die Zahl durch 5 teilbar ist → "Buzz"
- Wenn die Zahl durch 3 UND 5 teilbar ist → "FizzBuzz"
- Sonst → die Zahl selbst

## Hilfreicher Operator: Modulo (%)

\`\`\`java
int rest = 10 % 3;  // rest = 1 (10 ÷ 3 = 3 Rest 1)
int rest2 = 15 % 5; // rest2 = 0 (15 ÷ 5 = 3 Rest 0)
\`\`\`

Wenn der Rest 0 ist, ist die Zahl teilbar!

\`\`\`java
if (zahl % 3 == 0) {
    // zahl ist durch 3 teilbar
}
\`\`\`

## Tipp
Prüfe zuerst auf Teilbarkeit durch 15 (3 UND 5)!`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 15; i++) {
            // Prüfe: durch 3 UND 5 teilbar?
            
            // Prüfe: nur durch 3 teilbar?
            
            // Prüfe: nur durch 5 teilbar?
            
            // Sonst: gib die Zahl aus
            
        }
    }
}`,
          expectedOutput: `1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz`,
          hints: [
            "if (i % 15 == 0) für durch 15 teilbar (oder i % 3 == 0 && i % 5 == 0)",
            "Die Reihenfolge ist wichtig: erst 15, dann 3, dann 5",
            "Nutze else if für die verschiedenen Fälle"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 15; i++) {
            if (i % 15 == 0) {
                System.out.println("FizzBuzz");
            } else if (i % 3 == 0) {
                System.out.println("Fizz");
            } else if (i % 5 == 0) {
                System.out.println("Buzz");
            } else {
                System.out.println(i);
            }
        }
    }
}`
        }
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Kapitel 3: Arrays & Methoden",
    description: "Arbeite mit Datensammlungen und strukturiere deinen Code",
    order: 3,
    isUnlocked: false,
    lessons: [
      {
        id: "3-1",
        chapterId: "chapter-3",
        title: "Arrays: Listen von Werten",
        order: 1,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Arrays: Mehrere Werte speichern 📚

Ein **Array** ist eine Liste von Werten des gleichen Typs.

## Array erstellen

\`\`\`java
// Variante 1: Mit Werten
int[] zahlen = {10, 20, 30, 40, 50};

// Variante 2: Leeres Array mit Größe
String[] namen = new String[3];
namen[0] = "Anna";
namen[1] = "Ben";
namen[2] = "Clara";
\`\`\`

## Auf Elemente zugreifen

⚠️ Arrays beginnen bei Index 0!

\`\`\`java
int[] zahlen = {10, 20, 30};
System.out.println(zahlen[0]); // 10
System.out.println(zahlen[1]); // 20
System.out.println(zahlen[2]); // 30
\`\`\`

## Durch Array iterieren

\`\`\`java
for (int i = 0; i < zahlen.length; i++) {
    System.out.println(zahlen[i]);
}
\`\`\`

## Aufgabe

Erstelle ein Array mit den Zahlen 5, 10, 15 und gib alle Zahlen aus.`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        // Erstelle ein int-Array mit 5, 10, 15
        
        // Gib alle Elemente mit einer for-Schleife aus
        
    }
}`,
          expectedOutput: `5
10
15`,
          hints: [
            "int[] zahlen = {5, 10, 15};",
            "zahlen.length gibt die Anzahl der Elemente",
            "for (int i = 0; i < zahlen.length; i++)"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        int[] zahlen = {5, 10, 15};
        
        for (int i = 0; i < zahlen.length; i++) {
            System.out.println(zahlen[i]);
        }
    }
}`
        }
      },
      {
        id: "3-2",
        chapterId: "chapter-3",
        title: "Methoden definieren",
        order: 2,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Methoden: Code strukturieren 🔧

**Methoden** sind wiederverwendbare Code-Blöcke.

## Aufbau einer Methode

\`\`\`java
public static rückgabetyp methodenName(parameter) {
    // Code
    return wert; // bei Rückgabe
}
\`\`\`

## Beispiele

### Methode ohne Rückgabe (void)
\`\`\`java
public static void begruesse(String name) {
    System.out.println("Hallo, " + name + "!");
}
\`\`\`

### Methode mit Rückgabe
\`\`\`java
public static int addiere(int a, int b) {
    return a + b;
}
\`\`\`

## Methode aufrufen

\`\`\`java
begruesse("Max");           // Ausgabe: Hallo, Max!
int ergebnis = addiere(5, 3); // ergebnis = 8
\`\`\`

## Aufgabe

Erstelle eine Methode \`quadrat\`, die eine Zahl mit sich selbst multipliziert und das Ergebnis zurückgibt. Rufe sie mit 7 auf.`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        // Rufe die Methode quadrat mit 7 auf
        // und gib das Ergebnis aus
        int ergebnis = quadrat(7);
        System.out.println(ergebnis);
    }
    
    // Definiere hier die Methode quadrat
    // Sie nimmt eine Zahl und gibt deren Quadrat zurück
    
}`,
          expectedOutput: "49",
          hints: [
            "public static int quadrat(int zahl)",
            "return zahl * zahl;",
            "Die Methode muss außerhalb von main definiert werden"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        int ergebnis = quadrat(7);
        System.out.println(ergebnis);
    }
    
    public static int quadrat(int zahl) {
        return zahl * zahl;
    }
}`
        }
      }
    ]
  }
];

export const getTotalLessons = (): number => {
  return javaCurriculum.reduce((total, chapter) => total + chapter.lessons.length, 0);
};

export const getCompletedLessons = (progress: Record<string, boolean>): number => {
  return Object.values(progress).filter(Boolean).length;
};
