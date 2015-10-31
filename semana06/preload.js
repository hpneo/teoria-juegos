function Preload() {}

Preload.prototype = {
  preload: function() {
    this.loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloader');
		this.loadingBar.anchor.setTo(0.5);
    this.loadingBar.scale.setTo(3);
		this.load.setPreloadSprite(this.loadingBar);
    this.load.image('floor', 'assets/images/floor.png');
    this.load.image('water', 'assets/images/water.png');
    this.load.image('coin', 'assets/images/coin.png');
    this.load.image('background', 'assets/images/background.png');
    this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 51, 67, 5, 2, 3);
  },
  create: function() {
    this.state.start('Game');
  }
};