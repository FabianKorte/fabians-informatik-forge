// OSI Model Interactive Learning Types

export interface OSILayer {
  number: number;
  name: string;
  germanName: string;
  description: string;
  examples: string[];
  color: string;
}

export const OSI_LAYERS: OSILayer[] = [
  {
    number: 7,
    name: "Application",
    germanName: "Anwendungsschicht",
    description: "Schnittstelle für Benutzeranwendungen. Hier interagieren Programme direkt mit dem Netzwerk.",
    examples: ["HTTP", "HTTPS", "FTP", "SMTP", "DNS", "SSH", "Telnet"],
    color: "from-red-500 to-rose-600"
  },
  {
    number: 6,
    name: "Presentation",
    germanName: "Darstellungsschicht",
    description: "Datenformatierung, Verschlüsselung und Komprimierung. Übersetzt Daten in ein verständliches Format.",
    examples: ["SSL/TLS", "JPEG", "GIF", "ASCII", "MPEG", "Verschlüsselung"],
    color: "from-orange-500 to-amber-600"
  },
  {
    number: 5,
    name: "Session",
    germanName: "Sitzungsschicht",
    description: "Verwaltet Verbindungen zwischen Anwendungen. Startet, steuert und beendet Sitzungen.",
    examples: ["NetBIOS", "RPC", "SQL Sessions", "NFS", "SMB"],
    color: "from-yellow-500 to-orange-500"
  },
  {
    number: 4,
    name: "Transport",
    germanName: "Transportschicht",
    description: "Ende-zu-Ende-Verbindung, Flusskontrolle und Fehlerkorrektur. Segmentiert Daten.",
    examples: ["TCP", "UDP", "Port-Nummern", "Segmente"],
    color: "from-green-500 to-emerald-600"
  },
  {
    number: 3,
    name: "Network",
    germanName: "Vermittlungsschicht",
    description: "Logische Adressierung (IP) und Routing. Findet den besten Pfad durch das Netzwerk.",
    examples: ["IP", "ICMP", "Router", "Pakete", "IPv4", "IPv6"],
    color: "from-cyan-500 to-blue-600"
  },
  {
    number: 2,
    name: "Data Link",
    germanName: "Sicherungsschicht",
    description: "Physische Adressierung (MAC) und Fehlererkennung. Organisiert Bits in Frames.",
    examples: ["Ethernet", "MAC-Adresse", "Switch", "Frames", "WLAN", "PPP"],
    color: "from-blue-500 to-indigo-600"
  },
  {
    number: 1,
    name: "Physical",
    germanName: "Bitübertragungsschicht",
    description: "Übertragung von Bits über physische Medien. Kabel, Stecker, elektrische Signale.",
    examples: ["Kabel", "Hub", "Repeater", "Bitstrom", "RJ45", "Glasfaser"],
    color: "from-purple-500 to-violet-600"
  }
];

export interface DraggableItem {
  id: string;
  label: string;
  type: "protocol" | "hardware" | "concept";
  correctLayer: number;
  hint?: string;
}

export interface OSIExercise {
  id: string;
  title: string;
  description: string;
  difficulty: "leicht" | "mittel" | "schwer";
  type: "drag-drop" | "diagnostic" | "quiz";
  items: DraggableItem[];
  theory?: string;
  points: number;
}

export interface DiagnosticScenario {
  id: string;
  title: string;
  description: string;
  symptom: string;
  affectedLayer: number;
  correctDiagnosis: string;
  options: string[];
  explanation: string;
  points: number;
}

export interface OSIQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedLayer?: number;
}

export interface UserProgress {
  lessonId: string;
  completed: boolean;
  score: number;
  maxScore: number;
  completedAt?: string;
}

export interface OSILessonState {
  currentLessonIndex: number;
  placements: Record<string, number | null>; // itemId -> layerNumber
  diagnosticAnswers: Record<string, string>;
  quizAnswers: Record<string, number>;
  score: number;
  isCompleted: boolean;
  showResults: boolean;
  feedback: Record<string, boolean>; // itemId -> correct
}

export function getLayerByNumber(num: number): OSILayer | undefined {
  return OSI_LAYERS.find(l => l.number === num);
}

export function validatePlacement(item: DraggableItem, targetLayer: number): boolean {
  return item.correctLayer === targetLayer;
}
