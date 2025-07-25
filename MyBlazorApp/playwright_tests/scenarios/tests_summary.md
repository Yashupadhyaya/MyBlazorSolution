# Generated Playwright Tests Summary

## Pagination Navigation for Test Plans
**Description:** This scenario tests the pagination controls on the Test Plans page. It ensures that users can navigate through pages of test plans using the 'First', 'Last', numeric page buttons, and arrow buttons.
**Priority**: high | **Complexity**: high
**Tags**: navigation, performance, auto-generated, accessibility, api-integration, concurrency, keyboard-navigation, complex-scenario, ui-test
**Type:** navigation
**Pages Involved:**- https://app.roost.ai/roostgpt/tests
#### Steps:
1. 1. Navigate to https://app.roost.ai/roostgpt/tests.
2. 2. Verify the visibility of pagination controls at the bottom of the page.
3. 3. Click on the 'Next' (» arrow) button and verify that the next page of test plans is loaded.
4. 4. Click on the 'Previous' (« arrow) button and verify that the previous page is loaded.
5. 5. Click on the numeric page button '2' and verify that page 2 is displayed.
6. 6. Click on the 'First' button and verify that the first page is displayed.
7. 7. Click on the 'Last' button and verify that the last page is displayed.
8. 8. Refresh the page and verify that the pagination state resets to the first page.
9. 9. Verify that the pagination controls are keyboard accessible (Tab focus).
10. 10. Test clicking on disabled pagination controls (e.g., 'First' button on the first page) and verify no action occurs.
11. 11. Verify that the total number of pages is correctly displayed.
12. 12. Attempt to navigate to a non-existent page (e.g., page 100) and verify an error message or no action occurs.

#### Key Selectors:
- **Type**: button, **Text**: '»', **Selector**: `button[data-testid='arrow-icon']`, **Action**: click (Page: https://app.roost.ai/roostgpt/tests)- **Type**: button, **Text**: '«', **Selector**: `button[data-testid='arrow-left']`, **Action**: click (Page: https://app.roost.ai/roostgpt/tests)- **Type**: button, **Text**: 'First', **Selector**: `button[data-testid='paginator-first-page-button']`, **Action**: click (Page: https://app.roost.ai/roostgpt/tests)
#### Expected Results:
- Pagination buttons navigate to the correct pages.
- Disabled buttons (e.g., 'First' on the first page) do not perform any action.
- Pagination state resets after a page reload.
- Error message or no action for navigation to non-existent pages.

#### Edge Cases:
- Attempt to click on the 'Next' button on the last page.
- Attempt to click on the 'Previous' button on the first page.
- Test simultaneous clicks on multiple pagination buttons.
- Verify behavior when the pagination API returns an error.
- Test navigation when a page is partially loaded.

#### Data Requirements:
- Test plans spread across multiple pages.
- Valid total page count for pagination.
- Empty dataset to verify disabled pagination controls.
- Dataset with exactly one page of results.
**Test File:** [pagination_navigation_for_test_plans.spec.js](./pagination_navigation_for_test_plans.spec.js)
---

## Connector Search Functionality - Valid and Invalid Inputs
**Description:** This scenario tests the search functionality on the Connectors page, ensuring that valid search queries return correct results, invalid queries provide appropriate feedback, and the search box handles edge cases (e.g., empty input, special characters).
**Priority**: high | **Complexity**: high
**Tags**: data_validation, error-handling, performance, auto-generated, accessibility, api-integration, form-submission, responsive, complex-scenario, ui-test
**Type:** data_validation
**Pages Involved:**- https://app.roost.ai/connectors
#### Steps:
1. 1. Navigate to https://app.roost.ai/connectors.
2. 2. Verify that the search bar is visible and enabled.
3. 3. Type a valid connector name (e.g., 'GitHub') into the search bar and press Enter.
4. 4. Verify that connector results matching the query are displayed.
5. 5. Clear the search bar and type an invalid connector name (e.g., 'NonExistentConnector') and press Enter.
6. 6. Verify that a 'No results found' message is displayed.
7. 7. Enter a connector name in lowercase (e.g., 'github') and verify that results are case-insensitive.
8. 8. Test the search functionality with special characters (e.g., '@#$%') and verify that no unexpected errors occur.
9. 9. Leave the search bar empty and press Enter.
10. 10. Verify that all connectors are displayed (default behavior).
11. 11. Test the responsiveness of the search box by resizing the browser window.
12. 12. Refresh the page and verify that the search bar is reset to its default state.
13. 13. Use the search bar again and verify that results update dynamically without requiring another page reload.
14. 14. Verify the tab navigation support for the search bar (focus via Tab key, type query, and press Enter).
15. 15. Test the search functionality on a mobile-sized viewport and ensure proper rendering.

#### Key Selectors:
- **Type**: input, **Text**: '', **Selector**: `input[data-testid='Connector-search-box']`, **Action**: type, **Value**: 'GitHub' (Page: https://app.roost.ai/connectors)- **Type**: input, **Text**: '', **Selector**: `input[data-testid='Connector-search-box']`, **Action**: type, **Value**: 'NonExistentConnector' (Page: https://app.roost.ai/connectors)
#### Expected Results:
- Valid connector name returns matching results.
- Invalid connector name shows 'No results found' message.
- Empty search input displays all connectors.
- Search results update dynamically without reload.
- Search bar is functional and responsive on mobile viewports.

#### Edge Cases:
- Searching with special characters like '@#$%' should not cause errors.
- Case-insensitive search should return matching results.
- Empty input should not break the page functionality.
- Extremely long input should not cause UI issues.
- Non-alphanumeric characters in the search query should be handled gracefully.

#### Data Requirements:
- valid_query: 'GitHub'
- invalid_query: 'NonExistentConnector'
- special_characters: '@#$%'
- empty_query: ''
- long_query: 'a'.repeat(100)
**Test File:** [connector_search_functionality___valid_and_invalid_inputs.spec.js](./connector_search_functionality___valid_and_invalid_inputs.spec.js)
---

## Add a New Connector Workflow
**Description:** This scenario tests the end-to-end flow for adding a new connector on the Connectors page, ensuring proper data validation, error handling, and API interaction.
**Priority**: high | **Complexity**: high
**Tags**: error-handling, performance, auto-generated, accessibility, api-integration, ui-test, workflow, complex-scenario, data-validation
**Type:** workflow
**Pages Involved:**- https://app.roost.ai/connectors
#### Steps:
1. 1. Navigate to https://app.roost.ai/connectors.
2. 2. Verify the presence of an 'Add Connector' button.
3. 3. Click the 'Add Connector' button.
4. 4. Verify that a modal or new page appears for adding a connector.
5. 5. Enter valid data into the required fields (e.g., connector name, API key).
6. 6. Submit the form and verify that a success message is displayed.
7. 7. Verify that the new connector is listed on the page.
8. 8. Attempt to add a connector with missing required fields and verify that appropriate error messages are displayed.
9. 9. Test adding a connector with duplicate data (e.g., existing connector name) and verify that an error is shown.
10. 10. Reload the page and verify that the new connector persists.
11. 11. Attempt to edit the connector and verify successful updates.
12. 12. Delete the connector and verify its removal.

#### Key Selectors:
- **Type**: button, **Text**: 'Add Connector', **Selector**: `button[data-testid='add-connector-button']`, **Action**: click (Page: https://app.roost.ai/connectors)
#### Expected Results:
- New connector is successfully added and listed.
- Error messages displayed for invalid inputs.
- Duplicate connector addition is prevented.
- Connectors persist across page reloads.

#### Edge Cases:
- Adding a connector with missing required fields should fail.
- Adding a connector with invalid characters in the name should fail.
- Adding a connector with duplicate data should fail.
- Long connector names should not break the UI.
- Network failures during addition should be handled gracefully.

#### Data Requirements:
- valid_connector_name: 'GitHub'
- invalid_connector_name: '@#$%'
- duplicate_connector_name: 'GitHub'
- missing_api_key: ''
- valid_api_key: '12345-abcde'
**Test File:** [add_a_new_connector_workflow.spec.js](./add_a_new_connector_workflow.spec.js)
---

## Search for Test Plans and Validate Search Functionality
**Description:** This scenario tests the search functionality on the Test Plans page. It ensures that users can search for specific test plans using various valid and invalid inputs, and the search results update dynamically.
**Priority**: high | **Complexity**: high
**Tags**: data_validation, error-handling, performance, auto-generated, accessibility, api-integration, form-submission, keyboard-navigation, complex-scenario, ui-test
**Type:** data_validation
**Pages Involved:**- https://app.roost.ai/roostgpt/tests
#### Steps:
1. 1. Navigate to https://app.roost.ai/roostgpt/tests.
2. 2. Verify the visibility of the search input box with placeholder 'Search for Test Plans'.
3. 3. Type the search term 'API Testing' into the search box and press Enter.
4. 4. Verify that the search results update to show only test plans related to 'API Testing'.
5. 5. Clear the search box and enter a search term that does not exist in the dataset, such as 'NonExistentPlan'.
6. 6. Verify that the search results display a message like 'No results found'.
7. 7. Enter partial keywords like 'API' and verify that predictive results or a partial match is displayed.
8. 8. Test input sanitization by entering special characters like '!@#$%^&*' and verify that no application error occurs.
9. 9. Reload the page and verify that the search results are reset.
10. 10. Test the case-insensitivity of the search by entering 'api testing' in lowercase.
11. 11. Verify that the results are the same as when 'API Testing' was entered.
12. 12. Perform multiple quick searches back-to-back and ensure the application updates the results without lag.
13. 13. Verify that the search box is keyboard accessible (Tab focus).
14. 14. Test searching for a test plan by entering only the creator's name (e.g., 'Urvi').
15. 15. Verify that all test plans created by 'Urvi' are displayed in the results.

#### Key Selectors:
- **Type**: input, **Text**: '', **Selector**: `input[data-testid='tests-search-box']`, **Action**: type, **Value**: 'API Testing' (Page: https://app.roost.ai/roostgpt/tests)- **Type**: input, **Text**: '', **Selector**: `input[data-testid='tests-search-box']`, **Action**: type, **Value**: 'NonExistentPlan' (Page: https://app.roost.ai/roostgpt/tests)
#### Expected Results:
- Search results filter to display relevant test plans when valid keywords are entered.
- No results are displayed for non-existent keywords.
- Special characters do not cause any application errors.
- Search is case-insensitive.
- Search results reset after page reload.

#### Edge Cases:
- Enter an empty search query and verify the default state.
- Enter extremely long search strings to test input limits.
- Submit a search query with only whitespace characters.
- Perform a search while the application is offline.
- Perform a search immediately after logging in to test state initialization.

#### Data Requirements:
- Test plans with the keyword 'API Testing' in their titles.
- Test plans created by specific users (e.g., 'Urvi').
- An empty dataset for search validation.
- Search terms with special characters.
- Case-sensitive and case-insensitive variations of the same term.
**Test File:** [search_for_test_plans_and_validate_search_functionality.spec.js](./search_for_test_plans_and_validate_search_functionality.spec.js)
---

