const { test, expect } = require('@playwright/test');

test('Test RoostGPT Configuration Workflow with OpenAI API Token', async ({ page, context }) => {
  // Step 1: Navigate to the page
  await page.goto('https://dev.roost.ai/gptCLIForm');
  await expect(page).toHaveURL('https://dev.roost.ai/gptCLIForm');

  // Step 2: Verify page title and visibility of the 'RoostGPT Config' link
  await expect(page.locator('text=RoostGPT Config')).toBeVisible();

  // Step 3: Fill in the Configuration Name
  await page.locator("input[placeholder='roostGpt_test']").fill('MyTestConfig');

  // Step 4: Fill in the OpenAI API Endpoint URL
  await page.locator("input[placeholder='https://api.openai.com/v1/']").fill('https://api.openai.com/v1/my-endpoint');

  // Step 5: Fill in the Access Token
  await page.locator("input[placeholder='Enter the Access Token']").fill('secure-token-123');

  // Step 6: Toggle password visibility
  const passwordInput = page.locator("input[placeholder='Enter the Access Token']");
  const toggleButton = page.locator("button[data-testid='openai-token-unMask-icon']");
  await toggleButton.click();
  await expect(passwordInput).toHaveAttribute('type', 'text');
  await toggleButton.click();
  await expect(passwordInput).toHaveAttribute('type', 'password');

  // Step 7: Verify the OpenAI API keys link
  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    page.locator("a[href='https://platform.openai.com/account/api-keys']").click()
  ]);
  await newTab.waitForLoadState();
  await expect(newTab).toHaveURL('https://platform.openai.com/account/api-keys');
  await newTab.close();

  // Step 8: Submit the form and verify success
  await page.locator("button[type='submit']").click();
  await expect(page.locator('text=Configuration saved successfully')).toBeVisible();

  // Step 9: Reload the page and verify data persistence
  await page.reload();
  await expect(page.locator("input[placeholder='roostGpt_test']")).toHaveValue('MyTestConfig');
  await expect(page.locator("input[placeholder='https://api.openai.com/v1/']")).toHaveValue('https://api.openai.com/v1/my-endpoint');
  await expect(page.locator("input[placeholder='Enter the Access Token']")).toHaveValue('secure-token-123');

  // Step 10: Navigate away and return to verify data persistence
  await page.goto('https://dev.roost.ai');
  await page.goto('https://dev.roost.ai/gptCLIForm');
  await expect(page.locator("input[placeholder='roostGpt_test']")).toHaveValue('MyTestConfig');

  // Step 11: Verify default radio button selection
  const cloudRadioButton = page.locator("input[data-testid='cloud-git-type-radio-button-selected']");
  await expect(cloudRadioButton).toBeChecked();

  // Step 12: Switch between radio buttons
  const serverRadioButton = page.locator("input[data-testid='server-git-type-radio-button']");
  await serverRadioButton.click();
  await expect(serverRadioButton).toBeChecked();
  await cloudRadioButton.click();
  await expect(cloudRadioButton).toBeChecked();

  // Step 13: Toggle the 'Traverse to all sub-directories' checkbox
  const traverseCheckbox = page.locator("label:has-text('Traverse to all sub-directories')");
  await traverseCheckbox.click();
  await expect(page.locator("label:has-text('Traverse to all sub-directories') input")).toBeChecked();

  // Step 14: Toggle the 'Check for Vulnerability' checkbox
  const vulnerabilityCheckbox = page.locator("label:has-text('Check for Vulnerability')");
  await vulnerabilityCheckbox.click();
  await expect(page.locator("label:has-text('Check for Vulnerability') input")).toBeChecked();

  // Step 15: Enter invalid data in the OpenAI token field and verify error message
  await page.locator("input[placeholder='Enter the Access Token']").fill('invalid-token');
  await page.locator("button[type='submit']").click();
  await expect(page.locator('text=Invalid OpenAI token')).toBeVisible();

  // Step 16: Test keyboard navigation
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab'); // Ensure focus moves to the next element
  await expect(page.locator('input:focus')).toBeVisible();

  // Step 17: Simulate a network failure during form submission
  await page.route('**/api/configure-gpt', route => route.abort());
  await page.locator("button[type='submit']").click();
  await expect(page.locator('text=Network error, please try again')).toBeVisible();
  await page.unroute('**/api/configure-gpt');

  // Step 18: Test form reset functionality
  await page.locator("button:has-text('Reset')").click();
  await expect(page.locator("input[placeholder='roostGpt_test']")).toHaveValue('');
  await expect(page.locator("input[placeholder='https://api.openai.com/v1/']")).toHaveValue('');
  await expect(page.locator("input[placeholder='Enter the Access Token']")).toHaveValue('');

  // Step 19: Verify footer links
  const footerLinks = [
    { selector: "a:has-text('About Roost')", url: 'https://dev.roost.ai/about' },
    { selector: "a:has-text('Privacy Policy')", url: 'https://dev.roost.ai/privacy' },
    { selector: "a:has-text('Documentation')", url: 'https://dev.roost.ai/documentation' }
  ];
  for (const link of footerLinks) {
    const [footerTab] = await Promise.all([
      context.waitForEvent('page'),
      page.locator(link.selector).click()
    ]);
    await footerTab.waitForLoadState();
    await expect(footerTab).toHaveURL(link.url);
    await footerTab.close();
  }
});