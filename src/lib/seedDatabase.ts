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

    const { error: categoriesError } = await supabase
      .from('categories')
      .upsert(categoriesToInsert, { onConflict: 'id' });

    if (categoriesError) {
      console.error('Error seeding categories:', categoriesError);
      throw categoriesError;
    }

    console.log(`Upserted ${categoriesToInsert.length} categories`);

    // If not forceReseed and modules already exist, skip inserting modules
    const { count: existingModulesCount, error: countError } = await supabase
      .from('learn_modules')
      .select('id', { count: 'exact', head: true });

    if (countError) {
      console.warn('Could not count learn_modules:', countError.message);
    }

    if (!forceReseed && (existingModulesCount || 0) > 0) {
      console.log('Learn modules already present - skipping insert');
      return;
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

    console.log(`Total modules to insert: ${learnModulesToInsert.length}`);

    // Insert in batches to avoid payload size limits
    const batchSize = 1;
    for (let i = 0; i < learnModulesToInsert.length; i += batchSize) {
      const batch = learnModulesToInsert.slice(i, i + batchSize);
      const { error: modulesError } = await supabase
        .from('learn_modules')
        .insert(batch);

      if (modulesError) {
        console.error('Error seeding learn modules batch:', modulesError);
        throw modulesError;
      }
      
      console.log(`Seeded batch ${i / batchSize + 1} (${batch.length} modules)`);
    }

    console.log(`Successfully seeded ${learnModulesToInsert.length} learn modules`);
    console.log('Database seeding completed successfully');

  } catch (error) {
    console.error('Error during database seeding:', error);
    throw error;
  }
}
