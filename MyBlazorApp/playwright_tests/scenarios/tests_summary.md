# Generated Playwright Tests Summary

## Test RoostGPT Configuration Workflow with OpenAI API Token
**Description:** This scenario validates the end-to-end process of configuring RoostGPT using an OpenAI API token, including form inputs, validations, and proper state persistence.
**Priority**: high | **Complexity**: high
**Tags**: auto-generated, keyboard-navigation, ui-test, performance, form-submission, api-integration, data-validation, network-resilience, accessibility, complex-scenario, workflow
**Type:** workflow
**Pages Involved:**- https://dev.roost.ai/gptCLIForm
#### Steps:
1. 1. Navigate to https://dev.roost.ai/gptCLIForm.
2. 2. Verify the page title and visibility of the 'RoostGPT Config' link in the navigation bar.
3. 3. Locate the input field with placeholder 'roostGpt_test' and type the configuration name 'MyTestConfig'.
4. 4. Locate the input field with placeholder 'https://api.openai.com/v1/' and type 'https://api.openai.com/v1/my-endpoint'.
5. 5. Locate the password input field with placeholder 'Enter the Access Token' and type 'secure-token-123'.
6. 6. Click on the 'Show/Hide' button beside the password input to toggle its visibility.
7. 7. Ensure the password is displayed in plain text and then toggle it back to hidden.
8. 8. Verify the link to OpenAI API keys ('https://platform.openai.com/account/api-keys') is clickable and opens in a new tab.
9. 9. Submit the form and wait for a confirmation message indicating successful configuration.
10. 10. Reload the page and ensure the previously entered configuration data is retained.
11. 11. Test for persistence by navigating away from the page and then returning to verify the data is still populated.
12. 12. Verify the radio button with data-testid 'cloud-git-type-radio-button-selected' is selected by default.
13. 13. Test switching between the 'cloud' and 'server' radio buttons and ensure proper state change.
14. 14. Locate the checkbox labeled 'Traverse to all sub-directories' and toggle its value.
15. 15. Verify that the 'Check for Vulnerability' checkbox can be toggled on and off.
16. 16. Enter invalid data in the OpenAI API token field (e.g., 'invalid-token') and submit to verify error handling.
17. 17. Test accessibility by navigating through the form fields using only the keyboard (tab key).
18. 18. Simulate a network failure during form submission and verify that a proper error message is displayed.
19. 19. Test form reset functionality by clearing all the fields and verifying default values are restored.
20. 20. Verify the footer links ('About Roost', 'Privacy Policy', 'Documentation') navigate to the correct URLs.

#### Key Selectors:
- **Type**: input, **Text**: '', **Selector**: `input[placeholder='roostGpt_test']`, **Action**: type, **Value**: 'MyTestConfig' (Page: https://dev.roost.ai/gptCLIForm)- **Type**: input, **Text**: '', **Selector**: `input[placeholder='https://api.openai.com/v1/']`, **Action**: type, **Value**: 'https://api.openai.com/v1/my-endpoint' (Page: https://dev.roost.ai/gptCLIForm)- **Type**: input, **Text**: '', **Selector**: `input[placeholder='Enter the Access Token']`, **Action**: type, **Value**: 'secure-token-123' (Page: https://dev.roost.ai/gptCLIForm)- **Type**: button, **Text**: '', **Selector**: `button[data-testid='openai-token-unMask-icon']`, **Action**: click (Page: https://dev.roost.ai/gptCLIForm)- **Type**: a, **Text**: '', **Selector**: `a[href='https://platform.openai.com/account/api-keys']`, **Action**: click (Page: https://dev.roost.ai/gptCLIForm)- **Type**: input, **Text**: '', **Selector**: `input[data-testid='cloud-git-type-radio-button-selected']`, **Action**: click (Page: https://dev.roost.ai/gptCLIForm)- **Type**: label, **Text**: 'Traverse to all sub-directories', **Selector**: `label:contains('Traverse to all sub-directories')`, **Action**: click (Page: https://dev.roost.ai/gptCLIForm)- **Type**: label, **Text**: 'Check for Vulnerability', **Selector**: `label:contains('Check for Vulnerability')`, **Action**: click (Page: https://dev.roost.ai/gptCLIForm)
#### Expected Results:
- Form fields accept valid input and persist data after submission.
- Error messages are displayed for invalid inputs (e.g., incorrect OpenAI token).
- All footer links navigate to their respective pages correctly.
- Toggling the password field works as expected (show/hide).
- Checkboxes and radio buttons retain their state after interactions.

#### Edge Cases:
- Submit the form without filling any fields and check for validation errors.
- Enter a valid URL in the OpenAI API field but leave the token field empty.
- Toggle the password visibility multiple times rapidly and check for UI issues.
- Submit the form with an invalid OpenAI token and verify the error response.
- Simulate session timeout and ensure the user is prompted to log in again.

#### Data Requirements:
- Valid OpenAI API Token: 'secure-token-123'
- Invalid OpenAI API Token: 'invalid-token'
- Valid Configuration Name: 'MyTestConfig'
- Empty Configuration Name: ''
- Valid URL: 'https://api.openai.com/v1/my-endpoint'
**Test File:** [test_roostgpt_configuration_workflow_with_openai_api_token.spec.js](./test_roostgpt_configuration_workflow_with_openai_api_token.spec.js)
---

## Validate Search Functionality on 'Roost on GCP' Page
**Description:** This scenario tests the search functionality provided on the 'Roost on GCP' page, ensuring it accurately filters content within the book and provides relevant results.
**Priority**: high | **Complexity**: high
**Tags**: auto-generated, keyboard-navigation, ui-test, data_validation, performance, api-integration, responsive, accessibility, complex-scenario
**Type:** data_validation
**Pages Involved:**- https://docs.roost.ai/books/roost-on-gcp
#### Steps:
1. 1. Navigate to https://docs.roost.ai/books/roost-on-gcp.
2. 2. Verify that the search input field is visible and enabled.
3. 3. Enter a valid search term (e.g., 'testing') into the search field.
4. 4. Click the search button adjacent to the input field.
5. 5. Verify that the page reloads or dynamically updates to show filtered results.
6. 6. Capture the displayed results and validate they match the search term.
7. 7. Perform another search using a partial match term (e.g., 'test').
8. 8. Verify that the results are updated accordingly.
9. 9. Enter an invalid search term (e.g., 'xyz123') and perform a search.
10. 10. Verify that a 'No results found' message or equivalent feedback is displayed.
11. 11. Clear the search input field and perform a search.
12. 12. Verify that all content is displayed again as the search filter is removed.
13. 13. Repeat the search process in a different browser to validate cross-browser functionality.
14. 14. Verify responsiveness by testing the search functionality on a mobile viewport.
15. 15. Test accessibility features by interacting with the search field via keyboard navigation.
16. 16. Perform the search operation with a network delay to test for graceful degradation.

#### Key Selectors:
- **Type**: input, **Text**: '', **Selector**: `input[id='header-search-box-input']`, **Action**: type, **Value**: 'testing' (Page: https://docs.roost.ai/books/roost-on-gcp)- **Type**: button, **Text**: '', **Selector**: `button[id='header-search-box-button']`, **Action**: click (Page: https://docs.roost.ai/books/roost-on-gcp)
#### Expected Results:
- Search results dynamically update based on the entered term.
- Partial matches are included in the search results.
- Invalid search terms result in a 'No results found' message.
- Clearing the search field resets the page content to its original state.
- Search functionality works consistently across browsers and mobile devices.

#### Edge Cases:
- Search term exceeds maximum character limit.
- Search term contains only special characters.
- Search term is an empty string.
- Search field input contains non-English characters.
- Simultaneous searches are performed in different tabs.

#### Data Requirements:
- valid_search_term: 'testing'
- partial_search_term: 'test'
- invalid_search_term: 'xyz123'
- special_character_search_term: '@#$%^&*'
- non_english_search_term: '测试'
**Test File:** [validate_search_functionality_on__roost_on_gcp__page.spec.js](./validate_search_functionality_on__roost_on_gcp__page.spec.js)
---

## Navigation and State Persistence through Categories and Topics
**Description:** This test ensures the proper functionality of navigation links like Categories and Topics, validating state persistence and content rendering across multiple pages.
**Priority**: high | **Complexity**: high
**Tags**: auto-generated, keyboard-navigation, ui-test, performance, api-integration, responsive, network-resilience, accessibility, complex-scenario, navigation
**Type:** navigation
**Pages Involved:**- https://docs.roost.ai/- https://docs.roost.ai/shelves- https://docs.roost.ai/books
#### Steps:
1. 1. Navigate to https://docs.roost.ai/.
2. 2. Verify the visibility of the 'Categories' link.
3. 3. Click on the 'Categories' link.
4. 4. Wait for the page to load and verify navigation to https://docs.roost.ai/shelves.
5. 5. Verify that the categories page displays expected sections like 'Roost Admin Guide' and 'Roost User Guide'.
6. 6. Click on the 'Topics' link on the navigation menu using its selector.
7. 7. Wait for the page to load and verify navigation to https://docs.roost.ai/books.
8. 8. Verify that the topics page displays expected items like 'Export Jira Ticket' and 'RoostGPT'.
9. 9. Navigate back to the categories page and verify state persistence.
10. 10. Refresh the categories page and verify that it reloads correctly.
11. 11. Modify viewport to mobile dimensions and verify responsive design elements.
12. 12. Test navigation using keyboard inputs (e.g., tab and enter keys).
13. 13. Verify that navigation persists when switching between mobile and desktop views.
14. 14. Navigate back to the homepage using the browser back button and verify visibility of all links on the homepage.
15. 15. Test navigation to pages with broken links (if applicable, mock 404 responses).

#### Key Selectors:
- **Type**: link, **Text**: 'Categories', **Selector**: `a[href='https://docs.roost.ai/shelves']`, **Action**: click (Page: https://docs.roost.ai/)- **Type**: link, **Text**: 'Topics', **Selector**: `a[href='https://docs.roost.ai/books']`, **Action**: click (Page: https://docs.roost.ai/)
#### Expected Results:
- Navigation links work correctly and load appropriate pages.
- Categories and topics pages display relevant content.
- State persists when navigating back and forth between pages.

#### Edge Cases:
- Attempt navigation during a network failure.
- Test navigation to a non-existent category or topic.
- Test navigation with screen reader tools to verify accessibility.
- Test keyboard navigation using the tab and enter keys.
- Verify navigation when switching between mobile and desktop views.

#### Data Requirements:
- Valid category: 'Roost Admin Guide'
- Valid topic: 'Export Jira Ticket'
- Invalid category: 'NonExistentCategory'
- Invalid topic: 'NonExistentTopic'
**Test File:** [navigation_and_state_persistence_through_categories_and_topics.spec.js](./navigation_and_state_persistence_through_categories_and_topics.spec.js)
---

## Accessibility Compliance for Login Page
**Description:** This test ensures that the login page complies with WCAG guidelines, ensuring accessibility for users with disabilities.
**Priority**: high | **Complexity**: high
**Tags**: accessibility, auto-generated, keyboard-navigation, ui-test, authentication, complex-scenario
**Type:** accessibility
**Pages Involved:**- https://dev.roost.ai/login
#### Steps:
1. 1. Navigate to 'https://dev.roost.ai/login'.
2. 2. Verify all interactive elements are focusable via the keyboard.
3. 3. Use a screen reader to navigate the page and verify proper element labeling.
4. 4. Ensure all images (if any) have alternative text or ARIA labels.
5. 5. Validate color contrast ratios for all text and background elements.
6. 6. Verify that all links have descriptive and unique text.
7. 7. Check that form controls (if any) include associated labels.
8. 8. Simulate high-contrast mode and verify the page renders correctly.
9. 9. Ensure that no elements are hidden from assistive technologies.
10. 10. Test keyboard navigation through the social login buttons.
11. 11. Test tab order to ensure logical navigation sequence.
12. 12. Validate that error messages (if any) are announced by screen readers.
13. 13. Simulate zooming to 200% and verify proper rendering.
14. 14. Test dynamic content updates with ARIA live regions (if applicable).

#### Key Selectors:
- **Type**: link, **Text**: 'Login', **Selector**: `a.nav-link`, **Action**: assert_visibility (Page: https://dev.roost.ai/login)- **Type**: link, **Text**: '', **Selector**: `a.google`, **Action**: assert_visibility (Page: https://dev.roost.ai/login)- **Type**: link, **Text**: '', **Selector**: `a.git`, **Action**: assert_visibility (Page: https://dev.roost.ai/login)
#### Expected Results:
- All interactive elements are accessible via keyboard navigation.
- Screen readers announce proper labels and descriptions.
- Color contrast ratios meet WCAG 2.1 AA standards.
- Page layout remains intact during zooming or high-contrast mode.

#### Edge Cases:
- Interactive elements without proper focus states.
- Missing ARIA labels for dynamic content.
- Navigation breaks when using only keyboard inputs.
- Improper tab order leading to user confusion.
**Test File:** [accessibility_compliance_for_login_page.spec.js](./accessibility_compliance_for_login_page.spec.js)
---

## Search Functionality Validation Across Pages
**Description:** This scenario tests the search functionality provided on the documentation portal and its ability to return relevant results for different queries, while ensuring proper navigation and state persistence.
**Priority**: high | **Complexity**: high
**Tags**: auto-generated, ui-test, performance, api-integration, network-resilience, accessibility, complex-scenario, workflow
**Type:** workflow
**Pages Involved:**- https://docs.roost.ai/- https://docs.roost.ai/search
#### Steps:
1. 1. Navigate to https://docs.roost.ai/.
2. 2. Verify that the search input field is visible and enabled.
3. 3. Type the query 'Export Jira Ticket' into the search field using selector for input box.
4. 4. Click the search button using its selector.
5. 5. Wait for the page to load and verify that the URL changes to https://docs.roost.ai/search.
6. 6. Verify that search results contain links related to 'Export Jira Ticket' such as 'Export Single Jira Ticket as XML'.
7. 7. Click on the first search result using its selector.
8. 8. Verify navigation to the respective page (e.g., https://docs.roost.ai/books/export-jira-ticket-in-xml).
9. 9. Navigate back to the search page using browser back functionality.
10. 10. Verify that the search query 'Export Jira Ticket' is still visible in the search input field.
11. 11. Modify the query to 'RoostGPT' using the search input field.
12. 12. Click the search button and verify updated results related to 'RoostGPT'.
13. 13. Click on a result like 'CLI' from the updated list using the selector.
14. 14. Verify navigation to the respective page (e.g., https://docs.roost.ai/books/roostgpt/page/cli).
15. 15. Repeat the navigation back to the original search page and verify state persistence.
16. 16. Test the search functionality with an invalid query like 'NonExistentTerm'.
17. 17. Verify the presence of a no results message or empty result state.
18. 18. Refresh the page and validate that search state is retained.

#### Key Selectors:
- **Type**: input, **Text**: '', **Selector**: `#header-search-box-input`, **Action**: type, **Value**: 'Export Jira Ticket' (Page: https://docs.roost.ai/)- **Type**: button, **Text**: '', **Selector**: `#header-search-box-button`, **Action**: click (Page: https://docs.roost.ai/)- **Type**: link, **Text**: 'Export Jira Ticket in XML', **Selector**: `a[href='https://docs.roost.ai/books/export-jira-ticket-in-xml']`, **Action**: click (Page: https://docs.roost.ai/search)
#### Expected Results:
- Search results are correctly displayed for valid queries.
- No results message is displayed for invalid queries.
- Navigation works correctly between search results and their respective pages.
- Search query state persists after navigating back to the search page.

#### Edge Cases:
- Submit search with an empty query.
- Search with special characters or SQL injection terms like '; DROP TABLE users;'.
- Perform a search during a network failure and verify error handling.
- Search with extremely long text input.
- Search with mixed case sensitivity to test case-insensitive matching.

#### Data Requirements:
- {'valid_query': 'Export Jira Ticket'}
- {'invalid_query': 'NonExistentTerm'}
- {'malicious_input': "'; DROP TABLE users;"}
- {'long_input': 'A very long input string exceeding typical query lengths.'}
- {'case_sensitive_input': 'RoostGPT'}
**Test File:** [search_functionality_validation_across_pages.spec.js](./search_functionality_validation_across_pages.spec.js)
---

## File Export Validation for 'Roost on GCP' Page
**Description:** This test scenario validates the file export functionality on the 'Roost on GCP' page. It ensures exported files are correctly generated and accessible in the specified formats (HTML, PDF, Plain Text, Markdown).
**Priority**: high | **Complexity**: high
**Tags**: auto-generated, file-upload, ui-test, performance, form-submission, api-integration, accessibility, complex-scenario, file-download, workflow
**Type:** workflow
**Pages Involved:**- https://docs.roost.ai/books/roost-on-gcp
#### Steps:
1. 1. Navigate to https://docs.roost.ai/books/roost-on-gcp.
2. 2. Verify the visibility and functionality of export options (HTML, PDF, Plain Text, Markdown).
3. 3. Click the HTML export link.
4. 4. Wait for the file to download and verify its content.
5. 5. Repeat the process for the PDF export link.
6. 6. Open the PDF file and ensure it displays correctly in a PDF viewer.
7. 7. Click the Plain Text export link.
8. 8. Verify that the downloaded file contains text data with appropriate formatting.
9. 9. Click the Markdown export link.
10. 10. Open the file and ensure it adheres to proper Markdown syntax.
11. 11. Test file export links in a different browser.
12. 12. Verify that file export formats are consistent across browsers.
13. 13. Simulate a network failure during the download process.
14. 14. Verify that an appropriate error message or retry mechanism is displayed.
15. 15. Test file export functionality on mobile devices to ensure responsiveness.

#### Key Selectors:
- **Type**: a, **Text**: 'Contained Web File.html', **Selector**: `a[href*='export/html']`, **Action**: click (Page: https://docs.roost.ai/books/roost-on-gcp)- **Type**: a, **Text**: 'PDF File.pdf', **Selector**: `a[href*='export/pdf']`, **Action**: click (Page: https://docs.roost.ai/books/roost-on-gcp)- **Type**: a, **Text**: 'Plain Text File.txt', **Selector**: `a[href*='export/plaintext']`, **Action**: click (Page: https://docs.roost.ai/books/roost-on-gcp)- **Type**: a, **Text**: 'Markdown File.md', **Selector**: `a[href*='export/markdown']`, **Action**: click (Page: https://docs.roost.ai/books/roost-on-gcp)
#### Expected Results:
- Files are successfully downloaded in the selected format.
- HTML file renders correctly in a browser.
- PDF file opens and displays correctly in a PDF viewer.
- Plain Text file contains properly formatted text.
- Markdown file adheres to Markdown syntax standards.

#### Edge Cases:
- Export file link is broken or unavailable.
- Downloaded file is corrupted or incomplete.
- Network failure during file export process.
- File export functionality is tested with insufficient storage on the device.
- File names contain invalid characters or exceed the file system's limit.

#### Data Requirements:
- valid_html_export_link: 'https://docs.roost.ai/books/roost-on-gcp/export/html'
- valid_pdf_export_link: 'https://docs.roost.ai/books/roost-on-gcp/export/pdf'
- valid_plaintext_export_link: 'https://docs.roost.ai/books/roost-on-gcp/export/plaintext'
- valid_markdown_export_link: 'https://docs.roost.ai/books/roost-on-gcp/export/markdown'
**Test File:** [file_export_validation_for__roost_on_gcp__page.spec.js](./file_export_validation_for__roost_on_gcp__page.spec.js)
---

## Search Input Validation and Results Page Rendering
**Description:** This scenario tests the functionality of the search input field in the header, including validation of input data, redirection to the results page, and rendering of results based on search terms.
**Priority**: high | **Complexity**: high
**Tags**: auto-generated, ui-test, data_validation, performance, form-submission, api-integration, data-validation, network-resilience, accessibility, complex-scenario
**Type:** data_validation
**Pages Involved:**- https://docs.roost.ai/shelves/roost-admin-guide- https://docs.roost.ai/search
#### Steps:
1. 1. Navigate to https://docs.roost.ai/shelves/roost-admin-guide.
2. 2. Verify visibility of the search input field and its placeholder text.
3. 3. Type a valid search term (e.g., 'Admin Guide') into the search input field.
4. 4. Click the 'Search' button.
5. 5. Verify redirection to https://docs.roost.ai/search.
6. 6. Assert the presence of search results matching the term 'Admin Guide'.
7. 7. Validate that the search results include appropriate titles and descriptions.
8. 8. Test search functionality with an invalid input (e.g., '%%%').
9. 9. Verify that no results are displayed and an error message is shown.
10. 10. Clear the search field and test submission of an empty search term.
11. 11. Validate that the system does not break and provides meaningful feedback (e.g., 'No search term entered').
12. 12. Perform additional search with different valid terms and verify results.

#### Key Selectors:
- **Type**: input, **Text**: 'Search', **Selector**: `input[id='header-search-box-input']`, **Action**: type, **Value**: 'Admin Guide' (Page: https://docs.roost.ai/shelves/roost-admin-guide)- **Type**: button, **Text**: 'Search', **Selector**: `button[id='header-search-box-button']`, **Action**: click (Page: https://docs.roost.ai/shelves/roost-admin-guide)
#### Expected Results:
- Valid search term redirects to the results page and displays matching results.
- Invalid search term returns no results and displays an error message.
- Empty search term is handled gracefully and provides user feedback.
- Search results include appropriate titles and descriptions.

#### Edge Cases:
- Submitting a search term with special characters (e.g., '!@#$').
- Searching with terms exceeding the maximum length allowed.
- Performing a search under high network latency conditions.
- Submitting multiple rapid searches and verifying system response.
- Typing rapidly and pressing 'Enter' instead of the 'Search' button.

#### Data Requirements:
- Valid search term: 'Admin Guide'
- Invalid search term: '%%%@@##'
- Empty search term
- Search term with special characters: '!@#$%^'
**Test File:** [search_input_validation_and_results_page_rendering.spec.js](./search_input_validation_and_results_page_rendering.spec.js)
---

## Social Login Authentication Workflow for Multiple Providers
**Description:** This scenario validates the social login functionality using various providers (Google, GitHub, Microsoft, Okta, Auth0, PingID) available on the login page. It ensures proper redirection, state handling, and error conditions when logging in through each provider.
**Priority**: high | **Complexity**: high
**Tags**: accessibility, auto-generated, ui-test, performance, error-handling, api-integration, authentication, complex-scenario
**Type:** authentication
**Pages Involved:**- https://dev.roost.ai/login
#### Steps:
1. 1. Navigate to 'https://dev.roost.ai/login'.
2. 2. Verify visibility and accessibility of all social login buttons.
3. 3. Click on the 'Google Login' button.
4. 4. Confirm redirection to Google's OAuth login page.
5. 5. Simulate successful authentication and redirection back to 'https://dev.roost.ai/login'.
6. 6. Verify user is automatically redirected to the application dashboard.
7. 7. Logout and return to the login page.
8. 8. Click on the 'GitHub Login' button.
9. 9. Confirm redirection to GitHub's OAuth login page.
10. 10. Simulate failed authentication and verify an appropriate error message is displayed on 'https://dev.roost.ai/login'.
11. 11. Repeat steps 3-10 for Microsoft, Okta, Auth0, and PingID login buttons.
12. 12. Test session persistence by refreshing the page after successful login.
13. 13. Verify that protected routes are accessible after login.
14. 14. Test behavior when login is interrupted (browser closed or network failure).
15. 15. Validate logout functionality after login using each provider.
16. 16. Use browser dev tools to simulate token expiry and verify re-authentication request.

#### Key Selectors:
- **Type**: link, **Text**: '', **Selector**: `a.google`, **Action**: click (Page: https://dev.roost.ai/login)- **Type**: link, **Text**: '', **Selector**: `a.git`, **Action**: click (Page: https://dev.roost.ai/login)- **Type**: link, **Text**: '', **Selector**: `a.azure`, **Action**: click (Page: https://dev.roost.ai/login)- **Type**: link, **Text**: '', **Selector**: `a.okta`, **Action**: click (Page: https://dev.roost.ai/login)- **Type**: link, **Text**: '', **Selector**: `a.auth0`, **Action**: click (Page: https://dev.roost.ai/login)- **Type**: link, **Text**: '', **Selector**: `a.pingFederate`, **Action**: click (Page: https://dev.roost.ai/login)
#### Expected Results:
- User is redirected to the correct OAuth provider login page.
- User is authenticated successfully and redirected to the dashboard.
- Error message is displayed when authentication fails.
- Session persists after page refresh.
- User can access protected routes after login.

#### Edge Cases:
- OAuth callback URL is incorrect.
- Token expires while the user is logged in.
- Login buttons are clicked multiple times in quick succession.
- Network failure during redirection to the OAuth provider.
- Simulate invalid or tampered OAuth tokens.

#### Data Requirements:
- OAuth client IDs and secrets for each provider.
- Valid user credentials for Google, GitHub, Microsoft, Okta, Auth0, and PingID.
- Invalid credentials for each provider.
- Simulated expired or invalid OAuth tokens.
**Test File:** [social_login_authentication_workflow_for_multiple_providers.spec.js](./social_login_authentication_workflow_for_multiple_providers.spec.js)
---

## Category Navigation and State Persistence
**Description:** This scenario tests navigation between categories, persistence of selection state, and verification of the resulting page content based on the selected category.
**Priority**: high | **Complexity**: high
**Tags**: auto-generated, ui-test, performance, api-integration, accessibility, complex-scenario, workflow
**Type:** workflow
**Pages Involved:**- https://docs.roost.ai/shelves/roost-admin-guide- https://docs.roost.ai/search?term=%5BCategory%5D- https://docs.roost.ai/search?term=%5BCategory%3DAdmin+Guide%5D
#### Steps:
1. 1. Navigate to https://docs.roost.ai/shelves/roost-admin-guide.
2. 2. Verify the visibility of 'Category' link and assert its text content.
3. 3. Click on the 'Category' link.
4. 4. Verify that the page is redirected to https://docs.roost.ai/search?term=%5BCategory%5D.
5. 5. Assert the presence of 'Admin Guide' link on the category page.
6. 6. Click on the 'Admin Guide' link.
7. 7. Verify that the page is redirected to https://docs.roost.ai/search?term=%5BCategory%3DAdmin+Guide%5D.
8. 8. Assert that the content of the 'Admin Guide' page is correctly displayed.
9. 9. Verify that the breadcrumb or navigation menu reflects the correct navigation path.
10. 10. Refresh the 'Admin Guide' page and ensure that the content remains persistent.
11. 11. Navigate back to https://docs.roost.ai/shelves/roost-admin-guide and assert visibility of the previously clicked links.
12. 12. Validate that no additional state changes occurred unexpectedly.

#### Key Selectors:
- **Type**: link, **Text**: 'Category', **Selector**: `a[href='https://docs.roost.ai/search?term=%5BCategory%5D']`, **Action**: click (Page: https://docs.roost.ai/shelves/roost-admin-guide)- **Type**: link, **Text**: 'Admin Guide', **Selector**: `a[href='https://docs.roost.ai/search?term=%5BCategory%3DAdmin+Guide%5D']`, **Action**: click (Page: https://docs.roost.ai/search?term=%5BCategory%5D)
#### Expected Results:
- The 'Category' link navigates to the correct category page.
- The 'Admin Guide' link navigates to the correct admin guide page.
- Content on the 'Admin Guide' page is correctly displayed.
- Breadcrumb reflects the correct navigation path.
- Refreshing the 'Admin Guide' page retains the state of the content.

#### Edge Cases:
- Clicking on a category link that redirects to a non-existent page.
- Refreshing the page midway during navigation.
- Testing navigation with different browsers and ensuring consistent behavior.
- Navigating back to the previous page and verifying state reset.
- Testing navigation links with disabled state.

#### Data Requirements:
- Valid category name: 'Admin Guide'
- Invalid category name: 'NonExistentCategory'
- Empty category name
- Category name with special characters: 'Admin%Guide'
**Test File:** [category_navigation_and_state_persistence.spec.js](./category_navigation_and_state_persistence.spec.js)
---

