;(async function() {
  "use strict";
  
  document.addEventListener("gesturestart", 
    e => e.preventDefault()
  );
  
  const {start} = await import("./menu.js");
  start();
})();