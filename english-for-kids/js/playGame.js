import { Page } from './index.js';
import { pronunciation } from './pronunciation.js';
import { startGame } from './startGame.js';
import { createCategory } from './category.js';

export function playGame(e){
    let trainContent = document.querySelector(".train_content");
    let playContent = document.querySelector(".play_content");
    let trainButton = document.querySelector(".train_button");
    let menu = document.querySelector(".nav");
    let categories = document.querySelectorAll(".category");
    let frontCards = document.querySelectorAll(".front");

    Page.properties.playActive = !Page.properties.playActive;

    if (e.target.classList.contains("train_slider_active")){
        e.target.classList.remove("train_slider_active");
        trainContent.classList.remove("train_content_active");
        playContent.classList.remove("play_content_active");
        trainButton.classList.remove("train_button_active");
        menu.classList.remove("nav_play_mode");
        if ( categories.length ) {
            categories.forEach(elem =>{
                elem.classList.remove("category_play_mode");
            });
        }
        if ( frontCards.length ) {
            createCategory();
        }       
    } else {
        e.target.classList.add("train_slider_active");   
        trainContent.classList.add("train_content_active");
        playContent.classList.add("play_content_active");
        trainButton.classList.add("train_button_active");
        menu.classList.add("nav_play_mode");
        if ( categories.length ) {
            categories.forEach(elem =>{
                elem.classList.add("category_play_mode");
            });
        }
        if ( frontCards.length ) {

            frontCards.forEach(elem =>{
                elem.removeEventListener('click', pronunciation);
                elem.classList.add('front_play_mode');
                elem.querySelector(".button_rotate").style.display = "none";
            });
            let buttonStart = document.createElement("button");
            buttonStart.textContent = "Start game";
            buttonStart.classList.add("start_game");
            if ( Page.elements.category !== "Statistics" && Page.elements.category !== "Main page"){
                document.querySelector('main').appendChild(buttonStart);
                buttonStart.addEventListener('click', startGame);
            }
        }
    }
}