# Lighthouse CI Performance Tests

Automatische Performance-Tests mit Lighthouse CI zur Überwachung von Core Web Vitals und Performance-Scores.

## Setup

1. **Installation:**
```bash
npm install
```

2. **Lokale Tests ausführen:**

### Desktop Performance
```bash
npm run lhci:desktop
```

### Mobile Performance
```bash
npm run lhci:mobile
```

### Beide Tests
```bash
npm run lhci:all
```

3. **Ergebnisse analysieren:**
```bash
npm run lhci:analyze
```

## Performance-Metriken

### Core Web Vitals

| Metrik | Desktop Threshold | Mobile Threshold | Beschreibung |
|--------|------------------|------------------|--------------|
| **FCP** (First Contentful Paint) | < 2s | < 3s | Zeit bis erstes Content-Element sichtbar |
| **LCP** (Largest Contentful Paint) | < 2.5s | < 4s | Zeit bis größtes Content-Element sichtbar |
| **CLS** (Cumulative Layout Shift) | < 0.1 | < 0.1 | Visuelle Stabilität |
| **TBT** (Total Blocking Time) | < 300ms | < 600ms | Zeit in der Main Thread blockiert ist |
| **Speed Index** | < 3s | < 5s | Wie schnell Content visuell geladen wird |

### Category Scores

| Category | Threshold | Beschreibung |
|----------|-----------|--------------|
| **Performance** | ≥ 80 (Desktop), ≥ 70 (Mobile) | Gesamt-Performance Score |
| **Accessibility** | ≥ 90 | WCAG-Konformität |
| **Best Practices** | ≥ 90 | Web-Best-Practices |
| **SEO** | ≥ 90 | SEO-Optimierung |

## Performance Budget

Die `lighthouse-budgets.json` definiert Resource-Limits:

- **JavaScript**: 500 KB
- **CSS**: 100 KB
- **Images**: 500 KB
- **Fonts**: 200 KB
- **Total**: 1.5 MB

## CI/CD Integration

Die Tests laufen automatisch bei jedem Push/PR über GitHub Actions:

1. **Desktop Tests**: Simuliert Desktop-Browser mit schneller Verbindung
2. **Mobile Tests**: Simuliert Mobile-Browser mit 3G-Verbindung
3. **Reports**: Werden als Artifacts hochgeladen

### GitHub Actions konfigurieren

Füge in `package.json` Scripts hinzu:
```json
{
  "scripts": {
    "lhci:desktop": "lhci autorun --config=lighthouserc.json",
    "lhci:mobile": "lhci autorun --config=lighthouserc.mobile.json",
    "lhci:all": "npm run lhci:desktop && npm run lhci:mobile",
    "lhci:analyze": "node performance/analyze-performance.js"
  }
}
```

## Ergebnisse interpretieren

### ✅ Gut (Score ≥ 90)
- Performance ist ausgezeichnet
- Keine Optimierung erforderlich

### ⚠️ Verbesserungsbedürftig (Score 50-89)
- Performance ist akzeptabel
- Optimierungen empfohlen

### ❌ Schlecht (Score < 50)
- Performance-Probleme
- Sofortige Optimierung erforderlich

## Häufige Optimierungen

### 1. Bilder optimieren
```bash
# Moderne Bildformate (WebP, AVIF)
# Lazy Loading für Off-Screen Bilder
# Responsive Bilder
```

### 2. JavaScript optimieren
```bash
# Code Splitting
# Tree Shaking
# Defer/Async Loading
```

### 3. CSS optimieren
```bash
# Critical CSS Inline
# Remove Unused CSS
# Minify CSS
```

### 4. Caching
```bash
# Long-term caching für statische Assets
# Service Worker für Offline-Support
```

## Reports anzeigen

Nach dem Test werden HTML-Reports generiert:
```bash
# Desktop Report
open .lighthouseci/*/lhr-*.html

# Oder mit lokalem Server
npx http-server .lighthouseci -p 8000
```

## Troubleshooting

### Tests schlagen fehl

1. **Build-Fehler**: `npm run build` separat ausführen
2. **Port bereits belegt**: Andere Services auf Port 4173 stoppen
3. **Timeout**: `startServerReadyTimeout` in Config erhöhen

### Performance-Scores schwanken

- Lighthouse führt 3 Runs durch und nimmt Median
- Bei großen Schwankungen: System-Performance prüfen
- Andere Programme während Test schließen

## Best Practices

1. **Regelmäßig testen**: Bei jedem Feature-Release
2. **Baselines setzen**: Performance-Trends überwachen
3. **Mobile First**: Mobile Performance priorisieren
4. **Budget einhalten**: Resource-Limits respektieren
5. **Iterativ optimieren**: Schrittweise verbessern

## Weitere Ressourcen

- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI Docs](https://github.com/GoogleChrome/lighthouse-ci)
- [Performance Budget Calculator](https://www.performancebudget.io/)
