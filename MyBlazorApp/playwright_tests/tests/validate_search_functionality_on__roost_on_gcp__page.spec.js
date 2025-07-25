const { test, expect } = require('@playwright/test');

test('Validate Search Functionality on Roost on GCP Page', async ({ page, browserName }) => {
  // Step 1: Navigate to the target page
  const url = 'https://docs.roost.ai/books/roost-on-gcp';
  await page.goto(url);

  // Step 2: Verify the search input field is visible and enabled
  const searchInput = page.locator('input[id="header-search-box-input"]');
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toBeEnabled();

  // Step 3: Enter a valid search term (e.g., 'testing') into the search field
  const validSearchTerm = 'testing';
  await searchInput.fill(validSearchTerm);

  // Step 4: Click the search button
  const searchButton = page.locator('button[id="header-search-box-button"]');
  await searchButton.click();

  // Step 5: Verify the page reloads or dynamically updates to show filtered results
  await page.waitForURL(url); // Assuming the URL doesn't change, but content dynamically updates
  const resultsContainer = page.locator('.search-results'); // Replace with actual selector for results container
  await expect(resultsContainer).toBeVisible();
  await expect(resultsContainer).toContainText(validSearchTerm);

  // Step 6: Perform another search using a partial match term (e.g., 'test')
  const partialSearchTerm = 'test';
  await searchInput.fill(partialSearchTerm);
  await searchButton.click();
  await page.waitForURL(url);
  await expect(resultsContainer).toBeVisible();
  await expect(resultsContainer).toContainText(partialSearchTerm);

  // Step 7: Enter an invalid search term (e.g., 'xyz123') and perform a search
  const invalidSearchTerm = 'xyz123';
  await searchInput.fill(invalidSearchTerm);
  await searchButton.click();
  await page.waitForURL(url);
  const noResultsMessage = page.locator('.no-results-message'); // Replace with actual selector for 'no results' message
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No results found');

  // Step 8: Clear the search input field and perform a search
  await searchInput.fill('');
  await searchButton.click();
  await page.waitForURL(url);
  const allContentContainer = page.locator('.all-content'); // Replace with actual selector for all content container
  await expect(allContentContainer).toBeVisible();

  // Step 9: Validate cross-browser functionality (Repeat a simple search in a different browser)
  console.log(`Testing on browser: ${browserName}`);
  if (browserName !== 'chromium') {
    await searchInput.fill(validSearchTerm);
    await searchButton.click();
    await page.waitForURL(url);
    await expect(resultsContainer).toBeVisible();
    await expect(resultsContainer).toContainText(validSearchTerm);
  }

  // Step 10: Test responsiveness by resizing browser viewport
  await page.setViewportSize({ width: 375, height: 667 }); // Mobile viewport dimensions
  await expect(searchInput).toBeVisible();
  await searchInput.fill(validSearchTerm);
  await searchButton.click();
  await page.waitForURL(url);
  await expect(resultsContainer).toBeVisible();
  await expect(resultsContainer).toContainText(validSearchTerm);

  // Step 11: Test accessibility features by interacting with the search field via keyboard navigation
  await searchInput.focus();
  await page.keyboard.type(validSearchTerm); // Simulate typing in the search field
  await page.keyboard.press('Enter'); // Simulate pressing Enter to perform search
  await page.waitForURL(url);
  await expect(resultsContainer).toBeVisible();
  await expect(resultsContainer).toContainText(validSearchTerm);

  // Step 12: Perform the search operation with a network delay
  await page.context().setNetworkConditions({
    offline: false,
    download: 50 * 1024, // Simulate slow network, 50kbps
    upload: 50 * 1024,
    latency: 500 // Simulate 500ms latency
  });
  await searchInput.fill(validSearchTerm);
  await searchButton.click();
  await page.waitForURL(url);
  await expect(resultsContainer).toBeVisible();
  await expect(resultsContainer).toContainText(validSearchTerm);

  // Reset network conditions to normal
  await page.context().setNetworkConditions({
    offline: false,
    download: -1, // Unlimited download speed
    upload: -1,
    latency: 0
  });

  console.log('Search functionality validated across multiple conditions.');
});