import { test, expect } from '@playwright/test';

test('Verify Navigation to Documentation Page', async ({ page }) => {
  // Step 1: Navigate to the login page
  await page.goto('https://dev.roost.ai/login');

  // Step 2: Verify that the 'Documentation' link is visible and enabled in the footer
  const documentationLink = page.locator("//a[@href='https://docs.roost.ai' and contains(@class, 'footer-item')]");
  await expect(documentationLink).toBeVisible();
  await expect(documentationLink).toBeEnabled();

  // Step 3: Click on the 'Documentation' link
  await documentationLink.click();

  // Step 4: Wait for the Documentation page to load
  await page.waitForURL('https://docs.roost.ai');

  // Step 5: Verify that the content of the Documentation page is displayed correctly
  // (Assuming that the Documentation page has a specific element that signifies the content is loaded correctly)
  const documentationContent = page.locator('body');
  await expect(documentationContent).toBeVisible();

  console.log('Test completed successfully: Documentation page loaded and verified.');
});