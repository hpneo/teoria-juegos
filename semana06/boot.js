function Boot() {}

Boot.prototype = {
  preload: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.load.image('preloader', 'assets/images/preloader-bar.png');
  },
  create: function() {
    this.state.start('Preload');
  }
};