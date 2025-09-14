import { LearnModule } from "../../types/learn";

export const webentwicklungContent: LearnModule[] = [
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
  },
  {
    type: "matching",
    title: "Web-Technologien zuordnen",
    pairs: [
      { left: "HTML", right: "Struktur und Inhalt der Webseite" },
      { left: "CSS", right: "Styling und Layout der Webseite" },
      { left: "JavaScript", right: "Interaktivität und Verhalten" },
      { left: "React", right: "Component-basierte UI-Library" },
      { left: "Node.js", right: "Server-side JavaScript Runtime" },
      { left: "Express.js", right: "Web-Framework für Node.js" },
      { left: "MongoDB", right: "NoSQL-Dokumentendatenbank" },
      { left: "REST API", right: "Architektur für Web Services" }
    ]
  },
  {
    type: "code",
    title: "Frontend-Entwicklung Praxis",
    challenges: [
      {
        title: "Responsive Navigation erstellen",
        description: "Erstelle eine responsive Navigation mit CSS Grid und Media Queries",
        initialCode: `<!-- HTML -->
<nav class="navbar">
  <div class="nav-brand">Logo</div>
  <ul class="nav-menu">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <div class="hamburger">☰</div>
</nav>

/* CSS - Implementiere responsive Design */
.navbar {
  /* Dein Code hier */
}`,
        solution: `.navbar {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  padding: 1rem 2rem;
  background: #333;
  color: white;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-menu a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-menu a:hover {
  color: #007acc;
}

.hamburger {
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Mobile First - Responsive Design */
@media (max-width: 768px) {
  .navbar {
    grid-template-columns: 1fr auto;
  }
  
  .nav-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #333;
    flex-direction: column;
    padding: 1rem;
  }
  
  .nav-menu.active {
    display: flex;
  }
  
  .hamburger {
    display: block;
  }
}`,
        tests: [
          { input: "Mobile Ansicht", expected: "Hamburger-Menu wird angezeigt" },
          { input: "Desktop Ansicht", expected: "Vollständige Navigation sichtbar" }
        ]
      },
      {
        title: "Fetch API mit Error Handling",
        description: "Implementiere eine robuste API-Anfrage mit Fehlerbehandlung",
        initialCode: `// Implementiere eine Funktion zum Laden von Benutzerdaten
async function fetchUserData(userId) {
  // Dein Code hier
}

// Usage
fetchUserData(123).then(user => console.log(user));`,
        solution: `async function fetchUserData(userId) {
  // Input Validation
  if (!userId || typeof userId !== 'number') {
    throw new Error('Valid user ID is required');
  }
  
  try {
    // API Request mit Timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(\`https://api.example.com/users/\${userId}\`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getAuthToken()
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Check if request was successful
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    // Parse JSON response
    const userData = await response.json();
    
    // Data validation
    if (!userData.id || !userData.name) {
      throw new Error('Invalid user data received');
    }
    
    return userData;
    
  } catch (error) {
    // Specific error handling
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    } else if (error.name === 'TypeError') {
      throw new Error('Network error - check your connection');
    } else {
      // Log error for debugging
      console.error('API Error:', error);
      throw error;
    }
  }
}

// Helper function for auth token
function getAuthToken() {
  return localStorage.getItem('authToken') || '';
}

// Enhanced usage with error handling
async function loadUser(userId) {
  try {
    const user = await fetchUserData(userId);
    displayUser(user);
  } catch (error) {
    displayError(error.message);
  }
}`,
        tests: [
          { input: "fetchUserData(123)", expected: "Erfolgreiche API-Anfrage mit Validierung" },
          { input: "fetchUserData('invalid')", expected: "Fehler bei ungültiger Eingabe" }
        ]
      },
      {
        title: "PWA Service Worker",
        description: "Implementiere einen Service Worker für Offline-Funktionalität",
        initialCode: `// service-worker.js
// Implementiere Caching-Strategien

const CACHE_NAME = 'my-app-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/js/app.js'
];

// Install Event
self.addEventListener('install', event => {
  // Dein Code hier
});

// Fetch Event  
self.addEventListener('fetch', event => {
  // Dein Code hier
});`,
        solution: `// service-worker.js
const CACHE_NAME = 'my-app-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/js/app.js',
  '/images/logo.png',
  '/manifest.json'
];

// Install Event - Cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients
      return self.clients.claim();
    })
  );
});

// Fetch Event - Cache First Strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Serving from cache:', event.request.url);
          return response;
        }
        
        // Clone request for cache
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest)
          .then(response => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone response for cache
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Return offline page if available
            return caches.match('/offline.html');
          });
      })
  );
});

// Background Sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle pending form submissions
  console.log('Background sync triggered');
}`,
        tests: [
          { input: "Service Worker Installation", expected: "Ressourcen werden gecacht" },
          { input: "Offline-Zugriff", expected: "Seite lädt aus Cache" }
        ]
      }
    ]
  },
  {
    type: "dragdrop",
    title: "Web-Technologie Stacks",
    games: [
      {
        title: "MEAN vs. MERN Stack",
        description: "Ordne die Technologien den richtigen Full-Stack-Frameworks zu",
        items: [
          { id: "tech1", content: "MongoDB", category: "Beide Stacks" },
          { id: "tech2", content: "Express.js", category: "Beide Stacks" },
          { id: "tech3", content: "Angular", category: "MEAN Stack" },
          { id: "tech4", content: "React", category: "MERN Stack" },
          { id: "tech5", content: "Node.js", category: "Beide Stacks" },
          { id: "tech6", content: "TypeScript", category: "MEAN Stack" },
          { id: "tech7", content: "JSX", category: "MERN Stack" },
          { id: "tech8", content: "RxJS", category: "MEAN Stack" }
        ],
        categories: ["MEAN Stack", "MERN Stack", "Beide Stacks"]
      }
    ]
  },
  {
    type: "memory",
    title: "Frontend-Frameworks Memory",
    games: [
      {
        title: "Framework Features zuordnen",
        description: "Finde die passenden Paare von Frameworks und ihren Hauptfeatures",
        pairs: [
          { id: "react1", content: "React", match: "Virtual DOM" },
          { id: "angular1", content: "Angular", match: "Two-Way Data Binding" },
          { id: "vue1", content: "Vue.js", match: "Progressive Framework" },
          { id: "svelte1", content: "Svelte", match: "Compile-Time Optimization" },
          { id: "next1", content: "Next.js", match: "Server-Side Rendering" },
          { id: "gatsby1", content: "Gatsby", match: "Static Site Generation" }
        ]
      }
    ]
  }
];