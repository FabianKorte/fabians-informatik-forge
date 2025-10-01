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
      console.log('Database already seeded');
      return;
    }

    // If forceReseed, delete existing data
    if (forceReseed) {
      console.log('Force reseed requested - clearing existing data...');
      
      // Delete learn_modules first (due to foreign key constraint)
      const { error: deleteModulesError } = await supabase
        .from('learn_modules')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
      
      if (deleteModulesError) {
        console.error('Error deleting learn modules:', deleteModulesError);
      }

      // Delete categories
      const { error: deleteCategoriesError } = await supabase
        .from('categories')
        .delete()
        .neq('id', ''); // Delete all
      
      if (deleteCategoriesError) {
        console.error('Error deleting categories:', deleteCategoriesError);
      }
      
      console.log('Existing data cleared');
    }

    console.log('Starting database seeding...');

    // Insert categories
    const categoriesToInsert = categories.map(cat => ({
      id: cat.id,
      title: cat.title,
      description: cat.description,
      icon: cat.icon.name || 'Code2',
      difficulty: cat.difficulty,
      gradient: cat.gradient
    }));

    const { error: categoriesError } = await supabase
      .from('categories')
      .insert(categoriesToInsert);

    if (categoriesError) {
      console.error('Error seeding categories:', categoriesError);
      throw categoriesError;
    }

    console.log(`Seeded ${categoriesToInsert.length} categories`);

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
    const batchSize = 50;
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
