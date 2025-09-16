import type { LearnModule } from "../../types/learn";

export const systemadministrationModules: LearnModule[] = [
  {
    type: "flashcards",
    title: "Systemadministration Grundlagen",
    cards: [
      { front: "Was ist Active Directory?", back: "Microsoft-Verzeichnisdienst zur zentralen Verwaltung von Benutzern, Computern und Ressourcen" },
      { front: "Unterschied zwischen Workgroup und Domain?", back: "Workgroup: dezentral, jeder PC verwaltet sich selbst. Domain: zentrale Verwaltung über Domain Controller" },
      { front: "Was ist DHCP?", back: "Dynamic Host Configuration Protocol - automatische IP-Adressvergabe im Netzwerk" },
      { front: "DNS-Funktion?", back: "Domain Name System - übersetzt Hostnamen in IP-Adressen" },
      { front: "Was ist ein Proxy-Server?", back: "Zwischenserver für Internetverbindungen - ermöglicht Caching, Filterung und Sicherheit" },
      { front: "Firewall-Arten?", back: "Hardware-Firewall (Netzwerkebene), Software-Firewall (Hostebene), Application-Firewall" },
      { front: "Was ist RAID?", back: "Redundant Array of Independent Disks - Festplattenverbund für Performance und Ausfallsicherheit" },
      { front: "RAID 0 vs RAID 1?", back: "RAID 0: Striping (Performance). RAID 1: Mirroring (Ausfallsicherheit)" },
      { front: "Was ist ein Backup-Schema?", back: "Systematische Datensicherungsstrategie: Vollbackup, Inkrementell, Differentiell" },
      { front: "3-2-1 Backup-Regel?", back: "3 Kopien der Daten, 2 verschiedene Medien, 1 Kopie extern/offline" },
      { front: "Was ist Virtualisierung?", back: "Abstraktionsschicht zwischen Hardware und Betriebssystem - mehrere VMs auf einem Host" },
      { front: "Hypervisor Typ 1 vs Typ 2?", back: "Typ 1: Bare Metal (direkt auf Hardware). Typ 2: Hosted (auf Betriebssystem)" },
      { front: "Was ist ein VPN?", back: "Virtual Private Network - sichere Verbindung über unsichere Netzwerke" },
      { front: "Site-to-Site vs Client-to-Site VPN?", back: "Site-to-Site: Standorte verbinden. Client-to-Site: Einzelne Clients ins Firmennetz" },
      { front: "Was ist Monitoring?", back: "Kontinuierliche Überwachung von Systemen, Services und Netzwerk" },
      { front: "Was ist ein Service Level Agreement (SLA)?", back: "Vertragliche Vereinbarung über Verfügbarkeit und Qualität von IT-Services" }
    ]
  },
  {
    type: "quiz",
    title: "Windows Server Administration",
    questions: [
      {
        question: "Welche Rolle muss installiert sein, damit ein Windows Server als Domain Controller fungieren kann?",
        options: [
          "DNS Server",
          "Active Directory Domain Services",
          "DHCP Server",
          "File and Storage Services"
        ],
        correctIndex: 1,
        explanation: "Active Directory Domain Services (AD DS) ist die Kernrolle für Domain Controller"
      },
      {
        question: "Was bewirkt der Befehl 'gpupdate /force'?",
        options: [
          "Neustart des Servers",
          "Aktualisierung der Gruppenrichtlinien",
          "Update von Windows",
          "Synchronisation der Zeit"
        ],
        correctIndex: 1,
        explanation: "gpupdate /force aktualisiert Gruppenrichtlinien sofort ohne Neustart"
      },
      {
        question: "Welcher RAID-Level bietet sowohl Performance als auch Ausfallsicherheit?",
        options: [
          "RAID 0",
          "RAID 1",
          "RAID 5",
          "RAID 6"
        ],
        correctIndex: 2,
        explanation: "RAID 5 kombiniert Striping für Performance mit Paritätsinformationen für Ausfallsicherheit"
      },
      {
        question: "Was ist der Hauptvorteil von differentiellen Backups gegenüber inkrementellen?",
        options: [
          "Weniger Speicherplatz",
          "Schnellere Erstellung",
          "Einfachere Wiederherstellung",
          "Höhere Kompression"
        ],
        correctIndex: 2,
        explanation: "Differentiell: nur Vollbackup + letztes differentielles nötig. Inkrementell: alle seit Vollbackup"
      },
      {
        question: "Welcher Port wird standardmäßig für HTTPS verwendet?",
        options: [
          "80",
          "443",
          "8080",
          "3389"
        ],
        correctIndex: 1,
        explanation: "HTTPS verwendet Port 443, HTTP verwendet Port 80"
      }
    ]
  },
  {
    type: "memory",
    title: "Server-Services Memory",
    games: [
      {
        title: "Windows Services zuordnen",
        description: "Ordnen Sie die Windows-Dienste ihren Funktionen zu.",
        pairs: [
          { id: "1", content: "DNS Client", match: "Löst Hostnamen in IP-Adressen auf" },
          { id: "2", content: "DHCP Client", match: "Bezieht IP-Konfiguration automatisch" },
          { id: "3", content: "Windows Firewall", match: "Filtert ein- und ausgehenden Netzwerkverkehr" },
          { id: "4", content: "Print Spooler", match: "Verwaltet Druckaufträge" },
          { id: "5", content: "Task Scheduler", match: "Führt geplante Aufgaben aus" },
          { id: "6", content: "Windows Update", match: "Installiert Sicherheitsupdates automatisch" }
        ]
      }
    ]
  },
  {
    type: "dragdrop",
    title: "Backup-Strategien zuordnen",
    games: [
      {
        title: "Backup-Typen den Eigenschaften zuordnen",
        description: "Ordnen Sie die Backup-Arten ihren charakteristischen Eigenschaften zu.",
        items: [
          { id: "1", content: "Komplette Datensicherung", category: "Vollbackup" },
          { id: "2", content: "Längste Sicherungszeit", category: "Vollbackup" },
          { id: "3", content: "Schnellste Wiederherstellung", category: "Vollbackup" },
          { id: "4", content: "Nur geänderte Dateien seit letztem Vollbackup", category: "Differentiell" },
          { id: "5", content: "Mittlere Sicherungszeit", category: "Differentiell" },
          { id: "6", content: "Nur Änderungen seit letzter Sicherung", category: "Inkrementell" },
          { id: "7", content: "Schnellste Sicherung", category: "Inkrementell" },
          { id: "8", content: "Komplexeste Wiederherstellung", category: "Inkrementell" }
        ],
        categories: ["Vollbackup", "Differentiell", "Inkrementell"]
      }
    ]
  },
  {
    type: "timeline",
    title: "Server-Wartung Timeline",
    timelines: [
      {
        title: "Monatliche Server-Wartung",
        description: "Typischer Ablauf einer geplanten Server-Wartung",
        events: [
          { year: "Woche 1", event: "Wartungsfenster planen", description: "Termine mit Benutzern abstimmen, Downtime minimieren" },
          { year: "Woche 2", event: "Updates testen", description: "Patches in Testumgebung validieren" },
          { year: "Woche 3", event: "Backup erstellen", description: "Vollständige Systemsicherung vor Wartung" },
          { year: "Woche 4", event: "Wartung durchführen", description: "Updates installieren, Services neustarten" },
          { year: "Nach Wartung", event: "Monitoring & Dokumentation", description: "Systemstatus prüfen, Änderungen dokumentieren" }
        ]
      }
    ]
  },
  {
    type: "scenario",
    title: "Server-Notfälle bewältigen",
    scenarios: [
      {
        title: "Domain Controller Ausfall",
        description: "Der primäre Domain Controller ist ausgefallen und Benutzer können sich nicht anmelden.",
        scenario: "Es ist Montagmorgen und der Haupt-DC ist nicht erreichbar. 200 Benutzer können nicht arbeiten. Ein zweiter DC ist vorhanden aber nicht aktuell.",
        choices: [
          { text: "Sofort Hardware des primären DC reparieren", consequence: "Zeitaufwändig - Benutzer warten zu lange.", isCorrect: false },
          { text: "Sekundären DC als primären DC bewerben", consequence: "Richtig! FSMO-Rollen übertragen und Service wiederherstellen.", isCorrect: true },
          { text: "Alle Benutzer auf lokale Anmeldung umstellen", consequence: "Unpraktisch und verliert zentrale Verwaltung.", isCorrect: false },
          { text: "Neuen DC von Grund auf installieren", consequence: "Dauert zu lange - erst Service wiederherstellen.", isCorrect: false }
        ]
      },
      {
        title: "Speicherplatz-Notfall",
        description: "Die Systempartition des Fileservers ist zu 98% voll.",
        scenario: "Der zentrale Fileserver hat nur noch 2% freien Speicherplatz. Benutzer können keine Dateien mehr speichern. Mehrere Terrabyte an Daten.",
        choices: [
          { text: "Alte Dateien sofort löschen", consequence: "Riskant - könnten wichtige Daten verloren gehen.", isCorrect: false },
          { text: "Temporäre Dateien und Logs bereinigen", consequence: "Richtig! Sichere Sofortmaßnahme für schnelle Entlastung.", isCorrect: true },
          { text: "Zusätzliche Festplatte installieren", consequence: "Dauert zu lange - erst Sofortmaßnahmen.", isCorrect: false },
          { text: "Benutzer auffordern, eigene Dateien zu löschen", consequence: "Unkontrolliert und unprofessionell.", isCorrect: false }
        ]
      }
    ]
  }
];