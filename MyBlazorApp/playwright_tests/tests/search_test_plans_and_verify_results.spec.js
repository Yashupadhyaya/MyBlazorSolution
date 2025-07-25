const { test, expect } = require('@playwright/test');

test('Search Test Plans and Verify Results', async ({ page, browserName }) => {
  // Step 1: Navigate to the test plans page
  const url = 'https://dev.roost.ai/roostgpt/tests';
  await page.goto(url);

  // Step 2: Verify the visibility and enablement of the search input field
  const searchInput = page.locator("input[data-testid='tests-search-box']");
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toBeEnabled();

  // Step 12: Verify placeholder text is visible when the search field is empty
  await expect(searchInput).toHaveAttribute('placeholder', 'Search for Test Plans');

  // Step 3: Type a valid test plan name into the search field and assert its value
  const validTestPlanName = 'Test Plan 1';
  await searchInput.fill(validTestPlanName);
  await expect(searchInput).toHaveValue(validTestPlanName);

  // Step 4: Assert that the search results update dynamically
  const searchResults = page.locator('[data-testid="search-results"]');
  await expect(searchResults).toContainText(validTestPlanName);

  // Step 5: Type an invalid test plan name and verify no results are displayed
  const invalidTestPlanName = 'NonExistingTestPlan';
  await searchInput.fill(invalidTestPlanName);
  await expect(searchResults).not.toContainText(invalidTestPlanName);
  await expect(searchResults).toHaveText('No test plans found.');

  // Step 6: Clear the search field and verify all test plans are displayed
  await searchInput.fill('');
  await expect(searchResults).toContainText('Test Plan 1');
  await expect(searchResults).toContainText('Test Plan 2');

  // Step 7: Test with special characters and assert proper handling
  const specialCharactersInput = '@#$%^&*';
  await searchInput.fill(specialCharactersInput);
  await expect(searchResults).not.toContainText(specialCharactersInput);
  await expect(searchResults).toHaveText('No test plans found.');

  // Step 8: Reload the page and verify the search input resets
  await page.reload();
  await expect(searchInput).toBeEmpty();
  await expect(searchResults).toContainText('Test Plan 1');
  await expect(searchResults).toContainText('Test Plan 2');

  // Step 9: Test responsiveness by resizing the browser window
  await page.setViewportSize({ width: 800, height: 600 });
  await expect(searchInput).toBeVisible();
  await page.setViewportSize({ width: 1200, height: 800 });
  await expect(searchInput).toBeVisible();

  // Step 10: Test cross-browser compatibility (executed via Playwright's browserName parameter)
  console.log(`Testing browser compatibility on: ${browserName}`);

  // Step 11: Test accessibility via keyboard navigation
  await page.keyboard.press('Tab');
  await expect(searchInput).toBeFocused();
  await page.keyboard.type(validTestPlanName);
  await expect(searchInput).toHaveValue(validTestPlanName);
  await page.keyboard.press('Enter');
  await expect(searchResults).toContainText(validTestPlanName);

  // Step 13: Enable real-time monitoring of API calls triggered by search
  page.on('request', async (request) => {
    if (request.url().includes('/api/searchTestPlans')) {
      console.log('API request triggered:', request.url());
    }
  });

  // Step 14: Simulate slow network conditions
  await page.context().setNetworkConditions({
    download: 50 * 1024, // 50kbps
    upload: 50 * 1024,
    latency: 300 // 300ms
  });
  await searchInput.fill(validTestPlanName);
  await expect(searchResults).toContainText(validTestPlanName);

  // Step 15: Submit the search field with an empty value and verify behavior
  await searchInput.fill('');
  await page.keyboard.press('Enter');
  await expect(searchResults).toContainText('Test Plan 1');
  await expect(searchResults).toContainText('Test Plan 2');

  // Clean up network conditions
  await page.context().setNetworkConditions(undefined);

  console.log('Test completed successfully!');
});