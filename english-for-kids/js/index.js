//import './style.css';
import { createCategory } from './category.js';
import { main } from './main.js';
import { menu } from './menu.js';
import { playGame } from './playGame.js';

export const Page = {
    elements: {
        main: '', 
        category: '',
        listCards: [],
    },

    properties: {
        menuActive: false,
        playActive: false,
        countError: 0,
    },

    init() {
        main();

        let toggle = document.querySelector(".toggle-hamburger");

        toggle.addEventListener('click', menu);
        document.body.addEventListener('click', menu);

        let listLinks = document.querySelectorAll(".link_category");
        listLinks.forEach(elem => {
            elem.addEventListener('click', createCategory);
        });

        let trainSlider = document.querySelector(".train_slider");
        trainSlider.addEventListener('click', playGame);
    },
}

window.addEventListener("DOMContentLoaded", function () {
    Page.init();
  });
