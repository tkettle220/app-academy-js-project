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


var Input = __webpack_require__(2);
var Game = __webpack_require__(1);
document.addEventListener("DOMContentLoaded", function () {
  var cube = $('.cube');
  Input.bindCubeKeys(cube);
  var game = new Game();
  // Input.bindMoveKeys(game);
  game.draw();
});

/***/ }),
/* 1 */
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
        pos: [0, 2, 2]
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
/* 2 */
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
  }]);

  return Input;
}();

module.exports = Input;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = __webpack_require__(4);

var Player = function () {
  function Player(options) {
    _classCallCheck(this, Player);

    this.pos = options.pos;
  }

  //find the div corresponding to the pos and give it class player


  _createClass(Player, [{
    key: "draw",
    value: function draw() {
      debugger;
      var cell = Util.div(this.pos);
      cell.attr("id", "player");
    }
  }]);

  return Player;
}();

module.exports = Player;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Util = {
  div: function div(pos) {
    var outerDivClass = FACES[pos[0]];
    return $("." + outerDivClass + " ." + ("inner-" + pos[1] + "-" + pos[2]));
  }
};

var FACES = ["front", "back", "left", "right", "top", "bottom"];

module.exports = Util;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Enemy = function Enemy() {
  _classCallCheck(this, Enemy);
};

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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map