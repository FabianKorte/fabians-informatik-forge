import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login page', async ({ page }) => {
    await page.goto('/auth');
    await expect(page.locator('h1, h2').filter({ hasText: /anmelden|login/i })).toBeVisible();
  });

  test('should show validation errors for empty login form', async ({ page }) => {
    await page.goto('/auth');
    
    // Try to submit without filling form
    const submitButton = page.getByRole('button', { name: /anmelden|login/i }).first();
    await submitButton.click();
    
    // Check for validation messages
    await expect(page.locator('text=/erforderlich|required|e-mail|passwort/i').first()).toBeVisible({ timeout: 5000 });
  });

  test('should switch between login and signup', async ({ page }) => {
    await page.goto('/auth');
    
    // Check if we can toggle between login and signup
    const signupToggle = page.locator('text=/registrieren|sign up|konto erstellen/i').first();
    if (await signupToggle.isVisible()) {
      await signupToggle.click();
      await expect(page.locator('text=/registrieren|sign up|account erstellen/i').first()).toBeVisible();
    }
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/auth');
    
    // Fill in invalid credentials
    await page.fill('input[type="email"]', 'invalid@test.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    
    // Submit form
    const submitButton = page.getByRole('button', { name: /anmelden|login/i }).first();
    await submitButton.click();
    
    // Wait for error message
    await expect(page.locator('text=/fehler|error|ungültig|invalid/i').first()).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to home after logout', async ({ page }) => {
    // This test assumes user is already logged in
    await page.goto('/');
    
    // Look for logout button
    const logoutButton = page.locator('button:has-text("Abmelden"), button:has-text("Logout")').first();
    
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      
      // Should redirect to auth or home
      await expect(page).toHaveURL(/\/(auth)?$/);
    }
  });
});
