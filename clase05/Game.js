Game = function(game){}

Game.prototype = {

	create:function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 1000;
		this.ground = this.add.sprite(0,638,'ground');
		this.game.physics.arcade.enable(this.ground);
		this.ground.body.immovable =true;
		this.ground.body.allowGravity = false;
		this.levelData = JSON.parse(this.game.cache.getText('level'));
		this.player = this.add.sprite(this.levelData.playerStart.x +20,
							this.levelData.playerStart.y,'player',3);
		this.player.anchor.setTo(0.5);
		this.player.animations.add('walking',[0,1,2,1],6,true);
		this.game.physics.arcade.enable(this.player);
		this.cursors  = this.game.input.keyboard.createCursorKeys();
		this.platforms = this.add.group();
		this.platforms.enableBody = true;
		this.levelData.platformData.forEach(function(element){
			this.platforms.create(element.x,element.y,'platform');
		},this);
		this.platforms.setAll('body.immovable',true);
		this.platforms.setAll('body.allowGravity',false);
		this.game.world.setBounds(0,0,360,700);
		this.player.body.collideWorldBounds=true;
		this.goal = this.add.sprite(0,90,'goal');
		this.elapsed =0;
		this.barrels = this.add.group();
		this.barrels.enableBody=true;
		this.limit = this.levelData.barrelFrequency=5*1000;
	},
	createBarrel:function(){
		var barrel = this.barrels.getFirstDead(false);
		if(!barrel){
			barrel = this.game.add.sprite(0,0,'barrel');
			this.barrels.add(barrel);
		}
		barrel.reset(this.levelData.goal.x,this.levelData.goal.y);
		barrel.x=this.levelData.goal.x;
		barrel.y=this.levelData.goal.y;
		barrel.body.collideWorldBounds=true;
		barrel.body.bounce.set(1,0);
		barrel.body.velocity.x=this.levelData.barrelSpeed;
		barrel.body.velocity.y=this.levelData.barrelSpeed;
		console.log(this.levelData);
	},
	update:function(){
		this.elapsed+=this.game.time.elapsed;
		if(this.elapsed>=this.limit){
			this.elapsed=0;
			this.createBarrel();
		}

		this.barrels.forEach(function(element){
			if(element.x < 10 && element.y>600){
				element.kill();
			}
		})

		this.game.physics.arcade.collide(this.player,this.ground);
		this.game.physics.arcade.collide(this.player,this.platforms);
		this.game.physics.arcade.collide(this.platforms,this.barrels);
		this.game.physics.arcade.collide(this.ground,this.barrels);
		this.game.physics.arcade.collide(this.player,this.barrels);
		this.player.body.velocity.x = 0;
		if(this.cursors.left.isDown){
			this.player.body.velocity.x = -180;
			this.player.play('walking');
			this.player.scale.setTo(1,1);
		}
		else if(this.cursors.right.isDown){
			this.player.body.velocity.x = 180;
			this.player.play('walking');
			this.player.scale.setTo(-1,1);
		}else{
			this.player.animations.stop();
			this.player.frame = 3;
		}
		if(this.cursors.up.isDown && 
				this.player.body.touching.down){
			this.player.body.velocity.y = -550;
		}
	}
}