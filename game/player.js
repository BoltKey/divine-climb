function Player() {
	this.rate = 16;  // delay between moves
	this.x = 0;  
	this.currCoin = 0;
	// y is calculated by ground object
	this.maxLead = 9;
	this.lastMove = 0;
	this.coinEffect = 1000;
	this.lastType = "stand";
	this.lastDir = 1;
	
	this.maxReach = ground.getMaxReach(this.x);
	
	this.move = function() {
		
		this.maxReach = ground.getMaxReach(this.x);
		
		var lastH = ground.getHeight(this.x);
		this.lastDir = Math.sign(this.maxReach[0] - this.x);
		if (this.lastDir >= 0 || 
		(this.lastDir === -1 && 
		ground.getHeight(this.x + 1) >= lastH + 2 && 
		ground.getHeight(this.x - 1) === lastH + 1)) {
			this.x += this.lastDir; 
			var nowH = ground.getHeight(this.x);
			this.lastType = ["bigfall", "fall", "run", "climb"][nowH - lastH + 2];
			if (this.maxReach[0] === this.x && nowH === lastH) {
				this.lastType = "idle";
			}
			else {
				this.lastMove = 0;
			}
			lava.y = Math.max(ground.getHeight(this.x) - this.maxLead, lava.y);
			
			//check for win
			if (this.x >= ground.max) {
				win();
			}
			
			if (this.x >= 50 && !tutorStartTime) {
				tutorStartTime = timer;
			}
			// check for coins
			for (var i = -1; i < 2; ++i) {
				var c = coins[this.currCoin + i];
				if (c) {
					var h = ground.getHeight(this.x);
					if (c.x >= this.x - (this.lastType === "climb" || this.lastType === "fall" || this.lastType === "bigfall") && 
						c.x <= this.x &&
						c.y >= h &&
						c.y <= h + (this.lastType === "fall")) {
						console.log("grab coin");
						coins.splice(this.currCoin + i, 1);
						this.coinGrab();
					}
					if (c.x < this.x && i === 0) {
						++this.currCoin;
					}
				}
			}
			//init lava
			if (this.x === 6) {
				lava.init();
			}
		}
	}
	this.coinGrab = function() {
		this.coinEffect = 0;
		ground.maxPow += 100;
		ground.pow += 300;
		ground.pow = Math.min(ground.maxPow, ground.pow);
		ground.powRegen += 0.06;
		sounds.mana.play();
	}
	this.update = function() {
		if (++this.lastMove > this.rate && ingame) {
			this.move();
		}
		++this.coinEffect;
	}
	this.draw = function() {
		var y = canvas.height - (ground.getHeight(this.x) + 1) * tilew - scr[1] ;
		var x = (this.x - 1 + this.lastMove / this.rate) * tilew + scr[0];
		/*ctx.fillStyle = "red";
		ctx.fillRect(this.x * tilew + scr[0], canvas.height - y * tilew - scr[1], tilew, tilew);*/
		var sheety = 0;
		var sheetx = 0;
		var one = 1;
		switch(this.lastType) {
			case "run":
				sheety = 1;
				sheetx = Math.floor(this.lastMove / 2) % 8;
				break;
			case "idle":
			    sheety = 0;
				sheetx = Math.floor(this.lastMove / 3) % 8;
				x = this.x * tilew + scr[0];
				break;
			case "climb":
			    sheety = 2;
				sheetx = Math.floor(this.lastMove / 2) % 8;
				x = (this.x + this.lastDir * (Math.max(0, -1 + 2 * (this.lastMove / this.rate)) - 1)) * tilew + scr[0];
				y = canvas.height - (ground.getHeight(this.x) + Math.min(1, 2 * (this.lastMove / this.rate))) * tilew - scr[1];
				break;
			case "bigfall":
				one = 2;
			case "fall":
				sheety = 3;
				sheetx = Math.floor(this.lastMove / 2) % 8;
				x = (this.x + this.lastDir * (Math.min(1, 2 * (this.lastMove / this.rate)) - 1)) * tilew + scr[0];
				y = canvas.height - (ground.getHeight(this.x) - (Math.max(0, 2 * (this.lastMove / this.rate) - 1) * one)+ 1 + one) * tilew - scr[1];
				break;
		}
		
		ctx.drawImage(graphics.player, sheetx * 33, sheety * 33, 32, 32, x, y, 32, 32)
	}
}