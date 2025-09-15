import { LearnModule } from "../../types/learn";

export const betriebswirtschaftContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "Betriebswirtschaft Grundlagen - IHK Prüfungswissen",
    cards: [
      { 
        front: "Rechtsformen im Überblick", 
        back: "**Personengesellschaften:** GbR (unbeschränkte Haftung), OHG (Handelsgewerbe), KG (Komplementäre + Kommanditisten). **Kapitalgesellschaften:** GmbH (Stammkapital 25.000€), AG (Grundkapital 50.000€), UG (1€ Stammkapital). **IHK-Kriterien:** Haftung, Kapital, Führung, Steuerbelastung. **Mischformen:** GmbH & Co. KG kombiniert Vorteile. **Einzelunternehmen:** Vollhaftung, einfache Gründung." 
      },
      { 
        front: "Bilanz und GuV verstehen", 
        back: "**Bilanz:** Vermögen (Aktiva) = Kapital (Passiva) zum Stichtag. **Aktiva:** Anlagevermögen + Umlaufvermögen. **Passiva:** Eigenkapital + Fremdkapital. **GuV:** Aufwendungen und Erträge einer Periode. **IHK-Kennzahlen:** Eigenkapitalquote, Liquidität, Rentabilität. **HGB-Pflicht:** Kaufleute müssen ordnungsgemäße Bücher führen." 
      },
      { 
        front: "Kostenrechnung Grundlagen", 
        back: "**Kostenarten:** Material-, Personal-, Betriebsmittelkosten. **Kostenstellen:** Wo entstehen Kosten? (Produktion, Verwaltung, Vertrieb). **Kostenträger:** Wofür entstehen Kosten? (Produkte, Aufträge). **IHK-Kalkulationsverfahren:** Zuschlagskalkulation, Divisionskalkulation. **Deckungsbeitrag:** Erlös - variable Kosten = DB. **Break-Even-Point:** Fixkosten / DB je Stück." 
      },
      { 
        front: "Marketing-Mix 4P", 
        back: "**Product (Produkt):** Qualität, Design, Features, Service, Garantie. **Price (Preis):** Preisstrategien (Penetration, Skimming), Rabatte, Zahlungsbedingungen. **Place (Distribution):** Absatzwege (direkt/indirekt), Online/Offline, Logistik. **Promotion (Kommunikation):** Werbung, PR, Verkaufsförderung, persönlicher Verkauf. **IHK-Ziel:** Optimal abgestimmter Marketing-Mix für Zielgruppe." 
      },
      { 
        front: "Finanzierung und Investition", 
        back: "**Finanzierungsarten:** Innenfinanzierung (Gewinnthesaurierung, Abschreibungen), Außenfinanzierung (Eigenkapital, Fremdkapital). **Investitionsrechenverfahren:** Kapitalwertmethode (NPV), Interner Zinsfuß (IRR), Amortisationszeit. **IHK-Liquiditätsplanung:** Cash-Flow-Prognose, Working Capital Management. **Kreditarten:** Kontokorrent, Darlehen, Factoring, Leasing." 
      },
      { 
        front: "Personalwirtschaft", 
        back: "**Personalplanung:** Quantitativ (Anzahl) + Qualitativ (Kompetenzen). **Rekrutierung:** Intern (Beförderung) vs. Extern (Stellenausschreibung). **Personalentwicklung:** Training, Coaching, Job Rotation, Mentoring. **IHK-Arbeitsrecht:** Kündigungsschutz, Betriebsverfassung, Tarifrecht. **Entlohnung:** Fixgehalt, variable Komponenten, Benefits. **Performance Management:** Zielvereinbarungen, Beurteilungen." 
      },
      { 
        front: "Controlling und KPIs", 
        back: "**Strategisches Controlling:** Langfristige Planung, Balanced Scorecard. **Operatives Controlling:** Budget-/Ist-Vergleich, Abweichungsanalyse. **IHK-Kennzahlen:** ROI (Return on Investment), EBIT, Umsatzrentabilität. **Cash-Flow:** Operativ, Investitions-, Finanzierungs-CF. **Budgetierung:** Top-down vs. Bottom-up Planung. **Reporting:** Management Dashboard, Ausnahmeberichte." 
      },
      { 
        front: "Prozessmanagement", 
        back: "**Geschäftsprozesse:** Kernprozesse (Wertschöpfung), Supportprozesse (Unterstützung), Managementprozesse (Steuerung). **Prozessoptimierung:** PDCA-Zyklus, Lean Management, Six Sigma. **IHK-Dokumentation:** Prozesslandkarten, Ablaufdiagramme, Arbeitsanweisungen. **Digitalisierung:** Workflow-Management, RPA (Robotic Process Automation). **KPIs:** Durchlaufzeit, Qualitätsrate, Kosten pro Prozess." 
      },
      { 
        front: "Supply Chain Management", 
        back: "**Beschaffung:** Make-or-Buy-Entscheidungen, Lieferantenmanagement, strategisches Sourcing. **Lagerhaltung:** ABC-Analyse, Just-in-Time, Sicherheitsbestände. **Logistik:** Transport, Lagerung, Kommissionierung, Distribution. **IHK-Optimierung:** Gesamtkostenansatz, Servicelevel vs. Kosten. **Digitalisierung:** EDI, Track & Trace, IoT-Sensoren. **Nachhaltigkeit:** Green Logistics, CO2-Footprint." 
      },
      { 
        front: "Digitale Transformation", 
        back: "**Digitale Geschäftsmodelle:** Plattformen, Subscription, Freemium, Long Tail. **Technologie-Trends:** Cloud Computing, AI/ML, IoT, Blockchain. **Change Management:** Kulturwandel, Kompetenzaufbau, agile Organisation. **IHK-Herausforderungen:** Legacy-Systeme, Datenschutz, Cybersecurity. **Customer Experience:** Omnichannel, Personalisierung, Self-Service. **Datenanalyse:** Business Intelligence, Predictive Analytics." 
      }
    ]
  },
  {
    type: "quiz",
    title: "BWL Vertiefung - IHK Praxis",
    questions: [
      {
        question: "Welche Rechtsform hat unbeschränkte persönliche Haftung und erfordert kein Mindestkapital?",
        options: ["GmbH", "AG", "Einzelunternehmen", "UG"],
        correctIndex: 2,
        explanation: "Das Einzelunternehmen hat unbeschränkte persönliche Haftung und erfordert kein Mindestkapital, bietet aber auch keinen Haftungsschutz."
      },
      {
        question: "Was zeigt die Eigenkapitalquote an?",
        options: ["Liquidität des Unternehmens", "Verschuldungsgrad", "Finanzielle Stabilität", "Rentabilität"],
        correctIndex: 2,
        explanation: "Die Eigenkapitalquote (Eigenkapital/Gesamtkapital) zeigt die finanzielle Stabilität und Unabhängigkeit des Unternehmens."
      },
      {
        question: "Bei welchem Deckungsbeitrag ist der Break-Even-Point erreicht?",
        options: ["DB = Variable Kosten", "DB = Fixkosten", "DB = Gesamtkosten", "DB = Gewinn"],
        correctIndex: 1,
        explanation: "Der Break-Even-Point ist erreicht, wenn der Deckungsbeitrag genau die Fixkosten deckt (Gewinn = 0)."
      },
      {
        question: "Was gehört NICHT zum Marketing-Mix?",
        options: ["Product", "Process", "Price", "Promotion"],
        correctIndex: 1,
        explanation: "Der klassische Marketing-Mix besteht aus den 4P: Product, Price, Place, Promotion. Process gehört zu den erweiterten 7P."
      },
      {
        question: "Welche Finanzierungsart gehört zur Innenfinanzierung?",
        options: ["Bankkredit", "Gewinnthesaurierung", "Aktienemission", "Lieferantenkredit"],
        correctIndex: 1,
        explanation: "Gewinnthesaurierung (einbehaltene Gewinne) ist eine Form der Innenfinanzierung aus eigenen Mitteln."
      },
      {
        question: "Was misst der ROI (Return on Investment)?",
        options: ["Umsatzwachstum", "Rentabilität einer Investition", "Marktanteil", "Liquidität"],
        correctIndex: 1,
        explanation: "Der ROI misst die Rentabilität einer Investition: (Gewinn aus Investition / Investitionskosten) × 100."
      },
      {
        question: "Welcher Prozesstyp schafft direkten Kundennutzen?",
        options: ["Supportprozess", "Kernprozess", "Managementprozess", "Hilfsprozess"],
        correctIndex: 1,
        explanation: "Kernprozesse schaffen direkte Wertschöpfung und Kundennutzen (z.B. Produktion, Vertrieb)."
      },
      {
        question: "Was bedeutet ABC-Analyse in der Lagerhaltung?",
        options: ["Alphabetische Sortierung", "Kategorisierung nach Wertigkeit", "Qualitätskontrolle", "Lieferantenbewertung"],
        correctIndex: 1,
        explanation: "ABC-Analyse kategorisiert Artikel nach ihrer Wertigkeit: A-Artikel (hoher Wert), B-Artikel (mittlerer Wert), C-Artikel (geringer Wert)."
      }
    ]
  },
  {
    type: "memory",
    title: "BWL Memory-Spiel",
    games: [
      {
        title: "Betriebswirtschaftliche Begriffe",
        description: "Finde die zusammengehörigen BWL-Begriffe",
        pairs: [
          { id: "roi1", content: "ROI", match: "Return on Investment" },
          { id: "ebit1", content: "EBIT", match: "Earnings Before Interest and Taxes" },
          { id: "npv1", content: "NPV", match: "Net Present Value" },
          { id: "kpi1", content: "KPI", match: "Key Performance Indicator" },
          { id: "erp1", content: "ERP", match: "Enterprise Resource Planning" },
          { id: "crm1", content: "CRM", match: "Customer Relationship Management" },
          { id: "scm1", content: "SCM", match: "Supply Chain Management" },
          { id: "b2b1", content: "B2B", match: "Business to Business" }
        ]
      }
    ]
  },
  {
    type: "scenario",
    title: "BWL Praxisszenarien",
    scenarios: [
      {
        title: "Investitionsentscheidung",
        description: "Unternehmen muss zwischen Investitionsalternativen wählen",
        scenario: "Ein mittelständisches Unternehmen hat 500.000€ zur Verfügung und muss zwischen zwei Investitionen wählen: A) Neue Produktionslinie (ROI 12%, Amortisation 4 Jahre) oder B) Digitalisierungsprojekt (ROI 18%, Amortisation 6 Jahre). Welche Faktoren sind entscheidend?",
        choices: [
          { text: "Nur den höchsten ROI wählen", consequence: "**Zu eindimensional:** ROI allein berücksichtigt nicht Risiko, Liquidität und strategische Passung.", isCorrect: false },
          { text: "Strategische Ausrichtung, Risiko und Liquidität bewerten", consequence: "**Ganzheitlicher Ansatz:** Berücksichtigt alle relevanten Faktoren für nachhaltige Entscheidung.", isCorrect: true },
          { text: "Kürzeste Amortisationszeit wählen", consequence: "**Kurzsichtig:** Ignoriert langfristige Potenziale und strategische Vorteile.", isCorrect: false },
          { text: "Investition aufschieben", consequence: "**Verpasste Chance:** Ohne triftigen Grund verschenkt das Unternehmen Wachstumspotenzial.", isCorrect: false }
        ]
      }
    ]
  }
];