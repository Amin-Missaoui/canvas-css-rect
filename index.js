import roundRect from "./src/roundRect.js";

const width = 300;
const height = 300;

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const reference = document.createElement("div");

canvas.width = width * 2;
canvas.height = height * 2;
ctx.scale(2, 2);
canvas.style.width = width + "px";
canvas.style.height = height + "px";
canvas.style.border = "1px solid black";

reference.style.width = width + "px";
reference.style.height = height + "px";
reference.style.border = "1px solid black";
reference.style.display = "flex";
reference.style.justifyContent = "center";
reference.style.alignItems = "center";

document.body.appendChild(reference);
document.body.appendChild(canvas);

const borderRadius = "100% 0% 100% 0% / 0% 100% 0% 100% ";

const rectWidth = 200;
const rectHeight = 200;

const div = document.createElement("div");
const label = document.createElement("span");
div.style.width = rectWidth + "px";
div.style.height = rectHeight + "px";
div.style.borderRadius = borderRadius;
div.style.backgroundColor = "red";

reference.style.position = "relative";

label.innerText = "DOM";
label.style.fontSize = "30px";
label.style.fontFamily = "sans-serif";
label.style.position = "absolute";
label.style.left = "0";
label.style.top = "0";

reference.appendChild(label);
reference.appendChild(div);

roundRect(
  ctx,
  width / 2 - rectWidth / 2,
  height / 2 - rectHeight / 2,
  rectWidth,
  rectHeight,
  borderRadius,
);
ctx.fillStyle = "red";
ctx.fill();

ctx.fillStyle = "black";
ctx.font = "30px sans-serif";
ctx.fillText("Canvas", 2, 28);
