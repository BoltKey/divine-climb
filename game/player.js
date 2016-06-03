function Player() {
	this.rate = 10;  // delay between moves
	this.x = 0;  
	this.lastMove = 0;
	// y is calculated by ground object
	this.maxReach = ground.getMaxReach(this.x);
	
	this.move = function() {
		this.maxReach = ground.getMaxReach(this.x);
		this.x += Math.sign(this.maxReach[0] - this.x);
		this.lastMove = 0;
		lava.y = Math.max(ground.getHeight(this.x) - 15, lava.y);
	}
	this.update = function() {
		if (++this.lastMove > this.rate) {
			this.move();
		}
	}
	this.draw = function() {
		var y = ground.getHeight(this.x) + 1;
		ctx.fillStyle = "red";
		ctx.fillRect(this.x * tilew + scr[0], canvas.height - y * tilew - scr[1], tilew, tilew);
	}
}