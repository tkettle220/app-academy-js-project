var cube = $(".cube"),
    left = $('.left'),
    right = $('.right');


cube.data('rot', -50);

left.click(function(){
  var deg = cube.data('rot') - 40;

  cube.css("-webkit-transform", "rotateX(-100deg) rotateZ("+deg+"deg) translateZ(-30px)");

  cube.data('rot', deg);
});


right.click(function(){
  var deg = cube.data('rot') + 40;

  cube.css("-webkit-transform", "rotateX(-100deg) rotateZ("+deg+"deg) translateZ(-30px)");

  cube.data('rot', deg);
});
