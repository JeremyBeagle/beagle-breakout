var newGame = new GlobalGame();
var pacMan;

$(document).ready(function () {
  $(document).keydown(moveGame);
  renderBoard();
  pacMan = new PacMan();
  });

function moveGame (ev) {
  var acceptableKeys = [ 37, 65, 38, 87, 39, 68, 40, 83 ];

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
      pacMan.move('left');
      break;
    case 38:  // up arrow
    case 87:  // w
      pacMan.move('up');
      break;
    case 39:  // right arrow
    case 68:  // d
      pacMan.move('right');
      break;
    case 40:  // down arrow
    case 83:  // s
      pacMan.move('down');
      break;
  }
}

function renderBoard () {
  $('.map-height-support').empty();

  var blockClass;
  var blockHtml;
  newGame.dotCount = 0;
  newGame.map.forEach(function(row) {

      row.forEach(function (tile) {

        if (tile === 'path') {
          blockClass = 'tile interior-block';
        }
        else if (tile === 'wall') {
          blockClass = 'tile exterior-block';
        }
        else if (tile === 'pac-man'){
          blockClass = 'tile current-position';
        }
        else if (tile === 'dot') {
          blockClass = 'tile dot';
          newGame.dotCount += 1;
        }

        if(blockClass === 'tile dot') {
          blockHtml = '<div class="tile interior-block"><div class="dot"></div></div>';
        } else {
          blockHtml = '<div class="'+blockClass+'"></div>';
        }
          $('.map-height-support').append(blockHtml);
      });
  });
}

function updateScore () {
  $('.score').html("Score: " + newGame.score);
}

function checkWin() {
  if (newGame.dotCount === 0) {
    alert("YOU WIN!");
  }
}
