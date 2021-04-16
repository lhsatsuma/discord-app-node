module.exports = {
	name: 'add',
	description: '[ADMIN] Add New Server to BOT!',
	subCommands: {
		'guid': requireAgain('./commands/commandsList/server/subs/add/subs/guid.js'),
		'adminchannel': requireAgain('./commands/commandsList/server/subs/add/subs/adminchannel.js'),
		'spamchannel': requireAgain('./commands/commandsList/server/subs/add/subs/spamchannel.js'),
	},
	deleteMsgOnSuccess: false,
	deleteMsgOnError: false,
	usage: () => {
		return global.bot_prefix+'server add <guid,adminchannel,spamchannel>\"'
	},
	allowedChannels: [
		'774240024723193856',
	],
	async execute(message, args) {
		return 'argsError';
	},
};