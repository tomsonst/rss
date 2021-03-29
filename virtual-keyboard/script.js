let keyLayout = [
    ["1", "!", "1", "!"], ["2", "@", "2", `"`], ["3", "#", "3", "№"], ["4", "$", "4", ";"], ["5", "%", "5", "%"], ["6", "^", "6", ":"], ["7", "&", "7", "?"], ["8", "*", "8", "*"], ["9", "(", "9", "("], ["0", ")", "0", ")"], "backspace",
    ["q", null, "й", null], ["w", null, "ц", null], ["e", null, "у", null], ["r", null, "к", null], ["t", null, "е", null], ["y", null, "н", null], ["u", null, "г", null], ["i", null, "ш", null], ["o", null, "щ", null], ["p", null, "з", null], ["[", "{", "х", null], ["]", "}", "ъ", null],
    "caps", ["a", null, "ф", null], ["s", null, "ы", null], ["d", null, "в", null], ["f", null, "а", null], ["g", null, "п", null], ["h", null, "р", null], ["j", null, "о", null], ["k", null, "л", null], ["l", null, "д", null], [";", ":", "ж", null], [`'`, `"`, "э", null], "enter",
    "done", ["z", null, "я", null], ["x", null, "ч", null], ["c", null, "с", null], ["v", null, "м", null], ["b", null, "и", null], ["n", null, "т", null], ["m", null, "ь", null], [",", "<", "б", null], [".",">", "ю", null], ["?", "/", ".", ","],
    "shift", "en", "space", "volume", "voice", "arrow-left", "arrow-right"
];

/*const keyLayoutRu = [
    ["1", "!"], ["2", `"`], ["3", "№"], ["4", ";"], ["5", "%"], ["6", ":"], ["7", "?"], ["8", "*"], ["9", "("], ["0", ")"], "backspace",
    "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
    "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
    "done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", [".", ","],
    "shift", "ru", "space", "volume", "voice"
];*/


const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    properties: {
        value: "",
        capsLock: false,
        shift: false, 
        lang: false,
        volume: false,
        voice: false
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    recognition: '',

    init() {
        this.elements.main = document.createElement("div");
        this.elements. keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        document.body.appendChild(this.elements.main);
        this.elements.main.appendChild(this.elements.keysContainer);


        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
              this.open(element.value, currentValue => {
                element.value = currentValue + "";
              });
            });
        });
        document.addEventListener('keydown', this.lightButton);
        document.addEventListener('keyup', this.lightButton);
        this.createRecognition();
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();



        function createIconHTML(icon_name) {
            return `<i class="material-icons">${icon_name}</i>`;
        }

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "]", "enter", "?"].indexOf(key) !== -1;
            const outputText = document.querySelector(".use-keyboard-input");
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key){
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide", "back");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length -1);
                        this._triggerEvent("oninput");
                        outputText.focus();
                        outputText.setSelectionRange(outputText.selectionStart, outputText.selectionStart);
                    });
                    keyElement.addEventListener("click", this.playSound);

                break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "caps");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");
          
                    keyElement.addEventListener("click", () => {
                      this._toggleCapsLock();
                      keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });
                    keyElement.addEventListener("click", this.playSound);
                
                break;

                case "shift":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "sh");
                    keyElement.innerHTML = createIconHTML("eject");
                    keyElement.addEventListener("click", () => {
                        this._toggleShift();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
                    });
                    keyElement.addEventListener("click", this.playSound);

                break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide", "ent");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                        outputText.focus();
                        outputText.setSelectionRange(outputText.selectionStart, outputText.selectionStart);
                    });
                    keyElement.addEventListener("click", this.playSound);
                
                break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide", "spa");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                        outputText.setSelectionRange(outputText.selectionStart, outputText.selectionStart);
                        outputText.focus();
                    });
                    keyElement.addEventListener("click", this.playSound);
                
                break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });
                
                break;

                case "en":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--lang", "lang");
                    keyElement.innerHTML = createIconHTML("language");

                    keyElement.addEventListener("click", () => {
                        this._toggleLang();
                        keyElement.classList.toggle("keyboard__key--lang-active", this.properties.lang);
                    });

                break;

                case "volume":
                    keyElement.classList.add("keyboard__key--wide","keyboard__key--activatable", "volume");
                    keyElement.innerHTML = createIconHTML("volume_off");

                    keyElement.addEventListener("click", () => {
                        this.properties.volume = !this.properties.volume;
                        keyElement.classList.toggle("keyboard__key--active", this.properties.volume);
                    });

                break;

                case "voice":
                    keyElement.classList.add("keyboard__key--wide","keyboard__key--activatable", "voice");
                    keyElement.innerHTML = createIconHTML("keyboard_voice");

                    keyElement.addEventListener("click", () => {
                        this.properties.voice = !this.properties.voice;
                        this.properties.voice ? this.startR(): this.stopR();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.voice);
                    });

                break;

                case "arrow-left":
                    keyElement.classList.add("keyboard__key");
                    keyElement.innerHTML = createIconHTML("arrow_left");
                    keyElement.addEventListener("click", () => {
                        outputText.setSelectionRange(outputText.selectionStart-1, outputText.selectionStart-1);
                        outputText.focus();
                    });
                break;

                case "arrow-right":
                    keyElement.classList.add("keyboard__key");
                    keyElement.innerHTML = createIconHTML("arrow_right");
                    keyElement.addEventListener("click", () => {
                        outputText.setSelectionRange(outputText.selectionStart+1, outputText.selectionStart+1);
                        outputText.focus();
                    });
                break;

                default:
                    if(typeof(key) === 'object'){
                        keyElement.textContent = key[0].toLowerCase();
                    } else {
                        keyElement.textContent = key.toLowerCase();
                    }

                    keyElement.addEventListener("click", () => {
                       
                        if ((this.properties.capsLock && !this.properties.shift) || (!this.properties.capsLock && this.properties.shift)){
                            this.properties.value += keyElement.textContent .toUpperCase();
                        } else {
                            this.properties.value += keyElement.textContent .toLowerCase();
                        }
                        
                        this._triggerEvent("oninput");
                        outputText.setSelectionRange(outputText.selectionStart, outputText.selectionStart);
                        outputText.focus();
                    });
                    keyElement.addEventListener("click", this.playSound);
                
                break;
            }
        
            fragment.appendChild(keyElement);

            if((["backspace", "]", "keyboard_return", "?"].indexOf(keyElement.textContent)) !== -1){
                fragment.appendChild(document.createElement("br"));
            }
        });
        return fragment;
   },

   stopR(){
    this.recognition.removeEventListener('end', this.recognition.start);
    this.recognition.stop();
   },

   startR(){
    this.recognition.start();
    this.recognition.addEventListener('end', this.recognition.start);
   },

   createRecognition(){
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    this.recognition = new SpeechRecognition();
    this.recognition.interimResults = true;
    this.properties.lang ? this.recognition.lang = 'ru': this.recognition.lang = 'en';

    const words = document.querySelector('.use-keyboard-input');
    console.log(this.properties.voice);

    this.recognition.addEventListener('result', e => {
            const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
        
            const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
            console.log(poopScript);
        
            if (e.results[0].isFinal) {
                this.properties.value += poopScript;
                this._triggerEvent("oninput");
            }
        });
    return this.recognition;
   },

   

   _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

   _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    _toggleShift() {
        this.properties.shift = !this.properties.shift;
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                if (this.properties.capsLock && !this.properties.shift){
                    if(/[a-zA-ZА-Яа-я]/.test(key.textContent)){
                        key.textContent = key.textContent.toUpperCase();
                    } /*else {
                        keyLayout.forEach(keyL => {
                            if(this.properties.lang){
                                if(keyL[2] === key.textContent){
                                    key.textContent = keyL[3];
                                }
                            } else {
                                if(keyL[0] === key.textContent){
                                    key.textContent = keyL[1];
                                }
                            }
                        });
                    }*/

                } else if(!this.properties.capsLock && this.properties.shift){
                    if(/[a-zA-ZА-Яа-я]/.test(key.textContent)){
                        key.textContent = key.textContent.toUpperCase();
                    } else {
                        keyLayout.forEach(keyL => {
                            if(this.properties.lang){
                                if(keyL[2] === key.textContent){
                                    key.textContent = keyL[3];
                                }
                            } else {
                                if(keyL[0] === key.textContent){
                                    key.textContent = keyL[1];
                                }
                            }
                        });
                    }
                }
                else {
                    if(/[a-zA-ZА-Яа-я]/.test(key.textContent)){
                        key.textContent = key.textContent.toLowerCase();
                    } else {
                        keyLayout.forEach(keyL => {
                            if(this.properties.lang){
                                if(keyL[3] === key.textContent){
                                    key.textContent = keyL[2];
                                }
                            } else {
                                if(keyL[1] === key.textContent){
                                    key.textContent = keyL[0];
                                }
                            }
                        });
                    }
                    key.textContent = key.textContent.toLowerCase();
                }
            }
        }
    },

    _toggleLang() {
        this.properties.lang = !this.properties.lang;
        
        for (let i = 0; i < this.elements.keys.length; i++){
            if (this.elements.keys[i].childElementCount === 0) {
                if (this.properties.lang){
                    this.elements.keys[i].textContent = keyLayout[i][2];
                } else {
                    this.elements.keys[i].textContent = keyLayout[i][0];
                }
            }
        }
        this.createRecognition();
    },

    playSound(e) {

        let audio;
        
        if(!Keyboard.properties.volume){

            if (e.target.classList.contains("caps") || e.target.parentElement.classList.contains("caps")){
                audio = document.querySelector(`audio[data-key="65"]`);
            } else if(e.target.classList.contains("back") || e.target.parentElement.classList.contains("back")){
                audio = document.querySelector(`audio[data-key="83"]`);
            } else if(e.target.classList.contains("sh") || e.target.parentElement.classList.contains("sh")) {
                audio = document.querySelector(`audio[data-key="68"]`);
            } else if(e.target.classList.contains("ent") || e.target.parentElement.classList.contains("ent")) {
                audio = document.querySelector(`audio[data-key="70"]`);
            } else {
                if(Keyboard.properties.lang){
                    audio = document.querySelector(`audio[data-key="71"]`);
                } else {
                    audio = document.querySelector(`audio[data-key="72"]`);
                }
            }
        
        }

        if (!audio) return;
    
        audio.currentTime = 0;
        audio.play();
    },


    lightButton(e){
        const buttonPush = e.key;

        if (e.type === 'keydown'){
            switch (buttonPush){
                case 'CapsLock':                   
                    if(Keyboard.properties.capsLock){
                        document.querySelector('.caps').classList.add("keyboard__key-push");
                        document.querySelector('.caps').classList.remove("keyboard__key--active");
                    } else {
                        document.querySelector('.caps').classList.add("keyboard__key-push");
                        document.querySelector('.caps').classList.add("keyboard__key--active");
                    }
                    Keyboard._toggleCapsLock();

                break;

                case "Backspace":
                    document.querySelector('.back').classList.add("keyboard__key-push");
                    //Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.value.length -1);
                    //Keyboard._triggerEvent("oninput");

                break;
                
                case "Shift":
                    if(Keyboard.properties.shift){
                        document.querySelector('.sh').classList.add("keyboard__key-push");
                        document.querySelector('.sh').classList.remove("keyboard__key--active");
                    } else {
                        document.querySelector('.sh').classList.add("keyboard__key-push");
                        document.querySelector('.sh').classList.add("keyboard__key--active");
                    }
                    Keyboard._toggleShift();

                break;

                case "Enter":
                    document.querySelector('.ent').classList.add("keyboard__key-push");

                break;

                case " ":
                    document.querySelector('.spa').classList.add("keyboard__key-push");

                break;
            }

            Keyboard.elements.keys.forEach(key =>{
                if (key.textContent === buttonPush){
                    key.classList.add('keyboard__key-push');
                }
            });
        } else {
            switch (buttonPush){
                case 'CapsLock':                   
                    document.querySelector('.caps').classList.remove("keyboard__key-push");          

                break;

                case "Backspace":
                    document.querySelector('.back').classList.remove("keyboard__key-push");
                    //Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.value.length -1);
                    //Keyboard._triggerEvent("oninput");

                break;

                case "Shift":
                    document.querySelector('.sh').classList.remove("keyboard__key-push");

                break;

                case "Enter":
                    document.querySelector('.ent').classList.remove("keyboard__key-push");

                break;

                case " ":
                    document.querySelector('.spa').classList.remove("keyboard__key-push");

                break;
            }

            Keyboard.elements.keys.forEach(key =>{
                if (key.textContent === buttonPush){
                    key.classList.add('keyboard__key-push');
                }
            });

            Keyboard.elements.keys.forEach(key =>{
                if (key.textContent === buttonPush){
                    key.classList.remove('keyboard__key-push');
                }
            });
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },
    
    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }


};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init(keyLayout);
  });