function Lava() {
	this.startSpeed = 0.01;
	this.speed = this.startSpeed;
	this.y = -2;
	this.lethalDepth = 2;
	this.heat = 0;
	this.heatRange = 2;
	this.running = false;
	this.startTime = 0;
	this.init = function() {
		this.running = true;
		this.startTime = timer;
	}
	this.update = function() {
		if (this.running) {
			this.y += this.speed;
			
			var thre = 4;
			var d = this.y - ground.maxy + thre;
			if (d > 0) {
				this.speed *= 0.99;
			}
			else {
				this.speed = this.startSpeed * ((8000 + timer - this.startTime) / 8000);
			}
			var dist = ground.getHeight(player.x) - this.y;
			if (won) {
				this.heat = 0;
			}
			else{
				if (dist < this.heatRange) {
					this.heat += 0.005 * (1 - dist / this.heatRange);
				}
				else {
					this.heat -= 0.01;
					this.heat = Math.max(this.heat, 0);
				}
				this.speed = Math.min(0.05, this.speed);
				if (this.heat >= 1) {
					gameOver();
				}
			}
			sounds.lava.volume = muted ? 0 : Math.min(1, this.heat);
		}
	}
	this.draw = function() {
		var lavaOrange = "#ff3300"
		ctx.fillStyle = lavaOrange;
		ctx.fillRect(0, canvas.height - this.y * tilew - scr[1], ground.max * tilew + scr[0], canvas.height);
		
		
		for (var i = 0; i < 2; ++i) {
			var size = 10;
			var waveLen = size * 10;
			ctx.beginPath();
			var y = canvas.height - (this.y * tilew + scr[1] - 12 * size) + i * 5;
			ctx.beginPath();
			for (var x = timer % waveLen - waveLen / 2; x < canvas.width + waveLen / 2; x += waveLen) {
				ctx.arc(i ? (canvas.width - x) : x, y, 13 * size, Math.PI * 3 / 2 - 0.39479, Math.PI * 3 / 2 + 0.39479);  // trust me.
			}
			ctx.strokeStyle = i ? lavaOrange : "red";
			ctx.lineWidth = 30;
			ctx.stroke();
			ctx.lineWidth = 1;
		}
		
		
		ctx.fillStyle = "red";
		ctx.globalAlpha = this.heat;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
	}
}