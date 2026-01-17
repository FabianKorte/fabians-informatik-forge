import type { LearnModule } from "@/types/learn";

export const fachrechnenContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "Zahlensysteme - IHK Grundlagen",
    cards: [
      { 
        front: "Dezimal zu Binär umrechnen", 
        back: "**Methode:** Division durch 2, Reste von unten nach oben lesen. **Beispiel 13:** 13÷2=6 R1, 6÷2=3 R0, 3÷2=1 R1, 1÷2=0 R1 → 1101. **Schnelle Werte:** 1,2,4,8,16,32,64,128,256,512,1024. **IHK-Tipp:** Potenzen von 2 auswendig lernen beschleunigt die Umrechnung." 
      },
      { 
        front: "Binär zu Dezimal umrechnen", 
        back: "**Methode:** Jede Stelle mit 2^Position multiplizieren, von rechts beginnend. **Beispiel 1101:** 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13. **IHK-Praxis:** Häufig bei IP-Adressen und Subnetzmasken." 
      },
      { 
        front: "Hexadezimal (Basis 16)", 
        back: "**Ziffern:** 0-9 und A-F (A=10, B=11, C=12, D=13, E=14, F=15). **Binär-Umrechnung:** Je 4 Binärstellen = 1 Hex-Ziffer. **Beispiel:** 1010 1100 = AC. **IHK-Verwendung:** Farbcodes (#FF0000), MAC-Adressen, Speicheradressen." 
      },
      { 
        front: "Zweierkomplement für negative Zahlen", 
        back: "**Berechnung:** 1. Alle Bits invertieren 2. +1 addieren. **Beispiel -5 (8-Bit):** 5=00000101, invertiert=11111010, +1=11111011. **Vorteil:** Addition/Subtraktion mit gleicher Hardware. **Erkennung:** MSB=1 bedeutet negativ. **IHK-Wichtig:** Standard für Integer in Computern." 
      },
      { 
        front: "Logische Operatoren (AND, OR, XOR)", 
        back: "**AND (∧):** Beide 1 → 1. **OR (∨):** Mindestens einer 1 → 1. **XOR (⊕):** Genau einer 1 → 1. **NOT (¬):** Invertiert Bit. **IHK-Anwendung:** Subnetzberechnung (IP AND Maske), Verschlüsselung (XOR), Bitmanipulation." 
      }
    ]
  },
  {
    type: "quiz",
    title: "Zahlensysteme - Prüfungsfragen",
    questions: [
      {
        question: "Was ist die Dezimalzahl 42 in Binär?",
        options: ["101010", "110010", "101100", "100101"],
        correctIndex: 0
      },
      {
        question: "Was ist die Binärzahl 11001010 in Hexadezimal?",
        options: ["CA", "AC", "C2", "2C"],
        correctIndex: 0
      },
      {
        question: "Wie lautet das Zweierkomplement von -7 bei 8 Bit?",
        options: ["11111001", "11111000", "10000111", "11110111"],
        correctIndex: 0
      },
      {
        question: "Was ergibt 1010 AND 1100?",
        options: ["1000", "1110", "0110", "1010"],
        correctIndex: 0
      },
      {
        question: "Welches Zahlensystem wird für MAC-Adressen verwendet?",
        options: ["Dezimal", "Binär", "Oktal", "Hexadezimal"],
        correctIndex: 3
      }
    ]
  },
  {
    type: "flashcards",
    title: "IT-Berechnungen - IHK Prüfungswissen",
    cards: [
      { 
        front: "Speichergrößen umrechnen", 
        back: "**1 Byte = 8 Bit.** **Präfixe (Binär):** KiB=1024B, MiB=1024KiB, GiB=1024MiB, TiB=1024GiB. **Präfixe (Dezimal):** KB=1000B, MB=1000KB, GB=1000MB. **IHK-Achtung:** Hersteller nutzen oft dezimal, OS zeigt binär. **Beispiel:** 500GB Festplatte = ~465GiB im System." 
      },
      { 
        front: "Übertragungsraten berechnen", 
        back: "**Formel:** Zeit = Datenmenge / Übertragungsrate. **Einheiten:** bit/s (bps), Byte/s. **Umrechnung:** 100 Mbit/s = 12,5 MByte/s. **IHK-Beispiel:** 2GB bei 100 Mbit/s = 2×8×1024÷100 = ~164 Sekunden. **Praxis:** Overhead beachten (Protokoll-Header ca. 5-10%)." 
      },
      { 
        front: "RAID-Kapazitäten berechnen", 
        back: "**RAID 0 (Striping):** Nutzkapazität = n × Einzelkapazität. **RAID 1 (Mirroring):** Nutzkapazität = Einzelkapazität (50%). **RAID 5:** Nutzkapazität = (n-1) × Einzelkapazität. **RAID 6:** Nutzkapazität = (n-2) × Einzelkapazität. **IHK-Beispiel:** 4×2TB in RAID 5 = 6TB nutzbar." 
      },
      { 
        front: "Arbeitsspeicher (RAM) berechnen", 
        back: "**Adressraum:** 2^Adressbits = Anzahl Speicheradressen. **Beispiel:** 32-Bit = 2³² = 4.294.967.296 = 4GB max. **64-Bit:** Theoretisch 16 Exabyte. **IHK-Praxis:** Programm-Speicherbedarf, Paging, Swap. **Tipp:** Pro Prozess typisch 2-4GB bei 32-Bit." 
      },
      { 
        front: "Verfügbarkeit berechnen", 
        back: "**Formel:** Verfügbarkeit = (Gesamtzeit - Ausfallzeit) / Gesamtzeit × 100%. **Fünf Neunen:** 99,999% = max. 5,26 Minuten Ausfall/Jahr. **IHK-Beispiel:** 8760h - 8h Ausfall = 8752h ÷ 8760h = 99,91%. **SLA-Werte:** 99%=3,65d, 99,9%=8,76h, 99,99%=52min." 
      },
      { 
        front: "TCO (Total Cost of Ownership)", 
        back: "**Anschaffungskosten:** Hardware, Software, Installation. **Betriebskosten:** Strom, Wartung, Personal, Lizenzen. **Formel:** TCO = Anschaffung + (Jährliche Kosten × Jahre). **IHK-Beispiel:** Server 5000€ + 1000€/Jahr × 5 = 10.000€ TCO. **Vergleich:** Cloud vs. On-Premise TCO-Analyse." 
      },
      { 
        front: "Break-Even-Analyse", 
        back: "**Formel:** Break-Even = Fixkosten / (Erlös pro Einheit - Variable Kosten). **IHK-Beispiel:** Fixkosten 10.000€, Erlös 100€, Variable Kosten 60€ → 10.000/(100-60) = 250 Einheiten. **IT-Anwendung:** Ab wann lohnt sich eigener Server vs. Cloud?" 
      }
    ]
  },
  {
    type: "quiz",
    title: "IT-Berechnungen - Prüfungsfragen",
    questions: [
      {
        question: "Wie lange dauert der Download einer 800 MB Datei bei 100 Mbit/s (theoretisch)?",
        options: ["8 Sekunden", "64 Sekunden", "80 Sekunden", "800 Sekunden"],
        correctIndex: 1
      },
      {
        question: "Wie viel Speicher ist bei 4×4TB in RAID 5 nutzbar?",
        options: ["16 TB", "12 TB", "8 TB", "4 TB"],
        correctIndex: 1
      },
      {
        question: "Wie viel RAM kann ein 32-Bit-System maximal adressieren?",
        options: ["2 GB", "4 GB", "8 GB", "16 GB"],
        correctIndex: 1
      },
      {
        question: "Was bedeutet eine Verfügbarkeit von 99,9%?",
        options: ["Max. 52 Minuten Ausfall/Jahr", "Max. 8,76 Stunden Ausfall/Jahr", "Max. 3,65 Tage Ausfall/Jahr", "Max. 1 Stunde Ausfall/Monat"],
        correctIndex: 1
      },
      {
        question: "Wie viele Bytes sind 1 MiB?",
        options: ["1.000.000", "1.024.000", "1.048.576", "1.073.741.824"],
        correctIndex: 2
      },
      {
        question: "Welche RAID-Konfiguration bietet die höchste Nutzkapazität?",
        options: ["RAID 0", "RAID 1", "RAID 5", "RAID 6"],
        correctIndex: 0
      },
      {
        question: "Wie berechnet man die Datenübertragungszeit?",
        options: ["Datenmenge × Rate", "Datenmenge / Rate", "Rate / Datenmenge", "Rate × Zeit"],
        correctIndex: 1
      },
      {
        question: "Was gehört NICHT zu den TCO?",
        options: ["Anschaffungskosten", "Stromkosten", "Personalkosten", "Umsatzerlöse"],
        correctIndex: 3
      }
    ]
  },
  {
    type: "flashcards",
    title: "Netzwerk-Berechnungen",
    cards: [
      { 
        front: "Subnetz-Berechnung", 
        back: "**CIDR zu Hosts:** 2^(32-CIDR) - 2. **/24:** 256-2=254 Hosts. **/26:** 64-2=62 Hosts. **/30:** 4-2=2 Hosts (P2P). **Netz-Adresse:** IP AND Subnetzmaske. **Broadcast:** Netz-Adresse OR invertierte Maske. **IHK-Formel:** Anzahl Subnetze = 2^geliehene Bits." 
      },
      { 
        front: "IP-Adressklassen (historisch)", 
        back: "**Klasse A:** 1.0.0.0 - 126.x.x.x, /8, 16 Mio Hosts. **Klasse B:** 128.0.0.0 - 191.255.x.x, /16, 65.534 Hosts. **Klasse C:** 192.0.0.0 - 223.255.255.x, /24, 254 Hosts. **IHK-Hinweis:** CIDR hat Klassen weitgehend ersetzt, aber Prüfungswissen!" 
      },
      { 
        front: "Bandbreite vs. Durchsatz", 
        back: "**Bandbreite:** Theoretische Maximalkapazität der Leitung. **Durchsatz:** Tatsächlich erreichbare Datenrate. **Faktoren:** Protokoll-Overhead, Latenz, Paketverlust, Kongestion. **IHK-Beispiel:** 1 Gbit/s Leitung → ~940 Mbit/s effektiv (TCP-Overhead). **Messung:** iperf, Speedtest." 
      },
      { 
        front: "Latenz und RTT", 
        back: "**Latenz:** Verzögerung bei Datenübertragung. **RTT (Round Trip Time):** Hin- und Rückweg. **Messung:** ping-Befehl. **Faktoren:** Lichtgeschwindigkeit, Router-Verzögerung, Verarbeitung. **IHK-Beispiel:** 100km Glasfaser ≈ 0,5ms Latenz. **Auswirkung:** Kritisch für Echtzeitanwendungen." 
      }
    ]
  },
  {
    type: "quiz",
    title: "Netzwerk-Berechnungen - Quiz",
    questions: [
      {
        question: "Wie viele nutzbare Host-Adressen hat ein /28 Subnetz?",
        options: ["14", "16", "30", "32"],
        correctIndex: 0
      },
      {
        question: "Was ist die Netzadresse von 192.168.1.130/26?",
        options: ["192.168.1.0", "192.168.1.64", "192.168.1.128", "192.168.1.192"],
        correctIndex: 2
      },
      {
        question: "Welche Subnetzmaske entspricht /22?",
        options: ["255.255.248.0", "255.255.252.0", "255.255.254.0", "255.255.255.0"],
        correctIndex: 1
      },
      {
        question: "Was beeinflusst den Durchsatz NICHT?",
        options: ["Protokoll-Overhead", "Farbkodierung der Kabel", "Latenz", "Paketverlust"],
        correctIndex: 1
      },
      {
        question: "Für wie viele Hosts reicht ein /30 Subnetz?",
        options: ["2", "4", "6", "8"],
        correctIndex: 0
      }
    ]
  }
];
