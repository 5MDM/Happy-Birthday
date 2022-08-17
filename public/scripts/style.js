;(function() {
  "use strict";
  const root = document.documentElement;
  function once(evt, func) {
    func();
    addEventListener(evt, func);
  }
  
  once("resize", () => {
    root.style.setProperty("--w", innerWidth + "px");
    root.style.setProperty("--h", innerHeight + "px");
  });
})();