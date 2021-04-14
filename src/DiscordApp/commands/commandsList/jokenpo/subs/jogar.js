module.exports = {
	name: 'reset',
	description: 'Pedra, Papel ou Tesoura!',
	deleteMsgOnSuccess: true,
	deleteMsgOnError: true,
	usage: () => {
		return global.bot_prefix+'jokenpo jogar <pedra,papel,tesoura>';
	},
	allowedChannels: [
		'adminSpam',
	],
	async execute(message, args) {
		const BeanJokenpo = require('../../../../models/Jokenpo.js');

		let bean = new BeanJokenpo();

		bean.user_id = message.author.id;

		let text_ret = '';
		let embedMsg = new Discord.MessageEmbed()
		.setColor(getColor('ORANGE'))
		.setTitle('Ops! Erro ao jogar o jokenpo!')
		.setDescription('Digite o comando corretamente:\n``'+global.bot_prefix+'jokenpo jogar <pedra|papel|tesoura>``');

		let options = ['pedra', 'papel', 'tesoura'];

		let choose = args[2];
		if(options.indexOf(choose) != -1){
			let random = Math.floor(Math.random() * options.length);
			let bot_choose = options[random];
			let result = '';

			if(
			(choose == 'papel' && bot_choose == 'papel')
			|| (choose == 'tesoura' && bot_choose == 'tesoura')
			|| (choose == 'pedra' && bot_choose == 'pedra')
			){
				result = 'draw';
			}else if(
			(choose == 'papel' && bot_choose == 'pedra')
			|| (choose == 'tesoura' && bot_choose == 'papel')
			|| (choose == 'pedra' && bot_choose == 'tesoura')
			){
				result = 'win';
			}else if(
			(choose == 'papel' && bot_choose == 'tesoura')
			|| (choose == 'tesoura' && bot_choose == 'pedra')
			|| (choose == 'pedra' && bot_choose == 'papel')
			){
				result = 'lose';
			}

			embedMsg.setTitle(message.author.username+' jogou jokenpo!');
			embedMsg['description'] = "Você jogou: **"+choose.toUpperCase()+"**\n";
			embedMsg['description'] += "O BOT jogou: **"+bot_choose.toUpperCase()+"**\n";
			
			if(result == 'draw'){
				bean.plusDraw(choose);
				embedMsg['color'] = getColor('ORANGE');
				embedMsg['description'] += "\n**DEU EMPATE!**";
			}else if(result == 'win'){
				bean.plusWin(choose);
				embedMsg['color'] = getColor('GREEN');
				embedMsg['description'] += "\n🎉🎉🎉**VOCÊ GANHOU!**🎉🎉🎉";
			}else if(result == 'lose'){
				bean.plusLose(choose);
				embedMsg['description'] += "\n**VOCÊ PERDEU! TENTE NOVAMENTE!**";
			}

			embedMsg.setDescription(embedMsg['description']);
			embedMsg.setColor(embedMsg['color']);
		}

		return {
			text: text_ret,
			option: embedMsg,
		}
	},
};