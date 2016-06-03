function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawMouseShade();
	ground.draw();
	player.draw();
	lava.draw();
}

function drawMouseShade() {
	ctx.fillStyle = "#888888";
	var col = getMouseCol();
	ctx.fillRect(scr[0] + col * tilew, 0, tilew, canvas.width);
}