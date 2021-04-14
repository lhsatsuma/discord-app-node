module.exports = {
	name: 'getinfo',
	description: '[ADMIN] Get Info!',
	subCommands: {},
	deleteMsgOnSuccess: true,
	deleteMsgOnError: true,
	usage: global.bot_prefix+'getinfo',
	async execute(message, args) {
		let embedMsg = new Discord.MessageEmbed()
		.setColor(getColor('GREEN'))
		.setTitle('[ADMIN] Get Info')
		.setDescription('**AS informações foram enviadas em seu privado!**');
		
        try{
		    await message.author.send(new Discord.MessageEmbed()
                .setColor(getColor('GREEN'))
                .setTitle('[ADMIN] Get Info Result')
                .setDescription(`
                GUILD NAME: **${message.channel.guild.name}**
                GUILD ID: **${message.channel.guild.id}**
                CHANNEL NAME: **${message.channel.name}**
                CHANNEL ID: **${message.channel.id}**
                BOT PREFIX FOR GUILD: **${global.bot_prefix}**
                `)
            );
        }catch{
            embedMsg.setDescription('Habilite a opção de envio direto de mensagens de membros para receber as informações!');
        }
		return {
			text: '',
			option: embedMsg,
            timeout: 3000,
		}
	},
};