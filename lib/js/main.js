document.addEventListener("DOMContentLoaded", () => {

  const cube = $('.cube');
  const left = $('.left');
  const right = $('.right');
  const up = $('.up');
  const down = $('.down');
  window.cube = cube;

  cube.data('h-rot', -20);
  cube.data('v-rot', -110);

  left.click(function(){
    var hdeg = cube.data('h-rot') - 5;
    var vdeg = cube.data('v-rot');

    cube.css("-webkit-transform", "rotateX("+vdeg+"deg) rotateZ("+hdeg+"deg)");

    cube.data('h-rot', hdeg);
  });


  right.click(function(){
    var hdeg = cube.data('h-rot') + 5;
    var vdeg = cube.data('v-rot');

    cube.css("-webkit-transform", "rotateX("+vdeg+"deg) rotateZ("+hdeg+"deg)");

    cube.data('h-rot', hdeg);
  });

  up.click(function(){
    //Stop early if the bottom face is already shown
    if(cube.data('v-rot') === -65) {
      return;
    }
    var hdeg = cube.data('h-rot');
    var vdeg = cube.data('v-rot') + 5;

    cube.css("-webkit-transform", "rotateX("+vdeg+"deg) rotateZ("+hdeg+"deg)");

    cube.data('v-rot', vdeg);
  });

  down.click(function(){
    //Stop early if the top face is already shown

    if(cube.data('v-rot') === -155) {
      return;
    }

    var hdeg = cube.data('h-rot');
    var vdeg = cube.data('v-rot') - 5;

    cube.css("-webkit-transform", "rotateX("+vdeg+"deg) rotateZ("+hdeg+"deg)");

    cube.data('v-rot', vdeg);
  });

});
