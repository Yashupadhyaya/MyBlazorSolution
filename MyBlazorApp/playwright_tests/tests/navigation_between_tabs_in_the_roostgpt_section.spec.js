const { test, expect } = require('@playwright/test');

test('Navigation Between Tabs in the RoostGPT Section', async ({ page }) => {
  // Navigate to the Test Plans tab
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  
  // Verify the page URL is correct
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  
  // Verify the 'Test Plans' tab is visible and active
  const testPlansTab = page.locator('a[href="/roostgpt/tests"]');
  await expect(testPlansTab).toBeVisible();
  await expect(testPlansTab).toHaveAttribute('aria-selected', 'true');

  // Click on the 'Analysis' tab
  const analysisTab = page.locator('a[href="/roostgpt/analyses"]');
  await analysisTab.click();

  // Verify the URL changes to the Analysis tab
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/analyses');
  
  // Verify the 'Analysis' tab is visible and active
  await expect(analysisTab).toBeVisible();
  await expect(analysisTab).toHaveAttribute('aria-selected', 'true');

  // Click on the 'Generations' tab
  const generationsTab = page.locator('a[href="/roostgpt/events"]');
  await generationsTab.click();

  // Verify the URL changes to the Generations tab
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');
  
  // Verify the 'Generations' tab is visible and active
  await expect(generationsTab).toBeVisible();
  await expect(generationsTab).toHaveAttribute('aria-selected', 'true');

  // Navigate back to the 'Test Plans' tab
  await testPlansTab.click();

  // Verify the URL changes back to the Test Plans tab
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  
  // Verify the 'Test Plans' tab is visible and active
  await expect(testPlansTab).toBeVisible();
  await expect(testPlansTab).toHaveAttribute('aria-selected', 'true');

  // Test navigation using browser back and forward buttons
  await page.goBack();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');
  await expect(generationsTab).toHaveAttribute('aria-selected', 'true');

  await page.goForward();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  await expect(testPlansTab).toHaveAttribute('aria-selected', 'true');

  // Test rapid switching between tabs
  for (let i = 0; i < 5; i++) {
    await analysisTab.click();
    await generationsTab.click();
    await testPlansTab.click();
  }

  // Verify performance during rapid tab switching
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  await expect(testPlansTab).toHaveAttribute('aria-selected', 'true');

  // Test tab navigation using keyboard shortcuts
  await page.keyboard.press('Tab'); // Focus on the first tab
  await page.keyboard.press('Enter'); // Select the tab
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  
  await page.keyboard.press('Tab'); // Focus on the second tab
  await page.keyboard.press('Enter'); // Select the tab
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/analyses');

  // Verify all tabs are accessible via keyboard navigation
  await expect(testPlansTab).toBeFocusable();
  await expect(analysisTab).toBeFocusable();
  await expect(generationsTab).toBeFocusable();

  // Simulate mobile view and test tab navigation
  await page.setViewportSize({ width: 375, height: 667 }); // Resize to mobile viewport
  await generationsTab.click();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');
  await expect(generationsTab).toHaveAttribute('aria-selected', 'true');

  // Verify content responsiveness on mobile
  const mobileContent = page.locator('div.content'); // Example selector for content area
  await expect(mobileContent).toBeVisible();
  await expect(mobileContent).toHaveCSS('font-size', '14px'); // Verify responsive font size
});