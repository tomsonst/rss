import {Puzzle} from "./script.js";

export function _newGame(){
    document.body.innerHTML = "";
    localStorage.removeItem("arr");
    localStorage.removeItem("image");
    Puzzle.sec = "00";
    Puzzle.min = "00";
    Puzzle.move = 0;
                     
    Puzzle.options.pause = false;
    Puzzle.init();
  }