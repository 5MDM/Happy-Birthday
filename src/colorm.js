const colorm = (function() {
  const colorm = {
    reset: 0,
    bold: 1,
    dim: 2,
    italic: 3,
    underline: 4,
    slowBlink: 5,
    fastBlink: 6,
    invert: 7,
    hide: 8,
    strike: 9,
    primary: 10,
    font1: 11,
    font2: 12,
    font3: 13,
    font4: 14,
    font5: 15,
    font6: 16,
    font7: 17,
    font8: 18,
    font9: 19,
    fraktur: 20,
    gothic: 20,
    doubleUnderline: 21,
    underlineTwice: 21,
    notBold: 21,
    normal: 22,
    notItalic: 23,
    notFraktur: 23,
    notGothic: 23,
    notUnderlined: 24,
    notBlinking: 25,
    spaceEvenly: 26,
    notReversed: 27,
    show: 28,
    notStriked: 29,
    color: {
      black: 30,
      red: 31,
      green: 32,
      yellow: 33,
      blue: 34,
      magenta: 35,
      cyan: 36,
      white: 37,
      gray: 90,
      grey: 90,
      bright: {
        red: 91,
        green: 92,
        yellow: 93,
        blue: 94,
        magenta: 95,
        cyan: 96,
        white: 97,
      },
    },
    // turn above fg colors to bg
    bg(n) {return n + 10},
    // 8-bit fg colors
    fg8(n) {return `\x1b[38;5;${n}m`},
    // 8-bit bg colors
    bg8(n) {return `\x1b[48;5;${n}m`},
    // 8-bit fg colors using RGB
    rgbFg(r, g, b) {return `\x1b[38;2;${r};${g};${b}m`},
    // 8-bit bg colors using RGB
    rgbBg(r, g, b) {return `\x1b[48;2;${r};${g};${b}m`},
    defaultBg: 49,
    notSpacedEvenly: 50,
    framed: 51,
    encircled: 52,
    overlined: 53,
    notFramed: 54,
    notEncircled: 55,
    color(n) {return `\x1b[58;5;${n}m`},
    underlineColorRgb(r, g, b) {
      return `\x1b[58;2;${r};${g};${b}m`;
    },
    defaultUnderlineColor: 59,
    ideogram: {
      underline: 60,
      rightLine: 60,
      doubleUnderline: 61,
      doubleRightLine: 61,
      overline: 62,
      leftLine: 62,
      doubleOverline: 63,
      doubleLeftLine: 63,
      stress: 64,
    },
    noIdeogram: 65,
    superscript: 73,
    subscript: 74,
    notSuperscript: 75,
    notSubscript: 75,
  };
  
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