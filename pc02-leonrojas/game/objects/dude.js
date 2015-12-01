function Dude(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'dude');

  this.game = game;
  this.health = 5;
  this.points = 0;
  this.mushrooms = 0;
  this.killedInvaders = 0;
  this.anchor.setTo(0.5);

  this.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;
  this.game.add.existing(this);
  this.frame = 4;

  this.animations.add('left', [0, 1, 2, 3, 0], 24, false);
  this.animations.add('right', [5, 6, 7, 8, 5], 24, false);
}

Dude.prototype = Object.create(Phaser.Sprite.prototype);
Dude.prototype.constructor = Dude;