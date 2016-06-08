function draw() {
	if (ingame) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBg();
		drawMouseShade();
		ground.draw();
		player.draw();
		for (var i in coins) {
			coins[i].draw();
		}
		
		drawWelcomeText();
		ctx.fillStyle = "white";
		ctx.fillText("Height: " + ground.getHeight(player.x) + "/" + ground.maxy, canvas.width - 90, 30);
		lava.draw();
		drawOutside();
		
		
		
		if (won) {
			drawEndText();
			player.draw();
		}
		
		
	}
	else {
		drawGameOverText();
	}
}

function drawMouseShade() {
	ctx.globalAlpha = 0.2;
	ctx.fillStyle = "#ffffff";
	var col = getMouseCol();
	ctx.fillRect(scr[0] + col * tilew, 0, tilew, canvas.width);
	ctx.globalAlpha = 1;
}

function drawBg() {
	var grad = ctx.createLinearGradient(0, 200, 600, 0);
	var startR = 90;
	var spanR = 180;
	var startG = 10;
	var spanG = 100;
	var nowR = Math.floor(startR + spanR * (player.x / ground.max));
	var nowG = Math.floor(startG + spanG * (player.x / ground.max));
	grad.addColorStop(0, "rgb(" + nowR + "," + nowG + ",0)");
	grad.addColorStop(1, "rgb(" + (nowR + 40) + "," + (nowG + 40) + ",0)");
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	
}

function drawOutside() {
	
	// sky
	ctx.beginPath();
	var thePoint = [ground.max * tilew + scr[0], canvas.height - (ground.getHeight(ground.max) * tilew + scr[1])];
	ctx.moveTo(thePoint[0] - 500, thePoint[1] - 500);
	ctx.lineTo(thePoint[0], thePoint[1]);
	ctx.lineTo(thePoint[0], canvas.height);
	ctx.lineTo(canvas.width, canvas.height);
	ctx.lineTo(canvas.width, 0);
	ctx.fillStyle = "#a6faff";
	ctx.fill();
	
	ctx.fillStyle = "black";
	ctx.fillRect(ground.max * tilew + scr[0], canvas.height - (ground.getHeight(ground.max) * tilew + scr[1]), tilew, canvas.height * 5);
}

function drawWelcomeText() {
	ctx.fillStyle = "white";
	ctx.font = "50px Arial";
	ctx.fillText("Divine climb", 300 + scr[0], 200 - scr[1]);
	ctx.font = "20px Arial"
	ctx.fillText("An unfortunate stickman finds himself in a lava filled cave", 270 + scr[0], 250 - scr[1]);
	ctx.fillText("Fortunately, there happens to be a divine strength to rescue him", 350 + scr[0], 280 - scr[1]);
	ctx.fillText("The stickman tries to move forward if there are any higher spots reachable", 300 + scr[0], 320 - scr[1]);
	ctx.fillText("Left click to remove blocks, right click to add blocks", 260 + scr[0], 450 - scr[1]);
	ctx.fillText("Divine powers cost mana", 900 + scr[0], 200 - scr[1]);
	ctx.fillText("When stickman grabs mana orbs, you get mana and improve mana regeneration", 1200 + scr[0], 20 - scr[1]);
	if (tutorStartTime) {
		ctx.globalAlpha = Math.min(1, Math.max(0, (-Math.abs(tutorStartTime - timer + 150) + 150) / 50));
		ctx.drawImage(graphics.wjtut, 100, 240);
		ctx.fillText("If stickman and blocks are in this arrangement, the stickman makes a walljump", canvas.width / 2, 220);
		ctx.globalAlpha = 1;
	}
}

function drawEndText() {
	ctx.fillStyle = "black";
	var t = timer - wonTime;
	ctx.globalAlpha = Math.max(0, Math.min(1, (t - 20) / 80));
	ctx.font = "50px Arial";
	ctx.fillText("Congratulations!", ground.max * tilew + scr[0] + canvas.width / 2, canvas.height - (ground.maxy * tilew + scr[1] + 390));
	ctx.font = "20px Arial";
	ctx.globalAlpha = Math.max(0, Math.min(1, (t - 80) / 80));
	ctx.fillText("You win", ground.max * tilew + scr[0] + canvas.width / 2, canvas.height - (ground.maxy * tilew + scr[1] + 300));
	ctx.globalAlpha = Math.max(0, Math.min(1, (t - 200) / 80));
	ctx.fillText("The stickman finally survived", ground.max * tilew + scr[0] + canvas.width / 2, canvas.height - (ground.maxy * tilew + scr[1] + 250));
	ctx.globalAlpha = Math.max(0, Math.min(1, (t - 350) / 80));
	ctx.fillText("feeling the breeze which always used to seem so normal", ground.max * tilew + scr[0] + canvas.width / 2, canvas.height - (ground.maxy * tilew + scr[1] + 200));
	ctx.globalAlpha = Math.max(0, Math.min(1, (t - 500) / 80));
	ctx.fillText("enjoying the simple joys of nature", ground.max * tilew + scr[0] + canvas.width / 2, canvas.height - (ground.maxy * tilew + scr[1] + 150));
	ctx.globalAlpha = Math.max(0, Math.min(1, (t - 650) / 80));
	ctx.fillText("and being alive", ground.max * tilew + scr[0] + canvas.width / 2, canvas.height - (ground.maxy * tilew + scr[1] + 100));
	ctx.globalAlpha = Math.max(0, Math.min(1, (t - 850) / 80));
	ctx.font = ctx.font = "50px Arial";
	ctx.fillText("Thanks for playing!", ground.max * tilew + scr[0] + canvas.width / 2, canvas.height - (ground.maxy * tilew + scr[1]));
	ctx.globalAlpha = 1;
}

function drawGameOverText() {
	ctx.font = "22px Arial";
	ctx.fillStyle = "red";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "white";
	var t = timer - deathTime
	ctx.globalAlpha = Math.max(0, Math.min(1, t / 50));
	ctx.fillText("Game over", canvas.width / 2, 40);
	ctx.globalAlpha = Math.max(0, Math.min(1, (t - 30) / 50));
	ctx.fillText("The stickman died. Horribly", canvas.width / 2, 70);
	ctx.globalAlpha = Math.max(0, Math.min(1, (t - 60) / 50));
	ctx.fillText("With your help, he reached height of " + ground.getHeight(player.x) + " blocks", canvas.width / 2, 100);
	ctx.globalAlpha = Math.max(0, Math.min(1, (t - 110) / 50));
	ctx.fillText("Click to try again", canvas.width / 2, 130);
	ctx.globalAlpha = 1;
}

function getColorScale(scale) {
	t = Math.floor(scale * 255);
	green = (t >= 128 ? 255 : t * 2);
	red = (t < 128 ? 255 : 2 * (255 - t));
	if (red < 0) red = 0;
	if (red > 255) red = 255;
	return "rgb(" + red + "," + green + ",0)";
}