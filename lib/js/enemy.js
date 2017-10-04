const MovingObject = require("./moving_object");
const Util = require("./util");

class Enemy extends MovingObject {
  constructor(options) {
    super(options);
    this.direction = options.direction || [-1,0];
  }


}

module.exports = Enemy;
