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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Input = __webpack_require__(1);
var Game = __webpack_require__(2);
document.addEventListener("DOMContentLoaded", function () {
  var cube = $('.cube');
  Input.bindCubeKeys(cube);
  var game = new Game();
  var player = game.players[0];
  Input.bindMoveKeys(player);
  setInterval(game.draw.bind(game), 50);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
  }, {
    key: 'bindMoveKeys',
    value: function bindMoveKeys(player) {
      key("left", function () {
        player.move([0, -1]);
      });
      key("right", function () {
        player.move([0, 1]);
      });
      key("up", function () {
        player.move([-1, 0]);
      });
      key("down", function () {
        player.move([1, 0]);
      });
    }
  }]);

  return Input;
}();

module.exports = Input;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = __webpack_require__(3);
var Enemy = __webpack_require__(5);
var Coin = __webpack_require__(6);

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.players = [];
    this.enemies = [];
    this.coins = [];

    this.addPlayer();
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
        this.add(new Coin({ pos: coinPositions[i] }));
      }
    }
  }, {
    key: 'addEnemies',
    value: function addEnemies(enemyPositions) {
      for (var i = 0; i < enemyPositions.length; i++) {
        this.add(new Enemy({ pos: enemyPositions[i] }));
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
    value: function detectCollision() {}

    //iterates through all objects and gives the divs at the corresponding positions classes

  }, {
    key: 'draw',
    value: function draw() {
      //remove all obj classes from the divs
      $('div').removeClass("player");
      //add classes to the relevant divs
      this.allObjects().forEach(function (object) {
        object.draw();
      });
    }

    //iterates through each object and updates its position

  }, {
    key: 'move',
    value: function move() {}

    //moves each object, handles collisions, and then draws

  }, {
    key: 'step',
    value: function step() {}
  }]);

  return Game;
}();

module.exports = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingObject = __webpack_require__(7);

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

  //Basically just a mod 3 funtion
  wrap: function wrap(num) {
    return (num + 3) % 3;
  }
};

module.exports = Util;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingObject = __webpack_require__(7);

var Enemy = function (_MovingObject) {
  _inherits(Enemy, _MovingObject);

  function Enemy(options) {
    _classCallCheck(this, Enemy);

    return _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, options));
  }

  return Enemy;
}(MovingObject);

module.exports = Enemy;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Coin = function Coin() {
  _classCallCheck(this, Coin);
};

module.exports = Coin;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = __webpack_require__(4);
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
      if (this.constructor.name == "Player") {
        cell.addClass("player");
      } else {
        cell.addClass("enemy");
      }
    }
  }, {
    key: "move",
    value: function move(direction) {
      var newPos = Util.addPos(this.pos, direction);
      var oldFace = this.face;
      //if newPos contains a -1 or a 3, we need to mod 3 and change faces
      //javascript modulo with negatives is stupid so I just manually do negatives and assume users can't mash the keys so fast the position is less than -3 in one frame
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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map