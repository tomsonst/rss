import {Puzzle} from "./script.js";

export function _saveGame(){
    localStorage.setItem("size", Puzzle.options.size);
    localStorage.setItem("arr", Puzzle.elements.knuckles);
    localStorage.setItem("sec", Puzzle.sec);
    localStorage.setItem("min", Puzzle.min);
    localStorage.setItem("move", Puzzle.elements.move.textContent);
    localStorage.setItem("image", Puzzle.options.image);
  }