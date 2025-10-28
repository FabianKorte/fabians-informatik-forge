import { z } from 'zod';

// Schema for flashcard items
export const flashcardItemSchema = z.object({
  front: z.string()
    .trim()
    .min(1, "Vorderseite darf nicht leer sein")
    .max(500, "Vorderseite darf maximal 500 Zeichen lang sein"),
  back: z.string()
    .trim()
    .min(1, "Rückseite darf nicht leer sein")
    .max(1000, "Rückseite darf maximal 1000 Zeichen lang sein"),
  explanation: z.string()
    .trim()
    .min(1, "Erklärung darf nicht leer sein")
    .max(1000, "Erklärung darf maximal 1000 Zeichen lang sein"),
});

// Schema for quiz items
export const quizItemSchema = z.object({
  question: z.string()
    .trim()
    .min(1, "Frage darf nicht leer sein")
    .max(500, "Frage darf maximal 500 Zeichen lang sein"),
  options: z.array(z.string().trim().min(1, "Option darf nicht leer sein").max(200, "Option zu lang"))
    .length(4, "Es müssen genau 4 Antwortmöglichkeiten vorhanden sein"),
  correctAnswer: z.number()
    .int()
    .min(0, "Ungültige Antwort-Index")
    .max(3, "Ungültige Antwort-Index"),
  explanation: z.string()
    .trim()
    .min(1, "Erklärung darf nicht leer sein")
    .max(1000, "Erklärung darf maximal 1000 Zeichen lang sein"),
});

// Schema for learning content suggestion
export const learningContentSuggestionSchema = z.object({
  category_id: z.string()
    .min(1, "Kategorie ist erforderlich"),
  module_type: z.string()
    .refine((val) => val === "flashcards" || val === "quiz", {
      message: "Ungültiger Lern-Typ"
    }),
  title: z.string()
    .trim()
    .min(1, "Titel ist erforderlich")
    .max(200, "Titel darf maximal 200 Zeichen lang sein"),
  items: z.union([
    z.array(flashcardItemSchema).min(1, "Mindestens eine Karteikarte erforderlich"),
    z.array(quizItemSchema).min(1, "Mindestens eine Frage erforderlich"),
  ])
});

// Schema for admin learning module
export const adminLearningModuleSchema = z.object({
  category_id: z.string()
    .min(1, "Kategorie ist erforderlich"),
  type: z.string()
    .min(1, "Typ ist erforderlich")
    .max(50, "Typ zu lang"),
  title: z.string()
    .trim()
    .min(1, "Titel ist erforderlich")
    .max(200, "Titel darf maximal 200 Zeichen lang sein"),
  content: z.string()
    .trim()
    .min(1, "Content ist erforderlich")
    .refine((val) => {
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    }, "Content muss ein gültiges JSON-Objekt sein")
    .transform((val) => JSON.parse(val)),
  order_index: z.number().int().optional(),
});

export type FlashcardItem = z.infer<typeof flashcardItemSchema>;
export type QuizItem = z.infer<typeof quizItemSchema>;
export type LearningContentSuggestion = z.infer<typeof learningContentSuggestionSchema>;
export type AdminLearningModule = z.infer<typeof adminLearningModuleSchema>;
