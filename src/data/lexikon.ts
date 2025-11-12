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
  {
    id: "aws",
    term: "AWS",
    definition: "Amazon Web Services - Cloud-Computing-Plattform von Amazon mit über 200 Services für Computing, Storage, Datenbanken und mehr.",
    category: "Cloud Computing",
    relatedTerms: ["Cloud", "EC2", "S3"]
  },
  {
    id: "azure",
    term: "Azure",
    definition: "Microsoft Azure - Cloud-Computing-Plattform von Microsoft für Infrastruktur, Plattform- und Software-Services.",
    category: "Cloud Computing",
    relatedTerms: ["Cloud", "Microsoft", "PaaS"]
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
    id: "backup",
    term: "Backup",
    definition: "Sicherungskopie von Daten zur Wiederherstellung im Falle von Datenverlust oder Systemausfall.",
    category: "Datenmanagement",
    relatedTerms: ["Recovery", "Storage"]
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
  {
    id: "bandwidth",
    term: "Bandbreite",
    definition: "Die Datenmenge, die pro Zeiteinheit über eine Netzwerkverbindung übertragen werden kann, meist in Bit/s gemessen.",
    category: "Netzwerk",
    relatedTerms: ["Throughput", "Latenz"]
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
  {
    id: "cdn",
    term: "CDN",
    definition: "Content Delivery Network - Verteiltes Netzwerk von Servern zur schnellen Auslieferung von Web-Inhalten an Nutzer weltweit.",
    category: "Netzwerk",
    relatedTerms: ["Cloud", "Performance"]
  },
  {
    id: "cicd",
    term: "CI/CD",
    definition: "Continuous Integration/Continuous Deployment - Automatisierte Prozesse für Integration, Testing und Deployment von Software.",
    category: "DevOps",
    relatedTerms: ["Git", "Pipeline"]
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
  {
    id: "dns",
    term: "DNS",
    definition: "Domain Name System - Hierarchisches dezentrales Namenssystem, das Domain-Namen in IP-Adressen übersetzt.",
    category: "Netzwerk",
    relatedTerms: ["IP-Adresse", "Domain"]
  },
  {
    id: "dhcp",
    term: "DHCP",
    definition: "Dynamic Host Configuration Protocol - Protokoll zur automatischen Zuweisung von IP-Adressen in Netzwerken.",
    category: "Netzwerk",
    relatedTerms: ["IP-Adresse", "Netzwerk"]
  },

  // E
  {
    id: "encryption",
    term: "Verschlüsselung",
    definition: "Umwandlung von Daten in eine unleserliche Form zum Schutz vor unbefugtem Zugriff.",
    category: "Sicherheit",
    relatedTerms: ["Kryptographie", "SSL"]
  },
  {
    id: "etl",
    term: "ETL",
    definition: "Extract, Transform, Load - Prozess zum Extrahieren, Transformieren und Laden von Daten aus verschiedenen Quellen in ein Zielsystem.",
    category: "Datenmanagement",
    relatedTerms: ["Data Warehouse", "Big Data"]
  },
  {
    id: "ethernet",
    term: "Ethernet",
    definition: "Kabelgebundene Netzwerktechnologie für lokale Netzwerke (LAN) mit verschiedenen Geschwindigkeitsstandards.",
    category: "Netzwerk",
    relatedTerms: ["LAN", "Switch"]
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
  {
    id: "ftp",
    term: "FTP",
    definition: "File Transfer Protocol - Netzwerkprotokoll zur Übertragung von Dateien zwischen Client und Server.",
    category: "Netzwerk",
    relatedTerms: ["SFTP", "Protokoll"]
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
  {
    id: "gateway",
    term: "Gateway",
    definition: "Netzwerkknoten, der als Schnittstelle zwischen verschiedenen Netzwerken mit unterschiedlichen Protokollen dient.",
    category: "Netzwerk",
    relatedTerms: ["Router", "Protokoll"]
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
  {
    id: "https",
    term: "HTTPS",
    definition: "HTTP Secure - Verschlüsselte Version von HTTP für sichere Datenübertragung über SSL/TLS.",
    category: "Sicherheit",
    relatedTerms: ["HTTP", "SSL", "TLS"]
  },

  // I
  {
    id: "ide",
    term: "IDE",
    definition: "Integrated Development Environment - Entwicklungsumgebung mit integriertem Code-Editor, Debugger und Build-Tools.",
    category: "Entwicklungstools",
    relatedTerms: ["Editor", "Compiler"]
  },
  {
    id: "iaas",
    term: "IaaS",
    definition: "Infrastructure as a Service - Cloud-Modell zur Bereitstellung virtualisierter Computing-Ressourcen über das Internet.",
    category: "Cloud Computing",
    relatedTerms: ["PaaS", "SaaS", "Cloud"]
  },
  {
    id: "ip",
    term: "IP-Adresse",
    definition: "Internet Protocol Address - Eindeutige numerische Adresse zur Identifikation von Geräten in Netzwerken.",
    category: "Netzwerk",
    relatedTerms: ["IPv4", "IPv6", "DNS"]
  },
  {
    id: "index",
    term: "Datenbankindex",
    definition: "Datenstruktur zur Beschleunigung von Datenbankabfragen durch schnelles Auffinden von Datensätzen.",
    category: "Datenbank",
    relatedTerms: ["SQL", "Performance"]
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
  {
    id: "join",
    term: "SQL JOIN",
    definition: "SQL-Operation zum Kombinieren von Zeilen aus mehreren Tabellen basierend auf verwandten Spalten.",
    category: "Datenbank",
    relatedTerms: ["SQL", "Relational"]
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
  {
    id: "lan",
    term: "LAN",
    definition: "Local Area Network - Lokales Netzwerk, das Geräte in einem begrenzten geografischen Bereich verbindet.",
    category: "Netzwerk",
    relatedTerms: ["WAN", "Ethernet"]
  },
  {
    id: "loadbalancer",
    term: "Load Balancer",
    definition: "System zur Verteilung eingehender Netzwerkanfragen auf mehrere Server zur Lastverteilung und Hochverfügbarkeit.",
    category: "Netzwerk",
    relatedTerms: ["Server", "Skalierung"]
  },
  {
    id: "latency",
    term: "Latenz",
    definition: "Verzögerungszeit zwischen Senden und Empfangen von Daten in einem Netzwerk, gemessen in Millisekunden.",
    category: "Netzwerk",
    relatedTerms: ["Bandbreite", "Performance"]
  },

  // M
  {
    id: "microservices",
    term: "Microservices",
    definition: "Architekturstil, bei dem eine Anwendung aus kleinen, unabhängigen Services besteht.",
    category: "Architektur",
    relatedTerms: ["API", "Container"]
  },
  {
    id: "mongodb",
    term: "MongoDB",
    definition: "Dokumentenorientierte NoSQL-Datenbank, die Daten im JSON-ähnlichen BSON-Format speichert.",
    category: "Datenbank",
    relatedTerms: ["NoSQL", "Document Store"]
  },
  {
    id: "mysql",
    term: "MySQL",
    definition: "Open-Source relationales Datenbankmanagementsystem, weit verbreitet für Webanwendungen.",
    category: "Datenbank",
    relatedTerms: ["SQL", "Relational"]
  },

  // N
  {
    id: "nodejs",
    term: "Node.js",
    definition: "JavaScript-Laufzeitumgebung für serverseitige Anwendungen außerhalb des Browsers.",
    category: "Backend",
    relatedTerms: ["JavaScript", "npm"]
  },
  {
    id: "nosql",
    term: "NoSQL",
    definition: "Nicht-relationale Datenbanksysteme für flexible, skalierbare Datenspeicherung ohne festes Schema.",
    category: "Datenbank",
    relatedTerms: ["MongoDB", "Document Store"]
  },
  {
    id: "nat",
    term: "NAT",
    definition: "Network Address Translation - Verfahren zur Umwandlung von IP-Adressen zwischen privaten und öffentlichen Netzwerken.",
    category: "Netzwerk",
    relatedTerms: ["Router", "IP-Adresse"]
  },

  // O
  {
    id: "oop",
    term: "OOP",
    definition: "Object-Oriented Programming - Programmierparadigma basierend auf Objekten mit Eigenschaften und Methoden.",
    category: "Programmierung",
    relatedTerms: ["Klasse", "Vererbung"]
  },
  {
    id: "orm",
    term: "ORM",
    definition: "Object-Relational Mapping - Technik zur Zuordnung von Objekten zu relationalen Datenbankstrukturen.",
    category: "Datenbank",
    relatedTerms: ["SQL", "Database"]
  },
  {
    id: "osi",
    term: "OSI-Modell",
    definition: "Open Systems Interconnection - Referenzmodell mit 7 Schichten zur Standardisierung von Netzwerkkommunikation.",
    category: "Netzwerk",
    relatedTerms: ["TCP/IP", "Protokoll"]
  },

  // P
  {
    id: "python",
    term: "Python",
    definition: "Interpretierte, höhere Programmiersprache mit einfacher Syntax, beliebt für Data Science und Webentwicklung.",
    category: "Programmierung",
    relatedTerms: ["Django", "Machine Learning"]
  },
  {
    id: "paas",
    term: "PaaS",
    definition: "Platform as a Service - Cloud-Modell zur Bereitstellung einer Entwicklungsplattform über das Internet.",
    category: "Cloud Computing",
    relatedTerms: ["IaaS", "SaaS", "Cloud"]
  },
  {
    id: "postgresql",
    term: "PostgreSQL",
    definition: "Open-Source objektrelationales Datenbanksystem mit erweiterten Features und SQL-Konformität.",
    category: "Datenbank",
    relatedTerms: ["SQL", "Relational"]
  },
  {
    id: "proxy",
    term: "Proxy-Server",
    definition: "Vermittlungsserver zwischen Client und Zielserver zur Weiterleitung von Anfragen und Antworten.",
    category: "Netzwerk",
    relatedTerms: ["Gateway", "Firewall"]
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
  {
    id: "redis",
    term: "Redis",
    definition: "In-Memory-Datenbank und Cache-System für schnellen Zugriff auf Key-Value-Datenstrukturen.",
    category: "Datenbank",
    relatedTerms: ["Cache", "NoSQL"]
  },
  {
    id: "router",
    term: "Router",
    definition: "Netzwerkgerät zur Weiterleitung von Datenpaketen zwischen verschiedenen Netzwerken basierend auf IP-Adressen.",
    category: "Netzwerk",
    relatedTerms: ["Gateway", "IP-Adresse"]
  },
  {
    id: "replica",
    term: "Replikation",
    definition: "Prozess der Duplizierung von Daten auf mehrere Server zur Erhöhung der Verfügbarkeit und Performance.",
    category: "Datenbank",
    relatedTerms: ["Backup", "Hochverfügbarkeit"]
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
  {
    id: "saas",
    term: "SaaS",
    definition: "Software as a Service - Cloud-Modell zur Bereitstellung von Software über das Internet ohne lokale Installation.",
    category: "Cloud Computing",
    relatedTerms: ["IaaS", "PaaS", "Cloud"]
  },
  {
    id: "ssh",
    term: "SSH",
    definition: "Secure Shell - Verschlüsseltes Netzwerkprotokoll für sichere Remote-Verbindungen zu Servern.",
    category: "Sicherheit",
    relatedTerms: ["Linux", "Terminal"]
  },
  {
    id: "ssl",
    term: "SSL/TLS",
    definition: "Secure Sockets Layer/Transport Layer Security - Verschlüsselungsprotokolle für sichere Datenübertragung im Internet.",
    category: "Sicherheit",
    relatedTerms: ["HTTPS", "Zertifikat"]
  },
  {
    id: "subnet",
    term: "Subnetz",
    definition: "Logische Unterteilung eines IP-Netzwerks in kleinere Segmente zur besseren Organisation und Sicherheit.",
    category: "Netzwerk",
    relatedTerms: ["IP-Adresse", "Router"]
  },
  {
    id: "switch",
    term: "Switch",
    definition: "Netzwerkgerät zur Verbindung von Geräten in einem LAN und intelligenter Weiterleitung von Datenpaketen.",
    category: "Netzwerk",
    relatedTerms: ["LAN", "Ethernet"]
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
  {
    id: "tcp",
    term: "TCP/IP",
    definition: "Transmission Control Protocol/Internet Protocol - Grundlegende Protokollfamilie für die Internet-Kommunikation.",
    category: "Netzwerk",
    relatedTerms: ["HTTP", "UDP"]
  },
  {
    id: "transaction",
    term: "Transaktion",
    definition: "Logische Einheit von Datenbankoperationen, die als Ganzes ausgeführt oder rückgängig gemacht wird (ACID-Prinzip).",
    category: "Datenbank",
    relatedTerms: ["SQL", "ACID"]
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
  {
    id: "udp",
    term: "UDP",
    definition: "User Datagram Protocol - Verbindungsloses Transportprotokoll für schnelle, unzuverlässige Datenübertragung.",
    category: "Netzwerk",
    relatedTerms: ["TCP/IP", "Streaming"]
  },

  // V
  {
    id: "versioncontrol",
    term: "Versionskontrolle",
    definition: "System zur Verwaltung von Änderungen an Dokumenten, Programmen und anderen Dateien.",
    category: "DevOps",
    relatedTerms: ["Git", "SVN"]
  },
  {
    id: "vpn",
    term: "VPN",
    definition: "Virtual Private Network - Verschlüsselte Netzwerkverbindung zur sicheren Datenübertragung über öffentliche Netzwerke.",
    category: "Netzwerk",
    relatedTerms: ["Sicherheit", "Tunnel"]
  },
  {
    id: "vlan",
    term: "VLAN",
    definition: "Virtual Local Area Network - Logische Segmentierung eines physischen Netzwerks zur besseren Organisation und Sicherheit.",
    category: "Netzwerk",
    relatedTerms: ["LAN", "Switch"]
  },
  {
    id: "vm",
    term: "Virtuelle Maschine",
    definition: "Softwarebasierte Emulation eines physischen Computers, die ein eigenes Betriebssystem ausführt.",
    category: "Infrastruktur",
    relatedTerms: ["Hypervisor", "Cloud"]
  },

  // W
  {
    id: "webpack",
    term: "Webpack",
    definition: "Module-Bundler für JavaScript-Anwendungen, der Assets zusammenfasst und optimiert.",
    category: "Build Tools",
    relatedTerms: ["npm", "Bundler"]
  },
  {
    id: "wan",
    term: "WAN",
    definition: "Wide Area Network - Weiträumiges Netzwerk, das geografisch verteilte LANs miteinander verbindet.",
    category: "Netzwerk",
    relatedTerms: ["LAN", "Router"]
  },
  {
    id: "websocket",
    term: "WebSocket",
    definition: "Protokoll für bidirektionale, dauerhafte Verbindungen zwischen Client und Server für Echtzeit-Kommunikation.",
    category: "Netzwerk",
    relatedTerms: ["HTTP", "Real-time"]
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