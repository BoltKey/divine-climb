function ScrollManager(levelsize, sensitivity) {
	this.fixed = false;
	this.sensitivity = sensitivity;
	this.shakeoffset = [0, 0];
	this[0] = 0;
	this[1] = 1;
	this.size = levelsize;
	this.scrollspeed = [0, 0];
	this.midrelative = [0, 0];
	this.posoffset = [0, 0];
	this.update = function(ppos) {
		this.midrelative = [this.posoffset[0] + ppos[0] - (canvas.width - 100) / 2, this.posoffset[1] + ppos[1] - (canvas.height - 10) / 2];
		for (i = 0; i < 2; ++i) {
			this.scrollspeed[i] -= this.midrelative[i] * this.sensitivity;
			this.scrollspeed[i] /= 2;
			this.posoffset[i] += this.scrollspeed[i];
			this.shakeoffset[i] -= this.shakeoffset[i] / 10;
		}
		this[0] = Math.floor(this.posoffset[0] + this.shakeoffset[0]);
		this[1] = Math.floor(this.posoffset[1] + this.shakeoffset[1]);
	}
	this.shake = function(force) {
		this.shakeoffset[0] += Math.random() * force - 0.5 * force;
		this.shakeoffset[1] += Math.random() * force - 0.5 * force;
	}
	
}