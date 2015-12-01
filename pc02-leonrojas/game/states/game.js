function Game() {}

Game.prototype.create = function() {
  var backgroundSprites = [
        'background2',
        'starfield'
      ],
      backgroundSprite = backgroundSprites[this.game.rnd.between(0, 1)];

  this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, backgroundSprite);
  this.dude = new Dude(this.game, this.world.width / 2, this.world.height - 30);
  this.bullets = this.add.group();
  this.bullets.enableBody = true;

  this.cursors = this.game.input.keyboard.createCursorKeys();
  this.elapsedTime = 0;
  this.invaders = this.add.group();
  this.invaders.enableBody = true;
  this.fruits = this.add.group();
  this.fruits.enableBody = true;
  this.mushrooms = this.add.group();
  this.mushrooms.enableBody = true;
  this.contras = this.add.group();
  this.contras.enableBody = true;

  var fontStyle = {
    font: '20px Arial',
    fill: '#ffffff',
    stroke: '#ffffff'
  };

  this.textHealth = this.add.text(20, 20, "Health: " + this.dude.health, fontStyle);
  this.textKills = this.add.text(20, 60, "Killed: " + this.dude.killedInvaders, fontStyle);
  this.textPoints = this.add.text(this.game.world.width - 120, 20, "Points: " + this.dude.points, fontStyle);
  this.textMushrooms = this.add.text(this.game.world.width - 140, 60, "Mushrooms: " + this.dude.mushrooms, fontStyle);
};

Game.prototype.update = function() {
  this.game.physics.arcade.overlap(this.bullets, this.invaders, this.killInvader, null, this);
  this.game.physics.arcade.overlap(this.dude, this.fruits, this.hitFruit, null, this);
  this.game.physics.arcade.overlap(this.dude, this.invaders, this.hitInvader, null, this);
  this.game.physics.arcade.overlap(this.dude, this.contras, this.hitContra, null, this);
  this.game.physics.arcade.overlap(this.dude, this.mushrooms, this.hitMushroom, null, this);

  this.elapsedTime += this.game.time.elapsed;

  if (this.elapsedTime >= 1000) {
    this.elapsedTime = 0;

    switch (this.game.rnd.between(0, 3)) {
      case 0:
        this.createFruit(this.game.rnd.between(0, 36));
      break;
      case 1:
        this.createInvader();
      break;
      case 2:
        this.createContra();
      break;
      case 3:
        this.createMushroom();
      break;
    }

    this.createBullets();
  }

  this.dude.body.velocity.set(0);

  if (this.cursors.left.isDown) {
    this.dude.body.velocity.x -= 200;
    this.dude.play('left');
  }
  else if (this.cursors.right.isDown) {
    this.dude.body.velocity.x += 200;
    this.dude.play('right');
  }
};

Game.prototype.createBullets = function() {
  var bullet = this.bullets.getFirstExists(false);

  if (bullet) {
    bullet.reset(this.dude.x, this.dude.top);
  }
  else {
    bullet = new Bullet(this.game, this.dude.x, this.dude.top);
    this.bullets.add(bullet);
  }

  bullet.body.velocity.y = -200;
};

Game.prototype.createFruit = function(frame) {
  var fruit = this.fruits.getFirstExists(false),
      x = this.game.rnd.between(0, this.game.world.width),
      y = 0;

  if (fruit) {
    fruit.reset(x, y, frame);
  }
  else {
    fruit = new Fruit(this.game, x, y);
    this.fruits.add(fruit);
  }

  fruit.body.velocity.y = 300;
};

Game.prototype.createInvader = function() {
  var invader = this.invaders.getFirstExists(false),
      x = this.game.rnd.between(0, this.game.world.width),
      y = 0;

  if (invader) {
    invader.reset(x, y);
  }
  else {
    invader = new Invader(this.game, x, y);
    this.invaders.add(invader);
  }

  invader.body.velocity.y = 300;
};

Game.prototype.createContra = function() {
  var contra = this.contras.getFirstExists(false),
      x = this.game.rnd.between(0, this.game.world.width),
      y = 0;

  if (contra) {
    contra.reset(x, y);
  }
  else {
    contra = new Contra(this.game, x, y);
    this.contras.add(contra);
  }

  contra.body.velocity.y = 300;
};

Game.prototype.createMushroom = function() {
  var mushroom = this.mushrooms.getFirstExists(false),
      x = this.game.rnd.between(0, this.game.world.width),
      y = 0;

  if (mushroom) {
    mushroom.reset(x, y);
  }
  else {
    mushroom = new Mushroom(this.game, x, y);
    this.mushrooms.add(mushroom);
  }

  mushroom.body.velocity.y = 300;
};

Game.prototype.hitFruit = function(dude, fruit) {
  dude.points += 100;
  fruit.kill();

  this.textPoints.text = "Points: " + dude.points;
};

Game.prototype.hitInvader = function(dude, invader) {
  dude.health--;
  invader.kill();

  if (dude.health === 0) {
    this.game.state.start('GameOver');
  }

  this.textHealth.text = "Health: " + dude.health;
};

Game.prototype.hitContra = function(dude, contra) {
  dude.health -= 2;
  this.textHealth.text = "Health: " + dude.health;

  contra.kill();

  if (dude.health <= 0) {
    this.game.state.start('GameOver');
  }
};

Game.prototype.hitMushroom = function(dude, mushroom) {
  if (dude.points >= 100) {
    dude.points -= 100;
  }

  dude.mushrooms++;
  this.textMushrooms.text = "Mushrooms: " + dude.mushrooms;

  mushroom.kill();
};

Game.prototype.killInvader = function(bullet, invader) {
  this.dude.points += 25;
  this.dude.killedInvaders++;
  bullet.kill();
  invader.kill();

  this.textPoints.text = "Points: " + this.dude.points;
  this.textKills.text = "Killed: " + this.dude.killedInvaders;
}