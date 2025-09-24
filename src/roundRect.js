import { parseCSSBorderRadius, clampBorders } from "./utils/border.js";

/**
 * Draw a rounded rectangle on the canvas using css border-radius property
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {string | number | number[]} [radius]
 */
function roundRect(ctx, x, y, width, height, radius) {
  if (!radius) {
    ctx.rect(x, y, width, height);
    return;
  }

  if (typeof radius === "number" || Array.isArray(radius)) {
    ctx.roundRect(x, y, width, height, radius);
    return;
  }

  const borders = clampBorders(parseCSSBorderRadius(radius, width, height), width, height);
  const { topLeft, topRight, bottomRight, bottomLeft } = borders;

  ctx.beginPath();

  //start at top-left corner
  ctx.moveTo(x + topLeft.h, y);

  //top edge
  ctx.lineTo(x + width - topRight.h, y);

  //top-right corner
  ctx.ellipse(
    x + width - topRight.h,
    y + topRight.v,
    topRight.h,
    topRight.v,
    0,
    1.5 * Math.PI,
    2 * Math.PI,
  );

  //right edge
  ctx.lineTo(x + width, y + height - bottomRight.v);

  //bottom-right corner
  ctx.ellipse(
    x + width - bottomRight.h,
    y + height - bottomRight.v,
    bottomRight.h,
    bottomRight.v,
    0,
    0,
    0.5 * Math.PI,
  );

  //bottom edge
  ctx.lineTo(x + bottomLeft.h, y + height);

  //bottom-left corner
  ctx.ellipse(
    x + bottomLeft.h,
    y + height - bottomLeft.v,
    bottomLeft.h,
    bottomLeft.v,
    0,
    0.5 * Math.PI,
    Math.PI,
  );

  //left edge
  ctx.lineTo(x, y + topLeft.v);

  //top-left corner
  ctx.ellipse(x + topLeft.h, y + topLeft.v, topLeft.h, topLeft.v, 0, Math.PI, 1.5 * Math.PI);

  ctx.closePath();
}

export default roundRect;
