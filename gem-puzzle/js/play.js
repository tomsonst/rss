import {Puzzle} from "./script.js";

export function playSound() {

    let audio;
    
    audio = document.querySelector("audio");
    if (!audio) return;
    if(Puzzle.sound){
      audio.currentTime = 0;
      audio.play();
    }      
  }