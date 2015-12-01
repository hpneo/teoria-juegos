function Game() {}

Game.prototype.preload = function () {
  this.load.image('b1', 'assets/b1.png');
  this.load.image('bg', 'assets/bg.jpg');
  this.load.image('coinGold', 'assets/coinGold.png');
  this.load.audio('eat', 'assets/eat.mp3');
  this.load.image('fishSwim1', 'assets/fishSwim1.png');
  this.load.image('flyFly1', 'assets/flyFly1.png');
  this.load.image('ground', 'assets/ground.png');
  this.load.image('hud_heartFull', 'assets/hud_heartFull.png');
  this.load.image('p1', 'assets/p1.png');
  this.load.image('pokerMad', 'assets/pokerMad.png');
  this.load.image('slimeWalk1', 'assets/slimeWalk1.png');
  this.load.image('snailWalk1', 'assets/snailWalk1.png');
  this.load.image('star', 'assets/star (2).png');
};

Game.prototype.create = function() {
  this.game.physics.startSystem(Phaser.Physics.ARCADE);

  this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'bg');
  this.background.tileScale.y = 1;
  this.worldSpeed = 200;
  this.background.autoScroll(-this.worldSpeed, 0);

  this.ground = this.add.tileSprite(0, this.world.height-70, this.world.width, 70, 'ground');
  this.player = new Player(this.game, 0, 70);

  this.game.physics.enable([ this.player, this.ground ], Phaser.Physics.ARCADE);

  this.ground.body.collideWorldBounds = true;
  this.ground.body.immovable = true;
  this.ground.body.allowGravity = false;
};

Game.prototype.update = function() {
  this.game.physics.arcade.collide(this.player, this.ground);
  this.player.body.velocity.x = 0;
};