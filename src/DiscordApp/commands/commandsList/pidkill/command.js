module.exports = {
	name: 'pidkill',
	description: '[ADMIN] PID KILL!',
	subCommands: {},
	deleteMsgOnSuccess: true,
	deleteMsgOnError: true,
	usage: () => {
		return global.bot_prefix+'pidkill';
	},
	allowedChannels: [
		'774240024723193856',
	],
	async execute(message, args) {
		
        const ProcessRunning = require('../../../Process/ProcessRunning.js');
		let running = new ProcessRunning();


        let embedError = new Discord.MessageEmbed()
        .setColor(getColor('RED'))
        .setAuthor(bot_cfg.discordOptions.name, message.channel.guild.iconURL(), '')
        .setTitle('R.I.P BOT '+new Date().toLocaleString('pt-BR'))
        .setDescription('Foi bom enquanto durou, vou sentir sua falta!\n Nos vemos mais tarde... :wave: :wave:');
		
		await message.channel.send(embedError);

        client.log.Info(message.author.username+' used pidkill!');

        await running.deletePid(process.pid);
	},
};