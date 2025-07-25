const { test, expect } = require('@playwright/test');

test('Test Navigation Between Tabs', async ({ page }) => {
  // Step 1: Navigate to https://dev.roost.ai/roostgpt/events.
  await page.goto('https://dev.roost.ai/roostgpt/events');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');
  console.log('Navigated to Generations tab.');

  // Step 2: Verify the visibility and clickable state of the 'RoostGPT' tab.
  const roostGPTTab = page.locator('a[data-testid="roostGPT-tab"]');
  await expect(roostGPTTab).toBeVisible();
  await expect(roostGPTTab).toBeEnabled();
  console.log('RoostGPT tab is visible and clickable.');

  // Step 3: Click on the 'RoostGPT' tab and verify navigation.
  await roostGPTTab.click();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt');
  console.log('Navigated to RoostGPT tab.');

  // Step 4: Assert that the 'RoostGPT' tab is highlighted as active.
  await expect(roostGPTTab).toHaveClass(/active/); // Assuming 'active' class indicates the active tab.
  console.log('RoostGPT tab is highlighted as active.');

  // Step 5: Click on the 'Admin' tab and verify navigation.
  const adminTab = page.locator('a[data-testid="admin-tab"]');
  await adminTab.click();
  await expect(page).toHaveURL('https://dev.roost.ai/admin/app');
  console.log('Navigated to Admin tab.');

  // Step 6: Assert that the 'Admin' tab is highlighted as active.
  await expect(adminTab).toHaveClass(/active/);
  console.log('Admin tab is highlighted as active.');

  // Step 7: Click on the 'Connectors' tab and verify navigation.
  const connectorsTab = page.locator('a[data-testid="connectors-tab"]');
  await connectorsTab.click();
  await expect(page).toHaveURL('https://dev.roost.ai/connectors');
  console.log('Navigated to Connectors tab.');

  // Step 8: Assert that the 'Connectors' tab is highlighted as active.
  await expect(connectorsTab).toHaveClass(/active/);
  console.log('Connectors tab is highlighted as active.');

  // Step 9: Click back to the 'Generations' tab and verify navigation.
  await roostGPTTab.click();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');
  console.log('Navigated back to Generations tab.');

  // Step 10: Assert that the 'Generations' tab is highlighted as active.
  await expect(roostGPTTab).toHaveClass(/active/);
  console.log('Generations tab is highlighted as active.');

  // Step 11: Reload the page and verify that the active tab state persists.
  await page.reload();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');
  await expect(roostGPTTab).toHaveClass(/active/);
  console.log('Reloaded page and verified Generations tab remains active.');

  // Step 12: Test navigation using browser back and forward buttons.
  await connectorsTab.click();
  await expect(page).toHaveURL('https://dev.roost.ai/connectors');
  await page.goBack();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');
  await page.goForward();
  await expect(page).toHaveURL('https://dev.roost.ai/connectors');
  console.log('Verified navigation using browser back and forward buttons.');

  // Step 13: Verify navigation behavior on mobile viewport sizes.
  await page.setViewportSize({ width: 375, height: 812 }); // Example for an iPhone X viewport size.
  await roostGPTTab.click();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');
  console.log('Verified navigation on mobile viewport size.');

  console.log('All steps completed successfully.');
});