module.exports = {
	name: 'adminchannel',
	description: '[ADMIN] Add new admin channel to server list',
	deleteMsgOnSuccess: true,
	deleteMsgOnError: true,
	usage: () => {
		return global.bot_prefix+'server add adminchannel <guild_id> <admin_channel>'
	},
	allowedChannels: [
		'774240024723193856',
	],
	async execute(message, args) {
		let resultReturn = {};
        if(!!args[1]){
			let serversList = requireAgain('../../servers.js');
			resultReturn.msg = ''

			if(!!serversList[args[0]]){
				if(serversList[args[0]]['admin_channels'].indexOf(args[1]) != -1){
					resultReturn.err = `Ops! O servidor já possui este canal cadastrado!
					ID: ${args[0]}
					CANAL: ${args[1]}`;
				}else{
					serversList[args[0]]['admin_channels'].push(args[1]);
					let newContent = 'module.exports = '+JSON.stringify(serversList, null, "\t");
					await fs.writeFileSync('./servers.js', newContent);
					requireAgain('../../config.js');
					resultReturn.text = '';
					resultReturn.option = new Discord.MessageEmbed()
					.setColor(getColor('GREEN'))
					.setTitle('[ADMIN] Add new admin channel to server list')
					.setDescription(`**Novo Admin Channel adicionado com sucesso!**
					NOME: **${serversList[args[0]]['name']}**
					PREFIX: **${serversList[args[0]]['prefix']}**
					ADMIN CHANNELS: **${client.getValidChannels(serversList[args[0]], ['adminSpam'])}**
					SPAM CHANNELS: **${client.getValidChannels(serversList[args[0]], ['botSpam'])}**
					`);
				}
			}else{
				resultReturn.err = `Ops! O servidor não existe na configuração atual!
				ID: ${args[0]}`;
			}
        }else{
			return 'argsError';
		}
		return resultReturn;
	},
};