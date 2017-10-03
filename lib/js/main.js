const Input = require ('./input');
const Game = require ('./game');
document.addEventListener("DOMContentLoaded", () => {
  const cube = $('.cube');
  Input.bindCubeKeys(cube);
  const game = new Game();
  const player = game.players[0];
  Input.bindMoveKeys(player);
  setInterval(game.draw.bind(game),1000);

});
