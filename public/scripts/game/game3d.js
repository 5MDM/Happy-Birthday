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
  };
  
  addTouchControlButton();
  
  const joystick = newEl("div", {
    attrs: {style: parseCSS({
      display: "grid",
      border: "2px solid blue",
      width: "40%",
      height: "40%",
      "z-index": "3",
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
    }
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
  
  function addTouchControlButton() {
    var up = false;
    
    const m = {
      x: 0,
      y: 0,
    }
    
    ctrls.up.addEventListener("touchstart", e => {
      if(!up) {
        up = true;
        m.x += 0.1;
      }
    });
    
    ctrls.up.addEventListener("touchend", e => {
      if(up) {
        up = false;
        m.x -= 0.1;
      }
    });
    
    const loop = stopLoop(() => {
      
    });
  }
}

var mathX = -RADIAN_HALF;
var mathY = 0;

function addCameraControls(cam) {
  var touchDown = false;
  var current_id;
  var lx = 0;
  var ly = 0;
  
  // set default camera values
  /*var mathX = -RADIAN_HALF;
  var mathY = 0;*/
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
  
  function addTouchControls(c) {
    function getTouch(e, i) {
      if(i == undefined)
        i = e.changedTouches.length - 1;
      return e.changedTouches[i];
    }
    
    c.addEventListener("touchstart", e => {
      const touch = getTouch(e);
      if(!touchDown) {
        touchDown = true;
        current_id = touch.identifier;
        lx = touch.pageX;
        ly = touch.pageY;
      }
    });
    
    c.addEventListener("touchmove", e => {
      const touch = getTouch(e);
      var found = false;
      if(touch.identifier == current_id)
        found = true;
      
      if(!found) return;
      
      moveCamera(touch);
      
      updateCamera();
    });
    
    c.addEventListener("touchend", e => {
      touchDown = false;
    });
    
    function moveCamera(e) {
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
    }
  }
  
  addTouchControls($("#c"));
  
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