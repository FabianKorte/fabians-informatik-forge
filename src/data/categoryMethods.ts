// Mapping of categories to their appropriate learning methods
export const categoryLearningMethods: Record<string, string[]> = {
  programmierung: ["flashcards", "quiz", "matching", "code", "dragdrop", "memory", "timeline", "scenario"],
  datenbanken: ["flashcards", "quiz", "matching", "code", "dragdrop", "memory", "scenario"],
  "it-sicherheit": ["flashcards", "quiz", "matching", "dragdrop", "memory", "timeline", "scenario"],
  netzwerktechnik: ["flashcards", "quiz", "matching", "code", "dragdrop", "memory", "timeline", "scenario"],
  systemadministration: ["flashcards", "quiz", "matching", "code", "dragdrop", "memory", "scenario"],
  "mobile-entwicklung": ["flashcards", "quiz", "matching", "code", "dragdrop", "memory", "scenario"],
  "web-technologien": ["flashcards", "quiz", "matching", "code", "dragdrop", "memory", "scenario"],
  projektmanagement: ["flashcards", "quiz", "matching", "dragdrop", "memory", "timeline", "scenario"],
  "grundlagen-it": ["flashcards", "quiz", "matching", "code", "dragdrop", "memory", "scenario"],
  kommunikation: ["flashcards", "quiz", "matching", "dragdrop", "memory", "scenario"],
  "rechtliche-grundlagen": ["flashcards", "quiz", "matching", "dragdrop", "memory", "scenario"],
  pruefungsvorbereitung: ["flashcards", "quiz", "matching", "dragdrop", "memory", "timeline", "scenario"],
  
  // New categories - no code challenges for non-technical subjects
  bwl: ["flashcards", "quiz", "matching", "dragdrop", "memory", "scenario"],
  betriebswirtschaft: ["flashcards", "quiz", "matching", "dragdrop", "memory", "scenario"], 
  wiso: ["flashcards", "quiz", "matching", "dragdrop", "scenario"],
  datenschutz: ["flashcards", "quiz", "matching", "dragdrop", "memory", "scenario"],
  "fachmodul-systemintegration": ["flashcards", "quiz", "matching", "code", "dragdrop", "memory", "scenario"],
  "fachmodul-anwendungsentwicklung": ["flashcards", "quiz", "matching", "code", "dragdrop", "memory", "scenario"]
};

export const getAvailableMethodsForCategory = (categoryId: string): string[] => {
  return categoryLearningMethods[categoryId] || [];
};