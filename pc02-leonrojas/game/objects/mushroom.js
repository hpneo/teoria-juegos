function Mushroom(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'honguito');

  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
}

Mushroom.prototype = Object.create(Phaser.Sprite.prototype);
Mushroom.prototype.constructor = Mushroom;