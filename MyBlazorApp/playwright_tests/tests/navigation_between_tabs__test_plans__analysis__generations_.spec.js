const { test, expect } = require('@playwright/test');

test('Navigation Between Tabs (Test Plans, Analysis, Generations)', async ({ page }) => {
  // Step 1: Navigate to the 'Test Plans' tab
  await page.goto('https://app.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://app.roost.ai/roostgpt/tests');
  console.log('Navigated to the Test Plans tab.');

  // Step 2: Verify the 'Test Plans' tab is active and content is displayed
  const testPlansTab = page.locator('a[href="/roostgpt/tests"]');
  await expect(testPlansTab).toHaveClass(/active/);
  const testPlansContent = page.locator('[data-testid="test-plans-content"]');
  await expect(testPlansContent).toBeVisible();
  console.log('Verified Test Plans tab is active and content is displayed.');

  // Step 3: Click on the 'Analysis' tab and verify navigation
  const analysisTab = page.locator('a[href="/roostgpt/analyses"]');
  await analysisTab.click();
  await page.waitForURL('https://app.roost.ai/roostgpt/analyses');
  await expect(page).toHaveURL('https://app.roost.ai/roostgpt/analyses');
  console.log('Navigated to the Analysis tab.');

  // Step 4: Validate the 'Analysis' tab is active and relevant content is displayed
  await expect(analysisTab).toHaveClass(/active/);
  const analysisContent = page.locator('[data-testid="analysis-content"]');
  await expect(analysisContent).toBeVisible();
  console.log('Verified Analysis tab is active and content is displayed.');

  // Step 5: Click on the 'Generations' tab and verify navigation
  const generationsTab = page.locator('a[href="/roostgpt/events"]');
  await generationsTab.click();
  await page.waitForURL('https://app.roost.ai/roostgpt/events');
  await expect(page).toHaveURL('https://app.roost.ai/roostgpt/events');
  console.log('Navigated to the Generations tab.');

  // Step 6: Validate the 'Generations' tab is active and relevant content is displayed
  await expect(generationsTab).toHaveClass(/active/);
  const generationsContent = page.locator('[data-testid="generations-content"]');
  await expect(generationsContent).toBeVisible();
  console.log('Verified Generations tab is active and content is displayed.');

  // Step 7: Refresh the page while on the 'Generations' tab and ensure the correct tab remains active
  await page.reload();
  await expect(page).toHaveURL('https://app.roost.ai/roostgpt/events');
  await expect(generationsTab).toHaveClass(/active/);
  console.log('Refreshed page and verified Generations tab remains active.');

  // Step 8: Return to the 'Test Plans' tab and verify its content is restored
  await testPlansTab.click();
  await page.waitForURL('https://app.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://app.roost.ai/roostgpt/tests');
  await expect(testPlansTab).toHaveClass(/active/);
  await expect(testPlansContent).toBeVisible();
  console.log('Returned to Test Plans tab and verified its content is restored.');

  // Step 9: Test tab navigation using keyboard shortcuts (if implemented)
  try {
    await page.keyboard.press('Control+Tab'); // Example shortcut
    await expect(page).toHaveURL('https://app.roost.ai/roostgpt/analyses');
    console.log('Verified keyboard shortcut navigation.');
  } catch (error) {
    console.log('Keyboard shortcut navigation not implemented or failed:', error);
  }

  // Step 10: Verify responsiveness and proper behavior of tab navigation on mobile devices
  await page.setViewportSize({ width: 375, height: 812 }); // iPhone X dimensions
  await page.goto('https://app.roost.ai/roostgpt/tests');
  const mobileTestPlansTab = page.locator('a[href="/roostgpt/tests"]');
  await expect(mobileTestPlansTab).toHaveClass(/active/);
  await expect(testPlansContent).toBeVisible();
  console.log('Verified tab navigation behavior on mobile devices.');
});