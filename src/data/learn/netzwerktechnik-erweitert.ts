import { LearnModule } from "../../types/learn";

export const netzwerktechnikErweitertContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "Netzwerk-Grundlagen - IHK Prüfungswissen",
    cards: [
      { 
        front: "OSI-Modell Layer im Detail", 
        back: "**Layer 1 - Physical:** Bits übertragen, Kabel, Hubs. **Layer 2 - Data Link:** Frames, MAC-Adressen, Switches, Ethernet. **Layer 3 - Network:** Routing, IP-Adressen, Router. **Layer 4 - Transport:** TCP/UDP, End-to-End Kommunikation. **Layer 5 - Session:** Sitzungsmanagement, NetBIOS. **Layer 6 - Presentation:** Verschlüsselung, Komprimierung. **Layer 7 - Application:** HTTP, FTP, SMTP. **IHK-Bedeutung:** Systematische Fehlersuche, Protokoll-Zuordnung." 
      },
      { 
        front: "TCP vs. UDP im Detail", 
        back: "**TCP (Transmission Control Protocol):** Verbindungsorientiert, zuverlässig, Reihenfolge garantiert, Fehlererkennung/korrektur, Überlastkontrolle. **Verwendung:** HTTP/HTTPS, FTP, SMTP, SSH. **UDP (User Datagram Protocol):** Verbindungslos, unzuverlässig, schnell, geringer Overhead. **Verwendung:** DNS, DHCP, Streaming, Gaming. **IHK-Entscheidung:** Zuverlässigkeit vs. Geschwindigkeit. **Header-Größe:** TCP 20+ Bytes, UDP 8 Bytes." 
      },
      { 
        front: "IPv4 Subnetting beherrschen", 
        back: "**CIDR-Notation:** /24 = 255.255.255.0, /16 = 255.255.0.0. **Subnetz berechnen:** Netzwerk-ID, Broadcast-Adresse, verwendbare IPs. **Beispiel:** 192.168.1.0/26 → 64 IPs, 62 verwendbar. **VLSM (Variable Length Subnet Masking):** Effiziente IP-Nutzung. **IHK-Praxis:** Netzwerk-Design, IP-Verteilung planen. **Private Bereiche:** 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16." 
      },
      { 
        front: "IPv6 Grundlagen", 
        back: "**Adresslänge:** 128 Bit vs. 32 Bit bei IPv4. **Notation:** 8 Gruppen à 4 Hex-Ziffern (2001:0db8:...). **Kürzung:** Führende Nullen weglassen, :: für aufeinanderfolgende Null-Gruppen. **Adresstypen:** Unicast, Multicast, Anycast (kein Broadcast!). **Link-Local:** fe80::/10, automatisch generiert. **IHK-Vorteil:** Mehr Adressen, eingebaute Sicherheit, einfacherer Header." 
      },
      { 
        front: "VLAN (Virtual LAN)", 
        back: "**Definition:** Logische Segmentierung eines physischen Netzwerks. **Vorteile:** Sicherheit, Broadcast-Reduzierung, Flexibilität. **Tagging:** 802.1Q fügt VLAN-ID zum Frame hinzu. **Access Port:** Gehört zu einem VLAN, untagged. **Trunk Port:** Trägt mehrere VLANs, tagged. **Inter-VLAN-Routing:** Layer-3-Switch oder Router erforderlich. **IHK-Praxis:** Abteilungstrennung, Gäste-WLAN isolieren." 
      },
      { 
        front: "Routing-Protokolle", 
        back: "**Statisches Routing:** Manuell konfiguriert, kleine Netzwerke. **Dynamisches Routing:** Automatische Anpassung. **Distance Vector (RIP):** Hop-Count, max 15, langsame Konvergenz. **Link State (OSPF):** Kosten-basiert, schnelle Konvergenz, Areas. **Path Vector (BGP):** Internet-Routing zwischen AS. **IHK-Entscheidung:** Netzwerkgröße, Redundanz, Komplexität." 
      },
      { 
        front: "DHCP im Detail", 
        back: "**DORA-Prozess:** Discover → Offer → Request → Acknowledge. **Lease:** IP-Adresse für bestimmte Zeit. **Scope:** Pool verfügbarer Adressen. **Reservierung:** Feste IP für bestimmte MAC. **DHCP-Relay:** Weiterleitung über Netzgrenzen. **Optionen:** Gateway, DNS, Domain. **IHK-Praxis:** DHCP-Server absichern, Lease-Zeiten optimieren." 
      },
      { 
        front: "DNS (Domain Name System)", 
        back: "**Funktion:** Übersetzt Domain-Namen in IP-Adressen. **Record-Typen:** A (IPv4), AAAA (IPv6), MX (Mail), CNAME (Alias), TXT, NS. **Hierarchie:** Root → TLD (.de, .com) → Second-Level → Subdomain. **Rekursiv vs. Iterativ:** Client-Resolver vs. Server-zu-Server. **Caching:** TTL bestimmt Gültigkeit. **IHK-Sicherheit:** DNSSEC, DNS over HTTPS/TLS." 
      },
      { 
        front: "NAT (Network Address Translation)", 
        back: "**Static NAT:** 1:1-Zuordnung, Server im Internet erreichbar. **Dynamic NAT:** Pool öffentlicher IPs. **PAT/NAPT:** Viele private IPs teilen sich eine öffentliche (Port-basiert). **Vorteile:** IPv4-Adressen sparen, Sicherheit durch Verstecken. **Nachteile:** Komplexität, Probleme mit einigen Protokollen. **IHK-Praxis:** Häufigste Konfiguration ist PAT am Router." 
      },
      { 
        front: "Netzwerk-Topologien", 
        back: "**Stern:** Zentrale Komponente (Switch), einfache Wartung, Single Point of Failure. **Ring:** Token-basiert, deterministisch, Ausfall stoppt Netzwerk. **Bus:** Gemeinsames Medium, Kollisionen, veraltet. **Mesh:** Redundant, komplex, teuer. **Baum:** Hierarchisch, Skalierbar. **IHK-Praxis:** Meist Stern in LANs, Mesh für WAN-Redundanz." 
      }
    ]
  },
  {
    type: "quiz",
    title: "Netzwerktechnik Prüfungsfragen",
    questions: [
      {
        question: "Welches Protokoll arbeitet auf Layer 3 des OSI-Modells?",
        options: ["Ethernet", "IP", "TCP", "HTTP"],
        correctIndex: 1,
        explanation: "IP (Internet Protocol) arbeitet auf Layer 3 (Network Layer) und ist für die logische Adressierung und das Routing zuständig."
      },
      {
        question: "Wie viele Host-Adressen sind in einem /26 Subnetz nutzbar?",
        options: ["62", "64", "126", "128"],
        correctIndex: 0,
        explanation: "/26 = 64 Adressen (2^6), davon sind 62 nutzbar (Netzwerk- und Broadcast-Adresse abziehen)."
      },
      {
        question: "Welcher DHCP-Schritt kommt nach 'Discover'?",
        options: ["Request", "Offer", "Acknowledge", "Release"],
        correctIndex: 1,
        explanation: "Der DORA-Prozess: Discover → Offer → Request → Acknowledge. Der Server antwortet auf Discover mit einem Offer."
      },
      {
        question: "Welches Routing-Protokoll nutzt Hop-Count als Metrik?",
        options: ["OSPF", "RIP", "BGP", "EIGRP"],
        correctIndex: 1,
        explanation: "RIP (Routing Information Protocol) nutzt Hop-Count als einzige Metrik, max. 15 Hops."
      },
      {
        question: "Was ist der Hauptvorteil von VLANs?",
        options: ["Höhere Geschwindigkeit", "Logische Netzwerksegmentierung", "Mehr IP-Adressen", "Automatisches Routing"],
        correctIndex: 1,
        explanation: "VLANs ermöglichen logische Segmentierung eines physischen Netzwerks für Sicherheit und Broadcast-Reduzierung."
      },
      {
        question: "Welcher DNS-Record-Typ ist für E-Mail-Server zuständig?",
        options: ["A", "CNAME", "MX", "TXT"],
        correctIndex: 2,
        explanation: "MX (Mail Exchange) Records verweisen auf den E-Mail-Server einer Domain."
      },
      {
        question: "Was ist PAT (Port Address Translation)?",
        options: ["Protokoll für Druckservices", "NAT mit Port-Unterscheidung", "Passwort-Authentifizierung", "Paket-Analyse-Tool"],
        correctIndex: 1,
        explanation: "PAT ermöglicht vielen internen Geräten, eine einzige öffentliche IP-Adresse zu teilen, unterschieden durch Ports."
      },
      {
        question: "Auf welchem Layer arbeitet ein Switch?",
        options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"],
        correctIndex: 1,
        explanation: "Ein klassischer Switch arbeitet auf Layer 2 (Data Link) mit MAC-Adressen. Layer-3-Switches können auch routen."
      }
    ]
  },
  {
    type: "flashcards",
    title: "Netzwerk-Sicherheit & Protokolle",
    cards: [
      { 
        front: "Firewall-Typen", 
        back: "**Paketfilter:** Prüft Header (IP, Port), einfach, schnell. **Stateful Inspection:** Verfolgt Verbindungsstatus. **Application Layer:** Prüft Anwendungsdaten (L7), Deep Packet Inspection. **Next-Generation (NGFW):** IDS/IPS, Malware-Schutz, Application Control. **WAF (Web Application):** Speziell für Webanwendungen, SQL-Injection, XSS. **IHK-Praxis:** Meist NGFW mit Zonen-Konzept." 
      },
      { 
        front: "VPN-Technologien", 
        back: "**IPsec:** Transport/Tunnel-Modus, AH/ESP, IKE für Schlüsselaustausch. **SSL/TLS-VPN:** Browserbasiert, OpenVPN. **Site-to-Site:** Verbindet Netzwerke, feste Tunnel. **Remote Access:** Einzelne Benutzer, dynamisch. **Split Tunneling:** Nur Firmendaten über VPN. **IHK-Sicherheit:** Authentifizierung, Verschlüsselung, Perfect Forward Secrecy." 
      },
      { 
        front: "Wichtige Ports kennen", 
        back: "**20/21:** FTP (Daten/Steuerung). **22:** SSH. **23:** Telnet (unsicher!). **25:** SMTP. **53:** DNS. **67/68:** DHCP. **80:** HTTP. **110:** POP3. **143:** IMAP. **443:** HTTPS. **389:** LDAP. **636:** LDAPS. **3389:** RDP. **IHK-Praxis:** Ports für Firewall-Regeln, Fehlerdiagnose." 
      },
      { 
        front: "Netzwerk-Troubleshooting", 
        back: "**ping:** ICMP Echo, Erreichbarkeit prüfen. **traceroute/tracert:** Routenverfolgung, Hops anzeigen. **nslookup/dig:** DNS-Abfragen. **ipconfig/ifconfig:** IP-Konfiguration anzeigen. **netstat:** Verbindungen und Ports. **arp:** ARP-Cache, MAC-Zuordnung. **IHK-Methodik:** Schichtweise vorgehen, von unten nach oben (OSI)." 
      },
      { 
        front: "WLAN-Standards (802.11)", 
        back: "**802.11a:** 5 GHz, 54 Mbit/s. **802.11b:** 2.4 GHz, 11 Mbit/s. **802.11g:** 2.4 GHz, 54 Mbit/s. **802.11n (Wi-Fi 4):** 2.4/5 GHz, 600 Mbit/s, MIMO. **802.11ac (Wi-Fi 5):** 5 GHz, bis 6.9 Gbit/s. **802.11ax (Wi-Fi 6):** 2.4/5 GHz, bis 9.6 Gbit/s, OFDMA. **Sicherheit:** WPA3 aktuell, WPA2 noch verbreitet." 
      }
    ]
  }
];
