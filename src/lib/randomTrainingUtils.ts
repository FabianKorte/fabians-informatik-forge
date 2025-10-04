import { supabase } from "@/integrations/supabase/client";
import type { LearnModule } from "@/types/learn";

export async function generateRandomTrainingModules(): Promise<LearnModule[]> {
  const { data: allModules, error } = await supabase
    .from('learn_modules')
    .select('*')
    .neq('category_id', 'zufallstraining');

  if (error || !allModules) {
    console.error('Error fetching modules for random training:', error);
    return [];
  }

  const modules = allModules.map(m => m.content as unknown as LearnModule);
  
  const flashcards = modules.filter(m => m.type === 'flashcards');
  const quizzes = modules.filter(m => m.type === 'quiz');
  const interactive = modules.filter(m => m.type === 'interactive');

  const result: LearnModule[] = [];

  if (flashcards.length > 0) {
    const allCards = flashcards.flatMap((m: any) => m.cards || []);
    result.push({
      type: 'flashcards',
      title: 'Zufallstraining: Karteikarten',
      cards: allCards
    });
  }

  if (quizzes.length > 0) {
    const allQuestions = quizzes.flatMap((m: any) => m.questions || []);
    result.push({
      type: 'quiz',
      title: 'Zufallstraining: Quiz',
      questions: allQuestions
    });
  }

  if (interactive.length > 0) {
    const allTasks = interactive.flatMap((m: any) => m.tasks || []);
    result.push({
      type: 'interactive',
      title: 'Zufallstraining: Interaktiv',
      tasks: allTasks
    });
  }

  return result;
}
