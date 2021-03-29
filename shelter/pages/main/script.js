/*let requestURL = '../../assets/pets.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();*/

let jsonObj = [
    {
      "name": "Jennifer",
      "img": "../../assets/images/jennifer.png",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Sophia",
      "img": "../../assets/images/sophia.png",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Woody",
      "img": "../../assets/images/woody.png",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"]
    },
    {
      "name": "Scarlett",
      "img": "../../assets/images/scarlett.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Katrine",
      "img": "../../assets/images/katrine.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Timmy",
      "img": "../../assets/images/timmy.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"]
    },
    {
      "name": "Freddie",
      "img": "../../assets/images/freddie.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Charly",
      "img": "../../assets/images/charly.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
      "diseases": ["deafness", "blindness"],
      "parasites": ["lice", "fleas"]
    }
  ];

let navBtn = document.querySelector(".nav-btn");
let wr = document.querySelector("body > div");
let wrBlockPopup = document.querySelector("body > div.wrblockPopup");
let blockPopup = document.querySelector("body > div.wrblockPopup > div");
let slogonBtn = document.querySelector("body > section > article > article > button");
let ourFriendsBtn = document.querySelector("body > main > section.our-friends > button");
let isActiveMenu = true;
let isCreatePopup = true;
let slideArrowRight = document.querySelector("body > main > section.our-friends > article > div.arrow.arrow-right");
let slideArrowLeft = document.querySelector("body > main > section.our-friends > article > div.arrow.arrow-left");
let petsBlock = document.getElementsByClassName("pets-info");
let btnPopup = document.querySelector(".btnPopup");


const activeNav = function() {
    if (isActiveMenu){
      document.body.style.overflowY = "hidden";
        navBtn.classList.add('nav-btn-active');
        document.querySelector("body > section > header > nav").classList.add('nav-active');
        document.querySelector("body > section > header > section").classList.add('logo-active');
        document.querySelector("body > div").style.display = "block";
        isActiveMenu = false;
    } else {
      document.body.style.overflowY = "scroll";
        navBtn.classList.remove('nav-btn-active');
        document.querySelector("body > section > header > nav").classList.remove('nav-active');
        document.querySelector("body > section > header > section").classList.remove('logo-active');
        document.querySelector("body > div").style.display = "none";
        isActiveMenu = true;

    }
}
let prevSlide = [];

let slideBlock = document.getElementsByClassName('pets-info');

const generetionSlide = function () {
  for(let i = 0; i < slideBlock.length; i++){
      slideBlock[i].innerHTML = `<img src=${jsonObj[i].img}>
      <span class="name-pets">${jsonObj[i].name}</span>
      <button class="name-pets-btn">Learn more</button>`;
      prevSlide.push(jsonObj[i]);
  }
}

const wrapperPets = document.querySelector('.wrapper-pets');
const changeSlide = function(e){
    let i = 0;
    let countSlide = [];

    /*if(e.target === slideArrowRight){*/
      while(i<3){
          item = jsonObj[Math.floor(Math.random()*jsonObj.length)];
          if(!(countSlide.includes(item)) && !(prevSlide.includes(item))){
            wrapperPets.insertAdjacentHTML('beforeend', `<div class="pets-info">
            <img src=${item.img}>
              <span class="name-pets">${item.name}</span>
              <button class="name-pets-btn">Learn more</button>
          </div>`);
              countSlide.push(item);
              prevSlide.push(item);
              i++;
          }
      }
      countSlide = [];
      prevSlide = prevSlide.slice(3);
      for (let i = 0; i<slideBlock.length; i++){
        slideBlock[i].classList.add('slideRight');
      }
      setTimeout(function(){
          for (let i=0; i<3; i++){
          slideBlock[0].remove();
          }
        }, 3000);
    } /*else {
      while(i<3){
        item = jsonObj[Math.floor(Math.random()*jsonObj.length)];
        if(!(countSlide.includes(item)) && !(prevSlide.includes(item))){
          wrapperPets.insertAdjacentHTML('afterbegin', `<div class="pets-info">
          <img src=${item.img}>
            <span class="name-pets">${item.name}</span>
            <button class="name-pets-btn">Learn more</button>
        </div>`);
            countSlide.push(item);
            prevSlide.push(item);
            i++;
        }
      }*/
      countSlide = [];
      prevSlide = prevSlide.slice(3);
      /*for (let i = 0; i<slideBlock.length; i++){
        slideBlock[i].classList.add('slideLeft');
      }
      setTimeout(function(){
        for (let i=0; i<3; i++){
        slideBlock[slideBlock.length-1].remove();
        }
      }, 3000);
    }
}*/

const changeUrl = function() {
    window.location.href = '../pets/index.html';
}

const createPopup = function(event){
  console.log('create');
  document.body.style.overflowY = 'hidden';
    if(isCreatePopup){
        nameObj = event.currentTarget.getElementsByClassName('name-pets')[0].innerText;
        itemJsonObj = {};
        for (let i =0;i<jsonObj.length; i++){
            if(jsonObj[i].name === nameObj){
                itemJsonObj = jsonObj[i];
            }
        }
        wrBlockPopup.style.display = "flex";
        document.querySelector("body > div > div").style.display = "flex";
        document.querySelector("body > div.wrblockPopup > div").innerHTML = `<div class="popupImg"><img src=${itemJsonObj.img} alt="dog" class="blockPopupImg"></div>
        <article class="blockPopupContent">
          <h3>${itemJsonObj.name}</h3>
          <span>${itemJsonObj.type} - ${itemJsonObj.breed}</span>
          <p class="subscribe-pets">${itemJsonObj.description}</p>
          <ul>
            <li><span><b>Age:</b> ${itemJsonObj.age}</span></li>
            <li><span><b>Inoculations:</b> ${itemJsonObj.inoculations}</span></li>
            <li><span><b>Diseases:</b> ${itemJsonObj.diseases}</span></li>
            <li><span><b>Parasites:</b> ${itemJsonObj.parasites}</span></li>
          </ul>
          <div class="btnPopup"></div>
        </article>`;
        isCreatePopup = false;
    } else {
        console.log(event.target);
        if(event.target === wrBlockPopup || event.target === document.querySelector(".btnPopup")) {
          document.body.style.overflowY = 'scroll';
          wrBlockPopup.style.display = "none";
          document.querySelector("body > div > div").style.display = "none";
          isCreatePopup = true;
        }
    }
    
}

const changeStyleBtnPopup = function(e) {
  console.log('change');
  if(e.target === wrBlockPopup){
    document.querySelector(".btnPopup").classList.add('btnPopuphover');
  } else {
    document.querySelector(".btnPopup").classList.remove('btnPopuphover');
  }
}

document.addEventListener('DOMContentLoaded', generetionSlide);
navBtn.addEventListener("click", activeNav);
wr.addEventListener("click", activeNav);

wrBlockPopup.addEventListener("click", createPopup);
document.querySelector(".btnPopup").addEventListener("click", createPopup);
wrBlockPopup.addEventListener("mouseover", changeStyleBtnPopup);

slogonBtn.addEventListener("click", changeUrl);
ourFriendsBtn.addEventListener("click", changeUrl);

slideArrowRight.addEventListener("click", changeSlide);
slideArrowLeft.addEventListener("click", changeSlide);

setInterval(function(){for(let i =0; i<petsBlock.length; i++){
    petsBlock[i].addEventListener("click", createPopup);
}
}, 1000);




