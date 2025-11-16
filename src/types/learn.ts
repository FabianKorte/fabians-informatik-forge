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
  | InteractiveTrainingModule;