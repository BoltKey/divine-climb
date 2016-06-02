var divPos,
lastDivPos,
keysDown,
lastkd,
ground,
tilew;


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
	document.body.onmousedown = function() { 
		mouseDown = 1
	}
	document.body.onmouseup = function() { 
		mouseDown = 0;
	}
	
	ground = new Ground();
	mainloop();
}

function mainloop() {
	requestAnimationFrame(mainloop);
	
	
	checkKeys();
	checkMouse();
	
	lastmd = mouseDown;
	lastkd = JSON.parse(JSON.stringify(keysDown));
	draw();
}