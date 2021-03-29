import { Page } from './index.js';
import { cards } from './cards.js';
import { createCategory } from './category.js';

export function main(){
    document.querySelector('header').style.marginBottom = "55px";

    Page.elements.main = document.querySelector("main");
    for ( let i = 0; i < cards[0].length; i++ ){
        const card = document.createElement("article");
        card.classList.add("category");
        if ( Page.properties.playActive) {
            card.classList.add("category_play_mode");
        }
        const categoryBottom = document.createElement("div");
        categoryBottom.classList.add("category_bottom");
        categoryBottom.textContent = cards[0][i];

        const categotyImg = document.createElement("div");
        categotyImg.classList.add("category_img");
        categotyImg.style.backgroundImage = `url("${cards[i+1][i].image}")`;

        card.appendChild(categoryBottom);
        card.appendChild(categotyImg);

        card.addEventListener('click', createCategory);
        
        Page.elements.main.appendChild(card);
    }
}