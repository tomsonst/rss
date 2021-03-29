import {Puzzle} from "./script.js";

export function _createArrKnuckles(){
    Puzzle.elements.knuckles = [];
    let i =0;
    while(i<Puzzle.options.size*Puzzle.options.size){
      let num = Math.floor(Math.random()*100);
      if(num < Puzzle.options.size*Puzzle.options.size && !Puzzle.elements.knuckles.includes(num)){
        Puzzle.elements.knuckles.push(num);
        i++;
      }
    }
    let count = 0;
    for(let i = 0; i<Puzzle.elements.knuckles.length;i++){
      if(Puzzle.elements.knuckles[i] !== 0){
        for(let j = i; j < Puzzle.elements.knuckles.length; j++){
          if(Puzzle.elements.knuckles[i] > Puzzle.elements.knuckles[j] && Puzzle.elements.knuckles[j] !== 0){
            count++;
          } 
        }
      } else if(Puzzle.elements.knuckles[i] === 0 && Puzzle.options.size%2 === 0){
          let row= 0;
          if((i+1)%Puzzle.options.size === 0){
            row= (i+1)/Puzzle.options.size;
          } else {
            row= Math.floor((i+1)/Puzzle.options.size+1);
          }
          count =count + row;              
      }     
    }

    if(!(count%2 === 0)) {
      _createArrKnuckles();
    }
}