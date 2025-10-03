import { supabase } from "@/integrations/supabase/client";
import { categories } from "@/data/categories";
import { learnContent } from "@/data/learn/index";

export async function seedDatabase(forceReseed = false) {
  try {
    // Check if data already exists
    const { data: existingCategories } = await supabase
      .from('categories')
      .select('id')
      .limit(1);

    if (existingCategories && existingCategories.length > 0 && !forceReseed) {
      console.log('Categories already present - will ensure modules are seeded');
      // Do not return here; continue to seed learn_modules if needed
    }

    // Optional: Clear existing data only when forceReseed
    if (forceReseed) {
      console.log('Force reseed requested - attempting to clear existing data...');
      // Try to delete learn_modules first (may fail if no DELETE policy)
      const { error: deleteModulesError } = await supabase
        .from('learn_modules')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      if (deleteModulesError) console.warn('Skipping delete learn_modules due to RLS:', deleteModulesError.message);

      const { error: deleteCategoriesError } = await supabase
        .from('categories')
        .delete()
        .neq('id', '');
      if (deleteCategoriesError) console.warn('Skipping delete categories due to RLS:', deleteCategoriesError.message);
    }

    console.log('Starting database seeding...');

    // Upsert categories to avoid conflicts
    const categoriesToInsert = categories.map(cat => ({
      id: cat.id,
      title: cat.title,
      description: cat.description,
      icon: (cat.icon as any)?.name || 'Code2',
      difficulty: cat.difficulty,
      gradient: cat.gradient
    }));

    // Avoid RLS UPDATE violation by inserting only new categories
    const { data: existingCatIds, error: existingCatsError } = await supabase
      .from('categories')
      .select('id');

    if (existingCatsError) {
      console.warn('Could not fetch existing categories:', existingCatsError.message);
    }

    const existingIds = new Set((existingCatIds || []).map((c: any) => c.id));
    const newCategories = categoriesToInsert.filter(c => !existingIds.has(c.id));

    if (newCategories.length > 0) {
      const { error: categoriesError } = await supabase
        .from('categories')
        .insert(newCategories);

      if (categoriesError) {
        console.error('Error seeding categories:', categoriesError);
        throw categoriesError;
      }

      console.log(`Inserted ${newCategories.length} new categories`);
    } else {
      console.log('No new categories to insert');
    }

    // We won't early-return if some modules exist; we'll backfill missing modules below
    const { count: existingModulesCount, error: countError } = await supabase
      .from('learn_modules')
      .select('id', { count: 'exact', head: true });

    if (countError) {
      console.warn('Could not count learn_modules:', countError.message);
    } else {
      console.log('Existing learn_modules count:', existingModulesCount);
    }

    // Insert learn modules with full content
    const learnModulesToInsert = [];
    let orderIndex = 0;

    console.log('Preparing learn modules for insertion...');
    console.log('Categories in learnContent:', Object.keys(learnContent));

    for (const [categoryId, modules] of Object.entries(learnContent)) {
      console.log(`Processing category ${categoryId} with ${modules.length} modules`);
      
      for (const module of modules) {
        // Ensure we're storing the complete module with all its content
        const moduleData = {
          category_id: categoryId,
          type: module.type,
          title: module.title,
          content: JSON.parse(JSON.stringify(module)), // Deep clone to ensure all data is captured
          order_index: orderIndex++
        };
        
        learnModulesToInsert.push(moduleData);
      }
    }

    console.log(`Total modules prepared: ${learnModulesToInsert.length}`);

    // Deduplicate against existing modules by (category_id, type, title)
    const { data: existingModulesKeys, error: existingModulesKeysError } = await supabase
      .from('learn_modules')
      .select('category_id, type, title');

    if (existingModulesKeysError) {
      console.warn('Could not fetch existing learn_modules keys:', existingModulesKeysError.message);
    }

    const existingKeySet = new Set((existingModulesKeys || []).map((m: any) => `${m.category_id}::${m.type}::${m.title}`));
    const toInsert = learnModulesToInsert.filter((m: any) => !existingKeySet.has(`${m.category_id}::${m.type}::${m.title}`));

    console.log(`New modules to insert (deduped): ${toInsert.length}`);

    // Insert in batches to avoid payload size limits
    const batchSize = 50;
    for (let i = 0; i < toInsert.length; i += batchSize) {
      const batch = toInsert.slice(i, i + batchSize);
      const { error: modulesError } = await supabase
        .from('learn_modules')
        .insert(batch);

      if (modulesError) {
        console.error('Error seeding learn modules batch:', modulesError);
        throw modulesError;
      }
      
      console.log(`Seeded batch ${Math.floor(i / batchSize) + 1} (${batch.length} modules)`);
    }

    console.log(`Successfully seeded ${toInsert.length} learn modules`);
    console.log('Database seeding completed successfully');

  } catch (error) {
    console.error('Error during database seeding:', error);
    throw error;
  }
}
