const { test, expect } = require('@playwright/test');

test('Navigation Between Tabs', async ({ page }) => {
  // Step 1: Navigate to the Test Plans page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');

  // Step 2: Verify the visibility of 'Test Plans' tab
  const testPlansTab = page.locator("[href='/roostgpt/tests']");
  await expect(testPlansTab).toBeVisible();

  // Step 3: Click on the 'Analysis' tab
  const analysisTab = page.locator("[href='/roostgpt/analyses']");
  await analysisTab.click();

  // Step 4: Verify that the URL changes to Analysis page
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/analyses');

  // Step 5: Verify the content of the page displays analysis-related data
  const analysisContent = page.locator('main'); // Adjust selector to match analysis page content
  await expect(analysisContent).toContainText('Analysis'); // Replace 'Analysis' with actual content verification

  // Step 6: Click on the 'Generations' tab
  const generationsTab = page.locator("[href='/roostgpt/events']");
  await generationsTab.click();

  // Step 7: Verify that the URL changes to Generations page
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');

  // Step 8: Verify the content of the page updates to show generation-related data
  const generationsContent = page.locator('main'); // Adjust selector to match generations page content
  await expect(generationsContent).toContainText('Generations'); // Replace 'Generations' with actual content verification

  // Step 9: Navigate back to the 'Test Plans' tab
  await testPlansTab.click();

  // Step 10: Verify that the state of the 'Test Plans' page is preserved
  const testPlansContent = page.locator('main'); // Adjust selector to match Test Plans page content
  await expect(testPlansContent).toContainText('Test Plans'); // Replace 'Test Plans' with actual content verification

  // Step 11: Test tab navigation with keyboard shortcuts (e.g., Tab key)
  await page.keyboard.press('Tab');
  await expect(analysisTab).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(generationsTab).toBeFocused();

  await page.keyboard.press('Shift+Tab');
  await expect(analysisTab).toBeFocused();

  // Step 12: Perform navigation in multiple browser tabs simultaneously
  const context = await page.context();
  const newPage = await context.newPage();
  await newPage.goto('https://dev.roost.ai/roostgpt/analyses');
  await expect(newPage).toHaveURL('https://dev.roost.ai/roostgpt/analyses');
  await newPage.close();

  // Step 13: Perform navigation while simulating slow network conditions
  await page.route('**/*', route => route.continue({ delay: 3000 })); // Simulate slow network
  await testPlansTab.click();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');

  // Step 14: Test navigation across different screen resolutions for responsiveness
  const screenSizes = [
    { width: 1920, height: 1080 }, // Desktop
    { width: 1280, height: 720 }, // Laptop
    { width: 375, height: 812 },  // Mobile
  ];
  for (const size of screenSizes) {
    await page.setViewportSize(size);
    console.log(`Testing at resolution: ${size.width}x${size.height}`);
    await expect(testPlansTab).toBeVisible();
    await expect(analysisTab).toBeVisible();
    await expect(generationsTab).toBeVisible();
  }

  // Step 15: Verify accessibility standards for tab navigation
  await expect(testPlansTab).toHaveAttribute('role', 'tab');
  await expect(analysisTab).toHaveAttribute('role', 'tab');
  await expect(generationsTab).toHaveAttribute('role', 'tab');
  await expect(testPlansTab).toHaveAttribute('aria-selected', 'true'); // Adjust based on tab selection state
});