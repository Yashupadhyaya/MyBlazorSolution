const { test, expect } = require('@playwright/test');

test('Add and Manage Connectors Workflow', async ({ page }) => {
  // Data for the test
  const connectorName = 'Test Connector';
  const connectorDetails = 'This is a test connector.';
  const editedConnectorDetails = 'Updated connector details.';

  // Step 1: Navigate to the Connectors page
  await page.goto('https://dev.roost.ai/connectors');
  await expect(page).toHaveURL('https://dev.roost.ai/connectors');

  // Step 2: Verify the visibility of 'Add Connector' button
  const addConnectorButton = page.locator('button[data-testid="add-connector-button"]');
  await expect(addConnectorButton).toBeVisible();

  // Step 3: Click on the 'Add Connector' button
  await addConnectorButton.click();

  // Step 4: Fill out the Add Connector form
  const nameField = page.locator('input[name="connectorName"]'); // Assuming name field selector
  const detailsField = page.locator('textarea[name="connectorDetails"]'); // Assuming details field selector
  await nameField.fill(connectorName);
  await detailsField.fill(connectorDetails);

  // Step 5: Click the 'Save' button
  const saveButton = page.locator('button[type="submit"]'); // Assuming the save button selector
  await saveButton.click();

  // Step 6: Verify that the new connector is added to the connectors list
  const connectorRow = page.locator(`tr:has-text("${connectorName}")`);
  await expect(connectorRow).toBeVisible();

  // Step 7: Search for the newly added connector using the search box
  const searchBox = page.locator('input[data-testid="Connector-search-box"]');
  await searchBox.fill(connectorName);

  // Step 8: Verify the connector appears in the filtered results
  await expect(connectorRow).toBeVisible();

  // Step 9: Click the 'Info' button for the connector
  const infoButton = connectorRow.locator('button[data-testid="info-button"]');
  await infoButton.click();

  // Step 10: Verify the Info modal displays correct details about the connector
  const infoModal = page.locator('div[data-testid="info-modal"]');
  await expect(infoModal).toBeVisible();
  await expect(infoModal).toContainText(connectorName);
  await expect(infoModal).toContainText(connectorDetails);

  // Close the Info modal
  const closeModalButton = page.locator('button[data-testid="close-modal-button"]'); // Assuming close button selector
  await closeModalButton.click();

  // Step 11: Click the 'Edit' button for the connector
  const editButton = connectorRow.locator('button[data-testid="edit-button"]');
  await editButton.click();

  // Step 12: Modify the connector details and click 'Save'
  await detailsField.fill(editedConnectorDetails);
  await saveButton.click();

  // Step 13: Verify the modified connector details appear in the list
  await expect(connectorRow).toContainText(editedConnectorDetails);

  // Step 14: Click the 'Delete' button for the connector
  const deleteButton = connectorRow.locator('button[data-testid="delete-button"]');
  await deleteButton.click();

  // Step 15: Confirm the delete action
  const confirmDeleteButton = page.locator('button[data-testid="confirm-delete-button"]'); // Assuming confirm button selector
  await confirmDeleteButton.click();

  // Step 16: Search again for the deleted connector
  await searchBox.fill(connectorName);

  // Step 17: Verify the connector no longer appears in the list
  await expect(page.locator(`tr:has-text("${connectorName}")`)).not.toBeVisible();

  // Step 18: Reload the page and verify the connector is still removed
  await page.reload();
  await expect(page.locator(`tr:has-text("${connectorName}")`)).not.toBeVisible();
});