export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
  category: string;
  difficulty: 'leicht' | 'mittel' | 'schwer';
}

export interface ExamConfig {
  id: string;
  title: string;
  description: string;
  timeLimitMinutes: number;
  passingPercentage: number;
  totalPoints: number;
  questions: ExamQuestion[];
  categories: string[];
}

export interface ExamSession {
  examId: string;
  startTime: Date;
  answers: Record<string, number>;
  timeRemaining: number;
  isCompleted: boolean;
}

export interface ExamResult {
  examId: string;
  totalPoints: number;
  earnedPoints: number;
  percentage: number;
  passed: boolean;
  timeUsed: number;
  categoryBreakdown: Record<string, { correct: number; total: number; points: number }>;
  questionResults: { questionId: string; correct: boolean; points: number }[];
}
