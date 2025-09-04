import { test, expect } from '@playwright/test';

test('Verify Login via Google Authentication', async ({ page }) => {
  // Step 1: Navigate to the login page
  const loginPageURL = 'https://dev.roost.ai/login';
  await page.goto(loginPageURL);

  // Step 2: Verify the page loaded correctly
  await expect(page).toHaveURL(loginPageURL);

  // Step 3: Verify that the Google authentication button is visible and enabled
  const googleAuthButton = page.locator("//a[@href='https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile%20openid&openid.realm&include_granted_scopes=true&response_type=token&client_id=985988082020-h5fipp07abkqn9qer08dtc6ve33dan9i.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'google')]");
  await expect(googleAuthButton).toBeVisible();
  await expect(googleAuthButton).toBeEnabled();

  // Step 4: Click on the Google authentication button
  await googleAuthButton.click();

  // Step 5: Wait for the Google login page to load
  await page.waitForURL(/https:\/\/accounts.google.com\//);

  // Step 6: Enter valid Google account credentials
  try {
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill('valid-email@gmail.com'); // Replace with valid email
    await page.locator('button:has-text("Next")').click();

    // Wait for password input
    await page.waitForSelector('input[type="password"]', { timeout: 5000 });
    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill('valid-password'); // Replace with valid password
    await page.locator('button:has-text("Next")').click();
  } catch (error) {
    console.error('Error interacting with Google login page:', error);
    throw error;
  }

  // Step 7: Wait for redirection back to the dashboard
  const dashboardURL = 'https://dev.roost.ai/';
  await page.waitForURL(dashboardURL);

  // Step 8: Verify that the user is redirected to the dashboard
  await expect(page).toHaveURL(dashboardURL);

  // Step 9: Confirm that the user's name or email is displayed on the dashboard header
  const userDisplay = page.locator('header .user-info'); // Adjust selector based on actual dashboard structure
  await expect(userDisplay).toBeVisible();
  await expect(userDisplay).toContainText('valid-email@gmail.com'); // Replace with expected user email or name
});