const Input = require ('./input');
const Game = require ('./game');
document.addEventListener("DOMContentLoaded", () => {
  const $cube = $('.cube');
  const $score = $("#score");
  Input.bindCubeKeys($cube);

  const $playButton = $('[name="play-button"]');
  const $newGameButton = $('[name="new-game-button"]');
  const $gridLineToggle = $('[name="gridlines-button"]');

  let game = new Game({$cube: $cube, $score: $score, $newGameButton: $newGameButton});
  game.draw();



  $playButton.on("click", event => {
    $playButton.css( {display: "none"} );
    game.start();
  });

  $newGameButton.on("click", event => {
    //stop old game
    game.stop();
    $newGameButton.css({display: "none"});

    //create a new game, draw it, and start it
    game = new Game({$cube: $cube, $score: $score});

    $cube.data('h-rot', 45);
    $cube.data('v-rot', 0);
    $cube.css("-webkit-transform", "rotateX(0deg) rotateY(45deg)");

    game.draw();
    setTimeout(game.start.bind(game), 2000);
  });

  //button to do gridlines
  const $cells = $('.side div div');
  $gridLineToggle.on("click", event => {
    if (event.currentTarget.getAttribute('selected')) {
      event.currentTarget.removeAttribute('selected');
      $cells.css('border', "none");
    } else {
      event.currentTarget.setAttribute('selected', 'selected');
      $cells.css('border', "1px solid black");
    }
  });


});
