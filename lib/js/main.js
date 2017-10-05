const Input = require ('./input');
const Game = require ('./game');
document.addEventListener("DOMContentLoaded", () => {
  const $cube = $('.cube');
  const $score = $("#score");
  Input.bindCubeKeys($cube);
  let game = new Game({$cube: $cube, $score: $score});
  game.draw();

  const $playButton = $('[name="play-button"]');
  const $newGameButton = $('[name="new-game-button"]');
  const $gridLineToggle = $('[name="gridlines-button"]');

  $playButton.on("click", event => {
    $playButton.css( {display: "none"} );
    $newGameButton.css( {display: "block"} );
    game.start();
  });

  $newGameButton.on("click", event => {
    //stop old game
    game.stop();
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
    if (event.currentTarget.innerHTML == "Remove Gridlines") {
      $cells.css('border', "none");
      event.currentTarget.innerHTML = "Add Gridlines";
    } else {
      $cells.css('border', "1px solid black");
      event.currentTarget.innerHTML = "Remove Gridlines";
    }
  });


});
