Platform = function(game,floorPool,numTiles,x,y,speed, coinsPool){
	Phaser.Group.call(this,game);
	this.enableBody = true;
	this.floorPool = floorPool;
  this.coinsPool = coinsPool;
	this.game = game;
	this.tileSize =40;
  this.speed = speed;
	this.prepare(numTiles,x,y,speed);
}

Platform.prototype = Object.create(Phaser.Group.prototype);

Platform.prototype.constructor = Platform;

Platform.prototype.prepare = function(numTiles,x,y,speed){
	this.alive = true;

	var  i = 0;

	while(i < numTiles){
		var floor = this.floorPool.getFirstExists(false);
		if(!floor){
			floor = new Phaser.Sprite
			(this.game,x+i*this.tileSize,y,'floor');
		}else{
			floor.reset(x+i*this.tileSize,y);
		}
		this.add(floor);
		i++;
	}
	this.setAll('body.immovable',true);
	this.setAll('body.allowGravity',false);
	this.setAll('body.velocity.x',speed);
  this.addCoins(speed);
}

Platform.prototype.kill = function() {
  this.callAll('kill');

  var sprites = [];

  this.forEach(function(tile) {
    sprites.push(tile);
  }, this);

  sprites.forEach(function(tile) {
    this.floorPool.add(tile);
  }, this);
}

Platform.prototype.addCoins = function(speed) {
  var coinsY = 90 + Math.random() * 110,
      hasCoin;

  this.forEach(function(tile) {
    hasCoin = Math.random() <= 0.4;

    if (hasCoin) {
      var coin = this.coinsPool.getFirstExists(false);

      if (!coin) {
        coin = new Phaser.Sprite(this.game, tile.x, tile.y - coinsY, 'coin');
        this.coinsPool.add(coin);
      }
      else {
        coin.reset(tile.x, tile.y - coinsY);
      }

      coin.body.velocity.x = speed;
      coin.body.allowGravity = false;
    }
  }, this);
}