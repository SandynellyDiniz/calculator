const getResult = document.querySelector('.result');
const getButtons = document.querySelectorAll('.buttons button'); 

let currentNumber = "";

let firstOpe = null;
let operator = null;
let reststart = false;


function updateResult(originClear = false){
    getResult.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}

function addDigit(digit){
    if(digit === "," && (currentNumber.includes(",") || !currentNumber))
        return;

    if(reststart){
        currentNumber = digit;
        reststart = false;
    }else{
        currentNumber += digit;
    }

    updateResult();
}

function setOperator(newOpe){
     if(currentNumber){
        calculate();

        firstOpe = parseFloat(currentNumber.replace(",","."));
        currentNumber = "";
     }

     operator = newOpe;
}

function calculate(){
    if(operator === null || firstOpe === null) getResult;
    let secondOpe = parseFloat(currentNumber.replace(",","."))
    let finalvalue;

    switch(operator){
        case "+":
            finalvalue = firstOpe + secondOpe;
        break;
        case "-":
            finalvalue = firstOpe - secondOpe;
        break;
        case "x":
            finalvalue = firstOpe * secondOpe;
        break; 
        case "÷":
            finalvalue = firstOpe / secondOpe;
        break;

        default:
           return;
    }

    if(finalvalue.toString().split(".")[1]?.length > 5){
        currentNumber = parseFloat(finalvalue.toFixed((5).toString()))
    }else {
        currentNumber = finalvalue.toString();
    }

    operator = null;
    firstOpe = null;
    reststart = true;
    updateResult();
}


function clearCalculate(){
    currentNumber = "";
    firstOpe = null;
    operator = null;
    updateResult(true);
}

function setPorcentage(){
    let result = parseFloat(currentNumber) / 100;
    if(["+","-"].includes(operator)){
        result = result * (firstOpe || 1);
    }

    if(result.toString().split(".")[1]?.length > 5){
        result = result.toFixed(5).toString();
    }
    currentNumber = result.toString();
    updateResult();
}


getButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const textButton = button.innerText;

        if (/^[0-9]+$/.test(textButton) || textButton === ",") {
            addDigit(textButton);
        }else if (["+","-","x","÷"].includes(textButton)){
            setOperator(textButton)
        }else if(textButton === "="){
            calculate();
        }else if(textButton === "C"){
            clearCalculate();
        }else if(textButton === "±"){
            currentNumber = (
                parseFloat(currentNumber || firstOpe) * -1
            ).toString();
            updateResult();
        }else if(textButton === "%"){
           setPorcentage();
        }
    });
})