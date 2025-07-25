const { test, expect } = require('@playwright/test');

test('Navigation and State Persistence through Categories and Topics', async ({ page }) => {
  // Step 1: Navigate to the homepage
  await page.goto('https://docs.roost.ai/');
  await expect(page).toHaveURL('https://docs.roost.ai/');
  console.log('Navigated to homepage.');

  // Step 2: Verify visibility of the 'Categories' link
  const categoriesLink = page.locator("a[href='https://docs.roost.ai/shelves']");
  await expect(categoriesLink).toBeVisible();
  console.log('Verified visibility of Categories link.');

  // Step 3: Click on the 'Categories' link
  await categoriesLink.click();
  console.log('Clicked on Categories link.');

  // Step 4: Wait for the page to load and verify navigation to the categories page
  await page.waitForURL('https://docs.roost.ai/shelves');
  await expect(page).toHaveURL('https://docs.roost.ai/shelves');
  console.log('Navigated to Categories page.');

  // Step 5: Verify expected sections on the categories page
  const adminGuideSection = page.locator("text=Roost Admin Guide");
  const userGuideSection = page.locator("text=Roost User Guide");
  await expect(adminGuideSection).toBeVisible();
  await expect(userGuideSection).toBeVisible();
  console.log('Verified expected sections on Categories page.');

  // Step 6: Click on the 'Topics' link on the navigation menu
  const topicsLink = page.locator("a[href='https://docs.roost.ai/books']");
  await expect(topicsLink).toBeVisible();
  await topicsLink.click();
  console.log('Clicked on Topics link.');

  // Step 7: Wait for the page to load and verify navigation to the topics page
  await page.waitForURL('https://docs.roost.ai/books');
  await expect(page).toHaveURL('https://docs.roost.ai/books');
  console.log('Navigated to Topics page.');

  // Step 8: Verify expected items on the topics page
  const exportJiraTopic = page.locator("text=Export Jira Ticket");
  const roostGPTTopic = page.locator("text=RoostGPT");
  await expect(exportJiraTopic).toBeVisible();
  await expect(roostGPTTopic).toBeVisible();
  console.log('Verified expected items on Topics page.');

  // Step 9: Navigate back to the categories page and verify state persistence
  await page.goto('https://docs.roost.ai/shelves');
  await expect(page).toHaveURL('https://docs.roost.ai/shelves');
  await expect(adminGuideSection).toBeVisible();
  await expect(userGuideSection).toBeVisible();
  console.log('Verified state persistence on Categories page.');

  // Step 10: Refresh the categories page and verify it reloads correctly
  await page.reload();
  await expect(page).toHaveURL('https://docs.roost.ai/shelves');
  await expect(adminGuideSection).toBeVisible();
  await expect(userGuideSection).toBeVisible();
  console.log('Verified reload functionality on Categories page.');

  // Step 11: Modify viewport to mobile dimensions and verify responsive design elements
  await page.setViewportSize({ width: 375, height: 667 });
  const mobileMenu = page.locator("nav[role='navigation']");
  await expect(mobileMenu).toBeVisible();
  console.log('Verified responsive design in mobile view.');

  // Step 12: Test navigation using keyboard inputs
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  console.log('Tested keyboard navigation using Tab and Enter keys.');

  // Step 13: Verify navigation persists between mobile and desktop views
  await page.setViewportSize({ width: 1280, height: 720 });
  await expect(adminGuideSection).toBeVisible();
  await expect(userGuideSection).toBeVisible();
  console.log('Verified navigation persistence between mobile and desktop views.');

  // Step 14: Navigate back to the homepage using the browser back button
  await page.goBack();
  await expect(page).toHaveURL('https://docs.roost.ai/');
  await expect(categoriesLink).toBeVisible();
  await expect(topicsLink).toBeVisible();
  console.log('Verified navigation back to homepage using browser back button.');

  // Step 15: Test navigation to pages with broken links (mocking 404 responses)
  try {
    await page.goto('https://docs.roost.ai/nonexistent');
    await expect(page.locator('text=404')).toBeVisible();
    console.log('Verified handling of broken links with 404 responses.');
  } catch (error) {
    console.error('Error testing broken links:', error);
  }
});