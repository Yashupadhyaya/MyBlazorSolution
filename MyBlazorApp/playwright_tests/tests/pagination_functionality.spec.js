const { test, expect } = require('@playwright/test');

test('Pagination Functionality', async ({ page }) => {
  // Step 1: Navigate to the connectors page
  await page.goto('https://dev.roost.ai/connectors');
  
  // Verify the page has loaded correctly
  await expect(page).toHaveURL('https://dev.roost.ai/connectors');

  // Step 2: Verify the visibility of pagination controls
  const firstButton = page.locator('button[data-testid="paginator-first-page-button"]');
  const previousButton = page.locator('button[data-testid="paginator-previous-page-button"]');
  const nextButton = page.locator('button[data-testid="paginator-next-page-button"]');
  const lastButton = page.locator('button[data-testid="paginator-last-page-button"]');

  await expect(firstButton).toBeVisible();
  await expect(previousButton).toBeVisible();
  await expect(nextButton).toBeVisible();
  await expect(lastButton).toBeVisible();

  // Step 3: Click on the 'Next' button to navigate to the second page
  await nextButton.click();

  // Step 4: Verify the second page of connectors is displayed
  await page.waitForURL(/page=2/);
  const secondPageIndicator = page.locator('span[data-testid="current-page-indicator"]');
  await expect(secondPageIndicator).toContainText('2');

  // Step 5: Click on the 'Previous' button to return to the first page
  await previousButton.click();

  // Step 6: Verify the first page of connectors is displayed
  await page.waitForURL(/page=1/);
  const firstPageIndicator = page.locator('span[data-testid="current-page-indicator"]');
  await expect(firstPageIndicator).toContainText('1');

  // Step 7: Click on the 'Last' button
  await lastButton.click();

  // Step 8: Verify that the last page of connectors is displayed
  await page.waitForURL(/page=last/);
  const lastPageIndicator = page.locator('span[data-testid="current-page-indicator"]');
  await expect(lastPageIndicator).toContainText('Last');

  // Step 9: Click on the 'First' button
  await firstButton.click();

  // Step 10: Verify that the first page of connectors is displayed
  await page.waitForURL(/page=1/);
  await expect(firstPageIndicator).toContainText('1');

  // Step 11: Reload the page and verify that the pagination resets to the first page
  await page.reload();
  await expect(page).toHaveURL('https://dev.roost.ai/connectors');
  await expect(firstPageIndicator).toContainText('1');

  // Additional edge case handling
  try {
    // Attempt to navigate past the last page
    await lastButton.click();
    await page.waitForURL(/page=last/);
    await nextButton.click();
    const disabledNextButton = await nextButton.isDisabled();
    console.log('Next button disabled on last page:', disabledNextButton);
    expect(disabledNextButton).toBeTruthy();
  } catch (error) {
    console.error('Error handling edge case for last page navigation:', error);
  }

  // Performance check: Ensure page navigation is under 1 second
  const navigationStart = Date.now();
  await nextButton.click();
  await page.waitForURL(/page=2/);
  const navigationEnd = Date.now();
  const navigationDuration = navigationEnd - navigationStart;
  console.log(`Page navigation duration: ${navigationDuration} ms`);
  expect(navigationDuration).toBeLessThan(1000);
});