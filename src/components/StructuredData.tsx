/**
 * Structured Data (JSON-LD) for SEO
 * Helps search engines understand the content better
 */
export const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "name": "IHK IT-Prüfungsvorbereitung - Fabian Korte",
        "description": "Umfassende Vorbereitung auf IHK IT-Prüfungen mit interaktiven Übungen und Lernmodulen",
        "url": window.location.origin,
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.png`,
          "width": "512",
          "height": "512"
        },
        "sameAs": [],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "availableLanguage": ["German"]
        },
        "educationalProgram": {
          "@type": "EducationalOccupationalProgram",
          "name": "Fachinformatiker IHK Prüfungsvorbereitung",
          "description": "Interaktive Lernplattform für die Vorbereitung auf IHK Fachinformatiker-Prüfungen",
          "provider": {
            "@type": "Organization",
            "name": "IHK IT-Prüfungsvorbereitung"
          }
        }
      },
      {
        "@type": "WebSite",
        "name": "Fabian Korte IT-Lernplattform",
        "url": window.location.origin,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${window.location.origin}/lexikon?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": window.location.href,
        "url": window.location.href,
        "name": "IHK IT-Prüfungsvorbereitung",
        "isPartOf": {
          "@id": window.location.origin
        },
        "inLanguage": "de-DE",
        "datePublished": "2024-01-01T00:00:00+00:00",
        "dateModified": new Date().toISOString()
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
