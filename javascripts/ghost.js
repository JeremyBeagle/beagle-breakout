function Ghost (id, startingLocation, previousLocation) {
  this.id = id;
  this.posY = startingLocation[0];
  this.posX = startingLocation[1];
  this.lastPosY = previousLocation[0];
  this.lastPosX = previousLocation[1];
}
Ghost.prototype.ghostMove = function(previous) {

  let up = true, down = true, left = true, right = true;
  let direction = Math.floor(Math.random() * (5 - 1) + 1);
  let replacementTile;
  let next = this.next(direction);
  let currentPosition = newGame.mapFind(`ghost${this.id}`); //begin ghost movement interval
  //obstacle check
  if (newGame.map[currentPosition[0] - 1][currentPosition[1]] === 'wall' || newGame.map[currentPosition[0] - 1][currentPosition[1]] === ('ghost' + (this.id * -1)) ) {
    up = false;
  }
  if (newGame.map[currentPosition[0]][currentPosition[1] - 1] === 'wall' || newGame.map[currentPosition[0]][currentPosition[1] - 1] === ('ghost' + (this.id * -1))) {
    left = false;
  }
  if (newGame.map[currentPosition[0] + 1][currentPosition[1]] === 'wall' || newGame.map[currentPosition[0] + 1][currentPosition[1]] === ('ghost' + (this.id * -1))) {
    down = false;
  }
  if (newGame.map[currentPosition[0]][currentPosition[1] + 1] === 'wall' || newGame.map[currentPosition[0]][currentPosition[1] + 1] === ('ghost' + (this.id * -1))) {
    right = false;
  }

    if(newGame.map[next[0]][next[1]]==='dot') {
      replacementTile = 'dot';
    } else if (newGame.map[next[0]][next[1]]==='path') {
      replacementTile = 'path';
    } else if (newGame.map[next[0]][next[1]]==='pac-man') {
      replacementTile = 'path';
      $('.map-height-support').empty();
      window.location.href = "game-over.html";
      return;
    }

    if ( up === true && direction === 4 && this.isEqual(next, previous) === false) {
      newGame.map[currentPosition[0] - 1][currentPosition[1]] = 'ghost' + this.id;
      newGame.map[currentPosition[0]][currentPosition[1]] = replacementTile; //assign current tile
      previous = [currentPosition[0], currentPosition[1]];
      this.posY -= 1;
      return previous;
    }
    else if ( left === true && direction === 3 && this.isEqual(next, previous) === false) {
      newGame.map[currentPosition[0]][currentPosition[1] - 1] = 'ghost' + this.id;
      newGame.map[currentPosition[0]][currentPosition[1]] = replacementTile;
      previous = [currentPosition[0], currentPosition[1]];
      this.posX -= 1;
      return previous;
    }
    else if ( down === true && direction === 2 && this.isEqual(next, previous) === false) {
      newGame.map[currentPosition[0] + 1][currentPosition[1]] = 'ghost' + this.id;
      newGame.map[currentPosition[0]][currentPosition[1]] = replacementTile;
      previous = [currentPosition[0], currentPosition[1]];
      this.posY += 1;
      return previous;
    }
    else if ( right === true && direction == 1 && this.isEqual(next, previous) === false) {
      newGame.map[currentPosition[0]][currentPosition[1] + 1] = 'ghost' + this.id;
      newGame.map[currentPosition[0]][currentPosition[1]] = replacementTile;
      previous = [currentPosition[0], currentPosition[1]];
      this.posX += 1;
      return previous;
    }
  return previous;
};

Ghost.prototype.isEqual = function(array1, array2) {
  let equal = true;
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
  let next = [];
  let currentPosition = newGame.mapFind(`ghost${this.id}`);
  if(randomNumber == 4) {
    next = [currentPosition[0]-1, currentPosition[1]];
  } else if (randomNumber == 3) {
    next = [currentPosition[0], currentPosition[1]-1];
  } else if (randomNumber == 2) {
    next = [currentPosition[0]+1, currentPosition[1]];
  } else if (randomNumber == 1) {
    next = [currentPosition[0], currentPosition[1]+1];
  }
  return next;
};
