var keysDown = [];
var lastkd = [];
$(document).keydown(function(ev) { 
	if (keysDown.indexOf(ev.keyCode) === -1) {
		keysDown.push(ev.keyCode); 
		console.log("currently pressed keys are " + keysDown + " last keys are: " + lastkd);
	}
	if ([8, 37, 38, 39, 40].indexOf(ev.keyCode) !== -1) {
		ev.preventDefault();
	}
});
$(document).keyup(function(ev) { keysDown.splice(keysDown.indexOf(ev.keyCode), 1) } );

function checkKeys() {
	for (k of keysDown) {
		if (lastkd.indexOf(k) > -1) {
			keyHold(k);
		}
		else {
			keyPress(k);
		}
	}
}

function keyPress(k) {
	if (k === 77) {
		sounds.music.volume = muted * 0.1;
		muted = !muted;
		
	}
	if (k === 82) {
		restart();
	}
}
function keyHold(k) {
	
}