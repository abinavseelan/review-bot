module.exports = {
	newPRMessage: (data, reviewerName) => {
		return {
			"attachments": [
				{
					"fallback": "Review Requested",
					"color": "#f1c40f",
					"fields": [
						{
							"title": "New Review Request",
							"value": "*Hey " + reviewerName.name +"* " +
								"\n" + data.assigner + " needs your review!" +
								"\nTime to stock up some :cookie: and :coffee:, and give that PR some :heart:" +
								"\n\n<" + data.PRUrl + "|View Pull Request>",
							"mrkdwn": true
						}
					],
					"mrkdwn_in": ["fields"],
				}
			]
		}
	},
	PRApprovedMessage: (data, assignerName) => {
		return {
			"attachments": [
				{
					"fallback": "Pull Request Approved!",
					"color": "#1abc9c",
					"fields": [
						{
							"title": "PR Approved",
							"value": "*Hey " + assignerName.name + "* " +
								"\n" + data.reviewer + " has approved your PR! :tada:"+
								"\n\n<" + data.PRUrl + "|View Pull Request>",
							"mrkdwn": true
						}
					],
					"mrkdwn_in": ["fields"],
				}
			]
		}
	},
	PRCommentedMessage: (data, assignerName) => {
		return {
			"attachments": [
				{
					"fallback": "New Comments on Pull Request",
					"color": "#f1c40f",
					"fields": [
						{
							"title": "PR Approved",
							"value": "*Hey " + assignerName.name + "* " +
								"\n" + data.reviewer + " has added some general comments to your PR. :comment:"+
								"\n\n<" + data.PRUrl + "|View Pull Request>",
							"mrkdwn": true
						}
					],
					"mrkdwn_in": ["fields"],
				}
			]
		}
	},
	PRRejectedMessage: (data, assignerName) => {
		return {
			"attachments": [
				{
					"fallback": "Changes requested on Pull Request",
					"color": "#e74c3c",
					"fields": [
						{
							"title": "PR Approved",
							"value": "*Hey " + assignerName.name + "* " +
								"\n" + data.reviewer + " has requested changes to your PR. You might need to take a look. :eyes:"+
								"\n\n<" + data.PRUrl + "|View Pull Request>",
							"mrkdwn": true
						}
					],
					"mrkdwn_in": ["fields"],
				}
			]
		}
	}
};
