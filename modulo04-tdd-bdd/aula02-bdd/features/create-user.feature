Feature: Create Users API
  Background:
    Given I have a running server
    Given The current date is "2023-11-23T00:00"

  Scenario: Create a new user that is 23 years old and categorize them as young-adult
    When I create a new user with the following details:
      | name          | birthDay   |
      | Erick Wendel  | 2000-01-01 |

    Then I request the API with the user's ID
    Then I should receive a JSON response with the user's details
    Then The user's category should be "young-adult"

  Scenario: Error when creating a user who is younger than 18 years old
    When I create a young user with the following details:
      | name  | birthDay   |
      | Alice | 2009-01-01 |
    Then I should receive an error message that the user must be at least 18 years old

  Scenario: Create an adult user
    When I create a new adult user with the following details:
      | name     | birthDay   |
      | Jane     | 1980-01-01 |
    Then I request the API with the adult user's ID
    Then I should receive a JSON response with the adult user's details
    Then the adult user's category should be "adult"

  Scenario: Create a senior user
    When I create a new senior user with the following details:
      | name     | birthDay   |
      | Bob      | 1950-01-01 |
    Then I request the API with the senior user's ID
    Then I should receive a JSON response with the senior user's details
    Then the senior user's category should be "senior"

  Scenario: Error when creating a user with an empty name
    When I create a new user with the following (empty name) details:
      | name  | birthDay   |
      |       | 1980-01-01 |
    Then I should receive an error message that the name cannot be empty

  Scenario: Error when creating a user with an invalid birth date
    When I create a new user with the following (invalid birth date) details:
      | name  | birthDay   |
      | Eve   | 2024-01-01 |
    Then I should receive an error message that the birth date is invalid