/**
 * Parse a single css corner radius value into a number.
 * It handles percentages by converting them to pixels based on a reference value (width or height)
 * @param {string} value - css value like "10px, 1rem, 20%"
 * @param {number} ref - width or height value dependign on the axis. Used for percentages values
 * @returns {number}
 */
function parseValue(value, ref) {
  if (value.endsWith("%")) return (parseFloat(value) / 100) * ref || 0;
  return parseFloat(value) || 0;
}

/**
 * Takes a raw css border-radius shorthand value and returns an object with the top-left, top-right, bottom-right and bottom-left values
 * @param {string} cssValue - css shorthand like "10px 20px 30px 40px"
 * @returns {{topLeft: string, topRight: string, bottomRight: string, bottomLeft: string}}
 */
function resolveShorthand(cssValue) {
  const values = cssValue.trim().split(/\s+/);
  switch (values.length) {
    case 1:
      return {
        topLeft: values[0],
        topRight: values[0],
        bottomRight: values[0],
        bottomLeft: values[0],
      };
    case 2:
      return {
        topLeft: values[0],
        topRight: values[1],
        bottomRight: values[0],
        bottomLeft: values[1],
      };
    case 3:
      return {
        topLeft: values[0],
        topRight: values[1],
        bottomRight: values[2],
        bottomLeft: values[1],
      };
    case 4:
      return {
        topLeft: values[0],
        topRight: values[1],
        bottomRight: values[2],
        bottomLeft: values[3],
      };
    default:
      return {
        topLeft: "0",
        topRight: "0",
        bottomRight: "0",
        bottomLeft: "0",
      };
  }
}

/**
 * @typedef {Object} BorderRadius
 * @prop {number} h - horizontal value
 * @prop {number} v - vertical value
 */

/**
 * @typedef {Object} Borders
 * @prop {BorderRadius} topLeft
 * @prop {BorderRadius} topRight
 * @prop {BorderRadius} bottomRight
 * @prop {BorderRadius} bottomLeft
 */

/**
 * Parse a css border-radius value and returns an object with the top-left, top-right, bottom-right and bottom-left with each a h (horizontal) and v (vertical) value
 * @param {string} cssValue - css border-radius value
 * @param {number} width - width of the rect with the given border-radius
 * @param {number} height - height of the rect with the given border-radius
 * @returns {Borders}
 */
function parseCSSBorderRadius(cssValue, width, height) {
  const [horizontal, vertical] = cssValue.split("/");
  const hValues = resolveShorthand(horizontal);
  const vValues = vertical ? resolveShorthand(vertical) : hValues;

  return {
    topLeft: {
      h: parseValue(hValues.topLeft, width),
      v: parseValue(vValues.topLeft, height),
    },
    topRight: {
      h: parseValue(hValues.topRight, width),
      v: parseValue(vValues.topRight, height),
    },
    bottomRight: {
      h: parseValue(hValues.bottomRight, width),
      v: parseValue(vValues.bottomRight, height),
    },
    bottomLeft: {
      h: parseValue(hValues.bottomLeft, width),
      v: parseValue(vValues.bottomLeft, height),
    },
  };
}

/**
 * Borrowed from https://github.com/niklasvh/html2canvas/blob/8788a9f458f538c004a626c5ce7ee24b53e48c1c/src/Bounds.js#L200
 * Clamps each corder horizontal and vertical values to avoid overlapping corners.
 * @param {Borders} borders
 * @param {number} width
 * @param {number} height
 * @returns {Borders}
 */
function clampBorders(borders, width, height) {
  let tlh = borders.topLeft.h;
  let tlv = borders.topLeft.v;
  let trh = borders.topRight.h;
  let trv = borders.topRight.v;
  let brh = borders.bottomRight.h;
  let brv = borders.bottomRight.v;
  let blh = borders.bottomLeft.h;
  let blv = borders.bottomLeft.v;

  /**@type {number[]} */
  const factors = [];
  factors.push((tlh + trh) / width);
  factors.push((blh + brh) / width);
  factors.push((tlv + blv) / height);
  factors.push((trv + brv) / height);
  const maxFactor = Math.max(...factors);

  if (maxFactor > 1) {
    tlh /= maxFactor;
    tlv /= maxFactor;
    trh /= maxFactor;
    trv /= maxFactor;
    brh /= maxFactor;
    brv /= maxFactor;
    blh /= maxFactor;
    blv /= maxFactor;
  }

  return {
    topLeft: { h: tlh, v: tlv },
    topRight: { h: trh, v: trv },
    bottomRight: { h: brh, v: brv },
    bottomLeft: { h: blh, v: blv },
  };
}

export { parseCSSBorderRadius, clampBorders };
