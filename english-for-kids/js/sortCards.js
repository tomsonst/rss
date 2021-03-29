import { Page } from './index.js';

export function sortCards(e){

    let columnSort = e.target.innerText == '%' ? 'answers' : e.target.innerText.toLowerCase();
    let listCards = Page.elements.listCards;

    listCards.sort(function(a,b){      
        if ( a[columnSort] > b[columnSort]){
            return 1;
        } else if ( a[columnSort] < b[columnSort] ){
            return -1;
        } else {
            return 0;
        }
    });

    if ( typeof(listCards[0][columnSort]) === 'number'){
        listCards.reverse();
    }

    let trContent = document.querySelectorAll('.tr_content');
    trContent.forEach(elem => {
        elem.remove();
    });

    if ( e.target.children.length !== 0 ){
        if ( e.target.lastChild.classList.contains('arrow_active') ){
            e.target.lastChild.classList.remove('arrow_active')
        } else{
            e.target.lastChild.classList.add('arrow_active');
            listCards.reverse();
        }
    } else {
        let buttonsSort = document.querySelectorAll('.arrow');
        buttonsSort.forEach(elem => { elem.remove(); });
        const arrow = document.createElement('div');
        arrow.classList.add('arrow');
        e.target.appendChild(arrow);
    }

    let countTr = 0;
    listCards.forEach(elem => {
        let tr = document.createElement('tr');
        tr.classList.add('tr_content');
        countTr++;
        countTr % 2 == 1 ? tr.style.backgroundColor = "white" : false;
        tr.innerHTML = `
        <td class="table_content">${elem.word}</td>
        <td class="table_content">${elem.translation}</td>
        <td class="table_content">${elem.category}</td>
        <td class="table_content">${elem.clicks}</td>
        <td class="table_content">${elem.correct}</td>
        <td class="table_content">${elem.wrong}</td>
        <td class="table_content">${elem.answers}</td>`;

        document.querySelector('tbody').appendChild(tr);
    });
}