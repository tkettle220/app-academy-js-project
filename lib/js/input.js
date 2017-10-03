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
      if(["top","bottom"].includes(player.face)) {
        let face = Util.getFace(cube.data('h-rot'));
        if(player.face == "bottom") {
          face = -face;
        }
        player.move(DIRECTION_ROTATIONS[Util.mod((face + 3),4)]);
      } else {
        player.move([0,-1]);
      }

    });

    key("right", function(){
      if(["top","bottom"].includes(player.face)) {
        let face = Util.getFace(cube.data('h-rot'));
        if(player.face == "bottom") {
          face = -face;
        }
        player.move(DIRECTION_ROTATIONS[Util.mod((face + 1),4)]);
      } else {
        player.move([0,1]);
      }
    });

    key("up", function(){
      if(["top","bottom"].includes(player.face)) {
        let face = Util.getFace(cube.data('h-rot'));
        if(player.face == "bottom") {
          face = -face;
        }
        player.move(DIRECTION_ROTATIONS[Util.mod((face),4)]);
      } else {
        player.move([-1,0]);
      }
    });

    key("down", function(){
      if(["top","bottom"].includes(player.face)) {
        let face = Util.getFace(cube.data('h-rot'));
        if(player.face == "bottom") {
          face = -face;
        }
        player.move(DIRECTION_ROTATIONS[Util.mod((face + 2),4)]);
      } else {
        player.move([1,0]);
      }
    });

  }

}

//up, right, down, left
const DIRECTION_ROTATIONS = [[-1,0],[0,1],[1,0],[0,-1]];



module.exports = Input;
