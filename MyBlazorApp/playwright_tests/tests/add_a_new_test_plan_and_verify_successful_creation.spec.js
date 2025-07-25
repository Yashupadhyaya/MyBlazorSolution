const { test, expect } = require('@playwright/test');

test('Add a New Test Plan and Verify Successful Creation', async ({ page }) => {
  // Step 1: Navigate to the Test Plans list page
  const baseUrl = 'https://dev.roost.ai/roostgpt/tests';
  await page.goto(baseUrl);
  
  // Step 2: Verify the visibility of the 'Add Test Plan' button
  const addTestPlanButton = page.locator('button[data-testid="add-test-plan-btn"]');
  await expect(addTestPlanButton).toBeVisible();
  
  // Step 3: Click on the 'Add Test Plan' button
  await addTestPlanButton.click();
  
  // Step 4: Verify that a modal or separate page opens for creating a test plan
  const testPlanModal = page.locator('div[data-testid="test-plan-modal"]'); // Assuming the modal has this selector
  await expect(testPlanModal).toBeVisible();
  
  // Step 5: Input the test plan name
  const testPlanNameInput = page.locator('input[data-testid="test-plan-name-input"]');
  await expect(testPlanNameInput).toBeVisible();
  await testPlanNameInput.fill('New Test Plan');
  
  // Step 6: Select the AI model (assuming a dropdown selector is present)
  const aiModelDropdown = page.locator('select[data-testid="ai-model-dropdown"]');
  await expect(aiModelDropdown).toBeVisible();
  await aiModelDropdown.selectOption({ label: 'OpenAI GPT-4' });
  
  // Step 7: Choose the test type from the dropdown options
  const testTypeDropdown = page.locator('select[data-testid="test-type-dropdown"]');
  await expect(testTypeDropdown).toBeVisible();
  await testTypeDropdown.selectOption({ label: 'E2E' });
  
  // Step 8: Set the test plan's creation date (if applicable)
  const creationDateInput = page.locator('input[data-testid="creation-date-input"]');
  if (await creationDateInput.isVisible()) {
    await creationDateInput.fill('2023-10-01T12:00:00');
  }
  
  // Step 9: Click the 'Save' or 'Create' button to submit the new test plan
  const saveButton = page.locator('button[data-testid="save-test-plan-btn"]');
  await expect(saveButton).toBeVisible();
  await saveButton.click();
  
  // Step 10: Verify that a success message is displayed confirming the creation
  const successMessage = page.locator('div[data-testid="success-message"]');
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toContainText('Test Plan successfully created');
  
  // Step 11: Redirect back to the Test Plans list page (if not automatically done)
  await page.goto(baseUrl);
  await expect(page).toHaveURL(baseUrl);
  
  // Step 12: Verify that the newly created test plan appears in the list
  const newTestPlanRow = page.locator('tr[data-testid="test-plan-row"]:has-text("New Test Plan")');
  await expect(newTestPlanRow).toBeVisible();
  
  // Step 13: Use the search bar to locate the new test plan by its name
  const searchBar = page.locator('input[data-testid="test-plan-search-input"]');
  await expect(searchBar).toBeVisible();
  await searchBar.fill('New Test Plan');
  await searchBar.press('Enter');
  await expect(newTestPlanRow).toBeVisible();
  
  // Step 14: Click on the test plan name to navigate to its details page
  const testPlanLink = newTestPlanRow.locator('a[data-testid="test-plan-name-link"]');
  await expect(testPlanLink).toBeVisible();
  await testPlanLink.click();
  
  // Step 15: Verify the details of the test plan
  const testPlanDetailsName = page.locator('div[data-testid="test-plan-details-name"]');
  const testPlanDetailsType = page.locator('div[data-testid="test-plan-details-type"]');
  const testPlanDetailsCreator = page.locator('div[data-testid="test-plan-details-creator"]');
  const testPlanDetailsTimestamp = page.locator('div[data-testid="test-plan-details-timestamp"]');
  
  await expect(testPlanDetailsName).toHaveText('New Test Plan');
  await expect(testPlanDetailsType).toHaveText('E2E');
  await expect(testPlanDetailsCreator).toHaveText('Created by User'); // Assuming a placeholder for the creator
  await expect(testPlanDetailsTimestamp).toHaveText('2023-10-01T12:00:00');
  
  console.log('Test plan creation and verification workflow completed successfully.');
});