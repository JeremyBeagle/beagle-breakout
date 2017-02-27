function Beagle() { //beagle constructor
  //apply position to hard-coded matrix
  this.direction = '0';
  this.posY = 9;
  this.posX = 13;

  var ghostHtml = '<div class="ghost"></div>';
  $('.ghost-position').append(ghostHtml);
  var beagleHtml = '<img src="images/beagle.png" class="pac-man">'; //create HTML template
  $('.current-position').append(beagleHtml); //add pac-man to corresponding div on rendered board
}

Beagle.prototype.move = function(string) {
    var beagleHtml;
    let beaglePosition = newGame.mapFind('pac-man');
    let posY = beaglePosition[0];
    let posX = beaglePosition[1];

      switch(string) {
          case 'left':
          if (this.isBlocked(string) === true) {
            return;
          }
          else if(this.isBone(string) === true){
          this.eat();
          this.turn(string);
          this.step(string);

          }
          else if(newGame.map[posY][posX-1] === 'path') {
            this.turn(string);
            this.step(string);
          }
          break;

          case 'right':
          if ( this.isBlocked(string) === true) {
            return;
          }
          else if(this.isBone(string) ===true){
          this.eat();
          this.turn(string);
          this.step(string);
          }
          else if(newGame.map[posY][posX+1] === 'path') {
            this.turn(string);
            this.step(string);
          }
          break;

          case 'up':
          if ( this.isBlocked(string) === true ) {
            return;
          }
          else if (this.isBone(string) === true){
          this.eat();
          this.turn(string);
          this.step(string);
          }
          else if(newGame.map[posY - 1][posX] === 'path') {
            this.turn(string);
            this.step(string);
          }
          break;

          case 'down':
          if (this.isBlocked(string) === true) {
            return;
          }
          else if(this.isBone(string) === true){
          this.eat();
          this.turn(string);
          this.step(string);
          }
          else if(newGame.map[posY + 1][posX] === 'path') {
          this.turn(string);
          this.step(string);
        }
        break;
      }
    };

Beagle.prototype.pacAppend = () => {
  beagleHtml = '<img src="images/beagle.png" class="pac-man">';
  currentPosition = $('.current-position');
  currentPosition.append(beagleHtml);
};

Beagle.prototype.turn = function (string) {
      switch(string){

        case 'left':
        newGame.direction = '90';
        $('.pac-man').css({'transform' : 'rotate(90deg)'});
        break;

        case 'right':
        newGame.direction = '270';
        $('.pac-man').css({'transform' : 'rotate(270deg)'});
        break;

        case 'up':
        newGame.direction = '180';
        $('.pac-man').css({'transform' : 'rotate(180deg)'});
        break;

        case 'down':
        newGame.direction = '0';
        break;
      }
    };

Beagle.prototype.isBlocked = function (string) {

      let beaglePosition = newGame.mapFind('pac-man');
      let posY = beaglePosition[0];
      let posX = beaglePosition[1];

      switch(string) {
        case 'left':
        if (newGame.map[posY][posX-1] === 'wall') {
          return true;
        }
        break;

        case 'right':
        if (newGame.map[posY][posX+1] === 'wall') {
          return true;
        }
        break;

        case 'up':
        if(newGame.map[posY - 1][posX] === 'wall') {
          return true;
        }
        break;

        case 'down':
        if(newGame.map[posY + 1][posX] === 'wall') {
          return true;
        }
        break;
      }
      return false;
    };

Beagle.prototype.isBone = function (string) {

      let beaglePosition = newGame.mapFind('pac-man');
      let posY = beaglePosition[0];
      let posX = beaglePosition[1];

      switch(string) {
        case 'left':
        if (newGame.map[posY][posX-1] === 'dot') {
          return true;
        }
        break;

        case 'right':
        if (newGame.map[posY][posX+1] === 'dot') {
          return true;
        }
        break;

        case 'up':
        if(newGame.map[posY - 1][posX] === 'dot') {
          return true;
        }
        break;

        case 'down':
        if(newGame.map[posY + 1][posX] === 'dot') {
          return true;
        }
        break;
      }
      return false;
    };

Beagle.prototype.step = function (string) {
      let beaglePosition = newGame.mapFind('pac-man');
      let posY = beaglePosition[0];
      let posX = beaglePosition[1];
      $('.pac-man').remove();
      newGame.map[posY][posX] = 'path';
      switch(string) {
        case 'left':
        posX -= 1;
        break;

        case 'right':
        posX += 1;
        break;

        case 'up':
        posY -= 1;
        break;

        case 'down':
        posY += 1;
        break;
      }
      newGame.map[posY][posX] = 'pac-man';
      beagleHtml = '<img src="images/beagle.png" class="pac-man">';
      currentPosition = $('.current-position');
      currentPosition.append(beagleHtml);
    };

Beagle.prototype.eat = function() {
      ion.sound.play('water-drop');
      newGame.dotCount -= 1;
      newGame.score += 10;
      newGame.updateScore();
    };
