module.exports = {
	name: 'velha',
	description: 'Jogo da Velha!',
	subCommands: {},
	deleteMsgOnSuccess: true,
	deleteMsgOnError: true,
	usage: global.bot_prefix+'velha <iniciar,parar,marcar,mostrar>',
	allowedChannels: [
		'adminSpam',
	],
    cooldown: 5,
	execute(message, args) {
		
		let text_ret = '**Jogo da Velha!**';

        let description = '**GABARITO DA GRADE:**';
        description += "\n**1** | **2** | **3**";
        description += "\n**4** | **5** | **6**";
        description += "\n**7** | **8** | **9**";
        description += "\n\n**Como iniciar um jogo?**";
        description += "\nDigite: ``"+global.bot_prefix+"velha iniciar <facil|medio|dificil> <sim>(OPCIONAL)``";
        description += "\nExemplo: ``"+global.bot_prefix+"velha iniciar facil``";
        description += "\n\n**Obs.**: Para iniciar um jogo com o BOT iniciando, basta passar o parâmetro de <sim>";
        description += "\nExemplo: ``"+global.bot_prefix+"velha iniciar facil sim``";
        description += "\n\n**Como marcar um ponto?**";
        description += "\nDigite: ``"+global.bot_prefix+"velha marcar <1|2|3|4|5|6|7|8|9>``";
        description += "\nExemplo: ``"+global.bot_prefix+"velha marcar 3``";
        description += "\n\n**Como eu paro o jogo atual?**";
        description += "\nDigite: ``"+global.bot_prefix+"velha parar``";
        description += "\n\n**Como eu vejo a grade atual?**";
        description += "\nDigite: ``"+global.bot_prefix+"velha mostrar``";
		
		
		let embedMsg = new Discord.MessageEmbed()
		.setColor(getColor('GREEN'))
		.setTitle('Comandos do "Jogo da Velha"')
		.setDescription(description)
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Tic_Tac_Toe.png/200px-Tic_Tac_Toe.png');
		
		
		return {
			text: text_ret,
			option: embedMsg,
		}
	},
};