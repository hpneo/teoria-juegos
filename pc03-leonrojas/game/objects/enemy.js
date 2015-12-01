function Enemy(game, x, y) {
  var state = Enemy.states[game.rnd.between(0, Enemy.states.length - 1)];

  Phaser.Sprite.call(this, game, x, y, 'hudPlayer_' + state);

  this.game = game;
  this.state = state.toLowerCase();
  this.anchor.setTo(0.5);

  this.game.physics.arcade.enable(this);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.body.velocity.x = -100;
  this.body.velocity.y = 100;
  this.game.add.existing(this);
}

Enemy.states = [
  'beige',
  'blue',
  'green',
  'pink',
  'yellow'
];

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.setState = function(state) {
  this.state = state.toLowerCase();
  this.loadTexture('hudPlayer_' + state, 0, false);
};