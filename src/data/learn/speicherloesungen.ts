import type { LearnModule } from "@/types/learn";

export const speicherloesungenContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "Speicherlösungen Grundlagen",
    cards: [
      { front: "DAS (Direct Attached Storage)", back: "**Definition:** Speicher direkt an Server/PC angeschlossen. **Schnittstellen:** SATA, SAS, USB, Thunderbolt. **Vorteile:** Einfach, günstig, niedrige Latenz. **Nachteile:** Nicht teilbar, skaliert schlecht, Single Point of Failure. **Einsatz:** Einzelarbeitsplätze, kleine Server, lokale Backups. **IHK-Unterscheidung:** Günstigste Lösung für nicht geteilten Speicher." },
      { front: "NAS (Network Attached Storage)", back: "**Definition:** Dateibasierter Speicher im Netzwerk. **Protokolle:** SMB/CIFS (Windows), NFS (Linux/Unix), AFP (Mac). **Vorteile:** Einfache Dateifreigabe, zentrale Verwaltung, RAID-Support. **Nachteile:** Netzwerk-Abhängigkeit, geringere Performance als SAN. **Einsatz:** Dateiserver, Home Directories, Backups. **IHK-Praxis:** Ideal für Dateifreigaben im KMU-Bereich." },
      { front: "SAN (Storage Area Network)", back: "**Definition:** Blockbasierter Speicher in dediziertem Netzwerk. **Protokolle:** Fibre Channel, iSCSI, FCoE. **Vorteile:** Höchste Performance, geringe Latenz, gut skalierbar. **Nachteile:** Komplex, teuer, spezielle Hardware nötig. **Einsatz:** Datenbanken, Virtualisierung, Enterprise. **IHK-Unterschied:** Block-Level Zugriff wie lokale Festplatte." },
      { front: "RAID-Level im Detail", back: "**RAID 0:** Striping, keine Redundanz, volle Kapazität, schnell. **RAID 1:** Mirroring, 50% Kapazität, eine Disk kann ausfallen. **RAID 5:** Striping + Parity, n-1 Kapazität, eine Disk Ausfall. **RAID 6:** Doppelte Parity, n-2 Kapazität, zwei Disks Ausfall. **RAID 10:** Mirror + Stripe, 50% Kapazität, Performance + Sicherheit. **IHK-Berechnung:** Nutzbare Kapazität berechnen können!" },
      { front: "RAID-Kapazitätsberechnung", back: "**RAID 0:** n × Disk-Größe (z.B. 4×1TB = 4TB). **RAID 1:** Disk-Größe (z.B. 2×1TB = 1TB). **RAID 5:** (n-1) × Disk-Größe (z.B. 4×1TB = 3TB). **RAID 6:** (n-2) × Disk-Größe (z.B. 4×1TB = 2TB). **RAID 10:** n/2 × Disk-Größe (z.B. 4×1TB = 2TB). **Mindestanzahl:** RAID 5: 3, RAID 6: 4, RAID 10: 4 Disks." },
      { front: "Hot Spare und Hot Swap", back: "**Hot Spare:** Reserve-Disk, springt bei Ausfall automatisch ein. **Global Hot Spare:** Für mehrere RAID-Arrays verfügbar. **Dedicated Hot Spare:** Einem RAID zugeordnet. **Hot Swap:** Disk-Wechsel im laufenden Betrieb möglich. **Rebuild:** Wiederherstellung auf neue/Spare-Disk. **IHK-Vorteil:** Minimierte Ausfallzeit und Risiko." },
      { front: "iSCSI-Konfiguration", back: "**Initiator:** Client, der auf Speicher zugreift. **Target:** Server, der Speicher bereitstellt. **LUN (Logical Unit Number):** Virtuelle Festplatte auf Target. **IQN:** iSCSI Qualified Name zur Identifikation. **CHAP:** Challenge-Handshake Authentication Protocol. **IHK-Praxis:** iSCSI für günstiges SAN über Ethernet." },
      { front: "Fibre Channel Grundlagen", back: "**Topologien:** Point-to-Point, Arbitrated Loop, Switched Fabric. **Geschwindigkeiten:** 8/16/32 Gbit/s. **WWN:** World Wide Name, wie MAC-Adresse für FC. **Zoning:** Zugriffskontrolle auf SAN-Ebene. **HBA:** Host Bus Adapter, Netzwerkkarte für FC. **IHK-Unterschied:** Höhere Performance als iSCSI, teurer." },
      { front: "Object Storage", back: "**Konzept:** Daten als Objekte mit Metadaten und ID. **Zugriff:** HTTP/REST API (S3, Swift). **Vorteile:** Massive Skalierung, günstig, Geo-Replikation. **Nachteile:** Höhere Latenz, kein POSIX-Filesystem. **Einsatz:** Cloud Storage, Backups, Unstrukturierte Daten. **Beispiele:** AWS S3, Azure Blob, MinIO." },
      { front: "Tiering und Caching", back: "**Storage Tiering:** Daten automatisch auf passende Speicherklasse verschieben. **Hot Tier:** SSD, häufig genutzte Daten. **Cold Tier:** HDD, selten genutzte Daten. **Archive Tier:** Tape, langfristige Aufbewahrung. **Read/Write Cache:** SSD vor HDD für Performance-Boost. **IHK-Vorteil:** Optimales Preis-Leistungs-Verhältnis." }
    ]
  },
  {
    type: "quiz",
    title: "Speicherlösungen - Prüfungsfragen",
    questions: [
      {
        question: "Welche Speichertechnologie arbeitet auf Block-Ebene?",
        options: ["NAS mit SMB", "NAS mit NFS", "SAN", "Cloud Object Storage"],
        correctIndex: 2,
        explanation: "SAN arbeitet auf Block-Ebene, während NAS auf Datei-Ebene und Object Storage auf Objekt-Ebene arbeitet."
      },
      {
        question: "Wie viel nutzbare Kapazität hat ein RAID 5 mit 5 Festplatten à 2TB?",
        options: ["10 TB", "8 TB", "6 TB", "4 TB"],
        correctIndex: 1,
        explanation: "RAID 5 Formel: (n-1) × Disk-Größe = (5-1) × 2TB = 8TB nutzbar."
      },
      {
        question: "Welches RAID-Level bietet die beste Kombination aus Performance und Redundanz?",
        options: ["RAID 0", "RAID 1", "RAID 5", "RAID 10"],
        correctIndex: 3,
        explanation: "RAID 10 kombiniert Mirroring (RAID 1) und Striping (RAID 0) für hohe Performance bei gleichzeitiger Redundanz."
      },
      {
        question: "Was ist ein Hot Spare?",
        options: ["Ein überhitztes Laufwerk", "Eine Reserve-Disk für automatischen Rebuild", "Ein schneller Cache", "Ein Backup-Protokoll"],
        correctIndex: 1,
        explanation: "Ein Hot Spare ist eine eingebaute Reserve-Disk, die bei Ausfall automatisch den Rebuild startet."
      },
      {
        question: "Welches Protokoll wird für iSCSI-Authentifizierung verwendet?",
        options: ["Kerberos", "CHAP", "OAuth", "RADIUS"],
        correctIndex: 1,
        explanation: "CHAP (Challenge-Handshake Authentication Protocol) ist der Standard für iSCSI-Authentifizierung."
      },
      {
        question: "Für welchen Einsatzzweck ist Object Storage am besten geeignet?",
        options: ["Relationale Datenbanken", "Live-Virtualisierung", "Große unstrukturierte Datenmengen", "Echtzeit-Transaktionen"],
        correctIndex: 2,
        explanation: "Object Storage ist ideal für große Mengen unstrukturierter Daten wie Backups, Media-Files und Logs."
      },
      {
        question: "Welche Mindestanzahl an Festplatten benötigt RAID 6?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "RAID 6 benötigt mindestens 4 Festplatten: 2 für Daten und 2 für doppelte Parität."
      },
      {
        question: "Was ist der Hauptunterschied zwischen DAS und SAN?",
        options: ["DAS ist schneller", "SAN kann von mehreren Servern genutzt werden", "DAS unterstützt RAID, SAN nicht", "SAN ist günstiger"],
        correctIndex: 1,
        explanation: "SAN ermöglicht den Zugriff von mehreren Servern auf gemeinsamen Speicher, DAS ist nur lokal angeschlossen."
      },
      {
        question: "Was bedeutet 'Zoning' im SAN-Kontext?",
        options: ["Geografische Verteilung", "Zugriffskontrolle auf SAN-Ressourcen", "Speicherkapazitätsplanung", "Backup-Strategie"],
        correctIndex: 1,
        explanation: "Zoning im SAN definiert, welche Hosts auf welche Storage-Ports zugreifen dürfen (ähnlich wie VLANs)."
      },
      {
        question: "Welcher Storage-Tier wird für häufig genutzte Daten verwendet?",
        options: ["Cold Tier", "Archive Tier", "Hot Tier", "Frozen Tier"],
        correctIndex: 2,
        explanation: "Hot Tier (meist SSDs) speichert häufig genutzte Daten für schnellen Zugriff."
      }
    ]
  },
  {
    type: "flashcards",
    title: "Backup und Archivierung",
    cards: [
      { front: "Backup-Medien Vergleich", back: "**HDD:** Günstig, schnell, begrenzte Haltbarkeit. **SSD:** Sehr schnell, teurer, langlebig. **Tape (LTO):** Sehr günstig pro TB, langsam, 30+ Jahre Haltbarkeit. **Cloud:** Skalierbar, geo-redundant, laufende Kosten. **Optisch (BD):** Langlebig, begrenzte Kapazität. **IHK-Empfehlung:** Kombination nach 3-2-1-Regel." },
      { front: "LTO-Tape Generationen", back: "**LTO-8:** 12TB nativ, 30TB komprimiert. **LTO-9:** 18TB nativ, 45TB komprimiert. **Kompatibilität:** Lesen n-2, Schreiben n-1. **LTFS:** Linear Tape File System, Tape wie Festplatte. **WORM:** Write Once Read Many für Compliance. **IHK-Einsatz:** Langzeit-Archivierung, Offsite-Backup." },
      { front: "Deduplizierung", back: "**Inline:** Während des Schreibens, spart sofort Speicher. **Post-Process:** Nach dem Schreiben, weniger CPU-Last. **Source-Side:** Auf Client, weniger Netzwerk-Traffic. **Target-Side:** Auf Storage, einfachere Clients. **Ratio:** 10:1 bis 50:1 möglich. **IHK-Vorteil:** Massive Speicherersparnis bei Backups." },
      { front: "Snapshot-Technologie", back: "**Definition:** Momentaufnahme eines Datenbestands. **Copy-on-Write:** Original bleibt, Änderungen werden kopiert. **Redirect-on-Write:** Änderungen an neuen Ort schreiben. **Crash-Consistent:** Zustand bei Stromausfall. **Application-Consistent:** Anwendung vorbereitet, sauber. **IHK-Nutzung:** Schnelle Backups, Test-Umgebungen, Recovery." },
      { front: "Replikation Arten", back: "**Synchron:** Gleichzeitiges Schreiben auf beide Seiten, keine Datenverlust, Latenz-Einfluss. **Asynchron:** Verzögertes Schreiben, RPO > 0, keine Latenz-Einfluss. **Lokal:** Innerhalb eines Standorts. **Remote:** Zwischen Standorten für DR. **IHK-Entscheidung:** RPO/RTO-Anforderungen vs. Kosten." },
      { front: "Aufbewahrungsfristen (Retention)", back: "**Gesetzlich:** Handelsbriefe 6 Jahre, Buchungsbelege 10 Jahre (HGB). **GoBD:** Unveränderbare Archivierung, Protokollierung. **DSGVO:** Löschpflicht nach Wegfall des Zwecks. **Revisionssicher:** WORM, Zeitstempel, Zugriffsprotokoll. **IHK-Praxis:** Retention-Policies definieren und umsetzen." },
      { front: "Backup-Software Features", back: "**Agenten:** Software auf zu sichernden Systemen. **Agentless:** Zugriff über APIs, VMware vStorage. **Katalog:** Index aller Backups für schnelle Suche. **Retention Policies:** Automatische Löschung alter Backups. **Encryption:** Verschlüsselung in Transit und at Rest. **Beispiele:** Veeam, Commvault, Acronis, Bacula." },
      { front: "Immutable Backups", back: "**Konzept:** Backups können nicht verändert oder gelöscht werden. **Schutz gegen:** Ransomware, versehentliches Löschen, böswillige Admins. **Technologien:** S3 Object Lock, WORM-Tape, Air-Gap. **Retention Lock:** Mindestaufbewahrungszeit erzwingen. **IHK-Bedeutung:** Kritisch für Ransomware-Schutz!" }
    ]
  },
  {
    type: "quiz",
    title: "Backup und Archivierung - Prüfungsfragen",
    questions: [
      {
        question: "Welche Backup-Methode spart am meisten Speicherplatz durch Erkennung identischer Datenblöcke?",
        options: ["Komprimierung", "Deduplizierung", "Verschlüsselung", "RAID"],
        correctIndex: 1,
        explanation: "Deduplizierung erkennt und eliminiert redundante Datenblöcke, besonders effektiv bei Backup-Daten."
      },
      {
        question: "Wie lange müssen Buchungsbelege nach HGB aufbewahrt werden?",
        options: ["3 Jahre", "6 Jahre", "10 Jahre", "30 Jahre"],
        correctIndex: 2,
        explanation: "Nach § 147 HGB müssen Buchungsbelege und Jahresabschlüsse 10 Jahre aufbewahrt werden."
      },
      {
        question: "Was bedeutet 'Application-Consistent Snapshot'?",
        options: ["Der Snapshot ist verschlüsselt", "Die Anwendung wurde vor dem Snapshot vorbereitet", "Der Snapshot läuft automatisch", "Der Snapshot ist komprimiert"],
        correctIndex: 1,
        explanation: "Bei Application-Consistent Snapshots wird die Anwendung in einen konsistenten Zustand versetzt (z.B. Flush des Caches)."
      },
      {
        question: "Welches Medium eignet sich am besten für Langzeit-Archivierung von großen Datenmengen?",
        options: ["USB-Stick", "SSD", "LTO-Tape", "RAM-Disk"],
        correctIndex: 2,
        explanation: "LTO-Tapes sind kostengünstig, haben hohe Kapazität und eine Haltbarkeit von 30+ Jahren."
      },
      {
        question: "Was ist der Hauptvorteil synchroner Replikation?",
        options: ["Niedrigere Kosten", "Keine Latenz", "RPO = 0 (kein Datenverlust)", "Einfachere Konfiguration"],
        correctIndex: 2,
        explanation: "Synchrone Replikation garantiert, dass beide Kopien identisch sind - kein Datenverlust bei Ausfall (RPO = 0)."
      },
      {
        question: "Was schützen Immutable Backups besonders effektiv?",
        options: ["Vor Hardware-Ausfall", "Vor Ransomware", "Vor Stromausfall", "Vor Netzwerk-Problemen"],
        correctIndex: 1,
        explanation: "Immutable Backups können nicht verschlüsselt oder gelöscht werden und schützen so vor Ransomware-Angriffen."
      },
      {
        question: "Welche LTO-Generation bietet 18TB native Kapazität?",
        options: ["LTO-7", "LTO-8", "LTO-9", "LTO-10"],
        correctIndex: 2,
        explanation: "LTO-9 bietet 18TB native Kapazität, mit Komprimierung bis zu 45TB."
      },
      {
        question: "Was bedeutet Source-Side Deduplizierung?",
        options: ["Deduplizierung erfolgt auf dem Backup-Server", "Deduplizierung erfolgt auf dem Client vor der Übertragung", "Daten werden am Quellort gelöscht", "Daten werden komprimiert"],
        correctIndex: 1,
        explanation: "Bei Source-Side Deduplizierung werden redundante Daten bereits auf dem Client erkannt, was Netzwerk-Traffic spart."
      }
    ]
  }
];
