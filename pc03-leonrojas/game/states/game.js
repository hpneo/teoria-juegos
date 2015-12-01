function Game() {}

Game.prototype.preload = function() {
  this.load.image('alienBeige_stand', 'assets/alienBeige_stand.png');
  this.load.image('alienBlue_stand', 'assets/alienBlue_stand.png');
  this.load.image('alienGreen_stand', 'assets/alienGreen_stand.png');
  this.load.image('alienPink_stand', 'assets/alienPink_stand.png');
  this.load.image('alienYellow_stand', 'assets/alienYellow_stand.png');
  this.load.image('colored_grass', 'assets/colored_grass.png');
  this.load.image('grassMid', 'assets/grassMid.png');
  this.load.image('hudPlayer_beige', 'assets/hudPlayer_beige.png');
  this.load.image('hudPlayer_blue', 'assets/hudPlayer_blue.png');
  this.load.image('hudPlayer_green', 'assets/hudPlayer_green.png');
  this.load.image('hudPlayer_pink', 'assets/hudPlayer_pink.png');
  this.load.image('hudPlayer_yellow', 'assets/hudPlayer_yellow.png');
};

Game.prototype.create = function() {
  var platformHeight = 128;

  this.elapsedTime = 0;
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.game.physics.arcade.gravity.y = 800;

  this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'colored_grass');
  this.background.tileScale.y = 0.7;
  this.background.autoScroll(-200, 0);

  this.ground = this.add.tileSprite(0, this.world.height - platformHeight, this.world.width, platformHeight, 'grassMid');
  this.player = new Player(this.game, this.world.width / 2, platformHeight);

  this.game.physics.enable([ this.player, this.ground ], Phaser.Physics.ARCADE);

  this.ground.body.collideWorldBounds = true;
  this.ground.body.immovable = true;
  this.ground.body.allowGravity = false;

  this.beigePoints = 20;
  this.bluePoints = 20;
  this.greenPoints = 20;
  this.pinkPoints = 20;
  this.yellowPoints = 20;

  this.enemies = this.add.group();

  var fontStyle = {
    font: '20px Arial',
    fill: '#000000',
    stroke: '#000000'
  };

  this.beigeText = this.add.text(20, 20, "BEIGE: " + this.beigePoints, fontStyle);
  this.blueText = this.add.text(20, 50, "BLUE: " + this.bluePoints, fontStyle);
  this.greenText = this.add.text(20, 80, "GREEN: " + this.greenPoints, fontStyle);
  this.pinkText = this.add.text(20, 110, "PINK: " + this.pinkPoints, fontStyle);
  this.yellowText = this.add.text(20, 140, "YELLOW: " + this.yellowPoints, fontStyle);

  var spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      aKey = game.input.keyboard.addKey(Phaser.Keyboard.A),
      sKey = game.input.keyboard.addKey(Phaser.Keyboard.S),
      dKey = game.input.keyboard.addKey(Phaser.Keyboard.D),
      fKey = game.input.keyboard.addKey(Phaser.Keyboard.F),
      gKey = game.input.keyboard.addKey(Phaser.Keyboard.G);

  spaceBar.onDown.add(this.player.jump, this.player);
  aKey.onDown.add(this.player.setState, this.player, 0, 'Beige');
  sKey.onDown.add(this.player.setState, this.player, 0, 'Blue');
  dKey.onDown.add(this.player.setState, this.player, 0, 'Green');
  fKey.onDown.add(this.player.setState, this.player, 0, 'Pink');
  gKey.onDown.add(this.player.setState, this.player, 0, 'Yellow');

  this.running = true;
};

Game.prototype.update = function() {
  this.game.physics.arcade.collide(this.player, this.ground);
  this.game.physics.arcade.collide(this.enemies, this.ground);
  this.game.physics.arcade.overlap(this.player, this.enemies, this.player.collideEnemy, null, this.player);

  this.elapsedTime += this.game.time.elapsed;

  if (this.elapsedTime >= 800 && this.running) {
    this.elapsedTime = 0;

    this.createEnemy();
  }
};

Game.prototype.createEnemy = function() {
  var enemy = this.enemies.getFirstExists(false),
      x = this.world.width,
      y = this.game.rnd.between(-128, this.player.y - 128);

  if (enemy) {
    enemy.reset(x, y);
    enemy.body.velocity.x = -100;
    enemy.body.velocity.y = 100;
    enemy.setState(Enemy.states[game.rnd.between(0, Enemy.states.length - 1)]);
  }
  else {
    enemy = new Enemy(this.game, x, y);

    this.enemies.add(enemy);
  }
};

Game.prototype.setMana = function(type, mana) {
  this[type + 'Points'] = mana;
  this[type + 'Text'].text = type.toUpperCase() + ': ' + mana.toString();
};

Game.prototype.decreaseMana = function(type) {
  this.setMana(type, this[type + 'Points'] - 2);

  this.checkMana(type);
};

Game.prototype.increaseMana = function(type) {
  this.setMana(type, this[type + 'Points'] + 10);
};

Game.prototype.checkMana = function(type) {
  if (this[type + 'Points'] === 0) {
    this.running = false;

    setTimeout(this.restart.bind(this), 2000);
  }
};

Game.prototype.restart = function() {
  this.running = true;
  this.setMana('beige', 20);
  this.setMana('blue', 20);
  this.setMana('green', 20);
  this.setMana('pink', 20);
  this.setMana('yellow', 20);
}