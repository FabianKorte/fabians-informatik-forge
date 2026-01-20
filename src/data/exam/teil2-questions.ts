import type { ExamQuestion } from "@/types/exam";

export const teil2Questions: ExamQuestion[] = [
  // =============================================================
  // SYSTEMINTEGRATION KERNBEREICH (ca. 40%)
  // =============================================================
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
  {
    id: "t2-si-011",
    question: "Was ist ein Container im Vergleich zu einer virtuellen Maschine?",
    options: [
      "Ein Container ist größer und langsamer",
      "Container teilen den Kernel mit dem Host und sind leichtgewichtiger als VMs",
      "VMs sind sicherer als Container",
      "Es gibt keinen Unterschied"
    ],
    correctIndex: 1,
    explanation: "Container (Docker, Kubernetes) teilen den Host-Kernel und isolieren nur Prozesse - schneller Start, weniger Ressourcen. VMs virtualisieren komplette Hardware mit eigenem Betriebssystem.",
    points: 15,
    category: "Systemintegration",
    difficulty: "schwer"
  },
  {
    id: "t2-si-012",
    question: "Was ist der Zweck von Gruppenrichtlinien (GPO) in Active Directory?",
    options: [
      "Nur für Benutzeranmeldung",
      "Zentrale Konfiguration und Verwaltung von Computern und Benutzern im Netzwerk",
      "Nur für Druckerverwaltung",
      "Nur für Firewall-Regeln"
    ],
    correctIndex: 1,
    explanation: "GPOs (Group Policy Objects) ermöglichen zentrale Konfiguration: Sicherheitseinstellungen, Software-Installation, Desktop-Richtlinien für Benutzer und Computer im AD.",
    points: 10,
    category: "Systemintegration",
    difficulty: "mittel"
  },
  {
    id: "t2-si-013",
    question: "Was macht der Linux-Befehl 'grep -r \"error\" /var/log/'?",
    options: [
      "Löscht alle Error-Dateien",
      "Sucht rekursiv nach 'error' in allen Dateien unter /var/log/",
      "Zeigt nur Fehlermeldungen an",
      "Startet den Error-Dienst"
    ],
    correctIndex: 1,
    explanation: "grep durchsucht Dateien nach Muster. -r = rekursiv (alle Unterverzeichnisse). Hier: Sucht 'error' in allen Log-Dateien. Wichtig für Fehleranalyse.",
    points: 10,
    category: "Systemintegration",
    difficulty: "mittel"
  },
  {
    id: "t2-si-014",
    question: "Was ist ein Reverse Proxy?",
    options: [
      "Ein Proxy für rückwärtige Verbindungen",
      "Ein Server vor Webservern, der Anfragen entgegennimmt und an Backend-Server verteilt",
      "Ein VPN-Dienst",
      "Ein Backup-Proxy"
    ],
    correctIndex: 1,
    explanation: "Ein Reverse Proxy (z.B. nginx, HAProxy) sitzt vor Backend-Servern, verteilt Last (Load Balancing), terminiert SSL, cached Inhalte und schützt die echten Server.",
    points: 15,
    category: "Systemintegration",
    difficulty: "schwer"
  },
  {
    id: "t2-si-015",
    question: "Was ist der Unterschied zwischen LVM und klassischen Partitionen?",
    options: [
      "LVM ist langsamer",
      "LVM (Logical Volume Manager) ermöglicht flexible Größenänderung von Volumes zur Laufzeit",
      "Klassische Partitionen sind flexibler",
      "Es gibt keinen Unterschied"
    ],
    correctIndex: 1,
    explanation: "LVM abstrahiert physische Speicher. Volumes können dynamisch vergrößert/verkleinert werden ohne Neustart. Ermöglicht auch Snapshots und RAID-ähnliche Funktionen.",
    points: 10,
    category: "Systemintegration",
    difficulty: "mittel"
  },

  // =============================================================
  // NETZWERK-VERTIEFUNG (ca. 25%)
  // =============================================================
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
  {
    id: "t2-nw-007",
    question: "Was ist VLAN Trunking (802.1Q)?",
    options: [
      "Eine Backup-Methode",
      "Übertragung mehrerer VLANs über eine physische Leitung mit VLAN-Tags",
      "Eine Verschlüsselungsmethode",
      "Ein Routing-Protokoll"
    ],
    correctIndex: 1,
    explanation: "802.1Q Trunking ermöglicht die Übertragung mehrerer VLANs über eine Leitung. Frames werden mit VLAN-Tags (VLAN-ID) versehen, um sie zuzuordnen.",
    points: 15,
    category: "Netzwerktechnik",
    difficulty: "schwer"
  },
  {
    id: "t2-nw-008",
    question: "Was ist Spanning Tree Protocol (STP)?",
    options: [
      "Ein Routing-Protokoll",
      "Verhindert Schleifen in Netzwerken mit redundanten Pfaden durch Blockieren",
      "Ein DNS-Protokoll",
      "Ein Verschlüsselungsprotokoll"
    ],
    correctIndex: 1,
    explanation: "STP (802.1D) verhindert Broadcast-Stürme durch Schleifen. Es blockiert redundante Pfade und aktiviert sie nur bei Ausfall des primären Pfades.",
    points: 15,
    category: "Netzwerktechnik",
    difficulty: "schwer"
  },
  {
    id: "t2-nw-009",
    question: "Welche IPv6-Adresse ist eine Link-Local-Adresse?",
    options: ["2001:db8::1", "fe80::1", "::1", "ff02::1"],
    correctIndex: 1,
    explanation: "Link-Local-Adressen beginnen mit fe80::/10 und sind nur im lokalen Netzwerksegment gültig. Sie werden automatisch konfiguriert.",
    points: 10,
    category: "Netzwerktechnik",
    difficulty: "mittel"
  },
  {
    id: "t2-nw-010",
    question: "Was macht Port-Mirroring auf einem Switch?",
    options: [
      "Dupliziert MAC-Adressen",
      "Kopiert den Datenverkehr eines Ports auf einen anderen Port zur Analyse",
      "Spiegelt IP-Adressen",
      "Verschlüsselt Port-Daten"
    ],
    correctIndex: 1,
    explanation: "Port-Mirroring (SPAN) kopiert den Datenverkehr von einem oder mehreren Ports auf einen Monitor-Port für Analyse, Troubleshooting oder IDS/IPS.",
    points: 10,
    category: "Netzwerktechnik",
    difficulty: "mittel"
  },

  // =============================================================
  // DATENBANKADMINISTRATION (ca. 15%)
  // =============================================================
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
  {
    id: "t2-db-006",
    question: "Was ist der Unterschied zwischen LEFT JOIN und INNER JOIN?",
    options: [
      "LEFT JOIN ist schneller",
      "LEFT JOIN gibt alle Zeilen der linken Tabelle zurück, auch ohne Übereinstimmung",
      "Es gibt keinen Unterschied",
      "INNER JOIN gibt mehr Zeilen zurück"
    ],
    correctIndex: 1,
    explanation: "LEFT JOIN gibt alle Zeilen der linken Tabelle zurück. Wenn keine Übereinstimmung in der rechten Tabelle existiert, werden NULL-Werte eingefügt.",
    points: 10,
    category: "Datenbanken",
    difficulty: "mittel"
  },
  {
    id: "t2-db-007",
    question: "Was ist ein Fremdschlüssel (Foreign Key)?",
    options: [
      "Ein Schlüssel für externe Benutzer",
      "Ein Verweis auf den Primärschlüssel einer anderen Tabelle zur Beziehungsherstellung",
      "Ein verschlüsselter Schlüssel",
      "Ein alternativer Primärschlüssel"
    ],
    correctIndex: 1,
    explanation: "Ein Fremdschlüssel (FK) verweist auf den Primärschlüssel einer anderen Tabelle und stellt referenzielle Integrität sicher (keine verwaisten Datensätze).",
    points: 10,
    category: "Datenbanken",
    difficulty: "mittel"
  },
  {
    id: "t2-db-008",
    question: "Was bewirkt die SQL-Klausel GROUP BY?",
    options: [
      "Sortiert die Ergebnisse",
      "Gruppiert Zeilen mit gleichen Werten für Aggregatfunktionen (COUNT, SUM, AVG)",
      "Limitiert die Ergebnisse",
      "Filtert die Ergebnisse"
    ],
    correctIndex: 1,
    explanation: "GROUP BY gruppiert Zeilen mit identischen Werten in den angegebenen Spalten. Ermöglicht Aggregatfunktionen wie COUNT(), SUM(), AVG() pro Gruppe.",
    points: 10,
    category: "Datenbanken",
    difficulty: "mittel"
  },

  // =============================================================
  // IT-SERVICE-MANAGEMENT (ca. 10%)
  // =============================================================
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
  {
    id: "t2-itsm-005",
    question: "Was ist ein CMDB (Configuration Management Database)?",
    options: [
      "Eine Backup-Datenbank",
      "Eine Datenbank mit allen IT-Konfigurationselementen und deren Beziehungen",
      "Eine Kundendatenbank",
      "Eine Code-Management-Datenbank"
    ],
    correctIndex: 1,
    explanation: "Die CMDB enthält alle Configuration Items (CIs): Hardware, Software, Dokumentation und deren Abhängigkeiten. Zentral für Change und Incident Management.",
    points: 10,
    category: "IT-Service-Management",
    difficulty: "mittel"
  },
  {
    id: "t2-itsm-006",
    question: "Was bedeutet MTTR und MTBF?",
    options: [
      "Netzwerkprotokolle",
      "Mean Time To Repair (Reparaturzeit) und Mean Time Between Failures (Zeit zwischen Ausfällen)",
      "Verschlüsselungsstandards",
      "Backup-Methoden"
    ],
    correctIndex: 1,
    explanation: "MTTR: Durchschnittliche Zeit zur Wiederherstellung nach Ausfall. MTBF: Durchschnittliche Zeit zwischen Ausfällen. Beide sind Verfügbarkeitskennzahlen.",
    points: 15,
    category: "IT-Service-Management",
    difficulty: "schwer"
  },

  // =============================================================
  // SICHERHEIT & COMPLIANCE (ca. 10%)
  // =============================================================
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
  },
  {
    id: "t2-sec-006",
    question: "Was ist Zero Trust Security?",
    options: [
      "Niemand darf das Netzwerk nutzen",
      "Niemals vertrauen, immer verifizieren - auch interne Zugriffe werden überprüft",
      "Nur externe Zugriffe werden überprüft",
      "Eine Art von Firewall"
    ],
    correctIndex: 1,
    explanation: "Zero Trust: 'Never trust, always verify'. Auch interne Nutzer und Geräte werden kontinuierlich authentifiziert/autorisiert. Keine Annahme von Vertrauen im Netzwerk.",
    points: 15,
    category: "IT-Sicherheit",
    difficulty: "schwer"
  },
  {
    id: "t2-sec-007",
    question: "Was ist ein IDS/IPS?",
    options: [
      "Internet-Dienste-Service",
      "Intrusion Detection/Prevention System - erkennt und blockiert Angriffe",
      "Internet-Daten-Speicher",
      "Ein DNS-Dienst"
    ],
    correctIndex: 1,
    explanation: "IDS (Intrusion Detection System) erkennt Angriffe und meldet sie. IPS (Intrusion Prevention System) erkennt UND blockiert Angriffe automatisch.",
    points: 10,
    category: "IT-Sicherheit",
    difficulty: "mittel"
  },
  {
    id: "t2-sec-008",
    question: "Was ist SIEM?",
    options: [
      "Ein Backup-System",
      "Security Information and Event Management - zentrale Sicherheitsüberwachung",
      "Ein Verschlüsselungsstandard",
      "Ein VPN-Protokoll"
    ],
    correctIndex: 1,
    explanation: "SIEM (Security Information and Event Management) sammelt, korreliert und analysiert Sicherheitsereignisse aus verschiedenen Quellen für zentrale Überwachung und Alarmierung.",
    points: 10,
    category: "IT-Sicherheit",
    difficulty: "mittel"
  },

  // =============================================================
  // WEITERE SYSTEMINTEGRATION
  // =============================================================
  {
    id: "t2-si-016",
    question: "Was ist der Unterschied zwischen Hot, Warm und Cold Standby?",
    options: [
      "Nur Temperaturunterschiede",
      "Bereitschaftsgrade: Hot (sofort einsatzbereit), Warm (schnell aktivierbar), Cold (manuell)",
      "Backup-Speicherorte",
      "Netzwerk-Topologien"
    ],
    correctIndex: 1,
    explanation: "Hot Standby: System läuft parallel, sofortige Übernahme. Warm Standby: System bereit, schneller Start nötig. Cold Standby: Hardware vorhanden, muss manuell gestartet werden.",
    points: 15,
    category: "Systemintegration",
    difficulty: "schwer"
  },
  {
    id: "t2-si-017",
    question: "Was ist RAID 10?",
    options: [
      "10 Festplatten werden benötigt",
      "Kombination aus RAID 1 (Mirroring) und RAID 0 (Striping) - hohe Performance und Redundanz",
      "RAID Level 10 von 100",
      "Ein Software-RAID"
    ],
    correctIndex: 1,
    explanation: "RAID 10 (1+0) kombiniert Mirroring und Striping: Erst gespiegelt (Redundanz), dann gestriped (Performance). Mindestens 4 Platten, 50% Kapazität nutzbar.",
    points: 15,
    category: "Systemintegration",
    difficulty: "schwer"
  },
  {
    id: "t2-si-018",
    question: "Was macht der Linux-Befehl 'systemctl status nginx'?",
    options: [
      "Installiert nginx",
      "Zeigt den Status des nginx-Dienstes an (läuft/gestoppt, Logs)",
      "Löscht nginx",
      "Aktualisiert nginx"
    ],
    correctIndex: 1,
    explanation: "systemctl ist das Systemd-Verwaltungstool. 'status' zeigt: ob der Dienst läuft, PID, Speicherverbrauch, letzte Log-Einträge, Autostart-Einstellung.",
    points: 5,
    category: "Systemintegration",
    difficulty: "leicht"
  },
  {
    id: "t2-si-019",
    question: "Was ist iSCSI?",
    options: [
      "Ein Backup-Protokoll",
      "Internet Small Computer System Interface - Block-Storage über TCP/IP-Netzwerk",
      "Ein Virtualisierungstool",
      "Ein DNS-Dienst"
    ],
    correctIndex: 1,
    explanation: "iSCSI transportiert SCSI-Befehle über TCP/IP. Ermöglicht Block-Level-Storage-Zugriff über normale Netzwerkinfrastruktur - günstiger als Fibre Channel SAN.",
    points: 10,
    category: "Systemintegration",
    difficulty: "mittel"
  },
  {
    id: "t2-si-020",
    question: "Was ist Ansible?",
    options: [
      "Ein Betriebssystem",
      "Ein Automatisierungstool für Konfigurationsmanagement und Deployment",
      "Eine Programmiersprache",
      "Ein Monitoring-Tool"
    ],
    correctIndex: 1,
    explanation: "Ansible ist ein agentenloser Automatisierungsframework. Nutzt YAML-Playbooks zur Konfiguration von Servern, Deployment von Software und Orchestrierung - über SSH.",
    points: 10,
    category: "Systemintegration",
    difficulty: "mittel"
  }
];
