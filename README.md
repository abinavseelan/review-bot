# Review-Bot
A Slack Integration to speed up Pull Requests Reviews for Organizations using Slack and Github 🐨

## Features: (as of Version 1.0)

- Supports Slack Notifications (messages) for the following events:  
  - Requesting a Reviewer for a Pull Request.
  - Approving a Pull Request.
  - Submitting a review with general comments.
  - Submitting a review requesting changes.
- Direct link to pull request in the Slack message.

## Setup - TL;DR version

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

## Setup - Full Guide:

The full guide will help you setup the bot to work with your Slack Channel and your Github Repository. The bot will be deployed to [Heroku](https://www.heroku.com/), a free and rather awesome Cloud hosting provider for NodeJS applications.

The only assumptions we will be making are that you know how to use the terminal and have some basic knowledge of Git and pushing to remote repositories. (If you've already used Github, then you know what a remote repository is! :smile:)

### Step 1: Clone the repository

![clonefromgithub](https://cloud.githubusercontent.com/assets/6417910/23833917/45261e7c-0773-11e7-804a-011b0068be1d.png)

Copy the link from the `Clone` Tab and in your terminal, clone the repository using the `$ git clone` command

`$ git clone https://github.com/abinavseelan/review-bot.git`

### Step 2: Create a Heroku Application

**Prerequisite:** The Heroku CLI is required to connect to Heroku via the Command Line. Visit [this setup guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up) to download the required dependencies.

Once you're all set with :point-up:, make sure you're inside the repository folder and run `heroku create`. This will create a Heroku application (technically a repository on Heroku) and the repository will be added as a remote repository to your local repository called `heroku`

![heroku remote](https://cloud.githubusercontent.com/assets/6417910/23833976/53c5562c-0774-11e7-8cd9-adb63b1a1131.png)

### Step 3: Create a Slack Incoming Integration

To create Slack Integration for your Slack Organization, head over to `https://<your_organization_name>.slack.com/apps/build/custom-integration` and click on `Incoming WebHooks`

![incomingwebhooklanding](https://cloud.githubusercontent.com/assets/6417910/23833999/ce2515b0-0774-11e7-8771-8fb9d63913e3.png)

This will take you to the Customization Page. There are a few things you can do here. You can set which channel you want the integration to be a part of, you can set the icon for the integration. The most important entity however is the Slack Webhook Url. Copy this URL!

![incomingwebhookcustomization](https://cloud.githubusercontent.com/assets/6417910/23834020/4f5401dc-0775-11e7-8e60-aa8fc922b5e3.png)

### Step 4: Create a Configuration File

In the root of the project, create a `config.js` file. In that file, add the following code.

```javascript
module.exports = {
  slack_webhook: "<paste_the_copied_slack_webhook_url_here>"
};
```

This tells our bot which URL to hit when information from pull requests comes to it.

### Step 5: Deploy to Heroku 🚀

You're all set! Now we just need to do one more thing to make this (or rather _your_) application live.

Inside the repository folder, commit the new `config.js` file using the `git commit` command. Once you've commited the file, you can push all the code to Heroku using `git push heroku master`. This will push all your local files to Heroku's remote repository. Heroku will now take those files and start the Bot for us. 

When you run the `git push heroku master` command, you'll see the build logs from Heroku. Once it's done, it will display the public url that your application/bot is running on. 

To test if your application is running or not, just visit `<heroku_public_url_for_your_app>/ping` on your browser and you should see the following output

![botpong](https://cloud.githubusercontent.com/assets/6417910/23834112/caa44db4-0776-11e7-9ce4-99687bdedc8e.png)

### Step 6: Configuring Github

Now that we have the _Bot_ up and running, we need to configure the github repositories for which we want the Bot to monitor Pull request activity.

Got to the repository you want to monitor and click on the `Settings` icon.

![settings](https://cloud.githubusercontent.com/assets/6417910/23834153/949a6d10-0777-11e7-9b76-b1cd46f68bf3.png)

Click on the `Webhooks` option on the side menu

![webhooklandin](https://cloud.githubusercontent.com/assets/6417910/23834154/96125216-0777-11e7-98bc-bf261e52fb3d.png)

Click on `Add Webhook` on the right side corner. You might be prompted for your Github Password. Once that's done, you should be taken to a screen that looks like this.

![webhook1](https://cloud.githubusercontent.com/assets/6417910/23834166/ce1d3540-0777-11e7-8744-4de0745d7ea6.png)

There, in the `payload url` section, add `<heroku_public_url_for_your_app>/github`.

Scroll down a little and you will see that you can choose what events you want Github to notify the Bot on. Choose the following options, just to reduce the load on the Bot.

![webhook2](https://cloud.githubusercontent.com/assets/6417910/23834165/cb0ad664-0777-11e7-94dc-7edef8503ab1.png)

And that's that! Click `Save` and you have a working Slack integration/bot that will monitor the configured repository for Pull Request Activity.


