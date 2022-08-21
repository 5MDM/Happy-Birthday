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
  
  if("serviceWorker" in navigator) {
    addEventListener("load", () => {
      navigator.serviceWorker.register('/sw.js')
      .then(reg => 
        console.info("Service worker activated")
      )
      .catch(err => console.error(new Error(err)));
    });
  } else {
    console.info(
      "Service worker isn't supported"
    );
  }
  
  addEventListener("DOMContentLoaded", () => {
    var online = navigator.onLine;
    
    if(!online) whenOffline();
    
    addEventListener("offline", whenOffline);
    
    function whenOffline() {
      window.location.href = 
      "https://happy-birthday.mdm4.repl.co/offline.html";
    }
  });
  
  addEventListener("touchstart", e => e.preventDefault())
})();