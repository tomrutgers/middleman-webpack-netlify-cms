# language: en
Feature: homepage
  I expect the homepage to work

  Scenario:
    When I visit the homepage
    Then I should see the text 'Hello world'
