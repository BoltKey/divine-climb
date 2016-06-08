function Ground() {
	var xblocks = 30;
	var yblocks = 18;
	
	this.maxPow = 1000;
	this.pow = 500;
	this.removeCost = 50;
	this.addCost = 50;
	this.powRegen = 1;
	
	this.randomChange = -2.2;
	this.fixedChange = 2;
	
	this.coinFixed = 2;
	this.coinRand = 2;
	
	this.coinMinDel = 5;
	this.coinMaxDel = 15;
	this.heights = [2, 2, 0, 2, 2, 4, 2];
	this.max = 1000;
	this.maxy = 350;
	
	this.beamTime = 0;
	this.beamx = 0;
	
	tilew = Math.floor(Math.min(canvas.height / yblocks, canvas.width / xblocks));
	var lastCoin = 0;
	for (var i = this.heights.length; i < this.max; ++i) {
		lastCoin += 1;
		var height = Math.max(0, Math.floor(this.heights[i-1] + Math.random() * this.randomChange + this.fixedChange));
		if (height >= this.maxy) {
			this.max = i;
			this.heights.push(this.maxy);
			break;
		}
		this.heights.push(height);
		
		this.randomChange -= 0.012;
		this.fixedChange += 0.01;
		
		var r = Math.random() * (this.coinMaxDel - this.coinMinDel);
		if (r > 0 && r < lastCoin - this.coinMaxDel ) {
			coins.push(new Coin(i, height + Math.sign(Math.random() - 0.5) * (this.coinFixed + Math.floor(Math.random() * this.coinRand))));
			lastCoin = 0;
		}
		
	}
	this.update = function() {
		this.pow += this.powRegen;
		this.pow = Math.min(this.pow, this.maxPow);
		this.beamTime -= Math.sign(this.beamTime);
	}
	this.getHeight = function(x) {
		return this.heights[x];
	}
	this.removeBlock = function(x, multi) {
		if (ingame && x < this.max) {
			if (player.x === x) {
				if (Math.random() < 0.5)
					x += 1;
				else 
					x -= 1;
			}
			if (this.pow >= this.removeCost) {
				this.pow -= this.removeCost;
				this.heights[x] -= multi || 1;
				this.beamx = x;
				this.beamTime = 8;
				sounds.remove[sounds.remove.curr++ % 10].play();
			}
		}
	}
	this.addBlock = function(x, multi) {
		if (ingame && x < this.max) {
			if (player.x === x) {
				if (Math.random() < 0.5)
					x += 1;
				else 
					x -= 1;
			}
			if (this.pow >= this.addCost) {
				this.pow -= this.addCost;
				this.heights[x] += multi || 1;	
				this.beamx = x;
				this.beamTime = -8;
				sounds.drop[sounds.remove.curr++ % 10].play();
			}
		}
	}
	this.getMaxReach = function(x) {
		var maxx = x;
		var maxh = this.heights[x];
		var forw = true;
		var backw = true;
		for (var i = 1; i < 30; ++i) {
			var diff = this.heights[x + i - 1] - this.heights[x + i];
			if (diff >= -1 && diff <= 2 && forw) {
				if (this.heights[x + i] > maxh) {
					maxh = this.heights[x + i];
					maxx = x + i;
				}
			}
			else {
				forw = false;
			}
			diff = this.heights[x - i + 1] - this.heights[x - i];
			if (diff >= -1 && diff <= 2 && backw) {
				if (this.heights[x - i] > maxh) {
					maxh = this.heights[x - i];
					maxx = x - i;
				}
			}
			else {
				backw = false;
			}
		}
		return [maxx, maxh]
	}
	
	this.draw = function() {
		//draw beam
		if (this.beamTime !== 0) {
			var sheety = 4;
			var sheetx = (this.beamTime + 8) % 8;
			var x = this.beamx * tilew + scr[0];
			for (var y = 0; y < canvas.height; y += tilew) {
				ctx.drawImage(graphics.player, sheetx * 33, sheety * 33, 32, 32, x, y, tilew, tilew);
			}
		}
		
		// ground
		ctx.fillStyle = "black";
		for (var i = 0; i < this.heights.length; ++i) {
			var x = i * tilew;
			ctx.fillRect(i * tilew + scr[0], canvas.height - this.heights[i] * tilew - scr[1], tilew, canvas.height * 5);
		}
		
		// pow indicator
		var x = 20;
		var y = 20;
		var w = 200;
		var h = 20;
		ctx.beginPath();
		ctx.rect(x, y, w, h);
		ctx.strokeStyle = "white";
		ctx.stroke();
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.beginPath();
		var ratio = this.pow / this.maxPow
		ctx.rect(x, y, w * ratio, h);
		ctx.fillStyle = getColorScale(ratio);
		ctx.fill();
		ctx.fillText(Math.floor(this.pow) + "/" + Math.floor(this.maxPow) + "; +" + Math.floor(this.powRegen * 30) + "/s", x + w * 1.5, y + h);
		
	}
}