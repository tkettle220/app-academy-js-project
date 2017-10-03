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
}

module.exports = Input;
