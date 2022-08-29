import {renderer} from "./app.js";
import {addToUI} from "../modules/utils.js";
import {newEl, $, parseCSS, regularBtnPush} 
from "../modules/mcreate-el.js";

const menu = newEl("div", {
  attrs: {style: {
    display: "flex",
    position: "relative",
    "flex-direction": "column",
    height: "75%",
    width: "50%",
    margin: "auto",
    top: "25%",
    background: 
    "linear-gradient(45deg, silver, gray)",
    "border-radius": "25px 25px 0 0"
  }},
  children: [
    newEl("button", {
      children: "Start",
    }),
    newEl("button", {
      children: "Settings",
    }),
    newEl("button", {
      children: "Credits",
    }),
  ],
  forEach(e) {
    e.style = parseCSS({
      width: "80%",
      padding: "15px",
      margin: "auto",
      "border-radius": "8px",
      border: "3px outset gray",
      color: "black",
      "background-color": "silver",
    });
    
    regularBtnPush(e, {color: "gray"});
  },
});

function start() {
  addToUI("#dir", menu);
}

export {
  start,
};