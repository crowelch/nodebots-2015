var five = require("johnny-five");
var keypress = require('keypress');
var board = new five.Board();
var stdin = process.stdin;

keypress(process.stdin);
stdin.setRawMode(true);
stdin.resume();

board.on("ready", function() {
	// Johnny-Five provides pre-packages shield configurations!
	// http://johnny-five.io/api/motor/#pre-packaged-shield-configs
	var motors = new five.Motors([
		five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M1,
		five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M2,
	]),

	leftMotor = motors[0],
	rightMotor = motors[1];

	// var mServo = new five.Servo(5);

	console.log('Ready!');

	stdin.on("keypress", function (chunk, key) {
		if (!key) return;

		if (key.ctrl && key.name == 'c' || key.name == 'q') {
			process.exit();
		}

		// console.log(key);

		switch(key.name) {
			case "up":
				motors.stop();
				if(key.shift) {
					motors.rev(255)
				} else {
					motors.rev(150);
				}
				break;
			case "down":
				motors.stop();
				if(key.shift) {
					motors.fwd(255)
				} else {
					motors.fwd(150);
				}
				break;
			case "space":
				motors.stop();
				break;
			case "left":
				motors.stop();

				if(key.shift) {

				motors[1].fwd(200);
				motors[0].rev(200);
				} else {

				motors[1].fwd(100);
				motors[0].rev(100);
				}
				break;
			case "right":
				motors.stop();
				if(key.shift) {

					motors[0].fwd(200);
					motors[1].rev(200);
				} else {
					motors[0].fwd(100);
					motors[1].rev(100);
				}
				break;
			case "z":
				mServo.sweep([0,180]);
				break;
			case "x":
				mServo.stop();
				break;
			default:
				break;
		}
	});
});
