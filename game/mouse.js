function click() {
	/*if (showResult && !inplay) {
		start();
	}*/
	console.log("click ", divPos);
}

function drag() {
	
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
			click();
		}
		drag();
	}
}