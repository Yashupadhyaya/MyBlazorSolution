const { test, expect } = require('@playwright/test');

// Test scenario: Validate Footer Navigation Links
test('Validate Footer Navigation Links', async ({ page }) => {
  // Step 1: Navigate to https://dev.roost.ai/admin/app
  await page.goto('https://dev.roost.ai/admin/app');
  await expect(page).toHaveURL('https://dev.roost.ai/admin/app');

  // Step 2: Scroll to the footer section of the page
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  console.log('Scrolled to footer section.');

  // Step 3: Click the 'About Roost' link
  const aboutRoostLink = page.locator('a.footer-item[href="https://roost.ai"]');
  await expect(aboutRoostLink).toBeVisible();
  await aboutRoostLink.click();
  console.log('Clicked "About Roost" link.');

  // Step 4: Verify that the page redirects to https://roost.ai
  await page.waitForURL('https://roost.ai');
  await expect(page).toHaveURL('https://roost.ai');
  console.log('Verified redirection to https://roost.ai.');

  // Step 5: Return to https://dev.roost.ai/admin/app
  await page.goto('https://dev.roost.ai/admin/app');
  await expect(page).toHaveURL('https://dev.roost.ai/admin/app');
  console.log('Returned to https://dev.roost.ai/admin/app.');

  // Step 6: Click the 'Privacy Policy' link
  const privacyPolicyLink = page.locator('a.footer-item[href="https://roost.ai/privacy-policy"]');
  await expect(privacyPolicyLink).toBeVisible();
  await privacyPolicyLink.click();
  console.log('Clicked "Privacy Policy" link.');

  // Step 7: Verify that the page redirects to https://roost.ai/privacy-policy
  await page.waitForURL('https://roost.ai/privacy-policy');
  await expect(page).toHaveURL('https://roost.ai/privacy-policy');
  console.log('Verified redirection to https://roost.ai/privacy-policy.');

  // Step 8: Return to https://dev.roost.ai/admin/app
  await page.goto('https://dev.roost.ai/admin/app');
  await expect(page).toHaveURL('https://dev.roost.ai/admin/app');
  console.log('Returned to https://dev.roost.ai/admin/app.');

  // Step 9: Click the 'Documentation' link
  const documentationLink = page.locator('a.footer-item[href="https://docs.roost.ai"]');
  await expect(documentationLink).toBeVisible();
  await documentationLink.click();
  console.log('Clicked "Documentation" link.');

  // Step 10: Verify that it redirects to https://docs.roost.ai
  await page.waitForURL('https://docs.roost.ai');
  await expect(page).toHaveURL('https://docs.roost.ai');
  console.log('Verified redirection to https://docs.roost.ai.');

  // Step 11: Return to https://dev.roost.ai/admin/app
  await page.goto('https://dev.roost.ai/admin/app');
  await expect(page).toHaveURL('https://dev.roost.ai/admin/app');
  console.log('Returned to https://dev.roost.ai/admin/app.');

  // Step 12: Click the 'API Reference' link
  const apiReferenceLink = page.locator('a.footer-item[href="/docs/api"]');
  await expect(apiReferenceLink).toBeVisible();
  await apiReferenceLink.click();
  console.log('Clicked "API Reference" link.');

  // Step 13: Verify that the page redirects to https://roost.ai/docs/api
  await page.waitForURL('https://roost.ai/docs/api');
  await expect(page).toHaveURL('https://roost.ai/docs/api');
  console.log('Verified redirection to https://roost.ai/docs/api.');

  // Final Step: Ensure all tests passed without errors
  console.log('All footer navigation links validated successfully.');
});