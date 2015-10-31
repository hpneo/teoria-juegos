Bullet = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'bullet');
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;