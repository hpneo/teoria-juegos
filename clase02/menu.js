function Menu(game) {}

Menu.prototype = {
  preload: function() {},
  create: function() {
    this.title = this.game.add.sprite(160, 160, 'gametitle');
    this.playButton = this.game.add.button(160, 320, 'play', this.startGame);

    this.title.anchor.setTo(0.5, 0.5);
  },
  startGame: function() {
    this.game.state.start('Game');
  }
};