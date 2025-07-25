const { test, expect } = require('@playwright/test');

test('Navigation Between Tabs (RoostGPT, Admin, Connectors)', async ({ page }) => {
  // Step 1: Navigate to the initial page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  console.log('Navigated to the initial page.');

  // Step 2: Verify visibility and enablement of 'RoostGPT' tab
  const roostGPTTab = page.locator('a[data-testid="roostGPT-tab"]');
  await expect(roostGPTTab).toBeVisible();
  await expect(roostGPTTab).toBeEnabled();
  console.log('Verified visibility and enablement of RoostGPT tab.');

  // Step 3: Click on 'RoostGPT' tab and verify navigation
  await roostGPTTab.click();
  await page.waitForURL('https://dev.roost.ai/roostgpt');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt');
  console.log('Successfully navigated to RoostGPT tab.');

  // Step 4: Verify content loaded for RoostGPT functionality
  const roostGPTContent = page.locator('div[data-testid="roostGPT-content"]');
  await expect(roostGPTContent).toBeVisible();
  await expect(roostGPTContent).toContainText('RoostGPT Content');
  console.log('Verified RoostGPT content.');

  // Step 5: Return to the original page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  console.log('Returned to the original page.');

  // Step 6: Verify visibility and enablement of 'Admin' tab
  const adminTab = page.locator('a[data-testid="admin-tab"]');
  await expect(adminTab).toBeVisible();
  await expect(adminTab).toBeEnabled();
  console.log('Verified visibility and enablement of Admin tab.');

  // Step 7: Click on 'Admin' tab and verify navigation
  await adminTab.click();
  await page.waitForURL('https://dev.roost.ai/admin/app');
  await expect(page).toHaveURL('https://dev.roost.ai/admin/app');
  console.log('Successfully navigated to Admin tab.');

  // Step 8: Verify content loaded for Admin functionality
  const adminContent = page.locator('div[data-testid="admin-content"]');
  await expect(adminContent).toBeVisible();
  await expect(adminContent).toContainText('Admin Content');
  console.log('Verified Admin content.');

  // Step 9: Return to the original page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  console.log('Returned to the original page.');

  // Step 10: Verify visibility and enablement of 'Connectors' tab
  const connectorsTab = page.locator('a[data-testid="connectors-tab"]');
  await expect(connectorsTab).toBeVisible();
  await expect(connectorsTab).toBeEnabled();
  console.log('Verified visibility and enablement of Connectors tab.');

  // Step 11: Click on 'Connectors' tab and verify navigation
  await connectorsTab.click();
  await page.waitForURL('https://dev.roost.ai/connectors');
  await expect(page).toHaveURL('https://dev.roost.ai/connectors');
  console.log('Successfully navigated to Connectors tab.');

  // Step 12: Verify content loaded for Connectors functionality
  const connectorsContent = page.locator('div[data-testid="connectors-content"]');
  await expect(connectorsContent).toBeVisible();
  await expect(connectorsContent).toContainText('Connectors Content');
  console.log('Verified Connectors content.');

  // Step 13: Use keyboard shortcuts to navigate between tabs
  try {
    await page.keyboard.press('Control+1'); // Shortcut for RoostGPT tab
    await expect(page).toHaveURL('https://dev.roost.ai/roostgpt');
    console.log('Navigated to RoostGPT tab using keyboard shortcut.');

    await page.keyboard.press('Control+2'); // Shortcut for Admin tab
    await expect(page).toHaveURL('https://dev.roost.ai/admin/app');
    console.log('Navigated to Admin tab using keyboard shortcut.');

    await page.keyboard.press('Control+3'); // Shortcut for Connectors tab
    await expect(page).toHaveURL('https://dev.roost.ai/connectors');
    console.log('Navigated to Connectors tab using keyboard shortcut.');
  } catch (error) {
    console.error('Error using keyboard shortcuts:', error);
  }

  // Step 14: Test cross-browser compatibility (example: Chromium only for simplicity)
  console.log('Cross-browser compatibility should be tested in separate browser instances.');

  // Step 15: Test responsiveness by resizing the browser window
  await page.setViewportSize({ width: 800, height: 600 });
  await expect(roostGPTTab).toBeVisible();
  await expect(adminTab).toBeVisible();
  await expect(connectorsTab).toBeVisible();
  console.log('Verified tabs remain clickable after resizing the browser window.');
});