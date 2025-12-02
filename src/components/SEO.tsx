import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

/**
 * SEO Component for dynamic meta tags
 * Updates page title and meta tags for better SEO
 */
export const SEO = ({ 
  title = 'IT-Prüfungsvorbereitung | IHK Fachinformatiker',
  description = 'Umfassende Vorbereitung auf IHK IT-Prüfungen mit interaktiven Übungen, Quizzes und Flashcards für Fachinformatiker.',
  keywords = 'IHK, IT-Prüfung, Fachinformatiker, Prüfungsvorbereitung, IT-Sicherheit, Programmierung, Datenbanken',
  ogImage = '/logo.png',
  canonical
}: SEOProps) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      
      tag.content = content;
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph meta tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:type', 'website', true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Security and Trust meta tags
    updateMetaTag('referrer', 'strict-origin-when-cross-origin');
    updateMetaTag('format-detection', 'telephone=no');
    
    // Additional trust signals
    updateMetaTag('author', 'Fabian Korte');
    updateMetaTag('revisit-after', '7 days');
    updateMetaTag('rating', 'general');
    updateMetaTag('distribution', 'global');

    // Canonical URL
    if (canonical) {
      let linkTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!linkTag) {
        linkTag = document.createElement('link');
        linkTag.rel = 'canonical';
        document.head.appendChild(linkTag);
      }
      linkTag.href = canonical;
    }
  }, [title, description, keywords, ogImage, canonical]);

  return null;
};
