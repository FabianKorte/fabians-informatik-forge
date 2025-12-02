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

# Nur Accessibility-Tests
npx playwright test e2e/accessibility.spec.ts

# Nur Integration-Tests
npx playwright test e2e/user-flow-integration.spec.ts

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

### `accessibility.spec.ts`
- WCAG 2.1 Level A/AA Konformität
- Keyboard-Navigation
- ARIA-Attribute
- Color-Contrast
- Form-Labels
- Heading-Struktur
- Image Alt-Texte
- Skip-to-Content Link

### `user-flow-integration.spec.ts`
- Vollständige User-Journeys über mehrere Seiten
- Registrierung → Login → Profile bearbeiten
- Session-Persistenz über Page-Reloads
- Protected Routes Zugriffskontrolle
- Multiple Login/Logout-Zyklen
- Cross-Tab Session-Handling

## Accessibility Testing

Die Accessibility-Tests verwenden **axe-core** um automatisch WCAG 2.1 Konformität zu prüfen:

### Geprüfte Standards
- WCAG 2.1 Level A
- WCAG 2.1 Level AA
- Keyboard-Navigation
- Screen-Reader Kompatibilität

### Helper-Funktionen
Die `e2e/helpers/accessibility.ts` bietet wiederverwendbare Funktionen:
- `checkAccessibility()` - Führt Accessibility-Scan durch
- `assertNoA11yViolations()` - Asserted keine Violations
- `testKeyboardNavigation()` - Testet Keyboard-Navigation
- `WCAG_RULES` - Vordefinierte Rule-Sets für spezifische Tests

### Violations beheben
Wenn Accessibility-Violations gefunden werden:
1. Violations werden in der Console detailliert geloggt
2. Jede Violation enthält:
   - ID und Impact-Level
   - Beschreibung und Help-URL
   - Betroffene Elemente mit HTML und Selektoren
   - Konkrete Failure-Messages

## Integration Testing

Die Integration-Tests in `user-flow-integration.spec.ts` testen vollständige User-Flows:

### Helper-Funktionen
Die `e2e/helpers/auth-helpers.ts` bietet wiederverwendbare Auth-Funktionen:
- `generateTestUser()` - Generiert eindeutige Test-User
- `signUp()` - Registriert neuen User
- `login()` - Meldet User an
- `logout()` - Meldet User ab
- `isLoggedIn()` - Prüft Login-Status
- `goToProfile()` - Navigation zur Profil-Seite
- `updateProfile()` - Aktualisiert Profil-Daten
- `verifyProfileInfo()` - Verifiziert Profil-Anzeige

### Test-Szenarien
- **Complete User Journey**: Signup → Login → Profile Edit → Logout → Re-Login
- **Error Handling**: Duplicate Email, Invalid Credentials
- **Profile Management**: Username/Bio Updates
- **Session Persistence**: Page Reloads, Multiple Tabs
- **Protected Routes**: Zugriffskontrolle ohne Login
- **Login/Logout Cycles**: Multiple Login-Sessions

## Best Practices

1. **Robuste Selektoren**: Tests verwenden text-basierte Selektoren die sprach-agnostisch sind
2. **Timeouts**: Angemessene Timeouts für Netzwerk-Requests
3. **Wartezustände**: `waitForLoadState` für stabile Tests
4. **Screenshots**: Automatische Screenshots bei Fehlern
5. **Multi-Browser**: Tests laufen auf Chromium, Firefox und WebKit
6. **Accessibility-First**: Jede neue Seite sollte Accessibility-Tests haben

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
