import type { ExamQuestion } from "@/types/exam";

export const teil2Questions: ExamQuestion[] = [
  // ===== Systemintegration Kernbereich (ca. 40%) =====
  {
    id: "t2-si-001",
    question: "Welche RAID-Konfiguration bietet Redundanz ohne Paritätsinformationen?",
    options: ["RAID 0", "RAID 1", "RAID 5", "RAID 0+1 nur"],
    correctIndex: 1,
    explanation: "RAID 1 (Mirroring) spiegelt Daten auf zwei Festplatten - 100% Redundanz ohne Parität. Bei Ausfall einer Platte sind alle Daten noch vorhanden.",
    points: 10,
    category: "Systemintegration",
    difficulty: "mittel"
  },
  {
    id: "t2-si-002",
    question: "Was ist der Hauptvorteil von RAID 5 gegenüber RAID 1?",
    options: [
      "Schnellere Schreibgeschwindigkeit",
      "Bessere Speicherausnutzung bei erhaltener Redundanz",
      "Einfachere Konfiguration",
      "Keine Paritätsberechnung nötig"
    ],
    correctIndex: 1,
    explanation: "RAID 5 nutzt verteilte Parität. Bei n Platten gehen nur 1/n für Parität verloren (z.B. 3 Platten = 66% nutzbar), während RAID 1 nur 50% bietet.",
    points: 10,
    category: "Systemintegration",
    difficulty: "mittel"
  },
  {
    id: "t2-si-003",
    question: "Was ist der Unterschied zwischen SAN und NAS?",
    options: [
      "SAN ist für Backups, NAS für normale Speicherung",
      "SAN bietet Block-Level-Zugriff, NAS bietet File-Level-Zugriff",
      "NAS ist schneller als SAN",
      "Es gibt keinen wesentlichen Unterschied"
    ],
    correctIndex: 1,
    explanation: "SAN (Storage Area Network) bietet Block-Level-Zugriff über Fibre Channel/iSCSI. NAS (Network Attached Storage) bietet File-Level-Zugriff über SMB/NFS.",
    points: 10,
    category: "Systemintegration",
    difficulty: "schwer"
  },
  {
    id: "t2-si-004",
    question: "Was ist Virtualisierung?",
    options: [
      "Die Verschlüsselung von Servern",
      "Die Abstraktion physischer Ressourcen zur Erstellung mehrerer virtueller Umgebungen",
      "Die Verbindung mehrerer Computer zu einem",
      "Die Speicherung von Daten in der Cloud"
    ],
    correctIndex: 1,
    explanation: "Virtualisierung abstrahiert physische Hardware, um mehrere virtuelle Maschinen (VMs) auf einem Host zu betreiben. Ermöglicht bessere Ressourcennutzung und Flexibilität.",
    points: 5,
    category: "Systemintegration",
    difficulty: "leicht"
  },
  {
    id: "t2-si-005",
    question: "Was ist der Unterschied zwischen Typ-1 und Typ-2 Hypervisoren?",
    options: [
      "Typ-1 ist für Windows, Typ-2 für Linux",
      "Typ-1 läuft direkt auf Hardware (Bare-Metal), Typ-2 auf einem Betriebssystem",
      "Typ-2 ist performanter als Typ-1",
      "Es gibt keinen Unterschied"
    ],
    correctIndex: 1,
    explanation: "Typ-1 (Bare-Metal): VMware ESXi, Hyper-V - direkt auf Hardware. Typ-2 (Hosted): VirtualBox, VMware Workstation - auf Betriebssystem. Typ-1 ist performanter.",
    points: 10,
    category: "Systemintegration",
    difficulty: "mittel"
  },
  {
    id: "t2-si-006",
    question: "Welcher Befehl zeigt unter Linux alle laufenden Prozesse mit Details?",
    options: ["ls -la", "ps aux", "top", "cat /proc"],
    correctIndex: 1,
    explanation: "ps aux zeigt alle Prozesse (a), auch anderer User (u), mit detaillierten Infos (x). top zeigt dynamisch, ps ist eine Momentaufnahme.",
    points: 5,
    category: "Systemintegration",
    difficulty: "leicht"
  },
  {
    id: "t2-si-007",
    question: "Was bewirkt der Linux-Befehl 'chmod 755 datei.sh'?",
    options: [
      "Löscht die Datei",
      "Owner: rwx, Gruppe/Andere: rx (Lesen+Ausführen)",
      "Alle Benutzer erhalten volle Rechte",
      "Die Datei wird verschlüsselt"
    ],
    correctIndex: 1,
    explanation: "chmod 755: Owner erhält 7 (rwx), Gruppe 5 (r-x), Andere 5 (r-x). Typisch für ausführbare Skripte, die jeder lesen und ausführen, aber nur Owner ändern darf.",
    points: 10,
    category: "Systemintegration",
    difficulty: "mittel"
  },
  {
    id: "t2-si-008",
    question: "Was ist Active Directory?",
    options: [
      "Ein Antivirenprogramm",
      "Ein Verzeichnisdienst von Microsoft für zentrale Benutzer- und Ressourcenverwaltung",
      "Eine Datenbank-Software",
      "Ein Backup-System"
    ],
    correctIndex: 1,
    explanation: "Active Directory (AD) ist Microsofts Verzeichnisdienst für zentrale Verwaltung von Benutzern, Computern, Gruppen und Richtlinien in Windows-Netzwerken.",
    points: 5,
    category: "Systemintegration",
    difficulty: "leicht"
  },
  {
    id: "t2-si-009",
    question: "Was ist der Unterschied zwischen DNS und DHCP?",
    options: [
      "Beide machen das Gleiche",
      "DNS löst Namen zu IP-Adressen auf, DHCP verteilt IP-Adressen automatisch",
      "DHCP ist für Webseiten, DNS für E-Mail",
      "DNS ist schneller als DHCP"
    ],
    correctIndex: 1,
    explanation: "DNS (Domain Name System) übersetzt Domainnamen in IP-Adressen. DHCP (Dynamic Host Configuration Protocol) weist Clients automatisch IP-Adressen zu.",
    points: 5,
    category: "Systemintegration",
    difficulty: "leicht"
  },
  {
    id: "t2-si-010",
    question: "Was ist ein VLAN?",
    options: [
      "Ein virtuelles lokales Netzwerk zur logischen Segmentierung",
      "Ein VPN-Protokoll",
      "Eine Verschlüsselungsmethode",
      "Ein Wireless-Standard"
    ],
    correctIndex: 0,
    explanation: "VLAN (Virtual LAN) segmentiert ein physisches Netzwerk logisch in mehrere getrennte Broadcast-Domänen für Sicherheit und Performance.",
    points: 10,
    category: "Systemintegration",
    difficulty: "mittel"
  },

  // ===== Netzwerk-Vertiefung (ca. 25%) =====
  {
    id: "t2-nw-001",
    question: "Berechnen Sie: Welche Netzwerkadresse hat 192.168.10.67/28?",
    options: ["192.168.10.0", "192.168.10.64", "192.168.10.48", "192.168.10.80"],
    correctIndex: 1,
    explanation: "/28 = 16 Adressen pro Subnetz. 67 ÷ 16 = 4,1875, also 4 × 16 = 64. Netzwerkadresse ist 192.168.10.64.",
    points: 15,
    category: "Netzwerktechnik",
    difficulty: "schwer"
  },
  {
    id: "t2-nw-002",
    question: "Was ist der Broadcast-Adresse des Subnetzes 10.20.30.0/25?",
    options: ["10.20.30.127", "10.20.30.255", "10.20.30.128", "10.20.30.63"],
    correctIndex: 0,
    explanation: "/25 = 128 Adressen. Netzwerk 10.20.30.0, Broadcast = letzte Adresse = 10.20.30.127. Nutzbar: .1 bis .126.",
    points: 15,
    category: "Netzwerktechnik",
    difficulty: "schwer"
  },
  {
    id: "t2-nw-003",
    question: "Welches Routing-Protokoll ist ein Link-State-Protokoll?",
    options: ["RIP", "OSPF", "IGRP", "BGP"],
    correctIndex: 1,
    explanation: "OSPF (Open Shortest Path First) ist ein Link-State-Protokoll - jeder Router kennt die komplette Topologie. RIP ist Distance-Vector.",
    points: 10,
    category: "Netzwerktechnik",
    difficulty: "mittel"
  },
  {
    id: "t2-nw-004",
    question: "Was ist der Unterschied zwischen Routing und Switching?",
    options: [
      "Es gibt keinen Unterschied",
      "Routing arbeitet auf Layer 3 mit IP, Switching auf Layer 2 mit MAC-Adressen",
      "Switching ist langsamer als Routing",
      "Routing ist nur für WAN, Switching nur für LAN"
    ],
    correctIndex: 1,
    explanation: "Switching (Layer 2) leitet Frames anhand von MAC-Adressen weiter. Routing (Layer 3) leitet Pakete anhand von IP-Adressen zwischen Netzwerken weiter.",
    points: 5,
    category: "Netzwerktechnik",
    difficulty: "leicht"
  },
  {
    id: "t2-nw-005",
    question: "Was ist ein VPN und wofür wird es verwendet?",
    options: [
      "Virtual Private Network - sichere, verschlüsselte Verbindung über unsichere Netzwerke",
      "Very Private Network - nur für Unternehmen",
      "Virtual Public Network - öffentliche Verbindungen",
      "Ein Antivirenprogramm"
    ],
    correctIndex: 0,
    explanation: "VPN (Virtual Private Network) erstellt einen verschlüsselten Tunnel über unsichere Netzwerke (z.B. Internet), um sichere Kommunikation zu ermöglichen.",
    points: 5,
    category: "Netzwerktechnik",
    difficulty: "leicht"
  },
  {
    id: "t2-nw-006",
    question: "Welches Protokoll verwendet IPsec für den Schlüsselaustausch?",
    options: ["SSL/TLS", "IKE (Internet Key Exchange)", "PPTP", "L2TP"],
    correctIndex: 1,
    explanation: "IPsec verwendet IKE (Internet Key Exchange) für den sicheren Austausch von Verschlüsselungsschlüsseln zwischen VPN-Endpunkten.",
    points: 10,
    category: "Netzwerktechnik",
    difficulty: "schwer"
  },

  // ===== Datenbankadministration (ca. 15%) =====
  {
    id: "t2-db-001",
    question: "Was ist Normalisierung in Datenbanken?",
    options: [
      "Die Verschlüsselung von Daten",
      "Die strukturierte Aufteilung von Daten zur Vermeidung von Redundanz",
      "Die Komprimierung von Datenbanken",
      "Die Sicherung von Datenbanken"
    ],
    correctIndex: 1,
    explanation: "Normalisierung ist der Prozess der strukturierten Aufteilung von Daten in Tabellen, um Redundanz zu minimieren und Datenintegrität zu gewährleisten.",
    points: 10,
    category: "Datenbanken",
    difficulty: "mittel"
  },
  {
    id: "t2-db-002",
    question: "Was bewirkt ein SQL INNER JOIN?",
    options: [
      "Gibt alle Zeilen beider Tabellen zurück",
      "Gibt nur Zeilen zurück, die in beiden Tabellen übereinstimmen",
      "Löscht doppelte Einträge",
      "Erstellt eine neue Tabelle"
    ],
    correctIndex: 1,
    explanation: "INNER JOIN gibt nur Zeilen zurück, bei denen die Join-Bedingung in beiden Tabellen erfüllt ist. Zeilen ohne Übereinstimmung werden ausgelassen.",
    points: 10,
    category: "Datenbanken",
    difficulty: "mittel"
  },
  {
    id: "t2-db-003",
    question: "Was ist ein Primärschlüssel?",
    options: [
      "Ein Passwort für die Datenbank",
      "Ein eindeutiges Identifikationsmerkmal für jeden Datensatz einer Tabelle",
      "Der erste Eintrag einer Tabelle",
      "Ein Backup-Schlüssel"
    ],
    correctIndex: 1,
    explanation: "Ein Primärschlüssel ist ein eindeutiger Identifikator für jeden Datensatz. Er darf nicht NULL sein und muss in der Tabelle einzigartig sein.",
    points: 5,
    category: "Datenbanken",
    difficulty: "leicht"
  },
  {
    id: "t2-db-004",
    question: "Was macht ein Index in einer Datenbank?",
    options: [
      "Sichert die Daten",
      "Beschleunigt Suchanfragen durch sortierte Datenstruktur",
      "Verschlüsselt die Tabelle",
      "Komprimiert die Daten"
    ],
    correctIndex: 1,
    explanation: "Ein Index ist eine Datenstruktur, die Suchanfragen beschleunigt, indem sie einen schnellen Zugriffspfad zu den Daten bietet - ähnlich einem Buchindex.",
    points: 5,
    category: "Datenbanken",
    difficulty: "leicht"
  },
  {
    id: "t2-db-005",
    question: "Was bedeutet ACID bei Datenbank-Transaktionen?",
    options: [
      "Access, Control, Index, Database",
      "Atomicity, Consistency, Isolation, Durability",
      "Advanced Computing Interface Design",
      "Automatic Cluster Integration Deployment"
    ],
    correctIndex: 1,
    explanation: "ACID: Atomicity (alles oder nichts), Consistency (gültiger Zustand), Isolation (Transaktionen unabhängig), Durability (Änderungen dauerhaft).",
    points: 15,
    category: "Datenbanken",
    difficulty: "schwer"
  },

  // ===== IT-Service-Management (ca. 10%) =====
  {
    id: "t2-itsm-001",
    question: "Was ist ITIL?",
    options: [
      "Eine Programmiersprache",
      "Ein Framework für IT-Service-Management Best Practices",
      "Ein Betriebssystem",
      "Eine Zertifizierung für Programmierer"
    ],
    correctIndex: 1,
    explanation: "ITIL (IT Infrastructure Library) ist ein Framework mit Best Practices für IT-Service-Management, das Prozesse wie Incident, Problem und Change Management beschreibt.",
    points: 5,
    category: "IT-Service-Management",
    difficulty: "leicht"
  },
  {
    id: "t2-itsm-002",
    question: "Was ist der Unterschied zwischen Incident und Problem in ITIL?",
    options: [
      "Es gibt keinen Unterschied",
      "Incident ist die Störung, Problem ist die zugrundeliegende Ursache",
      "Problem ist dringender als Incident",
      "Incident betrifft nur Hardware"
    ],
    correctIndex: 1,
    explanation: "Incident: Ungeplante Unterbrechung eines IT-Services (Symptom). Problem: Die zugrundeliegende Ursache eines oder mehrerer Incidents (Root Cause).",
    points: 10,
    category: "IT-Service-Management",
    difficulty: "mittel"
  },
  {
    id: "t2-itsm-003",
    question: "Was ist ein SLA (Service Level Agreement)?",
    options: [
      "Ein Software-Lizenzvertrag",
      "Eine vertragliche Vereinbarung über Qualität und Umfang von IT-Services",
      "Ein Sicherheitsprotokoll",
      "Eine Backup-Strategie"
    ],
    correctIndex: 1,
    explanation: "SLA ist eine vertragliche Vereinbarung, die Service-Qualität definiert: Verfügbarkeit (z.B. 99,9%), Reaktionszeiten, Support-Zeiten, Eskalationswege.",
    points: 5,
    category: "IT-Service-Management",
    difficulty: "leicht"
  },
  {
    id: "t2-itsm-004",
    question: "Was ist Change Management?",
    options: [
      "Die Verwaltung von Kleingeld",
      "Der kontrollierte Prozess zur Durchführung von Änderungen an IT-Systemen",
      "Die Änderung von Passwörtern",
      "Ein Backup-Verfahren"
    ],
    correctIndex: 1,
    explanation: "Change Management ist der ITIL-Prozess zur kontrollierten Planung, Genehmigung und Durchführung von Änderungen, um Risiken zu minimieren.",
    points: 10,
    category: "IT-Service-Management",
    difficulty: "mittel"
  },

  // ===== Sicherheit & Compliance (ca. 10%) =====
  {
    id: "t2-sec-001",
    question: "Was ist ein Penetrationstest?",
    options: [
      "Ein Belastungstest für Server",
      "Ein autorisierter simulierter Angriff zur Identifikation von Schwachstellen",
      "Ein Test der Internetgeschwindigkeit",
      "Ein Backup-Test"
    ],
    correctIndex: 1,
    explanation: "Ein Penetrationstest (Pentest) ist ein autorisierter, kontrollierter Angriff auf IT-Systeme, um Sicherheitslücken zu finden, bevor echte Angreifer sie ausnutzen.",
    points: 10,
    category: "IT-Sicherheit",
    difficulty: "mittel"
  },
  {
    id: "t2-sec-002",
    question: "Was ist das Prinzip des 'Least Privilege'?",
    options: [
      "Alle Benutzer erhalten Admin-Rechte",
      "Benutzer erhalten nur die minimal notwendigen Berechtigungen",
      "Privilegierte Benutzer werden bevorzugt behandelt",
      "Rechte werden nach Betriebszugehörigkeit vergeben"
    ],
    correctIndex: 1,
    explanation: "Least Privilege bedeutet, dass jeder Benutzer/Prozess nur die minimal notwendigen Rechte erhält, um seine Aufgabe zu erfüllen - reduziert Angriffsfläche und Schadensausmaß.",
    points: 10,
    category: "IT-Sicherheit",
    difficulty: "mittel"
  },
  {
    id: "t2-sec-003",
    question: "Was ist ein DMZ (Demilitarisierte Zone) im Netzwerk?",
    options: [
      "Ein verschlüsseltes Netzwerksegment",
      "Ein separates Netzwerksegment zwischen Internet und internem Netz für öffentliche Server",
      "Ein WLAN-Bereich",
      "Ein VPN-Tunnel"
    ],
    correctIndex: 1,
    explanation: "Eine DMZ ist ein Netzwerksegment zwischen externem (Internet) und internem Netzwerk, in dem öffentlich erreichbare Server (Web, Mail) stehen - durch Firewalls geschützt.",
    points: 10,
    category: "IT-Sicherheit",
    difficulty: "mittel"
  },
  {
    id: "t2-sec-004",
    question: "Was ist ein Disaster Recovery Plan?",
    options: [
      "Ein Versicherungsvertrag",
      "Ein dokumentierter Plan zur Wiederherstellung von IT-Systemen nach einem Notfall",
      "Ein Anti-Virus-Programm",
      "Eine Backup-Software"
    ],
    correctIndex: 1,
    explanation: "Ein Disaster Recovery Plan dokumentiert Verfahren zur Wiederherstellung kritischer IT-Systeme nach Katastrophen (Brand, Überschwemmung, Cyberangriff).",
    points: 5,
    category: "IT-Sicherheit",
    difficulty: "leicht"
  },
  {
    id: "t2-sec-005",
    question: "Was sind RTO und RPO?",
    options: [
      "Netzwerkprotokolle",
      "Recovery Time Objective und Recovery Point Objective für Disaster Recovery",
      "Programmiersprachen",
      "Servertypen"
    ],
    correctIndex: 1,
    explanation: "RTO (Recovery Time Objective): Maximale Ausfallzeit. RPO (Recovery Point Objective): Maximaler akzeptabler Datenverlust (Zeit seit letztem Backup).",
    points: 15,
    category: "IT-Sicherheit",
    difficulty: "schwer"
  }
];
