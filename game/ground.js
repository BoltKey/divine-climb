function Ground() {
	var xblocks = 30;
	var yblocks = 18;
	this.randomChange = 3.5;
	this.fixedChange = -0.6;
	this.heights= [0];
	tilew = Math.floor(Math.min(canvas.height / yblocks, canvas.width / xblocks));
	for (var i = 1; i < xblocks; ++i) {
		this.heights.push(Math.max(0, Math.floor(this.heights[i-1] + Math.random() * this.randomChange + this.fixedChange)));
	}
	
	
	this.draw = function() {
		for (var i = 0; i < this.heights.length; ++i) {
			var x = i * tilew;
			ctx.fillRect(i * tilew, canvas.height - this.heights[i] * tilew, tilew, canvas.height * 2);
		}
	}
}