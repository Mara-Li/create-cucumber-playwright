Feature: Display a message when submitting a form
  As a user, I want to submit a form with a message
  in order to see the message displayed on the page.

  Scenario: Submit a form with a message
    Given the user is on the form page
    When the user enters "Hello, World!" into the message field
    And the user clicks the submit button
    Then the message "Hello, World!" should be displayed on the page
