import { LearnModule } from "../../types/learn";

export const anwendungsentwicklungErweitertContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "Design Patterns - Gang of Four",
    cards: [
      { 
        front: "Singleton Pattern", 
        back: "**Zweck:** Nur eine Instanz einer Klasse erlauben. **Implementierung:** Private Konstruktor, statische getInstance()-Methode. **Anwendung:** Konfiguration, Logging, Datenbankverbindung. **Varianten:** Lazy Initialization, Thread-Safe (synchronized), Double-Checked Locking. **IHK-Kritik:** Globaler Zustand, erschwert Testen. **Best Practice:** Dependency Injection bevorzugen." 
      },
      { 
        front: "Factory Pattern", 
        back: "**Simple Factory:** Zentrale Methode erzeugt Objekte. **Factory Method:** Unterklassen entscheiden über Instanziierung. **Abstract Factory:** Familie zusammengehöriger Objekte. **Anwendung:** GUI-Frameworks, Plugin-Systeme. **Vorteil:** Entkopplung, Erweiterbarkeit. **IHK-Beispiel:** Shape-Factory erzeugt Circle, Rectangle, Triangle." 
      },
      { 
        front: "Observer Pattern", 
        back: "**Zweck:** Ein-zu-viele-Abhängigkeit zwischen Objekten. **Beteiligte:** Subject (Observable), Observer. **Ablauf:** Subject benachrichtigt alle registrierten Observer bei Änderungen. **Anwendung:** Event-Systeme, GUI-Updates, Publish-Subscribe. **Push vs. Pull:** Daten mitliefern oder Observer fragt ab. **IHK-Beispiel:** Börsenkurs-App, Newsletter-Abonnement." 
      },
      { 
        front: "Strategy Pattern", 
        back: "**Zweck:** Algorithmen austauschbar machen. **Struktur:** Context nutzt Strategy-Interface, konkrete Strategien implementieren es. **Anwendung:** Sortieralgorithmen, Zahlungsarten, Validierungen. **Vorteil:** Open/Closed-Prinzip, keine Switch-Statements. **IHK-Beispiel:** Versandkosten-Berechnung (Standard, Express, Gratis)." 
      },
      { 
        front: "Decorator Pattern", 
        back: "**Zweck:** Objekte dynamisch um Funktionalität erweitern. **Struktur:** Wrapper um Komponente, implementiert gleiches Interface. **Vorteil:** Flexibler als Vererbung, kombinierbar. **Anwendung:** Java I/O Streams, GUI-Komponenten. **IHK-Beispiel:** Kaffee + Milch + Zucker + Sahne, Preis addiert sich." 
      },
      { 
        front: "Adapter Pattern", 
        back: "**Zweck:** Inkompatible Interfaces kompatibel machen. **Klassen-Adapter:** Mehrfachvererbung (Interface + Adaptee). **Objekt-Adapter:** Composition, hält Referenz auf Adaptee. **Anwendung:** Legacy-Integration, externe APIs. **IHK-Beispiel:** XML-Parser an JSON-Interface anpassen, altes Payment-System integrieren." 
      },
      { 
        front: "Facade Pattern", 
        back: "**Zweck:** Vereinfachte Schnittstelle für komplexes Subsystem. **Struktur:** Facade delegiert an Subsystem-Klassen. **Vorteil:** Reduziert Kopplung, versteckt Komplexität. **Anwendung:** Bibliotheks-APIs, Microservice-Gateways. **IHK-Beispiel:** HomeTheaterFacade mit watchMovie() statt einzeln DVD, Verstärker, Leinwand." 
      },
      { 
        front: "MVC, MVP, MVVM", 
        back: "**MVC:** Model-View-Controller, klassisch, View kennt Model. **MVP:** Model-View-Presenter, Presenter vermittelt, View passiv. **MVVM:** Model-View-ViewModel, Data Binding, besonders für WPF/Angular. **Gemeinsamkeit:** Trennung von Concerns, testbar. **IHK-Entscheidung:** Framework-abhängig, MVC für Web, MVVM für Desktop/Mobile." 
      }
    ]
  },
  {
    type: "quiz",
    title: "Design Patterns Prüfungsfragen",
    questions: [
      {
        question: "Welches Pattern erlaubt nur eine Instanz einer Klasse?",
        options: ["Factory", "Singleton", "Observer", "Adapter"],
        correctIndex: 1,
        explanation: "Das Singleton Pattern garantiert, dass eine Klasse nur genau eine Instanz hat und bietet globalen Zugriff darauf."
      },
      {
        question: "Welches Pattern macht Algorithmen austauschbar?",
        options: ["Template Method", "Strategy", "State", "Command"],
        correctIndex: 1,
        explanation: "Das Strategy Pattern definiert eine Familie von Algorithmen und macht sie austauschbar."
      },
      {
        question: "Welches Pattern wird bei Event-Systemen verwendet?",
        options: ["Decorator", "Facade", "Observer", "Proxy"],
        correctIndex: 2,
        explanation: "Das Observer Pattern definiert eine Eins-zu-Viele-Beziehung, sodass bei Zustandsänderungen alle abhängigen Objekte benachrichtigt werden."
      },
      {
        question: "Welches Pattern erweitert Objekte dynamisch?",
        options: ["Adapter", "Decorator", "Facade", "Bridge"],
        correctIndex: 1,
        explanation: "Das Decorator Pattern ermöglicht es, Objekten dynamisch zusätzliche Verantwortlichkeiten hinzuzufügen."
      },
      {
        question: "Wofür steht MVVM?",
        options: ["Model-View-Virtual-Machine", "Model-View-ViewModel", "Multiple-View-Virtual-Model", "Model-Validator-View-Manager"],
        correctIndex: 1,
        explanation: "MVVM steht für Model-View-ViewModel und wird besonders bei WPF und modernen Frontend-Frameworks verwendet."
      }
    ]
  },
  {
    type: "flashcards",
    title: "Clean Code & SOLID Prinzipien",
    cards: [
      { 
        front: "Single Responsibility Principle (SRP)", 
        back: "**Definition:** Eine Klasse sollte nur einen Grund zur Änderung haben. **Bedeutung:** Nur eine Verantwortlichkeit pro Klasse. **Vorteile:** Bessere Lesbarkeit, leichtere Wartung, fokussiertes Testen. **Verletzung:** Klasse macht Datenbankzugriff UND Formatierung UND Logging. **IHK-Beispiel:** User-Klasse trennen in User, UserRepository, UserValidator." 
      },
      { 
        front: "Open/Closed Principle (OCP)", 
        back: "**Definition:** Offen für Erweiterung, geschlossen für Modifikation. **Umsetzung:** Abstraktion, Interfaces, Polymorphismus. **Vorteil:** Neue Features ohne Änderung bestehenden Codes. **Verletzung:** Switch-Statement erweitern bei neuem Typ. **IHK-Beispiel:** Neue Zahlungsart hinzufügen ohne Payment-Klasse zu ändern (Strategy Pattern)." 
      },
      { 
        front: "Liskov Substitution Principle (LSP)", 
        back: "**Definition:** Subtypen müssen Basistypen ersetzen können ohne Korrektheit zu beeinflussen. **Prüfung:** Vorbedingungen nicht verschärfen, Nachbedingungen nicht abschwächen. **Verletzung:** Square extends Rectangle mit überschriebenem setWidth() das auch Height setzt. **IHK-Konsequenz:** IS-A-Beziehung semantisch prüfen, nicht nur syntaktisch." 
      },
      { 
        front: "Interface Segregation Principle (ISP)", 
        back: "**Definition:** Clients sollten nicht von Interfaces abhängen, die sie nicht nutzen. **Umsetzung:** Kleine, fokussierte Interfaces statt großer 'Fat Interfaces'. **Vorteil:** Weniger Kopplung, klarere Abhängigkeiten. **Verletzung:** Printer-Interface mit print(), scan(), fax() für einfachen Drucker. **IHK-Lösung:** Printable, Scannable, Faxable Interfaces." 
      },
      { 
        front: "Dependency Inversion Principle (DIP)", 
        back: "**Definition:** High-Level-Module sollten nicht von Low-Level-Modulen abhängen. Beide sollten von Abstraktionen abhängen. **Umsetzung:** Dependency Injection, Interfaces. **Vorteil:** Lose Kopplung, testbar, austauschbar. **Verletzung:** UserService instanziiert direkt MySQLUserRepository. **IHK-Lösung:** UserService erhält UserRepository-Interface injiziert." 
      },
      { 
        front: "DRY - Don't Repeat Yourself", 
        back: "**Definition:** Jedes Stück Wissen sollte eine eindeutige Repräsentation im System haben. **Anwendung:** Code-Duplikation vermeiden, Abstraktion nutzen. **Achtung:** Nicht jede Ähnlichkeit ist Duplikation! Gleicher Code ≠ gleiche Abstraktion. **IHK-Beispiel:** Validierungslogik in einer Klasse, nicht in jedem Controller." 
      },
      { 
        front: "KISS - Keep It Simple, Stupid", 
        back: "**Definition:** Einfachheit bevorzugen, unnötige Komplexität vermeiden. **Anwendung:** Einfachste Lösung die funktioniert. **Balance:** Nicht zu simpel (YAGNI), aber auch nicht overengineered. **IHK-Praxis:** Keine Design Patterns wo sie nicht gebraucht werden, klare Namen, kurze Methoden." 
      },
      { 
        front: "Code Smells erkennen", 
        back: "**Long Method:** Zu viele Zeilen, aufteilen! **Large Class:** Zu viele Verantwortlichkeiten (SRP). **Duplicate Code:** DRY verletzt. **Long Parameter List:** Objekt übergeben statt viele Parameter. **Feature Envy:** Methode nutzt mehr fremde als eigene Daten. **God Class:** Weiß/macht alles. **IHK-Refactoring:** Extract Method, Extract Class, Move Method." 
      }
    ]
  },
  {
    type: "flashcards",
    title: "Testing & Qualitätssicherung",
    cards: [
      { 
        front: "Testpyramide", 
        back: "**Unit Tests (Basis):** Schnell, isoliert, viele. **Integrationstests (Mitte):** Komponenten-Zusammenspiel. **E2E/UI Tests (Spitze):** Langsam, teuer, wenige. **Verhältnis:** 70/20/10 als Richtwert. **Warum Pyramide?:** Schnelles Feedback unten, hohe Confidence oben. **IHK-Praxis:** Automatisierte Tests in CI/CD integrieren." 
      },
      { 
        front: "Unit Testing Best Practices", 
        back: "**AAA-Pattern:** Arrange-Act-Assert. **F.I.R.S.T.:** Fast, Independent, Repeatable, Self-Validating, Timely. **Eine Assertion pro Test:** Fokussiert, klare Fehlerursache. **Test Doubles:** Mock, Stub, Fake, Spy. **Coverage:** 80%+ anstreben, aber nicht blind. **IHK-Praxis:** JUnit, Mockito, Jest, pytest." 
      },
      { 
        front: "TDD - Test Driven Development", 
        back: "**Red:** Test schreiben der fehlschlägt. **Green:** Minimalen Code schreiben damit Test besteht. **Refactor:** Code verbessern, Tests grün halten. **Vorteile:** Besseres Design, hohe Coverage, Dokumentation. **Nachteile:** Lernkurve, initialer Aufwand. **IHK-Tipp:** Für kritische Business-Logik besonders geeignet." 
      },
      { 
        front: "Code Review Best Practices", 
        back: "**Automatisierung zuerst:** Linter, Formatter, Tests vor Review. **Kleine PRs:** <400 Zeilen ideal. **Konstruktiv:** Vorschläge statt Kritik, Begründungen. **Checkliste:** Funktionalität, Lesbarkeit, Sicherheit, Performance, Tests. **Zeitnah:** Innerhalb 24h reviewen. **IHK-Ziel:** Wissenstransfer, Qualitätssicherung, Konsistenz." 
      }
    ]
  },
  {
    type: "quiz",
    title: "SOLID & Clean Code Prüfungsfragen",
    questions: [
      {
        question: "Wofür steht das 'S' in SOLID?",
        options: ["Simple Responsibility", "Single Responsibility", "Secure Responsibility", "Standard Responsibility"],
        correctIndex: 1,
        explanation: "S steht für Single Responsibility Principle: Eine Klasse sollte nur einen Grund zur Änderung haben."
      },
      {
        question: "Was bedeutet 'Open/Closed Principle'?",
        options: ["Dateien öffnen und schließen", "Offen für Erweiterung, geschlossen für Modifikation", "Offene und geschlossene Klassen", "Open-Source und Closed-Source"],
        correctIndex: 1,
        explanation: "Das Open/Closed Principle besagt, dass Software-Entitäten offen für Erweiterung, aber geschlossen für Modifikation sein sollten."
      },
      {
        question: "Welches Prinzip verletzt eine 'God Class'?",
        options: ["DIP", "ISP", "SRP", "LSP"],
        correctIndex: 2,
        explanation: "Eine God Class verletzt das Single Responsibility Principle, da sie zu viele Verantwortlichkeiten hat."
      },
      {
        question: "Was ist das AAA-Pattern beim Testen?",
        options: ["Authenticate-Authorize-Access", "Arrange-Act-Assert", "Add-Alter-Apply", "Analyze-Apply-Approve"],
        correctIndex: 1,
        explanation: "AAA steht für Arrange (Vorbereiten), Act (Ausführen), Assert (Überprüfen) - ein Pattern für strukturierte Unit Tests."
      },
      {
        question: "Was gehört zur Basis der Testpyramide?",
        options: ["E2E Tests", "UI Tests", "Unit Tests", "Manuelle Tests"],
        correctIndex: 2,
        explanation: "Unit Tests bilden die Basis der Testpyramide: Sie sind schnell, isoliert und sollten die Mehrheit der Tests ausmachen."
      },
      {
        question: "Was ist TDD?",
        options: ["Type Driven Development", "Test Driven Development", "Template Driven Design", "Tool Driven Development"],
        correctIndex: 1,
        explanation: "TDD (Test Driven Development) ist eine Entwicklungsmethode, bei der zuerst Tests geschrieben werden, bevor der eigentliche Code implementiert wird."
      }
    ]
  }
];
