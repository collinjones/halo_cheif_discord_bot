// require the discord.js module
const fs = require('fs');
const Discord = require('discord.js');
const token = process.env.token;
const prefix = process.env.prefix;

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// read in the command files from the /.commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Logged in');
});

// login to Discord with your app's token
client.login(token);

client.on('message', async message => {
	// if the message does not starts with the prefix OR the message is from a bot, exit early
	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}

	// slice the additional args into an array
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	// lower all args and assign to command variable
	const command = args.shift().toLowerCase();

	// If there isn't a command with the name provided, exit early.
	if (!client.commands.has(command)) {
		return;
	}

	// == COMMAND EXECUTION ==
	try {
		// get() the command and call its execute() method
		client.commands.get(command).execute(message, args, client);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});
