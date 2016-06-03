function Lava() {
	this.speed = 0.02;
	this.y = -5;
	this.update = function() {
		this.y += this.speed;
	}
	this.draw = function() {
		ctx.fillStyle = "orange";
		ctx.fillRect(0, canvas.height - this.y * tilew - scr[1], canvas.width, canvas.height);
	}
}