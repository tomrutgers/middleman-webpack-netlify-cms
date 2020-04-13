# frozen_string_literal: true

When('I visit the homepage') do
  visit('/')
end

Then('I should see the text {string}') do |string|
  expect(page).to(have_content(string))
end
