var five = require('johnny-five');


var myLed;
var myBoard = new five.Board();

myBoard.on('ready', function() {
	myLed = new five.Led(13);
	myLed.blink(500);

	this.repl.inject({
		on: function() {
			myLed.on()
		},

		off: function() {
			myLed.off();
		}
	});
});
