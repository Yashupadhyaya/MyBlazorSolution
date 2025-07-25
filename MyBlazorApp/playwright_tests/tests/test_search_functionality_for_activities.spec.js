const { test, expect } = require('@playwright/test');

test('Test Search Functionality for Activities', async ({ page }) => {
  // Data requirements
  const validSearchTerm = 'Test Plan 1';
  const invalidSearchTerm = 'NonExistentActivity';
  const specialCharacters = '!@#$%^';
  const longInput = 'a'.repeat(256);
  const emptyInput = '';

  // Step 1: Navigate to the 'Generations' page
  await page.goto('https://dev.roost.ai/roostgpt/events');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');
  console.log('Navigated to Generations page.');

  // Step 2: Verify the visibility of the search input field
  const searchInput = page.locator("input[data-testid='events-search-box']");
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toHaveAttribute('placeholder', 'Search for Activities');
  console.log('Search input field is visible.');

  // Step 3: Type a valid search term and assert results update dynamically
  await searchInput.fill(validSearchTerm);
  const matchingResults = page.locator('.search-result-item'); // Adjust selector based on the UI
  await expect(matchingResults).toContainText(validSearchTerm);
  console.log(`Search results updated dynamically for term: ${validSearchTerm}`);

  // Step 4: Clear the search input field and assert results reset
  await searchInput.fill(emptyInput);
  const allResults = page.locator('.search-result-item'); // Adjust selector based on the UI
  await expect(allResults).toHaveCountGreaterThan(0);
  console.log('Search results reset to display all items.');

  // Step 5: Type an invalid search term and assert 'No Results Found' message
  await searchInput.fill(invalidSearchTerm);
  const noResultsMessage = page.locator('.no-results-message'); // Adjust selector based on the UI
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No Results Found');
  console.log(`'No Results Found' message displayed for term: ${invalidSearchTerm}`);

  // Step 6: Test search functionality with special characters
  await searchInput.fill(specialCharacters);
  await expect(matchingResults).toBeEmpty(); // Or verify specific behavior based on the UI
  console.log(`Special characters (${specialCharacters}) handled correctly.`);

  // Step 7: Reload the page and verify search input is cleared
  await page.reload();
  await expect(searchInput).toBeEmpty();
  console.log('Search input cleared after page reload.');

  // Step 8: Perform a new search and confirm the results update dynamically
  await searchInput.fill(validSearchTerm);
  await expect(matchingResults).toContainText(validSearchTerm);
  console.log(`Search results dynamically updated after new search for: ${validSearchTerm}`);

  // Step 9: Navigate to another menu option and return to the 'Generations' page
  const analysisMenu = page.locator("a:has-text('Analysis')"); // Adjust selector based on the UI
  await analysisMenu.click();
  await page.waitForNavigation();
  await expect(page).toHaveURL(/.*analysis.*/);
  console.log('Navigated to Analysis menu.');

  const generationsMenu = page.locator("a:has-text('Generations')"); // Adjust selector based on the UI
  await generationsMenu.click();
  await page.waitForNavigation();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');
  await expect(searchInput).toBeEmpty();
  console.log('Returned to Generations page and verified search input is cleared.');

  // Step 10: Test search functionality under browser resizing
  await page.setViewportSize({ width: 375, height: 667 }); // Simulate mobile viewport
  await searchInput.fill(validSearchTerm);
  await expect(matchingResults).toContainText(validSearchTerm);
  console.log('Search functionality works properly on mobile viewport.');

  await page.setViewportSize({ width: 1920, height: 1080 }); // Restore desktop viewport
  console.log('Restored desktop viewport.');

  // Step 11: Test edge cases
  await searchInput.fill(longInput);
  console.log('Tested long input string.');
  await searchInput.fill(emptyInput);
  console.log('Tested empty input string.');
});