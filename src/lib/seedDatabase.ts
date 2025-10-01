import { supabase } from "@/integrations/supabase/client";
import { categories } from "@/data/categories";
import { learnContent } from "@/data/learnContent";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const { data: existingCategories } = await supabase
      .from('categories')
      .select('id')
      .limit(1);

    if (existingCategories && existingCategories.length > 0) {
      console.log('Database already seeded');
      return;
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

    // Insert learn modules
    const learnModulesToInsert = [];
    let orderIndex = 0;

    for (const [categoryId, modules] of Object.entries(learnContent)) {
      for (const module of modules) {
        learnModulesToInsert.push({
          category_id: categoryId,
          type: module.type,
          title: module.title,
          content: module,
          order_index: orderIndex++
        });
      }
    }

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
