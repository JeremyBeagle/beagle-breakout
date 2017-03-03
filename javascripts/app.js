let newGame = {
  map:     [['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall'],
            ['wall','dot', 'dot', 'dot', 'dot', 'dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','wall'],
            ['wall','dot', 'wall','wall','wall','wall', 'dot', 'dot', 'dot', 'wall', 'dot', 'dot', 'dot', 'dot','dot','dot', 'dot', 'wall', 'dot', 'dot', 'dot', 'wall', 'wall', 'wall', 'wall', 'dot', 'wall'],
            ['wall','dot', 'wall','dot', 'dot', 'dot','dot','dot','dot','wall','dot', 'dot','dot', 'dot','dot','dot', 'dot','wall', 'dot','dot','dot','dot','dot','dot', 'wall','dot', 'wall'],
            ['wall','dot', 'wall','dot', 'wall','wall','wall','wall','dot','wall', 'dot','wall', 'wall','path','wall','wall', 'dot','wall','dot','wall','wall','wall','wall', 'dot','wall', 'dot','wall'],
            ['wall','dot', 'wall','dot', 'dot', 'dot','dot','dot','dot','wall', 'dot','wall',  'path','path','path','wall', 'dot', 'wall','dot','dot','dot','dot','dot', 'dot','wall',  'dot','wall'],
            ['wall','dot', 'dot', 'dot', 'wall','wall','wall','wall','dot','wall', 'dot','wall', 'path','path','path','wall', 'dot','wall','dot','wall','wall','wall','wall', 'dot','dot', 'dot','wall'],
            ['wall','dot', 'dot', 'dot', 'dot', 'wall', 'dot', 'dot', 'dot', 'wall', 'dot', 'wall','wall', 'wall','wall','wall', 'dot','wall', 'dot', 'dot', 'dot', 'wall', 'dot', 'dot', 'dot','dot', 'wall'],
            ['wall','dot', 'wall','wall','dot', 'wall','dot','dot','dot','wall','dot','dot','dot','dot','dot','dot', 'dot','wall','dot','dot','dot','wall','dot','wall','wall','dot','wall'],
            ['wall','dot', 'wall','wall','dot', 'dot', 'dot', 'dot', 'dot', 'wall', 'dot', 'dot', 'dot', 'dot','dot','dot', 'dot', 'wall', 'dot', 'dot', 'dot', 'dot', 'dot', 'wall', 'wall', 'dot', 'wall'],
            ['wall','dot', 'dot', 'dot', 'dot', 'dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','wall'],
            ['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall']
          ],
  score: 0,
  dotCount: 0,
  renderBoard: function() {
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
            else if (tile === 'beagle'){
              blockClass = 'tile current-position';
              blockHtml = '<div class="'+blockClass+'"></div>';
              $('.map-height-support').append(blockHtml);
              beagleHtml = '<img src="images/beagle.png" class="beagle">';
              currentPosition = $('.current-position');
              currentPosition.append(beagleHtml);
              $('.beagle').css({'transform' : 'rotate('+newGame.direction+'deg)'});
            }
            else if (tile === 'catcher1') {
              blockClass = 'tile catcher-position1';
              blockHtml = '<div class="'+blockClass+'"></div>';
              $('.map-height-support').append(blockHtml);
              let ghostHtml1 = '<img src="images/dog-catcher.png" class="catcher">';
              $('.catcher-position1').append(ghostHtml1);
            }
            else if (tile === 'catcher-1') {
              blockClass = 'tile catcher-position2';
              blockHtml = '<div class="'+blockClass+'"></div>';
              $('.map-height-support').append(blockHtml);
              let ghostHtml2 = '<img src="images/dog-catcher.png" class="catcher">';
              $('.catcher-position2').append(ghostHtml2);
            }
            else if (tile === 'dot') {
              blockHtml = '<div class="tile interior-block"><img class = "dot" src = "images/bone.png"></div></div>';
              $('.map-height-support').append(blockHtml);
              newGame.dotCount += 1;
            }
          });
      });
  },
  updateScore: function() {
    $('.score').html("Score: " + newGame.score);
  },
  checkWin: function() {
    if (newGame.dotCount === 0) {
      ion.sound.play('big-pimpin');
      window.location.href = "victory.html";
    }
  },
  mapFind: function (target) {
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
  catcher1: new Catcher(1, [6,13], [6,14]),
  catcher2: new Catcher(-1, [6,13], [6,14]),
  placeBeagle: function () {
    this.map[this.beagle.posY][this.beagle.posX] = 'beagle';
  },
  placeGhost: function () {
    this.map[this.catcher1.posY][this.catcher1.posX] = `catcher${this.catcher1.id}`;
    const intervalId = setTimeout(second, 535);
    let catcher2 = this.catcher2;
    let map = this.map;
    function second() {
      map[catcher2.posY][catcher2.posX] = `catcher${catcher2.id}`;
    }
  },
  keyListen: function(ev) {
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

$(document).ready( function()  {

  loadSounds();

  ion.sound.play("pac-man-hip-hop-intro");

  newGame.placeBeagle(); //place beagle on map
  newGame.placeGhost(); //place dog-catchers on map
  newGame.catcher1.exit();
  const intervalId3 = setTimeout(secondExit, 545);

  function secondExit() {
    newGame.catcher2.exit();
  }

  renderInterval = setInterval(render, 20);

  function render () {
    newGame.renderBoard();
    newGame.checkWin();
  }
  const intervalId = setTimeout(beginChase, 1090);

  function beginChase() {

    let intervalId2 = setInterval(move, 200);
    let previous = [newGame.catcher1.lastPosY, newGame.catcher1.lastPosX];
    let previous2 = [newGame.catcher2.lastPosY, newGame.catcher2.lastPosX];

      function move () {
        if(newGame.mapFind('beagle') === undefined) {
          clearInterval(intervalId2);
        }
        previous = newGame.catcher1.move(previous);
        previous2 = newGame.catcher2.move(previous2);
      }

    }

  $(document).keydown(newGame.keyListen);
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
