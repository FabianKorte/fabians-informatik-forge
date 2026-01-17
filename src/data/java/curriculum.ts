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
      },
      {
        id: "0-5",
        chapterId: "chapter-0",
        title: "Das Semikolon - Der Punkt im Code",
        order: 5,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Das Semikolon \`;\` - Der wichtigste Punkt! 🔴

## Warum Semikolons?

In der deutschen Sprache beenden wir Saetze mit einem **Punkt**.
In Java beenden wir Anweisungen mit einem **Semikolon** \`;\`

## Die Regel

> **Jede Anweisung in Java endet mit einem Semikolon!**

## Beispiele

\`\`\`java
System.out.println("Hallo");    // ✅ Richtig
System.out.println("Hallo")     // ❌ Fehler! Semikolon fehlt

int zahl = 5;                   // ✅ Richtig
int zahl = 5                    // ❌ Fehler!
\`\`\`

## Was ist eine Anweisung?

Eine **Anweisung** ist ein Befehl an den Computer:
- Text ausgeben: \`System.out.println("...");\`
- Variable erstellen: \`int x = 10;\`
- Rechnen: \`int summe = 5 + 3;\`

## Was braucht KEIN Semikolon?

- \`class Main {\` - Klassendefinition
- \`if (bedingung) {\` - Bedingungen
- \`for (...) {\` - Schleifen
- \`// Kommentare\` - Kommentare

## Typischer Anfaengerfehler

\`\`\`java
System.out.println("Hallo")
System.out.println("Welt");
\`\`\`

Java sagt: **"';' expected"** = "Semikolon erwartet!"

---

**Merke dir: Anweisung = Semikolon am Ende!**`,
          codeTemplate: `// Achte auf die Semikolons!

public class Main {
    public static void main(String[] args) {
        System.out.println("Semikolon verstanden!");
    }
}`,
          expectedOutput: "Semikolon verstanden!",
          hints: [
            "Jede println-Anweisung braucht ein Semikolon",
            "Klicke auf 'Code ausfuehren'"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Semikolon verstanden!");
    }
}`
        }
      },
      {
        id: "0-6",
        chapterId: "chapter-0",
        title: "Geschweifte Klammern { }",
        order: 6,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Geschweifte Klammern \`{ }\` - Die Gruppierung 📦

## Was machen geschweifte Klammern?

Geschweifte Klammern **gruppieren Code**, der zusammengehoert.

Denke an einen Karton: Alles was zusammengehoert, kommt in den gleichen Karton.

## In Java

\`\`\`java
public class Main {           // Klammer AUF fuer die Klasse
    
    public static void main(String[] args) {  // Klammer AUF fuer main
        
        System.out.println("Hallo");
        
    }  // Klammer ZU fuer main
    
}  // Klammer ZU fuer die Klasse
\`\`\`

## Die Regeln

1. **Jede \`{\` braucht eine \`}\`** - Sie kommen immer als Paar!
2. **Verschachtelung** - Klammern koennen ineinander sein
3. **Einrueckung** - Code innerhalb von Klammern wird eingerueckt (Tab-Taste)

## Visualisierung

\`\`\`
public class Main {
    ╔══════════════════════════════════════╗
    ║  public static void main(...) {      ║
    ║      ╔════════════════════════════╗  ║
    ║      ║  System.out.println(...);  ║  ║
    ║      ╚════════════════════════════╝  ║
    ║  }                                   ║
    ╚══════════════════════════════════════╝
}
\`\`\`

## Typische Fehler

| Fehler | Meldung |
|--------|---------|
| \`{\` vergessen | "'{' expected" |
| \`}\` vergessen | "'}' expected" oder "reached end of file" |
| Falsche Reihenfolge | Verschiedene Fehler |

## Tipp

Wenn du \`{\` tippst, tippe sofort \`}\` und schreibe dann dazwischen!

---

**Klammern = Organisation des Codes!**`,
          codeTemplate: `// Beachte die Klammerstruktur!

public class Main {
    public static void main(String[] args) {
        System.out.println("Klammern verstanden!");
    }
}`,
          expectedOutput: "Klammern verstanden!",
          hints: [
            "Zaehle die oeffnenden und schliessenden Klammern",
            "Hier: 2x { und 2x }"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Klammern verstanden!");
    }
}`
        }
      },
      {
        id: "0-7",
        chapterId: "chapter-0",
        title: "Runde Klammern ( )",
        order: 7,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Runde Klammern \`( )\` - Fuer Methoden und Bedingungen 🎯

## Wofuer runde Klammern?

Runde Klammern haben in Java mehrere Aufgaben:

### 1. Bei Methoden (Funktionen)

\`\`\`java
System.out.println("Hallo");
//              ↑         ↑
//              (  Text   )
\`\`\`

Die Klammern enthalten, **was** die Methode bearbeiten soll.

### 2. Bei der main-Methode

\`\`\`java
public static void main(String[] args)
//                    ↑            ↑
//                    ( Parameter  )
\`\`\`

### 3. Bei Berechnungen (Prioritaet)

\`\`\`java
int ergebnis = (5 + 3) * 2;  // = 16
int anders = 5 + 3 * 2;      // = 11
\`\`\`

Klammern werden **zuerst** berechnet!

## Die Regeln

1. **Jede \`(\` braucht eine \`)\`**
2. Nach Methodennamen kommt **immer** \`(\`
3. Auch leere Klammern sind erlaubt: \`()\`

## Beispiele

\`\`\`java
System.out.println("Hallo");     // Text in Klammern
Math.max(5, 10);                 // Zwei Werte in Klammern
String name = "Max".toUpperCase(); // Leere Klammern
\`\`\`

## Typische Fehler

\`\`\`java
System.out.println"Hallo";   // ❌ Klammer vergessen
System.out.println("Hallo";  // ❌ Schliessende Klammer fehlt
\`\`\`

---

**Runde Klammern = Was soll verarbeitet werden?**`,
          codeTemplate: `// Runde Klammern bei println

public class Main {
    public static void main(String[] args) {
        System.out.println("Runde Klammern verstanden!");
    }
}`,
          expectedOutput: "Runde Klammern verstanden!",
          hints: [
            "println braucht runde Klammern",
            "Der Text steht IN den Klammern"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Runde Klammern verstanden!");
    }
}`
        }
      },
      {
        id: "0-8",
        chapterId: "chapter-0",
        title: "Anfuehrungszeichen \" \"",
        order: 8,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Anfuehrungszeichen \`" "\` - Text markieren ✏️

## Warum Anfuehrungszeichen?

Java muss unterscheiden zwischen:
- **Code** (Befehle fuer den Computer)
- **Text** (Daten, die angezeigt werden)

Anfuehrungszeichen sagen: **"Das hier ist Text, kein Code!"**

## Beispiel

\`\`\`java
System.out.println("Hallo Welt");
//                 ↑         ↑
//                 "  Text   "
\`\`\`

Ohne Anfuehrungszeichen wuerde Java denken, "Hallo" ist eine Variable!

## Die Regeln

1. **Text (Strings) immer in \`" "\`**
2. **Doppelte** Anfuehrungszeichen (nicht einfache!)
3. Anfuehrungszeichen kommen als **Paar**

## Richtig vs. Falsch

\`\`\`java
System.out.println("Hallo");   // ✅ Richtig
System.out.println('Hallo');   // ❌ Einfache = nur einzelne Zeichen
System.out.println(Hallo);     // ❌ Java sucht Variable "Hallo"
System.out.println("Hallo);    // ❌ Schliessendes " fehlt
\`\`\`

## Text mit Sonderzeichen

Was wenn du ein \`"\` im Text brauchst?

\`\`\`java
System.out.println("Er sagte: \\"Hallo\\"");
// Ausgabe: Er sagte: "Hallo"
\`\`\`

Der Backslash \`\\\` sagt: Das naechste Zeichen ist speziell!

## Haeufige Escape-Sequenzen

| Code | Bedeutung |
|------|-----------|
| \`\\"\` | Anfuehrungszeichen |
| \`\\n\` | Neue Zeile |
| \`\\\\\` | Backslash |
| \`\\t\` | Tab (Einrueckung) |

---

**Anfuehrungszeichen = Das ist Text!**`,
          codeTemplate: `// Text braucht Anfuehrungszeichen

public class Main {
    public static void main(String[] args) {
        System.out.println("Anfuehrungszeichen verstanden!");
    }
}`,
          expectedOutput: "Anfuehrungszeichen verstanden!",
          hints: [
            "Text immer in doppelten Anfuehrungszeichen",
            "Achte auf das Paar: oeffnend und schliessend"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Anfuehrungszeichen verstanden!");
    }
}`
        }
      },
      {
        id: "0-9",
        chapterId: "chapter-0",
        title: "Die Java-Grundstruktur",
        order: 9,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Die Java-Grundstruktur - Alles zusammen! 🏗️

## Jedes Java-Programm hat diese Struktur:

\`\`\`java
public class Main {                         // 1. Klasse
    public static void main(String[] args) {  // 2. main-Methode
        // 3. Dein Code hier
    }
}
\`\`\`

## Teil fuer Teil erklaert:

### 1. \`public class Main { }\`

- **class** = Wir erstellen eine Klasse (Container fuer Code)
- **Main** = Der Name (muss mit Grossbuchstabe beginnen)
- **{ }** = Hier kommt der Inhalt der Klasse

### 2. \`public static void main(String[] args) { }\`

- **main** = Der Startpunkt des Programms
- **String[] args** = Moegliche Eingaben (spaeter mehr)
- **{ }** = Hier kommt dein eigentlicher Code

### 3. Dein Code

\`\`\`java
System.out.println("Hallo!");
int zahl = 42;
// etc.
\`\`\`

## Visualisierung

\`\`\`
┌─────────────────────────────────────────┐
│  public class Main {                    │  ← Klasse (der Container)
│    ┌─────────────────────────────────┐  │
│    │  public static void main(...) { │  │  ← main-Methode (Startpunkt)
│    │    ┌─────────────────────────┐  │  │
│    │    │  System.out.println();  │  │  │  ← Dein Code
│    │    │  int x = 5;             │  │  │
│    │    └─────────────────────────┘  │  │
│    │  }                              │  │
│    └─────────────────────────────────┘  │
│  }                                      │
└─────────────────────────────────────────┘
\`\`\`

## Merksatz

> Klasse → main-Methode → Dein Code
> 
> Jede Ebene hat ihre eigenen **{ }**

## Checkliste fuer jedes Programm

- [ ] \`public class Main {\` am Anfang
- [ ] \`public static void main(String[] args) {\`
- [ ] Dein Code mit Semikolons
- [ ] Zwei schliessende \`}\` am Ende

---

**Diese Struktur wirst du in JEDEM Java-Programm sehen!**`,
          codeTemplate: `// Die komplette Grundstruktur

public class Main {
    public static void main(String[] args) {
        System.out.println("Ich verstehe die Struktur!");
    }
}`,
          expectedOutput: "Ich verstehe die Struktur!",
          hints: [
            "Diese Struktur ist immer gleich",
            "Merke: class -> main -> Code"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Ich verstehe die Struktur!");
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
        id: "1-0a",
        chapterId: "chapter-1",
        title: "Ändere den Text",
        order: 0.1,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Text ändern ✏️

Super, du hast "Hallo Welt!" ausgegeben! Jetzt ändern wir den Text.

## Deine Aufgabe

Ändere den Text so, dass stattdessen ausgegeben wird:

\`\`\`
Ich lerne Java!
\`\`\`

## Erinnerung

Der Text steht **zwischen den Anführungszeichen**:

\`\`\`java
System.out.println("HIER STEHT DER TEXT");
\`\`\`

---

**Ändere den Text und klicke "Code ausführen"!**`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        // Ändere "Hallo Welt!" zu "Ich lerne Java!"
        System.out.println("Hallo Welt!");
    }
}`,
          expectedOutput: "Ich lerne Java!",
          hints: [
            "Ersetze 'Hallo Welt!' durch 'Ich lerne Java!'",
            "Achte auf die exakte Schreibweise",
            "Das Ausrufezeichen gehört dazu!"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Ich lerne Java!");
    }
}`
        }
      },
      {
        id: "1-0b",
        chapterId: "chapter-1",
        title: "Zwei Zeilen ausgeben",
        order: 0.2,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Mehrere Zeilen ausgeben 📝

Bisher hast du eine Zeile ausgegeben. Jetzt geben wir **zwei Zeilen** aus!

## So geht's

Für jede Zeile brauchst du ein eigenes \`println\`:

\`\`\`java
System.out.println("Erste Zeile");
System.out.println("Zweite Zeile");
\`\`\`

## Deine Aufgabe

Gib diese zwei Zeilen aus:

\`\`\`
Java ist cool
Programmieren macht Spass
\`\`\`

## Wichtig
- Jedes \`println\` erzeugt eine neue Zeile
- Vergiss das Semikolon \`;\` am Ende nicht!

---

**Schreibe zwei println-Anweisungen!**`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        // Zeile 1: "Java ist cool"
        
        // Zeile 2: "Programmieren macht Spass"
        
    }
}`,
          expectedOutput: `Java ist cool
Programmieren macht Spass`,
          hints: [
            "Du brauchst zwei System.out.println() Anweisungen",
            "Erste Zeile: System.out.println(\"Java ist cool\");",
            "Zweite Zeile: System.out.println(\"Programmieren macht Spass\");"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Java ist cool");
        System.out.println("Programmieren macht Spass");
    }
}`
        }
      },
      {
        id: "1-0c",
        chapterId: "chapter-1",
        title: "Dein eigener Text",
        order: 0.3,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Kreativ werden! 🎨

Jetzt darfst du kreativ sein! Schreibe deinen **eigenen** Text.

## Deine Aufgabe

Gib genau diesen Satz aus:

\`\`\`
Mein Name ist ein Java-Programmierer
\`\`\`

## Warum diese Aufgabe?

Du übst:
- Die richtige Syntax (Schreibweise)
- Wo der Text hingehört
- Das Semikolon nicht zu vergessen

## Tipp

Kopiere den Text nicht - **tippe ihn selbst**! So lernst du besser.

---

**Schreibe den Satz und führe den Code aus!**`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        // Gib aus: Mein Name ist ein Java-Programmierer
        
    }
}`,
          expectedOutput: "Mein Name ist ein Java-Programmierer",
          hints: [
            "System.out.println(\"Mein Name ist ein Java-Programmierer\");",
            "Achte auf Groß- und Kleinschreibung",
            "Vergiss das Semikolon am Ende nicht!"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Mein Name ist ein Java-Programmierer");
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
        
        // Zeile 4: Groesse: 1.75m
        
    }
}`,
          expectedOutput: `=== STECKBRIEF ===
Name: Max
Alter: 25
Groesse: 1.75m`,
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
        System.out.println("Groesse: " + groesse + "m");
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
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        Hund meinHund = new Hund();
        meinHund.name = "Bello";
        meinHund.bellen();
    }
}

class Hund {
    String name;
    
    // Ergaenze hier die Methode bellen()
    // die "Wuff!" ausgibt
    
}`,
          expectedOutput: "Wuff!",
          hints: [
            "public void bellen() { ... }",
            "System.out.println(\"Wuff!\"); in der Methode",
            "Wichtig für diese Plattform: Die Datei heißt Main.java, daher muss die erste Klasse 'public class Main' sein"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        Hund meinHund = new Hund();
        meinHund.name = "Bello";
        meinHund.bellen();
    }
}

class Hund {
    String name;
    
    public void bellen() {
        System.out.println("Wuff!");
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
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        // Erstelle ein Buch "Java Basics" von "Max Mueller"
        Buch buch = new Buch("Java Basics", "Max Mueller");
        buch.info();
    }
}

class Buch {
    String titel;
    String autor;
    
    // Erstelle einen Konstruktor mit titel und autor
    
    
    public void info() {
        System.out.println(titel + " von " + autor);
    }
}`,
          expectedOutput: "Java Basics von Max Mueller",
          hints: [
            "public Buch(String titel, String autor)",
            "Nutze this.titel = titel;",
            "Der Konstruktor hat den gleichen Namen wie die Klasse"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        Buch buch = new Buch("Java Basics", "Max Mueller");
        buch.info();
    }
}

class Buch {
    String titel;
    String autor;
    
    public Buch(String titel, String autor) {
        this.titel = titel;
        this.autor = autor;
    }
    
    public void info() {
        System.out.println(titel + " von " + autor);
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
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        Spieler spieler = new Spieler();
        spieler.setPunkte(100);
        System.out.println(spieler.getPunkte());
    }
}

class Spieler {
    // Private Variable punkte
    
    
    // Getter für punkte
    
    
    // Setter für punkte (nur positive Werte erlauben)
    
}`,
          expectedOutput: "100",
          hints: [
            "private int punkte;",
            "public int getPunkte() { return punkte; }",
            "if (wert >= 0) { punkte = wert; }"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        Spieler spieler = new Spieler();
        spieler.setPunkte(100);
        System.out.println(spieler.getPunkte());
    }
}

class Spieler {
    private int punkte;
    
    public int getPunkte() {
        return punkte;
    }
    
    public void setPunkte(int wert) {
        if (wert >= 0) {
            punkte = wert;
        }
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
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        Auto auto = new Auto();
        auto.starten();
        auto.hupen();
    }
}

class Fahrzeug {
    // Methode starten() die "Fahrzeug startet..." ausgibt
    
}

class Auto extends Fahrzeug {
    // Methode hupen() die "Huuup!" ausgibt
    
}`,
          expectedOutput: `Fahrzeug startet...
Huuup!`,
          hints: [
            "public void starten() { ... }",
            "class Auto extends Fahrzeug",
            "public void hupen() { ... }"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        Auto auto = new Auto();
        auto.starten();
        auto.hupen();
    }
}

class Fahrzeug {
    public void starten() {
        System.out.println("Fahrzeug startet...");
    }
}

class Auto extends Fahrzeug {
    public void hupen() {
        System.out.println("Huuup!");
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
   - Methode \`info()\` die "Name: [name], Gehalt: [gehalt] Euro" ausgibt

2. Erstelle ein Mitarbeiter-Objekt und rufe \`info()\` auf.

## Beispielausgabe

\`\`\`
Name: Anna, Gehalt: 3500.0 Euro
\`\`\``,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        // Erstelle Mitarbeiter "Anna" mit Gehalt 3500.0
        Mitarbeiter anna = new Mitarbeiter("Anna", 3500.0);
        
        // Rufe info() auf
        anna.info();
    }
}

class Mitarbeiter {
    // Private Attribute
    
    
    // Konstruktor
    
    
    // Getter
    
    
    // info() Methode
    
}`,
          expectedOutput: "Name: Anna, Gehalt: 3500.0 Euro",
          hints: [
            "private String name; private double gehalt;",
            "public Mitarbeiter(String name, double gehalt)",
            "System.out.println(\"Name: \" + name + \", Gehalt: \" + gehalt + \" Euro\");"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        Mitarbeiter anna = new Mitarbeiter("Anna", 3500.0);
        anna.info();
    }
}

class Mitarbeiter {
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
        System.out.println("Name: " + name + ", Gehalt: " + gehalt + " Euro");
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
          expectedOutput: "Division durch Null nicht moeglich!",
          hints: [
            "try { int ergebnis = a / b; }",
            "catch (ArithmeticException e) { ... }",
            "System.out.println(\"Division durch Null nicht moeglich!\");"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 0;
        
        try {
            int ergebnis = a / b;
            System.out.println(ergebnis);
        } catch (ArithmeticException e) {
            System.out.println("Division durch Null nicht moeglich!");
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

Fange einen ArrayIndexOutOfBoundsException ab und gib "Ungueltiger Index!" aus.`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] zahlen = {1, 2, 3};
        
        // Versuche auf zahlen[10] zuzugreifen
        // und fange den Fehler ab
        
    }
}`,
          expectedOutput: "Ungueltiger Index!",
          hints: [
            "try { int x = zahlen[10]; }",
            "catch (ArrayIndexOutOfBoundsException e)",
            "System.out.println(\"Ungueltiger Index!\");"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        int[] zahlen = {1, 2, 3};
        
        try {
            int x = zahlen[10];
            System.out.println(x);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Ungueltiger Index!");
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
  },
  // ============================================
  // KAPITEL 8: METHODEN
  // ============================================
  {
    id: "chapter-8",
    title: "Kapitel 8: Methoden",
    description: "Lerne eigene Methoden zu schreiben - Code wiederverwenden und strukturieren",
    order: 8,
    isUnlocked: false,
    lessons: [
      {
        id: "8-1",
        chapterId: "chapter-8",
        title: "Was sind Methoden?",
        order: 1,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Methoden verstehen 📦

## Was ist eine Methode?

Eine **Methode** ist ein Codeblock, der eine bestimmte Aufgabe erledigt und wiederverwendet werden kann.

Stell dir vor, du musst 10 Mal "Hallo" sagen. Statt es 10 Mal zu tippen, schreibst du eine Methode!

## Vorteile von Methoden

- 🔄 **Wiederverwendbar**: Einmal schreiben, oft benutzen
- 📖 **Lesbar**: Code wird übersichtlicher
- 🐛 **Wartbar**: Fehler nur an einer Stelle beheben
- 🧩 **Modular**: Große Probleme in kleine Teile zerlegen

## Aufbau einer Methode

\`\`\`java
public static void sagHallo() {
    System.out.println("Hallo!");
}
\`\`\`

- \`public static\` - Zugriffsmodifizierer (später mehr)
- \`void\` - Gibt nichts zurück
- \`sagHallo\` - Name der Methode
- \`()\` - Parameter (hier leer)
- \`{ }\` - Der Code der Methode

## Methode aufrufen

\`\`\`java
sagHallo();  // Ausgabe: Hallo!
sagHallo();  // Ausgabe: Hallo!
\`\`\`

---

**Beobachte den Code unten und führe ihn aus!**`,
          codeTemplate: `public class Main {
    // Hier definieren wir eine Methode
    public static void begruesse() {
        System.out.println("Willkommen zum Methodenkurs!");
    }
    
    public static void main(String[] args) {
        // Hier rufen wir die Methode auf
        begruesse();
    }
}`,
          expectedOutput: "Willkommen zum Methodenkurs!",
          hints: [
            "Klicke auf 'Code ausführen'",
            "Die Methode wird in main() aufgerufen"
          ],
          solution: `public class Main {
    public static void begruesse() {
        System.out.println("Willkommen zum Methodenkurs!");
    }
    
    public static void main(String[] args) {
        begruesse();
    }
}`
        }
      },
      {
        id: "8-2",
        chapterId: "chapter-8",
        title: "Eigene Methode erstellen",
        order: 2,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Deine erste eigene Methode ✨

## Aufgabe

Erstelle eine Methode namens \`druckeInfo\`, die diesen Text ausgibt:

\`\`\`
Ich lerne Methoden!
\`\`\`

## Schritt für Schritt

1. Schreibe die Methode **vor** der main-Methode
2. Rufe sie in main() auf

## Vorlage

\`\`\`java
public static void druckeInfo() {
    // Dein Code hier
}
\`\`\`

---

**Erstelle die Methode und rufe sie auf!**`,
          codeTemplate: `public class Main {
    // Erstelle hier die Methode druckeInfo()
    
    
    public static void main(String[] args) {
        // Rufe die Methode hier auf
        
    }
}`,
          expectedOutput: "Ich lerne Methoden!",
          hints: [
            "public static void druckeInfo() { ... }",
            "In der Methode: System.out.println(\"Ich lerne Methoden!\");",
            "In main: druckeInfo();"
          ],
          solution: `public class Main {
    public static void druckeInfo() {
        System.out.println("Ich lerne Methoden!");
    }
    
    public static void main(String[] args) {
        druckeInfo();
    }
}`
        }
      },
      {
        id: "8-3",
        chapterId: "chapter-8",
        title: "Methoden mit Parametern",
        order: 3,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Parameter übergeben 📨

## Was sind Parameter?

Parameter sind Werte, die wir an eine Methode übergeben können.

\`\`\`java
public static void begruesse(String name) {
    System.out.println("Hallo, " + name + "!");
}

// Aufruf:
begruesse("Max");    // Hallo, Max!
begruesse("Anna");   // Hallo, Anna!
\`\`\`

## Mehrere Parameter

\`\`\`java
public static void addiere(int a, int b) {
    System.out.println(a + b);
}

addiere(5, 3);  // 8
\`\`\`

## Aufgabe

Erstelle eine Methode \`begruesse(String name)\`, die folgende Ausgabe erzeugt:

\`\`\`
Hallo, Java!
\`\`\`

---

**Erstelle die Methode mit Parameter!**`,
          codeTemplate: `public class Main {
    // Methode mit Parameter erstellen
    
    
    public static void main(String[] args) {
        begruesse("Java");
    }
}`,
          expectedOutput: "Hallo, Java!",
          hints: [
            "public static void begruesse(String name)",
            "System.out.println(\"Hallo, \" + name + \"!\");",
            "Der Parameter 'name' enthält den übergebenen Wert"
          ],
          solution: `public class Main {
    public static void begruesse(String name) {
        System.out.println("Hallo, " + name + "!");
    }
    
    public static void main(String[] args) {
        begruesse("Java");
    }
}`
        }
      },
      {
        id: "8-4",
        chapterId: "chapter-8",
        title: "Rückgabewerte",
        order: 4,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Rückgabewerte mit return 🔙

## Methoden können Werte zurückgeben

Bisher hatten unsere Methoden \`void\` - sie geben nichts zurück. Aber Methoden können auch Ergebnisse liefern!

\`\`\`java
public static int verdopple(int zahl) {
    return zahl * 2;
}

int ergebnis = verdopple(5);  // ergebnis = 10
\`\`\`

## Wichtig

- Statt \`void\` steht der **Rückgabetyp** (int, String, boolean, etc.)
- \`return\` gibt den Wert zurück und beendet die Methode

## Beispiele

\`\`\`java
public static String macheGross(String text) {
    return text.toUpperCase();
}

public static boolean istGerade(int zahl) {
    return zahl % 2 == 0;
}
\`\`\`

## Aufgabe

Erstelle eine Methode \`addiere(int a, int b)\`, die die Summe zurückgibt.

---

**Erwartete Ausgabe: 15**`,
          codeTemplate: `public class Main {
    // Methode erstellen, die zwei Zahlen addiert und das Ergebnis zurückgibt
    
    
    public static void main(String[] args) {
        int summe = addiere(10, 5);
        System.out.println(summe);
    }
}`,
          expectedOutput: "15",
          hints: [
            "public static int addiere(int a, int b)",
            "return a + b;",
            "Die Methode muss 'int' statt 'void' haben"
          ],
          solution: `public class Main {
    public static int addiere(int a, int b) {
        return a + b;
    }
    
    public static void main(String[] args) {
        int summe = addiere(10, 5);
        System.out.println(summe);
    }
}`
        }
      },
      {
        id: "8-5",
        chapterId: "chapter-8",
        title: "Methoden kombinieren",
        order: 5,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Methoden rufen Methoden auf 🔗

## Methoden können andere Methoden aufrufen

\`\`\`java
public static int quadrat(int x) {
    return x * x;
}

public static int summeVonQuadraten(int a, int b) {
    return quadrat(a) + quadrat(b);
}
\`\`\`

## Aufgabe

Erstelle zwei Methoden:

1. \`verdopple(int zahl)\` - gibt \`zahl * 2\` zurück
2. \`vervierfache(int zahl)\` - ruft \`verdopple\` zweimal auf

Die Ausgabe soll 40 sein (10 * 4).

---

**Nutze Methoden innerhalb von Methoden!**`,
          codeTemplate: `public class Main {
    // verdopple: gibt zahl * 2 zurück
    
    
    // vervierfache: ruft verdopple zweimal auf
    
    
    public static void main(String[] args) {
        int ergebnis = vervierfache(10);
        System.out.println(ergebnis);
    }
}`,
          expectedOutput: "40",
          hints: [
            "public static int verdopple(int zahl) { return zahl * 2; }",
            "vervierfache ruft verdopple mit dem Ergebnis von verdopple auf",
            "return verdopple(verdopple(zahl));"
          ],
          solution: `public class Main {
    public static int verdopple(int zahl) {
        return zahl * 2;
    }
    
    public static int vervierfache(int zahl) {
        return verdopple(verdopple(zahl));
    }
    
    public static void main(String[] args) {
        int ergebnis = vervierfache(10);
        System.out.println(ergebnis);
    }
}`
        }
      }
    ]
  },
  // ============================================
  // KAPITEL 9: REKURSION
  // ============================================
  {
    id: "chapter-9",
    title: "Kapitel 9: Rekursion",
    description: "Methoden, die sich selbst aufrufen - ein mächtiges Konzept meistern",
    order: 9,
    isUnlocked: false,
    lessons: [
      {
        id: "9-1",
        chapterId: "chapter-9",
        title: "Was ist Rekursion?",
        order: 1,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Rekursion verstehen 🔄

## Definition

**Rekursion** bedeutet, dass eine Methode sich selbst aufruft.

## Ein Beispiel aus dem Alltag

Stell dir russische Matroschka-Puppen vor 🪆:
- Du öffnest eine Puppe
- Darin ist eine kleinere Puppe
- Du öffnest sie wieder...
- Bis du die kleinste Puppe erreichst

## In Code

\`\`\`java
public static void zaehleRunter(int zahl) {
    if (zahl <= 0) {
        System.out.println("Fertig!");
        return;  // Abbruchbedingung!
    }
    
    System.out.println(zahl);
    zaehleRunter(zahl - 1);  // Ruft sich selbst auf
}

zaehleRunter(3);
// Ausgabe: 3, 2, 1, Fertig!
\`\`\`

## Die zwei Regeln der Rekursion

1. ⚠️ **Abbruchbedingung**: Wann soll aufgehört werden?
2. 🔄 **Verkleinerung**: Das Problem muss kleiner werden!

Ohne Abbruchbedingung → Endlosschleife → Programmabsturz!

---

**Beobachte den rekursiven Countdown!**`,
          codeTemplate: `public class Main {
    public static void countdown(int n) {
        if (n <= 0) {
            System.out.println("Start!");
            return;
        }
        System.out.println(n);
        countdown(n - 1);
    }
    
    public static void main(String[] args) {
        countdown(5);
    }
}`,
          expectedOutput: `5
4
3
2
1
Start!`,
          hints: [
            "Beobachte, wie die Methode sich selbst aufruft",
            "Bei n <= 0 stoppt die Rekursion"
          ],
          solution: `public class Main {
    public static void countdown(int n) {
        if (n <= 0) {
            System.out.println("Start!");
            return;
        }
        System.out.println(n);
        countdown(n - 1);
    }
    
    public static void main(String[] args) {
        countdown(5);
    }
}`
        }
      },
      {
        id: "9-2",
        chapterId: "chapter-9",
        title: "Fakultät berechnen",
        order: 2,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Fakultät mit Rekursion 🧮

## Was ist Fakultät?

Die Fakultät von n (geschrieben n!) ist das Produkt aller Zahlen von 1 bis n.

\`\`\`
5! = 5 × 4 × 3 × 2 × 1 = 120
3! = 3 × 2 × 1 = 6
1! = 1
0! = 1 (per Definition)
\`\`\`

## Rekursive Definition

\`\`\`
n! = n × (n-1)!
\`\`\`

Also: 5! = 5 × 4!

## In Code

\`\`\`java
public static int fakultaet(int n) {
    if (n <= 1) return 1;      // Abbruchbedingung
    return n * fakultaet(n - 1); // Rekursiver Aufruf
}
\`\`\`

## Aufgabe

Vervollständige die Fakultät-Methode, sodass \`fakultaet(5)\` den Wert \`120\` ausgibt.

---

**Berechne 5! rekursiv!**`,
          codeTemplate: `public class Main {
    public static int fakultaet(int n) {
        // Abbruchbedingung: wenn n <= 1, gib 1 zurück
        
        // Rekursiver Aufruf: n * fakultaet(n - 1)
        
    }
    
    public static void main(String[] args) {
        System.out.println(fakultaet(5));
    }
}`,
          expectedOutput: "120",
          hints: [
            "if (n <= 1) return 1;",
            "return n * fakultaet(n - 1);",
            "5! = 5 * 4 * 3 * 2 * 1 = 120"
          ],
          solution: `public class Main {
    public static int fakultaet(int n) {
        if (n <= 1) return 1;
        return n * fakultaet(n - 1);
    }
    
    public static void main(String[] args) {
        System.out.println(fakultaet(5));
    }
}`
        }
      },
      {
        id: "9-3",
        chapterId: "chapter-9",
        title: "Summe berechnen",
        order: 3,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Summe von 1 bis n ➕

## Aufgabe

Berechne die Summe aller Zahlen von 1 bis n rekursiv.

\`\`\`
summe(5) = 5 + 4 + 3 + 2 + 1 = 15
summe(3) = 3 + 2 + 1 = 6
summe(1) = 1
\`\`\`

## Rekursive Logik

\`\`\`
summe(n) = n + summe(n - 1)
summe(1) = 1  // Abbruchbedingung
\`\`\`

## Aufgabe

Schreibe eine Methode \`summe(int n)\`, die die Summe von 1 bis n berechnet.

---

**Erwartete Ausgabe: 55 (Summe von 1-10)**`,
          codeTemplate: `public class Main {
    public static int summe(int n) {
        // Abbruchbedingung
        
        // Rekursiver Aufruf
        
    }
    
    public static void main(String[] args) {
        System.out.println(summe(10));
    }
}`,
          expectedOutput: "55",
          hints: [
            "Abbruchbedingung: if (n <= 1) return 1;",
            "Rekursiv: return n + summe(n - 1);",
            "1+2+3+4+5+6+7+8+9+10 = 55"
          ],
          solution: `public class Main {
    public static int summe(int n) {
        if (n <= 1) return 1;
        return n + summe(n - 1);
    }
    
    public static void main(String[] args) {
        System.out.println(summe(10));
    }
}`
        }
      },
      {
        id: "9-4",
        chapterId: "chapter-9",
        title: "Fibonacci-Zahlen",
        order: 4,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Fibonacci-Folge 🐚

## Was ist Fibonacci?

In der Fibonacci-Folge ist jede Zahl die Summe der zwei vorherigen:

\`\`\`
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
\`\`\`

## Formel

\`\`\`
fib(0) = 0
fib(1) = 1
fib(n) = fib(n-1) + fib(n-2)
\`\`\`

## Beispiele

\`\`\`
fib(5) = fib(4) + fib(3) = 3 + 2 = 5
fib(6) = fib(5) + fib(4) = 5 + 3 = 8
\`\`\`

## Aufgabe

Schreibe die Methode \`fib(int n)\` rekursiv.

---

**Erwartete Ausgabe: 13 (fib(7))**`,
          codeTemplate: `public class Main {
    public static int fib(int n) {
        // Abbruchbedingungen für n = 0 und n = 1
        
        // Rekursiver Aufruf
        
    }
    
    public static void main(String[] args) {
        System.out.println(fib(7));
    }
}`,
          expectedOutput: "13",
          hints: [
            "if (n <= 0) return 0;",
            "if (n == 1) return 1;",
            "return fib(n - 1) + fib(n - 2);"
          ],
          solution: `public class Main {
    public static int fib(int n) {
        if (n <= 0) return 0;
        if (n == 1) return 1;
        return fib(n - 1) + fib(n - 2);
    }
    
    public static void main(String[] args) {
        System.out.println(fib(7));
    }
}`
        }
      }
    ]
  },
  // ============================================
  // KAPITEL 10: ALGORITHMEN
  // ============================================
  {
    id: "chapter-10",
    title: "Kapitel 10: Algorithmen",
    description: "Klassische Algorithmen verstehen und implementieren",
    order: 10,
    isUnlocked: false,
    lessons: [
      {
        id: "10-1",
        chapterId: "chapter-10",
        title: "Was sind Algorithmen?",
        order: 1,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Algorithmen verstehen 🧠

## Definition

Ein **Algorithmus** ist eine präzise Schritt-für-Schritt-Anleitung zur Lösung eines Problems.

## Eigenschaften guter Algorithmen

- ✅ **Eindeutig**: Jeder Schritt ist klar definiert
- ✅ **Endlich**: Der Algorithmus endet irgendwann
- ✅ **Effektiv**: Jeder Schritt ist ausführbar
- ✅ **Eingabe/Ausgabe**: Nimmt Daten auf, gibt Ergebnis aus

## Beispiele aus dem Alltag

| Problem | Algorithmus |
|---------|-------------|
| Größte Zahl finden | Alle durchgehen, größte merken |
| Namen sortieren | Alphabetisch ordnen |
| Weg finden | Kürzesten Weg berechnen |

## Klassische Algorithmen

1. **Suchen**: Finde ein Element in einer Liste
2. **Sortieren**: Ordne Elemente nach Kriterium
3. **Maximum/Minimum**: Finde größten/kleinsten Wert

---

**Lass uns den Maximum-Algorithmus anschauen!**`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] zahlen = {3, 7, 2, 9, 1, 5};
        
        // Maximum finden
        int max = zahlen[0];
        for (int zahl : zahlen) {
            if (zahl > max) {
                max = zahl;
            }
        }
        
        System.out.println("Maximum: " + max);
    }
}`,
          expectedOutput: "Maximum: 9",
          hints: [
            "Der Algorithmus geht alle Zahlen durch",
            "Er merkt sich immer die größte bisher gefundene"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        int[] zahlen = {3, 7, 2, 9, 1, 5};
        
        int max = zahlen[0];
        for (int zahl : zahlen) {
            if (zahl > max) {
                max = zahl;
            }
        }
        
        System.out.println("Maximum: " + max);
    }
}`
        }
      },
      {
        id: "10-2",
        chapterId: "chapter-10",
        title: "Minimum finden",
        order: 2,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Minimum-Algorithmus 📉

## Aufgabe

Finde die **kleinste Zahl** im Array!

## Strategie

1. Nimm das erste Element als "vorläufiges Minimum"
2. Gehe alle anderen Elemente durch
3. Wenn ein Element kleiner ist → neues Minimum
4. Am Ende hast du das echte Minimum

## Tipp

Fast wie Maximum, aber mit \`<\` statt \`>\`!

---

**Finde das Minimum: 1**`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] zahlen = {5, 3, 8, 1, 9, 2};
        
        // Minimum finden
        int min = zahlen[0];
        
        // Gehe alle Zahlen durch und finde das Minimum
        
        
        System.out.println("Minimum: " + min);
    }
}`,
          expectedOutput: "Minimum: 1",
          hints: [
            "for (int zahl : zahlen)",
            "if (zahl < min) { min = zahl; }",
            "Vergleiche mit < statt >"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        int[] zahlen = {5, 3, 8, 1, 9, 2};
        
        int min = zahlen[0];
        for (int zahl : zahlen) {
            if (zahl < min) {
                min = zahl;
            }
        }
        
        System.out.println("Minimum: " + min);
    }
}`
        }
      },
      {
        id: "10-3",
        chapterId: "chapter-10",
        title: "Summe berechnen",
        order: 3,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Summen-Algorithmus ➕

## Aufgabe

Berechne die **Summe** aller Zahlen im Array!

## Strategie

1. Starte mit Summe = 0
2. Addiere jede Zahl zur Summe
3. Gib die Summe aus

## Beispiel

\`\`\`java
int[] zahlen = {1, 2, 3, 4, 5};
// 1 + 2 + 3 + 4 + 5 = 15
\`\`\`

---

**Berechne die Summe: 30**`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] zahlen = {4, 7, 3, 8, 6, 2};
        
        // Summe berechnen
        int summe = 0;
        
        // Addiere alle Zahlen zur Summe
        
        
        System.out.println("Summe: " + summe);
    }
}`,
          expectedOutput: "Summe: 30",
          hints: [
            "for (int zahl : zahlen)",
            "summe = summe + zahl; oder summe += zahl;",
            "4 + 7 + 3 + 8 + 6 + 2 = 30"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        int[] zahlen = {4, 7, 3, 8, 6, 2};
        
        int summe = 0;
        for (int zahl : zahlen) {
            summe += zahl;
        }
        
        System.out.println("Summe: " + summe);
    }
}`
        }
      },
      {
        id: "10-4",
        chapterId: "chapter-10",
        title: "Durchschnitt berechnen",
        order: 4,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Durchschnitts-Algorithmus 📊

## Aufgabe

Berechne den **Durchschnitt** aller Zahlen!

## Formel

\`\`\`
Durchschnitt = Summe aller Zahlen / Anzahl der Zahlen
\`\`\`

## Tipp

- Erst die Summe berechnen
- Dann durch \`zahlen.length\` teilen
- Nutze \`double\` für genaues Ergebnis!

---

**Erwartete Ausgabe: 5.0**`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] zahlen = {2, 4, 6, 8, 10};
        
        // 1. Summe berechnen
        int summe = 0;
        
        
        // 2. Durchschnitt berechnen (Summe / Anzahl)
        double durchschnitt = 0;
        
        
        System.out.println("Durchschnitt: " + durchschnitt);
    }
}`,
          expectedOutput: "Durchschnitt: 5.0",
          hints: [
            "Erst Summe mit Schleife berechnen",
            "durchschnitt = (double) summe / zahlen.length;",
            "(2+4+6+8+10) / 5 = 30 / 5 = 5.0"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        int[] zahlen = {2, 4, 6, 8, 10};
        
        int summe = 0;
        for (int zahl : zahlen) {
            summe += zahl;
        }
        
        double durchschnitt = (double) summe / zahlen.length;
        
        System.out.println("Durchschnitt: " + durchschnitt);
    }
}`
        }
      },
      {
        id: "10-5",
        chapterId: "chapter-10",
        title: "Lineare Suche",
        order: 5,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Lineare Suche 🔍

## Was ist lineare Suche?

Der einfachste Suchalgorithmus: Gehe alle Elemente der Reihe nach durch, bis du das gesuchte findest.

## Algorithmus

\`\`\`java
public static int suche(int[] arr, int gesucht) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == gesucht) {
            return i;  // Gefunden! Gib Position zurück
        }
    }
    return -1;  // Nicht gefunden
}
\`\`\`

## Aufgabe

Finde die Zahl 7 im Array und gib ihre Position aus!

---

**Erwartete Ausgabe: Position: 3**`,
          codeTemplate: `public class Main {
    public static int lineareSuche(int[] arr, int gesucht) {
        // Gehe alle Elemente durch
        // Wenn gefunden, gib die Position zurück
        // Wenn nicht gefunden, gib -1 zurück
        
    }
    
    public static void main(String[] args) {
        int[] zahlen = {2, 5, 1, 7, 3, 9};
        int position = lineareSuche(zahlen, 7);
        System.out.println("Position: " + position);
    }
}`,
          expectedOutput: "Position: 3",
          hints: [
            "for (int i = 0; i < arr.length; i++)",
            "if (arr[i] == gesucht) return i;",
            "Am Ende: return -1;"
          ],
          solution: `public class Main {
    public static int lineareSuche(int[] arr, int gesucht) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == gesucht) {
                return i;
            }
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] zahlen = {2, 5, 1, 7, 3, 9};
        int position = lineareSuche(zahlen, 7);
        System.out.println("Position: " + position);
    }
}`
        }
      },
      {
        id: "10-6",
        chapterId: "chapter-10",
        title: "Bubble Sort",
        order: 6,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Bubble Sort 🫧

## Der bekannteste Sortieralgorithmus

**Bubble Sort** vergleicht benachbarte Elemente und tauscht sie, wenn sie in falscher Reihenfolge sind.

## Wie funktioniert es?

\`\`\`
Runde 1: [5, 3, 8, 1] → [3, 5, 1, 8]
Runde 2: [3, 5, 1, 8] → [3, 1, 5, 8]
Runde 3: [3, 1, 5, 8] → [1, 3, 5, 8] ✓
\`\`\`

## Algorithmus

\`\`\`java
for (int i = 0; i < arr.length - 1; i++) {
    for (int j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
            // Tauschen
            int temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}
\`\`\`

## Aufgabe

Sortiere das Array [5, 2, 8, 1, 9] aufsteigend!

---

**Erwartete Ausgabe: 1 2 5 8 9**`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] zahlen = {5, 2, 8, 1, 9};
        
        // Bubble Sort implementieren
        
        
        
        // Ausgabe
        for (int zahl : zahlen) {
            System.out.print(zahl + " ");
        }
    }
}`,
          expectedOutput: "1 2 5 8 9 ",
          hints: [
            "Zwei verschachtelte for-Schleifen",
            "Vergleiche arr[j] > arr[j+1]",
            "Tausche mit einer temp-Variable"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        int[] zahlen = {5, 2, 8, 1, 9};
        
        for (int i = 0; i < zahlen.length - 1; i++) {
            for (int j = 0; j < zahlen.length - 1 - i; j++) {
                if (zahlen[j] > zahlen[j + 1]) {
                    int temp = zahlen[j];
                    zahlen[j] = zahlen[j + 1];
                    zahlen[j + 1] = temp;
                }
            }
        }
        
        for (int zahl : zahlen) {
            System.out.print(zahl + " ");
        }
    }
}`
        }
      }
    ]
  },
  // ============================================
  // KAPITEL 11: DATEI-EIN/AUSGABE (Theorie)
  // ============================================
  {
    id: "chapter-11",
    title: "Kapitel 11: Dateien (Theorie)",
    description: "Verstehe wie Java mit Dateien arbeitet - Lesen, Schreiben, Verarbeiten",
    order: 11,
    isUnlocked: false,
    lessons: [
      {
        id: "11-1",
        chapterId: "chapter-11",
        title: "Was ist File I/O?",
        order: 1,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Dateien in Java 📁

## Warum Dateien?

Bisher sind unsere Daten nach Programmende verschwunden. Mit **Dateien** können wir Daten **dauerhaft speichern**!

## Was ist File I/O?

- **I/O** = Input/Output (Eingabe/Ausgabe)
- **File I/O** = Daten von/zu Dateien lesen/schreiben

## Typische Anwendungen

| Anwendung | Beispiel |
|-----------|----------|
| 💾 Speicherstände | Spielfortschritt speichern |
| ⚙️ Konfiguration | Einstellungen laden |
| 📊 Datenverarbeitung | CSV-Dateien analysieren |
| 📝 Protokolle | Log-Dateien schreiben |

## Java Klassen für Dateien

\`\`\`java
import java.io.File;           // Datei-Referenz
import java.io.FileReader;     // Text lesen
import java.io.FileWriter;     // Text schreiben
import java.io.BufferedReader; // Effizient lesen
import java.io.BufferedWriter; // Effizient schreiben
import java.nio.file.Files;    // Moderne API
import java.nio.file.Path;     // Dateipfad
\`\`\`

## Wichtig zu wissen

⚠️ **Hinweis**: In dieser Online-Umgebung können wir keine echten Dateien erstellen. 
Wir lernen die **Konzepte** und **Syntax**, die du später auf deinem Computer anwenden kannst!

---

**Klicke auf "Code ausführen" um fortzufahren!**`,
          codeTemplate: `// In dieser Lektion lernst du die Theorie!
// Dateizugriff funktioniert nur auf echten Computern.

public class Main {
    public static void main(String[] args) {
        System.out.println("Datei-Ein/Ausgabe verstanden!");
    }
}`,
          expectedOutput: "Datei-Ein/Ausgabe verstanden!",
          hints: [
            "Klicke einfach auf 'Code ausführen'",
            "Diese Lektion ist zum Lesen gedacht"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Datei-Ein/Ausgabe verstanden!");
    }
}`
        }
      },
      {
        id: "11-2",
        chapterId: "chapter-11",
        title: "Dateien lesen",
        order: 2,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Dateien lesen 📖

## BufferedReader - Der klassische Weg

\`\`\`java
import java.io.*;

public class DateiLesen {
    public static void main(String[] args) {
        try {
            BufferedReader reader = new BufferedReader(
                new FileReader("daten.txt")
            );
            
            String zeile;
            while ((zeile = reader.readLine()) != null) {
                System.out.println(zeile);
            }
            
            reader.close();
        } catch (IOException e) {
            System.out.println("Fehler: " + e.getMessage());
        }
    }
}
\`\`\`

## Files.readAllLines - Der moderne Weg

\`\`\`java
import java.nio.file.*;
import java.util.List;

public class DateiLesen {
    public static void main(String[] args) {
        try {
            List<String> zeilen = Files.readAllLines(
                Path.of("daten.txt")
            );
            
            for (String zeile : zeilen) {
                System.out.println(zeile);
            }
        } catch (IOException e) {
            System.out.println("Fehler: " + e.getMessage());
        }
    }
}
\`\`\`

## Try-with-Resources (Best Practice)

\`\`\`java
try (BufferedReader reader = new BufferedReader(
        new FileReader("daten.txt"))) {
    
    String zeile;
    while ((zeile = reader.readLine()) != null) {
        System.out.println(zeile);
    }
    // reader wird automatisch geschlossen!
    
} catch (IOException e) {
    e.printStackTrace();
}
\`\`\`

---

**Klicke auf "Code ausführen" um fortzufahren!**`,
          codeTemplate: `// Beispiel: So würde das Lesen aussehen
// (Funktioniert nur auf echten Computern)

public class Main {
    public static void main(String[] args) {
        // Simulierte Dateiinhalte
        String[] dateiInhalt = {
            "Zeile 1: Hallo",
            "Zeile 2: Welt",
            "Zeile 3: Java ist toll!"
        };
        
        System.out.println("Simuliertes Dateilesen:");
        for (String zeile : dateiInhalt) {
            System.out.println(zeile);
        }
    }
}`,
          expectedOutput: `Simuliertes Dateilesen:
Zeile 1: Hallo
Zeile 2: Welt
Zeile 3: Java ist toll!`,
          hints: [
            "Klicke auf 'Code ausführen'",
            "Dies simuliert das Lesen einer Datei"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        String[] dateiInhalt = {
            "Zeile 1: Hallo",
            "Zeile 2: Welt",
            "Zeile 3: Java ist toll!"
        };
        
        System.out.println("Simuliertes Dateilesen:");
        for (String zeile : dateiInhalt) {
            System.out.println(zeile);
        }
    }
}`
        }
      },
      {
        id: "11-3",
        chapterId: "chapter-11",
        title: "Dateien schreiben",
        order: 3,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Dateien schreiben ✍️

## BufferedWriter - Der klassische Weg

\`\`\`java
import java.io.*;

public class DateiSchreiben {
    public static void main(String[] args) {
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter("ausgabe.txt"))) {
            
            writer.write("Erste Zeile");
            writer.newLine();
            writer.write("Zweite Zeile");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
\`\`\`

## Files.write - Der moderne Weg

\`\`\`java
import java.nio.file.*;
import java.util.List;

public class DateiSchreiben {
    public static void main(String[] args) {
        try {
            List<String> zeilen = List.of(
                "Erste Zeile",
                "Zweite Zeile",
                "Dritte Zeile"
            );
            
            Files.write(Path.of("ausgabe.txt"), zeilen);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
\`\`\`

## Anhängen statt Überschreiben

\`\`\`java
// Mit FileWriter - true = append mode
new FileWriter("log.txt", true)

// Mit Files.write
Files.write(
    Path.of("log.txt"), 
    zeilen, 
    StandardOpenOption.APPEND
);
\`\`\`

## Wichtig

- 📝 \`FileWriter("datei.txt")\` - Überschreibt die Datei!
- ➕ \`FileWriter("datei.txt", true)\` - Hängt an

---

**Klicke auf "Code ausführen" um fortzufahren!**`,
          codeTemplate: `// Beispiel: So würde das Schreiben aussehen

public class Main {
    public static void main(String[] args) {
        // Simuliertes Dateischreiben
        String[] zuSchreiben = {
            "Name: Max Mustermann",
            "Alter: 25",
            "Stadt: Berlin"
        };
        
        System.out.println("Würde in Datei schreiben:");
        for (String zeile : zuSchreiben) {
            System.out.println("> " + zeile);
        }
        System.out.println("Datei erfolgreich geschrieben!");
    }
}`,
          expectedOutput: `Würde in Datei schreiben:
> Name: Max Mustermann
> Alter: 25
> Stadt: Berlin
Datei erfolgreich geschrieben!`,
          hints: [
            "Klicke auf 'Code ausführen'",
            "Dies simuliert das Schreiben in eine Datei"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        String[] zuSchreiben = {
            "Name: Max Mustermann",
            "Alter: 25",
            "Stadt: Berlin"
        };
        
        System.out.println("Würde in Datei schreiben:");
        for (String zeile : zuSchreiben) {
            System.out.println("> " + zeile);
        }
        System.out.println("Datei erfolgreich geschrieben!");
    }
}`
        }
      },
      {
        id: "11-4",
        chapterId: "chapter-11",
        title: "CSV-Dateien verarbeiten",
        order: 4,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# CSV-Dateien 📊

## Was ist CSV?

**CSV** = Comma-Separated Values (Komma-getrennte Werte)

\`\`\`
Name,Alter,Stadt
Max,25,Berlin
Anna,30,München
Tom,22,Hamburg
\`\`\`

## CSV parsen

\`\`\`java
String zeile = "Max,25,Berlin";
String[] teile = zeile.split(",");

String name = teile[0];    // "Max"
String alter = teile[1];   // "25"
String stadt = teile[2];   // "Berlin"
\`\`\`

## Aufgabe

Wir simulieren das Verarbeiten einer CSV-Datei. Parse die CSV-Zeilen und gib die Daten formatiert aus.

**Erwartete Ausgabe:**
\`\`\`
Person: Max (25 Jahre) aus Berlin
Person: Anna (30 Jahre) aus Muenchen
\`\`\``,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        // Simulierte CSV-Daten
        String[] csvZeilen = {
            "Max,25,Berlin",
            "Anna,30,Muenchen"
        };
        
        // Parse jede Zeile und gib sie formatiert aus
        for (String zeile : csvZeilen) {
            // Teile die Zeile bei Kommas
            
            // Gib aus: "Person: [Name] ([Alter] Jahre) aus [Stadt]"
            
        }
    }
}`,
          expectedOutput: `Person: Max (25 Jahre) aus Berlin
Person: Anna (30 Jahre) aus Muenchen`,
          hints: [
            "String[] teile = zeile.split(\",\");",
            "teile[0] = Name, teile[1] = Alter, teile[2] = Stadt",
            "System.out.println(\"Person: \" + teile[0] + \" (\" + teile[1] + \" Jahre) aus \" + teile[2]);"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        String[] csvZeilen = {
            "Max,25,Berlin",
            "Anna,30,Muenchen"
        };
        
        for (String zeile : csvZeilen) {
            String[] teile = zeile.split(",");
            System.out.println("Person: " + teile[0] + " (" + teile[1] + " Jahre) aus " + teile[2]);
        }
    }
}`
        }
      }
    ]
  },
  // ============================================
  // KAPITEL 12: MINI-PROJEKT
  // ============================================
  {
    id: "chapter-12",
    title: "Kapitel 12: Mini-Projekt",
    description: "Wende alles Gelernte in einem kompletten Projekt an!",
    order: 12,
    isUnlocked: false,
    lessons: [
      {
        id: "12-1",
        chapterId: "chapter-12",
        title: "Projekt: Notenverwaltung",
        order: 1,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# Mini-Projekt: Notenverwaltung 📚

## Projektbeschreibung

Du erstellst ein kleines **Notenverwaltungssystem**! Es kann:

- ✅ Noten speichern
- ✅ Durchschnitt berechnen
- ✅ Beste/schlechteste Note finden
- ✅ Notenstatistik ausgeben

## Was du lernst

In diesem Projekt wendest du an:

| Konzept | Anwendung |
|---------|-----------|
| Arrays | Noten speichern |
| Schleifen | Durch Noten iterieren |
| Methoden | Code strukturieren |
| Algorithmen | Min, Max, Durchschnitt |

## Projektstruktur

Wir bauen das Projekt **Schritt für Schritt** auf:

1. **Teil 1**: Grundstruktur mit Array
2. **Teil 2**: Durchschnitt berechnen
3. **Teil 3**: Min/Max finden
4. **Teil 4**: Alles zusammenfügen

---

**Lass uns starten! Klicke auf "Code ausführen".**`,
          codeTemplate: `// Mini-Projekt: Notenverwaltung
// In den nächsten Lektionen bauen wir das System auf!

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Notenverwaltung ===");
        System.out.println("Projekt gestartet!");
    }
}`,
          expectedOutput: `=== Notenverwaltung ===
Projekt gestartet!`,
          hints: [
            "Klicke auf 'Code ausführen'",
            "Dies ist die Projekteinführung"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("=== Notenverwaltung ===");
        System.out.println("Projekt gestartet!");
    }
}`
        }
      },
      {
        id: "12-2",
        chapterId: "chapter-12",
        title: "Teil 1: Noten speichern",
        order: 2,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Teil 1: Noten speichern 📝

## Aufgabe

Erstelle ein Array mit 5 Noten und gib sie alle aus.

## Anforderungen

1. Erstelle ein \`double[]\` Array namens \`noten\`
2. Fülle es mit diesen Werten: 1.3, 2.7, 1.0, 3.3, 2.0
3. Gib jede Note mit "Note X: [Wert]" aus

## Erwartete Ausgabe

\`\`\`
Note 1: 1.3
Note 2: 2.7
Note 3: 1.0
Note 4: 3.3
Note 5: 2.0
\`\`\`

## Tipp

Nutze eine for-Schleife mit Index!`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        // 1. Erstelle das Noten-Array
        
        
        // 2. Gib jede Note aus
        
    }
}`,
          expectedOutput: `Note 1: 1.3
Note 2: 2.7
Note 3: 1.0
Note 4: 3.3
Note 5: 2.0`,
          hints: [
            "double[] noten = {1.3, 2.7, 1.0, 3.3, 2.0};",
            "for (int i = 0; i < noten.length; i++)",
            "System.out.println(\"Note \" + (i+1) + \": \" + noten[i]);"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        double[] noten = {1.3, 2.7, 1.0, 3.3, 2.0};
        
        for (int i = 0; i < noten.length; i++) {
            System.out.println("Note " + (i + 1) + ": " + noten[i]);
        }
    }
}`
        }
      },
      {
        id: "12-3",
        chapterId: "chapter-12",
        title: "Teil 2: Durchschnitt berechnen",
        order: 3,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Teil 2: Durchschnitt berechnen 📊

## Aufgabe

Erstelle eine Methode \`berechneDurchschnitt\`, die den Durchschnitt aller Noten berechnet.

## Anforderungen

1. Methode: \`static double berechneDurchschnitt(double[] noten)\`
2. Berechne: Summe aller Noten / Anzahl der Noten
3. Gib den Durchschnitt aus

## Erwartete Ausgabe

\`\`\`
Durchschnitt: 2.06
\`\`\`

## Formel

\`\`\`
Durchschnitt = (1.3 + 2.7 + 1.0 + 3.3 + 2.0) / 5 = 2.06
\`\`\``,
          codeTemplate: `public class Main {
    // Methode zum Berechnen des Durchschnitts
    public static double berechneDurchschnitt(double[] noten) {
        // Berechne die Summe aller Noten
        
        // Teile durch die Anzahl
        
    }
    
    public static void main(String[] args) {
        double[] noten = {1.3, 2.7, 1.0, 3.3, 2.0};
        
        double durchschnitt = berechneDurchschnitt(noten);
        System.out.println("Durchschnitt: " + durchschnitt);
    }
}`,
          expectedOutput: "Durchschnitt: 2.06",
          hints: [
            "double summe = 0; for (double note : noten) { summe += note; }",
            "return summe / noten.length;",
            "Das Ergebnis ist automatisch gerundet"
          ],
          solution: `public class Main {
    public static double berechneDurchschnitt(double[] noten) {
        double summe = 0;
        for (double note : noten) {
            summe += note;
        }
        return summe / noten.length;
    }
    
    public static void main(String[] args) {
        double[] noten = {1.3, 2.7, 1.0, 3.3, 2.0};
        
        double durchschnitt = berechneDurchschnitt(noten);
        System.out.println("Durchschnitt: " + durchschnitt);
    }
}`
        }
      },
      {
        id: "12-4",
        chapterId: "chapter-12",
        title: "Teil 3: Beste und schlechteste Note",
        order: 4,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Teil 3: Beste & schlechteste Note 🏆

## Aufgabe

Erstelle zwei Methoden:
- \`findeBeste(double[] noten)\` - findet die beste (kleinste) Note
- \`findeSchlechteste(double[] noten)\` - findet die schlechteste (größte) Note

## Erinnerung

In Deutschland: 1.0 = beste Note, 6.0 = schlechteste Note

## Erwartete Ausgabe

\`\`\`
Beste Note: 1.0
Schlechteste Note: 3.3
\`\`\``,
          codeTemplate: `public class Main {
    // Finde die beste (kleinste) Note
    public static double findeBeste(double[] noten) {
        
    }
    
    // Finde die schlechteste (größte) Note
    public static double findeSchlechteste(double[] noten) {
        
    }
    
    public static void main(String[] args) {
        double[] noten = {1.3, 2.7, 1.0, 3.3, 2.0};
        
        System.out.println("Beste Note: " + findeBeste(noten));
        System.out.println("Schlechteste Note: " + findeSchlechteste(noten));
    }
}`,
          expectedOutput: `Beste Note: 1.0
Schlechteste Note: 3.3`,
          hints: [
            "findeBeste: double beste = noten[0]; dann mit < vergleichen",
            "findeSchlechteste: double schlechteste = noten[0]; dann mit > vergleichen",
            "Beide nutzen eine for-each Schleife"
          ],
          solution: `public class Main {
    public static double findeBeste(double[] noten) {
        double beste = noten[0];
        for (double note : noten) {
            if (note < beste) {
                beste = note;
            }
        }
        return beste;
    }
    
    public static double findeSchlechteste(double[] noten) {
        double schlechteste = noten[0];
        for (double note : noten) {
            if (note > schlechteste) {
                schlechteste = note;
            }
        }
        return schlechteste;
    }
    
    public static void main(String[] args) {
        double[] noten = {1.3, 2.7, 1.0, 3.3, 2.0};
        
        System.out.println("Beste Note: " + findeBeste(noten));
        System.out.println("Schlechteste Note: " + findeSchlechteste(noten));
    }
}`
        }
      },
      {
        id: "12-5",
        chapterId: "chapter-12",
        title: "Teil 4: Komplett-System",
        order: 5,
        type: "exercise",
        isCompleted: false,
        content: {
          explanation: `# Teil 4: Alles zusammen! 🎉

## Finale Aufgabe

Kombiniere alles zu einem vollständigen Notenverwaltungssystem!

## Anforderungen

Erstelle ein Programm mit:
1. \`berechneDurchschnitt(double[] noten)\`
2. \`findeBeste(double[] noten)\`
3. \`findeSchlechteste(double[] noten)\`
4. \`zeigeStatistik(double[] noten)\` - gibt alles formatiert aus

## Erwartete Ausgabe

\`\`\`
=== NOTENSTATISTIK ===
Anzahl Noten: 5
Durchschnitt: 2.06
Beste Note: 1.0
Schlechteste Note: 3.3
=====================
\`\`\``,
          codeTemplate: `public class Main {
    public static double berechneDurchschnitt(double[] noten) {
        double summe = 0;
        for (double note : noten) {
            summe += note;
        }
        return summe / noten.length;
    }
    
    public static double findeBeste(double[] noten) {
        double beste = noten[0];
        for (double note : noten) {
            if (note < beste) beste = note;
        }
        return beste;
    }
    
    public static double findeSchlechteste(double[] noten) {
        double schlechteste = noten[0];
        for (double note : noten) {
            if (note > schlechteste) schlechteste = note;
        }
        return schlechteste;
    }
    
    // Erstelle die zeigeStatistik Methode
    public static void zeigeStatistik(double[] noten) {
        // Gib die formatierte Statistik aus
        
    }
    
    public static void main(String[] args) {
        double[] noten = {1.3, 2.7, 1.0, 3.3, 2.0};
        zeigeStatistik(noten);
    }
}`,
          expectedOutput: `=== NOTENSTATISTIK ===
Anzahl Noten: 5
Durchschnitt: 2.06
Schlechteste Note: 3.3
Beste Note: 1.0
=====================`,
          hints: [
            "System.out.println(\"=== NOTENSTATISTIK ===\");",
            "Rufe die anderen Methoden auf und gib die Ergebnisse aus",
            "Nutze noten.length für die Anzahl"
          ],
          solution: `public class Main {
    public static double berechneDurchschnitt(double[] noten) {
        double summe = 0;
        for (double note : noten) {
            summe += note;
        }
        return summe / noten.length;
    }
    
    public static double findeBeste(double[] noten) {
        double beste = noten[0];
        for (double note : noten) {
            if (note < beste) beste = note;
        }
        return beste;
    }
    
    public static double findeSchlechteste(double[] noten) {
        double schlechteste = noten[0];
        for (double note : noten) {
            if (note > schlechteste) schlechteste = note;
        }
        return schlechteste;
    }
    
    public static void zeigeStatistik(double[] noten) {
        System.out.println("=== NOTENSTATISTIK ===");
        System.out.println("Anzahl Noten: " + noten.length);
        System.out.println("Durchschnitt: " + berechneDurchschnitt(noten));
        System.out.println("Schlechteste Note: " + findeSchlechteste(noten));
        System.out.println("Beste Note: " + findeBeste(noten));
        System.out.println("=====================");
    }
    
    public static void main(String[] args) {
        double[] noten = {1.3, 2.7, 1.0, 3.3, 2.0};
        zeigeStatistik(noten);
    }
}`
        }
      },
      {
        id: "12-6",
        chapterId: "chapter-12",
        title: "Projekt abgeschlossen!",
        order: 6,
        type: "theory",
        isCompleted: false,
        content: {
          explanation: `# 🎉 Herzlichen Glückwunsch! 🎉

## Du hast den Java-Kurs abgeschlossen!

Du hast gelernt:

### Grundlagen
- ✅ Variablen und Datentypen
- ✅ Operatoren und Ausdrücke
- ✅ Ein- und Ausgabe

### Kontrollstrukturen
- ✅ if/else Verzweigungen
- ✅ for und while Schleifen
- ✅ switch Anweisungen

### Datenstrukturen
- ✅ Arrays
- ✅ Strings und String-Methoden

### Fortgeschritten
- ✅ Methoden schreiben
- ✅ Rekursion verstehen
- ✅ Algorithmen implementieren

### Praxis
- ✅ Ein komplettes Mini-Projekt erstellt!

## Was kommt als Nächstes?

1. **Objektorientierung (OOP)** - Klassen, Objekte, Vererbung
2. **Datenstrukturen** - ArrayList, HashMap, Sets
3. **Exceptions** - Fehlerbehandlung
4. **GUI** - Grafische Oberflächen mit JavaFX
5. **Datenbanken** - SQL und JDBC

## Tipps zum Weitermachen

- 🔄 Nutze den **Übungsmodus** um dein Wissen zu festigen
- 💻 Installiere Java auf deinem Computer
- 🚀 Starte eigene kleine Projekte
- 📚 Lies die offizielle Java-Dokumentation

---

**Du bist jetzt ein Java-Programmierer! 🚀**`,
          codeTemplate: `public class Main {
    public static void main(String[] args) {
        System.out.println("=================================");
        System.out.println("  JAVA-KURS ABGESCHLOSSEN!");
        System.out.println("=================================");
        System.out.println();
        System.out.println("Du bist jetzt bereit fuer:");
        System.out.println("- Eigene Projekte");
        System.out.println("- Objektorientierung");
        System.out.println("- Fortgeschrittene Themen");
        System.out.println();
        System.out.println("Weiter so! :)");
    }
}`,
          expectedOutput: `=================================
  JAVA-KURS ABGESCHLOSSEN!
=================================

Du bist jetzt bereit fuer:
- Eigene Projekte
- Objektorientierung
- Fortgeschrittene Themen

Weiter so! :)`,
          hints: [
            "Klicke auf 'Code ausführen' um den Kurs abzuschließen!",
            "Herzlichen Glückwunsch!"
          ],
          solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("=================================");
        System.out.println("  JAVA-KURS ABGESCHLOSSEN!");
        System.out.println("=================================");
        System.out.println();
        System.out.println("Du bist jetzt bereit fuer:");
        System.out.println("- Eigene Projekte");
        System.out.println("- Objektorientierung");
        System.out.println("- Fortgeschrittene Themen");
        System.out.println();
        System.out.println("Weiter so! :)");
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
