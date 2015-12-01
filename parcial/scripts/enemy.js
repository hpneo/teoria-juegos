function Enemy(game, x, y, type, health, enemyBullets) {
  Phaser.Sprite.call(this, game, x, y, type);

  this.game = game;
  this.enemyType = type;

  this.bulletTimer = 0;

  this.animations.add('getHit', [0, 1, 2, 1, 0], 25, false);
  this.anchor.setTo(0.5);
  this.health = health;

  this.enemyBullets = enemyBullets;

  this.enemyTimer = this.game.time.create(false);
  this.enemyTimer.start();
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
  this.bulletTimer += this.game.time.elapsed;

  if (this.bulletTimer >= 200) {
    this.bulletTimer = 0;

    if (this.enemyType === 'red_enemy' || this.enemyType === 'yellow_enemy') {
      this.shoot();
    }
  }

  if(this.position.x < 0.05 * this.game.world.width) {
    this.position.x = 0.05 * this.game.world.width + 2;
    this.body.velocity.x *= -1;
  }
  else if(this.position.x > 0.95 * this.game.world.width) {
    this.position.x = 0.95 * this.game.world.width - 2;
    this.body.velocity.x *= -1;
  }

  if (this.position.y > this.game.world.height) {
    this.kill();
  }
};

Enemy.prototype.shoot = function() {
  var bullet = this.enemyBullets.getFirstExists(false);

  if (!bullet) {
    bullet = new EnemyBullet(this.game, this.x, this.bottom);
    this.enemyBullets.add(bullet);
  }
  else {
    bullet.reset(this.x, this.y);
  }

  bullet.body.velocity.y = 100;
};

Enemy.prototype.damage = function(amount) {
  Phaser.Sprite.prototype.damage.call(this, amount);

  this.play('getHit');

  if (this.health === 0) {
    if (this.enemyType === 'red_enemy') {
      window.score += 10;
    }
    else if (this.enemyType === 'green_enemy') {
      window.score += 15;
    }
    else if (this.enemyType === 'yellow_enemy') {
      window.score *= 2;
    }
  }
};