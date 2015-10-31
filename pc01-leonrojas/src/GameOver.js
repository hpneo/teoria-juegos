GameOver = function(game){
}

GameOver.prototype = {
	create:function(){
		this.game.add.image(0, this.game.height / 2, 'game-over');
	}
}