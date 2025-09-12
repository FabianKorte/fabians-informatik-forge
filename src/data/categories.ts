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
  Brain
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
    id: "programmierung",
    title: "Programmierung",
    description: "Grundlagen der Softwareentwicklung, Algorithmen und Datenstrukturen",
    totalElements: 120,
    completedElements: 15,
    icon: Code2,
    difficulty: "Fortgeschritten",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: "datenbanken",
    title: "Datenbanken",
    description: "SQL, Datenbankdesign, Normalisierung und Datenbankmanagement",
    totalElements: 85,
    completedElements: 32,
    icon: Database,
    difficulty: "Fortgeschritten",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    id: "it-sicherheit",
    title: "IT-Sicherheit",
    description: "Cybersecurity, Verschlüsselung, Firewalls und Sicherheitskonzepte",
    totalElements: 95,
    completedElements: 8,
    icon: Shield,
    difficulty: "Experte",
    gradient: "from-red-500 to-rose-600"
  },
  {
    id: "netzwerktechnik",
    title: "Netzwerktechnik",
    description: "TCP/IP, Routing, Switching und Netzwerkprotokolle",
    totalElements: 110,
    completedElements: 45,
    icon: Network,
    difficulty: "Fortgeschritten",
    gradient: "from-purple-500 to-violet-600"
  },
  {
    id: "systemadministration",
    title: "Systemadministration",
    description: "Server-Management, Betriebssysteme und Systemwartung",
    totalElements: 100,
    completedElements: 22,
    icon: Server,
    difficulty: "Experte",
    gradient: "from-orange-500 to-amber-600"
  },
  {
    id: "mobile-entwicklung",
    title: "Mobile Entwicklung",
    description: "App-Entwicklung für iOS und Android, mobile Technologien",
    totalElements: 75,
    completedElements: 5,
    icon: Smartphone,
    difficulty: "Fortgeschritten",
    gradient: "from-pink-500 to-rose-600"
  },
  {
    id: "web-technologien",
    title: "Web-Technologien",
    description: "HTML, CSS, JavaScript, Frameworks und Web-Standards",
    totalElements: 130,
    completedElements: 67,
    icon: Globe,
    difficulty: "Anfänger",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: "projektmanagement",
    title: "Projektmanagement",
    description: "Agile Methoden, Scrum, Kanban und Projektplanung",
    totalElements: 60,
    completedElements: 18,
    icon: Settings,
    difficulty: "Anfänger",
    gradient: "from-slate-500 to-gray-600"
  },
  {
    id: "grundlagen-it",
    title: "IT-Grundlagen",
    description: "Hardware, Software, Digitaltechnik und Computer-Basics",
    totalElements: 80,
    completedElements: 55,
    icon: BookOpen,
    difficulty: "Anfänger",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    id: "kommunikation",
    title: "Kommunikation & Teamwork",
    description: "Soft Skills, Präsentationstechniken und Teamarbeit",
    totalElements: 45,
    completedElements: 12,
    icon: Users,
    difficulty: "Anfänger",
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    id: "rechtliche-grundlagen",
    title: "Rechtliche Grundlagen",
    description: "Datenschutz, Urheberrecht und IT-Recht",
    totalElements: 55,
    completedElements: 25,
    icon: FileText,
    difficulty: "Anfänger",
    gradient: "from-indigo-500 to-purple-600"
  },
  {
    id: "pruefungsvorbereitung",
    title: "Prüfungsvorbereitung",
    description: "Abschlussprüfung, Prüfungsstrategien und Mock-Tests",
    totalElements: 90,
    completedElements: 3,
    icon: Brain,
    difficulty: "Experte",
    gradient: "from-teal-500 to-cyan-600"
  }
];