// Java Learning Platform Types

export interface JavaChapter {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: JavaLesson[];
  isUnlocked: boolean;
}

export interface JavaLesson {
  id: string;
  chapterId: string;
  title: string;
  order: number;
  type: 'theory' | 'exercise' | 'challenge';
  content: LessonContent;
  isCompleted: boolean;
}

export interface LessonContent {
  explanation: string;
  codeTemplate: string;
  expectedOutput?: string;
  hints: string[];
  solution: string;
  testCases?: TestCase[];
}

export interface TestCase {
  input?: string;
  expectedOutput: string;
  description: string;
}

export interface CodeExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime?: number;
}

export interface JavaProgress {
  chapterId: string;
  lessonId: string;
  completed: boolean;
  lastAttempt?: string;
  attempts: number;
  bestCode?: string;
}
