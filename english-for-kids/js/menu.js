import { Page } from './index.js';

export function menu(e){
    e.stopPropagation()

    let toggle = document.querySelector('.toggle-hamburger');
    let menuBlock = document.querySelector('.nav');

    if ( e.type === 'click' && e.currentTarget == toggle){

        Page.properties.menuActive = !Page.properties.menuActive;

        toggle.classList.contains("is-active") ? toggle.classList.remove("is-active") : toggle.classList.add("is-active");
        menuBlock.classList.contains("nav_active") ? menuBlock.classList.remove("nav_active") : menuBlock.classList.add("nav_active");
    } else if (e.type == 'click' && e.target !== menuBlock){

        toggle.classList.remove("is-active");
        menuBlock.classList.remove("nav_active");

    }
}