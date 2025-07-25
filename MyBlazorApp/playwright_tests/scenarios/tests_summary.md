# Generated Playwright Tests Summary

## Search and Pagination Workflow for Connectors
**Description:** This test validates the search functionality and pagination workflow on the Connectors page. It ensures that users can search connectors by keyword, navigate through paginated results, and verify the state persistence of the search query and page selection.
**Priority**: high | **Complexity**: high
**Tags**: performance, api-integration, complex-scenario, auto-generated, workflow, ui-test, accessibility
**Type:** workflow
**Pages Involved:**- https://dev.roost.ai/connectors
#### Steps:
1. 1. Navigate to https://dev.roost.ai/connectors.
2. 2. Verify the visibility of the search input field with placeholder 'Search for Connectors'.
3. 3. Enter a valid search term into the search input (e.g., 'Test Connector') and press Enter.
4. 4. Verify that the search results update to display connectors matching the search term.
5. 5. Click on the second page button in the paginator.
6. 6. Verify that the second page of search results is displayed.
7. 7. Reload the page.
8. 8. Validate that the search term and pagination state persist after the reload.
9. 9. Clear the search input by deleting all text and pressing Enter.
10. 10. Verify that the full list of connectors is displayed again.
11. 11. Test edge navigation by clicking the 'Last' button in the paginator.
12. 12. Verify that the last page of the connectors list is displayed.
13. 13. Navigate back to the first page using the 'First' button.
14. 14. Validate the search and pagination workflow using an invalid search term (e.g., 'NonExistentConnector').
15. 15. Confirm that a 'No results found' message is displayed.
16. 16. Reset the search and pagination state by refreshing the page.

#### Key Selectors:
- **Type**: input, **Text**: '', **Selector**: `input[data-testid='Connector-search-box']`, **Action**: type, **Value**: 'Test Connector' (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: 'First', **Selector**: `button[data-testid='paginator-first-page-button']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: 'Last', **Selector**: `button[data-testid='paginator-last-page-button']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: '«', **Selector**: `button[data-testid='arrow-left']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: '»', **Selector**: `button[data-testid='arrow-icon']`, **Action**: click (Page: https://dev.roost.ai/connectors)
#### Expected Results:
- Search results reflect the entered keyword.
- Pagination buttons navigate to the correct pages.
- Search term and pagination state persist after a page reload.
- Invalid search terms return a 'No results found' message.
- Clearing search input resets the list to display all connectors.

#### Edge Cases:
- Enter an empty search term and press Enter.
- Perform a search and navigate to a non-existent page number.
- Perform a search and manually refresh the browser without applying changes.
- Enter a search term with special characters (e.g., '@#$%^').
- Rapidly click multiple pagination buttons to test state consistency.

#### Data Requirements:
- search_term_valid: 'Test Connector'
- search_term_invalid: 'NonExistentConnector'
- search_term_special_chars: '@#$%^'
- empty_search_term: ''
- search_term_boundary: 'a'
**Test File:** [search_and_pagination_workflow_for_connectors.spec.js](./search_and_pagination_workflow_for_connectors.spec.js)
---

## Validate Error Message for Invalid Login
**Description:** This scenario tests the error handling of the login form when an invalid email or password is used. It ensures proper error messages are displayed without creating a session.
**Priority**: high | **Complexity**: high
**Tags**: performance, error-handling, api-integration, complex-scenario, auto-generated, authentication, ui-test, accessibility, form-submission, error_handling
**Type:** error_handling
**Pages Involved:**- https://docs.roost.ai/login
#### Steps:
1. 1. Navigate to https://docs.roost.ai/login.
2. 2. Verify the visibility of the email and password input fields.
3. 3. Verify the visibility of the 'Log In' button and ensure it is enabled.
4. 4. Enter an invalid email into the email input field.
5. 5. Enter a valid password into the password input field.
6. 6. Click the 'Log In' button.
7. 7. Verify that an error message is displayed saying 'Invalid email or password.'
8. 8. Clear the email and password fields.
9. 9. Enter a valid email into the email input field.
10. 10. Enter an invalid password into the password input field.
11. 11. Click the 'Log In' button.
12. 12. Verify that the same error message is displayed.
13. 13. Clear both input fields and leave them empty.
14. 14. Click the 'Log In' button.
15. 15. Verify that the error message indicates that both fields are required.

#### Key Selectors:
- **Type**: input, **Text**: 'Email', **Selector**: `input#email`, **Action**: type, **Value**: 'invalid_user@example.com' (Page: https://docs.roost.ai/login)- **Type**: input, **Text**: 'Password', **Selector**: `input#password`, **Action**: type, **Value**: 'InvalidPassword' (Page: https://docs.roost.ai/login)- **Type**: button, **Text**: 'Log In', **Selector**: `button.button`, **Action**: click (Page: https://docs.roost.ai/login)
#### Expected Results:
- An error message 'Invalid email or password.' is displayed when invalid credentials are used.
- No session token is created if login fails.
- The error message is cleared when the input fields are updated.

#### Edge Cases:
- Submit the form with only one field filled.
- Submit the form with both fields empty.
- Submit the form with special characters in the email field.
- Submit the form with a valid email but incorrect password multiple times consecutively.
- Submit the form with a SQL injection attempt in the email field.

#### Data Requirements:
- invalid_email: 'invalid_user@example.com'
- valid_password: 'SecurePassword123'
- valid_email: 'valid_user@example.com'
- invalid_password: 'InvalidPassword'
**Test File:** [validate_error_message_for_invalid_login.spec.js](./validate_error_message_for_invalid_login.spec.js)
---

## Verify Navigation Links Functionality Across the Header
**Description:** This scenario ensures that all navigation links in the header (e.g., 'RoostGPT', 'Admin', 'Connectors') direct users to the correct pages and are accessible across different viewports.
**Priority**: high | **Complexity**: high
**Tags**: network-resilience, performance, complex-scenario, auto-generated, responsive, ui-test, accessibility, navigation
**Type:** navigation
**Pages Involved:**- https://dev.roost.ai/roostgpt/tests- https://dev.roost.ai/roostgpt- https://dev.roost.ai/admin/app- https://dev.roost.ai/connectors
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/tests.
2. 2. Verify the presence and visibility of navigation links in the header.
3. 3. Click on the 'RoostGPT' link and ensure it navigates to https://dev.roost.ai/roostgpt.
4. 4. Verify the page title and URL to confirm successful navigation.
5. 5. Click on the 'Admin' link and ensure it navigates to https://dev.roost.ai/admin/app.
6. 6. Verify the page title and contents specific to the Admin page.
7. 7. Click on the 'Connectors' link and ensure it navigates to https://dev.roost.ai/connectors.
8. 8. Verify the Connectors page loads correctly with the expected content.
9. 9. Return to https://dev.roost.ai/roostgpt/tests and confirm the current state is preserved.
10. 10. Test each link on a mobile viewport (e.g., 375px width) to ensure accessibility.

#### Key Selectors:
- **Type**: link, **Text**: 'RoostGPT', **Selector**: `a[data-testid='roostGPT-tab']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: link, **Text**: 'Admin', **Selector**: `a[data-testid='admin-tab']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: link, **Text**: 'Connectors', **Selector**: `a[data-testid='connectors-tab']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)
#### Expected Results:
- Navigation to each page is successful.
- The expected content of each page is loaded correctly.
- All links function on both desktop and mobile viewports.

#### Edge Cases:
- Simulate slow network and test navigation behavior.
- Test navigation links with JavaScript disabled.
- Check behavior if a link's target page is unavailable (404 error).
- Test navigation links in incognito mode.
- Test with browser extensions that block JavaScript.
**Test File:** [verify_navigation_links_functionality_across_the_header.spec.js](./verify_navigation_links_functionality_across_the_header.spec.js)
---

## Navigation Between Tabs (Test Plans, Analysis, Generations)
**Description:** This scenario tests the navigation between the Test Plans, Analysis, and Generations tabs to ensure seamless transitions and proper page rendering.
**Priority**: high | **Complexity**: high
**Tags**: network-resilience, performance, complex-scenario, auto-generated, keyboard-navigation, ui-test, accessibility, navigation
**Type:** navigation
**Pages Involved:**- https://dev.roost.ai/roostgpt/tests- https://dev.roost.ai/roostgpt/analyses- https://dev.roost.ai/roostgpt/events
#### Steps:
1. 1. Start on the Test Plans page at https://dev.roost.ai/roostgpt/tests.
2. 2. Verify the 'Test Plans' tab is active.
3. 3. Click on the 'Analysis' tab.
4. 4. Verify that the URL changes to https://dev.roost.ai/roostgpt/analyses.
5. 5. Verify that the Analysis page content is rendered properly.
6. 6. Click on the 'Generations' tab.
7. 7. Verify that the URL changes to https://dev.roost.ai/roostgpt/events.
8. 8. Verify that the Generations page content is rendered properly.
9. 9. Click back to the 'Test Plans' tab.
10. 10. Verify that the URL changes back to https://dev.roost.ai/roostgpt/tests.
11. 11. Reload the Test Plans page and verify the active tab persists.
12. 12. Use keyboard navigation (Tab/Shift+Tab) to navigate between the tabs.
13. 13. Verify focus indicators are visible on each tab during keyboard navigation.
14. 14. Resize the browser window to test responsiveness of the tabs.
15. 15. Test navigation on a mobile device emulator.
16. 16. Click on the tabs multiple times in quick succession and verify no errors occur.
17. 17. Verify that browser back/forward buttons correctly navigate between the tabs.

#### Key Selectors:
- **Type**: link, **Text**: 'RoostGPT', **Selector**: `a[data-testid='roostGPT-tab']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: link, **Text**: 'Admin', **Selector**: `a[data-testid='admin-tab']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: link, **Text**: 'Connectors', **Selector**: `a[data-testid='connectors-tab']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)
#### Expected Results:
- The active tab is visually highlighted.
- Page content updates correctly without errors.
- The URL updates to match the selected tab.
- Navigation is responsive across different viewport sizes.
- Keyboard navigation successfully cycles through the tabs.

#### Edge Cases:
- Clicking on tabs while the page is still loading.
- Navigating back from a tab that no longer exists.
- Testing on a very low-resolution screen.
- Simulating slow network conditions.
- Pressing the browser's back button during tab navigation.

#### Data Requirements:
- Valid tab elements with unique data-testid attributes.
- Pre-rendered content for Analysis and Generations pages.
**Test File:** [navigation_between_tabs__test_plans__analysis__generations_.spec.js](./navigation_between_tabs__test_plans__analysis__generations_.spec.js)
---

## Search for Test Plans and Verify Results
**Description:** This scenario tests the 'Search for Test Plans' functionality to ensure that valid and edge case inputs return the correct results or appropriate error messages.
**Priority**: high | **Complexity**: high
**Tags**: performance, error-handling, api-integration, complex-scenario, auto-generated, data_validation, keyboard-navigation, ui-test, accessibility, form-submission
**Type:** data_validation
**Pages Involved:**- https://dev.roost.ai/roostgpt/tests
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/tests.
2. 2. Verify the visibility of the search input box labeled 'Search for Test Plans'.
3. 3. Type a valid test plan name into the search box.
4. 4. Press the Enter key or trigger the search functionality.
5. 5. Verify that the results in the test plans table match the search query.
6. 6. Clear the search input and type a random string that does not match any test plan.
7. 7. Press the Enter key or trigger the search functionality.
8. 8. Verify that an appropriate 'No results found' message is displayed.
9. 9. Clear the search input and enter SQL injection strings (e.g., ' OR 1=1 -- ).
10. 10. Press the Enter key or trigger the search functionality.
11. 11. Verify that the input is sanitized and no results or errors are displayed.
12. 12. Clear the search input and enter special characters (e.g., '@#$%^&*').
13. 13. Press the Enter key or trigger the search functionality.
14. 14. Verify that the input is sanitized and no results or errors are displayed.
15. 15. Reload the page and verify that the search query and results are reset.
16. 16. Type a valid test plan name and verify the result count matches the database record.
17. 17. Attempt to use the search input while the page is loading and verify no issues occur.
18. 18. Test the search field with extremely long strings and verify the application handles this gracefully.
19. 19. Use keyboard navigation (Tab/Shift+Tab) to focus on the search box and verify accessibility.
20. 20. Verify visually that the search input remains responsive across different screen sizes.

#### Key Selectors:
- **Type**: input, **Text**: 'Search for Test Plans', **Selector**: `input[data-testid='tests-search-box']`, **Action**: type (Page: https://dev.roost.ai/roostgpt/tests)
#### Expected Results:
- Results should correctly filter based on the search query for valid inputs.
- An appropriate 'No results found' message is displayed for invalid queries.
- SQL injection and special characters are sanitized to prevent security vulnerabilities.
- No errors or crashes occur when using edge case inputs.
- Search results reset after the page reloads.

#### Edge Cases:
- Entering special characters as a query.
- Using SQL injection strings as input.
- Typing an extremely long string.
- Using the search while the page is still loading.
- Typing a string with leading/trailing spaces.

#### Data Requirements:
- Valid test plan name: 'RegressionTest1'
- Invalid test plan name: 'NonExistentTestPlan'
- Special characters: '@#$%^&*()'
- SQL injection string: ' OR 1=1 --
- Long string: 'a'.repeat(5000)
**Test File:** [search_for_test_plans_and_verify_results.spec.js](./search_for_test_plans_and_verify_results.spec.js)
---

## Add New Connector Functionality
**Description:** This test validates the ability to add a new connector, ensuring that the form submission works correctly, handles errors gracefully, and updates the connectors list upon successful addition.
**Priority**: high | **Complexity**: high
**Tags**: network-resilience, performance, error-handling, api-integration, complex-scenario, auto-generated, data_validation, ui-test, accessibility, form-submission
**Type:** data_validation
**Pages Involved:**- https://dev.roost.ai/connectors
#### Steps:
1. 1. Navigate to https://dev.roost.ai/connectors.
2. 2. Click on the 'Add Connector' button (if available).
3. 3. Verify that the 'Add Connector' form is displayed.
4. 4. Fill out the connector name field with a valid name.
5. 5. Select an available connector type from a dropdown if present.
6. 6. Click the 'Submit' button.
7. 7. Verify that the new connector is added to the connectors list.
8. 8. Attempt to add a connector with a duplicate name.
9. 9. Verify that an error message is displayed indicating duplicate entries are not allowed.
10. 10. Attempt to submit the form without any data.
11. 11. Verify that validation messages appear for required fields.
12. 12. Validate the error handling by simulating a network failure during form submission.
13. 13. Refresh the page and verify the new connector persists in the list.

#### Key Selectors:
- **Type**: button, **Text**: 'Add Connector', **Selector**: `button[data-testid='add-connector-button']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: input, **Text**: '', **Selector**: `input[data-testid='connector-name']`, **Action**: type, **Value**: 'NewConnector' (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: 'Submit', **Selector**: `button[data-testid='submit-connector']`, **Action**: click (Page: https://dev.roost.ai/connectors)
#### Expected Results:
- The new connector is displayed in the connectors list after submission.
- Error messages are displayed for invalid or duplicate submissions.
- Validation errors are shown for missing required fields.
- Network errors during submission display appropriate error messages.

#### Edge Cases:
- Submit the form with a duplicate connector name.
- Submit the form with missing required fields.
- Simulate a network timeout during form submission.
- Attempt to add a connector with special characters in the name (e.g., '@#$%^').
- Refresh the page before submitting the form to ensure the form state is cleared.

#### Data Requirements:
- valid_connector_name: 'ValidConnector1'
- duplicate_connector_name: 'ExistingConnector'
- invalid_connector_name: '@#$%^'
- missing_required_field: ''
- boundary_connector_name: 'A'
**Test File:** [add_new_connector_functionality.spec.js](./add_new_connector_functionality.spec.js)
---

## Verify Test Plan Search Functionality with Valid and Invalid Inputs
**Description:** This scenario tests the behavior of the search functionality on the Test Plans page by providing valid, invalid, and edge-case inputs. It ensures that the search feature filters results correctly and handles invalid inputs gracefully.
**Priority**: high | **Complexity**: high
**Tags**: network-resilience, performance, error-handling, api-integration, complex-scenario, auto-generated, data_validation, ui-test, accessibility, form-submission
**Type:** data_validation
**Pages Involved:**- https://dev.roost.ai/roostgpt/tests
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/tests.
2. 2. Verify the visibility of the search input field with placeholder 'Search for Test Plans'.
3. 3. Type a valid search term (e.g., 'Regression') into the search box.
4. 4. Press Enter or wait for the results to auto-update.
5. 5. Verify that the results displayed match the search term.
6. 6. Clear the search box.
7. 7. Type an invalid search term (e.g., 'zzzzzzzz') and press Enter.
8. 8. Verify that no results are displayed and an appropriate message (e.g., 'No test plans found') is shown.
9. 9. Clear the search box again.
10. 10. Type a search term with special characters (e.g., '@#$%^&*') and press Enter.
11. 11. Verify that the system handles the input without crashing and displays either no results or a validation message.
12. 12. Test entering an extremely long string (e.g., 500+ characters).
13. 13. Verify the input field's handling of large inputs (e.g., truncation, error message).
14. 14. Perform a case-sensitivity test by entering a search term in uppercase and lowercase.
15. 15. Verify that search results are consistent regardless of case.
16. 16. Use the browser's refresh function and verify that any applied search filter is cleared.
17. 17. Validate that resetting the search box restores the full list of test plans.

#### Key Selectors:
- **Type**: input, **Text**: '', **Selector**: `input[data-testid='tests-search-box']`, **Action**: type, **Value**: 'Search term' (Page: https://dev.roost.ai/roostgpt/tests)
#### Expected Results:
- Search results correctly filter based on the valid search term.
- No results are displayed for invalid search terms, with an appropriate message shown.
- Special character inputs do not cause crashes or unhandled exceptions.
- Case-insensitive search produces consistent results.
- Long inputs are handled gracefully without breaking the UI.

#### Edge Cases:
- Enter a string with only special characters as input.
- Use an empty search input and press Enter.
- Test with duplicate search terms.
- Enter an invalid Unicode character.
- Simulate slow network conditions during search filtering.

#### Data Requirements:
- valid_search_term: 'Regression'
- invalid_search_term: 'zzzzzzzz'
- special_characters: '@#$%^&*'
- extremely_long_input: 'a'.repeat(500)
- case_sensitive_input: ['TestPlan', 'testplan']
**Test File:** [verify_test_plan_search_functionality_with_valid_and_invalid_inputs.spec.js](./verify_test_plan_search_functionality_with_valid_and_invalid_inputs.spec.js)
---

## Validate Successful Login with Correct Credentials
**Description:** This scenario tests the ability of a user to successfully log in using valid email and password credentials. The test ensures that proper authentication occurs and navigates to the dashboard post-login.
**Priority**: high | **Complexity**: high
**Tags**: performance, api-integration, complex-scenario, auto-generated, authentication, ui-test, accessibility
**Type:** authentication
**Pages Involved:**- https://docs.roost.ai/login- https://dev.roost.ai
#### Steps:
1. 1. Navigate to https://docs.roost.ai/login.
2. 2. Verify the visibility of the email and password input fields.
3. 3. Verify the visibility of the 'Log In' button and ensure it is enabled.
4. 4. Enter a valid email into the email input field.
5. 5. Enter a valid password into the password input field.
6. 6. Click the 'Log In' button.
7. 7. Wait for the page to navigate to https://dev.roost.ai.
8. 8. Verify that the navigation was successful by asserting the URL is https://dev.roost.ai.
9. 9. Verify that the dashboard elements are visible, including the user's dashboard header.
10. 10. Verify that user-specific information, such as name or email, is displayed on the dashboard.

#### Key Selectors:
- **Type**: input, **Text**: 'Email', **Selector**: `input#email`, **Action**: type, **Value**: 'valid_user@example.com' (Page: https://docs.roost.ai/login)- **Type**: input, **Text**: 'Password', **Selector**: `input#password`, **Action**: type, **Value**: 'SecurePassword123' (Page: https://docs.roost.ai/login)- **Type**: button, **Text**: 'Log In', **Selector**: `button.button`, **Action**: click (Page: https://docs.roost.ai/login)
#### Expected Results:
- User is successfully navigated to the dashboard at https://dev.roost.ai.
- The dashboard displays user-specific information, such as email or name.
- No error messages are displayed on the dashboard.

#### Edge Cases:
- Attempt login with an invalid password.
- Attempt login with an invalid email format.
- Attempt login with both email and password fields empty.
- Attempt login while the server is down.
- Verify that the session token is created and stored correctly in the browser's cookies or local storage.

#### Data Requirements:
- valid_email: 'valid_user@example.com'
- valid_password: 'SecurePassword123'
- invalid_email: 'invalid_email.com'
- invalid_password: 'wrongpassword'
- empty_email: ''
**Test File:** [validate_successful_login_with_correct_credentials.spec.js](./validate_successful_login_with_correct_credentials.spec.js)
---

