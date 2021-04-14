module.exports = {
	name: 'add',
	description: 'Pedra, Papel ou Tesoura!',
	deleteMsgOnSuccess: false,
	deleteMsgOnError: false,
	usage: () => {
		return global.bot_prefix+'server add \"<name>\" <guild_id> \"<prefix>\"'
	},
	allowedChannels: [
		'774240024723193856',
	],
	async execute(message, args) {
		let resultReturn = {}
        let serverNew = {};
		let embedMsg = new Discord.MessageEmbed()
		.setColor(getColor('GREEN'))
		.setTitle('[ADMIN] Limpeza de Logs')
		.setDescription('**Logs excluídos com sucesso!**');
        if(!!args[4]){

			let actualServers = requireAgain('../../servers.js');

			if(!actualServers[args[1]]){
				serverNew[args[1]] = {
					name: args[2],
					prefix: args[4],
					admin_channels: [
						"774240024723193856",
					],
					spam_channels: [],
				};
			}else{
				resultReturn.err_title = 'Ops! O servidor já existe na configuração atual!',
				resultReturn.err_msg = ''
			}
        }else{
			resultReturn.err_title = 'Ops! Comando inválido',
			resultReturn.err_msg = 'Digite o comando corretamente: {usage}'
		}
		return resultReturn;
	},
};