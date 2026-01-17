import type { LearnModule } from "@/types/learn";

export const cloudAwsContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "Cloud-Grundlagen - IHK Prüfungswissen",
    cards: [
      { 
        front: "Cloud Service-Modelle (IaaS, PaaS, SaaS)", 
        back: "**IaaS (Infrastructure):** VMs, Netzwerk, Storage - Kunde verwaltet OS aufwärts. Beispiel: AWS EC2, Azure VMs. **PaaS (Platform):** Entwicklungsplattform, Kunde nur Code. Beispiel: Heroku, Google App Engine. **SaaS (Software):** Fertige Anwendung, keine Verwaltung. Beispiel: Office 365, Salesforce. **IHK-Wichtig:** Je höher im Stack, desto weniger Verwaltung." 
      },
      { 
        front: "Cloud Deployment-Modelle", 
        back: "**Public Cloud:** Ressourcen bei Anbieter, multi-tenant. **Private Cloud:** Dedizierte Infrastruktur, on-premise oder hosted. **Hybrid Cloud:** Kombination aus Public und Private. **Multi-Cloud:** Mehrere Public-Cloud-Anbieter. **IHK-Entscheidung:** Kosten vs. Kontrolle vs. Compliance." 
      },
      { 
        front: "Shared Responsibility Model", 
        back: "**Anbieter verantwortlich für:** Physische Sicherheit, Hardware, Netzwerk, Hypervisor. **Kunde verantwortlich für:** Daten, Zugriffsmanagement, OS-Updates (bei IaaS), Anwendungssicherheit. **IHK-Wichtig:** Verantwortung hängt vom Service-Modell ab - bei SaaS weniger Kundenverantwortung als bei IaaS." 
      },
      { 
        front: "Cloud-Vorteile", 
        back: "**Elastizität:** Ressourcen nach Bedarf skalieren. **Pay-as-you-go:** Nur zahlen was genutzt wird. **Globale Reichweite:** Regionen weltweit. **Hochverfügbarkeit:** Redundanz eingebaut. **Schnelle Bereitstellung:** Minuten statt Wochen. **IHK-Abwägung:** CapEx (Investition) → OpEx (Betriebskosten)." 
      },
      { 
        front: "Cloud-Risiken und Herausforderungen", 
        back: "**Datenschutz:** Wo liegen die Daten? DSGVO-Konformität. **Vendor Lock-in:** Abhängigkeit vom Anbieter. **Netzwerk-Abhängigkeit:** Internet-Ausfall = kein Zugriff. **Kosten-Kontrolle:** Unerwartete Kosten möglich. **IHK-Lösung:** Multi-Cloud-Strategie, Exit-Strategie, Kostenmonitoring." 
      }
    ]
  },
  {
    type: "quiz",
    title: "Cloud-Grundlagen Quiz",
    questions: [
      {
        question: "Welches Cloud-Modell bietet die wenigste Verwaltungsaufwand für den Kunden?",
        options: ["IaaS", "PaaS", "SaaS", "On-Premise"],
        correctIndex: 2
      },
      {
        question: "Bei welchem Modell ist der Kunde für das Betriebssystem verantwortlich?",
        options: ["SaaS", "PaaS", "IaaS", "Bei keinem"],
        correctIndex: 2
      },
      {
        question: "Was bedeutet 'Pay-as-you-go'?",
        options: ["Jährliche Vorauszahlung", "Zahlung nach tatsächlicher Nutzung", "Flatrate-Modell", "Einmalige Lizenzgebühr"],
        correctIndex: 1
      },
      {
        question: "Was ist KEIN Vorteil der Cloud?",
        options: ["Elastizität", "Globale Verfügbarkeit", "Garantierte niedrigere Kosten", "Schnelle Bereitstellung"],
        correctIndex: 2
      },
      {
        question: "Was versteht man unter Hybrid Cloud?",
        options: ["Nur Public Cloud nutzen", "Kombination aus Public und Private Cloud", "Nur Private Cloud nutzen", "Kein Internet benötigt"],
        correctIndex: 1
      }
    ]
  },
  {
    type: "flashcards",
    title: "AWS Core Services - CLF-C02 Vorbereitung",
    cards: [
      { 
        front: "AWS EC2 (Elastic Compute Cloud)", 
        back: "**Zweck:** Virtuelle Server in der Cloud. **Instance Types:** General Purpose, Compute, Memory, Storage optimized. **Pricing:** On-Demand, Reserved, Spot, Savings Plans. **AMI:** Amazon Machine Image - vorkonfiguriertes OS. **IHK/CLF:** Wichtigster Compute-Service, Pay-per-Hour." 
      },
      { 
        front: "AWS S3 (Simple Storage Service)", 
        back: "**Zweck:** Objekt-Storage, unbegrenzte Kapazität. **Storage Classes:** Standard, IA (Infrequent Access), Glacier (Archiv). **Konzepte:** Buckets (Container), Objects (Dateien), 11 Neunen Durability. **Anwendung:** Backup, Static Websites, Data Lakes. **CLF:** Günstig, skalierbar, hochverfügbar." 
      },
      { 
        front: "AWS VPC (Virtual Private Cloud)", 
        back: "**Zweck:** Isoliertes virtuelles Netzwerk in AWS. **Komponenten:** Subnets, Route Tables, Internet Gateway, NAT Gateway. **Sicherheit:** Security Groups (Stateful), NACLs (Stateless). **IHK-Analog:** Eigenes Rechenzentrum-Netzwerk in der Cloud." 
      },
      { 
        front: "AWS IAM (Identity & Access Management)", 
        back: "**Zweck:** Wer darf was in AWS tun. **Konzepte:** Users, Groups, Roles, Policies. **Best Practices:** Least Privilege, MFA aktivieren, Root-Account schützen. **Policies:** JSON-Dokumente mit Allow/Deny Statements. **CLF:** Kostenlos, aber fundamentaler Service." 
      },
      { 
        front: "AWS RDS (Relational Database Service)", 
        back: "**Zweck:** Managed relationale Datenbanken. **Engines:** MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Aurora. **Vorteile:** Automatische Backups, Patching, Multi-AZ für HA. **Aurora:** AWS-eigene DB, 5x schneller als MySQL. **CLF:** PaaS für Datenbanken." 
      },
      { 
        front: "AWS Lambda", 
        back: "**Zweck:** Serverless Computing - Code ohne Server verwalten. **Trigger:** API Gateway, S3, CloudWatch Events. **Pricing:** Pro Aufruf und Compute-Zeit. **Vorteile:** Keine Infrastruktur-Verwaltung, automatische Skalierung. **CLF:** Event-driven, pay-per-use, bis 15 Min Laufzeit." 
      },
      { 
        front: "AWS CloudFront", 
        back: "**Zweck:** Content Delivery Network (CDN). **Funktion:** Inhalte näher am User cachen. **Edge Locations:** 400+ weltweit. **Anwendung:** Websites, APIs, Video-Streaming. **Vorteile:** Niedrige Latenz, DDoS-Schutz inkludiert." 
      },
      { 
        front: "AWS Regionen und Availability Zones", 
        back: "**Region:** Geografisches Gebiet (Frankfurt, Ireland, etc.). **AZ:** Physisch getrennte Rechenzentren in Region (eu-central-1a, 1b, 1c). **Edge Location:** CDN-Standorte für CloudFront. **IHK-Wahl:** Region nach Latenz, Compliance, Service-Verfügbarkeit wählen." 
      }
    ]
  },
  {
    type: "quiz",
    title: "AWS Services Quiz",
    questions: [
      {
        question: "Welcher AWS-Service bietet virtuelle Server?",
        options: ["S3", "EC2", "RDS", "Lambda"],
        correctIndex: 1
      },
      {
        question: "Was ist der Hauptunterschied zwischen S3 Standard und S3 Glacier?",
        options: ["Bucket-Größe", "Abrufgeschwindigkeit und Kosten", "Regionen", "Verschlüsselung"],
        correctIndex: 1
      },
      {
        question: "Was verwaltet AWS IAM?",
        options: ["Virtuelle Server", "Speicherplatz", "Zugriffsrechte und Identitäten", "Datenbanken"],
        correctIndex: 2
      },
      {
        question: "Was ist eine Availability Zone?",
        options: ["Ein Land", "Ein physisch getrenntes Rechenzentrum innerhalb einer Region", "Eine Preiszone", "Ein Sicherheitsbereich"],
        correctIndex: 1
      },
      {
        question: "Welcher Service ist serverless und wird pro Aufruf bezahlt?",
        options: ["EC2", "RDS", "Lambda", "VPC"],
        correctIndex: 2
      },
      {
        question: "Was ist KEINE AWS-Datenbankengine in RDS?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "Aurora"],
        correctIndex: 2
      },
      {
        question: "Wofür steht CDN bei CloudFront?",
        options: ["Cloud Data Network", "Content Delivery Network", "Central Database Node", "Compute Distribution Network"],
        correctIndex: 1
      },
      {
        question: "Welche S3-Eigenschaft beschreibt '11 Neunen'?",
        options: ["Verfügbarkeit", "Durability (Haltbarkeit)", "Performance", "Preis"],
        correctIndex: 1
      }
    ]
  },
  {
    type: "flashcards",
    title: "AWS Sicherheit & Compliance",
    cards: [
      { 
        front: "AWS Security Groups vs. NACLs", 
        back: "**Security Groups:** Stateful (Rückverkehr automatisch erlaubt), auf Instance-Ebene, nur Allow-Regeln. **NACLs:** Stateless (Regeln für beide Richtungen nötig), auf Subnet-Ebene, Allow und Deny. **IHK-Merksatz:** SG = Firewall für Server, NACL = Firewall für Netzwerk." 
      },
      { 
        front: "AWS Compliance & Zertifizierungen", 
        back: "**Standards:** ISO 27001, SOC 1/2/3, PCI DSS, HIPAA, DSGVO-konform. **AWS Artifact:** Download von Compliance-Berichten. **Shared Responsibility:** AWS Infrastruktur zertifiziert, Kunde verantwortlich für eigene Workloads. **CLF:** AWS hat die meisten Compliance-Zertifikate." 
      },
      { 
        front: "AWS KMS (Key Management Service)", 
        back: "**Zweck:** Verschlüsselungsschlüssel verwalten. **CMK:** Customer Master Keys - können eigene oder AWS-verwaltete sein. **Integration:** S3, EBS, RDS - Verschlüsselung mit einem Klick. **Best Practice:** Für sensible Daten immer Encryption at Rest aktivieren." 
      },
      { 
        front: "AWS CloudTrail", 
        back: "**Zweck:** API-Logging - Wer hat wann was getan. **Aufzeichnung:** Alle Management- und Daten-Events möglich. **Speicherung:** Logs in S3, Analyse mit Athena. **IHK-Wichtig:** Audit-Trail für Compliance, Forensik, Troubleshooting." 
      },
      { 
        front: "AWS Shield & WAF", 
        back: "**Shield Standard:** Kostenloser DDoS-Schutz für alle AWS-Kunden. **Shield Advanced:** Erweiterter Schutz, 24/7 Support, Kostenschutz. **WAF:** Web Application Firewall - Schutz vor SQL Injection, XSS. **CLF:** Shield Standard ist automatisch aktiv." 
      }
    ]
  },
  {
    type: "quiz",
    title: "AWS Sicherheit Quiz",
    questions: [
      {
        question: "Was ist der Hauptunterschied zwischen Security Groups und NACLs?",
        options: ["SGs sind teurer", "SGs sind stateful, NACLs stateless", "NACLs sind auf Instance-Ebene", "SGs erlauben Deny-Regeln"],
        correctIndex: 1
      },
      {
        question: "Welcher Service protokolliert alle AWS API-Aufrufe?",
        options: ["CloudWatch", "CloudTrail", "X-Ray", "Inspector"],
        correctIndex: 1
      },
      {
        question: "Was bietet AWS Shield Standard?",
        options: ["Erweiterten Support", "Kostenlosen DDoS-Basis-Schutz", "Verschlüsselung", "Backup"],
        correctIndex: 1
      },
      {
        question: "Wofür wird AWS KMS verwendet?",
        options: ["Monitoring", "Schlüsselverwaltung", "Load Balancing", "DNS"],
        correctIndex: 1
      },
      {
        question: "Wo findet man AWS Compliance-Berichte?",
        options: ["AWS Console", "AWS Artifact", "AWS Config", "AWS Inspector"],
        correctIndex: 1
      }
    ]
  },
  {
    type: "flashcards",
    title: "AWS Pricing & Support",
    cards: [
      { 
        front: "AWS Preismodelle EC2", 
        back: "**On-Demand:** Keine Vorauszahlung, flexibel, höchster Preis. **Reserved:** 1-3 Jahre Commitment, bis 72% Rabatt. **Spot:** Ungenutzte Kapazität, bis 90% Rabatt, kann unterbrochen werden. **Savings Plans:** Flexible Reserved-Alternative. **CLF:** Right-Sizing und Spot für Kostenoptimierung." 
      },
      { 
        front: "AWS Free Tier", 
        back: "**12 Monate kostenlos:** EC2 (750h t2.micro), S3 (5GB), RDS (750h). **Immer kostenlos:** Lambda (1M Requests), DynamoDB (25GB), SNS. **Hinweis:** Nur in bestimmten Regionen, Limits beachten. **CLF-Tipp:** Für Prüfungsvorbereitung perfekt nutzbar." 
      },
      { 
        front: "AWS Support-Pläne", 
        back: "**Basic:** Kostenlos, nur Dokumentation und Foren. **Developer:** Ab 29$/Monat, Business-Hours Support. **Business:** Ab 100$/Monat, 24/7, 1h Reaktion bei Production Down. **Enterprise:** Ab 15.000$/Monat, TAM, 15min Reaktion bei Critical. **CLF:** Business für Produktion empfohlen." 
      },
      { 
        front: "AWS Cost Management Tools", 
        back: "**Cost Explorer:** Kosten visualisieren und analysieren. **Budgets:** Alarme bei Kostenüberschreitung. **Cost and Usage Report:** Detaillierte CSV-Reports. **Trusted Advisor:** Optimierungsempfehlungen. **CLF:** Budgets einrichten ist Best Practice!" 
      },
      { 
        front: "TCO Calculator & Pricing Calculator", 
        back: "**TCO Calculator:** Vergleich On-Premise vs. AWS Kosten. **Pricing Calculator:** Schätzung monatlicher AWS-Kosten. **Migration Evaluator:** Datengestützte Migration-Analyse. **IHK-Anwendung:** Business Case für Cloud-Migration erstellen." 
      }
    ]
  },
  {
    type: "quiz",
    title: "AWS Pricing Quiz",
    questions: [
      {
        question: "Welches EC2-Preismodell bietet den höchsten Rabatt, kann aber unterbrochen werden?",
        options: ["On-Demand", "Reserved", "Spot", "Dedicated"],
        correctIndex: 2
      },
      {
        question: "Wie lange gilt der AWS Free Tier für EC2?",
        options: ["Unbegrenzt", "6 Monate", "12 Monate", "24 Monate"],
        correctIndex: 2
      },
      {
        question: "Welcher Support-Plan bietet einen Technical Account Manager (TAM)?",
        options: ["Basic", "Developer", "Business", "Enterprise"],
        correctIndex: 3
      },
      {
        question: "Welches Tool warnt bei Kostenüberschreitung?",
        options: ["Cost Explorer", "AWS Budgets", "Trusted Advisor", "CloudWatch"],
        correctIndex: 1
      },
      {
        question: "Was vergleicht der TCO Calculator?",
        options: ["AWS-Regionen", "On-Premise vs. Cloud Kosten", "EC2 Instance-Typen", "Support-Pläne"],
        correctIndex: 1
      }
    ]
  }
];
