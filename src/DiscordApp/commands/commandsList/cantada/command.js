module.exports = {
	name: 'cantada',
	description: 'Cantadas Engraçadas!',
	deleteMsgOnSuccess: false,
	deleteMsgOnError: true,
	usage: global.bot_prefix+'cantada <usuario>',
	allowedChannels: [
		'botSpam',
		'adminSpam',
	],
	cooldown: 1,
	execute(message, args) {
		let embedMsg = new Discord.MessageEmbed()
		.setColor(getColor('BLUE'));
		let textRet = '';
		
		let cantadas_prontas = require(process.cwd() + '/uploads/cantadas.json');
		let random_key = Math.floor(Math.random() * cantadas_prontas.length);
		let cantada = cantadas_prontas[random_key];
		
		if(args[0]){
			let userMention = client.getUserFromMention(args[0]);
			if(!userMention){
				return {
					'err_title': 'Ops! usuário invalido!',
					'err_msg': 'Digite o comando corretamente: {usage}',
				}
			}
			textRet += "**"+message.author.username+"** mandou uma cantada para **"+userMention.username+"**";
		}else{
			textRet += "**"+message.author.username+"** pediu uma cantada";
			
		}
		
		if(cantada.search('https://') != -1 || cantada.search('http://') != -1){
			//It's image
			embedMsg.setImage(cantada);
		}else{
			//It's a text
			embedMsg.setTitle(cantada);
		}
		
		return {
			'text': textRet,
			'option': embedMsg,
		};
		
	},
};