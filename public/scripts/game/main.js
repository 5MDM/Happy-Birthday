;(function() {
  "use strict";
  
  Promise.all(
    import("/app.js")
  ).then(() => {
    
  });
})();