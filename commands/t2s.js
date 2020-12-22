const talkify = require('talkify-tts');
module.exports = {
	name: 't2s',
	description: 'text-to-speech',
	execute(message, args) {
			var player = new talkify.TtsPlayer(); //or new talkify.Html5Player()
			player.playText('Hello world');
	},
};
