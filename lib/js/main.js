const Input = require ('./input');
const Game = require ('./game');
const Util = require ('./util');



document.addEventListener("DOMContentLoaded", () => {

  const $cube = $('.cube');
  const $score = $("#score");
  const $level = $("#level");
  Input.bindCubeKeys($cube);

  const $playButton = $('[name="play-button"]');
  const $newGameButton = $('[name="new-game-button"]');
  const $gridLineToggle = $('[name="gridlines-button"]');
  const $autoRotateToggle = $('[name="auto-rotate-button"]');

  let game = new Game({$cube: $cube, $score: $score, $newGameButton: $newGameButton, $level: $level, $autoRotateToggle: $autoRotateToggle});
  game.draw();



  $playButton.on("click", event => {
    $playButton.css( {display: "none"} );
    game.start();
  });

  $newGameButton.on("click", event => {

    $newGameButton.css({display: "none"});

    //create a new game, draw it, and start it
    game = new Game({$cube: $cube, $score: $score, $newGameButton: $newGameButton, $level: $level, $autoRotateToggle: $autoRotateToggle});
    $level.text("0");

    Util.turnCubeToFace($cube, 'startAngle');

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

  $autoRotateToggle.on("click", event => {
    if (event.currentTarget.getAttribute('selected')) {
      event.currentTarget.removeAttribute('selected');
    } else {
      event.currentTarget.setAttribute('selected', 'selected');
    }
  });

  //button for AutoRotate


});
