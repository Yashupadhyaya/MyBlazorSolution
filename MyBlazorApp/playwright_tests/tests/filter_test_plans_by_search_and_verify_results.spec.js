const { test, expect } = require('@playwright/test');

test('Filter Test Plans by Search and Verify Results', async ({ page }) => {
  // Test data
  const validSearchTerm = 'Test Plan B';
  const partialSearchTerm = 'Plan';
  const nonExistentSearchTerm = 'NonExistent';
  const specialCharacterSearchTerm = '@TestPlan!';
  const caseInsensitiveSearchTerm = 'test plan b';

  // Step 1: Navigate to the tests page
  await page.goto('https://dev.roost.ai/roostgpt/tests');

  // Step 2: Verify the search input field visibility and enablement
  const searchInput = page.locator('input[data-testid="tests-search-box"]');
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toBeEnabled();

  // Step 3: Type a valid test plan name into the search input field
  await searchInput.fill(validSearchTerm);

  // Step 4: Verify the list of test plans updates to show matching results
  const testPlansList = page.locator('div[data-testid="test-plans-list"]');
  await expect(testPlansList).toContainText(validSearchTerm);

  // Step 5: Clear the search input field
  await searchInput.fill('');

  // Step 6: Verify all test plans are displayed again
  const allTestPlans = ['Test Plan A', 'Test Plan B', 'Test Plan C']; // Example test plan names
  for (const testPlan of allTestPlans) {
    await expect(testPlansList).toContainText(testPlan);
  }

  // Step 7: Type a partial test plan name
  await searchInput.fill(partialSearchTerm);

  // Step 8: Verify the visible list matches all test plans containing the partial name
  for (const testPlan of allTestPlans.filter(tp => tp.includes(partialSearchTerm))) {
    await expect(testPlansList).toContainText(testPlan);
  }

  // Step 9: Enter a non-existent test plan name
  await searchInput.fill(nonExistentSearchTerm);

  // Step 10: Verify no results are displayed and a 'No results found' message is shown
  const noResultsMessage = page.locator('div[data-testid="no-results-message"]');
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No results found');

  // Step 11: Test case-insensitive search by entering the same name in different casing
  await searchInput.fill(caseInsensitiveSearchTerm);

  // Step 12: Verify results are returned regardless of case
  await expect(testPlansList).toContainText(validSearchTerm);

  // Step 13: Enter a name with leading and trailing whitespaces
  await searchInput.fill(`   ${validSearchTerm}   `);

  // Step 14: Verify search results are unaffected by whitespaces
  await expect(testPlansList).toContainText(validSearchTerm);

  // Step 15: Perform a search with a name containing special characters
  await searchInput.fill(specialCharacterSearchTerm);

  // Step 16: Verify results are returned for names with exact matching special characters
  await expect(testPlansList).toContainText(specialCharacterSearchTerm);

  // Edge Cases
  // Edge Case 1: Enter an empty string in the search field
  await searchInput.fill('');
  for (const testPlan of allTestPlans) {
    await expect(testPlansList).toContainText(testPlan);
  }

  // Edge Case 2: Enter a string exceeding the maximum character limit
  const longString = 'a'.repeat(300); // Example long string
  await searchInput.fill(longString);
  await expect(noResultsMessage).toBeVisible();

  // Edge Case 3: Search with a mix of valid and invalid characters
  const invalidSearchTerm = 'Plan@123!';
  await searchInput.fill(invalidSearchTerm);
  await expect(noResultsMessage).toBeVisible();

  // Edge Case 4: Search with SQL injection strings
  const sqlInjectionString = "' OR 1=1; --";
  await searchInput.fill(sqlInjectionString);
  await expect(noResultsMessage).toBeVisible();

  // Edge Case 5: Search with XSS payloads
  const xssPayload = '<script>alert("XSS")</script>';
  await searchInput.fill(xssPayload);
  await expect(noResultsMessage).toBeVisible();

  console.log('Test completed successfully.');
});