import type { ExamQuestion } from "@/types/exam";

export const teil1Questions: ExamQuestion[] = [
  // =============================================================
  // IT-GRUNDLAGEN (ca. 20%)
  // =============================================================
  {
    id: "t1-it-001",
    question: "Welche Einheit wird verwendet, um die Taktfrequenz eines Prozessors anzugeben?",
    options: ["Megabyte (MB)", "Gigahertz (GHz)", "Megapixel (MP)", "Bit pro Sekunde (bps)"],
    correctIndex: 1,
    explanation: "Die Taktfrequenz eines Prozessors wird in Hertz gemessen, typischerweise in Gigahertz (GHz). Ein GHz entspricht einer Milliarde Taktzyklen pro Sekunde.",
    points: 5,
    category: "IT-Grundlagen",
    difficulty: "leicht"
  },
  {
    id: "t1-it-002",
    question: "Was ist der Unterschied zwischen RAM und ROM?",
    options: [
      "RAM ist schneller als ROM",
      "RAM ist flüchtig und verliert Daten bei Stromausfall, ROM behält Daten dauerhaft",
      "ROM ist größer als RAM",
      "Es gibt keinen Unterschied"
    ],
    correctIndex: 1,
    explanation: "RAM (Random Access Memory) ist flüchtiger Speicher - Daten gehen bei Stromausfall verloren. ROM (Read Only Memory) ist nicht-flüchtig und behält Daten auch ohne Strom.",
    points: 5,
    category: "IT-Grundlagen",
    difficulty: "leicht"
  },
  {
    id: "t1-it-003",
    question: "Wie viele Bytes sind 1 Kibibyte (KiB)?",
    options: ["1000 Bytes", "1024 Bytes", "1048576 Bytes", "8000 Bytes"],
    correctIndex: 1,
    explanation: "1 Kibibyte (KiB) = 2^10 = 1024 Bytes. Dies unterscheidet sich vom Kilobyte (KB) im SI-System, das 1000 Bytes entspricht.",
    points: 5,
    category: "IT-Grundlagen",
    difficulty: "leicht"
  },
  {
    id: "t1-it-004",
    question: "Welcher Bustyp verbindet die CPU direkt mit dem Arbeitsspeicher?",
    options: ["PCI-Express", "Front Side Bus / Memory Bus", "USB", "SATA"],
    correctIndex: 1,
    explanation: "Der Front Side Bus (FSB) oder bei modernen Systemen der Memory Controller verbindet die CPU direkt mit dem RAM für schnellsten Datenaustausch.",
    points: 5,
    category: "IT-Grundlagen",
    difficulty: "mittel"
  },
  {
    id: "t1-it-005",
    question: "Was beschreibt das Von-Neumann-Prinzip?",
    options: [
      "Die Trennung von Programm- und Datenspeicher",
      "Programme und Daten werden im gleichen Speicher gehalten",
      "Die parallele Verarbeitung von Befehlen",
      "Die Verschlüsselung von Daten"
    ],
    correctIndex: 1,
    explanation: "Das Von-Neumann-Prinzip besagt, dass Programme und Daten im gleichen Speicher liegen. Der Prozessor holt Befehle und Daten nacheinander aus diesem Speicher.",
    points: 10,
    category: "IT-Grundlagen",
    difficulty: "mittel"
  },
  {
    id: "t1-it-006",
    question: "Was ist der Unterschied zwischen SSD und HDD?",
    options: [
      "SSDs haben bewegliche Teile, HDDs nicht",
      "SSDs nutzen Flash-Speicher ohne bewegliche Teile, HDDs haben rotierende Magnetscheiben",
      "HDDs sind schneller als SSDs",
      "SSDs können nur lesen, HDDs können lesen und schreiben"
    ],
    correctIndex: 1,
    explanation: "SSDs (Solid State Drives) nutzen Flash-Speicherchips ohne bewegliche Teile - schneller, leiser, stoßunempfindlich. HDDs haben rotierende Magnetscheiben mit Lese/Schreibköpfen.",
    points: 5,
    category: "IT-Grundlagen",
    difficulty: "leicht"
  },
  {
    id: "t1-it-007",
    question: "Was ist der Zweck eines BIOS/UEFI?",
    options: [
      "Es ist das Hauptbetriebssystem",
      "Es initialisiert die Hardware und startet das Betriebssystem",
      "Es speichert Benutzerdaten",
      "Es ist nur für Grafikkarten zuständig"
    ],
    correctIndex: 1,
    explanation: "BIOS/UEFI ist die Firmware, die beim Einschalten als erstes läuft. Sie initialisiert Hardware (POST), konfiguriert Komponenten und lädt dann das Betriebssystem.",
    points: 5,
    category: "IT-Grundlagen",
    difficulty: "leicht"
  },
  {
    id: "t1-it-008",
    question: "Welche Aussage über Cache-Speicher ist korrekt?",
    options: [
      "Cache ist langsamer als RAM",
      "Cache ist sehr schneller Zwischenspeicher zwischen CPU und RAM",
      "Cache wird nur für Grafik verwendet",
      "Cache ersetzt den Arbeitsspeicher"
    ],
    correctIndex: 1,
    explanation: "Cache ist ein sehr schneller Zwischenspeicher, der häufig benötigte Daten näher an der CPU hält. L1-Cache ist am schnellsten, gefolgt von L2 und L3.",
    points: 10,
    category: "IT-Grundlagen",
    difficulty: "mittel"
  },
  {
    id: "t1-it-009",
    question: "Was bedeutet Multi-Core bei Prozessoren?",
    options: [
      "Der Prozessor hat mehrere Gehäuse",
      "Mehrere unabhängige Rechenkerne auf einem Chip für parallele Verarbeitung",
      "Der Prozessor kann mehrere Monitore ansteuern",
      "Der Prozessor hat eine höhere Taktfrequenz"
    ],
    correctIndex: 1,
    explanation: "Multi-Core bedeutet, dass ein Prozessor mehrere unabhängige Rechenkerne auf einem Chip hat. So können mehrere Aufgaben gleichzeitig parallel bearbeitet werden.",
    points: 5,
    category: "IT-Grundlagen",
    difficulty: "leicht"
  },
  {
    id: "t1-it-010",
    question: "Was ist der Unterschied zwischen 32-Bit und 64-Bit Systemen?",
    options: [
      "64-Bit ist immer schneller",
      "64-Bit kann mehr Arbeitsspeicher adressieren (>4GB) und größere Datenmengen verarbeiten",
      "32-Bit ist sicherer",
      "Es gibt keinen praktischen Unterschied"
    ],
    correctIndex: 1,
    explanation: "64-Bit Systeme können mehr als 4GB RAM adressieren (theoretisch 16 Exabyte) und verarbeiten größere Datenblöcke pro Takt. 32-Bit ist auf ~4GB RAM beschränkt.",
    points: 10,
    category: "IT-Grundlagen",
    difficulty: "mittel"
  },

  // =============================================================
  // NETZWERKTECHNIK (ca. 25%)
  // =============================================================
  {
    id: "t1-nw-001",
    question: "Auf welcher Schicht des OSI-Modells arbeitet ein Switch?",
    options: ["Schicht 1 (Physical)", "Schicht 2 (Data Link)", "Schicht 3 (Network)", "Schicht 4 (Transport)"],
    correctIndex: 1,
    explanation: "Ein Switch arbeitet auf Schicht 2 (Data Link Layer) und verwendet MAC-Adressen zur Weiterleitung von Frames.",
    points: 5,
    category: "Netzwerktechnik",
    difficulty: "leicht"
  },
  {
    id: "t1-nw-002",
    question: "Welche IP-Adresse gehört zur Klasse C?",
    options: ["10.0.0.1", "172.16.0.1", "192.168.1.1", "224.0.0.1"],
    correctIndex: 2,
    explanation: "Klasse C umfasst IP-Adressen von 192.0.0.0 bis 223.255.255.255. 192.168.x.x ist ein privater Bereich innerhalb der Klasse C.",
    points: 5,
    category: "Netzwerktechnik",
    difficulty: "leicht"
  },
  {
    id: "t1-nw-003",
    question: "Wie viele nutzbare Host-Adressen gibt es in einem /26 Subnetz?",
    options: ["62", "64", "30", "128"],
    correctIndex: 0,
    explanation: "/26 bedeutet 26 Bits für das Netzwerk, 6 Bits für Hosts. 2^6 = 64, minus 2 (Netzwerk- und Broadcast-Adresse) = 62 nutzbare Hosts.",
    points: 10,
    category: "Netzwerktechnik",
    difficulty: "mittel"
  },
  {
    id: "t1-nw-004",
    question: "Welches Protokoll wird für die automatische IP-Adressvergabe verwendet?",
    options: ["DNS", "DHCP", "ARP", "ICMP"],
    correctIndex: 1,
    explanation: "DHCP (Dynamic Host Configuration Protocol) weist Clients automatisch IP-Adressen, Subnetzmasken, Gateway und DNS-Server zu.",
    points: 5,
    category: "Netzwerktechnik",
    difficulty: "leicht"
  },
  {
    id: "t1-nw-005",
    question: "Welcher Port wird standardmäßig für HTTPS verwendet?",
    options: ["80", "443", "8080", "21"],
    correctIndex: 1,
    explanation: "HTTPS verwendet standardmäßig Port 443. HTTP verwendet Port 80, FTP Port 21.",
    points: 5,
    category: "Netzwerktechnik",
    difficulty: "leicht"
  },
  {
    id: "t1-nw-006",
    question: "Was ist der Unterschied zwischen TCP und UDP?",
    options: [
      "TCP ist schneller als UDP",
      "TCP ist verbindungsorientiert und zuverlässig, UDP ist verbindungslos",
      "UDP ist sicherer als TCP",
      "Es gibt keinen wesentlichen Unterschied"
    ],
    correctIndex: 1,
    explanation: "TCP ist verbindungsorientiert mit Fehlerkorrektur und garantierter Reihenfolge. UDP ist verbindungslos, schneller, aber ohne Garantien - ideal für Streaming.",
    points: 10,
    category: "Netzwerktechnik",
    difficulty: "mittel"
  },
  {
    id: "t1-nw-007",
    question: "Was bewirkt NAT (Network Address Translation)?",
    options: [
      "Verschlüsselung von Netzwerkverkehr",
      "Übersetzung von privaten in öffentliche IP-Adressen",
      "Zuweisung von MAC-Adressen",
      "Routing zwischen VLANs"
    ],
    correctIndex: 1,
    explanation: "NAT übersetzt private IP-Adressen in öffentliche Adressen, sodass mehrere Geräte mit einer öffentlichen IP ins Internet können.",
    points: 10,
    category: "Netzwerktechnik",
    difficulty: "mittel"
  },
  {
    id: "t1-nw-008",
    question: "Welche Subnetzmaske entspricht /24?",
    options: ["255.255.0.0", "255.255.255.0", "255.255.255.128", "255.255.255.192"],
    correctIndex: 1,
    explanation: "/24 bedeutet 24 Bits sind auf 1 gesetzt = 255.255.255.0. Dies ergibt 256 Adressen (254 nutzbar).",
    points: 5,
    category: "Netzwerktechnik",
    difficulty: "leicht"
  },
  {
    id: "t1-nw-009",
    question: "Welche Schichten hat das OSI-Modell?",
    options: [
      "4 Schichten",
      "7 Schichten: Physical, Data Link, Network, Transport, Session, Presentation, Application",
      "5 Schichten",
      "3 Schichten"
    ],
    correctIndex: 1,
    explanation: "Das OSI-Modell hat 7 Schichten. Von unten: Physical (1), Data Link (2), Network (3), Transport (4), Session (5), Presentation (6), Application (7).",
    points: 5,
    category: "Netzwerktechnik",
    difficulty: "leicht"
  },
  {
    id: "t1-nw-010",
    question: "Was macht das ARP-Protokoll?",
    options: [
      "Übersetzt Domainnamen in IP-Adressen",
      "Löst IP-Adressen in MAC-Adressen auf",
      "Verteilt IP-Adressen automatisch",
      "Verschlüsselt Netzwerkverkehr"
    ],
    correctIndex: 1,
    explanation: "ARP (Address Resolution Protocol) löst IP-Adressen in MAC-Adressen auf. Nötig, da Ethernet MAC-Adressen für die Kommunikation im lokalen Netz benötigt.",
    points: 10,
    category: "Netzwerktechnik",
    difficulty: "mittel"
  },
  {
    id: "t1-nw-011",
    question: "Was ist eine MAC-Adresse?",
    options: [
      "Die IP-Adresse eines Apple-Computers",
      "Eine eindeutige 48-Bit Hardware-Adresse einer Netzwerkkarte",
      "Die Adresse des Routers",
      "Eine verschlüsselte IP-Adresse"
    ],
    correctIndex: 1,
    explanation: "MAC (Media Access Control) ist eine eindeutige 48-Bit Adresse, die jeder Netzwerkkarte bei der Herstellung zugewiesen wird. Format: XX:XX:XX:XX:XX:XX.",
    points: 5,
    category: "Netzwerktechnik",
    difficulty: "leicht"
  },
  {
    id: "t1-nw-012",
    question: "Welches Protokoll nutzt DNS standardmäßig?",
    options: ["TCP Port 80", "UDP Port 53", "TCP Port 443", "UDP Port 161"],
    correctIndex: 1,
    explanation: "DNS verwendet standardmäßig UDP Port 53 für schnelle Anfragen. Bei großen Antworten (>512 Bytes) oder Zonentransfers wird TCP Port 53 verwendet.",
    points: 5,
    category: "Netzwerktechnik",
    difficulty: "leicht"
  },
  {
    id: "t1-nw-013",
    question: "Was ist ein Default Gateway?",
    options: [
      "Der erste Computer im Netzwerk",
      "Der Router, über den Pakete an andere Netzwerke weitergeleitet werden",
      "Der DNS-Server",
      "Ein Backup-Server"
    ],
    correctIndex: 1,
    explanation: "Das Default Gateway ist die IP-Adresse des Routers, an den Pakete gesendet werden, wenn das Ziel nicht im lokalen Netzwerk liegt.",
    points: 5,
    category: "Netzwerktechnik",
    difficulty: "leicht"
  },
  {
    id: "t1-nw-014",
    question: "Was bedeutet CIDR-Notation /28?",
    options: [
      "28 verfügbare Hosts",
      "28 Bits für Netzwerkteil, 4 Bits für Hostteil = 16 Adressen",
      "28 Netzwerke möglich",
      "Subnetzmaske 255.255.255.0"
    ],
    correctIndex: 1,
    explanation: "/28 = 28 Netzwerkbits, 4 Hostbits. 2^4 = 16 Adressen gesamt, davon 14 nutzbar (minus Netzwerk- und Broadcast). Maske: 255.255.255.240.",
    points: 10,
    category: "Netzwerktechnik",
    difficulty: "mittel"
  },

  // =============================================================
  // IT-SICHERHEIT (ca. 20%)
  // =============================================================
  {
    id: "t1-sec-001",
    question: "Was versteht man unter dem CIA-Prinzip in der IT-Sicherheit?",
    options: [
      "Computer, Internet, Application",
      "Confidentiality, Integrity, Availability",
      "Control, Identification, Authorization",
      "Coding, Implementation, Analysis"
    ],
    correctIndex: 1,
    explanation: "CIA steht für Vertraulichkeit (Confidentiality), Integrität (Integrity) und Verfügbarkeit (Availability) - die drei Grundpfeiler der IT-Sicherheit.",
    points: 10,
    category: "IT-Sicherheit",
    difficulty: "mittel"
  },
  {
    id: "t1-sec-002",
    question: "Was ist Phishing?",
    options: [
      "Ein Netzwerkprotokoll",
      "Social Engineering per gefälschte E-Mails/Websites zur Datendiebstahl",
      "Eine Verschlüsselungsmethode",
      "Ein Backup-Verfahren"
    ],
    correctIndex: 1,
    explanation: "Phishing ist eine Social-Engineering-Methode, bei der Angreifer durch gefälschte E-Mails oder Websites versuchen, sensible Daten wie Passwörter zu stehlen.",
    points: 5,
    category: "IT-Sicherheit",
    difficulty: "leicht"
  },
  {
    id: "t1-sec-003",
    question: "Welche Aussage über symmetrische Verschlüsselung ist korrekt?",
    options: [
      "Es werden zwei verschiedene Schlüssel verwendet",
      "Der gleiche Schlüssel wird zum Ver- und Entschlüsseln verwendet",
      "Sie ist langsamer als asymmetrische Verschlüsselung",
      "Sie benötigt keine Schlüssel"
    ],
    correctIndex: 1,
    explanation: "Bei symmetrischer Verschlüsselung wird derselbe Schlüssel zum Ver- und Entschlüsseln verwendet. Beispiele: AES, DES, 3DES.",
    points: 10,
    category: "IT-Sicherheit",
    difficulty: "mittel"
  },
  {
    id: "t1-sec-004",
    question: "Was ist die Hauptfunktion einer Firewall?",
    options: [
      "Verschlüsselung von Daten",
      "Filterung von Netzwerkverkehr nach definierten Regeln",
      "Speicherung von Passwörtern",
      "Beschleunigung des Internetzugangs"
    ],
    correctIndex: 1,
    explanation: "Eine Firewall filtert den Netzwerkverkehr basierend auf Regeln (Ports, IP-Adressen, Protokolle) und schützt so das Netzwerk vor unerwünschtem Zugriff.",
    points: 5,
    category: "IT-Sicherheit",
    difficulty: "leicht"
  },
  {
    id: "t1-sec-005",
    question: "Was bedeutet 2FA/MFA?",
    options: [
      "2 Factor Authentication / Multi-Factor Authentication",
      "2 File Access / Multi File Access",
      "2 Firewall Architecture / Multi Firewall Architecture",
      "2 Frequency Analysis / Multi Frequency Analysis"
    ],
    correctIndex: 0,
    explanation: "2FA/MFA kombiniert mehrere Authentifizierungsfaktoren: Wissen (Passwort), Besitz (Token, Handy), Biometrie (Fingerabdruck) für erhöhte Sicherheit.",
    points: 5,
    category: "IT-Sicherheit",
    difficulty: "leicht"
  },
  {
    id: "t1-sec-006",
    question: "Was ist ein Hash-Wert?",
    options: [
      "Ein verschlüsselter Text, der entschlüsselt werden kann",
      "Ein eindeutiger Fingerabdruck fester Länge, der aus Daten berechnet wird",
      "Ein komprimiertes Archiv",
      "Ein Passwort-Manager"
    ],
    correctIndex: 1,
    explanation: "Ein Hash-Wert ist ein eindeutiger Fingerabdruck fester Länge, berechnet aus beliebig großen Daten. Er ist einweg - nicht umkehrbar. Beispiele: SHA-256, MD5.",
    points: 10,
    category: "IT-Sicherheit",
    difficulty: "mittel"
  },
  {
    id: "t1-sec-007",
    question: "Was ist Ransomware?",
    options: [
      "Eine Antivirensoftware",
      "Schadsoftware, die Daten verschlüsselt und Lösegeld fordert",
      "Ein Backup-Programm",
      "Eine Firewall-Regel"
    ],
    correctIndex: 1,
    explanation: "Ransomware verschlüsselt Daten auf dem Computer und fordert ein Lösegeld (Ransom) für die Entschlüsselung. Prävention: Backups, Updates, Vorsicht bei E-Mails.",
    points: 5,
    category: "IT-Sicherheit",
    difficulty: "leicht"
  },
  {
    id: "t1-sec-008",
    question: "Was ist der Unterschied zwischen asymmetrischer und symmetrischer Verschlüsselung?",
    options: [
      "Asymmetrisch ist schneller",
      "Asymmetrisch nutzt Schlüsselpaar (öffentlich/privat), symmetrisch einen gemeinsamen Schlüssel",
      "Symmetrisch ist sicherer",
      "Es gibt keinen Unterschied"
    ],
    correctIndex: 1,
    explanation: "Asymmetrisch: Öffentlicher Schlüssel zum Verschlüsseln, privater zum Entschlüsseln. Symmetrisch: Gleicher Schlüssel für beides. Asymmetrisch löst Schlüsselaustauschproblem.",
    points: 10,
    category: "IT-Sicherheit",
    difficulty: "mittel"
  },
  {
    id: "t1-sec-009",
    question: "Was ist ein DDoS-Angriff?",
    options: [
      "Ein Datensicherungsverfahren",
      "Distributed Denial of Service - Überlastung eines Dienstes durch viele Anfragen",
      "Eine Verschlüsselungsmethode",
      "Ein Authentifizierungsverfahren"
    ],
    correctIndex: 1,
    explanation: "DDoS (Distributed Denial of Service) überflutet Server mit Anfragen von vielen kompromittierten Systemen (Botnet), um Dienste unerreichbar zu machen.",
    points: 10,
    category: "IT-Sicherheit",
    difficulty: "mittel"
  },
  {
    id: "t1-sec-010",
    question: "Was ist Social Engineering?",
    options: [
      "Software-Entwicklung in Teams",
      "Manipulation von Menschen, um an vertrauliche Informationen zu gelangen",
      "Die Planung von sozialen Netzwerken",
      "Eine Programmiersprache"
    ],
    correctIndex: 1,
    explanation: "Social Engineering manipuliert Menschen psychologisch, um Sicherheitsmaßnahmen zu umgehen. Methoden: Phishing, Pretexting, Tailgating, Baiting.",
    points: 5,
    category: "IT-Sicherheit",
    difficulty: "leicht"
  },

  // =============================================================
  // PROJEKTMANAGEMENT (ca. 15%)
  // =============================================================
  {
    id: "t1-pm-001",
    question: "Was ist ein Meilenstein in einem Projekt?",
    options: [
      "Eine regelmäßige Besprechung",
      "Ein wichtiger Zeitpunkt/Ereignis, das den Abschluss einer Phase markiert",
      "Ein Dokument zur Projektplanung",
      "Eine Kostenschätzung"
    ],
    correctIndex: 1,
    explanation: "Ein Meilenstein ist ein wichtiges Ereignis im Projektverlauf, das den Abschluss einer Phase oder das Erreichen eines Ziels markiert. Er hat keine Dauer.",
    points: 5,
    category: "Projektmanagement",
    difficulty: "leicht"
  },
  {
    id: "t1-pm-002",
    question: "Was beschreibt der kritische Pfad in einem Projektplan?",
    options: [
      "Die risikoreichsten Aufgaben",
      "Die längste Kette von Vorgängen, die die Projektdauer bestimmt",
      "Die teuersten Aufgaben",
      "Die ersten Aufgaben im Projekt"
    ],
    correctIndex: 1,
    explanation: "Der kritische Pfad ist die längste Abfolge abhängiger Aufgaben ohne Pufferzeit. Verzögerungen hier verzögern das gesamte Projekt.",
    points: 10,
    category: "Projektmanagement",
    difficulty: "mittel"
  },
  {
    id: "t1-pm-003",
    question: "Was sind die Phasen eines klassischen Wasserfallmodells?",
    options: [
      "Sprint, Review, Retrospektive",
      "Anforderungen, Design, Implementierung, Test, Wartung",
      "Planen, Tun, Prüfen, Handeln",
      "Initiierung, Planung, Abschluss"
    ],
    correctIndex: 1,
    explanation: "Das Wasserfallmodell durchläuft sequentiell: Anforderungsanalyse → Design → Implementierung → Test → Wartung. Jede Phase muss abgeschlossen sein, bevor die nächste beginnt.",
    points: 10,
    category: "Projektmanagement",
    difficulty: "mittel"
  },
  {
    id: "t1-pm-004",
    question: "Was ist ein Gantt-Diagramm?",
    options: [
      "Eine Organigramm-Darstellung",
      "Eine Balkendiagramm-Darstellung von Projektaufgaben über Zeit",
      "Eine Kostenaufstellung",
      "Ein Qualitätsprotokoll"
    ],
    correctIndex: 1,
    explanation: "Ein Gantt-Diagramm visualisiert Projektaufgaben als horizontale Balken auf einer Zeitachse, zeigt Dauer, Abhängigkeiten und Überlappungen.",
    points: 5,
    category: "Projektmanagement",
    difficulty: "leicht"
  },
  {
    id: "t1-pm-005",
    question: "Was ist der Unterschied zwischen Scrum und Kanban?",
    options: [
      "Scrum hat keine Rollen, Kanban hat definierte Rollen",
      "Scrum arbeitet in festen Sprints, Kanban hat einen kontinuierlichen Fluss",
      "Kanban ist nur für Software, Scrum für alle Branchen",
      "Es gibt keinen Unterschied"
    ],
    correctIndex: 1,
    explanation: "Scrum arbeitet in festen Zeitboxen (Sprints) mit definierten Rollen. Kanban ist ein kontinuierlicher Fluss mit WIP-Limits, ohne feste Iterationen.",
    points: 10,
    category: "Projektmanagement",
    difficulty: "mittel"
  },
  {
    id: "t1-pm-006",
    question: "Was sind die drei Rollen in Scrum?",
    options: [
      "Manager, Entwickler, Tester",
      "Product Owner, Scrum Master, Development Team",
      "CEO, CTO, Entwickler",
      "Projektleiter, Analyst, Programmierer"
    ],
    correctIndex: 1,
    explanation: "Scrum definiert 3 Rollen: Product Owner (Was wird gebaut?), Scrum Master (Prozesscoach), Development Team (Umsetzung).",
    points: 5,
    category: "Projektmanagement",
    difficulty: "leicht"
  },
  {
    id: "t1-pm-007",
    question: "Was ist ein Sprint in Scrum?",
    options: [
      "Ein Wettlauf zwischen Teams",
      "Eine feste Zeitbox (meist 2-4 Wochen) für die Entwicklung",
      "Das finale Release",
      "Eine Art von Test"
    ],
    correctIndex: 1,
    explanation: "Ein Sprint ist eine feste Zeitbox (typisch 2-4 Wochen), in der ein fertiges, nutzbares Produktinkrement erstellt wird. Am Ende steht ein Sprint Review.",
    points: 5,
    category: "Projektmanagement",
    difficulty: "leicht"
  },
  {
    id: "t1-pm-008",
    question: "Was ist der Zweck eines Lastenhefts?",
    options: [
      "Technische Lösung beschreiben",
      "Anforderungen des Auftraggebers dokumentieren (Was soll erreicht werden?)",
      "Projektkosten kalkulieren",
      "Testfälle definieren"
    ],
    correctIndex: 1,
    explanation: "Das Lastenheft beschreibt aus Sicht des Auftraggebers, WAS erreicht werden soll (Anforderungen). Das Pflichtenheft beschreibt später, WIE es umgesetzt wird.",
    points: 10,
    category: "Projektmanagement",
    difficulty: "mittel"
  },

  // =============================================================
  // WIRTSCHAFTS- UND SOZIALKUNDE (ca. 10%)
  // =============================================================
  {
    id: "t1-wiso-001",
    question: "Welche Aussage zum Arbeitsvertrag ist korrekt?",
    options: [
      "Er muss immer schriftlich abgeschlossen werden",
      "Er kann auch mündlich gültig sein, Schriftform ist aber empfohlen",
      "Er gilt automatisch unbefristet",
      "Er muss vom Betriebsrat unterschrieben werden"
    ],
    correctIndex: 1,
    explanation: "Ein Arbeitsvertrag kann grundsätzlich auch mündlich geschlossen werden. Das Nachweisgesetz verlangt jedoch, dass wesentliche Vertragsbedingungen schriftlich dokumentiert werden.",
    points: 5,
    category: "WiSo",
    difficulty: "leicht"
  },
  {
    id: "t1-wiso-002",
    question: "Was ist der Unterschied zwischen Brutto- und Nettolohn?",
    options: [
      "Brutto ist nach, Netto vor Abzügen",
      "Netto ist der Auszahlungsbetrag nach Abzug von Steuern und Sozialversicherung",
      "Es gibt keinen Unterschied",
      "Brutto enthält nur die Steuern"
    ],
    correctIndex: 1,
    explanation: "Bruttolohn ist der Gesamtbetrag vor Abzügen. Nettolohn ist was tatsächlich ausgezahlt wird - nach Abzug von Lohnsteuer, Solidaritätszuschlag und Sozialversicherungsbeiträgen.",
    points: 5,
    category: "WiSo",
    difficulty: "leicht"
  },
  {
    id: "t1-wiso-003",
    question: "Welche Sozialversicherungen gibt es in Deutschland (die 5 Säulen)?",
    options: [
      "Nur Renten- und Krankenversicherung",
      "Kranken-, Pflege-, Renten-, Arbeitslosen- und Unfallversicherung",
      "Haftpflicht-, Hausrat- und KFZ-Versicherung",
      "Lebens- und Berufsunfähigkeitsversicherung"
    ],
    correctIndex: 1,
    explanation: "Die 5 Säulen der Sozialversicherung: Kranken-, Pflege-, Renten-, Arbeitslosen- und Unfallversicherung. Arbeitgeber und Arbeitnehmer teilen sich die Beiträge (außer Unfallversicherung).",
    points: 10,
    category: "WiSo",
    difficulty: "mittel"
  },
  {
    id: "t1-wiso-004",
    question: "Was regelt das Jugendarbeitsschutzgesetz?",
    options: [
      "Den Mindestlohn für alle Arbeitnehmer",
      "Besondere Schutzvorschriften für Arbeitnehmer unter 18 Jahren",
      "Die Rentenversicherungspflicht",
      "Den Kündigungsschutz für Eltern"
    ],
    correctIndex: 1,
    explanation: "Das JArbSchG schützt Jugendliche (15-17 Jahre) mit besonderen Regelungen zu Arbeitszeit, Pausen, Nachtarbeit und gefährlichen Arbeiten.",
    points: 5,
    category: "WiSo",
    difficulty: "leicht"
  },
  {
    id: "t1-wiso-005",
    question: "Was ist Kurzarbeit?",
    options: [
      "Arbeit mit verkürzten Pausen",
      "Vorübergehende Reduzierung der Arbeitszeit bei Arbeitsausfall, mit Lohnausgleich durch die Agentur für Arbeit",
      "Teilzeitarbeit",
      "Arbeit am Wochenende"
    ],
    correctIndex: 1,
    explanation: "Bei Kurzarbeit wird die Arbeitszeit vorübergehend reduziert (z.B. bei Auftragsmangel). Die Agentur für Arbeit zahlt Kurzarbeitergeld als teilweisen Lohnausgleich.",
    points: 10,
    category: "WiSo",
    difficulty: "mittel"
  },
  {
    id: "t1-wiso-006",
    question: "Wie lang ist die gesetzliche Kündigungsfrist in der Probezeit?",
    options: [
      "1 Woche",
      "2 Wochen",
      "4 Wochen",
      "Sofort fristlos"
    ],
    correctIndex: 1,
    explanation: "In der Probezeit (max. 6 Monate) gilt eine Kündigungsfrist von 2 Wochen. Nach der Probezeit gilt die gesetzliche Frist von 4 Wochen zum 15. oder Monatsende.",
    points: 5,
    category: "WiSo",
    difficulty: "leicht"
  },

  // =============================================================
  // DATENSCHUTZ (ca. 10%)
  // =============================================================
  {
    id: "t1-ds-001",
    question: "Wofür steht DSGVO?",
    options: [
      "Datenschutz-Grundverordnung",
      "Deutsche Sicherheits-Gesetz-Verordnung",
      "Datenverarbeitungs-Standard-Gesetz-Ordnung",
      "Digital-Schutz-Gemeinschafts-Vorschrift"
    ],
    correctIndex: 0,
    explanation: "Die DSGVO (Datenschutz-Grundverordnung) ist seit Mai 2018 in Kraft und regelt EU-weit den Umgang mit personenbezogenen Daten.",
    points: 5,
    category: "Datenschutz",
    difficulty: "leicht"
  },
  {
    id: "t1-ds-002",
    question: "Was sind personenbezogene Daten nach DSGVO?",
    options: [
      "Nur Name und Adresse",
      "Alle Daten, die sich auf eine identifizierte oder identifizierbare Person beziehen",
      "Nur Gesundheitsdaten",
      "Nur digitale Daten"
    ],
    correctIndex: 1,
    explanation: "Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen - auch IP-Adressen, Cookies, Standortdaten.",
    points: 5,
    category: "Datenschutz",
    difficulty: "leicht"
  },
  {
    id: "t1-ds-003",
    question: "Was ist das Recht auf Vergessenwerden (Art. 17 DSGVO)?",
    options: [
      "Das Recht, Daten zu verschlüsseln",
      "Das Recht, die Löschung seiner personenbezogenen Daten zu verlangen",
      "Das Recht auf anonymes Surfen",
      "Das Recht auf Datenkopie"
    ],
    correctIndex: 1,
    explanation: "Art. 17 DSGVO gibt Betroffenen das Recht, die Löschung ihrer Daten zu verlangen, wenn z.B. der Zweck entfallen ist oder die Einwilligung widerrufen wurde.",
    points: 10,
    category: "Datenschutz",
    difficulty: "mittel"
  },
  {
    id: "t1-ds-004",
    question: "Was sind TOMs im Datenschutz?",
    options: [
      "Technische und Organisatorische Maßnahmen zum Datenschutz",
      "Tabellen-Organisations-Module",
      "Transfer-Optimierungs-Mechanismen",
      "Tracking-Online-Methoden"
    ],
    correctIndex: 0,
    explanation: "TOMs (Technische und Organisatorische Maßnahmen) sind Sicherheitsvorkehrungen zum Schutz personenbezogener Daten, z.B. Verschlüsselung, Zugangskontrollen, Backups.",
    points: 5,
    category: "Datenschutz",
    difficulty: "leicht"
  },
  {
    id: "t1-ds-005",
    question: "Was ist eine Datenschutz-Folgenabschätzung (DSFA)?",
    options: [
      "Eine jährliche Überprüfung",
      "Eine Risikobewertung bei Verarbeitungen mit hohem Risiko für Betroffene",
      "Ein Backup-Plan",
      "Eine Verschlüsselungsmethode"
    ],
    correctIndex: 1,
    explanation: "Die DSFA (Art. 35 DSGVO) ist eine Risikobewertung, die bei Verarbeitungen mit voraussichtlich hohem Risiko für die Rechte der Betroffenen durchgeführt werden muss.",
    points: 10,
    category: "Datenschutz",
    difficulty: "mittel"
  },
  {
    id: "t1-ds-006",
    question: "Was ist das Verzeichnis von Verarbeitungstätigkeiten?",
    options: [
      "Eine Liste aller Mitarbeiter",
      "Eine Dokumentation aller Datenverarbeitungen im Unternehmen nach Art. 30 DSGVO",
      "Eine Backup-Übersicht",
      "Eine Software-Liste"
    ],
    correctIndex: 1,
    explanation: "Das Verzeichnis von Verarbeitungstätigkeiten dokumentiert alle Datenverarbeitungen (Zweck, Kategorien, Empfänger, Löschfristen). Es ist eine Pflicht nach Art. 30 DSGVO.",
    points: 5,
    category: "Datenschutz",
    difficulty: "leicht"
  },

  // =============================================================
  // WEITERE IT-GRUNDLAGEN
  // =============================================================
  {
    id: "t1-it-011",
    question: "Was ist ein Betriebssystem?",
    options: [
      "Eine Anwendungssoftware",
      "Systemsoftware, die Hardware verwaltet und Schnittstelle für Programme bietet",
      "Ein Hardwarebauteil",
      "Eine Programmiersprache"
    ],
    correctIndex: 1,
    explanation: "Ein Betriebssystem (Windows, Linux, macOS) ist Systemsoftware, die Hardware verwaltet, Ressourcen zuteilt und Schnittstellen (APIs) für Anwendungsprogramme bereitstellt.",
    points: 5,
    category: "IT-Grundlagen",
    difficulty: "leicht"
  },
  {
    id: "t1-it-012",
    question: "Was ist der Unterschied zwischen Firmware und Software?",
    options: [
      "Es gibt keinen Unterschied",
      "Firmware ist auf Hardwarekomponenten gespeichert und eng mit Hardware verbunden",
      "Software ist langsamer",
      "Firmware ist nur für große Unternehmen"
    ],
    correctIndex: 1,
    explanation: "Firmware ist spezialisierte Software, die dauerhaft auf Hardwarekomponenten (BIOS, Router, Drucker) gespeichert ist und diese direkt steuert.",
    points: 10,
    category: "IT-Grundlagen",
    difficulty: "mittel"
  },
  {
    id: "t1-it-013",
    question: "Was bedeutet USB 3.0 SuperSpeed?",
    options: [
      "Eine Wireless-Verbindung",
      "USB-Standard mit bis zu 5 Gbit/s Übertragungsrate",
      "USB für Serveranwendungen",
      "Ein veralteter Standard"
    ],
    correctIndex: 1,
    explanation: "USB 3.0 SuperSpeed bietet Übertragungsraten bis 5 Gbit/s - 10x schneller als USB 2.0 (480 Mbit/s). Erkennbar an blauen Anschlüssen.",
    points: 5,
    category: "IT-Grundlagen",
    difficulty: "leicht"
  },

  // =============================================================
  // WEITERE NETZWERKTECHNIK
  // =============================================================
  {
    id: "t1-nw-015",
    question: "Was ist ein Proxy-Server?",
    options: [
      "Ein Backup-Server",
      "Ein Vermittler zwischen Client und Zielserver für Anfragen",
      "Ein DNS-Server",
      "Ein Mailserver"
    ],
    correctIndex: 1,
    explanation: "Ein Proxy-Server fungiert als Vermittler: Er empfängt Clientanfragen, leitet sie weiter und kann dabei cachen, filtern oder anonymisieren.",
    points: 10,
    category: "Netzwerktechnik",
    difficulty: "mittel"
  },
  {
    id: "t1-nw-016",
    question: "Welche Topologie hat das höchste Ausfallrisiko bei Kabelbruch?",
    options: [
      "Stern-Topologie",
      "Bus-Topologie",
      "Mesh-Topologie",
      "Ring-Topologie ohne Redundanz"
    ],
    correctIndex: 1,
    explanation: "Bei Bus-Topologie sind alle Geräte an einem Kabel. Ein Kabelbruch unterbricht die gesamte Kommunikation. Stern-Topologie ist robuster.",
    points: 10,
    category: "Netzwerktechnik",
    difficulty: "mittel"
  },

  // =============================================================
  // ZUSÄTZLICHE IT-GRUNDLAGEN
  // =============================================================
  {
    id: "t1-it-011",
    question: "Was ist der Unterschied zwischen USB 2.0 und USB 3.0?",
    options: [
      "USB 3.0 hat weniger Pins",
      "USB 3.0 bietet 5 Gbit/s statt 480 Mbit/s und mehr Stromversorgung",
      "USB 2.0 ist schneller",
      "Es gibt keinen Unterschied"
    ],
    correctIndex: 1,
    explanation: "USB 3.0 bietet bis zu 5 Gbit/s (SuperSpeed) vs. 480 Mbit/s bei USB 2.0. Erkennbar am blauen Anschluss. USB 3.0 liefert auch mehr Strom (900mA vs 500mA).",
    points: 5,
    category: "IT-Grundlagen",
    difficulty: "leicht"
  },
  {
    id: "t1-it-012",
    question: "Welche Funktion hat der Northbridge-Chip auf älteren Mainboards?",
    options: [
      "Verbindung mit USB-Geräten",
      "Verbindung von CPU, RAM und PCIe/AGP (Hochgeschwindigkeitskomponenten)",
      "Netzwerkkontroller",
      "Audio-Verarbeitung"
    ],
    correctIndex: 1,
    explanation: "Die Northbridge verbindet CPU mit RAM und schnellen Bussen (PCIe, AGP). Bei modernen CPUs ist diese Funktion meist in die CPU integriert.",
    points: 10,
    category: "IT-Grundlagen",
    difficulty: "mittel"
  },
  {
    id: "t1-it-013",
    question: "Was bedeutet ECC bei Arbeitsspeicher?",
    options: [
      "Extended Computer Cache",
      "Error Correcting Code - Erkennung und Korrektur von Bit-Fehlern",
      "Enhanced Clock Control",
      "External Communication Controller"
    ],
    correctIndex: 1,
    explanation: "ECC-RAM kann Einzelbit-Fehler automatisch korrigieren und Doppelbit-Fehler erkennen. Wichtig für Server und kritische Systeme zur Datensicherheit.",
    points: 10,
    category: "IT-Grundlagen",
    difficulty: "mittel"
  },
  {
    id: "t1-it-014",
    question: "Was ist der Unterschied zwischen DDR4 und DDR5 RAM?",
    options: [
      "DDR4 ist neuer",
      "DDR5 bietet höhere Bandbreite, Spannung von 1.1V und On-Die ECC",
      "DDR5 ist langsamer",
      "Es gibt keinen praktischen Unterschied"
    ],
    correctIndex: 1,
    explanation: "DDR5 bietet höhere Bandbreite (bis 8400 MT/s), niedrigere Spannung (1.1V vs 1.2V), On-Die ECC und zwei 32-Bit Kanäle pro DIMM.",
    points: 10,
    category: "IT-Grundlagen",
    difficulty: "mittel"
  },
  {
    id: "t1-it-015",
    question: "Was ist NVMe?",
    options: [
      "Ein Betriebssystem",
      "Ein Protokoll für Hochgeschwindigkeits-SSDs über PCIe",
      "Ein Netzwerkprotokoll",
      "Eine Virtualisierungstechnologie"
    ],
    correctIndex: 1,
    explanation: "NVMe (Non-Volatile Memory Express) ist ein Protokoll für SSDs über PCIe. Bietet niedrigere Latenz und höheren Durchsatz als SATA (bis 7000+ MB/s).",
    points: 10,
    category: "IT-Grundlagen",
    difficulty: "mittel"
  },
  {
    id: "t1-it-016",
    question: "Welche Aufgabe hat das TPM (Trusted Platform Module)?",
    options: [
      "Grafikbeschleunigung",
      "Sichere Speicherung von Verschlüsselungsschlüsseln und Integritätsprüfung",
      "Netzwerkverschlüsselung",
      "Audio-Verarbeitung"
    ],
    correctIndex: 1,
    explanation: "TPM ist ein Sicherheitschip für sichere Speicherung von Schlüsseln, Integritätsprüfung beim Boot und Hardware-basierte Verschlüsselung (BitLocker).",
    points: 10,
    category: "IT-Grundlagen",
    difficulty: "mittel"
  },

  // =============================================================
  // ZUSÄTZLICHE NETZWERKTECHNIK
  // =============================================================
  {
    id: "t1-nw-017",
    question: "Was ist der Unterschied zwischen Unicast, Broadcast und Multicast?",
    options: [
      "Es gibt keinen Unterschied",
      "Unicast: 1:1, Broadcast: 1:alle, Multicast: 1:Gruppe",
      "Broadcast ist schneller",
      "Multicast ist veraltet"
    ],
    correctIndex: 1,
    explanation: "Unicast: Ein Sender, ein Empfänger. Broadcast: Ein Sender, alle im Netz. Multicast: Ein Sender, ausgewählte Gruppe - effizient für Streaming.",
    points: 10,
    category: "Netzwerktechnik",
    difficulty: "mittel"
  },
  {
    id: "t1-nw-018",
    question: "Welcher Port wird für SSH verwendet?",
    options: ["21", "23", "22", "25"],
    correctIndex: 2,
    explanation: "SSH (Secure Shell) verwendet standardmäßig Port 22. Telnet (unsicher) verwendet Port 23, FTP Port 21, SMTP Port 25.",
    points: 5,
    category: "Netzwerktechnik",
    difficulty: "leicht"
  },
  {
    id: "t1-nw-019",
    question: "Was ist ein APIPA-Adresse?",
    options: [
      "Eine öffentliche IP-Adresse",
      "Eine selbst zugewiesene Adresse aus 169.254.x.x wenn DHCP fehlschlägt",
      "Eine IPv6-Adresse",
      "Eine Multicast-Adresse"
    ],
    correctIndex: 1,
    explanation: "APIPA (Automatic Private IP Addressing) weist 169.254.x.x zu, wenn kein DHCP-Server erreichbar ist. Ermöglicht lokale Kommunikation ohne DHCP.",
    points: 10,
    category: "Netzwerktechnik",
    difficulty: "mittel"
  },
  {
    id: "t1-nw-020",
    question: "Was macht das ICMP-Protokoll?",
    options: [
      "Überträgt E-Mails",
      "Sendet Steuer- und Fehlermeldungen (z.B. Ping, Unreachable)",
      "Verschlüsselt Daten",
      "Verteilt IP-Adressen"
    ],
    correctIndex: 1,
    explanation: "ICMP (Internet Control Message Protocol) dient für Fehlermeldungen und Diagnose. Bekannt durch Ping (Echo Request/Reply) und Traceroute.",
    points: 5,
    category: "Netzwerktechnik",
    difficulty: "leicht"
  },
  {
    id: "t1-nw-021",
    question: "Was ist ein FQDN?",
    options: [
      "Fast Query Domain Name",
      "Fully Qualified Domain Name - vollständiger Domainname inkl. TLD",
      "File Query Data Network",
      "Firewall Qualified Data Network"
    ],
    correctIndex: 1,
    explanation: "FQDN ist der vollständige Domainname mit allen Ebenen, z.B. server.firma.de. Enthält Hostname, Domain und Top-Level-Domain.",
    points: 5,
    category: "Netzwerktechnik",
    difficulty: "leicht"
  },
  {
    id: "t1-nw-022",
    question: "Wie funktioniert ein 3-Way-Handshake bei TCP?",
    options: [
      "SYN → ACK → FIN",
      "SYN → SYN-ACK → ACK",
      "ACK → SYN → FIN",
      "FIN → ACK → RST"
    ],
    correctIndex: 1,
    explanation: "TCP-Verbindungsaufbau: Client sendet SYN, Server antwortet mit SYN-ACK, Client bestätigt mit ACK. Dann ist die Verbindung etabliert.",
    points: 10,
    category: "Netzwerktechnik",
    difficulty: "mittel"
  },

  // =============================================================
  // ZUSÄTZLICHE IT-SICHERHEIT
  // =============================================================
  {
    id: "t1-sec-013",
    question: "Was ist ein Man-in-the-Middle-Angriff?",
    options: [
      "Ein physischer Einbruch",
      "Angreifer schaltet sich zwischen Kommunikationspartner und kann Daten mitlesen/ändern",
      "Ein Virus",
      "Ein Denial-of-Service-Angriff"
    ],
    correctIndex: 1,
    explanation: "Bei MitM platziert sich der Angreifer zwischen Sender und Empfänger. Kann Daten abfangen, lesen und manipulieren. Schutz: TLS, Zertifikate.",
    points: 10,
    category: "IT-Sicherheit",
    difficulty: "mittel"
  },
  {
    id: "t1-sec-014",
    question: "Was ist das Prinzip der geringsten Rechte (Least Privilege)?",
    options: [
      "Jeder Benutzer bekommt Admin-Rechte",
      "Benutzer erhalten nur die minimal notwendigen Berechtigungen für ihre Aufgaben",
      "Alle Rechte werden zentral verwaltet",
      "Gäste haben die gleichen Rechte wie Admins"
    ],
    correctIndex: 1,
    explanation: "Least Privilege bedeutet, dass Benutzer und Prozesse nur die minimal notwendigen Rechte erhalten. Reduziert Angriffsfläche und Schadenspotenzial.",
    points: 10,
    category: "IT-Sicherheit",
    difficulty: "mittel"
  },
  {
    id: "t1-sec-015",
    question: "Was ist ein Keylogger?",
    options: [
      "Ein Passwort-Manager",
      "Schadsoftware, die alle Tastatureingaben aufzeichnet",
      "Ein Verschlüsselungstool",
      "Eine Firewall"
    ],
    correctIndex: 1,
    explanation: "Ein Keylogger zeichnet alle Tastatureingaben auf, um Passwörter, Kreditkartendaten etc. zu stehlen. Kann als Software oder Hardware existieren.",
    points: 5,
    category: "IT-Sicherheit",
    difficulty: "leicht"
  },
  {
    id: "t1-sec-016",
    question: "Was bedeutet Zero Trust?",
    options: [
      "Niemandem wird vertraut",
      "Nie blind vertrauen, immer verifizieren - auch im internen Netzwerk",
      "Alle Verbindungen sind unsicher",
      "Keine Verschlüsselung verwenden"
    ],
    correctIndex: 1,
    explanation: "Zero Trust: 'Never trust, always verify'. Kein automatisches Vertrauen basierend auf Netzwerk-Location. Jeder Zugriff wird authentifiziert und autorisiert.",
    points: 10,
    category: "IT-Sicherheit",
    difficulty: "mittel"
  },
  {
    id: "t1-sec-017",
    question: "Was ist ein Sicherheitsaudit?",
    options: [
      "Installation von Antivirus",
      "Systematische Überprüfung der IT-Sicherheit auf Schwachstellen und Compliance",
      "Backup aller Daten",
      "Update aller Systeme"
    ],
    correctIndex: 1,
    explanation: "Ein Sicherheitsaudit ist eine systematische Überprüfung der IT-Infrastruktur auf Sicherheitslücken, Compliance-Verletzungen und Best Practices.",
    points: 10,
    category: "IT-Sicherheit",
    difficulty: "mittel"
  },
  {
    id: "t1-sec-018",
    question: "Was ist XSS (Cross-Site Scripting)?",
    options: [
      "Eine Verschlüsselungsmethode",
      "Einschleusen von Schadcode in Webseiten, der im Browser anderer Nutzer ausgeführt wird",
      "Ein Netzwerkprotokoll",
      "Eine Firewall-Regel"
    ],
    correctIndex: 1,
    explanation: "XSS ermöglicht Angreifern, JavaScript-Code in Webseiten einzuschleusen, der bei anderen Nutzern ausgeführt wird. Kann Cookies stehlen, Sessions hijacken.",
    points: 10,
    category: "IT-Sicherheit",
    difficulty: "mittel"
  },

  // =============================================================
  // ZUSÄTZLICHE BETRIEBSSYSTEME
  // =============================================================
  {
    id: "t1-os-009",
    question: "Was ist ein Bootloader?",
    options: [
      "Ein Antivirenprogramm",
      "Software, die das Betriebssystem in den Speicher lädt und startet",
      "Ein Netzwerkprotokoll",
      "Ein Dateisystem"
    ],
    correctIndex: 1,
    explanation: "Ein Bootloader (z.B. GRUB, Windows Boot Manager) wird vom BIOS/UEFI geladen und startet das Betriebssystem. Kann bei Multi-Boot zwischen OS wählen.",
    points: 5,
    category: "Betriebssysteme",
    difficulty: "leicht"
  },
  {
    id: "t1-os-010",
    question: "Was ist der Unterschied zwischen MBR und GPT?",
    options: [
      "MBR ist neuer",
      "GPT unterstützt größere Festplatten (>2TB) und mehr Partitionen als MBR",
      "Es gibt keinen Unterschied",
      "GPT ist nur für USB-Sticks"
    ],
    correctIndex: 1,
    explanation: "MBR: Max 2TB, 4 primäre Partitionen. GPT: Unterstützt 9.4 ZB, 128+ Partitionen, CRC-Prüfsummen, benötigt UEFI. GPT ist der moderne Standard.",
    points: 10,
    category: "Betriebssysteme",
    difficulty: "mittel"
  },
  {
    id: "t1-os-011",
    question: "Was ist ein Kernel?",
    options: [
      "Das Benutzerinterface",
      "Der zentrale Kern des Betriebssystems, der Hardware-Zugriff und Prozesse verwaltet",
      "Ein Anwendungsprogramm",
      "Der Desktop-Manager"
    ],
    correctIndex: 1,
    explanation: "Der Kernel ist der zentrale Teil des OS. Er verwaltet Hardware-Zugriff, Speicher, Prozesse und bietet Schnittstellen für Programme.",
    points: 5,
    category: "Betriebssysteme",
    difficulty: "leicht"
  },
  {
    id: "t1-os-012",
    question: "Was ist Paging im Zusammenhang mit Speicherverwaltung?",
    options: [
      "Das Ausdrucken von Dokumenten",
      "Aufteilung des Speichers in feste Blöcke (Pages) für virtuelle Speicherverwaltung",
      "Das Erstellen von Webseiten",
      "Ein Backup-Verfahren"
    ],
    correctIndex: 1,
    explanation: "Paging teilt den Speicher in feste Blöcke (Pages). Ermöglicht virtuellen Speicher - nicht benötigte Pages werden auf Festplatte ausgelagert (Swap).",
    points: 15,
    category: "Betriebssysteme",
    difficulty: "schwer"
  },

  // =============================================================
  // ZUSÄTZLICHE PROGRAMMIERUNG
  // =============================================================
  {
    id: "t1-prog-009",
    question: "Was ist der Unterschied zwischen Kompilieren und Interpretieren?",
    options: [
      "Es gibt keinen Unterschied",
      "Compiler übersetzt einmal komplett, Interpreter führt zeilenweise aus",
      "Interpreter ist schneller",
      "Compiler sind veraltet"
    ],
    correctIndex: 1,
    explanation: "Compiler: Übersetzt gesamten Code vor Ausführung in Maschinencode (C, Java). Interpreter: Führt Code zeilenweise aus (Python, JavaScript). Compiler meist schneller.",
    points: 10,
    category: "Programmierung",
    difficulty: "mittel"
  },
  {
    id: "t1-prog-010",
    question: "Was ist Pseudocode?",
    options: [
      "Fehlerhafter Code",
      "Informelle, sprachunabhängige Beschreibung eines Algorithmus",
      "Ein Programmiersprache",
      "Verschlüsselter Code"
    ],
    correctIndex: 1,
    explanation: "Pseudocode ist eine informelle Notation zur Beschreibung von Algorithmen in lesbarer Form, unabhängig von einer konkreten Programmiersprache.",
    points: 5,
    category: "Programmierung",
    difficulty: "leicht"
  },
  {
    id: "t1-prog-011",
    question: "Was ist ein Struktogramm (Nassi-Shneiderman-Diagramm)?",
    options: [
      "Ein Netzwerkdiagramm",
      "Grafische Darstellung von Programmabläufen mit verschachtelten Blöcken",
      "Ein Datenbankschema",
      "Ein UML-Klassendiagramm"
    ],
    correctIndex: 1,
    explanation: "Struktogramme visualisieren Programmlogik. Blöcke für Sequenz, Verzweigung, Schleifen werden verschachtelt dargestellt - zeigt Programmstruktur.",
    points: 10,
    category: "Programmierung",
    difficulty: "mittel"
  },
  {
    id: "t1-prog-012",
    question: "Was bedeutet 'rekursiv' in der Programmierung?",
    options: [
      "Eine Schleife",
      "Eine Funktion ruft sich selbst auf",
      "Parallele Ausführung",
      "Fehlerbehandlung"
    ],
    correctIndex: 1,
    explanation: "Rekursion bedeutet, dass eine Funktion sich selbst aufruft. Benötigt eine Abbruchbedingung, sonst entsteht eine Endlosschleife (Stack Overflow).",
    points: 10,
    category: "Programmierung",
    difficulty: "mittel"
  },

  // =============================================================
  // ZUSÄTZLICHE PROJEKTMANAGEMENT
  // =============================================================
  {
    id: "t1-pm-006",
    question: "Was ist ein Gantt-Diagramm?",
    options: [
      "Ein Netzwerkdiagramm",
      "Balkendiagramm zur Darstellung von Projektplänen mit Zeitachse",
      "Ein Organigramm",
      "Ein Kostendiagramm"
    ],
    correctIndex: 1,
    explanation: "Gantt-Diagramm zeigt Projektaufgaben als horizontale Balken auf einer Zeitachse. Visualisiert Dauer, Überlappungen und Abhängigkeiten.",
    points: 5,
    category: "Projektmanagement",
    difficulty: "leicht"
  },
  {
    id: "t1-pm-007",
    question: "Was ist der kritische Pfad?",
    options: [
      "Der wichtigste Mitarbeiter",
      "Die längste Kette abhängiger Aufgaben, die die Mindestprojektdauer bestimmt",
      "Der riskanteste Teil des Projekts",
      "Der Pfad mit den meisten Kosten"
    ],
    correctIndex: 1,
    explanation: "Der kritische Pfad ist die längste Abfolge abhängiger Aufgaben. Verzögerungen auf diesem Pfad verzögern das gesamte Projekt.",
    points: 10,
    category: "Projektmanagement",
    difficulty: "mittel"
  },
  {
    id: "t1-pm-008",
    question: "Was sind Meilensteine im Projektmanagement?",
    options: [
      "Tägliche Aufgaben",
      "Wichtige Zwischenziele oder Ereignisse mit festen Terminen",
      "Die Projektkosten",
      "Die Teammitglieder"
    ],
    correctIndex: 1,
    explanation: "Meilensteine sind wichtige Zwischenziele (z.B. 'Design abgeschlossen', 'Testphase begonnen'). Sie haben keine Dauer, markieren Ereignisse.",
    points: 5,
    category: "Projektmanagement",
    difficulty: "leicht"
  }
];
