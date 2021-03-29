import { Page } from "./index.js";

export function startGame(e){
    Page.properties.countError = 0;
    const buttonStartRepeat = e.target;
    buttonStartRepeat.classList.add('start_game_active');

    let audioCorrect = new Audio('audio/correct.mp3');
    let audioError = new Audio('audio/error.mp3');

    let audioSmileBad = new Audio('audio/failure.mp3');
    let audioSmileGood = new Audio('audio/success.mp3');
    document.body.appendChild(audioCorrect);
    document.body.appendChild(audioError);

    let audioList = document.querySelectorAll('.audio_word');
    let randomAudioList = [];

    while ( randomAudioList.length < audioList.length){ 

        let index = Math.floor(Math.random() * 10);

        if ( index < audioList.length && !randomAudioList.includes(audioList[index])){
            randomAudioList.push(audioList[index]);
        }
    }
    const containerStars = document.querySelector('.container_stars');
    let audio = randomAudioList[randomAudioList.length-1];
    audio.play();
    
    buttonStartRepeat.removeEventListener('click', startGame);
    buttonStartRepeat.addEventListener('click', function(){
        audio.play();
    });


    let frontCards = document.querySelectorAll('.front');
    frontCards.forEach( elem => {

        elem.addEventListener('click', correctError);

    });

    function correctError(e){

        if ( e.target.closest('.flip-container').lastChild == audio ){
            let word = e.target.innerText;
            let saveData = '';

            if ( localStorage.getItem(word) ) {
                saveData = JSON.parse( localStorage.getItem(word) );
            } else {
                saveData = {
                    click: 0,
                    correct: 0,
                    wrong: 0
                }
            }
            audioCorrect.play();
            e.target.removeEventListener('click', correctError);
            e.target.style.opacity = "0.6";
            randomAudioList.pop();

            saveData.correct += 1;

            const sItem = JSON.stringify(saveData);
            localStorage.setItem(word,sItem);

            if(randomAudioList.length === 0){
                const main = document.querySelector('main');
                main.innerHTML = '';
                document.querySelector('footer').style.display = "none";
                let message  = document.createElement('span');
                let smile = document.createElement('div');
                message.classList.add('message');

                if(Page.properties.countError !== 0){
                    message.textContent = `Errors: ${Page.properties.countError}`;
                    smile.classList.add('smile_bad');

                    audioSmileBad.play();
                } else {
                    message.textContent = "Win!";
                    smile.classList.add('smile_good');

                    audioSmileGood.play();
                }

                main.appendChild(message)
                main.appendChild(smile);
                setTimeout(function(){
                    message.remove();
                    smile.remove();
                    document.querySelector('footer').style.display = "flex";
                    Page.init();

                }, 3000);
            }

            const starWin = document.createElement('div');
            starWin.classList.add('star_win');
            
            containerStars.appendChild(starWin);

            if ( randomAudioList.length ) {
                audio = randomAudioList[randomAudioList.length-1];
                setTimeout(function(){audio.play();}, 1000);
            }
        } else {
            let word = '';
            let saveData = '';

            for ( let i = 0; i < frontCards.length; i++){
                if ( frontCards[i].closest('.flip-container').lastChild == audio ){
                    word = frontCards[i].innerText;
                    break;
                }
            }
            if ( localStorage.getItem(word) ) {
                saveData = JSON.parse( localStorage.getItem(word) );
            } else {
                saveData = {
                    click: 0,
                    correct: 0,
                    wrong: 0
                }
            }

            audioError.play();
            const starError = document.createElement('div');
            starError.classList.add('star');
            
            containerStars.appendChild(starError);
            Page.properties.countError +=1;

            saveData.wrong += 1;
            

            const sItem = JSON.stringify(saveData);
            localStorage.setItem(word,sItem);
        }
    }
}

