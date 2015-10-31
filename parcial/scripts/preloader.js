function Preloader() {}

Preloader.prototype.preload = function() {
  this.preloadBar = this.add.sprite(this.game.world.centerX ,this.game.world.centerY, 'preloadbar');
  this.preloadBar.anchor.setTo(0.5);
  this.preloadBar.scale.setTo(3);

  this.load.setPreloadSprite(this.preloadBar);

  this.load.image('bullet', 'assets/images/bullet.png');
  this.load.image('enemy_particle', 'assets/images/enemyParticle.png');
  this.load.spritesheet('green_enemy', 'assets/images/green_enemy.png', 50, 46, 3, 1, 1);
  this.load.spritesheet('red_enemy', 'assets/images/red_enemy.png', 50, 46, 3, 1, 1);
  this.load.spritesheet('yellow_enemy', 'assets/images/yellow_enemy.png', 50, 46, 3, 1, 1);
  this.load.image('player', 'assets/images/player.png');
  this.load.image('space', 'assets/images/space.png');

  this.load.audio('orchestra', 'assets/audio/8bit-orchestra.ogg');
};

Preloader.prototype.create = function() {
  this.game.state.start('Game');
};