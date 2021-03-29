import { cards } from './cards.js';
import { sortCards } from './sortCards.js';
import { Page } from './index.js';
import { createCategory } from './category.js';

export function statistic(){
    const buttons = document.createElement('div');
    buttons.classList.add('container_buttons');
    buttons.innerHTML = `<button class="btn_difficult_word">Repeat difficult words</button>
    <button class="reset">Reset</button>`;
    document.querySelector('main').appendChild(buttons);

    const reset = document.querySelector('.reset');
    reset.addEventListener('click', function(){
        document.querySelector('main').textContent = '';
        document.querySelector('header').style.marginBottom = "55px";
        localStorage.clear();
        statistic();
    });

    const trainDifficultWords = document.querySelector('.btn_difficult_word');
    trainDifficultWords.addEventListener('click', createCategory);

    const table = document.createElement('table');
    table.classList.add('table');

    table.innerHTML = ` <caption class="table_title">Cards</caption>
    <tr>
      <td class="table_sort">Word</td>
      <td class="table_sort">Translation</td>
      <td class="table_sort">Category</td>
      <td class="table_sort">Clicks</td>
      <td class="table_sort">Correct</td>
      <td class="table_sort">Wrong</td>
      <td class="table_sort">%</td>
    </tr>`;

    document.querySelector('main').appendChild(table);

    let countTr = 0;

    let listCards = [];

    for (let i = 1; i < cards.length; i++){
        for(let j = 0; j < cards[i].length; j++){
            let data = '';
            if ( localStorage.getItem(cards[i][j].word) ){
                data = JSON.parse(localStorage.getItem(cards[i][j].word));
            } else {
                data = {
                    click: 0,
                    correct: 0,
                    wrong: 0
                  }
            }

            let answers = 0;
            
            if ( data.correct || data.wrong){
                answers = data.correct / ((data.wrong + data.correct) / 100);
                answers = Math.round(answers * 100) /100;
            }

            let tr = document.createElement('tr');
            tr.classList.add('tr_content');
            countTr++;
            countTr % 2 == 1 ? tr.style.backgroundColor = "white" : false;
            tr.innerHTML = `
            <td class="table_content">${cards[i][j].word}</td>
            <td class="table_content">${cards[i][j].translation}</td>
            <td class="table_content">${cards[0][i-1]}</td>
            <td class="table_content">${data.click}</td>
            <td class="table_content">${data.correct}</td>
            <td class="table_content">${data.wrong}</td>
            <td class="table_content">${answers}</td>`;

            document.querySelector('tbody').appendChild(tr);

            let card = {
                word: cards[i][j].word,
                translation: cards[i][j].translation,
                category: cards[0][i-1],
                clicks: data.click,
                correct: data.correct,
                wrong: data.wrong,
                answers: answers,
            }

            listCards.push(card);
        }
    }
    Page.elements.listCards = listCards;

    const buttonsSort = document.querySelectorAll('.table_sort');
    buttonsSort.forEach(elem => {

        elem.addEventListener('click', sortCards);
        
    });

}