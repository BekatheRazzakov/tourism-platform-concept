@userLogin
Feature: Users
  We have registration and login pages.

  Scenario: User login
    Given I am on login page
    When I enter form fields:
      | username | user       |
      | password | 1qaz@WSX29 |
    And I click "Sign In" button
    Then I see "user" in user menu.