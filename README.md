# review-bot
A Slack Integration to remind reviewers of pending PRs in Github 🐨

## Setup

- Clone the repository `git clone git@github.com:abinavseelan/review-bot.git`
- Create a `config.js` file in the root of your project. Set the `slack_webhook` variable and export it.
```javascript
  module.exports = {
    slack_webhook: "<your slack integration\'s webhook>"
  };
```
- Deploy 🚀!
- On your github repository's settings, add a new webhook and set the payload url to your server's `/github` endpoint. (eg. `<domain/ip of server>/github`)
- Add the integration to your slack channel!





