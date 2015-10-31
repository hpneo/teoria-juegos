Game = function(game) {}

Game.prototype = {
	preload: function() {
		this.bird = this.add.sprite(80, 240, 'bird');
		this.gravity = 800;
		this.flapPower = -500;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.enable(this.bird);
		this.bird.body.gravity.y = this.gravity;
		// this.bird.body.immovable = true;
		this.game.input.onDown.add(this.flap, this);
		this.pipes = this.game.add.group();
		this.pipes.enableBody = true;
		this.pipeTime = 0;
		this.pipeHoled = 300;
	},
	flap: function() {
		this.bird.body.velocity.y = this.flapPower;
	},
	addPipe: function() {
		var pipeHole = this.game.rnd.between(50, 430 - this.pipeHoled);
		var upper = new Pipe(this.game, 320, pipeHole - 480, -125, this.bird);
		var lower = new Pipe(this.game, 320, pipeHole + this.pipeHoled, -125, this.bird);

		this.pipes.add(upper);
		this.pipes.add(lower);
	},
	update: function() {
		this.pipeTime += this.game.time.elapsed;

		if (this.pipeTime >= 2000) {
			this.pipeTime = 0;
			this.addPipe();
		}

		this.game.physics.arcade.collide(this.pipes, this.bird);
	}
};