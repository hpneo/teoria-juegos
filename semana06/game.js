function Game() {}

Game.prototype = {
  create: function() {
    this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
    this.background.tileScale.y = 2;
    this.worldSpeed = 200;
    this.background.autoScroll(-this.worldSpeed, 0);

    this.isJumping = false;
    this.jumpPeaked = false;
    this.startJumpY = 0;

    this.water = this.add.tileSprite(0, this.world.height - 30, this.world.width, this.world.height, 'water');
    this.water.tileScale.y = 2;
    this.water.autoScroll(-this.worldSpeed / 2, 0);

    this.player = this.add.sprite(50, 140, 'player');
    this.player.anchor.setTo(0.5);
    this.player.animations.add('running', [0, 1, 2, 3, 2, 1], 15, true);
    this.player.play('running');

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.physics.arcade.gravity.y = 1000;
    this.physics.arcade.enable(this.player);

    this.platformPool = this.add.group();
    this.floorPool = this.add.group();

    this.currentPlatform = new Platform(this.game, this.floorPool, 12, 0, 200, -this.worldSpeed);
    this.platformPool.add(this.currentPlatform);
  },
  update: function() {
    this.platformPool.forEachAlive(function(platform) {
      this.game.physics.arcade.collide(this.player, platform);
    }, this);

    if (this.game.input.activePointer.isDown) {
      this.playerJump();
    }
    else if (this.game.input.activePointer.isUp) {

    }
  },
  playerJump: function() {
    if (this.player.body.touching.down) {
      this.isJumping = true;
      this.startJumpY = this.player.y;
      this.jumpPeaked = false;

      this.player.body.velocity.y = -300;
    }
    else if (this.isJumping && !this.jumpPeaked) {
      var distanceJump = this.startJumpY - this.player.y;

      if (distanceJump <= 120) {
        this.player.body.velocity.y = -300;
      }
      else {
        this.jumpPeaked = true;
      }
    }
  }
};