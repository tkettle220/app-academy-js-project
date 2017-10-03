const Util = require ("./util");

class Player {
  constructor(options) {
    this.pos = options.pos;
  }

  //find the div corresponding to the pos and give it class player
  draw() {
    debugger
    const cell = Util.div(this.pos);
    cell.attr("id","player")
  }

}

module.exports = Player;
