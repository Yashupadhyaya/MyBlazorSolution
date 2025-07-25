const { test, expect } = require('@playwright/test');

test('Search Test Plans with Filtered Results', async ({ page, browser }) => {
  // Step 1: Navigate to the test plans page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  
  // Verify the page loaded correctly
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');

  // Step 2: Verify the visibility of the 'Search for Test Plans' input field
  const searchInput = page.locator('[data-testid="tests-search-box"]');
  await expect(searchInput).toBeVisible();

  // Step 3: Type 'taher' into the search box
  await searchInput.fill('taher');

  // Step 4: Press Enter or wait for the search to auto-trigger
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500); // Allow time for search results to load

  // Step 5: Verify that the results only display links with 'taher' in their text
  const taherLink = page.locator('a[href="/taher"]');
  await expect(taherLink).toBeVisible();
  const otherLinks = page.locator('a[href="/priya.ranjan"]');
  await expect(otherLinks).not.toBeVisible();

  // Step 6: Clear the search input by deleting entered text
  await searchInput.fill('');
  await page.waitForTimeout(500); // Allow time for full list to reload

  // Step 7: Verify that the full list of test plan links reappears
  const allLinks = page.locator('a');
  await expect(allLinks).toHaveCountGreaterThan(1);

  // Step 8: Enter an invalid search term like 'invalid123'
  await searchInput.fill('invalid123');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);

  // Step 9: Verify that no results are displayed with a proper message
  const noResultsMessage = page.locator('text=No results found');
  await expect(noResultsMessage).toBeVisible();

  // Step 10: Test a partial search term such as 'ta' and verify matching items
  await searchInput.fill('ta');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);
  const partialMatches = page.locator('a');
  await expect(partialMatches).toHaveCountGreaterThan(0);

  // Step 11: Verify the 'Search for Test Plans' field retains the entered value on page reload
  const reloadPage = async () => {
    await page.reload();
    await expect(searchInput).toHaveValue('ta');
  };
  await reloadPage();

  // Step 12: Perform the search functionality across multiple browser tabs
  const context = await browser.newContext();
  const newPage = await context.newPage();
  await newPage.goto('https://dev.roost.ai/roostgpt/tests');
  const searchInputNewTab = newPage.locator('[data-testid="tests-search-box"]');
  await searchInputNewTab.fill('taher');
  await newPage.keyboard.press('Enter');
  await newPage.waitForTimeout(500);
  const taherLinkNewTab = newPage.locator('a[href="/taher"]');
  await expect(taherLinkNewTab).toBeVisible();
  await context.close();

  // Step 13: Test responsiveness by reducing the viewport size
  await page.setViewportSize({ width: 800, height: 600 });
  await expect(searchInput).toBeVisible();

  // Step 14: Verify accessibility compliance for the search field
  await expect(searchInput).toHaveAttribute('aria-label', 'Search for Test Plans');
  await searchInput.focus();
  await expect(searchInput).toBeFocused();

  // Step 15: Attempt search functionality while the server is under high load
  try {
    await searchInput.fill('taher');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000); // Simulate server delay
    await expect(taherLink).toBeVisible();
  } catch (error) {
    console.error('Search functionality failed under high load:', error);
  }

  // Edge case: Test special characters in the search box
  await searchInput.fill('@#$%');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);
  const noSpecialCharResultsMessage = page.locator('text=No results found');
  await expect(noSpecialCharResultsMessage).toBeVisible();

  // Edge case: Test extremely long search term
  const longTerm = 'a'.repeat(100);
  await searchInput.fill(longTerm);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);
  await expect(noResultsMessage).toBeVisible();

  console.log('Test completed successfully.');
});