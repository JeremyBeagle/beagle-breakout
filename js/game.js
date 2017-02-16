function GlobalGame() {
  this.map =[
              ['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall'],
              ['wall','dot','dot', 'dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','wall'],
              ['wall','dot','wall','wall', 'wall', 'wall', 'dot', 'dot', 'dot', 'wall', 'dot', 'dot', 'dot', 'dot','dot','dot', 'dot', 'wall', 'dot', 'dot', 'dot', 'wall', 'wall', 'wall', 'wall', 'dot', 'wall'],
              ['wall','dot','wall', 'dot','dot', 'dot','dot','dot','dot','wall','dot', 'dot','dot', 'dot','dot','dot', 'dot','wall', 'dot','dot','dot','dot','dot','dot', 'wall','dot', 'wall'],
              ['wall','dot','wall', 'dot','wall','wall','wall','wall','dot','wall', 'dot','wall', 'wall','path','wall','wall', 'dot','wall','dot','wall','wall','wall','wall', 'dot','wall', 'dot','wall'],
              ['wall','dot','wall', 'dot','dot', 'dot','dot','dot','dot','wall', 'dot','wall',  'path','path','path','wall', 'dot', 'wall','dot','dot','dot','dot','dot', 'dot','wall',  'dot','wall'],
              ['wall','dot','dot', 'dot','wall','wall','wall','wall','dot','wall', 'dot','wall', 'path','path','path','wall', 'dot','wall','dot','wall','wall','wall','wall', 'dot','dot', 'dot','wall'],
              ['wall','dot','dot', 'dot','dot', 'wall', 'dot', 'dot', 'dot', 'wall', 'dot', 'wall','wall', 'wall','wall','wall', 'dot','wall', 'dot', 'dot', 'dot', 'wall', 'dot', 'dot', 'dot','dot', 'wall'],
              ['wall','dot','wall', 'wall','dot','wall','dot','dot','dot','wall','dot','dot','dot','dot','dot','dot', 'dot','wall','dot','dot','dot','wall','dot','wall','wall','dot','wall'],
              ['wall','dot','wall', 'wall', 'dot', 'dot', 'dot', 'dot', 'dot', 'wall', 'dot', 'dot', 'dot', 'dot','dot','dot', 'dot', 'wall', 'dot', 'dot', 'dot', 'dot', 'dot', 'wall', 'wall', 'dot', 'wall'],
              ['wall','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','wall'],
              ['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall'],

              ];
  this.score = 0;
  this.dotCount = 0;
  this.pacManPosition = [9,13];
  this.ghostPosition1 = [5,14];
  this.direction = '0';
}

function PacMan() {
  //edit strings in hard-coded matrix
  newGame.pacManPosition = [9, 13];
  newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'pac-man';
  newGame.ghostPosition1 = [5,14];
  this.previousghostPosition1 = [4, 5];
  this.direction = '0';
  newGame.map[newGame.ghostPosition1[0]][newGame.ghostPosition1[1]] = 'ghost';

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
      newGame.direction = '90';
      $('.pac-man').css({'transform' : 'rotate(90deg)'});
      }
      else if(newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]-1] === 'path') {
        $('.pac-man').remove(); //remove pacman from current div
        newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'path'; //assign former position to interior-block
        newGame.pacManPosition[1] -= 1; //decrement current position
        newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'pac-man';
        renderBoard();
        this.pacAppend();
        newGame.direction = '90';
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
      newGame.direction = '270';
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
        newGame.direction = '270';
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
      newGame.direction = '180';
      $('.pac-man').css({'transform' : 'rotate(180deg)'});
      }
      else if(newGame.map[newGame.pacManPosition[0] - 1][newGame.pacManPosition[1]] === 'path') {
        $('.pac-man').remove(); //remove pacman from current div
        newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'path'; //assign former position to interior-block
        newGame.pacManPosition[0]-= 1; //decrement current position
        newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'pac-man';
        renderBoard();
        this.pacAppend();
        newGame.direction = '180';
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
      newGame.direction = '0';
      }
      else if(newGame.map[newGame.pacManPosition[0] + 1][newGame.pacManPosition[1]] === 'path') {
        $('.pac-man').remove(); //remove pacman from current div
        newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'path'; //assign former position to interior-block
        newGame.pacManPosition[0] += 1; //decrement current position
        newGame.map[newGame.pacManPosition[0]][newGame.pacManPosition[1]] = 'pac-man';
        renderBoard();
        this.pacAppend();
        newGame.direction = '0';
      break;
    }
    }
    checkWin();
};

PacMan.prototype.pacAppend = function () {
  pacManHtml = '<img src="img/beagle-tower.png" class="pac-man">';
  currentPosition = $('.current-position');
  currentPosition.append(pacManHtml);
};

PacMan.prototype.ghostMove = function(previous) {
  var upIsOpen = true, downIsOpen = true, leftIsOpen = true, rightIsOpen = true;
  var randomDirection;
  var replacementTile;

  //obstacle check
  if (newGame.map[newGame.ghostPosition1[0] - 1][newGame.ghostPosition1[1]] === 'wall') {
    upIsOpen = false;
  }
  if (newGame.map[newGame.ghostPosition1[0]][newGame.ghostPosition1[1] - 1] === 'wall') {
    leftIsOpen = false;
  }
  if (newGame.map[newGame.ghostPosition1[0] + 1][newGame.ghostPosition1[1]] === 'wall') {
    downIsOpen = false;
  }
  if (newGame.map[newGame.ghostPosition1[0]][newGame.ghostPosition1[1] + 1] === 'wall') {
    rightIsOpen = false;
  }

    randomDirection = Math.floor(Math.random() * (5 - 1) + 1);

    //calculate next location
    var next = pacMan.next(randomDirection);

    if(newGame.map[next[0]][next[1]]==='dot') {
      replacementTile = 'dot';
    } else if (newGame.map[next[0]][next[1]]==='path') {
      replacementTile = 'path';
    } else if (newGame.map[next[0]][next[1]]==='pac-man') {
      replacementTile = 'path';
      alert("GAME OVER");
      $('.map-height-support').empty();
      return;
    }

    if ( upIsOpen === true && randomDirection === 4 && pacMan.isEqual(next, previous) === false) {
      newGame.map[newGame.ghostPosition1[0]][newGame.ghostPosition1[1]] = replacementTile;
      previous = [newGame.ghostPosition1[0], newGame.ghostPosition1[1]];
      newGame.ghostPosition1[0] -= 1;
      newGame.map[newGame.ghostPosition1[0]][newGame.ghostPosition1[1]] = 'ghost';
      renderBoard();
      return previous;
    }
    else if ( leftIsOpen === true && randomDirection === 3 && pacMan.isEqual(next, previous) === false) {
      newGame.map[newGame.ghostPosition1[0]][newGame.ghostPosition1[1]] = replacementTile;
      previous = [newGame.ghostPosition1[0], newGame.ghostPosition1[1]];
      newGame.ghostPosition1[1] -= 1;
      newGame.map[newGame.ghostPosition1[0]][newGame.ghostPosition1[1]] = 'ghost';
      renderBoard();
      return previous;
    }
    else if ( downIsOpen === true && randomDirection === 2 && pacMan.isEqual(next, previous) === false) {
      newGame.map[newGame.ghostPosition1[0]][newGame.ghostPosition1[1]] = replacementTile;
      previous = [newGame.ghostPosition1[0], newGame.ghostPosition1[1]];
      newGame.ghostPosition1[0] += 1;
      newGame.map[newGame.ghostPosition1[0]][newGame.ghostPosition1[1]] = 'ghost';
      renderBoard();
      return previous;
    }
    else if ( rightIsOpen === true && randomDirection == 1 && pacMan.isEqual(next, previous) === false) {
      newGame.map[newGame.ghostPosition1[0]][newGame.ghostPosition1[1]] = replacementTile;
      previous = [newGame.ghostPosition1[0], newGame.ghostPosition1[1]];
      newGame.ghostPosition1[1] += 1;
      newGame.map[newGame.ghostPosition1[0]][newGame.ghostPosition1[1]] = 'ghost';
      renderBoard();
      return previous;
    }
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

PacMan.prototype.next = function (randomNumber) {
  var next = [];
  if(randomNumber == 4) {
    next = [newGame.ghostPosition1[0]-1, newGame.ghostPosition1[1]];
  } else if (randomNumber == 3) {
    next = [newGame.ghostPosition1[0], newGame.ghostPosition1[1]-1];
  } else if (randomNumber == 2) {
    next = [newGame.ghostPosition1[0]+1, newGame.ghostPosition1[1]];
  } else if (randomNumber == 1) {
    next = [newGame.ghostPosition1[0], newGame.ghostPosition1[1]+1];
  }
  return next;
};
