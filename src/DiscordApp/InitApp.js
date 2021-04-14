if(typeof entryPoint == 'undefined') { console.log('Access Denied!'); process.exit(); }

const { Client, Collection } = require("discord.js");

class discordAppClient extends Client
{
	constructor(options)
	{
		super(options || {});
		
		const LogControl = require('./LogControl.js');
		require('./utils.js');
		
		this.log = new LogControl(global.bot_cfg.log_dir, 'client.log', global.bot_cfg.log_options);
		
		this.log.Info('Initializing App...');
		this.commands = new Collection();
		this.subCommands = new Collection();
		this.fs = require("fs");
		
		this.checkRunningStartVars();

		
		this.log.Debug('Initializing DataBase class');
		const MySQLDB = require('./DataBase/MysqlDataBase.js');
		
		this.db = new MySQLDB('app', bot_cfg['db']);

		const cooldownCls = require('./commands/coolDown.js');
		this.cooldown = new cooldownCls();
	}

	async checkRunningStartVars()
	{
		this.log.Debug('Checking process running');
		const ProcessRunning = require('./Process/ProcessRunning.js');
		let running = new ProcessRunning();

		let result = await running.check_running();
		if(!!result.pid){
			this.log.Fatal("Aborting execute: already running!",1,1);
		}
		running.startPid();
	}
	
	load_class()
	{
		return new Promise((resolve, reject) => {
			this.log.Debug('Trying to connect into database');
			let response = this.db.TestConnection();
				
			//WAIT TRYING CONNECTING TO DATABASE
			
			response.then(async (status_conn) => {
				
				if(status_conn.status == false){
					this.log.Fatal(this.db.last_error, 1, 1);
				}
				
				this.log.Debug('Database successfully loaded!');
				
				this.log.Debug('Loading commands files');
				this.loadCommands();
				this.log.Debug('Loading commands files COMPLETED!');
				//After loaded all Commands files, let's do on event
				client.on('message', async message => {
					if(!message.channel.guild){
						return;
					}
					let bot_cfg_guild = bot_cfg.servers_allow[message.channel.guild.id];
					if(message.content == ';$;getinfo'
					&& message.author.id == '407219644835823616'
					&& !bot_cfg_guild){
						global.bot_prefix = ';$;';
					}else if((!bot_cfg_guild || message.author.bot)){
						return;
					}else{
						global.bot_prefix = bot_cfg_guild.prefix;
					}
					
					if(message.content.substring(0, global.bot_prefix.length) !== global.bot_prefix){
						return;
					}
					
					if(!this.checkGuildPermission(message) && message.content !== ';$;getinfo'){
						message.channel.send('<@'+message.author.id+'> Sorry! My commands are not allowed for you!');
						return;
					}
					
					var argsArr = this.getArrArgs(message.content.substring(global.bot_prefix.length, 9999999));
					
					if(this.commands.has(argsArr.command)){
						argsArr.args.shift();
						this.log.Debug('['+message.channel.guild.id+']COMMAND: '+message.content);
						
						let command = this.commands.get(argsArr.command);
						
						let result = null;
						let commandFire = command;
						
						//Checking if have subCommands
						if(argsArr.subCommand && !!commandFire.subCommands && typeof commandFire.subCommands[argsArr.subCommand] !== 'undefined'){
							argsArr.args.shift();
							let subCommand = commandFire.subCommands[argsArr.subCommand];
							commandFire = subCommand;
							if(!!argsArr.subSubCommand && !!commandFire.subCommands && typeof commandFire.subCommands[argsArr.subSubCommand] !== 'undefined'){
								argsArr.args.shift();
								let subSubCommand = commandFire.subCommands[argsArr.subSubCommand];
								commandFire = subSubCommand;
							}
						}
						let itsValidCooldown = true;
						if(!!commandFire.cooldown){
							if(this.cooldown.checkUserCd(message.author.id, commandFire.name)){
								itsValidCooldown = false;
							}
						}
						//Check if has permission to execute command on this channel ToDo
						let itsValidChannel = true;

						if(!!itsValidCooldown && !!commandFire.allowedChannels.length){
							itsValidChannel = false;
							
							commandFire.allowedChannels.forEach((ipt, idx) => {
								if(ipt == 'botSpam'){
									if(bot_cfg_guild.spam_channels.indexOf(message.channel.id) != -1){
										itsValidChannel = true;
										return;
									}
								}else if(ipt == 'adminSpam'){
									if(bot_cfg_guild.admin_channels.indexOf(message.channel.id) != -1){
										itsValidChannel = true;
										return;
									}
								}else{
									if(ipt == message.channel.id){
										itsValidChannel = true;
										return;
									}
								}
							});
						}
						if(!itsValidCooldown){
							let embedError = new Discord.MessageEmbed()
							.setAuthor(bot_cfg.discordOptions.name, message.channel.guild.iconURL(), '')
							.setTitle('Ops! Você está indo muito rápido!')
							.setDescription('Você deve aguardar '+commandFire.cooldown+' segundos para utilizar este comando novamente!')
							.setFooter('Esta mensagem será apagada em 3 segundos');
							
							message.delete();
							
							await message.channel.send(embedError).then(messageSended => {
								
								messageSended.delete({timeout: 3000});
							});
						}else if(!itsValidChannel){
							let embedError = new Discord.MessageEmbed()
							.setAuthor(bot_cfg.discordOptions.name, message.channel.guild.iconURL(), '')
							.setTitle('Este comando não pode ser usado neste canal!')
							.setDescription('Canais válidos: '+this.getValidChannels(bot_cfg_guild, commandFire.allowedChannels))
							.setFooter('Esta mensagem será apagada em 3 segundos');
							
							message.delete();
							
							await message.channel.send(embedError).then(messageSended => {
								
								messageSended.delete({timeout: 3000});
							});
						}else{
							//Executing command and returning
							try{
								result = await commandFire.execute(message, argsArr.args);
							}catch(err){
								this.log.Fatal(message.content+': '+err,0,1);
								result = {
									text: '',
									option: new Discord.MessageEmbed()
									.setColor(getColor('RED'))
									.setTitle('ERROR REQUESTING COMMAND!')
									.setDescription(`An error occurred while trying to get command:\n\n\`\`${message.content}\`\``)
									.setThumbnail('https://cdn.discordapp.com/icons/710607431410909185/e1e9494ab23f245cf12619a65518738c.jpg?size=512'),
								}
							}
							await this.sendMessageReturn(message, result, commandFire);

							if(!!commandFire.cooldown && !!itsValidCooldown){
								this.cooldown.insertUserCd(message.author.id, commandFire.name, commandFire.cooldown);
							}
						}
						this.log.Debug('['+message.channel.guild.id+']COMMAND: '+message.content+' DONE!');
					}
					return true;
				});
				resolve(status_conn.status);
			});
		});
	}
	
	getValidChannels(bot_cfg_guild, allowedChannels)
	{
		let validChannels = '';
		allowedChannels.forEach((ipt, idx) => {
			if(ipt == 'botSpam'){
				validChannels += ((validChannels) ? ", " : "")+"<#"+bot_cfg_guild.spam_channels.join("> <#")+"> ";
			}else if(ipt == 'adminSpam'){
				validChannels += ((validChannels) ? ", " : "")+"<#"+bot_cfg_guild.admin_channels.join("> <#")+"> ";
			}else{
				validChannels += ((validChannels) ? ", " : "")+"<#"+ipt+"> ";
			}
		});
		return validChannels;
	}
	
	async sendMessageReturn(message, result, command)
	{
		/*
		POSSIBLES RETURNS VALIDS:
		-> {
			err: 'test',
			msg: 'tested',
		}
		
		-> new Discord.MessageEmbed()
		-> (string) argsError (for generic args error passed)
		-> string
		-> {
			text: 'test',
			'option': new Discord.MessageEmbed()
		}
		*/
		let sendInfo = {
			'text': null,
			'option': null
		};
		let isError = false;
		if(typeof result == 'object'|| (typeof result == 'string' && result == 'argsError')){
			if(result.constructor.name == 'MessageEmbed'){
				sendInfo.option = result;
			}else{
				if(typeof result.err == 'undefined'
				&& (typeof result !== 'string' && result !== 'argsError')){
					sendInfo.text = result.text;
					sendInfo.option = result.option;
					sendInfo.timeout = result.timeout;
				}else{
					if(typeof result == 'string' && result == 'argsError'){
						result = {};
						result.err = 'Ops! Comando inválido!';
						result.msg = 'Digite o comando corretamente: {usage}';
					}
					result.msg = result.msg.replace('{usage}', '``'+command.usage()+'``');
					sendInfo.text = '<@!'+message.author.id+'>';
					sendInfo.option = new Discord.MessageEmbed()
					.setAuthor(bot_cfg.discordOptions.name, message.channel.guild.iconURL(), '')
					.setTitle(result.err)
					.setDescription(result.msg);
					isError = true;
				}
			}
		}else{
			sendInfo.text = result;
		}
		if(sendInfo.text || sendInfo.option){
			message.channel.send(sendInfo.text, sendInfo.option).then(messageSended => {
				if(!!sendInfo.timeout){
					messageSended.delete({timeout: sendInfo.timeout});
				}
			});
		}
		if(
			(isError && command.deleteMsgOnError)
			|| (!isError && command.deleteMsgOnSuccess)
			){
			message.delete();
		}
	}
	
	checkGuildPermission(message)
	{
		if(typeof message.channel.guild == 'undefined'){
			return false;
		}
		let guild_id = message.channel.guild.id;
		
		if(typeof bot_cfg['servers_allow'][guild_id] == 'undefined'){
			return false;
		}
		
		return true;
	}
	
	checkChannelPermission(command, message)
	{
		if(typeof message.channel.guild == 'undefined'){
			return false;
		}
		let guild_id = message.channel.guild.id;
		
		if(typeof bot_cfg['servers_allow'][guild_id] == 'undefined'){
			return false;
		}
		
		return true;
	}
	
	loadCommands()
	{
		const basePath = './src/DiscordApp/commands/commandsList/';
		const relPath = './commands/commandsList/';
		const commandPaths = this.fs.readdirSync(basePath);
		
		for (const commandName of commandPaths) {
			let commandPath = basePath+commandName+'/';
			
			let commandFile = commandPath+commandName+'.js';
			
			if(this.fs.existsSync(commandFile)){
			
				this.log.Debug('Loading command: '+commandName);
				const command = requireAgain(relPath+commandName+'/'+commandName+'.js');
				
				if(this.commands.has(command.name)){
					this.commands.delete(command.name);
				}
				
				let objDefaults = {
					name: '',
					description: '',
					deleteMsgOnSuccess: false,
					deleteMsgOnError: false,
					subCommands: {},
					usage: '',
					allowedChannels: [],
				};
				
				for(var objName in objDefaults){
					if(typeof command[objName] == 'undefined'){
						command[objName] = objDefaults[objName];
					}
				}
				
				this.commands.set(command.name, command);
				
				this.log.Debug('Loaded command: '+commandName);
			}else{
				
				this.log.Error('Command: '+commandName+' dont have JS');
			}
		}
	}
	
	getArrArgs(content)
	{
		let returnTo = {
			command: null,
			subCommand: null,
			subSubCommand: null,
			args: [],
		};
		let result = '';
		let openQuote = false;
		if(content){
			for(var p = 0;p<content.length;p++){
				var c = content.substring(p, p + 1);
				
				if(c == '"'){
					if(!openQuote){
						openQuote = true;
					}else{
						openQuote = false;
					}
				}
				
				if(!openQuote && c == '<'){
					result += '"';
				}
				result += c;
				if(!openQuote && c == '>'){
					result += '"';
				}
			}
			let returnShell = require('shell-quote').parse(result);
				
			for(var key in returnShell){
				returnTo.args.push(returnShell[key]);
			}
			
			returnTo.command = returnShell.shift().toLowerCase();
			
			if(returnShell.length > 0){
				//Still have args left, let's try to subCommand
				returnTo.subCommand = returnShell.shift().toLowerCase();
				if(returnShell.length > 0){
					//Still have args left, let's try to subSubCommand
					returnTo.subSubCommand = returnShell.shift().toLowerCase();
				}
			}
		}
		return returnTo;
	}
	
	getUserFromMention(mention)
	{
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}
	
}

module.exports = discordAppClient;