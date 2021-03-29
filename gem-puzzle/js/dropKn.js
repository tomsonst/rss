import {Puzzle} from "./script.js";
import {_saveGame} from "./save.js";
import {_printWin} from "./win.js";

export function _dropPosition(e) {
    e.preventDefault();
        const activeElement = Puzzle.elements.knuckleContainer.querySelector(".selected");

        const currentElement = e.target;
        const isMoveable = activeElement !== currentElement && currentElement.classList.contains("empty");
        if (!isMoveable) {
          return;
        }

        const emptyElement =document.querySelector(".empty");

        let indexTarget = +activeElement.style.order;


        if(indexTarget + Puzzle.options.size == Puzzle.emptyElem.indexEmpty || 
          indexTarget-Puzzle.options.size == Puzzle.emptyElem.indexEmpty ||
          (indexTarget+1 == Puzzle.emptyElem.indexEmpty && Puzzle.emptyElem.indexEmpty%Puzzle.options.size !==0) ||
          (indexTarget-1 == Puzzle.emptyElem.indexEmpty && (+Puzzle.emptyElem.indexEmpty+1)%Puzzle.options.size !==0)){
        Puzzle.elements.knuckles[indexTarget] = emptyElement.textContent;
        Puzzle.elements.knuckles[Puzzle.emptyElem.indexEmpty] = +activeElement.textContent;
            let actIndex = +activeElement.style.order;
            activeElement.style.order = +currentElement.style.order;
            Puzzle.emptyElem.indexEmpty = +actIndex;
            currentElement.style.order = +Puzzle.emptyElem.indexEmpty;
            Puzzle.emptyElem.orderEmpty = Puzzle.emptyElem.indexEmpty;
            Puzzle.elements.move.textContent++;
        }
        _saveGame();
        _printWin();
  }