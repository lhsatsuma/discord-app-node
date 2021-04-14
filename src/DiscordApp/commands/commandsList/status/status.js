module.exports = {
	name: 'status',
	description: '[ADMIN] Status of System BOT',
	subCommands: {},
	deleteMsgOnSuccess: true,
	deleteMsgOnError: true,
	usage: () => {
		return global.bot_prefix+'status';
	},
	allowedChannels: [
		'adminSpam',
	],
	cooldown: 5,
	execute(message, args) {

		const ProcessRunning = require('../../../Process/ProcessRunning.js');
		let running = new ProcessRunning();
		let embedMsg = new Discord.MessageEmbed()
		.setColor(getColor('GREEN'))
		.setTitle('Status '+global.bot_cfg.discordOptions.name)
		.setDescription(running.mount_str_check_run())
        .setThumbnail('https://cdn.discordapp.com/icons/710607431410909185/e1e9494ab23f245cf12619a65518738c.jpg?size=512');
		
		return {
			text: '',
			option: embedMsg,
		}
	},
};