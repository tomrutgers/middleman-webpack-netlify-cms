# frozen_string_literal: true

Bundler.require(:default, :test)

require('capybara/cucumber')

middleman_app =
  ::Middleman::Application.new do
    config[:environment] = :test
  end

Capybara.app = ::Middleman::Rack.new(middleman_app).to_app
Capybara.asset_host = 'http://localhost:4567'
Capybara.server = :webrick

Capybara.register_driver(:selenium) do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

Capybara.default_driver = :selenium
