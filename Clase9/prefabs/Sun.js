Sun = function(x, y,game) {
	Phaser.Sprite.call(this, game, x, y);
}

Sun.prototype = Object.create(Phaser.Sprite.prototype);
Sun.prototype.constructor = Sun;