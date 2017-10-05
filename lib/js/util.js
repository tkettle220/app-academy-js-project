const Util = {

  div(face, pos) {
    const outerDivClass = face;
    return $(`.${outerDivClass} .${"inner-" + pos[0] + "-" + pos[1]}`);
  },

  addPos(pos1, pos2) {
    return [pos1[0]+pos2[0], pos1[1]+pos2[1]];
  },

  //holds rules for converting position based on face
  newFacePos(oldFace, pos) {
    let row = pos[0];
    let col = pos[1];
    switch (oldFace) {
      case "front":
        return pos.map(co=> Util.wrap(co) );
      case "left":
        if(col < 0 || col > 2) {
          return [row, Util.wrap(col)];
        } else if (row < 0) {
          return [col, 0];
        } else if (row > 2) {
          return [-col + 2, 0]
        }
        else {
          return pos;
        }
      case "right":
        if(col < 0 || col > 2) {
          return [row, Util.wrap(col)];
        } else if (row < 0) {
          return [-col + 2, 2]
        } else if (row > 2) {
          return [col, 2]
        }
        else {
          return pos;
        }
      case "back":
        if(col < 0 || col > 2) {
          return [row, Util.wrap(col)];
        } else if (row < 0) {
          return [0, -col + 2]
        } else if (row > 2) {
          return [2, -col + 2]
        }
        else {
          return pos;
        }
      case "top":
        if(col < 0) {
          return [0, row];
        } else if (col > 2) {
          return [0, -row +2]
        }
        else if (row < 0) {
          return [0, -col + 2]
        } else if (row > 2) {
          return [0, col]
        }
        else {
          return pos;
        }
      case "bottom":
        if(col < 0) {
          return [2, -row +2];
        } else if (col > 2) {
          return [2, row]
        }
        else if (row < 0) {
          return [2, col]
        } else if (row > 2) {
          return [2, -col + 2]
        }
        else {
          return pos;
        }
      default:
        throw "invalid face";

    }
  },
  //Just a simplified mod 3 funtion that handles negatives until -6
  wrap(num) {
    return (num + 6) % 3;
  },
  //Handles wrapping for rotation (just mod by 360, div 90)
  getFace(hRot) {
    return Math.floor((((hRot % 360) + 360) % 360)/90);
  },

  pickRand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  //gen purpose mod
  mod(num, base) {
    return ((num % base) + base) % base;
  },

  inSamePos(obj1, obj2) {
    if(obj1.face == obj2.face && obj1.pos[0] == obj2.pos[0] && obj1.pos[1] == obj2.pos[1]) {
      return true;
    } else {
      return false;
    }
  },

  turnCubeToFace(cube,face) {
    //to prevent a ton of wrapping, we want to get the cube's current rotation and not rotate more than 360
    //take the cube's rotation mod 360, get the difference between that and the desired angle, and add that to the cube's actual rotation
    const hRot = cube.data('h-rot');
    const modRot = Util.mod(hRot,360);
    let rotDiff = 0;
    let vAngle = 0
    switch (face) {
      case "front":
        rotDiff = modRot - 0;
        break;
      case "back":
        rotDiff = modRot - 180;
        break;
      case "left":
        rotDiff = modRot - 90;
        break;
      case "right":
        rotDiff = modRot + 90;
        break;
        case "top":
          vAngle = -45;
        break;
      case "bottom":
          vAngle = 45;
        break;
      case 'startAngle':
        rotDiff = modRot - 45;
        break;
      case 'newLevelAngle':
        rotDiff = modRot - 45;
        vAngle = -45;
        break;
      default:
        throw "invalid face";
    }

    const newAngle = hRot - rotDiff;
    Util.turnCubeToAngle(cube, newAngle, vAngle);
  },

  turnCubeToAngle(cube, hRot, vRot){
    cube.data('h-rot', hRot);
    cube.data('v-rot', vRot);
    cube.css("-webkit-transform", "rotateX("+vRot+"deg) rotateY("+hRot+"deg)")
  }

};

module.exports = Util;
