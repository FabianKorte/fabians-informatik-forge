import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück
        </Button>

        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-6">Datenschutzerklärung</h1>
          
          <div className="space-y-6 text-sm">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Datenschutz auf einen Blick</h2>
              <h3 className="font-semibold mb-2">Allgemeine Hinweise</h3>
              <p className="mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
                passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
                persönlich identifiziert werden können.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Verantwortliche Stelle</h2>
              <p className="mb-4">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist der Betreiber dieser 
                Lernplattform. Die Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Datenerfassung auf dieser Website</h2>
              
              <h3 className="font-semibold mb-2">3.1 Registrierung und Benutzerkonto</h3>
              <p className="mb-4">
                Bei der Registrierung auf unserer Plattform werden folgende Daten erfasst:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>E-Mail-Adresse</li>
                <li>Benutzername</li>
                <li>Passwort (verschlüsselt gespeichert)</li>
                <li>Optionale Profilinformationen (Avatar, Biografie)</li>
              </ul>
              <p className="mb-4">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)
              </p>

              <h3 className="font-semibold mb-2">3.2 Lernfortschritt und Nutzungsdaten</h3>
              <p className="mb-4">
                Zur Bereitstellung der Lerninhalte und zur Verfolgung Ihres Lernfortschritts speichern wir:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Bearbeitete Lernmodule und Quizze</li>
                <li>Fortschrittsdaten zu einzelnen Kategorien</li>
                <li>Zeitstempel der Lernaktivitäten</li>
                <li>Feedback und Vorschläge, die Sie einreichen</li>
              </ul>
              <p className="mb-4">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)
              </p>

              <h3 className="font-semibold mb-2">3.3 Zwei-Faktor-Authentifizierung (2FA)</h3>
              <p className="mb-4">
                Bei Aktivierung der Zwei-Faktor-Authentifizierung werden kryptografische Schlüssel gespeichert, 
                die zur Verifizierung Ihrer Identität dienen. Diese werden verschlüsselt in der Datenbank gespeichert.
              </p>
              <p className="mb-4">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und Art. 6 Abs. 1 lit. f DSGVO 
                (berechtigtes Interesse an der Sicherheit)
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Drittanbieter und externe Dienste</h2>
              
              <h3 className="font-semibold mb-2">4.1 Supabase (Datenbank und Authentifizierung)</h3>
              <p className="mb-4">
                Diese Website nutzt Supabase für die Speicherung von Nutzerdaten, Authentifizierung und Backend-Dienste.
              </p>
              <p className="mb-4">
                <strong>Anbieter:</strong> Supabase, Inc.<br />
                <strong>Serverstandort:</strong> USA (mit Standardvertragsklauseln gemäß Art. 46 DSGVO)<br />
                <strong>Datenschutzerklärung:</strong>{" "}
                <a 
                  href="https://supabase.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://supabase.com/privacy
                </a>
              </p>
              <p className="mb-4">
                Übermittelte Daten: Alle unter Punkt 3 genannten personenbezogenen Daten werden über Supabase verarbeitet.
              </p>
              <p className="mb-4">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und Art. 6 Abs. 1 lit. f DSGVO 
                (berechtigtes Interesse an zuverlässiger Infrastruktur)
              </p>

              <h3 className="font-semibold mb-2">4.2 OpenAI API (KI-Tutor)</h3>
              <p className="mb-4">
                Unsere Plattform nutzt die OpenAI API, um einen KI-gestützten Lern-Assistenten bereitzustellen.
              </p>
              <p className="mb-4">
                <strong>Anbieter:</strong> OpenAI, L.L.C., 3180 18th Street, San Francisco, CA 94110, USA<br />
                <strong>Datenschutzerklärung:</strong>{" "}
                <a 
                  href="https://openai.com/policies/privacy-policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://openai.com/policies/privacy-policy
                </a>
              </p>
              <p className="mb-4">
                Übermittelte Daten: Ihre Chat-Nachrichten an den KI-Tutor werden zur Verarbeitung an OpenAI übermittelt. 
                Die Nachrichten werden gemäß der OpenAI-Richtlinien nicht zum Training von KI-Modellen verwendet.
              </p>
              <p className="mb-4">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und Art. 6 Abs. 1 lit. a DSGVO 
                (Einwilligung bei Nutzung des KI-Tutors)
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Cookies und lokale Speicherung</h2>
              <p className="mb-4">
                Diese Website verwendet lokale Speichertechnologien (LocalStorage, SessionStorage) für:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Speicherung der Authentifizierungs-Session (wenn "Angemeldet bleiben" aktiviert ist)</li>
                <li>Speicherung von Theme-Einstellungen (Hell-/Dunkelmodus)</li>
                <li>Zwischenspeicherung von Lernfortschritten</li>
              </ul>
              <p className="mb-4">
                Diese Daten werden ausschließlich lokal in Ihrem Browser gespeichert und nicht an Dritte übermittelt.
              </p>
              <p className="mb-4">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an verbesserter Nutzerfreundlichkeit)
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Ihre Rechte</h2>
              <p className="mb-4">Sie haben folgende Rechte:</p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li><strong>Auskunftsrecht:</strong> Sie können Auskunft über Ihre gespeicherten Daten verlangen (Art. 15 DSGVO)</li>
                <li><strong>Berichtigungsrecht:</strong> Sie können die Berichtigung unrichtiger Daten verlangen (Art. 16 DSGVO)</li>
                <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer Daten verlangen (Art. 17 DSGVO)</li>
                <li><strong>Einschränkung der Verarbeitung:</strong> Sie können die Einschränkung der Verarbeitung verlangen (Art. 18 DSGVO)</li>
                <li><strong>Datenübertragbarkeit:</strong> Sie können die Übertragung Ihrer Daten an sich oder Dritte verlangen (Art. 20 DSGVO)</li>
                <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung Ihrer Daten widersprechen (Art. 21 DSGVO)</li>
                <li><strong>Beschwerderecht:</strong> Sie können sich bei einer Aufsichtsbehörde beschweren (Art. 77 DSGVO)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Datensicherheit</h2>
              <p className="mb-4">
                Wir verwenden geeignete technische und organisatorische Sicherheitsmaßnahmen, um Ihre Daten gegen 
                zufällige oder vorsätzliche Manipulationen, Verlust, Zerstörung oder gegen den Zugriff unberechtigter 
                Personen zu schützen. Dazu gehören:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>SSL/TLS-Verschlüsselung für die Datenübertragung</li>
                <li>Verschlüsselte Speicherung von Passwörtern</li>
                <li>Regelmäßige Sicherheitsupdates</li>
                <li>Zwei-Faktor-Authentifizierung (optional für Benutzer)</li>
                <li>Zugriffsbeschränkungen auf Administratorenebene</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Speicherdauer</h2>
              <p className="mb-4">
                Ihre personenbezogenen Daten werden nur so lange gespeichert, wie dies für die Zwecke erforderlich ist, 
                für die sie erhoben wurden, oder wie es gesetzlich vorgeschrieben ist. Bei Löschung Ihres Benutzerkontos 
                werden alle personenbezogenen Daten unverzüglich gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten 
                bestehen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Änderungen dieser Datenschutzerklärung</h2>
              <p className="mb-4">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen 
                Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen. 
                Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
              </p>
            </section>

            <section className="mt-8 pt-6 border-t">
              <p className="text-xs text-muted-foreground">
                Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
}
