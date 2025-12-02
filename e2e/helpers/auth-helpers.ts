import { Page, expect } from '@playwright/test';

/**
 * Helper functions for authentication flows in E2E tests
 */

export interface TestUser {
  email: string;
  password: string;
  username?: string;
}

/**
 * Generates a unique test user with timestamp
 */
export function generateTestUser(): TestUser {
  const timestamp = Date.now();
  return {
    email: `test.user.${timestamp}@example.com`,
    password: 'TestPassword123!',
    username: `TestUser${timestamp}`
  };
}

/**
 * Signs up a new user
 */
export async function signUp(page: Page, user: TestUser) {
  await page.goto('/auth');
  await page.waitForLoadState('networkidle');

  // Switch to signup if on login
  const signupButton = page.getByRole('button', { name: /registrieren|sign up/i });
  if (await signupButton.isVisible()) {
    await signupButton.click();
  }

  // Fill signup form
  await page.getByLabel(/e-mail|email/i).fill(user.email);
  await page.getByLabel(/passwort|password/i).first().fill(user.password);
  
  // Fill confirm password if exists
  const confirmPasswordField = page.getByLabel(/passwort bestätigen|confirm password/i);
  if (await confirmPasswordField.isVisible()) {
    await confirmPasswordField.fill(user.password);
  }

  // Submit form
  await page.getByRole('button', { name: /registrieren|sign up|konto erstellen/i }).click();

  // Wait for redirect or success message
  await page.waitForLoadState('networkidle');
}

/**
 * Logs in an existing user
 */
export async function login(page: Page, user: TestUser) {
  await page.goto('/auth');
  await page.waitForLoadState('networkidle');

  // Switch to login if on signup
  const loginButton = page.getByRole('button', { name: /anmelden|login|sign in/i }).first();
  if (await loginButton.isVisible()) {
    await loginButton.click();
  }

  // Fill login form
  await page.getByLabel(/e-mail|email/i).fill(user.email);
  await page.getByLabel(/passwort|password/i).fill(user.password);

  // Submit form
  await page.getByRole('button', { name: /anmelden|login|sign in/i }).last().click();

  // Wait for redirect to home
  await page.waitForLoadState('networkidle');
}

/**
 * Logs out the current user
 */
export async function logout(page: Page) {
  // Look for logout button in navigation or profile menu
  const logoutButton = page.getByRole('button', { name: /abmelden|logout|sign out/i });
  
  if (await logoutButton.isVisible()) {
    await logoutButton.click();
  } else {
    // Try to open user menu first
    const userMenuButton = page.getByRole('button', { name: /profil|profile|user|benutzer/i });
    if (await userMenuButton.isVisible()) {
      await userMenuButton.click();
      await page.getByRole('menuitem', { name: /abmelden|logout/i }).click();
    }
  }

  await page.waitForLoadState('networkidle');
}

/**
 * Checks if user is logged in
 */
export async function isLoggedIn(page: Page): Promise<boolean> {
  // Check for elements that only appear when logged in
  const logoutButton = page.getByRole('button', { name: /abmelden|logout/i });
  const profileLink = page.getByRole('link', { name: /profil|profile/i });
  
  return (await logoutButton.isVisible()) || (await profileLink.isVisible());
}

/**
 * Waits for authentication to complete
 */
export async function waitForAuth(page: Page, timeout = 5000) {
  await page.waitForTimeout(timeout);
  await page.waitForLoadState('networkidle');
}

/**
 * Navigates to profile page
 */
export async function goToProfile(page: Page) {
  // Try direct navigation first
  await page.goto('/profile');
  await page.waitForLoadState('networkidle');
  
  // If redirected to auth, user is not logged in
  if (page.url().includes('/auth')) {
    throw new Error('User is not logged in - redirected to auth page');
  }
}

/**
 * Updates user profile information
 */
export async function updateProfile(page: Page, data: { username?: string; bio?: string }) {
  await goToProfile(page);

  if (data.username) {
    const usernameField = page.getByLabel(/benutzername|username/i);
    await usernameField.clear();
    await usernameField.fill(data.username);
  }

  if (data.bio) {
    const bioField = page.getByLabel(/bio|über mich|about/i);
    await bioField.clear();
    await bioField.fill(data.bio);
  }

  // Submit form
  const saveButton = page.getByRole('button', { name: /speichern|save|aktualisieren|update/i });
  await saveButton.click();

  // Wait for success message or update
  await page.waitForLoadState('networkidle');
}

/**
 * Verifies profile information is displayed
 */
export async function verifyProfileInfo(page: Page, expectedData: { username?: string; email?: string }) {
  await goToProfile(page);

  if (expectedData.username) {
    const usernameElement = page.getByText(expectedData.username);
    await expect(usernameElement).toBeVisible();
  }

  if (expectedData.email) {
    const emailElement = page.getByText(expectedData.email);
    await expect(emailElement).toBeVisible();
  }
}
