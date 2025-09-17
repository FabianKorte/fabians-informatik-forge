import type { LearnModule } from "@/types/learn";
import { webentwicklungContent } from "./learn/webentwicklung";
import { projektmanagementContent } from "./learn/projektmanagement";
import { qualitaetsmanagementContent } from "./learn/qualitaetsmanagement";
import { pruefungsvorbereitungContent } from "./learn/pruefungsvorbereitung";
import { betriebswirtschaftContent } from "./learn/betriebswirtschaft";
import { rechtlicheGrundlagenContent } from "./learn/rechtliche-grundlagen";
import { kommunikationContent } from "./learn/kommunikation";
import { englischItContent } from "./learn/englisch-it";
import { mathematikLogikContent } from "./learn/mathematik-logik";
import { innovationTrendsContent } from "./learn/innovation-trends";
import { wisoContent } from "./learn/wiso";
import { datenbankenModules } from "./learn/datenbanken";
import { systemadministrationModules } from "./learn/systemadministration";
import { mobileEntwicklungContent } from "./learn/mobile-entwicklung";
import { grundlagenItContent } from "./learn/grundlagen-it";
import { itSicherheitAdvancedContent } from "./learn/it-sicherheit-advanced";

export const learnContent: Record<string, LearnModule[]> = {
  programmierung: [
    {
      type: "flashcards",
      title: "Grundbegriffe der Programmierung - IHK Prüfungswissen",
      cards: [
        { front: "Algorithmus - Definition und Eigenschaften", back: "Ein Algorithmus ist eine endliche, eindeutige Schrittfolge zur Lösung eines Problems. **Wichtige Eigenschaften für die IHK-Prüfung:** 1. **Finitheit** (endlich beschreibbar), 2. **Determinismus** (eindeutig), 3. **Terminierung** (bricht ab), 4. **Effizienz** (ressourcenschonend). **Prüfungstipp:** Kann in Pseudocode oder Struktogramm dargestellt werden. Beispiele: Sortieralgorithmen (Bubble Sort O(n²), Quick Sort O(n log n))." },
        { front: "Datentypen in der Programmierung", back: "**Primitive Datentypen:** Integer (ganze Zahlen), Float/Double (Gleitkomma), Boolean (wahr/falsch), Character (Zeichen). **Komplexe Datentypen:** Array (indizierte Liste), String (Zeichenkette), Object/Record (strukturierte Daten). **IHK-Prüfungsrelevant:** Speicherverbrauch (int: 4 Byte, double: 8 Byte), Wertebereich (int: -2³¹ bis 2³¹-1), Typkonvertierung (implizit vs. explizit)." },
        { front: "Kontrollstrukturen - Verzweigungen", back: "**If-Then-Else:** Bedingte Ausführung basierend auf Booleschen Ausdrücken. **Switch/Case:** Mehrfachverzweigung für diskrete Werte. **IHK-Prüfungswissen:** Verschachtelte If-Anweisungen, Komplexe Bedingungen mit AND (&&), OR (||), NOT (!). **Struktogramm-Darstellung:** Raute für Bedingung, Rechteck für Anweisung. **Tipp:** Achte auf Klammersetzung bei komplexen Bedingungen!" },
        { front: "Schleifen - Iterationsstrukturen", back: "**For-Schleife:** Zählergesteuert, bekannte Wiederholungsanzahl. **While-Schleife:** Bedingungsgesteuert, Prüfung am Anfang. **Do-While:** Bedingungsgesteuert, Prüfung am Ende (mindestens 1x ausgeführt). **IHK-Prüfungsaspekte:** Endlosschleifen vermeiden, Laufzeitkomplexität (O-Notation), verschachtelte Schleifen (O(n²)). **Praxisbeispiel:** Durchlauf durch Arrays, Eingabevalidierung." },
        { front: "Funktionen und Parameter", back: "**Definition:** Wiederverwendbare Codeblöcke mit Input (Parameter) und Output (Rückgabewert). **Parameterübergabe:** Call by Value (Kopie) vs. Call by Reference (Zeiger). **IHK-Prüfungsdetails:** Lokale vs. globale Variablen, Sichtbarkeit (Scope), Rekursion vs. Iteration. **Vorteile:** Modularität, Testbarkeit, Wartbarkeit, Code-Wiederverwendung. **Beispiel:** function berechneFlaeche(laenge, breite) { return laenge * breite; }" },
        { front: "Objektorientierte Programmierung - Grundlagen", back: "**Vier Grundprinzipien:** 1. **Kapselung** (Information Hiding), 2. **Vererbung** (Inheritance), 3. **Polymorphismus** (Methodenüberladung), 4. **Abstraktion** (Datenabstraktion). **IHK-Prüfungsrelevant:** Klasse vs. Objekt, Konstruktor, Destruktor, Zugriffsmodifizierer (private, protected, public), UML-Klassendiagramme. **Praxisbeispiel:** Fahrzeug (Oberklasse) → PKW, LKW (Unterklassen)." },
        { front: "Datenstrukturen - Arrays und Listen", back: "**Array:** Feste Größe, indizierter Zugriff O(1), homogene Datentypen. **Dynamische Liste:** Variable Größe, sequenzieller Zugriff, Add/Remove-Operationen. **IHK-Prüfungswissen:** Eindimensional vs. mehrdimensional, Initialisierung, Grenzen beachten (Index out of bounds). **Algorithmen:** Suchen (linear O(n), binär O(log n)), Sortieren (Bubble O(n²), Quick O(n log n))." },
        { front: "Rekursion vs. Iteration", back: "**Rekursion:** Funktion ruft sich selbst auf, benötigt Abbruchbedingung (Base Case). **Iteration:** Wiederholung durch Schleifen. **IHK-Prüfungsaspekte:** Rekursion elegant aber speicherintensiv (Stack Overflow), Iteration meist effizienter. **Klassische Beispiele:** Fakultät (n! = n × (n-1)!), Fibonacci (F(n) = F(n-1) + F(n-2)), Binäre Baumtraversierung. **Tipp:** Rekursion → Iteration umwandeln können!" },
        { front: "Komplexitätsanalyse - Big-O-Notation", back: "**O(1)** Konstant: Array-Zugriff, Hash-Lookup. **O(log n)** Logarithmisch: Binäre Suche, Heap-Operationen. **O(n)** Linear: Array durchlaufen, lineare Suche. **O(n log n)** Quasi-linear: Merge Sort, Heap Sort. **O(n²)** Quadratisch: Bubble Sort, verschachtelte Schleifen. **O(2ⁿ)** Exponentiell: Brute-Force-Lösungen. **IHK-Prüfung:** Best/Average/Worst Case unterscheiden!" },
        { front: "Fehlerbehandlung und Debugging", back: "**Fehlertypen:** Syntax-Fehler (Compile-Zeit), Logik-Fehler (Laufzeit), Laufzeit-Fehler (Runtime Exception). **Debugging-Techniken:** Breakpoints, Step-through, Variable Watch, Logging. **Exception Handling:** Try-Catch-Finally-Blöcke, spezifische vs. generische Exceptions. **IHK-Prüfungsrelevant:** Defensive Programmierung, Input-Validierung, Fehlerbehandlungsstrategien. **Tools:** Debugger, Unit Tests, Code-Review." },
        { front: "Datenbank-Grundlagen für Programmierer", back: "**CRUD-Operationen:** Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE). **SQL-Einbettung:** Prepared Statements, SQL-Injection-Schutz, Parameter-Binding. **IHK-Prüfungswissen:** Normalisierung (1NF, 2NF, 3NF), ER-Diagramme, Primär-/Fremdschlüssel. **Programmierung:** Connection Handling, Transaction Management, Error Handling bei DB-Operationen." },
        { front: "Software-Engineering-Prinzipien", back: "**SOLID-Prinzipien:** Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. **DRY-Prinzip:** Don't Repeat Yourself - Code-Duplikation vermeiden. **KISS:** Keep It Simple, Stupid - Einfache Lösungen bevorzugen. **IHK-Prüfungsaspekte:** Code-Qualität, Wartbarkeit, Lesbarkeit, Dokumentation, Versionskontrolle (Git). **Refactoring:** Code-Verbesserung ohne Funktionsänderung." }
      ]
    },
    {
      type: "quiz",
      title: "IHK-Prüfungsfragen Programmierung - Grundlagen",
      questions: [
        {
          question: "Welche Zeitkomplexität hat die binäre Suche in einem sortierten Array mit n Elementen?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          correctIndex: 1,
          explanation: "Die binäre Suche teilt den Suchbereich in jedem Schritt in der Hälfte, daher logarithmische Komplexität O(log n). Bei 1000 Elementen sind maximal 10 Vergleiche nötig (2¹⁰ = 1024). **IHK-Prüfungstipp:** Immer die Halbierungsoperationen zählen - das deutet auf log n hin."
        },
        {
          question: "Was ist der Hauptunterschied zwischen Call by Value und Call by Reference?",
          options: ["Geschwindigkeit der Ausführung", "Call by Value übergibt Kopie, Call by Reference übergibt Adresse", "Call by Reference ist sicherer", "Kein Unterschied"],
          correctIndex: 1,
          explanation: "**Call by Value** erstellt eine Kopie des Wertes (ursprüngliche Variable bleibt unverändert). **Call by Reference** übergibt die Speicheradresse (ursprüngliche Variable kann verändert werden). **IHK-Prüfungsrelevant:** Bei großen Datenstrukturen ist Call by Reference effizienter, aber weniger sicher. **Beispiel:** In C++ sind & (Referenz) und * (Pointer) wichtige Operatoren."
        },
        {
          question: "Welche Eigenschaft MUSS ein Algorithmus haben?",
          options: ["Muss rekursiv sein", "Muss in unter 1 Sekunde ausführbar sein", "Muss terminieren (endlich sein)", "Muss objektorientiert programmiert werden"],
          correctIndex: 2,
          explanation: "Ein Algorithmus MUSS terminieren (Finitheitseigenschaft). Endlosschleifen verletzen diese Grundeigenschaft. **Die 5 Algorithmouseigenschaften:** 1. Finitheit (terminiert), 2. Determinismus (eindeutig), 3. Determiniertheit (reproduzierbar), 4. Ausführbarkeit (praktisch umsetzbar), 5. Effizienz (angemessene Ressourcennutzung). **IHK-Prüfung:** Oft gefragt welche Eigenschaft zwingend erforderlich ist."
        },
        {
          question: "Was beschreibt die 3. Normalform (3NF) in Datenbanken?",
          options: ["Atomare Werte in jeder Zelle", "Keine partiellen Abhängigkeiten", "Keine transitiven Abhängigkeiten", "Eindeutige Primärschlüssel"],
          correctIndex: 2,
          explanation: "**3. Normalform (3NF):** Eliminiert transitive Abhängigkeiten zwischen Nicht-Schlüssel-Attributen. **Beispiel:** Kunde → Stadt → PLZ ist transitiv - PLZ sollte in separate Tabelle. **IHK-Merkregel:** 1NF = atomare Werte, 2NF = keine partiellen Abhängigkeiten, 3NF = keine transitiven Abhängigkeiten. **Vorteil:** Reduziert Redundanz und Anomalien bei Datenänderungen."
        },
        {
          question: "Welches Design Pattern implementiert 'Eine Klasse, ein Objekt'?",
          options: ["Factory Pattern", "Observer Pattern", "Singleton Pattern", "Strategy Pattern"],
          correctIndex: 2,
          explanation: "**Singleton Pattern** stellt sicher, dass nur eine Instanz einer Klasse existiert und globaler Zugriff möglich ist. **Implementierung:** Private Konstruktor, statische getInstance()-Methode. **IHK-Anwendungsfälle:** Datenbankverbindungen, Logger, Konfigurationsklassen. **Vorsicht:** Kann Testen erschweren und ist bei Multithreading problematisch. **Alternative:** Dependency Injection."
        },
        {
          question: "Was ist der Vorteil von objektorientierten gegenüber prozeduralen Programmiersprachen?",
          options: ["OOP ist immer schneller", "Bessere Kapselung und Wiederverwendbarkeit", "OOP braucht weniger Speicher", "Einfacher zu erlernen"],
          correctIndex: 1,
          explanation: "**Hauptvorteile von OOP:** 1. **Kapselung** (Information Hiding, Datenintegrität), 2. **Wiederverwendbarkeit** (Vererbung, Polymorphismus), 3. **Wartbarkeit** (modularer Aufbau), 4. **Erweiterbarkeit** (neue Klassen ohne Änderung bestehender). **IHK-Beispiel:** Eine 'Auto'-Klasse kann für PKW, LKW, Motorrad erweitert werden, ohne den ursprünglichen Code zu ändern. **Nachteil:** Höhere Komplexität, mehr Overhead."
        },
        {
          question: "Welche Datenstruktur implementiert LIFO (Last In, First Out)?",
          options: ["Queue", "Stack", "Array", "Liste"],
          correctIndex: 1,
          explanation: "**Stack** implementiert LIFO-Prinzip. **Operationen:** push() (hinzufügen oben), pop() (entfernen oben), peek()/top() (anschauen ohne entfernen). **IHK-Anwendungen:** Funktionsaufrufe (Call Stack), Undo-Operationen, Klammerprüfung, Infix-zu-Postfix-Konvertierung. **Gegenteil:** Queue mit FIFO (First In, First Out). **Implementierung:** Array oder verkettete Liste."
        },
        {
          question: "Was ist ein Deadlock in der Programmierung?",
          options: ["Eine Endlosschleife", "Warten zweier Prozesse aufeinander", "Ein Speicherleck", "Ein Compilerfehler"],
          correctIndex: 1,
          explanation: "**Deadlock:** Zwei oder mehr Prozesse blockieren sich gegenseitig, weil jeder auf Ressourcen wartet, die der andere hält. **IHK-Beispiel:** Prozess A sperrt Ressource 1 und wartet auf Ressource 2, Prozess B sperrt Ressource 2 und wartet auf Ressource 1. **Vermeidung:** Einheitliche Sperreihenfolge, Timeouts, Deadlock-Detection-Algorithmen. **Bedingungen:** Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait."
        },
        {
          question: "Was ist die Hauptaufgabe eines Compilers?",
          options: ["Programme ausführen", "Quellcode in Maschinencode übersetzen", "Fehler zur Laufzeit finden", "Variablen verwalten"],
          correctIndex: 1,
          explanation: "**Compiler** übersetzt Quellcode (Hochsprache) in Maschinencode oder Bytecode. **Phasen:** 1. Lexikalische Analyse (Token), 2. Syntaxanalyse (Parse Tree), 3. Semantische Analyse (Typprüfung), 4. Optimierung, 5. Code-Generierung. **IHK-Unterschied:** Compiler vs. Interpreter - Compiler übersetzt vollständig vor Ausführung, Interpreter führt zeilenweise aus."
        },
        {
          question: "Was charakterisiert funktionale Programmierung?",
          options: ["Objekte und Klassen", "Unveränderliche Daten und pure Funktionen", "Goto-Statements", "Globale Variablen"],
          correctIndex: 1,
          explanation: "**Funktionale Programmierung:** 1. **Immutability** (unveränderliche Daten), 2. **Pure Functions** (keine Seiteneffekte), 3. **Higher-Order Functions** (Funktionen als Parameter), 4. **Recursion** statt Schleifen. **IHK-Beispiele:** JavaScript map/filter/reduce, Haskell, Lisp. **Vorteile:** Parallelisierbar, testbar, weniger Bugs durch Seiteneffekte."
        }
      ]
    },
    {
      type: "quiz", 
      title: "IHK-Prüfungsfragen Programmierung - Fortgeschritten",
      questions: [
        {
          question: "Was ist der Unterschied zwischen Stack und Heap im Speichermanagement?",
          options: ["Stack ist langsamer als Heap", "Stack für lokale Variablen, Heap für dynamische Allokation", "Heap ist sicherer als Stack", "Kein Unterschied"],
          correctIndex: 1,
          explanation: "**Stack:** Automatische Speicherverwaltung, LIFO-Prinzip, lokale Variablen, Funktionsparameter, schnell aber begrenzt. **Heap:** Dynamische Allokation (malloc/new), manuelles Memory-Management nötig, fragmentierungsanfällig, größer aber langsamer. **IHK-Prüfung:** Stack Overflow bei zu tiefer Rekursion, Memory Leaks im Heap durch vergessenes free()/delete."
        },
        {
          question: "Welches SOLID-Prinzip verletzt diese Klasse: class User { save() { /* DB */ } sendEmail() { /* Email */ } }?",
          options: ["Single Responsibility", "Open/Closed", "Liskov Substitution", "Dependency Inversion"],
          correctIndex: 0,
          explanation: "**Single Responsibility Principle (SRP)** verletzt: Eine Klasse sollte nur einen Grund zur Änderung haben. User-Klasse macht 2 Dinge: Datenoperationen UND E-Mail-Versand. **Lösung:** UserRepository für DB-Operationen, EmailService für E-Mail-Versand separieren. **IHK-Tipp:** 'Ein Zweck, eine Klasse' - hohe Kohäsion, lose Kopplung."
        },
        {
          question: "Was beschreibt das Observer Pattern?",
          options: ["Objekte überwachen sich gegenseitig", "Ein Objekt benachrichtigt mehrere Beobachter über Änderungen", "Objekte werden in einer Liste verwaltet", "Debugging-Pattern für Entwickler"],
          correctIndex: 1,
          explanation: "**Observer Pattern:** Subject (Observable) benachrichtigt automatisch alle registrierten Observer über Statusänderungen. **IHK-Anwendung:** MVC (Model benachrichtigt Views), Event-Handler, Newsletter-System. **Implementierung:** Subject.addObserver(observer), Subject.notifyObservers(). **Vorteil:** Lose Kopplung zwischen Subject und Observer."
        },
        {
          question: "Was ist ein Interface in der objektorientierten Programmierung?",
          options: ["Eine konkrete Klasse", "Ein Vertrag ohne Implementierung", "Eine abstrakte Klasse mit Code", "Ein Datentyp"],
          correctIndex: 1,
          explanation: "**Interface** definiert einen Vertrag (Methodensignaturen) ohne Implementierung. **IHK-Zweck:** Polymorph programming, Dependency Injection, Multiple Inheritance (in Java/C#). **Beispiel:** interface Drawable { void draw(); } - Klassen Circle, Square implementieren es unterschiedlich. **Vorteil:** Testbare, austauschbare Komponenten."
        },
        {
          question: "Welche Aussage über Git Branches ist korrekt?",
          options: ["Branches verlangsamen Git", "Branches ermöglichen parallele Entwicklung", "Branches sind nur für große Teams", "Branches können nicht gemerged werden"],
          correctIndex: 1,
          explanation: "**Git Branches** ermöglichen parallele Entwicklung verschiedener Features ohne Konflikte. **IHK-Workflow:** main/master (stabil), develop (Integration), feature/xyz (neue Features), hotfix/bug (Bugfixes). **Commands:** git branch, git checkout, git merge, git rebase. **Best Practice:** Feature Branches, Pull Requests, Code Reviews vor Merge."
        },
        {
          question: "Was bedeutet 'Dependency Injection'?",
          options: ["Abhängigkeiten hart codieren", "Abhängigkeiten von außen übergeben", "Abhängigkeiten löschen", "Abhängigkeiten kopieren"],
          correctIndex: 1,
          explanation: "**Dependency Injection (DI):** Abhängigkeiten werden von außen übergeben statt intern erstellt. **Arten:** Constructor Injection (bevorzugt), Setter Injection, Interface Injection. **IHK-Vorteile:** Testbarkeit (Mock-Objekte), Flexibilität, SOLID-Prinzipien. **Beispiel:** class User(database: IDatabase) statt class User { db = new MySQL() }."
        },
        {
          question: "Was ist der Unterschied zwischen synchroner und asynchroner Programmierung?",
          options: ["Synchron ist schneller", "Asynchron blockiert nicht bei langwierigen Operationen", "Synchron ist komplexer", "Kein Unterschied"],
          correctIndex: 1,
          explanation: "**Synchron:** Sequenzielle Abarbeitung, jeder Schritt wartet auf vorherigen (blockierend). **Asynchron:** Non-blocking, parallele Ausführung möglich. **IHK-Beispiele:** AJAX-Requests, File I/O, Datenbankzugriffe. **JavaScript:** Promises, async/await, Callbacks. **Vorteil Async:** UI bleibt responsiv, bessere Ressourcennutzung."
        },
        {
          question: "Was beschreibt 'Test-Driven Development' (TDD)?",
          options: ["Tests nach dem Code schreiben", "Tests vor dem Code schreiben", "Keine Tests schreiben", "Tests während dem Coden"],
          correctIndex: 1,
          explanation: "**TDD-Zyklus:** 1. **Red** - Test schreiben (schlägt fehl), 2. **Green** - Minimal nötigen Code schreiben (Test erfolgreich), 3. **Refactor** - Code verbessern. **IHK-Vorteile:** Bessere Code-Qualität, Dokumentation durch Tests, weniger Bugs, mutiger Refactoring. **Testarten:** Unit Tests, Integration Tests, End-to-End Tests."
        },
        {
          question: "Was ist ein Race Condition in der Multithread-Programmierung?",
          options: ["Threads laufen zu schnell", "Threads konkurieren um dieselbe Ressource", "Threads stoppen sich", "Threads verwenden verschiedene CPUs"],
          correctIndex: 1,
          explanation: "**Race Condition:** Mehrere Threads greifen gleichzeitig auf geteilte Ressource zu, Ergebnis abhängig von Timing. **IHK-Beispiel:** counter++ ist nicht atomar - kann zu falschen Werten führen. **Lösung:** Synchronisation mit Mutex, Semaphore, Lock, synchronized. **Symptome:** Unvorhersagbare Ergebnisse, schwer reproduzierbare Bugs."
        },
        {
          question: "Was charakterisiert Clean Code?",
          options: ["Viele Kommentare", "Lesbar, verständlich, wartbar", "Möglichst kurz", "Möglichst schnell"],
          correctIndex: 1,
          explanation: "**Clean Code Prinzipien:** 1. **Aussagekräftige Namen**, 2. **Kleine Funktionen** (eine Aufgabe), 3. **Selbstdokumentierender Code**, 4. **Keine Duplikation** (DRY), 5. **Testbare Struktur**. **IHK-Regel:** Code wird öfter gelesen als geschrieben - Klarheit vor Cleverness. **Refactoring:** Code-Struktur verbessern ohne Funktionalität zu ändern."
        }
      ]
    },
    {
      type: "quiz",
      title: "IHK-Prüfungsfragen Programmierung - Datenstrukturen & Algorithmen",
      questions: [
        {
          question: "Welche Eigenschaften hat eine Hashtabelle?",
          options: ["Immer sortierte Reihenfolge", "Durchschnittlich O(1) Zugriff, keine Reihenfolge garantiert", "O(log n) Zugriff", "Nur für Strings geeignet"],
          correctIndex: 1,
          explanation: "**Hashtabelle:** Durchschnittlich O(1) für Insert/Delete/Lookup, keine Sortierung. **Hash-Funktion** mappt Schlüssel auf Array-Index. **Kollisionen:** Chaining (verkettete Listen) oder Open Addressing (Probing). **IHK-Anwendung:** Caches, Dictionaries, Sets. **Worst Case:** O(n) bei vielen Kollisionen."
        },
        {
          question: "Was ist ein binärer Suchbaum (BST)?",
          options: ["Jeder Knoten hat maximal 2 Kinder", "Linkes Kind < Wurzel < rechtes Kind, balanciert", "Alle Blätter auf gleicher Ebene", "Nur für Zahlen verwendbar"],
          correctIndex: 1,
          explanation: "**BST-Eigenschaft:** Für jeden Knoten gilt: linkes Teilbaum < Knoten < rechtes Teilbaum. **Operationen:** Search/Insert/Delete durchschnittlich O(log n). **Problem:** Kann zu Liste degenerieren (O(n)). **Lösung:** Selbstbalancierende Bäume (AVL, Red-Black). **IHK-Traversierung:** Inorder (sortierte Ausgabe), Preorder, Postorder."
        },
        {
          question: "Welcher Sortieralgorithmus ist 'stabil'?",
          options: ["Quicksort", "Mergesort", "Heapsort", "Selection Sort"],
          correctIndex: 1,
          explanation: "**Stabil:** Gleiche Elemente behalten ihre relative Reihenfolge. **Mergesort** ist stabil und hat garantiert O(n log n). **Instabile Algorithmen:** Quicksort, Heapsort. **IHK-Beispiel:** Studenten nach Note sortieren, gleiche Noten nach Namen - Stabilität erhält Zweitkriterium. **Divide & Conquer:** Teile, sortiere, füge zusammen."
        },
        {
          question: "Was beschreibt die Landau-Notation (Big-O)?",
          options: ["Exakte Laufzeit in Sekunden", "Obere Schranke des Wachstums", "Speicherverbrauch in Bytes", "Anzahl Code-Zeilen"],
          correctIndex: 1,
          explanation: "**Big-O:** Asymptotische obere Schranke für Laufzeit-/Speicherkomplexität. **Vernachlässigt:** Konstanten, niedrigere Terme. **Beispiel:** 3n² + 2n + 1 = O(n²). **IHK-Hierarchie:** O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ). **Zweck:** Algorithmen-Vergleich, Skalierbarkeit bewerten."
        },
        {
          question: "Wann verwendet man eine Queue (Warteschlange)?",
          options: ["LIFO-Verhalten gewünscht", "FIFO-Verhalten gewünscht", "Zufälliger Zugriff nötig", "Sortierte Daten erforderlich"],
          correctIndex: 1,
          explanation: "**Queue (FIFO):** First In, First Out - erstes Element wird zuerst entfernt. **Operationen:** enqueue (hinten hinzufügen), dequeue (vorne entfernen). **IHK-Anwendungen:** Prozess-Scheduling, Breadth-First Search, Print-Spooling, Buffer-Management. **Implementierung:** Array mit head/tail Pointern oder verkettete Liste."
        },
        {
          question: "Was ist der Unterschied zwischen Array und verketteter Liste?",
          options: ["Arrays sind immer langsamer", "Arrays haben O(1) Random Access, Listen O(1) Insert/Delete", "Listen sind immer besser", "Kein Unterschied"],
          correctIndex: 1,
          explanation: "**Array:** Kontinuierlicher Speicher, O(1) Random Access, O(n) Insert/Delete am Anfang. **Verkettete Liste:** Nicht-kontinuierlich, O(n) Search, O(1) Insert/Delete am bekannten Knoten. **IHK-Wahl:** Array für viele Zugriffe, Liste für viele Änderungen. **Cache-Lokalität:** Arrays besser für moderne CPUs."
        },
        {
          question: "Was macht der Dijkstra-Algorithmus?",
          options: ["Sortiert Arrays", "Findet kürzeste Pfade in Graphen", "Balanciert Bäume", "Komprimiert Daten"],
          correctIndex: 1,
          explanation: "**Dijkstra:** Findet kürzeste Pfade von einem Startknoten zu allen anderen in gewichteten Graphen (keine negativen Kanten). **Komplexität:** O((V + E) log V) mit Priority Queue. **IHK-Anwendung:** GPS-Navigation, Netzwerk-Routing, Spieltheorie. **Greedy-Ansatz:** Wählt immer nächsten Knoten mit geringster Distanz."
        },
        {
          question: "Was charakterisiert einen Graphen?",
          options: ["Nur Bäume möglich", "Knoten (Vertices) und Kanten (Edges)", "Immer azyklisch", "Maximal 10 Knoten"],
          correctIndex: 1,
          explanation: "**Graph G = (V, E):** V = Knoten-Menge, E = Kanten-Menge. **Typen:** Gerichtet/Ungerichtet, Gewichtet/Ungewichtet, Zyklisch/Azyklisch. **Darstellung:** Adjazenzmatrix (Space O(V²)), Adjazenzliste (Space O(V + E)). **IHK-Algorithmen:** DFS, BFS, Dijkstra, Kruskal (MST), Topologische Sortierung."
        },
        {
          question: "Welche Eigenschaft hat ein Heap?",
          options: ["Binärer Baum mit Heap-Eigenschaft", "Sortierte Reihenfolge", "Balancierte Höhe", "Nur positive Zahlen"],
          correctIndex: 0,
          explanation: "**Heap-Eigenschaft:** Parent ≥ Children (Max-Heap) oder Parent ≤ Children (Min-Heap). **Vollständiger binärer Baum:** Alle Ebenen voll außer letzter (linksbündig). **Operationen:** Insert/Delete O(log n), getMax/Min O(1). **IHK-Anwendung:** Priority Queue, Heapsort, Dijkstra-Algorithmus. **Array-Implementierung:** Parent at i/2, Children at 2i, 2i+1."
        },
        {
          question: "Was ist Dynamic Programming?",
          options: ["Programmierung zur Laufzeit", "Optimierungstechnik mit Subproblem-Wiederverwendung", "Objektorientierte Programmierung", "Web-Entwicklung"],
          correctIndex: 1,
          explanation: "**Dynamic Programming:** Löst komplexe Probleme durch Aufteilen in Teilprobleme, speichert Zwischenergebnisse (Memoization). **Voraussetzung:** Optimal Substructure + Overlapping Subproblems. **IHK-Beispiele:** Fibonacci (O(n) statt O(2ⁿ)), Knapsack Problem, Longest Common Subsequence. **Bottom-Up vs. Top-Down Ansatz.**"
        }
      ]
    },
    {
      type: "matching",
      title: "Programmierkonzepte zuordnen - IHK-Wissen",
      pairs: [
        { left: "Bubble Sort", right: "O(n²) - Einfacher Sortieralgorithmus mit Nachbarn-Vergleichen" },
        { left: "Binary Search", right: "O(log n) - Suche in sortiertem Array durch Halbierung" },
        { left: "Hash Table", right: "O(1) - Schlüssel-Wert-Zugriff über Hash-Funktion" },
        { left: "Depth-First Search", right: "Graph-Traversierung mit Stack oder Rekursion" },
        { left: "Singleton Pattern", right: "Design Pattern für genau eine Klasseninstanz" },
        { left: "MVC Pattern", right: "Model-View-Controller Architekturmuster" },
        { left: "Rekursion", right: "Funktion ruft sich selbst auf (mit Base Case)" },
        { left: "Call by Reference", right: "Parameter-Übergabe über Speicheradresse" }
      ]
    },
    {
      type: "code",
      title: "IHK-Prüfungsaufgaben Programmierung",
      challenges: [
        {
          title: "Binäre Suche implementieren",
          description: "Implementiere die binäre Suche für ein sortiertes Array. **IHK-Lernziel:** Verstehe das Halbierungsprinzip und die O(log n) Komplexität. Die Funktion soll den Index des gesuchten Elements zurückgeben oder -1 falls nicht gefunden.",
          initialCode: "function binarySearch(arr, target) {\n  // Implementiere die binäre Suche\n  // Rückgabe: Index des Elements oder -1\n  let left = 0;\n  let right = arr.length - 1;\n  \n  // Dein Code hier\n}",
          solution: "function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  \n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    \n    if (arr[mid] === target) {\n      return mid;\n    } else if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  \n  return -1;\n}",
          tests: [
            { input: "[1,3,5,7,9], 5", expected: "2" },
            { input: "[1,3,5,7,9], 6", expected: "-1" },
            { input: "[10,20,30], 10", expected: "0" }
          ]
        },
        {
          title: "Fakultät berechnen - Rekursiv vs. Iterativ",
          description: "Implementiere die Fakultätsberechnung sowohl rekursiv als auch iterativ. **IHK-Lernziel:** Verstehe den Unterschied zwischen beiden Ansätzen bezüglich Speicherverbrauch und Performance.",
          initialCode: "// Rekursive Lösung\nfunction faktorialRecursive(n) {\n  // Implementiere rekursive Fakultät\n  // Vergiss nicht den Base Case!\n}\n\n// Iterative Lösung  \nfunction faktorialIterative(n) {\n  // Implementiere iterative Fakultät\n  // Verwende eine Schleife\n}",
          solution: "// Rekursive Lösung\nfunction faktorialRecursive(n) {\n  if (n === 0 || n === 1) {\n    return 1; // Base Case\n  }\n  return n * faktorialRecursive(n - 1);\n}\n\n// Iterative Lösung\nfunction faktorialIterative(n) {\n  let result = 1;\n  for (let i = 2; i <= n; i++) {\n    result *= i;\n  }\n  return result;\n}",
          tests: [
            { input: "5", expected: "120" },
            { input: "0", expected: "1" },
            { input: "3", expected: "6" }
          ]
        },
        {
          title: "Bubble Sort implementieren",
          description: "Implementiere den Bubble Sort Algorithmus. **IHK-Lernziel:** Verstehe die O(n²) Komplexität und das Prinzip der benachbarten Element-Vergleiche. Der Algorithmus soll das Array in-place sortieren.",
          initialCode: "function bubbleSort(arr) {\n  // Implementiere Bubble Sort\n  // Sortiere das Array aufsteigend\n  // Verwende verschachtelte Schleifen\n  \n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      // Dein Code hier\n    }\n  }\n  \n  return arr;\n}",
          solution: "function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        // Tausche Elemente\n        let temp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = temp;\n      }\n    }\n  }\n  return arr;\n}",
          tests: [
            { input: "[64, 34, 25, 12, 22, 11, 90]", expected: "[11, 12, 22, 25, 34, 64, 90]" },
            { input: "[1]", expected: "[1]" },
            { input: "[3, 1, 2]", expected: "[1, 2, 3]" }
          ]
        }
      ]
    },
    {
      type: "dragdrop",
      title: "IHK-Prüfungswissen Programmierung zuordnen",
      games: [
        {
          title: "Komplexitätsklassen zuordnen",
          description: "**IHK-Lernziel:** Erkenne die Zeitkomplexität verschiedener Algorithmen und ordne sie den entsprechenden Big-O-Klassen zu.",
          items: [
            { id: "array-access", content: "Array-Zugriff arr[i]", category: "O(1) - Konstant" },
            { id: "linear-search", content: "Lineare Suche", category: "O(n) - Linear" },
            { id: "binary-search", content: "Binäre Suche", category: "O(log n) - Logarithmisch" },
            { id: "bubble-sort", content: "Bubble Sort", category: "O(n²) - Quadratisch" },
            { id: "merge-sort", content: "Merge Sort", category: "O(n log n) - Quasi-linear" },
            { id: "hash-lookup", content: "Hash-Table Zugriff", category: "O(1) - Konstant" },
            { id: "nested-loops", content: "Verschachtelte For-Schleifen", category: "O(n²) - Quadratisch" },
            { id: "tree-height", content: "Baum-Höhe Bestimmung", category: "O(log n) - Logarithmisch" }
          ],
          categories: ["O(1) - Konstant", "O(log n) - Logarithmisch", "O(n) - Linear", "O(n log n) - Quasi-linear", "O(n²) - Quadratisch"]
        },
        {
          title: "Design Patterns kategorisieren",
          description: "**IHK-Wissen:** Ordne die Design Patterns ihren Kategorien zu. Diese kommen oft in IHK-Prüfungen vor.",
          items: [
            { id: "singleton", content: "Singleton", category: "Creational (Erzeugungsmuster)" },
            { id: "factory", content: "Factory Method", category: "Creational (Erzeugungsmuster)" },
            { id: "builder", content: "Builder", category: "Creational (Erzeugungsmuster)" },
            { id: "adapter", content: "Adapter", category: "Structural (Strukturmuster)" },
            { id: "decorator", content: "Decorator", category: "Structural (Strukturmuster)" },
            { id: "facade", content: "Facade", category: "Structural (Strukturmuster)" },
            { id: "observer", content: "Observer", category: "Behavioral (Verhaltensmuster)" },
            { id: "strategy", content: "Strategy", category: "Behavioral (Verhaltensmuster)" }
          ],
          categories: ["Creational (Erzeugungsmuster)", "Structural (Strukturmuster)", "Behavioral (Verhaltensmuster)"]
        }
      ]
    },
    {
      type: "memory",
      title: "Programmierung Memory - IHK-Begriffe",
      games: [
        {
          title: "Algorithmus-Komplexität Memory",
          description: "**IHK-Prüfungsvorbereitung:** Lerne die Zeitkomplexitäten der wichtigsten Algorithmen auswendig!",
          pairs: [
            { id: "linear-search", content: "Lineare Suche", match: "O(n) - Durchläuft jedes Element" },
            { id: "binary-search", content: "Binäre Suche", match: "O(log n) - Halbiert Suchbereich" },
            { id: "bubble-sort", content: "Bubble Sort", match: "O(n²) - Vergleicht alle Nachbarn" },
            { id: "quick-sort", content: "Quick Sort", match: "O(n log n) - Divide & Conquer" },
            { id: "hash-access", content: "Hash-Zugriff", match: "O(1) - Direkter Speicherzugriff" },
            { id: "tree-traversal", content: "Baum-Traversierung", match: "O(n) - Besucht jeden Knoten einmal" }
          ]
        },
        {
          title: "OOP-Konzepte Memory",
          description: "**IHK-Kernwissen:** Verstehe die Grundprinzipien der objektorientierten Programmierung.",
          pairs: [
            { id: "encapsulation", content: "Kapselung", match: "Information Hiding - Private/Public" },
            { id: "inheritance", content: "Vererbung", match: "Is-A Beziehung - Unterklassen" },
            { id: "polymorphism", content: "Polymorphismus", match: "Eine Schnittstelle, verschiedene Implementierungen" },
            { id: "abstraction", content: "Abstraktion", match: "Wesentliche Eigenschaften hervorheben" },
            { id: "constructor", content: "Konstruktor", match: "Initialisiert Objektzustand bei Erstellung" },
            { id: "destructor", content: "Destruktor", match: "Räumt Ressourcen beim Objektabbau auf" }
          ]
        }
      ]
    },
    {
      type: "timeline",
      title: "Geschichte der Programmierung - IHK-Kontext",
      timelines: [
        {
          title: "Evolution der Programmiersprachen",
          description: "**IHK-Bildungsrelevanz:** Verstehe die Entwicklung der Programmierparadigmen und ihre praktischen Auswirkungen.",
          events: [
            { year: "1957", event: "FORTRAN - Erste Hochsprache", description: "**Bedeutung für IHK:** Erste höhere Programmiersprache von IBM. Ermöglichte erstmals mathematische Formeln direkt zu programmieren statt in Assembler. **Heute:** Immer noch in wissenschaftlichen Berechnungen verwendet. **Lernaspekt:** Zeigt Evolution von Maschinencode zu lesbarem Code." },
            { year: "1972", event: "C-Sprache entwickelt", description: "**IHK-Relevanz:** Dennis Ritchie entwickelt C bei Bell Labs. Grundlage für moderne Sprachen (C++, Java, C#). **Schlüsselkonzepte:** Pointer, strukturierte Programmierung, Portabilität. **Heute:** Betriebssysteme, Embedded Systems. **Prüfungswissen:** Unterschied zwischen Compiler und Interpreter." },
            { year: "1985", event: "C++ - Objektorientierung", description: "**IHK-Kernwissen:** Bjarne Stroustrup erweitert C um OOP-Konzepte. **Neue Konzepte:** Klassen, Objekte, Vererbung, Polymorphismus. **Bedeutung:** Paradigmenwechsel zu objektorientierten Systemen. **Prüfungsrelevant:** OOP-Prinzipien, UML-Diagramme, Design Patterns." },
            { year: "1995", event: "Java - Write Once, Run Anywhere", description: "**IHK-Prüfungswissen:** Sun Microsystems entwickelt Java für plattformunabhängige Programmierung. **Kernkonzepte:** Virtual Machine, Bytecode, Garbage Collection. **Enterprise-Fokus:** J2EE für große Anwendungen. **Heute:** Android-Apps, Enterprise-Software, Web-Services." },
            { year: "1995", event: "JavaScript - Web-Programmierung", description: "**Moderne IHK-Relevanz:** Brendan Eich entwickelt JavaScript in 10 Tagen bei Netscape. **Evolution:** Von einfachen Scripts zu komplexen Web-Anwendungen. **Heute:** Full-Stack-Entwicklung mit Node.js, React, Angular. **Prüfungsaspekt:** Client- vs. Server-Side-Programmierung." },
            { year: "2000", event: "C# und .NET Framework", description: "**IHK-Geschäftsrelevanz:** Microsoft's Antwort auf Java. **Konzepte:** Common Language Runtime, Managed Code, starke Typisierung. **Business-Focus:** Enterprise-Anwendungen, Windows-Integration. **Heute:** Cloud-Computing mit Azure, Cross-Platform mit .NET Core." },
            { year: "2010", event: "Mobile Development Boom", description: "**IHK-Praxisbezug:** iOS (Objective-C/Swift) und Android (Java/Kotlin) revolutionieren Software-Entwicklung. **Neue Paradigmen:** Touch-Interfaces, App Stores, Mobile-First Design. **Business Impact:** Neue Geschäftsmodelle, veränderte User Experience." }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Programmier-Szenarien für die IHK-Praxis",
      scenarios: [
        {
          title: "Code Review - Qualitätssicherung",
          description: "**IHK-Praxisszenario:** Software-Qualität sicherstellen",
          scenario: "Ein Kollege hat eine Funktion zur Passwort-Validierung geschrieben, die aber mehrere Probleme aufweist: keine Eingabevalidierung, unsichere String-Vergleiche und schlechte Performance bei großen Inputs. Als Senior-Developer musst du das Review durchführen.",
          choices: [
            { text: "Code sofort ablehnen ohne Begründung", consequence: "**Schlecht für Teamwork:** Demotiviert Kollegen und verhindert Lernen. IHK-Bewertung: Unprofessionell.", isCorrect: false },
            { text: "Konstruktives Feedback mit konkreten Verbesserungsvorschlägen", consequence: "**Beste Lösung:** Fördert Lernen, verbessert Code-Qualität, stärkt Team. IHK-Bewertung: Professionelle Zusammenarbeit.", isCorrect: true },
            { text: "Code heimlich selbst umschreiben", consequence: "**Problematisch:** Kollege lernt nichts, Vertrauen wird beschädigt. IHK-Aspekt: Schlechte Kommunikation.", isCorrect: false },
            { text: "Input-Sanitization, sichere Vergleiche und Algorithmus-Optimierung erklären", consequence: "**Sehr gut:** Technisch korrekt, lehrreich, professionell. IHK-Bewertung: Fachliche Kompetenz gezeigt.", isCorrect: true }
          ]
        },
        {
          title: "Performance-Problem in Produktion",
          description: "**IHK-Szenario:** Kritischer Performance-Bug lösen",
          scenario: "Eine E-Commerce-Webanwendung lädt plötzlich sehr langsam. Kunden beschweren sich und der Umsatz sinkt. Die Datenbank-Queries dauern über 5 Sekunden. Du musst schnell eine Lösung finden und gleichzeitig die Ursache analysieren.",
          choices: [
            { text: "Erstmal mehr Server kaufen ohne Ursachenanalyse", consequence: "**Teuer und ineffektiv:** Löst das Grundproblem nicht. IHK-Bewertung: Unwirtschaftlich, symptomatische Behandlung.", isCorrect: false },
            { text: "Query-Analyse, Index-Optimierung und Code-Profiling durchführen", consequence: "**Professionelle Herangehensweise:** Ursachenforschung vor Symptombehandlung. IHK-Bewertung: Systematische Problemlösung.", isCorrect: true },
            { text: "Komplette Anwendung neu programmieren", consequence: "**Übertrieben:** Zeitaufwendig, riskant, meist unnötig. IHK-Aspekt: Unverhältnismäßiger Aufwand.", isCorrect: false },
            { text: "Monitoring implementieren und schrittweise Optimierung", consequence: "**Langfristig richtig:** Nachhaltige Lösung mit Überwachung. IHK-Bewertung: Präventive Maßnahmen und kontinuierliche Verbesserung.", isCorrect: true }
          ]
        },
        {
          title: "Legacy Code modernisieren",
          description: "**IHK-Praxisfall:** Altsysteme wartbar machen",
          scenario: "Du übernimmst ein 15 Jahre altes System ohne Dokumentation, Tests und mit veralteten Technologien. Der Code funktioniert, aber Änderungen sind sehr riskant und zeitaufwendig. Das Management möchte neue Features, aber das System ist kaum erweiterbar.",
          choices: [
            { text: "Sofort alles neu programmieren", consequence: "**Hohes Risiko:** Sehr teuer, lange Ausfallzeiten, neue Bugs möglich. IHK-Bewertung: Nicht wirtschaftlich durchdachte Lösung.", isCorrect: false },
            { text: "Schrittweise Refactoring mit Tests und Dokumentation", consequence: "**Beste Strategie:** Minimiert Risiko, erhält Funktionalität, verbessert Wartbarkeit. IHK-Bewertung: Professionelle Herangehensweise.", isCorrect: true },
            { text: "Nichts ändern, nur neue Features draufsetzen", consequence: "**Kurzfristig denkend:** Verschlechtert Code-Qualität weiter, technische Schulden wachsen. IHK-Aspekt: Nicht nachhaltig.", isCorrect: false },
            { text: "Reverse Engineering und schrittweise Modernisierung", consequence: "**Durchdachter Ansatz:** Verstehen dann verbessern. IHK-Bewertung: Systematische und risikoarme Modernisierung.", isCorrect: true }
          ]
        }
      ]
    }
  ],

  "it-sicherheit": [
    {
      type: "flashcards",
      title: "IT-Sicherheit Grundlagen - IHK Prüfungswissen", 
      cards: [
        { front: "CIA-Trias der Informationssicherheit", back: "**Confidentiality (Vertraulichkeit):** Schutz vor unbefugtem Zugriff durch Verschlüsselung, Zugriffskontrollen, Authentifizierung. **Integrity (Integrität):** Schutz vor unerlaubter Veränderung durch Hash-Werte, digitale Signaturen, Checksummen. **Availability (Verfügbarkeit):** System ist nutzbar wenn benötigt - durch Redundanz, Backups, DDoS-Schutz. **IHK-Bedeutung:** Grundlage aller Sicherheitsmaßnahmen, rechtliche Compliance (DSGVO), Geschäftskontinuität. **Praxisbeispiel:** Online-Banking muss alle drei Aspekte gleichzeitig gewährleisten." },
        { front: "Authentifizierung vs. Autorisierung", back: "**Authentifizierung:** 'Wer sind Sie?' - Identitätsverifikation durch Faktoren: Wissen (Passwort), Besitz (Token/Karte), Sein (Biometrie). **Multi-Faktor-Authentifizierung (MFA):** Kombination mehrerer Faktoren für höhere Sicherheit. **Autorisierung:** 'Was dürfen Sie?' - Festlegung von Zugriffsrechten nach erfolgreicher Authentifizierung. **IHK-Modelle:** Role-Based Access Control (RBAC), Discretionary Access Control (DAC), Mandatory Access Control (MAC). **Beispiel:** Login mit Passwort + SMS-Code (Auth), dann Zugriff auf bestimmte Dateien (Authz)." },
        { front: "Firewall-Typen und -Funktionen", back: "**Paketfilter:** Prüft Pakete anhand IP, Port, Protokoll - schnell aber oberflächlich. **Stateful Inspection:** Überwacht Verbindungsstatus, bessere Sicherheit. **Application Layer Firewall:** Deep Packet Inspection, anwendungsspezifische Regeln. **Next-Generation Firewall (NGFW):** IPS, Malware-Schutz, URL-Filterung integriert. **IHK-Konfiguration:** DMZ für öffentliche Server, interne Netzwerksegmentierung. **Praxisregeln:** Default Deny, Least Privilege Principle." },
        { front: "Malware-Kategorien", back: "**Virus:** Benötigt Wirtsdatei, repliziert sich durch Benutzerinteraktion. **Wurm:** Selbstständige Verbreitung über Netzwerke, benötigt keine Wirtsdatei. **Trojaner:** Tarnt sich als nützliches Programm, öffnet Hintertüren. **Ransomware:** Verschlüsselt Daten, fordert Lösegeld. **Spyware:** Sammelt heimlich Daten. **Adware:** Zeigt unerwünschte Werbung. **IHK-Schutzmaßnahmen:** Antivirus, Behavior Analysis, Sandboxing, Endpoint Detection Response (EDR)." },
        { front: "Phishing und Social Engineering", back: "**Phishing:** Täuschung via E-Mail/Website zur Datenentwendung. **Spear Phishing:** Zielgerichtete Angriffe auf bestimmte Personen/Unternehmen. **Whaling:** Angriffe auf Führungskräfte. **Social Engineering Techniken:** Autoritätsprinzip, Dringlichkeit, Neugier ausnutzen. **IHK-Gegenmaßnahmen:** Security Awareness Training, E-Mail-Filtering, Multi-Faktor-Authentifizierung, Verifizierungsprozesse. **Red Flags:** Rechtschreibfehler, ungewöhnliche Absender, Dringlichkeit." },
        { front: "Kryptographie-Grundlagen", back: "**Symmetrische Verschlüsselung:** Ein Schlüssel für Ver- und Entschlüsselung (AES). Schnell, aber Schlüsselaustausch problematisch. **Asymmetrische Verschlüsselung:** Schlüsselpaar (Public/Private Key, RSA). Sicher für Schlüsselaustausch, aber langsam. **Hybrid-Verfahren:** Asymmetrisch für Schlüsselaustausch, symmetrisch für Daten. **Hash-Funktionen:** Einweg-Funktion für Integritätsprüfung (SHA-256). **IHK-Anwendungen:** HTTPS, digitale Signaturen, Passwort-Hashing." },
        { front: "Backup-Strategien", back: "**3-2-1-Regel:** 3 Kopien der Daten, 2 verschiedene Medien, 1 offsite. **Backup-Arten:** Vollbackup (komplett), inkrementell (nur Änderungen seit letztem Backup), differenziell (Änderungen seit letztem Vollbackup). **IHK-Planung:** Recovery Time Objective (RTO), Recovery Point Objective (RPO). **Tests:** Regelmäßige Restore-Tests essentiell. **Ransomware-Schutz:** Air-gapped Backups, Immutable Storage, separate Netzwerke." },
        { front: "Zero-Day-Exploits", back: "**Definition:** Angriff auf bisher unbekannte Schwachstelle, bevor Patch verfügbar ist. **Lebenszyklus:** Vulnerability Discovery → Exploit Development → Attack → Detection → Patch → Deployment. **IHK-Schutzmaßnahmen:** Behavior-Based Detection, Application Whitelisting, Sandbox-Umgebungen, Intrusion Prevention Systems (IPS). **Herausforderung:** Keine Signaturen verfügbar, daher heuristische Methoden nötig. **Bug Bounty:** Belohnung für verantwortliche Disclosure." },
        { front: "SIEM und Log-Management", back: "**Security Information and Event Management:** Zentrale Sammlung und Korrelation von Security Events. **Funktionen:** Real-time Monitoring, Incident Response, Compliance Reporting, Threat Intelligence Integration. **Log-Quellen:** Firewalls, IDS/IPS, Server, Anwendungen, Endgeräte. **IHK-Herausforderungen:** Big Data, False Positives reduzieren, SOC-Integration. **SOAR:** Security Orchestration, Automation and Response für automatisierte Reaktionen." },
        { front: "Penetrationstesting", back: "**Definition:** Autorisierte simulierte Angriffe zur Schwachstellenidentifikation. **Phasen:** Reconnaissance → Scanning → Gaining Access → Maintaining Access → Analysis/Reporting. **Arten:** Black Box (keine Vorkenntnisse), White Box (vollständige Informationen), Gray Box (teilweise Kenntnisse). **IHK-Standards:** OWASP Testing Guide, PTES, NIST SP 800-115. **Red Team vs. Blue Team:** Angreifer vs. Verteidiger Simulation. **Bug Bounty Programme:** Kontinuierliche Community-basierte Tests." },
        { front: "Incident Response", back: "**NIST-Phasen:** Preparation → Detection/Analysis → Containment/Eradication/Recovery → Post-Incident Activity. **IHK-Team:** CSIRT (Computer Security Incident Response Team) mit definierten Rollen. **Preparation:** Playbooks, Tools, Kommunikationswege, rechtliche Aspekte. **Detection:** SIEM-Alerts, User Reports, Threat Hunting. **Containment:** Isolation ohne Beweiszerstörung. **Forensik:** Chain of Custody, Imaging, Timeline-Rekonstruktion. **Lessons Learned:** Process Improvement nach jedem Incident." }
      ]
    },
    {
      type: "quiz",
      title: "IT-Sicherheit Vertiefung - IHK Prüfung",
      questions: [
        {
          question: "Welche Verschlüsselungsmethode eignet sich am besten für die sichere Übertragung großer Datenmengen?",
          options: ["Nur asymmetrische Verschlüsselung", "Nur symmetrische Verschlüsselung", "Hybrid-Verfahren", "Hash-Funktionen"],
          correctIndex: 2,
          explanation: "Hybrid-Verfahren kombinieren die Vorteile beider Methoden: Asymmetrische Verschlüsselung für sicheren Schlüsselaustausch, symmetrische für schnelle Datenübertragung."
        },
        {
          question: "Was ist der Hauptunterschied zwischen einem Virus und einem Wurm?",
          options: ["Viren sind gefährlicher", "Würmer benötigen keine Wirtsdatei", "Viren verbreiten sich schneller", "Würmer sind älter"],
          correctIndex: 1,
          explanation: "Würmer können sich selbstständig über Netzwerke verbreiten, während Viren eine Wirtsdatei benötigen und sich durch Benutzerinteraktion verbreiten."
        },
        {
          question: "Welcher Firewall-Typ bietet die beste Anwendungssicherheit?",
          options: ["Paketfilter", "Stateful Inspection", "Application Layer Firewall", "NAT-Firewall"],
          correctIndex: 2,
          explanation: "Application Layer Firewalls (Layer 7) können den Anwendungsinhalt inspizieren und anwendungsspezifische Angriffe erkennen."
        },
        {
          question: "Was beschreibt die 3-2-1-Backup-Regel?",
          options: ["3 Tage, 2 Wochen, 1 Monat Aufbewahrung", "3 Kopien, 2 Medien, 1 offsite", "3 Server, 2 Standorte, 1 Cloud", "3 Admins, 2 Prozesse, 1 Dokumentation"],
          correctIndex: 1,
          explanation: "Die 3-2-1-Regel besagt: 3 Kopien der Daten, auf 2 verschiedenen Medientypen, mit 1 Kopie an einem externen Standort."
        },
        {
          question: "Welche Authentifizierungsfaktoren gibt es in der Multi-Faktor-Authentifizierung?",
          options: ["Nur Passwörter", "Wissen, Besitz, Biometrie", "Nur Hardware-Token", "Nur biometrische Daten"],
          correctIndex: 1,
          explanation: "MFA nutzt verschiedene Faktoren: Wissen (Passwort), Besitz (Token/Karte) und biometrische Eigenschaften (Fingerabdruck)."
        },
        {
          question: "Was ist ein Zero-Day-Exploit?",
          options: ["Ein sehr schneller Angriff", "Angriff auf unbekannte Schwachstelle", "Angriff ohne Internetverbindung", "Angriff am ersten Tag"],
          correctIndex: 1,
          explanation: "Zero-Day-Exploits nutzen Schwachstellen aus, die noch nicht öffentlich bekannt sind und für die noch kein Patch verfügbar ist."
        },
        {
          question: "Welcher Port wird standardmäßig für HTTPS verwendet?",
          options: ["80", "443", "8080", "22"],
          correctIndex: 1,
          explanation: "HTTPS (HTTP Secure) verwendet standardmäßig Port 443 für SSL/TLS-verschlüsselte Verbindungen."
        },
        {
          question: "Was ist der Hauptzweck von SIEM-Systemen?",
          options: ["Antivirus-Schutz", "Zentrale Sicherheitsereignis-Korrelation", "Firewall-Management", "Passwort-Verwaltung"],
          correctIndex: 1,
          explanation: "SIEM (Security Information and Event Management) sammelt und korreliert Sicherheitsereignisse aus verschiedenen Quellen für zentrale Überwachung."
        }
      ]
    },
    {
      type: "matching",
      title: "Sicherheitskonzepte zuordnen",
      pairs: [
        { left: "Vertraulichkeit", right: "Schutz vor unbefugtem Zugriff auf Informationen" },
        { left: "Integrität", right: "Schutz vor unerlaubter Veränderung von Daten" },
        { left: "Verfügbarkeit", right: "System ist nutzbar wenn benötigt" },
        { left: "Authentifizierung", right: "Verifikation der Identität eines Benutzers" },
        { left: "Autorisierung", right: "Festlegung von Zugriffsrechten" },
        { left: "Non-Repudiation", right: "Nicht-Abstreitbarkeit von Aktionen" },
        { left: "Accountability", right: "Nachverfolgbarkeit von Aktionen" },
        { left: "Privacy", right: "Schutz persönlicher Informationen" }
      ]
    },
    {
      type: "code",
      title: "Sichere Programmierung - IHK Praxis",
      challenges: [
        {
          title: "SQL-Injection Prevention",
          description: "Implementiere eine sichere Datenbankabfrage mit Prepared Statements",
          initialCode: `// UNSICHER - SQL Injection möglich
const getUserData = (userId) => {
  const query = "SELECT * FROM users WHERE id = " + userId;
  return db.query(query);
};

// Implementiere sichere Version:
const secureGetUserData = (userId) => {
  // Dein Code hier
};`,
          solution: `const secureGetUserData = (userId) => {
  // Input Validation
  if (!userId || isNaN(userId)) {
    throw new Error('Invalid user ID');
  }
  
  // Prepared Statement mit Parametern
  const query = "SELECT id, username, email FROM users WHERE id = ?";
  return db.prepare(query).get(parseInt(userId));
};

// Alternative mit ORM (z.B. Sequelize)
const secureGetUserDataORM = async (userId) => {
  return await User.findByPk(userId, {
    attributes: ['id', 'username', 'email'] // Nur benötigte Felder
  });
};`,
          tests: [
            { input: "secureGetUserData(1)", expected: "Parametrisierte Abfrage ohne Injection-Risiko" },
            { input: "secureGetUserData('1; DROP TABLE users--')", expected: "Sichere Behandlung von Injection-Versuchen" }
          ]
        },
        {
          title: "XSS-Schutz implementieren",
          description: "Erstelle Funktionen zum Schutz vor Cross-Site-Scripting",
          initialCode: `// UNSICHER - XSS möglich
const displayUserComment = (comment) => {
  document.getElementById('comment').innerHTML = comment;
};

// Implementiere XSS-sichere Version:
const safeDisplayUserComment = (comment) => {
  // Dein Code hier
};`,
          solution: `// HTML Escaping Funktion
const escapeHtml = (text) => {
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  return String(text).replace(/[&<>"'/]/g, match => htmlEscapes[match]);
};

// Sichere Anzeige von Benutzerkommentaren
const safeDisplayUserComment = (comment) => {
  // Input Validation
  if (typeof comment !== 'string') {
    comment = String(comment);
  }
  
  // HTML Escaping
  const escapedComment = escapeHtml(comment);
  
  // Sichere DOM-Manipulation
  const commentElement = document.getElementById('comment');
  commentElement.textContent = comment; // textContent ist XSS-sicher
  
  // Oder mit innerHTML und escaped content:
  // commentElement.innerHTML = escapedComment;
};

// Content Security Policy Header setzen (Server-seitig)
const setCSPHeader = (res) => {
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'");
};`,
          tests: [
            { input: "safeDisplayUserComment('<script>alert(\"XSS\")</script>')", expected: "Kein JavaScript-Code wird ausgeführt" },
            { input: "safeDisplayUserComment('Normaler Text')", expected: "Text wird korrekt angezeigt" }
          ]
        },
        {
          title: "Sichere Passwort-Handhabung",
          description: "Implementiere sichere Passwort-Hashing und -Verifikation",
          initialCode: `// UNSICHER - Klartext-Passwörter
const storePassword = (password) => {
  return db.query("INSERT INTO users SET password = ?", [password]);
};

// Implementiere sichere Passwort-Handhabung:
const securePasswordHandling = {
  // Dein Code hier
};`,
          solution: `const bcrypt = require('bcrypt');
const crypto = require('crypto');

const securePasswordHandling = {
  // Passwort-Stärke prüfen
  validatePassword: (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: password.length >= minLength && hasUpperCase && 
               hasLowerCase && hasNumbers && hasSpecialChar,
      errors: {
        tooShort: password.length < minLength,
        noUpperCase: !hasUpperCase,
        noLowerCase: !hasLowerCase,
        noNumbers: !hasNumbers,
        noSpecialChar: !hasSpecialChar
      }
    };
  },
  
  // Passwort hashen
  hashPassword: async (password) => {
    const saltRounds = 12; // Höherer Wert = sicherer aber langsamer
    return await bcrypt.hash(password, saltRounds);
  },
  
  // Passwort verifizieren
  verifyPassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },
  
  // Sichere Passwort-Speicherung
  storePassword: async (userId, password) => {
    const validation = this.validatePassword(password);
    if (!validation.isValid) {
      throw new Error('Password does not meet security requirements');
    }
    
    const hashedPassword = await this.hashPassword(password);
    return db.query("UPDATE users SET password_hash = ?, salt = ? WHERE id = ?", 
                   [hashedPassword, crypto.randomBytes(16).toString('hex'), userId]);
  }
};`,
          tests: [
            { input: "hashPassword('Test123!')", expected: "Bcrypt-Hash mit Salt generiert" },
            { input: "validatePassword('weak')", expected: "Passwort-Validierung schlägt fehl" }
          ]
        }
      ]
    },
    {
      type: "dragdrop",
      title: "IT-Sicherheit Kategorisierung",
      games: [
        {
          title: "Bedrohungen nach Kategorien sortieren",
          description: "Ordne die verschiedenen IT-Sicherheitsbedrohungen den richtigen Kategorien zu",
          items: [
            { id: "malware1", content: "Virus", category: "Malware" },
            { id: "malware2", content: "Trojaner", category: "Malware" },
            { id: "malware3", content: "Ransomware", category: "Malware" },
            { id: "social1", content: "Phishing", category: "Social Engineering" },
            { id: "social2", content: "Pretexting", category: "Social Engineering" },
            { id: "social3", content: "Baiting", category: "Social Engineering" },
            { id: "network1", content: "Man-in-the-Middle", category: "Netzwerk-Angriffe" },
            { id: "network2", content: "DDoS", category: "Netzwerk-Angriffe" },
            { id: "network3", content: "DNS Spoofing", category: "Netzwerk-Angriffe" }
          ],
          categories: ["Malware", "Social Engineering", "Netzwerk-Angriffe"]
        },
        {
          title: "Sicherheitsmaßnahmen zuordnen",
          description: "Kategorisiere die Sicherheitsmaßnahmen nach ihrem Typ",
          items: [
            { id: "tech1", content: "Firewall", category: "Technische Maßnahmen" },
            { id: "tech2", content: "Antivirus", category: "Technische Maßnahmen" },
            { id: "tech3", content: "Verschlüsselung", category: "Technische Maßnahmen" },
            { id: "org1", content: "Security Awareness Training", category: "Organisatorische Maßnahmen" },
            { id: "org2", content: "Sicherheitsrichtlinien", category: "Organisatorische Maßnahmen" },
            { id: "org3", content: "Incident Response Plan", category: "Organisatorische Maßnahmen" },
            { id: "phys1", content: "Zugangskontrollen", category: "Physische Maßnahmen" },
            { id: "phys2", content: "Überwachungskameras", category: "Physische Maßnahmen" },
            { id: "phys3", content: "Serverraum-Sicherheit", category: "Physische Maßnahmen" }
          ],
          categories: ["Technische Maßnahmen", "Organisatorische Maßnahmen", "Physische Maßnahmen"]
        }
      ]
    }
  ],

  "betriebssysteme": [
    {
      type: "flashcards",
      title: "Betriebssysteme Grundlagen - IHK Praxis",
      cards: [
        { front: "Was ist ein Betriebssystem?", back: "**Definition:** Systemsoftware, die Hardware-Ressourcen verwaltet und Schnittstelle zwischen Hardware und Anwendungssoftware bildet. **IHK-Kernfunktionen:** Prozessverwaltung, Speicherverwaltung, Dateisystemverwaltung, Ein-/Ausgabeverwaltung, Benutzerverwaltung. **Beispiele:** Windows, Linux, macOS, Unix. **Bedeutung:** Ermöglicht Multitasking, Ressourcen-Sharing, Sicherheit und Benutzerfreundlichkeit." },
        { front: "Prozess vs. Thread", back: "**Prozess:** Eigenständiges Programm mit eigenem Speicherbereich, vollständige Isolation, aufwendiger Kontext-Switch. **Thread:** Leichtgewichtiger Ausführungsstrang innerhalb eines Prozesses, teilt Speicher mit anderen Threads des Prozesses, schneller Kontext-Switch. **IHK-Vorteile Threads:** Bessere Parallelisierung, effizienter Ressourcenverbrauch, schnellere Kommunikation. **Synchronisation:** Mutex, Semaphore, Critical Sections notwendig." },
        { front: "Virtueller Speicher", back: "**Konzept:** Illusion eines größeren Arbeitsspeichers durch Auslagerung auf Festplatte. **Paging:** Speicher in gleichgroße Seiten unterteilt, Pages werden bei Bedarf geladen. **Swapping:** Komplette Prozesse werden ausgelagert. **IHK-Vorteile:** Mehr Programme gleichzeitig, Speicherschutz zwischen Prozessen, Speicherfragmentierung reduziert. **Page Fault:** Zugriff auf nicht geladene Seite löst Interrupt aus." },
        { front: "Dateisysteme im Vergleich", back: "**NTFS (Windows):** Journaling, Zugriffsrechte, Verschlüsselung, große Dateien. **ext4 (Linux):** Journaling, Extents, Online-Defragmentierung. **FAT32:** Einfach, kompatibel, aber 4GB-Dateilimit. **APFS (macOS):** Copy-on-Write, Snapshots, Verschlüsselung. **IHK-Auswahlkriterien:** Betriebssystem, Dateigröße, Performance-Anforderungen, Sicherheit. **Cluster:** Kleinste Speichereinheit des Dateisystems." },
        { front: "Scheduling-Algorithmen", back: "**FCFS (First Come First Served):** Einfach, aber keine Optimierung. **SJF (Shortest Job First):** Minimiert durchschnittliche Wartezeit. **Round Robin:** Zeitscheiben für faire Verteilung, gut für interaktive Systeme. **Priority Scheduling:** Wichtige Prozesse zuerst, Gefahr von Starvation. **IHK-Multitasking:** Preemptive (unterbrechbar) vs. Cooperative (freiwillige Abgabe). **Context Switch:** Wechsel zwischen Prozessen kostet Zeit." },
        { front: "Deadlock-Behandlung", back: "**Definition:** Zwei oder mehr Prozesse blockieren sich gegenseitig beim Warten auf Ressourcen. **Bedingungen:** Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait. **IHK-Strategien:** Prevention (Bedingungen verhindern), Avoidance (sichere Zustände), Detection (erkennen und auflösen), Recovery (Prozess beenden/Ressourcen entziehen). **Banker's Algorithm:** Klassisches Verfahren zur Deadlock-Vermeidung." },
        { front: "Boot-Prozess im Detail", back: "**BIOS/UEFI:** Hardware-Initialisierung, POST (Power-On Self Test). **Bootloader:** GRUB (Linux), Windows Boot Manager lädt Kernel. **Kernel-Initialisierung:** Hardware-Erkennung, Treiber laden, Grunddienste starten. **Init-Prozess:** Erstes User-Space-Programm, startet Systemdienste. **IHK-Sicherheit:** Secure Boot, TPM-Integration, Boot-Reihenfolge. **Dual Boot:** Mehrere Betriebssysteme auf einem System." },
        { front: "Linux-Dateiberechtigungen", back: "**Format:** drwxrwxrwx (Typ + Owner + Group + Others). **Rechte:** r=4 (read), w=2 (write), x=1 (execute). **Beispiele:** 755 = rwxr-xr-x, 644 = rw-r--r--. **IHK-Befehle:** chmod (ändern), chown (Besitzer), chgrp (Gruppe). **Spezial-Bits:** SUID, SGID, Sticky Bit. **umask:** Standard-Berechtigungen für neue Dateien." },
        { front: "Windows Registry", back: "**Zweck:** Zentrale Konfigurationsdatenbank für Windows und Anwendungen. **Hauptschlüssel:** HKEY_CURRENT_USER, HKEY_LOCAL_MACHINE, HKEY_CLASSES_ROOT. **Datentypen:** REG_SZ (String), REG_DWORD (32-Bit), REG_BINARY. **IHK-Tools:** regedit (grafisch), reg (Kommandozeile). **Sicherung:** Backup vor Änderungen essentiell. **Probleme:** Registry-Bloat, Korruption bei unsachgemäßer Bearbeitung." },
        { front: "Systemüberwachung und Performance", back: "**Windows:** Task Manager, Performance Monitor, Resource Monitor. **Linux:** top, htop, ps, iotop, netstat. **IHK-Metriken:** CPU-Auslastung, RAM-Verbrauch, Disk I/O, Netzwerk-Traffic. **Bottleneck-Analyse:** Schwachstellen im System identifizieren. **Logfiles:** Ereignisanzeige (Windows), /var/log (Linux). **Automatisierung:** Scripts für regelmäßige Überwachung." }
      ]
    },
    {
      type: "quiz",
      title: "Betriebssysteme Vertiefung",
      questions: [
        {
          question: "Was ist der Hauptunterschied zwischen einem Prozess und einem Thread?",
          options: ["Threads sind schneller", "Prozesse haben eigenen Speicherbereich", "Threads können nicht kommunizieren", "Prozesse sind leichtgewichtiger"],
          correctIndex: 1,
          explanation: "Prozesse haben ihren eigenen isolierten Speicherbereich, während Threads den Speicher innerhalb eines Prozesses teilen."
        },
        {
          question: "Welche Deadlock-Bedingung kann durch Timeouts verhindert werden?",
          options: ["Mutual Exclusion", "Hold and Wait", "No Preemption", "Circular Wait"],
          correctIndex: 1,
          explanation: "Hold and Wait kann durch Timeouts verhindert werden - Prozesse geben Ressourcen nach bestimmter Zeit wieder frei."
        },
        {
          question: "Was bedeutet die Linux-Berechtigung 755?",
          options: ["rwxr-xr-x", "rw-rw-rw-", "rwxrwxrwx", "r--r--r--"],
          correctIndex: 0,
          explanation: "755 bedeutet: Owner hat rwx (7), Group hat r-x (5), Others haben r-x (5)."
        },
        {
          question: "Welcher Scheduling-Algorithmus ist am besten für interaktive Systeme?",
          options: ["FCFS", "SJF", "Round Robin", "Priority Scheduling"],
          correctIndex: 2,
          explanation: "Round Robin mit Zeitscheiben gewährleistet faire Verteilung und schnelle Reaktionszeiten für interaktive Anwendungen."
        },
        {
          question: "Was passiert bei einem Page Fault?",
          options: ["System stürzt ab", "Speicherseite wird von Festplatte geladen", "Prozess wird beendet", "CPU wird neugestartet"],
          correctIndex: 1,
          explanation: "Ein Page Fault tritt auf, wenn auf eine nicht im RAM befindliche Speicherseite zugegriffen wird. Das OS lädt die Seite von der Festplatte."
        }
      ]
    }
  ],

  // Map webentwicklung to web-technologien and netzwerke to netzwerktechnik for consistency
  "webentwicklung": webentwicklungContent,
  "web-technologien": webentwicklungContent,
  "netzwerke": [
    {
      type: "flashcards",
      title: "Netzwerk-Grundlagen - IHK Prüfungswissen",
      cards: [
        { front: "OSI-Modell Layer im Detail", back: "**Layer 1 - Physical:** Bits übertragen, Kabel, Hubs. **Layer 2 - Data Link:** Frames, MAC-Adressen, Switches, Ethernet. **Layer 3 - Network:** Routing, IP-Adressen, Router. **Layer 4 - Transport:** TCP/UDP, End-to-End Kommunikation. **Layer 5 - Session:** Sitzungsmanagement, NetBIOS. **Layer 6 - Presentation:** Verschlüsselung, Komprimierung. **Layer 7 - Application:** HTTP, FTP, SMTP. **IHK-Bedeutung:** Systematische Fehlersuche, Protokoll-Zuordnung." },
        { front: "TCP vs. UDP im Detail", back: "**TCP (Transmission Control Protocol):** Verbindungsorientiert, zuverlässig, Reihenfolge garantiert, Fehlererkennung/korrektur, Überlastkontrolle. **Verwendung:** HTTP/HTTPS, FTP, SMTP, SSH. **UDP (User Datagram Protocol):** Verbindungslos, unzuverlässig, schnell, geringer Overhead. **Verwendung:** DNS, DHCP, Streaming, Gaming. **IHK-Entscheidung:** Zuverlässigkeit vs. Geschwindigkeit. **Header-Größe:** TCP 20+ Bytes, UDP 8 Bytes." },
        { front: "IPv4 Subnetting beherrschen", back: "**CIDR-Notation:** /24 = 255.255.255.0, /16 = 255.255.0.0. **Subnetz berechnen:** Netzwerk-ID, Broadcast-Adresse, verwendbare IPs. **Beispiel:** 192.168.1.0/26 → 64 IPs, 62 verwendbar. **VLSM (Variable Length Subnet Masking):** Effiziente IP-Nutzung. **IHK-Praxis:** Netzwerk-Design, IP-Verteilung planen. **Private Bereiche:** 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16." },
        { front: "DHCP-Prozess DORA", back: "**Discover:** Client sendet Broadcast-Anfrage nach DHCP-Server. **Offer:** Server antwortet mit IP-Angebot. **Request:** Client akzeptiert Angebot und fordert IP an. **Acknowledge:** Server bestätigt und weist IP zu. **IHK-Konfiguration:** Lease-Zeit, Reservierungen, Optionen (DNS, Gateway). **Relay Agent:** DHCP über Subnetz-Grenzen hinweg. **Problembehebung:** ipconfig /release, /renew (Windows), dhclient (Linux)." },
        { front: "DNS-Hierarchie und -Auflösung", back: "**Hierarchie:** Root-Server → TLD-Server (.com, .de) → Authoritative Name Server. **Auflösung:** Recursive (DNS-Server macht alles) vs. Iterative (Client fragt mehrere Server). **IHK-Records:** A (IPv4), AAAA (IPv6), MX (Mail), CNAME (Alias), NS (Name Server), PTR (Reverse). **Caching:** TTL (Time To Live) reduziert Abfragen. **Tools:** nslookup, dig, host." },
        { front: "Switching vs. Routing", back: "**Switch (Layer 2):** MAC-Tabelle, Forwarding-Entscheidungen basierend auf MAC-Adressen, Collision-Domain pro Port, ein Broadcast-Domain. **Router (Layer 3):** Routing-Tabelle, IP-basierte Weiterleitung, Subnetz-Verbindung, separate Broadcast-Domains. **IHK-Funktionen:** Switch - VLAN, STP; Router - NAT, Firewall, QoS. **Managed Switch:** Konfigurierbar, SNMP, Port-Mirroring." },
        { front: "VLAN-Konzepte", back: "**Zweck:** Logische Trennung in physischen Netzwerken, Sicherheit, Broadcast-Domain-Reduzierung. **Arten:** Port-based (Access), Tag-based (Trunk), Protocol-based. **IEEE 802.1Q:** VLAN-Tagging-Standard, 4-Byte-Header. **IHK-Konfiguration:** Access-Ports (ein VLAN), Trunk-Ports (mehrere VLANs). **Inter-VLAN-Routing:** Router oder Layer-3-Switch nötig. **Native VLAN:** Untagged Traffic auf Trunk." },
        { front: "Wireless-Standards", back: "**802.11 Evolution:** a/b/g (Legacy), n (WiFi 4), ac (WiFi 5), ax (WiFi 6). **Frequenzen:** 2.4 GHz (längere Reichweite, mehr Interferenz), 5 GHz (schneller, weniger überfüllt). **IHK-Sicherheit:** WPA3 (aktuell), WPA2 (veraltet), WEP (unsicher). **MIMO:** Multiple Input Multiple Output für höhere Geschwindigkeiten. **Roaming:** Nahtloser Wechsel zwischen Access Points." },
        { front: "Network Address Translation (NAT)", back: "**Zweck:** Private IPs in öffentliche übersetzen, IPv4-Adress-Knappheit lösen. **Typen:** Static NAT (1:1), Dynamic NAT (Pool), PAT/NAPT (Port-basiert). **IHK-Vorteile:** Sicherheit durch Verstecken interner Struktur, IP-Wiederverwendung. **Nachteile:** Peer-to-Peer Probleme, Protokoll-Einschränkungen. **Port Forwarding:** Externe Zugriffe auf interne Services." }
      ]
    }
  ],
  netzwerktechnik: [
    {
      type: "flashcards",
      title: "Magic Number Subnetting - IHK Prüfungsmethode",
      cards: [
        { front: "Magic Number Methode - Grundprinzip", back: "**Magic Number = 256 - Subnetmaske-Oktett.** Beispiel: /26 → Maske 255.255.255.192 → Magic Number = 256-192 = 64. **Verwendung:** Schnelle Berechnung von Subnetz-Grenzen, Host-Bereichen und Broadcast-Adressen. **IHK-Vorteil:** Kopfrechnung statt binärer Umrechnung. **Schritte:** 1. Magic Number ermitteln, 2. Vielfache bestimmen, 3. Bereiche ableiten." },
        { front: "Magic Number - Subnetz-Bereiche finden", back: "**Beispiel 192.168.1.0/26:** Magic Number = 64. **Subnetz-Bereiche:** 0-63, 64-127, 128-191, 192-255. **Host-IP 192.168.1.100:** Liegt in Bereich 64-127 → **Subnetz:** 192.168.1.64/26, **Broadcast:** 192.168.1.127, **Erste Host-IP:** 192.168.1.65, **Letzte Host-IP:** 192.168.1.126. **IHK-Trick:** Magic Number zeigt Sprungweite zwischen Subnetzen." },
        { front: "VLSM mit Magic Number", back: "**Variable Length Subnet Masking:** Verschiedene Subnetz-Größen für optimale IP-Nutzung. **Planung:** Größte Subnetze zuerst. **Beispiel:** 50 Hosts brauchen /26 (62 Hosts), 25 Hosts brauchen /27 (30 Hosts). **Magic Numbers:** /26→64, /27→32, /28→16, /29→8. **Vorteil:** Minimiert IP-Verschwendung. **IHK-Aufgabe:** Oft Netzwerk-Design mit verschiedenen Abteilungsgrößen." },
        { front: "Supernetting mit Magic Number", back: "**Route Summarization:** Mehrere kleine Netze zu einem großen zusammenfassen. **Beispiel:** 192.168.0.0/24 bis 192.168.3.0/24 → Summary: 192.168.0.0/22. **Magic Number /22:** 256-252=4 → Bereiche: 0-3, 4-7, 8-11, usw. **IHK-Bedeutung:** Routing-Tabellen verkleinern, weniger Routing-Updates. **BGP/OSPF:** Wichtig für Skalierbarkeit in großen Netzwerken." }
      ]
    },
    {
      type: "quiz", 
      title: "Netzwerktechnik mit Magic Number",
      questions: [
        {
          question: "Gegeben: IP 10.0.0.50 mit Subnetzmaske /27. Welches ist die Subnetz-Adresse?",
          options: ["10.0.0.0", "10.0.0.32", "10.0.0.48", "10.0.0.64"],
          correctIndex: 1,
          explanation: "Magic Number für /27: 256-224=32. Host 50 liegt zwischen 32-63, daher Subnetz: 10.0.0.32/27"
        },
        {
          question: "Mit welcher Magic Number arbeitest du bei einer /26 Subnetzmaske?",
          options: ["32", "64", "128", "192"],
          correctIndex: 1,
          explanation: "/26 entspricht 255.255.255.192. Magic Number = 256-192 = 64"
        },
        {
          question: "Wie viele /28 Subnetze passen in ein /24 Netzwerk?",
          options: ["8", "16", "32", "64"],
          correctIndex: 1,
          explanation: "/24 = 256 IPs, /28 = 16 IPs pro Subnetz. 256÷16 = 16 Subnetze"
        },
        {
          question: "Welche Broadcast-Adresse hat das Subnetz 172.16.4.96/27?",
          options: ["172.16.4.127", "172.16.4.119", "172.16.4.111", "172.16.4.103"],
          correctIndex: 0,
          explanation: "Magic Number /27: 32. Subnetz 96-127, Broadcast = 127"
        }
      ]
    }
  ],
  // Map category IDs consistently
  projektmanagement: projektmanagementContent,
  qualitaetsmanagement: qualitaetsmanagementContent,
  pruefungsvorbereitung: pruefungsvorbereitungContent,
  betriebswirtschaft: betriebswirtschaftContent,
  bwl: betriebswirtschaftContent, // Alias for consistency
  rechtlichegrundlagen: rechtlicheGrundlagenContent,
  "rechtliche-grundlagen": rechtlicheGrundlagenContent, // Alias 
  kommunikation: kommunikationContent,
  englischit: englischItContent,
  "englisch-it": englischItContent, // Alias
  mathematiklogik: mathematikLogikContent,
  "mathematik-logik": mathematikLogikContent, // Alias
  innovationtrends: innovationTrendsContent,
  "innovation-trends": innovationTrendsContent, // Alias
  wiso: wisoContent,
  datenbanken: datenbankenModules,
  systemadministration: systemadministrationModules,
  "it-sicherheit": [
    ...itSicherheitAdvancedContent,
    {
      type: "flashcards",
      title: "IT-Sicherheit Grundlagen - IHK Prüfungswissen", 
      cards: [
        { front: "CIA-Triade der IT-Sicherheit", back: "**Confidentiality (Vertraulichkeit):** Schutz vor unbefugtem Zugriff auf Informationen durch Verschlüsselung, Zugriffskontrollen, Klassifizierung. **Integrity (Integrität):** Schutz vor unautorisierten Änderungen durch Checksummen, digitale Signaturen, Versionskontrolle. **Availability (Verfügbarkeit):** Sicherstellung des Zugriffs für autorisierte Nutzer durch Redundanz, Backups, Load Balancing. **IHK-Erweiterung:** Authentizität, Verbindlichkeit (Non-Repudiation), Accountability als weitere Schutzziele." },
        { front: "Bedrohungslandschaft", back: "**Malware:** Viren (selbstreplizierend), Würmer (netzwerkbasiert), Trojaner (getarnte Schadsoftware), Ransomware (Verschlüsselung für Lösegeld). **Social Engineering:** Phishing (gefälschte E-Mails), Pretexting (erfundene Szenarien), Baiting (verlockendes Angebot). **Technische Angriffe:** DoS/DDoS, Man-in-the-Middle, SQL-Injection, XSS, Buffer Overflow. **IHK-Schutz:** Defense in Depth, Security Awareness Training, Incident Response Plan." },
        { front: "Verschlüsselungsverfahren", back: "**Symmetrisch:** AES (Advanced Encryption Standard), gleicher Schlüssel für Ver- und Entschlüsselung, schnell für große Datenmengen. **Asymmetrisch:** RSA, ECC (Elliptic Curve), öffentlicher/privater Schlüssel, langsamer aber für Schlüsselaustausch. **Hybrid:** Kombination beider (TLS), asymmetrisch für Schlüsselaustausch, symmetrisch für Datenübertragung. **Hash-Funktionen:** SHA-256, MD5 (unsicher), für Integrität und Passwort-Speicherung. **IHK-Praxis:** End-to-End-Verschlüsselung, Perfect Forward Secrecy." }
      ]
    }
  ],

  // Add missing categories with proper content
  "mobile-entwicklung": mobileEntwicklungContent,
  "grundlagen-it": grundlagenItContent,

  datenschutz: [
    {
      type: "flashcards",
      title: "DSGVO & Datenschutz - IHK Praxis", 
      cards: [
        { front: "DSGVO Grundprinzipien Art. 5", back: "**1. Rechtmäßigkeit, Treu & Glauben:** Transparente Verarbeitung. **2. Zweckbindung:** Daten nur für festgelegte Zwecke. **3. Datenminimierung:** Nur notwendige Daten. **4. Richtigkeit:** Aktuelle, korrekte Daten. **5. Speicherbegrenzung:** Nicht länger als nötig. **6. Integrität/Vertraulichkeit:** Angemessene Sicherheit. **IHK-Relevanz:** Basis für alle Datenschutz-Maßnahmen." },
        { front: "Rechtsgrundlagen Art. 6 DSGVO", back: "**a) Einwilligung:** Freiwillig, informiert, widerrufbar. **b) Vertrag:** Erforderlich für Vertragserfüllung. **c) Rechtliche Verpflichtung:** Steuerrecht, Aufbewahrungspflichten. **d) Lebenswichtige Interessen:** Notfälle. **e) Öffentliche Aufgabe:** Behörden. **f) Berechtigtes Interesse:** Interessenabwägung nötig. **IHK-Praxis:** Oft b), c) oder f) in Unternehmen." },
        { front: "Betroffenenrechte", back: "**Art. 15:** Auskunftsrecht über gespeicherte Daten. **Art. 16:** Berichtigung falscher Daten. **Art. 17:** Löschung ('Recht auf Vergessenwerden'). **Art. 18:** Einschränkung der Verarbeitung. **Art. 20:** Datenübertragbarkeit (Portabilität). **Art. 21:** Widerspruch gegen Verarbeitung. **IHK-Fristen:** Meist einen Monat für Antwort, kostenlos für Betroffene." }
      ]
    }
  ],

  "fachmodul-systemintegration": [
    {
      type: "flashcards",
      title: "Fachmodul Systemintegration - IHK Vertiefung",
      cards: [
        { front: "Virtualisierung-Technologien", back: "**Typ 1 Hypervisor:** Bare-Metal (VMware vSphere, Hyper-V, Xen), direkt auf Hardware. **Typ 2:** Hosted (VirtualBox, VMware Workstation), auf Betriebssystem. **Container:** Docker, LXC - OS-Level Virtualisierung. **IHK-Vorteile:** Server-Konsolidierung, bessere Hardware-Auslastung, Disaster Recovery, Test-Umgebungen. **Grenzen:** Performance-Overhead, Lizenzkosten." },
        { front: "SAN vs. NAS vs. DAS", back: "**DAS (Direct Attached Storage):** Direkt angeschlossene Festplatten, USB/SATA. **NAS (Network Attached Storage):** Datei-basiert, SMB/NFS-Protokolle, IP-Netzwerk. **SAN (Storage Area Network):** Block-basiert, Fibre Channel/iSCSI, dediziertes Storage-Netzwerk. **IHK-Anwendung:** DAS für Einzelplätze, NAS für Datei-Sharing, SAN für High-Performance Datenbanken." },
        { front: "Backup-Strategien", back: "**3-2-1-Regel:** 3 Kopien, 2 verschiedene Medien, 1 offsite. **Vollbackup:** Komplette Daten, langsam aber einfache Wiederherstellung. **Inkrementell:** Nur Änderungen seit letztem Backup. **Differenziell:** Änderungen seit letztem Vollbackup. **IHK-RPO/RTO:** Recovery Point/Time Objective definieren, Backup-Tests regelmäßig durchführen." }
      ]
    }
  ],

  "fachmodul-anwendungsentwicklung": [
    {
      type: "flashcards", 
      title: "Fachmodul Anwendungsentwicklung - IHK Vertiefung",
      cards: [
        { front: "Design Patterns - Gang of Four", back: "**Creational:** Singleton, Factory, Builder - Objekt-Erzeugung. **Structural:** Adapter, Decorator, Facade - Objekt-Komposition. **Behavioral:** Observer, Strategy, Command - Interaktion zwischen Objekten. **IHK-Bedeutung:** Bewährte Lösungen für wiederkehrende Probleme, bessere Code-Struktur, Kommunikation im Team durch gemeinsame Sprache." },
        { front: "Clean Code Prinzipien", back: "**Lesbarkeit:** Aussagekräftige Namen, kleine Funktionen, klare Kommentare. **DRY (Don't Repeat Yourself):** Code-Duplikation vermeiden. **SOLID:** Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. **IHK-Qualität:** Wartbarkeit, Testbarkeit, reduzierte Fehlerrate, Teamproduktivität." },
        { front: "Test-Driven Development (TDD)", back: "**Red-Green-Refactor Zyklus:** 1. Fehlschlagenden Test schreiben (Red), 2. Minimalen Code für Test (Green), 3. Code verbessern ohne Funktionsänderung (Refactor). **IHK-Vorteile:** Bessere Code-Qualität, automatische Regression-Tests, Dokumentation durch Tests, mutiges Refactoring möglich." }
      ]
    }
  ]
};