const Util = require ("./util");
const Player = require ('./player');


class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.face = options.face;
  }

  //find the div corresponding to the pos and give it class player
  draw() {
    const cell = Util.div(this.face, this.pos);
    if (this.constructor.name == "Player") {
      cell.addClass("player");
    }
    else {
      cell.addClass("enemy");
    }
  }

  move(direction) {
    this.pos = Util.addPos(this.pos, direction);
  }



}

module.exports = MovingObject;
