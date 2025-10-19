import { supabase } from "@/integrations/supabase/client";
import type { LearnModule } from "@/types/learn";
import { logger } from "@/lib/logger";

export async function generateRandomTrainingModules(): Promise<LearnModule[]> {
  const { data: allModules, error } = await supabase
    .from('learn_modules')
    .select('*')
    .neq('category_id', 'zufallstraining');

  if (error || !allModules) {
    logger.error('Error fetching modules for random training:', error);
    return [];
  }

  const modules = allModules.map(m => m.content as unknown as LearnModule);
  
  const flashcards = modules.filter(m => m.type === 'flashcards');
  const quizzes = modules.filter(m => m.type === 'quiz');
  const interactive = modules.filter(m => m.type === 'interactive');
  const matching = modules.filter(m => m.type === 'matching');
  const code = modules.filter(m => m.type === 'code');
  const dragdrop = modules.filter(m => m.type === 'dragdrop');
  const memory = modules.filter(m => m.type === 'memory');
  const timeline = modules.filter(m => m.type === 'timeline');
  const scenario = modules.filter(m => m.type === 'scenario');

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

  if (matching.length > 0) {
    const allPairs = matching.flatMap((m: any) => m.pairs || []);
    result.push({
      type: 'matching',
      title: 'Zufallstraining: Matching',
      pairs: allPairs
    } as any);
  }

  if (code.length > 0) {
    const allChallenges = code.flatMap((m: any) => m.challenges || []);
    result.push({
      type: 'code',
      title: 'Zufallstraining: Code',
      challenges: allChallenges
    } as any);
  }

  if (dragdrop.length > 0) {
    const allGames = dragdrop.flatMap((m: any) => m.games || []);
    result.push({
      type: 'dragdrop',
      title: 'Zufallstraining: Drag & Drop',
      games: allGames
    } as any);
  }

  if (memory.length > 0) {
    const allGames = memory.flatMap((m: any) => m.games || []);
    result.push({
      type: 'memory',
      title: 'Zufallstraining: Memory',
      games: allGames
    } as any);
  }

  if (timeline.length > 0) {
    const allTimelines = timeline.flatMap((m: any) => m.timelines || []);
    result.push({
      type: 'timeline',
      title: 'Zufallstraining: Zeitleiste',
      timelines: allTimelines
    } as any);
  }

  if (scenario.length > 0) {
    const allScenarios = scenario.flatMap((m: any) => m.scenarios || []);
    result.push({
      type: 'scenario',
      title: 'Zufallstraining: Szenarien',
      scenarios: allScenarios
    } as any);
  }

  return result;
}
