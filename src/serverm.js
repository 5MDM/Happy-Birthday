import http from "http";

const serverm = (function() {
  const serverm = {};
  serverm.defaultOpts = {
    port: process?.env?.PORT || 8080,
    hostname: "0.0.0.0",
  };
  class App {
    _middleware = [];
    
    constructor(opts = {}) {
      this.opts = opts;
      this.server = http.createServer();
      
      return this;
    }
    
    use(obj = {}, ...args) {
      this._middleware.push(obj);
      obj.init?.(...args);
      return this;
    }
    
    listen(...args) {
      const port = args[0]
      || this.opts.port
      || serverm.defaultOpts.port;
      
      var hostname = this.opts.hostname
      || serverm.defaultOpts.hostname;
      
      var backlog = this.opts.backlog
      || serverm.defaultOpts.backlog;
      
      var callback = this.opts.callback
      || serverm.defaultOpts.callback;
      
      if(typeof args[0] == "function") {
        const port = this.opts.port;
        this.server.listen
        (port, hostname, backlog, args[0]);
        
        return this;
      }
      
      for(let i = 1; i < args.length; i++) {
        const io = args[i];
        if(typeof io == "number") {
          backlog = io;
        } else if(typeof io == "string") {
          hostname = io;
        } else {
          callback = io;
        }
      }
      
      this.server.listen
      (port, hostname, backlog, callback);
      
      for(const i of this._middleware) {
        i.listen?.({port, hostname, backlog, callback});
      }
      
      return this;
    }
  }
  
  serverm.app = function(...args) {
    return new App(...args);
  };
  
  // middleware
  serverm.logger = {
    listen(obj = {}) {
      console.log(
        `Listening on port "${obj.port}" `
      + `at host "${obj.hostname}"\n`
      + `(backlog: "${obj.backlog}". Function: `
      + `"${obj.callback}")\n`
      );
    },
  };
  
  return serverm;
})();

/*
const app = new serverm.app({
  port: 8080,
});


*/

export default serverm;