const randomFile = require('select-random-file');
module.exports = {
	name: 'halo',
	description: 'Master Chief responds with random one-liner.',
	execute(message, args) {
		// call the playAudio() function to execute the code
		playAudio();

		async function playAudio() {
			console.log(args);
			// variable to keep track of random file name
			let file_name = '';

			// sample directory for bot
			const dir = './samples';

			// random file selector function
			randomFile(dir, (err, file) => {
				file_name = file;
			});

			// declare the connection variable
			let connection;

			// VALIDATE that the caller is in a voice channel
			try {
				// join the voice channel that the message was sent in
				connection = await message.member.voice.channel.join();
			}
			catch (error) {
				message.channel.send('You must be in a voice channel to activate me');
				return;
			}
			// Create a dispatcher for the audio file
			const dispatcher = connection.play('./samples/' + file_name);

			// Start the dispatcher
			dispatcher.on('start', () => {
				console.log(file_name + ' is now playing!');

				// Remove the .xxx from the end of the file
				let chief_sentance = file_name.substring(0, file_name.length - 4);
				// Replace (questionmark) with '?'
				chief_sentance = chief_sentance.replace(/(?:^|\W)(questionmark)(?:$|\W)/g, '?');
				// Output the formatted sentance into the text channel
				message.channel.send(chief_sentance);
			});

			// finish the dispatcher
			dispatcher.on('finish', () => {
				console.log(file_name + ' has finished playing!');
				// disconnect the bot from the voice channel
				connection.disconnect();
				// destroy the dispatcher
				dispatcher.destroy();
			});

			// Always remember to handle errors appropriately!
			dispatcher.on('error', console.error);
		}
	},
};
