function Preload(game) {}

Preload.prototype = {
  preload: function() {
    var loadingBar = this.game.add.sprite(289, 45, 'loading');
    loadingBar.anchor.setTo(0.5, 0.5);
    loadingBar.x = this.game.width / 2;
    loadingBar.y = this.game.height / 2;

    this.load.setPreloadSprite(loadingBar);

    this.load.image('bgLayer1', 'img/bgLayer1.png');
    this.load.image('bgWelcome', 'img/bgWelcome.jpg');
    this.load.spritesheet('candy', 'img/candy.png', 82, 98);
    this.load.spritesheet('hero', 'img/hero.png', 155, 77);
    this.load.image('welcome_aboutButton', 'img/welcome_aboutButton.png');
    this.load.image('welcome_hero', 'img/welcome_hero.png');
    this.load.image('welcome_playButton', 'img/welcome_playButton.png');
    this.load.image('welcome_title', 'img/welcome_title.png');
  },
  create: function() {
    this.state.start('Menu');
  }
};