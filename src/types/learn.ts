export type ModuleType = "flashcards" | "quiz" | "matching";

export interface Flashcard {
  front: string;
  back: string;
}

export interface FlashcardsModule {
  type: "flashcards";
  title: string;
  cards: Flashcard[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface QuizModule {
  type: "quiz";
  title: string;
  questions: QuizQuestion[];
}

export interface MatchingPair {
  left: string;
  right: string;
}

export interface MatchingModule {
  type: "matching";
  title: string;
  pairs: MatchingPair[];
}

export type LearnModule = FlashcardsModule | QuizModule | MatchingModule;
