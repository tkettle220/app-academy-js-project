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


document.addEventListener("DOMContentLoaded", function () {

  var cube = $('.cube');
  window.cube = cube;

  cube.data('h-rot', 32);
  cube.data('v-rot', -30);

  key("w", function () {
    //Stop early if the bottom face is already shown
    if (cube.data('v-rot') === -65) {
      return;
    }
    var hdeg = cube.data('h-rot');
    var vdeg = cube.data('v-rot') + 10;

    cube.css("-webkit-transform", "rotateX(" + vdeg + "deg) rotateY(" + hdeg + "deg)");

    cube.data('v-rot', vdeg);
  });

  key("a", function () {
    var hdeg = cube.data('h-rot') - 10;
    var vdeg = cube.data('v-rot');

    cube.css("-webkit-transform", "rotateX(" + vdeg + "deg) rotateY(" + hdeg + "deg)");

    cube.data('h-rot', hdeg);
  });

  key("d", function () {
    var hdeg = cube.data('h-rot') + 10;
    var vdeg = cube.data('v-rot');

    cube.css("-webkit-transform", "rotateX(" + vdeg + "deg) rotateY(" + hdeg + "deg)");

    cube.data('h-rot', hdeg);
  });

  key("s", function () {
    //Stop early if the top face is already shown

    if (cube.data('v-rot') === -155) {
      return;
    }

    var hdeg = cube.data('h-rot');
    var vdeg = cube.data('v-rot') - 10;

    cube.css("-webkit-transform", "rotateX(" + vdeg + "deg) rotateY(" + hdeg + "deg)");

    cube.data('v-rot', vdeg);
  });
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map