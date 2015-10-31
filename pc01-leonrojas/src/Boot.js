Boot = function(game){};
Boot.prototype = {
	preload: function(){
		this.load.image('preloaderBar', 'img/loading-bar.png');
	},
	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.state.start('Preloader');
	}
};