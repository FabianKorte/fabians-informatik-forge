import type { LearnModule } from "@/types/learn";

export const learnContent: Record<string, LearnModule[]> = {
  programmierung: [
    {
      type: "flashcards",
      title: "Grundbegriffe der Programmierung",
      cards: [
        { front: "Algorithmus", back: "Endliche, eindeutige Schrittfolge zur Lösung eines Problems. Ein Algorithmus muss terminieren (endlich sein), deterministisch (eindeutig) und effektiv (ausführbar) sein. Beispiel: Sortieralgorithmen wie Quicksort." },
        { front: "Variable", back: "Benannter Speicherplatz für veränderliche Werte. Variablen haben einen Namen, Typ und Wert. Sie ermöglichen es, Daten zu speichern und zu manipulieren. In verschiedenen Sprachen unterschiedlich deklariert (var, let, const in JS)." },
        { front: "Funktion", back: "Wiederverwendbarer Codeblock mit optionalen Eingaben (Parameter) und Rückgabewert. Funktionen kapseln Logik, fördern Code-Wiederverwendung und erleichtern Testing. Können rekursiv, anonym oder als Higher-Order-Functions implementiert werden." },
        { front: "Big-O: O(n)", back: "Lineare Zeitkomplexität - Laufzeit wächst proportional zur Eingabegröße. Bei doppelter Eingabe verdoppelt sich auch die Laufzeit. Beispiele: Lineare Suche, einfaches Array durchlaufen. Besser als O(n²), schlechter als O(log n)." },
        { front: "Rekursion", back: "Programmiertechnik, bei der eine Funktion sich selbst mit kleineren Probleminstanzen aufruft. Benötigt eine Abbruchbedingung (Base Case). Elegant für Probleme wie Fakultät, Fibonacci, Baumtraversierung. Kann Stack Overflow verursachen." },
        { front: "Stack", back: "LIFO-Datenstruktur (Last In, First Out). Das zuletzt hinzugefügte Element wird zuerst entfernt. Operationen: push (hinzufügen), pop (entfernen), peek (anschauen). Verwendet für Funktionsaufrufe, Undo-Mechanismen, Klammerprüfung." },
        { front: "Queue", back: "FIFO-Datenstruktur (First In, First Out). Das erste hinzugefügte Element wird zuerst entfernt. Operationen: enqueue (hinzufügen), dequeue (entfernen). Verwendet für Task-Scheduling, Breadth-First-Search, Print-Queues." },
        { front: "Hash-Table", back: "Datenstruktur für schnellen Zugriff über Schlüssel-Wert-Paare mit O(1) durchschnittlicher Komplexität. Verwendet Hash-Funktionen zur Berechnung von Array-Indizes. Kollisionen werden durch Chaining oder Open Addressing behandelt." }
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
          explanation: "const verhindert die Neuzuweisung der Referenz, aber Objektinhalte können verändert werden. Beispiel: const arr = []; arr.push(1); // erlaubt, aber arr = [] // Fehler" 
        },
        { 
          question: "Was ist 'typeof null' in JavaScript?", 
          options: ["null", "object", "undefined", "string"], 
          correctIndex: 1, 
          explanation: "Dies ist ein historischer Bug in JavaScript seit der ersten Version. null sollte eigentlich 'null' zurückgeben, aber aus Kompatibilitätsgründen wurde es nie geändert." 
        },
        { 
          question: "Was fügt TypeScript zu JavaScript hinzu?", 
          options: ["Runtime-Performance-Verbesserungen", "Statische Typisierung", "Neue Browser-APIs", "CSS-Features"], 
          correctIndex: 1, 
          explanation: "TypeScript erweitert JavaScript um ein optionales statisches Typsystem. Dies ermöglicht Fehlerdetection zur Compile-Zeit, bessere IDE-Unterstützung und selbst-dokumentierenden Code." 
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
    }
  ],
  datenbanken: [
    {
      type: "flashcards",
      title: "SQL & Normalformen Grundlagen",
      cards: [
        { front: "Primärschlüssel (Primary Key)", back: "Eindeutige Identifikation einer Tabellenzeile. Kann nicht NULL sein und muss in jeder Zeile eindeutig sein. Kann aus einem oder mehreren Attributen bestehen (zusammengesetzter Schlüssel). Beispiel: Kundennummer in Kundentabelle." },
        { front: "Fremdschlüssel (Foreign Key)", back: "Verweist auf den Primärschlüssel einer anderen Tabelle und stellt referenzielle Integrität sicher. Kann NULL sein. Ermöglicht Verknüpfungen zwischen Tabellen. Beispiel: Kunden_ID in Bestellungen-Tabelle verweist auf Kunden-Tabelle." },
        { front: "1. Normalform (1NF)", back: "Alle Attributwerte sind atomar (unteilbar) und es gibt keine wiederholenden Gruppen. Jede Zelle enthält nur einen Wert. Beispiel: Statt 'Telefon1, Telefon2' separate Zeilen oder Tabelle für Telefonnummern." },
        { front: "ACID-Eigenschaften", back: "Atomicity (Unteilbarkeit), Consistency (Konsistenz), Isolation (Isolation), Durability (Dauerhaftigkeit). Garantieren verlässliche Transaktionsverarbeitung in Datenbanken. Grundlage für Datenintegrität." }
      ]
    },
    {
      type: "quiz",
      title: "SQL-Abfragen und Konzepte", 
      questions: [
        { 
          question: "Welche SQL-Klausel filtert Zeilen VOR der Gruppierung?", 
          options: ["GROUP BY", "WHERE", "ORDER BY", "HAVING"], 
          correctIndex: 1,
          explanation: "WHERE filtert Zeilen vor der Gruppierung und kann keine Aggregatfunktionen verwenden. HAVING filtert nach der Gruppierung und kann Aggregatfunktionen wie COUNT(), SUM() verwenden."
        },
        { 
          question: "Was ist der Unterschied zwischen COUNT(*) und COUNT(spalte)?", 
          options: ["Kein Unterschied", "COUNT(*) zählt alle Zeilen, COUNT(spalte) nur nicht-NULL", "COUNT(*) ist langsamer", "COUNT(spalte) ist deprecated"], 
          correctIndex: 1,
          explanation: "COUNT(*) zählt alle Zeilen einer Gruppe, auch die mit NULL-Werten. COUNT(spalte) zählt nur Zeilen, wo die Spalte nicht NULL ist."
        }
      ]
    }
  ]
};

export const getModulesForCategory = (id: string) => learnContent[id] || [];