function GlobalGame() {
  this.map =[ ['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall'],
              ['wall','dot','wall','wall','wall','wall','wall','wall','wall', 'wall','wall','dot','wall'],
              ['wall','dot', 'wall','dot', 'dot', 'dot', 'dot', 'dot', 'dot', 'dot', 'wall','dot','wall'],
              ['wall','dot', 'wall','dot','wall','wall','path','wall','wall', 'dot','wall', 'dot','wall'],
              ['wall','dot', 'wall','dot','wall','path','path','path','wall', 'dot','wall', 'dot','wall'],
              ['wall','dot', 'dot','dot','wall','path','path','path','wall',  'dot','dot',  'dot','wall'],
              ['wall','dot', 'wall','dot','wall','wall','wall','wall','wall', 'dot','wall', 'dot','wall'],
              ['wall','dot', 'wall','dot', 'dot', 'dot', 'dot', 'dot', 'dot', 'dot', 'wall','dot', 'wall'],
              ['wall','dot', 'wall','wall','wall','wall','dot','wall','wall','wall','wall','dot','wall'],
              ['wall','dot','wall','wall','dot','dot','dot','dot','dot','wall','wall','dot','wall'],
              ['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall']
              ];
  this.score = 0;
  this.dotCount = 0;
}

function PacMan() {
  this.currentPosition = [7, 4];
  newGame.map[this.currentPosition[0]][this.currentPosition[1]] = 'pac-man';
  renderBoard();
  var pacManHtml = '<div class="pac-man"></div>';
  var currentPosition = $('.current-position');
  currentPosition.append(pacManHtml);
}

PacMan.prototype.move = function(string) {


  var pacMan = $('.pac-man');
  var pacManHtml;
  var currentPosition;


    switch(string) {
      case 'left':
      if (  newGame.map[this.currentPosition[0]][this.currentPosition[1]-1] === 'wall') {
        return;
      } else if(newGame.map[this.currentPosition[0]][this.currentPosition[1]-1] === 'dot'){
      newGame.dotCount -= 1;
      newGame.score += 10;
      updateScore();
      $('.pac-man').remove(); //remove pacman from current div
      newGame.map[this.currentPosition[0]][this.currentPosition[1]] = 'path'; //assign former position to interior-block
      this.currentPosition[1] -= 1; //decrement current position
      newGame.map[this.currentPosition[0]][this.currentPosition[1]] = 'pac-man';
      renderBoard();
      pacManHtml = '<div class="pac-man"></div>';
      currentPosition = $('.current-position');
      currentPosition.append(pacManHtml);
      }
      else if(newGame.map[this.currentPosition[0]][this.currentPosition[1]-1] === 'path') {
        $('.pac-man').remove(); //remove pacman from current div
        newGame.map[this.currentPosition[0]][this.currentPosition[1]] = 'path'; //assign former position to interior-block
        this.currentPosition[1] -= 1; //decrement current position
        newGame.map[this.currentPosition[0]][this.currentPosition[1]] = 'pac-man';
        renderBoard();
        pacManHtml = '<div class="pac-man"></div>';
        currentPosition = $('.current-position');
        currentPosition.append(pacManHtml);}
      break;

      case 'right':
      if (  newGame.map[this.currentPosition[0]][this.currentPosition[1]+1] === 'wall') {
        return;
      } else if(newGame.map[this.currentPosition[0]][this.currentPosition[1]+1] === 'dot'){
      newGame.dotCount -= 1;
      newGame.score += 10;
      updateScore();
      $('.pac-man').remove(); //remove pacman from current div
      newGame.map[this.currentPosition[0]][this.currentPosition[1]] = 'path'; //assign former position to interior-block
      this.currentPosition[1] += 1; //decrement current position
      newGame.map[this.currentPosition[0]][this.currentPosition[1]] = 'pac-man';
      renderBoard();
      pacManHtml = '<div class="interior-block"><div class="pac-man-top-right"></div><div class="pac-man-bottom-right"></div></div>';
      currentPosition = $('.current-position');
      currentPosition.append(pacManHtml);
      }
      else if(newGame.map[this.currentPosition[0]][this.currentPosition[1]+1] === 'path') {
        $('.pac-man').remove(); //remove pacman from current div
        newGame.map[this.currentPosition[0]][this.currentPosition[1]] = 'path'; //assign former position to interior-block
        this.currentPosition[1]+= 1; //decrement current position
        newGame.map[this.currentPosition[0]][this.currentPosition[1]] = 'pac-man';
        renderBoard();
        pacManHtml = '<div class="interior-block"><div class="pac-man-top-right"></div><div class="pac-man-bottom-right"></div></div>  ';
        currentPosition = $('.current-position');
        currentPosition.append(pacManHtml);}
      break;

      case 'up':
      if (  newGame.map[this.currentPosition[0] - 1][this.currentPosition[1]] === 'wall') {
        return;
      } else if(newGame.map[this.currentPosition[0] - 1][this.currentPosition[1]] === 'dot'){
      newGame.dotCount -= 1;
      newGame.score += 10;
      updateScore();
      $('.pac-man').remove(); //remove pacman from current div
      newGame.map[this.currentPosition[0]][this.currentPosition[1]] = 'path'; //assign former position to interior-block
      this.currentPosition[0] -= 1; //decrement current position
      newGame.map[this.currentPosition[0]][this.currentPosition[1]] = 'pac-man';
      renderBoard();
      pacManHtml = '<div class="pac-man"></div>';
      currentPosition = $('.current-position');
      currentPosition.append(pacManHtml);
      }
      else if(newGame.map[this.currentPosition[0] - 1][this.currentPosition[1]] === 'path') {
        $('.pac-man').remove(); //remove pacman from current div
        newGame.map[this.currentPosition[0]][this.currentPosition[1]] = 'path'; //assign former position to interior-block
        this.currentPosition[0]-= 1; //decrement current position
        newGame.map[this.currentPosition[0]][this.currentPosition[1]] = 'pac-man';
        renderBoard();
        pacManHtml = '<div class="pac-man"></div>';
        currentPosition = $('.current-position');
        currentPosition.append(pacManHtml);}
      break;

      case 'down':
      if (  newGame.map[this.currentPosition[0] + 1][this.currentPosition[1]] === 'wall') {
        return;
      } else if(newGame.map[this.currentPosition[0] + 1][this.currentPosition[1]] === 'dot'){
      newGame.dotCount -= 1;
      newGame.score += 10;
      updateScore();
      $('.pac-man').remove(); //remove pacman from current div
      newGame.map[this.currentPosition[0]][this.currentPosition[1]] = 'path'; //assign former position to interior-block
      this.currentPosition[0] += 1; //decrement current position
      newGame.map[this.currentPosition[0]][this.currentPosition[1]] = 'pac-man';
      renderBoard();
      pacManHtml = '<div class="pac-man"></div>';
      currentPosition = $('.current-position');
      currentPosition.append(pacManHtml);
      }
      else if(newGame.map[this.currentPosition[0] + 1][this.currentPosition[1]] === 'path') {
        $('.pac-man').remove(); //remove pacman from current div
        newGame.map[this.currentPosition[0]][this.currentPosition[1]] = 'path'; //assign former position to interior-block
        this.currentPosition[0] += 1; //decrement current position
        newGame.map[this.currentPosition[0]][this.currentPosition[1]] = 'pac-man';
        renderBoard();
        pacManHtml = '<div class="pac-man"></div>';
        currentPosition = $('.current-position');
        currentPosition.append(pacManHtml);}
      break;
    }
    checkWin();
    };
