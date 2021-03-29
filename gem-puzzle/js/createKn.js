import {Puzzle} from "./script.js";
import { _changePosition } from "./changePosition.js";

export function _createKnuckles(){
    
    Puzzle.elements.knuckleContainer.style.gridTemplateColumns = `repeat(${Puzzle.options.size}, 1fr)`;

  
    const fragment = document.createDocumentFragment();
    if(localStorage.getItem("image") !== null){
      Puzzle.options.image = localStorage.getItem("image");
    } else {
      Puzzle.options.image = Math.floor(Math.random() * 10);
    }
    Puzzle.elements.knuckles.forEach(elem => {
        const knElement = document.createElement("div");
            knElement.textContent = Puzzle.elements.knuckles[elem];
            if( Puzzle.elements.knuckles[elem] !== 0){
                knElement.classList.add("knuckle");
                knElement.style.order =  elem;
                knElement.setAttribute("draggable","true");
                knElement.style.backgroundImage = `url(images/${Puzzle.options.image}.jpg)`;
                knElement.style.backgroundSize = `${Puzzle.elements.knuckleContainer.clientWidth}px ${Puzzle.elements.knuckleContainer.clientWidth}px`;
                let pos = -(Puzzle.elements.knuckleContainer.clientWidth / Puzzle.options.size) * ((Puzzle.elements.knuckles[elem]%Puzzle.options.size) -1);
                let posY = -(Puzzle.elements.knuckleContainer.clientWidth / Puzzle.options.size) * Math.floor((Puzzle.elements.knuckles[elem]-1)/Puzzle.options.size);
               
                knElement.style.backgroundPositionX = `${pos}px`;
                knElement.style.backgroundPositionY = `${posY}px`;

                knElement.addEventListener("click", _changePosition);  
            } else {
                knElement.textContent = 0;
                knElement.classList.add("empty");
                knElement.style.order = elem;
                Puzzle.emptyElem.indexEmpty = elem;
                Puzzle.emptyElem.orderEmpty = elem;
            }
            
            fragment.appendChild(knElement);
            
    });
    return fragment;
}