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

  //gen purpose mod
  mod(num, base) {
    return ((num % base) + base) % base;
  }

};

module.exports = Util;
