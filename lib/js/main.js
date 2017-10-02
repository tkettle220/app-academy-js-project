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
    var hdeg = cube.data('h-rot') - 90;
    var vdeg = cube.data('v-rot');

    cube.css("-webkit-transform", "rotateX("+vdeg+"deg) rotateZ("+hdeg+"deg)");

    cube.data('h-rot', hdeg);
  });


  right.click(function(){
    var hdeg = cube.data('h-rot') + 90;
    var vdeg = cube.data('v-rot');

    cube.css("-webkit-transform", "rotateX("+vdeg+"deg) rotateZ("+hdeg+"deg)");

    cube.data('h-rot', hdeg);
  });

  up.click(function(){
    var hdeg = cube.data('h-rot');
    var vdeg = cube.data('v-rot') + 45;

    cube.css("-webkit-transform", "rotateX("+vdeg+"deg) rotateZ("+hdeg+"deg)");

    cube.data('v-rot', vdeg);
  });

  down.click(function(){
    var hdeg = cube.data('h-rot');
    var vdeg = cube.data('v-rot') - 45;

    cube.css("-webkit-transform", "rotateX("+vdeg+"deg) rotateZ("+hdeg+"deg)");

    cube.data('v-rot', vdeg);
  });

});
