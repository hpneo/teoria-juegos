function Game(game) {}

Game.prototype = {
  create: function() {
    this.timeCreated = 0;
    this.background = this.game.add.sprite(0, 0, 'bgLayer1');
    this.hero = this.add.sprite(0, 0, 'hero');
    this.hero.animations.add('flying');
    this.hero.play('flying', 24, true);
    this.candyGroup = this.game.add.group();
    this.game.physics.enable(this.hero, Phaser.Physics.ARCADE);
    this.hero.body.immovable = true;
  },
  update: function() {
    this.timeCreated += this.game.time.elapsed;

    if (this.timeCreated > 1000) {
      this.timeCreated = 0;
      var candy = this.game.add.sprite(0, 0, 'candy');

      candy.frame = this.game.rnd.integerInRange(0, 4);

      candy.isMalito = (candy.frame === 4);
      candy.x = this.game.width;
      candy.y = this.game.rnd.integerInRange(candy.height / 2, this.game.height - candy.height / 2);
      candy.anchor.setTo(0.5, 0.5);
      this.candyGroup.add(candy);
      this.game.physics.enable(candy, Phaser.Physics.ARCADE);
      candy.body.velocity.x = -100;
    }

    this.candyGroup.forEach(function(candyInGroup) {
      // candyInGroup.x -= 2;
    });

    this.game.physics.arcade.collide(this.hero, this.candyGroup, this.checkCollision, null, this);

    if (this.game.input.y > 0 && this.game.input.y < (this.game.height - this.hero.height)) {
      // this.hero.x = this.game.input.x;
      this.hero.y = this.game.input.y;
    }
  },
  checkCollision: function(sp1, sp2) {
    if (sp2.isMalito) {
      console.log('GameOver');
    }
    else {
      sp2.destroy();
    }
    // sp2.destroy();
  }
};