Game = function(game){}

Game.prototype = {
	preload:function(){

	},
	create:function(){
		this.background = this.add.sprite(0,0,'background');
		this.plants = this.add.group();
    this.zombies = this.add.group();
    this.bullets = this.add.group();
    this.bullets.enableBody = true;

		this.createLandPatches();

    this.game.time.events.loop(3500, this.plantZombie, this);
	},
	update:function(){
    this.game.physics.arcade.overlap(this.bullets, this.zombies, this.killZombie, null, this);
	},
	createLandPatches:function(){
		this.patches = this.add.group();

		var rectangle = this.add.bitmapData(40,50);
		rectangle.ctx.fillStyle ='#000';
		rectangle.ctx.fillRect(0,0,40,50);

		var j,patch,alpha;
		var dark = false;

		for(var i = 0;i<10;i++){
			for(var j=0;j<5;j++){
				patch = new Phaser.Sprite(this.game,
						64+i*40,24+j*50,rectangle);
				this.patches.add(patch);
				alpha = dark ? 0.2: 0.1;
				dark= !dark;
				patch.alpha = alpha;
				patch.inputEnabled = true;
				patch.isBusy = false;
				patch.events.onInputDown.add(
						this.plantPlant,this);
			}
		}
	},
	plantPlant:function(patch){
		if(!patch.isBusy) {
			patch.isBusy = true;
			var plant = this.createPlant(
				patch.x + patch.width/2,
					patch.y+patch.height/2,
					this.game,patch);
		}
	},
	createPlant:function(x,y,game,patch){
			var newElement = this.plants.getFirstDead();
			if(!newElement){
				newElement = new Plant(x,y,game,patch, this.bullets);
				this.plants.add(newElement);
			}else{
				newElement.reset(x,y,game,patch);
			}
			return newElement;
	},
  plantZombie: function(patch) {
    patch = patch || this.patches.getAt(game.rnd.between(0, this.patches.length - 1));

    if (!patch.isBusy) {
      patch.isBusy = true;
      var zombie = this.createZombie(patch.x + patch.width / 2, patch.y + patch.height / 2, this.game, patch);
    }
  },
  createZombie: function(x, y, game, patch) {
    var newElement = this.zombies.getFirstDead();

    if (!newElement) {
      newElement = new Zombie(x, y, game, patch);
      this.zombies.add(newElement);
    }
    else {
      newElement.reset(x, y, game, patch);
    }

    return newElement;
  },
  killZombie: function(bullet, zombie) {
    bullet.kill();
    zombie.kill();
  }
}