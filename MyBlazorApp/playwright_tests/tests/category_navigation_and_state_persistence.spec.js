const { test, expect } = require('@playwright/test');

test('Category Navigation and State Persistence', async ({ page }) => {
  // Step 1: Navigate to the main page
  await page.goto('https://docs.roost.ai/shelves/roost-admin-guide');

  // Step 2: Verify the visibility of the 'Category' link and assert its text content
  const categoryLink = page.locator("a[href='https://docs.roost.ai/search?term=%5BCategory%5D']");
  await expect(categoryLink).toBeVisible();
  await expect(categoryLink).toContainText('Category');

  // Step 3: Click on the 'Category' link
  await categoryLink.click();

  // Step 4: Verify that the page is redirected to the category page
  await page.waitForURL('https://docs.roost.ai/search?term=%5BCategory%5D');
  await expect(page).toHaveURL('https://docs.roost.ai/search?term=%5BCategory%5D');

  // Step 5: Assert the presence of the 'Admin Guide' link on the category page
  const adminGuideLink = page.locator("a[href='https://docs.roost.ai/search?term=%5BCategory%3DAdmin+Guide%5D']");
  await expect(adminGuideLink).toBeVisible();
  await expect(adminGuideLink).toContainText('Admin Guide');

  // Step 6: Click on the 'Admin Guide' link
  await adminGuideLink.click();

  // Step 7: Verify that the page is redirected to the 'Admin Guide' page
  await page.waitForURL('https://docs.roost.ai/search?term=%5BCategory%3DAdmin+Guide%5D');
  await expect(page).toHaveURL('https://docs.roost.ai/search?term=%5BCategory%3DAdmin+Guide%5D');

  // Step 8: Assert that the content of the 'Admin Guide' page is correctly displayed
  const adminGuideContent = page.locator('.content'); // Assume '.content' contains the main page content
  await expect(adminGuideContent).toBeVisible();
  await expect(adminGuideContent).toContainText('Admin Guide'); // Adjust based on specific page content

  // Step 9: Verify that the breadcrumb or navigation menu reflects the correct navigation path
  const breadcrumb = page.locator('.breadcrumb'); // Assume '.breadcrumb' is the breadcrumb container
  await expect(breadcrumb).toBeVisible();
  await expect(breadcrumb).toContainText('Category > Admin Guide');

  // Step 10: Refresh the 'Admin Guide' page and ensure that the content remains persistent
  await page.reload();
  await expect(adminGuideContent).toBeVisible();
  await expect(adminGuideContent).toContainText('Admin Guide'); // Content should persist after reload

  // Step 11: Navigate back to the main page and assert visibility of the previously clicked links
  await page.goto('https://docs.roost.ai/shelves/roost-admin-guide');
  await expect(categoryLink).toBeVisible();
  await expect(adminGuideLink).toBeVisible(); // Validate previously clicked links remain visible

  // Step 12: Validate that no additional state changes occurred unexpectedly
  // Example: Ensure no unexpected elements are visible
  const unexpectedElement = page.locator('.unexpected-element'); // Adjust selector based on scenario
  await expect(unexpectedElement).not.toBeVisible();

  // Final step: Log the completion of the test
  console.log('Category Navigation and State Persistence test completed successfully.');
});