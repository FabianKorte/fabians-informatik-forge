export interface Flashcard {
  front: string;
  back: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface MatchingPair {
  left: string;
  right: string;
}

export interface CodeChallenge {
  title: string;
  description: string;
  initialCode: string;
  solution: string;
  tests: { input: string; expected: string }[];
}

export interface DragDropItem {
  id: string;
  content: string;
  category: string;
}

export interface DragDropGame {
  title: string;
  description: string;
  items: DragDropItem[];
  categories: string[];
}

export interface MemoryGame {
  title: string;
  description: string;
  pairs: { id: string; content: string; match: string }[];
}

export interface Timeline {
  title: string;
  description: string;
  events: { year: string; event: string; description: string }[];
}

export interface InteractiveScenario {
  title: string;
  description: string;
  scenario: string;
  choices: { text: string; consequence: string; isCorrect: boolean }[];
}

export type LearnModule = 
  | { type: "flashcards"; title: string; cards: Flashcard[] }
  | { type: "quiz"; title: string; questions: QuizQuestion[] }
  | { type: "matching"; title: string; pairs: MatchingPair[] }
  | { type: "code"; title: string; challenges: CodeChallenge[] }
  | { type: "dragdrop"; title: string; games: DragDropGame[] }
  | { type: "memory"; title: string; games: MemoryGame[] }
  | { type: "timeline"; title: string; timelines: Timeline[] }
  | { type: "scenario"; title: string; scenarios: InteractiveScenario[] };