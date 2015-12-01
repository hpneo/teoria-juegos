function Invader(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'invader');

  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.animations.add('default', [0, 1, 2, 3, 0], 24, true);
  this.play('default');
}

Invader.prototype = Object.create(Phaser.Sprite.prototype);
Invader.prototype.constructor = Invader;