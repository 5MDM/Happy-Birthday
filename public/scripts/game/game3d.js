import {renderLoop, setCurrentScene, setCurrentCam} 
from "./app.js";
import {
  addToUI, stopLoop, round, getMapData, Keymap,
  RADIAN_HALF, clamp, eventOnce, randomColor,
} from "../modules/utils.js";
import {newEl, $, parseCSS, regularBtnPush} 
from "../modules/mcreate-el.js";
import {settings}
from "./settings.js";

const t = THREE;
const scene = new t.Scene();
const cam = new t.PerspectiveCamera(
  settings.fov,
  innerWidth / innerHeight,
  0.1, 1000
);

const keymapDef = {
  PLAYER: "@",
};

const loadLoop = [];

function game3d() {
  const getFileLevel = 
  getMapData("./scripts/game/3d/beginning.txt");
  loadLoop.push(getFileLevel);
  
  var centerX;
  var centerY;
  
  getFileLevel.then(e => {
    const map = new Keymap(e);
    map.key(keymapDef.PLAYER, ({x, y, end}) => {
      centerX = x;
      centerY = y;
      end();
    });
    map.run();
    addLevels(e, centerX, centerY);
  });
  
  addCameraControls(cam);
  addJoystick();
  setCurrentScene(scene);
  setCurrentCam(cam);
  
  Promise.all(loadLoop).then(renderLoop.start);
}

function addJoystick() {
  /*const static = nipplejs.create({
    zone: $("c"),
    mode: "dynamic",
    color: "red",
  });*/
  nipplejs.create({
    zone: $("#controls"),
    mode: "dynamic",
    color: "red",
  });
  
}

function addCameraControls(cam) {
  var lx = 0;
  var ly = 0;
  
  addEventListener("touchstart", e => {
    lx = e.pageX;
    ly = e.pageY;
  });
  
  // set default camera values
  var mathX = -RADIAN_HALF;
  var mathY = 0;
  cam.rotation.x = RADIAN_HALF;
  cam.rotation.y = -RADIAN_HALF;
  
  function setQuaternion() {
    const qx = new t.Quaternion();
    qx.setFromAxisAngle(
      new t.Vector3(0, 1, 0),
      mathX,
    );
    const qz = new t.Quaternion();
    qz.setFromAxisAngle(
      new t.Vector3(1, 0, 0),
      mathY,
    );
    
    return {qx, qz};
  }
  
  function updateCamera() {
    const {qx, qz} = setQuaternion();
    const q = new t.Quaternion();
    
    q.multiply(qx);
    q.multiply(qz);
    cam.quaternion.copy(q);
  }
  
  addEventListener("touchmove", e => {
    const sx = (lx - e.pageX) * 0.005;
    const sy = (ly - e.pageY) * 0.005;
    lx = e.pageX;
    ly = e.pageY;
    
    mathX += -sx * settings.sensitivity;
    mathY = clamp(
      -Math.PI / 3,
      mathY + -sy * settings.sensitivity,
      Math.PI / 3,
    );
    
    updateCamera();
  });
  
  
  updateCamera();
}

async function addLevels(txt, cx, cy) {
  const map = new Keymap(txt);
  const size = 2;
  
  map.key("#", (obj) => {
    initCoords(obj);
    const {x, y, end} = obj;
    const box = new t.Mesh(
      new t.BoxGeometry(size, size, size),
      new t.MeshBasicMaterial({color: randomColor()}),
    );
    
    box.position.set(x, 0, y);
    scene.add(box);
  });
  map.run();
  
  function initCoords(o) {
    o.x -= cx;
    o.y -= cy;
    o.x *= size;
    o.y *= size;
  }
}

export {game3d};