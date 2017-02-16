function GlobalGame() {
  this.map =[ ['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall'],
              ['wall','wall','wall','wall','wall','wall','wall','wall','wall', 'wall','wall','wall','wall'],
              ['wall','dot', 'dot','dot', 'dot', 'dot', 'dot', 'dot', 'dot', 'dot', 'dot','dot','wall'],
              ['wall','dot', 'wall','dot','wall','wall','path','wall','wall', 'dot','wall', 'dot','wall'],
              ['wall','dot', 'wall','dot','wall','path','path','path','wall', 'dot','wall', 'dot','wall'],
              ['wall','dot', 'dot','dot','wall','path','path','path','wall',  'dot','dot',  'dot','wall'],
              ['wall','dot', 'wall','dot','wall','wall','wall','wall','wall', 'dot','wall', 'dot','wall'],
              ['wall','dot', 'wall','dot', 'dot', 'dot', 'dot', 'dot', 'dot', 'dot', 'wall','dot', 'wall'],
              ['wall','dot', 'wall','wall','wall','wall','dot','wall','wall','wall','wall','dot','wall'],
              ['wall','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','wall'],
              ['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall'],
              ['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall']
              ];
  this.score = 0;
  this.dotCount = 0;
  this.pacManPosition = [7,4];
  this.ghostPosition = [4,6];
}

function PacMan() {
  //edit strings in hard-coded matrix
  newGame.pacManPosition = [7, 4];
  newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'pac-man';
  newGame.ghostPosition = [4,6];
  this.previousGhostPosition = [4, 5];
  newGame.map[newGame.ghostPosition[0]][newGame.ghostPosition[1]] = 'ghost';

  //read hard-coded matrix and translate to DOM
  renderBoard();
  var ghostHtml = '<div class="ghost"></div>';
  $('.ghost-position').append(ghostHtml);
  var pacManHtml = '<img src="img/beagle-tower.png" class="pac-man">'; //create HTML template
  $('.current-position').append(pacManHtml); //add pac-man to corresponding div on rendered board
}

PacMan.prototype.move = function(string) {

  var pacManHtml;


    switch(string) {
      case 'left':
      if (  newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]-1] === 'wall') {
        return;
      } else if(newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]-1] === 'dot'){
      newGame.dotCount -= 1;
      newGame.score += 10;
      updateScore();
      $('.pac-man').remove(); //remove pacman from current div
      newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'path'; //assign former position to interior-block
      newGame.pacManPosition[1] -= 1; //decrement current position
      newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'pac-man'; //assign class to new position
      renderBoard();//renderBoard
      this.pacAppend();
      $('.pac-man').css({'transform' : 'rotate(90deg)'});
      }
      else if(newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]-1] === 'path') {
        $('.pac-man').remove(); //remove pacman from current div
        newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'path'; //assign former position to interior-block
        newGame.pacManPosition[1] -= 1; //decrement current position
        newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'pac-man';
        renderBoard();
        this.pacAppend();
        $('.pac-man').css({'transform' : 'rotate(90deg)'});
      }
      break;

      case 'right':
      if (  newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]+1] === 'wall') {
        return;
      } else if(newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]+1] === 'dot'){
      newGame.dotCount -= 1;
      newGame.score += 10;
      updateScore();
      $('.pac-man').remove(); //remove pacman from current div
      newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'path'; //assign former position to interior-block
      newGame.pacManPosition[1] += 1; //decrement current position
      newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'pac-man';
      renderBoard();
      pacManHtml = '<img src="img/beagle-tower.png" class="pac-man">';
      currentPosition = $('.current-position');
      currentPosition.append(pacManHtml);
      $('.pac-man').css({'transform' : 'rotate(270deg)'});
      }
      else if(newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]+1] === 'path') {
        $('.pac-man').remove(); //remove pacman from current div
        newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'path'; //assign former position to interior-block
        newGame.pacManPosition[1]+= 1; //decrement current position
        newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'pac-man';
        renderBoard();
        pacManHtml = '<img src="img/beagle-tower.png" class="pac-man">';
        currentPosition = $('.current-position');
        currentPosition.append(pacManHtml);}
        $('.pac-man').css({'transform' : 'rotate(270deg)'});
      break;

      case 'up':
      if (  newGame.map[newGame.pacManPosition[0] - 1][newGame.pacManPosition[1]] === 'wall') {
        return;
      } else if(newGame.map[newGame.pacManPosition[0] - 1][newGame.pacManPosition[1]] === 'dot'){
      newGame.dotCount -= 1;
      newGame.score += 10;
      updateScore();
      $('.pac-man').remove(); //remove pacman from current div
      newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'path'; //assign former position to interior-block
      newGame.pacManPosition[0] -= 1; //decrement current position
      newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'pac-man';
      renderBoard();
      this.pacAppend();
      $('.pac-man').css({'transform' : 'rotate(180deg)'});
      }
      else if(newGame.map[newGame.pacManPosition[0] - 1][newGame.pacManPosition[1]] === 'path') {
        $('.pac-man').remove(); //remove pacman from current div
        newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'path'; //assign former position to interior-block
        newGame.pacManPosition[0]-= 1; //decrement current position
        newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'pac-man';
        renderBoard();
        this.pacAppend();
        $('.pac-man').css({'transform' : 'rotate(180deg)'});
      }
      break;

      case 'down':
      if (  newGame.map[newGame.pacManPosition[0] + 1][newGame.pacManPosition[1]] === 'wall') {
        return;
      } else if(newGame.map[newGame.pacManPosition[0] + 1][newGame.pacManPosition[1]] === 'dot'){
      newGame.dotCount -= 1;
      newGame.score += 10;
      updateScore();
      $('.pac-man').remove(); //remove pacman from current div
      newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'path'; //assign former position to interior-block
      newGame.pacManPosition[0] += 1; //decrement current position
      newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'pac-man';
      renderBoard();
      this.pacAppend();
      }
      else if(newGame.map[newGame.pacManPosition[0] + 1][newGame.pacManPosition[1]] === 'path') {
        $('.pac-man').remove(); //remove pacman from current div
        newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'path'; //assign former position to interior-block
        newGame.pacManPosition[0] += 1; //decrement current position
        newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'pac-man';
        renderBoard();
        this.pacAppend();
      break;
    }
    checkWin();
    }
};

PacMan.prototype.pacAppend = function () {
  pacManHtml = '<img src="img/beagle-tower.png" class="pac-man">';
  currentPosition = $('.current-position');
  currentPosition.append(pacManHtml);
};

PacMan.prototype.ghostMove = function(previous) {
  var upIsOpen = true, downIsOpen = true, leftIsOpen = true, rightIsOpen = true;
  var randomDirection;
  //only comparing index value to string
  if (newGame.map[newGame.ghostPosition[0] - 1][newGame.ghostPosition[1]] === 'wall') {
    upIsOpen = false;
  }
  if (newGame.map[newGame.ghostPosition[0]][newGame.ghostPosition[1] - 1] === 'wall') {
    leftIsOpen = false;
  }
  if (newGame.map[newGame.ghostPosition[0] + 1][newGame.ghostPosition[1]] === 'wall') {
    downIsOpen = false;
  }
  if (newGame.map[newGame.ghostPosition[0]][newGame.ghostPosition[1] + 1] === 'wall') {
    rightIsOpen = false;
  }

    randomDirection = Math.floor(Math.random() * (5 - 1) + 1);
    var next = [];
    if(randomDirection == 4) {
      next = [newGame.ghostPosition[0]-1, newGame.ghostPosition[1]];
    } else if (randomDirection == 3) {
      next = [newGame.ghostPosition[0], newGame.ghostPosition[1]-1];
    } else if (randomDirection == 2) {
      next = [newGame.ghostPosition[0]+1, newGame.ghostPosition[1]];
    } else if (randomDirection == 1) {
      next = [newGame.ghostPosition[0], newGame.ghostPosition[1]+1];
    }


    if ( upIsOpen === true && randomDirection === 4 && pacMan.isEqual(next, previous) === false) {
      console.log('move ' + 'up ' + pacMan.isEqual(next, previous) + " " + next + " " + newGame.ghostPosition + " " + previous);
      newGame.map[newGame.ghostPosition[0]][newGame.ghostPosition[1]] = 'path';
      current = [newGame.ghostPosition[0], newGame.ghostPosition[1]];
      previous = current;
      newGame.ghostPosition[0] -= 1;
      newGame.map[newGame.ghostPosition[0]][newGame.ghostPosition[1]] = 'ghost';
      renderBoard();
      return previous;
    }
    else if ( leftIsOpen === true && randomDirection === 3 && pacMan.isEqual(next, previous) === false) {
      console.log('move ' + 'left '+ pacMan.isEqual(next, previous) + " " + next + " " + newGame.ghostPosition + " " + previous);
      newGame.map[newGame.ghostPosition[0]][newGame.ghostPosition[1]] = 'path';
      current = [newGame.ghostPosition[0], newGame.ghostPosition[1]];
      previous = current;
      newGame.ghostPosition[1] -= 1;
      newGame.map[newGame.ghostPosition[0]][newGame.ghostPosition[1]] = 'ghost';
      renderBoard();
      return previous;
    }
    else if ( downIsOpen === true && randomDirection === 2 && pacMan.isEqual(next, previous) === false) {
      console.log('move ' + 'down ' + pacMan.isEqual(next, previous) + " " + next + " " + newGame.ghostPosition + " " + previous);
      newGame.map[newGame.ghostPosition[0]][newGame.ghostPosition[1]] = 'path';
      current = [newGame.ghostPosition[0], newGame.ghostPosition[1]];
      previous = current;
      newGame.ghostPosition[0] += 1;
      newGame.map[newGame.ghostPosition[0]][newGame.ghostPosition[1]] = 'ghost';
      renderBoard();
      return previous;
    }
    else if ( rightIsOpen === true && randomDirection == 1 && pacMan.isEqual(next, previous) === false) {
      console.log('move '+ 'right ' + pacMan.isEqual(next, previous) + " " + next + " " + newGame.ghostPosition + " " + previous);
      newGame.map[newGame.ghostPosition[0]][newGame.ghostPosition[1]] = 'path';
      current = [newGame.ghostPosition[0], newGame.ghostPosition[1]];
      previous = current;
      newGame.ghostPosition[1] += 1;
      newGame.map[newGame.ghostPosition[0]][newGame.ghostPosition[1]] = 'ghost';
      renderBoard();
      return previous;
    }
    console.log('crash or reverse');
  return previous;
};

PacMan.prototype.isEqual = function(array1, array2) {
  var equal = true;
  if (array1.length === array2.length) {
    for (i = 0; i < array1.length; i++) {
      if(array1[i] === array2[i]) {
        equal = true;
      }
      else{
        equal = false;
        break;
      }
    }
  }
  return equal;
};
