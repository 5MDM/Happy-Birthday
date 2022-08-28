import {renderer} from "./app.js";
import {addToUI} from "../modules/utils.js";
import {newEl, $} from "../modules/mcreate-el.js";

const menu = newEl("p", {
  attrs: {style: "color: white"},
  children: "test",
});

function start() {
  addToUI("#dir", menu);
}

export {
  start,
};