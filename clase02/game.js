function Game(game) {}

Game.prototype = {
  preload: function() {
  },
  create: function() {
    this.score = 0;
    this.currentNumber = this.game.rnd.integerInRange(0, 9);
    this.numbers = this.game.add.sprite(160, 240, 'numbers');
    this.higher = this.game.add.button(160, 100, 'higher', this.higherPressed, this);
    this.lower = this.game.add.button(160, 380, 'lower', this.lowerPressed, this);
    this.isAnimating = false;
    this.pressedButton = 'none';

    this.numbers.anchor.setTo(0.5, 0.5);
    this.higher.anchor.setTo(0.5, 0.5);
    this.lower.anchor.setTo(0.5, 0.5);
    this.numbers.frame = this.currentNumber;
  },
  higherPressed: function() {
    if (this.isAnimating) {
      return;
    }

    this.isAnimating = true;
    this.pressedButton = 'higher';
    var exitTween = this.game.add.tween(this.numbers);
    exitTween.to({
      x: 320
    }, 500).start().onComplete.add(this.changeNumber, this);
  },
  lowerPressed: function() {
    if (this.isAnimating) {
      return;
    }

    this.isAnimating = true;
    this.pressedButton = 'lower';
    var exitTween = this.game.add.tween(this.numbers);
    exitTween.to({
      x: 320
    }, 500).start().onComplete.add(this.changeNumber, this);
  },
  changeNumber: function() {
    this.numbers.x = -180;
    this.nextNumber = this.game.rnd.integerInRange(0, 9);
    this.numbers.frame = this.nextNumber;

    var enterTween = this.game.add.tween(this.numbers);
    enterTween.to({
      x: 160
    }, 500).start().onComplete.add(function() {
      var condition;
      if (this.pressedButton === 'higher') {
        condition = (this.nextNumber >= this.currentNumber);
      }
      else if (this.pressedButton === 'lower') {
        condition = (this.nextNumber <= this.currentNumber);
      }

      if (condition) {
        this.score++;
        console.log('ok', this.currentNumber, this.nextNumber);
      }
      else {
        this.game.state.start('GameOver', true, false, this.score);
        // console.log('error', this.currentNumber, this.nextNumber);
      }

      this.currentNumber = this.nextNumber;
      this.isAnimating = false;
    }, this);
  }
};