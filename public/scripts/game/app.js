import {$} from "../modules/mcreate-el.js";
import {cssOnce, stopLoop} from "../modules/utils.js";

const renderer = new THREE.WebGLRenderer({
  canvas: $("#c"),
  precision: "lowp",
  antialias: false,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
cssOnce("resize", () => renderer.setSize(innerWidth, innerHeight))

var currentScene;
var currentCam;

function setCurrentScene(e) {currentScene = e}

function setCurrentCam(e) {currentCam = e}

const renderLoop = stopLoop(() => {
  renderer.render(currentScene, currentCam);
}, false);

export {
  renderLoop,
  renderer,
  setCurrentScene,
  setCurrentCam,
};