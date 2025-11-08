import { supabase } from "@/integrations/supabase/client";
import type { Category } from "@/data/categories";
import * as Icons from "lucide-react";
import { logger } from "@/lib/logger";

export async function getCategoriesFromDatabase(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    if (!data || data.length === 0) {
      console.warn('No categories found in database');
      return [];
    }

    console.log('📦 Fetched', data.length, 'categories from database');

    return data.map(cat => {
      // Map icon string to actual icon component - with fallback
      let IconComponent = Icons.Code2;
      try {
        if (cat.icon && (Icons as any)[cat.icon]) {
          IconComponent = (Icons as any)[cat.icon];
        }
      } catch (e) {
        console.warn('Invalid icon name:', cat.icon);
      }
      
      return {
        id: cat.id,
        title: cat.title,
        description: cat.description || '',
        totalElements: 0,
        completedElements: 0,
        icon: IconComponent,
        difficulty: (cat.difficulty || "Anfänger") as "Anfänger" | "Fortgeschritten" | "Experte",
        gradient: cat.gradient || "from-blue-500 to-purple-500"
      };
    });
  } catch (err) {
    console.error('Exception in getCategoriesFromDatabase:', err);
    return [];
  }
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
