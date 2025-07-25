const { test, expect } = require('@playwright/test');

// Test: Search Input Validation and Results Page Rendering
test('Search Input Validation and Results Page Rendering', async ({ page }) => {
  // Step 1: Navigate to the main page
  const mainPageUrl = 'https://docs.roost.ai/shelves/roost-admin-guide';
  await page.goto(mainPageUrl);

  // Step 2: Verify visibility of the search input field and its placeholder text
  const searchInput = page.locator('input[id="header-search-box-input"]');
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toHaveAttribute('placeholder', 'Search');

  // Step 3: Type a valid search term into the search input field
  const validSearchTerm = 'Admin Guide';
  await searchInput.fill(validSearchTerm);

  // Step 4: Click the 'Search' button
  const searchButton = page.locator('button[id="header-search-box-button"]');
  await expect(searchButton).toBeVisible();
  await searchButton.click();

  // Step 5: Verify redirection to the search results page
  const resultsPageUrl = 'https://docs.roost.ai/search';
  await page.waitForURL(resultsPageUrl);
  await expect(page).toHaveURL(resultsPageUrl);

  // Step 6: Assert the presence of search results matching the term
  const searchResults = page.locator('.search-results-item');
  await expect(searchResults).toBeVisible();
  await expect(searchResults.first()).toContainText(validSearchTerm);

  // Step 7: Validate that the search results include appropriate titles and descriptions
  const resultTitles = page.locator('.search-results-item-title');
  const resultDescriptions = page.locator('.search-results-item-description');
  await expect(resultTitles.first()).toBeVisible();
  await expect(resultDescriptions.first()).toBeVisible();

  // Step 8: Test search functionality with an invalid input
  const invalidSearchTerm = '%%%';
  await searchInput.fill(invalidSearchTerm);
  await searchButton.click();

  // Verify no results are displayed and an error message is shown
  const noResultsMessage = page.locator('.no-results-message');
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No results found');

  // Step 9: Clear the search field and test submission of an empty search term
  await searchInput.fill('');
  await searchButton.click();

  // Validate meaningful feedback for empty search term
  const emptySearchFeedback = page.locator('.empty-search-feedback');
  await expect(emptySearchFeedback).toBeVisible();
  await expect(emptySearchFeedback).toContainText('No search term entered');

  // Step 10: Perform additional search with different valid terms and verify results
  const additionalValidSearchTerm = 'Documentation';
  await searchInput.fill(additionalValidSearchTerm);
  await searchButton.click();

  const additionalSearchResults = page.locator('.search-results-item');
  await expect(additionalSearchResults).toBeVisible();
  await expect(additionalSearchResults.first()).toContainText(additionalValidSearchTerm);

  // Edge Case Handling: Test with special characters
  const specialCharactersSearchTerm = '!@#$%^';
  await searchInput.fill(specialCharactersSearchTerm);
  await searchButton.click();

  const specialCharactersMessage = page.locator('.no-results-message');
  await expect(specialCharactersMessage).toBeVisible();
  await expect(specialCharactersMessage).toContainText('No results found');
});