import { LearnModule } from "../../types/learn";

export const datenschutzErweitertContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "DSGVO & Datenschutz - IHK Praxis",
    cards: [
      { 
        front: "DSGVO Grundprinzipien Art. 5", 
        back: "**1. Rechtmäßigkeit, Treu & Glauben:** Transparente Verarbeitung. **2. Zweckbindung:** Daten nur für festgelegte Zwecke. **3. Datenminimierung:** Nur notwendige Daten. **4. Richtigkeit:** Aktuelle, korrekte Daten. **5. Speicherbegrenzung:** Nicht länger als nötig. **6. Integrität/Vertraulichkeit:** Angemessene Sicherheit. **IHK-Relevanz:** Basis für alle Datenschutz-Maßnahmen." 
      },
      { 
        front: "Rechtsgrundlagen Art. 6 DSGVO", 
        back: "**a) Einwilligung:** Freiwillig, informiert, widerrufbar. **b) Vertrag:** Erforderlich für Vertragserfüllung. **c) Rechtliche Verpflichtung:** Steuerrecht, Aufbewahrungspflichten. **d) Lebenswichtige Interessen:** Notfälle. **e) Öffentliche Aufgabe:** Behörden. **f) Berechtigtes Interesse:** Interessenabwägung nötig. **IHK-Praxis:** Oft b), c) oder f) in Unternehmen." 
      },
      { 
        front: "Betroffenenrechte Art. 12-23 DSGVO", 
        back: "**Art. 15 - Auskunftsrecht:** Welche Daten werden verarbeitet? **Art. 16 - Berichtigung:** Korrektur falscher Daten. **Art. 17 - Löschung:** 'Recht auf Vergessenwerden'. **Art. 18 - Einschränkung:** Verarbeitung temporär sperren. **Art. 20 - Datenübertragbarkeit:** Export in maschinenlesbarem Format. **Art. 21 - Widerspruch:** Gegen Verarbeitung bei berechtigtem Interesse. **Frist:** 1 Monat, verlängerbar auf 3 Monate." 
      },
      { 
        front: "Technisch-organisatorische Maßnahmen (TOMs)", 
        back: "**Technisch:** Verschlüsselung, Pseudonymisierung, Zugangskontrollen, Firewalls, Backups. **Organisatorisch:** Schulungen, Richtlinien, Vier-Augen-Prinzip, Berechtigungskonzepte. **Art. 32 DSGVO:** Sicherheit der Verarbeitung. **IHK-Dokumentation:** TOMs müssen dokumentiert und regelmäßig überprüft werden. **Risikobewertung:** Angemessenheit nach Schutzbedarf." 
      },
      { 
        front: "Auftragsverarbeitung Art. 28 DSGVO", 
        back: "**Definition:** Externe Dienstleister verarbeiten Daten im Auftrag. **Beispiele:** Cloud-Provider, IT-Support, Lohnbüro. **Vertragspflicht:** Auftragsverarbeitungsvertrag (AVV) zwingend. **Inhalte AVV:** Gegenstand, Dauer, Weisungsbindung, TOMs, Unterauftragnehmer. **Verantwortung:** Auftraggeber bleibt verantwortlich. **IHK-Praxis:** Bei jeder externen Datenverarbeitung prüfen!" 
      },
      { 
        front: "Datenschutzbeauftragter (DSB)", 
        back: "**Pflicht ab:** 20 Personen ständig mit automatisierter Verarbeitung, oder bei sensiblen Daten/Kerntätigkeit. **Aufgaben:** Beratung, Überwachung, Schulung, Ansprechpartner für Aufsichtsbehörde. **Stellung:** Weisungsfrei, keine Benachteiligung, Geheimhaltung. **Intern/Extern:** Beide Varianten möglich. **Meldung:** DSB muss der Aufsichtsbehörde gemeldet werden." 
      },
      { 
        front: "Verzeichnis von Verarbeitungstätigkeiten", 
        back: "**Art. 30 DSGVO:** Dokumentationspflicht für Verantwortliche und Auftragsverarbeiter. **Pflichtinhalte:** Zweck, Kategorien betroffener Personen/Daten, Empfänger, Übermittlungen in Drittländer, Löschfristen, TOMs. **Ausnahme:** <250 Mitarbeiter UND keine sensiblen Daten/Risiken. **IHK-Praxis:** Praktisch immer erforderlich, Nachweis bei Kontrolle!" 
      },
      { 
        front: "Datenschutz-Folgenabschätzung (DSFA)", 
        back: "**Art. 35 DSGVO:** Bei hohem Risiko für Betroffene erforderlich. **Auslöser:** Profiling, umfangreiche sensible Daten, systematische Überwachung öffentlicher Bereiche. **Inhalte:** Beschreibung, Notwendigkeit, Risikobewertung, Abhilfemaßnahmen. **Konsultation:** Bei Restrisiko Aufsichtsbehörde konsultieren. **IHK-Tipp:** Dokumentation ist Nachweis der Compliance!" 
      },
      { 
        front: "Meldepflichten bei Datenpannen", 
        back: "**Art. 33 - Aufsichtsbehörde:** Meldung innerhalb 72 Stunden, es sei denn kein Risiko. **Art. 34 - Betroffene:** Benachrichtigung bei hohem Risiko unverzüglich. **Inhalte:** Art der Verletzung, Kategorien/Anzahl Betroffene, Folgen, Maßnahmen. **Dokumentation:** Alle Vorfälle intern dokumentieren. **IHK-Praxis:** Incident-Response-Prozess etablieren!" 
      },
      { 
        front: "Internationale Datenübermittlung", 
        back: "**Angemessenheitsbeschluss:** EU-Kommission bestätigt Datenschutzniveau (z.B. Japan, UK, Schweiz). **Standardvertragsklauseln (SCCs):** Von EU genehmigte Vertragsmuster. **Binding Corporate Rules:** Konzerninterne Regelungen. **USA:** EU-US Data Privacy Framework (seit 2023). **IHK-Praxis:** Vor Nutzung von US-Diensten Rechtsgrundlage prüfen!" 
      }
    ]
  },
  {
    type: "quiz",
    title: "Datenschutz IHK-Prüfungsfragen",
    questions: [
      {
        question: "Innerhalb welcher Frist muss eine Datenpanne der Aufsichtsbehörde gemeldet werden?",
        options: ["24 Stunden", "72 Stunden", "7 Tage", "1 Monat"],
        correctIndex: 1,
        explanation: "Nach Art. 33 DSGVO muss eine Datenpanne innerhalb von 72 Stunden der Aufsichtsbehörde gemeldet werden."
      },
      {
        question: "Ab wie vielen Mitarbeitern mit automatisierter Datenverarbeitung ist ein DSB Pflicht?",
        options: ["10 Personen", "20 Personen", "50 Personen", "100 Personen"],
        correctIndex: 1,
        explanation: "Ein Datenschutzbeauftragter ist Pflicht ab 20 Personen, die ständig mit automatisierter Verarbeitung personenbezogener Daten beschäftigt sind."
      },
      {
        question: "Welches Recht ermöglicht die Übertragung von Daten zu einem anderen Anbieter?",
        options: ["Auskunftsrecht", "Berichtigungsrecht", "Recht auf Datenübertragbarkeit", "Widerspruchsrecht"],
        correctIndex: 2,
        explanation: "Das Recht auf Datenübertragbarkeit (Art. 20 DSGVO) ermöglicht es, Daten in einem maschinenlesbaren Format zu erhalten und zu übertragen."
      },
      {
        question: "Was ist KEINE Rechtsgrundlage nach Art. 6 DSGVO?",
        options: ["Einwilligung", "Vertragserfüllung", "Gewinnerzielung", "Rechtliche Verpflichtung"],
        correctIndex: 2,
        explanation: "Gewinnerzielung ist keine Rechtsgrundlage. Art. 6 nennt: Einwilligung, Vertrag, rechtliche Pflicht, lebenswichtige Interessen, öffentliche Aufgabe, berechtigtes Interesse."
      },
      {
        question: "Wann ist eine Datenschutz-Folgenabschätzung (DSFA) erforderlich?",
        options: ["Bei jeder Datenverarbeitung", "Bei hohem Risiko für Betroffene", "Nur bei Auftragsverarbeitung", "Nur bei internationaler Übermittlung"],
        correctIndex: 1,
        explanation: "Eine DSFA ist nach Art. 35 DSGVO erforderlich, wenn die Verarbeitung voraussichtlich ein hohes Risiko für die Rechte und Freiheiten natürlicher Personen zur Folge hat."
      },
      {
        question: "Welche Frist gilt für die Beantwortung eines Auskunftsersuchens?",
        options: ["2 Wochen", "1 Monat", "3 Monate", "6 Monate"],
        correctIndex: 1,
        explanation: "Die Frist beträgt 1 Monat (Art. 12 DSGVO), kann aber bei komplexen Anfragen auf bis zu 3 Monate verlängert werden."
      },
      {
        question: "Was muss bei Auftragsverarbeitung zwingend abgeschlossen werden?",
        options: ["NDA", "Auftragsverarbeitungsvertrag", "Lizenzvertrag", "Rahmenvertrag"],
        correctIndex: 1,
        explanation: "Bei Auftragsverarbeitung nach Art. 28 DSGVO ist ein Auftragsverarbeitungsvertrag (AVV) mit festgelegten Mindestinhalten zwingend erforderlich."
      },
      {
        question: "Was bedeutet 'Privacy by Design'?",
        options: ["Datenschutz durch schönes Design", "Datenschutz von Anfang an mitdenken", "Nur Designer dürfen Daten verarbeiten", "Datenschutz ist optional"],
        correctIndex: 1,
        explanation: "Privacy by Design (Art. 25 DSGVO) bedeutet, Datenschutz bereits bei der Konzeption von Systemen und Prozessen zu berücksichtigen."
      }
    ]
  },
  {
    type: "flashcards",
    title: "BDSG & nationale Regelungen",
    cards: [
      { 
        front: "BDSG vs. DSGVO", 
        back: "**DSGVO:** EU-Verordnung, gilt unmittelbar. **BDSG:** Bundesdatenschutzgesetz, ergänzt/konkretisiert DSGVO in Deutschland. **Öffnungsklauseln:** DSGVO erlaubt nationale Regelungen (z.B. Beschäftigtendatenschutz). **Vorrang:** Bei Widerspruch gilt DSGVO. **IHK-Relevanz:** Beide Rechtsquellen kennen!" 
      },
      { 
        front: "Beschäftigtendatenschutz § 26 BDSG", 
        back: "**Anwendung:** Datenverarbeitung für Beschäftigungsverhältnis. **Erlaubt:** Für Begründung, Durchführung, Beendigung des Arbeitsverhältnisses erforderliche Verarbeitung. **Einwilligung:** Nur bei echter Freiwilligkeit wirksam. **Kollektivvereinbarungen:** Betriebsvereinbarungen können Regelungen treffen. **IHK-Praxis:** Bewerberdaten, Personalakte, Zeiterfassung." 
      },
      { 
        front: "Videoüberwachung § 4 BDSG", 
        back: "**Öffentlich zugängliche Räume:** Nur bei berechtigtem Interesse und keinem Überwiegen schutzwürdiger Interessen. **Kennzeichnung:** Überwachung muss erkennbar sein, Hinweis auf Verantwortlichen. **Speicherdauer:** Unverzüglich löschen, wenn nicht mehr erforderlich. **Arbeitsplatz:** Besondere Anforderungen, BAG-Rechtsprechung beachten. **IHK-Tipp:** DSFA oft erforderlich!" 
      },
      { 
        front: "Bußgelder und Sanktionen", 
        back: "**Bis 10 Mio. € / 2% Umsatz:** Technische/organisatorische Pflichten. **Bis 20 Mio. € / 4% Umsatz:** Grundsätze der Verarbeitung, Betroffenenrechte. **Bemessung:** Art, Schwere, Dauer, Vorsatz, Maßnahmen zur Minderung. **Weitere Folgen:** Schadensersatz, Reputationsschaden, Berufsverbot für DSB. **IHK-Praxis:** Compliance vermeidet Bußgelder!" 
      }
    ]
  }
];
