import { supabase } from "@/integrations/supabase/client";
import type { Category } from "@/data/categories";
import * as Icons from "lucide-react";

export async function getCategoriesFromDatabase(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data.map(cat => {
    // Map icon string to actual icon component
    const IconComponent = (Icons as any)[cat.icon] || Icons.Code2;
    
    return {
      id: cat.id,
      title: cat.title,
      description: cat.description,
      totalElements: 0, // Will be calculated from learn_modules
      completedElements: 0, // Will be calculated from user progress
      icon: IconComponent,
      difficulty: cat.difficulty as "Anfänger" | "Fortgeschritten" | "Experte",
      gradient: cat.gradient
    };
  });
}

export async function updateCategoryElementCounts(categories: Category[]): Promise<Category[]> {
  // Get module counts for each category
  const { data: moduleCounts } = await supabase
    .from('learn_modules')
    .select('category_id');

  if (!moduleCounts) return categories;

  // Count modules per category
  const counts: Record<string, number> = {};
  for (const module of moduleCounts) {
    counts[module.category_id] = (counts[module.category_id] || 0) + 1;
  }

  // Update categories with actual counts
  return categories.map(cat => ({
    ...cat,
    totalElements: counts[cat.id] || 0
  }));
}
