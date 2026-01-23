import {
  Code2,
  Database,
  Shield,
  Network,
  Server,
  Smartphone,
  Globe,
  Settings,
  BookOpen,
  Users,
  FileText,
  Brain,
  BarChart3,
  Scale,
  Lock,
  Cable,
  Braces,
  Coffee,
  Table2,
  Calculator,
  Cloud,
  Cpu,
  HardDrive,
  Presentation,
  FileType,
  Building2,
  GraduationCap
} from "lucide-react";

export interface Category {
  id: string;
  title: string;
  description: string;
  totalElements: number;
  completedElements: number;
  icon: any;
  difficulty: "Anfänger" | "Fortgeschritten" | "Experte";
  gradient: string;
  group?: "grundlagen" | "programmierung" | "infrastruktur" | "business" | "pruefung" | "spezial";
}

// ============================================================
// KATEGORIEN - LOGISCH GRUPPIERT
// ============================================================

export const categories: Category[] = [
  // ==========================================
  // 🎓 PRÜFUNGSVORBEREITUNG (Oben, prominent)
  // ==========================================
  {
    id: "ihk-pruefung",
    title: "IHK-Prüfungssimulator",
    description: "Realistische Prüfungssimulationen für AP Teil 1 & 2 mit Timer, Punktebewertung und Auswertung",
    totalElements: 100,
    completedElements: 0,
    icon: GraduationCap,
    difficulty: "Experte",
    gradient: "from-yellow-500 to-amber-600",
    group: "pruefung"
  },
  {
    id: "zufallstraining",
    title: "Zufallstraining",
    description: "Gemischte Aufgaben aus allen Kategorien - perfekt zur Prüfungsvorbereitung",
    totalElements: 500,
    completedElements: 0,
    icon: Brain,
    difficulty: "Fortgeschritten",
    gradient: "from-violet-500 to-fuchsia-600",
    group: "pruefung"
  },

  // ==========================================
  // 📚 IT-GRUNDLAGEN
  // ==========================================
  {
    id: "grundlagen-it",
    title: "IT-Grundlagen",
    description: "Hardware, Software, Digitaltechnik und Computer-Basics",
    totalElements: 80,
    completedElements: 0,
    icon: BookOpen,
    difficulty: "Anfänger",
    gradient: "from-green-500 to-emerald-600",
    group: "grundlagen"
  },
  {
    id: "digitaltechnik",
    title: "Digitaltechnik",
    description: "Logikgatter, Schaltungen, Flip-Flops und Speichertechnologien",
    totalElements: 65,
    completedElements: 0,
    icon: Cpu,
    difficulty: "Fortgeschritten",
    gradient: "from-purple-500 to-indigo-600",
    group: "grundlagen"
  },
  {
    id: "fachrechnen",
    title: "Fachrechnen & Mathematik",
    description: "Zahlensysteme, IT-Berechnungen, Subnetting und technische Mathematik",
    totalElements: 70,
    completedElements: 0,
    icon: Calculator,
    difficulty: "Fortgeschritten",
    gradient: "from-blue-500 to-cyan-600",
    group: "grundlagen"
  },

  // ==========================================
  // 💻 PROGRAMMIERUNG & ENTWICKLUNG
  // ==========================================
  {
    id: "java",
    title: "Java Programmierung",
    description: "Von Hello World bis OOP, Collections und Streams - interaktiver Java-Kurs",
    totalElements: 200,
    completedElements: 0,
    icon: Coffee,
    difficulty: "Anfänger",
    gradient: "from-orange-500 to-red-600",
    group: "programmierung"
  },
  {
    id: "programmierung",
    title: "Programmierung allgemein",
    description: "Überblick über Programmiersprachen - wähle Java, Web oder andere Sprachen",
    totalElements: 0,
    completedElements: 0,
    icon: Code2,
    difficulty: "Fortgeschritten",
    gradient: "from-blue-500 to-indigo-600",
    group: "programmierung"
  },
  {
    id: "web-technologien",
    title: "Web-Technologien",
    description: "HTML, CSS, JavaScript, Frameworks und Web-Standards",
    totalElements: 130,
    completedElements: 0,
    icon: Globe,
    difficulty: "Anfänger",
    gradient: "from-cyan-500 to-blue-600",
    group: "programmierung"
  },
  {
    id: "mobile-entwicklung",
    title: "Mobile Entwicklung",
    description: "App-Entwicklung für iOS und Android, mobile Technologien",
    totalElements: 75,
    completedElements: 0,
    icon: Smartphone,
    difficulty: "Fortgeschritten",
    gradient: "from-pink-500 to-rose-600",
    group: "programmierung"
  },
  {
    id: "datenbanken",
    title: "Datenbanken & SQL",
    description: "SQL, Datenbankdesign, Normalisierung und Datenbankmanagement",
    totalElements: 85,
    completedElements: 0,
    icon: Database,
    difficulty: "Fortgeschritten",
    gradient: "from-emerald-500 to-teal-600",
    group: "programmierung"
  },
  {
    id: "fachmodul-anwendungsentwicklung",
    title: "Fachmodul Anwendungsentwicklung",
    description: "OOP, Entwurfsmuster, Testing und Clean Code",
    totalElements: 120,
    completedElements: 0,
    icon: Braces,
    difficulty: "Experte",
    gradient: "from-fuchsia-500 to-purple-600",
    group: "programmierung"
  },

  // ==========================================
  // 🖥️ INFRASTRUKTUR & NETZWERK
  // ==========================================
  {
    id: "netzwerktechnik",
    title: "Netzwerktechnik",
    description: "TCP/IP, Routing, Switching und Netzwerkprotokolle",
    totalElements: 110,
    completedElements: 0,
    icon: Network,
    difficulty: "Fortgeschritten",
    gradient: "from-purple-500 to-violet-600",
    group: "infrastruktur"
  },
  {
    id: "systemadministration",
    title: "Systemadministration",
    description: "Server-Management, Betriebssysteme und Systemwartung",
    totalElements: 100,
    completedElements: 0,
    icon: Server,
    difficulty: "Experte",
    gradient: "from-orange-500 to-amber-600",
    group: "infrastruktur"
  },
  {
    id: "speicherloesungen",
    title: "Speicherlösungen",
    description: "DAS, NAS, SAN, RAID, Backup-Strategien und Archivierung",
    totalElements: 70,
    completedElements: 0,
    icon: HardDrive,
    difficulty: "Fortgeschritten",
    gradient: "from-slate-500 to-zinc-600",
    group: "infrastruktur"
  },
  {
    id: "cloud-aws",
    title: "Cloud-Computing (AWS)",
    description: "AWS-Services, Cloud-Konzepte und Vorbereitung auf AWS CLF-C02",
    totalElements: 80,
    completedElements: 0,
    icon: Cloud,
    difficulty: "Fortgeschritten",
    gradient: "from-orange-500 to-amber-600",
    group: "infrastruktur"
  },
  {
    id: "fachmodul-systemintegration",
    title: "Fachmodul Systemintegration",
    description: "Netzwerke, Server, Virtualisierung und IT-Betrieb",
    totalElements: 120,
    completedElements: 0,
    icon: Cable,
    difficulty: "Experte",
    gradient: "from-sky-500 to-blue-600",
    group: "infrastruktur"
  },

  // ==========================================
  // 🔒 SICHERHEIT & DATENSCHUTZ
  // ==========================================
  {
    id: "it-sicherheit",
    title: "IT-Sicherheit",
    description: "Cybersecurity, Verschlüsselung, Firewalls und Sicherheitskonzepte",
    totalElements: 95,
    completedElements: 0,
    icon: Shield,
    difficulty: "Experte",
    gradient: "from-red-500 to-rose-600",
    group: "infrastruktur"
  },
  {
    id: "datenschutz",
    title: "Datenschutz (DSGVO)",
    description: "DSGVO, TOMs, Verzeichnisse und Betroffenenrechte",
    totalElements: 75,
    completedElements: 0,
    icon: Lock,
    difficulty: "Fortgeschritten",
    gradient: "from-teal-500 to-emerald-600",
    group: "infrastruktur"
  },

  // ==========================================
  // 📊 BUSINESS & MANAGEMENT
  // ==========================================
  {
    id: "projektmanagement",
    title: "Projektmanagement",
    description: "Agile Methoden, Scrum, Kanban und Projektplanung",
    totalElements: 60,
    completedElements: 0,
    icon: Settings,
    difficulty: "Anfänger",
    gradient: "from-slate-500 to-gray-600",
    group: "business"
  },
  {
    id: "qualitaetsmanagement",
    title: "Qualitätsmanagement",
    description: "ISO 9001, PDCA, Lean Management, Six Sigma und Qualitätssicherung",
    totalElements: 50,
    completedElements: 0,
    icon: Settings,
    difficulty: "Fortgeschritten",
    gradient: "from-teal-500 to-cyan-600",
    group: "business"
  },
  {
    id: "bwl",
    title: "Betriebswirtschaft (BWL)",
    description: "Kostenrechnung, Bilanz, Kennzahlen und Investitionen",
    totalElements: 70,
    completedElements: 0,
    icon: BarChart3,
    difficulty: "Fortgeschritten",
    gradient: "from-amber-500 to-yellow-600",
    group: "business"
  },
  {
    id: "wiso",
    title: "Wirtschafts- und Sozialkunde",
    description: "Arbeitsrecht, Wirtschaft, Soziales und Tarifverträge",
    totalElements: 80,
    completedElements: 0,
    icon: Scale,
    difficulty: "Anfänger",
    gradient: "from-lime-500 to-green-600",
    group: "business"
  },
  {
    id: "rechtliche-grundlagen",
    title: "Rechtliche Grundlagen",
    description: "Datenschutz, Urheberrecht und IT-Recht",
    totalElements: 55,
    completedElements: 0,
    icon: FileText,
    difficulty: "Anfänger",
    gradient: "from-indigo-500 to-purple-600",
    group: "business"
  },
  {
    id: "sap-erp",
    title: "SAP/ERP Grundlagen",
    description: "SAP-Navigation, Module (FI, CO, MM, SD) und Geschäftsprozesse",
    totalElements: 90,
    completedElements: 0,
    icon: Building2,
    difficulty: "Fortgeschritten",
    gradient: "from-blue-600 to-cyan-600",
    group: "business"
  },
  {
    id: "kommunikation",
    title: "Kommunikation & Soft Skills",
    description: "Präsentationstechniken, Teamarbeit und Kundenkommunikation",
    totalElements: 45,
    completedElements: 0,
    icon: Users,
    difficulty: "Anfänger",
    gradient: "from-yellow-500 to-orange-600",
    group: "business"
  },

  // ==========================================
  // 🛠️ OFFICE & WERKZEUGE
  // ==========================================
  {
    id: "tabellenkalkulation",
    title: "Tabellenkalkulation (Excel)",
    description: "Formeln, Pivot-Tabellen, Diagramme und Datenanalyse",
    totalElements: 60,
    completedElements: 0,
    icon: Table2,
    difficulty: "Anfänger",
    gradient: "from-green-500 to-emerald-600",
    group: "spezial"
  },
  {
    id: "praesentationsprogramme",
    title: "Präsentationen (PowerPoint)",
    description: "Foliengestaltung, Animationen und Vortragstechniken",
    totalElements: 70,
    completedElements: 0,
    icon: Presentation,
    difficulty: "Anfänger",
    gradient: "from-orange-500 to-red-600",
    group: "spezial"
  },
  {
    id: "textverarbeitung",
    title: "Textverarbeitung (Word)",
    description: "Dokumentformatierung, Seitengestaltung und professionelle Texte",
    totalElements: 80,
    completedElements: 0,
    icon: FileType,
    difficulty: "Anfänger",
    gradient: "from-blue-500 to-indigo-600",
    group: "spezial"
  },

  // ==========================================
  // 🌐 WEITERE THEMEN
  // ==========================================
  {
    id: "englisch-it",
    title: "Englisch für IT-Berufe",
    description: "Fachbegriffe, Kommunikation und Dokumentation auf Englisch",
    totalElements: 60,
    completedElements: 0,
    icon: Globe,
    difficulty: "Anfänger",
    gradient: "from-red-500 to-pink-600",
    group: "spezial"
  },
  {
    id: "mathematik-logik",
    title: "Mathematik & Logik",
    description: "Logische Operatoren, Boolesche Algebra und mathematische Grundlagen",
    totalElements: 55,
    completedElements: 0,
    icon: Calculator,
    difficulty: "Fortgeschritten",
    gradient: "from-violet-500 to-purple-600",
    group: "grundlagen"
  },
  {
    id: "innovation-trends",
    title: "Innovation & Trends",
    description: "KI, Machine Learning, IoT und aktuelle Technologie-Trends",
    totalElements: 50,
    completedElements: 0,
    icon: Brain,
    difficulty: "Fortgeschritten",
    gradient: "from-cyan-500 to-teal-600",
    group: "spezial"
  }
];

// Kategorie-Gruppen für strukturierte Anzeige
export const categoryGroups = {
  pruefung: { title: "🎓 Prüfungsvorbereitung", order: 1 },
  grundlagen: { title: "📚 IT-Grundlagen", order: 2 },
  programmierung: { title: "💻 Programmierung & Entwicklung", order: 3 },
  infrastruktur: { title: "🖥️ Infrastruktur & Sicherheit", order: 4 },
  business: { title: "📊 Business & Management", order: 5 },
  spezial: { title: "🛠️ Office & Werkzeuge", order: 6 }
};
