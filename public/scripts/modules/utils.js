import {$} from "./mcreate-el.js";

function once(e, func) {
  if(Array.isArray(e)) {
    for(const i of e) func(i);
  } else {
    func(e);
  }
}

function rand({min = 0, max}) {
  return Math.floor(Math.random() * (max - 1)) + min;
}

function randFromArr(e) {
  return e[rand({max: e.length})];
}

function eventOnce(evt, func) {
  func();
  addEventListener(evt, func);
}

function addToUI(a, b) {
  $("#ui >" + a).appendChild(b);
}

function stopLoop(func, firstTick = true) {
  var loopRunning = firstTick;
  var stop = false;
  function stopF() {stop = true}
  function startF() {
    stop = false;
    if(!loopRunning) {
      loopRunning = true;
      requestAnimationFrame(loop);
    }
  }
  
  function loop() {
    func({start: startF, stop: stopF});
    if(!stop) requestAnimationFrame(loop);
  }
  
  if(firstTick) requestAnimationFrame(loop);
  
  return {
    start: startF,
    stop: stopF,
  };
}

/*
const loop = stopLoop(() => {
  
});
*/

function round(ops, num) {
  return Math.round(ops * num) / num;
}

function signOf(num) {
  if(num < 0) {
    return -1;
  } else {
    return 1;
  }
}
function linear(opts = {}) {
  opts.firstTick ??= false;
  
  if(opts.start == opts.end) {
    if(opts.firstTick) {
      opts.func?.(opts.start);
    } else {
      return;
    }
  }
  
  if(opts.start == 0) {
    if(opts.end > 0) {
      opts.start++;
    } else if(opts.end < 0) {
      opts.start--;
    }
  }
  
  if(opts.end == 0) {
    if(opts.start > 0) {
      opts.end--;
    } else if(opts.start < 0) {
      opts.end++;
    }
  }
  
  const sign = signOf(opts.end);
  const rate = round(opts.start / opts.end, 100);
  function posLoop() {
    opts.start += rate;
    if(opts.start >= opts.end) {
      opts.onEnd?.();
    } else {
      opts.func?.(opts.start);
      setTimeout(posLoop, opts.time);
    }
  }
  
  function negLoop() {
    opts.start += rate;
    if(opts.start <= opts.end) {
      opts.onEnd?.();
    } else {
      opts.func?.(opts.start);
      setTimeout(negLoop, opts.time);
    }
  }
  
  if(opts.firstTick) {
    if(sign == 1) {
      posLoop();
    } else {
      negLoop();
    }
  } else {
    if(sign == 1) {
      setTimeout(posLoop, opts.time);
    } else {
      setTimeout(negLoop, opts.time);
    }
  }
}

function parseMapData(e) {
  const arr = [];
  var current = "";
  for(const char of e) {
    if(char == "\n") {
      arr.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  arr.push(current);
  
  return arr;
}

function getMapData(e) {
  return new Promise(
    a => fetch(e)
    .then(e => e.text())
    .then(e =>  a(parseMapData(e))),
  );
};

function getFile(e) {
  return new Promise(
    a => fetch(e)
    .then(e => e.text())
    .then(e => a(e))
  );
}

class Keymap {
  keys = {};
  
  constructor(e) {
    this.str = e;
  }
  
  key(a, b) {
    this.keys[a] = b;
    return this;
  }
  
  run(e, opts = {}) {
    if(e != undefined) this.str = e;
    var x = opts.x || 0;
    var y = opts.y || this.str.length - 1;
    
    var stop = false;
    function end() {stop = true}
    
    for(const yo of this.str) {
      // arrays
      for(const xo of yo) {
        // texts
        if(xo in this.keys) this.keys[xo]({x, y, end});
        if(stop) break;
        x++;
      }
      if(stop) break;
      y--;
      x = 0;
    }
    
    return this;
  }
}

const RADIAN_HALF = 1.570796;

/*
linear({
  start: 1,
  end: 10,
  time: 10,
  firstTick: true,
});

linear({
  start: 1,
  end: -10,
});*/

function clamp(min, num, max) {
  return Math.min(Math.max(num, min), max);
}

function randomColor() {
  return Math.floor(Math.random() * 0xffffff);
}

export {
  once,
  rand,
  randFromArr,
  eventOnce,
  addToUI,
  stopLoop,
  linear,
  round,
  signOf,
  getMapData,
  parseMapData,
  getFile,
  Keymap,
  RADIAN_HALF,
  clamp,
  randomColor,
};