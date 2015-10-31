function Game() {}

Game.TYPES = [ 'green_enemy', 'red_enemy', 'yellow_enemy' ];

Game.prototype.preload = function() {};
Game.prototype.create = function() {
  this.isRunning = true;
  this.elapsedTime = 0;
  this.enemyTime = 0;
  this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'space');

  this.physics.startSystem(Phaser.Physics.ARCADE);

  this.initPlayer();
  this.initEnemies();

  this.playerLives = 3;

  this.orchestra = this.add.audio('orchestra');
  this.orchestra.play();

  var fontStyle = {
    font: '20px Arial',
    fill: '#ffffff',
    stroke: '#ffffff'
  };

  this.textLives = this.add.text(20, 20, this.playerLives.toString(), fontStyle);
  this.textScore = this.add.text(this.game.world.width - 60, 20, window.score.toString(), fontStyle);

  if (window.score > 0) {
    this.add.text(this.game.world.width - 60, this.game.world.height - 60, 'Current Best: ' + window.score, fontStyle);
  }
};

Game.prototype.update = function() {
  if (this.game.input.activePointer.isDown && !this.isRunning) {
    this.game.state.start('Game');
  }

  if (this.isRunning) {
    this.elapsedTime += this.game.time.elapsed;
    this.enemyTime += this.game.time.elapsed;

    this.game.physics.arcade.overlap(this.playerBullets, this.enemies, this.damageEnemy, null, this);
    this.game.physics.arcade.overlap(this.enemiesBullets, this.player, this.killPlayer, null, this);
    this.game.physics.arcade.overlap(this.enemies, this.player, this.killPlayer, null, this);

    if (this.elapsedTime >= 200) {
      this.elapsedTime = 0;
      this.createPlayerBullets();
    }

    if (this.enemyTime >= 800) {
      this.enemyTime = 0;
      this.createEnemy();
    }

    this.player.body.velocity.x = 0;

    if (this.game.input.activePointer.isDown) {
      var pointerX = this.game.input.activePointer.position.x,
          direction = (pointerX >= this.game.world.centerX) ? 1 : -1;   
      
      
      this.player.body.velocity.x = direction * 200; 
    }
  }
};

Game.prototype.initPlayer = function() {
  this.player = this.add.sprite(this.world.width / 2, this.world.height - 60, 'player');
  this.player.anchor.setTo(0.5);
  
  this.game.physics.arcade.enable(this.player);
  this.player.body.collideWorldBounds = true;
  
  this.playerBullets = this.add.group();
  this.playerBullets.enableBody = true;
};

Game.prototype.initEnemies = function() {
  this.enemies = this.add.group();
  this.enemies.enableBody = true;

  this.enemiesBullets = this.add.group();
  this.enemiesBullets.enableBody = true;
};

Game.prototype.createPlayerBullets = function() {
  var bullet = this.playerBullets.getFirstExists(false);

  if (bullet) {
    bullet.reset(this.player.x, this.player.top);
  }
  else {
    bullet = new PlayerBullet(this.game, this.player.x, this.player.top);
    this.playerBullets.add(bullet);
  }
    
    
  bullet.body.velocity.y = -200;
};

Game.prototype.createEnemy = function() {
  var enemy = this.enemies.getFirstExists(false),
      enemyX = game.rnd.between(0.1, 1),
      type = Game.TYPES[game.rnd.between(0, 2)],
      health = game.rnd.between(2, 4);

  if (!enemy) {
    enemy = new Enemy(this.game, enemyX * this.game.world.width, -100, type, health, this.enemiesBullets);
    this.enemies.add(enemy);
  }

  enemy.scale.setTo(game.rnd.between(1, 3));
  enemy.body.velocity.x = 50;
  enemy.body.velocity.y = 50;
};

Game.prototype.damageEnemy = function(bullet, enemy) {
  enemy.damage(1);
  bullet.kill();

  this.textScore.text = window.score.toString();
};
Game.prototype.killPlayer = function() {
  this.playerLives-= 1;
  this.textLives.text = this.playerLives.toString();

  if (this.playerLives <= 0) {
    this.playerLives = 3;

    this.player.kill();
    this.orchestra.stop();
    this.isRunning = false;
    
    var fontStyle = {
      font: '20px Arial',
      fill: '#ffffff',
      stroke: '#ffffff'
    };

    this.add.text(this.game.world.width / 2, this.game.world.height / 2, 'GAME OVER. TAP TO RESTART.', fontStyle);
  }
};