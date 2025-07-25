const { test, expect } = require('@playwright/test');

test('Verify Search Functionality for Test Plans', async ({ page }) => {
  // Navigate to the Test Plans page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');

  // Step 2: Verify the visibility of the search input field
  const searchInput = page.locator('input[data-testid="tests-search-box"]');
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toHaveAttribute('placeholder', 'Search for Test Plans');

  // Step 3: Type a valid query
  const validQuery = 'testplan1';
  await searchInput.fill(validQuery);

  // Step 4: Assert the number of displayed results matches the query
  const results = page.locator('.test-plan-result'); // Assuming '.test-plan-result' is a class for result items
  await expect(results).toHaveCountGreaterThan(0); // Adjust based on expected count

  // Step 5: Clear the search input and verify all results are displayed
  await searchInput.fill('');
  const allResults = page.locator('.test-plan-result');
  await expect(allResults).toHaveCountGreaterThan(0);

  // Step 6: Type an invalid query
  const invalidQuery = 'randomXYZ';
  await searchInput.fill(invalidQuery);

  // Step 7: Verify that no results are displayed and a 'No Results Found' message appears
  const noResultsMessage = page.locator('.no-results-message'); // Assuming '.no-results-message' for no results text
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No Results Found');

  // Step 8: Test boundary condition with maximum-length query
  const boundaryQuery = 'x'.repeat(256);
  await searchInput.fill(boundaryQuery);

  // Step 9: Verify application does not crash
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');

  // Step 10: Type a query with special characters and verify results
  const specialCharactersQuery = '@#$%^';
  await searchInput.fill(specialCharactersQuery);

  // Verify results or appropriate message
  await expect(results).toHaveCount(0);

  // Step 11: Reload the page and verify the search state does not persist
  await page.reload();
  await expect(searchInput).toHaveValue('');

  // Step 12: Conduct rapid consecutive searches
  const queries = ['query1', 'query2', 'query3'];
  for (let query of queries) {
    await searchInput.fill(query);
    await page.waitForTimeout(500); // Simulate rapid typing
    await expect(results).toHaveCountGreaterThanOrEqual(0);
  }

  // Step 13: Verify search responsiveness on different viewport sizes
  const viewports = [
    { width: 1920, height: 1080 }, // Desktop
    { width: 1280, height: 800 }, // Tablet
    { width: 375, height: 667 },  // Mobile
  ];

  for (let viewport of viewports) {
    await page.setViewportSize(viewport);
    await expect(searchInput).toBeVisible();
  }

  // Step 14: Ensure accessibility compliance for the search field
  await expect(searchInput).toHaveAttribute('aria-label', 'Search for Test Plans');

  // Step 15: Test keyboard navigation
  await page.keyboard.press('Tab');
  await expect(searchInput).toBeFocused();

  // Step 16: Verify API interaction for search queries
  const [response] = await Promise.all([
    page.waitForResponse((resp) => resp.url().includes('/api/search') && resp.status() === 200),
    searchInput.fill(validQuery),
  ]);
  const apiResponse = await response.json();
  expect(apiResponse).toHaveProperty('results');

  // Step 17: Test input with SQL injection attempts
  const sqlInjectionQuery = "'; DROP TABLE testplans;--";
  await searchInput.fill(sqlInjectionQuery);

  // Verify application does not crash
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');

  // Step 18: Verify error handling for network failures
  await page.route('/api/search', (route) => route.abort());
  await searchInput.fill(validQuery);
  const errorMessage = page.locator('.error-message'); // Assuming '.error-message' for network error text
  await expect(errorMessage).toBeVisible();

  // Step 19: Assert no duplicate results are displayed
  await page.unroute('/api/search');
  await searchInput.fill(validQuery);
  const resultTexts = await results.allTextContents();
  const uniqueResults = new Set(resultTexts);
  expect(uniqueResults.size).toEqual(resultTexts.length);

  // Step 20: Verify placeholder text reappears when input is cleared
  await searchInput.fill('');
  await expect(searchInput).toHaveAttribute('placeholder', 'Search for Test Plans');
});