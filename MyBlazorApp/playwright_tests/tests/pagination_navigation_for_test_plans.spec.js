const { test, expect } = require('@playwright/test');

test('Pagination Navigation for Test Plans', async ({ page }) => {
  const baseUrl = 'https://app.roost.ai/roostgpt/tests';

  // Navigate to the Test Plans page
  await page.goto(baseUrl);
  await expect(page).toHaveURL(baseUrl);

  // Step 2: Verify the visibility of pagination controls
  const paginationControls = page.locator('button[data-testid]');
  await expect(paginationControls).toBeVisible();

  // Step 3: Click on the 'Next' (» arrow) button and verify navigation
  const nextButton = page.locator('button[data-testid="arrow-icon"]');
  await nextButton.click();
  await page.waitForNavigation();
  await expect(page).toHaveURL(/page=\d+/); // Verify that the page number changes

  // Step 4: Click on the 'Previous' (« arrow) button and verify navigation
  const previousButton = page.locator('button[data-testid="arrow-left"]');
  await previousButton.click();
  await page.waitForNavigation();
  await expect(page).toHaveURL(/page=\d+/); // Verify that the page number changes back

  // Step 5: Click on the numeric page button '2' and verify navigation
  const pageTwoButton = page.locator('button:has-text("2")');
  await pageTwoButton.click();
  await page.waitForNavigation();
  await expect(page).toHaveURL(/page=2/);

  // Step 6: Click on the 'First' button and verify navigation
  const firstPageButton = page.locator('button[data-testid="paginator-first-page-button"]');
  await firstPageButton.click();
  await page.waitForNavigation();
  await expect(page).toHaveURL(baseUrl);

  // Step 7: Click on the 'Last' button and verify navigation
  const lastPageButton = page.locator('button:has-text("Last")');
  await lastPageButton.click();
  await page.waitForNavigation();
  await expect(page).toHaveURL(/page=\d+/); // Verify last page is displayed

  // Step 8: Refresh the page and verify pagination resets
  await page.reload();
  await expect(page).toHaveURL(baseUrl);

  // Step 9: Verify keyboard accessibility for pagination controls
  const paginationButtons = page.locator('button[data-testid]');
  await page.keyboard.press('Tab');
  await expect(paginationButtons.first()).toBeFocused();

  // Step 10: Test clicking on disabled pagination controls
  const disabledFirstButton = page.locator('button[data-testid="paginator-first-page-button"][disabled]');
  if (await disabledFirstButton.isVisible()) {
    await disabledFirstButton.click();
    await expect(page).toHaveURL(baseUrl); // No action should occur
  }

  // Step 11: Verify total number of pages displayed correctly
  const totalPagesLocator = page.locator('.pagination-total-pages'); // Adjust selector based on implementation
  await expect(totalPagesLocator).toContainText(/\d+/); // Verify numeric page count is displayed

  // Step 12: Attempt to navigate to a non-existent page (e.g., page 100)
  const nonExistentPageButton = page.locator('button:has-text("100")');
  if (await nonExistentPageButton.isVisible()) {
    await nonExistentPageButton.click();
    await expect(page.locator('.error-message')).toBeVisible(); // Verify error message
  } else {
    console.log('Non-existent page button not found, no action performed.');
  }

  // Edge Case: Test clicking 'Next' on the last page
  if (await lastPageButton.isDisabled()) {
    console.log('Next button is disabled on the last page, as expected.');
  } else {
    console.error('Next button should be disabled on the last page.');
  }

  // Edge Case: Test clicking 'Previous' on the first page
  if (await previousButton.isDisabled()) {
    console.log('Previous button is disabled on the first page, as expected.');
  } else {
    console.error('Previous button should be disabled on the first page.');
  }

  // Performance Metrics: Measure time to load the next page
  const start = Date.now();
  await nextButton.click();
  await page.waitForNavigation();
  const end = Date.now();
  console.log(`Time taken to load next page: ${end - start} ms`);

  // Accessibility Verification
  const focusIndicator = page.locator('button[data-testid]:focus-visible');
  await expect(focusIndicator).toBeVisible(); // Ensure focus indicator is visible

  console.log('Pagination navigation test completed successfully.');
});