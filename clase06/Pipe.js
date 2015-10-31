function Pipe(game, x, y, speed, bird) {
  Phaser.Sprite.call(this, game, x, y, 'pipe');
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.velocity.x = speed;
  this.body.immovable = true;
}

Pipe.prototype = Object.create(Phaser.Sprite.prototype);
Pipe.prototype.constructor = Pipe;

Pipe.prototype.update = function() {};