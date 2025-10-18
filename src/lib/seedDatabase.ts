import { supabase } from "@/integrations/supabase/client";
import { categories } from "@/data/categories";
import { learnContent } from "@/data/learn/index";

const SEED_CACHE_KEY = 'db_seed_timestamp';
const SEED_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function seedDatabase() {
  try {
    // Check if we've already seeded recently
    const lastSeedTime = localStorage.getItem(SEED_CACHE_KEY);
    if (lastSeedTime) {
      const timeSinceLastSeed = Date.now() - parseInt(lastSeedTime);
      if (timeSinceLastSeed < SEED_CACHE_DURATION) {
        console.log('Database already seeded recently, skipping...');
        return;
      }
    }

    const categoriesToInsert = categories.map(cat => ({
      id: cat.id,
      title: cat.title,
      description: cat.description,
      icon: (cat.icon as any)?.name || 'Code2',
      difficulty: cat.difficulty,
      gradient: cat.gradient
    }));

    const { data: existingCats, error: existingCatsError } = await supabase
      .from('categories')
      .select('id');

    if (existingCatsError) {
      console.error('Error fetching existing categories:', existingCatsError);
    }

    const existingCatIds = new Set((existingCats || []).map((c: any) => c.id));
    const newCategories = categoriesToInsert.filter(c => !existingCatIds.has(c.id));

    if (newCategories.length > 0) {
      const { error: categoriesError } = await supabase
        .from('categories')
        .insert(newCategories);

      if (categoriesError) {
        console.error('Error seeding categories:', categoriesError);
      }
    }

    const learnModulesToInsert = [];
    let orderIndex = 0;

    for (const [categoryId, modules] of Object.entries(learnContent)) {
      if (!modules || modules.length === 0) continue;
      
      for (const module of modules) {
        const moduleData = {
          category_id: categoryId,
          type: module.type,
          title: module.title,
          content: JSON.parse(JSON.stringify(module)),
          order_index: orderIndex++
        };
        
        learnModulesToInsert.push(moduleData);
      }
    }

    const { data: existingModulesKeys, error: existingModulesKeysError } = await supabase
      .from('learn_modules')
      .select('category_id, type, title');

    if (existingModulesKeysError) {
      console.warn('Could not fetch existing learn_modules keys:', existingModulesKeysError.message);
    }

    const existingKeySet = new Set(
      (existingModulesKeys || []).map((m: any) => `${m.category_id}::${m.type}::${m.title}`)
    );
    
    const toInsert = learnModulesToInsert.filter(
      (m: any) => !existingKeySet.has(`${m.category_id}::${m.type}::${m.title}`)
    );

    if (toInsert.length === 0) return;

    const batchSize = 50;
    let insertedCount = 0;

    for (let i = 0; i < toInsert.length; i += batchSize) {
      const batch = toInsert.slice(i, i + batchSize);
      
      const { error: modulesError } = await supabase
        .from('learn_modules')
        .insert(batch);

      if (modulesError) {
        console.error(`Error seeding batch ${Math.floor(i / batchSize) + 1}:`, modulesError);
      } else {
        insertedCount += batch.length;
      }
    }

    // Cache the seed timestamp
    localStorage.setItem(SEED_CACHE_KEY, Date.now().toString());
    console.log('Database seeding completed successfully');

  } catch (error) {
    console.error('Error during database seeding:', error);
    throw error;
  }
}
