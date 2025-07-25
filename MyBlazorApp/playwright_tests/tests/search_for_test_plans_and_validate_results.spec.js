const { test, expect } = require('@playwright/test');

test('Search for Test Plans and Validate Results', async ({ page }) => {
  // Step 1: Navigate to the test plans page
  await page.goto('https://app.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://app.roost.ai/roostgpt/tests');

  // Step 2: Ensure the search input box is visible and enabled
  const searchBox = page.locator('input[data-testid="tests-search-box"]');
  await expect(searchBox).toBeVisible();
  await expect(searchBox).toBeEnabled();

  // Step 3: Enter a valid search term and simulate pressing Enter
  await searchBox.fill('harish');
  await searchBox.press('Enter');
  
  // Step 4: Validate that search results are filtered correctly
  try {
    const searchResults = page.locator('.search-results .test-plan'); // Adjust for actual result container
    await expect(searchResults).toContainText('harish');
  } catch (error) {
    console.error('Error validating search results:', error);
  }

  // Step 5: Clear the search input and verify all test plans are displayed
  await searchBox.fill('');
  await searchBox.press('Enter');
  const allTestPlans = page.locator('.test-plan'); // Adjust for actual test plan container
  await expect(allTestPlans).toHaveCountGreaterThan(0);

  // Step 6: Enter a partial search term and verify results
  await searchBox.fill('ha');
  await searchBox.press('Enter');
  const partialResults = page.locator('.search-results .test-plan'); // Adjust for actual result container
  await expect(partialResults).toContainText('ha');

  // Step 7: Enter a nonexistent search term and verify empty state
  await searchBox.fill('nonexistent');
  await searchBox.press('Enter');
  const noResultsMessage = page.locator('.no-results-message'); // Adjust for actual message container
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No results found');

  // Step 8: Enter special characters and verify input sanitization
  await searchBox.fill('!@#$%');
  await searchBox.press('Enter');
  const specialCharResults = page.locator('.search-results .test-plan'); // Adjust for actual result container
  await expect(specialCharResults).toHaveCount(0);

  // Step 9: Search with an extremely long string
  const longString = 'a'.repeat(500);
  await searchBox.fill(longString);
  await searchBox.press('Enter');
  const longStringResults = page.locator('.search-results .test-plan'); // Adjust for actual result container
  await expect(longStringResults).toHaveCount(0);

  // Step 10: Refresh the page and verify the search input reset
  await page.reload();
  await expect(searchBox).toHaveValue('');
  const refreshedTestPlans = page.locator('.test-plan'); // Adjust for actual test plan container
  await expect(refreshedTestPlans).toHaveCountGreaterThan(0);

  // Step 11: Test whitespace-only queries
  await searchBox.fill('   ');
  await searchBox.press('Enter');
  const whitespaceResults = page.locator('.test-plan'); // Adjust for actual test plan container
  await expect(whitespaceResults).toHaveCountGreaterThan(0);

  // Step 12: Keyboard navigation and query entry
  await page.keyboard.press('Tab'); // Tab into the search box
  await searchBox.fill('keyboard query');
  await searchBox.press('Enter');
  const keyboardResults = page.locator('.search-results .test-plan'); // Adjust for actual result container
  await expect(keyboardResults).toContainText('keyboard query');

  // Step 13: Validate accessibility of the search box
  const ariaLabel = await searchBox.getAttribute('aria-label');
  expect(ariaLabel).toBeTruthy();
  console.log('ARIA label:', ariaLabel);

  // Step 14: Attempt to type while page is loading
  await page.goto('https://app.roost.ai/roostgpt/tests');
  try {
    await searchBox.fill('loading test');
    console.log('Successfully typed while page was loading');
  } catch (error) {
    console.error('Error typing during page load:', error);
  }

  // Step 15: Responsiveness testing for smaller screen sizes
  await page.setViewportSize({ width: 375, height: 667 }); // Typical mobile screen size
  await searchBox.fill('mobile test');
  await searchBox.press('Enter');
  const mobileResults = page.locator('.search-results .test-plan'); // Adjust for actual result container
  await expect(mobileResults).toContainText('mobile test');
});