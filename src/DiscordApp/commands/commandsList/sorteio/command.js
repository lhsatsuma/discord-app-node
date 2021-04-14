module.exports = {
	name: 'sorteio',
	description: 'Sorteio de um número!',
	deleteMsgOnSuccess: true,
	deleteMsgOnError: true,
	usage: () => {
		return global.bot_prefix+'sorteio <numero_min> <numero_max>';
	},
	allowedChannels: [],
	execute(message, args) {
		let textRet = '**Sorteio de um número!**';
		let title = '';
		let description = '';
		let color = '';

		let min = parseInt(args[0]);
		let max = parseInt(args[1]);
		
		if(parseInt(args[0]) >= 0 && parseInt(args[1]) <= 9999999999){
			let rand = randomInt(min, max);
			title = message.author.username+' fez um sorteio de '+min+' até '+max+'!';
			description = '*O número sorteado foi*: **'+rand+'**';
			color = getColor('GREEN');
		}else{
			title = textRet;
			 color = getColor('BLUE');
			
			description = '';
			description += '**Como realizar um sorteio?**';
			description += "\nDigite: ``"+global.bot_prefix+"sorteio <numero_min> <numero_max>``";
			description += "\nExemplo: ``"+global.bot_prefix+"sorteio 3 90``";
			description += "\n\n**Qual o número mínimo?**";
			description += "\nO número mínimo é **0 (zero)**.";
			description += "\n\n**Qual o número máximo?**";
			description += "\nO número máximo é **9999999999**";
		}

		let embedMsg = new Discord.MessageEmbed()
		.setTitle(title)
		.setDescription(description)
		.setColor(color);
		
		return {
			'text': textRet,
			'option': embedMsg,
		};
		
	},
};