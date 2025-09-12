import type { LearnModule } from "@/types/learn";

export const learnContent: Record<string, LearnModule[]> = {
  programmierung: [
    {
      type: "flashcards",
      title: "Grundbegriffe der Programmierung",
      cards: [
        { front: "Algorithmus", back: "Endliche, eindeutige Schrittfolge zur Lösung eines Problems." },
        { front: "Variable", back: "Benannter Speicherplatz für veränderliche Werte." },
        { front: "Funktion", back: "Wiederverwendbarer Codeblock mit Eingaben und Rückgabe." },
        { front: "Big-O: O(n)", back: "Laufzeit wächst linear mit der Eingabegröße." }
      ]
    },
    {
      type: "quiz",
      title: "JavaScript/TypeScript Basics",
      questions: [
        { question: "Was macht 'const' in JS?", options: ["Variable neu zuweisbar", "Konstante, nicht neu zuweisbar", "Nur in Klassen nutzbar", "Nur global"], correctIndex: 1 },
        { question: "Was ist 'typeof null'?", options: ["null", "object", "undefined", "string"], correctIndex: 1, explanation: "Historischer Bug in JS." },
        { question: "TypeScript fügt...", options: ["Runtime-Performance", "Statische Typen", "Neue Browser-APIs", "CSS-Features"], correctIndex: 1 },
        { question: "Welche Schleife iteriert über Werte eines Arrays?", options: ["for...in", "for...of", "while", "do...while"], correctIndex: 1 }
      ]
    },
    {
      type: "matching",
      title: "Paradigmen zuordnen",
      pairs: [
        { left: "Imperativ", right: "Schritt-für-Schritt Anweisungen" },
        { left: "Funktional", right: "Funktionen ohne Seiteneffekte" },
        { left: "Objektorientiert", right: "Klassen, Objekte, Kapselung" },
        { left: "Deklarativ", right: "Was statt wie" }
      ]
    }
  ],
  datenbanken: [
    {
      type: "flashcards",
      title: "SQL & Normalformen",
      cards: [
        { front: "Primärschlüssel", back: "Eindeutige Identifikation einer Tabellenzeile." },
        { front: "Fremdschlüssel", back: "Verweist auf Schlüssel einer anderen Tabelle." },
        { front: "3. Normalform", back: "Keine transitiven Abhängigkeiten." },
        { front: "Index", back: "Beschleunigt Suchen auf Spalten." }
      ]
    },
    {
      type: "quiz",
      title: "SQL-Abfragen",
      questions: [
        { question: "Welche Klausel filtert Zeilen?", options: ["GROUP BY", "WHERE", "ORDER BY", "HAVING"], correctIndex: 1 },
        { question: "Welche SQL-Operation vereinigt Zeilen zweier Tabellen?", options: ["JOIN", "MERGE", "UNION ALL", "INTERSECT"], correctIndex: 0 },
        { question: "Welche Funktion zählt Zeilen?", options: ["COUNT(*)", "SUM(*)", "SIZE()", "LEN()"], correctIndex: 0 },
        { question: "Welche Isolation verhindert Dirty Reads?", options: ["Read Uncommitted", "Read Committed", "Snapshot", "Chaos"], correctIndex: 1 }
      ]
    }
  ],
  "it-sicherheit": [
    {
      type: "flashcards",
      title: "CIA-Trias & Grundlagen",
      cards: [
        { front: "Confidentiality", back: "Vertraulichkeit – nur Berechtigte sehen Daten." },
        { front: "Integrity", back: "Unverändertheit – Schutz vor Manipulation." },
        { front: "Availability", back: "Verfügbarkeit – Systeme sind nutzbar." },
        { front: "2FA", back: "Zwei Faktoren: Wissen, Besitz, Inhärenz." }
      ]
    },
    {
      type: "matching",
      title: "Ports zuordnen",
      pairs: [
        { left: "22", right: "SSH" },
        { left: "80", right: "HTTP" },
        { left: "443", right: "HTTPS" },
        { left: "53", right: "DNS" }
      ]
    }
  ],
  netzwerktechnik: [
    {
      type: "flashcards",
      title: "OSI-Schichten",
      cards: [
        { front: "Schicht 1", back: "Physical – Bits, Kabel, Signale" },
        { front: "Schicht 2", back: "Data Link – MAC, Switches" },
        { front: "Schicht 3", back: "Network – IP, Router" },
        { front: "Schicht 4", back: "Transport – TCP/UDP" }
      ]
    },
    {
      type: "quiz",
      title: "Netzwerk Basics",
      questions: [
        { question: "Was macht ein Router?", options: ["Kollisionsdomänen trennen", "Netze verbinden", "Signale verstärken", "VLANs taggen"], correctIndex: 1 },
        { question: "Privates IPv4-Netz?", options: ["8.8.8.8", "10.0.0.0/8", "1.1.1.1", "172.32.0.0/12"], correctIndex: 1, explanation: "172.16.0.0/12 ist privat – 172.32 nicht." },
        { question: "ARP löst...", options: ["MAC→IP", "IP→MAC", "DNS→IP", "IP→DNS"], correctIndex: 1 },
        { question: "Ping nutzt...", options: ["TCP", "UDP", "ICMP", "ARP"], correctIndex: 2 }
      ]
    }
  ],
  systemadministration: [
    {
      type: "flashcards",
      title: "Linux Essentials",
      cards: [
        { front: "systemd", back: "Init-System & Service-Manager." },
        { front: "top", back: "Prozessüberwachung in Echtzeit." },
        { front: "apt/yum", back: "Paketverwaltung (Debian/RedHat)." },
        { front: "journalctl", back: "System-Logs anzeigen." }
      ]
    },
    {
      type: "quiz",
      title: "Shell-Befehle",
      questions: [
        { question: "Verzeichnis wechseln?", options: ["ls", "cd", "cp", "mv"], correctIndex: 1 },
        { question: "Dateiinhalt anzeigen?", options: ["cat", "touch", "mkdir", "pwd"], correctIndex: 0 },
        { question: "Datei verschieben?", options: ["mv", "rm", "tar", "grep"], correctIndex: 0 },
        { question: "Datei suchen?", options: ["find", "ps", "kill", "echo"], correctIndex: 0 }
      ]
    }
  ],
  "web-technologien": [
    {
      type: "flashcards",
      title: "Web Grundlagen",
      cards: [
        { front: "HTML", back: "Struktur der Seite – Semantik wichtig." },
        { front: "CSS", back: "Präsentation und Layout." },
        { front: "React", back: "Komponentenbasierte UI-Bibliothek." },
        { front: "REST", back: "Architekturstil für APIs." }
      ]
    },
    {
      type: "matching",
      title: "Statuscodes",
      pairs: [
        { left: "200", right: "OK" },
        { left: "201", right: "Created" },
        { left: "404", right: "Not Found" },
        { left: "500", right: "Server Error" }
      ]
    }
  ],
  "grundlagen-it": [
    {
      type: "flashcards",
      title: "Hardware Basics",
      cards: [
        { front: "CPU", back: "Zentrale Recheneinheit." },
        { front: "RAM", back: "Flüchtiger Arbeitsspeicher." },
        { front: "SSD", back: "Schneller, nichtflüchtiger Speicher." },
        { front: "GPU", back: "Grafikprozessor für parallele Aufgaben." }
      ]
    },
    {
      type: "quiz",
      title: "Zahlensysteme",
      questions: [
        { question: "Binär von 10?", options: ["1010", "1001", "1111", "1100"], correctIndex: 0 },
        { question: "Hex von 15?", options: ["F", "E", "D", "C"], correctIndex: 0 },
        { question: "1 Byte = ?", options: ["4 Bit", "8 Bit", "16 Bit", "32 Bit"], correctIndex: 1 },
        { question: "KB zu Byte (dezimal)?", options: ["100", "512", "1000", "1024"], correctIndex: 2 }
      ]
    }
  ],
  projektmanagement: [
    {
      type: "flashcards",
      title: "Agile Grundlagen",
      cards: [
        { front: "Scrum", back: "Framework mit Rollen/Events/Artefakten." },
        { front: "Kanban", back: "Flussoptimierung, WIP-Limits." },
        { front: "Backlog", back: "Priorisierte Aufgabenliste." },
        { front: "Velocity", back: "Durchsatz pro Sprint." }
      ]
    },
    {
      type: "quiz",
      title: "Scrum Basics",
      questions: [
        { question: "Wer priorisiert das Product Backlog?", options: ["Scrum Master", "Product Owner", "Developer", "Stakeholder"], correctIndex: 1 },
        { question: "Sprint-Dauer?", options: ["1–4 Wochen", "1 Tag", "6 Monate", "Beliebig"], correctIndex: 0 },
        { question: "Daily Standup Dauer?", options: ["15 Min", "60 Min", "30 Min", "5 Min"], correctIndex: 0 },
        { question: "Artefakt?", options: ["Retrospektive", "Sprint Review", "Increment", "Daily"], correctIndex: 2 }
      ]
    }
  ],
  kommunikation: [
    {
      type: "flashcards",
      title: "Kommunikationsskills",
      cards: [
        { front: "Aktives Zuhören", back: "Paraphrasieren, Nachfragen, Bestätigen." },
        { front: "Feedback-Regeln", back: "Konkret, wertschätzend, zeitnah." },
        { front: "Ich-Botschaften", back: "Eigene Wahrnehmung statt Schuldzuweisung." },
        { front: "Nonverbal", back: "Mimik, Gestik, Haltung beachten." }
      ]
    },
    {
      type: "quiz",
      title: "Teamwork",
      questions: [
        { question: "Gutes Feedback ist...", options: ["Allgemein", "Konkrete Beispiele", "Bewertend", "Spät"], correctIndex: 1 },
        { question: "Konflikte löst man am besten...", options: ["Ignorieren", "Eskalieren", "Strukturiert moderieren", "Per Mail"], correctIndex: 2 },
        { question: "Handzeichen im Meeting hilft...", options: ["Zeit zu füllen", "Dominanz", "Struktur und Fairness", "Nichts"], correctIndex: 2 },
        { question: "Empathie bedeutet...", options: ["Zustimmen", "Mitfühlen", "Mitleid", "Ironie"], correctIndex: 1 }
      ]
    }
  ],
  "rechtliche-grundlagen": [
    {
      type: "flashcards",
      title: "DSGVO Basics",
      cards: [
        { front: "Recht auf Auskunft", back: "Betroffene können Daten anfordern." },
        { front: "Privacy by Design", back: "Datenschutz in Architektur verankern." },
        { front: "Auftragsverarbeitung", back: "Vertrag mit Dienstleistern (Art. 28)." },
        { front: "Datenminimierung", back: "Nur notwendige Daten verarbeiten." }
      ]
    },
    {
      type: "quiz",
      title: "Recht & Praxis",
      questions: [
        { question: "Welche Daten sind besonders schützenswert?", options: ["Name", "Gesundheitsdaten", "E-Mail", "PLZ"], correctIndex: 1 },
        { question: "Rechtsgrundlage für Newsletter?", options: ["Berechtigtes Interesse", "Einwilligung", "Vertrag", "Gesetzliche Pflicht"], correctIndex: 1 },
        { question: "Speicherdauer?", options: ["Beliebig", "Bis Zweck erreicht", "Für immer", "1 Jahr"], correctIndex: 1 },
        { question: "Privacy by Default heißt...", options: ["Alles freigeben", "Sichere Voreinstellungen", "Opt-out", "Keine Cookies"], correctIndex: 1 }
      ]
    }
  ],
  "mobile-entwicklung": [
    {
      type: "flashcards",
      title: "Mobile Basics",
      cards: [
        { front: "Native", back: "Plattformspezifisch (Swift/Kotlin)." },
        { front: "Hybrid", back: "Web + Wrapper (Ionic, Cordova)." },
        { front: "Cross-Platform", back: "Ein Code für mehrere Plattformen (Flutter/React Native)." },
        { front: "Lifecycle", back: "App-Status: active, background, suspended." }
      ]
    },
    {
      type: "quiz",
      title: "Android/iOS Basics",
      questions: [
        { question: "Android-UI wird mit...", options: ["Storyboard", "Jetpack Compose", "SwiftUI", "WPF"], correctIndex: 1 },
        { question: "iOS-Sprache?", options: ["Kotlin", "Swift", "Dart", "Java"], correctIndex: 1 },
        { question: "App-Store Review ist...", options: ["Automatisch", "Manuell geprüft", "Kein Review", "Nur für Bezahl-Apps"], correctIndex: 1 },
        { question: "Push Notifications kommen über...", options: ["SMS", "APNs/FCM", "E-Mail", "WebSocket"], correctIndex: 1 }
      ]
    }
  ],
  pruefungsvorbereitung: [
    {
      type: "flashcards",
      title: "Prüfungstipps",
      cards: [
        { front: "Zeitmanagement", back: "Erst leichte Aufgaben, dann die schweren." },
        { front: "Markieren", back: "Keywords in Aufgaben hervorheben." },
        { front: "Pausen", back: "Kurze Pausen für Fokus einplanen." },
        { front: "Mock-Tests", back: "Prüfungsbedingungen simulieren." }
      ]
    },
    {
      type: "matching",
      title: "Phasen zuordnen",
      pairs: [
        { left: "Vorbereitung", right: "Lernplan erstellen" },
        { left: "Durchführung", right: "Aufgaben bearbeiten" },
        { left: "Überprüfung", right: "Ergebnisse kontrollieren" },
        { left: "Reflexion", right: "Verbesserungen ableiten" }
      ]
    }
  ]
};

export const getModulesForCategory = (id: string) => learnContent[id] || [];
