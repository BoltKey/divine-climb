var divPos = {x: 0, y: 0},
lastDivPos,
keysDown,
lastkd,
ground,
tilew,
player,
lava,
coins = [],
graphics  = {},
sounds = {},
ingame = true,
won = false,
timer = 0,
fps = 50,
programStart,
deathTime,
tutorStartTime,
muted = false,
kongregate

;


function main() {
	// kong
	if (typeof(kongregateAPI) !== 'undefined') {
		kongregateAPI.loadAPI(onComplete);
		
	}
	function onComplete() {
		kongregate = kongregateAPI.getAPI();
	}
		
	
	console.log("main");
	programStart = Date.now();
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
	
	ctx.textAlign = "center";
	
	var a = new Image();
	a.src = "graphics/sheet.png";
	graphics['player'] = a;
	a = new Image();
	a.src = "graphics/wjtut.png";
	graphics.wjtut = a;
	
	// sounds
	sounds.lava = new Audio("sounds/lava.wav");
	sounds.lava.loop = true;
	sounds.lava.volume = 0;
	sounds.lava.play();
	sounds.music = new Audio("sounds/music.mp3");
	sounds.music.loop = true;
	sounds.music.volume = 0.1;
	sounds.music.play();
	sounds.victory = new Audio("sounds/victory.mp3");
	sounds.drop = [];
	for (var i = 0; i < 10; ++i) 
		sounds.drop.push(new Audio("sounds/place.wav"));
	sounds.drop.curr = 0;
	sounds.remove = [];
	for (var i = 0; i < 10; ++i) 
		sounds.remove.push(new Audio("sounds/remove.wav"));
	sounds.remove.curr = 0;
	sounds.mana = new Audio("sounds/mana.wav");
	
	scr = new ScrollManager([canvas.width, canvas.height], 0.036);
	
	mainloop();
}

function mainloop() {
	requestAnimationFrame(mainloop);
	while(timer / fps < (Date.now() - programStart) / 1000) {
		++timer;
		
		player.update();
		
		scr.update([player.x * tilew + canvas.width * 0.3, ground.getHeight([player.x]) * tilew + canvas.height * 0.18]);
		lava.update();
		ground.update();
		
		checkKeys();
		checkMouse();
		
		lastmd = mouseDown;
		lastkd = JSON.parse(JSON.stringify(keysDown));
	}
	draw();
}

function gameOver() {
	if (ingame) {
		console.log("die");
		deathTime = timer;
		ingame = false;
		kongregate.stats.submit("height", ground.getHeight(player.x));
	}
}

function restart() {
	coins = [];
	ground = new Ground();
	player = new Player();
	lava = new Lava();
	sounds.lava.volume = 0;
	ingame = true;
}

function win() {
	if (!won) {
		console.log("win");
		wonTime = timer;
		won = true;
		$(sounds.music).animate({volume: 0}, 3000);
		sounds.victory.volume = 0;
		$(sounds.victory).animate({volume: 1}, 5000);
		sounds.victory.play();
	}
}