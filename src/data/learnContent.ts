import type { LearnModule } from "@/types/learn";
import { webentwicklungContent } from "./learn/webentwicklung";
import { projektmanagementContent } from "./learn/projektmanagement";
import { qualitaetsmanagementContent } from "./learn/qualitaetsmanagement";
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

// Main learning content mapped to category IDs from the database
export const learnContent: Record<string, LearnModule[]> = {
  "web-technologien": webentwicklungContent,
  projektmanagement: projektmanagementContent,
  bwl: betriebswirtschaftContent,
  "rechtliche-grundlagen": rechtlicheGrundlagenContent,
  kommunikation: kommunikationContent,
  wiso: wisoContent,
  datenbanken: datenbankenModules,
  systemadministration: systemadministrationModules,
  "mobile-entwicklung": mobileEntwicklungContent,
  "grundlagen-it": grundlagenItContent,
  "it-sicherheit": itSicherheitAdvancedContent,
  netzwerktechnik: [
    {
      type: "flashcards",
      title: "Netzwerk-Grundlagen - IHK Prüfungswissen",
      cards: [
        { front: "OSI-Modell Layer im Detail", back: "**Layer 1 - Physical:** Bits übertragen, Kabel, Hubs. **Layer 2 - Data Link:** Frames, MAC-Adressen, Switches, Ethernet. **Layer 3 - Network:** Routing, IP-Adressen, Router. **Layer 4 - Transport:** TCP/UDP, End-to-End Kommunikation. **Layer 5 - Session:** Sitzungsmanagement, NetBIOS. **Layer 6 - Presentation:** Verschlüsselung, Komprimierung. **Layer 7 - Application:** HTTP, FTP, SMTP. **IHK-Bedeutung:** Systematische Fehlersuche, Protokoll-Zuordnung." },
        { front: "TCP vs. UDP im Detail", back: "**TCP (Transmission Control Protocol):** Verbindungsorientiert, zuverlässig, Reihenfolge garantiert, Fehlererkennung/korrektur, Überlastkontrolle. **Verwendung:** HTTP/HTTPS, FTP, SMTP, SSH. **UDP (User Datagram Protocol):** Verbindungslos, unzuverlässig, schnell, geringer Overhead. **Verwendung:** DNS, DHCP, Streaming, Gaming. **IHK-Entscheidung:** Zuverlässigkeit vs. Geschwindigkeit. **Header-Größe:** TCP 20+ Bytes, UDP 8 Bytes." },
        { front: "IPv4 Subnetting beherrschen", back: "**CIDR-Notation:** /24 = 255.255.255.0, /16 = 255.255.0.0. **Subnetz berechnen:** Netzwerk-ID, Broadcast-Adresse, verwendbare IPs. **Beispiel:** 192.168.1.0/26 → 64 IPs, 62 verwendbar. **VLSM (Variable Length Subnet Masking):** Effiziente IP-Nutzung. **IHK-Praxis:** Netzwerk-Design, IP-Verteilung planen. **Private Bereiche:** 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16." },
      ]
    },
    {
      type: "quiz",
      title: "Netzwerktechnik Prüfungsfragen",
      questions: [
        {
          question: "Welches Protokoll arbeitet auf Layer 3 des OSI-Modells?",
          options: ["Ethernet", "IP", "TCP", "HTTP"],
          correctIndex: 1
        },
        {
          question: "Wie viele Host-Adressen sind in einem /26 Subnetz nutzbar?",
          options: ["62", "64", "126", "128"],
          correctIndex: 0
        }
      ]
    }
  ],
  datenschutz: [
    {
      type: "flashcards",
      title: "DSGVO & Datenschutz - IHK Praxis",
      cards: [
        { front: "DSGVO Grundprinzipien Art. 5", back: "**1. Rechtmäßigkeit, Treu & Glauben:** Transparente Verarbeitung. **2. Zweckbindung:** Daten nur für festgelegte Zwecke. **3. Datenminimierung:** Nur notwendige Daten. **4. Richtigkeit:** Aktuelle, korrekte Daten. **5. Speicherbegrenzung:** Nicht länger als nötig. **6. Integrität/Vertraulichkeit:** Angemessene Sicherheit. **IHK-Relevanz:** Basis für alle Datenschutz-Maßnahmen." },
        { front: "Rechtsgrundlagen Art. 6 DSGVO", back: "**a) Einwilligung:** Freiwillig, informiert, widerrufbar. **b) Vertrag:** Erforderlich für Vertragserfüllung. **c) Rechtliche Verpflichtung:** Steuerrecht, Aufbewahrungspflichten. **d) Lebenswichtige Interessen:** Notfälle. **e) Öffentliche Aufgabe:** Behörden. **f) Berechtigtes Interesse:** Interessenabwägung nötig. **IHK-Praxis:** Oft b), c) oder f) in Unternehmen." },
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
      ]
    }
  ],
  programmierung: [],
  zufallstraining: [],
  "englisch-it": englischItContent,
  "mathematik-logik": mathematikLogikContent,
  "innovation-trends": innovationTrendsContent,
};
