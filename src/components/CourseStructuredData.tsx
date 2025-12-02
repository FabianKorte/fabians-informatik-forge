import type { Category } from "@/data/categories";

interface CourseStructuredDataProps {
  category: Category;
  totalModules?: number;
}

/**
 * Course Structured Data (JSON-LD) for Learning Categories
 * Helps search engines understand course content
 */
export const CourseStructuredData = ({ category, totalModules = 0 }: CourseStructuredDataProps) => {
  // Map German difficulty levels to schema.org educationalLevel
  const educationalLevelMap: Record<string, string> = {
    "Anfänger": "Beginner",
    "Fortgeschritten": "Intermediate",
    "Experte": "Advanced"
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": category.title,
    "description": category.description,
    "provider": {
      "@type": "Organization",
      "name": "Fabian Korte IT-Lernplattform",
      "url": window.location.origin
    },
    "educationalLevel": educationalLevelMap[category.difficulty] || "Intermediate",
    "inLanguage": "de-DE",
    "url": `${window.location.origin}/learn/${category.id}`,
    "courseCode": category.id,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT" + Math.max(1, Math.floor(totalModules * 0.5)) + "H"
    },
    "teaches": category.title,
    "keywords": `${category.title}, IHK, Fachinformatiker, IT-Ausbildung, Prüfungsvorbereitung`,
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
