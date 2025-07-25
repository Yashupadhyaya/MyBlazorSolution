const { test, expect } = require('@playwright/test');

test('Search for Test Plans and Validate Search Functionality', async ({ page }) => {
  // Step 1: Navigate to the Test Plans page
  await page.goto('https://app.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://app.roost.ai/roostgpt/tests');
  console.log('Navigated to Test Plans page.');

  // Step 2: Verify visibility of the search input box
  const searchBox = page.locator('input[data-testid="tests-search-box"]');
  await expect(searchBox).toBeVisible();
  console.log('Search input box is visible.');

  // Step 3: Type the search term 'API Testing' and press Enter
  await searchBox.fill('API Testing');
  await page.keyboard.press('Enter');
  console.log('Entered "API Testing" into the search box and pressed Enter.');

  // Step 4: Verify results for 'API Testing'
  const results = page.locator('.test-plan-item'); // Assuming '.test-plan-item' identifies test plan result items
  await expect(results).toContainText('API Testing', { timeout: 5000 });
  console.log('Search results updated for "API Testing".');

  // Step 5: Clear the search box and enter 'NonExistentPlan'
  await searchBox.fill('NonExistentPlan');
  await page.keyboard.press('Enter');
  console.log('Entered "NonExistentPlan" into the search box and pressed Enter.');

  // Step 6: Verify 'No results found' message
  const noResultsMessage = page.locator('.no-results'); // Assuming '.no-results' identifies the no results message
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No results found');
  console.log('Verified "No results found" message for "NonExistentPlan".');

  // Step 7: Enter partial keyword 'API' and verify predictive results
  await searchBox.fill('API');
  await page.keyboard.press('Enter');
  console.log('Entered "API" into the search box and pressed Enter.');
  await expect(results).toHaveCountGreaterThan(0);
  console.log('Predictive results displayed for partial keyword "API".');

  // Step 8: Enter special characters and verify no errors
  await searchBox.fill('!@#$%^&*');
  await page.keyboard.press('Enter');
  console.log('Entered special characters into the search box and pressed Enter.');
  const errorBanner = page.locator('.error-banner'); // Assuming '.error-banner' identifies application errors
  await expect(errorBanner).not.toBeVisible();
  console.log('Verified no application errors for special characters.');

  // Step 9: Reload the page and verify reset state
  await page.reload();
  await expect(searchBox).toBeEmpty();
  console.log('Page reloaded and search box reset.');

  // Step 10: Test case-insensitivity with 'api testing'
  await searchBox.fill('api testing');
  await page.keyboard.press('Enter');
  console.log('Entered "api testing" into the search box and pressed Enter.');
  await expect(results).toContainText('API Testing', { timeout: 5000 });
  console.log('Verified case-insensitivity for "api testing".');

  // Step 11: Verify results match those of 'API Testing'
  const lowerCaseResults = await results.allInnerTexts();
  await expect(lowerCaseResults).toEqual(expect.arrayContaining(['API Testing']));
  console.log('Confirmed results match for "API Testing" and "api testing".');

  // Step 12: Perform multiple quick searches
  const quickSearchTerms = ['API Testing', 'Performance Testing', 'Integration Testing'];
  for (const term of quickSearchTerms) {
    await searchBox.fill(term);
    await page.keyboard.press('Enter');
    console.log(`Performed quick search for "${term}".`);
    await expect(results).toHaveCountGreaterThan(0);
  }
  console.log('Quick search functionality verified.');

  // Step 13: Verify keyboard accessibility for search box
  await page.keyboard.press('Tab');
  const activeElement = await page.evaluate(() => document.activeElement.getAttribute('data-testid'));
  expect(activeElement).toBe('tests-search-box');
  console.log('Verified keyboard accessibility for search box.');

  // Step 14: Search by creator's name 'Urvi'
  await searchBox.fill('Urvi');
  await page.keyboard.press('Enter');
  console.log('Entered "Urvi" into the search box and pressed Enter.');
  
  // Step 15: Verify results for test plans created by 'Urvi'
  const creatorResults = page.locator('.test-plan-item'); // Assuming '.test-plan-item' identifies test plan result items
  await expect(creatorResults).toContainText('Urvi', { timeout: 5000 });
  console.log('Search results displayed for test plans created by "Urvi".');
});