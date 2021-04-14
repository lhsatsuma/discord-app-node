module.exports = {
	name: 'jokenpo',
	description: 'Pedra, Papel ou Tesoura!',
	subCommands: {
		'jogar': requireAgain('./commands/commandsList/jokenpo/subs/jogar.js'),
		'status': requireAgain('./commands/commandsList/jokenpo/subs/status.js'),
		'reset': requireAgain('./commands/commandsList/jokenpo/subs/reset.js'),
	},
	deleteMsgOnSuccess: true,
	deleteMsgOnError: true,
	usage: global.bot_prefix+'jokenpo jogar <pedra|papel|tesoura>',
	allowedChannels: [
		'botSpam',
		'adminSpam',
	],
	execute(message, args) {
		
		let text_ret = '**Pedra, Papel ou Tesoura!**';
		
		let description = '';
		
		description += "**Como jogar?**";
		description += "\nDigite: ``"+global.bot_prefix+"jokenpo jogar <pedra|papel|tesoura>``";
		description += "\nExemplo: ``"+global.bot_prefix+"jokenpo jogar pedra``";
		description += "\n\n**Como vejo minhas pontuações?**";
		description += "\nDigite: ``"+global.bot_prefix+"jokenpo status``";
		description += "\n\n**Como reseto minhas pontuações?**";
		description += "\nDigite: ``"+global.bot_prefix+"jokenpo reset``";
		
		
		let embedMsg = new Discord.MessageEmbed()
		.setColor(getColor('GREEN'))
		.setTitle('Comandos do "Pedra, Papel ou Tesoura"')
		.setDescription(description);
		
		
		return {
			text: text_ret,
			option: embedMsg,
		}
	},
};