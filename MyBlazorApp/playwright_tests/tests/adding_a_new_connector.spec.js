const { test, expect } = require('@playwright/test');

// Test case: Adding a New Connector
test('Adding a New Connector', async ({ page }) => {
  // Step 1: Navigate to the connectors page
  await page.goto('https://dev.roost.ai/connectors');
  await expect(page).toHaveURL('https://dev.roost.ai/connectors');

  // Step 2: Verify the 'Add Connector' button is visible and enabled
  const addConnectorButton = page.locator("button[data-testid='add-connector-button']");
  await expect(addConnectorButton).toBeVisible();
  await expect(addConnectorButton).toBeEnabled();

  // Step 3: Click on the 'Add Connector' button
  await addConnectorButton.click();

  // Step 4: Fill out the connector creation form with valid data
  try {
    const connectorNameInput = page.locator("input[data-testid='Connector-name-input']");
    await expect(connectorNameInput).toBeVisible();
    await connectorNameInput.fill('New Connector Name');

    const descriptionInput = page.locator("textarea[data-testid='Connector-description-input']");
    await expect(descriptionInput).toBeVisible();
    await descriptionInput.fill('This is a test connector.');

    const submitButton = page.locator("button[data-testid='submit-connector-button']");
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();

    // Step 5: Submit the form
    await submitButton.click();
  } catch (error) {
    console.error('Error interacting with the connector creation form:', error);
    throw error;
  }

  // Step 6: Wait for the page to reload or for a success message to appear
  await page.waitForNavigation();
  const successMessage = page.locator("div[data-testid='success-message']");
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toContainText('Connector added successfully');

  // Step 7: Verify that the newly added connector appears in the connector list
  const connectorList = page.locator("table[data-testid='connector-list']");
  await expect(connectorList).toBeVisible();
  const newConnectorRow = connectorList.locator("tr:has-text('New Connector Name')");
  await expect(newConnectorRow).toBeVisible();

  // Step 8: Use the search functionality to filter the connector list by the newly added connector's name
  const searchBox = page.locator("input[data-testid='Connector-search-box']");
  await expect(searchBox).toBeVisible();
  await searchBox.fill('New Connector Name');
  await searchBox.press('Enter');

  // Step 9: Verify that the search results display the newly added connector
  await page.waitForTimeout(1000); // Wait for search results to update
  const searchedConnectorRow = connectorList.locator("tr:has-text('New Connector Name')");
  await expect(searchedConnectorRow).toBeVisible();

  // Step 10: Reload the page and verify that the connector entry persists in the list
  await page.reload();
  await expect(page).toHaveURL('https://dev.roost.ai/connectors');
  const persistentConnectorRow = connectorList.locator("tr:has-text('New Connector Name')");
  await expect(persistentConnectorRow).toBeVisible();
});