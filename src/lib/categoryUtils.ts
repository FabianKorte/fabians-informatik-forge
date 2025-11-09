import { supabase } from "@/integrations/supabase/client";
import type { Category } from "@/data/categories";
import * as Icons from "lucide-react";
import { logger } from "@/lib/logger";

// Helper to fail fast if a network request hangs
const withTimeout = <T>(promise: Promise<T>, ms = 12000): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error(`Supabase request timed out after ${ms}ms`)), ms);
    promise.then((val) => { clearTimeout(id); resolve(val); })
      .catch((err) => { clearTimeout(id); reject(err); });
  });
};
export async function getCategoriesFromDatabase(): Promise<Category[]> {
  console.log('🔍 getCategoriesFromDatabase called');
  console.log('📦 Supabase client:', supabase ? 'initialized' : 'NOT initialized');
  
  try {
    console.log('🌐 Starting Supabase query...');
    const query = supabase
      .from('categories')
      .select('*')
      .order('id');
    const { data, error } = await withTimeout(query as unknown as Promise<{ data: any[]; error: any }>, 12000);
    console.log('🎯 Query completed. Data:', (data as any[])?.length, 'Error:', error);

    if (error) {
      console.error('❌ Error fetching categories:', error);
      return [];
    }

    if (!data || data.length === 0) {
      console.warn('⚠️ No categories found in database');
      return [];
    }

    console.log('✅ Fetched', data.length, 'categories from database');

    return data.map(cat => {
      let IconComponent = Icons.Code2;
      if (cat.icon && (Icons as any)[cat.icon]) {
        IconComponent = (Icons as any)[cat.icon];
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
    console.error('💥 Exception in getCategoriesFromDatabase:', err);
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
