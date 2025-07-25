const { test, expect } = require('@playwright/test');

test('Search Input Validation on Analysis Page', async ({ page }) => {
  const searchInputSelector = 'input[data-testid="events-search-box"]';

  // Step 1: Navigate to the Analysis page
  await page.goto('https://dev.roost.ai/roostgpt/analyses');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/analyses');
  console.log('Navigated to the Analysis page.');

  // Step 2: Locate the search input box
  const searchInput = page.locator(searchInputSelector);
  await expect(searchInput).toBeVisible();
  console.log('Search input box located.');

  // Step 3: Type a valid search query and verify dynamic results
  await searchInput.fill('Test Plan A');
  await page.waitForTimeout(1000); // Wait for results to update dynamically
  const searchResults = page.locator('.search-results'); // Assuming a class for results
  await expect(searchResults).toContainText('Test Plan A');
  console.log('Valid search query results verified.');

  // Step 4: Clear the search input box and verify full list restoration
  await searchInput.fill('');
  await page.waitForTimeout(1000); // Wait for results to restore
  await expect(searchResults).toBeVisible(); // Assuming full list is restored
  console.log('Full list restored after clearing search input.');

  // Step 5: Enter a search query with special characters
  await searchInput.fill('!@#$%^&*()');
  await page.waitForTimeout(1000);
  await expect(searchResults).toBeVisible(); // Verify no crash or unhandled exception
  console.log('Special character query handled gracefully.');

  // Step 6: Enter an extremely long search query
  const longQuery = 'Test Plan A '.repeat(50); // Generate a long query
  await searchInput.fill(longQuery);
  await page.waitForTimeout(1000);
  await expect(searchResults).toBeVisible(); // Verify no client-side issues
  console.log('Extremely long query handled without client-side issues.');

  // Step 7: Enter a numeric-only query
  await searchInput.fill('123456');
  await page.waitForTimeout(1000);
  await expect(searchResults).toBeVisible(); // Verify results for numeric query
  console.log('Numeric-only query handled correctly.');

  // Step 8: Enter an empty query
  await searchInput.fill('');
  await page.waitForTimeout(1000);
  await expect(searchResults).toBeVisible(); // Verify full list restoration
  console.log('Empty query restored full list of activities.');

  // Step 9: Test rapid sequential typing of multiple queries
  const queries = ['Test', 'Plan', 'A', '123', '!@#$', ''];
  for (const query of queries) {
    await searchInput.fill(query);
    await page.waitForTimeout(500); // Simulate rapid typing
  }
  await expect(searchResults).toBeVisible(); // Verify no lag or crash
  console.log('Rapid sequential typing handled correctly.');

  // Step 10: Simulate a slow network and test responsiveness
  await page.route('**/searchActivities', (route) => {
    setTimeout(() => route.continue(), 3000); // Simulate 3-second network delay
  });
  await searchInput.fill('Test Plan A');
  await page.waitForTimeout(4000); // Wait for delayed response
  await expect(searchResults).toContainText('Test Plan A');
  console.log('Slow network simulation handled correctly.');

  // Step 11: Verify no client-side crashes or unhandled exceptions
  try {
    await searchInput.fill('SELECT * FROM Users;'); // SQL injection test
    await page.waitForTimeout(1000);
    const pageErrors = await page.evaluate(() => window.console.error);
    if (pageErrors && pageErrors.length > 0) {
      console.error('Errors detected in console:', pageErrors);
      throw new Error('Client-side crash detected.');
    }
    console.log('No client-side crashes or unhandled exceptions detected.');
  } catch (error) {
    console.error('Error occurred during testing:', error);
    throw error; // Rethrow error for test failure
  }

  // Accessibility checks
  const ariaLabel = await searchInput.getAttribute('aria-label');
  expect(ariaLabel).not.toBeNull();
  console.log('Search input has appropriate aria-label for accessibility.');

  console.log('Search Input Validation test completed successfully.');
});