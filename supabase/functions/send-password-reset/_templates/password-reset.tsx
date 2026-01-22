import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface PasswordResetEmailProps {
  resetLink: string;
  email: string;
}

export const PasswordResetEmail = ({
  resetLink,
  email,
}: PasswordResetEmailProps) => (
  <Html>
    <Head />
    <Preview>Setze dein Passwort zurück - IHK IT-Prüfungsvorbereitung</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Passwort zurücksetzen</Heading>
        <Text style={text}>
          Hallo,
        </Text>
        <Text style={text}>
          Du hast eine Anfrage zum Zurücksetzen deines Passworts für dein Konto <strong>{email}</strong> gestellt.
        </Text>
        <Section style={buttonContainer}>
          <Button style={button} href={resetLink}>
            Passwort zurücksetzen
          </Button>
        </Section>
        <Text style={text}>
          Oder kopiere diesen Link in deinen Browser:
        </Text>
        <Link href={resetLink} style={link}>
          {resetLink}
        </Link>
        <Text style={{ ...text, color: '#666', marginTop: '32px' }}>
          Dieser Link ist 1 Stunde gültig. Falls du diese Anfrage nicht gestellt hast, kannst du diese E-Mail ignorieren.
        </Text>
        <Text style={footer}>
          <Link
            href="https://informatik-lernplattform.lovable.app"
            target="_blank"
            style={{ ...link, color: '#898989' }}
          >
            IHK IT-Prüfungsvorbereitung
          </Link>
          <br />
          Deine Lernplattform für Fachinformatiker
        </Text>
      </Container>
    </Body>
  </Html>
)

export default PasswordResetEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
  padding: '0 40px',
}

const buttonContainer = {
  padding: '27px 0',
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#5469d4',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '200px',
  padding: '14px 20px',
  margin: '0 auto',
}

const link = {
  color: '#5469d4',
  fontSize: '14px',
  textDecoration: 'underline',
  wordBreak: 'break-all' as const,
  padding: '0 40px',
}

const footer = {
  color: '#898989',
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
  textAlign: 'center' as const,
  padding: '0 40px',
}
