Pipe = function(game,x,y, speed, bird){
	this.bird = bird;
	Phaser.Sprite.call(this,game,x,y,'pipe');
	game.physics.enable(this,Phaser.Physics.ARCADE);
	this.body.velocity.x = speed;
	this.body.immovable = true;
	this.giveScore = true;
  this.scoreSound = game.add.sound('score');
};

Pipe.prototype = Object.create(Phaser.Sprite.prototype);

Pipe.prototype.constructor = Pipe;

Pipe.prototype.update=function(){
	if(this.x<-this.width){
		this.destroy();
	}
	if(this.x+this.width<this.bird.x && this.giveScore){
		this.giveScore = false;
		Global.score += 0.5;
    this.scoreSound.play();
	}
  console.log(Global.score);
}