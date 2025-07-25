const { test, expect } = require('@playwright/test');

test('Verify Test Plan Search Functionality with Valid and Invalid Inputs', async ({ page }) => {
  const url = 'https://dev.roost.ai/roostgpt/tests';
  const searchBoxSelector = "input[data-testid='tests-search-box']";
  const validSearchTerm = 'Regression';
  const invalidSearchTerm = 'zzzzzzzz';
  const specialCharacters = '@#$%^&*';
  const extremelyLongInput = 'a'.repeat(500);
  const caseSensitiveInputs = ['TestPlan', 'testplan'];

  // Step 1: Navigate to the Test Plans page
  await page.goto(url);

  // Step 2: Verify the visibility of the search input field
  const searchBox = page.locator(searchBoxSelector);
  await expect(searchBox).toBeVisible();

  // Step 3: Type a valid search term into the search box
  await searchBox.fill(validSearchTerm);
  await searchBox.press('Enter');

  // Step 4: Verify results match the valid search term
  const results = page.locator('.test-plan-results'); // Adjust selector for results container
  await expect(results).toContainText(validSearchTerm);

  // Step 5: Clear the search box
  await searchBox.fill('');

  // Step 6: Type an invalid search term and press Enter
  await searchBox.fill(invalidSearchTerm);
  await searchBox.press('Enter');

  // Step 7: Verify no results are displayed and appropriate message is shown
  const noResultsMessage = page.locator('.no-results-message'); // Adjust selector for no results message
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No test plans found');

  // Step 8: Clear the search box again
  await searchBox.fill('');

  // Step 9: Type a search term with special characters and press Enter
  await searchBox.fill(specialCharacters);
  await searchBox.press('Enter');

  // Step 10: Verify the system handles the input without crashing
  await expect(noResultsMessage).toBeVisible(); // Assuming no results are displayed for special characters
  await expect(noResultsMessage).toContainText('No test plans found');

  // Step 11: Test entering an extremely long string
  await searchBox.fill(extremelyLongInput);
  await searchBox.press('Enter');

  // Step 12: Verify the input field's handling of large inputs
  await expect(searchBox).toHaveValue(extremelyLongInput); // Ensure input field doesn't crash
  await expect(noResultsMessage).toBeVisible();

  // Step 13: Perform a case-sensitivity test
  for (const term of caseSensitiveInputs) {
    await searchBox.fill(term);
    await searchBox.press('Enter');
    await expect(results).toContainText('TestPlan'); // Validate consistent results
  }

  // Step 14: Refresh the browser and verify the search filter is cleared
  await page.reload();
  await expect(searchBox).toHaveValue(''); // Ensure search box is empty after refresh

  // Step 15: Validate resetting the search box restores the full list
  await searchBox.fill('');
  await searchBox.press('Enter');
  const allResults = page.locator('.test-plan-results'); // Adjust selector for all results
  await expect(allResults).toBeVisible(); // Ensure full list of test plans is displayed
});