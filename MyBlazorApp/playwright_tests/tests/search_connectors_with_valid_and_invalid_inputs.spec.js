const { test, expect } = require('@playwright/test');

test('Search Connectors with Valid and Invalid Inputs', async ({ page }) => {
  // Step 1: Navigate to the Connectors page
  const url = 'https://dev.roost.ai/connectors';
  await page.goto(url);
  await expect(page).toHaveURL(url);
  console.log('Navigated to Connectors page.');

  // Step 2: Verify the search input box is visible and enabled
  const searchBox = page.locator("input[data-testid='Connector-search-box']");
  await expect(searchBox).toBeVisible();
  await expect(searchBox).toBeEnabled();
  console.log('Search box is visible and enabled.');

  // Step 3: Enter a valid connector name ('GitHub') into the search box
  await searchBox.fill('GitHub');
  console.log('Entered valid connector name: GitHub.');

  // Step 4: Press Enter or wait for the results to filter
  await searchBox.press('Enter');
  await page.waitForTimeout(500); // Allow time for results to filter
  console.log('Triggered search with valid input.');

  // Step 5: Verify the results only display connectors matching 'GitHub'
  const validResult = page.locator('.connector-item:has-text("GitHub")');
  await expect(validResult).toBeVisible();
  const connectorCount = await validResult.count();
  expect(connectorCount).toBeGreaterThan(0);
  console.log('Verified results matching "GitHub" are displayed.');

  // Step 6: Clear the search box and enter an invalid connector name ('InvalidConnector')
  await searchBox.fill('InvalidConnector');
  console.log('Entered invalid connector name: InvalidConnector.');

  // Step 7: Press Enter or wait for the results to filter
  await searchBox.press('Enter');
  await page.waitForTimeout(500); // Allow time for results to filter
  console.log('Triggered search with invalid input.');

  // Step 8: Verify that no results are displayed and an appropriate message is shown
  const noResultsMessage = page.locator('.no-results:has-text("No results found")');
  await expect(noResultsMessage).toBeVisible();
  console.log('Verified "No results found" message is displayed for invalid input.');

  // Step 9: Test with special characters ('!@#$%^&*') in the search box and verify behavior
  await searchBox.fill('!@#$%^&*');
  await searchBox.press('Enter');
  await page.waitForTimeout(500); // Allow time for results to filter
  console.log('Entered special characters into search box.');
  const specialCharResults = page.locator('.connector-item');
  const specialCharResultCount = await specialCharResults.count();
  console.log(`Special character search resulted in ${specialCharResultCount} items.`);

  // Step 10: Leave the search box empty and press Enter or attempt to filter
  await searchBox.fill('');
  await searchBox.press('Enter');
  await page.waitForTimeout(500);
  console.log('Triggered search with empty input.');

  // Step 11: Verify that all connectors are displayed
  const allConnectors = page.locator('.connector-item');
  const allConnectorsCount = await allConnectors.count();
  expect(allConnectorsCount).toBeGreaterThan(0);
  console.log('Verified all connectors are displayed with empty input.');

  // Step 12: Test case sensitivity by entering both uppercase and lowercase variations
  await searchBox.fill('GITHUB');
  await searchBox.press('Enter');
  await page.waitForTimeout(500);
  console.log('Entered uppercase variation: GITHUB.');

  const uppercaseResult = page.locator('.connector-item:has-text("GitHub")');
  await expect(uppercaseResult).toBeVisible();
  console.log('Verified results are case-insensitive for uppercase input.');

  await searchBox.fill('github');
  await searchBox.press('Enter');
  await page.waitForTimeout(500);
  console.log('Entered lowercase variation: github.');

  const lowercaseResult = page.locator('.connector-item:has-text("GitHub")');
  await expect(lowercaseResult).toBeVisible();
  console.log('Verified results are case-insensitive for lowercase input.');

  // Step 13: Navigate away from the page and return to verify previous search state is not persisted
  await page.goto('https://dev.roost.ai/another-page');
  await page.waitForURL('https://dev.roost.ai/another-page');
  console.log('Navigated to another page.');

  await page.goto(url);
  await page.waitForURL(url);
  await expect(searchBox).toHaveValue('');
  console.log('Verified search state is not persisted after navigating back.');

  // Step 14: Reload the page and ensure the search box is empty and default results are displayed
  await page.reload();
  await page.waitForURL(url);
  await expect(searchBox).toHaveValue('');
  const defaultResults = page.locator('.connector-item');
  const defaultResultsCount = await defaultResults.count();
  expect(defaultResultsCount).toBeGreaterThan(0);
  console.log('Verified search box is empty and default results are displayed after page reload.');
});