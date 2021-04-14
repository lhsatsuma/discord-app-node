module.exports = {
	name: 'reset',
	description: 'Pedra, Papel ou Tesoura!',
	deleteMsgOnSuccess: true,
	deleteMsgOnError: true,
	usage: () => {
		return global.bot_prefix+'jokenpo reset';
	},
	allowedChannels: [
		'adminSpam',
	],
	async execute(message, args) {
		const BeanJokenpo = require('../../../../models/Jokenpo.js');

		let text_ret = '';
		let embedMsg = new Discord.MessageEmbed()
		.setColor(getColor('GREEN'))
		.setTitle('Pontuação no Jokenpo de '+message.author.username)
		.setDescription('**Pontos resetados com sucesso!**');

		let bean = new BeanJokenpo();

		bean.user_id = message.author.id;


		await bean.resetScore();

		return {
			text: text_ret,
			option: embedMsg,
		}
	},
};