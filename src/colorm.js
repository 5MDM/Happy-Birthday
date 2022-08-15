
// adds color to the console
const colorm = (function() {
  const colorm = {};
  
  colorm.x1b = function(n) {
    // "n" is the number in "\x1b[${n}m"
    if(n == undefined) return;
    
    if(Array.isArray(n)) {
      let final = "";
      for(const i of n) final += `\x1b[${n}m`;
      return final;
    } else {
      return `\x1b[${n}m`;
    }
  };
  colorm.x1bWrap = function(n, str) {
    if((n   == undefined)
    || (str == undefined)) return str;
    
    // x1b(0) resets everything to normal
    if(typeof n == "string") {
      return n + str + colorm.x1b(0);
    } else {
      return colorm.x1b(n) + str + colorm.x1b(0);
    }
  };
  
  return colorm;
})();

export default colorm;