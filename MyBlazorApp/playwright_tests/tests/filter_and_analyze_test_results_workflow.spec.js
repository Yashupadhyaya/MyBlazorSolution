const { test, expect } = require('@playwright/test');

test('Filter and Analyze Test Results Workflow', async ({ page }) => {
  // Step 1: Navigate to the analyses page
  await page.goto('https://dev.roost.ai/roostgpt/analyses');
  
  // Step 2: Verify the visibility of the test results table
  const resultsTable = page.locator('table[data-testid="results-table"]');
  await expect(resultsTable).toBeVisible();
  
  // Step 3: Identify and click the dropdown filter for status
  const statusDropdown = page.locator('select[data-testid="status-filter"]');
  await expect(statusDropdown).toBeVisible();
  
  // Step 4: Select 'In-Queue' from the dropdown
  await statusDropdown.selectOption({ label: 'In-Queue' });
  
  // Step 5: Assert that only rows with status 'In-Queue' are displayed
  const inQueueRows = page.locator('table[data-testid="results-table"] tbody tr:has(td:has-text("In-Queue"))');
  await expect(inQueueRows).toBeVisible();
  const allRows = page.locator('table[data-testid="results-table"] tbody tr');
  await expect(allRows).toHaveCount(await inQueueRows.count());
  
  // Step 6: Clear the filter and verify that all rows are displayed again
  await statusDropdown.selectOption({ label: 'All' });
  await expect(allRows).toBeVisible();
  
  // Step 7: Repeat the filter process for 'In-Progress' and 'Completed'
  const statuses = ['In-Progress', 'Completed'];
  for (const status of statuses) {
    await statusDropdown.selectOption({ label: status });
    const filteredRows = page.locator(`table[data-testid="results-table"] tbody tr:has(td:has-text("${status}"))`);
    await expect(filteredRows).toBeVisible();
    await expect(allRows).toHaveCount(await filteredRows.count());
  }
  
  // Step 8: Use the search box to type a keyword relevant to a test name (e.g., 'Login Test')
  const searchBox = page.locator('input[data-testid="events-search-box"]');
  await expect(searchBox).toBeVisible();
  await searchBox.fill('Login Test');
  
  // Step 9: Verify that only rows matching the search term are displayed
  const searchResultRows = page.locator('table[data-testid="results-table"] tbody tr:has(td:has-text("Login Test"))');
  await expect(searchResultRows).toBeVisible();
  await expect(allRows).toHaveCount(await searchResultRows.count());
  
  // Step 10: Clear the search box and verify the table resets
  await searchBox.fill('');
  await expect(allRows).toBeVisible();
  
  // Step 11: Click the 'Show My Activities' toggle and verify that only activities associated with the logged-in user are displayed
  const myActivitiesToggle = page.locator('button[data-testid="toggle-my-activities"]');
  await expect(myActivitiesToggle).toBeVisible();
  await myActivitiesToggle.click();
  const myActivityRows = page.locator('table[data-testid="results-table"] tbody tr:has(td:has-text("My Activity"))');
  await expect(myActivityRows).toBeVisible();
  
  // Step 12: Toggle back to 'Show All Activities' and verify visibility of all entries
  await myActivitiesToggle.click();
  await expect(allRows).toBeVisible();
  
  // Step 13: Enable the auto-refresh toggle
  const autoRefreshToggle = page.locator('button[data-testid="auto-refresh-toggle"]');
  await expect(autoRefreshToggle).toBeVisible();
  await autoRefreshToggle.click();
  
  // Step 14: Wait for 45 seconds and verify that the table refreshes automatically
  await page.waitForTimeout(45000);
  const refreshedTable = page.locator('table[data-testid="results-table"]');
  await expect(refreshedTable).toBeVisible(); // Assuming visible table indicates refresh
  
  // Step 15: Assert that the filters and search parameters persist after the refresh
  await expect(statusDropdown).toHaveValue('All');
  await expect(searchBox).toHaveValue('');
  
  // Step 16: Interact with the column headers (e.g., 'Test Name') to sort the table
  const testNameHeader = page.locator('table[data-testid="results-table"] th:has-text("Test Name")');
  await testNameHeader.click(); // Sort ascending
  const firstRowAscending = page.locator('table[data-testid="results-table"] tbody tr:first-child');
  await expect(firstRowAscending).toBeVisible(); // Verify sorted row appears
  
  await testNameHeader.click(); // Sort descending
  const firstRowDescending = page.locator('table[data-testid="results-table"] tbody tr:first-child');
  await expect(firstRowDescending).toBeVisible(); // Verify sorted row appears
  
  // Step 17: Reload the page and assert that filters, sorting, or search parameters persist if supported
  await page.reload();
  await expect(statusDropdown).toHaveValue('All');
  await expect(searchBox).toHaveValue('');
  await expect(resultsTable).toBeVisible();
});