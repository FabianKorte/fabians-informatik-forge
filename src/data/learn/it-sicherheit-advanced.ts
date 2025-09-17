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
  },
  {
    type: "code",
    title: "Security Code Challenges",
    challenges: [
      {
        title: "SQL Injection Prevention",
        description: "Sichere eine SQL-Abfrage gegen Injection-Angriffe ab",
        initialCode: `// Unsichere SQL-Abfrage
function getUserData(userId) {
  const query = "SELECT * FROM users WHERE id = " + userId;
  return database.query(query);
}
// TODO: Sichere Version implementieren`,
        solution: `// Sichere SQL-Abfrage mit Prepared Statements
function getUserData(userId) {
  // Input-Validierung
  if (!userId || typeof userId !== 'number' || userId <= 0) {
    throw new Error('Invalid user ID');
  }
  
  // Prepared Statement verwenden
  const query = "SELECT id, username, email FROM users WHERE id = ?";
  return database.prepare(query).get(userId);
}

// Alternative mit Parameterized Query
async function getUserDataAsync(userId) {
  const query = "SELECT id, username, email FROM users WHERE id = $1";
  return await database.query(query, [userId]);
}`,
        tests: [
          { input: "getUserData(1)", expected: "Sichere Abfrage ohne Injection-Risk" },
          { input: "getUserData('1; DROP TABLE users;')", expected: "Input-Validierung verhindert Angriff" }
        ]
      },
      {
        title: "XSS Prevention",
        description: "Implementiere XSS-Schutz für User-Generated Content",
        initialCode: `// Unsichere HTML-Ausgabe
function displayMessage(message) {
  document.innerHTML = "<p>" + message + "</p>";
}
// TODO: XSS-sichere Version`,
        solution: `// XSS-sichere HTML-Ausgabe
function displayMessage(message) {
  // HTML-Encoding für gefährliche Zeichen
  const sanitizedMessage = escapeHtml(message);
  
  // Sicherer DOM-Zugriff
  const paragraph = document.createElement('p');
  paragraph.textContent = sanitizedMessage; // Verwendet textContent statt innerHTML
  document.getElementById('messages').appendChild(paragraph);
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Mit Content Security Policy Header
// Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'`,
        tests: [
          { input: "displayMessage('Hello World')", expected: "Normaler Text wird korrekt angezeigt" },
          { input: "displayMessage('<script>alert(\"XSS\")</script>')", expected: "Script-Tags werden escaped und nicht ausgeführt" }
        ]
      }
    ]
  },
  {
    type: "scenario",
    title: "Security Incident Response",
    scenarios: [
      {
        title: "Ransomware-Angriff",
        description: "Das Unternehmen wurde von Ransomware angegriffen. Mehrere Server sind verschlüsselt.",
        scenario: "Welche ist die richtige erste Maßnahme?",
        choices: [
          { text: "Sofort Lösegeld zahlen", consequence: "Falsch: Keine Garantie für Entschlüsselung, finanziert weitere Angriffe.", isCorrect: false },
          { text: "Betroffene Systeme vom Netzwerk isolieren", consequence: "Richtig: Verhindert weitere Ausbreitung der Ransomware im Netzwerk.", isCorrect: true },
          { text: "Systeme neustarten und hoffen", consequence: "Verschlechtert oft die Situation, Daten können verloren gehen.", isCorrect: false },
          { text: "Nichts tun und abwarten", consequence: "Ransomware breitet sich weiter aus, Schaden wird größer.", isCorrect: false }
        ]
      },
      {
        title: "Data Breach Discovery",
        description: "Ihr SIEM-System meldet verdächtige Datenübertragungen aus der Kunden-Datenbank.",
        scenario: "Wie gehst du vor?",
        choices: [
          { text: "Erstmal intern klären, bevor externe informiert werden", consequence: "Kann rechtliche Probleme verursachen, DSGVO verlangt schnelle Meldung.", isCorrect: false },
          { text: "Incident Response Team aktivieren und Forensik starten", consequence: "Richtig: Systematisches Vorgehen, Beweise sichern, Timeline erstellen.", isCorrect: true },
          { text: "Problem vor Öffentlichkeit verheimlichen", consequence: "Illegal und ethisch falsch, führt zu größeren Problemen später.", isCorrect: false },
          { text: "Alle Systeme sofort abschalten", consequence: "Kann nötig sein, aber erst nach gezielter Analyse der betroffenen Systeme.", isCorrect: false }
        ]
      }
    ]
  }
];