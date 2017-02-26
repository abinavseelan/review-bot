let messages = require('./messages'),
	constants = require('./constants'),
	request = require('request'),
	config = require('./config');

module.exports = {
	parseGithubData : (payload) => {
		return {
			assigner: payload.pull_request.user.login || '',
			reviewer: payload.requested_reviewer ? payload.requested_reviewer.login :
				(payload.review ? payload.review.user.login : ''),
			PRUrl: module.exports.getGithubUrl(payload.pull_request.html_url),
			action: payload.action || '',
			state: payload.review ? payload.review.state : ''
		}
	},
	getGithubUrl : (escapedURL) => {
		return escapedURL.replace(/\\/, '');
	},
	sendNewPRPing : (data, reviewerName) => {
		let promise = new Promise((resolve, reject) => {
			request.post({
				url: config.slack_webhook,
				json: messages.newPRMessage(data, reviewerName)
			}, (err, httpResponse, body) => {
				if (err) {
					reject({
							"error" : true,
							"httpResponse": httpResponse,
							"body": err
					});
				}
				resolve({
					"error": false,
					"body": body
				});
			});
		});

		return promise;
	},
	sendPRApprovedPing : (data, assignerName) => {
		let promise = new Promise((resolve, reject) => {
			request.post({
				url: config.slack_webhook,
				json: messages.PRApprovedMessage(data, assignerName)
			}, (err, httpResponse, body) => {
				if (err) {
					reject({
							"error" : true,
							"httpResponse": httpResponse,
							"body": err
					});
				}
				resolve({
					"error": false,
					"body": body
				});
			});
		});

		return promise;
	},
	sendPRRejectedPing : (data, assignerName) => {
		let promise = new Promise((resolve, reject) => {
			request.post({
				url: config.slack_webhook,
				json: messages.PRRejectedMessage(data, assignerName)
			}, (err, httpResponse, body) => {
				if (err) {
					reject({
							"error" : true,
							"httpResponse": httpResponse,
							"body": err
					});
				}
				resolve({
					"error": false,
					"body": body
				});
			});
		});

		return promise;
	},
	sendPRCommentedPing : (data, assignerName) => {
		let promise = new Promise((resolve, reject) => {
			request.post({
				url: config.slack_webhook,
				json: messages.PRCommentedMessage(data, assignerName)
			}, (err, httpResponse, body) => {
				if (err) {
					reject({
							"error" : true,
							"httpResponse": httpResponse,
							"body": err
					});
				}
				resolve({
					"error": false,
					"body": body
				});
			});
		});

		return promise;
	},
	sendPRStatusToSlack : (githubData, assignerName) => {
		if (githubData.state === constants.APPROVED) {
			module.exports.sendPRApprovedPing(githubData, assignerName);
		}
		else if (githubData.state === constants.CHANGES_REQUESTED) {
			module.exports.sendPRRejectedPing(githubData, assignerName);
		}
		else if (githubData.state === constants.COMMENTED) {
			module.exports.sendPRCommentedPing(githubData, assignerName);
		}
	},
	getRealName : (githubName) => {
		let promise = new Promise((resolve, reject) => {
			request.get({
				url: 'https://api.github.com/users/' + githubName,
				headers: {
					'User-Agent': 'review-bot'
				}
			}, (err, httpResponse, body) => {
				body = JSON.parse(body);
				if (err) {
					reject({
						"error": true,
						"httpResponse": httpResponse,
						"body": err
					});
				}
				resolve({
					"githubUsername": body.login,
					"name": body.name
				});
			});
		});

		return promise;
	},
	printSuccessMessage : (response) => {
		console.log('\n\n======= SUCCESS! =======');
		console.log('Success: ', response);
	},
	printErrorMessage : (err) => {
		console.log('\n\n======= ERROR! ========');
		console.log('Error: ', err);
	}
};
