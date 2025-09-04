import { test, expect } from '@playwright/test';

test('Verify Login Using Google Authentication', async ({ page }) => {
  // Step 1: Navigate to the login page
  await page.goto('https://dev.roost.ai/login');

  // Verify the page URL to ensure we are on the correct login page
  await expect(page).toHaveURL('https://dev.roost.ai/login');

  // Step 2: Locate and click the 'Sign in with Google' button
  try {
    const googleSignInButton = page.locator("//a[@href='https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile%20openid&openid.realm&include_granted_scopes=true&response_type=token&client_id=985988082020-h5fipp07abkqn9qer08dtc6ve33dan9i.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'google')]");
    await expect(googleSignInButton).toBeVisible(); // Ensure the button is visible
    await googleSignInButton.click(); // Click the button
  } catch (error) {
    console.error('Error locating or clicking the Google Sign-In button:', error);
    throw error;
  }

  // Step 3: Verify that the Google OAuth login page is displayed
  try {
    await page.waitForURL('https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile%20openid&openid.realm&include_granted_scopes=true&response_type=token&client_id=985988082020-h5fipp07abkqn9qer08dtc6ve33dan9i.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin', { timeout: 10000 });
    console.log('Google OAuth login page displayed successfully.');
  } catch (error) {
    console.error('Google OAuth login page did not load as expected:', error);
    throw error;
  }

  // Step 4: Enter valid Google account credentials and submit
  try {
    const emailField = page.locator('input[type="email"]');
    await expect(emailField).toBeVisible(); // Ensure email field is visible
    await emailField.fill('testuser@gmail.com'); // Fill in email
    await page.locator('button:has-text("Next")').click(); // Click 'Next'

    // Wait for password field to appear
    const passwordField = page.locator('input[type="password"]');
    await passwordField.waitFor({ timeout: 10000 });
    await passwordField.fill('validpassword123'); // Fill in password
    await page.locator('button:has-text("Next")').click(); // Click 'Next'
  } catch (error) {
    console.error('Error during Google credential input:', error);
    throw error;
  }

  // Step 5: Verify redirection back to the Roost dashboard upon successful authentication
  try {
    await page.waitForURL('https://dev.roost.ai', { timeout: 15000 });
    console.log('Redirected back to the Roost dashboard successfully.');
  } catch (error) {
    console.error('Redirection back to the Roost dashboard failed:', error);
    throw error;
  }

  // Step 6: Validate that the user is logged in and their profile data is displayed correctly
  try {
    const userProfile = page.locator('[data-testid="user-profile"]'); // Example selector for user profile
    await expect(userProfile).toBeVisible(); // Ensure profile is visible
    console.log('User profile data is visible on the dashboard.');
  } catch (error) {
    console.error('User profile data is not visible on the dashboard:', error);
    throw error;
  }
});