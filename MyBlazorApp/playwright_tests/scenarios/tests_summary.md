# Generated Playwright Tests Summary

## Add a New Test Plan and Verify Successful Creation
**Description:** This scenario tests the workflow of adding a new test plan using the 'Add Test Plan' button and verifying that the newly created test plan appears in the list.
**Priority**: high | **Complexity**: high
**Tags**: complex-scenario, auto-generated, api-integration, workflow, ui-test, accessibility, performance
**Type:** workflow
**Pages Involved:**- https://dev.roost.ai/roostgpt/tests
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/tests.
2. 2. Verify the visibility of the 'Add Test Plan' button.
3. 3. Click on the 'Add Test Plan' button.
4. 4. Verify that a modal or separate page opens for creating a test plan.
5. 5. Input the test plan name (e.g., 'New Test Plan') into the appropriate field.
6. 6. Select the AI model and any other required fields.
7. 7. Choose the test type from the dropdown options (e.g., 'E2E', 'Unit').
8. 8. Set the test plan's creation date (if applicable).
9. 9. Click the 'Save' or 'Create' button to submit the new test plan.
10. 10. Verify that a success message is displayed confirming the creation.
11. 11. Redirect back to the Test Plans list page (if not automatically done).
12. 12. Verify that the newly created test plan appears in the list.
13. 13. Use the search bar to locate the new test plan by its name.
14. 14. Click on the test plan name to navigate to its details page.
15. 15. Verify the details of the test plan, including name, type, creator, and timestamp.

#### Key Selectors:
- **Type**: button, **Text**: 'Add Test Plan', **Selector**: `button[data-testid='add-test-plan-btn']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: input, **Text**: 'Test Plan Name', **Selector**: `input[data-testid='test-plan-name-input']`, **Action**: type, **Value**: 'New Test Plan' (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: button, **Text**: 'Save', **Selector**: `button[data-testid='save-test-plan-btn']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)
#### Expected Results:
- A modal or new page for creating the test plan opens upon clicking 'Add Test Plan'.
- A success message confirms the test plan's creation.
- The new test plan is visible in the list and searchable by name.
- Test plan details page displays correct information.

#### Edge Cases:
- Submit the form with missing required fields and verify error messages.
- Enter a duplicate test plan name and verify error handling.
- Input invalid characters in the test plan name field and ensure validation.
- Test creating a test plan without selecting a test type and verify proper handling.
- Close the modal without saving and check that no test plan is created.

#### Data Requirements:
- {'test_plan_name': 'New Test Plan', 'test_type': 'E2E', 'ai_model': 'OpenAI GPT-4', 'timestamp': '2023-10-01T12:00:00Z'}
**Test File:** [add_a_new_test_plan_and_verify_successful_creation.spec.js](./add_a_new_test_plan_and_verify_successful_creation.spec.js)
---

## Search Test Plans Using Valid and Invalid Inputs
**Description:** This scenario tests the search functionality on the Test Plans page for valid, invalid, empty, and special character inputs. It ensures the search bar behaves as expected, and results are accurate and responsive.
**Priority**: high | **Complexity**: high
**Tags**: mobile, data_validation, complex-scenario, auto-generated, api-integration, accessibility, ui-test, error-handling, performance, form-submission
**Type:** data_validation
**Pages Involved:**- https://dev.roost.ai/roostgpt/tests
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/tests.
2. 2. Verify the visibility of the search input field with placeholder 'Search for Test Plans'.
3. 3. Enter a valid test plan name (e.g., 'Login Test') into the search bar and press Enter.
4. 4. Verify that the results display only test plans matching the query.
5. 5. Clear the search bar and input an invalid test plan name (e.g., 'InvalidName123') and press Enter.
6. 6. Verify that no results are displayed, and a 'No results found' message is shown.
7. 7. Clear the search bar and input special characters (e.g., '@#$%^&*') and press Enter.
8. 8. Verify that no results are displayed, and a 'No results found' message or appropriate validation error is shown.
9. 9. Test an empty input by leaving the search field blank and pressing Enter.
10. 10. Verify that no action is taken or the results default to showing all test plans.
11. 11. Perform the search by partial matches (e.g., input 'Log') and verify that all matching test plans are displayed.
12. 12. Test case insensitivity by entering 'login test' (lowercase) and verifying it matches 'Login Test'.
13. 13. Verify that the search results update dynamically (if applicable) as text is typed.
14. 14. Test navigating to a test plan in the results by clicking its name and ensure the Test Plan Details page loads.
15. 15. Return to the Test Plans page and ensure the search field retains the previous query (state persistence).
16. 16. Clear the search field and press Enter to reset the results.
17. 17. Verify that the results return to showing all available test plans.

#### Key Selectors:
- **Type**: input, **Text**: 'Search for Test Plans', **Selector**: `input[data-testid='tests-search-box']`, **Action**: type, **Value**: 'Login Test' (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: input, **Text**: 'Search for Test Plans', **Selector**: `input[data-testid='tests-search-box']`, **Action**: clear (Page: https://dev.roost.ai/roostgpt/tests)
#### Expected Results:
- Search results match the input query accurately.
- Invalid or special character inputs return a 'No results found' message.
- Empty input does not perform a search or defaults to showing all test plans.
- Search is case-insensitive and matches partial queries.
- The Test Plans page retains the previous query after navigating back.

#### Edge Cases:
- Input a very long string (e.g., 5000 characters) and verify behavior.
- Input only whitespace (e.g., spaces or tabs) and verify no results are displayed.
- Perform rapid searches in succession and verify responsiveness.
- Perform a search and immediately refresh the page to verify persistence of search results.
- Test for SQL injection-like input (e.g., ' OR 1=1 --') and ensure no errors or unexpected results.

#### Data Requirements:
- {'test_plan_name': 'Login Test', 'test_plan_partial_match': 'Log', 'test_plan_invalid': 'InvalidName123', 'test_plan_special_characters': '@#$%^&*', 'test_plan_case_insensitivity': 'login test'}
**Test File:** [search_test_plans_using_valid_and_invalid_inputs.spec.js](./search_test_plans_using_valid_and_invalid_inputs.spec.js)
---

## Navigation Between Tabs (RoostGPT, Admin, Connectors)
**Description:** This scenario tests the navigation functionality of key tabs such as RoostGPT, Admin, and Connectors, verifying that each tab is accessible, clickable, and loads the correct content.
**Priority**: high | **Complexity**: high
**Tags**: network-resilience, navigation, complex-scenario, keyboard-navigation, auto-generated, api-integration, accessibility, ui-test, performance
**Type:** navigation
**Pages Involved:**- https://dev.roost.ai/roostgpt/tests
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/tests.
2. 2. Verify the visibility and enablement of the 'RoostGPT' tab.
3. 3. Click on the 'RoostGPT' tab and assert navigation to https://dev.roost.ai/roostgpt.
4. 4. Verify that the content loaded corresponds to the RoostGPT functionality.
5. 5. Return to the original page https://dev.roost.ai/roostgpt/tests.
6. 6. Verify the visibility and enablement of the 'Admin' tab.
7. 7. Click on the 'Admin' tab and assert navigation to https://dev.roost.ai/admin/app.
8. 8. Verify that the content loaded corresponds to the Admin functionality.
9. 9. Return to the original page https://dev.roost.ai/roostgpt/tests.
10. 10. Verify the visibility and enablement of the 'Connectors' tab.
11. 11. Click on the 'Connectors' tab and assert navigation to https://dev.roost.ai/connectors.
12. 12. Verify that the content loaded corresponds to the Connectors functionality.
13. 13. Use keyboard shortcuts to navigate between tabs.
14. 14. Test cross-browser compatibility of tab navigation.
15. 15. Test responsiveness by resizing the browser window and ensuring tabs remain clickable.

#### Key Selectors:
- **Type**: link, **Text**: 'RoostGPT', **Selector**: `a[data-testid='roostGPT-tab']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: link, **Text**: 'Admin', **Selector**: `a[data-testid='admin-tab']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: link, **Text**: 'Connectors', **Selector**: `a[data-testid='connectors-tab']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)
#### Expected Results:
- Navigation to 'RoostGPT' tab is successful.
- Navigation to 'Admin' tab is successful.
- Navigation to 'Connectors' tab is successful.
- Correct content is loaded for each tab.

#### Edge Cases:
- Attempt to click on a tab when the page is partially loaded.
- Navigate to a tab during slow network conditions.
- Test tab visibility on very small screens.
- Test navigating to a tab using keyboard shortcuts.
- Simulate browser back button after navigating to a tab.

#### Data Requirements:
- valid_tab_names: ['RoostGPT', 'Admin', 'Connectors']
**Test File:** [navigation_between_tabs__roostgpt__admin__connectors_.spec.js](./navigation_between_tabs__roostgpt__admin__connectors_.spec.js)
---

## Pagination Functionality
**Description:** This scenario tests the navigation through multiple pages of the connector list using pagination controls. It ensures correctness of page navigation, state persistence, and performance.
**Priority**: high | **Complexity**: high
**Tags**: network-resilience, navigation, complex-scenario, concurrency, auto-generated, api-integration, accessibility, ui-test, performance, form-submission
**Type:** navigation
**Pages Involved:**- https://dev.roost.ai/connectors
#### Steps:
1. 1. Navigate to https://dev.roost.ai/connectors.
2. 2. Verify the visibility of pagination controls (First, Previous, Next, Last).
3. 3. Click on the 'Next' button to navigate to the second page.
4. 4. Verify the second page of connectors is displayed.
5. 5. Click on the 'Previous' button to return to the first page.
6. 6. Verify the first page of connectors is displayed.
7. 7. Click on the 'Last' button.
8. 8. Verify that the last page of connectors is displayed.
9. 9. Click on the 'First' button.
10. 10. Verify that the first page of connectors is displayed.
11. 11. Reload the page and verify that the pagination resets to the first page.

#### Key Selectors:
- **Type**: button, **Text**: 'First', **Selector**: `button[data-testid='paginator-first-page-button']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: '»', **Selector**: `button[data-testid='arrow-icon']`, **Action**: click (Page: https://dev.roost.ai/connectors)
#### Expected Results:
- Pagination controls are functional and clickable.
- Navigating between pages displays the correct data.
- Reloading the page resets pagination to the first page.

#### Edge Cases:
- Attempt to navigate past the last page.
- Attempt to navigate to a page with no data.
- Trigger multiple pagination requests simultaneously.
- Disconnect from the network while paginating.
- Check if pagination controls are disabled when not applicable (e.g., on the first page).

#### Data Requirements:
- Connector list with at least 5 pages of data.
- Empty page scenario (no connectors).
- Concurrency scenario with multiple users paginating.
**Test File:** [pagination_functionality.spec.js](./pagination_functionality.spec.js)
---

## Adding a New Connector
**Description:** This scenario tests the multi-step workflow for adding a new connector using the 'Add Connector' button and validating its presence in the connector list. It ensures data validation, API integration, and state persistence.
**Priority**: high | **Complexity**: high
**Tags**: network-resilience, complex-scenario, auto-generated, data-validation, api-integration, workflow, ui-test, accessibility, performance
**Type:** workflow
**Pages Involved:**- https://dev.roost.ai/connectors
#### Steps:
1. 1. Navigate to https://dev.roost.ai/connectors.
2. 2. Verify the 'Add Connector' button is visible and enabled.
3. 3. Click on the 'Add Connector' button.
4. 4. Fill out the connector creation form with valid data.
5. 5. Submit the form.
6. 6. Wait for the page to reload or for a success message to appear.
7. 7. Verify that the newly added connector appears in the connector list.
8. 8. Use the search functionality to filter the connector list by the newly added connector's name.
9. 9. Verify that the search results display the newly added connector.
10. 10. Reload the page and verify that the connector entry persists in the list.

#### Key Selectors:
- **Type**: button, **Text**: 'Add Connector', **Selector**: `button[data-testid='add-connector-button']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: input, **Text**: '', **Selector**: `input[data-testid='Connector-search-box']`, **Action**: type, **Value**: 'New Connector Name' (Page: https://dev.roost.ai/connectors)
#### Expected Results:
- The 'Add Connector' button is clickable.
- The connector creation form is submitted successfully.
- The newly added connector appears in the connector list.
- The search functionality filters the list correctly.
- The connector entry persists after a page reload.

#### Edge Cases:
- Submit the form without filling in required fields.
- Use invalid data formats for fields (e.g., special characters, overly long strings).
- Attempt to add a duplicate connector name.
- Disconnect from the network before submitting the form.
- Check if error messages are displayed for invalid inputs.

#### Data Requirements:
- Valid connector name: 'New Connector Name'
- Invalid connector name: '#$InvalidName!'
- Duplicate connector name: 'Existing Connector Name'
- Long connector name: String with 256+ characters
- Empty connector name
**Test File:** [adding_a_new_connector.spec.js](./adding_a_new_connector.spec.js)
---

## Search Test Plans and Verify Results
**Description:** This scenario tests the search functionality for test plans, ensuring the input field works correctly, filters results in real-time, and handles edge cases like invalid input gracefully.
**Priority**: high | **Complexity**: high
**Tags**: network-resilience, data_validation, complex-scenario, keyboard-navigation, auto-generated, api-integration, accessibility, ui-test, error-handling, performance, form-submission
**Type:** data_validation
**Pages Involved:**- https://dev.roost.ai/roostgpt/tests
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/tests.
2. 2. Verify the visibility and enablement of the search input field.
3. 3. Type a valid test plan name into the search field and assert that the search input reflects the typed value.
4. 4. Assert that the search results update dynamically to match the input.
5. 5. Type an invalid or non-existing test plan name and verify that no results are displayed.
6. 6. Clear the search field and verify that all test plans are displayed.
7. 7. Test the search functionality with special characters like '@#$%^&*' and assert proper error handling or no results.
8. 8. Reload the page and verify that the search input and results reset to default state.
9. 9. Test the responsiveness of the search field by resizing the browser window.
10. 10. Test cross-browser compatibility by executing the search functionality in Chrome, Firefox, and Safari.
11. 11. Test the accessibility of the search field by navigating using keyboard shortcuts (Tab, Enter).
12. 12. Verify that the placeholder text 'Search for Test Plans' is visible when the search field is empty.
13. 13. Enable real-time monitoring of API calls triggered by the search interaction.
14. 14. Simulate a slow network and verify that the search results handle delays gracefully.
15. 15. Submit the search field with an empty value and verify the behavior (default or error).

#### Key Selectors:
- **Type**: input, **Text**: 'Search for Test Plans', **Selector**: `input[data-testid='tests-search-box']`, **Action**: type, **Value**: 'Test Plan 1' (Page: https://dev.roost.ai/roostgpt/tests)
#### Expected Results:
- Search input reflects the entered value correctly.
- Search results dynamically update based on the input.
- No results are displayed for invalid or non-existing search terms.
- All results are displayed when the search field is cleared.
- Special characters do not crash the search functionality.
- Search field resets completely upon page reload.

#### Edge Cases:
- Enter a search term with special characters.
- Search for a very long string (e.g., 1000 characters).
- Search with leading and trailing spaces.
- Submit the search field with an empty value.
- Simulate network disconnection during the search process.

#### Data Requirements:
- valid_test_plan_name: 'Test Plan 1'
- invalid_test_plan_name: 'NonExistingTestPlan'
- special_characters_input: '@#$%^&*'
- empty_string_input: ''
- long_string_input: 'a'.repeat(1000)
**Test File:** [search_test_plans_and_verify_results.spec.js](./search_test_plans_and_verify_results.spec.js)
---

