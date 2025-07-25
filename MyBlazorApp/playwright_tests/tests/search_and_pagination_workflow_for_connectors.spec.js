const { test, expect } = require('@playwright/test');

test('Search and Pagination Workflow for Connectors', async ({ page }) => {
  // Constants
  const baseURL = 'https://dev.roost.ai/connectors';
  const validSearchTerm = 'Test Connector';
  const invalidSearchTerm = 'NonExistentConnector';

  // Step 1: Navigate to the Connectors page
  await page.goto(baseURL);
  await expect(page).toHaveURL(baseURL);

  // Step 2: Verify the visibility of the search input field
  const searchInput = page.locator('input[data-testid="Connector-search-box"]');
  await expect(searchInput).toBeVisible();

  // Step 3: Enter a valid search term and press Enter
  await searchInput.fill(validSearchTerm);
  await page.keyboard.press('Enter');

  // Step 4: Verify that search results update correctly
  const searchResults = page.locator('div[data-testid="Connector-search-results"]');
  await expect(searchResults).toBeVisible();
  await expect(searchResults).toContainText(validSearchTerm);

  // Step 5: Click on the second page button in the paginator
  const secondPageButton = page.locator('button[data-testid="arrow-icon"]');
  await secondPageButton.click();

  // Step 6: Verify that the second page of results is displayed
  const secondPageResults = page.locator('div[data-testid="Connector-search-results"]');
  await expect(secondPageResults).toBeVisible();
  await expect(secondPageResults).toContainText(validSearchTerm);

  // Step 7: Reload the page
  await page.reload();

  // Step 8: Validate that search term and pagination state persist
  await expect(searchInput).toHaveValue(validSearchTerm);
  await expect(secondPageResults).toBeVisible();

  // Step 9: Clear the search input and press Enter
  await searchInput.fill('');
  await page.keyboard.press('Enter');

  // Step 10: Verify that the full list of connectors is displayed
  const fullListResults = page.locator('div[data-testid="Connector-full-list"]');
  await expect(fullListResults).toBeVisible();

  // Step 11: Test edge navigation by clicking the 'Last' button
  const lastPageButton = page.locator('button[data-testid="paginator-last-page-button"]');
  await lastPageButton.click();

  // Step 12: Verify the last page of connectors is displayed
  const lastPageResults = page.locator('div[data-testid="Connector-last-page-results"]');
  await expect(lastPageResults).toBeVisible();

  // Step 13: Navigate back to the first page using the 'First' button
  const firstPageButton = page.locator('button[data-testid="paginator-first-page-button"]');
  await firstPageButton.click();

  // Step 14: Validate the search and pagination workflow using an invalid search term
  await searchInput.fill(invalidSearchTerm);
  await page.keyboard.press('Enter');

  // Step 15: Confirm the 'No results found' message is displayed
  const noResultsMessage = page.locator('div[data-testid="No-results-message"]');
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No results found');

  // Step 16: Reset search and pagination state by refreshing the page
  await page.reload();
  await expect(searchInput).toHaveValue('');
  await expect(fullListResults).toBeVisible();

  console.log('Test completed successfully.');
});