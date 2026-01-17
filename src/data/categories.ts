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
  Cpu
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
}

export const categories: Category[] = [
  {
    id: "java",
    title: "Java Programmierung",
    description: "Lerne Java von Grund auf: Von Hello World bis zu fortgeschrittenen Konzepten wie OOP, Collections und Streams",
    totalElements: 200,
    completedElements: 0,
    icon: Coffee,
    difficulty: "Anfänger",
    gradient: "from-orange-500 to-red-600"
  },
  {
    id: "programmierung",
    title: "Programmierung",
    description: "Grundlagen der Softwareentwicklung, Algorithmen und Datenstrukturen",
    totalElements: 120,
    completedElements: 0,
    icon: Code2,
    difficulty: "Fortgeschritten",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: "datenbanken",
    title: "Datenbanken",
    description: "SQL, Datenbankdesign, Normalisierung und Datenbankmanagement",
    totalElements: 85,
    completedElements: 0,
    icon: Database,
    difficulty: "Fortgeschritten",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    id: "it-sicherheit",
    title: "IT-Sicherheit",
    description: "Cybersecurity, Verschlüsselung, Firewalls und Sicherheitskonzepte",
    totalElements: 95,
    completedElements: 0,
    icon: Shield,
    difficulty: "Experte",
    gradient: "from-red-500 to-rose-600"
  },
  {
    id: "netzwerktechnik",
    title: "Netzwerktechnik",
    description: "TCP/IP, Routing, Switching und Netzwerkprotokolle",
    totalElements: 110,
    completedElements: 0,
    icon: Network,
    difficulty: "Fortgeschritten",
    gradient: "from-purple-500 to-violet-600"
  },
  {
    id: "systemadministration",
    title: "Systemadministration",
    description: "Server-Management, Betriebssysteme und Systemwartung",
    totalElements: 100,
    completedElements: 0,
    icon: Server,
    difficulty: "Experte",
    gradient: "from-orange-500 to-amber-600"
  },
  {
    id: "mobile-entwicklung",
    title: "Mobile Entwicklung",
    description: "App-Entwicklung für iOS und Android, mobile Technologien",
    totalElements: 75,
    completedElements: 0,
    icon: Smartphone,
    difficulty: "Fortgeschritten",
    gradient: "from-pink-500 to-rose-600"
  },
  {
    id: "web-technologien",
    title: "Web-Technologien",
    description: "HTML, CSS, JavaScript, Frameworks und Web-Standards",
    totalElements: 130,
    completedElements: 0,
    icon: Globe,
    difficulty: "Anfänger",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: "projektmanagement",
    title: "Projektmanagement",
    description: "Agile Methoden, Scrum, Kanban und Projektplanung",
    totalElements: 60,
    completedElements: 0,
    icon: Settings,
    difficulty: "Anfänger",
    gradient: "from-slate-500 to-gray-600"
  },
  {
    id: "grundlagen-it",
    title: "IT-Grundlagen",
    description: "Hardware, Software, Digitaltechnik und Computer-Basics",
    totalElements: 80,
    completedElements: 0,
    icon: BookOpen,
    difficulty: "Anfänger",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    id: "kommunikation",
    title: "Kommunikation & Teamwork",
    description: "Soft Skills, Präsentationstechniken und Teamarbeit",
    totalElements: 45,
    completedElements: 0,
    icon: Users,
    difficulty: "Anfänger",
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    id: "rechtliche-grundlagen",
    title: "Rechtliche Grundlagen",
    description: "Datenschutz, Urheberrecht und IT-Recht",
    totalElements: 55,
    completedElements: 0,
    icon: FileText,
    difficulty: "Anfänger",
    gradient: "from-indigo-500 to-purple-600"
  },
  {
    id: "bwl",
    title: "BWL",
    description: "Kostenrechnung, Bilanz, Kennzahlen und Investitionen",
    totalElements: 70,
    completedElements: 0,
    icon: BarChart3,
    difficulty: "Fortgeschritten",
    gradient: "from-amber-500 to-yellow-600"
  },
  {
    id: "wiso",
    title: "Wirtschafts- und Sozialkunde (WiSo)",
    description: "Arbeitsrecht, Wirtschaft, Soziales und Tarifverträge",
    totalElements: 80,
    completedElements: 0,
    icon: Scale,
    difficulty: "Anfänger",
    gradient: "from-lime-500 to-green-600"
  },
  {
    id: "datenschutz",
    title: "Datenschutz",
    description: "DSGVO, TOMs, Verzeichnisse und Betroffenenrechte",
    totalElements: 75,
    completedElements: 0,
    icon: Lock,
    difficulty: "Fortgeschritten",
    gradient: "from-teal-500 to-emerald-600"
  },
  {
    id: "fachmodul-systemintegration",
    title: "Fachmodul Systemintegration",
    description: "Netzwerke, Server, Virtualisierung und IT-Betrieb",
    totalElements: 120,
    completedElements: 0,
    icon: Cable,
    difficulty: "Experte",
    gradient: "from-sky-500 to-blue-600"
  },
  {
    id: "fachmodul-anwendungsentwicklung",
    title: "Fachmodul Anwendungsentwicklung",
    description: "OOP, Entwurfsmuster, Testing und Clean Code",
    totalElements: 120,
    completedElements: 0,
    icon: Braces,
    difficulty: "Experte",
    gradient: "from-fuchsia-500 to-purple-600"
  },
  {
    id: "zufallstraining",
    title: "Zufallstraining",
    description: "Alle Aufgaben aus allen Kategorien - Perfekt zur Prüfungsvorbereitung",
    totalElements: 500,
    completedElements: 0,
    icon: Brain,
    difficulty: "Fortgeschritten",
    gradient: "from-violet-500 to-fuchsia-600"
  },
  {
    id: "tabellenkalkulation",
    title: "Tabellenkalkulation (Excel)",
    description: "Excel-Formeln, Pivot-Tabellen, Diagramme und Datenanalyse für die IHK-Prüfung",
    totalElements: 60,
    completedElements: 0,
    icon: Table2,
    difficulty: "Anfänger",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    id: "fachrechnen",
    title: "Fachbezogenes Rechnen",
    description: "Zahlensysteme, IT-Berechnungen, Subnetting und technische Mathematik",
    totalElements: 70,
    completedElements: 0,
    icon: Calculator,
    difficulty: "Fortgeschritten",
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    id: "cloud-aws",
    title: "Cloud-Computing (AWS)",
    description: "AWS-Services, Cloud-Konzepte und Vorbereitung auf AWS CLF-C02 Zertifizierung",
    totalElements: 80,
    completedElements: 0,
    icon: Cloud,
    difficulty: "Fortgeschritten",
    gradient: "from-orange-500 to-amber-600"
  },
  {
    id: "digitaltechnik",
    title: "Digitaltechnik",
    description: "Logikgatter, Schaltungen, Flip-Flops und Speichertechnologien",
    totalElements: 65,
    completedElements: 0,
    icon: Cpu,
    difficulty: "Fortgeschritten",
    gradient: "from-purple-500 to-indigo-600"
  }
];