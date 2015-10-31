function Preload(game) {}

Preload.prototype = {
  preload: function() {
    var loadingBar = this.add.sprite(160, 240, 'loading');

    loadingBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(loadingBar);

    this.game.load.spritesheet('numbers', 'img/numbers.png', 100, 100);
    this.game.load.image('gametitle', 'img/gametitle.png');
    this.game.load.image('higher', 'img/higher.png');
    this.game.load.image('lower', 'img/lower.png');
    this.game.load.image('gameover', 'img/gameover.png');
    this.game.load.image('play', 'img/play.png');
  },
  create: function() {
    this.game.state.start('Menu');
  }
};