function Menu(game) {}

Menu.prototype = {
  create: function() {
    this.background = this.game.add.sprite(0, 0, 'bgWelcome');
    this.welcomeTitle = this.game.add.sprite(160, 160, 'welcome_title');
    this.playButton = this.game.add.button(160, 350, 'welcome_playButton', this.startGame, this);

    this.hero = this.add.sprite(0, 0, 'hero', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
    this.hero.animations.add('flying');
    this.hero.play('flying', 24, true);
  },
  startGame: function() {
    this.game.state.start('Game');
  }
};