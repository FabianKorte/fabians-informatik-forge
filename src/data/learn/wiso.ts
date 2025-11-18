import { LearnModule } from "../../types/learn";

export const wisoContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "Wirtschafts- und Sozialkunde (WiSo) - IHK Prüfungswissen",
    cards: [
      { 
        front: "Arbeitsvertrag - Grundlagen und Pflichten", 
        back: "**Definition:** Zweiseitiger Vertrag zwischen Arbeitgeber und Arbeitnehmer. **Arbeitgeber-Pflichten:** Lohn zahlen, Arbeitsplatz bereitstellen, Fürsorgepflicht, Zeugnis ausstellen. **Arbeitnehmer-Pflichten:** Arbeitsleistung erbringen, Weisungen befolgen, Treuepflicht, Verschwiegenheitspflicht. **IHK-Wichtig:** Schriftform nicht zwingend, aber empfohlen. **Probezeit:** Max. 6 Monate, erleichterte Kündigung möglich. **Mindestinhalt:** Parteien, Arbeitsort, Tätigkeit, Arbeitszeit, Vergütung." 
      },
      { 
        front: "Kündigungsschutz und Kündigungsfristen", 
        back: "**Ordentliche Kündigung:** Fristgerecht mit Grund. **Außerordentliche Kündigung:** Fristlos bei wichtigem Grund. **Kündigungsfristen:** Probezeit (2 Wochen), bis 2 Jahre (4 Wochen), bis 5 Jahre (1 Monat), bis 8 Jahre (2 Monate), bis 10 Jahre (3 Monate), ab 20 Jahre (7 Monate). **KSchG:** Kündigungsschutzgesetz ab 10+ Mitarbeiter und 6+ Monate Betriebszugehörigkeit. **IHK-Prüfung:** Soziale Rechtfertigung erforderlich: verhaltens-, personen-, betriebsbedingt." 
      },
      { 
        front: "Tarifverträge und Tarifautonomie", 
        back: "**Definition:** Vertrag zwischen Gewerkschaften und Arbeitgeberverbänden/-unternehmen. **Inhalte:** Löhne, Arbeitszeiten, Urlaubsanspruch, Arbeitsschutz, Qualifizierung. **Arten:** Manteltarifvertrag (Rahmen), Lohntarifvertrag (Entgelte), Firmentarifvertrag (einzelnes Unternehmen). **Tarifbindung:** Mitgliedschaft in Tarifparteien erforderlich. **Günstigkeitsprinzip:** Arbeitsvertrag kann nur zugunsten des Arbeitnehmers abweichen. **IHK-Bedeutung:** Mindeststandards, Friedenspflicht während Laufzeit." 
      },
      { 
        front: "Betriebsverfassung und Mitbestimmung", 
        back: "**Betriebsrat:** Ab 5 wahlberechtigte Arbeitnehmer möglich, ab 21 Mitarbeitern freigestellt. **Mitbestimmungsrechte:** Soziale Angelegenheiten (Arbeitszeit, Urlaub), personelle Angelegenheiten (Einstellungen, Versetzungen), wirtschaftliche Angelegenheiten (bei 100+ Mitarbeitern). **Wirtschaftsausschuss:** Ab 100 Arbeitnehmer, Information über wirtschaftliche Angelegenheiten. **IHK-Praxis:** Betriebsvereinbarungen können Tarifverträge ergänzen/konkretisieren. **Kündigungsschutz:** Betriebsratsmitglieder haben besonderen Schutz." 
      },
      { 
        front: "Sozialversicherung - Die 5 Säulen", 
        back: "**1. Krankenversicherung:** Medizinische Versorgung, Krankengeld ab 7. Woche, Pflicht ab 450€/Monat. **2. Pflegeversicherung:** Pflegebedürftigkeit, 5 Pflegegrade. **3. Rentenversicherung:** Altersrente, Erwerbsminderungsrente, Hinterbliebenenrente. **4. Arbeitslosenversicherung:** Arbeitslosengeld I (bis 24 Monate), berufliche Weiterbildung. **5. Unfallversicherung:** Arbeitsunfälle, Berufskrankheiten, 100% Arbeitgeber-finanziert. **IHK-Beiträge:** Je hälftig AG/AN außer Unfallversicherung. **Beitragsbemessungsgrenze:** 2024 West 87.600€, Ost 85.200€." 
      },
      { 
        front: "Steuerarten und Steuerprogression", 
        back: "**Einkommensteuer:** Progressiv von 0% bis 45%, Grundfreibetrag 2024: 11.604€, Spitzensteuersatz ab 277.826€. **Lohnsteuer:** Vorabzug der Einkommensteuer durch Arbeitgeber. **Umsatzsteuer:** 19% (7% ermäßigt), auf Waren und Dienstleistungen. **Gewerbesteuer:** Kommunale Steuer auf Gewerbebetriebe, Freibetrag 24.500€. **IHK-Steuerklassen:** I (ledig), II (alleinerziehend), III/V (verheiratet), IV (verheiratet gleiches Einkommen), VI (Nebenjob). **Solidaritätszuschlag:** 5,5% auf Einkommensteuer (ab bestimmten Grenzen)." 
      },
      { 
        front: "Wirtschaftsordnung - Soziale Marktwirtschaft", 
        back: "**Grundprinzipien:** Freie Marktwirtschaft + sozialer Ausgleich. **Ordnungspolitik:** Kartellamt, Wettbewerbsschutz, Monopolkontrolle. **Prozesspolitik:** Geld-/Fiskalpolitik der Bundesbank/Regierung. **Sozialer Ausgleich:** Sozialversicherung, Arbeitslosengeld, Sozialhilfe, BAföG. **IHK-Akteure:** Staat (Rahmen), Unternehmen (Angebot), Haushalte (Nachfrage), Gewerkschaften/Verbände (Interessensvertretung). **Magisches Viereck:** Vollbeschäftigung, Preisstabilität, Wirtschaftswachstum, außenwirtschaftliches Gleichgewicht." 
      },
      { 
        front: "Wirtschaftskreislauf", 
        back: "**Zwei-Sektoren-Modell:** Unternehmen ↔ Haushalte (Güter gegen Geld, Arbeit gegen Lohn). **Drei-Sektoren:** + Staat (Steuern, öffentliche Güter, Transferleistungen). **Vier-Sektoren:** + Ausland (Import/Export, Kapitalverkehr). **Geldkreislauf:** Haushalte sparen → Banken → Investitionskredite → Unternehmen. **IHK-Zusammenhänge:** BIP = Konsum + Investitionen + Staatsausgaben + Nettoexporte. **Multiplikatoreffekt:** Staatsausgaben haben überproportionale Wirtschaftseffekte." 
      },
      { 
        front: "Arbeitslosigkeit - Arten und Ursachen", 
        back: "**Friktionelle Arbeitslosigkeit:** Temporär beim Jobwechsel, normal und unvermeidlich. **Strukturelle Arbeitslosigkeit:** Qualifikation passt nicht zu verfügbaren Jobs (Mismatch). **Konjunkturelle Arbeitslosigkeit:** Wirtschaftsabschwung, Nachfragemangel. **Saisonale Arbeitslosigkeit:** Wetterbedingt (Bau, Tourismus). **IHK-Maßnahmen:** Qualifizierung, Arbeitsbeschaffung, Kurzarbeit, Existenzgründungsförderung. **Arbeitslosenquote:** (Arbeitslose / Erwerbspersonen) × 100. **Vollbeschäftigung:** Unter 3% Arbeitslosigkeit." 
      },
      { 
        front: "Inflation und Deflation", 
        back: "**Inflation:** Allgemeiner Preisanstieg, Geldwert sinkt. **Ursachen:** Nachfrageinflation (zu viel Geld), Angebotsinflation (Kostensteigerungen), importierte Inflation (Rohstoffe). **Messung:** Verbraucherpreisindex, Warenkorb repräsentativer Güter. **EZB-Ziel:** Etwa 2% Inflation mittelfristig. **Deflation:** Preissinkung, kann zu Wirtschaftsstagnation führen (Japan). **IHK-Auswirkungen:** Inflation entwertet Schulden, belastet Sparer; Deflation hemmt Investitionen, verstärkt Rezession. **Stagflation:** Gleichzeitig hohe Inflation und Arbeitslosigkeit." 
      },
      { 
        front: "Europäische Union - Institutionen", 
        back: "**Europäischer Rat:** Staats-/Regierungschefs, politische Leitlinien. **Rat der EU (Ministerrat):** Fachminister, Legislative mit Parlament. **EU-Parlament:** Direkt gewählt, Legislative, Haushaltskontrolle. **EU-Kommission:** Exekutive, Gesetzesvorschläge, Vertragsüberwachung. **EuGH:** Rechtsprechung, Vertragshüter. **EZB:** Geldpolitik, Preisstabilität. **IHK-Verfahren:** Ordentliches Gesetzgebungsverfahren (Parlament + Rat), Einstimmigkeit bei Steuern/Sozialpolitik. **Binnenmarkt:** 4 Grundfreiheiten (Waren, Personen, Dienstleistungen, Kapital)." 
      },
      { 
        front: "Umweltschutz und Nachhaltigkeit", 
        back: "**Drei Säulen:** Ökologie (Umweltschutz), Ökonomie (Wirtschaftlichkeit), Soziales (gesellschaftliche Verantwortung). **Verursacherprinzip:** Wer Umweltschäden verursacht, trägt Kosten. **Vorsorgeprinzip:** Präventive Maßnahmen auch bei unsicherer Datenlage. **Kooperationsprinzip:** Zusammenarbeit aller Akteure. **IHK-Instrumente:** Umweltsteuern (CO2-Abgabe), Emissionshandel, Grenzwerte, Zertifizierung (ISO 14001). **Corporate Social Responsibility (CSR):** Freiwillige Unternehmensverpflichtung zu nachhaltigem Wirtschaften." 
      }
    ]
  },
  {
    type: "quiz",
    title: "WiSo Vertiefung - IHK Praxis",
    questions: [
      {
        question: "Wie lange ist die Kündigungsfrist nach 3 Jahren Betriebszugehörigkeit?",
        options: ["2 Wochen", "4 Wochen", "1 Monat zum Monatsende", "3 Monate"],
        correctIndex: 2,
        explanation: "Nach 2+ Jahren Betriebszugehörigkeit beträgt die Kündigungsfrist 1 Monat zum Monatsende (§ 622 BGB)."
      },
      {
        question: "Ab welcher Mitarbeiterzahl gilt das Kündigungsschutzgesetz?",
        options: ["5 Mitarbeiter", "10 Mitarbeiter", "20 Mitarbeiter", "50 Mitarbeiter"],
        correctIndex: 1,
        explanation: "Das Kündigungsschutzgesetz gilt ab 10 Mitarbeitern (ohne Auszubildende) und nach 6 Monaten Betriebszugehörigkeit."
      },
      {
        question: "Welche Sozialversicherung wird zu 100% vom Arbeitgeber finanziert?",
        options: ["Krankenversicherung", "Rentenversicherung", "Unfallversicherung", "Arbeitslosenversicherung"],
        correctIndex: 2,
        explanation: "Die Unfallversicherung wird vollständig vom Arbeitgeber finanziert und deckt Arbeitsunfälle und Berufskrankheiten ab."
      },
      {
        question: "Was bedeutet das Günstigkeitsprinzip im Arbeitsrecht?",
        options: ["Arbeitgeber wählt günstigen Mitarbeiter", "Arbeitsvertrag kann nur zugunsten des Arbeitnehmers abweichen", "Günstigste Arbeitszeit wählen", "Niedrigste Kosten für Unternehmen"],
        correctIndex: 1,
        explanation: "Arbeitsverträge können von Tarifverträgen nur dann abweichen, wenn dies für den Arbeitnehmer günstiger ist."
      },
      {
        question: "Welches Ziel verfolgt die EZB primär?",
        options: ["Vollbeschäftigung", "Wirtschaftswachstum", "Preisstabilität", "Handelsbilanzausgleich"],
        correctIndex: 2,
        explanation: "Die EZB hat als vorrangiges Ziel die Preisstabilität mit einer Inflationsrate von etwa 2% mittelfristig."
      },
      {
        question: "Was sind die 4 Grundfreiheiten des EU-Binnenmarkts?",
        options: ["Meinungs-, Vereinigungs-, Versammlungs-, Religionsfreiheit", "Waren, Personen, Dienstleistungen, Kapital", "Handel, Transport, Kommunikation, Energie", "Arbeit, Bildung, Gesundheit, Rente"],
        correctIndex: 1,
        explanation: "Die 4 Grundfreiheiten sind: freier Warenverkehr, Personenfreizügigkeit, Dienstleistungsfreiheit und freier Kapitalverkehr."
      },
      {
        question: "Welche Arbeitslosigkeitsart entsteht durch technischen Wandel?",
        options: ["Friktionelle", "Strukturelle", "Konjunkturelle", "Saisonale"],
        correctIndex: 1,
        explanation: "Strukturelle Arbeitslosigkeit entsteht durch Mismatch zwischen Qualifikationen und Anforderungen, oft durch technischen Wandel."
      },
      {
        question: "Was ist das magische Viereck der Wirtschaftspolitik?",
        options: ["Angebot, Nachfrage, Preis, Menge", "Vollbeschäftigung, Preisstabilität, Wachstum, außenwirtschaftliches Gleichgewicht", "Export, Import, Produktion, Konsum", "Steuern, Ausgaben, Schulden, Zinsen"],
        correctIndex: 1,
        explanation: "Das magische Viereck umfasst: Vollbeschäftigung, Preisstabilität, Wirtschaftswachstum und außenwirtschaftliches Gleichgewicht."
      }
    ]
  }
];