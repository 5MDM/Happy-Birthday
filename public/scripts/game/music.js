import {newEl, parseCSS, regularBtnPush} 
from "../modules/mcreate-el.js";
import {addToUI} from "../modules/utils.js";

const _g = {};

const playMusicElC = newEl("div", {
  attrs: {style: parseCSS({
    "background-color": "rgba(10, 10, 10, 0.5)",
    "pointer-events": "auto",
  })},
  children: newEl("img", {
    attrs: {
      style: parseCSS({
        display: "none",
        width: "100px",
        height: "100px",
        background: 
        "linear-gradient(45deg, silver, gray)",
      }),
      src: "/images/game/gui/play-music.png",
      alt: "Play music",
    },
  }),
  forEach(el) {
    el.style.border = "3px outset silver";
    el.style.color = "black";
    regularBtnPush(el, {color: "gray"});
  },
});

const playMusicEl = playMusicElC.firstChild;

addToUI("#dir", playMusicEl);

function playMusic(e) {
  _g.audio.src = e;
  _g.audio.play();
}

function musicLoop(el) {
  el.addEventListener("ended", el.play);
  
  return {stop: el.stop};
}

function music() {
  var ended = false;
  
  const el = newEl("audio", {
    attrs: {
      src: "/scripts/game/audio/andy-birthday.mp3",
    },
  });
  
  el.play();
  var loop = startMusic();
  
  playMusicEl.addEventListener("pointerup", e => {
    playMusicEl.style.display = "none";
    loop = startMusic();
  });
  
  el.addEventListener("ended", e => ended = true);
  
  el.addEventListener("pause", e => {
    if(!ended) playMusicEl.style.display = "block";
    ended = false;
  });
  
  function startMusic() {
    el.play();
    return musicLoop(el);
  }
}

export {music};