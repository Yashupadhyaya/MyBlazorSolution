const { test, expect } = require('@playwright/test');

test('Navigation Between Tabs (Test Plans, Analysis, Generations)', async ({ page }) => {
  // Step 1: Navigate to the 'Test Plans' tab
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  
  // Step 2: Verify the 'Test Plans' tab is highlighted as active
  const testPlansTab = page.locator("a[href='/roostgpt/tests']");
  await expect(testPlansTab).toHaveClass(/active/);

  // Step 3: Click the 'Analysis' tab in the header navigation
  const analysisTab = page.locator("a[href='/roostgpt/analyses']");
  await analysisTab.click();

  // Step 4: Verify the browser navigates to the 'Analysis' page
  await page.waitForURL('https://dev.roost.ai/roostgpt/analyses');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/analyses');

  // Step 5: Verify the 'Analysis' tab is highlighted as active
  await expect(analysisTab).toHaveClass(/active/);

  // Step 6: Navigate back to the 'Test Plans' tab
  await testPlansTab.click();

  // Step 7: Verify the browser navigates back to the 'Test Plans' page
  await page.waitForURL('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');

  // Step 8: Click the 'Generations' tab
  const generationsTab = page.locator("a[href='/roostgpt/events']");
  await generationsTab.click();

  // Step 9: Verify the browser navigates to the 'Generations' page
  await page.waitForURL('https://dev.roost.ai/roostgpt/events');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');

  // Step 10: Verify the 'Generations' tab is highlighted as active
  await expect(generationsTab).toHaveClass(/active/);

  // Step 11: Use the browser back button to navigate back to the 'Test Plans' tab
  await page.goBack();
  await page.waitForURL('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');

  // Step 12: Verify state persistence by checking the active tab and previously loaded content
  await expect(testPlansTab).toHaveClass(/active/);

  // Step 13: Perform a search in the 'Test Plans' tab
  const searchInput = page.locator('input[type="search"]');
  await searchInput.fill('Test search query');
  await searchInput.press('Enter');
  await page.waitForTimeout(1000); // Simulate search result loading

  // Step 14: Navigate to the 'Analysis' tab
  await analysisTab.click();
  await page.waitForURL('https://dev.roost.ai/roostgpt/analyses');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/analyses');

  // Step 15: Return to the 'Test Plans' tab and verify the search query persists
  await testPlansTab.click();
  await page.waitForURL('https://dev.roost.ai/roostgpt/tests');
  const persistedSearchInput = page.locator('input[type="search"]');
  await expect(persistedSearchInput).toHaveValue('Test search query');

  // Step 16: Repeat the navigation steps in rapid succession to test performance
  const tabs = [testPlansTab, analysisTab, generationsTab];
  for (let i = 0; i < 5; i++) {
    for (const tab of tabs) {
      await tab.click();
      await page.waitForTimeout(500); // Simulate rapid navigation
    }
  }

  console.log('Navigation test completed successfully.');
});