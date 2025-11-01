// SuperMemo SM-2 Algorithm Implementation
// Used for Spaced Repetition System

export interface SRSData {
  interval: number; // Days until next review
  easinessFactor: number; // 1.3 - 2.5
  repetitions: number; // Number of consecutive correct answers
  nextReview: Date;
}

/**
 * Calculate next SRS review based on user performance
 * @param quality - User's performance rating (0-5)
 *   5: Perfect response
 *   4: Correct response with hesitation
 *   3: Correct response with difficulty
 *   2: Incorrect but remembered
 *   1: Incorrect, vague memory
 *   0: Complete blackout
 * @param currentSRS - Current SRS data
 * @returns Updated SRS data
 */
export function calculateNextReview(quality: number, currentSRS: SRSData): SRSData {
  let { interval, easinessFactor, repetitions } = currentSRS;

  // Update easiness factor
  easinessFactor = Math.max(
    1.3,
    easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  // If quality < 3, reset repetitions
  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;

    // Calculate new interval
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easinessFactor);
    }
  }

  // Calculate next review date
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    interval,
    easinessFactor,
    repetitions,
    nextReview,
  };
}

/**
 * Determine if a card is due for review
 */
export function isDueForReview(nextReview: Date): boolean {
  return new Date() >= new Date(nextReview);
}

/**
 * Get difficulty label based on interval
 */
export function getDifficultyLabel(interval: number): string {
  if (interval <= 1) return 'Schwer';
  if (interval <= 6) return 'Mittel';
  if (interval <= 30) return 'Gut';
  return 'Einfach';
}
