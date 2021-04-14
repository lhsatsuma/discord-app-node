module.exports = {
	name: 'status',
	description: 'Pedra, Papel ou Tesoura!',
	deleteMsgOnSuccess: true,
	deleteMsgOnError: true,
	usage: () => {
		return global.bot_prefix+'jokenpo status';
	},
	allowedChannels: [
		'adminSpam',
	],
	async execute(message, args) {
		const BeanJokenpo = require('../../../../models/Jokenpo.js');

		let text_ret = '';
		let embedMsg = new Discord.MessageEmbed()
		.setColor(getColor('ORANGE'))
		.setTitle('Pontuação no Jokenpo de '+message.author.username)
		.setDescription('**COMO VOCÊ QUER VER O SEU STATUS SE VOCÊ NUNCA JOGOU?**');

		let bean = new BeanJokenpo();

		bean.user_id = message.author.id;

		await bean.select();
		
		if(!!bean.id){
			bean.getStats();

			bean.getStatsPlay();
			
			embedMsg['description'] = `**STATUS GERAL:**`;
			embedMsg['description'] += `\nJOGADOS: **${bean.total_played}**`;
			embedMsg['description'] += `\nGANHAS: **${bean.stats['win']['total']} (${bean.stats['win']['perc']}%)**`;
			embedMsg['description'] += `\nPERDIDAS: **${bean.stats['lose']['total']} (${bean.stats['lose']['perc']}%)**`;
			embedMsg['description'] += `\nEMPATADOS: **${bean.stats['draw']['total']} (${bean.stats['draw']['perc']}%)**`;
			embedMsg['description'] += `\n\n**STATUS PEDRA:**`;
			embedMsg['description'] += `\nJOGADOS: **${bean.played_pedra} (${bean.stats_play['pedra']['perc']['total']}%)**`;
			embedMsg['description'] += `\nGANHOS: **${bean.win_pedra} (${bean.stats_play['pedra']['perc']['win']}%)**`;
			embedMsg['description'] += `\nPERDIDOS: **${bean.lose_pedra} (${bean.stats_play['pedra']['perc']['lose']}%)**`;
			embedMsg['description'] += `\nEMPATADOS: **${bean.draw_pedra} (${bean.stats_play['pedra']['perc']['draw']}%)**`;
			embedMsg['description'] += `\n\n**STATUS TESOURA:**`;
			embedMsg['description'] += `\nJOGADOS: **${bean.played_tesoura} (${bean.stats_play['tesoura']['perc']['total']}%)**`;
			embedMsg['description'] += `\nGANHOS: **${bean.win_tesoura} (${bean.stats_play['tesoura']['perc']['win']}%)**`;
			embedMsg['description'] += `\nPERDIDOS: **${bean.lose_tesoura} (${bean.stats_play['tesoura']['perc']['lose']}%)**`;
			embedMsg['description'] += `\nEMPATADOS: **${bean.draw_tesoura} (${bean.stats_play['tesoura']['perc']['draw']}%)**`;
			embedMsg['description'] += `\n\n**STATUS PAPEL:**`;
			embedMsg['description'] += `\nJOGADOS: **${bean.played_papel} (${bean.stats_play['papel']['perc']['total']}%)**`;
			embedMsg['description'] += `\nGANHOS: **${bean.win_papel} (${bean.stats_play['papel']['perc']['win']}%)**`;
			embedMsg['description'] += `\nPERDIDOS: **${bean.lose_papel} (${bean.stats_play['papel']['perc']['lose']}%)**`;
			embedMsg['description'] += `\nEMPATADOS: **${bean.draw_papel} (${bean.stats_play['papel']['perc']['draw']}%)**`;
		}
		return {
			text: text_ret,
			option: embedMsg,
		}
	},
};