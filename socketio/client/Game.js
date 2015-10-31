Game = function(game){

}

Game.prototype = {
	preload:function(){
    this.socket = io.connect('hpneo.local:3000');
		this.world.setBounds(-1000,-1000,2000,2000);
		this.land = this.add.tileSprite(0,0,800,600,'land');
		this.tank = new Tank(this.game,400,300);
		this.game.add.existing(this.tank);
		this.land.fixedToCamera = true;
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemies.setAll('body.immovable', true);
    this.enemies.setAll('body.allowGravity', false);
    this.bullets = this.add.group();

		this.keys = this.input.keyboard.createCursorKeys();
    this.socket.on('connect', this.onSocketConnected.bind(this));

    this.game.input.onDown.add(this.shoot, this);

    this.game.time.events.loop(1500, this.createEnemy, this);
	},
	update:function(){
		this.land.tilePosition.x = -this.camera.x;
		this.land.tilePosition.y = -this.camera.y;

    this.game.physics.arcade.collide(this.tank, this.enemies);
    this.game.physics.arcade.overlap(this.enemies, this.bullets, this.kill, null, this);
	},
  shoot: function() {
    var bullet = game.add.sprite(this.tank.canon.body.center.x, this.tank.canon.body.center.y, 'bullet');
    bullet.angle += this.tank.canon.angle;
    this.game.physics.arcade.enable(bullet);
    this.bullets.add(bullet);

    game.physics.arcade.moveToPointer(bullet, 200);
  },
  kill: function(tank, bullet) {
    tank.kill();
    bullet.kill();
  },
  createEnemy: function() {
    var newElement = this.enemies.getFirstDead(),
        x = game.rnd.between(0, this.game.width),
        y = game.rnd.between(0, this.game.height);

    if(!newElement){
      newElement = new RemoteTank(this.game, x, y);
      this.enemies.add(newElement);
    }else{
      newElement.reset(x,y);
    }
  },
  onSocketConnected: function() {
    console.log('Socket connected');
    this.socket.on('new_player', this.onNewPlayer.bind(this));
    this.socket.emit('new_player', { x: this.tank.x, y: this.tank.y })
  },
  onNewPlayer: function(data) {
    var remoteTank = new RemoteTank(this.game, data.x, data.y);
    this.enemies.add(remoteTank);
  }
}