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
  ],
  bwl: [
    {
      type: "flashcards",
      title: "BWL-Grundbegriffe",
      cards: [
        { front: "Fixkosten", back: "Kosten, die unabhängig von der Auslastung anfallen." },
        { front: "Variable Kosten", back: "Kosten, die mit der produz. Menge steigen." },
        { front: "Deckungsbeitrag", back: "Erlös minus variable Kosten." },
        { front: "Break-even", back: "Schwelle, ab der Gewinn erzielt wird." },
        { front: "ROI", back: "Rendite des eingesetzten Kapitals." },
        { front: "Abschreibung (AfA)", back: "Wertminderung über die Nutzungsdauer." }
      ]
    },
    {
      type: "quiz",
      title: "Kostenrechnung & Controlling",
      questions: [
        { question: "Break-even liegt bei...", options: ["Erlös=Kosten", "Kosten=0", "Erlös>Gewinn", "Gewinn=0 bei negativen Kosten"], correctIndex: 0 },
        { question: "Deckungsbeitrag ist...", options: ["Erlös + Fixkosten", "Erlös – variable Kosten", "Fixkosten – variable Kosten", "Gewinn – Steuern"], correctIndex: 1 },
        { question: "ROI misst...", options: ["Liquidität", "Rendite", "Risiko", "Bestand"], correctIndex: 1 },
        { question: "AfA steht für...", options: ["Aufwand für Anlagen", "Absetzung für Abnutzung", "Abschreibung für Aktiva", "Allgemeine fixe Ausgaben"], correctIndex: 1 }
      ]
    },
    {
      type: "matching",
      title: "Kennzahlen zuordnen",
      pairs: [
        { left: "ROI", right: "Rendite" },
        { left: "Liquidität 1. Grades", right: "Liquide Mittel / kurzfr. Verbindlichkeiten" },
        { left: "EK-Quote", right: "Eigenkapital / Gesamtkapital" },
        { left: "EBIT", right: "Gewinn vor Zinsen und Steuern" }
      ]
    },
    {
      type: "dragdrop",
      title: "Kostenarten zuordnen",
      games: [
        {
          title: "Einzelkosten vs. Gemeinkosten",
          description: "Ordne die Kostenarten der passenden Kategorie zu.",
          categories: ["Einzelkosten", "Gemeinkosten"],
          items: [
            { id: "k1", content: "Material", category: "Einzelkosten" },
            { id: "k2", content: "Fertigungslöhne", category: "Einzelkosten" },
            { id: "k3", content: "Miete", category: "Gemeinkosten" },
            { id: "k4", content: "Strom", category: "Gemeinkosten" },
            { id: "k5", content: "Abschreibungen", category: "Gemeinkosten" }
          ]
        }
      ]
    },
    {
      type: "memory",
      title: "Buchführung Basics",
      games: [
        {
          title: "Grundbegriffe",
          description: "Merke dir zentrale Begriffe.",
          pairs: [
            { id: "b1", content: "Aktiva", match: "Vermögenswerte" },
            { id: "b2", content: "Passiva", match: "Kapital" },
            { id: "b3", content: "GuV", match: "Erfolgskonten" },
            { id: "b4", content: "Inventur", match: "Bestandsaufnahme" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Investitionsentscheidung",
      scenarios: [
        {
          title: "Zwei Maschinen im Vergleich",
          description: "Unterschiedliche Anschaffungskosten und laufende Kosten.",
          scenario: "Maschine A ist teuer in der Anschaffung, aber günstig im Betrieb. Maschine B ist günstig, hat aber hohe laufende Kosten.",
          choices: [
            { text: "Kapitalwert/Amortisationsdauer berechnen und vergleichen", consequence: "Fundierte Entscheidung auf Basis betriebswirtschaftlicher Kennzahlen.", isCorrect: true },
            { text: "Bauchgefühl entscheiden lassen", consequence: "Riskant und nicht prüfungstauglich.", isCorrect: false }
          ]
        }
      ]
    }
  ],
  wiso: [
    {
      type: "flashcards",
      title: "Arbeitswelt & Soziales",
      cards: [
        { front: "Probezeit", back: "Zeitraum zu Beginn eines Arbeitsverhältnisses mit verkürzter Kündigungsfrist." },
        { front: "Tarifvertrag", back: "Vertrag zwischen Gewerkschaften und Arbeitgeberverbänden." },
        { front: "Mitbestimmung", back: "Beteiligung der Arbeitnehmer im Betrieb (Betriebsrat)." },
        { front: "Brutto/Netto", back: "Brutto vor Abzügen, Netto nach Abzügen." },
        { front: "Sozialversicherung", back: "Kranken-, Pflege-, Renten-, Arbeitslosen- und Unfallversicherung." },
        { front: "Kündigungsfrist", back: "Frist zwischen Kündigungserklärung und Beendigung." }
      ]
    },
    {
      type: "quiz",
      title: "Wirtschaftsgrundlagen",
      questions: [
        { question: "Inflation bedeutet...", options: ["Preisanstieg", "Preissenkung", "Lohnsenkung", "Steuererhöhung"], correctIndex: 0 },
        { question: "Oligopol ist...", options: ["Viele Anbieter", "Wenige Anbieter", "Ein Anbieter", "Kein Anbieter"], correctIndex: 1 },
        { question: "BIP misst...", options: ["Staatsverschuldung", "Wirtschaftsleistung", "Inflationsrate", "Arbeitslosenquote"], correctIndex: 1 },
        { question: "Betriebsrat wird gewählt ab...", options: ["5 Arbeitnehmern", "10", "20", "50"], correctIndex: 0 }
      ]
    },
    {
      type: "matching",
      title: "Verträge & Rechte",
      pairs: [
        { left: "Kaufvertrag", right: "Übereignung einer Sache gegen Preis" },
        { left: "Dienstvertrag", right: "Leistung von Diensten, kein Erfolg geschuldet" },
        { left: "Werkvertrag", right: "Herstellung eines Erfolgs geschuldet" },
        { left: "Mietvertrag", right: "Überlassung einer Sache auf Zeit" }
      ]
    },
    {
      type: "dragdrop",
      title: "Sozialversicherung zuordnen",
      games: [
        {
          title: "Träger und Bereiche",
          description: "Ordne Beispiele dem richtigen Zweig zu.",
          categories: ["Krankenversicherung", "Rentenversicherung", "Arbeitslosenversicherung", "Pflegeversicherung", "Unfallversicherung"],
          items: [
            { id: "s1", content: "AOK (Beispiel)", category: "Krankenversicherung" },
            { id: "s2", content: "Deutsche Rentenversicherung", category: "Rentenversicherung" },
            { id: "s3", content: "Bundesagentur für Arbeit", category: "Arbeitslosenversicherung" },
            { id: "s4", content: "Pflegekasse", category: "Pflegeversicherung" },
            { id: "s5", content: "Berufsgenossenschaft", category: "Unfallversicherung" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Arbeitsrechtlicher Fall",
      scenarios: [
        {
          title: "Verspätung und Abmahnung",
          description: "Mitarbeiter kommt mehrfach zu spät.",
          scenario: "Wie reagiert der Arbeitgeber rechtssicher?",
          choices: [
            { text: "Abmahnung aussprechen, Gespräch suchen", consequence: "Verhältnismäßig und rechtssicher.", isCorrect: true },
            { text: "Fristlose Kündigung ohne Vorwarnung", consequence: "Unverhältnismäßig, rechtlich angreifbar.", isCorrect: false }
          ]
        }
      ]
    }
  ],
  datenschutz: [
    {
      type: "flashcards",
      title: "DSGVO-Prinzipien",
      cards: [
        { front: "Rechtmäßigkeit", back: "Verarbeitung nur bei gültiger Rechtsgrundlage." },
        { front: "Zweckbindung", back: "Nur für festgelegte, eindeutige Zwecke." },
        { front: "Datenminimierung", back: "So wenig Daten wie möglich." },
        { front: "Richtigkeit", back: "Daten müssen sachlich richtig sein." },
        { front: "Speicherbegrenzung", back: "Nur so lange wie nötig speichern." },
        { front: "Integrität & Vertraulichkeit", back: "Angemessene Sicherheit (TOMs)." }
      ]
    },
    {
      type: "quiz",
      title: "Rechtsgrundlagen",
      questions: [
        { question: "Newsletter-Versand basiert i.d.R. auf...", options: ["Vertrag", "Einwilligung", "Gesetzliche Pflicht", "Berechtigtes Interesse"], correctIndex: 1 },
        { question: "Auftragsverarbeitung ist geregelt in...", options: ["Art. 28 DSGVO", "Art. 6 DSGVO", "Art. 5 DSGVO", "Art. 32 DSGVO"], correctIndex: 0 },
        { question: "Meldepflicht Datenpanne:", options: ["24h", "48h", "72h", "1 Woche"], correctIndex: 2 }
      ]
    },
    {
      type: "matching",
      title: "Rollen im Datenschutz",
      pairs: [
        { left: "Verantwortlicher", right: "Entscheidet über Zwecke und Mittel" },
        { left: "Auftragsverarbeiter", right: "Verarbeitet im Auftrag" },
        { left: "Betroffene Person", right: "Von Datenverarbeitung betroffen" },
        { left: "Datenschutzbeauftragter", right: "Berät, überwacht, schult" }
      ]
    },
    {
      type: "dragdrop",
      title: "TOMs kategorisieren",
      games: [
        {
          title: "Technisch vs. Organisatorisch vs. Physisch",
          description: "Ordne Maßnahmen der passenden Kategorie zu.",
          categories: ["Technisch", "Organisatorisch", "Physisch"],
          items: [
            { id: "t1", content: "Verschlüsselung", category: "Technisch" },
            { id: "t2", content: "Passwortrichtlinie", category: "Organisatorisch" },
            { id: "t3", content: "Zutrittskontrolle", category: "Physisch" },
            { id: "t4", content: "Pseudonymisierung", category: "Technisch" },
            { id: "t5", content: "Mitarbeiterschulung", category: "Organisatorisch" }
          ]
        }
      ]
    },
    {
      type: "memory",
      title: "Betroffenenrechte",
      games: [
        {
          title: "Rechte zuordnen",
          description: "Merke dir die wichtigsten Betroffenenrechte.",
          pairs: [
            { id: "r1", content: "Auskunft", match: "Art. 15" },
            { id: "r2", content: "Berichtigung", match: "Art. 16" },
            { id: "r3", content: "Löschung", match: "Art. 17" },
            { id: "r4", content: "Datenübertragbarkeit", match: "Art. 20" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "DSFA (DPIA) Entscheidung",
      scenarios: [
        {
          title: "Neues KI-Feature",
          description: "Hohe Risiken für Rechte und Freiheiten?",
          scenario: "Ein neues KI-Modul analysiert Kundendaten zur Kreditwürdigkeit.",
          choices: [
            { text: "DSFA prüfen/ durchführen, DSB einbeziehen", consequence: "Risikoorientiert und DSGVO-konform.", isCorrect: true },
            { text: "Direkt live schalten", consequence: "Rechtliches Risiko, Bußgeld droht.", isCorrect: false }
          ]
        }
      ]
    }
  ],
  "fachmodul-systemintegration": [
    {
      type: "flashcards",
      title: "Infrastruktur-Konzepte",
      cards: [
        { front: "Active Directory", back: "Verzeichnisdienst für Authentifizierung." },
        { front: "DNS", back: "Namensauflösung im Netzwerk." },
        { front: "DHCP", back: "Automatische IP-Vergabe." },
        { front: "VLAN", back: "Logische Netzsegmentierung." },
        { front: "Hypervisor", back: "Virtualisierungsplattform." },
        { front: "NAT", back: "Adressübersetzung." }
      ]
    },
    {
      type: "quiz",
      title: "Virtualisierung & Dienste",
      questions: [
        { question: "VM-Snapshots sind...", options: ["Backups", "Zeitpunkte des Systemzustands", "Container", "Images"], correctIndex: 1 },
        { question: "RDP nutzt Port...", options: ["22", "3389", "445", "1433"], correctIndex: 1 },
        { question: "High Availability erreicht man durch...", options: ["Single Server", "Redundanz/Failover", "Mehr RAM", "Schnellere CPU"], correctIndex: 1 }
      ]
    },
    {
      type: "matching",
      title: "RAID-Level zuordnen",
      pairs: [
        { left: "RAID 0", right: "Striping (Leistung, keine Redundanz)" },
        { left: "RAID 1", right: "Mirroring (Redundanz)" },
        { left: "RAID 5", right: "Parity (Leistung + Redundanz)" }
      ]
    },
    {
      type: "dragdrop",
      title: "Services zu Ports",
      games: [
        {
          title: "Ordne Dienste den Ports zu",
          description: "Klassische Admin-Prüfungsfrage.",
          categories: ["22", "80", "3389", "445"],
          items: [
            { id: "si1", content: "SSH", category: "22" },
            { id: "si2", content: "HTTP", category: "80" },
            { id: "si3", content: "RDP", category: "3389" },
            { id: "si4", content: "SMB", category: "445" }
          ]
        }
      ]
    },
    {
      type: "memory",
      title: "Backup-Strategien",
      games: [
        {
          title: "Backup-Arten",
          description: "Verbinde Begriff und Beschreibung.",
          pairs: [
            { id: "m1", content: "Vollbackup", match: "Alle Daten vollständig sichern" },
            { id: "m2", content: "Inkrementell", match: "Nur Änderungen seit letztem Backup" },
            { id: "m3", content: "Differenziell", match: "Änderungen seit letztem Vollbackup" }
          ]
        }
      ]
    },
    {
      type: "scenario",
      title: "Server-Migration",
      scenarios: [
        {
          title: "Downtime minimieren",
          description: "Altsystem muss abgelöst werden.",
          scenario: "Ein Fileserver wird auf neue Hardware migriert.",
          choices: [
            { text: "Parallelbetrieb + geplanter Cutover", consequence: "Minimiert Risiko und Ausfallzeit.", isCorrect: true },
            { text: "Spontan in Produktion tauschen", consequence: "Hohes Risiko, ggf. Datenverlust.", isCorrect: false }
          ]
        }
      ]
    }
  ],
  "fachmodul-anwendungsentwicklung": [
    {
      type: "flashcards",
      title: "OOP & Patterns",
      cards: [
        { front: "Kapselung", back: "Daten verbergen hinter Schnittstellen." },
        { front: "Polymorphie", back: "Gleiches Interface, unterschiedliche Implementierung." },
        { front: "Abstraktion", back: "Wesentliches hervorheben." },
        { front: "Singleton", back: "Genau eine Instanz global zugänglich." },
        { front: "Observer", back: "Benachrichtigung bei Zustandsänderungen." }
      ]
    },
    {
      type: "quiz",
      title: "Git & Testing",
      questions: [
        { question: "Pull Request dient...", options: ["Branch löschen", "Code Review", "Merge verhindern", "Build starten"], correctIndex: 1 },
        { question: "Unit-Tests sollen...", options: ["Integration testen", "Nur UI testen", "Kleine Einheiten isoliert testen", "Manuell sein"], correctIndex: 2 },
        { question: "CI bedeutet...", options: ["Continuous Integration", "Code Inspection", "Cloud Instance", "Container Image"], correctIndex: 0 }
      ]
    },
    {
      type: "matching",
      title: "Entwurfsmuster",
      pairs: [
        { left: "Factory", right: "Erzeugt Objekte über Schnittstellen" },
        { left: "Decorator", right: "Fügt Verhalten zur Laufzeit hinzu" },
        { left: "Strategy", right: "Austauschbare Algorithmen" },
        { left: "Adapter", right: "Schnittstellen anpassen" }
      ]
    },
    {
      type: "code",
      title: "Kleine Code-Katas",
      challenges: [
        {
          title: "Klammern balanciert?",
          description: "Prüfe ob (), [], {} korrekt geschachtelt sind.",
          initialCode: "function isBalanced(s){\n  // TODO\n}\nconsole.log(isBalanced('([]{})'));",
          solution: "function isBalanced(s){\n  const map={')':'(',']':'[','}':'{'};\n  const st=[];\n  for(const ch of s){\n    if('([{'.includes(ch)) st.push(ch);\n    else if(')]}'.includes(ch)){\n      if(st.pop()!==map[ch]) return false;\n    }\n  }\n  return st.length===0;\n}",
          tests: [
            { input: "([]{})", expected: "true" },
            { input: "([)]", expected: "false" }
          ]
        },
        {
          title: "Stack implementieren",
          description: "Implementiere push, pop und peek.",
          initialCode: "class Stack{\n  constructor(){ this._d=[] }\n  // TODO: push(x), pop(), peek()\n}",
          solution: "class Stack{\n  constructor(){ this._d=[] }\n  push(x){ this._d.push(x) }\n  pop(){ return this._d.pop() }\n  peek(){ return this._d[this._d.length-1] }\n}",
          tests: [
            { input: "push/pop", expected: "OK" }
          ]
        }
      ]
    },
    {
      type: "dragdrop",
      title: "UML-Grundlagen",
      games: [
        {
          title: "Elemente zuordnen",
          description: "Ordne UML-Elemente Kategorien zu.",
          categories: ["Struktur", "Beziehung", "Diagramm"],
          items: [
            { id: "u1", content: "Klasse", category: "Struktur" },
            { id: "u2", content: "Interface", category: "Struktur" },
            { id: "u3", content: "Aggregation", category: "Beziehung" },
            { id: "u4", content: "Komposition", category: "Beziehung" },
            { id: "u5", content: "Sequenzdiagramm", category: "Diagramm" }
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
