module.exports = {
	name: 'iniciar',
	description: 'Iniciar um novo jogo da velha!',
	subCommands: {},
	deleteMsgOnSuccess: false,
	deleteMsgOnError: false,
	usage: () => {
		return global.bot_prefix+'velha iniciar <@usuario(opcional)>\"'
	},
	allowedChannels: [
		'774240024723193856',
	],
	async execute(message, args) {

        let against = 'bot';
        if(!!args[0]){
            let userMention = client.getUserFromMention(args[0]);
			if(!userMention){
				return 'argsError';
			}
            against = userMention;
        }

		beanVelha = requireAgain('./models/Velha.js');
		bean = new beanVelha();
		bean.user_id = message.author.id;
		await bean.selectActive();
        let description = '';
		description += `<@!${message.author.id}> é o ❎
		${against} é o 🟤

		<@!${message.author.id}> começa!

		Clique na reação dos números abaixo para marcar um lugar`;
		description += "\n"+bean.mountSpots();

		let embed = new Discord.MessageEmbed()
		.setColor(getColor('BLUE'))
		.setTitle('Novo Jogo da Velha')
		.setDescription(description)

		message.channel.send('', embed).then(async messageSended => {
			bean.last_msg_id = messageSended.id;
			bean.against = against;
			bean.status = 'running';
			bean.save();
			bean.reactions_spots.forEach(async (reaction, idx) =>{
				await messageSended.react(reaction)
			});
			const filter = (reaction, user) => {
				return true;
			};
			messageSended.awaitReactions(filter, { max: 1, errors: ['time'] })
			.then(collected => {
				const reaction = collected.first();
				console.log(reaction.emoji.name === '👍');
			});
			
		})

		return {};
	},
};