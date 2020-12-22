module.exports = {
	name: 'mister',
	description: 'Master Chief responds with "Chief."',
	execute(message, args, client) {
		console.log(args);
		message.channel.send('Chief.');
	},
};
