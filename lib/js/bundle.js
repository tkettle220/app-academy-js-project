/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Util = {
  div: function div(face, pos) {
    var outerDivClass = face;
    return $("." + outerDivClass + " ." + ("inner-" + pos[0] + "-" + pos[1]));
  },
  addPos: function addPos(pos1, pos2) {
    return [pos1[0] + pos2[0], pos1[1] + pos2[1]];
  },


  //holds rules for converting position based on face
  newFacePos: function newFacePos(oldFace, pos) {
    var row = pos[0];
    var col = pos[1];
    switch (oldFace) {
      case "front":
        return pos.map(function (co) {
          return Util.wrap(co);
        });
      case "left":
        if (col < 0 || col > 2) {
          return [row, Util.wrap(col)];
        } else if (row < 0) {
          return [col, 0];
        } else if (row > 2) {
          return [-col + 2, 0];
        } else {
          return pos;
        }
      case "right":
        if (col < 0 || col > 2) {
          return [row, Util.wrap(col)];
        } else if (row < 0) {
          return [-col + 2, 2];
        } else if (row > 2) {
          return [col, 2];
        } else {
          return pos;
        }
      case "back":
        if (col < 0 || col > 2) {
          return [row, Util.wrap(col)];
        } else if (row < 0) {
          return [0, -col + 2];
        } else if (row > 2) {
          return [2, -col + 2];
        } else {
          return pos;
        }
      case "top":
        if (col < 0) {
          return [0, row];
        } else if (col > 2) {
          return [0, -row + 2];
        } else if (row < 0) {
          return [0, -col + 2];
        } else if (row > 2) {
          return [0, col];
        } else {
          return pos;
        }
      case "bottom":
        if (col < 0) {
          return [2, -row + 2];
        } else if (col > 2) {
          return [2, row];
        } else if (row < 0) {
          return [2, col];
        } else if (row > 2) {
          return [2, -col + 2];
        } else {
          return pos;
        }
      default:
        throw "invalid face";

    }
  },

  //Just a simplified mod 3 funtion that handles negatives until -6
  wrap: function wrap(num) {
    return (num + 6) % 3;
  },

  //Handles wrapping for rotation (just mod by 360, div 90)
  getFace: function getFace(hRot) {
    return Math.floor((hRot % 360 + 360) % 360 / 90);
  },
  pickRand: function pickRand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },


  //gen purpose mod
  mod: function mod(num, base) {
    return (num % base + base) % base;
  },
  inSamePos: function inSamePos(obj1, obj2) {
    if (obj1.face == obj2.face && obj1.pos[0] == obj2.pos[0] && obj1.pos[1] == obj2.pos[1]) {
      return true;
    } else {
      return false;
    }
  },
  turnCubeToFace: function turnCubeToFace(cube, face) {
    //to prevent a ton of wrapping, we want to get the cube's current rotation and not rotate more than 360
    //take the cube's rotation mod 360, get the difference between that and the desired angle, and add that to the cube's actual rotation

    var hRot = cube.data('h-rot');
    var modRot = hRot % 360;
    var rotDiff = 0;
    var vAngle = 0;
    switch (face) {
      case "front":
        rotDiff = modRot - 0;
        break;
      case "back":
        rotDiff = modRot - 180;
        break;
      case "left":
        rotDiff = modRot - 90;
        break;
      case "right":
        rotDiff = modRot + 90;
        break;
      case "top":
        vAngle = -45;
        break;
      case "bottom":
        vAngle = 45;
        break;
      case 'startAngle':
        rotDiff = modRot - 45;
        break;
      case 'newLevelAngle':
        rotDiff = modRot - 45;
        vAngle = -45;
        break;
      default:
        throw "invalid face";
    }

    var newAngle = hRot - rotDiff;
    Util.turnCubeToAngle(cube, newAngle, vAngle);
  },
  turnCubeToAngle: function turnCubeToAngle(cube, hRot, vRot) {
    cube.data('h-rot', hRot);
    cube.data('v-rot', vRot);
    cube.css("-webkit-transform", "rotateX(" + vRot + "deg) rotateY(" + hRot + "deg)");
  },
  rotateCube: function rotateCube(cube, hRot, vRot) {
    var oldhRot = cube.data('h-rot');
    var oldvRot = cube.data('v-rot');

    var newhRot = oldhRot + hRot;
    var newvRot = oldvRot + vRot;

    cube.data('h-rot', newhRot);
    cube.data('v-rot', newvRot);
    cube.css("-webkit-transform", "rotateX(" + newvRot + "deg) rotateY(" + newhRot + "deg)");
  },
  centerOnObj: function centerOnObj(cube, obj) {
    var objPos = obj.pos;
    Util.turnCubeToFace(cube, obj.face);
    //do top and bottom differently
    if (obj.face == 'top' || obj.face == 'bottom') {
      return;
    }

    var rotationAmount = cellRotations[objPos[0]][objPos[1]];
    setTimeout(function () {
      return Util.rotateCube(cube, rotationAmount[0], rotationAmount[1]);
    });
  }
};

var cellRotations = [[[45, -45], [0, -45], [-45, -45]], [[45, 0], [0, 0], [-45, 0]], [[45, 45], [0, 45], [-45, 45]]];

module.exports = Util;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = __webpack_require__(0);
var Player = __webpack_require__(3);

var MovingObject = function () {
  function MovingObject(options) {
    _classCallCheck(this, MovingObject);

    this.pos = options.pos;
    this.face = options.face;
  }

  //find the div corresponding to the pos and give it class player


  _createClass(MovingObject, [{
    key: "draw",
    value: function draw() {
      var cell = Util.div(this.face, this.pos);
      cell.addClass(this.constructor.name);
    }
  }, {
    key: "move",
    value: function move(direction) {
      var oldPos = this.pos;
      var newPos = Util.addPos(this.pos, direction);
      var oldFace = this.face;

      //if newPos contains a -1 or a 3, we need to change faces
      //i use less than and greater than to catch -2 or 4 etc. We'll only have the player move once though.
      if (newPos[0] < 0) {
        this.face = FACE_RELATIONS[this.face]["up"];
      }
      if (newPos[0] > 2) {
        this.face = FACE_RELATIONS[this.face]["down"];
      }
      if (newPos[1] < 0) {
        this.face = FACE_RELATIONS[this.face]["left"];
      }
      if (newPos[1] > 2) {
        this.face = FACE_RELATIONS[this.face]["right"];
      }

      newPos = Util.newFacePos(oldFace, newPos);
      var newFace = this.face;
      //if this is an enemy, we need to change its velocity so it wraps properly
      if (this.constructor.name == "Enemy" && oldFace != newFace) {
        //if leaving or entering a top or bottom face, we need to change vel
        var rowVel = this.direction[0];
        var colVel = this.direction[1];
        if (oldFace == "top") {
          this.direction = [1, 0];
        } else if (oldFace == "bottom") {
          this.direction = [-1, 0];
        } else if (newFace == "top") {
          switch (oldFace) {
            case "front":
              this.direction = [-1, 0];
              break;
            case "left":
              this.direction = [0, 1];
              break;
            case "right":
              this.direction = [0, -1];
              break;
            case "back":
              this.direction = [1, 0];
              break;
            default:
              throw "invalid face";
          }
        } else if (newFace == "bottom") {
          switch (oldFace) {
            case "front":
              this.direction = [1, 0];
              break;
            case "left":
              this.direction = [0, 1];
              break;
            case "right":
              this.direction = [0, -1];
              break;
            case "back":
              this.direction = [-1, 0];
              break;
            default:
              throw "invalid face";
          }
        }
      }

      this.pos = newPos;
    }
  }]);

  return MovingObject;
}();

var FACE_RELATIONS = {
  "front": {
    "left": "left",
    "right": "right",
    "up": "top",
    "down": "bottom"
  },

  "back": {
    "left": "right",
    "right": "left",
    "up": "top",
    "down": "bottom"
  },

  "left": {
    "left": "back",
    "right": "front",
    "up": "top",
    "down": "bottom"
  },

  "right": {
    "left": "front",
    "right": "back",
    "up": "top",
    "down": "bottom"
  },

  "top": {
    "left": "left",
    "right": "right",
    "up": "back",
    "down": "front"
  },

  "bottom": {
    "left": "left",
    "right": "right",
    "up": "front",
    "down": "back"
  }
};

module.exports = MovingObject;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = __webpack_require__(0);

var Input = function () {
  function Input() {
    _classCallCheck(this, Input);
  }

  _createClass(Input, null, [{
    key: 'bindCubeKeys',
    value: function bindCubeKeys(cube) {

      cube.data('h-rot', 45);
      cube.data('v-rot', 0);

      key("w", function () {
        //Stop early if the bottom face is already shown
        if (cube.data('v-rot') === 45) {
          return;
        }
        var hdeg = cube.data('h-rot');
        var vdeg = cube.data('v-rot') + 45;

        cube.css("-webkit-transform", "rotateX(" + vdeg + "deg) rotateY(" + hdeg + "deg)");

        cube.data('v-rot', vdeg);
      });

      key("a", function () {
        var hdeg = cube.data('h-rot') - 45;
        var vdeg = cube.data('v-rot');

        cube.css("-webkit-transform", "rotateX(" + vdeg + "deg) rotateY(" + hdeg + "deg)");

        cube.data('h-rot', hdeg);
      });

      key("d", function () {
        var hdeg = cube.data('h-rot') + 45;
        var vdeg = cube.data('v-rot');

        cube.css("-webkit-transform", "rotateX(" + vdeg + "deg) rotateY(" + hdeg + "deg)");

        cube.data('h-rot', hdeg);
      });

      key("s", function () {
        //Stop early if the top face is already shown

        if (cube.data('v-rot') === -45) {
          return;
        }

        var hdeg = cube.data('h-rot');
        var vdeg = cube.data('v-rot') - 45;

        cube.css("-webkit-transform", "rotateX(" + vdeg + "deg) rotateY(" + hdeg + "deg)");

        cube.data('v-rot', vdeg);
      });
    }

    //I want to change this to change keys according to rotation of the cube
    //code is tricky to read, but basically DIRECTION_ROTATIONS is an array of move directions that is in an order corresponding to the order I would rotate the directions depending on what face I'm on.  Thus I can just set keys inputs based on getting the index in the array of directions offset by the face I'm on.  For bottom, this face offset will just go through the array backwards, so I do -face.  For ex: if I have rotated once to the right face, the face offset will be 3.  Right arrow will correspond to whatever direction is 3 in front of it in the array, which is the starting up direction.

  }, {
    key: 'bindMoveKeys',
    value: function bindMoveKeys(player, cube) {

      key("space", function () {
        //Stop early if the bottom face is already shown
        Util.turnCubeToFace(cube, player.face);
      });

      key("left", function () {
        if (["top", "bottom"].includes(player.face)) {
          var face = Util.getFace(cube.data('h-rot'));
          if (player.face == "bottom") {
            face = -face;
          }
          player.move(DIRECTION_ROTATIONS[Util.mod(face + 3, 4)]);
        } else {
          player.move([0, -1]);
        }
      });

      key("right", function () {
        if (["top", "bottom"].includes(player.face)) {
          var face = Util.getFace(cube.data('h-rot'));
          if (player.face == "bottom") {
            face = -face;
          }
          player.move(DIRECTION_ROTATIONS[Util.mod(face + 1, 4)]);
        } else {
          player.move([0, 1]);
        }
      });

      key("up", function () {
        if (["top", "bottom"].includes(player.face)) {
          var face = Util.getFace(cube.data('h-rot'));
          if (player.face == "bottom") {
            face = -face;
          }
          player.move(DIRECTION_ROTATIONS[Util.mod(face, 4)]);
        } else {
          player.move([-1, 0]);
        }
      });

      key("down", function () {
        if (["top", "bottom"].includes(player.face)) {
          var face = Util.getFace(cube.data('h-rot'));
          if (player.face == "bottom") {
            face = -face;
          }
          player.move(DIRECTION_ROTATIONS[Util.mod(face + 2, 4)]);
        } else {
          player.move([1, 0]);
        }
      });
    }
  }]);

  return Input;
}();

//up, right, down, left


var DIRECTION_ROTATIONS = [[-1, 0], [0, 1], [1, 0], [0, -1]];

module.exports = Input;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingObject = __webpack_require__(1);

var Player = function (_MovingObject) {
  _inherits(Player, _MovingObject);

  function Player(options) {
    _classCallCheck(this, Player);

    return _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, options));
  }

  return Player;
}(MovingObject);

module.exports = Player;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Input = __webpack_require__(2);
var Game = __webpack_require__(5);
var Util = __webpack_require__(0);

document.addEventListener("DOMContentLoaded", function () {
  var $cube = $('.cube');
  var $score = $("#score");
  var $level = $("#level");
  Input.bindCubeKeys($cube);

  var $playButton = $('[name="play-button"]');
  var $newGameButton = $('[name="new-game-button"]');
  var $gridLineToggle = $('[name="gridlines-button"]');
  var $autoRotateToggle = $('[name="auto-rotate-button"]');

  var game = new Game({ $cube: $cube, $score: $score, $newGameButton: $newGameButton, $level: $level, $autoRotateToggle: $autoRotateToggle });
  game.draw();

  $playButton.on("click", function (event) {
    $playButton.css({ display: "none" });
    game.start();
  });

  $newGameButton.on("click", function (event) {
    //stop old game
    game.stop();
    $newGameButton.css({ display: "none" });

    //create a new game, draw it, and start it
    game = new Game({ $cube: $cube, $score: $score, $newGameButton: $newGameButton, $level: $level, $autoRotateToggle: $autoRotateToggle });
    $level.text("0");

    Util.turnCubeToFace($cube, 'startAngle');
    //
    // $cube.data('h-rot', 45);
    // $cube.data('v-rot', 0);
    // $cube.css("-webkit-transform", "rotateX(0deg) rotateY(45deg)");

    game.draw();
    setTimeout(game.start.bind(game), 2000);
  });

  //button to do gridlines
  var $cells = $('.side div div');
  $gridLineToggle.on("click", function (event) {
    if (event.currentTarget.getAttribute('selected')) {
      event.currentTarget.removeAttribute('selected');
      $cells.css('border', "none");
    } else {
      event.currentTarget.setAttribute('selected', 'selected');
      $cells.css('border', "1px solid black");
    }
  });

  $autoRotateToggle.on("click", function (event) {
    if (event.currentTarget.getAttribute('selected')) {
      event.currentTarget.removeAttribute('selected');
    } else {
      event.currentTarget.setAttribute('selected', 'selected');
    }
  });

  //button for AutoRotate

});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = __webpack_require__(3);
var Enemy = __webpack_require__(6);
var Coin = __webpack_require__(7);
var Util = __webpack_require__(0);
var Input = __webpack_require__(2);

var Game = function () {
  function Game(options) {
    _classCallCheck(this, Game);

    this.$cube = options.$cube;
    this.players = [];
    this.enemies = [];
    this.coins = [];
    this.score = 0;
    this.level = 0;

    this.$score = options.$score;
    this.$newGameButton = options.$newGameButton;
    this.$level = options.$level;
    this.$autoRotateToggle = options.$autoRotateToggle;

    this.enemySpeed = 500;

    this.stopStepInterval = null;
    this.stopEnemyMoveInterval = null;

    this.addPlayer();
    this.addEnemies([["front", [0, 0], [0, 1]], ["front", [2, 0], [0, 1]]]);
    this.addCoins([["front", [0, 2]]]);
  }

  _createClass(Game, [{
    key: 'add',
    value: function add(object) {
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
  }, {
    key: 'addCoins',
    value: function addCoins(coinPositions) {
      for (var i = 0; i < coinPositions.length; i++) {
        this.add(new Coin({ face: coinPositions[i][0], pos: coinPositions[i][1] }));
      }
    }

    //remove any coins at the player's position

  }, {
    key: 'removeCoin',
    value: function removeCoin(coin) {
      this.coins.splice(this.coins.indexOf(coin), 1);
    }
  }, {
    key: 'removeObject',
    value: function removeObject(obj) {
      if (object instanceof Player) {
        this.players.splice(this.players.indexOf(obj), 1);
      } else if (object instanceof Enemy) {
        this.enemies.splice(this.enemies.indexOf(obj), 1);
      } else if (object instanceof Coin) {
        this.coins.splice(this.coins.indexOf(obj), 1);
      } else {
        throw "unknown type of object";
      }
    }
  }, {
    key: 'spawnCoin',
    value: function spawnCoin() {
      var randFace = Util.pickRand(["top", "bottom", "front", "back", "left", "right"]);
      var randRow = Util.pickRand([0, 1, 2]);
      var randCol = Util.pickRand([0, 1, 2]);
      var newCoin = new Coin({ face: randFace, pos: [randRow, randCol] });
      //dont let coin spawn on top of player
      if (Util.inSamePos(this.players[0], newCoin)) {
        this.spawnCoin();
        return;
      }

      this.add(newCoin);
    }
  }, {
    key: 'addEnemies',
    value: function addEnemies(enemyPositions) {
      for (var i = 0; i < enemyPositions.length; i++) {
        this.add(new Enemy({ face: enemyPositions[i][0], pos: enemyPositions[i][1], direction: enemyPositions[i][2] }));
      }
    }
  }, {
    key: 'addPlayer',
    value: function addPlayer() {
      var player = new Player({
        face: "front",
        pos: [1, 1]
      });

      this.add(player);

      return player;
    }
  }, {
    key: 'allObjects',
    value: function allObjects() {
      return [].concat(this.players, this.enemies, this.coins);
    }

    //looks at all coins and enemies and checks their position against the player's position

  }, {
    key: 'detectCollision',
    value: function detectCollision(player) {
      var _this = this;

      this.enemies.forEach(function (enemy) {
        if (Util.inSamePos(enemy, player)) {
          _this.stop();
          Util.turnCubeToFace(_this.$cube, _this.players[0].face);
          _this.draw();
          _this.$newGameButton.css({ display: "block" });
        }
      });

      this.coins.forEach(function (coin) {
        if (Util.inSamePos(coin, player)) {
          _this.removeCoin(coin);
          _this.score += 1;
          //only spawn coin if score is not a multiple of 10
          if (_this.score % 2 == 0) {
            _this.level += 1;
            if (_this.level > LEVELS.length) {
              console.log("You win!");
            } else {
              _this.beginNewLevel(LEVELS[_this.level]);
            }
          } else {
            _this.spawnCoin();
          }
        }
      });
    }

    //iterates through all objects and gives the divs at the corresponding positions classes

  }, {
    key: 'draw',
    value: function draw() {
      //remove all obj classes from the divs
      $('div').removeClass("Player");
      $('div').removeClass("Enemy");
      $('div').removeClass("Coin");

      this.$score.text('' + this.score);

      if (this.$autoRotateToggle.attr('selected')) {
        Util.centerOnObj(this.$cube, this.players[0]);
      }

      //add classes to the relevant divs
      this.allObjects().forEach(function (object) {
        object.draw();
      });
    }

    //iterates through enemies and updates its position

  }, {
    key: 'moveEnemies',
    value: function moveEnemies() {
      this.enemies.forEach(function (enemy) {
        enemy.move(enemy.direction);
      });
    }

    //levels are objects with a list of enemies, enemy speeds, etc.

  }, {
    key: 'beginNewLevel',
    value: function beginNewLevel(level) {
      var _this2 = this;

      this.stop();
      //first need to remove enemies and player
      this.enemies = [];
      //display some next level message

      //remove player
      this.players = [];
      //then add the new enemies
      level.enemies.forEach(function (enemy) {
        _this2.add(enemy);
      });
      //then reset player position and camera to center
      this.$cube.css("-webkit-transition", "all 2s ease-in-out");
      Util.turnCubeToFace(this.$cube, 'newLevelAngle');
      setTimeout(function () {
        return _this2.$cube.css("-webkit-transition", "all .3s ease-in-out");
      }, 2000);

      var player = this.addPlayer();

      //spawn a coin
      this.spawnCoin();
      this.draw();
      //display some level beginning signal? then start after a certain time
      this.$level.text('' + this.level);
      setTimeout(this.start.bind(this), 4000);
    }

    //draws, then handles collisions

  }, {
    key: 'step',
    value: function step() {
      this.draw();
      this.detectCollision(this.players[0]);
    }
  }, {
    key: 'start',
    value: function start() {
      Input.bindMoveKeys(this.players[0], this.$cube);
      this.stopStepInterval = setInterval(this.step.bind(this), 50);
      this.stopEnemyMoveInterval = setInterval(this.moveEnemies.bind(this), this.enemySpeed);
    }
  }, {
    key: 'stop',
    value: function stop() {
      clearInterval(this.stopStepInterval);
      clearInterval(this.stopEnemyMoveInterval);
    }
  }]);

  return Game;
}();

var e1 = new Enemy({ face: "left", pos: [1, 1], direction: [0, 1] });
var e2 = new Enemy({ face: "top", pos: [1, 1], direction: [1, 0] });
var e3 = new Enemy({ face: "front", pos: [0, 1], direction: [0, 1] });
var e4 = new Enemy({ face: "front", pos: [0, 1], direction: [0, 1] });
var e5 = new Enemy({ face: "front", pos: [0, 1], direction: [0, 1] });
var e6 = new Enemy({ face: "front", pos: [0, 1], direction: [0, 1] });

//first level is actually a dummy level, since we initialize with a set level to make sure the coin is visible for an easy first level
var LEVELS = [{ enemies: [] }, { enemies: [e1, e2] }, { enemies: [e3, e4] }, { enemies: [e5, e6] }];

module.exports = Game;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingObject = __webpack_require__(1);
var Util = __webpack_require__(0);

var Enemy = function (_MovingObject) {
  _inherits(Enemy, _MovingObject);

  function Enemy(options) {
    _classCallCheck(this, Enemy);

    var _this = _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, options));

    _this.direction = options.direction || [-1, 0];
    return _this;
  }

  return Enemy;
}(MovingObject);

module.exports = Enemy;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingObject = __webpack_require__(1);

var Coin = function (_MovingObject) {
  _inherits(Coin, _MovingObject);

  function Coin(options) {
    _classCallCheck(this, Coin);

    return _possibleConstructorReturn(this, (Coin.__proto__ || Object.getPrototypeOf(Coin)).call(this, options));
  }

  return Coin;
}(MovingObject);

module.exports = Coin;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map