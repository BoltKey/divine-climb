function click() {
	/*if (showResult && !inplay) {
		start();
	}*/
	var col = getMouseCol();
	console.log("the col is " + col);
	ground.removeBlock(col);
	if (!ingame && timer > 100) {
		restart();
	}
}
function rightClick(e) {
	var col = getMouseCol();
	console.log("the col is " + col);
	ground.addBlock(col);
	console.log('rightclick');
	return false;
}

function getMouseCol() {
	return Math.floor((divPos.x - scr[0]) / tilew)
}

function drag() {
	
}

function mouseIdle() {
	
}

function release() {
}

function isMouseIn(obj) {
	//return (c1 && c2 && c3 && c4);
	return (divPos.y > obj.y && 
	divPos.y < obj.y + ((typeof(obj.h) !== "undefined") ? obj.h : obj.w) &&
	divPos.x > obj.x &&
	divPos.x < obj.x + obj.w);
}

function checkMouse() {
	if (mouseDown) {
		if (!lastmd) {
			if (mouseDown === 2)
				rightClick();
			else 
				click();
		}
		drag();
	}
	else if (lastmd && !mouseDown) {
		release();
	}
	else {
		mouseIdle();
	}
}