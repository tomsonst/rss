import {Puzzle} from "./script.js";
import {_saveGame} from "./save.js";
import {playSound} from "./play.js";
import {_printWin} from "./win.js";

export function _changePosition(e){

    const emptyElement =document.querySelector(".empty");
      let orderTarget = +e.target.style.order;
      let indexTarget = +e.target.style.order;

      if( indexTarget+Puzzle.options.size === Puzzle.emptyElem.indexEmpty || 
          indexTarget-Puzzle.options.size === Puzzle.emptyElem.indexEmpty ||
          (indexTarget+1 === Puzzle.emptyElem.indexEmpty && (Puzzle.emptyElem.indexEmpty)%Puzzle.options.size !==0) || 
          indexTarget-1 === Puzzle.emptyElem.indexEmpty && (Puzzle.emptyElem.indexEmpty+1)%Puzzle.options.size !==0){

        Puzzle.elements.knuckles[indexTarget] = emptyElement.textContent;
        Puzzle.elements.knuckles[Puzzle.emptyElem.indexEmpty] = +e.target.textContent;

        if(indexTarget+Puzzle.options.size === Puzzle.emptyElem.indexEmpty){
          e.target.classList.add(`top_${Puzzle.options.size}`);
        } else if(indexTarget-Puzzle.options.size === Puzzle.emptyElem.indexEmpty){
          e.target.classList.add(`bottom_${Puzzle.options.size}`);
        } else if(indexTarget+1 === Puzzle.emptyElem.indexEmpty && (Puzzle.emptyElem.indexEmpty)%Puzzle.options.size !==0){
          e.target.classList.add(`left_${Puzzle.options.size}`);
        } else if(indexTarget-1 === Puzzle.emptyElem.indexEmpty && (Puzzle.emptyElem.indexEmpty+1)%Puzzle.options.size !==0){
          e.target.classList.add(`right_${Puzzle.options.size}`);
        }
        playSound();
        setTimeout(function(){
          let addClassTarget = e.target.classList[1];
          e.target.style.transition = "all 0s";
          e.target.classList.remove(addClassTarget);
          e.target.style.order = `${Puzzle.emptyElem.orderEmpty}`;
          Puzzle.emptyElem.orderEmpty = `${orderTarget}`;
          emptyElement.style.order = Puzzle.emptyElem.orderEmpty;
        }, 500);

        e.target.style.transition = "all 0.5s";
        
        Puzzle.emptyElem.indexEmpty = indexTarget;
        Puzzle.elements.move.textContent++;
        _saveGame();
        _printWin();
      }
  }