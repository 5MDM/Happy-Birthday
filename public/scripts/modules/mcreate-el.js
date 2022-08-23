import {once} from "/scripts/modules/utils.js";

function $(e) {return document.querySelector(e)}
function newEl(name, opts = {}) {
  const el = document.createElement(name);
  for(const key in opts.attrs)
    el.setAttribute(key, opts.attrs[key]);
  
  if(opts.on != undefined) {
    if(!Array.isArray(opts.on[0])) {
      el.addEventListener(opts.on[0], opts.on[1]());
    } else {
      for(const [event, func] of opts.on)
        el.addEventListener(event, func);
    }
  }
  
  if(opts.up != undefined) once(opts.up, func => 
    el.addEventListener("pointerup", func)
  );
  
  if(opts.down != undefined) once(opts.down, func => 
    el.addEventListener("pointerdown", func)
  );
  
  if(opts.children != undefined) {
    once(opts.children, e => {
      if(typeof e == "string") {
        el.appendChild(document.createTextNode(e));
      } else {
        el.appendChild(e);
      }
    });
  }
  
  return el;
}

export {$, newEl};