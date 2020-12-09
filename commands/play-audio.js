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
			const dir = 'D:\\Users\\Collin\\Desktop\\halo_chief_bot\\samples';

			// random file selector function
			randomFile(dir, (err, file) => {
				file_name = file;
			});

			// join the voice channel that the message was sent in
			const connection = await message.member.voice.channel.join();

			// Create a dispatcher for the audio file
			const dispatcher = connection.play('D:\\Users\\Collin\\Desktop\\halo_chief_bot\\samples\\' + file_name);

			// Start the dispatcher
			dispatcher.on('start', () => {
				console.log(file_name + ' is now playing!');
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
