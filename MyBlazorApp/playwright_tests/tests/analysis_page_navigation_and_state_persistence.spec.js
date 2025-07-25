const { test, expect } = require('@playwright/test');

test('Analysis Page Navigation and State Persistence', async ({ page }) => {
  // Step 1: Navigate to the Analysis page
  await page.goto('https://dev.roost.ai/roostgpt/analyses');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/analyses');
  
  // Step 2: Verify the presence and visibility of the 'Analysis' tab link
  const analysisTab = page.locator('a[href="/roostgpt/analyses"]');
  await expect(analysisTab).toBeVisible();
  
  // Step 3: Click on the 'Analysis' tab link and verify URL
  await analysisTab.click();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/analyses');
  
  // Step 4: Verify visibility of the search input box
  const searchInput = page.locator('input[data-testid="events-search-box"]');
  await expect(searchInput).toBeVisible();
  
  // Step 5: Type the search query into the search box
  await searchInput.fill('Test Plan A');
  
  // Step 6: Verify search results dynamically update
  const searchResults = page.locator('.search-results'); // Adjust selector based on actual implementation
  await expect(searchResults).toContainText('Test Plan A');
  
  // Step 7: Clear the search input field and verify full list restoration
  await searchInput.fill('');
  await expect(searchResults).not.toContainText('Test Plan A'); // Add assertion for full list restoration
  
  // Step 8: Refresh the page and verify search state reset
  await page.reload();
  await expect(searchInput).toHaveValue('');
  
  // Step 9: Verify Analysis tab remains active after reload
  const activeTab = page.locator('a[href="/roostgpt/analyses"].active'); // Adjust selector if needed
  await expect(activeTab).toBeVisible();
  
  // Step 10: Navigate to the 'Test Plans' page
  const testPlansTab = page.locator('a[href="/roostgpt/tests"]');
  await testPlansTab.click();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  
  // Step 11: Return to the 'Analysis' page
  await analysisTab.click();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/analyses');
  
  // Step 12: Verify search term does not persist across navigation
  await expect(searchInput).toHaveValue('');
  
  // Step 13: Test browser back functionality
  await page.goBack();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  await page.goForward();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/analyses');
  
  // Step 14: Verify responsiveness of the page on viewport resize
  await page.setViewportSize({ width: 1200, height: 800 }); // Desktop view
  await expect(page).toBeVisible();
  
  await page.setViewportSize({ width: 768, height: 1024 }); // Tablet view
  await expect(page).toBeVisible();
  
  await page.setViewportSize({ width: 375, height: 667 }); // Mobile view
  await expect(page).toBeVisible();
  
  // Step 15: Assert no broken or inaccessible elements on the page
  const allLinks = page.locator('a');
  const allLinksCount = await allLinks.count();
  for (let i = 0; i < allLinksCount; i++) {
    const link = allLinks.nth(i);
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href).not.toBeNull();
  }
});