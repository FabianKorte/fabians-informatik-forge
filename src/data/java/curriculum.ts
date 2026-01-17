import type { JavaChapter } from "@/types/javaLearning";

export const javaCurriculum: JavaChapter[] = [
  // ============================================
  // KAPITEL 0: EINFÜHRUNG (Nur Theorie, kein Code)
  // ============================================
  {
    id: "chapter-0",
    title: "Kapitel 0: Einführung",
    description: "Bevor du programmierst - verstehe die Grundlagen und lerne die Plattform kennen",
    order: 0,
    isUnlocked: true,
    lessons: [
      {
        id: "0-1",
        chapterId: "chapter-0",
        title: "Was ist Programmieren?",
        order: 1,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Willkommen! 🎉

Schön, dass du hier bist! Du bist dabei, eine der wichtigsten Fähigkeiten des 21. Jahrhunderts zu lernen: **Programmieren**.

## Was ist Programmieren eigentlich?

Stell dir vor, du gibst einem sehr präzisen, aber etwas begriffsstutzigen Helfer Anweisungen. Dieser Helfer (der Computer) macht **exakt** das, was du ihm sagst - nicht mehr und nicht weniger.

**Programmieren** bedeutet:
- 📝 Anweisungen schreiben, die ein Computer verstehen kann
- 🧩 Probleme in kleine, lösbare Schritte aufteilen
- 🔄 Diese Schritte in einer logischen Reihenfolge anordnen

## Ein Beispiel aus dem Alltag

Stell dir vor, du erklärst jemandem, wie man einen Tee macht:

1. Nimm eine Tasse
2. Fülle Wasser in den Wasserkocher
3. Schalte den Wasserkocher ein
4. Warte, bis das Wasser kocht
5. Gieße das Wasser in die Tasse
6. Lege einen Teebeutel hinein
7. Warte 3 Minuten
8. Entferne den Teebeutel

Das ist im Grunde ein **Programm**! Eine Reihe von Anweisungen, die nacheinander ausgeführt werden.

## Warum solltest du Programmieren lernen?

- 💼 **Karriere**: Programmierer sind sehr gefragt
- 🧠 **Denken**: Du lernst, Probleme strukturiert zu lösen
- 🎮 **Kreativität**: Du kannst deine eigenen Apps, Spiele und Websites erstellen
- 🌍 **Zukunft**: Technologie ist überall - verstehe sie!

## Keine Angst!

Programmieren wirkt am Anfang kompliziert, aber jeder kann es lernen. Wir gehen **Schritt für Schritt** vor.

---

**Klicke unten auf "Code ausführen", um zur nächsten Lektion zu gehen!**

*(Keine Sorge - in dieser Lektion musst du noch nichts schreiben)*`,
          codeTemplate: `// Diese Lektion ist nur zum Lesen!
// Du musst hier noch nichts ändern.
// 
// Klicke einfach auf "Code ausführen" um fortzufahren.

public class Main {
    public static void main(String[] args) {
        System.out.println("Lektion abgeschlossen!");
    }
}`,
          expectedOutput: "Lektion abgeschlossen!",
          hints: [
            "Du musst nichts ändern - klicke einfach auf 'Code ausführen'",
            "Diese Lektion ist nur zum Lesen und Verstehen"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Lektion abgeschlossen!");
    }
}`
        }
      },
      {
        id: "0-2",
        chapterId: "chapter-0",
        title: "Was ist Java?",
        order: 2,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Java - Die Programmiersprache ☕

## Warum heißt es Java?

Die Entwickler bei Sun Microsystems tranken gerne Kaffee - besonders Kaffee von der Insel Java in Indonesien. So entstand der Name! ☕

## Wo wird Java verwendet?

Java ist **überall**:

| Bereich | Beispiele |
|---------|-----------|
| 📱 **Android Apps** | WhatsApp, Spotify, Netflix |
| 🌐 **Webseiten** | Amazon, LinkedIn, eBay |
| 🏦 **Banken** | Über 90% der Finanzinstitute |
| 🎮 **Spiele** | Minecraft wurde in Java geschrieben! |
| 🚗 **Autos** | Bordcomputer und Navigationssysteme |

## Warum ist Java so beliebt?

### 1. "Write Once, Run Anywhere" (WORA)
Java-Programme laufen auf jedem Computer - egal ob Windows, Mac oder Linux.

### 2. Leicht zu lernen
Die Syntax (Schreibweise) ist logisch und gut lesbar.

### 3. Riesige Community
Millionen Entwickler helfen sich gegenseitig. Jede Frage wurde schon mal gestellt!

### 4. Jobchancen
Java ist seit über 25 Jahren eine der Top-Programmiersprachen weltweit.

## Java vs. JavaScript

**Achtung, häufiger Irrtum!**

| Java | JavaScript |
|------|------------|
| ☕ Für Apps, Server, Android | 🌐 Für Websites im Browser |
| Kompilierte Sprache | Interpretierte Sprache |
| Von Sun/Oracle | Von Netscape |

Sie haben ähnliche Namen, sind aber **komplett verschiedene Sprachen**!

## Fun Fact

Minecraft, eines der meistverkauften Spiele aller Zeiten, wurde ursprünglich komplett in Java geschrieben!

---

**Klicke auf "Code ausführen", um fortzufahren!**`,
          codeTemplate: `// Java-Fakten!
// Du musst hier nichts ändern.

public class Main {
    public static void main(String[] args) {
        System.out.println("Java wurde 1995 veröffentlicht!");
    }
}`,
          expectedOutput: "Java wurde 1995 veröffentlicht!",
          hints: [
            "Klicke einfach auf 'Code ausführen'",
            "Du musst den Code nicht verändern"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Java wurde 1995 veröffentlicht!");
    }
}`
        }
      },
      {
        id: "0-3",
        chapterId: "chapter-0",
        title: "So nutzt du diese Plattform",
        order: 3,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Die Plattform verstehen 🖥️

Lass uns kurz erklären, wie diese Lernplattform funktioniert.

## Die Bestandteile

### 1. 📖 Der Erklärungsbereich (hier oben)
Hier findest du die Theorie und Aufgabenstellung. **Lies immer zuerst die Erklärung!**

### 2. ✏️ Der Code-Editor
Das dunkle Feld unten, in dem du Code schreiben kannst. Hier tippst du deine Lösungen.

### 3. ▶️ Der "Code ausführen"-Button
Klicke hier, um deinen Code auszuführen und zu prüfen.

### 4. 💡 Die Tipps
Kommst du nicht weiter? Klicke auf "Tipp" für Hilfe. Du kannst mehrere Tipps nacheinander anzeigen.

### 5. 👁️ Die Lösung
Als letzter Ausweg kannst du die Lösung anzeigen. **Versuche aber erst selbst!**

## So löst du Aufgaben

1. **Lies die Erklärung** - Verstehe das Konzept
2. **Lies die Aufgabe** - Was sollst du tun?
3. **Schreibe Code** - Tippe im Editor
4. **Führe aus** - Klicke "Code ausführen"
5. **Prüfe das Ergebnis** - Richtig? Super! Falsch? Noch mal versuchen!

## Tipps für Anfänger

- ⌨️ **Tippe den Code selbst** - Nicht nur kopieren! Durch Tippen lernst du besser
- 🐛 **Fehler sind normal** - Jeder macht Fehler, auch Profis!
- 🔄 **Wiederholen hilft** - Mach Lektionen ruhig mehrmals
- ☕ **Pausen machen** - Programmieren ist anstrengend für das Gehirn

## Tastenkürzel

| Kürzel | Aktion |
|--------|--------|
| Tab | Einrücken |
| Shift + Tab | Ausrücken |

---

**Bereit? Klicke auf "Code ausführen"!**`,
          codeTemplate: `// Du weißt jetzt, wie die Plattform funktioniert!
// Klicke auf "Code ausführen" um fortzufahren.

public class Main {
    public static void main(String[] args) {
        System.out.println("Ich bin bereit zu lernen!");
    }
}`,
          expectedOutput: "Ich bin bereit zu lernen!",
          hints: [
            "Klicke auf den grünen Button 'Code ausführen'",
            "Du musst den Code nicht ändern"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Ich bin bereit zu lernen!");
    }
}`
        }
      },
      {
        id: "0-4",
        chapterId: "chapter-0",
        title: "Beobachte und verstehe",
        order: 4,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Code lesen lernen 👀

Bevor du selbst programmierst, lass uns **fertigen Code lesen und verstehen**.

## Schau dir diesen Code an:

\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hallo!");
        System.out.println("Wie geht es dir?");
        System.out.println("Mir geht es gut!");
    }
}
\`\`\`

## Was siehst du?

### Zeile 1: \`public class Main\`
- Das ist der **Name** unseres Programms
- Jedes Java-Programm braucht mindestens eine Klasse
- Der Name "Main" ist Tradition für das Hauptprogramm

### Zeile 2: \`public static void main(String[] args)\`
- Das ist der **Startpunkt** des Programms
- Wenn du "Ausführen" klickst, startet Java hier
- Merke dir: Das ist die "main-Methode"

### Zeilen 3-5: \`System.out.println("...")\`
- Diese Zeilen geben Text aus
- \`println\` = "print line" = "drucke eine Zeile"
- Der Text zwischen den Anführungszeichen wird angezeigt

### Die geschweiften Klammern \`{ }\`
- Sie gruppieren zusammengehörenden Code
- Wie Absätze in einem Text

### Die Semikolons \`;\`
- Jede Anweisung endet mit \`;\`
- Wie ein Punkt am Satzende

## Was passiert, wenn der Code läuft?

Die Ausgabe wäre:
\`\`\`
Hallo!
Wie geht es dir?
Mir geht es gut!
\`\`\`

Drei Zeilen, weil wir dreimal \`println\` verwendet haben!

---

**Führe den Code unten aus und beobachte die Ausgabe!**`,
          codeTemplate: `// Beobachte, was passiert!
// Jede println-Anweisung gibt eine Zeile aus.

public class Main {
    public static void main(String[] args) {
        System.out.println("Zeile 1");
        System.out.println("Zeile 2");
        System.out.println("Zeile 3");
    }
}`,
          expectedOutput: `Zeile 1
Zeile 2
Zeile 3`,
          hints: [
            "Klicke auf 'Code ausführen' und beobachte",
            "Jedes println erzeugt eine neue Zeile"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Zeile 1");
        System.out.println("Zeile 2");
        System.out.println("Zeile 3");
    }
}`
        }
      }
    ]
  },
  // ============================================
  // KAPITEL 1: ERSTE SCHRITTE
  // ============================================
  {
    id: "chapter-1",
    title: "Kapitel 1: Erste Schritte",
    description: "Lerne die Grundlagen von Java kennen - von der Installation bis zum ersten Programm",
    order: 1,
    isUnlocked: true,
    lessons: [
      {
        id: "1-0",
        chapterId: "chapter-1",
        title: "Abschreiben: Dein erstes Programm",
        order: 0,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Deine erste echte Aufgabe! ✨

Jetzt wird es ernst - aber keine Sorge, wir fangen ganz einfach an.

## Deine Aufgabe

Schreibe **exakt** diesen Text zwischen die Anführungszeichen:

\`\`\`
Hallo Welt!
\`\`\`

## So sieht die Lösung aus:

Du musst nur den Text \`Hallo Welt!\` an die richtige Stelle schreiben:

\`\`\`java
System.out.println("Hallo Welt!");
\`\`\`

## Wichtig:
- ✅ Achte auf die **exakte Schreibweise**
- ✅ Das Ausrufezeichen gehört dazu!
- ✅ Vergiss das Semikolon \`;\` am Ende nicht

---

**Tippe den Text und klicke dann "Code ausführen"!**`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        // Ersetze die Unterstriche durch: Hallo Welt!
        System.out.println("________");
    }
}`,
          expectedOutput: "Hallo Welt!",
          hints: [
            "Ersetze ________ durch Hallo Welt!",
            "Achte auf das Ausrufezeichen!",
            "Die Anführungszeichen müssen bleiben"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hallo Welt!");
    }
}`
        }
      },
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
  },
  {
    id: "chapter-4",
    title: "Kapitel 4: Objektorientierte Programmierung",
    description: "Lerne die Grundlagen von OOP: Klassen, Objekte, Vererbung und Polymorphismus",
    order: 4,
    isUnlocked: false,
    lessons: [
      {
        id: "4-1",
        chapterId: "chapter-4",
        title: "Klassen und Objekte",
        order: 1,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Klassen und Objekte 🏗️

In Java ist alles ein **Objekt**. Objekte werden aus **Klassen** erstellt.

## Was ist eine Klasse?

Eine Klasse ist wie ein Bauplan. Sie definiert:
- **Attribute** (Eigenschaften/Variablen)
- **Methoden** (Verhalten/Funktionen)

\`\`\`java
public class Auto {
    // Attribute
    String marke;
    int baujahr;
    
    // Methode
    public void fahren() {
        System.out.println("Das Auto fährt!");
    }
}
\`\`\`

## Objekte erstellen

\`\`\`java
Auto meinAuto = new Auto();
meinAuto.marke = "BMW";
meinAuto.baujahr = 2020;
meinAuto.fahren();  // Ausgabe: Das Auto fährt!
\`\`\`

## Aufgabe

Erstelle eine Klasse \`Hund\` mit dem Attribut \`name\` und der Methode \`bellen()\`, die "Wuff!" ausgibt.`,
          codeTemplate: `// Definiere die Klasse Hund hier (vor der Main-Klasse)
class Hund {
    // Attribut name
    
    // Methode bellen() die "Wuff!" ausgibt
    
}

public class Main {
    public static void main(String[] args) {
        // Erstelle einen Hund namens "Bello"
        Hund meinHund = new Hund();
        meinHund.name = "Bello";
        
        // Rufe die bellen() Methode auf
        meinHund.bellen();
    }
}`,
          expectedOutput: "Wuff!",
          hints: [
            "String name; für das Attribut",
            "public void bellen() { ... }",
            "System.out.println(\"Wuff!\"); in der Methode"
          ],
          solution: `class Hund {
    String name;
    
    public void bellen() {
        System.out.println("Wuff!");
    }
}

public class Main {
    public static void main(String[] args) {
        Hund meinHund = new Hund();
        meinHund.name = "Bello";
        meinHund.bellen();
    }
}`
        }
      },
      {
        id: "4-2",
        chapterId: "chapter-4",
        title: "Konstruktoren",
        order: 2,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Konstruktoren 🔨

Ein **Konstruktor** ist eine spezielle Methode, die beim Erstellen eines Objekts aufgerufen wird.

## Warum Konstruktoren?

Konstruktoren initialisieren Objekte mit Startwerten.

\`\`\`java
public class Person {
    String name;
    int alter;
    
    // Konstruktor
    public Person(String n, int a) {
        name = n;
        alter = a;
    }
}
\`\`\`

## Objekt mit Konstruktor erstellen

\`\`\`java
Person max = new Person("Max", 25);
System.out.println(max.name);  // Max
System.out.println(max.alter); // 25
\`\`\`

## Das Schlüsselwort "this"

\`\`\`java
public Person(String name, int alter) {
    this.name = name;   // this bezieht sich auf das Objekt
    this.alter = alter;
}
\`\`\`

## Aufgabe

Erstelle eine Klasse \`Buch\` mit Konstruktor für \`titel\` und \`autor\`. Gib "Titel von Autor" aus.`,
          codeTemplate: `class Buch {
    String titel;
    String autor;
    
    // Erstelle einen Konstruktor mit titel und autor
    
    
    public void info() {
        System.out.println(titel + " von " + autor);
    }
}

public class Main {
    public static void main(String[] args) {
        // Erstelle ein Buch "Java Basics" von "Max Müller"
        Buch buch = new Buch("Java Basics", "Max Müller");
        buch.info();
    }
}`,
          expectedOutput: "Java Basics von Max Müller",
          hints: [
            "public Buch(String titel, String autor)",
            "Nutze this.titel = titel;",
            "Der Konstruktor hat den gleichen Namen wie die Klasse"
          ],
          solution: `class Buch {
    String titel;
    String autor;
    
    public Buch(String titel, String autor) {
        this.titel = titel;
        this.autor = autor;
    }
    
    public void info() {
        System.out.println(titel + " von " + autor);
    }
}

public class Main {
    public static void main(String[] args) {
        Buch buch = new Buch("Java Basics", "Max Müller");
        buch.info();
    }
}`
        }
      },
      {
        id: "4-3",
        chapterId: "chapter-4",
        title: "Getter und Setter",
        order: 3,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Getter und Setter (Enkapsulierung) 🔐

**Enkapsulierung** bedeutet, Attribute vor direktem Zugriff zu schützen.

## Private Attribute

\`\`\`java
public class Konto {
    private double kontostand;  // private = geschützt
}
\`\`\`

## Getter - Wert lesen

\`\`\`java
public double getKontostand() {
    return kontostand;
}
\`\`\`

## Setter - Wert setzen

\`\`\`java
public void setKontostand(double betrag) {
    if (betrag >= 0) {
        kontostand = betrag;
    }
}
\`\`\`

## Vorteile

- Kontrolle über Wertzuweisung
- Validierung möglich
- Interne Implementierung änderbar

## Aufgabe

Erstelle eine Klasse \`Spieler\` mit privatem \`punkte\`-Attribut, Getter und Setter. Der Setter soll nur positive Werte akzeptieren.`,
          codeTemplate: `class Spieler {
    // Private Variable punkte
    
    
    // Getter für punkte
    
    
    // Setter für punkte (nur positive Werte erlauben)
    
}

public class Main {
    public static void main(String[] args) {
        Spieler spieler = new Spieler();
        spieler.setPunkte(100);
        System.out.println(spieler.getPunkte());
    }
}`,
          expectedOutput: "100",
          hints: [
            "private int punkte;",
            "public int getPunkte() { return punkte; }",
            "if (wert >= 0) { punkte = wert; }"
          ],
          solution: `class Spieler {
    private int punkte;
    
    public int getPunkte() {
        return punkte;
    }
    
    public void setPunkte(int wert) {
        if (wert >= 0) {
            punkte = wert;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Spieler spieler = new Spieler();
        spieler.setPunkte(100);
        System.out.println(spieler.getPunkte());
    }
}`
        }
      },
      {
        id: "4-4",
        chapterId: "chapter-4",
        title: "Vererbung",
        order: 4,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Vererbung 👨‍👧

**Vererbung** ermöglicht es einer Klasse, Eigenschaften einer anderen Klasse zu übernehmen.

## Basisklasse (Superklasse)

\`\`\`java
public class Tier {
    String name;
    
    public void essen() {
        System.out.println(name + " isst.");
    }
}
\`\`\`

## Abgeleitete Klasse (Subklasse)

\`\`\`java
public class Hund extends Tier {
    public void bellen() {
        System.out.println(name + " bellt!");
    }
}
\`\`\`

## Verwendung

\`\`\`java
Hund hund = new Hund();
hund.name = "Bello";
hund.essen();   // Von Tier geerbt
hund.bellen();  // Eigene Methode
\`\`\`

## Aufgabe

Erstelle eine Klasse \`Fahrzeug\` mit Methode \`starten()\`. Erstelle \`Auto\` das von \`Fahrzeug\` erbt und eine eigene Methode \`hupen()\` hat.`,
          codeTemplate: `class Fahrzeug {
    // Methode starten() die "Fahrzeug startet..." ausgibt
    
}

class Auto extends Fahrzeug {
    // Methode hupen() die "Huuup!" ausgibt
    
}

public class Main {
    public static void main(String[] args) {
        Auto auto = new Auto();
        auto.starten();
        auto.hupen();
    }
}`,
          expectedOutput: `Fahrzeug startet...
Huuup!`,
          hints: [
            "public void starten() { ... }",
            "class Auto extends Fahrzeug",
            "public void hupen() { ... }"
          ],
          solution: `class Fahrzeug {
    public void starten() {
        System.out.println("Fahrzeug startet...");
    }
}

class Auto extends Fahrzeug {
    public void hupen() {
        System.out.println("Huuup!");
    }
}

public class Main {
    public static void main(String[] args) {
        Auto auto = new Auto();
        auto.starten();
        auto.hupen();
    }
}`
        }
      },
      {
        id: "4-5",
        chapterId: "chapter-4",
        title: "Challenge: Mitarbeiterverwaltung",
        order: 5,
        type: "challenge",
        isCompleted: false,
        content: {
          explanation: `# 🏆 Challenge: Mitarbeiterverwaltung

Erstelle ein kleines OOP-System!

## Anforderungen

1. Erstelle eine Klasse \`Mitarbeiter\` mit:
   - Private Attribute: \`name\` (String), \`gehalt\` (double)
   - Konstruktor für beide Attribute
   - Getter für beide Attribute
   - Methode \`info()\` die "Name: [name], Gehalt: [gehalt]€" ausgibt

2. Erstelle ein Mitarbeiter-Objekt und rufe \`info()\` auf.

## Beispielausgabe

\`\`\`
Name: Anna, Gehalt: 3500.0€
\`\`\``,
          codeTemplate: `class Mitarbeiter {
    // Private Attribute
    
    
    // Konstruktor
    
    
    // Getter
    
    
    // info() Methode
    
}

public class Main {
    public static void main(String[] args) {
        // Erstelle Mitarbeiter "Anna" mit Gehalt 3500.0
        
        // Rufe info() auf
        
    }
}`,
          expectedOutput: "Name: Anna, Gehalt: 3500.0€",
          hints: [
            "private String name; private double gehalt;",
            "public Mitarbeiter(String name, double gehalt)",
            "System.out.println(\"Name: \" + name + \", Gehalt: \" + gehalt + \"€\");"
          ],
          solution: `class Mitarbeiter {
    private String name;
    private double gehalt;
    
    public Mitarbeiter(String name, double gehalt) {
        this.name = name;
        this.gehalt = gehalt;
    }
    
    public String getName() {
        return name;
    }
    
    public double getGehalt() {
        return gehalt;
    }
    
    public void info() {
        System.out.println("Name: " + name + ", Gehalt: " + gehalt + "€");
    }
}

public class Main {
    public static void main(String[] args) {
        Mitarbeiter anna = new Mitarbeiter("Anna", 3500.0);
        anna.info();
    }
}`
        }
      }
    ]
  },
  {
    id: "chapter-5",
    title: "Kapitel 5: Exception Handling",
    description: "Lerne, wie du Fehler elegant behandelst",
    order: 5,
    isUnlocked: false,
    lessons: [
      {
        id: "5-1",
        chapterId: "chapter-5",
        title: "Try-Catch Grundlagen",
        order: 1,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Exception Handling: Fehler abfangen 🛡️

Fehler können Programme zum Absturz bringen. Mit **try-catch** fangen wir sie ab.

## Grundstruktur

\`\`\`java
try {
    // Code der einen Fehler verursachen könnte
} catch (ExceptionTyp e) {
    // Was passieren soll wenn der Fehler auftritt
}
\`\`\`

## Beispiel: Division durch Null

\`\`\`java
try {
    int ergebnis = 10 / 0;  // Fehler!
} catch (ArithmeticException e) {
    System.out.println("Fehler: Division durch Null!");
}
\`\`\`

## Häufige Exception-Typen

| Exception | Ursache |
|-----------|---------|
| ArithmeticException | Division durch 0 |
| NullPointerException | Zugriff auf null |
| ArrayIndexOutOfBoundsException | Ungültiger Array-Index |
| NumberFormatException | Ungültige Zahlenkonvertierung |

## Aufgabe

Schreibe Code, der versucht durch 0 zu teilen und den Fehler abfängt. Gib "Division durch Null nicht möglich!" aus.`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 0;
        
        // Versuche a / b und fange den Fehler ab
        
    }
}`,
          expectedOutput: "Division durch Null nicht möglich!",
          hints: [
            "try { int ergebnis = a / b; }",
            "catch (ArithmeticException e) { ... }",
            "System.out.println(\"Division durch Null nicht möglich!\");"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 0;
        
        try {
            int ergebnis = a / b;
            System.out.println(ergebnis);
        } catch (ArithmeticException e) {
            System.out.println("Division durch Null nicht möglich!");
        }
    }
}`
        }
      },
      {
        id: "5-2",
        chapterId: "chapter-5",
        title: "Finally Block",
        order: 2,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Der Finally Block 🔚

Der **finally**-Block wird IMMER ausgeführt, egal ob ein Fehler auftritt oder nicht.

## Struktur

\`\`\`java
try {
    // Riskanter Code
} catch (Exception e) {
    // Fehlerbehandlung
} finally {
    // Wird immer ausgeführt
}
\`\`\`

## Wofür?

- Ressourcen freigeben (Dateien schließen, etc.)
- Aufräumarbeiten durchführen
- Logging/Protokollierung

## Beispiel

\`\`\`java
try {
    System.out.println("Versuche...");
    int x = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Fehler aufgetreten!");
} finally {
    System.out.println("Aufräumen...");
}
\`\`\`

## Aufgabe

Erstelle einen try-catch-finally Block. Versuche eine Division, fange den Fehler ab und gib im finally "Fertig!" aus.`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        // try-catch-finally mit Division durch 0
        // catch soll "Fehler!" ausgeben
        // finally soll "Fertig!" ausgeben
        
    }
}`,
          expectedOutput: `Fehler!
Fertig!`,
          hints: [
            "try { int x = 5 / 0; }",
            "catch (ArithmeticException e) { System.out.println(\"Fehler!\"); }",
            "finally { System.out.println(\"Fertig!\"); }"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        try {
            int x = 5 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Fehler!");
        } finally {
            System.out.println("Fertig!");
        }
    }
}`
        }
      },
      {
        id: "5-3",
        chapterId: "chapter-5",
        title: "Mehrere Catch-Blöcke",
        order: 3,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Mehrere Catch-Blöcke 🎯

Du kannst verschiedene Fehlertypen unterschiedlich behandeln.

## Syntax

\`\`\`java
try {
    // Code
} catch (ArithmeticException e) {
    // Mathe-Fehler
} catch (NullPointerException e) {
    // Null-Fehler
} catch (Exception e) {
    // Alle anderen Fehler
}
\`\`\`

## Wichtig!

Spezifischere Exceptions müssen **vor** allgemeineren stehen!

\`\`\`java
// RICHTIG:
catch (ArithmeticException e) { }
catch (Exception e) { }

// FALSCH:
catch (Exception e) { }  // Fängt alles ab
catch (ArithmeticException e) { }  // Wird nie erreicht!
\`\`\`

## Aufgabe

Fange einen ArrayIndexOutOfBoundsException ab und gib "Ungültiger Index!" aus.`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] zahlen = {1, 2, 3};
        
        // Versuche auf zahlen[10] zuzugreifen
        // und fange den Fehler ab
        
    }
}`,
          expectedOutput: "Ungültiger Index!",
          hints: [
            "try { int x = zahlen[10]; }",
            "catch (ArrayIndexOutOfBoundsException e)",
            "System.out.println(\"Ungültiger Index!\");"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        int[] zahlen = {1, 2, 3};
        
        try {
            int x = zahlen[10];
            System.out.println(x);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Ungültiger Index!");
        }
    }
}`
        }
      }
    ]
  },
  {
    id: "chapter-6",
    title: "Kapitel 6: Collections",
    description: "ArrayList, HashMap und andere nützliche Datenstrukturen",
    order: 6,
    isUnlocked: false,
    lessons: [
      {
        id: "6-1",
        chapterId: "chapter-6",
        title: "ArrayList Grundlagen",
        order: 1,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# ArrayList: Dynamische Listen 📋

Arrays haben eine feste Größe. **ArrayList** wächst automatisch!

## Import

\`\`\`java
import java.util.ArrayList;
\`\`\`

## ArrayList erstellen

\`\`\`java
ArrayList<String> namen = new ArrayList<>();
\`\`\`

## Wichtige Methoden

| Methode | Beschreibung |
|---------|--------------|
| add(element) | Element hinzufügen |
| get(index) | Element abrufen |
| remove(index) | Element entfernen |
| size() | Anzahl Elemente |
| clear() | Alle löschen |

## Beispiel

\`\`\`java
ArrayList<String> tiere = new ArrayList<>();
tiere.add("Hund");
tiere.add("Katze");
System.out.println(tiere.get(0));  // Hund
System.out.println(tiere.size());  // 2
\`\`\`

## Aufgabe

Erstelle eine ArrayList mit den Zahlen 10, 20, 30 und gib alle aus.`,
          codeTemplate: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        // Erstelle eine ArrayList<Integer>
        
        // Füge 10, 20, 30 hinzu
        
        // Gib alle Elemente mit einer for-Schleife aus
        
    }
}`,
          expectedOutput: `10
20
30`,
          hints: [
            "ArrayList<Integer> zahlen = new ArrayList<>();",
            "zahlen.add(10);",
            "for (int i = 0; i < zahlen.size(); i++)"
          ],
          solution: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> zahlen = new ArrayList<>();
        zahlen.add(10);
        zahlen.add(20);
        zahlen.add(30);
        
        for (int i = 0; i < zahlen.size(); i++) {
            System.out.println(zahlen.get(i));
        }
    }
}`
        }
      },
      {
        id: "6-2",
        chapterId: "chapter-6",
        title: "For-Each Schleife",
        order: 2,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# For-Each Schleife 🔄

Eine elegantere Art, durch Collections zu iterieren.

## Syntax

\`\`\`java
for (Typ element : collection) {
    // element verwenden
}
\`\`\`

## Beispiel

\`\`\`java
ArrayList<String> farben = new ArrayList<>();
farben.add("Rot");
farben.add("Grün");
farben.add("Blau");

for (String farbe : farben) {
    System.out.println(farbe);
}
\`\`\`

## Vergleich

\`\`\`java
// Klassische for-Schleife
for (int i = 0; i < farben.size(); i++) {
    System.out.println(farben.get(i));
}

// For-Each (einfacher!)
for (String farbe : farben) {
    System.out.println(farbe);
}
\`\`\`

## Aufgabe

Erstelle eine ArrayList mit "A", "B", "C" und gib sie mit for-each aus.`,
          codeTemplate: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> buchstaben = new ArrayList<>();
        buchstaben.add("A");
        buchstaben.add("B");
        buchstaben.add("C");
        
        // Gib alle Buchstaben mit for-each aus
        
    }
}`,
          expectedOutput: `A
B
C`,
          hints: [
            "for (String buchstabe : buchstaben)",
            "System.out.println(buchstabe);",
            "Kein Index nötig bei for-each!"
          ],
          solution: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> buchstaben = new ArrayList<>();
        buchstaben.add("A");
        buchstaben.add("B");
        buchstaben.add("C");
        
        for (String buchstabe : buchstaben) {
            System.out.println(buchstabe);
        }
    }
}`
        }
      },
      {
        id: "6-3",
        chapterId: "chapter-6",
        title: "HashMap: Schlüssel-Wert-Paare",
        order: 3,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# HashMap: Wörterbuch-Struktur 📖

Eine **HashMap** speichert Daten als Schlüssel-Wert-Paare.

## Import

\`\`\`java
import java.util.HashMap;
\`\`\`

## HashMap erstellen

\`\`\`java
HashMap<String, Integer> alter = new HashMap<>();
\`\`\`

## Wichtige Methoden

| Methode | Beschreibung |
|---------|--------------|
| put(key, value) | Eintrag hinzufügen |
| get(key) | Wert abrufen |
| containsKey(key) | Schlüssel prüfen |
| remove(key) | Eintrag entfernen |
| size() | Anzahl Einträge |

## Beispiel

\`\`\`java
HashMap<String, Integer> noten = new HashMap<>();
noten.put("Mathe", 2);
noten.put("Deutsch", 1);
System.out.println(noten.get("Mathe"));  // 2
\`\`\`

## Aufgabe

Erstelle eine HashMap für Hauptstädte und gib die Hauptstadt von Deutschland aus.`,
          codeTemplate: `import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        // Erstelle HashMap<String, String> für Land -> Hauptstadt
        
        // Füge hinzu: Deutschland -> Berlin, Frankreich -> Paris
        
        // Gib die Hauptstadt von Deutschland aus
        
    }
}`,
          expectedOutput: "Berlin",
          hints: [
            "HashMap<String, String> hauptstaedte = new HashMap<>();",
            "hauptstaedte.put(\"Deutschland\", \"Berlin\");",
            "System.out.println(hauptstaedte.get(\"Deutschland\"));"
          ],
          solution: `import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, String> hauptstaedte = new HashMap<>();
        hauptstaedte.put("Deutschland", "Berlin");
        hauptstaedte.put("Frankreich", "Paris");
        
        System.out.println(hauptstaedte.get("Deutschland"));
    }
}`
        }
      },
      {
        id: "6-4",
        chapterId: "chapter-6",
        title: "Challenge: Kontaktliste",
        order: 4,
        type: "challenge",
        isCompleted: false,
        content: {
          explanation: `# 🏆 Challenge: Kontaktliste

Erstelle eine einfache Kontaktliste mit HashMap!

## Anforderungen

1. Erstelle eine HashMap für Name → Telefonnummer
2. Füge 3 Kontakte hinzu:
   - "Max" → "0171-1234567"
   - "Anna" → "0172-9876543"
   - "Tom" → "0173-5555555"
3. Gib die Anzahl der Kontakte aus
4. Gib die Nummer von "Anna" aus

## Erwartete Ausgabe

\`\`\`
Kontakte: 3
Anna: 0172-9876543
\`\`\``,
          codeTemplate: `import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        // Erstelle die Kontakt-HashMap
        
        // Füge die 3 Kontakte hinzu
        
        // Gib "Kontakte: [anzahl]" aus
        
        // Gib "Anna: [nummer]" aus
        
    }
}`,
          expectedOutput: `Kontakte: 3
Anna: 0172-9876543`,
          hints: [
            "HashMap<String, String> kontakte = new HashMap<>();",
            "kontakte.size() gibt die Anzahl zurück",
            "kontakte.get(\"Anna\") gibt Annas Nummer zurück"
          ],
          solution: `import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, String> kontakte = new HashMap<>();
        kontakte.put("Max", "0171-1234567");
        kontakte.put("Anna", "0172-9876543");
        kontakte.put("Tom", "0173-5555555");
        
        System.out.println("Kontakte: " + kontakte.size());
        System.out.println("Anna: " + kontakte.get("Anna"));
    }
}`
        }
      }
    ]
  },
  {
    id: "chapter-7",
    title: "Kapitel 7: String-Methoden",
    description: "Fortgeschrittene Textverarbeitung in Java",
    order: 7,
    isUnlocked: false,
    lessons: [
      {
        id: "7-1",
        chapterId: "chapter-7",
        title: "String-Manipulation",
        order: 1,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# String-Methoden 🔤

Strings haben viele nützliche Methoden zur Textverarbeitung.

## Wichtige Methoden

| Methode | Beschreibung | Beispiel |
|---------|--------------|----------|
| length() | Länge | "Hallo".length() → 5 |
| toUpperCase() | Großbuchstaben | "hi".toUpperCase() → "HI" |
| toLowerCase() | Kleinbuchstaben | "HI".toLowerCase() → "hi" |
| trim() | Leerzeichen entfernen | " hi ".trim() → "hi" |
| substring(start, end) | Teilstring | "Hallo".substring(0,3) → "Hal" |
| replace(alt, neu) | Ersetzen | "Hallo".replace("l","x") → "Haxxo" |
| contains(text) | Enthält? | "Hallo".contains("all") → true |
| startsWith(text) | Beginnt mit? | "Hallo".startsWith("Ha") → true |

## Beispiel

\`\`\`java
String text = "  Java ist super!  ";
System.out.println(text.trim());           // "Java ist super!"
System.out.println(text.toUpperCase());    // "  JAVA IST SUPER!  "
System.out.println(text.length());         // 20
\`\`\`

## Aufgabe

Nimm den String "java programmierung" und gib ihn in Großbuchstaben aus.`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        String text = "java programmierung";
        
        // Gib den Text in Großbuchstaben aus
        
    }
}`,
          expectedOutput: "JAVA PROGRAMMIERUNG",
          hints: [
            "text.toUpperCase()",
            "System.out.println(text.toUpperCase());",
            "toUpperCase() ändert den Original-String nicht!"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        String text = "java programmierung";
        System.out.println(text.toUpperCase());
    }
}`
        }
      },
      {
        id: "7-2",
        chapterId: "chapter-7",
        title: "Split und Join",
        order: 2,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Split und Join 🔪

## String aufteilen: split()

Teilt einen String in ein Array.

\`\`\`java
String satz = "Ich lerne Java";
String[] woerter = satz.split(" ");
// woerter = ["Ich", "lerne", "Java"]
\`\`\`

## Strings verbinden: String.join()

Verbindet Array-Elemente mit einem Trennzeichen.

\`\`\`java
String[] woerter = {"Rot", "Grün", "Blau"};
String ergebnis = String.join("-", woerter);
// ergebnis = "Rot-Grün-Blau"
\`\`\`

## Praktisches Beispiel

\`\`\`java
String csv = "Max,25,Berlin";
String[] teile = csv.split(",");
System.out.println("Name: " + teile[0]);   // Max
System.out.println("Alter: " + teile[1]);  // 25
\`\`\`

## Aufgabe

Teile "Apfel,Birne,Orange" bei Kommas und gib jede Frucht auf einer neuen Zeile aus.`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        String fruechte = "Apfel,Birne,Orange";
        
        // Teile den String bei Kommas
        
        // Gib jede Frucht aus
        
    }
}`,
          expectedOutput: `Apfel
Birne
Orange`,
          hints: [
            "String[] teile = fruechte.split(\",\");",
            "for (String frucht : teile)",
            "System.out.println(frucht);"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        String fruechte = "Apfel,Birne,Orange";
        String[] teile = fruechte.split(",");
        
        for (String frucht : teile) {
            System.out.println(frucht);
        }
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
