const { test, expect } = require('@playwright/test');

test('Add a New Connector Workflow', async ({ page }) => {
  // Step 1: Navigate to the Connectors page
  await page.goto('https://app.roost.ai/connectors');
  await expect(page).toHaveURL('https://app.roost.ai/connectors');
  console.log('Navigated to Connectors page.');

  // Step 2: Verify the presence of the "Add Connector" button
  const addConnectorButton = page.locator('button[data-testid="add-connector-button"]');
  await expect(addConnectorButton).toBeVisible();
  console.log('Verified visibility of "Add Connector" button.');

  // Step 3: Click the "Add Connector" button
  await addConnectorButton.click();
  console.log('Clicked "Add Connector" button.');

  // Step 4: Verify the modal or page for adding a connector appears
  const modal = page.locator('div[role="dialog"], form[data-testid="add-connector-form"]');
  await expect(modal).toBeVisible();
  console.log('Verified modal or form for adding a connector is visible.');

  // Step 5: Enter valid data into the required fields
  const connectorNameInput = page.locator('input[name="connectorName"]');
  const apiKeyInput = page.locator('input[name="apiKey"]');
  await connectorNameInput.fill('GitHub');
  await apiKeyInput.fill('12345-abcde');
  console.log('Filled valid connector information.');

  // Step 6: Submit the form and verify success message
  const submitButton = page.locator('button[type="submit"]');
  await submitButton.click();
  const successMessage = page.locator('div[data-testid="success-message"]');
  await expect(successMessage).toContainText('Connector added successfully');
  console.log('Verified success message after adding connector.');

  // Step 7: Verify the new connector is listed on the page
  const connectorListItem = page.locator(`div[data-testid="connector-item"]:has-text("GitHub")`);
  await expect(connectorListItem).toBeVisible();
  console.log('Verified new connector is listed on the page.');

  // Step 8: Attempt to add a connector with missing required fields
  await addConnectorButton.click();
  await connectorNameInput.fill('');
  await apiKeyInput.fill('');
  await submitButton.click();
  const errorMessage = page.locator('div[data-testid="error-message"]');
  await expect(errorMessage).toContainText('Required fields are missing');
  console.log('Verified error message for missing required fields.');

  // Step 9: Test adding a connector with duplicate data
  await connectorNameInput.fill('GitHub');
  await apiKeyInput.fill('12345-abcde');
  await submitButton.click();
  await expect(errorMessage).toContainText('Connector name already exists');
  console.log('Verified error message for duplicate data.');

  // Step 10: Reload the page and verify the new connector persists
  await page.reload();
  await expect(connectorListItem).toBeVisible();
  console.log('Verified new connector persists after page reload.');

  // Step 11: Attempt to edit the connector and verify successful updates
  const editButton = connectorListItem.locator('button[data-testid="edit-connector-button"]');
  await editButton.click();
  const editNameInput = page.locator('input[name="connectorName"]');
  await editNameInput.fill('GitHub Updated');
  await submitButton.click();
  const updatedConnectorListItem = page.locator(`div[data-testid="connector-item"]:has-text("GitHub Updated")`);
  await expect(updatedConnectorListItem).toBeVisible();
  console.log('Verified connector update.');

  // Step 12: Delete the connector and verify its removal
  const deleteButton = updatedConnectorListItem.locator('button[data-testid="delete-connector-button"]');
  await deleteButton.click();
  const deleteConfirmation = page.locator('button[data-testid="confirm-delete-button"]');
  await deleteConfirmation.click();
  await expect(updatedConnectorListItem).not.toBeVisible();
  console.log('Verified connector deletion.');
});