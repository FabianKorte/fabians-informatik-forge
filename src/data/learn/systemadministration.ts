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
  }
];