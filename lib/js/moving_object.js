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
    let newPos = Util.addPos(this.pos, direction);
    let oldFace = this.face;
    //if newPos contains a -1 or a 3, we need to change faces
    //i use less than and greater than to catch -2 or 4 etc. We'll only have the player move once though.
    if(newPos[0] < 0) {
      this.face = FACE_RELATIONS[this.face]["up"];
    }
    if(newPos[0] > 2) {
      this.face = FACE_RELATIONS[this.face]["down"];
    }
    if(newPos[1] < 0) {
      this.face = FACE_RELATIONS[this.face]["left"];
    }
    if(newPos[1] > 2) {
      this.face = FACE_RELATIONS[this.face]["right"];
    }

    newPos = Util.newFacePos(oldFace, newPos);


    this.pos = newPos;
  }



}

const FACE_RELATIONS = {
  "front": {
    "left": "left",
    "right": "right",
    "up": "top",
    "down": "bottom"
  },

  "back":  {
    "left": "right",
    "right": "left",
    "up": "top",
    "down": "bottom"
  },

  "left":  {
    "left": "back",
    "right": "front",
    "up": "top",
    "down": "bottom"
  },

  "right":  {
    "left": "front",
    "right": "back",
    "up": "top",
    "down": "bottom"
  },

  "top":  {
    "left": "left",
    "right": "right",
    "up": "back",
    "down": "front"
  },

  "bottom":  {
    "left": "left",
    "right": "right",
    "up": "front",
    "down": "back"
  }
};


module.exports = MovingObject;
