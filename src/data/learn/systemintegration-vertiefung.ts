import type { LearnModule } from "@/types/learn";

export const systemintegrationVertiefungContent: LearnModule[] = [
  // ========== IT-SYSTEME KONZIPIEREN & REALISIEREN ==========
  {
    type: "flashcards",
    title: "IT-Systeme konzipieren und realisieren",
    cards: [
      { front: "Was sind die Phasen der IT-Systemplanung?", back: "**1. Anforderungsanalyse:** Ist-Zustand, Soll-Zustand, Lastenheft. **2. Konzeption:** Technische Lösung, Pflichtenheft. **3. Beschaffung:** Angebote einholen, vergleichen, bestellen. **4. Implementierung:** Installation, Konfiguration, Test. **5. Abnahme:** Funktionstest, Dokumentation, Übergabe. **IHK-Bedeutung:** Strukturiertes Vorgehen für erfolgreiche Projekte." },
      { front: "Lastenheft vs. Pflichtenheft", back: "**Lastenheft (Kunde):** Was soll das System können? Anforderungen aus Kundensicht, fachliche Beschreibung, Rahmenbedingungen. **Pflichtenheft (Auftragnehmer):** Wie wird das umgesetzt? Technische Lösung, Architektur, Zeitplan, Kosten. **IHK-Praxis:** Lastenheft = Vertragsbasis, Pflichtenheft = Umsetzungsleitfaden." },
      { front: "TCO (Total Cost of Ownership)", back: "**Direkte Kosten:** Anschaffung, Lizenzen, Hardware. **Indirekte Kosten:** Schulung, Support, Wartung, Stromkosten, Raumkosten. **Versteckte Kosten:** Produktivitätsverlust, Ausfallzeiten, Upgrades. **TCO-Berechnung:** Alle Kosten über Lebenszyklus (3-5 Jahre). **IHK-Bedeutung:** Wirtschaftlichkeitsvergleich verschiedener Lösungen." },
      { front: "ROI (Return on Investment) für IT-Projekte", back: "**Formel:** ROI = (Gewinn - Investitionskosten) / Investitionskosten × 100%. **IT-Nutzen quantifizieren:** Zeitersparnis, Fehlerreduzierung, Produktivitätssteigerung. **Break-Even-Point:** Ab wann amortisiert sich die Investition? **IHK-Beispiel:** Server-Virtualisierung spart 30% Energiekosten, ROI nach 18 Monaten." },
      { front: "Anforderungsanalyse Methoden", back: "**Interviews:** Stakeholder befragen, Anforderungen erfassen. **Workshops:** Gruppenarbeit, Brainstorming, Priorisierung. **Beobachtung:** Ist-Prozesse analysieren, Schwachstellen finden. **Dokumentenanalyse:** Bestehende Systeme, Prozessbeschreibungen. **Prototyping:** Mockups, Wireframes für Feedback. **IHK-Tipp:** Kombination mehrerer Methoden für vollständiges Bild." },
      { front: "IT-Systemarchitektur Typen", back: "**Monolithisch:** Eine Anwendung, einfach, aber schlecht skalierbar. **Client-Server:** Zentrale Dienste, Thin/Fat Clients. **3-Tier:** Präsentation, Logik, Daten getrennt. **N-Tier:** Mehrere Schichten, SOA. **Microservices:** Kleine, unabhängige Dienste, Container. **IHK-Entscheidung:** Anforderungen → passende Architektur wählen." },
      { front: "Lizenzmodelle für Software", back: "**Kauflizenz (Perpetual):** Einmalzahlung, dauerhafte Nutzung. **Subscription:** Monatlich/jährlich, SaaS-Modell. **Named User:** Pro benannten Benutzer. **Concurrent User:** Gleichzeitige Nutzer. **Core/CPU-Lizenz:** Nach Prozessorkern. **Open Source:** GPL, MIT, Apache - Bedingungen beachten! **IHK-Berechnung:** Lizenzen für Szenarien kalkulieren." },
      { front: "Barrierefreiheit in IT-Systemen", back: "**WCAG-Richtlinien:** Wahrnehmbar, bedienbar, verständlich, robust. **Technische Maßnahmen:** Screenreader-Kompatibilität, Tastaturnavigation, Kontraste, Alternativtexte. **Gesetzlich:** BITV 2.0 für öffentliche Stellen. **IHK-Relevanz:** Inklusive IT-Lösungen konzipieren und bewerten." },
      { front: "Hardwareauswahl für Server", back: "**CPU:** Kerne/Threads für parallele Aufgaben, Taktfrequenz für Single-Thread. **RAM:** ECC für Fehlererkennung, ausreichend Kapazität. **Storage:** SSD für IOPS, HDD für Kapazität, RAID für Redundanz. **Netzwerk:** Mehrere NICs, 10GbE für hohen Durchsatz. **IHK-Kriterien:** Leistung, Zuverlässigkeit, Erweiterbarkeit, Preis." },
      { front: "Energieeffizienz und Green IT", back: "**PUE (Power Usage Effectiveness):** Gesamtenergie / IT-Energie, ideal nahe 1,0. **Maßnahmen:** Virtualisierung, effiziente Kühlung, moderne Hardware, Standby-Management. **Zertifizierungen:** Energy Star, Blue Angel, EPEAT. **IHK-Bedeutung:** Nachhaltigkeit und Kosteneinsparung bewerten." }
    ]
  },
  {
    type: "quiz",
    title: "IT-Systeme konzipieren - Prüfungsfragen",
    questions: [
      {
        question: "Welches Dokument beschreibt WIE eine Anforderung technisch umgesetzt wird?",
        options: ["Lastenheft", "Pflichtenheft", "Angebot", "Protokoll"],
        correctIndex: 1,
        explanation: "Das Pflichtenheft wird vom Auftragnehmer erstellt und beschreibt die technische Umsetzung der im Lastenheft definierten Anforderungen."
      },
      {
        question: "Was umfasst die TCO-Berechnung NICHT direkt?",
        options: ["Anschaffungskosten", "Wartungskosten", "Marktanteil des Herstellers", "Schulungskosten"],
        correctIndex: 2,
        explanation: "TCO umfasst alle direkten und indirekten Kosten, aber nicht qualitative Faktoren wie Marktanteil."
      },
      {
        question: "Ein Server-System soll 24/7 verfügbar sein und kritische Datenbanken hosten. Welche Storage-Eigenschaft ist am wichtigsten?",
        options: ["Maximale Kapazität", "Niedrigster Preis", "RAID-Redundanz mit ECC", "USB-Anschluss"],
        correctIndex: 2,
        explanation: "Für kritische 24/7-Systeme ist Datensicherheit durch RAID und ECC-RAM essentiell."
      },
      {
        question: "Welche Lizenzart eignet sich für variable Nutzerzahlen am besten?",
        options: ["Named User Lizenz", "Concurrent User Lizenz", "Kauflizenz", "Core-Lizenz"],
        correctIndex: 1,
        explanation: "Concurrent User Lizenzen erlauben flexible gleichzeitige Nutzung und sind bei schwankenden Nutzerzahlen wirtschaftlicher."
      },
      {
        question: "Was gehört zur Anforderungsanalyse?",
        options: ["Installation der Software", "Stakeholder-Interviews führen", "Rechnung erstellen", "Wartungsvertrag abschließen"],
        correctIndex: 1,
        explanation: "Stakeholder-Interviews sind eine wichtige Methode, um Anforderungen zu erfassen und zu verstehen."
      },
      {
        question: "Welche Architektur bietet die beste Skalierbarkeit für Cloud-native Anwendungen?",
        options: ["Monolithisch", "2-Tier Client-Server", "Microservices", "Einzelplatz-System"],
        correctIndex: 2,
        explanation: "Microservices ermöglichen unabhängige Skalierung einzelner Komponenten und sind ideal für Cloud-Umgebungen."
      },
      {
        question: "ROI von 50% nach 2 Jahren bedeutet:",
        options: ["50% der Kosten wurden gespart", "Der Gewinn beträgt 50% der Investition", "Die Investition ist halb bezahlt", "50% der Zeit wurde gespart"],
        correctIndex: 1,
        explanation: "ROI = (Gewinn - Investition) / Investition × 100%. Bei 50% ROI wurde zusätzlich zur Investitionsdeckung 50% Gewinn erzielt."
      },
      {
        question: "Welches Kriterium gehört zu WCAG für Barrierefreiheit?",
        options: ["Maximale Geschwindigkeit", "Wahrnehmbarkeit", "Minimaler Preis", "Höchste Auflösung"],
        correctIndex: 1,
        explanation: "WCAG definiert 4 Prinzipien: Wahrnehmbar, Bedienbar, Verständlich, Robust (POUR)."
      }
    ]
  },

  // ========== NETZWERKE INSTALLIEREN & KONFIGURIEREN ==========
  {
    type: "flashcards",
    title: "Netzwerke installieren und konfigurieren",
    cards: [
      { front: "Strukturierte Verkabelung nach EN 50173", back: "**Primärbereich:** Gebäudeübergreifend, Glasfaser. **Sekundärbereich:** Etagenverteiler, Steigzone, Glasfaser/Kupfer. **Tertiärbereich:** Etage zu Arbeitsplatz, Kupfer Cat 6/7. **Komponenten:** Patchpanel, Patchkabel, Dosen, Verteiler. **IHK-Bedeutung:** Normgerechte Installation planen und bewerten." },
      { front: "Kabelkategorien und Geschwindigkeiten", back: "**Cat 5e:** 1 Gbit/s, 100 MHz, veraltet. **Cat 6:** 1 Gbit/s (10G bis 55m), 250 MHz. **Cat 6a:** 10 Gbit/s, 500 MHz, empfohlen. **Cat 7:** 10 Gbit/s, 600 MHz, geschirmt. **Cat 8:** 25/40 Gbit/s, 2000 MHz, Rechenzentrum. **Glasfaser:** Single-Mode km-Reichweite, Multi-Mode <500m." },
      { front: "VLAN-Konfiguration", back: "**Zweck:** Netzwerksegmentierung, Broadcast-Domänen trennen, Sicherheit. **Access Port:** Gehört zu einem VLAN, für Endgeräte. **Trunk Port:** Transportiert mehrere VLANs, 802.1Q-Tagging. **Native VLAN:** Ungetaggte Frames auf Trunk. **IHK-Praxis:** VLAN-Plan erstellen, Switch konfigurieren." },
      { front: "Routing-Grundlagen", back: "**Statisches Routing:** Manuell konfiguriert, für kleine Netze. **Dynamisches Routing:** Protokolle wie OSPF, RIP, EIGRP. **Default Gateway:** Standard-Route für unbekannte Ziele. **Routing-Tabelle:** Netzwerk, Maske, Gateway, Metrik, Interface. **IHK-Berechnung:** Nächsten Hop bestimmen, Routing-Entscheidungen." },
      { front: "DHCP-Server konfigurieren", back: "**Scope:** IP-Bereich, Subnetzmaske, Lease-Dauer. **Reservierungen:** Feste IP per MAC-Adresse. **Optionen:** Gateway (Option 3), DNS (Option 6), NTP, TFTP. **DHCP-Relay:** Weiterleitung über Router-Grenzen. **IHK-Troubleshooting:** DORA-Prozess (Discover, Offer, Request, Acknowledge)." },
      { front: "DNS-Konfiguration und Zonen", back: "**Forward Lookup:** Name → IP-Adresse auflösen. **Reverse Lookup:** IP → Name (PTR-Records). **Zonentypen:** Primär (Master), Sekundär (Slave), Stub. **Record-Typen:** A, AAAA, CNAME, MX, NS, SOA, TXT. **IHK-Praxis:** DNS-Server einrichten, Zonen verwalten, Troubleshooting mit nslookup/dig." },
      { front: "Firewall-Regeln erstellen", back: "**Grundprinzip:** Default Deny, explizit erlauben. **Regel-Komponenten:** Quelle, Ziel, Port, Protokoll, Aktion. **Stateful Inspection:** Verbindungsstatus berücksichtigen. **DMZ:** Demilitarisierte Zone für öffentliche Server. **IHK-Beispiel:** Web-Server in DMZ, nur Port 80/443 von außen erlauben." },
      { front: "WLAN-Standards und Konfiguration", back: "**802.11ac (Wi-Fi 5):** 5 GHz, bis 6,9 Gbit/s. **802.11ax (Wi-Fi 6):** 2,4/5/6 GHz, bis 9,6 Gbit/s, OFDMA. **Sicherheit:** WPA3-Personal, WPA3-Enterprise, 802.1X. **Kanalplanung:** Überlappungsfreie Kanäle (1, 6, 11 bei 2,4 GHz). **IHK-Praxis:** SSID, Verschlüsselung, Kanalwahl konfigurieren." },
      { front: "Netzwerk-Monitoring und -Tools", back: "**SNMP:** Simple Network Management Protocol, MIBs, Traps. **Monitoring-Tools:** Nagios, Zabbix, PRTG, Wireshark. **Baselines:** Normalen Netzwerkverkehr dokumentieren. **Alarme:** Schwellwerte definieren, automatische Benachrichtigung. **IHK-Bedeutung:** Proaktive Überwachung, Fehlerprävention." },
      { front: "VPN-Technologien", back: "**Site-to-Site VPN:** Standortvernetzung, IPsec-Tunnel. **Remote Access VPN:** Einzelbenutzer-Zugang, SSL-VPN/OpenVPN. **IPsec:** Tunnel-Mode, Transport-Mode, IKE für Schlüsselaustausch. **Split Tunneling:** Nur Firmendaten über VPN. **IHK-Einsatz:** Sichere Kommunikation über Internet." }
    ]
  },
  {
    type: "quiz",
    title: "Netzwerke installieren - Prüfungsfragen",
    questions: [
      {
        question: "Welche Kabelkategorie ist für 10 Gbit/s über 100m Kupfer geeignet?",
        options: ["Cat 5e", "Cat 6", "Cat 6a", "Cat 5"],
        correctIndex: 2,
        explanation: "Cat 6a unterstützt 10 Gbit/s über die volle 100m Strecke, während Cat 6 nur bis 55m 10G schafft."
      },
      {
        question: "Was ist der Zweck eines Trunk-Ports?",
        options: ["Endgeräte anschließen", "Mehrere VLANs transportieren", "IP-Adressen vergeben", "Drucker verbinden"],
        correctIndex: 1,
        explanation: "Trunk-Ports transportieren Traffic mehrerer VLANs zwischen Switches mittels 802.1Q-Tagging."
      },
      {
        question: "Welche DHCP-Option definiert das Standard-Gateway?",
        options: ["Option 1", "Option 3", "Option 6", "Option 15"],
        correctIndex: 1,
        explanation: "DHCP Option 3 definiert den Router/das Default Gateway für Clients."
      },
      {
        question: "Welcher DNS-Record-Typ wird für E-Mail-Server verwendet?",
        options: ["A", "CNAME", "MX", "PTR"],
        correctIndex: 2,
        explanation: "MX-Records (Mail Exchanger) definieren die für eine Domain zuständigen Mailserver."
      },
      {
        question: "Was bedeutet 'Default Deny' bei Firewall-Konfiguration?",
        options: ["Alle Verbindungen erlauben", "Nur bekannte Angriffe blockieren", "Alles blockieren, nur explizit Erlaubtes durchlassen", "Firewall deaktivieren"],
        correctIndex: 2,
        explanation: "Default Deny ist das sichere Grundprinzip: Alles ist verboten, außer es wurde explizit erlaubt."
      },
      {
        question: "Welche WLAN-Verschlüsselung ist aktuell der sicherste Standard?",
        options: ["WEP", "WPA", "WPA2-TKIP", "WPA3"],
        correctIndex: 3,
        explanation: "WPA3 ist der neueste und sicherste WLAN-Sicherheitsstandard mit verbesserter Verschlüsselung."
      },
      {
        question: "Was transportiert der Sekundärbereich der strukturierten Verkabelung?",
        options: ["Gebäude zu Gebäude", "Etage zu Arbeitsplatz", "Stockwerk zu Stockwerk (Steigzone)", "Patchpanel zu Switch"],
        correctIndex: 2,
        explanation: "Der Sekundärbereich verbindet Etagenverteiler in der Steigzone, typisch mit Glasfaser oder Kupfer."
      },
      {
        question: "Welches Protokoll ermöglicht zentrales Netzwerk-Monitoring?",
        options: ["HTTP", "SNMP", "SMTP", "FTP"],
        correctIndex: 1,
        explanation: "SNMP (Simple Network Management Protocol) ermöglicht die zentrale Überwachung von Netzwerkgeräten."
      }
    ]
  },

  // ========== IT-SYSTEME ADMINISTRIEREN (VERTIEFUNG) ==========
  {
    type: "flashcards",
    title: "IT-Systeme administrieren - Vertiefung",
    cards: [
      { front: "Active Directory Struktur", back: "**Forest:** Höchste Ebene, Vertrauensstellungen. **Domain:** Sicherheitsgrenze, eigene Policies. **OU (Organizational Unit):** Strukturierung, GPO-Vererbung. **Objekte:** Benutzer, Computer, Gruppen, Drucker. **Replikation:** Multi-Master zwischen Domain Controllern. **IHK-Praxis:** AD-Design, Benutzer- und Gruppenverwaltung." },
      { front: "Group Policy Objects (GPOs)", back: "**Zweck:** Zentrale Konfiguration von Benutzern/Computern. **Vererbung:** Site → Domain → OU, Block Inheritance möglich. **Filterung:** WMI-Filter, Sicherheitsfilterung. **Häufige GPOs:** Passwortrichtlinien, Software-Deployment, Ordnerumleitung. **Troubleshooting:** gpresult, RSOP.msc. **IHK-Bedeutung:** GPOs planen und anwenden." },
      { front: "Linux-Systemadministration", back: "**Paketverwaltung:** apt (Debian/Ubuntu), yum/dnf (RHEL/CentOS). **Dienstverwaltung:** systemctl start/stop/enable/status. **Benutzer:** useradd, usermod, passwd, /etc/passwd, /etc/shadow. **Berechtigungen:** chmod, chown, rwx (421), SUID/SGID/Sticky. **Logs:** /var/log/, journalctl, syslog." },
      { front: "Backup-Strategien", back: "**Vollbackup:** Alle Daten, lange Laufzeit, einfache Wiederherstellung. **Inkrementell:** Nur Änderungen seit letztem Backup, schnell, komplexe Wiederherstellung. **Differentiell:** Änderungen seit letztem Vollbackup, Kompromiss. **3-2-1-Regel:** 3 Kopien, 2 Medientypen, 1 extern. **IHK-Berechnung:** Backup-Zeiten, Speicherbedarf kalkulieren." },
      { front: "Disaster Recovery Konzepte", back: "**RPO (Recovery Point Objective):** Maximaler Datenverlust (Zeit). **RTO (Recovery Time Objective):** Maximale Ausfallzeit. **Hot Site:** Sofort einsatzbereit, teuer. **Warm Site:** Hardware vorhanden, Daten müssen eingespielt werden. **Cold Site:** Nur Räumlichkeiten, längste Wiederherstellung. **DR-Test:** Regelmäßig durchführen und dokumentieren!" },
      { front: "Monitoring und Alerting", back: "**System-Metriken:** CPU, RAM, Disk, Netzwerk. **Anwendungs-Metriken:** Response-Time, Fehlerrate, Durchsatz. **Tools:** Prometheus, Grafana, ELK-Stack, Nagios. **Alerting:** Schwellwerte definieren, Eskalation, On-Call-Rotation. **IHK-Bedeutung:** Proaktive Problemerkennung, SLA-Einhaltung." },
      { front: "Patch-Management", back: "**Patch-Zyklus:** Bewerten → Testen → Deployment → Verifizieren. **WSUS:** Windows Server Update Services für Windows-Umgebungen. **Staging:** Test-Umgebung vor Produktion. **Rollback-Plan:** Bei Problemen schnell zurückrollen. **Zeitfenster:** Maintenance Windows definieren. **IHK-Praxis:** Patch-Strategie dokumentieren." },
      { front: "Automatisierung mit Scripting", back: "**PowerShell:** Windows-Administration, AD-Verwaltung, Azure. **Bash:** Linux-Scripting, Systemaufgaben automatisieren. **Python:** Plattformübergreifend, APIs, komplexe Aufgaben. **Ansible:** Agentless Configuration Management, YAML-Playbooks. **IHK-Vorteil:** Wiederholbare, dokumentierte Prozesse." },
      { front: "Containerisierung mit Docker", back: "**Image:** Vorlage für Container, Read-Only Layers. **Container:** Laufende Instanz eines Images, isoliert. **Dockerfile:** Bauanleitung für Images. **docker-compose:** Multi-Container-Anwendungen definieren. **Registry:** Docker Hub, private Registry für Images. **IHK-Vorteile:** Portabilität, Konsistenz, schnelle Bereitstellung." },
      { front: "Cluster und Hochverfügbarkeit", back: "**Active-Passive:** Standby-Server übernimmt bei Ausfall. **Active-Active:** Last wird verteilt, beide aktiv. **Load Balancer:** Anfragen auf Server verteilen, Health Checks. **Failover:** Automatischer Wechsel zum Backup. **Quorum:** Mehrheitsentscheidung im Cluster. **IHK-Berechnung:** Verfügbarkeit in % berechnen (99,9% = 8,76h Ausfall/Jahr)." }
    ]
  },
  {
    type: "quiz",
    title: "IT-Administration Vertiefung - Prüfungsfragen",
    questions: [
      {
        question: "In welcher Reihenfolge werden GPOs angewendet?",
        options: ["OU → Domain → Site", "Site → Domain → OU", "Domain → OU → Site", "Zufällig"],
        correctIndex: 1,
        explanation: "GPO-Vererbung: Site → Domain → OU. Spätere GPOs überschreiben frühere (SDOU-Reihenfolge)."
      },
      {
        question: "Was bedeutet RPO = 4 Stunden?",
        options: ["Das System muss in 4 Stunden wiederhergestellt sein", "Maximal 4 Stunden Datenverlust sind akzeptabel", "Backups laufen alle 4 Stunden", "Der Server ist 4 Stunden offline"],
        correctIndex: 1,
        explanation: "RPO (Recovery Point Objective) definiert den maximal akzeptablen Datenverlust gemessen in Zeit."
      },
      {
        question: "Welcher Linux-Befehl startet einen Dienst und aktiviert ihn für den Systemstart?",
        options: ["service start enable", "systemctl start --enable", "systemctl enable --now", "init.d start"],
        correctIndex: 2,
        explanation: "systemctl enable --now startet den Dienst sofort UND aktiviert ihn für den automatischen Start."
      },
      {
        question: "Welche Backup-Methode benötigt bei der Wiederherstellung alle vorherigen Backups seit dem letzten Vollbackup?",
        options: ["Vollbackup", "Differentielles Backup", "Inkrementelles Backup", "Snapshot"],
        correctIndex: 2,
        explanation: "Inkrementelle Backups speichern nur Änderungen seit dem letzten Backup, daher werden alle benötigt."
      },
      {
        question: "Was ist der Hauptvorteil von Docker-Containern gegenüber VMs?",
        options: ["Bessere Sicherheit", "Mehr Speicherplatz", "Geringerer Overhead und schnellere Starts", "Einfachere Backup-Erstellung"],
        correctIndex: 2,
        explanation: "Container teilen sich den Kernel und haben keinen eigenen OS-Overhead, was sie schneller und ressourcenschonender macht."
      },
      {
        question: "Welches Tool wird für Windows Update-Management im Unternehmen verwendet?",
        options: ["apt", "yum", "WSUS", "Docker"],
        correctIndex: 2,
        explanation: "WSUS (Windows Server Update Services) ermöglicht zentrale Verteilung von Windows-Updates."
      },
      {
        question: "99,9% Verfügbarkeit bedeutet maximal wie viel Ausfallzeit pro Jahr?",
        options: ["52,6 Minuten", "8,76 Stunden", "87,6 Stunden", "3,65 Tage"],
        correctIndex: 1,
        explanation: "99,9% = 0,1% Ausfall = 0,001 × 365 × 24 = 8,76 Stunden pro Jahr."
      },
      {
        question: "Was ist Ansible?",
        options: ["Ein Container-Tool", "Ein Agentless Configuration Management Tool", "Ein Backup-Programm", "Eine Datenbank"],
        correctIndex: 1,
        explanation: "Ansible ist ein agentloses Tool für Configuration Management und Automatisierung mittels YAML-Playbooks."
      }
    ]
  }
];
