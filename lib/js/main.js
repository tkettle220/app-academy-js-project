

document.addEventListener("DOMContentLoaded", () => {

  const cube = $('.cube');
  window.cube = cube;

  cube.data('h-rot', -20);
  cube.data('v-rot', -110);


  key("w", function(){
    //Stop early if the bottom face is already shown
    if(cube.data('v-rot') === -65) {
      return;
    }
    var hdeg = cube.data('h-rot');
    var vdeg = cube.data('v-rot') + 10;

    cube.css("-webkit-transform", "rotateX("+vdeg+"deg) rotateZ("+hdeg+"deg)");

    cube.data('v-rot', vdeg);
  });


  key("a", function(){
    var hdeg = cube.data('h-rot') - 10;
    var vdeg = cube.data('v-rot');

    cube.css("-webkit-transform", "rotateX("+vdeg+"deg) rotateZ("+hdeg+"deg)");

    cube.data('h-rot', hdeg);
  });


  key("d", function(){
    var hdeg = cube.data('h-rot') + 10;
    var vdeg = cube.data('v-rot');

    cube.css("-webkit-transform", "rotateX("+vdeg+"deg) rotateZ("+hdeg+"deg)");

    cube.data('h-rot', hdeg);
  });


  key("s", function(){
    //Stop early if the top face is already shown

    if(cube.data('v-rot') === -155) {
      return;
    }

    var hdeg = cube.data('h-rot');
    var vdeg = cube.data('v-rot') - 10;

    cube.css("-webkit-transform", "rotateX("+vdeg+"deg) rotateZ("+hdeg+"deg)");

    cube.data('v-rot', vdeg);
  });

});
