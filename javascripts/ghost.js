function Ghost (id, startingLocation, previousLocation) {
  this.id = id;
  this.posY = startingLocation[0];
  this.posX = startingLocation[1];
  this.lastPosY = previousLocation[0];
  this.lastPosX = previousLocation[1];
}

Ghost.prototype.ghostMove = function(previous) {

  let nextTile = null;

  do {
    let direction = Math.floor(Math.random() * (5 - 1) + 1);
    nextTile = this.checkNext(direction);
  }
  while(this.isBlocked(nextTile) === true || this.isEqual(nextTile.position, previous) === true);
  previous = this.step(nextTile);

  return previous;
};

Ghost.prototype.isEqual = function(array1, array2) {
  let equal = true;
  if (array1.length === array2.length) {
    for (i = 0; i < array1.length; i++) {
      if(array1[i] !== array2[i]) {
        equal = false;
        break;
      }
    }
  }
  return equal;
};

Ghost.prototype.checkNext = function (direction) {
  let nextTile = {
    position: [],
    value: null
  };
  let currentPosition = newGame.mapFind(`ghost${this.id}`);
  let posY = currentPosition[0];
  let posX = currentPosition[1];

  if (direction === 4) {
    nextTile.position = [posY - 1, posX];
  }
  else if (direction === 3) {
    nextTile.position = [posY, posX - 1];
  }
  else if (direction === 2) {
    nextTile.position = [posY + 1, posX];
  }
  else if (direction === 1) {
    nextTile.position = [posY, posX + 1];
  }
  nextTile.value = newGame.map[nextTile.position[0]][nextTile.position[1]];
  return nextTile;
};

Ghost.prototype.isBlocked = function (nextTile) {
  let posY = nextTile.position[0];
  let posX = nextTile.position[1];

  if (newGame.map[posY][posX] === 'wall') {
    return true;
  }
  return false;
};

Ghost.prototype.step = function (nextTile) {
  if (nextTile.value === 'pac-man') {
    window.location.href = "game-over.html";
    return;
  }

  let previous = [this.posY, this.posX];

  if (nextTile.value === `ghost${this.id * -1}`) {
    return previous;
  }

  newGame.map[nextTile.position[0]][nextTile.position[1]] = `ghost${this.id}`;
  newGame.map[this.posY][this.posX] = nextTile.value;
  this.posY = nextTile.position[0];
  this.posX = nextTile.position[1];
  return previous;
};
