module.exports = {
	name: 'guid',
	description: '[ADMIN] Add New Server to BOT!',
	deleteMsgOnSuccess: true,
	deleteMsgOnError: true,
	usage: () => {
		return global.bot_prefix+'server add guid \"<name>\" <guild_id> \"<prefix>\" \"<admins_channels(;)>\ \"<spam_channels(;)>\"'
	},
	allowedChannels: [
		'774240024723193856',
	],
	async execute(message, args) {
		let resultReturn = {};
        if(!!args[4]){

			let serversList = requireAgain('../../servers.js');

			if(!serversList[args[1]]){
				serversList[args[1]] = {
					name: args[0],
					prefix: args[2],
					admin_channels: args[3].split(';'),
					spam_channels: args[4].split(';'),
				};
				let newContent = 'module.exports = '+JSON.stringify(serversList, null, "\t");
				await fs.writeFileSync('./servers.js', newContent);
				requireAgain('../../config.js');
				resultReturn.text = '';
				resultReturn.option = new Discord.MessageEmbed()
				.setColor(getColor('GREEN'))
				.setTitle('[ADMIN] Add New Server to BOT!')
				.setDescription(`**Servidor adicionado com sucesso!**
				NOME: **${args[0]}**
				PREFIX: **${args[2]}**
				ADMIN CHANNELS: **${args[3]}**
				SPAM CHANNELS: **${args[4]}**
				`);
			}else{
				resultReturn.err = `Ops! O servidor já existe na configuração atual!
				ID: ${args[3]}
				NOME: ${serversList[args[3]]['name']}`;
				resultReturn.msg = ''
			}
        }else{
			return 'argsError';
		}
		return resultReturn;
	},
};