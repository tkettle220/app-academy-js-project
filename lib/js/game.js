const Player = require ('./player');
const Enemy = require ('./enemy');
const Coin = require ('./coin');

class Game {
  constructor() {
    this.players = [];
    this.enemies = [];
    this.coins = [];

    this.addPlayer();
  }

  add(object) {
    if (object instanceof Player) {
      this.players.push(object);
    } else if (object instanceof Enemy) {
      this.enemies.push(object);
    } else if (object instanceof Coin) {
      this.coins.push(object);
    } else {
      throw "unknown type of object";
    }
  }


  addCoins(coinPositions) {
    for (let i = 0; i < coinPositions.length; i++) {
      this.add(new Coin({pos: coinPositions[i]}));
    }
  }

  addEnemies(enemyPositions) {
    for (let i = 0; i < enemyPositions.length; i++) {
      this.add(new Enemy({pos: enemyPositions[i]}));
    }
  }

  addPlayer() {
   const player = new Player({
     face: "front",
     pos: [1,1]
   });

   this.add(player);

   return player;
 }

 allObjects() {
   return [].concat(this.players, this.enemies, this.coins);
 }

  //looks at all coins and enemies and checks their position against the player's position
  detectCollision() {

  }

  //iterates through all objects and gives the divs at the corresponding positions classes
  draw() {
    //remove all obj classes from the divs
    //add classes to the relevant divs
    this.allObjects().forEach((object) => {
      object.draw();
    });
  }

  //iterates through each object and updates its position
  move() {

  }

  //moves each object, handles collisions, and then draws
  step() {

  }


}



module.exports = Game;
