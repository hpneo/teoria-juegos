function Player(game, x, y) {
  var state = Player.states[game.rnd.between(0, Player.states.length - 1)];

  Phaser.Sprite.call(this, game, x, y, 'alien' + state + '_stand');

  this.game = game;
  this.gameState = this.game.state.getCurrentState();
  this.state = state.toLowerCase();
  this.anchor.setTo(0.5);

  this.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;
  this.body.velocity.y = 500;
  this.game.add.existing(this);
}

Player.states = [
  'Beige',
  'Blue',
  'Green',
  'Pink',
  'Yellow'
];

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.jump = function() {
  if (this.gameState.running) {
    this.body.velocity.y = -700;
  }
};

Player.prototype.setState = function(key, state) {
  this.state = state.toLowerCase();
  this.loadTexture('alien' + state + '_stand', 0, false);
};

Player.prototype.collideEnemy = function(player, enemy) {
  if (player.state === enemy.state) {
    this.gameState.increaseMana(enemy.state);
  }
  else {
    this.gameState.decreaseMana(enemy.state);
  }

  enemy.kill();
}