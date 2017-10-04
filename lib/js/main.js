const Input = require ('./input');
const Game = require ('./game');
document.addEventListener("DOMContentLoaded", () => {
  const $cube = $('.cube');
  const $score = $("#score");
  Input.bindCubeKeys($cube);
  const game = new Game({$cube: $cube, $score: $score});
  game.draw();

  const playButton = $('[name="play-button"]');
  playButton.on("click", event => {
    game.start();
  });

});
