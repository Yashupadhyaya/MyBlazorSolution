const { test, expect } = require('@playwright/test');

test('Verify Navigation Links Functionality Across the Header', async ({ page }) => {
  // Set the base URL for navigation
  const baseURL = 'https://dev.roost.ai';

  // Step 1: Navigate to the Test Plans page
  await page.goto(`${baseURL}/roostgpt/tests`);
  await expect(page).toHaveURL(`${baseURL}/roostgpt/tests`);
  console.log('Navigated to Test Plans page.');

  // Step 2: Verify the presence and visibility of navigation links in the header
  const headerLinks = [
    { name: 'RoostGPT', selector: 'a[data-testid="roostGPT-tab"]', expectedURL: `${baseURL}/roostgpt` },
    { name: 'Admin', selector: 'a[data-testid="admin-tab"]', expectedURL: `${baseURL}/admin/app` },
    { name: 'Connectors', selector: 'a[data-testid="connectors-tab"]', expectedURL: `${baseURL}/connectors` }
  ];

  for (const link of headerLinks) {
    const locator = page.locator(link.selector);
    await expect(locator).toBeVisible();
    console.log(`Verified visibility of ${link.name} link.`);
  }

  // Step 3: Click on the 'RoostGPT' link and verify navigation
  await page.locator('a[data-testid="roostGPT-tab"]').click();
  await page.waitForURL(`${baseURL}/roostgpt`);
  await expect(page).toHaveURL(`${baseURL}/roostgpt`);
  console.log('Navigated to RoostGPT page.');

  // Verify page title
  const roostGPTTitle = await page.title();
  console.log(`RoostGPT page title: ${roostGPTTitle}`);
  expect(roostGPTTitle).toMatch(/RoostGPT/i);

  // Step 5: Click on the 'Admin' link and verify navigation
  await page.goto(`${baseURL}/roostgpt/tests`); // Return to the Tests page first
  await page.locator('a[data-testid="admin-tab"]').click();
  await page.waitForURL(`${baseURL}/admin/app`);
  await expect(page).toHaveURL(`${baseURL}/admin/app`);
  console.log('Navigated to Admin page.');

  // Verify Admin page title and content
  const adminPageTitle = await page.title();
  expect(adminPageTitle).toMatch(/Admin/i);
  const adminContent = page.locator('.admin-content'); // Assuming a class exists for admin-specific content
  await expect(adminContent).toBeVisible();
  console.log('Verified Admin page content.');

  // Step 7: Click on the 'Connectors' link and verify navigation
  await page.goto(`${baseURL}/roostgpt/tests`); // Return to the Tests page first
  await page.locator('a[data-testid="connectors-tab"]').click();
  await page.waitForURL(`${baseURL}/connectors`);
  await expect(page).toHaveURL(`${baseURL}/connectors`);
  console.log('Navigated to Connectors page.');

  // Verify Connectors page content
  const connectorsContent = page.locator('.connectors-content'); // Assuming a class exists for connectors-specific content
  await expect(connectorsContent).toBeVisible();
  console.log('Verified Connectors page content.');

  // Step 9: Return to the Test Plans page and confirm the state
  await page.goto(`${baseURL}/roostgpt/tests`);
  await expect(page).toHaveURL(`${baseURL}/roostgpt/tests`);
  console.log('Returned to Test Plans page.');

  // Step 10: Test each link on a mobile viewport
  await page.setViewportSize({ width: 375, height: 812 }); // Simulate mobile viewport
  console.log('Switched to mobile viewport.');

  for (const link of headerLinks) {
    const locator = page.locator(link.selector);
    await expect(locator).toBeVisible();
    await locator.click();
    await page.waitForURL(link.expectedURL);
    await expect(page).toHaveURL(link.expectedURL);
    console.log(`Verified ${link.name} link functionality on mobile.`);
    await page.goto(`${baseURL}/roostgpt/tests`); // Return to the Tests page after each navigation
  }
});