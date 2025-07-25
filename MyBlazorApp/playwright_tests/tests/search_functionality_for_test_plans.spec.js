const { test, expect } = require('@playwright/test');

test('Search Functionality for Test Plans', async ({ page }) => {
  // Test Data
  const baseURL = 'https://dev.roost.ai/roostgpt/tests';
  const validTestPlan = 'Regression Test Plan';
  const partialTestPlan = 'Regress';
  const invalidTestPlan = 'NonExistentPlan123';
  const specialCharacters = '!@#$%^&*()';
  const longString = 'a'.repeat(256); // 256 characters

  // Selectors
  const searchInputSelector = "input[data-testid='tests-search-box']";
  const searchButtonSelector = "button[type='submit']";

  // Step 1: Navigate to the Test Plans page
  await page.goto(baseURL);
  await expect(page).toHaveURL(baseURL);

  // Step 2: Verify the visibility of the search input field
  const searchInput = page.locator(searchInputSelector);
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toHaveAttribute('placeholder', 'Search for Test Plans');

  // Step 3: Search with a valid test plan name
  await searchInput.fill(validTestPlan);
  await page.locator(searchButtonSelector).click();
  await page.waitForResponse(response => response.url().includes('/search') && response.status() === 200);
  const results = page.locator('.search-results');
  await expect(results).toContainText(validTestPlan);

  // Step 5: Search with a partial test plan name
  await searchInput.fill(partialTestPlan);
  await page.locator(searchButtonSelector).click();
  await page.waitForResponse(response => response.url().includes('/search') && response.status() === 200);
  await expect(results).toContainText(partialTestPlan);

  // Step 7: Search with an invalid test plan name
  await searchInput.fill(invalidTestPlan);
  await page.locator(searchButtonSelector).click();
  await page.waitForResponse(response => response.url().includes('/search') && response.status() === 200);
  await expect(results).toContainText('No results found');

  // Step 9: Search with special characters
  await searchInput.fill(specialCharacters);
  await page.locator(searchButtonSelector).click();
  await page.waitForResponse(response => response.url().includes('/search') && response.status() === 200);
  await expect(results).toBeVisible(); // Ensure the application does not crash

  // Step 11: Search with a very long string
  await searchInput.fill(longString);
  await page.locator(searchButtonSelector).click();
  await page.waitForResponse(response => response.url().includes('/search') && response.status() === 200);
  await expect(results).toBeVisible(); // Ensure no performance degradation

  // Step 13: Reload the page and ensure search state is reset
  await page.reload();
  await expect(searchInput).toBeEmpty();

  // Step 14: Back button navigation after a search
  await searchInput.fill(validTestPlan);
  await page.locator(searchButtonSelector).click();
  await page.waitForResponse(response => response.url().includes('/search') && response.status() === 200);
  await page.goBack();
  await expect(searchInput).toHaveValue(validTestPlan);

  // Step 16: Cross-tab navigation and search state persistence
  await page.locator('text=Analysis').click(); // Navigate to 'Analysis' tab
  await expect(page).toHaveURL(/.*analysis/);
  await page.locator('text=Test Plans').click(); // Return to 'Test Plans'
  await expect(searchInput).toHaveValue(validTestPlan);

  // Step 18: Rapid consecutive searches
  const rapidSearches = ['Test1', 'Test2', 'Test3'];
  for (const search of rapidSearches) {
    await searchInput.fill(search);
    await page.locator(searchButtonSelector).click();
    await page.waitForResponse(response => response.url().includes('/search') && response.status() === 200);
  }
  await expect(results).toBeVisible(); // Ensure application handles throttling gracefully
});