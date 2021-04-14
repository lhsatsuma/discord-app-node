global.entryPoint = 'app';

global.startAppTime = new Date();

global.fs = require('fs');

require('./config.js');

discordAppClient = require('./src/DiscordApp/InitApp.js');

global.client = new discordAppClient();

global.Discord = require("discord.js");

client.load_class().then((res) => {
	if(res == true){
		client.once('ready', async () => {
			
			for(var guild_id in bot_cfg.servers_allow){
				
				let guild_options = bot_cfg.servers_allow[guild_id];
				
				let channel = client.channels.cache.find(channel => channel.id === guild_options.admin_channels[0]);
				
				let dateNow = new Date();
				const exampleEmbed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle(bot_cfg.discordOptions.name+' IS UP AND RUNNING!')
					.setAuthor(bot_cfg.discordOptions.name, channel.guild.iconURL(), '')
					.setThumbnail(channel.guild.iconURL())
					.setDescription("Data: "+dateNow.toLocaleString('pt-BR'));

				// await channel.send(exampleEmbed);
			}
			
		});
		client.login(bot_cfg.discordOptions.token);
		client.log.Info('BOT IS UP AND RUNNING!');
		
	}else{
		client.log.Fatal('Error loading class discordAppClient', 1, 1);
	}
	
});