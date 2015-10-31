MainMenu = function(game){};
MainMenu.prototype = {
	create: function(){
		this.add.sprite(0, 0, 'background');
		this.add.sprite(-130, 450, 'monster-cover');
		this.add.sprite(123, 60, 'title');
		this.add.button(229, 807, 'button-start', this.startGame, this);
	},
	startGame: function() {
		this.state.start('Game');
	}
};