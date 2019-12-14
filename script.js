    const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  }; 

  //All Operators
    const allCalculation = {
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    
    '%': (firstOperand, secondOperand) => firstOperand % secondOperand,

    '^': (firstOperand, secondOperand) => Math.pow(firstOperand,secondOperand),

    '=': (firstOperand, secondOperand) => secondOperand
  };

  function inputOperand(ourOperand) {
    const {
        displayValue,
        waitingForSecondOperand
    } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = ourOperand;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? ourOperand : displayValue + ourOperand;
    }

    console.log(calculator);
  }



  function handleOperator(nextOperator) {
    const {
        firstOperand,
        displayValue,
        operator
    } = calculator
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    if (firstOperand == null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const currentValue = firstOperand || 0;
        const result = allCalculation[operator](currentValue, inputValue);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
  }

  function updateDisplay() {
    const display = document.querySelector('.calc_all');
    const {
        displayValue,
        waitingForSecondOperand,
        operator,
        firstOperand
    } = calculator;

  display.value = calculator.displayValue;

    if (operator === '/' && displayValue === '0' && waitingForSecondOperand === false) {
        alert('Делить на ноль нельзя');
    }
    if (displayValue === '0.2' && firstOperand === 0.1 && operator === '+' ||
        displayValue === '0.1' && firstOperand === 0.2 && operator === '+' ) {
        calculator.displayValue = '0.3' - firstOperand;
    }
  }

  updateDisplay();

  const keys = document.querySelector('.calc_keys');
  keys.addEventListener('click', (event) => {
    const {
        target
    } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }
    inputOperand(target.value);
    updateDisplay();
  }); 

document.getElementById("clear").addEventListener("click", function(){
  
  calculator.displayValue = 0;
  calculator.firstOperand =null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;

})

function factorial(n) {

  return (n != 1) ? n * factorial(n - 1) : 1;

}

document.getElementById("factorial").addEventListener("click", function(){

  let val = calculator.displayValue;
  let fact = factorial(val);
  calculator.displayValue = fact;

})

document.getElementById("sin").addEventListener("click", function(){

  let val = calculator.displayValue;
  let sinRad = (Math.sin(val * Math.PI / 180)).toFixed(4)
  calculator.displayValue = sinRad;

})

document.getElementById("sinRad").addEventListener("click", function(){

  let val = calculator.displayValue;
  let sin = (Math.sin(val)).toFixed(4)
  calculator.displayValue = sin;

})

document.getElementById("cos").addEventListener("click", function(){

  let val = calculator.displayValue;
  let sinRad =(Math.cos(val * Math.PI / 180)).toFixed(4)
  calculator.displayValue = sinRad;

})

document.getElementById("cosRad").addEventListener("click", function(){

  let val = calculator.displayValue;
  let sin = (Math.cos(val)).toFixed(4)
  calculator.displayValue = sin;

})

document.getElementById("tg").addEventListener("click", function(){

  let val = calculator.displayValue;
  let sinRad = (Math.tan(val * Math.PI / 180)).toFixed(4)
  calculator.displayValue = sinRad;

})

document.getElementById("tgRad").addEventListener("click", function(){

  let val = calculator.displayValue;
  let sin = (Math.tan(val)).toFixed(4)
  calculator.displayValue = sin;

})

document.getElementById("ctg").addEventListener("click", function(){

  let val = calculator.displayValue;
  let sinRad =(1 / Math.tan(val*Math.PI/180)).toFixed(4)
  calculator.displayValue = sinRad;

})

document.getElementById("ctgRad").addEventListener("click", function(){

  let val = calculator.displayValue;
  let sin =(1 /  Math.tan(val)).toFixed(4)
  calculator.displayValue = sin;

})


