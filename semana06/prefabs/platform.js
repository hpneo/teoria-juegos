function Platform(game, floorPool, numTiles, x, y, speed) {
  Phaser.Group.call(this, game);
  this.enableBody = true;
  this.floorPool = floorPool;
  this.tileSize = 40;
  this.prepare(numTiles, x, y, speed);
}

Platform.prototype = Object.create(Phaser.Group.prototype);
Platform.prototype.constructor = Platform;
Platform.prototype.prepare = function(numTiles, x, y, speed) {
  this.alive = true;

  var i = 0;

  while (i < numTiles) {
    var floor = this.floorPool.getFirstExists(false);

    if (!floor) {
      floor = new Phaser.Sprite(this.game, x + i * this.tileSize, y, 'floor');
    }
    else {
      floor.reset(x + i * tileSize, y);
    }

    this.add(floor);
    i++;
  }
  this.setAll('body.immovable', true);
  this.setAll('body.allowGravity', false);
  // this.setAll('body.velocity.x', speed);
};