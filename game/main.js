var divPos,
lastDivPos,
keysDown,
lastkd,
ground,
tilew,
player,
lava

;


function main() {
	console.log("main");
	//mouse
	var offset = $("#game").offset();
	$(document).mousemove(function(e){
    divPos = {
        x: e.pageX - offset.top,
        y: e.pageY - offset.left
		}
	})
	lastDivPos = {x: 0, y: 0};
	lastmd = 0;
	mouseDown = 0;
	document.body.onmousedown = function(e) { 
		mouseDown = e.buttons;
	}
	document.body.onmouseup = function() { 
		mouseDown = 0;
	}
	document.body.oncontextmenu = function(){return false};
	
	ground = new Ground();
	player = new Player();
	lava = new Lava();
	
	scr = new ScrollManager([canvas.width, canvas.height], 0.01);
	
	mainloop();
}

function mainloop() {
	requestAnimationFrame(mainloop);
	player.update();
	
	scr.update([player.x * tilew + canvas.width * 0.3, ground.getHeight([player.x]) * tilew + canvas.height * 0.18]);
	lava.update();
	
	checkKeys();
	checkMouse();
	
	lastmd = mouseDown;
	lastkd = JSON.parse(JSON.stringify(keysDown));
	draw();
}