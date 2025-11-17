import { LearnModule } from "../../types/learn";

export const itSicherheitAdvancedContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "Advanced IT-Security - Penetration Testing & Incident Response",
    cards: [
      { front: "OWASP Top 10 - Web Application Security", back: "**A01 Broken Access Control:** Fehlende Autorisierung, Privilege Escalation. **A02 Cryptographic Failures:** Schwache Verschlüsselung, ungeschützte Daten. **A03 Injection:** SQL/NoSQL/Command/LDAP Injection. **A04 Insecure Design:** Fehlende Security-by-Design Prinzipien. **A05 Security Misconfiguration:** Default-Passwörter, unnötige Features. **IHK-Schutzmaßnahmen:** Input-Validierung, Prepared Statements, Principle of Least Privilege, Security Headers, regelmäßige Updates." },
      { front: "Penetration Testing Methodology", back: "**1. Reconnaissance:** Passive/Active Information Gathering, OSINT, Social Engineering. **2. Scanning:** Port-Scans, Vulnerability Assessment, Service Enumeration. **3. Exploitation:** Gaining Access, Privilege Escalation, Maintaining Access. **4. Post-Exploitation:** Data Exfiltration, Lateral Movement, Persistence. **5. Reporting:** Executive Summary, Technical Details, Remediation Recommendations. **IHK-Standards:** Schriftliche Genehmigung, Scoping, Non-Disclosure Agreements." },
      { front: "Incident Response Process (NIST)", back: "**1. Preparation:** IR-Team, Tools, Procedures, Communication-Plan. **2. Detection & Analysis:** SIEM-Alerts, Log-Analysis, IOCs (Indicators of Compromise). **3. Containment:** Incident isolieren, weitere Schäden verhindern. **4. Eradication:** Malware entfernen, Vulnerabilities patchen. **5. Recovery:** Systeme wiederherstellen, Monitoring verstärken. **6. Lessons Learned:** Post-Incident Review, Process-Improvements. **IHK-Metriken:** MTTD (Mean Time to Detection), MTTR (Mean Time to Response)." },
      { front: "Kryptographische Protokolle", back: "**TLS 1.3:** Perfect Forward Secrecy, 0-RTT, ChaCha20-Poly1305. **IPSec:** ESP (Encryption), AH (Authentication), IKE (Key Exchange). **SSH:** Asymmetrische Authentifizierung, Port-Forwarding, SFTP. **PKI (Public Key Infrastructure):** CA (Certificate Authority), CRL (Certificate Revocation List), OCSP. **IHK-Best Practices:** Starke Cipher Suites, Key-Rotation, Certificate Pinning, HSTS-Header für Web-Apps." },
      { front: "Zero Trust Architecture", back: "**Prinzipien:** Never Trust, Always Verify - kein implizites Vertrauen basierend auf Netzwerk-Location. **Identity-Centric:** Multi-Factor Authentication, Conditional Access, Identity Governance. **Micro-Segmentation:** Netzwerk in kleinste Segmente unterteilen, Lateral Movement verhindern. **Continuous Verification:** Laufende Risk-Assessments, Behavioral Analytics. **IHK-Technologien:** CASB (Cloud Access Security Broker), ZTNA (Zero Trust Network Access), SASE (Secure Access Service Edge)." },
      { front: "Cloud Security & DevSecOps", back: "**Shared Responsibility Model:** Provider (Infrastructure), Customer (Data, Identity, Applications). **Cloud-Native Security:** Container Security (Docker/Kubernetes), Serverless Security, API Security. **DevSecOps:** Security als Code, SAST/DAST-Integration, Infrastructure as Code Security. **IHK-Controls:** IAM (Identity & Access Management), Encryption at Rest/in Transit, Security Groups, VPC, Cloud Security Posture Management (CSPM). **Compliance:** SOC2, ISO27001, GDPR in Cloud-Umgebungen." }
    ]
  },
  {
    type: "quiz",
    title: "Advanced Security Quiz - Real-World Scenarios",
    questions: [
      {
        question: "Was ist das Hauptziel von Zero Trust Architecture?",
        options: ["Komplettes Vertrauen in interne Netzwerke", "Kein Vertrauen ohne Verifizierung", "Nur externe Bedrohungen abwehren", "Passwort-basierte Sicherheit"],
        correctIndex: 1,
        explanation: "Zero Trust basiert auf 'Never Trust, Always Verify' - kein automatisches Vertrauen basierend auf Netzwerk-Location."
      },
      {
        question: "Welche OWASP Top 10 Kategorie ist 2023 auf Platz 1?",
        options: ["Injection", "Broken Authentication", "Broken Access Control", "XSS"],
        correctIndex: 2,
        explanation: "Broken Access Control steht 2023 auf Platz 1 der OWASP Top 10, da fehlerhafte Autorisierung sehr häufig auftritt."
      },
      {
        question: "Was ist MTTR im Incident Response?",
        options: ["Mean Time to Recovery", "Maximum Time to Response", "Mean Time to Remediation", "Mean Time to Response"],
        correctIndex: 3,
        explanation: "MTTR steht für Mean Time to Response - die durchschnittliche Zeit von der Entdeckung bis zur ersten Reaktion auf einen Incident."
      },
      {
        question: "Welches Prinzip ist zentral für DevSecOps?",
        options: ["Security am Ende des Prozesses", "Security nur in Production", "Shift-Left Security", "Manuelles Security-Testing"],
        correctIndex: 2,
        explanation: "Shift-Left bedeutet Security-Testing und -Controls früh im Entwicklungsprozess zu integrieren."
      }
    ]
  }
];