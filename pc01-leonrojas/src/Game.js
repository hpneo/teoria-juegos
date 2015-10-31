Game = function(game){
};
Game.prototype = {
	create: function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.physics.arcade.gravity.y = 200;
		this.add.sprite(0, 0, 'background');
		this.floor = this.add.sprite(-30, 800, 'floor');
		this.game.physics.arcade.enable(this.floor);
		this.floor.body.immovable =true;
		this.floor.body.allowGravity = false;
		this.add.sprite(10, 5, 'score-bg');
		this.add.button(534, 5, 'button-pause', this.managePause, this);
		this.player = this.add.sprite(5, 820, 'monster-idle');
		this.player.animations.add('idle', [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
		this.player.animations.play('idle');
		this.game.physics.arcade.enable(this.player);
		this.player.anchor.setTo(0.5,0.5);
		this.player.body.allowGravity = false;
		this.health = 10;
		this.candyGroup = this.add.group();
		this.game.world.setBounds(0,0,game.width,game.height);
		this.player.body.collideWorldBounds=true;
		this.cursors  = this.game.input.keyboard.createCursorKeys();
		this.spawnCandyTimer = 0;
	},
	managePause: function(){
		console.log('pausa');
	},
	update: function(){
		this.spawnCandyTimer += this.time.elapsed;

		if(this.spawnCandyTimer >= 1000) {
			this.spawnCandyTimer = 0;
			this.createcandy();
		}
		this.candyGroup.forEach(function(candy){
			candy.angle += candy.rotateMe;
		});

		this.game.physics.arcade.collide(this.player, this.floor);
		this.game.physics.arcade.overlap(this.player, this.candyGroup, this.eatCandy, null);
		this.player.body.velocity.x = 0;
		if(this.cursors.left.isDown){
			this.player.body.velocity.x = -180;
			this.player.scale.setTo(-1,1);
		}
		else if(this.cursors.right.isDown){
			this.player.body.velocity.x = 180;
			this.player.scale.setTo(1,1);
		}
	},
	eatCandy:function(player,sprite){
		sprite.kill();
	},
	createcandy:function(){
		var dropPos = Math.floor(Math.random()*this.game.width);
		var dropOffset = [-27,-36,-36,-38,-48];
		var candyType = Math.floor(Math.random()*5);
		var candy = this.game.add.sprite(dropPos, dropOffset[candyType], 'candy');
		candy.frame = candyType;
		this.game.physics.enable(candy, Phaser.Physics.arcade);
		candy.inputEnabled = true;
		candy.events.onInputDown.add(this.clickCandy);
		candy.checkWorldBounds = true;
		candy.events.onOutOfBounds.add(this.removeCandy, this);
		candy.anchor.setTo(0.5, 0.5);
		candy.rotateMe = (Math.random()*4)-2;
		this.candyGroup.add(candy);
	},
	clickCandy:function(sprite){
		sprite.destroy();
	},
	removeCandy:function(sprite){
		sprite.destroy();
		this.health--;
		if(this.health == 0){
			this.game.state.start('GameOver');
		}
	}
}
