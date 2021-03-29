import {Puzzle} from "./script.js";
import {_createMenu} from "./createMenu.js";

export function _bestScore(){
    let score = localStorage.getItem("bestScore");
    Puzzle.elements.wrap.innerHTML = "";

    if(typeof(score) === "string"){
      let arrScore = score.split(";");
      let arrScore2 = [];
      arrScore.forEach(elem => {
        if(elem !== "null"){
          let elemArr = elem.split(",");
          arrScore2.push(elemArr);
        }
      });

      arrScore2.sort(function (a, b) {
        return a[1] - b[1];
      });
      const wrap_best = document.createElement("div");
      wrap_best.classList.add("wrap_best");
      wrap_best.innerHTML = "<span>Move</span><span>Time</span>";
      Puzzle.elements.wrap.appendChild(wrap_best);

      const lineScore = document.createDocumentFragment();
      for(let i = 0; i < 10; i++) {
        for (let j=0; j<2; j++){
          const lineElement = document.createElement("span");
          if(arrScore2[i] !== undefined){
            if(j%2 === 0){
              lineElement.innerHTML = `${arrScore2[i][1]}`;
            } else {
              lineElement.innerHTML = `${arrScore2[i][0]}`;
            }
            lineScore.appendChild(lineElement);
          }
            
        }    
              
      }
      wrap_best.appendChild(lineScore);
    } else {
      let lineScore = document.createElement("div");
      lineScore.innerHTML = "Assemble the puzzle";
      Puzzle.elements.wrap.appendChild(lineScore);
    }

    let back = document.createElement("div");
    back.classList.add("back");
      back.innerHTML = "go back";

    Puzzle.elements.wrap.appendChild(back);

    document.querySelector(".back").addEventListener("click", function(){
    Puzzle.elements.wrap.innerHTML = "";
    _createMenu();});
    
  }