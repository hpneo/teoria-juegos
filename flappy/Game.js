Game = function(game){

}

Game.prototype = {

	preload: function(){
		this.load.image('facebook_share','assets/images/facebook_share.png');
    this.load.image('bird','assets/images/bird.png');
		this.load.image('pipe','assets/images/pipe.png');
    this.load.audio('flap', 'assets/music/flap.ogg');
    this.load.audio('ouch', 'assets/music/ouch.ogg');
    this.load.audio('score', 'assets/music/score.ogg');
    this.load.audio('loop', 'assets/music/loop.ogg');
	},
	create:function(){
		Global.score = 0;
		this.gravity = 800;
		this.flapPower = 300;
		this.speed = 125;
		this.pipeHoled = 120;
		this.bird = this.add.sprite(80,240,'bird');
		this.bird.anchor.setTo(0.5,0.5);
    this.bird.scale.set(0.5, 0.5);
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.physics.arcade.enable(this.bird);
		this.input.onDown.add(this.flap,this);
		this.bird.body.gravity.y = this.gravity;
		this.game.time.events.loop(2000,this.addPipe,this);
		this.pipes = this.add.group();
    this.flapSound = this.game.add.sound('flap', 0.6);
    this.ouchSound = this.game.add.sound('ouch');
    this.loopSound = this.game.add.sound('loop', 0.2, true);
    this.loopSound.play();
    this.fontStyle = {
      font: '40px Arial',
      fill: '#ffffff',
      stroke: '#ffffff'
    };
    this.textScore = this.add.text(150, 100, 'Hola', this.fontStyle);
    this.btn = this.game.add.button(this.game.width / 2, this.game.height / 2 + 100, 'facebook_share', this.share, this);
	},
  share: function() {
    FB.ui({
      method: 'feed',
      link: 'http://hpneo.local/juegos/flappy/',
      name: 'Flappy Pidgey',
      caption: 'Flappy Pidgey',
      description: 'Obtuve un puntaje de ' + Global.score
    }, function(response) { console.log(response) });
  },
	flap:function(){
		this.bird.body.velocity.y = -this.flapPower;
    this.flapSound.play();
	},
	addPipe:function(){
		var pipeHole = this.game.rnd.between(50,430-this.pipeHoled);
		var upperPipe = new Pipe(this.game,320,pipeHole-480,-this.speed,this.bird);
		this.pipes.add(upperPipe);

		var lowerPipe = new Pipe(this.game,320,pipeHole+this.pipeHoled,-this.speed,this.bird);
		this.pipes.add(lowerPipe);
	},
	update:function(){
		if(this.bird.y>this.game.height){
			this.die();
		}
		this.game.physics.arcade.collide(this.bird,this.pipes,this.die,null,this);
	},
	die:function(sprite,sprite2){
		if(sprite2){
      this.ouchSound.play();
			/*if(sprite2.body.touching.up || sprite2.body.touching.down ){
				sprite2.body.immovable = true;
			}*/
		}

		//this.state.start("Game");
	}


}