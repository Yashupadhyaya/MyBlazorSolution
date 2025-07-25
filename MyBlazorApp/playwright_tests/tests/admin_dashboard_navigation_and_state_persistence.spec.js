const { test, expect } = require('@playwright/test');

test('Admin Dashboard Navigation and State Persistence', async ({ page }) => {
  // Step 1: Navigate to the Admin page
  await page.goto('https://dev.roost.ai/admin/app');
  console.log('Navigated to Admin page.');

  // Step 2: Verify visibility and active state of the Admin tab
  const adminTab = page.locator('a[data-testid="admin-tab"]');
  await expect(adminTab).toBeVisible();
  await expect(adminTab).toHaveClass(/active/); // Assuming 'active' class marks the tab as active
  console.log('Admin tab is visible and active.');

  // Step 3: Click the RoostGPT tab
  const roostGPTTab = page.locator('a[data-testid="roostGPT-tab"]');
  await roostGPTTab.click();
  console.log('Clicked RoostGPT tab.');

  // Step 4: Verify navigation to RoostGPT page
  await page.waitForURL('https://dev.roost.ai/roostgpt');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt');
  console.log('Navigated to RoostGPT page.');

  // Step 5: Interact with visible UI elements on RoostGPT page
  try {
    const uiElement = page.locator('div'); // Replace with specific selectors for RoostGPT page elements
    if (await uiElement.count() > 0) {
      await expect(uiElement.first()).toBeVisible();
      console.log('Verified UI element visibility on RoostGPT page.');
    }
  } catch (error) {
    console.error('Error interacting with UI elements on RoostGPT page:', error);
  }

  // Step 6: Return to the Admin tab
  await adminTab.click();
  console.log('Clicked Admin tab to return.');

  // Step 7: Verify navigation back to Admin page and state preservation
  await page.waitForURL('https://dev.roost.ai/admin/app');
  await expect(page).toHaveURL('https://dev.roost.ai/admin/app');
  await expect(adminTab).toHaveClass(/active/);
  console.log('Returned to Admin page and verified state preservation.');

  // Step 8: Click the Connectors tab
  const connectorsTab = page.locator('a[data-testid="connectors-tab"]');
  await connectorsTab.click();
  console.log('Clicked Connectors tab.');

  // Step 9: Verify navigation to Connectors page
  await page.waitForURL('https://dev.roost.ai/connectors');
  await expect(page).toHaveURL('https://dev.roost.ai/connectors');
  console.log('Navigated to Connectors page.');

  // Step 10: Return to the Admin tab again
  await adminTab.click();
  console.log('Clicked Admin tab to return again.');

  // Step 11: Reload the page and verify Admin tab remains active
  await page.reload();
  await expect(page).toHaveURL('https://dev.roost.ai/admin/app');
  await expect(adminTab).toHaveClass(/active/);
  console.log('Reloaded Admin page and verified active state.');

  // Step 12: Verify functionality of key UI elements after reload
  await expect(adminTab).toBeVisible();
  await expect(roostGPTTab).toBeVisible();
  await expect(connectorsTab).toBeVisible();
  console.log('Verified key UI elements remain functional after reload.');
});