// Mapping of categories to their appropriate learning methods
export const categoryLearningMethods: Record<string, string[]> = {
  programmierung: ["flashcards", "quiz"],
  datenbanken: ["flashcards", "quiz"],
  "it-sicherheit": ["flashcards", "quiz"],
  netzwerktechnik: ["flashcards", "quiz"],
  netzwerke: ["flashcards", "quiz"],
  systemadministration: ["flashcards", "quiz"],
  "mobile-entwicklung": ["flashcards", "quiz"],
  "web-technologien": ["flashcards", "quiz"],
  webentwicklung: ["flashcards", "quiz"],
  projektmanagement: ["flashcards", "quiz"],
  "grundlagen-it": ["flashcards", "quiz"],
  kommunikation: ["flashcards", "quiz"],
  "rechtliche-grundlagen": ["flashcards", "quiz"],
  rechtlichegrundlagen: ["flashcards", "quiz"],
  pruefungsvorbereitung: ["flashcards", "quiz"],
  bwl: ["flashcards", "quiz"],
  betriebswirtschaft: ["flashcards", "quiz"], 
  wiso: ["flashcards", "quiz"],
  datenschutz: ["flashcards", "quiz"],
  "fachmodul-systemintegration": ["flashcards", "quiz"],
  "fachmodul-anwendungsentwicklung": ["flashcards", "quiz"],
  englischit: ["flashcards", "quiz"],
  "englisch-it": ["flashcards", "quiz"],
  mathematiklogik: ["flashcards", "quiz"],
  "mathematik-logik": ["flashcards", "quiz"],
  innovationtrends: ["flashcards", "quiz"],
  "innovation-trends": ["flashcards", "quiz"],
  qualitaetsmanagement: ["flashcards", "quiz"]
};

export const getAvailableMethodsForCategory = (categoryId: string): string[] => {
  return categoryLearningMethods[categoryId] || [];
};