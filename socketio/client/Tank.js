Tank = function(game,x,y,id){
	// console.log(game);
	Phaser.Sprite.call(this, game, x, y,'tank','tank1');
	this.game = game;
	this.anchor.setTo(0.5,0.5);
	this.canon = new Phaser.Sprite(game,0,0,'tank','turret');
	this.addChild(this.canon);
	this.canon.anchor.setTo(0.3,0.5);
	this.game.physics.enable(this,Phaser.Physics.ARCADE);
	this.keys = this.game.input.keyboard.createCursorKeys();
	this.canon.bringToTop();
	this.game.camera.follow(this);
	this.body.drag.set(0.2);
  this.body.immovable = true;
  this.body.maxVelocity.setTo(400, 400);
  this.body.collideWorldBounds = true;
}

Tank.prototype = Object.create(Phaser.Sprite.prototype);
Tank.prototype.constructor = Tank;

Tank.prototype.update = function(){
	if(this.keys.left.isDown){
		this.angle -=4;
	}
	if(this.keys.right.isDown){
		this.angle +=4;
	}

	if(this.keys.up.isDown){
		this.speed = 200;
	}else{
		this.speed =-4;
	}
	this.canon.rotation =
			this.game.physics.arcade.angleToPointer(this.canon);


	if (this.keys.up.isDown)
    {
        this.currentSpeed = 300;
    }
    else
    {
        if (this.currentSpeed > 0)
        {
            this.currentSpeed -= 4;
        }
    }

    if (this.currentSpeed > 0)
    {
        this.game.physics.arcade.velocityFromRotation
        (this.rotation, this.currentSpeed, this.body.velocity);
    }

}