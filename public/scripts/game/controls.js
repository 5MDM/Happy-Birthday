import {newEl, $, parseCSS, regularBtnPush} 
from "../modules/mcreate-el.js";
import {addToUI} from "../modules/utils.js";

function addJoystick() {
  const ctrls = {
    up: newEl("button", {
      attrs: {style: "grid-column: 2"},
      children: "up",
    }),
    left: newEl("button", {
      attrs: {style: "grid-column: 1; grid-rows: 2"},
      children: "left",
    }),
    down: newEl("button", {
      children: "bottom",
    }),
    right: newEl("button", {
      children: "right",
    }),
  }
  
  const joystick = newEl("div", {
    attrs: {style: parseCSS({
      display: "grid",
      border: "2px solid blue",
      width: "40%",
      height: "40%",
      //"z-index": "3",
      "background-color": "rgba(10, 10, 10, 0.5)",
      "pointer-events": "auto",
      "grid-template-columns": "repeat(3, 1fr)",
      "grid-template-rows": "repeat(2, 1fr)",
    })},
    children: [
      ctrls.up,
      ctrls.left,
      ctrls.down,
      ctrls.right,
    ],
    forEach(el) {
      el.style.border = "3px outset silver";
      el.style.color = "black";
      regularBtnPush(el, {color: "gray"});
    },
  });
  
  const joyc = newEl("div", {
    attrs: {style: parseCSS({
      display: "flex",
      "flex-direction": "column",
      "align-items": "flex-start",
      "justify-content": "flex-end",
      width: "100%",
      height: "100%",
      "pointer-events": "none",
    })},
    children: joystick,
  });
  addToUI("#controls", joyc);
}

export {addJoystick};