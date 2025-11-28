let operandA = 3;
let operandB = 5;
let operator = '+';

function operate(a, operator, b) {
  if (operator === '+') return a + b;
  if (operator === '-') return a - b;
  if (operator === '*') return a * b;
  if (operator === '/') return a / b;
};

console.log(operate(operandA, operator, operandB));

const calculator = document.querySelector('#calc');
const calcInput = document.querySelector('#calcInput');

calculator.addEventListener('click', upldateCalcData);

function upldateCalcData(event) {
  const targetData = event.target.getAttribute('data-target');


  if (targetData === '1') calcInput.value += 1;
  if (targetData === '2') calcInput.value += 2;
  if (targetData === '3') calcInput.value += 3;
  if (targetData === '4') calcInput.value += 4;
  if (targetData === '5') calcInput.value += 5;
  if (targetData === '6') calcInput.value += 6;
  if (targetData === '7') calcInput.value += 7;
  if (targetData === '8') calcInput.value += 8;
  if (targetData === '9') calcInput.value += 9;
  if (targetData === '0') calcInput.value += 0;

  if (targetData === 'clear') calcInput.value = '';
  // if (targetData === '=') calcInput.value = '';

  if (targetData === '+' && canAddOperator(calcInput.value, '+')) calcInput.value += '+';
  if (targetData === '-' && canAddOperator(calcInput.value, '-')) calcInput.value += '-';
  if (targetData === '*' && canAddOperator(calcInput.value, '*')) calcInput.value += '*';
  if (targetData === '/' && canAddOperator(calcInput.value, '/')) calcInput.value += '/';
};

function canAddOperator(inputValue, operator) {
  if (!inputValue) return false;

  if ( !/[-+*\/]/.test(inputValue.at(-1)) ) {
    return true;
  } else if (inputValue.at(-1) !== operator) {
    calcInput.value = inputValue.slice(0, -1).concat(operator);
  } else {
    return false;
  }
};
