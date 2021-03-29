export function pronunciation(e) {
    let audio;
    
    audio = e.currentTarget.closest('.flip-container').lastChild;
    if (!audio) return;
    audio.play();  
    
    let word = e.target.innerText;
    let saveData = '';

    if ( localStorage.getItem(word) ) {
      saveData = JSON.parse( localStorage.getItem(word) );
      saveData.click += 1;
    } else {
      saveData = {
        click: 1,
        correct: 0,
        wrong: 0
      }
    }

    const sItem = JSON.stringify(saveData);
    localStorage.setItem(word,sItem);
    
  }