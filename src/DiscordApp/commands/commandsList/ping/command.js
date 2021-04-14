module.exports = {
	name: 'ping',
	description: 'Ping!',
	deleteMsgAfter: true,
	usage: global.bot_prefix+'ping',
	execute(message, args) {
		
		return new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Ping recebido!')
		.setDescription("Data: "+(new Date().toLocaleString('pt-BR')));
	},
};