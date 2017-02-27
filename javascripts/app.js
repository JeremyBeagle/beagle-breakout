let newGame = {
  map:     [['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall'],
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
            ['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall']
          ],
  score: 0,
  dotCount: 0,
  renderBoard: () => {
    //read, style, and append to DOM based on string contents of hard-coded matrix
      $('.map-height-support').empty();
      let blockClass;
      let blockHtml;
      newGame.dotCount = 0;
      newGame.map.forEach((row) => {
          row.forEach((tile) => {
            if (tile === 'path') {
              blockClass = 'tile interior-block';
              blockHtml = '<div class="'+blockClass+'"></div>';
              $('.map-height-support').append(blockHtml);
            }
            else if (tile === 'wall') {
              blockClass = 'tile exterior-block';
              blockHtml = '<div class="'+blockClass+'"></div>';
              $('.map-height-support').append(blockHtml);
            }
            else if (tile === 'pac-man'){
              blockClass = 'tile current-position';
              blockHtml = '<div class="'+blockClass+'"></div>';
              $('.map-height-support').append(blockHtml);
              beagleHtml = '<img src="images/beagle.png" class="pac-man">';
              currentPosition = $('.current-position');
              currentPosition.append(beagleHtml);
              $('.pac-man').css({'transform' : 'rotate('+newGame.direction+'deg)'});
            }
            else if (tile === 'ghost1') {
              blockClass = 'tile ghost-position1';
              blockHtml = '<div class="'+blockClass+'"></div>';
              $('.map-height-support').append(blockHtml);
              let ghostHtml1 = '<img src="images/dog-catcher.png" class="ghost">';
              $('.ghost-position1').append(ghostHtml1);
            }
            else if (tile === 'ghost-1') {
              blockClass = 'tile ghost-position2';
              blockHtml = '<div class="'+blockClass+'"></div>';
              $('.map-height-support').append(blockHtml);
              let ghostHtml2 = '<img src="images/dog-catcher.png" class="ghost">';
              $('.ghost-position2').append(ghostHtml2);
            }
            else if (tile === 'dot') {
              blockHtml = '<div class="tile interior-block"><img class = "dot" src = "images/bone.png"></div></div>';
              $('.map-height-support').append(blockHtml);
              newGame.dotCount += 1;
            }
          });
      });
  },
  updateScore: () => {
    $('.score').html("Score: " + newGame.score);
  },
  checkWin: () => {
    if (newGame.dotCount === 0) {
      ion.sound.play('big-pimpin');
      window.location.href = "victory.html";
    }
  },
  mapFind: (target) => {
    for( let i = 0; i < this.map.length; i += 1) {
      for (let j = 0; j <this.map[1].length; j += 1) {
        if (this.map[i][j] === target) {
          return [i, j];
        }
      }
    }
    return undefined;
  },
  beagle: new Beagle(),
  ghost: new Ghost(1, [5,14], [6,14]),
  ghost2: new Ghost(-1, [5,13], [6,13]),
  spawnBeagle: () => {
    this.map[this.beagle.posY][this.beagle.posX] = 'pac-man';
  },
  spawnGhost: () => {
    this.map[this.ghost.posY][this.ghost.posX] = `ghost${this.ghost.id}`;
    this.map[this.ghost2.posY][this.ghost2.posX] = `ghost${this.ghost2.id}`;
  },
  keyListen: (ev) => {
    let acceptableKeys = [ 37, 65, 38, 87, 39, 68, 40, 83 ];
    if (!acceptableKeys.includes(ev.keyCode)) {
      return;
    }
    // prevent arrow key scrolling
    ev.preventDefault();

    // 4. move board in object based on keypresses (up, down, left, right)
    // move if correct keys were pressed
    switch (ev.keyCode) {
      case 37:  // left arrow
      case 65:  // a
      console.log(newGame.beagle);
        newGame.beagle.move('left');
        break;
      case 38:  // up arrow
      case 87:  // w
        newGame.beagle.move('up');
        break;
      case 39:  // right arrow
      case 68:  // d
        newGame.beagle.move('right');
        break;
      case 40:  // down arrow
      case 83:  // s
        newGame.beagle.move('down');
        break;
    }
  }

};

$(document).ready(function () {

  loadSounds();

    ion.sound.play("pac-man-hip-hop-intro");

    newGame.spawnBeagle(); //place beagle on map
    newGame.spawnGhost(); //place dog-catchers on map

    renderInterval = setInterval(render, 10);

    function render () {
      newGame.renderBoard();
      newGame.checkWin();
    }

    let intervalId = setInterval(move, 75);
    let previous = [newGame.ghost.lastPosY, newGame.ghost.lastPosX];
    let previous2 = [newGame.ghost2.lastPosY, newGame.ghost2.lastPosX];

    function move () {
      if(newGame.mapFind('pac-man') === undefined) {
        clearInterval(intervalId);
      }
      previous = newGame.ghost.ghostMove(previous);
      previous2 = newGame.ghost2.ghostMove(previous2);
    }

  $(document).keydown(keyListen);
});

//how can I get beagle to KeyListen?



function loadSounds() {
    ion.sound({
      sounds: [{name: 'pac-man-hip-hop-intro'}, {name: 'water-drop'}, {name: 'big-pimpin'} ],
      path: 'lib/ion.sound/ion.sound-3.0.7/sounds/',
      preload: true,
      volume: 1.0,
    });
  }
