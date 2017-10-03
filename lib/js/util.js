const Util = {

  div(pos) {
    const outerDivClass = FACES[pos[0]];
    return $(`.${outerDivClass} .${"inner-" + pos[1] + "-" + pos[2]}`);
  }
};

const FACES = ["front","back","left","right","top","bottom"]

module.exports = Util;
