const { test, expect } = require('@playwright/test');

test('Search Test Plans with Valid and Invalid Input', async ({ page }) => {
  // Constants and data requirements
  const url = 'https://dev.roost.ai/roostgpt/tests';
  const validTestPlanName = 'Integration Tests';
  const invalidTestPlanName = 'InvalidTestName123';
  const longString = 'Lorem ipsum dolor sit amet consectetuer adipiscing elit'.repeat(10);
  const specialCharacters = '!@#$%^&*()_+{}:"<>?';
  const sqlInjectionPayload = 'DROP TABLE users;';

  // Navigate to the test plans page
  await page.goto(url);
  await expect(page).toHaveURL(url);

  // Verify the visibility and accessibility of the search input box
  const searchBox = page.locator('[data-testid="tests-search-box"]');
  await expect(searchBox).toBeVisible();
  await expect(searchBox).toBeEnabled();

  // Step 3: Type a valid test plan name and verify results
  await searchBox.fill(validTestPlanName);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000); // Wait for search results to load
  const results = page.locator('.test-plan-result'); // Assuming results appear in elements with this class
  await expect(results).toContainText(validTestPlanName);

  // Step 5: Clear the search input box
  await searchBox.fill('');

  // Step 6: Type an invalid test plan name and verify "No test plans found" message
  await searchBox.fill(invalidTestPlanName);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000); // Wait for search results to load
  const noResultsMessage = page.locator('.no-results-message'); // Assuming this selector for "No results" message
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No test plans found');

  // Step 8: Type a very long string and verify UI handles it gracefully
  await searchBox.fill(longString);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000); // Wait for UI response
  await expect(searchBox).toHaveValue(longString); // Verify input remains intact

  // Step 10: Enter special characters and verify proper handling
  await searchBox.fill(specialCharacters);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000); // Wait for response
  const errorHandlingMessage = page.locator('.error-handling-message'); // Assuming selector for handling errors
  await expect(errorHandlingMessage).toBeVisible();

  // Step 12: Reload the page and verify reset state
  await page.reload();
  await expect(searchBox).toHaveValue('');
  const defaultResults = page.locator('.default-results'); // Assuming selector for default results
  await expect(defaultResults).toBeVisible();

  // Step 13: Test back and forward navigation for state persistence
  await page.goBack();
  await page.goForward();
  await expect(searchBox).toBeVisible();

  // Step 14: Resize browser window to simulate mobile responsiveness
  await page.setViewportSize({ width: 375, height: 667 }); // Simulating mobile viewport
  await expect(searchBox).toBeVisible();
  await searchBox.fill(validTestPlanName);
  await page.keyboard.press('Enter');
  await expect(results).toBeVisible();

  // Step 15: Check console logs for errors
  const logs = [];
  page.on('console', msg => {
    logs.push(msg.text());
  });
  await page.reload();
  expect(logs.some(log => log.includes('error'))).toBeFalsy(); // Ensure no errors in logs

  // Edge Case 1: Enter SQL Injection Payload
  await searchBox.fill(sqlInjectionPayload);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000); // Wait for response
  const sqlInjectionMessage = page.locator('.error-handling-message');
  await expect(sqlInjectionMessage).toBeVisible();

  // Edge Case 2: Simulate network failure
  await page.route('/api/test-plans/search', route => route.abort());
  await searchBox.fill(validTestPlanName);
  await page.keyboard.press('Enter');
  const networkErrorMessage = page.locator('.network-error-message'); // Assuming selector for network errors
  await expect(networkErrorMessage).toBeVisible();
});