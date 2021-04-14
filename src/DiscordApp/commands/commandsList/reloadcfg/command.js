module.exports = {
	name: 'reloadcfg',
	description: '[ADMIN] Reload config settings',
	subCommands: {},
	deleteMsgOnSuccess: true,
	deleteMsgOnError: true,
	usage: global.bot_prefix+'reloadcfg',
	allowedChannels: [
		'774240024723193856',
	],
	cooldown: 60,
	execute(message, args) {

        requireAgain('../../config.js');

		client.log.Info('Config settings reloaded!');
		
		let embedMsg = new Discord.MessageEmbed()
		.setColor(getColor('GREEN'))
		.setTitle('[ADMIN] Reload config settings')
		.setDescription('**Config settings reloaded!**');
		
		return {
			text: '',
			option: embedMsg,
		}
	},
};