const { test, expect } = require('@playwright/test');

test('Add New Test Plan and Verify State Persistence', async ({ page }) => {
  // Navigate to the Test Plans page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');

  // Step 2: Verify that the 'Add Test Plan' button is visible and enabled
  const addTestPlanButton = page.locator("button[data-testid='add-test-plan-button']");
  await expect(addTestPlanButton).toBeVisible();
  await expect(addTestPlanButton).toBeEnabled();

  // Step 3: Click the 'Add Test Plan' button
  await addTestPlanButton.click();

  // Step 4: Verify that a modal or form to create a test plan appears
  const testPlanForm = page.locator("form[data-testid='test-plan-form']");
  await expect(testPlanForm).toBeVisible();

  // Step 5: Fill out the required fields in the form with valid data
  const testPlanNameInput = page.locator("input[data-testid='test-plan-name']");
  await testPlanNameInput.fill('Test Plan A');

  // Step 6: Click the 'Save' or 'Submit' button to add the test plan
  const saveButton = page.locator("button[data-testid='save-test-plan-button']");
  await saveButton.click();

  // Step 7: Verify that the new test plan appears in the list of test plans
  const testPlanList = page.locator("div[data-testid='test-plan-list']");
  await expect(testPlanList).toContainText('Test Plan A');

  // Step 8: Reload the page
  await page.reload();

  // Step 9: Verify that the newly added test plan is still visible in the list
  await expect(testPlanList).toContainText('Test Plan A');

  // Step 10: Use the search box to search for the newly added test plan by name
  const searchBox = page.locator("input[data-testid='tests-search-box']");
  await searchBox.fill('Test Plan A');

  // Step 11: Verify that the search results include the newly added test plan
  const searchResults = page.locator("div[data-testid='search-results']");
  await expect(searchResults).toContainText('Test Plan A');

  // Step 12: Clear the search input
  await searchBox.fill('');

  // Step 13: Navigate to another page using the 'Analysis' link
  const analysisLink = page.locator("a[href='/roostgpt/analyses']");
  await analysisLink.click();
  await page.waitForURL('https://dev.roost.ai/roostgpt/analyses');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/analyses');

  // Step 14: Return to the Test Plans page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');

  // Step 15: Verify that the newly added test plan is still visible
  await expect(testPlanList).toContainText('Test Plan A');

  // Step 16: Attempt to edit the test plan and save the changes
  const editButton = page.locator("button[data-testid='edit-test-plan-button']");
  await editButton.click();
  const editForm = page.locator("form[data-testid='edit-test-plan-form']");
  await expect(editForm).toBeVisible();
  const editNameInput = page.locator("input[data-testid='edit-test-plan-name']");
  await editNameInput.fill('Test Plan A - Edited');
  const editSaveButton = page.locator("button[data-testid='edit-save-button']");
  await editSaveButton.click();

  // Step 17: Verify that the changes are reflected in the test plan list
  await expect(testPlanList).toContainText('Test Plan A - Edited');

  // Step 18: Delete the test plan and verify it no longer appears in the list
  const deleteButton = page.locator("button[data-testid='delete-test-plan-button']");
  await deleteButton.click();
  const confirmDeleteButton = page.locator("button[data-testid='confirm-delete-button']");
  await confirmDeleteButton.click();
  await expect(testPlanList).not.toContainText('Test Plan A - Edited');
});