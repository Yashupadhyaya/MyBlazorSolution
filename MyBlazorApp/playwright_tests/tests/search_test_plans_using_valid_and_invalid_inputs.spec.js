const { test, expect } = require('@playwright/test');

test('Search Test Plans Using Valid and Invalid Inputs', async ({ page }) => {
  // Step 1: Navigate to the Test Plans page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  
  // Step 2: Verify the visibility of the search input field
  const searchInput = page.locator('input[data-testid="tests-search-box"]');
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toHaveAttribute('placeholder', 'Search for Test Plans');

  // Step 3: Enter a valid test plan name and press Enter
  await searchInput.fill('Login Test');
  await page.keyboard.press('Enter');
  
  // Step 4: Verify results display only matching test plans
  const results = page.locator('.test-plan-result'); // Replace with an appropriate selector for search results
  await expect(results).toContainText('Login Test');

  // Step 5: Clear the search bar and input an invalid test plan name
  await searchInput.fill('InvalidName123');
  await page.keyboard.press('Enter');
  
  // Step 6: Verify no results are displayed with a "No results found" message
  const noResultsMessage = page.locator('.no-results-message'); // Replace with an appropriate selector for "No results found"
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No results found');

  // Step 7: Clear the search bar and input special characters
  await searchInput.fill('@#$%^&*');
  await page.keyboard.press('Enter');
  
  // Step 8: Verify no results are displayed or a validation error is shown
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No results found');

  // Step 9: Test empty input by leaving the search bar blank and pressing Enter
  await searchInput.fill('');
  await page.keyboard.press('Enter');
  
  // Step 10: Verify default results are shown (all test plans)
  const allResults = page.locator('.test-plan-result'); // Replace with an appropriate selector for all results
  await expect(allResults).toHaveCountGreaterThan(0);

  // Step 11: Perform partial match search
  await searchInput.fill('Log');
  await page.keyboard.press('Enter');
  
  // Step 12: Verify all matching test plans are displayed
  await expect(results).toContainText('Login Test');

  // Step 13: Test case insensitivity
  await searchInput.fill('login test');
  await page.keyboard.press('Enter');
  await expect(results).toContainText('Login Test');

  // Step 14: Verify dynamic updates as text is typed
  await searchInput.fill('Log');
  await page.waitForTimeout(500); // Adjust timeout based on expected dynamic update speed
  await expect(results).toContainText('Login Test');

  // Step 15: Navigate to a test plan in the results
  const testPlanLink = page.locator('.test-plan-result a'); // Replace with an appropriate selector for test plan links
  await testPlanLink.click();
  await page.waitForURL('https://dev.roost.ai/roostgpt/tests/*'); // Replace with the expected URL pattern for Test Plan Details page

  // Step 16: Return to the Test Plans page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');

  // Step 17: Verify the search field retains the previous query
  await expect(searchInput).toHaveValue('Log');

  // Step 18: Clear the search field and press Enter to reset results
  await searchInput.fill('');
  await page.keyboard.press('Enter');
  
  // Step 19: Verify default results are shown again
  await expect(allResults).toHaveCountGreaterThan(0);
});