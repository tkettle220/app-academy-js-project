const Player = require ('./player');
const Enemy = require ('./enemy');
const Coin = require ('./coin');
const Util = require ('./util');
const Input = require ('./input');

class Game {
  constructor(options) {
    this.$cube = options.$cube;
    this.players = [];
    this.enemies = [];
    this.coins = [];
    this.score = 0;
    this.level = 0;

    this.$score = options.$score;
    this.$newGameButton = options.$newGameButton;
    this.$level = options.$level
    this.$autoRotateToggle = options.$autoRotateToggle;

    this.enemySpeed = 1000;

    this.stopStepInterval = null;
    this.stopEnemyMoveInterval = null;

    this.addPlayer();
    this.addEnemies([["front",[0,0],[0,1]],["front",[2,0],[0,1]]]);
    this.addCoins([["front",[0,2]]]);
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

  //remove any coins at the player's position
  removeCoin(coin) {
    this.coins.splice(this.coins.indexOf(coin), 1)
  }

  removeObject(obj) {
    if (object instanceof Player) {
      this.players.splice(this.players.indexOf(obj),1);
    } else if (object instanceof Enemy) {
      this.enemies.splice(this.enemies.indexOf(obj), 1)
    } else if (object instanceof Coin) {
      this.coins.splice(this.coins.indexOf(obj), 1)
    } else {
      throw "unknown type of object";
    }
  }

  spawnCoin() {
    const randFace = Util.pickRand(["top","bottom","front","back","left","right"]);
    const randRow = Util.pickRand([0,1,2]);
    const randCol = Util.pickRand([0,1,2]);
    let newCoin = new Coin({face: randFace, pos: [randRow,randCol]});
    //dont let coin spawn on top of player
    if(Util.inSamePos(this.players[0], newCoin)) {
      this.spawnCoin();
      return;
    }

    this.add(newCoin);
  }

  addEnemies(enemyPositions) {
    for (let i = 0; i < enemyPositions.length; i++) {
      this.add(new Enemy({face: enemyPositions[i][0], pos: enemyPositions[i][1], direction: enemyPositions[i][2]}));
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
        this.stop();
        Util.turnCubeToFace(this.$cube, this.players[0].face);
        this.draw();
        this.$newGameButton.css( {display: "block"} );
      }
    });

    this.coins.forEach(coin => {
      if(Util.inSamePos(coin, player)) {
        this.removeCoin(coin);
        this.score += 1;
        //only spawn coin if score is not a multiple of 10
        if(this.score % 10 == 0) {
          this.level += 1;
          this.beginNewLevel(LEVELS[this.level % LEVELS.length]);
        } else {
          this.spawnCoin();
        }

      }
    });
  }

  //iterates through all objects and gives the divs at the corresponding positions classes
  draw() {
    //remove all obj classes from the divs
    $('div').removeClass("Player");
    $('div').removeClass("Enemy");
    $('div').removeClass("Coin");

    this.$score.text(`${this.score}`);

    // if(this.$autoRotateToggle.attr('selected')) {
    //   Util.centerOnObj(this.$cube,this.players[0]);
    // }

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

  //levels are objects with a list of enemies, enemy speeds, etc.
  beginNewLevel(level) {
    this.stop();
    this.players = [];
    if(this.level % LEVELS.length == 0 && this.level != 0) {
      this.enemySpeed = this.enemySpeed*(4/5);
    }
    //first need to remove enemies and player
    this.enemies = [];
    //then add the new enemies
    level.enemies.forEach(enemy => {
      this.add(enemy);
    });
    //then reset player position and camera to center
    this.$cube.css("-webkit-transition", "all 2s ease-in-out");
    Util.turnCubeToFace(this.$cube, 'newLevelAngle');
    //disable wasd while cube rotating to new level angle
    setTimeout(()=>this.$cube.css("-webkit-transition", "all .3s ease-in-out"),2000);

    this.addPlayer();

    //spawn a coin
    this.spawnCoin();
    this.draw();
    //display some level beginning signal? then start after a certain time
    this.$level.text(`${this.level}`);
    setTimeout(this.start.bind(this),4000);
  }

  //draws, then handles collisions
  step() {
    this.draw();
    this.detectCollision(this.players[0]);
  }

  start() {

    Input.bindMoveKeys(this.players[0], this.$cube);
    this.stopStepInterval = setInterval(this.step.bind(this),50);
    this.stopEnemyMoveInterval = setInterval(this.moveEnemies.bind(this),this.enemySpeed);
  }

  stop() {
    clearInterval(this.stopStepInterval);
    clearInterval(this.stopEnemyMoveInterval);
  }


}

//First level: Two parallel enemies, same direction
let e1 = new Enemy({face: "front", pos: [0,0], direction:[0,1]});
let e2 = new Enemy({face: "front", pos: [2,0], direction:[0,1]});
//Second level: Two perpendicular enemies, one across, one top/bottom
let e3 = new Enemy({face: "left", pos: [0,1], direction:[0,1]});
let e4 = new Enemy({face: "top", pos: [1,1], direction:[1,0]});

//Third level, enemies wrapping all three directions on cube
let e5 = new Enemy({face: "left", pos: [1,0], direction:[0,1]});
let e6 = new Enemy({face: "bottom", pos: [0,1], direction:[1,0]});
let e7 = new Enemy({face: "left", pos: [0,2], direction:[1,0]});

//fourth level: enemies form walls in pairs
let e8 = new Enemy({face: "right", pos: [0,0], direction:[0,-1]});
let e9 = new Enemy({face: "right", pos: [2,0], direction:[0,-1]});
let e10 = new Enemy({face: "left", pos: [0,2], direction:[0,1]});
let e11 = new Enemy({face: "left", pos: [0,1], direction:[0,1]});

//fifth level: three diamonds
let e12 = new Enemy({face: "left", pos: [0,1], direction:[0,1]});
let e13 = new Enemy({face: "left", pos: [1,0], direction:[0,1]});
let e14 = new Enemy({face: "left", pos: [1,2], direction:[0,1]});
let e15 = new Enemy({face: "left", pos: [2,1], direction:[0,1]});
let e16 = new Enemy({face: "right", pos: [0,1], direction:[0,1]});
let e17 = new Enemy({face: "right", pos: [1,0], direction:[0,1]});
let e18 = new Enemy({face: "right", pos: [1,2], direction:[0,1]});
let e19 = new Enemy({face: "right", pos: [2,1], direction:[0,1]});
let e20 = new Enemy({face: "top", pos: [0,1], direction:[0,-1]});
let e21 = new Enemy({face: "top", pos: [1,0], direction:[0,-1]});
let e22 = new Enemy({face: "top", pos: [1,2], direction:[0,-1]});
let e23 = new Enemy({face: "top", pos: [2,1], direction:[0,-1]});

//6th: random 2 enemies on all faces except front
let e24 = new Enemy({face: "left", pos: [1,2], direction:[0,-1]});
let e25 = new Enemy({face: "left", pos: [0,2], direction:[2,1]});
let e26 = new Enemy({face: "right", pos: [1,2], direction:[1,1]});
let e27 = new Enemy({face: "right", pos: [1,0], direction:[0,-1]});
let e28 = new Enemy({face: "top", pos: [1,0], direction:[0,-1]});
let e29 = new Enemy({face: "top", pos: [1,1], direction:[-1,0]});
let e30 = new Enemy({face: "bottom", pos: [0,1], direction:[0,-1]});
let e31 = new Enemy({face: "bottom", pos: [2,1], direction:[0,-1]});
let e32 = new Enemy({face: "back", pos: [2,0], direction:[1,0]});
let e33 = new Enemy({face: "back", pos: [2,1], direction:[0,-1]});


const LEVELS = [
  {enemies: [e1,e2]},
  {enemies: [e3,e4]},
  {enemies: [e5,e6,e7]},
  {enemies: [e8,e9,e10,e11]},
  {enemies: [e12,e13,e14,e15,e16,e17,e18,e19,e20,e21,e22,e23]},
  {enemies: [e24,e25,e26,e27,e28,e29,e30,e31,e32,e33]},

];



module.exports = Game;
