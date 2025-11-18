import { LearnModule, InteractiveTrainingModule } from "../../types/learn";

const interactiveTrainingModule: InteractiveTrainingModule = {
  type: "interactive",
  title: "Web-Entwicklung Interaktives Training",
  tasks: [
    {
      id: "web-responsive-css",
      taskText: "Du entwickelst eine responsive Website. Erstelle einen CSS-Code, der ein Div-Element auf Desktop-Geräten (min-width: 768px) eine Breite von 50% gibt und auf mobilen Geräten 100% Breite.",
      difficulty: "mittel",
      taskType: "code-complete",
      category: "Webentwicklung",
      inputFormat: "code",
      tools: ["CSS-Editor", "Browser DevTools", "Responsive Design Guide"],
      infoTexts: ["Media Queries ermöglichen responsive Designs", "Mobile-First Ansatz ist Best Practice", "Breakpoints: 768px für Tablets, 1024px für Desktop"],
      helpButtons: [
        { label: "Media Query Syntax", content: "@media (min-width: 768px) { }" },
        { label: "CSS Eigenschaften", content: "width: 50%; für Desktop, width: 100%; für Mobile" }
      ],
      gamification: {
        points: 35,
        level: 2,
        badge: "Responsive Designer",
        timeLimit: 300
      },
      adaptiveHelp: {
        hintsAfterFailures: 2,
        hints: ["Verwende @media (min-width: 768px) für Desktop", "Mobile-First: Erst mobile Styles, dann Desktop"]
      },
      expectedSolution: [
        ".container { width: 100%; } @media (min-width: 768px) { .container { width: 50%; } }",
        ".container{width:100%;}@media(min-width:768px){.container{width:50%;}}"
      ],
      feedback: {
        correct: "Perfekt! Du hast responsive CSS korrekt implementiert.",
        incorrect: "Prüfe die Media Query Syntax und die Reihenfolge der CSS-Regeln.",
        commonMistakes: ["Max-width statt min-width verwendet", "Desktop-Styles nicht in Media Query"]
      }
    },
    {
      id: "web-performance-optimization",
      taskText: "Eine Website lädt langsam. Du analysierst die Performance und stellst fest, dass JavaScript-Dateien das Rendering blockieren. Finde den Fehler in diesem HTML-Code: <script src='app.js'></script> <script src='analytics.js'></script>",
      difficulty: "schwer",
      taskType: "error-finding",
      category: "Webentwicklung",
      inputFormat: "text",
      tools: ["Browser DevTools", "Performance Analyzer", "HTML Validator"],
      infoTexts: ["Async und defer Attribute verhindern Rendering-Blockierung", "Kritische Scripts sollten inline oder defer haben", "Analytics kann async geladen werden"],
      helpButtons: [
        { label: "Script Loading", content: "async für unabhängige Scripts, defer für DOM-abhängige" },
        { label: "Performance Tipps", content: "Analytics immer async laden" }
      ],
      gamification: {
        points: 40,
        level: 3,
        badge: "Performance Expert",
        timeLimit: 180
      },
      adaptiveHelp: {
        hintsAfterFailures: 2,
        hints: ["Scripts ohne async/defer blockieren das Rendering", "Analytics-Scripts sollten async geladen werden"]
      },
      expectedSolution: ["async oder defer Attribute fehlen", "Fehlende async/defer Attribute", "Rendering-blockierende Scripts"],
      feedback: {
        correct: "Richtig! Die Scripts benötigen async oder defer Attribute für bessere Performance.",
        incorrect: "Denke an die Script-Loading-Strategien. Welche Attribute verbessern die Performance?",
        commonMistakes: ["Nur auf JavaScript-Syntax geachtet", "Performance-Aspekte übersehen"]
      }
    }
  ]
};

export const webentwicklungContent: LearnModule[] = [
  interactiveTrainingModule,
  {
    type: "flashcards",
    title: "HTML5 Grundlagen - IHK Prüfungswissen",
    cards: [
      { 
        front: "HTML5 Semantic Elements", 
        back: "**Neue semantische Elemente:** <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>, <figure>, <figcaption>. **IHK-Vorteile:** Bessere SEO, Accessibility, Code-Struktur. **Screen Reader:** Unterstützung für sehbehinderte Nutzer. **Search Engines:** Verstehen Inhalt besser. **Beispiel:** <article> für Blog-Posts, <aside> für Seitenleisten. **Abwärtskompatibilität:** Fallback für ältere Browser mit CSS/JavaScript." 
      },
      { 
        front: "CSS Grid vs. Flexbox", 
        back: "**Flexbox:** 1D-Layout (Zeile oder Spalte), ideal für Navigation, Buttons, kleinere Komponenten. **Eigenschaften:** justify-content, align-items, flex-grow. **CSS Grid:** 2D-Layout (Zeilen und Spalten), perfekt für komplexe Layouts, ganze Seiten. **Eigenschaften:** grid-template, grid-area, fr-Einheiten. **IHK-Anwendung:** Flexbox für Komponenten, Grid für Seitenlayout. **Browser-Support:** Beide modern unterstützt." 
      },
      { 
        front: "JavaScript ES6+ Features", 
        back: "**let/const:** Block-Scoped Variablen statt var. **Arrow Functions:** () => {} kompaktere Syntax. **Template Literals:** `Hello ${name}` für String-Interpolation. **Destructuring:** const {name, age} = person. **Modules:** import/export für Code-Organisation. **Promises/async-await:** Asynchrone Programmierung ohne Callback-Hell. **Classes:** class Person {} für OOP-Syntax. **IHK-Bedeutung:** Moderne JavaScript-Entwicklung, bessere Code-Qualität." 
      },
      { 
        front: "Responsive Design Prinzipien", 
        back: "**Mobile First:** Design beginnt mit kleinsten Bildschirmen. **Breakpoints:** Typisch 576px (sm), 768px (md), 992px (lg), 1200px (xl). **Fluid Grid:** Prozentuale statt feste Breiten. **Flexible Images:** max-width: 100% für Anpassung. **Media Queries:** @media (min-width: 768px) für conditional CSS. **IHK-Testing:** Verschiedene Geräte und Bildschirmgrößen testen. **Performance:** Bilder optimieren, CSS/JS minifizieren." 
      },
      { 
        front: "Web API und AJAX", 
        back: "**XMLHttpRequest:** Legacy-Method für HTTP-Requests. **Fetch API:** Moderne Promise-basierte Alternative. **RESTful APIs:** GET, POST, PUT, DELETE für CRUD-Operationen. **JSON:** Standard-Datenformat für Web-APIs. **CORS:** Cross-Origin Resource Sharing für Sicherheit. **IHK-Fehlerbehandlung:** try-catch für async/await, .catch() für Promises. **Status Codes:** 200 OK, 404 Not Found, 500 Server Error." 
      },
      { 
        front: "Progressive Web Apps (PWA)", 
        back: "**Service Worker:** Background-Scripts für Offline-Funktionalität. **App Manifest:** JSON-Datei für App-Installation. **Cache API:** Ressourcen für Offline-Nutzung speichern. **Push Notifications:** Benachrichtigungen auch wenn App geschlossen. **IHK-Vorteile:** App-ähnliche Erfahrung im Browser, keine App Store nötig. **HTTPS:** Voraussetzung für PWA-Features. **Lighthouse:** Google-Tool für PWA-Bewertung." 
      },
      { 
        front: "CSS Preprocessors", 
        back: "**Sass/SCSS:** Variablen ($primary-color), Nesting, Mixins, Functions. **Less:** ähnliche Features wie Sass. **Stylus:** Flexibelste Syntax, Whitespace-basiert. **IHK-Vorteile:** Code-Wiederverwendung, bessere Organisation, mathematische Operationen. **Kompilierung:** Build-Tools wie Webpack, Gulp, Parcel. **Beispiel:** @mixin button-style($color) für wiederverwendbare Styles." 
      },
      { 
        front: "Frontend Build Tools", 
        back: "**Webpack:** Module Bundler, Code Splitting, Hot Module Replacement. **Vite:** Moderne Alternative, schneller Development Server. **Parcel:** Zero-Config Bundler. **npm Scripts:** Package.json Scripts für Automation. **IHK-Aufgaben:** Minification, Bundling, Transpilation (Babel), Asset-Optimierung. **Tree Shaking:** Unbenutzten Code entfernen. **Source Maps:** Debugging in Development." 
      },
      { 
        front: "Web Performance Optimization", 
        back: "**Critical Rendering Path:** HTML → DOM, CSS → CSSOM → Render Tree → Layout → Paint. **Metrics:** First Contentful Paint (FCP), Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS). **Techniken:** Code Splitting, Lazy Loading, Image Optimization, CDN. **IHK-Tools:** Chrome DevTools, Lighthouse, WebPageTest. **Resource Hints:** preload, prefetch, dns-prefetch. **Compression:** Gzip, Brotli für kleinere Dateien." 
      },
      { 
        front: "Web Security Fundamentals", 
        back: "**XSS Prevention:** Input Sanitization, Content Security Policy (CSP). **CSRF Protection:** CSRF Tokens, SameSite Cookies. **HTTPS:** SSL/TLS für verschlüsselte Übertragung. **HSTS:** HTTP Strict Transport Security Header. **IHK-Sicherheitsheader:** X-Frame-Options, X-Content-Type-Options, Referrer-Policy. **Cookie Security:** HttpOnly, Secure, SameSite Flags. **SQL Injection:** Prepared Statements, Input Validation." 
      }
    ]
  },
  {
    type: "quiz",
    title: "Webentwicklung Vertiefung - IHK Praxis",
    questions: [
      {
        question: "Welcher HTML5-Ansatz ist am besten für die Seitenstruktur?",
        options: ["Nur <div> und <span>", "Semantische Elemente wie <header>, <main>, <footer>", "Tabellen für Layout", "Frames verwenden"],
        correctIndex: 1,
        explanation: "Semantische HTML5-Elemente verbessern SEO, Accessibility und Code-Verständlichkeit. Sie helfen Screen Readern und Suchmaschinen."
      },
      {
        question: "Wann sollte CSS Grid statt Flexbox verwendet werden?",
        options: ["Nie, Flexbox ist immer besser", "Für 2D-Layouts mit Zeilen und Spalten", "Nur für mobile Geräte", "Nur für ältere Browser"],
        correctIndex: 1,
        explanation: "CSS Grid ist ideal für 2D-Layouts, während Flexbox für 1D-Layouts (Zeile oder Spalte) optimiert ist."
      },
      {
        question: "Was ist der Hauptvorteil von async/await gegenüber Promises?",
        options: ["Bessere Performance", "Lesbarerer, synchron aussehender Code", "Kleinere Dateigröße", "Bessere Browser-Unterstützung"],
        correctIndex: 1,
        explanation: "async/await macht asynchronen Code lesbarer, da er wie synchroner Code aussieht und Callback-Hell vermeidet."
      },
      {
        question: "Welche Technik verhindert XSS-Angriffe am effektivsten?",
        options: ["HTTPS verwenden", "Input Sanitization und CSP", "Cookies deaktivieren", "JavaScript deaktivieren"],
        correctIndex: 1,
        explanation: "Input Sanitization und Content Security Policy (CSP) sind die effektivsten Methoden gegen XSS-Angriffe."
      },
      {
        question: "Was ist der 'Mobile First' Ansatz?",
        options: ["Nur für mobile Geräte entwickeln", "Design beginnt mit dem kleinsten Bildschirm", "Mobile Apps vor Websites", "Nur Touch-Bedienung"],
        correctIndex: 1,
        explanation: "Mobile First bedeutet, das Design mit dem kleinsten Bildschirm zu beginnen und dann zu größeren Bildschirmen zu erweitern."
      },
      {
        question: "Welcher HTTP-Status-Code zeigt eine erfolgreiche API-Anfrage an?",
        options: ["404", "500", "200", "301"],
        correctIndex: 2,
        explanation: "Status Code 200 bedeutet 'OK' und zeigt eine erfolgreiche HTTP-Anfrage an."
      },
      {
        question: "Was ist ein Service Worker?",
        options: ["Ein CSS-Framework", "Background-Script für PWAs", "Ein HTML-Element", "Ein JavaScript-Framework"],
        correctIndex: 1,
        explanation: "Service Worker sind Background-Scripts, die Offline-Funktionalität und andere PWA-Features ermöglichen."
      },
      {
        question: "Welcher CSS-Preprocessor verwendet die $-Syntax für Variablen?",
        options: ["Less", "Stylus", "Sass/SCSS", "PostCSS"],
        correctIndex: 2,
        explanation: "Sass und SCSS verwenden die $-Syntax für Variablen, z.B. $primary-color: #blue."
      }
    ]
  }
];