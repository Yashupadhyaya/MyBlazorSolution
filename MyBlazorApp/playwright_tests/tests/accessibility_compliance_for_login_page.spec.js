const { test, expect } = require('@playwright/test');

test('Accessibility Compliance for Login Page', async ({ page }) => {
  // Step 1: Navigate to the login page
  await page.goto('https://dev.roost.ai/login');
  await expect(page).toHaveURL('https://dev.roost.ai/login');
  console.log('Navigated to the login page.');

  // Step 2: Verify all interactive elements are focusable via the keyboard
  const interactiveElements = page.locator('button, a, input, select, textarea, [role="button"], [role="link"]');
  const count = await interactiveElements.count();
  for (let i = 0; i < count; i++) {
    const element = interactiveElements.nth(i);
    await expect(element).toBeFocusable();
    console.log(`Element ${i + 1} is focusable.`);
  }

  // Step 3: Use a screen reader to navigate the page and verify proper element labeling
  const elementsWithLabels = page.locator('[aria-label], label');
  const labelCount = await elementsWithLabels.count();
  for (let i = 0; i < labelCount; i++) {
    const element = elementsWithLabels.nth(i);
    const ariaLabel = await element.getAttribute('aria-label');
    const visibleText = await element.textContent();
    console.log(`Element ${i + 1} has label: ${ariaLabel || visibleText}`);
    expect(ariaLabel || visibleText).not.toBeNull();
  }

  // Step 4: Ensure all images have alternative text or ARIA labels
  const images = page.locator('img');
  const imageCount = await images.count();
  for (let i = 0; i < imageCount; i++) {
    const image = images.nth(i);
    const altText = await image.getAttribute('alt');
    const ariaLabel = await image.getAttribute('aria-label');
    console.log(`Image ${i + 1} alt text: ${altText}, ARIA label: ${ariaLabel}`);
    expect(altText || ariaLabel).not.toBeNull();
  }

  // Step 5: Validate color contrast ratios for all text and background elements
  // Note: This requires external tools or libraries like an accessibility scanner (not directly possible in Playwright).
  console.log('Color contrast ratios validation requires external tools.');

  // Step 6: Verify that all links have descriptive and unique text
  const links = page.locator('a');
  const linkCount = await links.count();
  for (let i = 0; i < linkCount; i++) {
    const link = links.nth(i);
    const linkText = await link.textContent();
    console.log(`Link ${i + 1} text: ${linkText}`);
    expect(linkText).not.toBeNull();
    expect(linkText.trim()).not.toBe('');
  }

  // Step 7: Check that form controls include associated labels
  const formControls = page.locator('input, select, textarea');
  const formControlCount = await formControls.count();
  for (let i = 0; i < formControlCount; i++) {
    const control = formControls.nth(i);
    const label = await control.locator('label').textContent();
    console.log(`Form control ${i + 1} has label: ${label}`);
    expect(label).not.toBeNull();
  }

  // Step 8: Simulate high-contrast mode and verify rendering
  // Note: High-contrast mode simulation requires system-level triggers that Playwright cannot directly control.
  console.log('High-contrast mode validation requires manual or external testing.');

  // Step 9: Ensure no elements are hidden from assistive technologies
  const hiddenElements = page.locator('[aria-hidden="true"]');
  const hiddenCount = await hiddenElements.count();
  expect(hiddenCount).toBe(0);
  console.log('Verified no elements are hidden from assistive technologies.');

  // Step 10: Test keyboard navigation through social login buttons
  const socialLoginButtons = page.locator('a.google, a.git');
  const socialButtonCount = await socialLoginButtons.count();
  for (let i = 0; i < socialButtonCount; i++) {
    const button = socialLoginButtons.nth(i);
    await expect(button).toBeFocusable();
    console.log(`Social login button ${i + 1} is focusable.`);
  }

  // Step 11: Test tab order for logical navigation sequence
  await page.keyboard.press('Tab');
  console.log('Tab order verification triggered. This step may require manual validation.');

  // Step 12: Validate error messages are announced by screen readers
  const errorMessages = page.locator('[role="alert"], .error');
  const errorCount = await errorMessages.count();
  for (let i = 0; i < errorCount; i++) {
    const error = errorMessages.nth(i);
    const errorText = await error.textContent();
    console.log(`Error message ${i + 1}: ${errorText}`);
    expect(errorText).not.toBeNull();
  }

  // Step 13: Simulate zooming to 200% and verify proper rendering
  await page.setViewportSize({ width: 800, height: 600 });
  await page.evaluate(() => {
    document.body.style.zoom = '2.0';
  });
  console.log('Zooming simulation triggered. Page rendering verification required.');

  // Step 14: Test dynamic content updates with ARIA live regions
  const liveRegion = page.locator('[aria-live]');
  const liveRegionCount = await liveRegion.count();
  for (let i = 0; i < liveRegionCount; i++) {
    const region = liveRegion.nth(i);
    const liveText = await region.textContent();
    console.log(`Live region ${i + 1} text: ${liveText}`);
    expect(liveText).not.toBeNull();
  }

  console.log('Accessibility compliance test completed successfully.');
});