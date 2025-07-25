const { test, expect } = require('@playwright/test');

test('Add New Connector Functionality', async ({ page }) => {
  // Step 1: Navigate to the Connectors page
  await page.goto('https://dev.roost.ai/connectors');
  await expect(page).toHaveURL('https://dev.roost.ai/connectors');

  // Step 2: Click on the 'Add Connector' button
  const addConnectorButton = page.locator('button[data-testid="add-connector-button"]');
  await expect(addConnectorButton).toBeVisible();
  await addConnectorButton.click();

  // Step 3: Verify the Add Connector form is displayed
  const connectorNameInput = page.locator('input[data-testid="connector-name"]');
  const submitButton = page.locator('button[data-testid="submit-connector"]');
  await expect(connectorNameInput).toBeVisible();
  await expect(submitButton).toBeVisible();

  // Step 4: Fill out the connector name field with a valid name
  await connectorNameInput.fill('ValidConnector1');

  // Step 5: Select a connector type if dropdown is present
  const connectorTypeDropdown = page.locator('select[data-testid="connector-type"]');
  if (await connectorTypeDropdown.count() > 0) {
    await connectorTypeDropdown.selectOption({ index: 1 }); // Select the first option
  }

  // Step 6: Click the Submit button
  await submitButton.click();

  // Step 7: Verify the new connector is added to the connectors list
  const connectorsList = page.locator('ul[data-testid="connectors-list"]');
  await expect(connectorsList).toContainText('ValidConnector1');

  // Step 8: Attempt to add a connector with a duplicate name
  await addConnectorButton.click();
  await connectorNameInput.fill('ExistingConnector');
  await submitButton.click();
  const duplicateError = page.locator('div[data-testid="error-message"]');
  await expect(duplicateError).toBeVisible();
  await expect(duplicateError).toContainText('Duplicate entries are not allowed');

  // Step 9: Attempt to submit the form without any data
  await addConnectorButton.click();
  await connectorNameInput.fill(''); // Clear the input field
  await submitButton.click();
  const validationError = page.locator('div[data-testid="validation-error"]');
  await expect(validationError).toBeVisible();
  await expect(validationError).toContainText('Required fields must be filled');

  // Step 10: Validate error handling by simulating a network failure
  await page.route('/api/connectors', route => route.abort()); // Simulate network failure
  await addConnectorButton.click();
  await connectorNameInput.fill('NetworkFailureConnector');
  try {
    await submitButton.click();
  } catch (error) {
    console.error('Network error during form submission:', error);
  }
  const networkError = page.locator('div[data-testid="network-error"]');
  await expect(networkError).toBeVisible();
  await expect(networkError).toContainText('Failed to submit due to network issues');

  // Step 11: Refresh the page and verify the new connector persists
  await page.reload();
  await expect(connectorsList).toContainText('ValidConnector1');
});