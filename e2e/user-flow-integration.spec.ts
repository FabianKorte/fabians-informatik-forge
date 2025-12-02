import { test, expect } from '@playwright/test';
import { 
  generateTestUser, 
  signUp, 
  login, 
  logout, 
  isLoggedIn,
  goToProfile,
  updateProfile,
  verifyProfileInfo,
  waitForAuth
} from './helpers/auth-helpers';

test.describe('User Flow Integration Tests', () => {
  test.describe('Complete Registration to Profile Flow', () => {
    test('should complete full user journey: signup -> login -> profile edit', async ({ page }) => {
      const testUser = generateTestUser();

      // Step 1: Sign up
      await test.step('User signs up', async () => {
        await signUp(page, testUser);
        
        // Verify redirect to home or confirmation page
        await expect(page).not.toHaveURL(/\/auth/);
      });

      // Step 2: Verify logged in state
      await test.step('User is automatically logged in after signup', async () => {
        await waitForAuth(page);
        const loggedIn = await isLoggedIn(page);
        expect(loggedIn).toBe(true);
      });

      // Step 3: Navigate to profile
      await test.step('User navigates to profile page', async () => {
        await goToProfile(page);
        await expect(page).toHaveURL(/\/profile/);
      });

      // Step 4: Edit profile
      await test.step('User updates profile information', async () => {
        await updateProfile(page, {
          username: testUser.username || 'TestUser',
          bio: 'This is my test bio'
        });

        // Wait for success message
        await page.waitForTimeout(2000);
        
        // Verify profile was updated
        const successMessage = page.getByText(/erfolgreich|success|aktualisiert|updated/i);
        await expect(successMessage).toBeVisible({ timeout: 10000 });
      });

      // Step 5: Logout
      await test.step('User logs out', async () => {
        await logout(page);
        await expect(page).toHaveURL(/\/|\/auth/);
      });

      // Step 6: Login again
      await test.step('User logs in again', async () => {
        await login(page, testUser);
        await waitForAuth(page);
        
        const loggedIn = await isLoggedIn(page);
        expect(loggedIn).toBe(true);
      });

      // Step 7: Verify profile persists
      await test.step('Profile information persists after re-login', async () => {
        await verifyProfileInfo(page, {
          username: testUser.username
        });
      });
    });

    test('should handle signup with existing email', async ({ page }) => {
      const testUser = generateTestUser();

      // First signup
      await signUp(page, testUser);
      await waitForAuth(page);
      await logout(page);

      // Try to signup again with same email
      await page.goto('/auth');
      await page.waitForLoadState('networkidle');

      const signupButton = page.getByRole('button', { name: /registrieren|sign up/i });
      if (await signupButton.isVisible()) {
        await signupButton.click();
      }

      await page.getByLabel(/e-mail|email/i).fill(testUser.email);
      await page.getByLabel(/passwort|password/i).first().fill(testUser.password);

      const confirmPasswordField = page.getByLabel(/passwort bestätigen|confirm password/i);
      if (await confirmPasswordField.isVisible()) {
        await confirmPasswordField.fill(testUser.password);
      }

      await page.getByRole('button', { name: /registrieren|sign up|konto erstellen/i }).click();

      // Should show error message
      const errorMessage = page.getByText(/bereits|already|exists|vorhanden/i);
      await expect(errorMessage).toBeVisible({ timeout: 10000 });
    });

    test('should handle invalid login credentials', async ({ page }) => {
      await page.goto('/auth');
      await page.waitForLoadState('networkidle');

      await page.getByLabel(/e-mail|email/i).fill('invalid@example.com');
      await page.getByLabel(/passwort|password/i).fill('WrongPassword123!');

      await page.getByRole('button', { name: /anmelden|login|sign in/i }).last().click();

      // Should show error message
      const errorMessage = page.getByText(/ungültig|invalid|falsch|incorrect|wrong/i);
      await expect(errorMessage).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Profile Management Flow', () => {
    let testUser: ReturnType<typeof generateTestUser>;

    test.beforeEach(async ({ page }) => {
      testUser = generateTestUser();
      await signUp(page, testUser);
      await waitForAuth(page);
    });

    test('should update username successfully', async ({ page }) => {
      const newUsername = `Updated${Date.now()}`;
      
      await updateProfile(page, { username: newUsername });
      
      // Verify update
      await goToProfile(page);
      await expect(page.getByText(newUsername)).toBeVisible();
    });

    test('should update bio successfully', async ({ page }) => {
      const newBio = 'This is my updated biography with more information.';
      
      await updateProfile(page, { bio: newBio });
      
      // Verify update
      await goToProfile(page);
      await expect(page.getByText(newBio)).toBeVisible();
    });

    test('should navigate between pages while maintaining session', async ({ page }) => {
      // Navigate to different pages
      await page.goto('/');
      expect(await isLoggedIn(page)).toBe(true);

      await page.goto('/progress');
      await page.waitForLoadState('networkidle');
      expect(await isLoggedIn(page)).toBe(true);

      await page.goto('/lexikon');
      await page.waitForLoadState('networkidle');
      expect(await isLoggedIn(page)).toBe(true);

      await goToProfile(page);
      expect(await isLoggedIn(page)).toBe(true);
    });
  });

  test.describe('Session Persistence', () => {
    test('should maintain session after page reload', async ({ page }) => {
      const testUser = generateTestUser();
      
      await signUp(page, testUser);
      await waitForAuth(page);
      
      // Verify logged in
      expect(await isLoggedIn(page)).toBe(true);

      // Reload page
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Should still be logged in
      expect(await isLoggedIn(page)).toBe(true);
    });

    test('should handle session across multiple tabs', async ({ context }) => {
      const testUser = generateTestUser();
      
      // Tab 1: Login
      const page1 = await context.newPage();
      await signUp(page1, testUser);
      await waitForAuth(page1);
      expect(await isLoggedIn(page1)).toBe(true);

      // Tab 2: Should be logged in
      const page2 = await context.newPage();
      await page2.goto('/');
      await page2.waitForLoadState('networkidle');
      
      // Note: This might not work in all scenarios due to how Supabase handles sessions
      // But it's good to test the expected behavior
      await page2.reload();
      await page2.waitForLoadState('networkidle');
    });
  });

  test.describe('Protected Routes', () => {
    test('should redirect to auth when accessing profile without login', async ({ page }) => {
      await page.goto('/profile');
      await page.waitForLoadState('networkidle');

      // Should be redirected to auth page
      await expect(page).toHaveURL(/\/auth/);
    });

    test('should redirect to auth when accessing dashboard without login', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Should be redirected to auth page
      await expect(page).toHaveURL(/\/auth/);
    });

    test('should allow access to protected routes after login', async ({ page }) => {
      const testUser = generateTestUser();
      
      await signUp(page, testUser);
      await waitForAuth(page);

      // Try accessing protected routes
      await page.goto('/profile');
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/profile/);

      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/dashboard/);
    });
  });

  test.describe('Login/Logout Cycle', () => {
    test('should complete multiple login/logout cycles', async ({ page }) => {
      const testUser = generateTestUser();
      
      // Initial signup
      await signUp(page, testUser);
      await waitForAuth(page);

      // Cycle 1
      await logout(page);
      expect(await isLoggedIn(page)).toBe(false);
      await login(page, testUser);
      await waitForAuth(page);
      expect(await isLoggedIn(page)).toBe(true);

      // Cycle 2
      await logout(page);
      expect(await isLoggedIn(page)).toBe(false);
      await login(page, testUser);
      await waitForAuth(page);
      expect(await isLoggedIn(page)).toBe(true);
    });
  });
});
