import {once} from "/scripts/modules/utils.js";

function $(e) {return document.querySelector(e)}
function newEl(name, opts = {}) {
  const el = document.createElement(name);
  for(const key in opts.attrs) {
    if(key == "style") {
      if(typeof opts.attrs[key] != "string") {
        el.setAttribute(key, parseCSS(opts.attrs[key]));
      } else {
        el.setAttribute(key, opts.attrs[key]);
      } 
    } else {
      el.setAttribute(key, opts.attrs[key]);
    }
  }
  
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
  
  if(opts.forEach != undefined) {
    once(opts.forEach, func => {
      for(let i = 0; i < el.children.length; i++)
        func(el.children[i]);
    });
  }
  
  return el;
}

function parseCSS(css = {}) {
  var str = "";
  for(const key in css) {
    str += `${key}:${css[key]};`;
  }
  
  return str;
}

function regularBtnPush(e, opts) {
  e.addEventListener("pointerdown", () => {
    e.style["border-style"] = "inset";
    if(opts != undefined)
      e.style.color = 
      opts.colorDown || opts.color;
  });
  
  e.addEventListener("pointerup", () => {
    e.style["border-style"] = "outset";
    if(opts != undefined)
      e.style.color = 
      opts.colorUp || "black";
  });
}

export {$, newEl, parseCSS, regularBtnPush};