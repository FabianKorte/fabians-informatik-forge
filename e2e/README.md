# E2E Tests mit Playwright

## Setup

1. Installation:
```bash
npm install
npx playwright install
```

2. Tests ausführen:
```bash
# Alle Tests
npm run test:e2e

# Mit UI
npm run test:e2e:ui

# Bestimmte Test-Datei
npx playwright test e2e/auth.spec.ts

# Im headed mode (Browser sichtbar)
npx playwright test --headed

# Debug-Modus
npx playwright test --debug
```

3. Test-Report anzeigen:
```bash
npx playwright show-report
```

## Test-Struktur

### `auth.spec.ts`
- Login-Flow
- Signup-Flow
- Validation-Errors
- Logout-Funktionalität

### `learning-modules.spec.ts`
- Navigation zu Lernmodulen
- Karteikarten durcharbeiten
- Quiz beantworten
- Navigation zwischen Modulen

### `progress-tracking.spec.ts`
- Progress-Seite anzeigen
- Statistiken anzeigen
- Fortschritt persistieren
- Focus-Training starten

## Best Practices

1. **Robuste Selektoren**: Tests verwenden text-basierte Selektoren die sprach-agnostisch sind
2. **Timeouts**: Angemessene Timeouts für Netzwerk-Requests
3. **Wartezustände**: `waitForLoadState` für stabile Tests
4. **Screenshots**: Automatische Screenshots bei Fehlern
5. **Multi-Browser**: Tests laufen auf Chromium, Firefox und WebKit

## CI/CD Integration

Füge folgende Scripts zu `package.json` hinzu:
```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed"
  }
}
```

## Umgebungsvariablen

Für CI/CD:
- `CI=true`: Aktiviert CI-Modus mit Retries
- `BASE_URL`: Überschreibt Base-URL für Tests
