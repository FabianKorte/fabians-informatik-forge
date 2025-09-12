import type { LearnModule } from "@/types/learn";
import { learnContent as baseLearnContent } from "../learnContent";

// Zusatzinhalte: neue interaktive Lernmethoden und Minigames
const extraLearnContent: Record<string, LearnModule[]> = {
  programmierung: [
    {
      type: "code",
      title: "Coding-Katas: Algorithmen Basics",
      challenges: [
        {
          title: "FizzBuzz",
          description: "Gib Zahlen von 1..n aus. Für Vielfache von 3 'Fizz', für 5 'Buzz', für 15 'FizzBuzz'.",
          initialCode: "function fizzBuzz(n){\n  // TODO\n}\nconsole.log(fizzBuzz(15));",
          solution: "function fizzBuzz(n){\n  const out=[];\n  for(let i=1;i<=n;i++){\n    let s='';\n    if(i%3===0) s+='Fizz';\n    if(i%5===0) s+='Buzz';\n    out.push(s||String(i));\n  }\n  return out;\n}",
          tests: [
            { input: "5", expected: "1,2,Fizz,4,Buzz" },
            { input: "15", expected: "...,14,FizzBuzz" }
          ]
        },
        {
          title: "Palindrom prüfen",
          description: "Prüfe, ob ein String ein Palindrom ist (gleich vorwärts und rückwärts).",
          initialCode: "function isPal(s){\n  // TODO\n}\nconsole.log(isPal('otto'));",
          solution: "function isPal(s){\n  const t=s.toLowerCase().replace(/[^a-z0-9]/g,'');\n  return t===t.split('').reverse().join('');\n}",
          tests: [
            { input: "otto", expected: "true" },
            { input: "Hello", expected: "false" }
          ]
        },
        {
          title: "Duplikate entfernen",
          description: "Entferne doppelte Einträge aus einem Array und erhalte die ursprüngliche Reihenfolge.",
          initialCode: "function unique(arr){\n  // TODO\n}\nconsole.log(unique([1,2,2,3,1]));",
          solution: "function unique(arr){\n  const seen=new Set();\n  const out=[];\n  for(const x of arr){\n    if(!seen.has(x)){ seen.add(x); out.push(x); }\n  }\n  return out;\n}",
          tests: [
            { input: "[1,2,2,3,1]", expected: "[1,2,3]" },
            { input: "['a','a','b']", expected: "['a','b']" }
          ]
        }
      ]
    },
    {
      type: "dragdrop",
      title: "Ordne die Begriffe richtig zu",
      games: [
        {
          title: "Datentypen vs. Datenstrukturen",
          description: "Ziehe jeden Begriff in die passende Kategorie.",
          categories: ["Datentyp", "Datenstruktur"],
          items: [
            { id: "i1", content: "number", category: "Datentyp" },
            { id: "i2", content: "string", category: "Datentyp" },
            { id: "i3", content: "boolean", category: "Datentyp" },
            { id: "i4", content: "Array", category: "Datenstruktur" },
            { id: "i5", content: "Map", category: "Datenstruktur" },
            { id: "i6", content: "Set", category: "Datenstruktur" }
          ]
        }
      ]
    },
    {
      type: "memory",
      title: "Begriffe merken",
      games: [
        {
          title: "Grundkonzepte der Programmierung",
          description: "Finde die passenden Paare.",
          pairs: [
            { id: "p1", content: "Funktion", match: "Wiederverwendbarer Codeblock" },
            { id: "p2", content: "Variable", match: "Benannter Speicherplatz" },
            { id: "p3", content: "Algorithmus", match: "Endliche Schrittfolge" },
            { id: "p4", content: "O(n)", match: "Lineare Laufzeit" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Code-Review Entscheidungen",
      scenarios: [
        {
          title: "Debug-Logging im PR",
          description: "Im Pull Request sind viele console.log() Aufrufe.",
          scenario: "Wie gehst du vor?",
          choices: [
            { text: "Ignorieren – wird später schon entfernt.", consequence: "Riskant: Debug-Logs landen oft in Produktion.", isCorrect: false },
            { text: "Höflich um Entfernung bitten und Alternative vorschlagen.", consequence: "Richtig: Sauberer Code, z. B. via Logger mit Leveln.", isCorrect: true },
            { text: "PR ablehnen ohne Kommentar.", consequence: "Unkollegial, Kommunikation leidet.", isCorrect: false }
          ]
        }
      ]
    }
  ],

  datenbanken: [
    {
      type: "dragdrop",
      title: "SQL-Befehle zuordnen",
      games: [
        {
          title: "CRUD mit SQL",
          description: "Ordne SQL-Statements den CRUD-Operationen zu.",
          categories: ["Create", "Read", "Update", "Delete"],
          items: [
            { id: "d1", content: "INSERT INTO...", category: "Create" },
            { id: "d2", content: "SELECT ... FROM ...", category: "Read" },
            { id: "d3", content: "UPDATE ... SET ...", category: "Update" },
            { id: "d4", content: "DELETE FROM ...", category: "Delete" }
          ]
        }
      ]
    },
    {
      type: "memory",
      title: "Normalformen-Memory",
      games: [
        {
          title: "Normalformen",
          description: "Merke dir die Definitionen.",
          pairs: [
            { id: "n1", content: "1NF", match: "Atomare Werte" },
            { id: "n2", content: "2NF", match: "Voll funktionale Abhängigkeit vom Primärschlüssel" },
            { id: "n3", content: "3NF", match: "Keine transitiven Abhängigkeiten" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Index-Strategie",
      scenarios: [
        {
          title: "Langsame Abfrage",
          description: "Eine SELECT-Abfrage auf einer 10 Mio. Zeilen Tabelle ist langsam.",
          scenario: "Was zuerst prüfen?",
          choices: [
            { text: "Mehr RAM kaufen.", consequence: "Kann helfen, aber zuerst Abfrage & Indexe prüfen.", isCorrect: false },
            { text: "Explain-Plan analysieren und passende Indexe setzen.", consequence: "Richtig: Bottlenecks erkennen und beheben.", isCorrect: true },
            { text: "Tabelle neu anlegen.", consequence: "Unnötig disruptiv.", isCorrect: false }
          ]
        }
      ]
    }
  ],

  "it-sicherheit": [
    {
      type: "memory",
      title: "Security-Akronyme",
      games: [
        {
          title: "CIA-Trias",
          description: "Merke dir die Grundprinzipien.",
          pairs: [
            { id: "s1", content: "Confidentiality", match: "Vertraulichkeit" },
            { id: "s2", content: "Integrity", match: "Unverändertheit" },
            { id: "s3", content: "Availability", match: "Verfügbarkeit" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Phishing-Mail",
      scenarios: [
        {
          title: "Verdächtige E-Mail",
          description: "Anhang + Link, scheinbar vom Chef.",
          scenario: "Wie reagierst du?",
          choices: [
            { text: "Öffnen, um zu prüfen, was drin ist.", consequence: "Hohe Gefahr: Malware.", isCorrect: false },
            { text: "Melden an IT-Security und Absender verifizieren.", consequence: "Richtig: Prüfe Domain/Signatur und melde Vorfall.", isCorrect: true },
            { text: "Weiterleiten an Kollegen.", consequence: "Verbreitet das Risiko.", isCorrect: false }
          ]
        }
      ]
    },
    {
      type: "timeline",
      title: "Kryptografie Meilensteine",
      timelines: [
        {
          title: "Crypto-Historie",
          description: "Wichtige Ereignisse der Kryptografie",
          events: [
            { year: "1977", event: "RSA veröffentlicht", description: "Erstes verbreitetes Public-Key-Verfahren." },
            { year: "2001", event: "AES Standard", description: "Rijndael wird zum AES-Standard." },
            { year: "2018", event: "TLS 1.3", description: "Schneller, sicherer Handshake." }
          ]
        }
      ]
    }
  ],

  netzwerktechnik: [
    {
      type: "dragdrop",
      title: "Ports und Protokolle",
      games: [
        {
          title: "Ordne Ports zu",
          description: "Ziehe Protokolle zu Ports.",
          categories: ["22", "53", "80", "443"],
          items: [
            { id: "p22", content: "SSH", category: "22" },
            { id: "p53", content: "DNS", category: "53" },
            { id: "p80", content: "HTTP", category: "80" },
            { id: "p443", content: "HTTPS", category: "443" }
          ]
        }
      ]
    },
    {
      type: "timeline",
      title: "Internet-Geschichte",
      timelines: [
        {
          title: "Meilensteine",
          description: "Wichtige Networking-Ereignisse",
          events: [
            { year: "1969", event: "ARPANET", description: "Erstes Paketvermittlungsnetz." },
            { year: "1983", event: "TCP/IP", description: "Standard im ARPANET." },
            { year: "1991", event: "WWW", description: "Tim Berners-Lee stellt das Web vor." }
          ]
        }
      ]
    }
  ],

  systemadministration: [
    {
      type: "scenario",
      title: "Incident-Response",
      scenarios: [
        {
          title: "Server fällt aus",
          description: "Produktionsserver reagiert nicht.",
          scenario: "Was ist die beste Erstmaßnahme?",
          choices: [
            { text: "Sofort rebooten.", consequence: "Kann Datenverlust verschärfen.", isCorrect: false },
            { text: "Logs/Monitoring prüfen, Auswirkungen eingrenzen, kommunizieren.", consequence: "Richtig: Strukturierte Analyse vor Aktion.", isCorrect: true },
            { text: "Fehler ignorieren.", consequence: "Unprofessionell.", isCorrect: false }
          ]
        }
      ]
    },
    {
      type: "memory",
      title: "Linux-Tools",
      games: [
        {
          title: "Essentielle Befehle",
          description: "Finde die Paare",
          pairs: [
            { id: "l1", content: "journalctl", match: "Logs anzeigen" },
            { id: "l2", content: "systemctl", match: "Services verwalten" },
            { id: "l3", content: "top/htop", match: "Prozessmonitor" }
          ]
        }
      ]
    }
  ],

  "web-technologien": [
    {
      type: "dragdrop",
      title: "HTTP-Statusklassen",
      games: [
        {
          title: "Statuscodes",
          description: "Z ordne Codes zu Klassen.",
          categories: ["2xx", "3xx", "4xx", "5xx"],
          items: [
            { id: "h1", content: "200 OK", category: "2xx" },
            { id: "h2", content: "201 Created", category: "2xx" },
            { id: "h3", content: "301 Moved Permanently", category: "3xx" },
            { id: "h4", content: "404 Not Found", category: "4xx" },
            { id: "h5", content: "500 Server Error", category: "5xx" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Performance-Optimierung",
      scenarios: [
        {
          title: "Langsame Landingpage",
          description: "Lange LCP-Zeit im Audit.",
          scenario: "Was ist die beste Maßnahme?",
          choices: [
            { text: "Mehr Bilder in voller Auflösung.", consequence: "Gegenteil von Optimierung.", isCorrect: false },
            { text: "Bilder komprimieren, lazy-loaden, kritisches CSS inlinen.", consequence: "Richtig: LCP wird besser.", isCorrect: true },
            { text: "Mehr JS Bibliotheken einbinden.", consequence: "Meist schlechter.", isCorrect: false }
          ]
        }
      ]
    }
  ],

  "grundlagen-it": [
    {
      type: "memory",
      title: "Hardware-Memory",
      games: [
        {
          title: "Hardware-Paare",
          description: "Finde die Begriffe",
          pairs: [
            { id: "g1", content: "CPU", match: "Recheneinheit" },
            { id: "g2", content: "RAM", match: "Arbeitsspeicher" },
            { id: "g3", content: "SSD", match: "Nichtflüchtiger Speicher" }
          ]
        }
      ]
    }
  ],

  projektmanagement: [
    {
      type: "timeline",
      title: "Agile Reise",
      timelines: [
        {
          title: "Agile Meilensteine",
          description: "Historie des agilen Arbeitens",
          events: [
            { year: "2001", event: "Agiles Manifest", description: "Start von Agile/XP/Scrum Verbreitung." },
            { year: "2010", event: "Kanban-Welle", description: "Lean & Kanban verbreiten sich in IT." },
            { year: "2020", event: "Remote Agile", description: "Skalierung in verteilten Teams." }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Sprint-Druck",
      scenarios: [
        {
          title: "Stakeholder fordert Extra",
          description: "Kurz vor Sprintende ein großer Änderungswunsch.",
          scenario: "Wie agierst du?",
          choices: [
            { text: "Sofort reinschieben.", consequence: "Gefahr für Sprintziel.", isCorrect: false },
            { text: "Mit PO priorisieren und ggf. ins nächste Sprint-Backlog.", consequence: "Richtig: Prozess respektieren.", isCorrect: true },
            { text: "Ignorieren.", consequence: "Kommunikation leidet.", isCorrect: false }
          ]
        }
      ]
    }
  ],

  kommunikation: [
    {
      type: "scenario",
      title: "Feedback geben",
      scenarios: [
        {
          title: "Fehler im Team",
          description: "Ein Kollege hat einen Fehler gemacht.",
          scenario: "Wie gibst du Feedback?",
          choices: [
            { text: "Vor allen kritisieren.", consequence: "Demotivierend.", isCorrect: false },
            { text: "Konkret, wertschätzend, zeitnah – Ich-Botschaften.", consequence: "Richtig: Wirksam und respektvoll.", isCorrect: true },
            { text: "Gar kein Feedback.", consequence: "Lernchance verpasst.", isCorrect: false }
          ]
        }
      ]
    }
  ],

  "rechtliche-grundlagen": [
    {
      type: "scenario",
      title: "DSGVO in der Praxis",
      scenarios: [
        {
          title: "Neue Newsletter-Anmeldung",
          description: "Ein Formular sammelt E-Mail-Adressen.",
          scenario: "Welche Rechtsgrundlage?",
          choices: [
            { text: "Einwilligung (Double-Opt-In)", consequence: "Richtig.", isCorrect: true },
            { text: "Berechtigtes Interesse", consequence: "Selten, riskant.", isCorrect: false },
            { text: "Vertrag", consequence: "Nicht passend.", isCorrect: false }
          ]
        }
      ]
    }
  ],

  "mobile-entwicklung": [
    {
      type: "memory",
      title: "Mobile Frameworks",
      games: [
        {
          title: "Framework-Paare",
          description: "Ordne Begriffe",
          pairs: [
            { id: "m1", content: "SwiftUI", match: "iOS UI-Framework" },
            { id: "m2", content: "Jetpack Compose", match: "Android UI-Framework" },
            { id: "m3", content: "React Native", match: "Cross-Platform" }
          ]
        }
      ]
    }
  ],

  pruefungsvorbereitung: [
    {
      type: "timeline",
      title: "Dein Lernpfad",
      timelines: [
        {
          title: "Vorbereitungsschritte",
          description: "Zeitliche Abfolge bis zur Prüfung",
          events: [
            { year: "Woche 1-2", event: "Grundlagen", description: "Auffrischen von Basics." },
            { year: "Woche 3-6", event: "Vertiefung", description: "Praxisaufgaben, Projekte." },
            { year: "Woche 7-8", event: "Mock-Tests", description: "Realistische Prüfungsbedingungen." }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Prüfungsstrategie",
      scenarios: [
        {
          title: "Zeitdruck",
          description: "Mehrere schwere Aufgaben, wenig Zeit.",
          scenario: "Wie priorisieren?",
          choices: [
            { text: "Erst die schwerste Aufgabe.", consequence: "Oft ineffizient.", isCorrect: false },
            { text: "Erst leichte Punkte sichern, dann schwere Aufgaben.", consequence: "Richtig: Maximiert Score.", isCorrect: true },
            { text: "Alles überspringen.", consequence: "Kein Fortschritt.", isCorrect: false }
          ]
        }
      ]
    }
  ]
};

const mergedIds = Array.from(new Set([
  ...Object.keys(baseLearnContent || {}),
  ...Object.keys(extraLearnContent || {})
]));

const merged: Record<string, LearnModule[]> = Object.fromEntries(
  mergedIds.map((id) => [
    id,
    [
      ...(baseLearnContent[id] || []),
      ...(extraLearnContent[id] || [])
    ]
  ])
);

export const learnContent: Record<string, LearnModule[]> = merged;
export const getModulesForCategory = (id: string) => merged[id] || [];
