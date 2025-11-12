export interface LexikonEntry {
  id: string;
  term: string;
  definition: string;
  category?: string;
  relatedTerms?: string[];
}

export const lexikonData: LexikonEntry[] = [
  // A
  {
    id: "api",
    term: "API",
    definition: "Application Programming Interface - Schnittstelle zur Anwendungsprogrammierung, die es verschiedenen Software-Anwendungen ermöglicht, miteinander zu kommunizieren.",
    category: "Programmierung",
    relatedTerms: ["REST", "JSON", "HTTP"]
  },
  {
    id: "agile",
    term: "Agile Entwicklung",
    definition: "Flexible Softwareentwicklungsmethode mit iterativen Prozessen, schnellen Feedback-Zyklen und kontinuierlicher Verbesserung.",
    category: "Projektmanagement",
    relatedTerms: ["Scrum", "Kanban"]
  },
  {
    id: "algorithmus",
    term: "Algorithmus",
    definition: "Eine eindeutige Handlungsvorschrift zur Lösung eines Problems oder einer Klasse von Problemen in endlich vielen Schritten.",
    category: "Informatik",
    relatedTerms: ["Programmierung", "Datenstruktur"]
  },
  
  // B
  {
    id: "backend",
    term: "Backend",
    definition: "Der serverseitige Teil einer Anwendung, der für Datenverarbeitung, Geschäftslogik und Datenbankzugriffe zuständig ist.",
    category: "Webentwicklung",
    relatedTerms: ["Frontend", "API", "Server"]
  },
  {
    id: "bug",
    term: "Bug",
    definition: "Ein Fehler im Programmcode, der zu unerwartetem Verhalten oder Abstürzen führt.",
    category: "Softwareentwicklung",
    relatedTerms: ["Debugging", "Testing"]
  },
  {
    id: "blockchain",
    term: "Blockchain",
    definition: "Eine dezentrale, manipulationssichere Datenbank, die Transaktionen in verketteten Blöcken speichert.",
    category: "Technologie",
    relatedTerms: ["Kryptographie", "Bitcoin"]
  },

  // C
  {
    id: "cloud",
    term: "Cloud Computing",
    definition: "Bereitstellung von IT-Ressourcen wie Rechenleistung, Speicher und Anwendungen über das Internet.",
    category: "Infrastruktur",
    relatedTerms: ["SaaS", "IaaS", "PaaS"]
  },
  {
    id: "compiler",
    term: "Compiler",
    definition: "Ein Programm, das Quellcode in ausführbaren Maschinencode übersetzt.",
    category: "Programmierung",
    relatedTerms: ["Interpreter", "Assembler"]
  },
  {
    id: "css",
    term: "CSS",
    definition: "Cascading Style Sheets - Stylesheet-Sprache zur Gestaltung von HTML-Dokumenten.",
    category: "Webentwicklung",
    relatedTerms: ["HTML", "JavaScript"]
  },

  // D
  {
    id: "datenbank",
    term: "Datenbank",
    definition: "Organisiertes System zur elektronischen Datenverwaltung, das effizienten Zugriff, Speicherung und Verwaltung ermöglicht.",
    category: "Datenmanagement",
    relatedTerms: ["SQL", "NoSQL", "DBMS"]
  },
  {
    id: "debugging",
    term: "Debugging",
    definition: "Der Prozess des Auffindens und Behebens von Fehlern (Bugs) in Softwarecode.",
    category: "Softwareentwicklung",
    relatedTerms: ["Bug", "Testing"]
  },
  {
    id: "docker",
    term: "Docker",
    definition: "Plattform zur Containerisierung von Anwendungen, die konsistente Entwicklungs- und Produktionsumgebungen ermöglicht.",
    category: "DevOps",
    relatedTerms: ["Container", "Kubernetes"]
  },

  // E
  {
    id: "encryption",
    term: "Verschlüsselung",
    definition: "Umwandlung von Daten in eine unleserliche Form zum Schutz vor unbefugtem Zugriff.",
    category: "Sicherheit",
    relatedTerms: ["Kryptographie", "SSL"]
  },

  // F
  {
    id: "framework",
    term: "Framework",
    definition: "Wiederverwendbare Programmiergerüst, das grundlegende Strukturen und Funktionen für Software-Entwicklung bereitstellt.",
    category: "Softwareentwicklung",
    relatedTerms: ["Library", "API"]
  },
  {
    id: "frontend",
    term: "Frontend",
    definition: "Der clientseitige Teil einer Anwendung, mit dem Benutzer direkt interagieren (Benutzeroberfläche).",
    category: "Webentwicklung",
    relatedTerms: ["Backend", "UI", "UX"]
  },
  {
    id: "firewall",
    term: "Firewall",
    definition: "Sicherheitssystem, das den Netzwerkverkehr überwacht und unerwünschte Zugriffe blockiert.",
    category: "Sicherheit",
    relatedTerms: ["Netzwerk", "Security"]
  },

  // G
  {
    id: "git",
    term: "Git",
    definition: "Verteiltes Versionskontrollsystem zur Verfolgung von Änderungen im Quellcode während der Softwareentwicklung.",
    category: "DevOps",
    relatedTerms: ["GitHub", "Version Control"]
  },
  {
    id: "gui",
    term: "GUI",
    definition: "Graphical User Interface - Grafische Benutzeroberfläche zur visuellen Interaktion mit Software.",
    category: "Interface",
    relatedTerms: ["UI", "UX"]
  },

  // H
  {
    id: "html",
    term: "HTML",
    definition: "HyperText Markup Language - Standard-Auszeichnungssprache zur Strukturierung von Webseiten.",
    category: "Webentwicklung",
    relatedTerms: ["CSS", "JavaScript"]
  },
  {
    id: "http",
    term: "HTTP",
    definition: "HyperText Transfer Protocol - Protokoll zur Übertragung von Daten im World Wide Web.",
    category: "Netzwerk",
    relatedTerms: ["HTTPS", "API"]
  },

  // I
  {
    id: "ide",
    term: "IDE",
    definition: "Integrated Development Environment - Entwicklungsumgebung mit integriertem Code-Editor, Debugger und Build-Tools.",
    category: "Entwicklungstools",
    relatedTerms: ["Editor", "Compiler"]
  },

  // J
  {
    id: "javascript",
    term: "JavaScript",
    definition: "Interpretierte Programmiersprache, hauptsächlich für interaktive Webseiten und Webanwendungen.",
    category: "Programmierung",
    relatedTerms: ["TypeScript", "Node.js"]
  },
  {
    id: "json",
    term: "JSON",
    definition: "JavaScript Object Notation - Textbasiertes Datenaustauschformat für strukturierte Daten.",
    category: "Datenformat",
    relatedTerms: ["XML", "API"]
  },

  // K
  {
    id: "kubernetes",
    term: "Kubernetes",
    definition: "Open-Source-System zur Automatisierung der Bereitstellung, Skalierung und Verwaltung von Container-Anwendungen.",
    category: "DevOps",
    relatedTerms: ["Docker", "Container"]
  },

  // L
  {
    id: "library",
    term: "Library",
    definition: "Sammlung von vorgefertigten Funktionen und Routinen, die in eigenen Programmen verwendet werden können.",
    category: "Programmierung",
    relatedTerms: ["Framework", "Package"]
  },
  {
    id: "linux",
    term: "Linux",
    definition: "Open-Source-Betriebssystem basierend auf Unix, weit verbreitet in Servern und Entwicklungsumgebungen.",
    category: "Betriebssystem",
    relatedTerms: ["Unix", "Open Source"]
  },

  // M
  {
    id: "microservices",
    term: "Microservices",
    definition: "Architekturstil, bei dem eine Anwendung aus kleinen, unabhängigen Services besteht.",
    category: "Architektur",
    relatedTerms: ["API", "Container"]
  },

  // N
  {
    id: "nodejs",
    term: "Node.js",
    definition: "JavaScript-Laufzeitumgebung für serverseitige Anwendungen außerhalb des Browsers.",
    category: "Backend",
    relatedTerms: ["JavaScript", "npm"]
  },

  // O
  {
    id: "oop",
    term: "OOP",
    definition: "Object-Oriented Programming - Programmierparadigma basierend auf Objekten mit Eigenschaften und Methoden.",
    category: "Programmierung",
    relatedTerms: ["Klasse", "Vererbung"]
  },

  // P
  {
    id: "python",
    term: "Python",
    definition: "Interpretierte, höhere Programmiersprache mit einfacher Syntax, beliebt für Data Science und Webentwicklung.",
    category: "Programmierung",
    relatedTerms: ["Django", "Machine Learning"]
  },

  // Q
  {
    id: "query",
    term: "Query",
    definition: "Abfrage an eine Datenbank oder Suchmaschine zur Datenabfrage oder -manipulation.",
    category: "Datenbank",
    relatedTerms: ["SQL", "Database"]
  },

  // R
  {
    id: "rest",
    term: "REST",
    definition: "Representational State Transfer - Architekturstil für Webservices mit zustandslosen Operationen.",
    category: "API",
    relatedTerms: ["HTTP", "JSON"]
  },
  {
    id: "react",
    term: "React",
    definition: "JavaScript-Bibliothek von Meta für den Bau von Benutzeroberflächen mit komponentenbasierter Architektur.",
    category: "Frontend",
    relatedTerms: ["JavaScript", "Component"]
  },

  // S
  {
    id: "sql",
    term: "SQL",
    definition: "Structured Query Language - Standardsprache zur Verwaltung und Abfrage relationaler Datenbanken.",
    category: "Datenbank",
    relatedTerms: ["Database", "Query"]
  },
  {
    id: "scrum",
    term: "Scrum",
    definition: "Agiles Framework für Projektmanagement mit iterativen Sprints und regelmäßigen Reviews.",
    category: "Projektmanagement",
    relatedTerms: ["Agile", "Sprint"]
  },

  // T
  {
    id: "typescript",
    term: "TypeScript",
    definition: "Typsichere Erweiterung von JavaScript, die zu JavaScript kompiliert wird.",
    category: "Programmierung",
    relatedTerms: ["JavaScript", "Type Safety"]
  },
  {
    id: "testing",
    term: "Testing",
    definition: "Systematisches Prüfen von Software auf Fehler, Funktionalität und Performance.",
    category: "Qualitätssicherung",
    relatedTerms: ["Unit Test", "Integration Test"]
  },

  // U
  {
    id: "ui",
    term: "UI",
    definition: "User Interface - Benutzeroberfläche, über die Anwender mit Software interagieren.",
    category: "Design",
    relatedTerms: ["UX", "GUI"]
  },
  {
    id: "ux",
    term: "UX",
    definition: "User Experience - Gesamterlebnis eines Nutzers bei der Interaktion mit einem Produkt oder Service.",
    category: "Design",
    relatedTerms: ["UI", "Usability"]
  },

  // V
  {
    id: "versioncontrol",
    term: "Versionskontrolle",
    definition: "System zur Verwaltung von Änderungen an Dokumenten, Programmen und anderen Dateien.",
    category: "DevOps",
    relatedTerms: ["Git", "SVN"]
  },

  // W
  {
    id: "webpack",
    term: "Webpack",
    definition: "Module-Bundler für JavaScript-Anwendungen, der Assets zusammenfasst und optimiert.",
    category: "Build Tools",
    relatedTerms: ["npm", "Bundler"]
  },

  // X
  {
    id: "xml",
    term: "XML",
    definition: "Extensible Markup Language - Auszeichnungssprache zur Darstellung hierarchisch strukturierter Daten.",
    category: "Datenformat",
    relatedTerms: ["JSON", "HTML"]
  },
];

export const getEntriesByLetter = (letter: string): LexikonEntry[] => {
  return lexikonData
    .filter(entry => entry.term.toLowerCase().startsWith(letter.toLowerCase()))
    .sort((a, b) => a.term.localeCompare(b.term));
};

export const searchEntries = (searchTerm: string): LexikonEntry[] => {
  const term = searchTerm.toLowerCase();
  return lexikonData.filter(entry => 
    entry.term.toLowerCase().includes(term) || 
    entry.definition.toLowerCase().includes(term)
  );
};

export const getAllLetters = (): string[] => {
  const letters = new Set(lexikonData.map(entry => entry.term.charAt(0).toUpperCase()));
  return Array.from(letters).sort();
};