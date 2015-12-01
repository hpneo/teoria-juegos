var game = new Phaser.Game(600, 600, Phaser.AUTO);

game.state.add('Preloader', Preloader);
game.state.add('GameOver', GameOver);
game.state.add('Game', Game);
game.state.start('Preloader');