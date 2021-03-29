import {Puzzle} from "./script.js";
import {_createMenu} from "./createMenu.js";

export function _getSetting(){
    Puzzle.elements.wrap.innerHTML = "";
      Puzzle.elements.wrap.innerHTML = `
      <span class="size_3">3 x 3</span>
      <span class="size_4">4 x 4</span>
      <span class="size_5">5 x 5</span>
      <span class="size_6">6 x 6</span>
      <span class="size_7">7 x 7</span>
      <span class="size_8">8 x 8</span>
      <div class="back">go back</div>`;

      for(let i = 0; i< Puzzle.elements.wrap.children.length; i++){
        Puzzle.elements.wrap.children[i].addEventListener("click", function(e){
          if(e.target.classList[0] === "back"){
            Puzzle.elements.wrap.innerHTML = "";
            _createMenu();
          } else {
            if(e.target.classList[0] === "size_3"){
              Puzzle.options.size = 3;
            } else if(e.target.classList[0] === "size_4"){
              Puzzle.options.size = 4;
            } else if(e.target.classList[0] === "size_5"){
              Puzzle.options.size = 5;
            } else if(e.target.classList[0] === "size_6"){
              Puzzle.options.size = 6;
            } else if(e.target.classList[0] === "size_7"){
              Puzzle.options.size = 7;
            } else if(e.target.classList[0] === "size_8"){
              Puzzle.options.size = 8;
            }
            document.body.innerHTML = "";
            localStorage.removeItem("arr");
            localStorage.removeItem("image");

    
            Puzzle.sec = "00";
            Puzzle.min = "00";
            Puzzle.move = 0;
            
            
            Puzzle.options.pause = false;
            Puzzle.init();
          }
        });
      }   
  }