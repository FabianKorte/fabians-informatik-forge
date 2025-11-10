import { supabase } from "@/integrations/supabase/client";
import type { LearnModule } from "@/types/learn";
import { generateRandomTrainingModules } from "./randomTrainingUtils";
import { logger } from "@/lib/logger";

// Helper to fail fast if a network request hangs
const withTimeout = <T>(promise: Promise<T>, ms = 12000): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error(`Supabase request timed out after ${ms}ms`)), ms);
    promise.then((val) => { clearTimeout(id); resolve(val); })
      .catch((err) => { clearTimeout(id); reject(err); });
  });
};


export async function getModulesForCategory(categoryId: string): Promise<LearnModule[]> {
  if (categoryId === 'zufallstraining') {
    return generateRandomTrainingModules();
  }

  const query1 = supabase
    .from('learn_modules')
    .select('*')
    .eq('category_id', categoryId)
    .order('order_index');

  const { data, error } = await withTimeout(query1 as unknown as Promise<{ data: any[]; error: any }>, 12000);

  if (error) {
    logger.error('Error fetching learn modules:', error);
    return [];
  }

  return data.map(module => module.content as unknown as LearnModule);
}

export async function getAllModules(): Promise<Record<string, LearnModule[]>> {
  const query2 = supabase
    .from('learn_modules')
    .select('*')
    .order('order_index');

  const { data, error } = await withTimeout(query2 as unknown as Promise<{ data: any[]; error: any }>, 12000);

  if (error || !data) {
    logger.error('Error fetching learn modules:', error);
    return {};
  }

  const grouped: Record<string, LearnModule[]> = {};
  
  for (const module of data) {
    if (!grouped[module.category_id]) {
      grouped[module.category_id] = [];
    }
    grouped[module.category_id].push(module.content as unknown as LearnModule);
  }

  grouped['zufallstraining'] = await generateRandomTrainingModules();

  return grouped;
}
