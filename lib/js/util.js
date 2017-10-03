const Util = {

  div(face, pos) {
    const outerDivClass = face;
    return $(`.${outerDivClass} .${"inner-" + pos[0] + "-" + pos[1]}`);
  },

  addPos(pos1, pos2) {
    return [pos1[0]+pos2[0], pos1[1]+pos2[1]];
  }

};

module.exports = Util;
