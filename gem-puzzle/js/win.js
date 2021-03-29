import {Puzzle} from "./script.js";
import { _newGame } from "./newGame.js";

export function _printWin(){
    if(Puzzle.elements.knuckles[0] === 1 && Puzzle.elements.knuckles[Puzzle.elements.knuckles.length-2] === Puzzle.elements.knuckles.length-1){
      let win = true;
      for (let i = 0; i<Puzzle.elements.knuckles.length-1; i++){
        if(Puzzle.elements.knuckles[i] !== i+1){
          win = false;
        }
      }
      if(win){
        console.log(Puzzle.sec);
        const elemWin = document.createElement("div");
        elemWin.classList.add("win");
        elemWin.innerText = `Ура! Вы решили головоломку за ${Puzzle.min}:${Puzzle.sec} и ${Puzzle.elements.move.textContent} ходов`;
        document.body.appendChild(elemWin);
        let score = localStorage.getItem("bestScore");
        localStorage.setItem("bestScore",score+ ";" + `${Puzzle.min}:${Puzzle.sec}, ${Puzzle.elements.move.textContent}`);

        setTimeout(function(){
          elemWin.parentNode.removeChild(elemWin);
          Puzzle.options.pause ="false";
          _newGame();
        }, 3000);
      }
    }
  }