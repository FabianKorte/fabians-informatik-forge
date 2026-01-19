import type { LearnModule } from "@/types/learn";

export const sapErpContent: LearnModule[] = [
  // ===== FLASHCARDS: SAP Grundlagen =====
  {
    type: "flashcards",
    title: "SAP Grundlagen - Einführung",
    cards: [
      {
        front: "Was ist SAP?",
        back: "**SAP (Systeme, Anwendungen, Produkte):** Deutsches Softwareunternehmen, gegründet 1972 in Walldorf. **Produkte:** ERP-Software für Unternehmenssteuerung. **SAP ERP:** Integrierte Geschäftsprozesse (Finanzen, Logistik, HR). **SAP S/4HANA:** Neueste Generation auf In-Memory-Datenbank. **Marktposition:** Weltmarktführer für ERP-Systeme. **IHK-Relevanz:** Standard in vielen Großunternehmen."
      },
      {
        front: "Was ist ein ERP-System?",
        back: "**ERP (Enterprise Resource Planning):** Software zur Unternehmenssteuerung. **Ziel:** Alle Geschäftsprozesse in einem System integrieren. **Vorteile:** Datenkonsistenz, Prozessoptimierung, Echtzeitinformationen. **Module:** Finanzen, Vertrieb, Einkauf, Produktion, HR. **Datenbank:** Zentrale Datenhaltung, keine Redundanz. **IHK-Bedeutung:** Effiziente Ressourcenplanung, Kostensenkung."
      },
      {
        front: "SAP GUI - Benutzeroberfläche",
        back: "**SAP GUI (Graphical User Interface):** Standard-Client für SAP. **Varianten:** SAP GUI for Windows, SAP GUI for Java, SAP GUI for HTML (Web). **Elemente:** Menüleiste, Symbolleiste, Befehlsfeld, Arbeitsbereich. **Befehlsfeld:** Direkter Transaktionsaufruf mit Transaktion-Code. **Favoriten:** Häufig genutzte Transaktionen speichern. **IHK-Praxis:** Navigation und Grundbedienung."
      },
      {
        front: "Transaktionscodes in SAP",
        back: "**Transaktion (T-Code):** Kürzel zum Aufruf von SAP-Funktionen. **Eingabe:** Im Befehlsfeld mit /n (gleiche Sitzung) oder /o (neue Sitzung). **Beispiele:** SE38 (ABAP Editor), MM01 (Material anlegen), VA01 (Auftrag anlegen), FB01 (Buchung erfassen). **SU01:** Benutzerverwaltung. **SM37:** Job-Übersicht. **IHK-Wissen:** Wichtige T-Codes kennen und anwenden."
      },
      {
        front: "SAP Mandant (Client)",
        back: "**Mandant:** Eigenständige organisatorische Einheit in SAP. **Nummer:** Dreistellig (z.B. 100, 200, 800). **Trennung:** Daten sind mandantenabhängig getrennt. **Verwendung:** Entwicklung, Test, Produktiv jeweils eigener Mandant. **Anmeldung:** Mandant, Benutzer, Passwort erforderlich. **IHK-Konzept:** Multi-Tenant-Architektur für verschiedene Unternehmenseinheiten."
      },
      {
        front: "SAP Systemlandschaft",
        back: "**3-System-Landschaft:** Standard-Architektur. **Entwicklungssystem (DEV):** Customizing, ABAP-Entwicklung. **Qualitätssystem (QAS):** Tests, Abnahme. **Produktivsystem (PRD):** Live-Betrieb, echte Geschäftsdaten. **Transportwesen:** Änderungen von DEV → QAS → PRD. **IHK-Praxis:** Änderungsmanagement, keine direkte Änderung in PRD."
      }
    ]
  },

  // ===== FLASHCARDS: SAP Module im Überblick =====
  {
    type: "flashcards",
    title: "SAP Module - Überblick",
    cards: [
      {
        front: "SAP FI - Finanzwesen",
        back: "**Financial Accounting (FI):** Externes Rechnungswesen. **Hauptbuch:** Zentrale Buchführung, alle Geschäftsvorfälle. **Debitoren (FI-AR):** Kundenbuchhaltung, Forderungen. **Kreditoren (FI-AP):** Lieferantenbuchhaltung, Verbindlichkeiten. **Anlagenbuchhaltung (FI-AA):** Vermögenswerte verwalten. **IHK-Bedeutung:** Bilanz, GuV, gesetzliche Anforderungen erfüllen."
      },
      {
        front: "SAP CO - Controlling",
        back: "**Controlling (CO):** Internes Rechnungswesen. **Kostenstellenrechnung (CO-OM-CCA):** Wo entstehen Kosten? **Kostenträgerrechnung:** Was kostet ein Produkt? **Profit Center:** Ergebnisrechnung nach Bereichen. **Integration mit FI:** Automatische Überleitung von Kosten. **IHK-Anwendung:** Planung, Steuerung, Kontrolle von Kosten."
      },
      {
        front: "SAP MM - Materialwirtschaft",
        back: "**Materials Management (MM):** Beschaffungsprozesse. **Einkauf:** Bestellanforderung → Bestellung → Wareneingang. **Bestandsführung:** Lagerbestände, Bewegungen, Inventur. **Rechnungsprüfung:** Eingangsrechnungen gegen Bestellung prüfen. **Materialstamm:** Zentrale Materialdaten. **IHK-Prozess:** Procure-to-Pay (P2P) Zyklus."
      },
      {
        front: "SAP SD - Vertrieb",
        back: "**Sales and Distribution (SD):** Verkaufsprozesse. **Kundenauftrag:** Angebot → Auftrag → Lieferung → Faktura. **Preisfindung:** Konditionen, Rabatte, Zuschläge. **Versand:** Kommissionierung, Lieferschein, Transport. **Fakturierung:** Rechnungsstellung an Kunden. **IHK-Prozess:** Order-to-Cash (O2C) Zyklus."
      },
      {
        front: "SAP PP - Produktionsplanung",
        back: "**Production Planning (PP):** Fertigungssteuerung. **Stückliste (BOM):** Welche Komponenten für ein Produkt? **Arbeitsplan:** Welche Arbeitsschritte, welche Maschinen? **Bedarfsplanung (MRP):** Material- und Kapazitätsbedarf. **Fertigungsauftrag:** Produktion planen und steuern. **IHK-Integration:** Verknüpfung mit MM (Material) und CO (Kosten)."
      },
      {
        front: "SAP HCM/HR - Personalwirtschaft",
        back: "**Human Capital Management (HCM):** Personalmanagement. **Personaladministration:** Stammdaten, Organisationsstruktur. **Zeitwirtschaft:** Arbeitszeiten, Abwesenheiten erfassen. **Entgeltabrechnung:** Lohn/Gehalt berechnen, Auszahlung. **Personalentwicklung:** Qualifikationen, Karriereplanung. **IHK-Bereich:** Mitarbeiterverwaltung, gesetzliche Meldungen."
      }
    ]
  },

  // ===== QUIZ: SAP Grundlagen =====
  {
    type: "quiz",
    title: "SAP Grundlagen - Prüfungsfragen",
    questions: [
      {
        question: "Wofür steht die Abkürzung SAP?",
        options: [
          "Software Analyse Programm",
          "Systeme, Anwendungen, Produkte",
          "Standard Application Protocol",
          "System Administration Platform"
        ],
        correctIndex: 1
      },
      {
        question: "Welcher Transaktionscode wird für die Benutzerverwaltung verwendet?",
        options: ["SE38", "SU01", "MM01", "VA01"],
        correctIndex: 1
      },
      {
        question: "Was ist ein SAP Mandant?",
        options: [
          "Ein Kunde von SAP",
          "Eine eigenständige organisatorische Einheit mit getrennten Daten",
          "Ein Benutzertyp",
          "Eine Programmiersprache"
        ],
        correctIndex: 1
      },
      {
        question: "Welches SAP-Modul ist für das externe Rechnungswesen zuständig?",
        options: ["CO - Controlling", "FI - Financial Accounting", "MM - Materials Management", "SD - Sales and Distribution"],
        correctIndex: 1
      },
      {
        question: "In welcher Reihenfolge werden Änderungen in der 3-System-Landschaft transportiert?",
        options: [
          "PRD → QAS → DEV",
          "QAS → DEV → PRD",
          "DEV → QAS → PRD",
          "DEV → PRD → QAS"
        ],
        correctIndex: 2
      },
      {
        question: "Wofür steht ERP?",
        options: [
          "Enterprise Resource Planning",
          "Electronic Resource Program",
          "Extended Reporting Platform",
          "Enterprise Reporting Process"
        ],
        correctIndex: 0
      },
      {
        question: "Welches Modul behandelt den Procure-to-Pay Prozess?",
        options: ["SD - Vertrieb", "PP - Produktion", "MM - Materialwirtschaft", "FI - Finanzwesen"],
        correctIndex: 2
      },
      {
        question: "Was macht der Befehl /n vor einem Transaktionscode?",
        options: [
          "Öffnet eine neue Sitzung",
          "Wechselt zur Transaktion in der gleichen Sitzung",
          "Schließt die aktuelle Transaktion",
          "Speichert die Transaktion"
        ],
        correctIndex: 1
      }
    ]
  },

  // ===== FLASHCARDS: SAP Navigation =====
  {
    type: "flashcards",
    title: "SAP Navigation & Bedienung",
    cards: [
      {
        front: "SAP Befehlsfeld nutzen",
        back: "**Befehlsfeld:** Eingabefeld oben links. **Befehle:** /n[T-Code] = Transaktion in gleicher Sitzung. /o[T-Code] = Transaktion in neuer Sitzung. /nend = SAP beenden. /nex = SAP sofort beenden (ohne Speichern). **Vorteile:** Schnelle Navigation ohne Menüs. **IHK-Effizienz:** Power-User arbeiten primär mit T-Codes."
      },
      {
        front: "SAP Menüstruktur",
        back: "**SAP Easy Access:** Startbildschirm nach Anmeldung. **Menüleiste:** Transaktionen hierarchisch geordnet. **Favoriten:** Eigene Sammlung häufiger Transaktionen. **Rolle:** Benutzermenü basiert auf zugewiesener Rolle. **Suche:** Menüpunkte suchen mit Strg+F. **IHK-Tipp:** Strukturierter Zugang zu allen Funktionen."
      },
      {
        front: "Dynpro und Bildschirmaufbau",
        back: "**Dynpro:** Dynamisches Programm = SAP-Bildschirm. **Elemente:** Eingabefelder, Drucktasten, Tabellensteuerelemente. **Mussfelder:** Mit Häkchen markiert, Pflichtangabe. **F1-Hilfe:** Feldhilfe, erklärt das aktuelle Feld. **F4-Hilfe:** Eingabehilfe, zeigt mögliche Werte. **IHK-Bedienung:** Effiziente Dateneingabe."
      },
      {
        front: "SAP Tastenkombinationen",
        back: "**Enter:** Bestätigen, zum nächsten Schritt. **F3 / grüner Pfeil:** Zurück. **F12 / Abbrechen:** Abbrechen ohne Speichern. **F4:** Eingabehilfe (Suchhilfe). **F1:** Feldhilfe. **Strg+S:** Speichern. **Strg+Shift+F3:** Beenden. **IHK-Praxis:** Schnellere Arbeit durch Shortcuts."
      },
      {
        front: "SAP Berechtigungen & Rollen",
        back: "**Berechtigungskonzept:** Wer darf was? **Rolle:** Sammlung von Berechtigungen. **Transaktion SU01:** Benutzer anlegen/ändern. **Transaktion PFCG:** Rollen pflegen. **Berechtigungsobjekt:** Definiert erlaubte Aktionen. **Prinzip:** Minimal notwendige Rechte (Least Privilege). **IHK-Sicherheit:** Trennung von Aufgaben."
      },
      {
        front: "SAP Hilfe-Ressourcen",
        back: "**F1-Hilfe:** Kontextbezogene Feldhilfe. **F4-Hilfe:** Wertehilfe, mögliche Eingaben. **SAP Help Portal:** Online-Dokumentation. **SAP Notes:** Fehlerbehebungen und Hinweise. **SAP Community:** Forum für Fragen. **IHK-Learning:** Selbstständige Problemlösung durch Hilfe-Systeme."
      }
    ]
  },

  // ===== FLASHCARDS: SAP Prozesse im Detail =====
  {
    type: "flashcards",
    title: "SAP Geschäftsprozesse",
    cards: [
      {
        front: "Procure-to-Pay Prozess (P2P)",
        back: "**Beschaffungsprozess in SAP MM:** **1. Bedarfsermittlung:** Bestellanforderung (BANF) ME51N. **2. Bestellung:** Bestellung anlegen ME21N. **3. Wareneingang:** Ware buchen MIGO. **4. Rechnungsprüfung:** Rechnung erfassen MIRO. **5. Zahlung:** Zahlungslauf in FI. **IHK-Integration:** Automatische Belege durch Vorgangsverknüpfung."
      },
      {
        front: "Order-to-Cash Prozess (O2C)",
        back: "**Vertriebsprozess in SAP SD:** **1. Anfrage/Angebot:** VA21 (Angebot anlegen). **2. Kundenauftrag:** VA01 (Auftrag anlegen). **3. Lieferung:** VL01N (Lieferung anlegen), Kommissionierung. **4. Warenausgang:** Warenausgang buchen. **5. Faktura:** VF01 (Rechnung erstellen). **6. Zahlung:** Zahlungseingang in FI. **IHK-Fluss:** Durchgängiger Beleg-Fluss."
      },
      {
        front: "Materialstamm in SAP",
        back: "**Materialstamm:** Zentrale Materialdaten. **Sichten:** Grunddaten, Einkauf, Vertrieb, Lagerung, Buchhaltung. **T-Code MM01:** Material anlegen. **T-Code MM02:** Material ändern. **T-Code MM03:** Material anzeigen. **Organisationsebenen:** Werk, Lagerort, Verkaufsorganisation. **IHK-Stammdaten:** Basis für alle Logistik-Prozesse."
      },
      {
        front: "Debitor und Kreditor",
        back: "**Debitor (Kunde):** Wer schuldet uns Geld? **T-Code XD01:** Debitor anlegen. **Kreditor (Lieferant):** Wem schulden wir Geld? **T-Code XK01:** Kreditor anlegen. **Stammdaten:** Allgemeine Daten, Buchungskreis, Vertrieb/Einkauf. **Konten:** Automatische Bebuching bei Geschäftsvorfällen. **IHK-FI:** Basis für Debitoren-/Kreditorenbuchhaltung."
      },
      {
        front: "SAP Belegprinzip",
        back: "**Belegprinzip:** Jeder Geschäftsvorfall erzeugt einen Beleg. **Belegnummer:** Eindeutige Identifikation. **Belegarten:** Buchhaltungsbeleg, Materialbeleg, Einkaufsbeleg. **Belegfluss:** Verknüpfung zusammengehöriger Belege. **Nachvollziehbarkeit:** Lückenlose Dokumentation. **IHK-Grundsatz:** Keine Buchung ohne Beleg."
      },
      {
        front: "Organisationseinheiten in SAP",
        back: "**Mandant:** Oberste Ebene, rechtlich getrennt. **Buchungskreis:** Rechtliche Einheit für Bilanz/GuV. **Werk:** Produktionsstandort, Lager. **Lagerort:** Unterteilung des Werks. **Verkaufsorganisation:** Vertriebsstruktur. **Einkaufsorganisation:** Beschaffungsstruktur. **IHK-Struktur:** Abbildung der Unternehmensorganisation."
      }
    ]
  },

  // ===== QUIZ: SAP Prozesse =====
  {
    type: "quiz",
    title: "SAP Prozesse - Prüfungsfragen",
    questions: [
      {
        question: "Welcher Transaktionscode wird zum Anlegen einer Bestellung verwendet?",
        options: ["ME51N", "ME21N", "VA01", "MIGO"],
        correctIndex: 1
      },
      {
        question: "Was ist die richtige Reihenfolge im O2C-Prozess?",
        options: [
          "Rechnung → Lieferung → Auftrag",
          "Auftrag → Lieferung → Faktura",
          "Lieferung → Auftrag → Zahlung",
          "Faktura → Auftrag → Versand"
        ],
        correctIndex: 1
      },
      {
        question: "Was zeigt die F4-Taste in SAP an?",
        options: [
          "Feldhilfe (Erklärung)",
          "Eingabehilfe (mögliche Werte)",
          "Speichern-Dialog",
          "Druckvorschau"
        ],
        correctIndex: 1
      },
      {
        question: "Welche Transaktion dient zur Buchung des Wareneingangs?",
        options: ["MIRO", "MIGO", "ME21N", "VL01N"],
        correctIndex: 1
      },
      {
        question: "Was ist ein Buchungskreis in SAP?",
        options: [
          "Ein Benutzerkreis",
          "Eine rechtliche Einheit für Bilanz und GuV",
          "Ein Programmierbereich",
          "Ein Lagerort"
        ],
        correctIndex: 1
      },
      {
        question: "Wer ist ein 'Debitor' in SAP?",
        options: [
          "Ein Lieferant, dem wir Geld schulden",
          "Ein Kunde, der uns Geld schuldet",
          "Ein SAP-Berater",
          "Ein Systemadministrator"
        ],
        correctIndex: 1
      },
      {
        question: "Mit welcher Transaktion wird eine Rechnung (Faktura) erstellt?",
        options: ["VA01", "VL01N", "VF01", "MIRO"],
        correctIndex: 2
      },
      {
        question: "Was besagt das Belegprinzip in SAP?",
        options: [
          "Alle Dokumente müssen ausgedruckt werden",
          "Jeder Geschäftsvorfall erzeugt einen Beleg",
          "Belege müssen manuell erstellt werden",
          "Nur Finanztransaktionen erzeugen Belege"
        ],
        correctIndex: 1
      }
    ]
  },

  // ===== FLASHCARDS: SAP S/4HANA =====
  {
    type: "flashcards",
    title: "SAP S/4HANA - Moderne ERP",
    cards: [
      {
        front: "Was ist SAP S/4HANA?",
        back: "**S/4HANA:** SAP Business Suite 4 auf HANA. **HANA:** In-Memory-Datenbank für Echtzeit-Analysen. **Vereinfachung:** Reduzierte Datenmodelle, schnellere Prozesse. **Fiori:** Moderne Benutzeroberfläche (Web-basiert). **Cloud/On-Premise:** Flexible Deployment-Optionen. **IHK-Zukunft:** Nachfolger von SAP ECC, aktuelle Standard-Lösung."
      },
      {
        front: "SAP Fiori",
        back: "**Fiori:** Neue User Experience (UX) für SAP. **Design:** Kachelbasiert, intuitiv, rollenbasiert. **Technologie:** HTML5, responsive Design, Browser-basiert. **Apps:** Transaktionale, analytische und Fact-Sheet Apps. **Launchpad:** Zentraler Einstiegspunkt mit personalisierten Kacheln. **IHK-Trend:** Ablösung des klassischen SAP GUI."
      },
      {
        front: "In-Memory-Technologie (HANA)",
        back: "**HANA:** High-Performance Analytic Appliance. **Prinzip:** Daten im Arbeitsspeicher statt auf Festplatte. **Vorteile:** Extrem schnelle Datenverarbeitung, Echtzeit-Analysen. **Spaltenorientiert:** Effiziente Kompression und Aggregation. **Kombination:** OLTP und OLAP in einem System. **IHK-Bedeutung:** Grundlage für S/4HANA-Performance."
      },
      {
        front: "Migration auf S/4HANA",
        back: "**Brownfield:** System-Konvertierung, Daten bleiben erhalten. **Greenfield:** Neuimplementierung, sauberer Start. **Bluefield:** Selektive Datenmigration, Mix aus beiden. **Zeitrahmen:** SAP ECC Support endet 2027/2030. **Projektphasen:** Analyse, Realisierung, Test, Go-Live. **IHK-Praxis:** Wichtige strategische Entscheidung für Unternehmen."
      },
      {
        front: "SAP Cloud-Lösungen",
        back: "**SAP Business ByDesign:** Cloud-ERP für Mittelstand. **SAP Business One:** ERP für kleine Unternehmen. **SAP SuccessFactors:** HR in der Cloud. **SAP Ariba:** Einkauf und Beschaffung. **SAP Concur:** Reisekostenmanagement. **IHK-Trend:** Cloud-First-Strategie, flexible Skalierung."
      },
      {
        front: "SAP Business Technology Platform (BTP)",
        back: "**BTP:** Plattform für Erweiterungen und Integration. **Komponenten:** Application Development, Integration, Data & Analytics. **Erweiterungen:** SAP-Systeme mit Custom-Apps erweitern. **Integration Suite:** Systeme verbinden (On-Premise & Cloud). **IHK-Entwicklung:** Low-Code/No-Code für Fachabteilungen."
      }
    ]
  },

  // ===== QUIZ: SAP S/4HANA =====
  {
    type: "quiz",
    title: "SAP S/4HANA - Prüfungsfragen",
    questions: [
      {
        question: "Wofür steht HANA in SAP HANA?",
        options: [
          "Hardware Application Network Architecture",
          "High-Performance Analytic Appliance",
          "Hybrid Advanced Network Application",
          "Hosted Application Node Architecture"
        ],
        correctIndex: 1
      },
      {
        question: "Was ist SAP Fiori?",
        options: [
          "Eine Programmiersprache",
          "Eine moderne, kachelbasierte Benutzeroberfläche",
          "Ein Datenbank-System",
          "Ein Betriebssystem"
        ],
        correctIndex: 1
      },
      {
        question: "Was bedeutet 'In-Memory' bei HANA?",
        options: [
          "Daten werden nur temporär gespeichert",
          "Daten werden im Arbeitsspeicher verarbeitet",
          "Daten werden verschlüsselt",
          "Daten werden komprimiert"
        ],
        correctIndex: 1
      },
      {
        question: "Was ist eine Brownfield-Migration?",
        options: [
          "Neuimplementierung des Systems",
          "Konvertierung des bestehenden Systems",
          "Nur Cloud-Migration",
          "Nur Daten-Archivierung"
        ],
        correctIndex: 1
      },
      {
        question: "Wann endet der Mainstream-Support für SAP ECC?",
        options: ["2025", "2027", "2030", "2035"],
        correctIndex: 1
      },
      {
        question: "Was ist SAP SuccessFactors?",
        options: [
          "Ein Produktionsplanungs-Tool",
          "Eine Cloud-Lösung für Personalmanagement (HR)",
          "Ein Finanzbuchhaltungs-System",
          "Eine Datenbank-Technologie"
        ],
        correctIndex: 1
      }
    ]
  },

  // ===== FLASHCARDS: ABAP Grundlagen =====
  {
    type: "flashcards",
    title: "ABAP - SAP Programmierung Basics",
    cards: [
      {
        front: "Was ist ABAP?",
        back: "**ABAP:** Advanced Business Application Programming. **Entwicklung:** SAP-eigene Programmiersprache seit 1983. **Einsatz:** Customizing, Erweiterungen, Eigenentwicklungen. **Transaktion SE38:** ABAP Editor. **Transaktion SE80:** ABAP Workbench (Object Navigator). **IHK-Relevanz:** Kernsprache für SAP-Entwicklung."
      },
      {
        front: "ABAP Grundstruktur",
        back: "**Programm:** REPORT [name]. **Datendeklaration:** DATA: variable TYPE typ. **Ausgabe:** WRITE: 'Text', variable. **Schleifen:** DO ... ENDDO, WHILE ... ENDWHILE, LOOP AT itab. **Bedingungen:** IF ... ELSE ... ENDIF, CASE ... ENDCASE. **IHK-Syntax:** Ähnlich zu COBOL, Punkt als Abschluss."
      },
      {
        front: "Interne Tabellen in ABAP",
        back: "**Interne Tabelle:** Dynamische Datenstruktur im Speicher. **Typen:** Standard, Sorted, Hashed. **Deklaration:** DATA: itab TYPE TABLE OF struktur. **Befehle:** APPEND, INSERT, MODIFY, DELETE, READ TABLE. **LOOP AT:** Durch alle Zeilen iterieren. **IHK-Praxis:** Wichtigste Datenstruktur für Massenverarbeitung."
      },
      {
        front: "SAP Data Dictionary (DDIC)",
        back: "**DDIC:** Zentrale Datendefinition. **Transaktion SE11:** Data Dictionary pflegen. **Elemente:** Domänen, Datenelemente, Strukturen, Tabellen. **Domäne:** Technische Eigenschaften (Typ, Länge). **Datenelement:** Semantische Bedeutung. **IHK-Konzept:** Wiederverwendbare Definitionen, Konsistenz."
      },
      {
        front: "Debugging in ABAP",
        back: "**Transaktion /H:** Debugging aktivieren. **Breakpoint:** Programmunterbrechung setzen. **F5:** Einzelschritt (Statement für Statement). **F6:** Ausführen (Unterprogramm überspringen). **F7:** Zurück (aus Unterprogramm). **F8:** Weiter (bis nächster Breakpoint). **IHK-Entwicklung:** Fehleranalyse und Programmverständnis."
      }
    ]
  },

  // ===== FLASHCARDS: SAP Zertifizierung =====
  {
    type: "flashcards",
    title: "SAP Zertifizierung - Überblick",
    cards: [
      {
        front: "SAP Zertifizierungsprogramm",
        back: "**Stufen:** Associate, Professional, (Master - nicht mehr angeboten). **Associate:** Grundkenntnisse in einem Bereich. **Professional:** Vertiefte Kenntnisse, Projekterfahrung. **Prüfung:** Multiple Choice, 80 Fragen, 180 Minuten. **Bestanden:** Ab 60-65% (je nach Prüfung). **IHK-Wert:** Nachweis von SAP-Kompetenz für Arbeitgeber."
      },
      {
        front: "Beliebte SAP-Zertifizierungen",
        back: "**C_TS410:** S/4HANA Essential Training. **C_TS460:** S/4HANA Sales. **C_TS450:** S/4HANA Sourcing & Procurement. **C_TS412:** S/4HANA Project Systems. **C_HANADEV:** HANA Development. **C_TAW12:** ABAP Development. **IHK-Empfehlung:** TS410 als Einstieg."
      },
      {
        front: "Vorbereitung auf SAP-Zertifizierung",
        back: "**SAP Learning Hub:** Offizielle Lernplattform. **Training:** Kurse bei SAP oder Partnern. **openSAP:** Kostenlose Online-Kurse (Grundlagen). **Praxis:** Zugang zu SAP-System zum Üben. **Übungsfragen:** Sample Questions von SAP. **IHK-Strategie:** Theorie + praktische Übung kombinieren."
      },
      {
        front: "SAP Learning Hub",
        back: "**Plattform:** Online-Lernportal von SAP. **Inhalte:** E-Learnings, Handbücher, Videos. **Live Access:** Zugang zu SAP-Übungssystemen. **Community:** Austausch mit anderen Lernenden. **Subscription:** Jahres-Abonnement erforderlich. **IHK-Ressource:** Offizielle Quelle für Zertifizierungsvorbereitung."
      }
    ]
  },

  // ===== QUIZ: SAP Zertifizierung & ABAP =====
  {
    type: "quiz",
    title: "SAP Entwicklung & Zertifizierung",
    questions: [
      {
        question: "Wofür steht ABAP?",
        options: [
          "Advanced Business Application Programming",
          "Automated Business Analysis Process",
          "Application Based Automated Processing",
          "Advanced Binary Application Protocol"
        ],
        correctIndex: 0
      },
      {
        question: "Welche Transaktion öffnet den ABAP Editor?",
        options: ["SE11", "SE38", "SU01", "SM37"],
        correctIndex: 1
      },
      {
        question: "Was definiert man im SAP Data Dictionary (SE11)?",
        options: [
          "Benutzerberechtigungen",
          "Tabellen, Strukturen, Datenelemente",
          "Transportaufträge",
          "Druckeinstellungen"
        ],
        correctIndex: 1
      },
      {
        question: "Wie aktiviert man das ABAP Debugging?",
        options: [
          "Mit Taste F1",
          "Mit Transaktion /H",
          "Mit Menü Extras → Debug",
          "Mit Taste F12"
        ],
        correctIndex: 1
      },
      {
        question: "Welche SAP-Zertifizierung ist ein guter Einstieg für S/4HANA?",
        options: ["C_HANADEV", "C_TAW12", "C_TS410", "C_TS450"],
        correctIndex: 2
      },
      {
        question: "Was ist openSAP?",
        options: [
          "Eine Open-Source Version von SAP",
          "Kostenlose Online-Kurse von SAP",
          "Ein SAP-Entwicklungstool",
          "Eine SAP-Datenbank"
        ],
        correctIndex: 1
      },
      {
        question: "Welche Taste führt im ABAP Debugger einen Einzelschritt aus?",
        options: ["F5", "F6", "F7", "F8"],
        correctIndex: 0
      },
      {
        question: "Was ist eine 'Interne Tabelle' in ABAP?",
        options: [
          "Eine Datenbanktabelle",
          "Eine dynamische Datenstruktur im Speicher",
          "Eine Systemtabelle",
          "Eine Konfigurationstabelle"
        ],
        correctIndex: 1
      }
    ]
  }
];
