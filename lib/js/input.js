const Util = require ("./util");

class Input {
  constructor() {

  }

  static bindCubeKeys(cube) {

    cube.data('h-rot', 45);
    cube.data('v-rot', 0);


    key("w", function(){
      //Stop early if the bottom face is already shown
      if(cube.data('v-rot') === 45) {
        return;
      }
      var hdeg = cube.data('h-rot');
      var vdeg = cube.data('v-rot') + 45;

      cube.css("-webkit-transform", "rotateX("+vdeg+"deg) rotateY("+hdeg+"deg)");

      cube.data('v-rot', vdeg);
    });


    key("a", function(){
      var hdeg = cube.data('h-rot') - 45;
      var vdeg = cube.data('v-rot');

      cube.css("-webkit-transform", "rotateX("+vdeg+"deg) rotateY("+hdeg+"deg)");

      cube.data('h-rot', hdeg);
    });


    key("d", function(){
      var hdeg = cube.data('h-rot') + 45;
      var vdeg = cube.data('v-rot');

      cube.css("-webkit-transform", "rotateX("+vdeg+"deg) rotateY("+hdeg+"deg)");

      cube.data('h-rot', hdeg);
    });


    key("s", function(){
      //Stop early if the top face is already shown

      if(cube.data('v-rot') === -45) {
        return;
      }

      var hdeg = cube.data('h-rot');
      var vdeg = cube.data('v-rot') - 45;

      cube.css("-webkit-transform", "rotateX("+vdeg+"deg) rotateY("+hdeg+"deg)");

      cube.data('v-rot', vdeg);
    });
  }

  //I want to change this to change keys according to rotation of the cube


  static bindMoveKeys(player, cube) {

    key("left", function(){
      if(player.face == "top") {
        const face = Util.getFace(cube.data('h-rot'));
        player.move(DIRECTIONS[(face + 3)%4]);
      } else {
        player.move([0,-1]);
      }

    });

    key("right", function(){
      if(player.face == "top") {
        const face = Util.getFace(cube.data('h-rot'));
        player.move(DIRECTIONS[(face + 1)%4]);
      } else {
        player.move([0,1]);
      }
    });

    key("up", function(){
      if(player.face == "top") {
        const face = Util.getFace(cube.data('h-rot'));
        player.move(DIRECTIONS[(face)%4]);
      } else {
        player.move([-1,0]);
      }
    });

    key("down", function(){
      if(player.face == "top") {
        const face = Util.getFace(cube.data('h-rot'));
        player.move(DIRECTIONS[(face + 2)%4]);
      } else {
        player.move([1,0]);
      }
    });

  }

}

//up, right, down, left
const DIRECTIONS = [[-1,0],[0,1],[1,0],[0,-1]];

module.exports = Input;
