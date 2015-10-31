Plant = function(x, y,game,patch, bullets) {
	Phaser.Sprite.call(this, game, x, y,'plant');
	this.patch = patch;
	this.game = game;
	this.anchor.setTo(0.5);
	this.game.physics.arcade.enable(this);
	this.body.immovable = true;
  this.bullets = bullets;

  this.shootTimer = 0;
}

Plant.prototype = Object.create(Phaser.Sprite.prototype);
Plant.prototype.constructor = Plant;

Plant.prototype.update = function() {
  this.shootTimer += this.game.time.elapsed;

  if (this.shootTimer >= 1500) {
    this.shootTimer = 0;

    this.shoot();
  }
};

Plant.prototype.shoot = function() {
  var bullet = this.bullets.getFirstExists(false);

  if (!bullet) {
    bullet = new Bullet(this.game, this.x, this.y);
    this.bullets.add(bullet);
  }
  else {
    bullet.reset(this.x, this.y);
  }

  bullet.body.velocity.x = 100;
};

Plant.prototype.reset = function(x,y,patch){
	Phaser.Sprite.prototype.reset.call(this,x,y);
	this.patch = patch;
};