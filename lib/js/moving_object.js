const Util = require ("./util");
const Player = require ('./player');


class MovingObject {
  constructor(options) {
    this.pos = options.pos;
  }

  //find the div corresponding to the pos and give it class player
  draw() {
    debugger
    const cell = Util.div(this.pos);
    if (this.constructor.name == "Player") {
      cell.attr("id","player");
    }
    else {
      cell.attr("id","enemy")
    }

  }

}

module.exports = MovingObject;
