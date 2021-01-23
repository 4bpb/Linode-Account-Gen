const chalk = require('chalk');
const Discord = require('discord.js');
const fs = require('fs');
var moment = require('moment');

let config = fs.readFileSync('config.json');
let parsedConfig = JSON.parse(config);

let webhookID = parsedConfig.webhookID;
let webhookToken = parsedConfig.webhookToken;

const hook = new Discord.WebhookClient(webhookID, webhookToken);

let log = function(msg, type, discord) {
	var time = moment().format('h:mm:ss ');

	if (discord === true) {
		hook
			.send(msg)
			.then(console.log(time + '   ' + chalk.green('Webhook Sent   ') + msg));

	} else {
		if (type === '') {
			console.log(time + '   ' + chalk.magenta('Start   ') + msg);
		}
		if (type === 'ok') {
			console.log(time + '   ' + chalk.green('Success   ') + msg);
		}
		if (type === 'err') {
			console.log(time + '   ' + chalk.red('Error   ') + msg);
		}
		if (type === 'info') {
			console.log(time + '   ' + chalk.cyan('Info   ') + msg);
		}
		if (type === 'init') {
			console.log(time + '   ' + chalk.yellow('Initializing   ') + msg);
		}
		if (type === 'res') {
			console.log(time + '   ' + chalk.gray('Restarting   ') + msg);
		}
	}
};

module.exports = log;