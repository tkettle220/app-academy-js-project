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
    cell.addClass(this.constructor.name);
  }

  move(direction) {
    let oldPos = this.pos;
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
    let newFace = this.face;
    //if this is an enemy, we need to change its velocity so it wraps properly
    if(this.constructor.name == "Enemy" && oldFace != newFace) {
      //if leaving or entering a top or bottom face, we need to change vel
      let rowVel = this.direction[0];
      let colVel = this.direction[1];
      if(oldFace == "top") {
        this.direction = [1,0];
      } else if (oldFace =="bottom") {
        this.direction = [-1,0];
      }
      else if (newFace == "top") {
        switch (oldFace) {
          case "front":
            this.direction = [-1,0];
            break;
          case "left":
            this.direction = [0,1];
            break;
          case "right":
            this.direction = [0,-1];
            break;
          case "back":
            this.direction = [1,0];
            break;
          default:
            throw "invalid face";
        }
      } else if (newFace == "bottom") {
          switch (oldFace) {
            case "front":
              this.direction = [1,0];
              break;
            case "left":
              this.direction = [0,1];
              break;
            case "right":
              this.direction = [0,-1];
              break;
            case "back":
              this.direction = [-1,0];
              break;
            default:
              throw "invalid face";
          }
      }

    }

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
