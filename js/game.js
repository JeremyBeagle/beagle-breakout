function PacMan() {
  //apply position to hard-coded matrix
  this.pacManPosition = [9, 13];
  this.direction = '0';
  newGame.map[this.pacManPosition[0]][this.pacManPosition[1]] = 'pac-man';

  var ghostHtml = '<div class="ghost"></div>';
  $('.ghost-position').append(ghostHtml);
  var pacManHtml = '<img src="img/beagle-tower.png" class="pac-man">'; //create HTML template
  $('.current-position').append(pacManHtml); //add pac-man to corresponding div on rendered board
}

PacMan.prototype.pacAppend = function () {
  pacManHtml = '<img src="img/beagle-tower.png" class="pac-man">';
  currentPosition = $('.current-position');
  currentPosition.append(pacManHtml);
};



function Ghost () {
  this.ghostPosition1 = [5,14];
  this.previousGhostPosition1 = [6, 14];
  newGame.map[this.ghostPosition1[0]][this.ghostPosition1[1]] = 'ghost';
}
Ghost.prototype.ghostMove = function(previous) {
  var upIsOpen = true, downIsOpen = true, leftIsOpen = true, rightIsOpen = true;
  var randomDirection = Math.floor(Math.random() * (5 - 1) + 1);
  var replacementTile;
  var next = this.next(randomDirection);
  var ghostPosition1 = newGame.findGhost('ghost'); //begin ghost movement interval

  //obstacle check
  if (newGame.map[ghostPosition1[0] - 1][ghostPosition1[1]] === 'wall') {
    upIsOpen = false;
  }
  if (newGame.map[ghostPosition1[0]][ghostPosition1[1] - 1] === 'wall') {
    leftIsOpen = false;
  }
  if (newGame.map[ghostPosition1[0] + 1][ghostPosition1[1]] === 'wall') {
    downIsOpen = false;
  }
  if (newGame.map[ghostPosition1[0]][ghostPosition1[1] + 1] === 'wall') {
    rightIsOpen = false;
  }

    if(newGame.map[next[0]][next[1]]==='dot') {
      replacementTile = 'dot';
    } else if (newGame.map[next[0]][next[1]]==='path') {
      replacementTile = 'path';
    } else if (newGame.map[next[0]][next[1]]==='pac-man') {
      replacementTile = 'path';
      $('.map-height-support').empty();
      $('.game-over-screen').toggle();
      return;
    }

    if ( upIsOpen === true && randomDirection === 4 && this.isEqual(next, previous) === false) {
      newGame.map[ghostPosition1[0] - 1][ghostPosition1[1]] = 'ghost';
      newGame.map[ghostPosition1[0]][ghostPosition1[1]] = replacementTile; //assign current tile
      previous = [ghostPosition1[0], ghostPosition1[1]];
      this.ghostPosition1[0] -= 1;
      newGame.renderBoard();
      return previous;
    }
    else if ( leftIsOpen === true && randomDirection === 3 && this.isEqual(next, previous) === false) {
      newGame.map[ghostPosition1[0]][ghostPosition1[1] - 1] = 'ghost';
      newGame.map[ghostPosition1[0]][ghostPosition1[1]] = replacementTile;
      previous = [ghostPosition1[0], ghostPosition1[1]];
      this.ghostPosition1[1] -= 1;
      newGame.renderBoard();
      return previous;
    }
    else if ( downIsOpen === true && randomDirection === 2 && this.isEqual(next, previous) === false) {
      newGame.map[ghostPosition1[0] + 1][ghostPosition1[1]] = 'ghost';
      newGame.map[ghostPosition1[0]][ghostPosition1[1]] = replacementTile;
      previous = [ghostPosition1[0], ghostPosition1[1]];
      this.ghostPosition1[0] += 1;
      newGame.renderBoard();
      return previous;
    }
    else if ( rightIsOpen === true && randomDirection == 1 && this.isEqual(next, previous) === false) {
      newGame.map[ghostPosition1[0]][ghostPosition1[1] + 1] = 'ghost';
      newGame.map[ghostPosition1[0]][ghostPosition1[1]] = replacementTile;
      previous = [ghostPosition1[0], ghostPosition1[1]];
      this.ghostPosition1[1] += 1;
      newGame.renderBoard();
      return previous;
    }
  return previous;
};

Ghost.prototype.isEqual = function(array1, array2) {
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

Ghost.prototype.next = function (randomNumber) {
  var next = [];
  var ghostPosition1 = newGame.findGhost('ghost');
  if(randomNumber == 4) {
    next = [ghostPosition1[0]-1, ghostPosition1[1]];
  } else if (randomNumber == 3) {
    next = [ghostPosition1[0], ghostPosition1[1]-1];
  } else if (randomNumber == 2) {
    next = [ghostPosition1[0]+1, ghostPosition1[1]];
  } else if (randomNumber == 1) {
    next = [ghostPosition1[0], ghostPosition1[1]+1];
  }
  return next;
};
