const Player = require ('./player');
const Enemy = require ('./enemy');
const Coin = require ('./coin');
const Util = require ('./util');

class Game {
  constructor() {
    this.players = [];
    this.enemies = [];
    this.coins = [];

    this.enemySpeed = 500;

    this.addPlayer();
    this.addEnemies([["front",[0,1]]]);
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
      this.add(new Coin({face: coinPositions[i][0], pos: coinPositions[i][1]}));
    }
  }

  addEnemies(enemyPositions) {
    for (let i = 0; i < enemyPositions.length; i++) {
      this.add(new Enemy({face: enemyPositions[i][0], pos: enemyPositions[i][1]}));
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
  detectCollision(player) {

    this.enemies.forEach(enemy => {
      if(Util.inSamePos(enemy, player)) {
        console.log("ENEMY COLLISION");
      }
    });

    this.coins.forEach(coin => {
      if(Util.inSamePos(coin, player)) {
        console.log("COIN COLLECTED AWYEA");
      }
    });
  }

  //iterates through all objects and gives the divs at the corresponding positions classes
  draw() {
    //remove all obj classes from the divs
    $('div').removeClass("Player");
    $('div').removeClass("Enemy");
    $('div').removeClass("Coin");
    //add classes to the relevant divs
    this.allObjects().forEach((object) => {
      object.draw();
    });
  }

  //iterates through enemies and updates its position
  moveEnemies() {
    this.enemies.forEach((enemy)=> {
      enemy.move(enemy.direction);
    });
  }

  //draws, then handles collisions
  step() {
    this.draw();
    this.detectCollision(this.players[0]);
  }

  start() {
    setInterval(this.step.bind(this),50);
    setInterval(this.moveEnemies.bind(this),this.enemySpeed);
  }


}



module.exports = Game;
