const { test, expect } = require('@playwright/test');

test('Search Functionality for Test Plans', async ({ page, browser }) => {
  // Constants for test data
  const validSearchTerm = 'Unit Test';
  const partialSearchTerm = 'Unit';
  const invalidSearchTerm = 'InvalidPlan123';
  const specialCharacterSearch = '@#$$';
  const longSearchTerm = 'a'.repeat(255);
  const whitespaceSearchTerm = '   Test Plan   ';
  const searchInputSelector = "input[data-testid='tests-search-box']";

  // Step 1: Navigate to the test plans page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');

  // Step 2: Verify visibility of the search input field
  const searchInput = page.locator(searchInputSelector);
  await expect(searchInput).toBeVisible();

  // Step 3: Type a valid search term and verify results update
  await searchInput.fill(validSearchTerm);
  await page.waitForTimeout(500); // Allow time for results to update
  const results = page.locator('.search-results'); // Example selector for results
  await expect(results).toContainText(validSearchTerm);

  // Step 4: Clear the search field, type a partial search term and verify partial matches
  await searchInput.fill('');
  await searchInput.fill(partialSearchTerm);
  await page.waitForTimeout(500);
  await expect(results).toContainText(partialSearchTerm);

  // Step 5: Enter an invalid search term and verify 'No results found' message
  await searchInput.fill('');
  await searchInput.fill(invalidSearchTerm);
  await page.waitForTimeout(500);
  const noResultsMessage = page.locator('.no-results-message'); // Example selector for 'No results found'
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No results found');

  // Step 6: Test searching with special characters
  await searchInput.fill('');
  await searchInput.fill(specialCharacterSearch);
  await page.waitForTimeout(500);
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No results found');

  // Step 7: Test search with a large input string
  await searchInput.fill('');
  await searchInput.fill(longSearchTerm);
  await page.waitForTimeout(500);
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No results found');

  // Step 8: Perform a search, refresh the page, and verify search state is cleared
  await searchInput.fill(validSearchTerm);
  await page.reload();
  await expect(searchInput).toHaveValue('');

  // Step 9: Test search with leading and trailing whitespace
  await searchInput.fill(whitespaceSearchTerm);
  await page.waitForTimeout(500);
  await expect(results).toContainText(validSearchTerm.trim());

  // Step 10: Test concurrent searches in two browser tabs
  const context = await browser.newContext();
  const page2 = await context.newPage();
  await page2.goto('https://dev.roost.ai/roostgpt/tests');
  const searchInputTab2 = page2.locator(searchInputSelector);

  // Perform search in the first tab
  await searchInput.fill(validSearchTerm);
  await page.waitForTimeout(500);
  await expect(results).toContainText(validSearchTerm);

  // Perform search in the second tab
  await searchInputTab2.fill(partialSearchTerm);
  await page2.waitForTimeout(500);
  const resultsTab2 = page2.locator('.search-results');
  await expect(resultsTab2).toContainText(partialSearchTerm);

  // Verify both tabs work independently
  await expect(results).toContainText(validSearchTerm);
  await expect(resultsTab2).toContainText(partialSearchTerm);

  // Cleanup second tab
  await context.close();

  // Step 11: Repeat steps with different test plans (additional validation if required)
  console.log('Test completed successfully.');
});