module.exports = {
	name: 'reloadcmd',
	description: '[ADMIN] Reload all commands',
	subCommands: {},
	deleteMsgOnSuccess: true,
	deleteMsgOnError: true,
	usage: () => {
		return global.bot_prefix+'reloadcmd';
	},
	allowedChannels: [
		'774240024723193856',
	],
	cooldown: 15,
	execute(message, args) {

        client.loadCommands();

		client.log.Info('commands reloaded!');
		
		let embedMsg = new Discord.MessageEmbed()
		.setColor(getColor('GREEN'))
		.setTitle('[ADMIN] Reload all commands')
		.setDescription('**commands reloaded!**');
		
		return {
			text: '',
			option: embedMsg,
		}
	},
};