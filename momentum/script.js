const name = document.querySelector('.name');
const focus = document.querySelector('.focus');
const slideLeft = document.querySelector('.slider-left');
const slideRight = document.querySelector('.slider-right');

//create array with random index for BGimages

function createRandomImages() {
    let arrBGImages = [];
    while(arrBGImages.length <6) { 
        let i = Math.floor(Math.random()*20);
        if (i < 10){
            i = '0' + i;
        }
          if (!(arrBGImages.includes(i)) && i !== '00'){
              arrBGImages. push(i);
          }
     }
     return arrBGImages;
  }

const arrBGImages = createRandomImages();

function getTime(){
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    if(minutes === 0 && seconds === 0){
        getGreeting();
        getBG();
    }
    document.querySelector('.time').innerHTML = `${date.toLocaleDateString('en-EN', options)}<br>${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)}`;
    setTimeout(getTime, 1000);
}

function getGreeting(){
    const date = new Date();
    const hour = date.getHours();
    if (hour < 6) {
        document.querySelector('.greeting').innerText = 'Good Night, ';
    } else if (hour < 12){
        document.querySelector('.greeting').innerText = 'Good Morning, ';
    } else if (hour < 18){
        document.querySelector('.greeting').innerText = 'Good Afternoon, ';
    } else {
        document.querySelector('.greeting').innerText = 'Good Evening, ';
    }
}

// CHANGE BACKGROUND IMAGES

const date = new Date();
let hour = date.getHours();

function changeIndexBG(e) {
    if(e.target === slideRight){
        hour = Number(hour) + 1;
    } else {
        hour = Number(hour) - 1;
    }
    if(hour > 23){
        hour = hour % 24;
    } else if (hour === -1){
        hour = 23;
    }
    getBG();
    
}

function getBG(){
    const dateBG = new Date();
    let hourBG = dateBG.getHours();
    if(dateBG.getMinutes() === 0 && dateBG.getSeconds() === 0){
        hour ++;
    }
    if (hourBG !== hour){
        hourBG = hour;
    }


    let srcImage = '';

    if (hourBG < 6) {
        srcImage = `assets/images/night/${arrBGImages[hourBG%6]}.jpg`;
    } else if (hourBG < 12){
        srcImage = `assets/images/morning/${arrBGImages[hourBG%6]}.jpg`;
    } else if (hourBG < 18){
        srcImage = `assets/images/day/${arrBGImages[hourBG%6]}.jpg`;
    } else {
        srcImage = `assets/images/evening/${arrBGImages[hourBG % 6]}.jpg`;
    }
        const body = document.querySelector('body');
        const src = srcImage;
        const img = document.createElement('img');
        img.src = src;
        img.onload = () => {      
            body.style.backgroundImage = `url(${src})`;
          }; 
        slideLeft.style.pointerEvents='none';
        slideRight.style.pointerEvents='none';

        console.log(hourBG, dateBG.getSeconds());
        setTimeout(function() { 
            slideLeft.style.pointerEvents='auto';
            slideRight.style.pointerEvents='auto';
        }, 1000);

}

function addZero(s) {
    return (parseInt(s, 10) < 10 ? '0': '') + s;
}

//NAME

const setName = function(e) {
    if(e.type === 'click'){
        name.innerText = '';
    }
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if(name.textContent === '' || !(name.textContent).match(/[a-zа-я]/)){
                if(localStorage.getItem('name')){
                    name.innerText =localStorage.getItem('name');
                } else {
                    name.innerText = "[Enter Name]";
                }
            } else {
                localStorage.setItem('name', e.target.innerText);
            }
            if(name.textContent === ''){
                name.innerText = "[Enter Name]";
            } else {
                localStorage.setItem('name', e.target.innerText);
            }
            name.blur();
          }
    } else if(e.type === 'blur') {
        if(name.textContent === '' || !(name.textContent).match(/[a-zа-я]/)){
            if(localStorage.getItem('name')){
                name.innerText =localStorage.getItem('name');
            } else {
                name.innerText = "[Enter Name]";
            }
        } else {
            name.innerText = localStorage.getItem('name');
        }
    }
}

const getName = function () {
    if (!(localStorage.getItem("name"))){
        name.textContent = 'Enter Name';
    } else {
        name.textContent = localStorage.getItem("name");
        getWeather();
    } 
}

//FOCUS

const setFocus = function(e) {
    if(e.type === 'click'){
        focus.innerText = '';
    }
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) { if(focus.textContent === '' || !(focus.textContent).match(/[a-zа-я]/)){
                if(localStorage.getItem('focus')){
                    focus.innerText =localStorage.getItem('focus');
                } else {
                    focus.innerText = "[Enter Focus]";
                }
            } else {
                localStorage.setItem('focus', e.target.innerText);
            }
            if(focus.textContent === ''){
                focus.innerText = "[Enter Focus]";
            } else {
                localStorage.setItem('focus', e.target.innerText);
            }
                  focus.blur();
          }
    } else if(e.type === 'blur') {
        if(focus.textContent === '' || !(focus.textContent).match(/[a-zа-я]/)){
            if(localStorage.getItem('focus')){
                focus.innerText =localStorage.getItem('focus');
            } else {
                focus.innerText = "[Enter Focus]";
            }
        } else {
            focus.innerText = localStorage.getItem('focus');
        }
    }
}

const getFocus = function () {
    if (!(localStorage.getItem("focus"))){
        focus.textContent = 'Enter Focus';
    } else {
        focus.textContent = localStorage.getItem("focus");
        getWeather();
    } 
}


//QUOTE


const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');

async function getQuote() {  
  const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
  const res = await fetch(url);
  const data = await res.json(); 
  let i = Math.floor(Math.random()*100);
  if(data.quotes[i].quote.length > 100){
    getQuote();
  } else {
    blockquote.textContent = data.quotes[i].quote;
    figcaption.textContent = data.quotes[i].author;
  }
}

// GET WEATHER

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

function getCity(){
    if (!(localStorage.getItem("city"))){
        city.textContent = 'Enter City';
    } else {
        city.textContent = localStorage.getItem("city");
        document.querySelector('.error-city').style.display = "none";
        getWeather();
    } 
}

function setCity(e){
    document.querySelector('.error-city').style.display = "none";
    if(e.type === 'click'){
        city.innerText = '';
    }
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) { 
            if(city.textContent === '' || !(city.textContent).match(/[a-zа-я]/)){
            if(localStorage.getItem('city')){
                city.innerText =localStorage.getItem('city');
            } else {
                city.innerText = "[Enter City]";
            }
        } else {
            localStorage.setItem('city', e.target.innerText);
            getWeather(); 
        }
        if(city.textContent === ''){
            city.innerText = "[Enter city]";
        } else {
            localStorage.setItem('city', e.target.innerText);
        }
              city.blur();
      }
    } else if(e.type === 'blur') {
        if(city.textContent === '' || !(city.textContent).match(/[a-zа-я]/)){
            if(localStorage.getItem('city')){
                city.innerText =localStorage.getItem('city');
            } else {
                city.innerText = "[Enter City]";
            }
        } else {
            city.innerText = localStorage.getItem('city');
        }
    }
}


const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

async function getWeather(){
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem('city')}&&lang=en&appid=89bdd39ee096fa9f10de10648fadb5d1&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
    
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind speed: ${data.wind.speed} m/sec`;
    } catch(e){
        document.querySelector('.error-city').style.display = "inline-block";
    }
    setTimeout(getWeather, 100000);
}

document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);


name.addEventListener('click', setName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('click', setFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);



slideRight.addEventListener('click', changeIndexBG);
slideLeft.addEventListener('click', changeIndexBG);

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('click', setCity);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

getTime();
getName();
getFocus();
getCity();
getWeather();
getGreeting();
getBG();
getQuote();

