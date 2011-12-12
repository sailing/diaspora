@javascript
Feature: following a user (without adding them to a specific aspect)
    In order to be less stressed about friending people
    As a follower
    I want to be able to just click follow

    Background:
      Given a user with username "bob"
      And a user with username "alice"
      And I sign in as "bob@bob.bob"
      When I am on "alice@alice.alice"'s page
      And I press "Follow"
      Then I should see "You have started following alice!"

    Scenario: following someone
      Given "alice@alice.alice" has a public post with text "can you see this?"
      When I am on the home page
      Then I should see "can you see this?"

    Scenario: mutual following
      When I log out
      And I sign in as "alice@alice.alice"
      And I am on "bob@bob.bob"'s page
      When I press "Follow"
      Then I should see "You are now following bob!"

      When I log out
      And I sign in as "bob@bob.bob"
      When I expand the publisher
      And I fill in "status_message_fake_text" with "yup, totally!"
      And I press "Share"

      When I log out
      And I sign in as "alice@alice.alice"
      Then I should see "yup, totally!"
