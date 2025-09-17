import { LearnModule } from "../../types/learn";

export const mobileEntwicklungContent: LearnModule[] = [
  {
    type: "flashcards",
    title: "Mobile Development - Cross-Platform",
    cards: [
      { front: "React Native - Architektur", back: "**JavaScript Bridge:** JS-Code kommuniziert mit nativen Modulen über Bridge. **Metro Bundler:** JavaScript-Build-System. **Native Components:** UI-Elemente werden zu platform-spezifischen Views gemappt. **Hot Reloading:** Schnelle Entwicklung durch Live-Updates. **IHK-Vorteile:** Code-Sharing zwischen iOS/Android, kürzere Time-to-Market, Web-Entwickler können mobile Apps erstellen." },
      { front: "Flutter - Framework", back: "**Dart-Sprache:** Google's moderne OOP-Sprache mit Ahead-of-Time Compilation. **Widget Tree:** Alles ist ein Widget (Stateless/Stateful). **Skia Engine:** Eigene Rendering-Engine für konsistente UI. **Hot Reload:** Instant Updates während Entwicklung. **IHK-Performance:** Native Performance durch Compilation zu ARM/x64 Code. **Material/Cupertino:** Plattform-spezifische Design-Sprachen." },
      { front: "PWA (Progressive Web Apps)", back: "**Service Workers:** Background-Scripts für Offline-Funktionalität, Caching, Push-Notifications. **Web App Manifest:** JSON-Datei für Installation auf Homescreen. **HTTPS:** Sicherheitsvoraussetzung für PWA-Features. **Responsive Design:** Anpassung an verschiedene Bildschirmgrößen. **IHK-Vorteile:** Ein Code für Web + Mobile, App Store unabhängig, Updates ohne Approval-Prozess." },
      { front: "Native vs Cross-Platform Entscheidung", back: "**Native Vorteile:** Beste Performance, vollständiger Zugriff auf Platform-APIs, Platform-spezifische UX, neueste Features sofort verfügbar. **Cross-Platform Vorteile:** Schnellere Entwicklung, Code-Sharing, geringere Kosten, kleineres Entwicklerteam nötig. **IHK-Entscheidungskriterien:** Budget, Zeitplan, Performance-Anforderungen, Zielgruppe, Hardware-Features, Team-Skills." },
      { front: "Mobile Performance Optimization", back: "**Bundle Size:** Code-Splitting, Tree-Shaking, minification. **Memory Management:** Object pooling, Lazy Loading, Image compression. **Battery Life:** Reduzierte Background-Tasks, effiziente Algorithmen, GPS/Network sparsam nutzen. **60fps UI:** VSync beachten, Layout-Thrashing vermeiden, GPU-Acceleration. **IHK-Tools:** Profiler, Memory-Analyzer, Network-Monitor für Performance-Bottlenecks." },
      { front: "App Store Deployment", back: "**iOS:** Xcode, Apple Developer Account ($99/Jahr), App Store Review (1-7 Tage), TestFlight für Beta-Tests. **Android:** Android Studio, Google Play Console ($25 einmalig), Instant-Updates möglich, Play Console für Analytics. **Code Signing:** Certificates für iOS, Keystore für Android. **IHK-Compliance:** DSGVO, Platform Guidelines, Accessibility, Security Reviews." }
    ]
  },
  {
    type: "quiz",
    title: "Mobile Development Quiz",
    questions: [
      {
        question: "Welcher Hauptvorteil von React Native gegenüber nativer Entwicklung?",
        options: ["Bessere Performance", "Code-Sharing zwischen Plattformen", "Direkter Hardware-Zugriff", "Kleinere App-Größe"],
        correctIndex: 1,
        explanation: "React Native ermöglicht es, einen großen Teil des Codes zwischen iOS und Android zu teilen, was Entwicklungszeit und -kosten reduziert."
      },
      {
        question: "Was ist ein Service Worker in PWAs?",
        options: ["UI-Component", "Background-Script für Offline-Funktionalität", "Database-Connector", "Animation-Library"],
        correctIndex: 1,
        explanation: "Service Workers laufen im Hintergrund und ermöglichen Offline-Funktionalität, Caching und Push-Notifications in PWAs."
      },
      {
        question: "Welche Programmiersprache verwendet Flutter?",
        options: ["JavaScript", "Dart", "Swift", "Java"],
        correctIndex: 1,
        explanation: "Flutter verwendet Dart als Programmiersprache, die von Google entwickelt wurde und sich durch schnelle Compilation auszeichnet."
      },
      {
        question: "Was ist für PWAs zwingend erforderlich?",
        options: ["Native Module", "HTTPS", "App Store Approval", "Objective-C"],
        correctIndex: 1,
        explanation: "HTTPS ist eine Sicherheitsvoraussetzung für PWA-Features wie Service Workers und App-Installation."
      }
    ]
  },
  {
    type: "matching",
    title: "Mobile Frameworks zuordnen",
    pairs: [
      { left: "React Native", right: "JavaScript Bridge zu nativen Komponenten" },
      { left: "Flutter", right: "Dart-Sprache mit eigener Rendering-Engine" },
      { left: "PWA", right: "Service Workers für Offline-Funktionalität" },
      { left: "Xamarin", right: "C# Cross-Platform Framework" },
      { left: "Cordova/PhoneGap", right: "WebView-basierte Hybrid-Apps" },
      { left: "Ionic", right: "Web-Technologien mit nativen UI-Komponenten" }
    ]
  },
  {
    type: "scenario",
    title: "Mobile Development Entscheidungen",
    scenarios: [
      {
        title: "Startup-App Entwicklung",
        description: "Ein Startup benötigt schnell eine App für iOS und Android mit begrenztem Budget.",
        scenario: "Welche Technologie wählst du?",
        choices: [
          { text: "Separate native Apps entwickeln", consequence: "Hohe Kosten, längere Entwicklungszeit, aber beste Performance.", isCorrect: false },
          { text: "React Native für Code-Sharing", consequence: "Richtig: Kosteneffizient, schnellere Markteinführung, gut für MVP.", isCorrect: true },
          { text: "PWA statt native App", consequence: "Kann funktionieren, aber eingeschränkte native Features und App Store Präsenz.", isCorrect: false },
          { text: "Nur für eine Plattform entwickeln", consequence: "Schränkt Zielgruppe ein, verpasst potentielle Nutzer.", isCorrect: false }
        ]
      },
      {
        title: "Performance-kritische Gaming-App",
        description: "Entwicklung eines grafikintensiven Mobile-Spiels mit 60fps Anforderung.",
        scenario: "Welcher Ansatz ist optimal?",
        choices: [
          { text: "Native Entwicklung mit Swift/Kotlin", consequence: "Richtig: Beste Performance, direkter Zugriff auf Gaming-APIs und GPU.", isCorrect: true },
          { text: "Flutter mit Skia Rendering", consequence: "Gut möglich, aber für High-Performance Gaming nicht optimal.", isCorrect: false },
          { text: "React Native mit nativen Gaming-Modulen", consequence: "JavaScript Bridge könnte Performance-Bottleneck sein.", isCorrect: false },
          { text: "PWA mit WebGL", consequence: "Ungeeignet für grafikintensive Games mit hohen Performance-Anforderungen.", isCorrect: false }
        ]
      }
    ]
  }
];