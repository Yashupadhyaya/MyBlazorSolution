const { test, expect } = require('@playwright/test');

test('Validate Error Message for Invalid Login', async ({ page }) => {
  // Test Data
  const invalidEmail = 'invalid_user@example.com';
  const validPassword = 'SecurePassword123';
  const validEmail = 'valid_user@example.com';
  const invalidPassword = 'InvalidPassword';
  
  // Step 1: Navigate to login page
  await page.goto('https://docs.roost.ai/login');
  await expect(page).toHaveURL('https://docs.roost.ai/login');
  
  // Step 2: Verify visibility of email and password input fields
  const emailInput = page.locator('input#email');
  const passwordInput = page.locator('input#password');
  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  
  // Step 3: Verify visibility and enabled state of 'Log In' button
  const loginButton = page.locator('button.button');
  await expect(loginButton).toBeVisible();
  await expect(loginButton).toBeEnabled();
  
  // Step 4: Enter invalid email and valid password
  await emailInput.fill(invalidEmail);
  await passwordInput.fill(validPassword);
  
  // Step 5: Click 'Log In' button
  await loginButton.click();
  
  // Step 6: Verify error message for invalid email/password
  const errorMessage = page.locator('text=Invalid email or password.');
  await expect(errorMessage).toBeVisible();
  
  // Step 7: Clear email and password fields
  await emailInput.fill('');
  await passwordInput.fill('');
  
  // Step 8: Enter valid email and invalid password
  await emailInput.fill(validEmail);
  await passwordInput.fill(invalidPassword);
  
  // Step 9: Click 'Log In' button
  await loginButton.click();
  
  // Step 10: Verify error message for invalid email/password
  await expect(errorMessage).toBeVisible();
  
  // Step 11: Clear both input fields and leave them empty
  await emailInput.fill('');
  await passwordInput.fill('');
  
  // Step 12: Click 'Log In' button
  await loginButton.click();
  
  // Step 13: Verify error message indicating both fields are required
  const requiredFieldsErrorMessage = page.locator('text=Email and password are required.');
  await expect(requiredFieldsErrorMessage).toBeVisible();
});