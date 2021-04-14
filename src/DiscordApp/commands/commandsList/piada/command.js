module.exports = {
	name: 'piada',
	description: 'Piadas/Trocadilhos ruins!',
	deleteMsgOnSuccess: true,
	deleteMsgOnError: true,
	usage: global.bot_prefix+'piada',
	allowedChannels: [
		'botSpam',
		'adminSpam',
	],
	cooldown: 1,
	execute(message, args) {
		let textRet = '**Piadas Engraçadas!**';
		
		let piadas_prontas = require(process.cwd() + '/uploads/trocadilhos.json');
		let random_key = Math.floor(Math.random() * piadas_prontas.length);
		let piada = piadas_prontas[random_key];
		
		
		
		let embedMsg = new Discord.MessageEmbed()
		.setTitle(piada['pergunta'])
		.setDescription(piada['resposta'])
		.setColor(getRandColor());
		
		return {
			'text': textRet,
			'option': embedMsg,
		};
		
	},
};