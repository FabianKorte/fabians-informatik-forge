import type { LearnModule } from "@/types/learn";

// Allowed module types that are actually used in the application
const ALLOWED_MODULE_TYPES = ['flashcards', 'quiz', 'interactive'] as const;

/**
 * Filters learn modules to only include types that are implemented and used
 * This removes legacy module types that are no longer supported
 */
export function filterSupportedModules(modules: LearnModule[]): LearnModule[] {
  return modules.filter(module => 
    ALLOWED_MODULE_TYPES.includes(module.type as any)
  );
}

/**
 * Filters learn content by category, removing unsupported module types
 */
export function filterLearnContent(
  content: Record<string, LearnModule[]>
): Record<string, LearnModule[]> {
  const filtered: Record<string, LearnModule[]> = {};
  
  for (const [key, modules] of Object.entries(content)) {
    filtered[key] = filterSupportedModules(modules);
  }
  
  return filtered;
}
