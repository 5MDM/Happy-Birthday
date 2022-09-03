import {$} from "../modules/mcreate-el.js";
import {cssOnce} from "../modules/utils.js";

const renderer = new THREE.WebGLRenderer({
  canvas: $("#c"),
  precision: "lowp",
  antialias: false,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
cssOnce("resize", () => renderer.setSize(innerWidth, innerHeight));

export {
  renderer,
};