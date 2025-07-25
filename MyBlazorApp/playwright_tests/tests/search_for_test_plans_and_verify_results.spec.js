const { test, expect } = require('@playwright/test');

test('Search for Test Plans and Verify Results', async ({ page }) => {
  // Step 1: Navigate to the test plans page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');

  // Step 2: Verify the visibility of the search input box
  const searchInput = page.locator('input[data-testid="tests-search-box"]');
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toHaveAttribute('placeholder', 'Search for Test Plans');

  // Step 3: Search for a valid test plan
  const validTestPlanName = 'RegressionTest1';
  await searchInput.fill(validTestPlanName);
  await searchInput.press('Enter');
  await page.waitForTimeout(300); // Allow time for search results to load

  // Step 4: Verify the results match the search query
  const resultsTable = page.locator('table');
  const resultRows = resultsTable.locator('tbody tr');
  await expect(resultRows).toContainText(validTestPlanName);

  // Step 5: Search for a random invalid test plan name
  const invalidTestPlanName = 'NonExistentTestPlan';
  await searchInput.fill(invalidTestPlanName);
  await searchInput.press('Enter');
  await page.waitForTimeout(300);

  // Step 6: Verify 'No results found' message is displayed
  const noResultsMessage = page.locator('text=No results found');
  await expect(noResultsMessage).toBeVisible();

  // Step 7: Test SQL injection input
  const sqlInjectionString = "' OR 1=1 --";
  await searchInput.fill(sqlInjectionString);
  await searchInput.press('Enter');
  await page.waitForTimeout(300);

  // Step 8: Verify input is sanitized and no results or errors are displayed
  await expect(noResultsMessage).toBeVisible();

  // Step 9: Test special characters as input
  const specialCharacters = '@#$%^&*()';
  await searchInput.fill(specialCharacters);
  await searchInput.press('Enter');
  await page.waitForTimeout(300);

  // Step 10: Verify input is sanitized and no results or errors are displayed
  await expect(noResultsMessage).toBeVisible();

  // Step 11: Reload the page and verify reset state
  await page.reload();
  await expect(searchInput).toBeEmpty();
  await expect(resultsTable).not.toContainText(validTestPlanName);

  // Step 12: Verify result count matches database record (mocked as 1 result for 'RegressionTest1')
  await searchInput.fill(validTestPlanName);
  await searchInput.press('Enter');
  await page.waitForTimeout(300);
  const resultCount = await resultRows.count();
  expect(resultCount).toBe(1); // Assuming 1 result in the database

  // Step 13: Test search input during page loading
  await page.reload({ waitUntil: 'domcontentloaded' });
  await searchInput.fill(validTestPlanName);

  // Step 14: Test extremely long strings
  const longString = 'a'.repeat(5000);
  await searchInput.fill(longString);
  await searchInput.press('Enter');
  await page.waitForTimeout(300);

  // Verify application handles long input gracefully
  await expect(noResultsMessage).toBeVisible();

  // Step 15: Test keyboard navigation (Tab/Shift+Tab)
  await page.keyboard.press('Tab');
  await expect(searchInput).toBeFocused();

  // Step 16: Verify responsiveness across screen sizes
  const viewports = [
    { width: 1920, height: 1080 }, // Desktop
    { width: 768, height: 1024 }, // Tablet
    { width: 375, height: 667 },  // Mobile
  ];
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await expect(searchInput).toBeVisible();
  }
});