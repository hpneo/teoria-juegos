function Boot(game) {}

Boot.prototype = {
  preload: function() {
    this.game.load.image('loading', 'img/loading-bar.png');
  },
  create: function() {
    this.game.state.start('Preload');
  }
};