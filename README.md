## Middleman Webpack

- [Middleman](https://middlemanapp.com)
- [Yarn](https://yarnpkg.com)
- [webpack](https://webpack.js.org) with [Babel](https://babeljs.org)
- [Sass](https://sass-lang.com)
- [Netlify CMS](https://www.netlifycms.org/)
- [PurgeCSS](https://purgecss.com/)

### Installation
```
gem install bundler
brew install yarn
```

```
bundle install
yarn install
```

### Development & Build

```
middleman server
middleman build --verbose
```

### Cucumber tests

```
brew tap homebrew/cask && brew cask install chromedriver
bundle exec cucumber
```
