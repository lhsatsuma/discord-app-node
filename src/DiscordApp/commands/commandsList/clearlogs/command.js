module.exports = {
	name: 'clearlogs',
	description: '[ADMIN] Clear Log Files!',
	subCommands: {},
	deleteMsgOnSuccess: true,
	deleteMsgOnError: true,
	usage: global.bot_prefix+'clearlogs',
	allowedChannels: [
		'774240024723193856',
	],
	async execute(message, args) {
		
        await client.log.deleteLogs();

        client.log.Info('Logs excluidos!');
		
		let embedMsg = new Discord.MessageEmbed()
		.setColor(getColor('GREEN'))
		.setTitle('[ADMIN] Limpeza de Logs')
		.setDescription('**Logs excluídos com sucesso!**');
		
		
		return {
			text: '',
			option: embedMsg,
		}
	},
};