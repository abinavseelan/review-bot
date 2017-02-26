const express = require('express'),
	app = express(),
	port = process.env.PORT || 1337,
	morgan = require('morgan'),
	helpers = require('./helpers'),
	constants = require('./constants'),
	bodyParser = require('body-parser');

// Configuration and Module Setup
app.listen(port, () => {
	console.log('App running on port ' + port);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Get messages from Github
app.post('/github', (request, response) => {
	let githubData = helpers.parseGithubData(JSON.parse(request.body.payload));

	if (githubData.action === constants.REVIEW_REQUESTED) {

		// Send information to Slack
		helpers.getRealName(githubData.reviewer)
			.then((reviewerName) => {
				helpers.sendNewPRPing(githubData, reviewerName);
			})
			.then((responseFromSlack) => {
				helpers.printSuccessMessage(responseFromSlack);
			})
			.catch((error) => {
				helpers.printErrorMessage(error);
			});
	}

	if (githubData.action === constants.SUBMITTED) {

		// Send Pull Request Status to Slack
		helpers.getRealName(githubData.assigner)
			.then((assignerName) => {
				helpers.sendPRStatusToSlack(githubData, assignerName);
			})
			.then((responseFromSlack) => {
				helpers.printSuccessMessage(responseFromSlack);
			})
			.catch((error) => {
				helpers.printErrorMessage(error);
			});
	}

	response.status(200).json({});
});

app.get('/ping', (request, response) => {
	response.json({
		"bot": "pong"
	});
});
