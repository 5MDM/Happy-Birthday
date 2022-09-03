import {renderer} from "./app.js";
import {addToUI, cssOnce, stopLoop, round} 
from "../modules/utils.js";
import {newEl, $, parseCSS, regularBtnPush} 
from "../modules/mcreate-el.js";

import {game3d} from "./game3d.js";

const menu = newEl("div", {
  attrs: {style: parseCSS({
    position: "relative",
    display: "flex",
    "flex-direction": "column",
    width: "max(50%, 250px)",
    height: "50%",
    background: "linear-gradient(45deg, silver, gray)",
    "margin-left": "auto",
    "margin-right": "auto",
    top: "50%",
    "border-radius": "25px 25px 0 0",
  })},
  children: [
    newEl("button", {
      children: "Start",
      up: () => game3d(),
    }),
    newEl("button", {
      children: "Settings",
    })
  ],
  forEach(el) {
    el.style = parseCSS({
      width: "80%",
      height: "25%",
      margin: "auto",
      color: "black",
      border: "2px outset gray",
      "border-radius": "10px",
    });
    regularBtnPush(el, {color: "gray"});
    el.addEventListener("pointerup", () => menu.remove());
  }
});

function start() {
  addToUI("#dir", menu);
}

export {start};