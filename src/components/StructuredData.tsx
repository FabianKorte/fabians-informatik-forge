/**
 * Structured Data (JSON-LD) for SEO
 * Helps search engines understand the content better
 */
export const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "IHK IT-Prüfungsvorbereitung",
    "description": "Umfassende Vorbereitung auf IHK IT-Prüfungen mit interaktiven Übungen und Lernmodulen",
    "url": window.location.origin,
    "logo": `${window.location.origin}/logo.png`,
    "educationalProgram": {
      "@type": "EducationalOccupationalProgram",
      "name": "Fachinformatiker IHK Prüfungsvorbereitung",
      "description": "Interaktive Lernplattform für die Vorbereitung auf IHK Fachinformatiker-Prüfungen",
      "provider": {
        "@type": "Organization",
        "name": "IHK IT-Prüfungsvorbereitung"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
