RemoteTank = function(game,x,y,id){
  Phaser.Sprite.call(this, game, x, y,'tank','tank2');
  this.game = game;
  this.anchor.setTo(0.5,0.5);
  this.canon = new Phaser.Sprite(game,0,0,'tank', 'turret');
  this.addChild(this.canon);
  this.canon.anchor.setTo(0.3,0.5);
  this.game.physics.enable(this,Phaser.Physics.ARCADE);
  this.keys = this.game.input.keyboard.createCursorKeys();
  this.canon.bringToTop();
  // this.game.camera.follow(this);
  this.body.drag.set(0.2);
  this.body.immovable = true;
  this.body.maxVelocity.setTo(400, 400);
  this.body.collideWorldBounds = true;
  game.add.existing(this);
}

RemoteTank.prototype = Object.create(Phaser.Sprite.prototype);
RemoteTank.prototype.constructor = RemoteTank;