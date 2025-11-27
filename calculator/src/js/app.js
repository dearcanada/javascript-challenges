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
