module.exports = {
	name: 'server',
	description: '[ADMIN] Servers Config',
	subCommands: {
		'add': requireAgain('./commands/commandsList/server/subs/add/add.js'),
	},
	deleteMsgOnSuccess: false,
	deleteMsgOnError: false,
	usage: global.bot_prefix+'server <add,addadminchannel,addspamchannel,prefix>',
	allowedChannels: [
		'adminSpam',
	],
	execute(message, args) {
		
		let text_ret = '**Pedra, Papel ou Tesoura!**';
		
		let description = '';
		
		description += "**Como adicionar um novo servidor?**";
		description += "\nDigite: ``"+global.bot_prefix+"server add \"<name>\" <guild_id> \"<prefix>\" \"<admins_channels(;)>\ \"<spam_channels(;)>\"``";
		description += "\nExemplo: ``"+global.bot_prefix+"server add \"TESTE SERVIDOR\" 123456789  \"$\" \"987654321;123456789\" \"987654321;123456789\"``";

		description += "\n\n**Como adicionar um canal de admin para o servidor?**";
		description += "\nDigite: ``"+global.bot_prefix+"server addadminchannel <guild_id> <channel_id>``";
		description += "\nExemplo: ``"+global.bot_prefix+"server addadminchannel 123456789 987654321``";

		description += "\n\n**Como adicionar um canal de spam para o servidor?**";
		description += "\nDigite: ``"+global.bot_prefix+"server addspamchannel <guild_id> <channel_id>``";
		description += "\nExemplo: ``"+global.bot_prefix+"server addspamchannel 123456789 987654321``";

		description += "\n\n**Como mudar o prefixo do bot para o servidor?**";
		description += "\nDigite: ``"+global.bot_prefix+"server prefix \"<prefix>\"``";
		description += "\nExemplo: ``"+global.bot_prefix+"server prefix 123456789  \"$\"``";
		
		
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