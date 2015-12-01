function Player(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'p1');

  this.game = game;
  this.anchor.setTo(0.5);

  this.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;
  this.body.velocity.y = 500;
  this.game.add.existing(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;