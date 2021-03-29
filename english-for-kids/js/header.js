import { Page } from './index.js';

export function header(){
    Page.elements.header = document.createElement("header");
        Page.elements.header.classList.add("header");
        Page.elements.header.innerHTML = `
        <button class="toggle-hamburger toggle-hamburger__animx">
            <span>menu toggle</span>
        </button>
        <h1>English for kids</h1>
        <button class="train_button">
            <span class="train_content">TRAIN</span>
            <span class="train_slider"></span>
            <span class="play_content">PLAY</span>
         </button>
        `;

    document.body.appendChild(Page.elements.header);
    
}