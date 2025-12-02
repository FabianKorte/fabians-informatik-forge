import { test, expect } from '@playwright/test';

test.describe('Learning Modules Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display categories on home page', async ({ page }) => {
    // Wait for categories to load
    await expect(page.locator('text=/grundlagen|datenbanken|webentwicklung/i').first()).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to learning module', async ({ page }) => {
    // Click on first category
    const firstCategory = page.locator('[data-category], a[href*="/learn/"]').first();
    await expect(firstCategory).toBeVisible({ timeout: 10000 });
    await firstCategory.click();
    
    // Should be on learn page
    await expect(page).toHaveURL(/\/learn\/.+/);
    
    // Should show learning options
    await expect(page.locator('text=/karteikarten|quiz|training/i').first()).toBeVisible({ timeout: 10000 });
  });

  test('should start flashcards module', async ({ page }) => {
    // Navigate to a category
    await page.goto('/learn/grundlagen-it');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Click on Karteikarten option
    const flashcardsButton = page.locator('button:has-text("Karteikarten"), button:has-text("Flashcards")').first();
    if (await flashcardsButton.isVisible({ timeout: 5000 })) {
      await flashcardsButton.click();
      
      // Should show flashcard interface
      await expect(page.locator('text=/karte|card|antwort|answer/i').first()).toBeVisible({ timeout: 10000 });
    }
  });

  test('should start quiz module', async ({ page }) => {
    // Navigate to a category
    await page.goto('/learn/grundlagen-it');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Click on Quiz option
    const quizButton = page.locator('button:has-text("Quiz")').first();
    if (await quizButton.isVisible({ timeout: 5000 })) {
      await quizButton.click();
      
      // Should show quiz interface
      await expect(page.locator('text=/frage|question|antwort|answer/i').first()).toBeVisible({ timeout: 10000 });
    }
  });

  test('should navigate between flashcards', async ({ page }) => {
    await page.goto('/learn/grundlagen-it');
    await page.waitForLoadState('networkidle');
    
    // Start flashcards
    const flashcardsButton = page.locator('button:has-text("Karteikarten")').first();
    if (await flashcardsButton.isVisible({ timeout: 5000 })) {
      await flashcardsButton.click();
      
      // Wait for flashcard to load
      await page.waitForTimeout(1000);
      
      // Look for next/previous buttons
      const nextButton = page.locator('button:has-text("Weiter"), button:has-text("Next"), button[aria-label*="next"]').first();
      if (await nextButton.isVisible({ timeout: 5000 })) {
        await nextButton.click();
        await page.waitForTimeout(500);
        
        // Should still be in flashcard view
        await expect(page.locator('text=/karte|card/i').first()).toBeVisible();
      }
    }
  });

  test('should answer quiz questions', async ({ page }) => {
    await page.goto('/learn/grundlagen-it');
    await page.waitForLoadState('networkidle');
    
    // Start quiz
    const quizButton = page.locator('button:has-text("Quiz")').first();
    if (await quizButton.isVisible({ timeout: 5000 })) {
      await quizButton.click();
      await page.waitForTimeout(1000);
      
      // Select an answer
      const answerOption = page.locator('button:has-text("A)"), button:has-text("B)"), button:has-text("C)")').first();
      if (await answerOption.isVisible({ timeout: 5000 })) {
        await answerOption.click();
        
        // Should show feedback
        await expect(page.locator('text=/richtig|falsch|correct|wrong|weiter|next/i').first()).toBeVisible({ timeout: 5000 });
      }
    }
  });

  test('should return to category selection', async ({ page }) => {
    await page.goto('/learn/grundlagen-it');
    
    // Look for back button
    const backButton = page.locator('button:has-text("Zurück"), button[aria-label*="zurück"], a[href="/"]').first();
    if (await backButton.isVisible({ timeout: 5000 })) {
      await backButton.click();
      
      // Should be back on home page
      await expect(page).toHaveURL('/');
    }
  });
});
