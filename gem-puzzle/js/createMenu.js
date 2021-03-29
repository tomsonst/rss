import {Puzzle} from "./script.js";
import {_bestScore} from "./score.js";
import {_getSetting} from "./seting.js";
import { _newGame } from "./newGame.js";

export function _createMenu(){

    const newGame = document.createElement("span");
    const bestScore = document.createElement("span");
    const setting = document.createElement("span");
    const sound = document.createElement("span");

    newGame.classList.add("new-game");
    bestScore.classList.add("score");
    setting.classList.add("setting");
    sound.classList.add("sound");

    newGame.textContent = "New game";
    bestScore.textContent = "Best score";
    setting.textContent = "Setting";

    if(Puzzle.sound === true){
      sound.textContent = "Sound ON";
    } else {
      sound.textContent = "Sound OFF";
    }

    Puzzle.elements.wrap.appendChild(newGame);
    Puzzle.elements.wrap.appendChild(bestScore);
    Puzzle.elements.wrap.appendChild(setting);
    Puzzle.elements.wrap.appendChild(sound);

    
      newGame.addEventListener("click", _newGame);

     
      bestScore.addEventListener("click", _bestScore);

 
      setting.addEventListener("click", _getSetting);

  
      sound.addEventListener("click", function(){
        Puzzle.sound = !Puzzle.sound;
        if(Puzzle.sound){
          document.querySelector(".sound").textContent = "sound ON";
        } else {
          document.querySelector(".sound").textContent = "sound OFF";
        }
      });

  }

  export function _menuActive(){
    Puzzle.options.pause = !Puzzle.options.pause;
    Puzzle.options.pause ? Puzzle.elements.wrap.style.display = "flex": Puzzle.elements.wrap.style.display = "none";
  }