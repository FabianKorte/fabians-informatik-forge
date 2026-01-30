import type { OSIExercise, DiagnosticScenario, OSIQuizQuestion } from "@/types/osiModel";

// ============================================================
// DRAG & DROP ÜBUNGEN - Protokolle und Hardware zuordnen
// ============================================================

export const dragDropExercises: OSIExercise[] = [
  {
    id: "dd-basics",
    title: "OSI-Grundlagen: Erste Zuordnung",
    description: "Ordne diese grundlegenden Netzwerk-Elemente den korrekten OSI-Schichten zu.",
    difficulty: "leicht",
    type: "drag-drop",
    points: 50,
    theory: `Das OSI-Modell (Open Systems Interconnection) ist ein Referenzmodell für Netzwerkkommunikation mit 7 Schichten. 
    
Jede Schicht hat spezifische Aufgaben:
- **Schicht 1-4**: Transportorientierte Schichten (Hardware-nah)
- **Schicht 5-7**: Anwendungsorientierte Schichten (Software-nah)

**Merksatz von unten nach oben**: "Please Do Not Throw Sausage Pizza Away"
(Physical, Data Link, Network, Transport, Session, Presentation, Application)`,
    items: [
      { id: "http", label: "HTTP", type: "protocol", correctLayer: 7, hint: "Webseiten werden damit übertragen" },
      { id: "tcp", label: "TCP", type: "protocol", correctLayer: 4, hint: "Zuverlässige Datenübertragung" },
      { id: "ip", label: "IP-Adresse", type: "concept", correctLayer: 3, hint: "Logische Adressierung" },
      { id: "switch", label: "Switch", type: "hardware", correctLayer: 2, hint: "Arbeitet mit MAC-Adressen" },
      { id: "kabel", label: "Netzwerkkabel", type: "hardware", correctLayer: 1, hint: "Physisches Medium" },
    ]
  },
  {
    id: "dd-protocols",
    title: "Protokoll-Zuordnung",
    description: "Ordne die wichtigsten Netzwerkprotokolle ihren OSI-Schichten zu.",
    difficulty: "mittel",
    type: "drag-drop",
    points: 75,
    theory: `**Wichtige Protokolle pro Schicht:**

**Schicht 7 (Anwendung)**: HTTP, FTP, SMTP, DNS, SSH
**Schicht 4 (Transport)**: TCP (zuverlässig), UDP (schnell)
**Schicht 3 (Netzwerk)**: IP, ICMP (Ping), ARP*
**Schicht 2 (Sicherung)**: Ethernet, WLAN (802.11)
**Schicht 1 (Physisch)**: Elektrische Signale, Lichtwellen

*ARP arbeitet zwischen Schicht 2 und 3 (Adressauflösung IP→MAC)`,
    items: [
      { id: "ftp", label: "FTP", type: "protocol", correctLayer: 7, hint: "Dateiübertragungsprotokoll" },
      { id: "smtp", label: "SMTP", type: "protocol", correctLayer: 7, hint: "E-Mail-Versand" },
      { id: "udp", label: "UDP", type: "protocol", correctLayer: 4, hint: "Schnelle, verbindungslose Übertragung" },
      { id: "icmp", label: "ICMP (Ping)", type: "protocol", correctLayer: 3, hint: "Netzwerk-Diagnose" },
      { id: "ethernet", label: "Ethernet", type: "protocol", correctLayer: 2, hint: "LAN-Standard" },
      { id: "mac", label: "MAC-Adresse", type: "concept", correctLayer: 2, hint: "Physische Hardware-Adresse" },
      { id: "router", label: "Router", type: "hardware", correctLayer: 3, hint: "Verbindet Netzwerke" },
    ]
  },
  {
    id: "dd-advanced",
    title: "Fortgeschrittene Zuordnung",
    description: "Diese Übung enthält auch weniger bekannte Elemente. Nutze dein Wissen!",
    difficulty: "schwer",
    type: "drag-drop",
    points: 100,
    theory: `**Verschlüsselung im OSI-Modell:**
- **SSL/TLS** arbeitet auf Schicht 6 (Darstellung) - verschlüsselt Daten
- **HTTPS** = HTTP + TLS auf Schicht 7

**Session-Management:**
- NetBIOS, RPC und SQL-Sessions auf Schicht 5
- Verwalten Dialogsteuerung zwischen Anwendungen

**Hardware-Zuordnung:**
- **Hub/Repeater**: Schicht 1 (verstärkt nur Signale)
- **Switch/Bridge**: Schicht 2 (MAC-basiert)
- **Router**: Schicht 3 (IP-basiert)
- **Gateway/Firewall**: Schicht 3-7 (je nach Typ)`,
    items: [
      { id: "tls", label: "TLS/SSL", type: "protocol", correctLayer: 6, hint: "Verschlüsselungsprotokoll" },
      { id: "dns", label: "DNS", type: "protocol", correctLayer: 7, hint: "Namensauflösung" },
      { id: "ssh", label: "SSH", type: "protocol", correctLayer: 7, hint: "Sichere Fernverbindung" },
      { id: "netbios", label: "NetBIOS", type: "protocol", correctLayer: 5, hint: "Windows-Netzwerknamen" },
      { id: "hub", label: "Hub", type: "hardware", correctLayer: 1, hint: "Verstärkt nur Signale" },
      { id: "repeater", label: "Repeater", type: "hardware", correctLayer: 1, hint: "Signalverstärker" },
      { id: "bitstrom", label: "Bitstrom", type: "concept", correctLayer: 1, hint: "Rohe Daten als Bits" },
      { id: "frames", label: "Frames", type: "concept", correctLayer: 2, hint: "Dateneinheit Schicht 2" },
      { id: "pakete", label: "Pakete", type: "concept", correctLayer: 3, hint: "Dateneinheit Schicht 3" },
      { id: "segmente", label: "Segmente", type: "concept", correctLayer: 4, hint: "Dateneinheit Schicht 4" },
    ]
  },
  {
    id: "dd-ihk-prep",
    title: "IHK-Prüfungsvorbereitung",
    description: "Typische Prüfungsaufgaben zur OSI-Zuordnung. Bereite dich auf die echte Prüfung vor!",
    difficulty: "schwer",
    type: "drag-drop",
    points: 150,
    theory: `**Prüfungsrelevante Fakten:**

1. **Dateneinheiten (PDU)** je Schicht:
   - Schicht 4: Segmente
   - Schicht 3: Pakete
   - Schicht 2: Frames
   - Schicht 1: Bits

2. **Geräte-Zuordnung** (häufige Prüfungsfrage!):
   - Router = Schicht 3 (arbeitet mit IP)
   - Switch = Schicht 2 (arbeitet mit MAC)
   - Hub = Schicht 1 (nur elektrische Signale)

3. **Protokoll-Ports** (Schicht 4):
   - HTTP: Port 80
   - HTTPS: Port 443
   - FTP: Port 21
   - SSH: Port 22
   - DNS: Port 53`,
    items: [
      { id: "ihk-http", label: "HTTP (Port 80)", type: "protocol", correctLayer: 7 },
      { id: "ihk-https", label: "HTTPS (Port 443)", type: "protocol", correctLayer: 7 },
      { id: "ihk-tcp", label: "TCP", type: "protocol", correctLayer: 4 },
      { id: "ihk-udp", label: "UDP", type: "protocol", correctLayer: 4 },
      { id: "ihk-ip", label: "IPv4/IPv6", type: "protocol", correctLayer: 3 },
      { id: "ihk-arp", label: "ARP", type: "protocol", correctLayer: 2, hint: "Adressauflösung IP→MAC" },
      { id: "ihk-router", label: "Router", type: "hardware", correctLayer: 3 },
      { id: "ihk-switch", label: "Switch", type: "hardware", correctLayer: 2 },
      { id: "ihk-hub", label: "Hub", type: "hardware", correctLayer: 1 },
      { id: "ihk-glasfaser", label: "Glasfaserkabel", type: "hardware", correctLayer: 1 },
      { id: "ihk-rj45", label: "RJ45-Stecker", type: "hardware", correctLayer: 1 },
    ]
  }
];

// ============================================================
// DIAGNOSTISCHE SZENARIEN - Fehler der richtigen Schicht zuordnen
// ============================================================

export const diagnosticScenarios: DiagnosticScenario[] = [
  {
    id: "diag-1",
    title: "Webseite lädt nicht",
    description: "Ein Benutzer meldet: Die Webseite www.example.com lädt nicht, aber andere Webseiten funktionieren.",
    symptom: "Browser zeigt 'Diese Seite kann nicht erreicht werden' - DNS_PROBE_FINISHED_NXDOMAIN",
    affectedLayer: 7,
    correctDiagnosis: "DNS-Problem auf Anwendungsschicht",
    options: [
      "DNS-Problem auf Anwendungsschicht",
      "Defektes Netzwerkkabel (Schicht 1)",
      "Router-Konfigurationsfehler (Schicht 3)",
      "TCP-Verbindungsproblem (Schicht 4)"
    ],
    explanation: "Der Fehlercode DNS_PROBE_FINISHED_NXDOMAIN zeigt, dass der DNS-Server den Domainnamen nicht auflösen kann. DNS arbeitet auf Schicht 7 (Anwendungsschicht).",
    points: 25
  },
  {
    id: "diag-2",
    title: "Netzwerk-Zeitüberschreitung",
    description: "Alle Verbindungen brechen nach einigen Sekunden ab. Ping zum Gateway schlägt fehl.",
    symptom: "Request timed out bei Ping. Link-LED am Switch blinkt nicht.",
    affectedLayer: 1,
    correctDiagnosis: "Physisches Problem - defektes Kabel oder Port",
    options: [
      "Physisches Problem - defektes Kabel oder Port",
      "Falsche IP-Konfiguration (Schicht 3)",
      "Firewall blockiert Verbindungen (Schicht 7)",
      "Switch-Konfigurationsfehler (Schicht 2)"
    ],
    explanation: "Wenn die Link-LED nicht blinkt, liegt ein physisches Problem vor (Schicht 1). Überprüfen Sie Kabel, Stecker und Port.",
    points: 25
  },
  {
    id: "diag-3",
    title: "Keine Kommunikation im LAN",
    description: "Zwei PCs im selben Netzwerk können nicht miteinander kommunizieren. Gateway ist erreichbar.",
    symptom: "Ping zwischen den PCs schlägt fehl. ARP-Tabelle zeigt keine Einträge für den Ziel-PC.",
    affectedLayer: 2,
    correctDiagnosis: "MAC-Adress-Auflösung fehlgeschlagen (Schicht 2)",
    options: [
      "MAC-Adress-Auflösung fehlgeschlagen (Schicht 2)",
      "DNS-Server nicht erreichbar (Schicht 7)",
      "IP-Adresskonflikt (Schicht 3)",
      "TCP-Port geschlossen (Schicht 4)"
    ],
    explanation: "Da die ARP-Tabelle leer ist, kann die MAC-Adresse des Ziels nicht ermittelt werden. Dies ist ein Problem auf Schicht 2 (Sicherungsschicht).",
    points: 30
  },
  {
    id: "diag-4",
    title: "Internet nicht erreichbar",
    description: "Lokales Netzwerk funktioniert, aber keine Verbindung zum Internet möglich.",
    symptom: "Ping zu 192.168.1.1 (Gateway) erfolgreich. Ping zu 8.8.8.8 schlägt fehl. Route zeigt kein Default-Gateway.",
    affectedLayer: 3,
    correctDiagnosis: "Routing-Problem - kein Default-Gateway (Schicht 3)",
    options: [
      "Routing-Problem - kein Default-Gateway (Schicht 3)",
      "DNS-Fehler (Schicht 7)",
      "Netzwerkkabel defekt (Schicht 1)",
      "DHCP-Server nicht erreichbar (Schicht 7)"
    ],
    explanation: "Das fehlende Default-Gateway ist ein Routing-Problem auf Schicht 3. Ohne Gateway weiß der PC nicht, wohin er Pakete außerhalb des LANs senden soll.",
    points: 30
  },
  {
    id: "diag-5",
    title: "Webserver antwortet nicht",
    description: "Der Webserver ist per Ping erreichbar, aber die Webseite lädt nicht.",
    symptom: "Ping zu 192.168.1.100 funktioniert. Browser zeigt 'Verbindung wurde zurückgewiesen'. Port 80 ist geschlossen.",
    affectedLayer: 4,
    correctDiagnosis: "Port geschlossen oder Dienst nicht gestartet (Schicht 4)",
    options: [
      "Port geschlossen oder Dienst nicht gestartet (Schicht 4)",
      "MAC-Adresse falsch (Schicht 2)",
      "Kabel defekt (Schicht 1)",
      "IP-Adresse falsch konfiguriert (Schicht 3)"
    ],
    explanation: "Ping funktioniert (Schicht 3), aber der Webserver-Port 80 ist nicht offen. Das ist ein Transport-Schicht-Problem (Schicht 4) - der Dienst läuft nicht oder die Firewall blockiert den Port.",
    points: 35
  },
  {
    id: "diag-6",
    title: "SSL-Zertifikatfehler",
    description: "Beim Besuch einer HTTPS-Seite erscheint eine Sicherheitswarnung.",
    symptom: "Browser zeigt: 'Das Sicherheitszertifikat ist abgelaufen' oder 'Das Zertifikat ist nicht vertrauenswürdig'.",
    affectedLayer: 6,
    correctDiagnosis: "SSL/TLS-Problem auf Darstellungsschicht (Schicht 6)",
    options: [
      "SSL/TLS-Problem auf Darstellungsschicht (Schicht 6)",
      "DNS-Fehler (Schicht 7)",
      "TCP-Verbindungsproblem (Schicht 4)",
      "Routing-Fehler (Schicht 3)"
    ],
    explanation: "SSL/TLS-Verschlüsselung arbeitet auf Schicht 6 (Darstellungsschicht). Ein Zertifikatfehler zeigt ein Problem in dieser Schicht an.",
    points: 40
  }
];

// ============================================================
// QUIZ-FRAGEN - IHK-Prüfungsvorbereitung
// ============================================================

export const quizQuestions: OSIQuizQuestion[] = [
  {
    id: "q1",
    question: "Auf welcher OSI-Schicht arbeitet ein Switch?",
    options: ["Schicht 1 - Physisch", "Schicht 2 - Sicherung", "Schicht 3 - Vermittlung", "Schicht 4 - Transport"],
    correctIndex: 1,
    explanation: "Ein Switch arbeitet auf Schicht 2 (Sicherungsschicht) und nutzt MAC-Adressen zur Frame-Weiterleitung.",
    relatedLayer: 2
  },
  {
    id: "q2",
    question: "Welches Protokoll arbeitet auf der Transportschicht (Schicht 4)?",
    options: ["IP", "HTTP", "TCP", "Ethernet"],
    correctIndex: 2,
    explanation: "TCP (Transmission Control Protocol) ist ein Schicht-4-Protokoll für zuverlässige, verbindungsorientierte Kommunikation.",
    relatedLayer: 4
  },
  {
    id: "q3",
    question: "Was ist die Dateneinheit (PDU) auf Schicht 3?",
    options: ["Bits", "Frames", "Pakete", "Segmente"],
    correctIndex: 2,
    explanation: "Auf Schicht 3 (Vermittlungsschicht) werden Daten als Pakete bezeichnet. Segmente sind Schicht 4, Frames sind Schicht 2.",
    relatedLayer: 3
  },
  {
    id: "q4",
    question: "Welche Adresse verwendet ein Router zur Weiterleitung?",
    options: ["MAC-Adresse", "IP-Adresse", "Port-Nummer", "Domain-Name"],
    correctIndex: 1,
    explanation: "Router arbeiten auf Schicht 3 und nutzen IP-Adressen für das Routing. Switches nutzen MAC-Adressen (Schicht 2).",
    relatedLayer: 3
  },
  {
    id: "q5",
    question: "Auf welcher Schicht findet die Ende-zu-Ende-Kommunikation statt?",
    options: ["Schicht 2", "Schicht 3", "Schicht 4", "Schicht 7"],
    correctIndex: 2,
    explanation: "Die Transportschicht (Schicht 4) ist für die Ende-zu-Ende-Kommunikation zwischen Anwendungen verantwortlich.",
    relatedLayer: 4
  },
  {
    id: "q6",
    question: "Welches Gerät regeneriert nur elektrische Signale ohne Logik?",
    options: ["Router", "Switch", "Hub", "Bridge"],
    correctIndex: 2,
    explanation: "Ein Hub arbeitet auf Schicht 1 und verstärkt nur elektrische Signale ohne Logik. Er sendet an alle Ports.",
    relatedLayer: 1
  },
  {
    id: "q7",
    question: "Wo wird SSL/TLS-Verschlüsselung im OSI-Modell eingeordnet?",
    options: ["Schicht 4 - Transport", "Schicht 5 - Sitzung", "Schicht 6 - Darstellung", "Schicht 7 - Anwendung"],
    correctIndex: 2,
    explanation: "SSL/TLS arbeitet auf Schicht 6 (Darstellungsschicht), da es für Verschlüsselung und Datenformatierung zuständig ist.",
    relatedLayer: 6
  },
  {
    id: "q8",
    question: "Welches Protokoll löst IP-Adressen in MAC-Adressen auf?",
    options: ["DNS", "DHCP", "ARP", "ICMP"],
    correctIndex: 2,
    explanation: "ARP (Address Resolution Protocol) arbeitet zwischen Schicht 2 und 3 und löst IP-Adressen in MAC-Adressen auf.",
    relatedLayer: 2
  },
  {
    id: "q9",
    question: "Auf welcher Schicht arbeitet DNS?",
    options: ["Schicht 4", "Schicht 5", "Schicht 6", "Schicht 7"],
    correctIndex: 3,
    explanation: "DNS (Domain Name System) ist ein Anwendungsschicht-Protokoll (Schicht 7), das Domainnamen in IP-Adressen auflöst.",
    relatedLayer: 7
  },
  {
    id: "q10",
    question: "Was ist der Hauptunterschied zwischen TCP und UDP?",
    options: [
      "TCP ist schneller",
      "UDP bietet Verbindungsorientierung",
      "TCP bietet Zuverlässigkeit mit Bestätigungen",
      "UDP verwendet IP-Adressen, TCP nicht"
    ],
    correctIndex: 2,
    explanation: "TCP ist verbindungsorientiert und bestätigt den Empfang von Daten (ACK). UDP ist schneller aber unzuverlässig.",
    relatedLayer: 4
  }
];

// Kombinierte Lektion für strukturierten Durchlauf
export interface OSILesson {
  id: string;
  title: string;
  description: string;
  type: "theory" | "drag-drop" | "diagnostic" | "quiz";
  content: OSIExercise | DiagnosticScenario[] | OSIQuizQuestion[] | string;
  order: number;
}

export const osiLessons: OSILesson[] = [
  {
    id: "lesson-theory-intro",
    title: "Einführung in das OSI-Modell",
    description: "Grundlagen und Aufbau des 7-Schichten-Modells",
    type: "theory",
    order: 1,
    content: `# Das OSI-Referenzmodell

Das **OSI-Modell** (Open Systems Interconnection) ist ein Referenzmodell für Netzwerkkommunikation, das 1984 von der ISO standardisiert wurde.

## Die 7 Schichten

| Schicht | Name | Funktion | Beispiele |
|---------|------|----------|-----------|
| 7 | Anwendung | Benutzer-Schnittstelle | HTTP, FTP, DNS |
| 6 | Darstellung | Formatierung, Verschlüsselung | SSL/TLS, JPEG |
| 5 | Sitzung | Dialog-Steuerung | NetBIOS, RPC |
| 4 | Transport | Ende-zu-Ende-Verbindung | TCP, UDP |
| 3 | Vermittlung | Routing, logische Adressen | IP, ICMP, Router |
| 2 | Sicherung | MAC-Adressen, Frames | Ethernet, Switch |
| 1 | Physisch | Bits, Signale, Kabel | Hub, Kabel, RJ45 |

## Merksätze

**Von unten nach oben (1→7):**
"Please Do Not Throw Sausage Pizza Away"

**Von oben nach unten (7→1):**
"All People Seem To Need Data Processing"

## Dateneinheiten (PDU)

- **Schicht 7-5**: Daten
- **Schicht 4**: Segmente (TCP) / Datagramme (UDP)
- **Schicht 3**: Pakete
- **Schicht 2**: Frames
- **Schicht 1**: Bits`
  },
  {
    id: "lesson-dd-1",
    title: "Drag & Drop: Grundlagen",
    description: "Ordne die ersten Elemente den Schichten zu",
    type: "drag-drop",
    order: 2,
    content: dragDropExercises[0]
  },
  {
    id: "lesson-dd-2",
    title: "Drag & Drop: Protokolle",
    description: "Vertiefe dein Wissen über Protokolle",
    type: "drag-drop",
    order: 3,
    content: dragDropExercises[1]
  },
  {
    id: "lesson-diagnostic-1",
    title: "Fehlerdiagnose Basics",
    description: "Ordne Netzwerkprobleme den richtigen Schichten zu",
    type: "diagnostic",
    order: 4,
    content: diagnosticScenarios.slice(0, 3)
  },
  {
    id: "lesson-dd-3",
    title: "Drag & Drop: Fortgeschritten",
    description: "Komplexere Zuordnungen für Experten",
    type: "drag-drop",
    order: 5,
    content: dragDropExercises[2]
  },
  {
    id: "lesson-diagnostic-2",
    title: "Fehlerdiagnose Fortgeschritten",
    description: "Anspruchsvollere Diagnose-Szenarien",
    type: "diagnostic",
    order: 6,
    content: diagnosticScenarios.slice(3, 6)
  },
  {
    id: "lesson-quiz",
    title: "IHK-Quiz: Wissenstest",
    description: "Teste dein Wissen mit Prüfungsfragen",
    type: "quiz",
    order: 7,
    content: quizQuestions.slice(0, 5)
  },
  {
    id: "lesson-dd-ihk",
    title: "IHK-Prüfungsvorbereitung",
    description: "Intensive Vorbereitung auf die Abschlussprüfung",
    type: "drag-drop",
    order: 8,
    content: dragDropExercises[3]
  },
  {
    id: "lesson-quiz-final",
    title: "Abschlusstest",
    description: "Finaler Test mit allen Themen",
    type: "quiz",
    order: 9,
    content: quizQuestions.slice(5, 10)
  }
];
