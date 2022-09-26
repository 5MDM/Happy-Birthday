import {player} from "./game3d.js";
import {newEl, $, parseCSS, regularBtnPush} 
from "../modules/mcreate-el.js";
import {stopLoop, addToUI} from "../modules/utils.js";

const controlType = null;

function addJoystick() {
  const ctrls = {
    up: newEl("img", {
      attrs: {
        style: parseCSS({
          "grid-column-start": "2",
          "grid-area": "up",
        }),
        alt: "Up",
      },
    }),
    left: newEl("img", {
      attrs: {
        style: parseCSS({
          "grid-area": "left",
        }),
        alt: "Left",
      },
    }),
    down: newEl("img", {
      attrs: {
        style: parseCSS({
          "grid-area": "down",
        }),
        alt: "Down",
      },
    }),
    right: newEl("img", {
      attrs: {
        style: parseCSS({
          "grid-area": "right",
        }),
        alt: "Right",
      },
    }),
  };
  
  const j = newEl("div", {
    attrs: {
      style: parseCSS({
        position: "relative",
        top: "65%",
        display: "grid",
        border: "2px solid red",
        width: "35%",
        height: "35%",
        "grid-template-columns": "1fr 1fr 1fr",
        "grid-template-areas": `
              ". up ."
          "left down right"
        `,
      }),
    },
    children: [
                  ctrls.up,
      ctrls.left, ctrls.down, ctrls.right,
    ],
    forEach(el) {
      /*el.style = parseCSS({
        color: "white",
        border: "2px solid red",
        width: "100%",
        height: "100%",
      });*/
      el.style.color = "white";
      el.style.border = "2px solid red";
      el.style.width = "100%";
      el.style.height = "100%";
    },
  });
  
  addToUI("#controls", j);
}

export {
  addJoystick,
};