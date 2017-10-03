const Input = require ('./input');
const Game = require ('./game');
document.addEventListener("DOMContentLoaded", () => {
  const cube = $('.cube');
  Input.bindCubeKeys(cube);
  const game = new Game();
  // Input.bindMoveKeys(game);
  game.draw();
});
