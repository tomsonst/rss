import {_createArrKnuckles} from "./createarr.js";
import { _createKnuckles } from "./createKn.js";
import {_createMenu, _menuActive} from "./createMenu.js";
import {_dropPosition} from "./dropKn.js";




export const Puzzle = {
    elements: {
        knuckleContainer: null,
        knuckles: [],
        navContainer: null,
        wrap: null,
        time: "00:00",
        move: 0,
        menu: "menu",

    },

    emptyElem: {
      orderEmpty: 0,
      indexEmpty: null
    },

    options: {
      pause: false,
      size: 4,
      image: ""
    },

    sec: 0,
    min: "00",
    move: 0,
    sound: false,




    init() {
        _createArrKnuckles();
        
        if (typeof(localStorage.getItem("arr")) === "string"){
          this.elements.knuckles = [];
          let arr = localStorage.getItem("arr").split(",");
          arr.forEach(elem=>{
            this.elements.knuckles.push(+elem);
          });
          this.sec = localStorage.getItem("sec");
          this.min = localStorage.getItem("min");
          this.move = localStorage.getItem("move");
          this.options.size = +(localStorage.getItem("size"));
        }
        this.elements.knuckleContainer = document.createElement("div");

        this.elements.navContainer = document.createElement("nav");
        this.elements.time = document.createElement("div");
        this.elements.move = document.createElement("div");
        this.elements.menu = document.createElement("div");
        

        this.elements.knuckleContainer.classList.add("area");
        this.elements.navContainer.classList.add("nav");

        
        this.elements.time.classList.add("time");
        this.elements.move.classList.add("move");
        this.elements.menu.classList.add("menu");

        const audio = new Audio("sounds/svipper.mp3");
        document.body.appendChild(audio);


        document.body.appendChild(this.elements.navContainer);
        document.body.appendChild(this.elements.knuckleContainer);
        this.elements.navContainer.appendChild(this.elements.time);
        this.elements.navContainer.appendChild(this.elements.move);
        this.elements.navContainer.appendChild(this.elements.menu);

        this.elements.wrap = document.createElement("div");
        this.elements.wrap.classList.add("wrap");
        this.elements.knuckleContainer.appendChild(this.elements.wrap);
        _createMenu();

        this.elements.knuckleContainer.appendChild(_createKnuckles());

        this.elements.knuckleContainer.addEventListener("dragstart", function(e){
          e.target.classList.add("selected");
        });

        this.elements.knuckleContainer.addEventListener("dragend", function(e){
          e.target.classList.remove("selected");
        });

        this.elements.knuckleContainer.addEventListener("dragover", _dropPosition);

        setInterval(function(){
          Puzzle.elements.time.textContent = `${Puzzle.min}:${Puzzle.sec}`;
          },1000);
        this.elements.move.textContent = this.move;
        this.elements.menu.textContent = "menu";
        this.elements.menu.addEventListener("click", _menuActive);

    },

};

window.addEventListener("DOMContentLoaded", function () {
    Puzzle.init();
  });

  getTime();

  function getTime(){
    if(!Puzzle.options.pause){
        +Puzzle.sec++;
      if(+Puzzle.sec < 10){
        Puzzle.sec = "0" + Puzzle.sec;
      } else if(+Puzzle.sec === 60){
          +Puzzle.min++;
          Puzzle.sec = "00";
          if(+Puzzle.min<10){
          Puzzle.min = "0" + Puzzle.min;
        }
      }
    }
    setTimeout(getTime, 1000);
  }

