Menu = function(game){
}

Menu.prototype = {
	create:function(){
		this.bg = this.game.add.sprite(0,0,'bgWelcome');
		this.welcome_title = this.game.add.sprite(0,0,'welcome_title');
		this.welcome_title.x = 160;
		this.welcome_title.y = 150;
		this.btnStart = this.game.add.button
		(160,350,'welcome_playButton',this.startGame,this);

		this.hero = this.add.sprite(0,0,'hero',
			[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);
		this.hero.animations.add('flying');
		this.hero.play('flying',24,true);

	},

	startGame:function(){

	}

}