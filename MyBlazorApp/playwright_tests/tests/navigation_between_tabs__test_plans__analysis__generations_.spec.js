const { test, expect } = require('@playwright/test');

test('Navigation Between Tabs (Test Plans, Analysis, Generations)', async ({ page }) => {
  // Step 1: Navigate to the Test Plans page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  console.log('Navigated to Test Plans page');

  // Step 2: Verify the 'Test Plans' tab is active
  const testPlansTab = page.locator("a[data-testid='roostGPT-tab']");
  await expect(testPlansTab).toHaveClass(/active/);
  console.log('Verified Test Plans tab is active');

  // Step 3: Click on the 'Analysis' tab
  const analysisTab = page.locator("a[data-testid='admin-tab']");
  await analysisTab.click();
  console.log('Clicked on Analysis tab');

  // Step 4: Verify URL changes to Analysis page
  await page.waitForURL('https://dev.roost.ai/roostgpt/analyses');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/analyses');
  console.log('Verified Analysis page URL');

  // Step 5: Verify Analysis page content is rendered
  const analysisContent = page.locator('.analysis-page-content'); // Replace with actual selector
  await expect(analysisContent).toBeVisible();
  console.log('Verified Analysis page content is visible');

  // Step 6: Click on the 'Generations' tab
  const generationsTab = page.locator("a[data-testid='connectors-tab']");
  await generationsTab.click();
  console.log('Clicked on Generations tab');

  // Step 7: Verify URL changes to Generations page
  await page.waitForURL('https://dev.roost.ai/roostgpt/events');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');
  console.log('Verified Generations page URL');

  // Step 8: Verify Generations page content is rendered
  const generationsContent = page.locator('.generations-page-content'); // Replace with actual selector
  await expect(generationsContent).toBeVisible();
  console.log('Verified Generations page content is visible');

  // Step 9: Click back to the 'Test Plans' tab
  await testPlansTab.click();
  console.log('Clicked back to Test Plans tab');

  // Step 10: Verify URL changes back to Test Plans page
  await page.waitForURL('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  console.log('Verified Test Plans page URL');

  // Step 11: Reload the Test Plans page and verify active tab persists
  await page.reload();
  await expect(testPlansTab).toHaveClass(/active/);
  console.log('Reloaded Test Plans page and verified active tab persists');

  // Step 12: Use keyboard navigation (Tab/Shift+Tab) to navigate between tabs
  await page.keyboard.press('Tab');
  await expect(testPlansTab).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(analysisTab).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(generationsTab).toBeFocused();
  console.log('Verified keyboard navigation between tabs');

  // Step 13: Verify focus indicators are visible on each tab during keyboard navigation
  const focusIndicator = page.locator('.focus-indicator'); // Replace with actual selector
  await expect(focusIndicator).toBeVisible();
  console.log('Verified focus indicators during keyboard navigation');

  // Step 14: Resize browser window to test responsiveness
  await page.setViewportSize({ width: 800, height: 600 });
  await expect(testPlansTab).toBeVisible();
  await expect(analysisTab).toBeVisible();
  await expect(generationsTab).toBeVisible();
  console.log('Verified responsiveness at smaller viewport size');

  // Step 15: Test navigation on a mobile device emulator
  await page.emulateMedia({ viewport: { width: 375, height: 812 } });
  await expect(testPlansTab).toBeVisible();
  await expect(analysisTab).toBeVisible();
  await expect(generationsTab).toBeVisible();
  console.log('Verified navigation on mobile device emulator');

  // Step 16: Click on tabs multiple times in quick succession
  for (let i = 0; i < 5; i++) {
    await testPlansTab.click();
    await analysisTab.click();
    await generationsTab.click();
  }
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');
  console.log('Verified no errors occur during rapid tab switching');

  // Step 17: Verify browser back/forward buttons correctly navigate
  await page.goBack();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/analyses');
  await page.goBack();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  await page.goForward();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/analyses');
  console.log('Verified browser back/forward navigation between tabs');
});