function Contra(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'contra2');

  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
}

Contra.prototype = Object.create(Phaser.Sprite.prototype);
Contra.prototype.constructor = Contra;