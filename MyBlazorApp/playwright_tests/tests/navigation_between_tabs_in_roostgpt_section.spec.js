const { test, expect } = require('@playwright/test');

test('Navigation Between Tabs in RoostGPT Section', async ({ page }) => {
  // Step 1: Navigate to https://dev.roost.ai/roostgpt/tests
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  console.log('Navigated to the Test Plans tab.');

  // Step 2: Verify the visibility and accessibility of the 'Test Plans' tab
  const testPlansTab = page.locator("[href='/roostgpt/tests']");
  await expect(testPlansTab).toBeVisible();
  await expect(testPlansTab).toBeEnabled();
  console.log('Test Plans tab is visible and accessible.');

  // Step 3: Click on the 'Analysis' tab
  const analysisTab = page.locator("[href='/roostgpt/analyses']");
  await analysisTab.click();
  console.log('Clicked on the Analysis tab.');

  // Step 4: Verify that the page URL updates to https://dev.roost.ai/roostgpt/analyses
  await page.waitForURL('https://dev.roost.ai/roostgpt/analyses');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/analyses');
  console.log('URL updated to Analysis tab.');

  // Step 5: Check that the 'Analysis' section is displayed on the page
  const analysisSection = page.locator('section:has-text("Analysis")');
  await expect(analysisSection).toBeVisible();
  console.log('Analysis section is displayed on the page.');

  // Step 6: Click on the 'Generations' tab
  const generationsTab = page.locator("[href='/roostgpt/events']");
  await generationsTab.click();
  console.log('Clicked on the Generations tab.');

  // Step 7: Verify that the page URL updates to https://dev.roost.ai/roostgpt/events
  await page.waitForURL('https://dev.roost.ai/roostgpt/events');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');
  console.log('URL updated to Generations tab.');

  // Step 8: Check that the 'Generations' section is displayed on the page
  const generationsSection = page.locator('section:has-text("Generations")');
  await expect(generationsSection).toBeVisible();
  console.log('Generations section is displayed on the page.');

  // Step 9: Return to the 'Test Plans' tab and verify the URL and UI update correctly
  await testPlansTab.click();
  await page.waitForURL('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  const testPlansSection = page.locator('section:has-text("Test Plans")');
  await expect(testPlansSection).toBeVisible();
  console.log('Returned to Test Plans tab and verified UI.');

  // Step 10: Reload the page and verify that the active tab persists
  await page.reload();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  await expect(testPlansSection).toBeVisible();
  console.log('Reloaded page and verified active tab persists.');

  // Step 11: Navigate to the tabs using keyboard navigation and verify accessibility compliance
  await page.keyboard.press('Tab'); // Navigate forward to the first tab
  await expect(testPlansTab).toBeFocused();
  console.log('Test Plans tab is focused using keyboard navigation.');
  await page.keyboard.press('ArrowRight'); // Move to the next tab
  await expect(analysisTab).toBeFocused();
  console.log('Analysis tab is focused using keyboard navigation.');
  await page.keyboard.press('ArrowRight'); // Move to the next tab
  await expect(generationsTab).toBeFocused();
  console.log('Generations tab is focused using keyboard navigation.');

  // Step 12: Resize the browser window to simulate mobile responsiveness and verify tab functionality
  await page.setViewportSize({ width: 375, height: 667 }); // Simulate mobile viewport
  await expect(testPlansTab).toBeVisible(); // Check tabs are still visible
  await expect(analysisTab).toBeVisible();
  await expect(generationsTab).toBeVisible();
  console.log('Verified tab functionality under mobile viewport.');

  console.log('Test completed successfully.');
});