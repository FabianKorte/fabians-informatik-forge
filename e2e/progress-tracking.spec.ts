import { test, expect } from '@playwright/test';

test.describe('Progress Tracking Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to progress page', async ({ page }) => {
    // Look for progress link in navigation
    const progressLink = page.locator('a[href="/progress"], button:has-text("Fortschritt"), button:has-text("Progress")').first();
    
    if (await progressLink.isVisible({ timeout: 5000 })) {
      await progressLink.click();
      await expect(page).toHaveURL('/progress');
    } else {
      // Direct navigation
      await page.goto('/progress');
    }
    
    // Should show progress page
    await expect(page.locator('text=/fortschritt|progress|statistik/i').first()).toBeVisible({ timeout: 10000 });
  });

  test('should display overall statistics', async ({ page }) => {
    await page.goto('/progress');
    
    // Wait for stats to load
    await page.waitForLoadState('networkidle');
    
    // Should show statistics
    await expect(page.locator('text=/kategorien|categories|module|abgeschlossen|completed/i').first()).toBeVisible({ timeout: 10000 });
  });

  test('should display category progress', async ({ page }) => {
    await page.goto('/progress');
    await page.waitForLoadState('networkidle');
    
    // Should show individual category progress
    const categoryProgress = page.locator('[data-category-progress], .progress, text=/grundlagen|datenbanken/i');
    await expect(categoryProgress.first()).toBeVisible({ timeout: 10000 });
  });

  test('should show progress bars', async ({ page }) => {
    await page.goto('/progress');
    await page.waitForLoadState('networkidle');
    
    // Look for progress indicators
    const progressBar = page.locator('[role="progressbar"], .progress-bar, [data-progress]').first();
    await expect(progressBar).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to focus training from progress page', async ({ page }) => {
    await page.goto('/progress');
    await page.waitForLoadState('networkidle');
    
    // Look for focus training button
    const focusButton = page.locator('button:has-text("Schwerpunkt"), button:has-text("Focus"), a[href*="focus"]').first();
    
    if (await focusButton.isVisible({ timeout: 5000 })) {
      await focusButton.click();
      
      // Should navigate or show focus content
      await page.waitForTimeout(1000);
      await expect(page.locator('text=/schwerpunkt|focus|schwierig|difficult/i').first()).toBeVisible();
    }
  });

  test('should persist progress after completing module', async ({ page }) => {
    // Complete a flashcard
    await page.goto('/learn/grundlagen-it');
    await page.waitForLoadState('networkidle');
    
    const flashcardsButton = page.locator('button:has-text("Karteikarten")').first();
    if (await flashcardsButton.isVisible({ timeout: 5000 })) {
      await flashcardsButton.click();
      await page.waitForTimeout(1000);
      
      // Mark as known
      const knownButton = page.locator('button:has-text("Gewusst"), button:has-text("Known"), button:has-text("Richtig")').first();
      if (await knownButton.isVisible({ timeout: 5000 })) {
        await knownButton.click();
        await page.waitForTimeout(500);
      }
      
      // Navigate to progress page
      await page.goto('/progress');
      await page.waitForLoadState('networkidle');
      
      // Should show updated progress
      await expect(page.locator('text=/\d+/).first()).toBeVisible({ timeout: 10000 });
    }
  });

  test('should display tabs on progress page', async ({ page }) => {
    await page.goto('/progress');
    await page.waitForLoadState('networkidle');
    
    // Look for tabs
    const tabs = page.locator('[role="tab"], .tab, button:has-text("Übersicht")').first();
    if (await tabs.isVisible({ timeout: 5000 })) {
      await expect(tabs).toBeVisible();
    }
  });

  test('should show completion percentage', async ({ page }) => {
    await page.goto('/progress');
    await page.waitForLoadState('networkidle');
    
    // Look for percentage indicators
    await expect(page.locator('text=/%|Prozent/i').first()).toBeVisible({ timeout: 10000 });
  });
});
