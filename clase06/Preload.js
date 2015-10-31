function Preload(game) {}

Preload.prototype = {
  preload: function() {
    this.load.image('bird', 'assets/images/bird.png');
    this.load.image('pipe', 'assets/images/pipe.png');
  },
  create: function() {
    this.state.start('Game');
  }
};