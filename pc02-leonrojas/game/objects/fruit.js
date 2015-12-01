function Fruit(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'fruta');

  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.frame = frame;
}

Fruit.prototype = Object.create(Phaser.Sprite.prototype);
Fruit.prototype.constructor = Fruit;

Fruit.prototype.reset = function(x, y, frame) {
  Phaser.Sprite.prototype.reset.call(this, x, y);
  this.body.velocity.y = 0;
  this.frame = frame;
};