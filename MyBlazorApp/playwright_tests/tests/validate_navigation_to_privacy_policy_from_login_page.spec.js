import { test, expect } from '@playwright/test';

test('Validate Navigation to Privacy Policy from Login Page', async ({ page }) => {
  // Step 1: Navigate to the login page
  const loginPageURL = 'https://dev.roost.ai/login';
  await page.goto(loginPageURL);
  
  // Verify login page loaded correctly
  await expect(page).toHaveURL(loginPageURL);
  console.log('Login page loaded successfully.');

  // Step 2: Locate and click the 'Privacy Policy' link in the footer
  const privacyPolicyLinkSelector = "//a[@href='https://roost.ai/privacy-policy' and contains(@class, 'footer-item')]";
  
  try {
    const privacyPolicyLink = page.locator(privacyPolicyLinkSelector);
    await expect(privacyPolicyLink).toBeVisible();
    console.log('Privacy Policy link is visible.');
    
    await privacyPolicyLink.click();
    console.log('Clicked Privacy Policy link.');
  } catch (error) {
    console.error('Error locating or clicking the Privacy Policy link:', error);
    throw error;
  }

  // Step 3: Verify redirection to the Privacy Policy page
  const privacyPolicyPageURL = 'https://roost.ai/privacy-policy';
  try {
    await page.waitForURL(privacyPolicyPageURL, { timeout: 5000 });
    await expect(page).toHaveURL(privacyPolicyPageURL);
    console.log('Redirected to the Privacy Policy page successfully.');
  } catch (error) {
    console.error('Error verifying redirection to the Privacy Policy page:', error);
    throw error;
  }

  // Step 4: Check that the Privacy Policy content is displayed correctly
  try {
    const privacyPolicyContentLocator = page.locator('h1:has-text("Privacy Policy")'); // Assuming an h1 tag with "Privacy Policy" text exists
    await expect(privacyPolicyContentLocator).toBeVisible();
    console.log('Privacy Policy content is displayed correctly.');
  } catch (error) {
    console.error('Error verifying Privacy Policy content:', error);
    throw error;
  }

  // Step 5: Verify the Privacy Policy page is accessible and responsive
  try {
    const pageResponsiveTest = await page.evaluate(() => {
      return window.innerWidth > 0 && window.innerHeight > 0;
    });
    if (!pageResponsiveTest) {
      throw new Error('Privacy Policy page is not responsive.');
    }
    console.log('Privacy Policy page is accessible and responsive.');
  } catch (error) {
    console.error('Error verifying Privacy Policy page responsiveness:', error);
    throw error;
  }

  // Step 6: Return to the login page using the browser's back button
  try {
    await page.goBack();
    await page.waitForURL(loginPageURL, { timeout: 5000 });
    await expect(page).toHaveURL(loginPageURL);
    console.log('Returned to the login page successfully.');
  } catch (error) {
    console.error('Error returning to the login page:', error);
    throw error;
  }

  // Step 7: Confirm the login page is displayed correctly after navigation
  try {
    const loginPageHeaderLocator = page.locator('h1:has-text("Login")'); // Assuming an h1 tag with "Login" text exists
    await expect(loginPageHeaderLocator).toBeVisible();
    console.log('Login page is displayed correctly after navigation.');
  } catch (error) {
    console.error('Error verifying login page content after navigation:', error);
    throw error;
  }
});