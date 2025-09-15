import { LearnModule } from "../../types/learn";

export const rechtlicheGrundlagenContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "Rechtliche Grundlagen - IHK Prüfungswissen",
    cards: [
      { 
        front: "Vertragsrecht BGB", 
        back: "**Willenserklärung:** Angebot (§145 BGB) + Annahme (§147 BGB) = Vertrag. **Anfechtung:** Irrtum (§119), Täuschung (§123), Drohung (§123). **Nichtig vs. Anfechtbar:** Nichtig = von Anfang an unwirksam, Anfechtbar = wird unwirksam. **IHK-Vertragsformen:** Schriftform (§126), elektronische Form (§126a). **Stellvertretung:** Vollmacht (§164ff), Prokura (§48 HGB). **Verjährung:** Regelfrist 3 Jahre (§195 BGB)." 
      },
      { 
        front: "Kaufvertragsrecht", 
        back: "**Kaufvertrag:** §433 BGB - Verkäufer liefert Sache, Käufer zahlt Preis. **Gewährleistung:** Mängelhaftung bei Lieferung, 2 Jahre Verjährung. **Rechte bei Mängeln:** Nacherfüllung, Rücktritt, Minderung, Schadensersatz (§437 BGB). **IHK-Unterscheidung:** Gewährleistung (gesetzlich) vs. Garantie (freiwillig). **Gefahrenübergang:** Bei Übergabe (§446 BGB). **Verzug:** Mahnung oder Fristsetzung erforderlich." 
      },
      { 
        front: "Arbeitsrecht Basics", 
        back: "**Arbeitsvertrag:** Weisungsgebundenheit, persönliche Leistungserbringung, Eingliederung. **Kündigungsschutz:** KSchG ab 6 Monate Betriebszugehörigkeit + >10 Mitarbeiter. **Kündigungsarten:** Ordentlich (mit Frist), außerordentlich (fristlos), Änderungskündigung. **IHK-Fristen:** Probezeit max. 6 Monate, dann gestaffelte Kündigungsfristen. **Betriebsrat:** Ab 5 Wahlberechtigte, Mitbestimmung bei sozialen Angelegenheiten." 
      },
      { 
        front: "Datenschutz DSGVO", 
        back: "**Grundprinzipien:** Rechtmäßigkeit, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung. **Rechtsgrundlagen:** Art. 6 DSGVO - Einwilligung, Vertrag, berechtigtes Interesse, gesetzliche Verpflichtung. **Betroffenenrechte:** Auskunft, Berichtigung, Löschung, Einschränkung, Übertragbarkeit, Widerspruch. **IHK-Pflichten:** Datenschutzerklärung, Verarbeitungsverzeichnis, TOM (technische und organisatorische Maßnahmen). **Bußgelder:** Bis 4% Jahresumsatz oder 20 Mio. €." 
      },
      { 
        front: "Urheberrecht im IT-Bereich", 
        back: "**Schutzgegenstand:** Computerprogramme (§69a UrhG), Datenbanken (§87a UrhG), Webseiten-Design. **Entstehung:** Automatisch bei Schöpfung, keine Anmeldung nötig. **Schutzdauer:** 70 Jahre nach Tod des Urhebers, Software 70 Jahre ab Veröffentlichung. **IHK-Arbeitnehmerurheberrecht:** Rechte meist an Arbeitgeber (§69b UrhG). **Freie Software:** GPL, MIT, Apache Lizenzen. **Abmahnung:** Unterlassung, Auskunft, Schadensersatz." 
      },
      { 
        front: "Handelsrecht HGB", 
        back: "**Kaufmann:** Ist-, Kann-, Form-Kaufmann nach §1-6 HGB. **Handelsregister:** Eintragung mit Publizitätswirkung, elektronische Einsicht. **Prokura:** Generalvollmacht für alle Geschäfte (§48 HGB), nicht übertragbar. **Handelsgeschäfte:** §343 HGB - erleichterte Regelungen, kürzere Fristen. **IHK-Buchführung:** §238 HGB - ordnungsgemäße Buchführung, GoB (Grundsätze ordnungsgemäßer Buchführung). **Firmenrecht:** §17ff HGB - Firmenbestandteile, Firmenschutz." 
      },
      { 
        front: "Gesellschaftsrecht", 
        back: "**Personengesellschaften:** GbR (§705 BGB), OHG (§105 HGB), KG (§161 HGB) - persönliche Haftung. **Kapitalgesellschaften:** GmbH (GmbHG), AG (AktG) - Haftungsbeschränkung. **Organe GmbH:** Gesellschafterversammlung, Geschäftsführer, optional Aufsichtsrat. **IHK-Haftung:** Geschäftsführerhaftung bei Pflichtverletzung, Durchgriffshaftung. **Gesellschafterwechsel:** Abtretung Geschäftsanteile (§15 GmbHG), notarielle Beurkundung." 
      },
      { 
        front: "IT-Vertragsrecht", 
        back: "**Softwareentwicklungsvertrag:** Werk- oder Dienstvertrag, Abnahme erforderlich. **SaaS/Cloud:** Mietvertrag (§535 BGB) oder Dienstvertrag. **Lizenzvertrag:** Nutzungsrechte einräumen, nicht übertragen. **IHK-AGB-Kontrolle:** §305ff BGB bei Allgemeinen Geschäftsbedingungen. **Gewährleistung Software:** Mängelbeseitigung, Umgehungslösung, bei Fehlschlagen Rücktritt/Minderung. **Haftungsbeschränkung:** Möglich außer bei Vorsatz/grober Fahrlässigkeit." 
      },
      { 
        front: "Wettbewerbsrecht UWG", 
        back: "**Unlautere Geschäftspraktiken:** Irreführende Werbung, aggressive Praktiken, Rechtsbruch. **Mitbewerber:** Abmahnung, Unterlassung, Schadensersatz möglich. **Verbraucherschutz:** Besondere Regeln bei B2C-Geschäften. **IHK-Beispiele:** Vergleichende Werbung (erlaubt wenn sachlich), Lockvogelangebote (unzulässig), Mondpreise. **Online-Handel:** Preisangabenverordnung, Widerrufsrecht, Button-Lösung. **Influencer-Marketing:** Kennzeichnungspflicht bei Werbung." 
      },
      { 
        front: "Internetrecht aktuell", 
        back: "**Impressumspflicht:** TMG §5 für geschäftsmäßige Webseiten, Anbieterkennzeichnung. **Cookies:** Einwilligung erforderlich (ePrivacy), Cookie-Banner. **Telemediengesetz (TMG):** Haftung für eigene Inhalte, Haftungsprivilegierung für fremde Inhalte. **IHK-Domain-Recht:** Markenrechtsverletzung, Namensrecht, Cybersquatting. **Social Media:** Datenschutz, Urheberrecht bei geteilten Inhalten, Bewertungsrecht. **KI und Recht:** Haftung für KI-Entscheidungen, Datenschutz beim Training." 
      }
    ]
  },
  {
    type: "quiz",
    title: "Rechtliche Grundlagen Vertiefung",
    questions: [
      {
        question: "Wann kommt ein Vertrag zustande?",
        options: ["Bei Angebot", "Bei Annahme", "Bei Angebot und Annahme", "Bei Unterschrift"],
        correctIndex: 2,
        explanation: "Ein Vertrag kommt durch zwei übereinstimmende Willenserklärungen zustande: Angebot und Annahme (§§ 145, 147 BGB)."
      },
      {
        question: "Wie lange beträgt die Gewährleistungsfrist beim Kaufvertrag?",
        options: ["1 Jahr", "2 Jahre", "3 Jahre", "5 Jahre"],
        correctIndex: 1,
        explanation: "Die Gewährleistungsfrist beim Kaufvertrag beträgt grundsätzlich 2 Jahre ab Übergabe der Sache (§ 438 BGB)."
      },
      {
        question: "Ab wann greift das Kündigungsschutzgesetz?",
        options: ["Sofort", "Nach 3 Monaten", "Nach 6 Monaten", "Nach 1 Jahr"],
        correctIndex: 2,
        explanation: "Das KSchG greift nach 6 Monaten Betriebszugehörigkeit in Betrieben mit mehr als 10 Mitarbeitern (§ 1 KSchG)."
      },
      {
        question: "Welche Rechtsgrundlage ist KEINE DSGVO-Basis für Datenverarbeitung?",
        options: ["Einwilligung", "Vertrag", "Gewinnerzielung", "Berechtigtes Interesse"],
        correctIndex: 2,
        explanation: "Gewinnerzielung ist keine Rechtsgrundlage der DSGVO. Erlaubt sind u.a. Einwilligung, Vertrag, berechtigtes Interesse (Art. 6 DSGVO)."
      },
      {
        question: "Wann entsteht Urheberrechtsschutz?",
        options: ["Bei Anmeldung", "Bei Veröffentlichung", "Bei Schöpfung", "Bei Registrierung"],
        correctIndex: 2,
        explanation: "Urheberrechtsschutz entsteht automatisch mit der Schöpfung des Werkes, ohne Anmeldung oder Registrierung (§ 7 UrhG)."
      },
      {
        question: "Was ist eine Prokura?",
        options: ["Einfache Vollmacht", "Generalvollmacht für Handelsgeschäfte", "Bankvollmacht", "Gesellschaftsanteil"],
        correctIndex: 1,
        explanation: "Prokura ist eine Generalvollmacht für alle Arten von Handelsgeschäften (§ 49 HGB), aber nicht übertragbar."
      },
      {
        question: "Welche Gesellschaftsform hat beschränkte Haftung?",
        options: ["GbR", "OHG", "GmbH", "KG (Komplementäre)"],
        correctIndex: 2,
        explanation: "Die GmbH ist eine Kapitalgesellschaft mit auf das Gesellschaftsvermögen beschränkter Haftung."
      },
      {
        question: "Was ist bei Software-Lizenzverträgen zu beachten?",
        options: ["Eigentumsübertragung", "Nur Nutzungsrechte", "Automatische Verlängerung", "Keine Gewährleistung"],
        correctIndex: 1,
        explanation: "Bei Lizenzverträgen werden nur Nutzungsrechte eingeräumt, nicht das Eigentum an der Software übertragen."
      }
    ]
  },
  {
    type: "matching",
    title: "Rechtsbegriffe zuordnen",
    pairs: [
      { left: "§ 433 BGB", right: "Kaufvertrag" },
      { left: "§ 611a BGB", right: "Arbeitsvertrag" },
      { left: "Art. 6 DSGVO", right: "Rechtsgrundlagen Datenverarbeitung" },
      { left: "§ 69a UrhG", right: "Computerprogramme" },
      { left: "§ 48 HGB", right: "Prokura" },
      { left: "§ 5 TMG", right: "Impressumspflicht" },
      { left: "§ 305 BGB", right: "AGB-Kontrolle" },
      { left: "§ 1 KSchG", right: "Kündigungsschutz" }
    ]
  },
  {
    type: "dragdrop",
    title: "Rechtsgebiete und Beispiele",
    games: [
      {
        title: "Rechtsbereiche zuordnen",
        description: "Ordne die Rechtsbeispiele den entsprechenden Rechtsgebieten zu",
        items: [
          { id: "kauf1", content: "Laptop-Kauf online", category: "Kaufrecht" },
          { id: "kauf2", content: "Gewährleistung defekte Software", category: "Kaufrecht" },
          { id: "arbeit1", content: "Kündigung Arbeitnehmer", category: "Arbeitsrecht" },
          { id: "arbeit2", content: "Betriebsrat Mitbestimmung", category: "Arbeitsrecht" },
          { id: "daten1", content: "Cookie-Einwilligung", category: "Datenschutzrecht" },
          { id: "daten2", content: "Auskunftsrecht Verbraucher", category: "Datenschutzrecht" },
          { id: "urheber1", content: "Foto ohne Erlaubnis verwendet", category: "Urheberrecht" },
          { id: "urheber2", content: "Software-Code kopiert", category: "Urheberrecht" }
        ],
        categories: ["Kaufrecht", "Arbeitsrecht", "Datenschutzrecht", "Urheberrecht"]
      }
    ]
  }
];