"use strict";

const calculator = document.querySelector('#calc');
const calcInput = document.querySelector('#calcInput');
const calcForm = document.querySelector('#calc-form');
const operatorsRegex = /[-+*\/.]/;

calcForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!calcInput.value) return;

  // Checks if an input value consist of numbers and operators only
  if (!/^[-+*\/0-9\s.]+$/i.test(calcInput.value)){
    alertInvalidInput();
    return;
  };

  if (calcInput.value.at(-1) === ' ') {
    alertInvalidInput();
    return;
  };

  // Checks if the last char is not an operator or whitespace
  if (operatorsRegex.test(calcInput.value.at(-1))) {
    alertInvalidInput();
    return;
  };

  console.log('yes');

  calcInput.value = new Function(`return ${calcInput.value}`)();
});

calculator.addEventListener('click', (event) => {
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
  if (targetData === '0' && validateZero(calcInput.value)) calcInput.value += 0;

  if (targetData === '+/-') calcInput.value[0] === '-' ?
   calcInput.value = calcInput.value.replace(calcInput.value[0], '') : 
   calcInput.value = `-${calcInput.value}`

  if (targetData === '.') calcInput.value += '.';
  if (targetData === 'clear') calcInput.value = '';

  if (targetData === '+' && canAddOperator(calcInput.value, '+')) calcInput.value += '+';
  if (targetData === '-' && canAddOperator(calcInput.value, '-')) calcInput.value += '-';
  if (targetData === '*' && canAddOperator(calcInput.value, '*')) calcInput.value += '*';
  if (targetData === '/' && canAddOperator(calcInput.value, '/')) calcInput.value += '/';

  calcInput.scrollLeft = calcInput.scrollWidth;
});

function canAddOperator(inputValue, operator) {
  if (!inputValue) return false;

  if (!operatorsRegex.test(inputValue.trimEnd().at(-1))) {
    return true;
  } else if (inputValue.trimEnd().at(-1) !== operator) {
    calcInput.value = inputValue.replace(/[-+*\/](?=\s*$)/, operator);
  } else {
    return false;
  };
};

function validateZero(inputValue) {
  if (inputValue.trimEnd().at(-1) === '/') {
    alertInvalidInput();
    return false;
  };
  return true;
};

function alertInvalidInput() {
  calcInput.classList.add('invalid-input');
  setTimeout(() => calcInput.classList.remove('invalid-input'), 500);
};

calcInput.addEventListener('focus', (event) => {
  event.target.scrollLeft = event.target.scrollWidth;
});
