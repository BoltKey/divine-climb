function Coin(x, y) {
	this.x = x;
	this.y = y;
	this.grab = function() {
		
	}
	this.draw = function() {
		var sheety = 5;
		var sheetx = Math.floor((timer + this.x) / 4) % 8;
		var x = this.x * tilew + scr[0];
		var y = canvas.height - ((this.y + 1) * tilew + scr[1]);
		ctx.drawImage(graphics.player, sheetx * 33, sheety * 33, 32, 32, x, y, tilew, tilew);
	}
}