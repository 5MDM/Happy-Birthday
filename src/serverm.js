import http from "http";
import colorm from "./colorm.js";

const serverm = (function() {
  const {x1bWrap} = colorm;
  const serverm = {};
  serverm.defaultOpts = {
    port: process?.env?.PORT || 8080,
    hostname: "0.0.0.0",
  };
  class App {
    _methods = [];
    
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
      // first argument must be the port or a function
      const port = args[0] // gets first argument
      || this.opts.port    // default to set options
      || serverm.defaultOpts.port;
      
      var hostname = this.opts.hostname
      || serverm.defaultOpts.hostname;
      
      var backlog = this.opts.backlog
      || serverm.defaultOpts.backlog;
      
      var callback = this.opts.callback
      || serverm.defaultOpts.callback;
      
      // if the first argument is a function, 
      // use the above variables
      if(typeof args[0] == "function") {
        const port = this.opts.port;
        this.server.listen
        (port, hostname, backlog, args[0]);
        
        return this;
      }
      
      // loops through arguments
      for(let i = 1; i < args.length; i++) {
        const io = args[i];
        if(typeof io == "number") {
          // backlog
          backlog = io;
        } else if(typeof io == "string") {
          // hostname
          hostname = io;
        } else {
          // callback
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
    
    get(path, func) {
      
    }
    
    head(path, func) {
      
    }
    
    post(path, func) {
      
    }
    
    put(path, func) {
      
    }
    
    delete(path, func) {
      
    }
    
    connect(path, func) {
      
    }
    
    options(path, func) {
      
    }
    
    patch(path, func) {
      
    }
  }
  
  serverm.app = function(...args) {
    return new App(...args);
  };
  
  // middleware
  serverm.basicLogger = function(type = "tiny", opts = {}) {
    const obj = {};
    
    function wrap(e) {
      if(typeof e == "string") {
        return x1bWrap(opts.string, `"${e}"`);
      } else if(Array.isArray(e)) {
        return x1bWrap(opts.array, e);
      } else {
        if(e?.toString != undefined) {
          return x1bWrap(opts[typeof e], e.toString());
        } else {
          // undefined messes with x1bWrap()
          return x1bWrap(opts[typeof e], `${e}`);
        }
      }
    }
    
    if(opts.all != undefined) {
      for(const i in opts) {
        if(i != "all") opts[i] = opts.all + opts[i];
      };
    }
    
    if(type == "verbose") {
      
      obj.listen = function(obj) {
        console.log(
          `Listening on port ${wrap(obj.port)} `
        + `at host ${wrap(obj.hostname)}.\n`
        + `(Backlog: ${wrap(obj.backlog)}. Function: `
        + `${wrap(obj.callback)})\n`
        );
      };
      
    } else if(type == "normal") {
      
      obj.listen = function(obj) {
        console.log(
          `Listening on port ${wrap(obj.port)} `
        + `at host ${wrap(obj.hostname)}\n`
        );
      };
      
    } else if(type == "tiny") {
      
      obj.listen = function(obj) {
        console.log(
          `Listening on port ${wrap(obj.port)}`
        );
      };
      
    }
    
    return obj;
  };
  
  return serverm;
})();

/*
const app = new serverm.app({
  port: 8080,
});


*/

export default serverm;