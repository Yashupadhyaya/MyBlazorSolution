const { test, expect } = require('@playwright/test');

test('Validate Successful Login with Correct Credentials', async ({ page }) => {
  // Step 1: Navigate to the login page
  await page.goto('https://docs.roost.ai/login');
  
  // Verify that the login page loaded successfully
  await expect(page).toHaveURL('https://docs.roost.ai/login');

  // Step 2: Verify the visibility of the email and password input fields
  const emailInput = page.locator('input#email');
  const passwordInput = page.locator('input#password');
  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

  // Step 3: Verify the visibility and enablement of the 'Log In' button
  const loginButton = page.locator('button.button');
  await expect(loginButton).toBeVisible();
  await expect(loginButton).toBeEnabled();

  // Step 4: Enter a valid email into the email input field
  await emailInput.fill('valid_user@example.com');

  // Step 5: Enter a valid password into the password input field
  await passwordInput.fill('SecurePassword123');

  // Step 6: Click the 'Log In' button
  await loginButton.click();

  // Step 7: Wait for the page to navigate to the dashboard
  await page.waitForURL('https://dev.roost.ai');

  // Step 8: Verify navigation was successful by asserting the URL
  await expect(page).toHaveURL('https://dev.roost.ai');

  // Step 9: Verify that the dashboard elements are visible
  const dashboardHeader = page.locator('header.dashboard-header'); // Replace with the actual dashboard header selector
  await expect(dashboardHeader).toBeVisible();

  // Step 10: Verify user-specific information is displayed
  const userInfo = page.locator('div.user-info'); // Replace with the actual selector for user-specific information
  await expect(userInfo).toContainText('valid_user@example.com'); // Assuming the user email is displayed

  // Performance metrics (Optional, if you want to log them for debugging purposes)
  console.log('Login and navigation completed successfully.');
});