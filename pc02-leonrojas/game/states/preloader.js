function Preloader() {}

Preloader.prototype = {
	preload: function() {
		this.stage.backgroundColor = '#B4D9E7';
		this.load.image('background2', 'assets/background2.png');
    this.load.image('starfield', 'assets/starfield.jpg');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('contra2', 'assets/contra2.png');
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    this.load.spritesheet('fruta', 'assets/fruta.png', 32, 32);
    this.load.spritesheet('invader', 'assets/invader32x32x4.png', 32, 32);
    this.load.image('honguito', 'assets/honguito.png');
    this.load.image('pandita', 'assets/pandita.png');
	},
	create: function() {
		this.state.start('Game');
	}
};