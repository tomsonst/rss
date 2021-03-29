let numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operator'),
    del = document.getElementById('ce'),
    clear = document.getElementById('c'),
    point = document.getElementById('decimal'),
    display = document.getElementById('display'),
    plusMinus = document.getElementById('plusMinus');
    degree = document.getElementById('degree');
    rootOfNumber = document.getElementById('rootOfNumber');
    currentNumber = 0,
    newNumber = false,
    memoryOperation = '';

for (let i = 0; i < numbers.length; i++){
    let number = numbers[i];
    number.addEventListener('click', function(e) {
        numberPress(e.target.textContent);
    });
}

for (let i = 0; i < operations.length; i++){
    let operationBtn = operations[i];
    operationBtn.addEventListener('click',  function(e) {
        operationPress(e.target.value);
    });
}

clear.addEventListener('click', clearPress);

del.addEventListener('click', delPress);

point.addEventListener('click', function(e) {
    pointPress(e.target.textContent);
    });

plusMinus.addEventListener('click', addPlusMinus);
rootOfNumber.addEventListener('click', pushRootNumber);

function addPlusMinus() {
    let dis = display.value;
    if (dis.includes('-')){
        display.value = dis.slice(1, );
    } else {
        if (dis === '0') {
            display.value = '-'
        } else{
            display.value = '-' + dis;
        }
    }
}
function pushRootNumber() {
    let dis = display.value;
    if (dis.includes('-')){
        display.value = 'invalid number';
    } else {
        display.value = Math.sqrt(dis);
    }
}



function numberPress(number) {
    if (newNumber){
        display.value = number;
        newNumber = false;
    } else {
        if (display.value === '0'){
            display.value = number;
        } else {
            display.value += number;
        }
    }
}

function operationPress(oper) {
    let localMemory = display.value;
    
    newNumber = true;
    if (memoryOperation === "+") {
        currentNumber += parseFloat(localMemory);
    } else if (memoryOperation === "-"){
        currentNumber -= parseFloat(localMemory);
    } else if (memoryOperation === "*"){
        currentNumber *= parseFloat(localMemory);
    } else if (memoryOperation === "/"){
        currentNumber /= parseFloat(localMemory);
    } else if (memoryOperation === "degree"){
        currentNumber = currentNumber ** parseFloat(localMemory);
    } else {
        currentNumber = parseFloat(localMemory);
    }

    display.value =  Math.round(currentNumber * 1000000000) / 1000000000;
    memoryOperation = oper;
}

function clearPress() {
    currentNumber = 0;
    memoryOperation = '';
    display.value = 0;
    newNumber = false;
}

function delPress() {
    display.value = 0;
}

function pointPress(p) {
    let dis = display.value;
    if (newNumber){
        newNumber = false;
        return display.value = '0.';
    } else if (dis.includes('.')){
        return;
    }
    display.value = display.value + p;
}
