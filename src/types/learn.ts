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

// New Interactive Training Types
export interface InteractiveTask {
  id: string;
  category: string;
  difficulty: 'leicht' | 'mittel' | 'schwer';
  taskType: 'code-complete' | 'calculation' | 'number-conversion' | 'security-audit' | 'drag-drop' | 'step-by-step' | 'simulation' | 'error-finding';
  taskText: string;
  inputFormat: 'code' | 'number' | 'text' | 'multiple-choice' | 'simulation' | 'drag-drop' | 'step-by-step';
  
  // Tools and helpers
  tools: string[];
  infoTexts: string[];
  helpButtons: { label: string; content: string }[];
  
  // Gamification
  gamification: {
    points: number;
    badge?: string;
    timeLimit?: number;
    level: number;
  };
  
  // Adaptive support
  adaptiveHelp: {
    hintsAfterFailures: number;
    hints: string[];
    fallbackSolution?: string;
  };
  
  // Solution and feedback
  expectedSolution: string | string[] | number;
  feedback: {
    correct: string;
    incorrect: string;
    commonMistakes: string[];
  };
  
  // Optional simulation data
  simulationData?: {
    initialState: any;
    steps: any[];
    validation: (state: any) => boolean;
  };
}

export interface InteractiveTrainingModule {
  type: "interactive";
  title: string;
  tasks: InteractiveTask[];
}

export type LearnModule = 
  | { type: "flashcards"; title: string; cards: Flashcard[] }
  | { type: "quiz"; title: string; questions: QuizQuestion[] }
  | { type: "matching"; title: string; pairs: MatchingPair[] }
  | { type: "code"; title: string; challenges: CodeChallenge[] }
  | { type: "dragdrop"; title: string; games: DragDropGame[] }
  | { type: "memory"; title: string; games: MemoryGame[] }
  | { type: "timeline"; title: string; timelines: Timeline[] }
  | { type: "scenario"; title: string; scenarios: InteractiveScenario[] }
  | InteractiveTrainingModule;