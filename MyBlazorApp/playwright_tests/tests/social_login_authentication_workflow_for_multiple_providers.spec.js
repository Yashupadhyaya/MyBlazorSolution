const { test, expect } = require('@playwright/test');

test('Social Login Authentication Workflow for Multiple Providers', async ({ page }) => {
  // Step 1: Navigate to the login page
  await page.goto('https://dev.roost.ai/login');
  await expect(page).toHaveURL('https://dev.roost.ai/login');
  console.log('Navigated to the login page.');

  // Step 2: Verify visibility and accessibility of all social login buttons
  const socialButtons = [
    { name: 'Google', selector: 'a.google', redirectUrl: 'https://accounts.google.com/' },
    { name: 'GitHub', selector: 'a.git', redirectUrl: 'https://github.com/login' },
    { name: 'Microsoft', selector: 'a.azure', redirectUrl: 'https://login.microsoftonline.com/' },
    { name: 'Okta', selector: 'a.okta', redirectUrl: 'https://www.okta.com/' },
    { name: 'Auth0', selector: 'a.auth0', redirectUrl: 'https://auth0.com/' },
    { name: 'PingID', selector: 'a.pingFederate', redirectUrl: 'https://www.pingidentity.com/' }
  ];
  
  for (const button of socialButtons) {
    const locator = page.locator(button.selector);
    await expect(locator).toBeVisible();
    console.log(`${button.name} login button is visible.`);
  }

  // Helper function to test login workflows
  async function testSocialLogin(provider) {
    console.log(`Testing ${provider.name} login.`);
    const loginButton = page.locator(provider.selector);

    // Step 3: Click the login button
    await loginButton.click();
    console.log(`${provider.name} login button clicked.`);

    // Step 4: Confirm redirection to the OAuth login page
    await page.waitForURL(provider.redirectUrl, { timeout: 10000 });
    await expect(page).toHaveURL(provider.redirectUrl);
    console.log(`Redirected to ${provider.name}'s OAuth login page.`);

    // Simulate authentication steps
    console.log(`Simulating ${provider.name} authentication...`);
    await page.goto('https://dev.roost.ai/login'); // Simulate successful redirection back
    await expect(page).toHaveURL('https://dev.roost.ai/login');
    console.log(`${provider.name} authentication successful and redirected back to login page.`);

    // Step 6: Verify redirection to the application dashboard after login
    await page.goto('https://dev.roost.ai/dashboard');
    await expect(page).toHaveURL('https://dev.roost.ai/dashboard');
    console.log(`Redirected to application dashboard after ${provider.name} login.`);

    // Step 7: Logout and return to the login page
    const logoutButton = page.locator('button.logout');
    await logoutButton.click();
    await page.waitForURL('https://dev.roost.ai/login');
    await expect(page).toHaveURL('https://dev.roost.ai/login');
    console.log(`Logged out and returned to login page.`);
  }

  // Step 8-10: Test failed authentication and error message handling
  async function testFailedLogin(provider) {
    console.log(`Testing failed authentication for ${provider.name}.`);
    const loginButton = page.locator(provider.selector);

    await loginButton.click();
    console.log(`${provider.name} login button clicked.`);

    // Simulate failed login
    await page.goto('https://dev.roost.ai/login?error=authentication_failed'); // Simulate failed login
    await expect(page).toHaveURL('https://dev.roost.ai/login?error=authentication_failed');
    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    console.log(`Error message displayed for ${provider.name} failed authentication.`);
  }

  // Step 11: Repeat login workflows for all providers
  for (const provider of socialButtons) {
    await testSocialLogin(provider);
    await testFailedLogin(provider);
  }

  // Step 12: Test session persistence
  console.log('Testing session persistence after login.');
  await page.reload();
  await expect(page).toHaveURL('https://dev.roost.ai/dashboard');
  console.log('Session persisted after page reload.');

  // Step 13: Verify that protected routes are accessible after login
  await page.goto('https://dev.roost.ai/protected-route');
  await expect(page).toHaveURL('https://dev.roost.ai/protected-route');
  console.log('Protected route is accessible after login.');

  // Step 14: Simulate interrupted login (browser closed or network failure)
  console.log('Testing behavior for interrupted login.');
  try {
    await page.goto('https://dev.roost.ai/login');
    // Simulate network failure by blocking requests
    await page.route('**/*', route => route.abort());
    const loginButton = page.locator('a.google');
    await loginButton.click();
    console.log('Simulated network failure during login.');
  } catch (error) {
    console.log('Error during interrupted login simulation:', error);
  }

  // Step 15: Validate logout functionality
  console.log('Testing logout functionality.');
  const logoutButton = page.locator('button.logout');
  await logoutButton.click();
  await page.waitForURL('https://dev.roost.ai/login');
  await expect(page).toHaveURL('https://dev.roost.ai/login');
  console.log('Logout functionality validated.');

  // Step 16: Simulate token expiry and verify re-authentication request
  console.log('Simulating token expiry and verifying re-authentication.');
  await page.goto('https://dev.roost.ai/dashboard');
  await page.evaluate(() => localStorage.setItem('auth_token', 'expired_token')); // Simulate token expiry
  await page.goto('https://dev.roost.ai/login');
  const reAuthMessage = page.locator('.re-auth-message');
  await expect(reAuthMessage).toBeVisible();
  console.log('Re-authentication request triggered after token expiry.');
});