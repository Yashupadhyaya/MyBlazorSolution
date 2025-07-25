const { test, expect } = require('@playwright/test');

test('Search Functionality Validation Across Pages', async ({ page }) => {
  // Step 1: Navigate to the main documentation portal
  await page.goto('https://docs.roost.ai/');
  await expect(page).toHaveURL('https://docs.roost.ai/');
  console.log('Navigated to the main documentation portal.');

  // Step 2: Verify that the search input field is visible and enabled
  const searchInput = page.locator('#header-search-box-input');
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toBeEnabled();
  console.log('Search input field is visible and enabled.');

  // Step 3: Type the query 'Export Jira Ticket' into the search field
  await searchInput.fill('Export Jira Ticket');
  console.log('Filled query in the search input field.');

  // Step 4: Click the search button
  const searchButton = page.locator('#header-search-box-button');
  await searchButton.click();
  console.log('Clicked the search button.');

  // Step 5: Wait for the page to load and verify the URL change
  await page.waitForURL('https://docs.roost.ai/search');
  await expect(page).toHaveURL('https://docs.roost.ai/search');
  console.log('Navigated to the search results page.');

  // Step 6: Verify search results contain relevant links
  const firstSearchResult = page.locator("a[href='https://docs.roost.ai/books/export-jira-ticket-in-xml']");
  await expect(firstSearchResult).toContainText('Export Jira Ticket in XML');
  console.log('Verified search results contain relevant links.');

  // Step 7: Click on the first search result
  await firstSearchResult.click();
  console.log('Clicked on the first search result.');

  // Step 8: Verify navigation to the respective page
  await page.waitForURL('https://docs.roost.ai/books/export-jira-ticket-in-xml');
  await expect(page).toHaveURL('https://docs.roost.ai/books/export-jira-ticket-in-xml');
  console.log('Verified navigation to the respective page.');

  // Step 9: Navigate back to the search page
  await page.goBack();
  await expect(page).toHaveURL('https://docs.roost.ai/search');
  console.log('Navigated back to the search page.');

  // Step 10: Verify the search query is still visible
  await expect(searchInput).toHaveValue('Export Jira Ticket');
  console.log('Verified the search query persists.');

  // Step 11: Modify the query to 'RoostGPT'
  await searchInput.fill('RoostGPT');
  console.log('Modified the search query to RoostGPT.');

  // Step 12: Click the search button and verify updated results
  await searchButton.click();
  await expect(page).toHaveURL('https://docs.roost.ai/search');
  console.log('Verified updated search results for RoostGPT.');

  // Step 13: Click on a result like 'CLI' from the updated list
  const cliSearchResult = page.locator("a[href='https://docs.roost.ai/books/roostgpt/page/cli']");
  await cliSearchResult.click();
  console.log('Clicked on a result like CLI from the updated list.');

  // Step 14: Verify navigation to the respective page
  await page.waitForURL('https://docs.roost.ai/books/roostgpt/page/cli');
  await expect(page).toHaveURL('https://docs.roost.ai/books/roostgpt/page/cli');
  console.log('Verified navigation to the respective page.');

  // Step 15: Navigate back to the original search page and verify state persistence
  await page.goBack();
  await expect(page).toHaveURL('https://docs.roost.ai/search');
  await expect(searchInput).toHaveValue('RoostGPT');
  console.log('Verified state persistence after navigating back.');

  // Step 16: Test the search functionality with an invalid query
  await searchInput.fill('NonExistentTerm');
  await searchButton.click();
  console.log('Performed search with an invalid query.');

  // Step 17: Verify the presence of a no results message or empty result state
  const noResultsMessage = page.locator('.no-results-message');
  await expect(noResultsMessage).toBeVisible();
  console.log('Verified the presence of a no results message.');

  // Step 18: Refresh the page and validate that the search state is retained
  await page.reload();
  await expect(searchInput).toHaveValue('NonExistentTerm');
  console.log('Validated search state retention after page refresh.');
});