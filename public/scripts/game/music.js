import {newEl} from "../modules/mcreate-el.js";

const _g = {};

function playMusic(e) {
  _g.audio.src = e;
  _g.audio.play();
}

function musicLoop(el) {
  el.addEventListener("ended", el.play);
  
  return {stop: el.stop};
}

function music() {
  const el = newEl("audio", {
    attrs: {
      src: "/scripts/game/audio/andy-birthday.mp3",
    },
  });
  
  el.play();
  const loop = musicLoop(el);
}

export {music, playMusic};