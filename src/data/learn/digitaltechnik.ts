import type { LearnModule } from "@/types/learn";

export const digitaltechnikContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "Digitaltechnik Grundlagen - IHK Prüfungswissen",
    cards: [
      { 
        front: "Analog vs. Digital", 
        back: "**Analog:** Kontinuierliche Werte, stufenlos (z.B. Schallwellen, alte Telefone). **Digital:** Diskrete Werte, meist 0 und 1 (Computer, CDs). **Vorteile Digital:** Störungsresistent, exakte Kopien, einfache Verarbeitung. **Nachteile:** Quantisierungsfehler bei Umwandlung. **IHK-Wichtig:** A/D-Wandler für Digitalisierung." 
      },
      { 
        front: "Logische Grundgatter", 
        back: "**AND (∧):** Ausgang 1 nur wenn alle Eingänge 1. **OR (∨):** Ausgang 1 wenn mindestens ein Eingang 1. **NOT (¬):** Invertiert den Eingang. **NAND:** NOT-AND, Ausgang 0 nur wenn alle 1. **NOR:** NOT-OR. **XOR:** Ausgang 1 wenn Eingänge unterschiedlich. **IHK-Basis:** Alle Schaltungen aus diesen Gattern aufbaubar." 
      },
      { 
        front: "Wahrheitstabellen erstellen", 
        back: "**Methode:** Alle möglichen Eingangskombinationen auflisten. **n Eingänge:** 2^n Zeilen in der Tabelle. **Beispiel AND (2 Eingänge):** 00→0, 01→0, 10→0, 11→1. **IHK-Prüfung:** Tabelle aus Schaltung ableiten oder umgekehrt." 
      },
      { 
        front: "De Morgansche Gesetze", 
        back: "**Erstes Gesetz:** NOT(A AND B) = NOT A OR NOT B. **Zweites Gesetz:** NOT(A OR B) = NOT A AND NOT B. **Anwendung:** Schaltungsoptimierung, NAND/NOR-Logik. **IHK-Merkregel:** NOT über Klammer → Operation wechselt (AND↔OR) und alle invertieren." 
      },
      { 
        front: "Flip-Flops und Speicher", 
        back: "**SR-Flip-Flop:** Set/Reset, speichert 1 Bit. **D-Flip-Flop:** Daten-Flip-Flop, übernimmt Eingang bei Taktflanke. **JK-Flip-Flop:** Erweitertes SR, toggle bei J=K=1. **Register:** Mehrere Flip-Flops für Mehrbit-Speicher. **IHK-Wichtig:** Grundlage für RAM, CPU-Register." 
      },
      { 
        front: "Taktfrequenz und Taktzyklen", 
        back: "**Taktfrequenz:** Anzahl Zyklen pro Sekunde (Hz). **Beispiel:** 3 GHz = 3 Milliarden Zyklen/Sekunde. **Taktperiode:** T = 1/f, bei 3 GHz = 0,33 ns. **IHK-Bezug:** CPU-Geschwindigkeit, aber nicht einziger Performance-Faktor. **Mehr Takte ≠ immer schneller:** IPC (Instructions per Cycle) wichtig." 
      },
      { 
        front: "Multiplexer und Demultiplexer", 
        back: "**Multiplexer (MUX):** Wählt einen von mehreren Eingängen aus. **Demultiplexer (DEMUX):** Leitet Eingang an einen von mehreren Ausgängen. **Steuerleitungen:** n Leitungen → 2^n Kanäle. **IHK-Anwendung:** Datenübertragung, Adressierung, Signalweiterleitung." 
      },
      { 
        front: "Halb- und Volladdierer", 
        back: "**Halbaddierer:** Addiert 2 Bits → Summe + Carry. **Volladdierer:** Addiert 3 Bits (inkl. Carry-In). **Aufbau:** HA = XOR + AND. VA = 2 HA + OR. **IHK-Kette:** 8 VAs → 8-Bit-Addierer. **Carry-Ripple:** Carry wandert durch alle Stufen." 
      }
    ]
  },
  {
    type: "quiz",
    title: "Digitaltechnik Grundlagen Quiz",
    questions: [
      {
        question: "Welches Gatter gibt 1 aus, wenn alle Eingänge 1 sind?",
        options: ["OR", "AND", "XOR", "NOR"],
        correctIndex: 1
      },
      {
        question: "Was ist das Ergebnis von NOT(A AND B) nach De Morgan?",
        options: ["NOT A AND NOT B", "NOT A OR NOT B", "A AND B", "A OR B"],
        correctIndex: 1
      },
      {
        question: "Wie viele Zeilen hat eine Wahrheitstabelle mit 3 Eingängen?",
        options: ["3", "6", "8", "16"],
        correctIndex: 2
      },
      {
        question: "Welches Flip-Flop übernimmt den Eingang bei der Taktflanke?",
        options: ["SR-Flip-Flop", "D-Flip-Flop", "JK-Flip-Flop", "T-Flip-Flop"],
        correctIndex: 1
      },
      {
        question: "Was macht ein Multiplexer?",
        options: ["Verstärkt Signale", "Wählt einen von mehreren Eingängen", "Speichert Daten", "Wandelt analog zu digital"],
        correctIndex: 1
      },
      {
        question: "Wie viele Bits kann ein SR-Flip-Flop speichern?",
        options: ["1", "2", "4", "8"],
        correctIndex: 0
      },
      {
        question: "Was ist der Vorteil digitaler gegenüber analoger Signale?",
        options: ["Höhere Bandbreite", "Störungsresistenz und exakte Kopien", "Weniger Energieverbrauch", "Einfachere Hardware"],
        correctIndex: 1
      }
    ]
  },
  {
    type: "flashcards",
    title: "Schaltnetze und Schaltwerke",
    cards: [
      { 
        front: "Schaltnetz vs. Schaltwerk", 
        back: "**Schaltnetz:** Ausgang hängt nur von aktuellen Eingängen ab (kombinatorisch). **Schaltwerk:** Ausgang hängt von Eingängen UND Zustand ab (sequentiell). **Beispiel Schaltnetz:** Addierer, Multiplexer. **Beispiel Schaltwerk:** Zähler, Register, Automaten. **IHK-Merkmal:** Schaltwerk hat Speicherelemente." 
      },
      { 
        front: "Zustandsautomaten (FSM)", 
        back: "**Moore-Automat:** Ausgang hängt nur vom Zustand ab. **Mealy-Automat:** Ausgang hängt von Zustand UND Eingang ab. **Zustandsdiagramm:** Kreise (Zustände), Pfeile (Übergänge). **IHK-Anwendung:** Ampelsteuerung, Protokoll-Handler, Spiellogik." 
      },
      { 
        front: "Karnaugh-Diagramm (KV-Diagramm)", 
        back: "**Zweck:** Boolesche Funktionen minimieren. **Aufbau:** Gray-Code Anordnung, benachbarte Felder unterscheiden sich in 1 Bit. **Minimierung:** Möglichst große Gruppen aus 2^n Einsen bilden. **IHK-Vorteil:** Einfacher als algebraische Vereinfachung. **Grenzen:** Praktisch bis 4-5 Variablen." 
      },
      { 
        front: "Encoder und Decoder", 
        back: "**Encoder:** Wandelt 2^n Eingangsleitungen in n-Bit Code. **Priority Encoder:** Höchste aktive Leitung hat Priorität. **Decoder:** Wandelt n-Bit Code in 2^n Ausgangsleitungen. **IHK-Anwendung:** Adress-Decoder, BCD-zu-7-Segment, Speicher-Adressierung." 
      },
      { 
        front: "BCD-Code (Binary Coded Decimal)", 
        back: "**Definition:** Jede Dezimalziffer als 4-Bit Binär. **Beispiel:** 42 = 0100 0010 (nicht 101010!). **Vorteil:** Einfache Anzeige, keine Rundungsfehler. **Nachteil:** Weniger effizient als rein binär. **IHK-Verwendung:** Taschenrechner, Digitaluhren, Finanzanwendungen." 
      },
      { 
        front: "Zähler-Schaltungen", 
        back: "**Asynchroner Zähler:** Jedes FF vom vorherigen getaktet, Ripple-Effekt. **Synchroner Zähler:** Alle FFs gemeinsam getaktet, schneller. **Vorwärts/Rückwärts:** Up/Down Counter. **Modulo-n:** Zählt von 0 bis n-1, dann Reset. **IHK-Beispiel:** BCD-Zähler (Mod-10), Frequenzteiler." 
      }
    ]
  },
  {
    type: "quiz",
    title: "Schaltnetze und Schaltwerke Quiz",
    questions: [
      {
        question: "Was unterscheidet ein Schaltwerk von einem Schaltnetz?",
        options: ["Schaltwerk ist schneller", "Schaltwerk hat Speicherelemente", "Schaltnetz hat mehr Eingänge", "Schaltnetz ist digital"],
        correctIndex: 1
      },
      {
        question: "Bei welchem Automaten hängt der Ausgang nur vom Zustand ab?",
        options: ["Mealy-Automat", "Moore-Automat", "Turing-Automat", "Kellerautomat"],
        correctIndex: 1
      },
      {
        question: "Wofür dient ein Karnaugh-Diagramm?",
        options: ["Zeitverhalten darstellen", "Boolesche Funktionen minimieren", "Zustände speichern", "Signale verstärken"],
        correctIndex: 1
      },
      {
        question: "Was macht ein Decoder?",
        options: ["Wandelt n Bits in 2^n Leitungen", "Komprimiert Daten", "Verschlüsselt Signale", "Addiert Zahlen"],
        correctIndex: 0
      },
      {
        question: "Wie wird 59 im BCD-Code dargestellt?",
        options: ["111011", "0101 1001", "00111011", "59"],
        correctIndex: 1
      },
      {
        question: "Was ist der Vorteil eines synchronen Zählers?",
        options: ["Weniger Bauteile", "Kein Ripple-Effekt, schneller", "Einfacherer Aufbau", "Weniger Stromverbrauch"],
        correctIndex: 1
      }
    ]
  },
  {
    type: "flashcards",
    title: "Speichertechnologien",
    cards: [
      { 
        front: "RAM Typen (SRAM vs. DRAM)", 
        back: "**SRAM (Static RAM):** 6 Transistoren/Bit, schnell, teuer, kein Refresh. Verwendung: CPU-Cache. **DRAM (Dynamic RAM):** 1 Transistor + 1 Kondensator/Bit, langsamer, günstig, braucht Refresh. Verwendung: Hauptspeicher. **IHK-Merksatz:** SRAM=schnell&stabil, DRAM=dicht&dynamisch." 
      },
      { 
        front: "ROM und Flash-Speicher", 
        back: "**ROM:** Read Only, einmal programmiert (BIOS früher). **PROM:** Einmal programmierbar. **EPROM:** UV-Licht löschbar. **EEPROM:** Elektrisch löschbar, Byte-weise. **Flash:** EEPROM-Variante, Block-weise, SSDs, USB-Sticks. **IHK-Wichtig:** Flash verdrängt HDDs zunehmend." 
      },
      { 
        front: "Speicherhierarchie", 
        back: "**Register:** Schnellste, im CPU, wenige Bytes. **L1/L2/L3 Cache:** SRAM, KB bis MB, ns-Zugriff. **RAM:** DRAM, GB, 10-100ns. **SSD:** Flash, TB, 0,1ms. **HDD:** Magnetisch, TB, 5-10ms. **IHK-Prinzip:** Je schneller, desto teurer und kleiner." 
      },
      { 
        front: "Speicheradressierung", 
        back: "**Byte-Adressierung:** Jedes Byte hat eigene Adresse. **Wortbreite:** 32-Bit oder 64-Bit Zugriffe. **Adressraum:** 2^n Adressen bei n Adressbits. **IHK-Beispiel:** 32-Bit Adressbus = 4GB adressierbar. **Alignment:** Daten an Wortgrenzen ausrichten für Performance." 
      },
      { 
        front: "Error Detection & Correction", 
        back: "**Parity Bit:** 1 Bit extra, erkennt 1-Bit-Fehler. **ECC (Error Correcting Code):** Erkennt 2-Bit, korrigiert 1-Bit Fehler. **Hamming-Code:** Systematische Fehlerkorrektur. **IHK-Einsatz:** Server-RAM verwendet ECC für Zuverlässigkeit." 
      }
    ]
  },
  {
    type: "quiz",
    title: "Speichertechnologien Quiz",
    questions: [
      {
        question: "Welcher RAM-Typ wird für CPU-Cache verwendet?",
        options: ["DRAM", "SRAM", "Flash", "EEPROM"],
        correctIndex: 1
      },
      {
        question: "Warum braucht DRAM einen Refresh?",
        options: ["Weil Transistoren altern", "Weil Kondensatoren sich entladen", "Weil Daten veralten", "Weil die Taktfrequenz sinkt"],
        correctIndex: 1
      },
      {
        question: "Welche Speichertechnologie steckt in SSDs?",
        options: ["DRAM", "SRAM", "Flash", "ROM"],
        correctIndex: 2
      },
      {
        question: "Was ist in der Speicherhierarchie am schnellsten?",
        options: ["RAM", "SSD", "CPU-Register", "L3-Cache"],
        correctIndex: 2
      },
      {
        question: "Was kann ECC-RAM?",
        options: ["Schneller sein", "1-Bit Fehler korrigieren", "Mehr Daten speichern", "Ohne Strom speichern"],
        correctIndex: 1
      },
      {
        question: "Wie viel Speicher kann ein 32-Bit Adressbus maximal adressieren?",
        options: ["2 GB", "4 GB", "8 GB", "16 GB"],
        correctIndex: 1
      }
    ]
  }
];
