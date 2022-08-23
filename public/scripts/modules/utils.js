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

export {once, rand, randFromArr};