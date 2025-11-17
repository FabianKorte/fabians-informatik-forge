import { LearnModule } from "../../types/learn";

export const innovationTrendsContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "Innovation & IT-Trends - IHK Zukunftswissen",
    cards: [
      { 
        front: "Künstliche Intelligenz (KI/AI)", 
        back: "**Machine Learning:** Algorithmen lernen aus Daten ohne explizite Programmierung. **Deep Learning:** Neuronale Netze mit vielen Schichten für komplexe Muster. **Anwendungen:** Bilderkennung, Sprachverarbeitung, Empfehlungssysteme, Chatbots. **IHK-Business Impact:** Automatisierung, Effizienzsteigerung, neue Geschäftsmodelle. **Herausforderungen:** Datenqualität, Bias, Transparenz, Arbeitsplätze. **Tools:** TensorFlow, PyTorch, OpenAI GPT." 
      },
      { 
        front: "Cloud Computing Evolution", 
        back: "**Multi-Cloud:** Nutzung mehrerer Cloud-Anbieter zur Risikominimierung. **Hybrid Cloud:** Kombination aus privater und öffentlicher Cloud. **Edge Computing:** Datenverarbeitung näher am Endnutzer. **IHK-Trends:** Serverless Computing (Function-as-a-Service), Container-Orchestrierung (Kubernetes). **Vorteile:** Skalierbarkeit, Kosteneinsparung, globale Verfügbarkeit. **Security:** Zero Trust, Cloud-native Security." 
      },
      { 
        front: "Internet of Things (IoT)", 
        back: "**Definition:** Vernetzung physischer Objekte mit Internet-Konnektivität. **Protokolle:** MQTT, CoAP, LoRaWAN für energieeffiziente Kommunikation. **Anwendungen:** Smart Home, Industry 4.0, Smart City, Wearables. **IHK-Herausforderungen:** Sicherheit, Datenmengen (Big Data), Interoperabilität. **Edge-AI:** KI-Verarbeitung direkt im IoT-Gerät. **5G-Integration:** Niedrige Latenz für Real-Time-Anwendungen." 
      },
      { 
        front: "Blockchain und Distributed Ledger", 
        back: "**Grundprinzip:** Dezentrale, unveränderliche Datenbank ohne zentrale Autorität. **Konsensalgorithmen:** Proof of Work, Proof of Stake, Practical Byzantine Fault Tolerance. **Anwendungen:** Kryptowährungen, Supply Chain, Smart Contracts, digitale Identitäten. **IHK-Potenziale:** Vertrauen ohne Intermediäre, Transparenz, Nachverfolgbarkeit. **Herausforderungen:** Energieverbrauch, Skalierbarkeit, Regulierung." 
      },
      { 
        front: "Quantum Computing", 
        back: "**Quantenbits (Qubits):** Superposition und Verschränkung ermöglichen parallele Berechnungen. **Quantenvorteil:** Exponentiell schnellere Lösung spezifischer Probleme. **Anwendungen:** Kryptographie-Breaking, Optimierung, Simulation, Machine Learning. **IHK-Auswirkungen:** Neue Verschlüsselungsverfahren nötig, Quantenkryptographie. **Aktueller Stand:** NISQ-Era (Noisy Intermediate-Scale Quantum), erste praktische Anwendungen." 
      },
      { 
        front: "Extended Reality (XR)", 
        back: "**Virtual Reality (VR):** Vollständig virtuelle Umgebung, Eintauchen. **Augmented Reality (AR):** Digitale Inhalte in realer Welt, Überlagerung. **Mixed Reality (MR):** Interaktion zwischen virtuellen und realen Objekten. **IHK-Anwendungen:** Training, Wartung, Design, Marketing, Remote Collaboration. **Technologien:** Head-Mounted Displays, Spatial Computing, Haptic Feedback." 
      },
      { 
        front: "Robotic Process Automation (RPA)", 
        back: "**Definition:** Software-Roboter automatisieren repetitive, regelbasierte Aufgaben. **Unterschied zu KI:** RPA folgt Regeln, KI lernt und entscheidet. **Anwendungen:** Datenerfassung, Rechnungsverarbeitung, Customer Service, Compliance. **IHK-Vorteile:** Kostensenkung, Fehlerreduzierung, 24/7-Verfügbarkeit. **Intelligent Automation:** RPA + KI für komplexere Automatisierung. **Tools:** UiPath, Blue Prism, Automation Anywhere." 
      },
      { 
        front: "Low-Code/No-Code Entwicklung", 
        back: "**Low-Code:** Visuelle Entwicklungsplattformen mit minimalem Code. **No-Code:** Anwendungsentwicklung ohne Programmierung. **Zielgruppe:** Citizen Developer, Business User. **IHK-Auswirkungen:** Schnellere Entwicklung, Demokratisierung, IT-Entlastung. **Grenzen:** Begrenzte Anpassbarkeit, Vendor Lock-in, Performance. **Plattformen:** Microsoft Power Platform, Salesforce Lightning, OutSystems." 
      },
      { 
        front: "Cybersecurity Evolution", 
        back: "**Zero Trust Architecture:** 'Never trust, always verify' - Kontinuierliche Verifikation. **AI-Powered Security:** Machine Learning für Threat Detection und Response. **Privacy by Design:** Datenschutz von Anfang an mitgedacht. **IHK-Trends:** SASE (Secure Access Service Edge), XDR (Extended Detection and Response). **Quantum-Safe Cryptography:** Vorbereitung auf Quantencomputer-Bedrohung. **Human Factor:** Security Awareness wichtiger denn je." 
      },
      { 
        front: "Sustainable IT (Green Computing)", 
        back: "**Energieeffizienz:** Optimierung von Hardware und Software für geringeren Verbrauch. **Carbon Footprint:** Messung und Reduzierung von CO₂-Emissionen in der IT. **Circular Economy:** Wiederverwertung und Refurbishment von IT-Hardware. **IHK-Strategien:** Green Cloud, energieeffiziente Rechenzentren, Remote Work. **Regulations:** EU Green Deal, Corporate Sustainability Reporting. **Metriken:** PUE (Power Usage Effectiveness), Carbon Intensity." 
      }
    ]
  },
  {
    type: "quiz", 
    title: "Innovation & Trends Verständnistest",
    questions: [
      {
        question: "Was ist der Hauptunterschied zwischen Machine Learning und Deep Learning?",
        options: ["Kein Unterschied", "Deep Learning nutzt neuronale Netze mit vielen Schichten", "Machine Learning ist schneller", "Deep Learning benötigt keine Daten"],
        correctIndex: 1,
        explanation: "Deep Learning ist eine Unterkategorie von Machine Learning, die neuronale Netze mit vielen Schichten (daher 'deep') verwendet."
      },
      {
        question: "Was bedeutet 'Edge Computing'?",
        options: ["Computing am Rande des Unternehmens", "Datenverarbeitung näher am Endnutzer", "Veraltete Technologie", "Nur für Gaming"],
        correctIndex: 1,
        explanation: "Edge Computing verlagert Datenverarbeitung näher zum Endnutzer/Endgerät, um Latenz zu reduzieren und Bandbreite zu sparen."
      },
      {
        question: "Welcher Konsensalgorithmus wird bei Bitcoin verwendet?",
        options: ["Proof of Stake", "Proof of Work", "Practical Byzantine Fault Tolerance", "Round Robin"],
        correctIndex: 1,
        explanation: "Bitcoin verwendet Proof of Work (PoW), bei dem Miner komplexe mathematische Probleme lösen müssen."
      },
      {
        question: "Was sind Qubits?",
        options: ["Normale Bits", "Quantenbits mit Superposition", "Fehlerhafte Bits", "Verschlüsselte Bits"],
        correctIndex: 1,
        explanation: "Qubits sind Quantenbits, die durch Superposition gleichzeitig 0 und 1 sein können, was parallele Berechnungen ermöglicht."
      },
      {
        question: "Was ist der Unterschied zwischen AR und VR?",
        options: ["Kein Unterschied", "AR überlagert digitale Inhalte auf die reale Welt", "VR ist billiger", "AR funktioniert nur auf Smartphones"],
        correctIndex: 1,
        explanation: "AR (Augmented Reality) überlagert digitale Inhalte auf die reale Welt, während VR eine vollständig virtuelle Umgebung schafft."
      },
      {
        question: "Was bedeutet 'Zero Trust' in der Cybersecurity?",
        options: ["Niemanden vertrauen", "Never trust, always verify", "Keine Passwörter verwenden", "Alles blockieren"],
        correctIndex: 1,
        explanation: "Zero Trust bedeutet 'Never trust, always verify' - kontinuierliche Überprüfung aller Zugriffe, unabhängig von der Quelle."
      },
      {
        question: "Was ist das Hauptziel von Sustainable IT?",
        options: ["Kostenreduzierung", "CO₂-Reduzierung und Umweltschutz", "Schnellere Computer", "Mehr Software"],
        correctIndex: 1,
        explanation: "Sustainable IT zielt darauf ab, den ökologischen Fußabdruck der IT zu reduzieren und umweltfreundlichere Technologien zu fördern."
      },
      {
        question: "Was automatisiert RPA hauptsächlich?",
        options: ["KI-Entscheidungen", "Repetitive, regelbasierte Aufgaben", "Kreative Prozesse", "Hardware-Installation"],
        correctIndex: 1,
        explanation: "RPA automatisiert repetitive, regelbasierte Aufgaben, die Menschen normalerweise am Computer ausführen würden."
      }
    ]
  }
];