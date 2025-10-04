import { supabase } from "@/integrations/supabase/client";
import type { LearnModule } from "@/types/learn";
import { generateRandomTrainingModules } from "./randomTrainingUtils";

export async function getModulesForCategory(categoryId: string): Promise<LearnModule[]> {
  if (categoryId === 'zufallstraining') {
    return generateRandomTrainingModules();
  }

  const { data, error } = await supabase
    .from('learn_modules')
    .select('*')
    .eq('category_id', categoryId)
    .order('order_index');

  if (error) {
    console.error('Error fetching learn modules:', error);
    return [];
  }

  return data.map(module => module.content as unknown as LearnModule);
}

export async function getAllModules(): Promise<Record<string, LearnModule[]>> {
  const { data, error } = await supabase
    .from('learn_modules')
    .select('*')
    .order('order_index');

  if (error) {
    console.error('Error fetching all learn modules:', error);
    return {};
  }

  const grouped: Record<string, LearnModule[]> = {};
  
  for (const module of data) {
    if (!grouped[module.category_id]) {
      grouped[module.category_id] = [];
    }
    grouped[module.category_id].push(module.content as unknown as LearnModule);
  }

  return grouped;
}
