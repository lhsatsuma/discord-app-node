module.exports = {
	name: 'teste',
	description: 'Teste Sub Command!',
	deleteMsgAfter: true,
	execute(message, args) {
		return new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Comando Secundario!');
	},
};