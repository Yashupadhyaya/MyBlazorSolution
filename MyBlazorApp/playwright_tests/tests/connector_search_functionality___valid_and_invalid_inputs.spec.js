const { test, expect } = require('@playwright/test');

test('Connector Search Functionality - Valid and Invalid Inputs', async ({ page }) => {
  // Step 1: Navigate to the Connectors page
  const connectorsPageUrl = 'https://app.roost.ai/connectors';
  await page.goto(connectorsPageUrl);
  await expect(page).toHaveURL(connectorsPageUrl);
  console.log('Navigated to Connectors page.');

  // Step 2: Verify that the search bar is visible and enabled
  const searchBar = page.locator('input[data-testid="Connector-search-box"]');
  await expect(searchBar).toBeVisible();
  await expect(searchBar).toBeEnabled();
  console.log('Verified search bar is visible and enabled.');

  // Step 3: Type a valid connector name (e.g., 'GitHub') into the search bar and press Enter
  const validQuery = 'GitHub';
  await searchBar.fill(validQuery);
  await searchBar.press('Enter');
  console.log(`Typed valid query: ${validQuery} and pressed Enter.`);

  // Step 4: Verify that connector results matching the query are displayed
  const connectorResults = page.locator('.connector-result-item'); // Adjust selector based on actual implementation
  await expect(connectorResults).toContainText(validQuery);
  console.log('Verified connector results matching the query are displayed.');

  // Step 5: Clear the search bar and type an invalid connector name
  const invalidQuery = 'NonExistentConnector';
  await searchBar.fill('');
  await searchBar.fill(invalidQuery);
  await searchBar.press('Enter');
  console.log(`Typed invalid query: ${invalidQuery} and pressed Enter.`);

  // Step 6: Verify that a 'No results found' message is displayed
  const noResultsMessage = page.locator('.no-results-message'); // Adjust selector based on actual implementation
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No results found');
  console.log('Verified "No results found" message is displayed.');

  // Step 7: Enter a connector name in lowercase and verify case-insensitive results
  const lowercaseQuery = 'github';
  await searchBar.fill('');
  await searchBar.fill(lowercaseQuery);
  await searchBar.press('Enter');
  console.log(`Typed lowercase query: ${lowercaseQuery} and pressed Enter.`);
  await expect(connectorResults).toContainText('GitHub');
  console.log('Verified case-insensitive search results.');

  // Step 8: Test the search functionality with special characters
  const specialCharactersQuery = '@#$%';
  await searchBar.fill('');
  await searchBar.fill(specialCharactersQuery);
  await searchBar.press('Enter');
  console.log(`Typed special characters query: ${specialCharactersQuery} and pressed Enter.`);
  const errorContainer = page.locator('.error-message'); // Adjust selector based on actual implementation
  await expect(errorContainer).not.toBeVisible();
  console.log('Verified no unexpected errors occur with special characters.');

  // Step 9: Leave the search bar empty and press Enter
  await searchBar.fill('');
  await searchBar.press('Enter');
  console.log('Pressed Enter with empty search bar.');
  await expect(connectorResults).toHaveCountGreaterThan(0); // Verify all connectors are displayed
  console.log('Verified all connectors are displayed (default behavior).');

  // Step 10: Test responsiveness by resizing the browser window
  await page.setViewportSize({ width: 800, height: 600 }); // Desktop size
  await expect(searchBar).toBeVisible();
  console.log('Verified search bar rendering on desktop viewport.');
  await page.setViewportSize({ width: 375, height: 667 }); // Mobile size
  await expect(searchBar).toBeVisible();
  console.log('Verified search bar rendering on mobile viewport.');

  // Step 11: Refresh the page and verify search bar reset
  await page.reload();
  await expect(searchBar).toBeEmpty();
  console.log('Verified search bar reset after page refresh.');

  // Step 12: Verify dynamic updates without reload
  await searchBar.fill(validQuery);
  await searchBar.press('Enter');
  await expect(connectorResults).toContainText(validQuery);
  console.log('Verified dynamic search functionality without page reload.');

  // Step 13: Verify tab navigation support for the search bar
  await page.keyboard.press('Tab');
  await expect(searchBar).toBeFocused();
  await searchBar.fill('TabTest');
  await searchBar.press('Enter');
  console.log('Verified tab navigation support for search bar.');

  // Step 14: Test mobile-sized viewport functionality
  await page.setViewportSize({ width: 375, height: 667 }); // Mobile size
  await searchBar.fill(validQuery);
  await searchBar.press('Enter');
  await expect(connectorResults).toContainText(validQuery);
  console.log('Verified search functionality on mobile viewport.');
});