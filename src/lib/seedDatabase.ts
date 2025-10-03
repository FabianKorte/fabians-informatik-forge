import { supabase } from "@/integrations/supabase/client";
import { categories } from "@/data/categories";
import { learnContent } from "@/data/learn/index";

export async function seedDatabase(forceReseed = false) {
  try {
    console.log('Starting database seeding...');

    // Step 1: Ensure all categories exist
    const categoriesToInsert = categories.map(cat => ({
      id: cat.id,
      title: cat.title,
      description: cat.description,
      icon: (cat.icon as any)?.name || 'Code2',
      difficulty: cat.difficulty,
      gradient: cat.gradient
    }));

    // Fetch existing category IDs
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
      } else {
        console.log(`Inserted ${newCategories.length} new categories`);
      }
    } else {
      console.log('All categories already exist');
    }

    // Step 2: Prepare learn modules from all categories
    const learnModulesToInsert = [];
    let orderIndex = 0;

    console.log('Categories in learnContent:', Object.keys(learnContent));

    for (const [categoryId, modules] of Object.entries(learnContent)) {
      if (!modules || modules.length === 0) {
        console.log(`Skipping empty category: ${categoryId}`);
        continue;
      }
      
      console.log(`Processing category ${categoryId} with ${modules.length} modules`);
      
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

    console.log(`Total modules prepared: ${learnModulesToInsert.length}`);

    // Step 3: Deduplicate against existing modules
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

    console.log(`New modules to insert (after deduplication): ${toInsert.length}`);

    if (toInsert.length === 0) {
      console.log('No new modules to insert - database is up to date');
      return;
    }

    // Step 4: Insert in batches
    const batchSize = 50;
    let insertedCount = 0;

    for (let i = 0; i < toInsert.length; i += batchSize) {
      const batch = toInsert.slice(i, i + batchSize);
      
      const { error: modulesError } = await supabase
        .from('learn_modules')
        .insert(batch);

      if (modulesError) {
        console.error(`Error seeding batch ${Math.floor(i / batchSize) + 1}:`, modulesError);
        // Continue with next batch instead of throwing
      } else {
        insertedCount += batch.length;
        console.log(`Seeded batch ${Math.floor(i / batchSize) + 1} (${batch.length} modules)`);
      }
    }

    console.log(`Successfully seeded ${insertedCount} learn modules`);
    console.log('Database seeding completed successfully');

  } catch (error) {
    console.error('Error during database seeding:', error);
    throw error;
  }
}
