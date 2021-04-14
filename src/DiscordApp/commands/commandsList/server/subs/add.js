module.exports = {
	name: 'add',
	description: 'Pedra, Papel ou Tesoura!',
	deleteMsgOnSuccess: false,
	deleteMsgOnError: false,
	usage: global.bot_prefix+'server add \"<name>\" <guild_id> \"<prefix>\"',
	allowedChannels: [
		'774240024723193856',
	],
	async execute(message, args) {
        let serverNew = {};
        if(!!args[4]){
            
        }
		return {
			text: '',
			option: '',
		}
	},
};