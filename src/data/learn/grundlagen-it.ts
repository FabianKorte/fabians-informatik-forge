import { LearnModule } from "../../types/learn";

export const grundlagenItContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "IT-Grundlagen - Hardware Fundamentals",
    cards: [
      { front: "CPU-Architekturen", back: "**CISC (Complex Instruction Set):** x86/x64, viele komplexe Befehle, variable Befehlslängen. **RISC (Reduced Instruction Set):** ARM, einfache Befehle, feste Längen, Pipeline-optimiert. **Unterschiede:** CISC mehr Transistoren pro Befehl, RISC effizienter bei Parallelisierung. **IHK-Beispiele:** Intel/AMD (CISC), ARM/MIPS (RISC). **Moderne Trends:** ARM in Smartphones, x64 in Servern/PCs." },
      { front: "Speichertypen & Hierarchie", back: "**Flüchtig:** RAM (SRAM/DRAM), Cache - Daten gehen bei Stromausfall verloren. **Nicht-flüchtig:** ROM, Flash (SSD), Magnetisch (HDD). **Cache-Ebenen:** L1 (32KB, 1 Zyklus) → L2 (256KB, 3-10 Zyklen) → L3 (8MB, 15-50 Zyklen). **IHK-Prinzipien:** Lokalität ausnutzen, Preis-Performance-Pyramide, Memory Wall Problem. **Neue Technologien:** NVMe, 3D-NAND, Intel Optane." },
      { front: "Betriebssystem-Kernfunktionen", back: "**Process Management:** Scheduling (Round-Robin, Priority), Context Switching, IPC. **Memory Management:** Virtual Memory, Paging, Segmentierung, MMU. **File System:** FAT32, NTFS, ext4 - Metadata, Journaling, Permissions. **Device Management:** Treiber, Interrupts, DMA. **IHK-Sicherheit:** User/Kernel Mode, Systemcalls, Sandboxing. **Multi-Core:** SMP, Cache-Kohärenz, Load Balancing." },
      { front: "Netzwerk-Hardware", back: "**Hub (Layer 1):** Alle Ports teilen eine Collision Domain, Half-Duplex. **Switch (Layer 2):** Separate Collision Domains, MAC-Tabelle, Full-Duplex. **Router (Layer 3):** IP-Routing zwischen Subnetzen, NAT, Firewall. **Access Point:** WLAN-Bridge, SSID-Broadcasting, WPA3-Encryption. **IHK-Unterschiede:** Collision vs. Broadcast Domain, Managed vs. Unmanaged, PoE-Support." },
      { front: "Storage-Systeme", back: "**RAID-Level:** RAID 0 (Striping, Performance), RAID 1 (Mirroring, Redundanz), RAID 5 (Parity, n+1 Ausfallsicherheit), RAID 10 (1+0, Performance + Redundanz). **Interface:** SATA (6Gbps), NVMe (32Gbps), SAS (12Gbps). **IHK-Metriken:** IOPS, Throughput, Latenz, MTBF. **Backup:** 3-2-1 Regel, Hot/Cold Standby, Snapshot-Technologien." },
      { front: "Virtualisierung-Grundlagen", back: "**Hypervisor Typ 1:** Bare-Metal (VMware ESXi, Hyper-V), direkte Hardware-Kontrolle. **Typ 2:** Hosted (VirtualBox, VMware Workstation), läuft auf OS. **Container:** Docker/LXC - OS-Level Virtualisierung, geteilter Kernel. **Hardware-Unterstützung:** Intel VT-x, AMD-V für CPU-Virtualisierung. **IHK-Vorteile:** Server-Konsolidierung, Isolation, Disaster Recovery, Test-Umgebungen." }
    ]
  },
  {
    type: "quiz",
    title: "Hardware & Betriebssysteme Quiz",
    questions: [
      {
        question: "Was ist der Hauptunterschied zwischen CISC und RISC Architekturen?",
        options: ["RISC ist langsamer", "CISC hat komplexere Befehle", "RISC verbraucht mehr Strom", "CISC ist mobiler"],
        correctIndex: 1,
        explanation: "CISC (Complex Instruction Set Computer) hat komplexere Befehle, die mehr in Hardware implementiert sind, während RISC (Reduced Instruction Set Computer) einfachere Befehle verwendet."
      },
      {
        question: "Welche Aussage über Cache-Hierarchie ist korrekt?",
        options: ["L3 ist schneller als L1", "L1 hat die größte Kapazität", "L1 ist am schnellsten und kleinsten", "Cache ist irrelevant für Performance"],
        correctIndex: 2,
        explanation: "L1-Cache ist am schnellsten (1 CPU-Zyklus) und kleinsten (meist 32KB), während L3 langsamer aber größer ist (mehrere MB)."
      },
      {
        question: "Was bietet RAID 5?",
        options: ["Nur Performance-Verbesserung", "Parity-basierte Redundanz mit einem Disk-Ausfall", "Komplett Mirroring", "Keine Fehlertoleranz"],
        correctIndex: 1,
        explanation: "RAID 5 verwendet Parity-Informationen verteilt auf alle Disks und kann den Ausfall einer Disk verkraften bei guter Performance."
      },
      {
        question: "Welcher Unterschied besteht zwischen Hub und Switch?",
        options: ["Hub arbeitet auf Layer 3", "Switch teilt eine Collision Domain", "Hub ermöglicht Full-Duplex", "Switch hat separate Collision Domains pro Port"],
        correctIndex: 3,
        explanation: "Ein Switch erstellt für jeden Port eine separate Collision Domain und ermöglicht Full-Duplex-Kommunikation, während ein Hub alle Ports in einer Collision Domain hat."
      }
    ]
  },
  {
    type: "matching",
    title: "Hardware-Komponenten zuordnen",
    pairs: [
      { left: "CPU", right: "Führt Berechnungen und Steuerung aus" },
      { left: "RAM", right: "Flüchtiger Arbeitsspeicher" },
      { left: "SSD", right: "Nicht-flüchtiger Flash-Speicher" },
      { left: "GPU", right: "Grafikverarbeitung und Parallelcomputing" },
      { left: "Mainboard", right: "Verbindet alle Komponenten" },
      { left: "PSU", right: "Stromversorgung des Systems" }
    ]
  },
  {
    type: "dragdrop",
    title: "Speicher-Hierarchie ordnen",
    games: [
      {
        title: "Von schnell zu langsam sortieren",
        description: "Ordne die Speichertypen nach Geschwindigkeit (schnellste zuerst)",
        categories: ["Sehr schnell", "Schnell", "Mittel", "Langsam"],
        items: [
          { id: "reg", content: "CPU-Register", category: "Sehr schnell" },
          { id: "l1", content: "L1-Cache", category: "Sehr schnell" },
          { id: "l2", content: "L2-Cache", category: "Schnell" },
          { id: "ram", content: "RAM", category: "Mittel" },
          { id: "ssd", content: "SSD", category: "Langsam" },
          { id: "hdd", content: "HDD", category: "Langsam" }
        ]
      }
    ]
  }
];