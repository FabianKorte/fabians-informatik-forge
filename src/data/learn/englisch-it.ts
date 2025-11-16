import { LearnModule } from "../../types/learn";

export const englischItContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "English for IT Professionals - IHK Vocabulary",
    cards: [
      { 
        front: "Software Development Lifecycle (SDLC)", 
        back: "**Planning:** Requirements gathering, feasibility study. **Analysis:** System design, architecture planning. **Implementation:** Coding, programming, development. **Testing:** Unit testing, integration testing, system testing. **Deployment:** Release, rollout, go-live. **Maintenance:** Bug fixes, updates, enhancements. **IHK Phrases:** 'We follow agile methodology', 'The sprint backlog contains user stories', 'Code review ensures quality'." 
      },
      { 
        front: "Database Terminology", 
        back: "**Table:** Collection of related data records. **Primary Key:** Unique identifier for table records. **Foreign Key:** Reference to primary key in another table. **Query:** Request for data from database. **Index:** Performance optimization structure. **Backup/Restore:** Data protection and recovery. **IHK Communication:** 'The database schema needs normalization', 'We perform regular backups', 'Query optimization improved performance by 40%'." 
      },
      { 
        front: "Network and Security", 
        back: "**Firewall:** Network security barrier. **Encryption:** Data protection through coding. **Authentication:** User identity verification. **Authorization:** Access permission control. **VPN (Virtual Private Network):** Secure remote connection. **SSL/TLS:** Secure data transmission protocols. **IHK Scenarios:** 'Implement two-factor authentication', 'The firewall blocks malicious traffic', 'Data encryption meets compliance requirements'." 
      },
      { 
        front: "Project Management English", 
        back: "**Milestone:** Key project checkpoint. **Deliverable:** Project output or result. **Stakeholder:** Anyone affected by the project. **Timeline:** Project schedule and deadlines. **Budget:** Financial resources allocation. **Risk Assessment:** Potential problem identification. **IHK Presentations:** 'We're on track to meet the deadline', 'Budget overrun requires management approval', 'Stakeholder buy-in is crucial for success'." 
      },
      { 
        front: "Cloud Computing Terms", 
        back: "**SaaS (Software as a Service):** Cloud-based software applications. **PaaS (Platform as a Service):** Development platform in the cloud. **IaaS (Infrastructure as a Service):** Virtual computing resources. **Scalability:** Ability to handle increased workload. **Load Balancing:** Distributing work across multiple servers. **IHK Benefits:** 'Cloud migration reduces operational costs', 'Auto-scaling handles traffic spikes', 'Multi-cloud strategy ensures redundancy'." 
      },
      { 
        front: "Troubleshooting and Support", 
        back: "**Bug:** Software error or defect. **Patch:** Small software update fixing issues. **Workaround:** Temporary solution to problem. **Root Cause Analysis:** Finding the underlying problem source. **Incident:** Unplanned service interruption. **Resolution:** Problem solution implementation. **IHK Support Phrases:** 'We've identified the root cause', 'A temporary workaround is available', 'The patch resolves the security vulnerability'." 
      },
      { 
        front: "Business Intelligence & Analytics", 
        back: "**Dashboard:** Visual data presentation interface. **KPI (Key Performance Indicator):** Business success metrics. **Data Mining:** Pattern discovery in large datasets. **Machine Learning:** AI system that learns from data. **Visualization:** Graphical data representation. **Reporting:** Regular data analysis summaries. **IHK Implementation:** 'The dashboard shows real-time metrics', 'Machine learning improves prediction accuracy', 'Data visualization reveals hidden trends'." 
      },
      { 
        front: "Customer Communication", 
        back: "**Requirements:** Customer needs and specifications. **Feedback:** Customer input and evaluation. **Implementation:** Putting the solution into practice. **Customization:** Tailoring software to specific needs. **Training:** Teaching users how to use the system. **Support:** Ongoing assistance and maintenance. **IHK Service:** 'We gather requirements through workshops', 'User feedback drives our development priorities', 'Comprehensive training ensures user adoption'." 
      },
      { 
        front: "Meetings and Presentations", 
        back: "**Agenda:** Meeting topics and schedule. **Minutes:** Meeting notes and decisions. **Action Items:** Tasks assigned during meetings. **Follow-up:** Subsequent actions after meetings. **Presentation:** Formal information delivery. **Q&A (Questions & Answers):** Interactive discussion period. **IHK Professional Phrases:** 'Let's review the action items', 'I'll send out the meeting minutes', 'Any questions before we wrap up?'." 
      },
      { 
        front: "Technical Documentation", 
        back: "**Specification:** Detailed technical requirements. **Manual:** User instruction guide. **API Documentation:** Programming interface guide. **Best Practices:** Recommended methods and approaches. **Standards:** Industry-accepted guidelines. **Compliance:** Meeting regulatory requirements. **IHK Documentation:** 'The technical specification is comprehensive', 'User manual includes step-by-step instructions', 'We follow industry best practices for security'." 
      }
    ]
  },
  {
    type: "quiz",
    title: "IT English Comprehension Test",
    questions: [
      {
        question: "What does API stand for?",
        options: ["Application Programming Interface", "Advanced Program Integration", "Automated Process Implementation", "Application Process Interface"],
        correctIndex: 0,
        explanation: "API stands for Application Programming Interface - a set of protocols and tools for building software applications."
      },
      {
        question: "Which term describes finding patterns in large datasets?",
        options: ["Data Mining", "Data Cleaning", "Data Storage", "Data Transfer"],
        correctIndex: 0,
        explanation: "Data Mining is the process of discovering patterns, correlations, and insights from large amounts of data."
      },
      {
        question: "What is a 'milestone' in project management?",
        options: ["A distance marker", "A key project checkpoint", "A team meeting", "A budget limit"],
        correctIndex: 1,
        explanation: "A milestone is a significant point or event in a project that marks the completion of a major phase or deliverable."
      },
      {
        question: "SaaS stands for:",
        options: ["System as a Service", "Software as a Service", "Security as a Service", "Storage as a Service"],
        correctIndex: 1,
        explanation: "SaaS (Software as a Service) delivers software applications over the internet on a subscription basis."
      },
      {
        question: "What is 'root cause analysis'?",
        options: ["Plant biology study", "Finding the underlying problem source", "Database optimization", "Network troubleshooting"],
        correctIndex: 1,
        explanation: "Root cause analysis is a method for identifying the fundamental reason behind a problem or incident."
      },
      {
        question: "Which phrase is most professional for delaying a deadline?",
        options: ["We can't do it", "It's impossible", "We need to reassess the timeline", "Too much work"],
        correctIndex: 2,
        explanation: "'We need to reassess the timeline' is professional and suggests problem-solving rather than simply refusing."
      },
      {
        question: "What does 'scalability' mean in IT?",
        options: ["System weight", "Ability to handle increased workload", "User interface size", "Data compression"],
        correctIndex: 1,
        explanation: "Scalability refers to a system's ability to handle increased workload or user demand efficiently."
      },
      {
        question: "A 'stakeholder' is:",
        options: ["A company investor only", "Anyone affected by the project", "The project manager", "A software developer"],
        correctIndex: 1,
        explanation: "A stakeholder is anyone who has an interest in or is affected by a project, including users, customers, sponsors, and team members."
      }
    ]
  }
];
      { left: "SDLC", right: "Software Development Lifecycle" },
      { left: "VPN", right: "Virtual Private Network" },
      { left: "KPI", right: "Key Performance Indicator" },
      { left: "SQL", right: "Structured Query Language" },
      { left: "UI", right: "User Interface" },
      { left: "UX", right: "User Experience" },
      { left: "SSL", right: "Secure Sockets Layer" },
      { left: "CRM", right: "Customer Relationship Management" }
    ]
  },
  {
    type: "scenario",
    title: "Business Communication Scenarios",
    scenarios: [
      {
        title: "Client Meeting Presentation",
        description: "Present project status to international clients",
        scenario: "You need to present a delayed software project to international clients. The project is 2 weeks behind schedule due to unexpected technical challenges. The clients are concerned about their go-live date. How do you communicate professionally?",
        choices: [
          { text: "It's not our fault, the requirements changed", consequence: "**Unprofessional:** Blame-shifting damages client relationships and shows no accountability.", isCorrect: false },
          { text: "We encountered technical challenges, here's our recovery plan", consequence: "**Professional approach:** Shows accountability, focuses on solutions, and rebuilds confidence.", isCorrect: true },
          { text: "Everything will be fine, don't worry", consequence: "**Dismissive:** Minimizes client concerns and doesn't address the real issues.", isCorrect: false },
          { text: "We need more money to fix this", consequence: "**Poor timing:** Asking for more budget without explaining value or alternatives is inappropriate.", isCorrect: false }
        ]
      }
    ]
  },
  {
    type: "dragdrop",
    title: "Email Structure",
    games: [
      {
        title: "Professional Email Components",
        description: "Arrange the email parts in the correct order for professional business communication",
        items: [
          { id: "subject", content: "Clear, specific subject line", category: "Email Structure" },
          { id: "greeting", content: "Professional greeting (Dear Mr./Ms.)", category: "Email Structure" },
          { id: "purpose", content: "State the purpose clearly", category: "Email Structure" },
          { id: "details", content: "Provide necessary details", category: "Email Structure" },
          { id: "action", content: "Clear call to action/next steps", category: "Email Structure" },
          { id: "closing", content: "Professional closing (Best regards)", category: "Email Structure" },
          { id: "signature", content: "Full contact information", category: "Email Structure" }
        ],
        categories: ["Email Structure"]
      }
    ]
  }
];