import { cards } from './cards.js';
import { Page } from './index.js';
import { main } from './main.js';
import { pronunciation } from './pronunciation.js';
import { startGame } from './startGame.js';
import { statistic } from './statistic.js';

export function createCategory(e){
    if ( e !== undefined) {
        Page.elements.category = e.currentTarget.textContent;
    }

    let indexOfList = cards[0].indexOf(Page.elements.category);
    Page.elements.main.textContent = '';

    const contain = document.createElement('div');
    contain.classList.add('wrap_container_stars');
    Page.elements.main.appendChild(contain);

    const containerStars = document.createElement('div');
    containerStars.classList.add('container_stars');
    contain.appendChild(containerStars);

    document.querySelector('header').style.marginBottom = "15px";

    if ( Page.elements.category === 'Main page' ) {
        document.querySelector('main').innerHTML = '';
        main();
    } else if (Page.elements.category === 'Statistics') {
        statistic();
    } else if ( Page.elements.category === 'Repeat difficult words' ){
        let listCards = Page.elements.listCards;

        listCards.sort(function(a,b){
            if ( a.answers > b.answers){
                return 1;
            } else if ( a.answers < b.answers ){
                return -1;
            } else {
                return 0;
            }
        });

        const difficultWords = [];

        listCards.forEach( elem => {
            if ( elem.answers !== 0 && elem.answers !== 100 && difficultWords.length !== 8 ){
                difficultWords.push(elem.word);
            }
        });

        if ( !difficultWords.length ){
            const message = document.createElement('div');
            message.classList.add('message');
            message.style.height = "50vh";
            message.style.marginTop = "20vh"
            message.textContent = "No difficult words";
            document.querySelector('main').appendChild(message);

            setTimeout(function(){
                document.querySelector('main').innerHTML = '';
                Page.init();
            }, 2000);
        } else {

            for ( let i = 1; i < cards.length; i++ ){
                for ( let j = 0; j < cards[i].length; j++ ){
                    for ( let a = 0; a < difficultWords. length; a++ ) {
                        if ( cards[i][j].word === difficultWords[a] ){
                            difficultWords.splice(a,1);
                            const cardOfCategory = document.createElement("article");
                            cardOfCategory.classList.add("flip-container");
                            cardOfCategory.innerHTML = `
                                <div class="flipper">
                                    <div class="front" style ="background-image: url('${cards[i][j].image}')">
                                        ${cards[i][j].word} <button class="button_rotate"></button>
                                    </div>
                                    <div class="back" style ="background-image: url('${cards[i][j].image}')">
                                        ${cards[i][j].translation}
                                    </div>
                                </div>`;

                            Page.elements.main.appendChild(cardOfCategory);

                            const audio = new Audio(cards[i][j].audioSrc);
                            audio.classList.add("audio_word");
                            cardOfCategory.appendChild(audio);

                            cardOfCategory.querySelector('.front').addEventListener('click', pronunciation);
                            break;
                        }
                    }
                }
            }
        }

    } else {
        for ( let i = 0; i < cards[indexOfList+1].length; i++ ){
            const cardOfCategory = document.createElement("article");
            cardOfCategory.classList.add("flip-container");
            cardOfCategory.innerHTML = `
                <div class="flipper">
                    <div class="front" style ="background-image: url('${cards[indexOfList+1][i].image}')">
                        ${cards[indexOfList+1][i].word} <button class="button_rotate"></button>
                    </div>
                    <div class="back" style ="background-image: url('${cards[indexOfList+1][i].image}')">
                        ${cards[indexOfList+1][i].translation}
                    </div>
                </div>`;

            Page.elements.main.appendChild(cardOfCategory);

            const audio = new Audio(cards[indexOfList+1][i].audioSrc);
            audio.classList.add("audio_word");
            cardOfCategory.appendChild(audio);

            cardOfCategory.querySelector('.front').addEventListener('click', pronunciation);

        }
    }

    let buttonsCards = document.querySelectorAll(".button_rotate");

    buttonsCards.forEach(elem => {
        elem.addEventListener('click', flipCard);
    });

    document.querySelector('main').addEventListener('mouseup', flipCard);
    const backCards = document.querySelectorAll(".back"); //flipper

    backCards.forEach(elem => {
        elem.addEventListener('mouseout', flipCard);
    });

    const flipperCards = document.querySelectorAll(".flip-container");

    flipperCards.forEach(elem =>{
        elem.addEventListener('mouseout', flipCard);
    });

    function flipCard(e) {
        if ( e.currentTarget.classList.contains('button_rotate') ){
            e.target.closest('.flip-container').addEventListener('mouseout', flipCard);
            let cardCategoty = e.target.closest('.flipper');
            cardCategoty.classList.add('flipper_active');
            setTimeout(function(){
                e.target.closest('.flip-container').removeEventListener('mouseout', flipCard);
            }, 400);
        } else if ( e.target.classList.contains('flip-container') ){
            let cardCategoty = e.currentTarget.querySelector('.flipper');
            cardCategoty.classList.remove('flipper_active');
        } else {
            let cardsCategoty = document.querySelectorAll('.flipper');
            cardsCategoty.forEach(elem => {
                elem.classList.remove('flipper_active');
            });
        }   
    }

    let listLinks = document.querySelectorAll(".link_category");
    listLinks.forEach(elem => {
        elem.classList.remove('link_active');
        if ( elem.textContent === Page.elements.category){
            elem.classList.add("link_active");
        }
    });

    if (Page.properties.playActive) {
        let frontCards = document.querySelectorAll(".front");
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