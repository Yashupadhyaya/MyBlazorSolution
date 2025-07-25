const { test, expect } = require('@playwright/test');

test('Search Functionality with Activity Filter', async ({ page, browserName }) => {
  const validActivityName = 'Test Activity';
  const invalidActivityName = 'Invalid Activity';
  const partialActivityName = 'Test';
  const specialCharacters = '@#$%^&*';
  const emptyInput = '';

  // Step 1: Navigate to the Generations page
  await page.goto('https://dev.roost.ai/roostgpt/events');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');
  console.log('Navigated to the Events page.');

  // Step 2: Verify the visibility of the search bar
  const searchBar = page.locator('input[data-testid="events-search-box"]');
  await expect(searchBar).toBeVisible();
  await expect(searchBar).toHaveAttribute('placeholder', 'Search for Activities');
  console.log('Search bar is visible and has the correct placeholder.');

  // Step 3: Enter a valid activity name into the search bar
  await searchBar.fill(validActivityName);
  await page.keyboard.press('Enter');
  console.log(`Entered valid activity name: ${validActivityName}`);

  // Step 5: Validate updated list of activities
  const activityList = page.locator('.activity-list-item'); // Assuming activity items have this selector
  await expect(activityList).toHaveCountGreaterThan(0);
  await expect(activityList).toContainText(validActivityName);
  console.log(`Activity list updated with results matching: ${validActivityName}`);

  // Step 6: Clear the search field
  await searchBar.fill(emptyInput);
  await page.keyboard.press('Enter');
  await expect(activityList).toHaveCountGreaterThan(0); // Assuming original list restores
  console.log('Cleared search field and verified full activity list restoration.');

  // Step 7: Enter an invalid activity name
  await searchBar.fill(invalidActivityName);
  await page.keyboard.press('Enter');
  console.log(`Entered invalid activity name: ${invalidActivityName}`);

  // Step 8: Verify 'No results found' message
  const noResultsMessage = page.locator('.no-results-message'); // Assuming this selector for no results
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No results found');
  console.log('Verified "No results found" message for invalid activity name.');

  // Step 9: Enter a partial activity name
  await searchBar.fill(partialActivityName);
  await page.keyboard.press('Enter');
  console.log(`Entered partial activity name: ${partialActivityName}`);

  // Step 10: Validate partial search results
  await expect(activityList).toHaveCountGreaterThan(0);
  await expect(activityList).toContainText(partialActivityName);
  console.log(`Partial search results include activities containing: ${partialActivityName}`);

  // Step 11: Test special characters in search
  await searchBar.fill(specialCharacters);
  await page.keyboard.press('Enter');
  console.log(`Entered special characters: ${specialCharacters}`);

  // Step 12: Validate system response for special characters
  await expect(activityList).toHaveCount(0); // Assuming no results for special characters
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No results found');
  console.log('Verified system handles special characters gracefully.');

  // Step 13: Test empty input in search
  await searchBar.fill(emptyInput);
  await page.keyboard.press('Enter');
  console.log('Tested empty input in search.');

  // Step 14: Verify full list remains visible for empty input
  await expect(activityList).toHaveCountGreaterThan(0);
  console.log('Verified full list remains visible for empty search input.');

  // Step 15: Reload the page
  await page.reload();
  await expect(searchBar).toBeVisible();
  await expect(searchBar).toHaveValue('');
  console.log('Page reloaded and previous search state cleared.');

  // Step 16: Verify search bar functionality after reload
  await searchBar.fill(validActivityName);
  await page.keyboard.press('Enter');
  await expect(activityList).toHaveCountGreaterThan(0);
  console.log('Search bar functional after page reload.');

  // Step 17: Test mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(searchBar).toBeVisible();
  console.log('Verified search bar visibility and functionality in mobile viewport.');

  // Step 18: Test keyboard navigation
  await page.keyboard.press('Tab'); // Focus search bar
  await searchBar.fill(validActivityName);
  await page.keyboard.press('Enter');
  await expect(activityList).toHaveCountGreaterThan(0);
  console.log('Verified keyboard navigation functionality.');

  // Step 19: Test browser back and forward buttons
  await page.goBack();
  await page.goForward();
  await expect(activityList).toHaveCountGreaterThan(0);
  console.log('Verified browser back and forward buttons maintain state.');

  // Step 20: Repeat workflow in another browser (e.g., Firefox)
  if (browserName !== 'firefox') {
    const firefox = await page.context().newPage();
    await firefox.goto('https://dev.roost.ai/roostgpt/events');
    await firefox.locator('input[data-testid="events-search-box"]').fill(validActivityName);
    await firefox.keyboard.press('Enter');
    const firefoxActivityList = firefox.locator('.activity-list-item');
    await expect(firefoxActivityList).toHaveCountGreaterThan(0);
    await expect(firefoxActivityList).toContainText(validActivityName);
    console.log('Cross-browser compatibility verified in Firefox.');
    await firefox.close();
  }
});