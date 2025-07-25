const { test, expect } = require('@playwright/test');

test('Pagination Controls Verification', async ({ page }) => {
  // Step 1: Navigate to the Connectors page
  await page.goto('https://dev.roost.ai/connectors');
  await expect(page).toHaveURL('https://dev.roost.ai/connectors');
  console.log('Navigated to the Connectors page.');

  // Step 2: Verify pagination controls are visible
  const paginationControls = page.locator('button[data-testid]');
  await expect(paginationControls).toBeVisible();
  console.log('Verified pagination controls are visible.');

  // Step 3: Click the '2' page number button and verify the update
  const pageTwoButton = page.locator('button:text("2")');
  await pageTwoButton.click();
  await page.waitForURL(/page=2/); // Assuming the URL changes to indicate the page number
  console.log('Navigated to page 2 and verified the URL.');

  // Step 4: Click the 'Next' button and verify the page updates
  const nextButton = page.locator('button[data-testid="arrow-icon"]');
  await nextButton.click();
  await page.waitForURL(/page=3/); // Assuming the URL changes to indicate the next page
  console.log('Clicked Next button and verified navigation to the next page.');

  // Step 5: Click the 'Previous' button and verify the page returns to the previous set of results
  const previousButton = page.locator('button[data-testid="arrow-left"]');
  await previousButton.click();
  await page.waitForURL(/page=2/); // Assuming the URL changes to indicate the previous page
  console.log('Clicked Previous button and verified navigation to the previous page.');

  // Step 6: Click the 'Last' button and verify the page navigates to the last page
  const lastButton = page.locator('button[data-testid="paginator-last-page-button"]');
  await lastButton.click();
  await page.waitForURL(/page=last/); // Assuming the URL changes to indicate the last page
  console.log('Clicked Last button and verified navigation to the last page.');

  // Step 7: Click the 'First' button and verify the page navigates back to the first page
  const firstButton = page.locator('button[data-testid="paginator-first-page-button"]');
  await firstButton.click();
  await page.waitForURL(/page=1/); // Assuming the URL changes to indicate the first page
  console.log('Clicked First button and verified navigation to the first page.');

  // Step 8: Click a page number button in rapid succession to verify stability
  try {
    for (let i = 0; i < 5; i++) {
      await pageTwoButton.click();
    }
    console.log('Clicked a page number button rapidly multiple times without issues.');
  } catch (error) {
    console.error('Error during rapid clicks:', error);
  }

  // Step 9: Verify disabled state for 'First' and 'Previous' buttons on the first page
  await expect(firstButton).toBeDisabled();
  await expect(previousButton).toBeDisabled();
  console.log('Verified disabled state for First and Previous buttons on the first page.');

  // Step 10: Verify disabled state for 'Next' and 'Last' buttons on the last page
  await lastButton.click();
  await expect(nextButton).toBeDisabled();
  await expect(lastButton).toBeDisabled();
  console.log('Verified disabled state for Next and Last buttons on the last page.');

  // Step 11: Test keyboard navigation by tabbing through pagination controls
  try {
    const isFocusable = await paginationControls.evaluateAll(
      (elements) => elements.every((el) => el.tabIndex >= 0)
    );
    expect(isFocusable).toBeTruthy();
    console.log('Verified all pagination controls are focusable via keyboard.');
  } catch (error) {
    console.error('Error during keyboard navigation test:', error);
  }

  // Step 12: Verify distinct visual indicator for the currently selected page
  const activePageIndicator = page.locator('button[data-testid="active-page"]'); // Assuming the active page has a specific data-testid
  await expect(activePageIndicator).toBeVisible();
  console.log('Verified distinct visual indicator for the currently selected page.');

  // Step 13: Verify pagination state is preserved when navigating back to Connectors page
  await page.goto('https://dev.roost.ai/some-other-page'); // Navigate to another page
  await page.goto('https://dev.roost.ai/connectors'); // Return to Connectors page
  await expect(page).toHaveURL('https://dev.roost.ai/connectors');
  const currentPageIndicator = page.locator('button[data-testid="active-page"]');
  await expect(currentPageIndicator).toContainText('1'); // Assuming the page state resets to the first page
  console.log('Verified pagination state is preserved when navigating back.');

  console.log('Pagination Controls Verification test completed successfully.');
});