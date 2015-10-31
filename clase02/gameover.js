function GameOver(game) {}

GameOver.prototype = {
  init: function(score) {
    console.log(score);
  },
  create: function() {
    this.title = game.add.image(160, 240, 'gameover');
    this.title.anchor.setTo(0.5, 0.5);
  }
};