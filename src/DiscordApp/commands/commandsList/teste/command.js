module.exports = {
	name: 'teste',
	description: 'Teste Sub Command!',
	deleteMsgAfter: true,
	subCommands: {
		'testado': require('./subs/testado.js'),
	},
	deleteMsgOnSuccess: true,
	deleteMsgOnError: true,
	usage: 'cantada <usuario>',
	allowedChannels: [
		'botSpam',
		'adminSpam',
	],
	execute(message, args) {
		return new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Comando Principal!');
	},
};