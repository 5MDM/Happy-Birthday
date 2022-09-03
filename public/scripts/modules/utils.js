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

function cssOnce(evt, func) {
  func();
  addEventListener(evt, func);
}

function addToUI(a, b) {
  $("#ui >" + a).appendChild(b);
}

function stopLoop(func) {
  var stop = false;
  function stopF() {stop = true}
  function startF() {stop = false}
  
  function loop() {
    func(startF, stopF);
    if(!stop) requestAnimationFrame(loop);
  }
  
  requestAnimationFrame(loop);
  
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

export {
  once,
  rand,
  randFromArr,
  cssOnce,
  addToUI,
  stopLoop,
  linear,
  round,
  signOf,
};