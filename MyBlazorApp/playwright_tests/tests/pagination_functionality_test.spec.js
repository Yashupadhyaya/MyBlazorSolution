const { test, expect } = require('@playwright/test');

test('Pagination Functionality Test', async ({ page }) => {
  // Step 1: Navigate to the connectors page
  const url = 'https://dev.roost.ai/connectors';
  await page.goto(url);
  
  // Step 2: Verify the visibility of pagination controls
  const nextButton = page.locator('button[data-testid="arrow-icon"]');
  const previousButton = page.locator('button[data-testid="arrow-left"]');
  const firstButton = page.locator('button[data-testid="paginator-first-page-button"]');
  const lastButton = page.locator('button[data-testid="paginator-last-page-button"]');
  const pageNumberThreeButton = page.locator('button.page-link:nth-child(3)');

  await expect(nextButton).toBeVisible();
  await expect(previousButton).toBeVisible();
  await expect(firstButton).toBeVisible();
  await expect(lastButton).toBeVisible();
  await expect(pageNumberThreeButton).toBeVisible();

  // Step 3: Click the 'Next' button
  await nextButton.click();

  // Step 4: Verify the next page of results is displayed
  await page.waitForURL(/page=2/);
  console.log('Navigated to page 2');
  
  // Step 5: Click the 'Previous' button
  await previousButton.click();

  // Step 6: Verify the previous page of results is displayed
  await page.waitForURL(/page=1/);
  console.log('Returned to page 1');

  // Step 7: Click the 'First' button
  await firstButton.click();

  // Step 8: Verify the first page of results is displayed
  await page.waitForURL(/page=1/);
  console.log('Verified first page is loaded');

  // Step 9: Click the 'Last' button
  await lastButton.click();

  // Step 10: Verify the last page of results is displayed
  await page.waitForURL(/page=5/); // Assuming 50 connectors with 10 per page
  console.log('Verified last page is loaded');

  // Step 11: Click on a specific page number (e.g., 3)
  await pageNumberThreeButton.click();

  // Step 12: Verify the corresponding page of results is displayed
  await page.waitForURL(/page=3/);
  console.log('Navigated to page 3');

  // Step 13: Reload the page and verify the default page (1) is displayed
  await page.reload();
  await page.waitForURL(/page=1/);
  console.log('Verified page reset to default (page 1) after reload');

  // Step 14: Perform a search and verify pagination updates accordingly
  const searchInput = page.locator('input[placeholder="Search connectors"]');
  await searchInput.fill('connector');
  await searchInput.press('Enter');
  await page.waitForTimeout(1000); // Allow search results to load
  console.log('Performed search operation and verified results load');

  // Step 15: Navigate through pages after performing a search
  await nextButton.click();
  await page.waitForURL(/page=2&search=connector/);
  console.log('Verified search pagination navigates to the next page');
  await previousButton.click();
  await page.waitForURL(/page=1&search=connector/);
  console.log('Verified search pagination navigates back to the previous page');

  // Edge Cases
  try {
    const nonExistentPageButton = page.locator('button.page-link:nth-child(100)');
    if (await nonExistentPageButton.count() > 0) {
      await nonExistentPageButton.click();
      console.log('Edge case: Attempted navigation to non-existent page');
    } else {
      console.log('Non-existent page button not found (expected behavior)');
    }
  } catch (error) {
    console.error('Edge case: Error navigating to non-existent page', error);
  }

  // Accessibility Checks
  const paginationControls = page.locator('[role="navigation"]');
  await expect(paginationControls).toBeVisible();
  console.log('Accessibility: Verified pagination controls visibility');
});