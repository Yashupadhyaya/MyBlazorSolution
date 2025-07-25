# Generated Playwright Tests Summary

## Accessibility Compliance for Analysis Page
**Description:** Validates that all interactive elements on the Analysis page comply with WCAG accessibility standards and are operable via assistive technologies.
**Priority**: high | **Complexity**: high
**Tags**: complex-scenario, accessibility, responsive, auto-generated, keyboard-navigation, ui-test, performance
**Type:** accessibility
**Pages Involved:**- https://dev.roost.ai/roostgpt/analyses
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/analyses.
2. 2. Verify that all dropdowns have ARIA roles correctly set (e.g., role='combobox').
3. 3. Assert that all interactive buttons are navigable using the Tab key.
4. 4. Use a screen reader to read the labels for the search box and filters.
5. 5. Verify that text contents are readable and contrast ratios meet WCAG AA standards.
6. 6. Test all toggles for keyboard operability (e.g., pressing Enter or Space).
7. 7. Assert that error states for invalid inputs (e.g., empty search) are announced by screen readers.
8. 8. Check that the table is navigable using keyboard navigation.
9. 9. Verify that sortable columns have proper ARIA attributes (e.g., aria-sort).
10. 10. Test responsiveness by resizing the window to a mobile viewport.
11. 11. Verify that all UI elements are accessible on a mobile screen using gesture-based navigation.

#### Key Selectors:
- **Type**: dropdown, **Text**: 'Status Filter', **Selector**: `select[data-testid='status-filter']`, **Action**: assert_aria_role (Page: https://dev.roost.ai/roostgpt/analyses)- **Type**: input, **Text**: 'Search Box', **Selector**: `input[data-testid='events-search-box']`, **Action**: assert_keyboard_navigation (Page: https://dev.roost.ai/roostgpt/analyses)- **Type**: table, **Text**: 'Results Table', **Selector**: `table[data-testid='results-table']`, **Action**: assert_keyboard_navigation (Page: https://dev.roost.ai/roostgpt/analyses)
#### Expected Results:
- Screen reader announces all labels accurately.
- Keyboard navigation works for all interactive elements.
- Contrast ratios meet WCAG AA standards.
- Error states are announced by screen readers.
- Mobile responsiveness retains all accessibility features.

#### Edge Cases:
- No ARIA roles set for dropdowns.
- Contrast ratios fail under low-light settings.
- Search box inaccessible via keyboard navigation.
- Sortable columns missing accessibility attributes.
- Auto-refresh interrupts screen reader announcements.

#### Data Requirements:
- Accessible labels for all interactive elements.
- Valid ARIA roles for dropdowns and table headers.
- Color scheme meeting WCAG contrast requirements.
**Test File:** [accessibility_compliance_for_analysis_page.spec.js](./accessibility_compliance_for_analysis_page.spec.js)
---

## Navigation Between Tabs in the RoostGPT Section
**Description:** This scenario tests the navigation between various tabs (Test Plans, Analysis, Generations) within the RoostGPT section. It ensures that each tab is accessible, functional, and displays the correct content.
**Priority**: high | **Complexity**: high
**Tags**: complex-scenario, network-resilience, accessibility, auto-generated, api-integration, keyboard-navigation, ui-test, performance, navigation
**Type:** navigation
**Pages Involved:**- https://dev.roost.ai/roostgpt/tests- https://dev.roost.ai/roostgpt/analyses- https://dev.roost.ai/roostgpt/events
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/tests.
2. 2. Verify the visibility of the 'Test Plans' tab, which should be active.
3. 3. Click on the 'Analysis' tab.
4. 4. Verify that the URL changes to https://dev.roost.ai/roostgpt/analyses and the content updates appropriately.
5. 5. Click on the 'Generations' tab.
6. 6. Verify that the URL changes to https://dev.roost.ai/roostgpt/events and the content updates appropriately.
7. 7. Click back on the 'Test Plans' tab.
8. 8. Verify that the URL changes back to https://dev.roost.ai/roostgpt/tests and previously loaded data persists.
9. 9. Test navigation using browser forward and back buttons.
10. 10. Verify that the appropriate tab is highlighted after navigation via browser controls.
11. 11. Test rapid switching between tabs to ensure no performance degradation.
12. 12. Test tab navigation using keyboard shortcuts (e.g., Tab key and Enter).
13. 13. Verify that all tabs are accessible through keyboard navigation.
14. 14. Test tab navigation on a mobile device by tapping.
15. 15. Verify that tab switching is functional and content is responsive on mobile screens.

#### Key Selectors:
- **Type**: link, **Text**: 'Test Plans', **Selector**: `a[href='/roostgpt/tests']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: link, **Text**: 'Analysis', **Selector**: `a[href='/roostgpt/analyses']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: link, **Text**: 'Generations', **Selector**: `a[href='/roostgpt/events']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)
#### Expected Results:
- Each tab displays the correct content when selected.
- The active tab is visually highlighted.
- Navigation via browser back and forward buttons works as expected.
- Performance is consistent during rapid tab switching.
- Navigation is fully functional on both desktop and mobile.

#### Edge Cases:
- Attempt to navigate to a non-existent tab URL.
- Switch tabs rapidly to test for performance issues.
- Use keyboard navigation with disabled tabs (if applicable).
- Simulate slow network conditions and test tab loading.
- Test tab navigation on a very small viewport.

#### Data Requirements:
- Valid tab URLs: '/roostgpt/tests', '/roostgpt/analyses', '/roostgpt/events'
- Content for each tab must be preloaded or dynamically loaded.
**Test File:** [navigation_between_tabs_in_the_roostgpt_section.spec.js](./navigation_between_tabs_in_the_roostgpt_section.spec.js)
---

## Admin Dashboard Navigation and State Persistence
**Description:** This test validates the navigation and state persistence across the Admin, RoostGPT, and Connectors tabs on the admin dashboard. It ensures that UI elements are interactive, state is properly maintained, and navigation works seamlessly.
**Priority**: high | **Complexity**: high
**Tags**: network-resilience, complex-scenario, accessibility, auto-generated, api-integration, ui-test, performance, workflow
**Type:** workflow
**Pages Involved:**- https://dev.roost.ai/admin/app- https://dev.roost.ai/roostgpt- https://dev.roost.ai/connectors
#### Steps:
1. 1. Navigate to https://dev.roost.ai/admin/app.
2. 2. Verify the visibility of the Admin tab (data-testid='admin-tab') and ensure it is marked as active.
3. 3. Click the RoostGPT tab (data-testid='roostGPT-tab').
4. 4. Verify that the page navigates to https://dev.roost.ai/roostgpt.
5. 5. Interact with any visible UI elements on the RoostGPT page to confirm proper loading.
6. 6. Return to the Admin tab by clicking on it.
7. 7. Verify that the page navigates back to https://dev.roost.ai/admin/app and the state is preserved.
8. 8. Click the Connectors tab (data-testid='connectors-tab').
9. 9. Verify that the page navigates to https://dev.roost.ai/connectors.
10. 10. Return to the Admin tab by clicking on it again.
11. 11. Reload the page and verify that the Admin tab remains active.
12. 12. Verify that all key UI elements, such as the Admin tab and navigation features, remain functional after reload.

#### Key Selectors:
- **Type**: link, **Text**: 'Admin', **Selector**: `a[data-testid='admin-tab']`, **Action**: click (Page: https://dev.roost.ai/admin/app)- **Type**: link, **Text**: 'RoostGPT', **Selector**: `a[data-testid='roostGPT-tab']`, **Action**: click (Page: https://dev.roost.ai/roostgpt)- **Type**: link, **Text**: 'Connectors', **Selector**: `a[data-testid='connectors-tab']`, **Action**: click (Page: https://dev.roost.ai/connectors)
#### Expected Results:
- Navigation to each tab occurs without errors.
- The Admin tab remains active when on the https://dev.roost.ai/admin/app page.
- State persists across navigation and reloads.

#### Edge Cases:
- Attempt navigation without proper permissions (role-based access testing).
- Refresh the page during navigation and verify no UI inconsistencies.
- Click a disabled or non-functional tab and ensure proper error handling.
- Verify behavior when one of the navigation links is broken or missing.
- Test navigation under high network latency.

#### Data Requirements:
- Valid admin user with access to all tabs.
- Different user roles to verify restricted access to tabs.
- Simulated network conditions for latency testing.
**Test File:** [admin_dashboard_navigation_and_state_persistence.spec.js](./admin_dashboard_navigation_and_state_persistence.spec.js)
---

## Filter and Analyze Test Results Workflow
**Description:** Tests the filtering functionality on the test results table, ensuring filters like 'In-Queue', 'In-Progress', and 'Completed' work correctly and update the displayed data.
**Priority**: high | **Complexity**: high
**Tags**: complex-scenario, network-resilience, accessibility, auto-generated, api-integration, ui-test, performance, workflow, concurrency, data-validation
**Type:** workflow
**Pages Involved:**- https://dev.roost.ai/roostgpt/analyses
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/analyses.
2. 2. Verify the visibility of the test results table.
3. 3. Identify and click the dropdown filter for status.
4. 4. Select 'In-Queue' from the dropdown.
5. 5. Assert that only rows with status 'In-Queue' are displayed.
6. 6. Clear the filter and verify that all rows are displayed again.
7. 7. Repeat the filter process for 'In-Progress' and 'Completed'.
8. 8. Use the search box to type a keyword relevant to a test name (e.g., 'Login Test').
9. 9. Verify that only rows matching the search term are displayed.
10. 10. Clear the search box and verify the table resets.
11. 11. Click the 'Show My Activities' toggle and verify that only activities associated with the logged-in user are displayed.
12. 12. Toggle back to 'Show All Activities' and verify visibility of all entries.
13. 13. Enable the auto-refresh toggle.
14. 14. Wait for 45 seconds and verify that the table refreshes automatically.
15. 15. Assert that the filters and search parameters persist after the refresh.
16. 16. Interact with the column headers (e.g., 'Test Name') to sort the table.
17. 17. Verify that sorting works correctly in ascending and descending order.
18. 18. Reload the page and assert that filters, sorting, or search parameters persist if supported.

#### Key Selectors:
- **Type**: dropdown, **Text**: '', **Selector**: `select[data-testid='status-filter']`, **Action**: select (Page: https://dev.roost.ai/roostgpt/analyses)- **Type**: input, **Text**: '', **Selector**: `input[data-testid='events-search-box']`, **Action**: type, **Value**: 'Login Test' (Page: https://dev.roost.ai/roostgpt/analyses)- **Type**: button, **Text**: 'Show My Activities', **Selector**: `button[data-testid='toggle-my-activities']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/analyses)- **Type**: toggle, **Text**: '', **Selector**: `button[data-testid='auto-refresh-toggle']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/analyses)- **Type**: table, **Text**: '', **Selector**: `table[data-testid='results-table']`, **Action**: assert_visibility (Page: https://dev.roost.ai/roostgpt/analyses)
#### Expected Results:
- Table displays only rows with status 'In-Queue' after filter selection.
- Search results correctly display rows matching the keyword.
- Auto-refresh updates table data after 45-second interval.
- Sorting by column headers works correctly in ascending and descending order.
- Filters, search, and sorting parameters persist after page reload.

#### Edge Cases:
- Attempt to apply multiple filters simultaneously.
- Test with an invalid keyword in the search box.
- Test auto-refresh with a slow network connection.
- Attempt to sort a column with identical values.
- Verify behavior when no rows match the filter criteria.

#### Data Requirements:
- Various test statuses ('In-Queue', 'In-Progress', 'Completed').
- At least one test with the name 'Login Test'.
- User-specific activities for 'Show My Activities' toggle.
- Test data to verify sorting functionality (e.g., dates, test names).
- Keyword for search functionality.
**Test File:** [filter_and_analyze_test_results_workflow.spec.js](./filter_and_analyze_test_results_workflow.spec.js)
---

## Add and Manage Connectors Workflow
**Description:** This scenario tests the ability to add a new connector, verify its presence in the list, and manage it (info, edit, delete). It ensures proper state management, data integrity, and UI responsiveness.
**Priority**: high | **Complexity**: high
**Tags**: complex-scenario, accessibility, auto-generated, mobile, api-integration, ui-test, performance, workflow, concurrency, data-validation
**Type:** workflow
**Pages Involved:**- https://dev.roost.ai/connectors
#### Steps:
1. 1. Navigate to https://dev.roost.ai/connectors.
2. 2. Verify the visibility of 'Add Connector' button.
3. 3. Click on the 'Add Connector' button.
4. 4. Fill out the Add Connector form (fields not provided in UI data, assume generic fields like 'Name' and 'Details').
5. 5. Click the 'Save' button.
6. 6. Verify that the new connector is added to the connectors list.
7. 7. Search for the newly added connector using the search box.
8. 8. Verify the connector appears in the filtered results.
9. 9. Click the 'Info' button for the connector.
10. 10. Verify the Info modal displays correct details about the connector.
11. 11. Click the 'Edit' button for the connector.
12. 12. Modify the connector details and click 'Save'.
13. 13. Verify the modified connector details appear in the list.
14. 14. Click the 'Delete' button for the connector.
15. 15. Confirm the delete action.
16. 16. Search again for the deleted connector.
17. 17. Verify the connector no longer appears in the list.
18. 18. Reload the page and verify the connector is still removed.

#### Key Selectors:
- **Type**: button, **Text**: 'Add Connector', **Selector**: `button[data-testid='add-connector-button']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: input, **Text**: '', **Selector**: `input[data-testid='Connector-search-box']`, **Action**: type, **Value**: 'Test Connector' (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: 'Info', **Selector**: `button[data-testid='info-button']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: 'Edit', **Selector**: `button[data-testid='edit-button']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: 'Delete', **Selector**: `button[data-testid='delete-button']`, **Action**: click (Page: https://dev.roost.ai/connectors)
#### Expected Results:
- The new connector is displayed in the connectors list after adding.
- The Info modal shows correct details about the connector.
- The edited connector details are reflected in the list.
- The connector is no longer visible in the table after deletion.
- State persists correctly after page reload.

#### Edge Cases:
- Try adding a connector with an empty name.
- Edit the connector to have an empty name.
- Search for a connector that does not exist.
- Cancel the delete operation and verify the connector is still present.
- Perform simultaneous edits to the same connector from two sessions.

#### Data Requirements:
- connector_name: 'Test Connector'
- connector_details: 'This is a test connector.'
- empty_name: ''
- invalid_name: '!@#$%'
- long_name: 'Connector Name Exceeding Character Limit'
**Test File:** [add_and_manage_connectors_workflow.spec.js](./add_and_manage_connectors_workflow.spec.js)
---

## Validate Footer Navigation Links
**Description:** This test ensures that all footer navigation links function correctly and lead to the expected external or internal pages. It also validates proper redirection and UI responsiveness.
**Priority**: high | **Complexity**: high
**Tags**: complex-scenario, accessibility, auto-generated, mobile, api-integration, ui-test, performance, navigation
**Type:** navigation
**Pages Involved:**- https://dev.roost.ai/admin/app- https://roost.ai- https://roost.ai/privacy-policy- https://docs.roost.ai- https://roost.ai/docs/api
#### Steps:
1. 1. Navigate to https://dev.roost.ai/admin/app.
2. 2. Scroll to the footer section of the page.
3. 3. Click the 'About Roost' link.
4. 4. Verify that the page redirects to https://roost.ai.
5. 5. Return to https://dev.roost.ai/admin/app.
6. 6. Click the 'Privacy Policy' link.
7. 7. Verify that the page redirects to https://roost.ai/privacy-policy.
8. 8. Return to https://dev.roost.ai/admin/app.
9. 9. Click the 'Documentation' link.
10. 10. Verify that it redirects to https://docs.roost.ai.
11. 11. Return to https://dev.roost.ai/admin/app.
12. 12. Click the 'API Reference' link.
13. 13. Verify that the page redirects to https://roost.ai/docs/api.

#### Key Selectors:
- **Type**: link, **Text**: 'About Roost', **Selector**: `a.footer-item[href='https://roost.ai']`, **Action**: click (Page: https://dev.roost.ai/admin/app)- **Type**: link, **Text**: 'Privacy Policy', **Selector**: `a.footer-item[href='https://roost.ai/privacy-policy']`, **Action**: click (Page: https://dev.roost.ai/admin/app)- **Type**: link, **Text**: 'Documentation', **Selector**: `a.footer-item[href='https://docs.roost.ai']`, **Action**: click (Page: https://dev.roost.ai/admin/app)- **Type**: link, **Text**: 'API Reference', **Selector**: `a.footer-item[href='/docs/api']`, **Action**: click (Page: https://dev.roost.ai/admin/app)
#### Expected Results:
- Links redirect to the correct pages.
- No 404 or unexpected error pages are encountered.
- Navigation is smooth and occurs within 2 seconds.

#### Edge Cases:
- Test redirection when the target link is down (e.g., 500 error).
- Verify behavior when an external link is broken.
- Simulate high latency during redirection.
- Test for typos in link URLs that lead to incorrect pages.
- Ensure links open in the correct browsing context (new tab or same tab).

#### Data Requirements:
- Valid URLs for all footer links.
- Simulated network failures for error handling.
**Test File:** [validate_footer_navigation_links.spec.js](./validate_footer_navigation_links.spec.js)
---

## Pagination Functionality Test
**Description:** This scenario tests the pagination controls (First, Last, Previous, Next, and numbered pages) to ensure users can navigate through the connectors list effectively.
**Priority**: high | **Complexity**: high
**Tags**: complex-scenario, accessibility, auto-generated, api-integration, ui-test, performance, navigation
**Type:** navigation
**Pages Involved:**- https://dev.roost.ai/connectors
#### Steps:
1. 1. Navigate to https://dev.roost.ai/connectors.
2. 2. Verify the visibility of the pagination controls.
3. 3. Click the 'Next' button.
4. 4. Verify the next page of results is displayed.
5. 5. Click the 'Previous' button.
6. 6. Verify the previous page of results is displayed.
7. 7. Click the 'First' button.
8. 8. Verify the first page of results is displayed.
9. 9. Click the 'Last' button.
10. 10. Verify the last page of results is displayed.
11. 11. Click on a specific page number (e.g., 3).
12. 12. Verify the corresponding page of results is displayed.
13. 13. Reload the page and verify the default page (1) is displayed.
14. 14. Perform a search and verify pagination updates accordingly.
15. 15. Navigate through pages after performing a search.

#### Key Selectors:
- **Type**: button, **Text**: '»', **Selector**: `button[data-testid='arrow-icon']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: '«', **Selector**: `button[data-testid='arrow-left']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: 'First', **Selector**: `button[data-testid='paginator-first-page-button']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: 'Last', **Selector**: `button[data-testid='paginator-last-page-button']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: '3', **Selector**: `button.page-link:nth-child(3)`, **Action**: click (Page: https://dev.roost.ai/connectors)
#### Expected Results:
- Pagination updates correctly when navigating between pages.
- The correct set of connectors is displayed for each page.
- State resets to page 1 after a page reload.
- Pagination updates correctly after performing a search.

#### Edge Cases:
- Attempt to navigate to a page number that does not exist.
- Click on 'Next' when already on the last page.
- Click on 'Previous' when already on the first page.
- Rapidly click pagination buttons and verify no overlapping requests.
- Ensure pagination works correctly when the list has fewer than one page of results.

#### Data Requirements:
- minimum_connectors: 1
- maximum_connectors_per_page: 10
- total_connectors: 50
- search_query: 'connector'
**Test File:** [pagination_functionality_test.spec.js](./pagination_functionality_test.spec.js)
---

## Search Functionality for Test Plans
**Description:** This scenario tests the search functionality for test plans on the page. It ensures that valid searches return correct results, invalid inputs are handled properly, and the UI responds as expected.
**Priority**: high | **Complexity**: high
**Tags**: complex-scenario, accessibility, form-submission, auto-generated, data_validation, api-integration, error-handling, ui-test, performance, concurrency
**Type:** data_validation
**Pages Involved:**- https://dev.roost.ai/roostgpt/tests
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/tests.
2. 2. Verify the visibility of the search input field with placeholder 'Search for Test Plans'.
3. 3. Type a valid search term (e.g., 'Unit Test') into the search field.
4. 4. Verify that the search results dynamically update to display matching test plans.
5. 5. Clear the search field and type a partial search term (e.g., 'Unit').
6. 6. Verify that the search results display partial matches.
7. 7. Enter an invalid or non-existent search term (e.g., 'InvalidPlan123').
8. 8. Verify that the UI displays a 'No results found' message or equivalent.
9. 9. Test searching using a special character (e.g., '@#$$').
10. 10. Verify the system's response to invalid characters and ensure UI does not break.
11. 11. Test search functionality with a large input string (e.g., 255 characters).
12. 12. Verify the system handles this input gracefully without crashing.
13. 13. Perform a search and then refresh the page.
14. 14. Verify that the search state is cleared on refresh.
15. 15. Test search with leading and trailing whitespace (e.g., '   Test Plan   ').
16. 16. Verify that the system trims whitespace and returns the appropriate results.
17. 17. Test concurrent searches from two browser tabs using the same user account.
18. 18. Verify that both sessions work independently and do not conflict.
19. 19. Repeat steps with different test plans to validate consistency.

#### Key Selectors:
- **Type**: input, **Text**: '', **Selector**: `input[data-testid='tests-search-box']`, **Action**: type (Page: https://dev.roost.ai/roostgpt/tests)
#### Expected Results:
- Search results update dynamically based on input.
- Invalid or non-existent search terms display a 'No results found' message.
- The system gracefully handles large inputs and invalid characters.
- Search state is cleared upon page refresh.
- Whitespace in the search term is trimmed before processing.

#### Edge Cases:
- Search with special characters.
- Search with extremely long input strings.
- Search with leading and trailing whitespace.
- Search for a non-existent test plan.
- Perform searches concurrently in multiple tabs.

#### Data Requirements:
- valid_search_term: 'Unit Test'
- partial_search_term: 'Unit'
- invalid_search_term: 'InvalidPlan123'
- special_character_search: '@#$$'
- long_search_term: 255 characters string
**Test File:** [search_functionality_for_test_plans.spec.js](./search_functionality_for_test_plans.spec.js)
---

## Add New Test Plan and Verify State Persistence
**Description:** Tests the ability to create a new test plan using the 'Add Test Plan' button, verify its creation, and ensure state persistence after a page reload.
**Priority**: high | **Complexity**: high
**Tags**: complex-scenario, accessibility, auto-generated, api-integration, ui-test, performance, workflow
**Type:** workflow
**Pages Involved:**- https://dev.roost.ai/roostgpt/tests
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/tests.
2. 2. Verify that the 'Add Test Plan' button is visible and enabled.
3. 3. Click the 'Add Test Plan' button.
4. 4. Verify that a modal or form to create a test plan appears.
5. 5. Fill out the required fields in the form with valid data.
6. 6. Click the 'Save' or 'Submit' button to add the test plan.
7. 7. Verify that the new test plan appears in the list of test plans.
8. 8. Reload the page.
9. 9. Verify that the newly added test plan is still visible in the list.
10. 10. Use the search box to search for the newly added test plan by name.
11. 11. Verify that the search results include the newly added test plan.
12. 12. Clear the search input.
13. 13. Navigate to another page using the 'Analysis' link.
14. 14. Return to the Test Plans page.
15. 15. Verify that the newly added test plan is still visible.
16. 16. Attempt to edit the test plan and save the changes.
17. 17. Verify that the changes are reflected in the test plan list.
18. 18. Delete the test plan and verify it no longer appears in the list.

#### Key Selectors:
- **Type**: button, **Text**: 'Add Test Plan', **Selector**: `button[data-testid='add-test-plan-button']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: input, **Text**: 'Search for Test Plans', **Selector**: `input[data-testid='tests-search-box']`, **Action**: type (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: button, **Text**: 'Save', **Selector**: `button[data-testid='save-test-plan-button']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: link, **Text**: 'Analysis', **Selector**: `a[href='/roostgpt/analyses']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)
#### Expected Results:
- The 'Add Test Plan' button is visible and clickable.
- The test plan creation modal or form is displayed upon clicking the button.
- The new test plan is added and is visible in the test plan list.
- The new test plan persists after refreshing the page.
- Search results show the newly added test plan when searched by name.
- The test plan can be successfully edited, and changes are reflected.
- The test plan is successfully deleted and no longer appears in the list.

#### Edge Cases:
- Click 'Add Test Plan' without filling in required fields and verify validation errors.
- Attempt to create a test plan with duplicate names and verify error handling.
- Reload the page during test plan creation and ensure no partial entries are saved.
- Search with invalid or non-existent test plan names and verify empty results.
- Delete a test plan and attempt to search for it to ensure it is removed.

#### Data Requirements:
- valid_test_plan_name: 'Test Plan A'
- duplicate_test_plan_name: 'Test Plan A'
- invalid_test_plan_name: '' (empty string)
- special_character_test_plan_name: '@TestPlan!'
- long_test_plan_name: 'A' * 256 (256 characters)
**Test File:** [add_new_test_plan_and_verify_state_persistence.spec.js](./add_new_test_plan_and_verify_state_persistence.spec.js)
---

## Filter Test Plans by Search and Verify Results
**Description:** Tests the filtering functionality of the 'Search for Test Plans' input field to ensure only matching results are displayed.
**Priority**: high | **Complexity**: high
**Tags**: complex-scenario, accessibility, form-submission, auto-generated, data_validation, api-integration, ui-test, performance
**Type:** data_validation
**Pages Involved:**- https://dev.roost.ai/roostgpt/tests
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/tests.
2. 2. Verify that the 'Search for Test Plans' input field is visible and enabled.
3. 3. Type a valid test plan name into the search input field.
4. 4. Verify that the visible list of test plans updates to show only matching results.
5. 5. Clear the search input field.
6. 6. Verify that all test plans are displayed again.
7. 7. Type a partial test plan name.
8. 8. Verify that the visible list matches all test plans containing the partial name.
9. 9. Enter a non-existent test plan name.
10. 10. Verify that no results are displayed and a 'No results found' message is shown.
11. 11. Test case-insensitive search by entering the same name in different casing.
12. 12. Verify that results are returned regardless of case.
13. 13. Enter a name with leading and trailing whitespaces.
14. 14. Verify that the search results are unaffected by the whitespaces.
15. 15. Perform a search with a name containing special characters.
16. 16. Verify that results are returned for names with exact matching special characters.

#### Key Selectors:
- **Type**: input, **Text**: 'Search for Test Plans', **Selector**: `input[data-testid='tests-search-box']`, **Action**: type (Page: https://dev.roost.ai/roostgpt/tests)
#### Expected Results:
- The search input field is visible and accepts input.
- The test plan list updates dynamically as search input is entered.
- Clearing the search input displays all test plans.
- Searching with non-existent names shows no results.
- Case-insensitive searches return expected results.
- Special character searches match the exact special characters in test plan names.

#### Edge Cases:
- Enter an empty string in the search field and verify all test plans are displayed.
- Enter a string exceeding the maximum character limit for the search field.
- Search with a mix of valid and invalid characters.
- Search with SQL injection strings like ' OR 1=1; -- and verify no results are returned.
- Search with XSS payloads like <script>alert('XSS')</script> and verify input sanitization.

#### Data Requirements:
- valid_search_term: 'Test Plan B'
- partial_search_term: 'Plan'
- non_existent_search_term: 'NonExistent'
- special_character_search_term: '@TestPlan!'
- case_insensitive_search_term: 'test plan b'
**Test File:** [filter_test_plans_by_search_and_verify_results.spec.js](./filter_test_plans_by_search_and_verify_results.spec.js)
---

