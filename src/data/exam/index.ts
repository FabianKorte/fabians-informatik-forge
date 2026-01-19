import type { ExamConfig } from "@/types/exam";
import { teil1Questions } from "./teil1-questions";
import { teil2Questions } from "./teil2-questions";

export const examConfigs: Record<string, ExamConfig> = {
  "teil1": {
    id: "teil1",
    title: "IHK Abschlussprüfung Teil 1",
    description: "Gestreckter Teil 1 der Abschlussprüfung für Fachinformatiker - Einrichten eines IT-gestützten Arbeitsplatzes",
    timeLimitMinutes: 90,
    passingPercentage: 50,
    totalPoints: teil1Questions.reduce((sum, q) => sum + q.points, 0),
    questions: teil1Questions,
    categories: ["IT-Grundlagen", "Netzwerktechnik", "IT-Sicherheit", "Projektmanagement", "WiSo", "Datenschutz"]
  },
  "teil2": {
    id: "teil2",
    title: "IHK Abschlussprüfung Teil 2 - Systemintegration",
    description: "Fachspezifischer Teil 2 für Fachinformatiker Systemintegration - Planen, Umsetzen und Betreiben von IT-Systemen",
    timeLimitMinutes: 90,
    passingPercentage: 50,
    totalPoints: teil2Questions.reduce((sum, q) => sum + q.points, 0),
    questions: teil2Questions,
    categories: ["Systemintegration", "Netzwerktechnik", "Datenbanken", "IT-Service-Management", "IT-Sicherheit"]
  }
};

export { teil1Questions, teil2Questions };
