Preloader = function(game){
};
Preloader.prototype = {
	preload: function(){
		this.stage.backgroundColor = '#B4D9E7';
		this.preloadBar = this.add.sprite((this.game.width-311)/2, (this.game.height-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		this.load.image('background', 'img/background.png');
		this.load.image('floor', 'img/floor.png');
		this.load.image('monster-cover', 'img/monster-cover.png');
		this.load.image('title', 'img/title.png');
		this.load.image('game-over', 'img/gameover.png');
		this.load.image('score-bg', 'img/score-bg.png');
		this.load.image('button-pause', 'img/button-pause.png');
		this.load.spritesheet('candy', 'img/candy.png', 82, 98);
		this.load.spritesheet('monster-idle', 'img/monster-idle.png', 103, 131);
		this.load.spritesheet('button-start', 'img/button-start.png', 401, 143);
	},
	create: function(){
		this.state.start('MainMenu');
	}
};