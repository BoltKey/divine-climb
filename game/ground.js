function Ground() {
	var xblocks = 30;
	var yblocks = 18;
	this.randomChange = 2.6;
	this.fixedChange = -0.3;
	this.heights= [0];
	tilew = Math.floor(Math.min(canvas.height / yblocks, canvas.width / xblocks));
	for (var i = 1; i < 200; ++i) {
		this.heights.push(Math.max(0, Math.floor(this.heights[i-1] + Math.random() * this.randomChange + this.fixedChange)));
	}
	this.getHeight = function(x) {
		return this.heights[x];
	}
	this.removeBlock = function(x, multi) {
		if (player.x === x) {
			if (Math.random() < 0.5)
				x += 1;
			else 
				x -= 1;
		}
		this.heights[x] -= multi || 1;
	}
	this.addBlock = function(x, multi) {
		if (player.x === x) {
			if (Math.random() < 0.5)
				x += 1;
			else 
				x -= 1;
		}
		this.heights[x] += multi || 1;		
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
		ctx.fillStyle = "black";
		for (var i = 0; i < this.heights.length; ++i) {
			var x = i * tilew;
			ctx.fillRect(i * tilew + scr[0], canvas.height - this.heights[i] * tilew - scr[1], tilew, canvas.height * 2);
		}
	}
}