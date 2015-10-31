function Boost() {}

Boost.prototype.preload = function() {
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;

  this.load.image('preloadbar', 'assets/images/preloader-bar.png');
};

Boost.prototype.create = function() {
  this.game.state.start('Preloader');
};