import {renderLoop, setCurrentScene, setCurrentCam} 
from "./app.js";
import {
  addToUI, cssOnce, stopLoop, round, getFile, Keymap
} from "../modules/utils.js";
import {newEl, $, parseCSS, regularBtnPush} 
from "../modules/mcreate-el.js";
import {opts}
from "./settings.js";

const t = THREE;
const scene = new t.Scene();
const cam = new t.PerspectiveCamera(
  opts.fov,
  innerWidth / innerHeight,
  0.1, 1000
);

async function game3d() {
  setCurrentScene(scene);
  setCurrentCam(cam);
  
  const level = 
  await getFile("/scripts/game/3d/beginning.txt");
  
  var centerX = 0;
  var centerY = 0;
  ;(function() {
    const map = new Keymap();
    map.key("@", ({x, y, end}) => {
      centerX = x;
      centerY = y;
      console.log(`Player position at: (${x}, ${y})`);
    });
    map.run(level);
  })();
  
  function initCoords(e) {
    e.x -= centerX;
    e.y -= centerY;
  }
  
  const levelDef = new Keymap();
  levelDef.key("#", (e) => {
    initCoords(e);
    const {x, y, end} = e;
    console.log({x, y});
  });
  
  levelDef.run(level);
  
  renderLoop.start();
}

export {game3d};